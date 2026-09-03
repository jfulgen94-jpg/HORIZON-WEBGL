/**
 * GENERATE-EXECUTIVE-SUMMARY.JS — Motor de Inferencia con Cascada Multi-API y Fallback
 * 
 * Cadena de ejecución prioritaria:
 * 1. Gemini 2.5 Flash (Vía proxy seguro /api/gemini)
 * 2. Mistral Small (Endpoint oficial con VITE_MISTRAL_API_KEY)
 * 3. Together AI Llama 3.3 70B (Endpoint oficial con VITE_TOGETHER_API_KEY)
 * 4. Generador Determinista Local (Garantía de servicio continuo sin dependencias)
 */

import { buildExecutivePrompt } from "../data/executive-summary-config";

/**
 * 1. Proveedor Gemini 2.5 Flash
 */
async function callGemini(prompt) {
  const proxyUrl = "/api/gemini/v1beta/models/gemini-2.5-flash:generateContent";
  const directApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // En dev/prod con proxy Vite, la petición se envía directamente a /api/gemini
  // Si no hay proxy disponible, se agrega la clave como query param
  const finalUrl = directApiKey && !proxyUrl.startsWith("/api/gemini")
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${directApiKey}`
    : proxyUrl;

  const res = await fetch(finalUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Gemini respondió con estado ${res.status}: ${errorText.slice(0, 120)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini no devolvió texto en el formato esperado.");
  }

  return text;
}

/**
 * 2. Proveedor Mistral Small
 */
async function callMistral(prompt) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_MISTRAL_API_KEY no configurada en el entorno.");
  }

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Mistral respondió con estado ${res.status}: ${errorText.slice(0, 120)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Mistral no devolvió contenido de texto.");
  }

  return text;
}

/**
 * 3. Proveedor Together AI (Llama 3.3 70B)
 */
async function callTogether(prompt) {
  const apiKey = import.meta.env.VITE_TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_TOGETHER_API_KEY no configurada en el entorno.");
  }

  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Together AI respondió con estado ${res.status}: ${errorText.slice(0, 120)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Together AI no devolvió contenido de texto.");
  }

  return text;
}

/**
 * 4. Generador Determinista de Alta Fidelidad (Modo de Respaldo Local)
 * Se activa automáticamente cuando no hay conectividad externa o se agotan las cuotas.
 */
function generateDeterministicFallback(formData) {
  const name = formData.nombre || "Horizon Platform";
  const desc = formData.descripcion || "Plataforma tecnológica especializada.";
  const problem = formData.problema || "Ineficiencias operativas y falta de automatización.";
  const audience = formData.publicoObjetivo || "Profesionales y empresas del sector.";
  const market = formData.tamanoMercado || "Mercado potencial de más de 50.000 organizaciones.";
  const diff = formData.diferenciador || "Motor especializado y arquitectura local soberana.";
  const tech = formData.tecnologia || "Stack moderno React, Python, DuckDB e IA generativa.";
  const model = formData.modeloIngresos || "Suscripción mensual B2B (SaaS).";
  const competitors = formData.competencia || "Soluciones genéricas y procesos manuales en hojas de cálculo.";
  const compType = formData.tipoCompetidor || "Software legacy de alto coste y baja adaptabilidad.";
  const compPrice = formData.precioMercado || "Entre 50€ y 300€/mes por usuario.";
  const channels = formData.canalesDistribucion || "Venta directa consultiva y canal digital autoservicio.";
  const ads = formData.publicidad || "Estrategia de contenidos en LinkedIn, eventos técnicos y referidos.";
  const providers = formData.proveedores || "Infraestructura cloud europea, APIs de modelos fundacionales.";
  const quality = formData.calidadProducto || "Pruebas continuas, guardrails anti-alucinación y SLA 99.9%.";
  const today = new Date().toISOString().split("T")[0];

  return `# INFORME EJECUTIVO DE MARKETING Y ESTRATEGIA EMPRESARIAL
## Proyecto: ${name}

**Fecha de Generación:** ${today}  
**Autor:** Dirección de Estrategia e Inversión  
**Enfoque de Posicionamiento:** ${formData.posicion || "Equilibrada"}  
**Fase de Madurez:** ${formData.estadoActual || "Prototipo"}  

---

### 1. RESUMEN EJECUTIVO
${name} es una solución tecnológica diseñada para ${audience}, orientada a erradicar el problema crítico de ${problem.toLowerCase().replace(/\.$/, "")}. A través de ${desc.toLowerCase().replace(/\.$/, "")}, la plataforma transforma flujos de trabajo tradicionales en ventajas competitivas cuantificables, permitiendo a los clientes reducir hasta un 70% los tiempos operativos y asegurar un retorno de inversión positivo en los primeros 90 días de adopción.

---

### 2. ANÁLISIS DEL PRODUCTO Y PROPUESTA DE VALOR
La propuesta de valor de ${name} se fundamenta en tres pilares irremplazables:
- **Automatización Especializada:** Capacidad de resolver directamente el dolor de negocio (${problem}) sin requerir complejas configuraciones ni consultoría externa.
- **Factor Diferencial Exclusivo:** ${diff}. A diferencia de las soluciones generalistas, ${name} implementa lógica específica para el sector con controles de calidad integrados.
- **Arquitectura Fiable:** Apoyada sobre un stack robusto (${tech}), garantizando alta disponibilidad, seguridad de datos y tiempos de respuesta submétricos.

---

### 3. MAPA DE COMPETENCIA Y MATRIZ DE DIFERENCIACIÓN

| Dimensión de Análisis | ${name} (Nuestra Propuesta) | Competencia Dominante (${compType}) | Alternativa Manual / Hojas de Cálculo |
|---|---|---|---|
| **Propuesta Central** | ${desc.slice(0, 75)}... | Enfoque genérico sin especialización | Proceso lento, susceptible a errores humanos |
| **Rango de Precio** | Precio optimizado por valor generado | ${compPrice} | Aparentemente coste cero, alto coste oculto |
| **Tiempo de Despliegue** | Puesta en marcha inmediata en horas | Semanas de integración y parametrización | No requiere software, pero no escala |
| **Grado de Automatización** | Asistencia continua con modelos de IA | Reglas estáticas tradicionales | Inexistente (100% manual) |
| **Soberanía y Privacidad** | Cumplimiento estricto RGPD / Datos locales | Almacenamiento en nubes opacas | Información dispersa sin trazabilidad |

---

### 4. ANÁLISIS DE MERCADO Y DIMENSIÓN DE LA OPORTUNIDAD
- **Mercado Total Direccionable (TAM):** ${market}. Representa la totalidad de organizaciones que sufren las limitaciones de ${competitors}.
- **Mercado Servible (SAM):** Segmento prioritario de organizaciones medianas y profesionales cualificados que demandan modernización inmediata sin sobrecostes corporativos.
- **Mercado Obtenible (SOM - 24 meses):** Captación del 3% al 5% del mercado objetivo mediante venta directa y alianzas con prescriptores de la industria.
- **Tendencia Sectorial:** Creciente demanda de automatización asistida por IA generativa, migración hacia herramientas con procesamiento seguro y sustitución de software monolítico por módulos ágiles.

---

### 5. ESTRATEGIA DE PRECIO Y POSICIONAMIENTO
Frente a las tarifas de mercado observadas (${compPrice}), ${name} adopta una política de precios basada en el valor aportado:
- **Nivel Inicial / Acceso:** Tarifa competitiva diseñada para reducir la fricción de entrada y acelerar la validación.
- **Nivel Profesional / Equipos:** Cuota mensual con soporte prioritario, integraciones ampliadas y análisis avanzados.
- **Justificación Económica:** El ahorro estimado de horas de trabajo por empleado supera en más de 4x la cuota mensual del servicio, garantizando un Coste Total de Propiedad (TCO) sumamente atractivo.

---

### 6. CANALES DE DISTRIBUCIÓN
La estrategia comercial combina dos vectores de penetración:
1. **Canal Autoservicio Online:** Landing page de alta conversión, registro guiado con prueba de concepto y adopción inmediata.
2. **Canal Consultivo B2B:** Demostraciones personalizadas para cuentas estratégicas donde se requiere parametrización de flujos.
- **Alineación con la Competencia:** Mientras las soluciones existentes operan mediante ${channels}, ${name} simplifica la contratación eliminando barreras burocráticas y contratos plurianuales obligatorios.

---

### 7. PLAN DE PUBLICIDAD Y MARKETING
- **Canales Prioritarios:** ${ads}.
- **Generación de Demanda:** Estrategia basada en casos de éxito reales, whitepapers metodológicos y demostraciones interactivas del producto.
- **KPIs Principales:**
  - Coste de Adquisición de Cliente (CAC) objetivo: < 25% del Valor de Vida del Cliente (LTV).
  - Tasa de Conversión de Visita a Registro Beta: > 8%.
  - Retención Neta de Ingresos (NDR) a 12 meses: > 105%.

---

### 8. PRESENCIA DIGITAL Y ACTIVOS DE COMUNICACIÓN
- **Portal Web:** Arquitectura moderna y optimizada para SEO técnico con tiempos de carga inferiores a 1 segundo.
- **Contenido Técnico:** Biblioteca de recursos, guías paso a paso y documentación abierta de casos de uso.
- **Redes y Comunidad:** Difusión de contenido de autoridad en LinkedIn y comunidades profesionales del ámbito de ${audience}.

---

### 9. INFRAESTRUCTURA TÉCNICA Y GESTIÓN DE PROVEEDORES

| Componente | Proveedor / Tecnología Seleccionada | Justificación y Estándar de Servicio |
|---|---|---|
| **Frontend & UX** | React 18 + Vite + Tailwind | Experiencia fluida, ligera y totalmente responsiva |
| **Backend & APIs** | Python FastAPI / Node.js | Alto rendimiento en peticiones asíncronas y escalado |
| **Capa de Datos** | DuckDB + Parquet / PostgreSQL | Consultas analíticas ultrarrápidas y aislamiento de datos |
| **Modelos de Lenguaje** | APIs de Google Gemini / Mistral AI | Máxima relación coste-rendimiento con baja latencia |
| **Monitoreo y SLA** | ${quality} | Trazabilidad completa de incidencias y cumplimiento estricto |

---

### 10. MODELO DE NEGOCIO Y UNIT ECONOMICS
- **Estructura de Ingresos:** ${model}.
- **Margen Bruto Estimado:** > 80%, debido a la eficiencia en el uso de infraestructura moderna y llamadas optimizadas a modelos de IA.
- **Punto de Equilibrio (Break-Even):** Proyectado al alcanzar entre 80 y 120 clientes de pago activos, cubriendo la totalidad de gastos operativos, licencias e inversión de desarrollo.

---

### 11. PROYECCIÓN A 12 MESES
- **Trimestre 1 (Fundación):** Validación del MVP con los primeros 25 usuarios pioneros, refinamiento del onboarding y estabilización del stack.
- **Trimestre 2 (Expansión Inicial):** Apertura comercial pública, activación de campañas de captación y primeros 100 clientes de pago.
- **Trimestre 3 (Consolidación de Producto):** Despliegue de funciones avanzadas solicitadas por clientes corporativos y puesta en marcha del programa de partners.
- **Trimestre 4 (Escala):** Consolidación de ingresos recurrentes, optimización del LTV/CAC y preparación para ronda de capital semilla o reinversión de caja operativa.

---

### 12. PRÓXIMOS PASOS (PLAN DE ACCIÓN 30 / 60 / 90 DÍAS)
- **Días 1 a 30:** Ajuste fino de la especificación técnica, despliegue del prototipo funcional interactivo y validación de 10 entrevistas con usuarios del perfil ${audience}.
- **Días 31 a 60:** Configuración de la infraestructura de analítica, lanzamiento de la web de captación y primeras pruebas de tracción orgánica.
- **Días 61 a 90:** Cierre de los primeros acuerdos comerciales, medición de satisfacción de usuario (NPS > 50) y presentación del dossier formal ante inversores o comités de dirección.

---
*Informe generado automáticamente por el Sistema de Resumen Ejecutivo de Horizon v3.*`;
}

/**
 * Función principal: Genera el informe aplicando la cascada de fallbacks.
 * @param {Object} formData - Respuestas del formulario
 * @returns {Promise<{ markdown: string, provider: string, generatedAt: string, wordCount: number }>}
 */
export async function generateExecutiveSummaryWithFallback(formData) {
  const prompt = buildExecutivePrompt(formData);
  const now = new Date().toISOString();

  // 1. Intentar Gemini 2.5 Flash
  try {
    const result = await callGemini(prompt);
    return {
      markdown: result,
      provider: "Gemini 2.5 Flash",
      generatedAt: now,
      wordCount: result.trim().split(/\s+/).length,
    };
  } catch (geminiErr) {
    console.warn("[Executive Summary] Falló Gemini 2.5 Flash:", geminiErr.message);
  }

  // 2. Intentar Mistral Small
  try {
    const result = await callMistral(prompt);
    return {
      markdown: result,
      provider: "Mistral Small",
      generatedAt: now,
      wordCount: result.trim().split(/\s+/).length,
    };
  } catch (mistralErr) {
    console.warn("[Executive Summary] Falló Mistral Small:", mistralErr.message);
  }

  // 3. Intentar Together AI Llama 3.3 70B
  try {
    const result = await callTogether(prompt);
    return {
      markdown: result,
      provider: "Together AI (Llama 3.3 70B)",
      generatedAt: now,
      wordCount: result.trim().split(/\s+/).length,
    };
  } catch (togetherErr) {
    console.warn("[Executive Summary] Falló Together AI:", togetherErr.message);
  }

  // 4. Modo de Respaldo Local (Garantía de respuesta permanente)
  console.info("[Executive Summary] Activando Motor Determinista de Respaldo de Horizon.");
  const localResult = generateDeterministicFallback(formData);
  return {
    markdown: localResult,
    provider: "Motor Local Horizon (Fallback Seguro)",
    generatedAt: now,
    wordCount: localResult.trim().split(/\s+/).length,
  };
}
