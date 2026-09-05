/**
 * API/AI/GENERATE.JS — Vercel Serverless Function (Node.js) v3.3
 *
 * Flujo de 2 llamadas a Gemini (FIX A: grounding y schema separados):
 * 1a. INVESTIGACIÓN con grounding (texto, bloques literales) → dossier real
 * 1b. ESTRUCTURACIÓN sin grounding (JSON Schema) → JSON validado (F-2 robusto)
 * 2. REDACCIÓN (sin Grounding, narrativa) → informe 8 secciones, 1350-1500 palabras
 * A+B: fallo duro de 1a → 502 RESEARCH_UNAVAILABLE; 1b parcial → redacción marcada.
 * 
 * Cascada:
 * - Investigación (1a+1b): solo Gemini (único con grounding).
 *   Si falla → fallback determinista (error y listo, opción B aprobada).
 * - Redacción: Gemini → Mistral → Together AI.
 * - Si todo falla → fallback determinista (garantía de servicio)
 * 
 * Variables de entorno privadas (configurar en Vercel Dashboard):
 * - GEMINI_API_KEY
 * - MISTRAL_API_KEY
 * - TOGETHER_API_KEY
 */

import { 
  buildResearchPrompt, 
  buildResearchStructurePrompt,
  buildRedactionPrompt, 
  buildAuditPrompt,
  RESEARCH_SCHEMA,
  validateResearchData,
  SYSTEM_PROMPT_RESEARCH,
  SYSTEM_PROMPT_REDACTION,
  SYSTEM_PROMPT_AUDITORIA
} from "../../src/data/executive-summary-config.js";

const MAX_INPUT_CHARS = 5000;
const PROVIDER_TIMEOUT_MS = 60000; // 60s por llamada individual

