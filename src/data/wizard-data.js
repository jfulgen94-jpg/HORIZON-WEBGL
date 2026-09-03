/**
 * WIZARD-DATA.JS — Datos y Configuración Compartida para los Asistentes (Wizards) de Horizon
 * Centraliza los pasos, restricciones transversales, formatos de salida y motores de estimación.
 */

/**
 * Definición canónica de los 4 pasos comunes de configuración para cualquier Wizard de Horizon
 */
export const WIZARD_STEPS = [
  {
    id: "definition",
    stepNumber: 1,
    title: "Definición del Problema y Alcance",
    desc: "Identifica la tarea primaria de tu sector, tareas accesorias y el público objetivo de la solución.",
    configures: [
      "Tarea primaria del dominio profesional (ej. F1.1, M1.2, D1.3)",
      "Tareas secundarias de soporte, persistencia y trazabilidad",
      "Público objetivo y rol funcional del usuario final",
      "Nombre identificativo del proyecto y resumen funcional"
    ]
  },
  {
    id: "architecture",
    stepNumber: 2,
    title: "Arquitectura Técnica y Datos",
    desc: "Selecciona el stack tecnológico, motor de persistencia, interfaz gráfica y pipelines de datos.",
    configures: [
      "Framework de interfaz de usuario (Flet Desktop, Streamlit, React/Next.js)",
      "Motor de persistencia analítico (DuckDB + Parquet, SQLite, PostgreSQL/TimescaleDB)",
      "Resolución, granularidad temporal y fuentes de entrada de datos",
      "Modo offline con dataset de demostración sintético incorporado"
    ]
  },
  {
    id: "compliance",
    stepNumber: 3,
    title: "Restricciones, Regulación y Guardrails",
    desc: "Define el marco regulatorio del sector, salvaguardas éticas y filtros antialucinación.",
    configures: [
      "Normativas de obligado cumplimiento (MiFID II, RGPD, CTE, Ley 2/2023, WCAG 2.2)",
      "Middleware de guardrails antialucinación para modelos fundacionales",
      "Cláusulas de descargo de responsabilidad (disclaimers letrados/médicos)",
      "Presupuesto de cómputo y restricciones de infraestructura"
    ]
  },
  {
    id: "output",
    stepNumber: 4,
    title: "Generación de Entregables y Plan de Acción",
    desc: "Compila la especificación formal, prompts maestros de desarrollo y plan de implementación iterativo.",
    configures: [
      "Selección del formato de salida documental (PRD, Prompt Maestro, Plan de Sprints)",
      "Recomendación de modelos de IA óptimos según el componente a desarrollar",
      "Estimación algorítmica de esfuerzo en horas de ingeniería y coste en euros",
      "Descarga directa en Markdown, exportación en JSON o copiado al portapapeles"
    ]
  }
];

/**
 * Restricciones compartidas aplicables a cualquier proyecto técnico
 */
export const COMMON_CONSTRAINTS = {
  budget: [
    {
      id: "zero",
      label: "0 € (Herramientas Open-Source y Gratuitas Exclusivamente)",
      factor: 1.0,
      desc: "Modelos locales o free tiers (Gemini Flash gratuito, Ollama/Llama), DuckDB local y hosting estático sin coste de servidor."
    },
    {
      id: "low",
      label: "Bajo (< 50 €/mes en APIs de IA y servidores)",
      factor: 0.85,
      desc: "Acceso flexible a APIs de alta velocidad (Gemini 2.5 Flash, DeepSeek V4) y VPS ligero en la nube."
    },
    {
      id: "pro",
      label: "Profesional (50 € - 250 €/mes)",
      factor: 0.70,
      desc: "Uso sin restricciones de Claude 3.7 Sonnet y GPT-4o, bases de datos vectoriales gestionadas y pipelines CI/CD completos."
    },
    {
      id: "enterprise",
      label: "Corporativo (> 250 €/mes o nube dedicada)",
      factor: 0.55,
      desc: "Infraestructura soberana dedicada en nube europea, microservicios Kubernetes y cumplimiento estricto de SOC 2."
    }
  ],
  timeline: [
    {
      id: "hackathon",
      label: "Prototipo Rápido (1 a 3 días)",
      hoursTarget: 24,
      desc: "MVP funcional enfocado en la lógica del algoritmo con interfaz simplificada en Streamlit y datos sintéticos."
    },
    {
      id: "sprint",
      label: "Sprint Ágil (1 a 2 semanas)",
      hoursTarget: 80,
      desc: "Aplicación modular completa con validación de esquemas Pydantic, interfaz visual cuidada y persistencia local."
    },
    {
      id: "production",
      label: "Producto de Producción (1 a 2 meses)",
      hoursTarget: 240,
      desc: "Arquitectura escalable, cobertura de tests unitarios e integración >85%, Dockerfile y auditoría de seguridad."
    }
  ],
  technicalLevel: [
    {
      id: "nocode",
      label: "No Programador / Perfil de Negocio (Prompt Engineering)",
      factor: 1.45,
      desc: "Requiere código monolítico listo para copiar y pegar, scripts de arranque en un solo click y explicaciones pedagógicas."
    },
    {
      id: "intermediate",
      label: "Desarrollador Intermedio (Python / JavaScript básico)",
      factor: 1.0,
      desc: "Familiarizado con terminal, entornos virtuales, depuración de errores comunes y consumo de librerías oficiales."
    },
    {
      id: "advanced",
      label: "Ingeniero Senior / Arquitecto de Software",
      factor: 0.65,
      desc: "Prioriza código desacoplado por capas, asincronía de alto rendimiento, tipado estricto y testing avanzado."
    }
  ],
  deployment: [
    {
      id: "local_desktop",
      label: "Escritorio Local (Standalone .exe / App sin Servidor)",
      complexity: 1.0,
      desc: "Ejecución 100% privada en el ordenador del usuario final sin dependencias de infraestructura ni costes recurrentes."
    },
    {
      id: "local_web",
      label: "Web Local / Intranet de Oficina (Docker / Localhost)",
      complexity: 1.15,
      desc: "Servidor local accesible a través de la red local de la empresa para equipos reducidos de trabajo."
    },
    {
      id: "cloud_serverless",
      label: "Nube Serverless / Estática (FastAPI en Vercel/Fly.io + React)",
      complexity: 1.35,
      desc: "Arquitectura cliente-servidor elástica de coste cero en reposo y mantenimiento automatizado."
    },
    {
      id: "cloud_container",
      label: "Contenedor Cloud Dedicado (VPS Docker / Kubernetes)",
      complexity: 1.60,
      desc: "Control absoluto de recursos, base de datos persistente dedicada y procesamiento pesado en segundo plano."
    }
  ]
};

/**
 * Catálogo de formatos de salida documentales del Wizard
 */
export const OUTPUT_FORMATS = [
  {
    id: "prd_full",
    label: "Documento de Requisitos de Producto Completo (PRD)",
    ext: "md",
    desc: "Especificación formal de 8 apartados con alcance funcional, arquitectura de datos, requisitos no funcionales y batería de QA."
  },
  {
    id: "prompt_master",
    label: "Prompt Maestro de Construcción para Agentes de IA",
    ext: "md",
    desc: "Instrucción sistemática estructurada en modo rol experto optimizada para pegar directamente en Claude 3.7 Sonnet o Gemini 2.5 Flash."
  },
  {
    id: "architecture_spec",
    label: "Especificación de Arquitectura Técnica y Esquema DDL",
    ext: "md",
    desc: "Árbol de directorios recomendado, contratos de interfaz de datos y esquemas de tablas SQL/Pydantic listos para instanciar."
  },
  {
    id: "implementation_plan",
    label: "Plan de Implementación en 4 Sprints",
    ext: "md",
    desc: "Desglose cronológico de tareas por fases con estimación de horas, dependencias críticas y criterios de aceptación definitivos."
  },
  {
    id: "stack_matrix",
    label: "Matriz de Dependencias y Ficheros de Configuración",
    ext: "json",
    desc: "Archivo 'requirements.txt' y configuración de entorno virtual con paquetes fijados y explicaciones técnicas de idoneidad."
  }
];

