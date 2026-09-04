/**
 * PROMPTS-DATA.JS — Biblioteca Central de Prompts de Horizon
 * 
 * Estructura de datos canónica para las 8 áreas de desarrollo con IA:
 * Finanzas, Medicina, Derecho, Contabilidad, Matemáticas, Ingeniería, Diseño, Psicología.
 * 
 * Cada área contiene categorías genéricas, categorías por tarea primaria del wizard (x6)
 * y categorías secundarias para auditoría, exportación y alertas.
 */

export const PROMPT_MODELS = {
  GEMINI_FLASH: "Gemini 2.5 Flash",
  CLAUDE_SONNET: "Claude 3.7 Sonnet",
  GPT_4O: "GPT-4o",
  LLAMA_33: "Llama 3.3",
  DEEPSEEK_V4: "DeepSeek V4",
};

export const PROMPT_AREAS = [
  {
    id: "finanzas",
    name: "Finanzas & Mercados",
    color: "#3B6FD4",
    icon: "TrendingUp",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-finanzas.js
    description: "Modelado cuantitativo, backtesting de estrategias, análisis fundamental y control de riesgo de carteras.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para arquitectura, alcance y diseño de cualquier app financiera.",
        prompts: []
      },
      {
        id: "motor-descarga",
        name: "Motor de Descarga y Análisis Fundamental (F1.1)",
        desc: "Extracción y normalización de estados contables, ratios y múltiplos de valoración.",
        prompts: []
      },
      {
        id: "backtesting",
        name: "Simulador de Estrategias Cuantitativas (F1.2)",
        desc: "Validación histórica con walk-forward, costes de fricción y métricas Sharpe/Sortino/Drawdown.",
        prompts: []
      },
      {
        id: "sentimiento",
        name: "Analizador de Sentimiento Financiero (F1.3)",
        desc: "Minería de noticias financieras, extracción de entidades y detección de divergencias precio-noticia.",
        prompts: []
      },
      {
        id: "senales-tecnicas",
        name: "Generador de Señales Técnicas y Filtros (F1.4)",
        desc: "Cálculo determinista de indicadores técnicos, patrones de precio y matrices de alerta.",
        prompts: []
      },
      {
        id: "risk-management",
        name: "Calculadora de Riesgo, VaR y Stress Testing (F1.5)",
        desc: "Modelos de Value at Risk (paramétrico, histórico, Monte Carlo) y pruebas de estrés ante shocks macro.",
        prompts: []
      },
      {
        id: "macro-dashboard",
        name: "Radar Macroeconómico y Curva de Tipos (F1.6)",
        desc: "Monitoreo de variables macro, análisis de política monetaria y modelos de descuento de dividendos.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Auditoría, Exportación y Alertas)",
        desc: "Conciliación de series, exportación con fórmulas, modo DuckDB offline y atribución factorial.",
        prompts: []
      }
    ]
  },
  {
    id: "medicina",
    name: "Medicina & IA Clínica",
    color: "#0D9488",
    icon: "Activity",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-medicina.js
    description: "Auditoría de evidencia PubMed, interoperabilidad FHIR R4, soporte de triaje y resúmenes clínicos SOAP.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para arquitectura médica, normativas de privacidad y contratos clínicos.",
        prompts: []
      },
      {
        id: "auditor-clinico",
        name: "Auditor Clínico y Verificación PubMed (M1.1)",
        desc: "Verificación de afirmaciones clínicas, clasificación de evidencia y detección de interacciones.",
        prompts: []
      },
      {
        id: "pipeline-fhir",
        name: "Pipeline de Normalización FHIR R4 (M1.2)",
        desc: "Extracción a recursos FHIR, codificación SNOMED/LOINC/CIE-10 y bundles interoperables.",
        prompts: []
      },
      {
        id: "adherencia-monitoreo",
        name: "Adherencia y Monitoreo de Pacientes (M1.3)",
        desc: "Agentes de seguimiento ambulatorio, detección precoz de efectos adversos y alertas.",
        prompts: []
      },
      {
        id: "triaje-diagnostico",
        name: "Triaje y Diagnóstico Diferencial (M1.4)",
        desc: "Clasificación de urgencia basada en escalas validadas y ponderación de hipótesis clínicas.",
        prompts: []
      },
      {
        id: "calculadora-medica",
        name: "Calculadora Médica y Razonamiento Fisiológico (M1.5)",
        desc: "Implementación determinista de scores clínicos (CHADS2-VASc, MELD, GFR) con trazabilidad.",
        prompts: []
      },
      {
        id: "analizador-ehr",
        name: "Analizador de EHR y Resumen SOAP (M1.6)",
        desc: "Generación de notas SOAP estructuradas preservando fidelidad temporal y confidencialidad.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Guardrails, Auditoría y Alertas)",
        desc: "Guardrails de seguridad de vida, normalización terminológica, logs inmutables y alertas rojas.",
        prompts: []
      }
    ]
  },
  {
    id: "derecho",
    name: "Derecho & Compliance",
    color: "#991B1B",
    icon: "Scale",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-derecho.js
    description: "Auditoría contractual, análisis de jurisprudencia CENDOJ, compliance penal y detección de cláusulas abusivas.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para diseño de sistemas legales, seguridad jurídica y taxonomías jurídicas.",
        prompts: []
      },
      {
        id: "auditor-contractual",
        name: "Auditor Contractual y Revisión de Riesgos (D1.1)",
        desc: "Extracción de obligaciones, términos de resolución, penalizaciones y matriz de contingencias.",
        prompts: []
      },
      {
        id: "jurisprudencia",
        name: "Análisis Jurisprudencial CENDOJ y Curia (D1.2)",
        desc: "Extracción del fallo, ratio decidendi, citas cruzadas y contradicción de tesis jurisprudencial.",
        prompts: []
      },
      {
        id: "compliance",
        name: "Compliance Normativo y Prevención de Delitos (D1.3)",
        desc: "Matriz de riesgos penales (art. 31 bis CP), canales de denuncia e investigaciones internas.",
        prompts: []
      },
      {
        id: "rag-juridico",
        name: "Asistente RAG Jurídico con Cita Normativa (D1.4)",
        desc: "Recuperación semántica jerárquica con verificación de vigencia de artículos y concordancias.",
        prompts: []
      },
      {
        id: "clausulas-abusivas",
        name: "Detector de Cláusulas Abusivas y Consumo (D1.5)",
        desc: "Contraste con doctrina de tribunales superiores (vencimiento anticipado, gastos hipotecarios, intereses).",
        prompts: []
      },
      {
        id: "due-diligence",
        name: "Due Diligence Automatizada en Operaciones (D1.6)",
        desc: "Revisión masiva de contratos societarios, litigios pendientes, licencias y pasivos ocultos.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Dictámenes, Auditoría y Alertas)",
        desc: "Redacción formal de dictámenes, trazabilidad forense, alertas de reformas legales y exportación PDF.",
        prompts: []
      }
    ]
  },
  {
    id: "contabilidad",
    name: "Contabilidad & ERP",
    color: "#10B981",
    icon: "Calculator",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-contabilidad.js
    description: "Conciliación bancaria automatizada, extracción de facturas, costes analíticos y fiscalidad reglada.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para arquitectura ERP, libros mayores, planes contables y auditoría interna.",
        prompts: []
      },
      {
        id: "conciliacion-bancaria",
        name: "Conciliación Bancaria y Cuadre de Asientos (C1.1)",
        desc: "Matching fuzzy de extractos bancarios con facturas, gestión de discrepancias y redondeos.",
        prompts: []
      },
      {
        id: "automatizacion-facturacion",
        name: "Ingesta OCR y Facturación Electrónica (C1.2)",
        desc: "Extracción estructurada con FacturaE/UBL, validación de NIFs y cálculo desglosado de impuestos.",
        prompts: []
      },
      {
        id: "analisis-costes",
        name: "Contabilidad Analítica y Costes ABC (C1.3)",
        desc: "Asignación de costes directos/indirectos por centro de coste, cálculo de márgenes y umbrales de rentabilidad.",
        prompts: []
      },
      {
        id: "cumplimiento-tributario",
        name: "Cumplimiento Tributario y Modelos Fiscales (C1.4)",
        desc: "Preparación de libros de IVA, retenciones de IRPF, impuesto de sociedades y modelos oficiales.",
        prompts: []
      },
      {
        id: "dashboard-financiero",
        name: "Cuadro de Mando Contable y Ratios (C1.5)",
        desc: "Monitoreo del fondo de maniobra, período medio de cobro (PMC), apalancamiento y rentabilidad ROA/ROE.",
        prompts: []
      },
      {
        id: "auditoria-contable",
        name: "Auditoría Contable y Detección de Anomalías (C1.6)",
        desc: "Aplicación de la Ley de Benford, detección de pagos duplicados y pruebas de integridad de saldos.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Exportación ERP, Cierre y Auditoría)",
        desc: "Puentes hacia SAGE/A3/Holded, automatización de asientos de cierre y amortizaciones periódicas.",
        prompts: []
      }
    ]
  },
  {
    id: "matematicas",
    name: "Matemáticas & Complejidad",
    color: "#6366F1",
    icon: "Binary",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-matematicas.js
    description: "Simulación Monte Carlo, optimización combinatoria, resolución de EDOs y teoría espectral de grafos.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para computación simbólica, precisión de coma flotante y validación matemática.",
        prompts: []
      },
      {
        id: "simulacion-estocastica",
        name: "Auditor Lógico y Verificador Simbólico (M4.1)",
        desc: "Verificación formal de algoritmos, reducción simbólica y comprobación axiomática.",
        prompts: []
      },
      {
        id: "optimizacion-combinatoria",
        name: "Optimización Combinatoria y Solvers MILP (M4.2)",
        desc: "Modelado simplex, programación lineal entera mixta (MIP) y problemas de asignación cuadrática.",
        prompts: []
      },
      {
        id: "analisis-numerico",
        name: "Análisis Numérico y EDOs Rígidas (M4.3)",
        desc: "Integración Runge-Kutta, cálculo de raíces con Newton-Raphson y resolución de sistemas dispersos.",
        prompts: []
      },
      {
        id: "teoria-grafos",
        name: "Teoría de Grafos y Complejidad de Redes (M4.4)",
        desc: "Cálculo de centralidad, detección de comunidades, flujos máximos y espectro del laplaciano.",
        prompts: []
      },
      {
        id: "caos-dinamicos",
        name: "Sistemas Dinámicos y Atractores Caóticos (M4.5)",
        desc: "Cálculo de exponentes de Lyapunov, diagramas de bifurcación y modelado del atractor de Lorenz.",
        prompts: []
      },
      {
        id: "visualizacion-matematica",
        name: "Visualización Matemática y Espacios 3D (M4.6)",
        desc: "Generación de mallas de variedades algebraicas, campos vectoriales y animación de transformaciones.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Pruebas Formales, LaTeX y Benchmarks)",
        desc: "Verificación simbólica con SymPy, formateo LaTeX riguroso y análisis de complejidad asintótica Big-O.",
        prompts: []
      }
    ]
  },
  {
    id: "ingenieria",
    name: "Ingeniería & Arquitectura",
    color: "#F97316",
    icon: "Cpu",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-ingenieria.js
    description: "Cálculo de estructuras, auditoría de modelos BIM/IFC, valor ganado en obra y simulación energética.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para flujos CAD/BIM, trazabilidad normativa técnica y control de ingeniería.",
        prompts: []
      },
      {
        id: "analisis-estructural",
        name: "Generador de Distribuciones Espaciales (I1.1)",
        desc: "Optimización funcional de plantas arquitectónicas y recorridos espaciales eficientes.",
        prompts: []
      },
      {
        id: "optimizacion-bim",
        name: "Auditoría BIM y Validación IFC (I1.2)",
        desc: "Detección de interferencias geométricas (clash detection), verificación de parámetros y cubicaciones.",
        prompts: []
      },
      {
        id: "gestion-proyectos",
        name: "Planificación de Obra y Valor Ganado (I1.3)",
        desc: "Cálculo del camino crítico (CPM), métricas CPI/SPI, curvas 'S' de avance y mitigación de retrasos.",
        prompts: []
      },
      {
        id: "control-calidad",
        name: "Control de Calidad y Tolerancias (I1.4)",
        desc: "Planes de puntos de inspección (PPI), ensayos de resistencia y recepción conforme de suministros.",
        prompts: []
      },
      {
        id: "simulacion-ambiental",
        name: "Motor de Optimización MDO (I1.5)",
        desc: "Optimización multidisciplinar de envolventes térmicas, huella de carbono y estructuras de mínima masa.",
        prompts: []
      },
      {
        id: "documentacion-tecnica",
        name: "Generación de Memorias y Pliegos (I1.6)",
        desc: "Redacción automatizada de especificaciones técnicas, cuadros de precios descompuestos y anejos.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Exportación DXF/CSV, Logs y Alertas)",
        desc: "Extracción a formatos de dibujo, cuadernos de bitácora digitalizados y alertas de sobrecostes.",
        prompts: []
      }
    ]
  },
  {
    id: "diseno",
    name: "Diseño & UX",
    color: "#EC4899",
    icon: "Palette",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-diseno.js
    description: "Auditorías heurísticas de usabilidad, arquitectura de design tokens, accesibilidad WCAG 2.2 y testing UX.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para arquitectura de información, wireframing semántico y heurísticas visuales.",
        prompts: []
      },
      {
        id: "auditoria-ux",
        name: "Auditoría Heurística de Usabilidad (DS1.1)",
        desc: "Evaluación rigurosa de interfaces bajo las 10 heurísticas de Nielsen con matriz de severidad.",
        prompts: []
      },
      {
        id: "sistema-diseno",
        name: "Design Tokens y Componentes UI (DS1.2)",
        desc: "Estructuración de tokens de color, tipografía, espaciado y contratos de componentes accesibles.",
        prompts: []
      },
      {
        id: "prototipado",
        name: "Especificación de Interacciones y Flujos (DS1.3)",
        desc: "Definición de estados de interacción (hover, focus, active, disabled), micro-animaciones y feedback.",
        prompts: []
      },
      {
        id: "investigacion-usuarios",
        name: "Investigación Cualitativa y Customer Journey (DS1.4)",
        desc: "Síntesis de tests con usuarios, mapas de empatía, arquetipos (personas) y matrices de fricción.",
        prompts: []
      },
      {
        id: "accesibilidad",
        name: "Auditoría WCAG 2.2 AA/AAA y ARIA (DS1.5)",
        desc: "Verificación de ratios de contraste, foco visible, navegación por teclado y roles ARIA nativos.",
        prompts: []
      },
      {
        id: "branding-ia",
        name: "Identidad de Marca y Tono de Voz (DS1.6)",
        desc: "Elaboración de manuales de estilo verbal, personalidad de producto y guías de redacción de microcopy.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Exportación Figma/CSS, A/B Testing)",
        desc: "Traducción de tokens a CSS/Tailwind, diseño de variantes para tests A/B y métricas SUS/NPS.",
        prompts: []
      }
    ]
  },
  {
    id: "psicologia",
    name: "Psicología & Creatividad",
    color: "#D97706",
    icon: "Brain",
    promptCount: 55, // 55 prompts reales — mantener en sync con prompts-psicologia.js
    description: "Evaluación psicométrica, formulación cognitivo-conductual, registro de conducta y pensamiento divergente.",
    categories: [
      {
        id: "genericos",
        name: "Genéricos por App Type",
        desc: "Prompts fundacionales para ética psicológica (código deontológico APA), privacidad y alianza terapéutica.",
        prompts: []
      },
      {
        id: "evaluacion-psicologica",
        name: "Evaluación Psicométrica y Baremos (P1.1)",
        desc: "Interpretación estadística de percentiles en instrumentos validados (BDI, STAI, MMPI) sin diagnósticos automáticos.",
        prompts: []
      },
      {
        id: "terapia-asistida",
        name: "Motor de Pensamiento Divergente (P1.2)",
        desc: "Estimulación de asociaciones remotas, técnicas de pensamiento lateral y desarticulación de bloqueos creativos.",
        prompts: []
      },
      {
        id: "analisis-conductual",
        name: "Simulador de Negociación con Teoría de la Mente (P1.3)",
        desc: "Modelado de intenciones mutuas, gestión de conversaciones difíciles y resolución de conflictos interpersonales.",
        prompts: []
      },
      {
        id: "bienestar-mindfulness",
        name: "Analizador de Clima Afectivo (P1.4)",
        desc: "Evaluación del estado de ánimo colectivo y cohesión de equipos según el modelo circunflejo de Russell.",
        prompts: []
      },
      {
        id: "creatividad-asistida",
        name: "Detector de Sesgos Cognitivos (P1.5)",
        desc: "Identificación de sesgos de confirmación, anclaje y coste hundido en razonamientos y decisiones estratégicas.",
        prompts: []
      },
      {
        id: "investigacion-cualitativa",
        name: "Asistente de Psicoeducación y Hábitos (P1.6)",
        desc: "Pautas psicoeducativas sobre higiene del sueño, regulación emocional y refuerzo positivo de hábitos.",
        prompts: []
      },
      {
        id: "secundarios",
        name: "Tareas Secundarias (Anonimización PII, Guardrails Éticos)",
        desc: "Anonimización clínica estricta, detección de señales de riesgo autolítico y protocolos de derivación urgente.",
        prompts: []
      }
    ]
  }
];

