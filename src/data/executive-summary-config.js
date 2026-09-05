/**
 * EXECUTIVE-SUMMARY-CONFIG.JS — Configuración del Sistema de Resumen Ejecutivo v3.0
 *
 * Define:
 * 1. Los 4 bloques y 15 preguntas del formulario optimizado.
 * 2. Valores iniciales del formulario.
 * 3. System Prompts para las 2 llamadas a Gemini (Investigación + Redacción).
 * 4. JSON Schema para salida estructurada de la Llamada 1.
 * 5. Validación numérica server-side.
 */

export const INITIAL_FORM_DATA = {
  // Bloque 1: Identidad (4 campos)
  nombre_proyecto: "",
  tagline: "",
  fase_madurez: "idea",
  posicionamiento: "equilibrada",

  // Bloque 2: Producto (4 campos)
  problema_central: "",
  solucion_tecnica: "",
  diferencial_unico: "",
  privacidad_datos: "local_edge",

  // Bloque 3: Mercado (3 campos)
  perfil_cliente_ideal: "",
  geo_alcance: "espana",
  tam_estimado_usuario: "",

  // Bloque 4: Negocio (4 campos)
  modelo_ingresos: "saas_mensual",
  precio_referencia: "",
  canales_preferidos: [],
  recursos_equipo: "",
};