const PROVIDERS = [
  {
    id: "gemini",
    name: "Gemini 2.5 Flash",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    keyEnv: "GEMINI_API_KEY",
    supportsGrounding: true,
    supportsSchema: true,
    buildBody: (prompt, options = {}) => {
      // F-1: nunca enviar responseSchema (ni siquiera null) salvo JSON con schema real.
      // Gemini 2.5 Flash devuelve 400 si combina grounding con generación controlada.
      const generationConfig = {
        temperature: options.temperature ?? 0.3,
        maxOutputTokens: options.maxTokens ?? 8192,
      };
      if (options.responseSchema) {
        generationConfig.responseMimeType = options.responseMimeType ?? "application/json";
        generationConfig.responseSchema = options.responseSchema;
      } else if (options.responseMimeType) {
        generationConfig.responseMimeType = options.responseMimeType;
      }
      return {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
        tools: options.grounding ? [{ google_search: {} }] : undefined,
      };
    },
    extractText: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text,
    requiresKey: true,
  },
  {
    id: "mistral",
    name: "Mistral Small",
    endpoint: "https://api.mistral.ai/v1/chat/completions",
    keyEnv: "MISTRAL_API_KEY",
    supportsGrounding: false,
    supportsSchema: false,
    buildBody: (prompt, options = {}) => ({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 4096,
      response_format: options.responseSchema ? { type: "json_object" } : undefined,
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content,
    requiresKey: true,
  },
  {
    id: "together",
    name: "Together AI (Llama 3.3 70B)",
    endpoint: "https://api.together.xyz/v1/chat/completions",
    keyEnv: "TOGETHER_API_KEY",
    supportsGrounding: false,
    supportsSchema: false,
    buildBody: (prompt, options = {}) => ({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 4096,
      response_format: options.responseSchema ? { type: "json_object" } : undefined,
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content,
    requiresKey: true,
  },
];

/**
 * Fallback determinista server-side para v3.0 (15 campos)
 */
function generateDeterministicFallback(formData) {
  const name = formData.nombre_proyecto || "Horizon Platform";
  const tagline = formData.tagline || "Plataforma tecnológica especializada";
  const problem = formData.problema_central || "Ineficiencias operativas y falta de automatización";
  const solution = formData.solucion_tecnica || "Stack moderno con IA generativa";
  const diff = formData.diferencial_unico || "Arquitectura local soberana y motor especializado";
  const privacy = formData.privacidad_datos || "local_edge";
  const audience = formData.perfil_cliente_ideal || "Profesionales y empresas del sector";
  const geo = formData.geo_alcance || "espana";
  const model = formData.modelo_ingresos || "saas_mensual";
  const price = formData.precio_referencia || "Por definir";
  const channels = formData.canales_preferidos?.join(", ") || "Web/SEO, outbound, partners";
  const team = formData.recursos_equipo || "Equipo fundador técnico";
  const today = new Date().toISOString().split("T")[0];

  const modelLabels = {
    saas_mensual: "SaaS — suscripción mensual/anual",
    licencia: "Licencia perpetua + mantenimiento",
    hardware_saas: "Hardware + suscripción SaaS",
    freemium: "Freemium + versión pro",
    pay_per_use: "Pay-per-use / por token",
    mixto: "Mixto (hardware + SaaS + servicios)",
  };

  const privacyLabels = {
    local_edge: "100% local (edge) — los datos no salen del dispositivo",
    hibrido: "Híbrido — parte local, parte nube",
    nube_privada: "Nube privada — servidor dedicado por cliente",
    on_premise: "On-premise — se instala en infraestructura del cliente",
  };

  const faseLabels = {
    idea: "Idea (concepto en papel)",
    prototipo: "Prototipo (primera versión funcional)",
    mvp: "MVP (producto mínimo viable)",
    beta_privada: "Beta privada (usuarios de prueba)",
    lanzamiento: "Lanzamiento (disponible al público)",
    crecimiento: "Crecimiento (usuarios creciendo)",
    escala: "Escala (equipo y múltiples mercados)",
  };

  const geoLabels = {
    espana: "España",
    espana_latam: "España + Latinoamérica",
    europa: "Europa (UE)",
    global: "Global",
    otro: "Otro",
  };

  const isLicense = model === "licencia";
  const isHardwareSaaS = model === "hardware_saas";
  const isMixed = model === "mixto";
  const unitEconomicsBlock = isLicense
    ? `[CÁLCULO SEGÚN MODELO: licencia] — Licencia perpetua + mantenimiento.
- **LTV estimado:** precio licencia/hardware + (mantenimiento anual 15-20% × 5 años de vida útil). [ESTIMACIÓN SISTEMA]
- **Margen bruto:** 80-90% en licencia, 70-80% en mantenimiento.
- **Payback:** primer año (venta one-shot), no aplica churn de suscripción.
- **Break-even:** 40-70 licencias según ticket medio.
- **Sensibilidad ±20% precio:** el payback se desplaza 2-4 meses.`
    : isHardwareSaaS || isMixed
    ? `[CÁLCULO SEGÚN MODELO: ${model}] — Desglose one-shot + recurrente.
- **Parte one-shot:** precio hardware/licencia inicial.
- **Parte recurrente:** suscripción/mantenimiento anual; LTV recurrente = ARPA × margen / churn anual. [ESTIMACIÓN SISTEMA]
- **Margen bruto:** 60-70% hardware, 80-85% recurrente.
- **Payback:** 8-14 meses combinados.
- **Break-even:** 60-100 clientes.`
    : `[CÁLCULO SEGÚN MODELO: ${model}] — Suscripción recurrente.
- **CAC estimado:** 800-1.500€ (outbound + content). [ESTIMACIÓN SISTEMA]
- **LTV estimado:** ARPA × margen bruto / churn anual; objetivo LTV > 3×CAC.
- **Margen bruto:** 75-85%.
- **Payback:** 6-10 meses.
- **Break-even:** 80-120 clientes de pago.`;

  return `# INFORME EJECUTIVO — ${name.toUpperCase()}
**Fecha:** ${today} | **Fase:** ${faseLabels[formData.fase_madurez] || formData.fase_madurez} | **Posicionamiento:** ${formData.posicionamiento}

## 1. RESUMEN EJECUTIVO
${name} — ${tagline}. Dirigido a ${audience} en ${geoLabels[geo] || geo}. 
Diferenciador: ${diff}. Modelo ${modelLabels[model] || model} desde ${price}.
Estado: ${faseLabels[formData.fase_madurez] || formData.fase_madurez}. [ESTIMACIÓN SISTEMA]

## 2. PRODUCTO Y DIFERENCIACIÓN
**Problema:** ${problem}.
**Solución:** ${solution}.
**Moat:** ${diff}.
**Privacidad:** ${privacyLabels[privacy] || privacy}.
**Estado actual:** ${faseLabels[formData.fase_madurez] || formData.fase_madurez}.

## 3. ANÁLISIS COMPETITIVO
[SIN VERIFICAR FUENTES EXTERNAS] — Fallback determinista sin investigación real.

| Competidor | Modelo | Precio | Gap vs ${name} |
|---|---|---|---|
| Competidor genérico A | SaaS genérico | 50-200€/mes | No tiene ${diff.slice(0,50)}... |
| Competidor genérico B | Licencia on-premise | 5.000-15.000€ | Sin privacidad local |
| Competidor genérico C | Marketplace | Comisión 15-30% | No especializado |
| Alternativa manual | Hojas de cálculo / procesos internos | Coste oculto alto | No escala ni automatiza |

**Conclusión:** ${name} gana en ${diff.slice(0,60)}... y privacidad ${privacy}. Pierde en brand awareness y red de partners consolidada.

## 4. MERCADO Y OPORTUNIDAD
[ESTIMACIÓN SISTEMA] — Cálculo bottom-up desde ICP.

- **TAM:** 500M €/anual (EUR) — Estimación genérica sector tech B2B España. Fuente: extrapolación ONTSI 2024. Verificable: false
- **SAM:** 50M €/anual (EUR) — 10% TAM por alcance ${geoLabels[geo] || geo}. Verificable: false
- **SOM (24m):** 1.5M €/anual (EUR) — 3% SAM objetivo. Verificable: false

**Tendencias:** IA generativa en edge (+), privacidad regulatoria (+), hardware commoditizado (-).

## 5. MODELO DE NEGOCIO Y UNIT ECONOMICS
**Modelo:** ${modelLabels[model] || model}. **Precio:** ${price}.
${unitEconomicsBlock}
- **Sensibilidad ±20% precio:** LTV/CAC se mantiene >3x en SaaS; en licencia el payback se desplaza según ticket.

## 6. ESTRATEGIA COMERCIAL Y PLAN 90 DÍAS
1. **Content/SEO propio** — CAC ~600€, 3-6 meses, 1 marketer
2. **Outbound directo** — CAC ~1.200€, 1-2 meses, 1 sales
3. **Partners/integradores** — CAC ~400€, 6-12 meses, 0.5 BD
**90 días:** mes 1 content+outbound (50 contactos/sem), mes 2 webinar + paid LinkedIn (20% presupuesto), mes 3 casos de éxito y primer partner. **KPIs semanales:** 10 leads, 2 demos, 1 trial.

## 7. ARQUITECTURA TÉCNICA Y FILOSOFÍA
| Componente | Decisión | Justificación |
|---|---|---|
| Frontend | React 18 + Vite + Tailwind | DX, performance, ecosistema |
| Backend | Node.js (Vercel Functions) / Python FastAPI | Serverless nativo, IA nativa |
| IA | Gemini 2.5 Flash (research) + local LLM opcional | Coste/latencia óptimo, grounding |
| Datos | DuckDB/PostgreSQL + vector store | Analítica + RAG |
| Infra | Vercel + Cloudflare R2 | Edge, coste variable, soberanía EU |
| Monitoring | Vercel Analytics + Sentry | Sin cookies, observabilidad |

**Filosofía:** Local-first, privacy-by-design, edge computing. El hardware propio (si aplica) garantiza soberanía total de datos; el software es portable y auditable. Riesgos: latencia modelos grandes en edge (mitigación: cuantización 4-bit), cadena suministro hardware (mitigación: 2 fuentes), regulación IA Act (mitigación: compliance by design).

## 8. ROADMAP 12 MESES + PRÓXIMOS PASOS
- **T1 Fundación:** MVP funcional, 10 pilots, estabilizar stack. **30/60/90:** especificación v1.0 y 10 entrevistas ICP (30d, responsable fundador) → MVP en 5 betas + landing (60d) → beta pública y deck v2.0 (90d).
- **T2 Expansión:** Lanzamiento público, 50 clientes, 2 partners, content engine rodando
- **T3 Consolidación:** Features enterprise (SSO, RBAC, audit log), 200 clientes, equipo +3
- **T4 Escala:** Internacionalización (Latam/EU), 500 clientes, series A o cash-flow positive

---
*Informe generado por Horizon Executive AI v3.1 (Fallback Determinista) | Categoría: [ESTIMACIÓN SISTEMA] | Fuentes: [FALLBACK] | [CÁLCULO SEGÚN MODELO: ${model}]*`;
}

/**
 * Llama a un proveedor con opciones específicas (grounding, schema, temperature)
 */
async function callProvider(provider, prompt, options = {}) {
  const apiKey = process.env[provider.keyEnv];
  if (provider.requiresKey && !apiKey) {
    throw new Error(`Clave ${provider.keyEnv} no configurada`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const headers = { "Content-Type": "application/json" };
    const body = provider.buildBody(prompt, options);

    if (provider.id === "gemini") {
      const url = new URL(provider.endpoint);
      url.searchParams.set("key", apiKey);
      const res = await fetch(url.toString(), {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`${provider.name} respondió ${res.status}: ${errText.slice(0, 200)}`);
      }
      const data = await res.json();
      const text = provider.extractText(data);
      if (!text) throw new Error(`${provider.name} no devolvió texto`);
      return { text, rawResponse: data };
    } else {
      headers.Authorization = `Bearer ${apiKey}`;
      const res = await fetch(provider.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`${provider.name} respondió ${res.status}: ${errText.slice(0, 200)}`);
      }
      const data = await res.json();
      const text = provider.extractText(data);
      if (!text) throw new Error(`${provider.name} no devolvió contenido`);
      return { text, rawResponse: data };
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Ejecuta la Llamada 1: Investigación en 2 fases (FIX A)
 * 1a: grounding SIN schema (text/plain) → texto estructurado real
 * 1b: schema SIN grounding (application/json) → JSON validado
 * Solo Gemini. Si falla, lanza error y el handler cae al fallback.
 */
async function executeResearchCall(userAnswers) {
  const gemini = PROVIDERS.find((p) => p.id === "gemini");
  const researchPrompt = SYSTEM_PROMPT_RESEARCH + "\n\n" + buildResearchPrompt(userAnswers);

  // Fase 1a — grounding, texto plano
  let researchText;
  try {
    const result = await callProvider(gemini, researchPrompt, {
      temperature: 0.3,
      maxTokens: 8192,
      grounding: true,
      responseMimeType: "text/plain",
      responseSchema: null,
    });
    researchText = result.text;
    if (!researchText || researchText.trim().length < 200) {
      throw new Error("Gemini (research 1a) devolvió texto vacío o insuficiente");
    }
  } catch (err) {
    console.warn(`[AI Generate] ${gemini.name} (research 1a grounding) falló:`, err.message);
    throw err;
  }

  // Fase 1b — estructuración a JSON, sin grounding (F-2: parseo robusto + 1 reintento)
  const parseResearchJson = (text) => {
    const clean = String(text ?? "")
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();
    const m = clean.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("1b sin objeto JSON en la respuesta");
    return JSON.parse(m[0]);
  };
  const structurePrompt = buildResearchStructurePrompt(researchText);
  let lastErr = null;
  for (const temperature of [0.2, 0.1]) {
    try {
      const result = await callProvider(gemini, structurePrompt, {
        temperature,
        maxTokens: 8192,
        grounding: false,
        responseMimeType: "application/json",
        responseSchema: RESEARCH_SCHEMA,
      });
      const researchData = parseResearchJson(result.text);
      const validation = validateResearchData(researchData);
      if (!validation.valid) {
        console.warn("[AI Generate] Validación research falló:", validation.errors);
      }
      return { researchData, researchText, provider: gemini.name, partial: false, rawResponse: result.rawResponse };
    } catch (err) {
      lastErr = err;
      console.warn(`[AI Generate] ${gemini.name} (research 1b schema, temp ${temperature}) falló:`, err.message);
    }
  }
  // 1b parcial: hay texto 1a pero sin JSON válido → redacción marcada (A+B parcial)
  console.warn("[AI Generate] 1b sin JSON válido tras reintento: se continúa con research parcial");
  return { researchData: null, researchText, provider: gemini.name, partial: true, rawResponse: null, error: lastErr?.message };
}

/**
 * Ejecuta la Llamada 2: Redacción narrativa
 */
async function executeRedactionCall(userAnswers, researchData, tipoInforme = "marketing") {
  const isAuditoria = tipoInforme === "auditoria";
  const prompt = isAuditoria
    ? SYSTEM_PROMPT_AUDITORIA + "\n\n" + buildAuditPrompt(userAnswers, researchData, tipoInforme)
    : buildRedactionPrompt(userAnswers, researchData);

  const options = {
    temperature: 0.5,
    maxTokens: 8192,
    grounding: false,
  };

  let lastError = null;
  for (const provider of PROVIDERS) {
    try {
      const result = await callProvider(provider, prompt, options);
      return { markdown: result.text, provider: provider.name, rawResponse: result.rawResponse };
    } catch (err) {
      lastError = err;
      console.warn(`[AI Generate] ${provider.name} (redacción) falló:`, err.message);
    }
  }
  throw lastError || new Error("Llamada 2 (redacción) falló en todos los proveedores");
}

export default async function handler(request, response) {
  const startTime = Date.now();

  // Solo POST
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      error: "METHOD_NOT_ALLOWED",
      message: "Solo se permite POST",
    });
  }

  // Content-Type
  const contentType = request.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    return response.status(400).json({
      error: "BAD_REQUEST",
      message: "Content-Type debe ser application/json",
    });
  }

  // Parse body
  let body;
  try {
    body = request.body;
  } catch {
    return response.status(400).json({
      error: "BAD_REQUEST",
      message: "Cuerpo JSON inválido",
    });
  }

  if (!body || typeof body !== "object") {
    return response.status(400).json({
      error: "BAD_REQUEST",
      message: "Cuerpo debe ser un objeto JSON",
    });
  }

  const { prompt, formData } = body;
  const tipoInforme = formData?.tipo_informe || "marketing";

  // Validar entrada utilizable
  if (!prompt && (!formData || typeof formData !== "object" || Object.keys(formData).length === 0)) {
    return response.status(400).json({
      error: "BAD_REQUEST",
      message: "Se requiere 'prompt' o 'formData' con datos del formulario",
    });
  }

  // Validar tamaño
  const inputSize = JSON.stringify({ prompt, formData }).length;
  if (inputSize > MAX_INPUT_CHARS) {
    return response.status(413).json({
      error: "PAYLOAD_TOO_LARGE",
      message: `Entrada supera ${MAX_INPUT_CHARS} caracteres`,
    });
  }

  // Si viene prompt directo (compatibilidad), usar flujo legacy single-call
  if (prompt && !formData) {
    // Flujo legacy: una sola llamada
    let lastError = null;
    for (const provider of PROVIDERS) {
      try {
        const result = await callProvider(provider, prompt, { temperature: 0.3, maxTokens: 8192 });
        const wordCount = result.text.trim().split(/\s+/).length;
        return response.status(200).json({
          markdown: result.text,
          provider: provider.name,
          generatedAt: new Date().toISOString(),
          wordCount,
        });
      } catch (err) {
        lastError = err;
        console.warn(`[AI Generate] ${provider.name} (legacy) falló:`, err.message);
      }
    }
    // Fallback
    try {
      const markdown = generateDeterministicFallback({});
      return response.status(200).json({
        markdown,
        provider: "Motor Local Horizon (Fallback Seguro)",
        generatedAt: new Date().toISOString(),
        wordCount: markdown.trim().split(/\s+/).length,
      });
    } catch (fallbackErr) {
      return response.status(500).json({ error: "INTERNAL_ERROR", message: "Error interno" });
    }
  }

  // FLUJO NUEVO v3.3: 2 llamadas con formData (A+B)
  let research;
  try {
    console.log("[AI Generate] Iniciando Llamada 1: Investigación...");
    research = await executeResearchCall(formData);
    console.log("[AI Generate] Investigación completada por:", research.provider, research.partial ? "(parcial)" : "");
  } catch (err) {
    // A: fallo duro de 1a (sin texto research) → 502 honesto, sin informe genérico
    console.error("[AI Generate] Research 1a falló de forma dura:", err.message);
    return response.status(502).json({
      error: "RESEARCH_UNAVAILABLE",
      message: "La investigación de mercado no pudo completarse (Google Search). Reintenta en unos minutos.",
    });
  }

  try {
    if (research.partial) {
      console.log("[AI Generate] Research parcial: redacción con marcas [SIN VERIFICAR FUENTES EXTERNAS]");
    }
    console.log("[AI Generate] Iniciando Llamada 2: Redacción...");
    const { markdown, provider: redactionProvider } = await executeRedactionCall(formData, research.researchData, tipoInforme);
    console.log("[AI Generate] Redacción completada por:", redactionProvider);

    const wordCount = markdown.trim().split(/\s+/).length;
    const generatedAt = new Date().toISOString();

    return response.status(200).json({
      markdown,
      provider: `${redactionProvider} (research: ${research.provider}${research.partial ? ", parcial" : ""})`,
      generatedAt,
      wordCount,
      researchData: research.researchData, // null si parcial (UI marca secciones 3-4)
      researchPartial: !!research.partial,
    });
  } catch (err) {
    console.error("[AI Generate] Flujo v3.0 falló completamente:", err.message);
    
    // Fallback determinista
    try {
      const markdown = generateDeterministicFallback(formData || {});
      return response.status(200).json({
        markdown,
        provider: "Motor Local Horizon (Fallback Seguro)",
        generatedAt: new Date().toISOString(),
        wordCount: markdown.trim().split(/\s+/).length,
      });
    } catch (fallbackErr) {
      console.error("[AI Generate] Fallback determinista falló:", fallbackErr.message);
      return response.status(500).json({
        error: "INTERNAL_ERROR",
        message: "Error interno del servidor",
      });
    }
  }
}