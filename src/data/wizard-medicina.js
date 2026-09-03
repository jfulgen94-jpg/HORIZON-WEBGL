/**
 * WIZARD-MEDICINA.JS — Contenido y Lógica Especializada para el Asistente de Medicina & IA Clínica
 * Tareas M1.1 a M1.6, FHIR R4, Clasificación SaMD (MDR 2017/745), Guardrails de No-Maleficencia y QA Clínico.
 */

/**
 * Tareas primarias expandidas de Medicina con especificación detallada de inputs, outputs y riesgos clínicos
 */
export const MEDICINA_PRIMARY_TASKS = [
  {
    id: "M1.1",
    label: "Auditor y Verificador Clínico de Afirmaciones Médicas",
    shortDesc: "Segmentación atómica de textos médicos y verificación contra evidencia científica (PubMed, Cochrane, Guías de Práctica Clínica).",
    longDesc: "Motor de auditoría algorítmica que descompone notas clínicas, prospectos o artículos biomédicos en proposiciones fácticas mínimas, contrastándolas contra bases de datos científicas abiertas (PubMed/NCBI, Cochrane Database) y clasificándolas con el sistema GRADE en VERIFIED, UNVERIFIED o CONTRADICTED.",
    audience: "Comités de calidad asistencial, investigadores biomédicos, facultativos especialistas y auditores de historia clínica.",
    requiredInputs: [
      "Texto clínico o extracto bibliográfico en lenguaje natural libre",
      "Umbral mínimo de nivel de evidencia GRADE aceptado (Alto, Moderado, Bajo)",
      "Bases de conocimiento diana (PubMed Central, DrugBank Open, Fichas Técnicas AEMPS/EMA)"
    ],
    generatedOutputs: [
      "Listado atómico de afirmaciones clínicas con score de certeza [0.0 - 1.0]",
      "Citas bibliográficas directas con identificador PMID / DOI y enlace de acceso",
      "Semáforo de discrepancia o contradicción con guías de práctica clínica oficiales",
      "Dictamen de consistencia médica con firma digital y hash criptográfico"
    ],
    clinicalRisks: [
      "Falsos positivos de verificación basados en artículos biomédicos obsoletos o retractados",
      "Extrapolación errónea de resultados de ensayos preclínicos o animales a pacientes humanos",
      "Sesgo de publicación en literatura médica que sobreestime la eficacia de un tratamiento"
    ],
    complianceStandards: ["MDR 2017/745 SaMD Clase IIa", "Criterios GRADE", "STROBE / CONSORT", "RGPD Art. 9"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "M1.2",
    label: "Pipeline de Interoperabilidad y Extracción HL7 FHIR R4",
    shortDesc: "Transformación de texto no estructurado en recursos FHIR R4 (Patient, Condition, Observation, MedicationRequest).",
    longDesc: "Canalización de datos de salud que ingesta texto libre de evoluciones médicas, informes de alta y peticiones analíticas, estructurándolos en bundles JSON compatibles con el estándar internacional HL7 FHIR R4 y vinculando cada entidad a ontologías médicas normalizadas (SNOMED-CT, CIE-10-ES, LOINC, RxNorm).",
    audience: "Departamentos de informática médica hospitalaria, integradores de sistemas HIS/EHR y plataformas de telemedicina.",
    requiredInputs: [
      "Documento clínico en formato texto plano, PDF estructurado o mensaje HL7 v2",
      "Perfil FHIR R4 del servidor de destino (ej. servidor HAPI FHIR hospitalario)",
      "Catálogo de vocabularios terminológicos activos (LOINC, SNOMED-CT)"
    ],
    generatedOutputs: [
      "Bundle FHIR R4 en formato JSON validado sintáctica y semánticamente",
      "Recursos tipados: Patient, Encounter, Condition (CIE-10), Observation (LOINC), MedicationRequest",
      "Informe de cobertura terminológica con porcentaje de conceptos mapeados con éxito vs UNRESOLVED",
      "Registro de trazabilidad y procedencia (Provenance resource) del autor y fecha"
    ],
    clinicalRisks: [
      "Mapeo erróneo de códigos SNOMED-CT que altere el sentido clínico de un diagnóstico",
      "Inversión o confusión de atributos de lateralidad (ojo/extremidad izquierda vs derecha)",
      "Pérdida de modificadores de negación (ej. interpretar 'no presenta disnea' como 'disnea presente')"
    ],
    complianceStandards: ["HL7 FHIR Release 4", "EN 13606", "SNOMED International", "CIE-10-ES Diagnósticos"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "M1.3",
    label: "Monitor de Adherencia Terapéutica y Seguimiento entre Consultas",
    shortDesc: "Acompañamiento interactivo para verificación de tomas farmacológicas y detección de efectos adversos.",
    longDesc: "Sistema conversacional y telemático de soporte a pacientes crónicos polimedicados que supervisa el cumplimiento de la pauta prescrita, recopila síntomas percibidos, evalúa toxicidades tempranas y emite alertas de escalado al equipo de enfermería ante signos de descompensación clínica.",
    audience: "Servicios de atención primaria, unidades de pacientes crónicos complejos, farmacia hospitalaria y enfermería gestora de casos.",
    requiredInputs: [
      "Pauta farmacológica oficial prescrita (fármaco, dosis, vía, intervalo horario y duración)",
      "Condición clínica de base y comorbilidades del paciente (hipertensión, diabetes, insuficiencia renal)",
      "Registro de eventos adversos conocidos y alergias medicamentosas declaradas"
    ],
    generatedOutputs: [
      "Calendario interactivo de tomas con recordatorios adaptativos y verificación de ingesta",
      "Registro longitudinal de sintomatología referida por el paciente (PROMs / PREMs)",
      "Disparador de alertas con semáforo rojo/naranja ante síntomas centinela",
      "Informe de adherencia terapéutica global (índice de Morisky-Green calculado)"
    ],
    clinicalRisks: [
      "Dependencia excesiva del paciente retrasando la consulta a urgencias ante infarto o ictus",
      "Respuestas inadecuadas ante dudas de ajuste de dosis que induzcan infradosificación o toxicidad",
      "Falta de detección de interacciones con medicamentos de venta libre o fitoterapia"
    ],
    complianceStandards: ["MDR 2017/745 SaMD Clase I / IIa", "ISO 13485", "Declaración de Helsinki", "RGPD Salud"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "M1.4",
    label: "Motor de Triaje Clínico y Soporte al Diagnóstico Diferencial",
    shortDesc: "Estratificación de urgencia según el Sistema Manchester y generación de hipótesis diagnósticas jerarquizadas.",
    longDesc: "Algoritmo de soporte a la decisión clínica para servicios de urgencias y telemedicina que clasifica el nivel de prioridad del paciente en 5 niveles de agudeza mediante discriminadores validados (Manchester Triage System / MTS) y formula un abanico jerarquizado de diagnósticos diferenciales ordenados por probabilidad y letalidad potencial.",
    audience: "Facultativos y personal de enfermería de urgencias, servicios de emergencias extrahospitalarias (112/061) y triaje telefónico.",
    requiredInputs: [
      "Motivo principal de consulta y tiempo de evolución cronológico",
      "Signos vitales cardinales: Tensión Arterial, Frecuencia Cardíaca, Saturación O2, Frecuencia Respiratoria, Temperatura y Glasgow",
      "Antecedentes patológicos personales y alergias a fármacos"
    ],
    generatedOutputs: [
      "Nivel de prioridad de triaje (Nivel 1 Rojo Reanimación hasta Nivel 5 Azul No urgente)",
      "Tiempo máximo recomendado de primera atención médica",
      "Matriz de diagnósticos diferenciales: hipótesis probables vs diagnósticos de exclusión urgente ('Rule Out')",
      "Recomendación de pruebas complementarias iniciales prioritarias (ECG < 10 min, analítica, radiografía)"
    ],
    clinicalRisks: [
      "Infratriaje (clasificar erróneamente un cuadro grave en prioridad baja provocando demora crítica)",
      "Sobreestimación de síntomas inespecíficos colapsando boxes de críticos innecesariamente",
      "Sesgo de cierre prematuro descartando diagnósticos atípicos en mujeres, ancianos o diabéticos"
    ],
    complianceStandards: ["MDR 2017/745 SaMD Clase IIb", "MTS Manchester Triage System", "Guías AHA/ERC", "Ley 41/2002 Autonomía del Paciente"],
    recommendedModel: "GPT-4o"
  },
  {
    id: "M1.5",
    label: "Calculadora Médica Especializada y Razonamiento Fisiopatológico",
    shortDesc: "Cálculo computacional de escalas clínicas validadas (CHA2DS2-VASc, MELD, CURB-65, Glasgow, GFR).",
    longDesc: "Motor determinista de cálculo biomédico que computa escalas pronósticas y terapéuticas de referencia internacional con validación cruzada estricta, integrando la fórmula matemática exacta con el razonamiento fisiopatológico explicativo y las directrices de manejo clínico asociadas al resultado numérico.",
    audience: "Médicos intensivistas, cardiólogos, nefrólogos, hepatólogos y residentes en formación médica.",
    requiredInputs: [
      "Valores analíticos directos con unidades estandarizadas (Creatinina mg/dL, Bilirrubina, INR, Sodio, Plaquetas)",
      "Parámetros biométricos: edad, sexo biológico, peso, talla e índice de masa corporal (IMC)",
      "Comorbilidades clínicas marcadas como presencia/ausencia dicotómica"
    ],
    generatedOutputs: [
      "Puntuación numérica exacta de la escala clínica sin errores de redondeo",
      "Riesgo porcentual asociado: tasa anual de ictus isquémico, mortalidad a 30/90 días o fallo orgánico",
      "Estratificación categórica del riesgo (Bajo, Intermedio, Alto, Crítico)",
      "Conducta terapéutica recomendada según guías (ej. indicación formal de anticoagulación oral)"
    ],
    clinicalRisks: [
      "Confusión de unidades de medida (ej. creatinina en mg/dL frente a micromol/L provocando error de factor 88.4)",
      "Aplicación de fórmulas en poblaciones donde no han sido validadas (ej. CKD-EPI en amputados o caquécticos)",
      "Interpretación aislada del número sin integración con la situación hemodinámica global del paciente"
    ],
    complianceStandards: ["MDR 2017/745 SaMD Clase I / IIa", "Validación FDA/CE Software Clínico", "Guías ESC / KDIGO / AASLD"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "M1.6",
    label: "Analizador y Resumidor Clínico de Historias Electrónicas (EHR)",
    shortDesc: "Generación de resúmenes longitudinales estructurados y notas SOAP a partir de historiales extensos.",
    longDesc: "Procesador de historias clínicas de largo recorrido hospitalario que extrae la cronología de eventos críticos, episodios de ingreso, intervenciones quirúrgicas y tratamientos crónicos, compilándolos en notas clínicas normalizadas bajo el formato SOAP (Subjetivo, Objetivo, Apreciación, Plan) para consultas de alta velocidad.",
    audience: "Médicos de atención primaria y especializada en consulta ambulatoria, servicios de admisión y gestión de altas.",
    requiredInputs: [
      "Documentación longitudinal acumulada: informes de alta previos, evoluciones de planta y analíticas históricas",
      "Especialidad médica de destino para priorizar la información relevante",
      "Periodo temporal de interés analítico (último episodio, último año o histórico completo)"
    ],
    generatedOutputs: [
      "Línea temporal interactiva con hitos diagnósticos y terapéuticos cardinales",
      "Nota clínica estructurada en formato SOAP con separación estricta de datos subjetivos vs objetivos",
      "Lista unificada y conciliada de problemas de salud activos e inactivos",
      "Historial farmacológico con fechas de inicio, modificaciones de dosis y suspensiones"
    ],
    clinicalRisks: [
      "Omisión inadvertida de antecedentes graves como shock anafiláctico a penicilinas",
      "Alucinación de datos no consignados en la historia real durante la síntesis del texto",
      "Fusión errónea de datos de pacientes homónimos o con números de historia clínica similares"
    ],
    complianceStandards: ["MDR 2017/745 SaMD Clase I / IIa", "Formato SOAP", "UNE 179003 Seguridad del Paciente", "LOPDGDD 3/2018"],
    recommendedModel: "Claude 3.7 Sonnet"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Medicina (3 a 5 preguntas de impacto real)
 */
export const MEDICINA_DIAGNOSTIC_QUESTIONS = [
  {
    id: "med_samd_classification",
    title: "Clasificación Regulatoria SaMD (MDR UE 2017/745 Regla 11)",
    context: "El Reglamento Europeo de Productos Sanitarios (MDR) califica el software médico según el impacto clínico potencial de sus decisiones.",
    options: [
      {
        id: "class_i",
        label: "Clase I: Soporte Administrativo / Bienestar General",
        impact: "No toma decisiones diagnósticas ni terapéuticas. Permite autocertificación CE sin intervención de Organismo Notificado.",
        recommendation: "Adecuado para herramientas de estilo de vida o recordatorios; mantener estrictamente fuera del informe recomendaciones farmacológicas."
      },
      {
        id: "class_iia",
        label: "Clase IIa: Soporte a la Decisión Clínica No Urgente (CDSS)",
        impact: "Proporciona información que el facultativo usa para diagnosticar o tratar afecciones no críticas (ej. M1.1, M1.2, M1.5).",
        recommendation: "Requiere auditoría por Organismo Notificado (Notified Body), gestión de riesgos ISO 14971 y evaluación clínica documental."
      },
      {
        id: "class_iib",
        label: "Clase IIb: Triaje Urgente y Monitorización Crítica",
        impact: "Sistemas cuyas decisiones erróneas pueden provocar deterioro grave de la salud o muerte (ej. M1.4 triaje Manchester).",
        recommendation: "Exige ciclo de vida de software IEC 62304 Clase C, ensayos clínicos formales y validación de latencia inferior a 200 ms."
      }
    ]
  },
  {
    id: "med_interoperability_standard",
    title: "Estándar de Interoperabilidad con Sistemas Hospitalarios (HIS/EHR)",
    context: "La integración con historias clínicas hospitalarias determina el formato de intercambio y la arquitectura de APIs.",
    options: [
      {
        id: "fhir_r4",
        label: "HL7 FHIR Release 4 (JSON REST API)",
        impact: "Estándar moderno internacional. Permite intercambio granular de recursos (Patient, Condition, MedicationRequest) con validación sintáctica.",
        recommendation: "Usar librería fhir.resources en Python con servidor HAPI FHIR para pruebas; facilita exportaciones directas y compatibilidad futura."
      },
      {
        id: "hl7_v2_pipe",
        label: "HL7 v2.x Tradicional (Mensajes delimitados por pipes MLLP)",
        impact: "Presente en más del 70% de hospitales legados (mensajes ADT, ORU). Exige parsers de sockets TCP y transformadores de datos.",
        recommendation: "Integrar motor de interfaz como Mirth Connect o biblioteca python-hl7 para convertir mensajes v2 a modelos internos."
      },
      {
        id: "open_data_standalone",
        label: "Autónomo / Formatos Abiertos (JSON / CSV / Parquet)",
        impact: "Sin conexión directa con el sistema hospitalario central. Máxima agilidad de despliegue y cero dependencias de IT sanitaria.",
        recommendation: "Ideal para prototipos de investigación; almacenar en DuckDB cifrado local con exportación a PDF para el facultativo."
      }
    ]
  },
  {
    id: "med_guardrail_latency",
    title: "Arquitectura de Guardrails Farmacológicos y Filtros Antialucinación",
    context: "La prevención de errores de medicación exige filtros de seguridad deterministas que intercepten respuestas erróneas del LLM.",
    options: [
      {
        id: "deterministic_rules",
        label: "Reglas Deterministas en Código Puro (Cero LLM en Dosis)",
        impact: "Las dosis, contraindicaciones y fórmulas clínicas se calculan en Python puro con tolerancia cero a decimales flotantes.",
        recommendation: "El LLM solo redacta la explicación textual; las cantidades numéricas proceden exclusivamente del motor matemático determinista."
      },
      {
        id: "nemo_guardrails",
        label: "Capa de Guardrails Formales (NeMo Guardrails / Llama Guard)",
        impact: "Intercepta y evalúa semánticamente el prompt y la respuesta antes de devolverlos a la interfaz gráfica.",
        recommendation: "Configurar políticas de no-prescripción ('Do-Not-Prescribe') y redirección inmediata ante menciones de sobredosis o shock."
      },
      {
        id: "dual_physician_validation",
        label: "Flujo Asíncrono con Doble Validación Humana (Human-in-the-Loop)",
        impact: "Ningún informe o recomendación se emite sin la firma electrónica cualificada de un facultativo especialista colegiado.",
        recommendation: "Arquitectura con cola de revisión médica y log inmutable de auditoría con sellado de tiempo UTC."
      }
    ]
  },
  {
    id: "med_anonymization_level",
    title: "Estrategia de Desidentificación de Datos Clínicos (RGPD Art. 9 / HIPAA)",
    context: "El tratamiento de datos de salud exige anonimización o pseudonimización reforzada antes de enviar textos a modelos de lenguaje.",
    options: [
      {
        id: "local_ner_masking",
        label: "Enmascaramiento Local con NER Clínico (Presidio / spaCy)",
        impact: "Reemplaza nombres, DNIs, teléfonos y hospitales por etiquetas genéricas ([PACIENTE], [HOSPITAL]) antes de salir del servidor.",
        recommendation: "Integrar Microsoft Presidio Analyzer con modelo spaCy en español (es_core_news_lg) en el pipeline de preprocesamiento."
      },
      {
        id: "synthetic_only",
        label: "Datos Exclusivamente Sintéticos / Demostración",
        impact: "Cero datos reales de pacientes. Permite pruebas públicas, docencia y validaciones sin riesgo de fuga de datos de salud.",
        recommendation: "Cargar dataset sintético de 100 historias clínicas completamente ficticias pero clínicamente coherentes."
      },
      {
        id: "on_premise_sovereign",
        label: "Despliegue Local On-Premise / Servidor Soberano Hospitalario",
        impact: "Los datos de los pacientes jamás abandonan la red interna del centro hospitalario. Cumplimiento absoluto de soberanía.",
        recommendation: "Ejecutar modelos de razonamiento abiertos cuantizados (Llama 3.3 70B en vLLM) en servidores GPU locales del hospital."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Medicina)
 */
export const MEDICINA_PROJECT_TEMPLATES = [
  {
    id: "template-clinical-auditor",
    name: "Auditor Clínico de Afirmaciones Médicas con PubMed y Cochrane",
    desc: "Plataforma de verificación que segmenta notas clínicas en afirmaciones atómicas y las contrasta contra literatura biomédica usando metodología GRADE.",
    techStack: [
      { name: "Python 3.12", role: "Backend analítico y orquestación" },
      { name: "BioPython / Entrez API", role: "Conector oficial con PubMed y bases de datos NCBI" },
      { name: "DuckDB", role: "Almacenamiento local de auditoría y caché de artículos científicos" },
      { name: "Streamlit o React", role: "Interfaz de revisión con semáforo de evidencia clínica" }
    ],
    folderStructure: `clinical_auditor_engine/
├── data/
│   ├── cache/              # Artículos y abstracts de PubMed cacheados
│   └── audit_logs/         # Registro DuckDB de dictámenes emitidos
├── src/
│   ├── core/
│   │   ├── segmenter.py    # Descomposición de texto en afirmaciones atómicas
│   │   ├── pubmed_client.py# Búsqueda automatizada en NCBI Entrez
│   │   └── grade_scorer.py # Calificación del nivel de evidencia GRADE
│   ├── guardrails/
│   │   └── disclaimer.py   # Inyección de advertencia de no-prescripción
│   └── api.py              # Endpoint REST para auditoría documental
├── tests/
│   └── test_claims.py      # Casos de prueba con guías clínicas conocidas
├── requirements.txt
└── README.md`,
    dependencies: ["biopython>=1.84", "duckdb>=1.1.0", "pydantic>=2.9.0", "fastapi>=0.115.0", "requests>=2.32.0"],
    envVars: ["NCBI_API_KEY=tu_ncbi_api_key", "NCBI_EMAIL=contacto@hospital.org", "MIN_GRADE_LEVEL=MODERATE"],
    firstStep: "Instalar dependencias con 'pip install -r requirements.txt' y ejecutar 'python src/core/segmenter.py --input muestra_clinica.txt' para verificar la segmentación de afirmaciones."
  },
  {
    id: "template-fhir-pipeline",
    name: "Pipeline de Interoperabilidad HL7 FHIR R4 y Normalización SNOMED",
    desc: "Microservicio que transforma informes clínicos en texto libre a recursos estructurados FHIR R4 validados contra esquemas oficiales.",
    techStack: [
      { name: "Python 3.12 / FastAPI", role: "Microservicio de ingesta y transformación" },
      { name: "fhir.resources", role: "Modelos Pydantic autogenerados del estándar HL7 FHIR Release 4" },
      { name: "spaCy / Presidio", role: "Anonimización previa de identificadores de salud (PHI)" },
      { name: "PostgreSQL / HAPI FHIR", role: "Persistencia de recursos sanitarios estructurados" }
    ],
    folderStructure: `fhir_pipeline_engine/
├── src/
│   ├── anonymizer/
│   │   └── presidio_mask.py# Enmascaramiento de nombres y DNI
│   ├── extractors/
│   │   ├── condition.py    # Extracción de diagnósticos y mapeo CIE-10
│   │   ├── observation.py  # Extracción de analíticas y códigos LOINC
│   │   └── medication.py   # Extracción de fármacos y dosis
│   ├── fhir_builder/
│   │   └── bundle.py       # Ensamblado del FHIR Bundle JSON validado
│   └── server.py           # Servidor FastAPI con endpoint POST /v1/fhir/extract
├── schemas/
│   └── custom_profiles.json# Perfiles de validación hospitalarios
├── requirements.txt
└── Dockerfile`,
    dependencies: ["fhir.resources>=7.2.0", "fastapi>=0.115.0", "spacy>=3.8.0", "presidio-analyzer>=2.2.35", "uvicorn>=0.30.0"],
    envVars: ["FHIR_SERVER_URL=http://localhost:8080/fhir", "TERMINOLOGY_SERVER_URL=https://ontoserver.csiro.au/fhir"],
    firstStep: "Ejecutar 'uvicorn src.server:app --reload' y enviar un informe de alta clínico de prueba a '/v1/fhir/extract' para recibir el bundle JSON validado."
  },
  {
    id: "template-triage-cdss",
    name: "Motor de Triaje de Urgencias y Soporte al Diagnóstico Diferencial",
    desc: "Sistema de soporte a la decisión clínica para urgencias que categoriza la prioridad según Manchester (MTS) y sugiere hipótesis de exclusión.",
    techStack: [
      { name: "Python 3.12", role: "Kernel de clasificación de agudeza clínica" },
      { name: "Pydantic v2", role: "Validación estricta de rangos de signos vitales (FC, TA, SatO2, Glasgow)" },
      { name: "Flet Desktop / Mobile", role: "Interfaz táctil de alta velocidad para boxes de urgencias" },
      { name: "DuckDB", role: "Caché de guías de práctica clínica y log de auditoría" }
    ],
    folderStructure: `triage_cdss_engine/
├── src/
│   ├── triage/
│   │   ├── manchester.py   # Árbol de decisión Manchester Triage System
│   │   └── vitals_check.py # Validación de rangos fisiológicos incompatibles
│   ├── differential/
│   │   └── rule_out.py     # Generador de diagnósticos urgentes de exclusión
│   ├── ui/
│   │   └── triage_view.py  # Pantalla Flet táctil optimizada para enfermería
│   └── main.py             # Aplicación principal
├── guidelines/
│   └── chest_pain.json     # Protocolos específicos para dolor torácico
├── requirements.txt
└── config.yaml`,
    dependencies: ["flet>=0.23.0", "pydantic>=2.9.0", "duckdb>=1.1.0", "pyyaml>=6.0.2", "pytest>=8.3.0"],
    envVars: ["HOSPITAL_CODE=HOSP-01", "EMERGENCY_TIMEOUT_SECONDS=10", "ENABLE_FALLBACK_OFFLINE=true"],
    firstStep: "Ejecutar 'python src/main.py' para abrir el interfaz táctil de triaje y probar un caso clínico de dolor torácico evaluando la prioridad asignada."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Medicina (12-15 puntos)
 */
export const MEDICINA_DEPLOYMENT_CHECKLIST = [
  {
    category: "Cumplimiento Regulatorio y Grado Clínico",
    items: [
      "Inclusión de la cláusula obligatoria de supervisión médica no sustituible y exclusión de prescripción en todas las vistas de usuario.",
      "Documentación formal del expediente de gestión de riesgos según la norma UNE-EN ISO 14971.",
      "Verificación de la clasificación de software médico SaMD (Regla 11 del MDR 2017/745) validada con el delegado regulatorio.",
      "Comprobación de que no se prometen curaciones ni resultados diagnósticos infalibles en los textos de la interfaz."
    ]
  },
  {
    category: "Seguridad del Paciente y Guardrails Do-No-Harm",
    items: [
      "Prueba de esfuerzo con sobredosis farmacológicas: verificar que el sistema intercepta y bloquea dosis de paracetamol > 4 g/día o insulina > 100 UI.",
      "Verificación cruzada de alergias medicamentosas: comprobar alerta bloqueante si un paciente con alergia a betalactámicos recibe penicilinas.",
      "Prueba de detección de negaciones clínicas complejas: asegurar que 'sin signos de focalidad neurológica' no compute como síntoma positivo de ictus.",
      "Mecanismo de parada y derivación inmediata a urgencias ante síntomas de alarma vital (dolor torácico opresivo, disnea aguda, hemorragia activa)."
    ]
  },
  {
    category: "Rendimiento, Latencia Crítica y Disponibilidad",
    items: [
      "Latencia de inferencia y respuesta en triaje de urgencias inferior a 200 milisegundos en el 99% de las consultas.",
      "Disponibilidad de un modo degradado offline con caché local de protocolos para operar ante caídas de la conexión de red hospitalaria.",
      "Prueba de concurrencia: el servidor debe sostener al menos 30 consultas clínicas simultáneas sin degradar el tiempo de respuesta."
    ]
  },
  {
    category: "Precisión Médica y Calidad de Datos",
    items: [
      "Validación de estructura JSON contra el esquema JSON Schema oficial de HL7 FHIR Release 4 sin errores de validación.",
      "Resolución terminológica estándar: comprobar que los códigos CIE-10, LOINC y SNOMED-CT asignados existen en las ontologías oficiales.",
      "Verificación de unidades de medida: comprobar que las calculadoras médicas exigen y validan unidades analíticas explícitas (mg/dL vs mmol/L).",
      "Sellado criptográfico SHA-256 y timestamp UTC registrado en el log inmutable de cada recomendación médica emitida."
    ]
  }
];

/**
 * Presets de configuración rápida para Medicina (MVP, Producción, Enterprise)
 */
export const MEDICINA_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: MVP de Investigación Clínica / Prototipo SaMD",
    description: "Para validación conceptual académica, estudios observacionales y demostraciones con datos sintéticos sin pacientes reales.",
    recommendedConfig: {
      samdClass: "Clase I (MDR 2017/745)",
      interoperability: "Formatos abiertos en local (DuckDB + Parquet)",
      guardrails: "Reglas deterministas en Python con dataset sintético precargado",
      uiFramework: "Streamlit interactivo con visualización de evidencia GRADE",
      primaryModel: "DeepSeek V4 (Económico, riguroso en código y análisis estructurado)"
    },
    estimatedApiCostMonthly: "0 € - 30 € / mes",
    estimatedDevTime: "2 a 3 semanas (60 - 100 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Producción Clínica / Entorno Departamental Hospitalario",
    description: "Para servicios hospitalarios específicos, unidades de investigación clínica y consultas especializadas.",
    recommendedConfig: {
      samdClass: "Clase IIa (MDR 2017/745 con intervención de Organismo Notificado)",
      interoperability: "HL7 FHIR R4 conectado a servidor HAPI FHIR hospitalario",
      guardrails: "Middleware NeMo Guardrails con filtro farmacológico Do-No-Harm",
      uiFramework: "React/Next.js o Flet Desktop con autenticación reforzada de facultativo",
      primaryModel: "Claude 3.7 Sonnet (Máxima fidelidad clínica y razonamiento matizado)"
    },
    estimatedApiCostMonthly: "80 € - 200 € / mes",
    estimatedDevTime: "4 a 8 semanas (160 - 320 horas de ingeniería clínica)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Grado Hospitalario Enterprise / Red de Salud Pública",
    description: "Para redes hospitalarias completas, sistemas de triaje de urgencias autonómicos y plataformas de telemedicina masiva.",
    recommendedConfig: {
      samdClass: "Clase IIb (MDR 2017/745) con ciclo de vida IEC 62304 Clase C",
      interoperability: "Doble soporte HL7 FHIR R4 y HL7 v2 MLLP con terminología completa SNOMED-CT",
      guardrails: "Supervisión médica humana en dos pasos con log forense inmutable y clúster GPU local",
      uiFramework: "Microfrontends hospitalarios integrados en el HIS corporativo con latencia < 100 ms",
      primaryModel: "Modelos privados on-premise soberanos con guardrails multietapa de seguridad clínica"
    },
    estimatedApiCostMonthly: "> 400 € / mes",
    estimatedDevTime: "12 a 24 semanas (480 - 960 horas de ingeniería médica y regulatoria)"
  }
];

/**
 * Tareas secundarias contextuales de Medicina & Salud
 */
export const MEDICINA_SECONDARY_TASKS = [
  {
    id: "SEC-MED-01",
    label: "Guardrail Do-No-Harm y Bloqueo de Dosis Letales",
    desc: "Middleware supervisor en Python que intercepta la respuesta del modelo y bloquea dosis fuera de rango terapéutico, combinaciones tóxicas y contraindicaciones absolutas."
  },
  {
    id: "SEC-MED-02",
    label: "Normalizador Terminológico SNOMED-CT / CIE-10 / LOINC",
    desc: "Mapeo automático de entidades médicas libres hacia códigos estándar de interoperabilidad con resolución de ambigüedades y registro de no resueltos."
  },
  {
    id: "SEC-MED-03",
    label: "Validador de Esquemas FHIR R4 (HAPI FHIR / fhir.resources)",
    desc: "Validación sintáctica y de perfiles de recursos JSON FHIR antes de su persistencia en base de datos o transmisión a sistemas hospitalarios."
  },
  {
    id: "SEC-MED-04",
    label: "Log Inmutable de Trazabilidad Clínica en DuckDB",
    desc: "Registro inmutable con timestamp UTC, fuentes bibliográficas consultadas, score de confianza del LLM y hash SHA-256 de cada afirmación clínica."
  },
  {
    id: "SEC-MED-05",
    label: "Conector con APIs Biomédicas Oficiales (PubMed / DrugBank / AEMPS)",
    desc: "Recuperación dinámica en tiempo real de evidencia científica actualizada y fichas técnicas oficiales de principios activos regulados."
  },
  {
    id: "SEC-MED-06",
    label: "Sistema de Alertas de Escalado Urgente Hospitalario",
    desc: "Mecanismo de notificación inmediata multicanal (Webhook seguro, Telegram cifrado, HIS) ante detección de signos de shock, sepsis o ictus."
  },
  {
    id: "SEC-MED-07",
    label: "Filtro de No-Prescripción y Disclaimer Legal Reforzado",
    desc: "Inyección obligatoria de cláusulas formales de no-prescripción médica y recordatorio de supervisión facultativa en cada informe emitido."
  },
  {
    id: "SEC-MED-08",
    label: "Dataset Sintético de Demostración para Modo Offline",
    desc: "Conjunto de 100 historias clínicas y casos simulados totalmente anonimizados para permitir el entrenamiento y validación sin conexión externa."
  }
];

/**
 * Reglas de branching condicional específicas para proyectos de Medicina
 */
export const MEDICINA_BRANCHING_RULES = [
  {
    id: "BR-MED-01",
    condition: (answers) => answers.primaryTask === "M1.4",
    action: "Activar protocolo de triaje Manchester (MTS); forzar inclusión de signos vitales completos en schemas.py; incluir alerta de infratriaje en QA."
  },
  {
    id: "BR-MED-02",
    condition: (answers) => answers.primaryTask === "M1.2",
    action: "Integrar librería fhir.resources de Python; activar tarea SEC-MED-03 (Validador FHIR); preconfigurar esquema de bundle FHIR R4 JSON."
  },
  {
    id: "BR-MED-03",
    condition: (answers) => answers.primaryTask === "M1.1",
    action: "Activar tarea SEC-MED-05 (Conector PubMed API); forzar clasificación de evidencia según metodología GRADE; habilitar log de auditoría DuckDB."
  },
  {
    id: "BR-MED-04",
    condition: (answers) => answers.primaryTask === "M1.5",
    action: "Desactivar generador de texto no supervisado en fórmulas; forzar cálculo matemático determinista en Python puro con tolerancia cero a decimales flotantes."
  },
  {
    id: "BR-MED-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-MED-01") || answers.primaryTask === "M1.3",
    action: "Inyectar middleware de Guardrails Do-No-Harm antes del return de la API; activar cláusula de exclusión de responsabilidad médica prescriptiva."
  }
];

/**
 * Matriz de clasificación SaMD según el Reglamento Europeo de Productos Sanitarios (MDR UE 2017/745 Regla 11)
 */
export const MEDICINA_SAMD_CLASSIFICATIONS = [
  {
    classId: "Clase I",
    label: "Clase I (Bajo Riesgo Clínico)",
    scope: "Herramientas de bienestar general, recordatorios de hábitos saludables o registro personal sin toma de decisiones diagnósticas ni terapéuticas.",
    requirements: "Autocertificación CE, sistema de gestión documental básico y registro de incidencias."
  },
  {
    classId: "Clase IIa",
    label: "Clase IIa (Riesgo Moderado)",
    scope: "Software destinado a proporcionar información para la toma de decisiones diagnósticas o terapéuticas que no impliquen riesgo vital inmediato (ej. M1.1, M1.2, M1.5).",
    requirements: "Intervención de Organismo Notificado (Notified Body), auditoría ISO 13485, evaluación clínica formal y gestión de riesgos ISO 14971."
  },
  {
    classId: "Clase IIb",
    label: "Clase IIb (Riesgo Severo)",
    scope: "Sistemas de triaje urgente (M1.4), soporte en cuidados críticos o monitorización de parámetros fisiológicos con potencial de causar deterioro grave de la salud si fallan.",
    requirements: "Auditoría clínica rigurosa por Organismo Notificado, ensayos clínicos de validación y control de calidad exhaustivo de software IEC 62304."
  },
  {
    classId: "Clase III",
    label: "Clase III (Riesgo Vital Máximo)",
    scope: "Sistemas que deciden intervenciones quirúrgicas invasivas inmediatas o controlan dispositivos implantables.",
    requirements: "Máximo nivel de escrutinio regulatorio, ensayos clínicos multinacionales y aprobación previa de autoridades sanitarias nacionales."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Medicina
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateMedicinaPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = MEDICINA_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || MEDICINA_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => MEDICINA_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS CLÍNICOS (PRD)
## Producto SaMD: ${data.appName || "Horizon Clinical Assistant"}

**Fecha de Emisión:** ${now}  
**Área Horizon:** Medicina & IA Clínica  
**Clasificación Regulatoria Estimada:** ${data.samdClass || "Clase IIa (MDR UE 2017/745)"}  
**Versión Documental:** v1.0.0 (Especificación de Grado Clínico)  

---

### 1. Resumen Ejecutivo y Propósito Clínico
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción Operativa:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Población Diana:** Pacientes adultos en entorno hospitalario y ambulatorio.
- **Exclusión Expresa de Responsabilidad:** El software NO realiza prescripción autónoma de fármacos, NO sustituye el juicio clínico independiente del facultativo y opera como un Sistema de Soporte a la Decisión Clínica (CDSS).

---

### 2. Entradas y Salidas Clínicas
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Clínicos Mapeados y Medidas Mitigadoras:
${primary.clinicalRisks.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Supervisión mediante guardrail Do-No-Harm y doble validación humana.`).join("\n")}

---

### 3. Tareas Secundarias de Soporte y Trazabilidad
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa con guardrails básicos de no-maleficencia y dataset de demostración."}

---

### 4. Arquitectura Técnica y Normas de Interoperabilidad
- **Framework de Interfaz:** ${data.uiFramework || "Flet (Python Desktop / Mobile)"}
- **Motor de Almacenamiento y Log:** ${data.storageEngine || "DuckDB + Parquet (Almacenamiento Local Cifrado)"}
- **Estándar de Datos Sanitarios:** HL7 FHIR Release 4 (JSON bundles)
- **Codificación Terminológica:** SNOMED-CT (Hallazgos y Procedimientos), CIE-10-ES (Diagnósticos), LOINC (Laboratorio), RxNorm / Nomenclátor AEMPS (Medicamentos)
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con 100 casos clínicos sintéticos DEMO precargados." : "Requiere conectividad con APIs biomédicas seguras."}

---

### 5. Guardrails de Seguridad Clínica y No-Maleficencia
1. **Regla de Bloqueo de Dosis:** Intercepción de cualquier cálculo farmacológico que supere las dosis máximas de ficha técnica.
2. **Filtro Antialucinación:** Prohibición absoluta de inferir diagnósticos en ausencia de evidencia textual directa en la historia clínica.
3. **Escalado Inmediato de Emergencia:** Disparador de derivación prioritaria a urgencias ante sospecha de dolor torácico isquémico, disnea súbita o focalidad neurológica.
4. **Anonimización RGPD Art. 9:** Supresión irreversible de identificadores personales en texto libre antes del procesamiento por modelos de IA.

---

### 6. Protocolo de Verificación y Validación Clínica (V&V)
${MEDICINA_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const MEDICINA_QA_CHECKLIST = MEDICINA_DEPLOYMENT_CHECKLIST;
