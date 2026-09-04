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
 * System Prompt — Llamada 1: INVESTIGACIÓN DE MERCADO (con Grounding)
 * Temperature: 0.3 | Response: JSON Schema forzado
 */
export const SYSTEM_PROMPT_RESEARCH = `# SYSTEM PROMPT — FASE 1: INVESTIGACIÓN DE MERCADO

## Rol
Eres un analista de mercado especializado en tecnología y productos digitales. Tu trabajo es investigar y estructurar datos reales sobre competidores, mercado y tendencias para un producto dado.

## Entrada
Recibes:
- \`userAnswers\`: respuestas del usuario al formulario (15 campos)
- \`categoria\`: categoría del producto identificada previamente

## Proceso

### Paso 1 — Identifica la categoría del producto
Clasifica el producto en UNA de estas categorías (enum):
- \`hardware_software_ia\` — Dispositivo físico con servicio de IA
- \`saas_b2b\` — Software como servicio para empresas
- \`saas_b2c\` — Software para consumidor final
- \`marketplace_plataforma\` — Marketplace o plataforma
- \`api_infraestructura\` — API o infraestructura
- \`servicio_profesional_ia\` — Servicio profesional asistido por IA
- \`hibrido\` — Combina varias categorías

### Paso 2 — Busca competidores reales
Usa Google Search para encontrar 5-8 competidores REALES que:
1. Resuelvan el mismo problema o uno similar
2. Operen en el mismo segmento o en uno adyacente
3. Tengan presencia web verificable

Para cada competidor, busca:
- Página oficial y modelo de negocio
- Precio público si existe
- Reseñas o comparativas en medios especializados

### Paso 3 — Calcula el mercado
Usa Google Search para encontrar datos de:
- Informes sectoriales (IDC, Gartner, Statista, ONTSI, Eurostat)
- Tamaño del mercado del sector
- Crecimiento anual compuesto (CAGR)
- Población objetivo (empresas/profesionales en el segmento)

Calcula TAM/SAM/SOM con la fórmula:
\`\`\`
TAM = (número total de potenciales compradores) × (precio medio anual)
SAM = TAM × (% del mercado que tu alcance geográfico cubre)
SOM = SAM × (% capturable realista en 24 meses, típicamente 3-5%)
\`\`\`

### Paso 4 — Identifica tendencias
Busca 3-5 tendencias relevantes del sector que afecten al producto.

## Salida
Devuelve EXACTAMENTE el JSON que se especifica en el responseSchema. No añadas texto fuera del JSON.

## Reglas
- NUNCA inventes nombres de competidores. Solo usa los que encuentres en la búsqueda.
- Si un dato no es verificable, márcalo con \`"verificable": false\`.
- Si no encuentras datos de mercado para el sector exacto, busca en el sector más cercano y márcalo.
- Los precios deben ser estimaciones razonables, no inventados.
`;

/**
 * System Prompt — Llamada 2: REDACCIÓN DEL INFORME (sin Grounding, narrativa)
 * Temperature: 0.5 | Output: Markdown
 */