/**
 * Factores de cálculo para la estimación algorítmica de esfuerzo y coste
 */
export const ESTIMATION_FACTORS = {
  baseHoursPerPrimaryTask: 32,
  baseHoursPerSecondaryTask: 10,
  baseHoursPerMetricOrFeature: 3,
  qaMultiplier: 1.30, // 30% adicional para cobertura de pruebas unitarias y documentación
  hourlyRatesEur: {
    junior: 25,
    mid: 45,
    senior: 75,
    freelance_avg: 50
  }
};

/**
 * Calcula la estimación de tiempo en horas y coste en euros a partir de las respuestas del wizard
 * @param {Object} answers - Objeto con las selecciones del usuario
 * @returns {Object} Estimación desglosada
 */
export function calculateEstimate(answers = {}) {
  const {
    primaryTask,
    secondaryTasks = [],
    selectedMetrics = [],
    budget = "zero",
    technicalLevel = "intermediate",
    deployment = "local_desktop"
  } = answers;

  // Factores multiplicadores
  const budgetObj = COMMON_CONSTRAINTS.budget.find(b => b.id === budget) || COMMON_CONSTRAINTS.budget[0];
  const techObj = COMMON_CONSTRAINTS.technicalLevel.find(t => t.id === technicalLevel) || COMMON_CONSTRAINTS.technicalLevel[1];
  const deployObj = COMMON_CONSTRAINTS.deployment.find(d => d.id === deployment) || COMMON_CONSTRAINTS.deployment[0];

  // Cálculo de horas brutas
  const primaryHours = primaryTask ? ESTIMATION_FACTORS.baseHoursPerPrimaryTask : 20;
  const secondaryHours = (secondaryTasks.length || 0) * ESTIMATION_FACTORS.baseHoursPerSecondaryTask;
  const metricsHours = (selectedMetrics.length || 0) * ESTIMATION_FACTORS.baseHoursPerMetricOrFeature;

  const rawHours = (primaryHours + secondaryHours + metricsHours) * ESTIMATION_FACTORS.qaMultiplier;

  // Aplicación de factores de nivel técnico y complejidad de despliegue
  const adjustedHours = Math.round(rawHours * techObj.factor * deployObj.complexity);

  // Estimación de semanas según dedicación a tiempo parcial (20h/semana) o completa (40h/semana)
  const weeksPartTime = Math.max(1, Math.ceil(adjustedHours / 20));
  const weeksFullTime = Math.max(1, Math.ceil(adjustedHours / 40));

  // Desglose por fases de ingeniería
  const breakdown = {
    dataAndCore: Math.round(adjustedHours * 0.40),
    userInterface: Math.round(adjustedHours * 0.25),
    complianceAndGuardrails: Math.round(adjustedHours * 0.15),
    testingAndDeployment: Math.round(adjustedHours * 0.20)
  };

  // Coste económico estimado de desarrollo profesional
  const estimatedCostEur = Math.round(adjustedHours * ESTIMATION_FACTORS.hourlyRatesEur.freelance_avg);

  return {
    totalHours: adjustedHours,
    weeksPartTime,
    weeksFullTime,
    breakdown,
    estimatedCostEur,
    complexityLabel: adjustedHours < 60 ? "Baja" : adjustedHours < 150 ? "Media" : "Alta",
    recommendedSprint: adjustedHours < 50 ? "1 Sprint (2 semanas)" : adjustedHours < 120 ? "2 Sprints (4 semanas)" : "3 Sprints (6 semanas)"
  };
}

/**
 * Genera un prompt maestro de construcción para un agente de IA a partir de las respuestas del wizard
 * @param {string} wizardId - Identificador del área (ej. 'finanzas', 'medicina')
 * @param {Object} answers - Respuestas y opciones seleccionadas
 * @returns {string} Prompt formateado listo para copiar
 */
export function generatePrompt(wizardId, answers = {}) {
  const {
    appName = "Mi Aplicación",
    primaryTask = "Core Funcional",
    primaryDesc = "Módulo principal",
    secondaryTasks = [],
    uiFramework = "Flet (Python)",
    storageEngine = "DuckDB + Parquet",
    complianceRules = [],
    budget = "0 €"
  } = answers;

  const estimate = calculateEstimate(answers);

  return `# PROMPT MAESTRO DE INGENIERÍA DE SOFTWARE — HORIZON

## ROL Y CONTEXTO
Actúa como un Ingeniero de Software Senior y Especialista de Dominio en ${wizardId.toUpperCase()}.
Tu objetivo es desarrollar la aplicación "${appName}" bajo estándares profesionales de código limpio, tipado estricto y ausencia de dependencias innecesarias.

## ALCANCE FUNCIONAL
1. Tarea Principal: ${primaryTask}
   - Descripción: ${primaryDesc}
2. Componentes Secundarios:
${secondaryTasks.map((t, idx) => `   ${idx + 1}. ${typeof t === "string" ? t : t.label || t.id}`).join("\n") || "   - Funcionalidades estándar de persistencia y exportación."}

## ARQUITECTURA TÉCNICA
- Interfaz de Usuario: ${uiFramework}
- Motor de Almacenamiento: ${storageEngine}
- Modo de Despliegue: ${answers.deployment || "Standalone Local"}
- Presupuesto de Infraestructura: ${budget}

## ESTIMACIÓN Y CRONOGRAMA
- Esfuerzo estimado de ingeniería: ${estimate.totalHours} horas (${estimate.recommendedSprint}).
- Distribución de carga: Núcleo analítico (${estimate.breakdown.dataAndCore}h), UI (${estimate.breakdown.userInterface}h), Guardrails (${estimate.breakdown.complianceAndGuardrails}h), Testing (${estimate.breakdown.testingAndDeployment}h).

## RESTRICCIONES Y GUARDRAILS
${complianceRules.map(r => `- ${r}`).join("\n") || "- Operativa en modo seguro con dataset de demostración sin conexión externa obligatoria."}
- Prohibida la invención de cifras o alucinación de datos no verificados.
- Validación estricta de entradas mediante Pydantic o tipado estático equivalente.

## INSTRUCCIÓN DE RESPUESTA
Genera el código modular completo del proyecto:
1. 'schemas.py': Modelos de datos y validaciones de entrada.
2. 'analytics.py': Núcleo algorítmico y funciones de cálculo puro.
3. 'main.py': Punto de entrada con interfaz de usuario en ${uiFramework}.
4. 'requirements.txt': Dependencias mínimas fijadas.`;
}

/**
 * Valida si un paso específico cuenta con todos los campos obligatorios completados
 * @param {string} stepId - Identificador del paso ('definition', 'architecture', 'compliance', 'output')
 * @param {Object} answers - Estado actual de respuestas
 * @returns {Object} { isValid: boolean, missingFields: string[] }
 */
export function validateStep(stepId, answers = {}) {
  const missing = [];

  if (stepId === "definition") {
    if (!answers.primaryTask) missing.push("Tarea Primaria del sector");
    if (!answers.appName || answers.appName.trim().length === 0) missing.push("Nombre del proyecto");
  }

  if (stepId === "architecture") {
    if (!answers.uiFramework) missing.push("Framework de interfaz de usuario");
    if (!answers.storageEngine) missing.push("Motor de almacenamiento");
  }

  if (stepId === "compliance") {
    // El paso de compliance suele tener valores por defecto, pero valida si se requiere aceptación expresa
    if (answers.acceptTerms === false) missing.push("Aceptación de directrices éticas y legales");
  }

  return {
    isValid: missing.length === 0,
    missingFields: missing
  };
}

