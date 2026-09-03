/**
 * EXECUTIVE-SUMMARY-CONFIG.JS — Configuración del Sistema de Resumen Ejecutivo
 * 
 * Define:
 * 1. Las 8 secciones estructuradas y las 20 preguntas del formulario de pitch.
 * 2. Valores iniciales del formulario.
 * 3. Configuración de modelos y proveedores de IA (Gemini, Mistral, Together).
 * 4. Generador del prompt maestro de marketing y negocio para inversores.
 */

export const INITIAL_FORM_DATA = {
  // Sección 1: El Producto
  nombre: "",
  descripcion: "",
  problema: "",
  caracteristicas: "",
  posicion: "equilibrada",

  // Sección 2: El Mercado
  publicoObjetivo: "",
  tamanoMercado: "",
  competencia: "",

  // Sección 3: Producto Competidor
  tipoCompetidor: "",
  precioMercado: "",

  // Sección 4: Publicidad y Distribución
  canalesDistribucion: "",
  publicidad: "",

  // Sección 5: Presencia Digital
  disenoWeb: "si",
  autoaprendizaje: "si",

  // Sección 6: Proveedores e Infraestructura
  proveedores: "",
  calidadProducto: "",

  // Sección 7: La Solución
  diferenciador: "",
  tecnologia: "",
  estadoActual: "prototipo",

  // Sección 8: El Negocio
  modeloIngresos: "freemium",
};