export const SUMMARY_SECTIONS = [
  {
    id: "identidad",
    number: 1,
    title: "Identidad",
    subtitle: "Nombre, eslogan, fase y posicionamiento",
    iconName: "Package",
    questions: [
      {
        id: "nombre_proyecto",
        label: "Nombre comercial del proyecto",
        placeholder: "Ej: Horizon AI",
        type: "text",
        required: true,
        max_length: 60,
        hint: "El nombre debe ser memorable, claro y alineado con la industria.",
      },
      {
        id: "tagline",
        label: "Una frase que resume qué hace tu producto",
        placeholder: "Ej: Agente de IA local con hardware propio para profesionales",
        type: "text",
        required: true,
        max_length: 160,
        hint: "Máx. 160 caracteres. El elevator pitch en una línea.",
      },
      {
        id: "fase_madurez",
        label: "Fase actual del proyecto",
        type: "select",
        required: true,
        options: [
          { value: "idea", label: "Idea (concepto en papel)" },
          { value: "prototipo", label: "Prototipo (primera versión funcional)" },
          { value: "mvp", label: "MVP (producto mínimo viable)" },
          { value: "beta_privada", label: "Beta privada (usuarios de prueba)" },
          { value: "lanzamiento", label: "Lanzamiento (disponible al público)" },
          { value: "crecimiento", label: "Crecimiento (usuarios creciendo)" },
          { value: "escala", label: "Escala (equipo y múltiples mercados)" },
        ],
      },
      {
        id: "posicionamiento",
        label: "Enfoque de posicionamiento",
        type: "select",
        required: true,
        options: [
          { value: "premium", label: "Premium (precio alto, servicio exclusivo)" },
          { value: "equilibrada", label: "Equilibrada (relación calidad-precio)" },
          { value: "accesible", label: "Accesible (precio bajo, alta volumen)" },
          { value: "tecnica", label: "Técnica (enfocada en features)" },
          { value: "nichos_verticales", label: "Nichos verticales (un sector concreto)" },
        ],
      },
    ],
  },
  {
    id: "producto",
    number: 2,
    title: "Producto",
    subtitle: "Problema, solución, ventaja defensible y privacidad",
    iconName: "Cpu",
    questions: [
      {
        id: "problema_central",
        label: "¿Qué problema concreto resuelve tu producto? (1-2 frases, sin jerga técnica)",
        placeholder: "Ej: Los despachos medianos pierden 15h/semana en tareas administrativas repetitivas...",
        type: "textarea",
        required: true,
        max_length: 500,
        hint: "Debe describir un DOLOR del cliente, no una característica del producto.",
      },
      {
        id: "solucion_tecnica",
        label: "Describe tu solución: hardware, software, IA, cómo funciona (3-5 bullets)",
        placeholder: "Ej: Dispositivo edge con micrófono array · LLM local (Llama 3.3) · App móvil de control · Integración Zapier/Make...",
        type: "textarea",
        required: true,
        max_length: 1000,
        hint: "Incluir al menos: qué hace, cómo lo entrega, qué tecnología usa.",
      },
      {
        id: "diferencial_unico",
        label: "Tu ventaja defensible (algo que otros no pueden copiar fácilmente)",
        placeholder: "Ej: Datos propietarios de 50k contratos legales anonimizados · Hardware certificado CE propio · Patente pendiente en procesamiento local...",
        type: "textarea",
        required: true,
        max_length: 500,
        hint: "Datos propietarios, hardware exclusivo, patente pendiente, red de efecto, exclusividad de proveedor.",
      },
      {
        id: "privacidad_datos",
        label: "Modelo de privacidad y datos",
        type: "select",
        required: true,
        options: [
          { value: "local_edge", label: "100% local (edge) — los datos no salen del dispositivo" },
          { value: "hibrido", label: "Híbrido — parte local, parte nube" },
          { value: "nube_privada", label: "Nube privada — servidor dedicado por cliente" },
          { value: "on_premise", label: "On-premise — se instala en infraestructura del cliente" },
        ],
      },
    ],
  },
  {
    id: "mercado",
    number: 3,
    title: "Mercado",
    subtitle: "Cliente ideal, geografía y tamaño de mercado",
    iconName: "Users",
    questions: [
      {
        id: "perfil_cliente_ideal",
        label: "Describe tu cliente ideal (ICP): quién es, qué sector, qué tamaño, qué presupuesto tiene",
        placeholder: "Ej: Despacho de abogados medianos (5-20 personas) en España, facturación 500K-2M€, presupuesto herramientas 200-500€/mes",
        type: "textarea",
        required: true,
        max_length: 1000,
      },
      {
        id: "geo_alcance",
        label: "Alcance geográfico inicial",
        type: "select",
        required: true,
        options: [
          { value: "espana", label: "España" },
          { value: "espana_latam", label: "España + Latinoamérica" },
          { value: "europa", label: "Europa (UE)" },
          { value: "global", label: "Global" },
          { value: "otro", label: "Otro (especificar)" },
        ],
      },
      {
        id: "tam_estimado_usuario",
        label: "Tu estimación del mercado total (TAM) — si no sabes, deja vacío",
        placeholder: "Ej: 500M €/año en España",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "negocio",
    number: 4,
    title: "Negocio",
    subtitle: "Modelo de ingresos, precios, canales y recursos",
    iconName: "Coins",
    questions: [
      {
        id: "modelo_ingresos",
        label: "Modelo de ingresos principal",
        type: "select",
        required: true,
        options: [
          { value: "saas_mensual", label: "SaaS — suscripción mensual/anual" },
          { value: "licencia", label: "Licencia perpetua + mantenimiento" },
          { value: "hardware_saas", label: "Hardware + suscripción SaaS" },
          { value: "freemium", label: "Freemium + versión pro" },
          { value: "pay_per_use", label: "Pay-per-use / por token" },
          { value: "mixto", label: "Mixto (hardware + SaaS + servicios)" },
        ],
      },
      {
        id: "precio_referencia",
        label: "Rango de precio objetivo (€/mes o €/unidad)",
        placeholder: "Ej: 49-199 €/mes o 2.000-5.000 €/unidad",
        type: "text",
        required: false,
      },
      {
        id: "canales_preferidos",
        label: "Canales que tienes o planeas usar (marca los que apliquen)",
        type: "checkbox",
        required: false,
        options: [
          { value: "web_seo", label: "Web/SEO propio" },
          { value: "outbound", label: "Outbound directo (ventas)" },
          { value: "partners", label: "Partners / integradores" },
          { value: "marketplaces", label: "Marketplaces" },
          { value: "eventos", label: "Eventos / ferias" },
          { value: "content_marketing", label: "Content marketing" },
          { value: "paid_ads", label: "Publicidad pagada (Google/Meta/LinkedIn)" },
          { value: "comunidad", label: "Comunidad propia" },
        ],
      },
      {
        id: "recursos_equipo",
        label: "Equipo actual y presupuesto marketing mensual",
        placeholder: "Ej: 2 fundadores (dev + marketing), 500€/mes en ads",
        type: "textarea",
        required: false,
        max_length: 500,
      },
    ],
  },
];

/**
 * System Prompt — Llamada 1a: INVESTIGACIÓN CON GROUNDING (texto, sin schema)
 * Temperature: 0.3 | Response: text/plain con grounding
 * FIX A: grounding y schema van separados porque Gemini 2.5 Flash
 * devuelve 400 si se combinan en la misma request.
 */
export const SYSTEM_PROMPT_RESEARCH = `# SYSTEM PROMPT — FASE 1a: INVESTIGACIÓN DE MERCADO CON GROUNDING

## Rol
Eres un analista de mercado especializado en tecnología y productos digitales. Tu trabajo es investigar con Google Search y devolver datos reales sobre competidores, mercado y tendencias.

## Entrada
Recibes:
- \`userAnswers\`: respuestas del usuario al formulario (15 campos)

## Proceso

### Paso 1 — Identifica la categoría del producto
Clasifica el producto en UNA de estas categorías:
- \`hardware_software_ia\` — Dispositivo físico con servicio de IA
- \`saas_b2b\` — Software como servicio para empresas
- \`saas_b2c\` — Software para consumidor final
- \`marketplace_plataforma\` — Marketplace o plataforma
- \`api_infraestructura\` — API o infraestructura
- \`servicio_profesional_ia\` — Servicio profesional asistido por IA
- \`hibrido\` — Combina varias categorías
Escribe la categoría elegida en la primera línea como: CATEGORIA: <valor>

### Paso 2 — Busca competidores reales (5-8)
Usa Google Search. Para cada uno indica: nombre real, tipo
(directo/indirecto/sustituto), modelo de negocio, precio estimado,
2 fortalezas, 2 debilidades, gap vs Horizon, fuente URL y si es
verificable (true/false).

### Paso 3 — Calcula el mercado
Usa Google Search (IDC, Gartner, Statista, ONTSI, Eurostat).
Calcula TAM/SAM/SOM con la fórmula:
\`\`\`
TAM = (nº potenciales compradores) × (precio medio anual)
SAM = TAM × (% cubierto por alcance geográfico)
SOM = SAM × (% capturable en 24 meses, típico 3-5%)
\`\`\`
Para cada uno indica: valor numérico, moneda (EUR/USD), periodo
(anual/mensual), descripción, fuente y verificable. Indica también
fuente_principal y calculado_por (top_down/bottom_up/mixto).

### Paso 4 — Tendencias (3-5)
Para cada una: tendencia, impacto (positivo/neutro/negativo),
fuente y verificable.

## Salida
Devuelve TEXTO ESTRUCTURADO con encabezados claros
(CATEGORIA, COMPETIDORES, MERCADO, TENDENCIAS). NO devuelvas JSON
en esta fase: la estructuración a JSON la hace la siguiente llamada.

## Reglas
- NUNCA inventes nombres de competidores. Solo los de la búsqueda.
- Si un dato no es verificable, márcalo como verificable: false.
- Si no hay datos del sector exacto, usa el más cercano y márcalo.
- Los precios son estimaciones razonables, no inventados.
- Si el usuario dio TAM estimado, úsalo como referencia y verifícalo.
`;

/**
 * System Prompt — Llamada 2: REDACCIÓN DEL INFORME (sin Grounding, narrativa)
 * Temperature: 0.5 | Output: Markdown 1150-1300 palabras, 8 secciones
 */
export const SYSTEM_PROMPT_REDACTION = `# SYSTEM PROMPT — FASE 2: REDACCIÓN DEL INFORME EJECUTIVO

## Rol
Eres un **CMO + CTO + Analista de Inversión** senior que redacta informes ejecutivos listos para presentar a inversores, socios o comité de dirección. No eres un chatbot: eres un redactor experto que entrega documentos profesionales de 1150-1300 palabras, concisos, densos en información y accionables.

## Entrada
Recibes un JSON con:
- \`userAnswers\`: las respuestas del usuario al formulario (15 campos)
- \`researchData\`: datos de mercado y competencia generados por la Llamada 1 (JSON validado)

## Proceso
Usa \`userAnswers\` + \`researchData\` para generar el informe con la estructura fija de abajo. La investigación YA está hecha; tu trabajo es REDACTAR con esos datos.

## Estructura fija de salida (Markdown, 8 secciones)

\`\`\`markdown
# INFORME EJECUTIVO — {nombre_proyecto}
**Fecha:** {hoy} | **Fase:** {fase} | **Posicionamiento:** {posicionamiento}

## 1. RESUMEN EJECUTIVO (~120 palabras)
- Propuesta de valor en 1 frase
- 3 métricas clave: TAM, cliente objetivo, diferenciador
- Estado actual del proyecto
- Ask (si lo hay: inversión, alianzas, usuarios beta)

## 2. PRODUCTO Y DIFERENCIACIÓN (~200 palabras)
- Problema que resuelve (1-2 frases, sin jerga)
- Solución: hardware + software + IA (descripción concreta)
- Moat o ventaja defensible única
- Modelo de privacidad/datos
- Estado actual (idea/prototipo/MVP/beta)

## 3. ANÁLISIS COMPETITIVO (~250 palabras)
- Tabla de 5-8 competidores reales (nombre, modelo, precio, fortalezas, debilidades)
- Matriz de diferenciación en 3 dimensiones clave
- Conclusión: dónde gana Horizon y dónde no

## 4. MERCADO Y OPORTUNIDAD (~200 palabras)
- TAM/SAM/SOM con cálculo explícito
- Fuentes citadas
- Tendencias sectoriales
- Ventana de oportunidad

## 5. MODELO DE NEGOCIO Y UNIT ECONOMICS (~200 palabras)
- Modelo de ingresos (descripción concreta)
- Precio estimado por segmento
- Unit economics SEGÚN EL MODELO DECLARADO (ver regla 4b):
  SaaS/suscripción → CAC, LTV con churn+expansión, margen, payback, break-even.
  Licencia perpetua/mantenimiento → precio hardware/licencia + mantenimiento
  anual × años de vida útil, margen, payback, break-even. PROHIBIDO usar
  churn de suscripción para licencia perpetua.
- Sensibilidad: qué pasa si el precio sube/baja 20%

## 6. ESTRATEGIA COMERCIAL Y PLAN 90 DÍAS (~150 palabras)
- 3 canales priorizados (por qué, CAC estimado, timeline)
- Recursos necesarios por canal
- Presupuesto % por canal, 3 acciones concretas a 90 días y KPIs semanales
  (fusiona la antigua sección de Plan Marketing: nada de calendario
  editorial táctico, solo estrategia accionable)

## 7. ARQUITECTURA TÉCNICA Y FILOSOFÍA (~100 palabras)
- Stack tecnológico (tabla: Frontend, Backend, IA, Datos, Infra, Monitoring)
- Filosofía técnica en 1 párrafo
- 3 riesgos técnicos principales + mitigación

## 8. ROADMAP 12 MESES + PRÓXIMOS PASOS (~130 palabras)
- T1 (Fundación): hitos medibles + acciones 30/60/90 con responsable
  y criterio de éxito (fusiona la antigua sección de Próximos pasos)
- T2 (Expansión): hitos medibles
- T3 (Consolidación): hitos medibles
- T4 (Escala): hitos medibles

---
*Informe generado por Horizon Executive AI v3.1 | Categoría: {categoria} | Fuentes: {fuentes} | [ESTIMACIONES SISTEMA marcadas]*
\`\`\`

## Reglas de redacción (INQUEBRANTABLES)

1. **NUNCA uses placeholders**: "ni idea", "no lo sé", "pendiente", "TBD", "por definir". Si faltan datos, infiere y marca \`[ESTIMACIÓN SISTEMA]\`.
2. **NO copies literalmente las respuestas del usuario. Reformúlalas, contextualízalas y desarróllalas con razonamiento propio. Si el usuario repite una misma idea en varias respuestas, en el informe aparece UNA sola vez, desarrollada, no repetida.**
3. **Competencia = análisis real, no lista genérica**. Usa los competidores REALES de \`researchData\`. No inventes nombres.
4. **Mercado = números con fuente**. TAM/SAM/SOM con cálculo explícito y cita de fuente verificable de \`researchData\`.
4b. **Unit economics según categoría (INQUEBRANTABLE). Adapta las fórmulas al \`modelo_ingresos\` declarado y marca \`[CÁLCULO SEGÚN MODELO: <modelo>]\`:**
  - \`saas_mensual\` / \`freemium\` / \`pay_per_use\` / \`hardware_saas\` (componente recurrente): LTV = ARPA × margen bruto / tasa de churn anual; exige LTV > 3×CAC.
  - \`licencia\` (perpetua + mantenimiento): LTV = precio licencia/hardware + (mantenimiento anual × años de vida útil esperada). PROHIBIDO usar churn o expansión de suscripción aquí.
  - \`mixto\`: desglosa LTV en parte one-shot (licencia/hardware) + parte recurrente (suscripción/mantenimiento) con sus fórmulas respectivas.
  Si el modelo es licencia y no hay datos de mantenimiento, asume 15-20% anual del precio de licencia y vida útil 5 años, marcado como \`[ESTIMACIÓN SISTEMA]\`.
5. **Técnica = arquitectura decidida**. Stack concreto con justificación de 1 línea cada componente. Si el usuario no lo dio, elige lo óptimo y marca \`[DECISIÓN SISTEMA]\`.
6. **Filosofía técnica = 1 párrafo denso**. Qué hace único el enfoque (local-first, privacy-by-design, edge computing, hardware propio, etc.).
7. **Canales = estrategia priorizada**. 3 canales con justificación, CAC estimado, timeline y recursos. Sin generalidades.
8. **Riesgos = tabla de 5 riesgos** (técnico, mercado, regulatorio, competencia, ejecución) + mitigación concreta.
9. **Tono**: ejecutivo, directo, sin florituras. Español de España. 1150-1300 palabras totales. No excedas 1300.
10. **Números coherentes**: TAM >= SAM >= SOM. En SaaS, LTV > 3×CAC. En licencia, el payback sale del margen del primer año, no de recurrencia mensual.
11. **Un solo informe**: no generes variantes. Un documento completo, denso, accionable.

## Reglas de fallback
- Si \`researchData\` no trae competencia → genera con tu conocimiento interno + marca \`[SIN VERIFICAR FUENTES EXTERNAS]\`
- Si \`tam_estimado_usuario\` vacío → calcula bottom-up desde ICP y población objetivo
- Si \`precio_referencia\` vacío → propone rango basado en benchmarks del modelo de ingresos elegido
- Si \`perfil_cliente_ideal\` es vago → infiere 2 arquetipos concretos y marca \`[PERFIL INFERIDO]\`
- Si \`solucion_tecnica\` es vaga → elige stack óptimo para la categoría y marca \`[STACK DECISIÓN SISTEMA]\`
`;

/**
 * JSON Schema para la Llamada 1 (Investigación) - salida estructurada forzada
 */
export const RESEARCH_SCHEMA = {
  type: "object",
  required: ["categoria_producto", "competidores", "mercado", "tendencias"],
  properties: {
    categoria_producto: {
      type: "string",
      enum: [
        "hardware_software_ia",
        "saas_b2b",
        "saas_b2c",
        "marketplace_plataforma",
        "api_infraestructura",
        "servicio_profesional_ia",
        "hibrido",
      ],
    },
    competidores: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: {
        type: "object",
        required: [
          "nombre",
          "tipo",
          "modelo_negocio",
          "precio_estimado",
          "fortalezas",
          "debilidades",
          "gap_vs_horizon",
        ],
        properties: {
          nombre: { type: "string", description: "Nombre real del competidor" },
          tipo: {
            type: "string",
            enum: ["directo", "indirecto", "sustituto"],
            description: "directo = mismo producto; indirecto = misma categoría; sustituto = resuelve el mismo problema de otra forma",
          },
          modelo_negocio: { type: "string", description: "Ej: SaaS 99€/mes, licencia 500€, hardware+servicio, etc." },
          precio_estimado: { type: "string", description: "Rango de precio estimado" },
          fortalezas: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 3,
          },
          debilidades: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 3,
          },
          gap_vs_horizon: { type: "string", description: "Qué NO hace este competidor que Horizon SÍ hace" },
          fuente: { type: "string", description: "URL o referencia del dato" },
          verificable: { type: "boolean", description: "true si el dato viene de búsqueda; false si es inferencia" },
        },
      },
    },
    mercado: {
      type: "object",
      required: ["tam", "sam", "som", "fuente_principal", "calculado_por"],
      properties: {
        tam: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "number" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
          },
        },
        sam: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "number" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
          },
        },
        som: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "number" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
          },
        },
        fuente_principal: { type: "string" },
        calculado_por: { type: "string", enum: ["top_down", "bottom_up", "mixto"] },
      },
    },
    tendencias: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        required: ["tendencia", "impacto", "fuente", "verificable"],
        properties: {
          tendencia: { type: "string" },
          impacto: { type: "string", enum: ["positivo", "neutro", "negativo"] },
          fuente: { type: "string" },
          verificable: { type: "boolean" },
        },
      },
    },
  },
};