/**
 * WIZARD_DATA — Datos centralizados de tareas, métricas, configOptions y reportSections por área.
 * Usado por los Wizards individuales para evitar duplicación de constantes.
 */
export const WIZARD_DATA = {
  finanzas: {
    name: "Finanzas & Mercados",
    color: "#3B6FD4",
    primaryTasks: [
      { id: "F1.1", label: "Motor de Descarga y Análisis Fundamental", desc: "Extracción y normalización de estados contables, ratios y múltiplos de valoración.", audience: "Analistas fundamentales, gestores de cartera", deliverables: ["Dataset normalizado de fundamentales", "Informe de múltiplos de valoración", "Dashboard de ratios financieros"], tools: ["Yahoo Finance API", "DuckDB", "Pandas", "Pydantic"] },
      { id: "F1.2", label: "Simulador de Estrategias Cuantitativas", desc: "Backtesting con walk-forward, costes de fricción y métricas Sharpe/Sortino/Drawdown.", audience: "Gestores cuantitativos, traders algorítmicos", deliverables: ["Curva de capital (Equity Curve)", "Informe de métricas Sharpe/Sortino/MDD", "Reporte de robustez Walk-Forward"], tools: ["Python", "NumPy", "SciPy", "Plotly"] },
      { id: "F1.3", label: "Analizador de Sentimiento Financiero", desc: "Minería de noticias financieras, extracción de entidades y detección de divergencias precio-noticia.", audience: "Analistas cuantitativos, gestores macro", deliverables: ["Índice de sentimiento por activo", "Timeline de eventos de mercado", "Señales de divergencia precio-sentimiento"], tools: ["FinBERT", "spaCy", "NewsAPI", "DuckDB"] },
      { id: "F1.4", label: "Generador de Señales Técnicas", desc: "Cálculo de indicadores técnicos, patrones de precio y matrices de alerta.", audience: "Traders técnicos, operadores de intradía", deliverables: ["Dashboard de indicadores técnicos", "Matriz de alertas multitemporal", "Scanner de patrones de precio"], tools: ["TA-Lib", "Pandas", "Plotly", "Streamlit"] },
      { id: "F1.5", label: "Calculadora de Riesgo y VaR", desc: "Modelos de Value at Risk (paramétrico, histórico, Monte Carlo) y stress testing.", audience: "Oficiales de riesgo, departamentos de tesorería", deliverables: ["Informe VaR/CVaR por cartera", "Reporte de stress testing", "Dashboard de exposición al riesgo"], tools: ["NumPy", "SciPy", "DuckDB", "Plotly"] },
      { id: "F1.6", label: "Radar Macroeconómico", desc: "Monitoreo de variables macro, análisis de política monetaria y modelos de descuento.", audience: "Economistas, estrategas macro", deliverables: ["Dashboard de indicadores macro", "Análisis de curva de tipos", "Informe de política monetaria"], tools: ["FRED API", "Pandas", "DuckDB", "Streamlit"] },
    ],
    secondaryTasks: [
      { id: "SEC-FIN-01", label: "Conciliación de series temporales", desc: "Alineación de frecuencias y fusión de datos de múltiples fuentes.", prerequisites: ["F1.1"] },
      { id: "SEC-FIN-02", label: "Exportación a Excel con fórmulas", desc: "Generación de informes Excel con fórmulas financieras embebidas.", prerequisites: ["F1.1", "F1.2"] },
      { id: "SEC-FIN-03", label: "Alertas multicanal", desc: "Notificaciones por email, Telegram y webhook ante eventos de mercado.", prerequisites: ["F1.3", "F1.4"] },
      { id: "SEC-FIN-04", label: "Modo offline con DuckDB", desc: "Persistencia local para funcionamiento sin conexión.", prerequisites: ["F1.1"] },
      { id: "SEC-FIN-05", label: "Atribución de rendimiento factorial", desc: "Descomposición del rendimiento por factores (valor, momentum, tamaño).", prerequisites: ["F1.2"] },
      { id: "SEC-FIN-06", label: "Backtesting de carteras", desc: "Evaluación histórica de asignaciones de activos.", prerequisites: ["F1.2"] },
      { id: "SEC-FIN-07", label: "Validación de datos de mercado", desc: "Detección de outliers, gaps y errores en feeds de datos.", prerequisites: ["F1.1"] },
      { id: "SEC-FIN-08", label: "Generación de informes PDF", desc: "Compilación de resultados en documentos formates.", prerequisites: ["F1.1", "F1.2"] },
    ],
    configOptions: {
      assetClasses: ["Renta Variable", "Renta Fija", "FX", "Commodities", "Criptoactivos"],
      granularities: ["Tick", "1 min", "5 min", "15 min", "1 hora", "Diario"],
      historyWindows: ["1 año", "3 años", "5 años", "10 años", "Max disponible"],
    },
    metrics: [
      { id: "M-FIN-01", label: "Sharpe Ratio", cat: "Rendimiento", desc: "Exceso de rendimiento por unidad de riesgo total.", formula: "(Rp - Rf) / σp" },
      { id: "M-FIN-02", label: "Sortino Ratio", cat: "Rendimiento", desc: "Exceso de rendimiento por unidad de riesgo a la baja.", formula: "(Rp - Rf) / σ_downside" },
      { id: "M-FIN-03", label: "Maximum Drawdown", cat: "Riesgo", desc: "Caída máxima desde pico hasta valle.", formula: "max(1 - P_t / P_peak)" },
      { id: "M-FIN-04", label: "VaR (95%)", cat: "Riesgo", desc: "Pérdida máxima esperada al 95% de confianza.", formula: "μ - 1.645 * σ" },
      { id: "M-FIN-05", label: "Profit Factor", cat: "Eficiencia", desc: "Ratio de ganancias brutas sobre pérdidas brutas.", formula: "Σ(ganancias) / Σ(pérdidas)" },
      { id: "M-FIN-06", label: "Calmar Ratio", cat: "Rendimiento", desc: "Rendimiento anualizado dividido por máximo drawdown.", formula: "Rendimiento_anual / MDD" },
    ],
    techStack: {
      execModels: ["Gemini 2.5 Flash", "Claude 3.7 Sonnet", "GPT-4o"],
      sizingMethods: ["Backtesting histórico", "Monte Carlo", "Análisis de sensibilidad"],
      uiFrameworks: ["Streamlit", "React + Plotly", "Flet Desktop"],
      storageEngines: ["DuckDB + Parquet", "SQLite", "PostgreSQL/TimescaleDB"],
    },
    reportSections: ["Resumen Ejecutivo", "Matriz de Arquitectura", "Fórmulas y Métricas", "Parámetros de Simulación", "Tech Stack y Estructura", "Protocolo QA", "Descargo Legal"],
  },

  medicina: {
    name: "Medicina & IA Clínica",
    color: "#0D9488",
    primaryTasks: [
      { id: "M1.1", label: "Auditor Clínico y Verificación PubMed", desc: "Verificación de afirmaciones clínicas contra literatura biomédica.", audience: "Médicos, investigadores clínicos", deliverables: ["Informe de auditoría clínica", "Clasificación de evidencia (VERIFIED/UNVERIFIED/CONTRADICTED)", "Reporte de interacciones farmacológicas"], tools: ["PubMed API", "BioPython", "DuckDB", "FastAPI"] },
      { id: "M1.2", label: "Pipeline de Normalización FHIR R4", desc: "Extracción a recursos FHIR, codificación SNOMED/LOINC/CIE-10.", audience: "Ingenieros biomédicos, desarrolladores FHIR", deliverables: ["Bundle FHIR R4 validado", "Mapping CIE-10/SNOMED/LOINC", "Informe de interoperabilidad"], tools: ["fhir.resources", "FastAPI", "spaCy", "PostgreSQL"] },
      { id: "M1.3", label: "Adherencia y Monitoreo de Pacientes", desc: "Agentes de seguimiento ambulatorio y detección de efectos adversos.", audience: "Enfermería, médicos de atención primaria", deliverables: ["Dashboard de adherencia", "Alertas de efectos adversos", "Informe de seguimiento"], tools: ["Flet", "DuckDB", "Pydantic", "Python"] },
      { id: "M1.4", label: "Triaje y Diagnóstico Diferencial", desc: "Clasificación de urgencia y ponderación de hipótesis clínicas.", audience: "Médicos de urgencias, triajistas", deliverables: ["Clasificación Manchester Triage", "Lista de diagnósticos diferenciales", "Protocolo de actuación"], tools: ["Python", "Pydantic", "Flet", "DuckDB"] },
      { id: "M1.5", label: "Calculadora Médica y Razonamiento Fisiológico", desc: "Implementación de scores clínicos (CHADS2-VASc, MELD, GFR).", audience: "Médicos, farmacéuticos", deliverables: ["Calculadora de scores clínicos", "Informe de riesgo cardiovascular", "Protocolo de dosificación"], tools: ["Python", "NumPy", "Streamlit", "Pydantic"] },
      { id: "M1.6", label: "Analizador de EHR y Resumen SOAP", desc: "Generación de notas SOAP estructuradas preservando fidelidad temporal.", audience: "Médicos, documentadores clínicos", deliverables: ["Nota SOAP estructurada", "Resumen de historia clínica", "Timeline de eventos"], tools: ["Python", "FastAPI", "Pydantic", "DuckDB"] },
    ],
    secondaryTasks: [
      { id: "SEC-MED-01", label: "Guardrail de seguridad clínica", desc: "Filtro de emergencias y derivación obligatoria a profesional.", prerequisites: ["M1.4"] },
      { id: "SEC-MED-02", label: "Normalización terminológica", desc: "Conversión automática entre sistemas de codificación.", prerequisites: ["M1.2"] },
      { id: "SEC-MED-03", label: "Exportación de informes PDF", desc: "Generación de documentos clínicos formateados.", prerequisites: ["M1.1", "M1.6"] },
      { id: "SEC-MED-04", label: "Log de auditoría inmutable", desc: "Registro cronológico de todas las interacciones clínicas.", prerequisites: ["M1.1"] },
      { id: "SEC-MED-05", label: "Alertas sanitarias urgentes", desc: "Notificaciones de alertas de salud pública y brotes.", prerequisites: ["M1.3"] },
      { id: "SEC-MED-06", label: "Anonimización de datos clínicos", desc: "Protección de PHI conforme a RGPD y normativa sanitaria.", prerequisites: ["M1.2"] },
      { id: "SEC-MED-07", label: "Validación de códigos CIE-10", desc: "Verificación de vigencia y exactitud de codificaciones.", prerequisites: ["M1.2"] },
      { id: "SEC-MED-08", label: "Integración con HAPI FHIR", desc: "Conexión con servidores FHIR interoperables.", prerequisites: ["M1.2"] },
    ],
    configOptions: {
      clinicalDomains: ["Medicina Interna", "Cardiología", "Urgencias", "Atención Primaria", "Farmacología"],
      evidenceLevels: ["GRADE Alto", "GRADE Moderado", "GRADE Bajo", "GRADE Muy Bajo"],
      complianceFrameworks: ["RGPD", "HIPAA", "Ley 41/2002", "Normativa FHIR R4"],
    },
    metrics: [
      { id: "M-MED-01", label: "Tasa de Verificación", cat: "Calidad", desc: "Porcentaje de afirmaciones verificadas contra evidencia.", formula: "afirmaciones_verificadas / total_afirmaciones * 100" },
      { id: "M-MED-02", label: "Sensibilidad del Triaje", cat: "Seguridad", desc: "Capacidad de detectar pacientes de alto riesgo.", formula: "verdaderos_positivos / (verdaderos_positivos + falsos_negativos)" },
      { id: "M-MED-03", label: "Tiempo de Respuesta FHIR", cat: "Eficiencia", desc: "Latencia media de procesamiento de recursos FHIR.", formula: "media(tiempos_procesamiento)" },
      { id: "M-MED-04", label: "Cobertura de Codificación", cat: "Calidad", desc: "Porcentaje de conceptos mapeados exitosamente.", formula: "conceptos_mapeados / total_conceptos * 100" },
    ],
    techStack: {
      execModels: ["Claude 3.7 Sonnet", "GPT-4o", "Gemini 2.5 Flash"],
      evidenceBases: ["PubMed", "Cochrane", "ClinicalTrials.gov", "Guías NICE/OMS"],
      uiFrameworks: ["Flet Desktop", "Streamlit", "React"],
      storageEngines: ["DuckDB", "PostgreSQL", "HAPI FHIR Server"],
    },
    reportSections: ["Resumen Ejecutivo", "Evidencia Clínica", "Niveles de Confianza", "Guardrails de Seguridad", "Tech Stack y Estructura", "Protocolo de Auditoría", "Descargo Legal Médico"],
  },

  derecho: {
    name: "Derecho & Compliance",
    color: "#991B1B",
    primaryTasks: [
      { id: "D1.1", label: "Auditor Contractual y Revisión de Riesgos", desc: "Extracción de obligaciones, términos de resolución y matriz de contingencias.", audience: "Abogados contractuales, juristas de empresa", deliverables: ["Informe de riesgos contractuales", "Matriz de obligaciones y plazos", "Propuesta de redlining"], tools: ["python-docx", "PyMuPDF", "DuckDB", "FastAPI"] },
      { id: "D1.2", label: "Análisis Jurisprudencial CENDOJ y Curia", desc: "Extracción del fallo, ratio decidendi y contradicción de tesis.", audience: "Abogados litigantes, investigadores jurídicos", deliverables: ["Ficha jurisprudencial estructurada", "Análisis de ratio decidendi", "Mapa de contradicciones"], tools: ["Qdrant", "LlamaIndex", "DeepSeek V4", "DuckDB"] },
      { id: "D1.3", label: "Compliance Normativo y Prevención de Delitos", desc: "Matriz de riesgos penales, canales de denuncia e investigaciones internas.", audience: "Compliance officers, auditores internos", deliverables: ["Matriz de riesgos penales", "Protocolo de canal ético", "Informe de cumplimiento"], tools: ["FastAPI", "Pydantic", "PostgreSQL", "Python"] },
      { id: "D1.4", label: "Asistente RAG Jurídico con Cita Normativa", desc: "Recuperación semántica con verificación de vigencia de artículos.", audience: "Juristas, asesores legales", deliverables: ["Dictamen jurídico fundamentado", "Base de conocimiento jurídica", "Verificador de citas normativas"], tools: ["Qdrant", "LlamaIndex", "Sentence Transformers", "DuckDB"] },
      { id: "D1.5", label: "Detector de Cláusulas Abusivas", desc: "Contraste con doctrina de tribunales superiores y normativa de consumo.", audience: "Abogados de consumidores, asociaciones", deliverables: ["Informe de cláusulas abusivas", "Propuesta de redacción alternativa", "Cálculo de indemnización"], tools: ["Python", "spaCy", "DuckDB", "Plotly"] },
      { id: "D1.6", label: "Due Diligence Automatizada", desc: "Revisión masiva de contratos, litigios, licencias y pasivos ocultos.", audience: "Abogados M&A, auditores", deliverables: ["Informe de due diligence", "Matriz de riesgos societarios", "Checklist de verificación"], tools: ["python-docx", "PyMuPDF", "DuckDB", "FastAPI"] },
    ],
    secondaryTasks: [
      { id: "SEC-DER-01", label: "Dictámenes formales", desc: "Redacción de informes jurídicos con estructura procesal.", prerequisites: ["D1.1", "D1.4"] },
      { id: "SEC-DER-02", label: "Trazabilidad forense", desc: "Registro inmutable de todas las revisiones contractuales.", prerequisites: ["D1.1"] },
      { id: "SEC-DER-03", label: "Alertas de reformas legales", desc: "Monitoreo de BOE y cambios normativos.", prerequisites: ["D1.4"] },
      { id: "SEC-DER-04", label: "Exportación PDF", desc: "Generación de documentos formateados para presentación.", prerequisites: ["D1.1", "D1.5"] },
      { id: "SEC-DER-05", label: "Verificación de vigencia normativa", desc: "Comprobación de que los artículos citados están en vigor.", prerequisites: ["D1.4"] },
      { id: "SEC-DER-06", label: "Análisis de sentencias", desc: "Extracción de fallos y ratio decidendi de sentencias.", prerequisites: ["D1.2"] },
      { id: "SEC-DER-07", label: "Cálculo de plazos legales", desc: "Determinación automática de prescripciones y caducidades.", prerequisites: ["D1.1"] },
      { id: "SEC-DER-08", label: "Integración con CENDOJ", desc: "Conexión con la base de datos de jurisprudencia del CGPJ.", prerequisites: ["D1.2"] },
    ],
    configOptions: {
      legalBranches: ["Civil", "Mercantil", "Laboral", "Penal", "Administrativo", "Consumo"],
      jurisdictions: ["España", "Unión Europea", "Latinoamérica"],
      documentFormats: ["DOCX", "PDF", "XML FacturaE", "CSV"],
    },
    metrics: [
      { id: "M-DER-01", label: "Tasa de Detección de Riesgos", cat: "Calidad", desc: "Porcentaje de cláusulas de riesgo identificadas.", formula: "clausulas_detectadas / total_clausulas * 100" },
      { id: "M-DER-02", label: "Precisión de Citas Normativas", cat: "Fiabilidad", desc: "Porcentaje de citas verificadas y vigentes.", formula: "citas_verificadas / total_citas * 100" },
      { id: "M-DER-03", label: "Tiempo de Due Diligence", cat: "Eficiencia", desc: "Horas media por contrato revisado.", formula: "total_horas / num_contratos" },
      { id: "M-DER-04", label: "Cobertura Normativa", cat: "Amplitud", desc: "Porcentaje de ramas jurídicas cubiertas.", formula: "ramas_cubiertas / total_ramas * 100" },
    ],
    techStack: {
      execModels: ["Claude 3.7 Sonnet", "DeepSeek V4", "GPT-4o"],
      knowledgeBases: ["BOE", "CENDOJ", "Curia", "ILO", "Leyes <- dot es"],
      uiFrameworks: ["React", "Streamlit", "Flet Desktop"],
      storageEngines: ["Qdrant", "DuckDB", "PostgreSQL", "SQLCipher"],
    },
    reportSections: ["Resumen Ejecutivo", "Análisis de Riesgos", "Citas Normativas", "Jurisprudencia Aplicable", "Tech Stack y Estructura", "Protocolo de Auditoría", "Descargo Legal"],
  },

  contabilidad: {
    name: "Contabilidad & ERP",
    color: "#10B981",
    primaryTasks: [
      { id: "C1.1", label: "Conciliación Bancaria y Cuadre de Asientos", desc: "Matching fuzzy de extractos bancarios con facturas y gestión de discrepancias.", audience: "Contables, auditores", deliverables: ["Informe de conciliación bancaria", "Asientos de regularización", "Dashboard de discrepancias"], tools: ["DuckDB", "Pandas", "Streamlit", "Pydantic"] },
      { id: "C1.2", label: "Ingesta OCR y Facturación Electrónica", desc: "Extracción estructurada con FacturaE/UBL y validación de NIFs.", audience: "Departamentos de compras, contables", deliverables: ["Asientos PGC generados", "XML FacturaE validado", "Informe de IVA desglosado"], tools: ["PyMuPDF", "doctr", "FastAPI", "cryptography"] },
      { id: "C1.3", label: "Contabilidad Analítica y Costes ABC", desc: "Asignación de costes por centro de coste y cálculo de márgenes.", audience: "Controller, analistas financieros", deliverables: ["Informe de costes por centro", "Cálculo de punto muerto", "Dashboard de márgenes"], tools: ["DuckDB", "Pandas", "Plotly", "Python"] },
      { id: "C1.4", label: "Cumplimiento Tributario y Modelos Fiscales", desc: "Preparación de libros de IVA, retenciones y modelos oficiales.", audience: "Asesores fiscales, contables", deliverables: ["Modelos fiscales (303, 111, 200)", "Libro de IVA digital", "Informe de retenciones"], tools: ["Python", "DuckDB", "Pydantic", "Excel"] },
      { id: "C1.5", label: "Cuadro de Mando Contable y Ratios", desc: "Monitoreo de fondo de maniobra, PMC, apalancamiento y ROA/ROE.", audience: "Directores financieros, gerentes", deliverables: ["Dashboard de ratios financieros", "Informe de solvencia", "Alertas de liquidez"], tools: ["DuckDB", "Plotly", "Streamlit", "Pandas"] },
      { id: "C1.6", label: "Auditoría Contable y Detección de Anomalías", desc: "Ley de Benford, detección de pagos duplicados y pruebas de integridad.", audience: "Auditores internos, externos", deliverables: ["Informe de auditoría forense", "Matriz de anomalías", "Ranking de riesgos"], tools: ["DuckDB", "SciPy", "NumPy", "Plotly"] },
    ],
    secondaryTasks: [
      { id: "SEC-CON-01", label: "Exportación a SAGE/A3/Holded", desc: "Puentes de datos hacia ERPs populares.", prerequisites: ["C1.1"] },
      { id: "SEC-CON-02", label: "Automatización de asientos de cierre", desc: "Generación automática de asientos de fin de ejercicio.", prerequisites: ["C1.1", "C1.5"] },
      { id: "SEC-CON-03", label: "Amortizaciones periódicas", desc: "Cálculo automático de amortizaciones lineales y degresivas.", prerequisites: ["C1.3"] },
      { id: "SEC-CON-04", label: "Conciliación fiscal", desc: "Cruce de datos contables con declaraciones fiscales.", prerequisites: ["C1.4"] },
      { id: "SEC-CON-05", label: "Alertas de duplicidades", desc: "Detección de facturas y pagos duplicados.", prerequisites: ["C1.1", "C1.6"] },
      { id: "SEC-CON-06", label: "Generación de informes PDF", desc: "Compilación de resultados en documentos formateados.", prerequisites: ["C1.1", "C1.5"] },
      { id: "SEC-CON-07", label: "Validación de NIFs y CIFs", desc: "Comprobación de identificadores fiscales.", prerequisites: ["C1.2"] },
      { id: "SEC-CON-08", label: "Cálculo de provisión", desc: "Estimación de provisiones por cobros dudosos.", prerequisites: ["C1.5"] },
    ],
    configOptions: {
      accountingStandards: ["PGC España", "NIIF/IFRS", "US GAAP", "Plan General de Contabilidad PYMES"],
      taxModels: ["Modelo 303 (IVA)", "Modelo 111 (Retenciones)", "Modelo 200 (Sociedades)", "Modelo 720 (Bienes en el extranjero)"],
      erpIntegrations: ["SAGE 50/200", "A3 Innuvia", "Holded", "QuickBooks", "Exacta"],
    },
    metrics: [
      { id: "M-CON-01", label: "Tasa de Conciliación Automática", cat: "Eficiencia", desc: "Porcentaje de partidas conciliadas sin intervención manual.", formula: "partidas_auto_conciliadas / total_partidas * 100" },
      { id: "M-CON-02", label: "Precisión OCR", cat: "Calidad", desc: "Exactitud de extracción de datos de facturas.", formula: "campos_correctos / total_campos * 100" },
      { id: "M-CON-03", label: "Tiempo de Cierre", cat: "Eficiencia", desc: "Días reducidos en el proceso de cierre contable.", formula: "dias_antes - dian_despues" },
      { id: "M-CON-04", label: "Cobertura Normativa", cat: "Cumplimiento", desc: "Porcentaje de normativas contables implementadas.", formula: "normativas_implementadas / total_normativas * 100" },
    ],
    techStack: {
      execModels: ["Claude 3.7 Sonnet", "Gemini 2.5 Flash", "DeepSeek V4"],
      ocrEngines: ["doctr", "Tesseract", "Amazon Textract"],
      uiFrameworks: ["Streamlit", "Flet Desktop", "React"],
      storageEngines: ["DuckDB + Parquet", "SQLite", "PostgreSQL"],
    },
    reportSections: ["Resumen Ejecutivo", "Conciliación Bancaria", "Análisis Fiscal", "Ratios Financieros", "Tech Stack y Estructura", "Protocolo de Auditoría", "Descargo Legal"],
  },

  matematicas: {
    name: "Matemáticas & Complejidad",
    color: "#6366F1",
    primaryTasks: [
      { id: "M4.1", label: "Auditor Lógico y Verificador Simbólico", desc: "Verificación formal de algoritmos, reducción simbólica y comprobación axiomática.", audience: "Matemáticos, investigadores, ingenieros", deliverables: ["Informe de verificación formal", "Prueba simbólica documentada", "Análisis de complejidad"], tools: ["SymPy", "NumPy", "SciPy", "KaTeX"] },
      { id: "M4.2", label: "Optimización Combinatoria y Solvers MILP", desc: "Modelado simplex, programación lineal entera mixta y problemas de asignación.", audience: "Investigadores operativos, planificadores", deliverables: ["Solución óptima factible", "Análisis de sensibilidad", "Informe de convergencia"], tools: ["HiGHS", "PuLP", "SciPy", "NetworkX"] },
      { id: "M4.3", label: "Análisis Numérico y EDOs Rígidas", desc: "Integración Runge-Kutta, cálculo de raíces y resolución de sistemas dispersos.", audience: "Ingenieros, físicos, modeladores", deliverables: ["Solución numérica de EDOs", "Análisis de estabilidad", "Visualización de trayectorias"], tools: ["SciPy", "NumPy", "Matplotlib", "Plotly"] },
      { id: "M4.4", label: "Teoría de Grafos y Complejidad de Redes", desc: "Cálculo de centralidad, detección de comunidades, flujos máximos.", audience: "Científicos de datos, investigadores de redes", deliverables: ["Métricas de centralidad", "Comunidades detectadas", "Análisis de flujos"], tools: ["NetworkX", "SciPy", "NumPy", "Plotly"] },
      { id: "M4.5", label: "Sistemas Dinámicos y Atractores Caóticos", desc: "Exponentes de Lyapunov, diagramas de bifurcación y atractor de Lorenz.", audience: "Físicos matemáticos, investigadores de caos", deliverables: ["Exponentes de Lyapunov", "Diagrama de bifurcación", "Visualización del atractor"], tools: ["NumPy", "SciPy", "Matplotlib", "SymPy"] },
      { id: "M4.6", label: "Visualización Matemática y Espacios 3D", desc: "Generación de mallas, campos vectoriales y animaciones de transformaciones.", audience: "Educadores, investigadores, ingenieros", deliverables: ["Visualizaciones 3D interactivas", "Animaciones de conceptos matemáticos", "Exportación SVG/PDF"], tools: ["Plotly", "Matplotlib", "NumPy", "SymPy"] },
    ],
    secondaryTasks: [
      { id: "SEC-MA-01", label: "Verificación simbólica con SymPy", desc: "Comprobación de identidades y simplificaciones algebraicas.", prerequisites: ["M4.1"] },
      { id: "SEC-MA-02", label: "Formateo LaTeX riguroso", desc: "Generación de documentos matemáticos en formato académico.", prerequisites: ["M4.1"] },
      { id: "SEC-MA-03", label: "Análisis de complejidad Big-O", desc: "Determinación de complejidad temporal y espacial de algoritmos.", prerequisites: ["M4.1"] },
      { id: "SEC-MA-04", label: "Generación de benchmarks", desc: "Creación de conjuntos de prueba estándar para validación.", prerequisites: ["M4.2", "M4.3"] },
      { id: "SEC-MA-05", label: "Exportación de resultados", desc: "Generación de informes en múltiples formatos.", prerequisites: ["M4.1", "M4.2"] },
      { id: "SEC-MA-06", label: "Visualización de convergencia", desc: "Gráficos de comportamiento de algoritmos iterativos.", prerequisites: ["M4.3"] },
      { id: "SEC-MA-07", label: "Validación numérica", desc: "Comprobación de precisión y estabilidad de métodos.", prerequisites: ["M4.3"] },
      { id: "SEC-MA-08", label: "Documentación de algoritmos", desc: "Generación de documentación técnica completa.", prerequisites: ["M4.1"] },
    ],
    configOptions: {
      problemTypes: ["Optimización", "Ecuaciones Diferenciales", "Teoría de Grafos", "Álgebra Lineal", "Análisis Numérico"],
      precisionLevels: ["Float64 (doble precisión)", "Float128 (cuádruple)", "Simbólico exacto"],
      outputFormats: ["LaTeX", "Markdown", "SVG", "PNG", "PDF"],
    },
    metrics: [
      { id: "M-MAT-01", label: "Precisión Numérica", cat: "Calidad", desc: "Error relativo respecto a la solución exacta.", formula: "|x_aprox - x_exacto| / |x_exacto|" },
      { id: "M-MAT-02", label: "Tiempo de Convergencia", cat: "Eficiencia", desc: "Número de iteraciones hasta convergencia.", formula: "num_iteraciones" },
      { id: "M-MAT-03", label: "Complejidad Temporal", cat: "Rendimiento", desc: "Clase de complejidad asintótica.", formula: "O(f(n))" },
      { id: "M-MAT-04", label: "Estabilidad Numérica", cat: "Fiabilidad", desc: "Factor de crecimiento de errores en propagación.", formula: "condición_matriz(A)" },
    ],
    techStack: {
      execModels: ["DeepSeek V4", "Claude 3.7 Sonnet", "GPT-4o"],
      mathLibraries: ["SymPy", "NumPy", "SciPy", "NetworkX"],
      uiFrameworks: ["Streamlit", "Jupyter", "Plotly"],
      storageEngines: ["DuckDB", "SQLite", "CSV/Parquet"],
    },
    reportSections: ["Resumen Ejecutivo", "Planteamiento del Problema", "Metodología", "Resultados Numéricos", "Visualizaciones", "Análisis de Complejidad", "Conclusiones"],
  },

  ingenieria: {
    name: "Ingeniería & Arquitectura",
    color: "#F97316",
    primaryTasks: [
      { id: "I1.1", label: "Generador de Distribuciones Espaciales", desc: "Optimización funcional de plantas arquitectónicas y recorridos espaciales.", audience: "Arquitectos, diseñadores de interiores", deliverables: ["Plano optimizado", "Análisis de flujo espacial", "Métricas de eficiencia"], tools: ["NumPy", "SciPy", "Shapely", "SVG"] },
      { id: "I1.2", label: "Auditoría BIM y Validación IFC", desc: "Detección de interferencias, verificación de parámetros y cubicaciones.", audience: "Ingenieros BIM, arquitectos técnicos", deliverables: ["Informe de clash detection", "Cubicación de materiales", "Validación IFC"], tools: ["IfcOpenShell", "Trimesh", "NumPy", "FastAPI"] },
      { id: "I1.3", label: "Planificación de Obra y Valor Ganado", desc: "Camino crítico (CPM), métricas CPI/SPI y curvas S de avance.", audience: "Directores de obra, planificadores", deliverables: ["Diagrama de Gantt optimizado", "Informe de valor ganado", "Predicción de finishing"], tools: ["Python", "Pandas", "Plotly", "Streamlit"] },
      { id: "I1.4", label: "Control de Calidad y Tolerancias", desc: "Planes de inspección (PPI), ensayos de resistencia y recepción conforme.", audience: "Inspectores de calidad, jefes de obra", deliverables: ["Plan de puntos de inspección", "Informe de ensayos", "Checklist de recepción"], tools: ["Python", "NumPy", "SciPy", "Pydantic"] },
      { id: "I1.5", label: "Motor de Optimización MDO", desc: "Optimización multidisciplinar de envolventes, huella de carbono y estructuras.", audience: "Ingenieros de edificación, consultores energéticos", deliverables: ["Optimización de envolvente", "Análisis LCA", "Informe de eficiencia energética"], tools: ["NumPy", "SciPy", "Pandas", "Plotly"] },
      { id: "I1.6", label: "Generación de Memorias y Pliegos", desc: "Redacción automatizada de especificaciones técnicas y cuadros de precios.", audience: "Arquitectos técnicos, aparejadores", deliverables: ["Memoria técnica", "Pliego de condiciones", "Cuadro de precios"], tools: ["Python", "Jinja2", "Markdown", "PDF"] },
    ],
    secondaryTasks: [
      { id: "SEC-ING-01", label: "Exportación DXF/IFC", desc: "Generación de archivos de dibujo y modelado.", prerequisites: ["I1.1", "I1.2"] },
      { id: "SEC-ING-02", label: "Logs de bitácora digital", desc: "Registro cronológico de eventos de obra.", prerequisites: ["I1.3"] },
      { id: "SEC-ING-03", label: "Alertas de sobrecostes", desc: "Notificaciones ante desviaciones presupuestarias.", prerequisites: ["I1.3"] },
      { id: "SEC-ING-04", label: "Cálculo de estructuras", desc: "Análisis de cargas y dimensionado de elementos.", prerequisites: ["I1.5"] },
      { id: "SEC-ING-05", label: "Simulación energética", desc: "Cálculo de demanda y certificación energética.", prerequisites: ["I1.5"] },
      { id: "SEC-ING-06", label: "Control de版本 BIM", desc: "Gestión de revisiones y conflictos en modelos.", prerequisites: ["I1.2"] },
      { id: "SEC-ING-07", label: "Generación de planos", desc: "Exportación de plantas, alzados y secciones.", prerequisites: ["I1.1"] },
      { id: "SEC-ING-08", label: "Informes de avance", desc: "Documentación periódica de estado de obra.", prerequisites: ["I1.3"] },
    ],
    configOptions: {
      buildingTypes: ["Residencial", "Oficina", "Industrial", "Sanitario", "Educativo"],
      normsAndStandards: ["CTE", "Eurocódigo", "ACI 318", "BREEAM", "LEED"],
      bimLevels: ["LOD 100", "LOD 200", "LOD 300", "LOD 400", "LOD 500"],
    },
    metrics: [
      { id: "M-ING-01", label: "CPI (Cost Performance Index)", cat: "Eficiencia", desc: "Ratio de valor ganado sobre costo real.", formula: "EV / AC" },
      { id: "M-ING-02", label: "SPI (Schedule Performance Index)", cat: "Eficiencia", desc: "Ratio de valor ganado sobre valor planificado.", formula: "EV / PV" },
      { id: "M-ING-03", label: "Tasa de Clash Detection", cat: "Calidad", desc: "Conflictos detectados por modelo BIM.", formula: "clashes_detectados / total_elementos * 100" },
      { id: "M-ING-04", label: "Demand Energy Ratio", cat: "Sostenibilidad", desc: "Demanda energética por superficie.", formula: "kWh/m2_año" },
    ],
    techStack: {
      execModels: ["Gemini 2.5 Flash", "Claude 3.7 Sonnet", "GPT-4o"],
      cadBimTools: ["AutoCAD", "Revit", "ArchiCAD", "FreeCAD", "BlenderBIM"],
      uiFrameworks: ["Streamlit", "React", "Flet Desktop"],
      storageEngines: ["DuckDB", "SQLite", "PostgreSQL"],
    },
    reportSections: ["Resumen Ejecutivo", "Análisis Espacial", "Simulación Energética", "Planificación de Obra", "Tech Stack y Estructura", "Protocolo de Control de Calidad", "Descargo Legal"],
  },

  diseno: {
    name: "Diseño & UX",
    color: "#EC4899",
    primaryTasks: [
      { id: "DS1.1", label: "Auditoría Heurística de Usabilidad", desc: "Evaluación bajo las 10 heurísticas de Nielsen con matriz de severidad.", audience: "UX designers, product managers", deliverables: ["Informe heurístico", "Matriz de severidad", "Recomendaciones priorizadas"], tools: ["Figma API", "Playwright", "axe-core", "Python"] },
      { id: "DS1.2", label: "Design Tokens y Componentes UI", desc: "Estructuración de tokens de color, tipografía, espaciado y contratos de componentes.", audience: "UI designers, frontend developers", deliverables: ["Sistema de tokens", "Guía de componentes", "CSS/Tailwind export"], tools: ["Style Dictionary", "TypeScript", "Vitest", "Figma"] },
      { id: "DS1.3", label: "Especificación de Interacciones y Flujos", desc: "Definición de estados de interacción, micro-animaciones y feedback.", audience: "UX designers, desarrolladores frontend", deliverables: ["Mapa de interacciones", "Spec de micro-animaciones", "Prototipo interactivo"], tools: ["Figma", "Protopie", "Lottie", "CSS"] },
      { id: "DS1.4", label: "Investigación Cualitativa y Customer Journey", desc: "Tests con usuarios, mapas de empatía, arquetipos y matrices de fricción.", audience: "UX researchers, product designers", deliverables: ["Customer Journey Map", "Arquetipos de usuario", "Matriz de fricción"], tools: ["Dovetail", "Miro", "Python", "Notion"] },
      { id: "DS1.5", label: "Auditoría WCAG 2.2 AA/AAA y ARIA", desc: "Verificación de contraste, foco visible, navegación por teclado y roles ARIA.", audience: "UX engineers, desarrolladores de accesibilidad", deliverables: ["Informe de accesibilidad", "Checklist WCAG 2.2", "Plan de remediación"], tools: ["axe-core", "Lighthouse", "Playwright", "WAVE"] },
      { id: "DS1.6", label: "Identidad de Marca y Tono de Voz", desc: "Manuales de estilo verbal, personalidad de producto y guías de microcopy.", audience: "Brand designers, copywriters", deliverables: ["Manual de marca", "Guía de tono de voz", "Sistema de microcopy"], tools: ["Figma", "Notion", "Frontitude", "CSV"] },
    ],
    secondaryTasks: [
      { id: "SEC-DS-01", label: "Exportación CSS/Tailwind", desc: "Traducción de tokens a código CSS utilizable.", prerequisites: ["DS1.2"] },
      { id: "SEC-DS-02", label: "Diseño de tests A/B", desc: "Planificación de experimentos de conversión.", prerequisites: ["DS1.4"] },
      { id: "SEC-DS-03", label: "Métricas SUS/NPS", desc: "Encuestas de satisfacción y facilidad de uso.", prerequisites: ["DS1.4"] },
      { id: "SEC-DS-04", label: "Guía de estilos responsive", desc: "Especificaciones para múltiples breakpoints.", prerequisites: ["DS1.2"] },
      { id: "SEC-DS-05", label: "Iconografía y pictogramas", desc: "Generación de iconos vectoriales consistentes.", prerequisites: ["DS1.2"] },
      { id: "SEC-DS-06", label: "Prototipos de alta fidelidad", desc: "Modelos interactivos para validación.", prerequisites: ["DS1.3"] },
      { id: "SEC-DS-07", label: "Testing con usuarios", desc: "Sesiones de usability testing grabadas.", prerequisites: ["DS1.4"] },
      { id: "SEC-DS-08", label: "Documentación de diseño", desc: "Guías técnicas para desarrolladores.", prerequisites: ["DS1.2", "DS1.3"] },
    ],
    configOptions: {
      designSystems: ["Material Design 3", "Apple HIG", "Ant Design", "Custom"],
      accessibilityLevels: ["WCAG 2.1 AA", "WCAG 2.2 AA", "WCAG 2.2 AAA"],
      outputFormats: ["Figma", "Sketch", "CSS/Tailwind", "React Components", "SVG"],
    },
    metrics: [
      { id: "M-DS-01", label: "SUS Score", cat: "Usabilidad", desc: "System Usability Scale (0-100).", formula: "suma_puntuaciones * 2.5" },
      { id: "M-DS-02", label: "Tasa de Error de Tarea", cat: "Usabilidad", desc: "Porcentaje de usuarios que fallan en una tarea.", formula: "usuarios_fallaron / total_usuarios * 100" },
      { id: "M-DS-03", label: "Tiempo de Finalización", cat: "Eficiencia", desc: "Tiempo medio para completar una tarea clave.", formula: "media(tiempos_finalización)" },
      { id: "M-DS-04", label: "WCAG Compliance Score", cat: "Accesibilidad", desc: "Porcentaje de criterios WCAG cumplidos.", formula: "criterios_cumplidos / total_criterios * 100" },
    ],
    techStack: {
      execModels: ["Gemini 2.5 Flash", "Claude 3.7 Sonnet", "GPT-4o"],
      designTools: ["Figma", "Sketch", "Adobe XD", "Penpot"],
      uiFrameworks: ["React", "Vue", "Svelte", "Tailwind CSS"],
      storageEngines: ["DuckDB", "JSON", "CSV"],
    },
    reportSections: ["Resumen Ejecutivo", "Análisis de Usabilidad", "Sistema de Diseño", "Accesibilidad WCAG", "Customer Journey", "Tech Stack y Estructura", "Recomendaciones"],
  },

  psicologia: {
    name: "Psicología & Creatividad",
    color: "#D97706",
    primaryTasks: [
      { id: "P1.1", label: "Sistema de Escucha Activa No Clínica", desc: "Reflexión, acompañamiento emocional y validación sin diagnósticos.", audience: "Coaches, orientadores, recursos humanos", deliverables: ["Sesión de escucha estructurada", "Registro de patrones emocionales", "Informe de tendencias"], tools: ["Flet", "DuckDB", "Pydantic", "Python"] },
      { id: "P1.2", label: "Motor de Pensamiento Divergente", desc: "Lluvia de ideas estructurada, creatividad y desarticulación de bloqueos.", audience: "Facilitadores, creativos, innovadores", deliverables: ["Sesión de brainstorming estructurada", "Mapa de asociaciones remotas", "Selección de ideas priorizadas"], tools: ["Python", "NetworkX", "Plotly", "Flet"] },
      { id: "P1.3", label: "Simulador de Negociación con Teoría de la Mente", desc: "Modelado de estados mentales, gestión de conversaciones difíciles.", audience: "Negociadores, managers, mediadores", deliverables: ["Análisis de posiciones", "Estrategia de negociación", "Simulación de escenarios"], tools: ["Python", "Pydantic", "FastAPI", "DuckDB"] },
      { id: "P1.4", label: "Analizador de Clima Afectivo", desc: "Evaluación del estado de ánimo colectivo según el modelo circunflejo de Russell.", audience: "Directivos de RRHH, team leads", deliverables: ["Mapa de clima emocional", "Tendencias de cohesión", "Alertas de desmotivación"], tools: ["DuckDB", "Plotly", "Python", "Pandas"] },
      { id: "P1.5", label: "Evaluador de Sesgos Cognitivos", desc: "Identificación de sesgos de confirmación, anclaje y coste hundido.", audience: "Consultores, directivos, inversores", deliverables: ["Inventario de sesgos detectados", "Estrategias de mitigación", "Análisis de decisiones"], tools: ["Python", "Pydantic", "DuckDB", "Streamlit"] },
      { id: "P1.6", label: "Asistente de Psicoeducación", desc: "Contenido educativo sobre salud mental, hábitos y regulación emocional.", audience: "Educadores, coaches, orientadores", deliverables: ["Guías psicoeducativas", "Programas de hábitos", "Material de formación"], tools: ["Python", "Flet", "DuckDB", "Markdown"] },
    ],
    secondaryTasks: [
      { id: "SEC-PSI-01", label: "Anonimización PII", desc: "Protección de datos personales en registros emocionales.", prerequisites: ["P1.1"] },
      { id: "SEC-PSI-02", label: "Guardrails éticos", desc: "Filtros de seguridad y derivación a profesionales.", prerequisites: ["P1.1", "P1.4"] },
      { id: "SEC-PSI-03", label: "Registro de sesiones", desc: "Cronología de interacciones para seguimiento.", prerequisites: ["P1.1"] },
      { id: "SEC-PSI-04", label: "Exportación de informes", desc: "Generación de documentos para profesionales.", prerequisites: ["P1.1", "P1.5"] },
      { id: "SEC-PSI-05", label: "Detección de señales de riesgo", desc: "Protocolo de derivación ante emergencias.", prerequisites: ["P1.1"] },
      { id: "SEC-PSI-06", label: "Métricas de bienestar", desc: "Seguimiento de indicadores de salud emocional.", prerequisites: ["P1.4"] },
      { id: "SEC-PSI-07", label: "Gamificación de hábitos", desc: "Sistema de incentivos para cambios de comportamiento.", prerequisites: ["P1.6"] },
      { id: "SEC-PSI-08", label: "Integración con calendarios", desc: "Programación de sesiones y recordatorios.", prerequisites: ["P1.1"] },
    ],
    configOptions: {
      interventionTypes: ["Escucha activa", "Psicoeducación", "Coaching", "Facilitación", "Mediación"],
      ethicalFrameworks: ["Código Deontológico APA", "COP Spain", "Ley 2/2023 Canales Éticos"],
      outputFormats: ["Dashboard interactivo", "Informe PDF", "Export CSV", "API REST"],
    },
    metrics: [
      { id: "M-PSI-01", label: "Tasa de Satisfacción", cat: "Calidad", desc: "Porcentaje de usuarios que valoran positivamente.", formula: "valoraciones_positivas / total_valoraciones * 100" },
      { id: "M-PSI-02", label: "Índice de Engagement", cat: "Participación", desc: "Sesiones medias por usuario por semana.", formula: "total_sesiones / num_usuarios / num_semanas" },
      { id: "M-PSI-03", label: "Tasa de Retención", cat: "Fidelización", desc: "Porcentaje de usuarios que continúan tras 30 días.", formula: "usuarios_activos_30d / usuarios_nuevos * 100" },
      { id: "M-PSI-04", label: "Cobertura de Temas", cat: "Amplitud", desc: "Porcentaje de áreas temáticas cubiertas.", formula: "temas_cubiertos / total_temas * 100" },
    ],
    techStack: {
      execModels: ["Gemini 2.5 Flash", "Claude 3.7 Sonnet", "GPT-4o"],
      psychologicalTools: ["Inventarios validados", "Escalas psicométricas", "Análisis cualitativo"],
      uiFrameworks: ["Flet Desktop", "Streamlit", "React"],
      storageEngines: ["DuckDB", "SQLite", "PostgreSQL"],
    },
    reportSections: ["Resumen Ejecutivo", "Análisis de Perfil", "Actividades Recomendadas", "Métricas de Seguimiento", "Tech Stack y Estructura", "Protocolo Ético", "Limitaciones y Derivaciones"],
  },
};