export const SUMMARY_SECTIONS = [
  {
    id: "producto",
    number: 1,
    title: "El Producto",
    subtitle: "Identidad, propuesta de valor y posicionamiento",
    iconName: "Package",
    questions: [
      {
        id: "nombre",
        label: "¿Cómo quieres que conozcan a tu producto? (marca comercial)",
        placeholder: "Ej: Horizon AI, DataPulse, OmniLegal...",
        type: "text",
        required: true,
        hint: "El nombre debe ser memorable, claro y alineado con la industria.",
      },
      {
        id: "descripcion",
        label: "¿Qué hace tu producto? Características y especialidad",
        placeholder: "Dos o tres frases sencillas que cualquier persona entienda...",
        type: "textarea",
        required: true,
        hint: "Explica la función principal y el resultado directo para el usuario.",
      },
      {
        id: "problema",
        label: "¿Qué problema real resuelve?",
        placeholder: "¿Quién tiene este dolor hoy y cómo intenta solucionarlo actualmente?",
        type: "textarea",
        required: true,
        hint: "Identifica el coste económico, temporal o emocional de no tener tu solución.",
      },
      {
        id: "caracteristicas",
        label: "¿Qué la hace diferente de lo existente en el mercado?",
        placeholder: "¿Qué has pensado para diferenciarte frente a las alternativas actuales?",
        type: "textarea",
        required: true,
        hint: "Detalla innovaciones de producto, automatizaciones o enfoque específico.",
      },
      {
        id: "posicion",
        label: "¿Cómo quieres enfocar el producto en el mercado?",
        placeholder: "Exclusivo, eficiente, económico o una combinación...",
        type: "select",
        options: [
          { value: "exclusivo", label: "Exclusivo / Premium (Alta gama y personalización)" },
          { value: "eficiente", label: "Eficiente / Productividad (Velocidad y fiabilidad operativa)" },
          { value: "economico", label: "Económico / Accesible (Bajo coste y penetración masiva)" },
          { value: "equilibrada", label: "Híbrido equilibrado (Calidad profesional a precio competitivo)" },
        ],
        required: true,
      },
    ],
  },
  {
    id: "mercado",
    number: 2,
    title: "El Mercado",
    subtitle: "Público objetivo y dimensión de la oportunidad",
    iconName: "Users",
    questions: [
      {
        id: "publicoObjetivo",
        label: "¿Para quién podría ser el producto? (Perfil de usuario ideal)",
        placeholder: "Ej: Despachos de abogados medianos, médicos en consulta privada, analistas financieros...",
        type: "textarea",
        required: true,
        hint: "Segmento demográfico, tamaño de empresa o rol profesional del comprador.",
      },
      {
        id: "tamanoMercado",
        label: "¿Cuántas personas o empresas se beneficiarían? (Números aproximados)",
        placeholder: "Ej: 15.000 clínicas en España, 120.000 despachos en LATAM, 2M de autónomos...",
        type: "text",
        required: true,
        hint: "Menciona estimaciones de TAM (Total Addressable Market) o SAM si las conoces.",
      },
      {
        id: "competencia",
        label: "¿Qué soluciones existen hoy en el mercado?",
        placeholder: "Herramientas existentes, aplicaciones, software heredado o procesos manuales...",
        type: "textarea",
        required: true,
        hint: "Incluye competidores directos, indirectos y el uso habitual de hojas de cálculo.",
      },
    ],
  },
  {
    id: "competidor",
    number: 3,
    title: "Producto Competidor",
    subtitle: "Comparativa y referencias de precios",
    iconName: "TrendingDown",
    questions: [
      {
        id: "tipoCompetidor",
        label: "¿Cómo o qué ofrece nuestra competencia?",
        placeholder: "Detalla los productos que hoy sustituyen o compiten con nuestra propuesta...",
        type: "textarea",
        required: true,
        hint: "Funcionalidades que tienen bien resueltas y carencias habituales.",
      },
      {
        id: "precioMercado",
        label: "¿Cuál es el rango de precios de los competidores?",
        placeholder: "Ej: Desde 29€/mes hasta 350€/mes por usuario, o pago único de 1.200€...",
        type: "text",
        required: true,
        hint: "Precios de suscripción, licencias anuales o modelos de cobro por uso.",
      },
    ],
  },
  {
    id: "distribucion",
    number: 4,
    title: "Publicidad y Distribución",
    subtitle: "Estrategia comercial y canales de atracción",
    iconName: "Megaphone",
    questions: [
      {
        id: "canalesDistribucion",
        label: "¿Qué canales de distribución hay y cuáles trabaja la competencia?",
        placeholder: "Venta directa B2B, marketplaces, integradores, canal online autoservicio...",
        type: "textarea",
        required: true,
        hint: "¿Por dónde llega el cliente al producto final?",
      },
      {
        id: "publicidad",
        label: "¿Canales de publicación y promoción previstos? (Coste y esfuerzo)",
        placeholder: "SEO, contenido técnico en LinkedIn, Google Ads, webinars, eventos del sector...",
        type: "textarea",
        required: true,
        hint: "Evalúa qué canal ofrece menor coste de adquisición (CAC) con mayor conversión.",
      },
    ],
  },
  {
    id: "presencia",
    number: 5,
    title: "Presencia Digital",
    subtitle: "Desarrollo web y estrategia técnica inicial",
    iconName: "Globe",
    questions: [
      {
        id: "disenoWeb",
        label: "¿Crearías una web profesional con herramientas open source asistidas por IA?",
        placeholder: "Sí, considero clave tener landing page propia con stack moderno (React, Vite, Tailwind)...",
        type: "select",
        options: [
          { value: "si", label: "Sí, con stack web moderno (React, Vite, Tailwind, Open Source)" },
          { value: "no-code", label: "Prefiero plataformas No-Code (Webflow, Framer, WordPress)" },
          { value: "subcontratado", label: "Delegado a una agencia o desarrollador externo" },
        ],
        required: true,
      },
      {
        id: "autoaprendizaje",
        label: "¿Estarías dispuesto a dedicar 5-15€ y tiempo para crear tu web profesional?",
        placeholder: "Inversión en dominio, hosting estático y aprendizaje guiado...",
        type: "select",
        options: [
          { value: "si", label: "Sí, totalmente dispuesto a invertir tiempo y micro-presupuesto" },
          { value: "solo-tiempo", label: "Dispuesto a invertir tiempo pero con herramientas 100% gratuitas" },
          { value: "solo-presupuesto", label: "Prefiero pagar más para que otro lo construya" },
        ],
        required: true,
      },
    ],
  },
  {
    id: "infraestructura",
    number: 6,
    title: "Proveedores e Infraestructura",
    subtitle: "Cadena de suministro técnico y estándares",
    iconName: "Server",
    questions: [
      {
        id: "proveedores",
        label: "¿Con qué empresas y proveedores nos relacionamos? (Proveedores y coste)",
        placeholder: "Cloud (Vercel, AWS), LLMs (Gemini, Anthropic, Mistral), bases de datos (DuckDB, Supabase)...",
        type: "textarea",
        required: true,
        hint: "Enumera servicios de infraestructura y costes fijos/variables mensuales.",
      },
      {
        id: "calidadProducto",
        label: "Estándar de calidad del producto: ¿Cómo aseguramos el nivel requerido?",
        placeholder: "Tests automatizados, auditorías de seguridad, métricas de latencia, SLA...",
        type: "textarea",
        required: true,
        hint: "Protocolos de QA, precisión de modelos y soporte al cliente.",
      },
    ],
  },
  {
    id: "solucion",
    number: 7,
    title: "La Solución",
    subtitle: "Arquitectura técnica y grado de madurez",
    iconName: "Cpu",
    questions: [
      {
        id: "diferenciador",
        label: "¿Qué hace tu app que otras no hacen?",
        placeholder: "Capacidades únicas, procesamiento local seguro, integración nativa de IA...",
        type: "textarea",
        required: true,
        hint: "La ventaja competitiva difícilmente replicable a corto plazo (Moat).",
      },
      {
        id: "tecnologia",
        label: "¿Qué tecnologías usa? (Lenguajes, frameworks, APIs, modelos de IA)",
        placeholder: "Ej: Python, React, DuckDB, FastAPI, Gemini 2.5 Flash, Claude 3.7 Sonnet...",
        type: "text",
        required: true,
        hint: "Stack de frontend, backend, almacenamiento y modelos fundacionales.",
      },
      {
        id: "estadoActual",
        label: "¿En qué fase está tu app?",
        type: "select",
        options: [
          { value: "idea", label: "Fase Idea (Conceptualización y definición)" },
          { value: "prototipo", label: "Prototipo / PoC (Validación de viabilidad técnica)" },
          { value: "funcional", label: "MVP Funcional (Primeros usuarios beta probando)" },
          { value: "produccion", label: "En Producción (Facturando y con usuarios activos)" },
        ],
        required: true,
      },
    ],
  },
  {
    id: "negocio",
    number: 8,
    title: "El Negocio",
    subtitle: "Modelo de ingresos y sostenibilidad financiera",
    iconName: "Coins",
    questions: [
      {
        id: "modeloIngresos",
        label: "¿Cómo generaría dinero? (Modelo de monetización)",
        placeholder: "Suscripción mensual/anual SaaS, freemium, pago por uso de tokens, licencia perpetua...",
        type: "select",
        options: [
          { value: "freemium", label: "Freemium (Capa gratuita + planes Pro / Enterprise)" },
          { value: "suscripcion", label: "Suscripción Pura SaaS (Planes mensuales o anuales)" },
          { value: "pago-por-uso", label: "Consumo / Pago por uso (Créditos o transacciones)" },
          { value: "licencia", label: "Licencia de software o despliegue On-Premise" },
          { value: "servicios", label: "Servicios profesionales + plataforma tecnológica" },
        ],
        required: true,
      },
    ],
  },
];