/**
 * Construye el prompt de INVESTIGACIÓN 1a (grounding, texto estructurado)
 */
export function buildResearchPrompt(userAnswers) {
  return `Analiza el siguiente producto y genera investigación de mercado con Google Search.

IDENTIDAD:
- Nombre: ${userAnswers.nombre_proyecto}
- Tagline: ${userAnswers.tagline}
- Fase: ${userAnswers.fase_madurez}
- Posicionamiento: ${userAnswers.posicionamiento}

PRODUCTO:
- Problema central: ${userAnswers.problema_central}
- Solución técnica: ${userAnswers.solucion_tecnica}
- Diferencial único: ${userAnswers.diferencial_unico}
- Privacidad: ${userAnswers.privacidad_datos}

MERCADO:
- Perfil cliente ideal (ICP): ${userAnswers.perfil_cliente_ideal}
- Alcance geográfico: ${userAnswers.geo_alcance}
- TAM estimado por usuario: ${userAnswers.tam_estimado_usuario || "No proporcionado"}

NEGOCIO:
- Modelo ingresos: ${userAnswers.modelo_ingresos}
- Precio referencia: ${userAnswers.precio_referencia || "No proporcionado"}
- Canales preferidos: ${userAnswers.canales_preferidos?.join(", ") || "Ninguno"}
- Recursos/equipo: ${userAnswers.recursos_equipo || "No proporcionado"}

Devuelve TEXTO ESTRUCTURADO con CATEGORIA, COMPETIDORES (5-8 reales con fuente),
MERCADO (TAM/SAM/SOM con fuentes) y TENDENCIAS (3-5). No devuelvas JSON aquí.`;
}