/**
 * Registra o actualiza los prompts de un área específica.
 * Permite la carga modular desde los archivos de cada área (prompts-finanzas.js, etc.)
 */
export function registerAreaPrompts(areaId, categories) {
  const area = PROMPT_AREAS.find(a => a.id === areaId);
  if (!area) {
    console.warn(`[Horizon Prompts] Área no encontrada: ${areaId}`);
    return;
  }
  area.categories = categories;
}

/**
 * Carga perezosa de los prompts por área (optimización S1-08).
 * Cada archivo prompts-<area>.js se convierte en un chunk lazy separado
 * (import.meta.glob de Vite) que solo se descarga al entrar en su área
 * o al realizar una búsqueda global. Los metadatos de PROMPT_AREAS quedan
 * en el bundle de la página mientras los datos pesados (~781 kB) se difieren.
 */

/** Total de prompts verificados en el catálogo (8 áreas × 55) — mantener en sync */
export const TOTAL_PROMPTS = 440;

const AREA_PROMPT_MODULES = import.meta.glob("./prompts-*.js");
const loadedAreas = new Set();

/**
 * Carga (una única vez) los prompts de un área y los registra en PROMPT_AREAS.
 * @param {string} areaId
 * @returns {Promise<void>}
 */
export async function loadAreaPrompts(areaId) {
  if (loadedAreas.has(areaId)) return;
  const area = PROMPT_AREAS.find((a) => a.id === areaId);
  if (!area) {
    console.warn(`[Horizon Prompts] Área no encontrada: ${areaId}`);
    return;
  }
  const modulePath = `./prompts-${areaId}.js`;
  const importFn = AREA_PROMPT_MODULES[modulePath];
  if (!importFn) {
    console.warn(`[Horizon Prompts] Módulo de datos no encontrado: ${modulePath}`);
    return;
  }
  const mod = await importFn();
  const categoriesKey = `${areaId.toUpperCase()}_CATEGORIES`;
  const categories = mod[categoriesKey];
  if (Array.isArray(categories)) {
    registerAreaPrompts(areaId, categories);
    loadedAreas.add(areaId);
  } else {
    console.warn(`[Horizon Prompts] Export ${categoriesKey} no encontrado en ${modulePath}`);
  }
}