export const API_PROVIDERS = [
  {
    id: "gemini",
    name: "Gemini 2.5 Flash",
    provider: "Google Cloud",
    model: "gemini-2.5-flash",
    isFree: true,
    rateLimitDesc: "15 requests/minuto (Nivel gratuito)",
    proxyUrl: "/api/gemini/v1beta/models/gemini-2.5-flash:generateContent",
    envKey: "VITE_GEMINI_API_KEY",
  },
  {
    id: "mistral",
    name: "Mistral Small",
    provider: "Mistral AI",
    model: "mistral-small-latest",
    isFree: true,
    rateLimitDesc: "1 req/segundo (Plan gratuito La Plateforme)",
    endpointUrl: "https://api.mistral.ai/v1/chat/completions",
    envKey: "VITE_MISTRAL_API_KEY",
  },
  {
    id: "together",
    name: "Together AI (Llama 3.3 70B)",
    provider: "Together AI",
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    isFree: true,
    rateLimitDesc: "Crédito inicial gratuito incluido",
    endpointUrl: "https://api.together.xyz/v1/chat/completions",
    envKey: "VITE_TOGETHER_API_KEY",
  },
];

/**
 * Compila el prompt formal estructurado con las 20 respuestas del formulario
 * para generar las 12 secciones de pitch ante inversores y socios.
 */
