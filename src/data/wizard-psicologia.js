/**
 * WIZARD-PSICOLOGIA.JS — Contenido y Lógica Especializada para el Asistente de Psicología & Ciencias del Comportamiento
 * Tareas P1.1 a P1.6, Ánima AI, Nudge Engine, Psicometría Organizacional, Ergonomía Cognitiva (NASA-TLX),
 * Seguridad Psicológica (Edmondson), Creatividad y QA Ético No Clínico.
 */

/**
 * Tareas primarias expandidas de Psicología & Ciencias del Comportamiento
 * NOTA: Taxonomía estrictamente no clínica P1.1 a P1.6
 */
export const PSICOLOGIA_PRIMARY_TASKS = [
  {
    id: "P1.1",
    label: "Ánima AI: Compañero de Autoobservación y Diálogo Reflexivo",
    shortDesc: "Asistente de escucha activa, reestructuración socrática, metacognición y registro de reflexiones privadas.",
    longDesc: "Agente reflexivo de apoyo no clínico diseñado para fomentar la autoobservación consciente, el desahogo estructurado y la introspección personal mediante preguntas socráticas abiertas, identificando distorsiones de pensamiento habituales (polarización, catastrofismo, sobregeneralización) y ofreciendo un espacio confidencial con cifrado en reposo para el examen de valores, metas y estados emocionales.",
    audience: "Personas interesadas en el autoconocimiento, coaches de desarrollo personal, mentores y facilitadores.",
    requiredInputs: [
      "Diario de reflexión o descripción en texto libre de la situación cotidiana vivida",
      "Estado de ánimo percibido y nivel de energía en escala analógica visual (1 a 10)",
      "Valores nucleares o prioridades personales sobre las que se desea reflexionar"
    ],
    generatedOutputs: [
      "Secuencia de preguntas socráticas facilitadoras orientadas a desafiar creencias limitantes",
      "Mapa visual de reencuadre cognitivo: pensamiento automático inicial vs perspectiva alternativa equilibrada",
      "Resumen ejecutivo de aprendizajes y compromisos de auto-cuidado para las próximas 24 horas",
      "Pista de autoobservación privada con almacenamiento cifrado local en DuckDB"
    ],
    clinicalRisks: [
      "Asumir rol de psicoterapeuta o intervenir ante cuadros de depresión mayor, psicosis o ideación suicida",
      "Generar apego emocional dependiente o antropomorfización excesiva del sistema de inteligencia artificial",
      "Reforzar pensamientos rumiativos no constructivos por falta de redirección hacia la acción resolutiva"
    ],
    complianceStandards: ["Declaración Ética APA sobre IA en Bienestar", "Protocolo de Salvaguarda No Clínica Horizon", "RGPD Art. 9"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "P1.2",
    label: "Nudge Engine: Arquitectura de Decisiones y Hábitos (Thaler & Sunstein)",
    shortDesc: "Diseño de incentivos conductuales sutiles, bucles de hábito (cue-routine-reward) y fricción positiva.",
    longDesc: "Motor de ingeniería del comportamiento que implementa los principios de la economía conductual y la arquitectura de decisiones de Thaler y Sunstein (Nudge Theory), estructurando entornos digitales que facilitan la adopción de hábitos saludables y la toma de decisiones óptimas sin restringir la libertad de elección del usuario, aplicando micro-compromisos, refuerzo positivo intermitente y puntos de decisión conscientes.",
    audience: "Product designers, diseñadores de hábitos en salud digital, educadores y dinamizadores comunitarios.",
    requiredInputs: [
      "Comportamiento diana a fomentar (ej. pausa activa cada 50 minutos, lectura diaria de 15 minutos)",
      "Punto de fricción actual del usuario o sesgo identificado (ej. sesgo de presente, parálisis por análisis)",
      "Canal de entrega del estímulo: notificación contextual, valor por defecto (Default) o cambio de interfaz"
    ],
    generatedOutputs: [
      "Ficha de arquitectura de decisión con matriz EAST (Easy, Attractive, Social, Timely)",
      "Bucle de hábito detallado: Señal detonante (Cue), Micro-rutina (< 2 min) y Recompensa intrínseca",
      "Configuración de valores por defecto óptimos (Opt-out ético) respetando la autonomía individual",
      "Protocolo de medición experimental A/B para cuantificar la tasa de adopción real del comportamiento"
    ],
    clinicalRisks: [
      "Diseñar empujones manipulativos (Sludge o Dark Patterns) que induzcan comportamientos contrarios al bienestar del usuario",
      "Saturación de micro-notificaciones provocando habituación, fatiga de alertas o rechazo de la herramienta",
      "Ignorar desigualdades contextuales o socioeconómicas que impiden la adopción del hábito propuesto"
    ],
    complianceStandards: ["Nudge Framework (Thaler & Sunstein)", "Modelo de Comportamiento FBM de BJ Fogg", "Código Ético de Diseño Persuasivo"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "P1.3",
    label: "Psicometría Organizacional y Diagnóstico de Equipos (Belbin & Hogan)",
    shortDesc: "Mapeo de roles de equipo de Meredith Belbin, complementariedad funcional, sesgos y dinámicas de liderazgo.",
    longDesc: "Herramienta analítica de psicología del trabajo y las organizaciones que procesa cuestionarios estandarizados de roles de equipo (Cerebro, Coordinador, Cohesionador, Impulsor, Finalizador), evaluando el equilibrio funcional del grupo de trabajo, prediciendo puntos ciegos colectivos, mitigando sesgos de pensamiento de grupo (Groupthink) y diseñando planes de alineación de competencias para proyectos de alto rendimiento.",
    audience: "Directores de recursos humanos (People Operations), líderes de equipos multidisciplinares y consultores organizacionales.",
    requiredInputs: [
      "Respuestas de los miembros del equipo a inventarios psicométricos de roles de trabajo",
      "Objetivos estratégicos y naturaleza del proyecto (innovación disruptiva, ejecución operativa, control de calidad)",
      "Historial de fricciones o bloqueos de comunicación percibidos en retrospectivas"
    ],
    generatedOutputs: [
      "Mapa radar de roles Belbin del equipo con visualización de solapamientos y vacíos de cobertura funcional",
      "Matriz de complementariedad interpersonal: parejas de trabajo con máxima sinergia colaborativa",
      "Guía preventiva de gestión de conflictos: protocolos de facilitación adaptados a perfiles dominantes",
      "Plan de rotación de liderazgo situacional según la fase del proyecto (ideación, debate, ejecución, entrega)"
    ],
    clinicalRisks: [
      "Etiquetar rígidamente a personas en tipologías fijas limitando su evolución y crecimiento profesional",
      "Utilizar diagnósticos de personalidad o estilos de trabajo para decisiones disciplinarias o de despido",
      "Aplicar cuestionarios psicométricos no baremados ni validados transculturalmente"
    ],
    complianceStandards: ["Teoría de Roles de Equipo de Belbin", "Directrices ITC sobre Evaluación Psicométrica", "Norma ISO 10667"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "P1.4",
    label: "Ergonomía Cognitiva y Evaluación de Carga Mental (NASA-TLX)",
    shortDesc: "Cálculo computacional del índice multidimensional NASA Task Load Index y diseño de interfaces con baja sobrecarga.",
    longDesc: "Sistema de ingeniería de factores humanos que implementa el método multidimensional NASA Task Load Index (NASA-TLX) para cuantificar la carga de trabajo mental, temporal, física, el esfuerzo, la frustración y el rendimiento percibido en tareas informáticas o entornos de control industrial, identificando cuellos de botella de memoria de trabajo y emitiendo recomendaciones de rediseño ergonómico.",
    audience: "Ingenieros de factores humanos, evaluadores de usabilidad crítica, diseñadores de salas de control y desarrolladores UI.",
    requiredInputs: [
      "Puntuaciones en las 6 subescalas de NASA-TLX otorgadas por usuarios tras completar una tarea (0 a 100)",
      "Pesos relativos asignados a cada subescala mediante la comparación por pares (15 comparaciones pareadas)",
      "Descripción paso a paso del flujo de trabajo y densidad informativa de las pantallas auditadas"
    ],
    generatedOutputs: [
      "Índice ponderado global de carga mental NASA-TLX con desglose por factor contribuyente principal",
      "Identificación de picos de saturación cognitiva (Overload) y fases de hipovigilancia (Underload)",
      "Matriz de simplificación ergonómica: reducción de elecciones según la Ley de Hick y agrupamiento según Miller (7 +/- 2)",
      "Informe comparativo de carga mental A/B antes y después de aplicar rediseño ergonómico"
    ],
    clinicalRisks: [
      "Administrar el cuestionario NASA-TLX con excesivo retraso tras la tarea introduciendo sesgos de recuerdo",
      "Ignorar factores emocionales o de estrés ambiental externo que distorsionen la medición de la carga mental",
      "Reducir en exceso la carga mental en tareas críticas provocando desconexión o complacencia peligrosa"
    ],
    complianceStandards: ["NASA-TLX Protocol (Hart & Staveland)", "ISO 9241-110 (Principios de diálogo ergonómico)", "ISO 10075"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "P1.5",
    label: "Dinámicas de Grupo y Medición de Seguridad Psicológica (Amy Edmondson)",
    shortDesc: "Diagnóstico cuantitativo del clima de seguridad psicológica, facilitación de retrospectivas y gestión del disenso constructivo.",
    longDesc: "Plataforma de desarrollo de equipos que procesa la escala de seguridad psicológica de 7 ítems de Amy Edmondson (Harvard Business School), evaluando el nivel de confianza de los integrantes para asumir riesgos interpersonales, admitir errores sin miedo a represalias, plantear discrepancias constructivas y formular preguntas difíciles, generando dinámicas de facilitación guiadas para fomentar la cultura de aprendizaje continuo.",
    audience: "Agile Coaches, Scrum Masters, directores de ingeniería, facilitadores de retrospectivas y consultores culturales.",
    requiredInputs: [
      "Respuestas anónimas del equipo a la encuesta de 7 ítems de Seguridad Psicológica (escala Likert 1 a 7)",
      "Tamaño del equipo, tiempo de trabajo conjunto y modalidad (remoto, presencial, híbrido)",
      "Incidentes críticos recientes: errores de producción, discrepancias no resueltas o cambios organizacionales"
    ],
    generatedOutputs: [
      "Puntuación agregada de Seguridad Psicológica del equipo con análisis de varianza interna",
      "Semáforo de dimensiones críticas: Tolerancia al Error, Disenso Constructivo, Ayuda Mutua y Valoración de Diferencias",
      "Plantilla estructurada para retrospectiva de seguridad psicológica con dinámicas 'Blameless Post-Mortem'",
      "Guía de micro-conductas para el líder: formulación de preguntas de humildad y respuesta constructiva a malas noticias"
    ],
    clinicalRisks: [
      "Romper el anonimato de las respuestas permitiendo que el liderazgo identifique o penalice al disidente",
      "Confundir seguridad psicológica con complacencia o relajación de los estándares de excelencia técnica",
      "Lanzar encuestas sin un compromiso expreso de la dirección de tomar medidas concretas ante los resultados"
    ],
    complianceStandards: ["Escala de Seguridad Psicológica de Amy Edmondson", "Proyecto Aristóteles de Google", "Estándares Agile Alliance"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "P1.6",
    label: "Creatividad, Pensamiento Lateral y Resolución de Problemas (SCAMPER & De Bono)",
    shortDesc: "Generación de ideas disruptivas mediante los 6 Sombreros de De Bono, técnica SCAMPER y pensamiento lateral provocador.",
    longDesc: "Taller computacional de innovación y pensamiento lateral que desarticula bloqueos creativos y fijación funcional, guiando sesiones de divergencia y convergencia mediante los Seis Sombreros para Pensar de Edward de Bono (Blanco, Rojo, Negro, Amarillo, Verde, Azul) y el operador heurístico SCAMPER (Sustituir, Combinar, Adaptar, Modificar, Poner en otros usos, Eliminar, Reorganizar).",
    audience: "Equipos de innovación, diseñadores de producto (Design Thinking), publicistas y líderes de I+D.",
    requiredInputs: [
      "Reto o problema planteado formulado como pregunta abierta '¿Cómo podríamos nosotros...?' (HMW)",
      "Solución convencional actual o enfoque dominante a superar",
      "Restricciones inmutables del proyecto (presupuesto, tecnología, marco legal)"
    ],
    generatedOutputs: [
      "Matriz SCAMPER completa con al menos 21 provocaciones creativas generadas sobre el reto",
      "Transcripción estructurada de debate bajo los Seis Sombreros de De Bono con separación clara de hechos, emociones y riesgos",
      "Catálogo de ideas disruptivas clasificadas en matriz Impacto vs Factibilidad (Now, How, Wow Matrix)",
      "Plan de prototipado rápido para validar en menos de 48 horas las 3 ideas más prometedoras"
    ],
    clinicalRisks: [
      "Permanecer indefinidamente en la fase de divergencia sin aterrizar las ideas en planes de acción viables",
      "Juzgar prematuramente las provocaciones con mentalidad de 'Sombrero Negro' antes de permitir la maduración de la idea",
      "Desconectar la sesión creativa del problema real de los usuarios convirtiéndola en un ejercicio lúdico estéril"
    ],
    complianceStandards: ["Metodología de Pensamiento Lateral (Edward de Bono)", "Técnica SCAMPER (Bob Eberle)", "Creative Problem Solving (CPS)"],
    recommendedModel: "Claude 3.7 Sonnet"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Psicología & Ciencias del Comportamiento (3 a 5 preguntas de impacto real)
 */
export const PSICOLOGIA_DIAGNOSTIC_QUESTIONS = [
  {
    id: "psi_intervention_scope",
    title: "Ámbito de Intervención y Salvaguardas Éticas No Clínicas",
    context: "La delimitación ética es crítica: los sistemas de bienestar deben impedir diagnósticos clínicos o sustitución de terapia.",
    options: [
      {
        id: "self_reflection_coaching",
        label: "Autoobservación Personal y Bienestar (Estrictamente No Clínico)",
        impact: "Enfoque en introspección, hábitos, productividad y gestión emocional cotidiana. Prohibición de términos diagnósticos.",
        recommendation: "Implementar clasificador semántico que detecte menciones a patologías DSM-5 y muestre mensaje de salvaguarda profesional."
      },
      {
        id: "crisis_triage_routing",
        label: "Detección Activa de Crisis y Protocolo de Derivación Inmediata",
        impact: "Identificación prioritaria de ideación autolítica, autolesión o violencia, bloqueando respuestas normales.",
        recommendation: "Mecanismo 'Hard-Intervention' que despliega de inmediato teléfonos de ayuda oficiales (024 en España, 988 en EE.UU., Teléfono de la Esperanza)."
      },
      {
        id: "organizational_culture",
        label: "Psicología Organizacional y Clima de Equipo (B2B Corporativo)",
        impact: "Medición agregada y anónima de factores de grupo (carga mental NASA-TLX, roles Belbin, seguridad psicológica).",
        recommendation: "Umbral mínimo de k-anonimato (mínimo 5 personas por departamento) para que ningún resultado individual sea identificable."
      }
    ]
  },
  {
    id: "psi_privacy_architecture",
    title: "Arquitectura de Privacidad y Tratamiento de Datos Íntimos",
    context: "Las reflexiones íntimas y respuestas psicométricas son datos de categoría especial (salud/intimidad) según el RGPD Art. 9.",
    options: [
      {
        id: "local_encrypted_duckdb",
        label: "Almacenamiento Local Cifrado con DuckDB / SQLCipher (Zero-Cloud)",
        impact: "Las reflexiones nunca salen del dispositivo del usuario. Máxima privacidad, sin riesgo de filtraciones masivas.",
        recommendation: "Cifrado AES-256 en reposo con clave derivada de contraseña maestra local usando Argon2id."
      },
      {
        id: "pseudonymized_cloud_sync",
        label: "Nube Europea con Seudonimización y Separación de Identidades",
        impact: "Permite sincronización multidispositivo mediante tokens disociados del email o datos de identidad en servidores dentro de la UE.",
        recommendation: "Arquitectura de dos tablas independientes en servidores distintos: identificadores personales por un lado, reflexiones cifradas por otro."
      },
      {
        id: "ephemeral_session_memory",
        label: "Modo Sesión Efímera (Cero Persistencia de Texto Libre)",
        impact: "El diálogo reflexivo o sesión de creatividad existe únicamente en memoria RAM durante la sesión y se destruye al cerrar.",
        recommendation: "Ideal para terminales compartidos en salas de formación o talleres corporativos presenciales."
      }
    ]
  },
  {
    id: "psi_nudge_modality",
    title: "Modalidad y Frecuencia de los Estímulos Conductuales (Nudges)",
    context: "El diseño del empujón conductual debe evitar la habituación, el spam de notificaciones y la manipulación invasiva.",
    options: [
      {
        id: "kairos_contextual",
        label: "Micro-notificaciones en Ventanas de Oportunidad (Momento Kairos)",
        impact: "El estímulo se entrega solo cuando el usuario está en el contexto adecuado para actuar (ej. inicio de jornada, tras 50 min de foco).",
        recommendation: "Límite estricto de máximo 2 estímulos al día; inclusión de opción explícita de pausar o silenciar por 7 días."
      },
      {
        id: "socratic_dialogue_pull",
        label: "Acceso a Petición del Usuario mediante Diálogo Reflexivo (Modo Pull)",
        impact: "Cero notificaciones push intrusivas. El usuario abre voluntariamente la herramienta cuando desea reflexionar o resolver un dilema.",
        recommendation: "Interacciones estructuradas en 3 pasos: Exploración socrática -> Identificación de alternativas -> Micro-compromiso de acción."
      },
      {
        id: "passive_dashboard",
        label: "Cuadro de Mando Pasivo de Hábitos y Carga Cognitiva",
        impact: "El usuario consulta métricas visuales de su progreso cuando lo desea, sin diálogos conversacionales ni alertas.",
        recommendation: "Gráficos limpios en tonos neutros; evitar elementos de gamificación compulsiva (streaks o castigos por no registrarse)."
      }
    ]
  },
  {
    id: "psi_psychometric_model",
    title: "Marco Psicométrico y Validación Estadística",
    context: "Garantiza que las mediciones psicométricas (roles, clima, carga de trabajo) tengan validez de constructo y fiabilidad demostrada.",
    options: [
      {
        id: "standardized_validated_scales",
        label: "Escalas Estandarizadas con Baremos Validados (NASA-TLX / Edmondson 7)",
        impact: "Comparabilidad con estudios internacionales y percentiles empíricos de la literatura científica.",
        recommendation: "Implementar cálculo automático del coeficiente Alfa de Cronbach para comprobar consistencia interna en la muestra."
      },
      {
        id: "custom_adaptive_surveys",
        label: "Cuestionarios Adaptativos Ligeros para Retrospectivas Ágiles",
        impact: "Encuestas ultrarrápidas de 3 a 5 preguntas que se responden en menos de 2 minutos durante reuniones de equipo.",
        recommendation: "Escalas Likert simétricas de 5 puntos con etiquetas verbales unívocas (Muy en desacuerdo a Muy de acuerdo)."
      },
      {
        id: "qualitative_socratic_inquiry",
        label: "Indagación Cualitativa Pura sin Puntuaciones Numéricas",
        impact: "Enfoque 100% conversacional y exploratorio que huye de cuantificar emociones complejas.",
        recommendation: "Registrar narrativas temáticas con etiquetado semántico de conceptos clave sin emitir notas ni puntuaciones numéricas."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Psicología & Ciencias del Comportamiento)
 */
export const PSICOLOGIA_PROJECT_TEMPLATES = [
  {
    id: "template-anima-ai-companion",
    name: "Ánima AI: Diario de Autoobservación con Almacenamiento Cifrado Local",
    desc: "Compañero reflexivo de desarrollo personal y diálogo socrático con persistencia confidencial local en DuckDB.",
    techStack: [
      { name: "Python 3.12", role: "Lógica conversacional socrática y motor reflexivo" },
      { name: "Flet (Python Desktop)", role: "Interfaz de escritorio multiplataforma elegante, sobria y accesible" },
      { name: "DuckDB + Cifrado Local", role: "Almacenamiento columnar cifrado en el propio dispositivo del usuario" },
      { name: "Claude 3.7 Sonnet", role: "Diálogo reflexivo socrático empático con guardrails estrictos no clínicos" }
    ],
    folderStructure: `anima_ai_companion/
├── data/
│   └── journal.duckdb       # Base de datos local cifrada en reposo
├── src/
│   ├── dialog/
│   │   ├── socratic_core.py # Motor de preguntas abiertas y desafiado cognitivo
│   │   └── guardrails.py    # Detector de crisis y desvío a recursos sanitarios
│   ├── storage/
│   │   └── encrypted_db.py  # Conector DuckDB con cifrado local
│   ├── ui/
│   │   ├── views/           # Vistas Flet: Reflexión del día, Historial, Valores
│   │   └── theme.py         # Paleta calmante en tonos ámbar y azul pizarra
│   └── main.py              # Punto de entrada de la aplicación de escritorio
├── tests/
│   └── test_guardrails.py   # Pruebas de detección de ideación autolítica y crisis
├── requirements.txt
└── README.md`,
    dependencies: ["flet>=0.23.0", "duckdb>=1.1.0", "pydantic>=2.9.0", "cryptography>=43.0.0", "pytest>=8.3.0"],
    envVars: ["STORAGE_MODE=LOCAL_ONLY", "CRISIS_HOTLINE_SPAIN=024", "APP_NAME=Anima AI"],
    firstStep: "Ejecutar 'pip install -r requirements.txt' y correr 'python src/main.py' para abrir la ventana de autoobservación y probar una sesión reflexiva guiada."
  },
  {
    id: "template-nudge-engine-habits",
    name: "Nudge Engine: Arquitectura de Decisiones y Hábitos Basada en Evidencia",
    desc: "Microservicio para diseño y orquestación de incentivos conductuales, bucles de hábito y medición experimental de adopción.",
    techStack: [
      { name: "Python 3.12 / FastAPI", role: "API REST para entrega de estímulos conductuales en momentos Kairos" },
      { name: "Pydantic v2", role: "Modelado estricto de bucles de hábito (Cue, Routine, Reward) y contratos EAST" },
      { name: "DuckDB", role: "Análisis columnar de tasas de conversión y cumplimiento de hábitos" },
      { name: "DeepSeek V4", role: "Generación de micro-copys motivacionales adaptados al perfil del usuario" }
    ],
    folderStructure: `nudge_engine/
├── src/
│   ├── architecture/
│   │   ├── east_matrix.py   # Implementación del marco Easy, Attractive, Social, Timely
│   │   └── habit_loops.py   # Definición formal de detonantes y micro-recompensas
│   ├── scheduler/
│   │   └── kairos_timing.py # Identificador de ventanas de oportunidad horarias
│   ├── analytics/
│   │   └── ab_testing.py    # Comparativa de tasas de adopción entre variantes
│   └── server.py            # Endpoints REST POST /v1/nudges/evaluate
├── schemas/
│   └── habit_contract.json  # Esquema JSON del compromiso conductual
├── requirements.txt
└── Dockerfile`,
    dependencies: ["fastapi>=0.115.0", "uvicorn>=0.30.0", "pydantic>=2.9.0", "duckdb>=1.1.0"],
    envVars: ["MAX_NUDGES_PER_DAY=2", "ETHICAL_OPT_OUT_ALLOWED=true", "DATABASE_PATH=./data/habits.db"],
    firstStep: "Lanzar el servidor con 'uvicorn src.server:app --reload' y enviar un POST a '/v1/nudges/evaluate' para modelar un hábito de pausa activa ergonómica."
  },
  {
    id: "template-nasa-tlx-evaluator",
    name: "Evaluador de Ergonomía Cognitiva y Carga Mental (NASA-TLX Suite)",
    desc: "Herramienta analítica interactiva para cálculo del índice multidimensional de carga de trabajo mental NASA-TLX.",
    techStack: [
      { name: "React 18 / Vite", role: "Frontend reactivo con sliders fluidos y comparaciones pareadas" },
      { name: "Chart.js / Plotly", role: "Gráficos radiales de carga cognitiva y barras de contribución factorial" },
      { name: "Tailwind CSS", role: "Diseño ergonómico de alta legibilidad con tipografía fluida y alto contraste" },
      { name: "TypeScript", role: "Modelado estricto de tipos de subescalas, pesos y puntuaciones agregadas" }
    ],
    folderStructure: `nasa_tlx_suite/
├── src/
│   ├── components/
│   │   ├── PairwiseWeight.tsx # Pantalla de 15 comparaciones pareadas de factores
│   │   ├── SubscaleSlider.tsx # Deslizadores continuos de 0 a 100 con pasos de 5
│   │   └── RadarResult.tsx    # Diagrama de radar con índice TLX ponderado global
│   ├── engine/
│   │   ├── tlx_calculator.ts  # Algoritmo formal de Hart & Staveland
│   │   └── hicks_law.ts       # Validador de tiempo de reacción según alternativas
│   ├── data/
│   │   └── benchmarks.json    # Baremos medios por sector (médico, aviación, software)
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts`,
    dependencies: ["react>=18.3.0", "react-dom>=18.3.0", "chart.js>=4.4.0", "react-chartjs-2>=5.2.0"],
    envVars: ["SHOW_BENCHMARKS=true", "DEFAULT_SCALE_STEP=5"],
    firstStep: "Ejecutar 'npm install' y 'npm run dev' para abrir la suite interactiva, realizar una autoevaluación pareada y obtener el gráfico de carga mental."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Psicología & Ciencias del Comportamiento (12-15 puntos)
 */
export const PSICOLOGIA_DEPLOYMENT_CHECKLIST = [
  {
    category: "Salvaguarda No Clínica y Protocolos de Crisis",
    items: [
      "Presencia visible y obligatoria del aviso legal de no sustitución de tratamiento médico o psicológico profesional.",
      "Prueba de detección de ideación autolítica: verificar que ante expresiones de suicidio o autolesión el sistema interrumpe el flujo normal y muestra recursos de auxilio inmediato (024 en España / 988 internacional).",
      "Prohibición categórica de emitir juicios diagnósticos o clasificaciones nosológicas DSM-5 o CIE-11.",
      "Mecanismo de derivación activa ante detección de ataques de pánico o crisis agudas con pautas de respiración de emergencia."
    ]
  },
  {
    category: "Privacidad, Confidencialidad y Anonimización",
    items: [
      "Cifrado en reposo AES-256 de todas las reflexiones personales y respuestas psicométricas en la base de datos local DuckDB.",
      "Política de no retención de texto libre: verificar que los diarios íntimos no se utilizan para reentrenamiento de modelos de IA.",
      "Anonimización estricta en cuestionarios organizacionales: umbral de k-anonimato mínimo de 5 participantes para mostrar agregados.",
      "Cumplimiento formal del artículo 9 del RGPD para el tratamiento de datos relativos al bienestar emocional."
    ]
  },
  {
    category: "Ergonomía Cognitiva y Prevención de Fatiga",
    items: [
      "Limitación del volumen de notificaciones: comprobar que ningún usuario recibe más de 2 empujones conductuales al día.",
      "Diseño anti-adicción: ausencia deliberada de mecánicas de retención manipulativa como rachas forzadas (streaks) o penalizaciones.",
      "Evaluación de carga mental de la interfaz: comprobar que las pantallas clave mantienen una puntuación NASA-TLX inferior a 50 puntos.",
      "Opción de silencio temporal: botón directo accesible para pausar todas las interacciones durante 7 o 30 días con un solo clic."
    ]
  },
  {
    category: "Validez Psicométrica y Calidad de Datos",
    items: [
      "Comprobación de simetría y neutralidad en escalas Likert de evaluación psicométrica.",
      "Control de consistencia interna mediante el cálculo automatizado del coeficiente Alfa de Cronbach en muestras organizacionales.",
      "Detección de patrones de respuesta aleatoria o complaciente (straight-lining) en cuestionarios extensos."
    ]
  }
];

/**
 * Presets de configuración rápida para Psicología & Ciencias del Comportamiento (MVP, Producción, Enterprise)
 */
export const PSICOLOGIA_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: Compañero Reflexivo Local / Prototipo de Hábitos",
    description: "Para desarrollo personal individual, autoobservación consciente y prueba ágil de empujones conductuales.",
    recommendedConfig: {
      deploymentMode: "Local en escritorio con Flet Desktop y DuckDB cifrado",
      privacyTier: "Zero-Cloud (Datos 100% confinados en el dispositivo del usuario)",
      crisisRouting: "Detector heurístico por palabras clave con teléfono 024 directo",
      uiFramework: "Flet Desktop o Streamlit local con paleta calmante",
      primaryModel: "DeepSeek V4 (Económico, excelente en estructuración de hábitos y código)"
    },
    estimatedApiCostMonthly: "0 € - 15 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de desarrollo)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Plataforma de Bienestar y Coaching Organizacional",
    description: "Para empresas medianas, coaches profesionales y equipos ágiles con diagnósticos Belbin y seguridad psicológica.",
    recommendedConfig: {
      deploymentMode: "Servidor privado en la nube europea con base de datos PostgreSQL cifrada",
      privacyTier: "Seudonimización con separación de identidades personales y reflexiones",
      crisisRouting: "Clasificador semántico avanzado con derivación ética automatizada",
      uiFramework: "React / Vite con cuadro de mando interactivo y encuestas anónimas",
      primaryModel: "Claude 3.7 Sonnet (Máxima empatía socrática, tono cálido y rigor ético)"
    },
    estimatedApiCostMonthly: "40 € - 120 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería conductual)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Suite Corporativa de Ergonomía Cognitiva y Clima Organizacional",
    description: "Para multinacionales con miles de empleados, monitorización continua de carga mental NASA-TLX y cultura Edmondson.",
    recommendedConfig: {
      deploymentMode: "Clúster dedicado en nube corporativa con k-anonimato y auditoría continua",
      privacyTier: "Cifrado homomórfico o zero-knowledge con almacenamiento HSM",
      crisisRouting: "Integración directa con el servicio de prevención de riesgos laborales y asistencia médica",
      uiFramework: "Microfrontends corporativos con analítica agregada y baremación psicométrica internacional",
      primaryModel: "Modelos dedicados privados con guardrails inmutables de salvaguarda deontológica"
    },
    estimatedApiCostMonthly: "> 250 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de psicología organizacional y sistemas)"
  }
];

/**
 * Tareas secundarias contextuales de Psicología & Ciencias del Comportamiento
 */
export const PSICOLOGIA_SECONDARY_TASKS = [
  {
    id: "SEC-PSI-01",
    label: "Protocolo de Salvaguarda Ética y Desvío a Teléfonos de Emergencia (024)",
    desc: "Mecanismo incondicional de corte que detecta ideación autolítica y despliega de inmediato teléfonos oficiales de ayuda."
  },
  {
    id: "SEC-PSI-02",
    label: "Pista de Auditoría Ética y Registro de Consentimiento en DuckDB",
    desc: "Registro inmutable con timestamp UTC del consentimiento informado del usuario y aceptación del marco no clínico."
  },
  {
    id: "SEC-PSI-03",
    label: "Cálculo Estadístico de Consistencia Interna (Alfa de Cronbach)",
    desc: "Algoritmo de validación psicométrica que verifica la fiabilidad de cuestionarios aplicados a muestras colectivas."
  },
  {
    id: "SEC-PSI-04",
    label: "Almacenamiento Local Cifrado con Zero-Knowledge (DuckDB + SQLCipher)",
    desc: "Garantía de que las reflexiones íntimas solo pueden ser leídas por el propio usuario en su dispositivo local."
  },
  {
    id: "SEC-PSI-05",
    label: "Generador de Informes de Clima y Dinámicas de Equipo en PDF",
    desc: "Exportación de informes ejecutivos con semáforos de seguridad psicológica y planes de acción para retrospectivas."
  },
  {
    id: "SEC-PSI-06",
    label: "Detector Antimanipulación de Hábitos (Prevención de Dark Patterns / Sludge)",
    desc: "Auditoría de empujones conductuales para asegurar que respetan plenamente la autonomía y bienestar del usuario."
  },
  {
    id: "SEC-PSI-07",
    label: "Guardrail Antialucinación Diagnóstica y Prohibición de Clasificación DSM",
    desc: "Inyección de directivas que impiden terminantemente al modelo etiquetar o diagnosticar patologías psiquiátricas."
  },
  {
    id: "SEC-PSI-08",
    label: "Dataset Sintético de Dinámicas y Respuestas Psicométricas DEMO",
    desc: "Respuestas sintéticas precargadas de equipos tipo para probar las analíticas de Belbin y NASA-TLX en modo offline."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Psicología
 */
export const PSICOLOGIA_BRANCHING_RULES = [
  {
    id: "BR-PSI-01",
    condition: (answers) => answers.primaryTask === "P1.1",
    action: "Activar modo reflexivo socrático; forzar almacenamiento local cifrado en DuckDB; inyectar clasificador de crisis 024."
  },
  {
    id: "BR-PSI-02",
    condition: (answers) => answers.primaryTask === "P1.2",
    action: "Integrar framework EAST de arquitectura de decisiones; activar validador ético contra patrones oscuros (Dark Patterns)."
  },
  {
    id: "BR-PSI-03",
    condition: (answers) => answers.primaryTask === "P1.4",
    action: "Activar suite de cálculo NASA-TLX con pantalla de 15 comparaciones pareadas y baremos de carga cognitiva."
  },
  {
    id: "BR-PSI-04",
    condition: (answers) => answers.primaryTask === "P1.5",
    action: "Habilitar escala de 7 ítems de Amy Edmondson; forzar protocolo de k-anonimato para proteger al disidente en el equipo."
  },
  {
    id: "BR-PSI-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-PSI-01") || answers.primaryTask === "P1.1",
    action: "Inyectar middleware prioritario de detección de ideación autolítica y despliegue del teléfono de auxilio 024."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Psicología & Ciencias del Comportamiento
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generatePsicologiaPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = PSICOLOGIA_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || PSICOLOGIA_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => PSICOLOGIA_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS CONDUCTUALES (PRD)
## Producto Conductual: ${data.appName || "Horizon Behavioral & Reflexive Engine"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Psicología & Ciencias del Comportamiento  
**Tarea Primaria Identificada:** ${primary.id} — ${primary.label}  
**Versión Documental:** v1.0.0 (Especificación Ética No Clínica)  

---

### 1. Resumen Ejecutivo y Marco Deontológico No Clínico
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción Operativa:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Cláusula Deontológica Innegociable:** Este software es una herramienta de autoobservación, desarrollo personal y dinámicas organizacionales. No constituye un dispositivo médico ni un servicio de atención psicológica o psiquiátrica clínica, y en ningún caso sustituye el diagnóstico o tratamiento por parte de profesionales de la salud mental colegiados.

---

### 2. Entradas, Salidas y Salvaguardas Éticas
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Éticos y Mitigaciones Implementadas:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Protocolos de no-diagnóstico, cifrado local estricto y derivación inmediata ante crisis.`).join("\n") || "- Mitigación mediante protocolos éticos y salvaguardas de no-diagnóstico."}

---

### 3. Tareas Secundarias de Soporte y Privacidad
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa estándar con cifrado en reposo y módulo de emergencias."}

---

### 4. Arquitectura Técnica y Confidencialidad
- **Framework de Interfaz:** ${data.uiFramework || "Flet (Python Desktop / Local) o React"}
- **Motor de Almacenamiento:** ${data.storageEngine || "DuckDB Cifrado Localmente (Zero-Cloud)"}
- **Nivel de Privacidad:** Conforme al Artículo 9 del RGPD para datos de bienestar personal.
- **Protocolo de Crisis:** Detección de emergencias y presentación del teléfono 024 de atención a la conducta suicida.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con respuestas psicométricas y dinámicas sintéticas DEMO precargadas." : "Requiere entorno Python local."}

---

### 5. Guardrails Éticos y de Comportamiento
1. **Prohibición de Diagnósticos:** Bloqueo incondicional de cualquier intento de categorizar al usuario bajo criterios DSM-5 o CIE-11.
2. **Derivación Activa de Emergencias:** Ante cualquier detección de ideación autolítica, se suspende el diálogo y se muestran recursos de ayuda médica.
3. **Cero Manipulación:** Prohibición estricta de patrones oscuros (Dark Patterns), ganchos adictivos o empujones contrarios al bienestar del usuario.
4. **Anonimato Organizacional:** Garantía de k-anonimato con un mínimo de 5 respuestas agrupadas para informes de equipo.

---

### 6. Checklist de Validación y Aseguramiento de Calidad Ética (QA)
${PSICOLOGIA_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const PSICOLOGIA_QA_CHECKLIST = PSICOLOGIA_DEPLOYMENT_CHECKLIST;