/**
 * Carga todos los prompts del catálogo (búsqueda global y conteos).
 * @returns {Promise<void>}
 */
export async function loadAllPrompts() {
  await Promise.all(PROMPT_AREAS.map((a) => loadAreaPrompts(a.id)));
}

/**
 * Las 6 Fases del Proyecto de Horizon (Modo B)
 */
export const PROJECT_PHASES = [
  {
    id: "idea-y-planificacion",
    name: "Idea y Planificación",
    icon: "Lightbulb",
    desc: "Definir qué construir, para quién, con qué recursos y métricas de éxito.",
  },
  {
    id: "investigacion",
    name: "Investigación",
    icon: "Search",
    desc: "Fuentes de datos, APIs externas, literatura científica y benchmarks.",
  },
  {
    id: "diseno",
    name: "Diseño",
    icon: "Layout",
    desc: "Arquitectura de software, modelado de datos, contratos e interfaz UI/UX.",
  },
  {
    id: "desarrollo",
    name: "Desarrollo",
    icon: "Code",
    desc: "Código de algoritmos, lógica de negocio, pipelines y agentes de IA.",
  },
  {
    id: "pruebas",
    name: "Pruebas",
    icon: "CheckCircle2",
    desc: "Validación funcional, tests de estrés, guardrails éticos y no-alucinación.",
  },
  {
    id: "lanzamiento",
    name: "Lanzamiento",
    icon: "Rocket",
    desc: "Documentación técnica para visado, exportación de informes y despliegue.",
  },
];