export function buildExecutivePrompt(formData) {
  return `Eres un consultor senior de marketing digital y estrategia empresarial con 20 años de experiencia en pitches para inversores, aceleradoras y socios comerciales.

Genera un INFORME EJECUTIVO DE MARKETING COMPLETO en formato Markdown basado en estas respuestas:

=== EL PRODUCTO ===
MARCA COMERCIAL: ${formData.nombre || "No especificado"}
DESCRIPCIÓN: ${formData.descripcion || "No especificado"}
PROBLEMA QUE RESUELVE: ${formData.problema || "No especificado"}
CARACTERÍSTICAS ESPECIALES: ${formData.caracteristicas || "No especificado"}
POSICIÓN DE MERCADO: ${formData.posicion || "Equilibrada"}

=== EL MERCADO ===
PÚBLICO OBJETIVO: ${formData.publicoObjetivo || "No especificado"}
TAMAÑO DE MERCADO: ${formData.tamanoMercado || "No especificado"}
COMPETENCIA ACTUAL: ${formData.competencia || "No especificado"}

=== PRODUCTO COMPETIDOR ===
TIPO DE PRODUCTO COMPETIDOR: ${formData.tipoCompetidor || "No especificado"}
PRECIOS DE MERCADO: ${formData.precioMercado || "No especificado"}

=== PUBLICIDAD Y DISTRIBUCIÓN ===
CANALES DE DISTRIBUCIÓN: ${formData.canalesDistribucion || "No especificado"}
ESTRATEGIA DE PUBLICIDAD: ${formData.publicidad || "No especificado"}

=== PRESENCIA DIGITAL ===
DISEÑO WEB: ${formData.disenoWeb || "Open Source con IA"}
AUTOAPRENDIZAJE: ${formData.autoaprendizaje || "Dispuesto"}

=== PROVEEDORES E INFRAESTRUCTURA ===
PROVEEDORES: ${formData.proveedores || "No especificado"}
ESTÁNDAR DE CALIDAD: ${formData.calidadProducto || "No especificado"}

=== LA SOLUCIÓN ===
DIFERENCIADOR: ${formData.diferenciador || "No especificado"}
TECNOLOGÍA: ${formData.tecnologia || "No especificado"}
ESTADO ACTUAL: ${formData.estadoActual || "Prototipo"}

=== EL NEGOCIO ===
MODELO DE INGRESOS: ${formData.modeloIngresos || "Suscripción / Freemium"}

Genera un documento estructurado con exactamente estas 12 secciones numeradas:

1. RESUMEN EJECUTIVO (3-4 líneas sintetizando qué es, para quién y por qué es relevante).
2. ANÁLISIS DEL PRODUCTO (descripción detallada, posicionamiento y propuesta de valor única).
3. MAPA DE COMPETENCIA (tabla comparativa de competidores con precios, canales y factores diferenciadores).
4. ANÁLISIS DE MERCADO (tamaño TAM/SAM/SOM, segmentos prioritarios, tendencias y ventana de oportunidad).
5. ESTRATEGIA DE PRECIO (propuesta de precio formalmente justificada vs alternativas del mercado).
6. CANALES DE DISTRIBUCIÓN (estrategia detallada por canal, orden de prioridad y costes estimados de despliegue).
7. PLAN DE PUBLICIDAD Y MARKETING (canales prioritarios, presupuesto estimado y KPIs de adquisición).
8. PRESENCIA DIGITAL (estrategia de sitio web, redes sociales, posicionamiento SEO/SEM y marketing de contenidos).
9. INFRAESTRUCTURA Y PROVEEDORES (tabla de proveedores con costes operativos mensuales y arquitectura tecnológica).
10. MODELO DE NEGOCIO (fuente principal de ingresos, unit economics, márgenes brutos y punto de equilibrio / break-even).
11. PROYECCIÓN A 12 MESES (objetivos trimestrales Q1 a Q4 con métricas clave de tracción).
12. PRÓXIMOS PASOS (plan de acción ejecutable a 30, 60 y 90 días).

Reglas estrictas de redacción:
- CERO EMOJIS en todo el informe. Utiliza exclusivamente formato Markdown sobrio y profesional.
- Usa tablas comparativas con formato Markdown (| Columna | ...) siempre que aporte claridad.
- Incluye números, estimaciones realistas y porcentajes concretos.
- Señala riesgos objetivos y sus correspondientes medidas mitigadoras.
- Tono: Ejecutivo, riguroso, persuasivo y sin jerga vacía.
- Longitud: Entre 1.500 y 2.500 palabras.
- Formato: Markdown listo para exportar o presentar en comités de inversión.`;
}
