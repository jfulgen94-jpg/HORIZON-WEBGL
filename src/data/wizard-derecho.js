/**
 * WIZARD-DERECHO.JS — Contenido y Lógica Especializada para el Asistente de Derecho & LegalTech
 * Tareas D1.1 a D1.6, CENDOJ, Secreto Profesional (art. 542 LOPJ), Cadena de Custodia (LEC) y QA Jurídico.
 */

/**
 * Tareas primarias expandidas de Derecho con especificación de inputs, outputs y riesgos procesales
 */
export const DERECHO_PRIMARY_TASKS = [
  {
    id: "D1.1",
    label: "Auditor Contractual y Detector de Riesgo de Cláusulas (Lex Guardián)",
    shortDesc: "Segmentación de contratos mercantiles, detección de asimetrías, límites de responsabilidad desproporcionados y cláusulas ausentes.",
    longDesc: "Motor de análisis dogmático y revisión de contratos complejos (M&A, SLA, NDA, arrendamientos, distribución) que clasifica cada estipulación bajo la taxonomía CUAD/LEDGAR, identificando desequilibrios lesivos, techos de indemnización (Liability Caps) abusivos, cláusulas penales leoninas y omisión de cláusulas estándar de protección.",
    audience: "Despachos de abogados, asesorías jurídicas internas de empresas, departamentos de compras y contratación pública/privada.",
    requiredInputs: [
      "Borrador o contrato escaneado en formato PDF, Word o texto plano",
      "Posición jurídica de la parte representada (Cliente/Comprador vs Proveedor/Vendedor)",
      "Jurisdicción rectora y fuero aplicable (España / Derecho Comunitario Europeo)"
    ],
    generatedOutputs: [
      "Matriz de contingencias contractuales clasificadas por semáforo de riesgo (Verde, Amarillo, Rojo)",
      "Identificación analítica de obligaciones recíprocas, plazos de preaviso y causas de resolución unilateral",
      "Detección de cláusulas de limitación de responsabilidad nulas por contravenir el art. 1102 del Código Civil (dolo/culpa grave)",
      "Propuesta de redacción alternativa balanceada ('Fall-Back clauses') con redlining editable"
    ],
    clinicalRisks: [
      "Falsa sensación de seguridad interpretando como válida una cláusula nula de pleno derecho",
      "Omisión de plazos de preaviso críticos provocando prórrogas tácitas automáticas indeseadas",
      "Incapacidad de detectar remisiones cruzadas entre contratos marco y órdenes de compra anexas"
    ],
    complianceStandards: ["Código Civil español (art. 1088-1255)", "Código de Comercio", "Secreto Profesional LOPJ", "RGPD Art. 6/9"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "D1.2",
    label: "Analizador de Jurisprudencia CENDOJ y Curia (Sententia Nova)",
    shortDesc: "Extracción de doctrinas del Tribunal Supremo y TJUE, ratio decidendi vs obiter dicta y contradicción casacional.",
    longDesc: "Plataforma de investigación procesal que procesa fondos jurisprudenciales del CENDOJ y Curia TJUE, aislando el núcleo vinculante (Ratio Decidendi) de las reflexiones accesorias (Obiter Dicta), mapeando la evolución de la doctrina civil y mercantil, y acreditando la triple identidad requerida para el recurso de casación (art. 477 LEC).",
    audience: "Letrados procesalistas, magistrados, gabinetes de estudios jurídicos y departamentos de litigación compleja.",
    requiredInputs: [
      "Texto íntegro de la sentencia recurrida o supuesto de hecho controvertido",
      "Sentencias de contraste alegadas para recurso extraordinario",
      "Ámbito jurisdiccional (Sala Primera Civil, Sala Segunda Penal o Curia TJUE)"
    ],
    generatedOutputs: [
      "Ficha procesal normalizada: Antecedentes, Fundamentos de Derecho, Ratio Decidendi y Fallo",
      "Identificación precisa de identificadores europeos ECLI y números de recurso del CENDOJ",
      "Cuadro comparativo de contradicción doctrinal sustancial para acreditación de Interés Casacional",
      "Pronóstico de viabilidad de admisión a trámite ante la Sala de Casación del Tribunal Supremo"
    ],
    clinicalRisks: [
      "Confundir un obiter dictum no vinculante con doctrina jurisprudencial consolidada",
      "Citar sentencias superadas o rectificadas por resoluciones de Pleno posteriores",
      "No advertir la existencia de cuestiones prejudiciales pendientes de resolución ante el TJUE"
    ],
    complianceStandards: ["Ley de Enjuiciamiento Civil (LEC)", "Doctrina de la Sala Primera TS", "Tratado de Funcionamiento UE (art. 267)"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "D1.3",
    label: "Motor de Cumplimiento Regulatorio, Canal Ético y Prevención Penal",
    shortDesc: "Mapeo de riesgos penales corporativos (art. 31 bis CP), protocolos de whistleblowing (Ley 2/2023) y matrices de control.",
    longDesc: "Sistema de gestión de compliance corporativo que estructura el mapa de riesgos penales exigible a la persona jurídica para la exención de responsabilidad penal, diseña el protocolo del canal interno de denuncias conforme a la Directiva UE 2019/1937 y parametriza las evidencias de control interno bajo UNE 19601.",
    audience: "Chief Compliance Officers (CCO), comités de auditoría, directores de asesoría jurídica y delegados de protección de datos.",
    requiredInputs: [
      "Organigrama societario, procesos operativos de compras, tesorería y contratación",
      "Relación de actividades con exposición a tipos penales (corrupción, fraude, fiscal, laboral)",
      "Políticas internas y código ético vigente de la corporación"
    ],
    generatedOutputs: [
      "Mapa de Riesgos Penales con matriz de calor (Riesgo Inherente vs Controles vs Riesgo Residual)",
      "Protocolo formal de gestión de denuncias con plazos legales de acuse (7 días) y respuesta (3 meses)",
      "Catálogo de evidencias documentales obligatorias para acreditar la eficacia del modelo ante fiscalía",
      "Checklist de garantías del informante: confidencialidad estricta y prohibición de represalias laborales"
    ],
    clinicalRisks: [
      "Diseño de modelos de compliance puramente cosméticos ('Paper Compliance') que no eximen de pena",
      "Vulneración de la confidencialidad de la identidad del denunciante acarreando sanciones graves de la AEPD",
      "Invasión desproporcionada de la intimidad de los trabajadores durante investigaciones internas"
    ],
    complianceStandards: ["Código Penal (art. 31 bis)", "Ley 2/2023 Protección del Informante", "UNE 19601 / ISO 37301"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "D1.4",
    label: "Asistente RAG Jurídico con Cita Normativa Exacta y Vigencia BOE",
    shortDesc: "Recuperación semántica de legislación y jurisprudencia con verificación de vigencia temporal y cita literal.",
    longDesc: "Motor de búsqueda jurídica y generación de dictámenes silogísticos sobre legislación consolidada del BOE y DOUE, que valida que los preceptos citados no hayan sido derogados tácita o expresamente a la fecha de los hechos, insertando transcripciones literales exactas sin alucinaciones.",
    audience: "Letrados en ejercicio, asesores tributarios, registradores, notarios y opositores a cuerpos jurídicos.",
    requiredInputs: [
      "Consulta jurídica o supuesto fáctico sobre el que se requiere fundamentación",
      "Fecha de acaecimiento de los hechos litigiosos (para aplicación de derecho intertemporal)",
      "Cuerpos normativos prioritarios de aplicación"
    ],
    generatedOutputs: [
      "Dictamen jurídico estructurado en Hechos, Fundamentos de Derecho y Conclusiones vinculantes",
      "Cita formal de preceptos legales: Ley, Título, Capítulo, Artículo, Apartado y Letra",
      "Alerta destacada de vigencia temporal con historial de reformas legislativas que modificaron el texto",
      "Relación de concordancias jurisprudenciales que interpretan pacíficamente el artículo invocado"
    ],
    clinicalRisks: [
      "Alucinación de artículos o leyes inexistentes en el ordenamiento jurídico",
      "Aplicación de una redacción legislativa actual a hechos ocurridos con anterioridad a su entrada en vigor",
      "Omisión de disposiciones transitorias que modulan los efectos de la reforma legal"
    ],
    complianceStandards: ["Constitución Española (art. 9.3 Jerarquía Normativa)", "BOE Consolidado", "Código Civil (art. 2 Vigencia)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "D1.5",
    label: "Detector de Cláusulas Abusivas y Protección del Consumidor",
    shortDesc: "Auditoría de hipotecas y créditos (cláusulas suelo, gastos, comisiones, revolving) y doble control de transparencia.",
    longDesc: "Herramienta especializada en litigación bancaria y defensa de consumidores que examina préstamos hipotecarios y contratos de crédito al consumo, sometiendo las condiciones generales de la contratación al doble control de transparencia formal y material (Directiva 93/13/CEE y jurisprudencia del TJUE).",
    audience: "Abogados especializados en derecho bancario y del consumo, asociaciones de consumidores y gabinetes periciales.",
    requiredInputs: [
      "Escritura notarial de préstamo hipotecario o contrato de tarjeta revolving",
      "Cuadro histórico de amortizaciones y liquidaciones de intereses aplicadas",
      "Oferta vinculante previa (FIPER / FEIN) entregada al prestatario antes de la firma"
    ],
    generatedOutputs: [
      "Listado categorizado de cláusulas nulas: Suelo, Gastos hipotecarios, Vencimiento anticipado, Comisiones de apertura",
      "Análisis de usura en tarjetas revolving contrastando el TAE aplicado contra las tablas históricas del Banco de España",
      "Cuantificación dineraria aproximada de las cantidades a restituir más intereses legales devengados",
      "Escrito formal de reclamación extrajudicial previa ante el Servicio de Atención al Cliente (SAC) de la entidad"
    ],
    financialRisks: [
      "No advertir la condición de no-consumidor del prestatario (profesional o autónomo adquiriendo para su actividad)",
      "Cálculo erróneo de la indemnización por prescripción parcial de gastos registrales o tasación",
      "Planteamiento de demandas judiciales sin agotar la vía de reclamación extrajudicial previa obligatoria"
    ],
    complianceStandards: ["Directiva 93/13/CEE", "Ley General de Consumidores (TRLGDCU)", "Ley 5/2019 de Crédito Inmobiliario"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "D1.6",
    label: "Due Diligence Legal Automatizada en Operaciones Corporativas (M&A)",
    shortDesc: "Auditoría masiva de sociedades, secretaría corporativa, litigios pendientes y cláusulas de cambio de control.",
    longDesc: "Plataforma de auditoría mercantil que procesa el data room de la empresa target en procesos de compraventa de empresas (M&A) o rondas de financiación, identificando contingencias societarias, laborales, contractuales y litigiosas, y sintetizándolas en un Red Flags Report ejecutivo.",
    audience: "Departamentos de M&A de despachos internacionales, fondos de Private Equity, Venture Capital y directores financieros.",
    requiredInputs: [
      "Documentación societaria: Estatutos, libros de actas de juntas, pactos de socios y titularidad real",
      "Contratos comerciales estratégicos con clientes y proveedores clave",
      "Relación de litigios en curso y requerimientos de inspección tributaria/laboral"
    ],
    generatedOutputs: [
      "Red Flags Report estructurado con semáforos de riesgo y cuantificación en euros de las contingencias",
      "Identificación de cláusulas de Cambio de Control (Change of Control) que facultan a terceros a rescindir contratos",
      "Calificación de contingencias en: Deal Breakers, Condiciones Precedentes (CP) o Ajustes al Precio de Compra",
      "Borrador de cláusulas específicas de declaraciones y garantías (Reps & Warranties) para el contrato de compraventa"
    ],
    financialRisks: [
      "No detectar la necesidad de consentimientos de acreedores o administraciones públicas previas al cierre",
      "Subestimar la provisión contable requerida para un litigio mercantil de alta cuantía",
      "Inconsistencias no detectadas entre el libro registro de socios y las participaciones inscritas en el Registro Mercantil"
    ],
    complianceStandards: ["Ley de Sociedades de Capital (LSC)", "Ley 3/2009 Modificaciones Estructurales", "Práctica de M&A Internacional"],
    recommendedModel: "GPT-4o"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Derecho & LegalTech (3 a 5 preguntas de impacto real)
 */
export const DERECHO_DIAGNOSTIC_QUESTIONS = [
  {
    id: "der_secreto_profesional",
    title: "Nivel de Confidencialidad y Secreto Profesional (art. 542 LOPJ)",
    context: "El deber de secreto profesional del abogado prohíbe exponer información de clientes a proveedores externos sin garantías de no-reentrenamiento.",
    options: [
      {
        id: "local_isolated",
        label: "Procesamiento Local Aislado (Zero-Data Retention On-Premise)",
        impact: "Los expedientes y contratos no salen de la red del despacho. Máxima protección frente a filtraciones y requerimientos de revelación.",
        recommendation: "DuckDB local cifrado con SQLCipher y modelos abiertos de razonamiento (Llama 3.3 70B) en servidor GPU privado del bufete."
      },
      {
        id: "enterprise_api_optout",
        label: "APIs Comerciales con Cláusula Contractual de Exclusión de Entrenamiento",
        impact: "Uso de Claude 3.7 Sonnet o GPT-4o mediante suscripción Enterprise/API que garantiza que los prompts no se almacenan para entrenar.",
        recommendation: "Firmar el Data Processing Addendum (DPA) con el proveedor de IA y activar la anonimización previa de PII procesal."
      },
      {
        id: "public_research_open",
        label: "Investigación Doctrinal Abierta (Sin datos de clientes identificables)",
        impact: "Consultas puramente abstractas sobre leyes y sentencias públicas del CENDOJ donde no concurre secreto profesional.",
        recommendation: "Uso sin restricciones de modelos en la nube para análisis dogmático de alta velocidad a coste mínimo."
      }
    ]
  },
  {
    id: "der_jurisdiction_scope",
    title: "Ámbito Jurisdiccional y Jerarquía Normativa Aplicable",
    context: "Determina las bases documentales que deben ser indexadas y las reglas de resolución de antinomias jurídicas.",
    options: [
      {
        id: "spain_internal",
        label: "Derecho Español Estatal y Autonómico (BOE + CENDOJ)",
        impact: "Enfoque en Código Civil, Código de Comercio, LEC, leyes tributarias y jurisprudencia del Tribunal Supremo y Audiencias Provinciales.",
        recommendation: "Conector con API del BOE consolidado y colección de embeddings vectoriales sobre sentencias seleccionadas del CENDOJ."
      },
      {
        id: "eu_community",
        label: "Derecho de la Unión Europea y Curia TJUE",
        impact: "Primacía de Reglamentos Comunitarios, Directivas traspuestas y jurisprudencia vinculante del Tribunal de Justicia de la UE.",
        recommendation: "Integrar base EUR-Lex y buscador por código ECLI con verificación de cuestiones prejudiciales pendientes."
      },
      {
        id: "cross_border_commonlaw",
        label: "Contratación Internacional y Derecho Comparado (Cross-Border)",
        impact: "Contratos regidos por ley inglesa o del Estado de Nueva York con terminología anglosajona (Indemnity, Representations, Warranties).",
        recommendation: "Utilizar modelos con dominio nativo de taxonomía contractual anglosajona (CUAD / Contract Understanding Dataset)."
      }
    ]
  },
  {
    id: "der_rag_verification",
    title: "Control de Alucinaciones y Verificación de Citas Normativas",
    context: "La presentación de sentencias o leyes falsas en un tribunal acarrea sanciones procesales severas y responsabilidad civil profesional.",
    options: [
      {
        id: "strict_lexical_lookup",
        label: "Verificación Lexical Rígida contra BOE Oficial (Zero Hallucination)",
        impact: "Cada precepto citado es buscado automáticamente en la base del BOE; si el artículo no existe textualmente, se bloquea la salida.",
        recommendation: "Pipeline de validación cruzada con expresión regular de coincidencia y marcado [NO ENCONTRADO] para revisión humana."
      },
      {
        id: "semantic_citation_graph",
        label: "Grafo de Citaciones y Concordancias Jurisprudenciales",
        impact: "Mapea no solo el artículo sino las sentencias de casación que lo interpretan, detectando cambios doctrinales de Pleno.",
        recommendation: "Base de datos en grafo (Neo4j o NetworkX) que vincula artículos normativos con sentencias del Tribunal Supremo."
      },
      {
        id: "human_attorney_signoff",
        label: "Revisión y Firma Preceptiva por Abogado Colegiado (Human-in-the-Loop)",
        impact: "El software genera borradores con notas al pie y referencias resaltadas que el letrado debe cotejar y validar expresamente.",
        recommendation: "Interfaz de redlining con visor lateral de la sentencia original para cotejo en un solo clic."
      }
    ]
  },
  {
    id: "der_document_output",
    title: "Formato Procesal de Salida y Compatibilidad con Sedes Judiciales",
    context: "La presentación telemática ante los tribunales exige estándares técnicos rigurosos de foliado y compatibilidad con LexNET.",
    options: [
      {
        id: "lexnet_pdfa",
        label: "PDF/A-1b Foliado con Firma Electrónica Cualificada (LexNET / Justizia)",
        impact: "Documento preparado para su presentación directa ante juzgados y tribunales con índice interactivo y metadatos procesales.",
        recommendation: "Generador headless en Python con ReportLab o WeasyPrint configurado para exportar PDF/A conforme al Esquema Judicial de Interoperabilidad."
      },
      {
        id: "docx_redlining",
        label: "Microsoft Word (.docx) con Control de Cambios (Track Changes)",
        impact: "Formato estándar en la negociación mercantil entre despachos; permite aceptar o rechazar estipulaciones alternativas.",
        recommendation: "Librería python-docx para generar comentarios al margen y redlining con marcado de cláusulas de contingencia."
      },
      {
        id: "structured_json_audit",
        label: "Payload JSON Estructurado para ERP Jurídico / Data Room",
        impact: "Integración con gestores de expedientes (Aranzadi, Lefebvre, Clio) o plataformas de Due Diligence de M&A.",
        recommendation: "Modelos Pydantic v2 validados con esquema de contingencias, importe estimado de riesgo y probabilidad procesal."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Derecho)
 */
export const DERECHO_PROJECT_TEMPLATES = [
  {
    id: "template-contract-auditor",
    name: "Auditor Contractual y Detector de Riesgos Cláusula por Cláusula (Lex Guardián)",
    desc: "Herramienta de revisión contractual que clasifica estipulaciones bajo taxonomía CUAD, detecta techos de responsabilidad abusivos y genera redlining.",
    techStack: [
      { name: "Python 3.12", role: "Backend analítico y segmentación" },
      { name: "python-docx / PyMuPDF", role: "Extracción y modificación de documentos Word/PDF conservando estilos" },
      { name: "DuckDB + SQLCipher", role: "Almacenamiento local cifrado de contratos y registros de auditoría" },
      { name: "Claude 3.7 Sonnet", role: "Motor de razonamiento dogmático y propuestas de redacción alternativa" }
    ],
    folderStructure: `lex_guardian_engine/
├── data/
│   ├── contracts/          # Documentos originales cifrados en local
│   └── redlines/           # Borradores Word con control de cambios
├── src/
│   ├── segmentation/
│   │   └── clause_parser.py# Segmentación en cláusulas operativas
│   ├── analysis/
│   │   ├── liability_cap.py# Auditoría de techos y art. 1102 CC
│   │   └── risk_matrix.py  # Asignación de semáforo verde/amarillo/rojo
│   ├── redlining/
│   │   └── docx_builder.py # Generación de archivo Word con sugerencias
│   └── api/
│       └── server.py       # Endpoint POST /v1/contract/audit
├── tests/
│   └── test_nda.py         # Pruebas con contratos estándar conocidos
├── requirements.txt
└── README.md`,
    dependencies: ["python-docx>=1.1.2", "pymupdf>=1.24.0", "duckdb>=1.1.0", "fastapi>=0.115.0", "pydantic>=2.9.0"],
    envVars: ["STORAGE_ENCRYPTION_KEY=clave_cifrado_aes256", "DEFAULT_JURISDICTION=ES", "MAX_LIABILITY_RATIO=1.5"],
    firstStep: "Instalar dependencias con 'pip install -r requirements.txt' y ejecutar 'python src/segmentation/clause_parser.py --file sample_sla.docx' para ver las cláusulas identificadas."
  },
  {
    id: "template-legal-rag-boe",
    name: "Motor RAG Jurídico con Citas Verificadas del BOE y CENDOJ (Sententia Nova)",
    desc: "Asistente de fundamentación jurídica que recupera preceptos legales vigentes y sentencias del Tribunal Supremo sin alucinaciones.",
    techStack: [
      { name: "Python 3.12", role: "Orquestación y validación de citas" },
      { name: "Qdrant / pgvector", role: "Base de datos vectorial para jurisprudencia procesada" },
      { name: "LlamaIndex / LangChain", role: "Pipeline RAG con reranking semántico (BGE-Reranker)" },
      { name: "DeepSeek V4", role: "Generación de dictámenes silogísticos y cotejo dogmático" }
    ],
    folderStructure: `sententia_rag_engine/
├── data/
│   ├── boe_consolidated/   # Código Civil, Penal, LEC, LSC actualizados
│   └── jurisprudence/      # Sentencias del Tribunal Supremo indexadas
├── src/
│   ├── ingestion/
│   │   └── boe_indexer.py  # Pipeline de descarga y troceado por artículos
│   ├── retrieval/
│   │   └── hybrid_search.py# Búsqueda híbrida BM25 + Embeddings vectoriales
│   ├── verification/
│   │   └── cite_checker.py # Verificación de existencia real del artículo
│   └── generator/
│       └── legal_memo.py   # Redacción de fundamentación jurídica estructurada
├── requirements.txt
└── config.yaml`,
    dependencies: ["qdrant-client>=1.12.0", "llama-index>=0.11.0", "requests>=2.32.0", "sentence-transformers>=3.1.0", "duckdb>=1.1.0"],
    envVars: ["QDRANT_URL=http://localhost:6333", "BOE_API_ENDPOINT=https://boe.es/datosabiertos", "STRICT_VERIFICATION=true"],
    firstStep: "Ejecutar 'python src/ingestion/boe_indexer.py --code civil' para indexar el Código Civil y formular la primera consulta de prescripción extintiva."
  },
  {
    id: "template-whistleblowing-compliance",
    name: "Canal Ético y Sistema de Cumplimiento Penal (Whistleblowing Ley 2/2023)",
    desc: "Plataforma de recepción y gestión confidencial de denuncias corporativas conforme a la Ley 2/2023 y prevención penal (art. 31 bis CP).",
    techStack: [
      { name: "Python 3.12 / FastAPI", role: "Backend seguro de gestión de expedientes" },
      { name: "Pydantic v2", role: "Validación de formularios de denuncia y estados de trámite" },
      { name: "PostgreSQL + Cifrado E2EE", role: "Persistencia de denuncias con cifrado simétrico por expediente" },
      { name: "React + Tailwind", role: "Buzón de denuncias anónimo accesible vía navegador sin rastreo de IP" }
    ],
    folderStructure: `compliance_whistleblowing/
├── src/
│   ├── crypto/
│   │   └── envelope_enc.py # Cifrado de clave asimétrica para cada denuncia
│   ├── compliance/
│   │   ├── deadline_mgr.py # Control de plazos (7 días acuse, 3 meses resolución)
│   │   └── risk_matrix.py  # Mapeo a tipos del Código Penal (art. 31 bis)
│   ├── audit/
│   │   └── forensictrail.py# Log inmutable de actuaciones del instructor
│   └── api/
│       └── endpoints.py    # Endpoints de denuncia anónima y panel del CCO
├── requirements.txt
└── Dockerfile`,
    dependencies: ["fastapi>=0.115.0", "cryptography>=43.0.0", "sqlalchemy>=2.0.36", "pydantic>=2.9.0", "uvicorn>=0.30.0"],
    envVars: ["POSTGRES_DB_URL=postgresql://user:pass@localhost:5432/compliance", "MASTER_KEY_VAULT=./keys/master.key"],
    firstStep: "Correr 'uvicorn src.api.endpoints:app --reload' y acceder al formulario del canal ético para generar una denuncia de prueba con acuse de recibo cifrado."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Derecho (12-15 puntos)
 */
export const DERECHO_DEPLOYMENT_CHECKLIST = [
  {
    category: "Cumplimiento Normativo y Deontología Forense",
    items: [
      "Inclusión obligatoria del disclaimer deontológico de no-asesoramiento vinculante en la portada y pie de página de cada informe.",
      "Comprobación de que el sistema no emite conclusiones de certeza absoluta sobre el fallo judicial (preservar el alea procesal).",
      "Validación de que las propuestas de recursos procesales se ajustan a las causas tasadas de la Ley de Enjuiciamiento Civil.",
      "Verificación de que el canal de denuncias corporativo cumple todos los requisitos de la Ley 2/2023 (acuse de recibo < 7 días naturales)."
    ]
  },
  {
    category: "Secreto Profesional y Seguridad Criptográfica",
    items: [
      "Verificación de la cláusula Zero Data Retention (ZDR) con el proveedor de APIs de IA acreditando que los textos no se usarán para entrenamiento.",
      "Cifrado en reposo (AES-256) de todos los contratos, notas de encargo y escritos de alegaciones alojados en disco o base de datos.",
      "Aislamiento estricto de expedientes: pruebas de penetración para asegurar que un cliente no puede acceder a documentos de otro cliente.",
      "Anonimización previa de datos personales (nombres, DNI, datos fiscales) en textos litigiosos antes de enviarlos a modelos de IA."
    ]
  },
  {
    category: "Rendimiento, Indexación y Latencia Procesal",
    items: [
      "Tiempo de segmentación y análisis de un contrato mercantil de 40 páginas inferior a 15 segundos.",
      "Capacidad de búsqueda semántica híbrida en fondo jurisprudencial con latencia de respuesta inferior a 500 ms.",
      "Soporte de exportación a PDF/A-1b con foliado digital y sellado criptográfico en menos de 2 segundos."
    ]
  },
  {
    category: "Rigor Dogmático, Citas y Trazabilidad",
    items: [
      "Prueba de verificación de citas: comprobar que el 100% de los artículos y leyes citadas existen en el BOE y estaban vigentes a la fecha de los hechos.",
      "Diferenciación estricta entre Ratio Decidendi vinculante y Obiter Dicta accesorio en todas las fichas de jurisprudencia CENDOJ/Curia.",
      "Detección de nulidad de cláusulas de renuncia a responsabilidad por dolo o culpa grave conforme al art. 1102 del Código Civil.",
      "Registro inmutable con hash SHA-256 de cada dictamen emitido para preservar la cadena de custodia documental (art. 335 LEC)."
    ]
  }
];

/**
 * Presets de configuración rápida para Derecho & LegalTech (MVP, Producción, Enterprise)
 */
export const DERECHO_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: MVP Despacho Individual / Prototipo de Investigación",
    description: "Para letrados individuales y pequeños despachos que desean acelerar la revisión de contratos y búsqueda de sentencias sin inversión en servidores.",
    recommendedConfig: {
      deploymentMode: "Local en PC del abogado con DuckDB cifrado",
      ragSource: "BOE consolidado en ficheros locales + dataset DEMO",
      verificationLevel: "Revisión manual humana asistida por IA",
      uiFramework: "Flet Desktop o Streamlit local",
      primaryModel: "DeepSeek V4 (Económico, alta precisión analítica y código)"
    },
    estimatedApiCostMonthly: "0 € - 25 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Producción Profesional / Bufete Mediano y Asesoría Interna",
    description: "Para firmas de abogados con múltiples asociados, departamentos de contratación corporativa y asesorías jurídicas de empresa.",
    recommendedConfig: {
      deploymentMode: "Servidor privado del bufete o nube soberana europea (Hetzner/OVH)",
      ragSource: "Base vectorial Qdrant con jurisprudencia del CENDOJ y Curia TJUE",
      verificationLevel: "Verificación automática lexical en BOE con redlining Word",
      uiFramework: "React/Next.js con autenticación 2FA y roles (Socio, Asociado, Junior)",
      primaryModel: "Claude 3.7 Sonnet (Máximo rigor dogmático y estilo forense impecable)"
    },
    estimatedApiCostMonthly: "60 € - 180 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Grado Institucional / Gran Firma Internacional y Compliance",
    description: "Para grandes despachos multidispositivos, corporaciones IBEX con canal ético oficial y órganos de la Administración de Justicia.",
    recommendedConfig: {
      deploymentMode: "Infraestructura privada On-Premise con clúster GPU local aislado",
      ragSource: "Grafo completo de citaciones jurídicas, BOE, DOUE y jurisprudencia histórica",
      verificationLevel: "Doble firma cualificada eIDAS, log forense inmutable y auditoría de accesos",
      uiFramework: "Microfrontends corporativos integrados en el gestor documental del bufete",
      primaryModel: "Modelos privados dedicados con guardrails jurídicos específicos y zero-logging"
    },
    estimatedApiCostMonthly: "> 350 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de ingeniería multidisciplinar)"
  }
];

/**
 * Tareas secundarias contextuales de Derecho & LegalTech
 */
export const DERECHO_SECONDARY_TASKS = [
  {
    id: "SEC-LAW-01",
    label: "Filtro Anti-Alucinación de Citas Jurídicas y Preceptos",
    desc: "Restricción severa que prohíbe formular preceptos o artículos inventados no contrastados con la base de datos legislativa."
  },
  {
    id: "SEC-LAW-02",
    label: "Log de Auditoría Inmutable con Sellado de Tiempo en DuckDB",
    desc: "Registro inmutable con hash SHA-256 de cada documento y dictamen para garantizar la cadena de custodia probatoria."
  },
  {
    id: "SEC-LAW-03",
    label: "Extractor de Topes de Responsabilidad y Cláusulas Penales",
    desc: "Módulo especializado en el cálculo de techos económicos indemnizatorios (Liability Caps) y penalizaciones por SLA."
  },
  {
    id: "SEC-LAW-04",
    label: "Persistencia Columnar Local y Modo Offline Seguro",
    desc: "Almacenamiento de contratos confidenciales en DuckDB + Parquet en local sin transmisión a servidores externos de terceros."
  },
  {
    id: "SEC-LAW-05",
    label: "Exportador de Dictámenes Procesales en PDF con Firma Electrónica",
    desc: "Formateo formal de informes y escritos con estructura procesal y espacios para sellado de tiempo cualificado eIDAS."
  },
  {
    id: "SEC-LAW-06",
    label: "Módulo de Anonimización de Datos Personales (PII) Judicial",
    desc: "Ofuscación sistemática de nombres de partes, DNI, cuentas bancarias y domicilios preservando el sentido jurídico del litigio."
  },
  {
    id: "SEC-LAW-07",
    label: "Disclaimer Legal Deontológico y No-Asesoramiento Vinculante",
    desc: "Inyección automática de la cláusula formal de que el sistema es una herramienta de soporte analítico para letrados colegiados."
  },
  {
    id: "SEC-LAW-08",
    label: "Dataset Sintético de Contratos y Pleitos DEMO para Modo Offline",
    desc: "Colección de 50 contratos mercantiles y sentencias anonimizadas para validar el sistema sin conexión a internet."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Derecho
 */
export const DERECHO_BRANCHING_RULES = [
  {
    id: "BR-DER-01",
    condition: (answers) => answers.primaryTask === "D1.1",
    action: "Activar módulo de extracción CUAD/LEDGAR; forzar auditoría de cláusulas de limitación de responsabilidad y penalizaciones."
  },
  {
    id: "BR-DER-02",
    condition: (answers) => answers.primaryTask === "D1.2",
    action: "Activar parser de sentencias CENDOJ/Curia; exigir separación estricta de Ratio Decidendi y Obiter Dicta; activar tarea SEC-LAW-01."
  },
  {
    id: "BR-DER-03",
    condition: (answers) => answers.primaryTask === "D1.3",
    action: "Integrar matriz de riesgos penales art. 31 bis CP; habilitar protocolo de canal ético conforme a Ley 2/2023 de whistleblowing."
  },
  {
    id: "BR-DER-04",
    condition: (answers) => answers.primaryTask === "D1.5",
    action: "Activar doble test de transparencia formal y material; habilitar calculadora de intereses usurarios en tarjetas revolving."
  },
  {
    id: "BR-DER-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-LAW-06") || answers.primaryTask === "D1.6",
    action: "Activar módulo de anonimización profunda de PII; reforzar secreto profesional conforme al art. 542 de la Ley Orgánica del Poder Judicial."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Derecho & LegalTech
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateDerechoPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = DERECHO_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || DERECHO_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => DERECHO_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS LEGALTECH (PRD)
## Producto Legal: ${data.appName || "Horizon Legal Assistant"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Derecho & LegalTech / Compliance  
**Marco Jurisdiccional:** España / Unión Europea  
**Versión Documental:** v1.0.0 (Especificación Jurídico-Técnica Formal)  

---

### 1. Resumen Ejecutivo y Alcance Procesal
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción del Núcleo Operativo:** ${primary.longDesc}
- **Público Jurídico Destinatario:** ${primary.audience}
- **Garantías de Secreto Profesional:** Cumplimiento del art. 542 LOPJ y Código Deontológico de la Abogacía Española.
- **Cláusula de Salvaguarda Deontológica:** La herramienta es un instrumento computacional de soporte a la investigación y redacción técnica para letrados colegiados. En ningún caso emite asesoramiento legal vinculante ni sustituye la preceptiva defensa letrada.

---

### 2. Entradas, Salidas y Riesgos Jurídicos
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Procesales Identificados y Medidas Mitigadoras:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Verificación cruzada contra bases oficiales del BOE/CENDOJ y supervisión letrada obligatoria.`).join("\n") || "- Mitigación mediante guardrails y verificación cruzada."}

---

### 3. Tareas Secundarias de Soporte y Cadena de Custodia
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa estándar con trazabilidad en DuckDB y dataset de demostración."}

---

### 4. Arquitectura Técnica y Soberanía de Datos
- **Framework de Interfaz de Usuario:** ${data.uiFramework || "Flet (Python Desktop / Local)"}
- **Motor de Almacenamiento y Evidencias:** ${data.storageEngine || "DuckDB + Parquet (Almacenamiento Cifrado Local)"}
- **Alineación con Estándares Procesales:** Cumplimiento de especificaciones de presentación telemática LexNET / Justizia en formato PDF/A foliado.
- **Protección de Datos Sensibles:** Anonimización sistemática de PII previa al procesamiento conforme a doctrina del CENDOJ y LOPDGDD.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con colección de 50 contratos y resoluciones DEMO precargadas." : "Requiere conectividad segura con bases de datos jurídicas."}

---

### 5. Guardrails Jurídicos y Control de Alucinaciones
1. **Bloqueo de Citas Ficticias:** Rechazo terminante de cualquier sentencia o artículo legal que no devuelva un hash verificable en las fuentes oficiales.
2. **Control de Jerarquía Normativa:** Primacía del Derecho Comunitario y leyes orgánicas sobre disposiciones reglamentarias inferiores.
3. **Verificación de Fecha de Hechos:** Inyección obligatoria de la fecha de litigio para evaluar la vigencia de preceptos en el tiempo exacto de devengo.
4. **Trazabilidad Forense:** Registro inmutable con sellado de tiempo de cada dictamen emitido apto para ratificación pericial judicial (art. 335 LEC).

---

### 6. Checklist de Validación y Aseguramiento de Calidad Jurídica (QA)
${DERECHO_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const DERECHO_QA_CHECKLIST = DERECHO_DEPLOYMENT_CHECKLIST;