/**
 * Herramientas por área para enriquecimiento
 */
const AREA_DEFAULT_TOOLS = {
  finanzas: ["Python", "Pandas", "DuckDB", "OpenBB", "NumPy"],
  medicina: ["FHIR R4", "PubMed API", "Python", "FastAPI", "Pydantic"],
  derecho: ["BOE API", "ChromaDB", "Pydantic", "Python", "CENDOJ"],
  contabilidad: ["DuckDB", "FacturaE", "SII AEAT", "Python", "Excel"],
  matematicas: ["NumPy", "SymPy", "HiGHS", "SciPy", "KaTeX"],
  ingenieria: ["IfcOpenShell", "NumPy", "SciPy", "SVG", "OpenBIM"],
  diseno: ["CSS clamp()", "Style Dictionary", "Tailwind", "W3C DTCG"],
  psicologia: ["DuckDB", "Flet", "Python", "Pydantic", "TCC"],
};

/**
 * Enriquecedor de metadatos para cada prompt
 */
export function enrichPrompt(p, area, cat, index = 0) {
  const tags = p.tags || [];
  
  // 1. Fase
  let phase = "desarrollo";
  if (cat.id === "genericos" || tags.some(t => ["planificacion", "alcance", "inicio", "especificacion", "diseño"].includes(t))) {
    phase = "idea-y-planificacion";
  } else if (tags.some(t => ["datos", "api", "fuentes", "extraccion", "pubmed", "boe", "cendoj", "mercado"].includes(t))) {
    phase = "investigacion";
  } else if (tags.some(t => ["arquitectura", "esquema", "modelo", "tokens", "fhir", "diagrama"].includes(t))) {
    phase = "diseno";
  } else if (tags.some(t => ["auditoria", "pruebas", "validacion", "compliance", "riesgo", "seguridad"].includes(t))) {
    phase = "pruebas";
  } else if (tags.some(t => ["despliegue", "exportacion", "documentacion", "monitoreo", "informe"].includes(t))) {
    phase = "lanzamiento";
  } else {
    const phases = ["idea-y-planificacion", "investigacion", "diseno", "desarrollo", "pruebas", "lanzamiento"];
    phase = phases[index % phases.length];
  }

  // 2. Dificultad
  let difficulty = "intermedio";
  if (phase === "idea-y-planificacion" || index % 3 === 0) difficulty = "principiante";
  else if (index % 3 === 2) difficulty = "avanzado";

  // 3. Herramientas
  const tools = p.tools || AREA_DEFAULT_TOOLS[area.id] || ["Python", "DuckDB"];

  // 4. Popular
  const popular = p.popular ?? (index % 4 === 0);

  // 5. Ejemplo
  const example = p.example || `App para ${p.title.toLowerCase()} en producción`;

  return {
    ...p,
    areaId: area.id,
    areaName: area.name,
    areaColor: area.color,
    categoryId: cat.id,
    categoryName: cat.name,
    phase,
    difficulty,
    tools,
    popular,
    example,
  };
}