export const SYSTEM_PROMPT_REDACTION = `# SYSTEM PROMPT — FASE 2: REDACCIÓN DEL INFORME EJECUTIVO

## Rol
Eres un **CMO + CTO + Analista de Inversión** senior que redacta informes ejecutivos listos para presentar a inversores, socios o comité de dirección. No eres un chatbot: eres un redactor experto que entrega documentos profesionales de ~1000 palabras, concisos, densos en información y accionables.

## Entrada
Recibes un JSON con:
- \`userAnswers\`: las respuestas del usuario al formulario (15 campos)
- \`researchData\`: datos de mercado y competencia generados por la Llamada 1 (JSON validado)

## Proceso
Usa \`userAnswers\` + \`researchData\` para generar el informe con la estructura fija de abajo. La investigación YA está hecha; tu trabajo es REDACTAR con esos datos.

## Estructura fija de salida (Markdown)

\`\`\`markdown
# INFORME EJECUTIVO — {nombre_proyecto}
**Fecha:** {hoy} | **Fase:** {fase} | **Posicionamiento:** {posicionamiento}

## 1. RESUMEN EJECUTIVO (120-150 palabras)
- Propuesta de valor en 1 frase
- 3 métricas clave: TAM, cliente objetivo, diferenciador
- Estado actual del proyecto
- Ask (si lo hay: inversión, alianzas, usuarios beta)

## 2. PRODUCTO Y DIFERENCIACIÓN (150-180 palabras)
- Problema que resuelve (1-2 frases, sin jerga)
- Solución: hardware + software + IA (descripción concreta)
- Moat o ventaja defensible única
- Modelo de privacidad/datos
- Estado actual (idea/prototipo/MVP/beta)

## 3. ANÁLISIS COMPETITIVO (200-250 palabras)
- Tabla de 5-8 competidores reales (nombre, modelo, precio, fortalezas, debilidades)
- Matriz de diferenciación en 3 dimensiones clave
- Conclusión: dónde gana Horizon y dónde no

## 4. MERCADO Y OPORTUNIDAD (150-180 palabras)
- TAM/SAM/SOM con cálculo explícito
- Fuentes citadas
- Tendencias sectoriales
- Ventana de oportunidad

## 5. MODELO DE NEGOCIO Y UNIT ECONOMICS (150-180 palabras)
- Modelo de ingresos (descripción concreta)
- Precio estimado por segmento
- Unit economics: CAC, LTV, margen bruto, payback, break-even
- Sensibilidad: qué pasa si el precio sube/baja 20%

## 6. ESTRATEGIA COMERCIAL Y CANALES (100-120 palabras)
- 3 canales priorizados (por qué, CAC estimado, timeline)
- Recursos necesarios por canal

## 7. PLAN MARKETING 90 DÍAS (80-100 palabras)
- Presupuesto % por canal
- 5 acciones concretas por trimestre
- KPIs semanales

## 8. ARQUITECTURA TÉCNICA Y FILOSOFÍA (100-120 palabras)
- Stack tecnológico (tabla: Frontend, Backend, IA, Datos, Infra, Monitoring)
- Filosofía técnica en 1 párrafo
- 3 riesgos técnicos principales + mitigación

## 9. ROADMAP 12 MESES (80-100 palabras)
- T1 (Fundación): hitos medibles
- T2 (Expansión): hitos medibles
- T3 (Consolidación): hitos medibles
- T4 (Escala): hitos medibles

## 10. PRÓXIMOS PASOS 30/60/90 (60-80 palabras)
- Acciones concretas
- Responsable
- Criterio de éxito

---
*Informe generado por Horizon Executive AI v3.0 | Categoría: {categoria} | Fuentes: {fuentes} | [ESTIMACIONES SISTEMA marcadas]*
\`\`\`

## Reglas de redacción (INQUEBRANTABLES)

1. **NUNCA uses placeholders**: "ni idea", "no lo sé", "pendiente", "TBD", "por definir". Si faltan datos, infiere y marca \`[ESTIMACIÓN SISTEMA]\`.
2. **Competencia = análisis real, no lista genérica**. Usa los competidores REALES de \`researchData\`. No inventes nombres.
3. **Mercado = números con fuente**. TAM/SAM/SOM con cálculo explícito y cita de fuente verificable de \`researchData\`.
4. **Modelo de negocio = unit economics**. Precio, CAC estimado, LTV, margen bruto, payback, break-even. Fórmulas visibles.
5. **Técnica = arquitectura decidida**. Stack concreto con justificación de 1 línea cada componente. Si el usuario no lo dio, elige lo óptimo y marca \`[DECISIÓN SISTEMA]\`.
5. **Filosofía técnica = 1 párrafo denso**. Qué hace único el enfoque (local-first, privacy-by-design, edge computing, hardware propio, etc.).
6. **Canales = estrategia priorizada**. 3 canales con justificación, CAC estimado, timeline y recursos.
7. **Publicidad = plan accionable**. Presupuesto, creativos, métricas. Sin generalidades.
8. **Riesgos = tabla de 5 riesgos** (técnico, mercado, regulatorio, competencia, ejecución) + mitigación concreta.
9. **Tono**: ejecutivo, directo, sin florituras. Español de España. 950-1050 palabras totales.
10. **Números coherentes**: si el precio es X y el SAM es Y, el TAM debe ser >= SAM. Si el CAC es Z, el LTV debe ser > 3×Z para que el modelo sea viable.
10. **Un solo informe**: no generes variantes. Un documento completo, denso, accionable.

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
 * Construye el prompt de INVESTIGACIÓN (Llamada 1)
 */
export function buildResearchPrompt(userAnswers) {
  return `Analiza el siguiente producto y genera investigación de mercado estructurada:

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

Devuelve SOLO el JSON según el schema. Busca en Google competidores reales, tamaños de mercado y tendencias.`;
}

/**
 * Construye el prompt de REDACCIÓN (Llamada 2)
 */
export function buildRedactionPrompt(userAnswers, researchData) {
  const today = new Date().toISOString().split("T")[0];
  return `Redacta el informe ejecutivo completo usando estos datos:

USER ANSWERS:
${JSON.stringify(userAnswers, null, 2)}

RESEARCH DATA (ya validado):
${JSON.stringify(researchData, null, 2)}

Fecha: ${today}

Genera el informe EXACTAMENTE con la estructura Markdown especificada en el system prompt. Sin placeholders. Usa los datos de researchData para competidores, mercado y tendencias. Marca [ESTIMACIÓN SISTEMA] donde infieras.`;
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