/**
 * Construye el prompt de ESTRUCTURACIÓN 1b (sin grounding, JSON forzado)
 * FIX A: convierte el texto con grounding de la fase 1a al JSON del schema.
 */
export function buildResearchStructurePrompt(researchText) {
  return `Convierte la siguiente investigación de mercado a JSON EXACTO según el schema.
No añadas texto fuera del JSON. No inventes competidores nuevos: usa solo
los que aparecen en el texto. Si un dato no es verificable, marca verificable: false.

TEXTO DE INVESTIGACIÓN:
${researchText}

Devuelve SOLO el JSON con categoria_producto, competidores (5-8), mercado
(tam/sam/som con fuente_principal y calculado_por) y tendencias (3-5).`;
}

/**
 * Construye el prompt de REDACCIÓN (Llamada 2, 8 secciones, 1150-1300 palabras)
 */
export function buildRedactionPrompt(userAnswers, researchData) {
  const today = new Date().toISOString().split("T")[0];
  return `Redacta el informe ejecutivo completo usando estos datos.
LÍMITE DURO: 1150-1300 palabras totales. No excedas 1300.
NO copies literalmente las respuestas del usuario: reformula, desarrolla
y evita repetir la misma idea en varias secciones.

USER ANSWERS:
${JSON.stringify(userAnswers, null, 2)}

RESEARCH DATA (ya validado):
${JSON.stringify(researchData, null, 2)}

Fecha: ${today}
Modelo de ingresos declarado: ${userAnswers.modelo_ingresos} — aplica la
fórmula de unit economics correspondiente ([CÁLCULO SEGÚN MODELO]).

Genera el informe EXACTAMENTE con la estructura Markdown de 8 secciones
del system prompt. Sin placeholders. Usa researchData para competidores,
mercado y tendencias. Marca [ESTIMACIÓN SISTEMA] donde infieras.`;
}

/**
 * Valida la coherencia numérica del researchData (server-side)
 * @returns { { valid: boolean, errors: string[] } }
 */
export function validateResearchData(researchData) {
  const errors = [];

  if (!researchData?.mercado) {
    errors.push("Falta objeto mercado");
    return { valid: false, errors };
  }

  const { tam, sam, som } = researchData.mercado;

  if (tam?.valor && sam?.valor && tam.valor < sam.valor) {
    errors.push(`TAM (${tam.valor}) debe ser >= SAM (${sam.valor})`);
  }
  if (sam?.valor && som?.valor && sam.valor < som.valor) {
    errors.push(`SAM (${sam.valor}) debe ser >= SOM (${som.valor})`);
  }

  // Validar que hay competidores
  if (!researchData?.competidores || researchData.competidores.length < 5) {
    errors.push("Se requieren mínimo 5 competidores");
  }

  return { valid: errors.length === 0, errors };
}