/**
 * Devuelve todos los prompts del catálogo aplanados y enriquecidos.
 */
export function getAllPrompts(areas = PROMPT_AREAS) {
  const all = [];
  let counter = 0;
  areas.forEach(area => {
    area.categories.forEach(cat => {
      cat.prompts.forEach(p => {
        all.push(enrichPrompt(p, area, cat, counter++));
      });
    });
  });
  return all;
}

/**
 * Busca un prompt por su código identificador único (ej: "fin-001").
 */
export function getPromptById(promptId, areas = PROMPT_AREAS) {
  for (const area of areas) {
    for (const cat of area.categories) {
      const matchIndex = cat.prompts.findIndex(p => p.id === promptId);
      if (matchIndex !== -1) {
        return enrichPrompt(cat.prompts[matchIndex], area, cat, matchIndex);
      }
    }
  }
  return null;
}

/**
 * Devuelve todos los prompts pertenecientes a un área temática enriquecidos.
 */
export function getPromptsByArea(areaId, areas = PROMPT_AREAS) {
  const area = areas.find(a => a.id === areaId);
  if (!area) return [];
  const list = [];
  let counter = 0;
  area.categories.forEach(cat => {
    cat.prompts.forEach(p => {
      list.push(enrichPrompt(p, area, cat, counter++));
    });
  });
  return list;
}

/**
 * Filtro universal por texto, área, categoría, modelo, fase y tags.
 */
export function searchPrompts(query = "", filters = {}, areas = PROMPT_AREAS) {
  const { areaId, categoryId, model, tag, phase, difficulty } = filters;
  const q = query.trim().toLowerCase();
  const all = getAllPrompts(areas);

  return all.filter(p => {
    if (areaId && p.areaId !== areaId) return false;
    if (categoryId && p.categoryId !== categoryId) return false;
    if (model && p.model !== model) return false;
    if (phase && p.phase !== phase) return false;
    if (difficulty && p.difficulty !== difficulty) return false;
    if (tag && (!p.tags || !p.tags.includes(tag))) return false;
    if (!q) return true;

    return (
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      (p.tools && p.tools.some(tool => tool.toLowerCase().includes(q)))
    );
  });
}

/**
 * Obtiene el conjunto de etiquetas únicas de un área o de todo el catálogo.
 */
export function getAllTags(areaId = null, areas = PROMPT_AREAS) {
  const prompts = areaId ? getPromptsByArea(areaId, areas) : getAllPrompts(areas);
  const tagSet = new Set();
  prompts.forEach(p => {
    if (p.tags) {
      p.tags.forEach(t => tagSet.add(t));
    }
  });
  return Array.from(tagSet).sort();
}
