/**
 * WIZARD-CONTABILIDAD.JS — Contenido y Lógica Especializada para el Asistente de Contabilidad & Auditoría
 * Tareas C1.1 a C1.6, PGC, Cuadre de Partida Doble (Debe == Haber), SII, FacturaE/VeriFactu y QA Contable.
 */

/**
 * Tareas primarias expandidas de Contabilidad con especificación de inputs, outputs y riesgos contables/tributarios
 */
export const CONTABILIDAD_PRIMARY_TASKS = [
  {
    id: "C1.1",
    label: "Motor de Conciliación Bancaria y Propuesta de Asientos (Balance Inteligente)",
    shortDesc: "Cruce de extractos bancarios (Norma 43, MT940, CAMT.053) contra Libro Mayor con cuadre estricto de partida doble.",
    longDesc: "Algoritmo de conciliación de alta precisión que ingesta ficheros normalizados de movimientos bancarios (Cuaderno 43 de la Asociación Española de Banca, MT940 SWIFT, CAMT.053 ISO 20022) y los coteja contra los apuntes del Libro Mayor en cuentas del subgrupo 57 (Tesorería), detectando descuadres, partidas pendientes y proponiendo asientos de ajuste en partida doble con validación de equilibrio exacto (Suma Debe == Suma Haber).",
    audience: "Directores de contabilidad, tesoreros de empresa, controllers financieros y auditores internos.",
    requiredInputs: [
      "Fichero de extracto bancario electrónico en formato Norma 43, MT940 o CSV estructurado",
      "Libro Mayor de las cuentas de tesorería (572.x) del ERP contable en el mismo intervalo temporal",
      "Tolerancia temporal de desfase de fecha valor (ej. +/- 3 días hábiles bancarios)"
    ],
    generatedOutputs: [
      "Informe de conciliación con saldo según bancos vs saldo según contabilidad y saldo conciliado",
      "Listado de partidas conciliadas automáticamente con score de confianza de emparejamiento (Matching Score)",
      "Propuesta de asientos contables de regularización (comisiones bancarias cuenta 626, intereses cuenta 669/769)",
      "Exportación directa de asientos de ajuste compatibles con el plan general contable para importación en ERP"
    ],
    clinicalRisks: [
      "Emparejamiento erróneo de transferencias con importes idénticos correspondientes a diferentes clientes (Falso Matching)",
      "Registro duplicado de comisiones o gastos financieros ya contabilizados manualmente",
      "No considerar diferencias por tipo de cambio en cuentas denominadas en divisa extranjera (moneda no euro)"
    ],
    complianceStandards: ["Plan General de Contabilidad (RD 1514/2007)", "Norma 43 CSB", "ISO 20022 CAMT", "Código de Comercio (art. 25-49)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "C1.2",
    label: "Pipeline de Ingesta OCR y Cumplimiento Fiscal (FacturaE / VeriFactu)",
    shortDesc: "Extracción estructurada de facturas y tickets con generación XML FacturaE 3.2.2 y hash encadenado VeriFactu.",
    longDesc: "Canalización de procesamiento documental que aplica reconocimiento óptico de caracteres especializado sobre facturas de proveedores y tickets de gasto, extrayendo CIF/NIF emisor/receptor, bases imponibles desagregadas por tipo de IVA (4%, 10%, 21%), retenciones IRPF y generando ficheros XML conformes a FacturaE 3.2.2 y registros de facturación con hash encadenado según el Reglamento VeriFactu (RD 1007/2023).",
    audience: "Asesorías fiscales, departamentos de cuentas a pagar (Accounts Payable), gestorías y directores de administración.",
    requiredInputs: [
      "Documentos escaneados o PDF de facturas y justificantes de gasto",
      "Catálogo maestro de proveedores con CIF validado en censo VIES/AEAT",
      "Cuentas contables de gasto predeterminadas por tipo de proveedor (subgrupos 60 o 62)"
    ],
    generatedOutputs: [
      "Ficha de metadatos de factura: emisor, receptor, fecha, número de serie, bases, IVA y total",
      "Fichero XML oficial FacturaE 3.2.2 con firma electrónica avanzada XAdES",
      "Registro de alta de facturación con huella hash SHA-256 encadenada según especificación VeriFactu",
      "Asiento contable de compra/gasto propuesto (cuentas 60x/62x, 472 H.P. IVA Soportado a 400x/410x Proveedores)"
    ],
    clinicalRisks: [
      "Deducción indebida de cuotas de IVA en tickets simplificados que no identifican el NIF del destinatario",
      "Rotura del encadenamiento criptográfico de hashes en VeriFactu invalidando la serie contable ante inspección",
      "Tratamiento incorrecto de facturas con inversión del sujeto pasivo (art. 84 Ley IVA) o recargo de equivalencia"
    ],
    complianceStandards: ["Ley 18/2022 Crea y Crece", "Reglamento VeriFactu (RD 1007/2023)", "FacturaE 3.2.2", "Ley 37/1992 del IVA"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "C1.3",
    label: "Contabilidad Analítica, Centros de Coste y Costes ABC",
    shortDesc: "Reparto primario y secundario de costes indirectos mediante inductores de coste (Cost Drivers) y márgenes.",
    longDesc: "Módulo de contabilidad de gestión y analítica de costes que implementa el método de costes basados en actividades (Activity-Based Costing / ABC), distribuyendo costes directos e indirectos entre centros de coste primarios (producción, comercial) y auxiliares (mantenimiento, administración), calculando márgenes de contribución por línea de negocio, cliente o producto.",
    audience: "Controllers de gestión, directores de fábrica, analistas de costes y directores de planificación financiera.",
    requiredInputs: [
      "Libro Diario financiero clasificado por naturaleza del gasto (grupo 6 PGC)",
      "Catálogo de centros de coste (CeCo) y centros de beneficio de la organización",
      "Matriz de inductores de actividad (horas máquina, número de pedidos, metros cuadrados, número de empleados)"
    ],
    generatedOutputs: [
      "Matriz de reparto primario y subreparto secundario de costes indirectos con liquidación en cascada",
      "Coste unitario absorbido por producto y servicio desglosado en materiales, mano de obra y CIF",
      "Cuenta de Pérdidas y Ganancias Analítica con márgenes escalonados (Margen Bruto, Margen de Contribución, EBITDA)",
      "Análisis de desviaciones entre coste estándar presupuestado y coste real incurrido"
    ],
    clinicalRisks: [
      "Selección inadecuada de inductores de coste distorsionando la rentabilidad real de los productos (Subsidio Cruzado)",
      "Inclusión de gastos financieros o extraordinarios ajenos a la operativa productiva en el coste de fabricación",
      "Falta de conciliación periódica entre el resultado de la contabilidad analítica y el resultado contable del PGC"
    ],
    complianceStandards: ["Directrices AECA de Contabilidad de Gestión", "NIC 2 Existencias", "Principios PGC de Devengo y Correlación"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "C1.4",
    label: "Liquidación y Cuadre de Modelos Tributarios (303, 111, 115 y SII)",
    shortDesc: "Cálculo y cuadre de autoliquidaciones periódicas de IVA, retenciones de IRPF y suministro inmediato a la AEAT.",
    longDesc: "Motor de cumplimiento tributario que consolida los libros registro de facturas emitidas y recibidas para calcular automáticamente las casillas oficiales de las autoliquidaciones periódicas de la Agencia Tributaria (Modelo 303 de IVA trimestral/mensual, Modelo 111 de retenciones sobre rendimientos del trabajo, Modelo 115 de retenciones de arrendamientos) y genera ficheros XML de envío para el Suministro Inmediato de Información (SII) en el plazo legal de 4 días naturales.",
    audience: "Asesores fiscales tributarios, jefes de administración, despachos contables y directores fiscales de grupos.",
    requiredInputs: [
      "Libros registro oficiales de facturas emitidas, recibidas y bienes de inversión del periodo tributario",
      "Prorrata de IVA aplicable (general o especial) en caso de actividades mixtas con sectores diferenciados",
      "Retenciones practicadas y soportadas registradas en las cuentas del subgrupo 475/473"
    ],
    generatedOutputs: [
      "Borrador de liquidación del Modelo 303 con desglose casilla a casilla (régimen general, adquisiciones intracomunitarias, cuotas compensadas)",
      "Borrador de liquidación del Modelo 111 y Modelo 115 con número de perceptores y retenciones acumuladas",
      "Informe de conciliación fiscal: comprobación de cuadre entre bases imponibles del IVA y cifra de negocios de la cuenta de pérdidas y ganancias",
      "Fichero estructurado conforme al esquema XSD del SII para transmisión telemática directa a la sede electrónica de la AEAT"
    ],
    clinicalRisks: [
      "Presentación fuera de plazo de envíos al SII incurriendo en sanciones de la AEAT (0.5% del importe de la factura)",
      "Deducción indebida de cuotas de IVA soportado no vinculadas exclusivamente a la actividad económica",
      "Discrepancias no justificadas entre el resumen anual Modelo 390 / 190 y las declaraciones periódicas trimestrales"
    ],
    complianceStandards: ["Ley General Tributaria (Ley 58/2003)", "Reglamento del IVA (RD 1624/1992)", "Orden HFP/417/2017 (SII)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "C1.5",
    label: "Análisis Financiero de Balances, Ratios PGC y Solvencia",
    shortDesc: "Diagnóstico económico-financiero con cálculo de Fondo de Maniobra, NOF, ratios de liquidez, solvencia y Altman Z-Score.",
    longDesc: "Plataforma analítica que procesa el Balance de Situación y la Cuenta de Pérdidas y Ganancias formulados según los modelos oficiales del PGC (normal, abreviado o PYMES), determinando el equilibrio financiero a corto y largo plazo (Fondo de Maniobra vs Necesidades Operativas de Fondos NOF), ratios de rentabilidad económica (ROA) y financiera (ROE), coste medio de la deuda y modelos predictivos de insolvencia (Z-Score de Altman para empresas no cotizadas).",
    audience: "Analistas de riesgos bancarios, directores financieros (CFO), auditores de cuentas y órganos de administración.",
    requiredInputs: [
      "Balance de Situación formal con desglose de masas patrimoniales (Activo No Corriente, Corriente, Patrimonio Neto, Pasivo)",
      "Cuenta de Pérdidas y Ganancias desglosada hasta Resultado Neto del Ejercicio",
      "Estados contables de al menos 2 ejercicios consecutivos cerrados para análisis de tendencias temporales"
    ],
    generatedOutputs: [
      "Cuadro de masas patrimoniales porcentuales y balance funcional con Fondo de Maniobra y NOF",
      "Batería de ratios financieros: Ratio de Liquidez Corriente, Test Ácido, Ratio de Solvencia / Garantía y Ratio de Endeudamiento",
      "Descomposición de la rentabilidad financiera mediante el modelo DuPont de 3 factores (Margen * Rotación * Apalancamiento)",
      "Puntuación predictiva de vulnerabilidad financiera Altman Z' con categorización en Zona Segura, Gris o Quiebra"
    ],
    clinicalRisks: [
      "No ajustar el Patrimonio Neto deduciendo dividendos a cuenta o créditos a socios distorsionando la solvencia real",
      "Interpretar una elevada rentabilidad sobre fondos propios (ROE) sin advertir un sobreendeudamiento peligroso",
      "Confundir beneficio contable con liquidez real ignorando la capacidad de generación de caja operativa"
    ],
    complianceStandards: ["Plan General de Contabilidad (Tercera Parte: Cuentas Anuales)", "Doctrina ICAC", "Reglamento de Auditoría de Cuentas"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "C1.6",
    label: "Auditoría Contable Forense y Detección de Fraude (Ley de Benford)",
    shortDesc: "Auditoría analítica con tests de Benford, corte de operaciones (Cut-Off), asientos manuales en fechas atípicas y descuadres.",
    longDesc: "Sistema de control y auditoría financiera interna que somete el Libro Diario completo a procedimientos analíticos automatizados, evaluando la distribución de los primeros y segundos dígitos mediante la Ley de Benford para detectar manipulación artificial de importes, verificando el principio de corte de operaciones (Cut-Off) en el cierre de ejercicio, e identificando asientos manuales de ajuste registrados en fines de semana, festivos o por usuarios no habituales.",
    audience: "Auditores de cuentas inscritos en el ROAC, comités de auditoría interna, inspectores tributarios y peritos judiciales económicos.",
    requiredInputs: [
      "Libro Diario completo del ejercicio contable con campos obligatorios: Asiento, Fecha, Cuenta, Debe, Haber, Concepto y Usuario",
      "Umbral de significación o importancia relativa de auditoría (Materialidad)",
      "Calendario laboral oficial y matriz de usuarios contables autorizados"
    ],
    generatedOutputs: [
      "Test estadístico de la Ley de Benford con cálculo de Chi-Cuadrado y gráfico comparativo de frecuencias observadas vs esperadas",
      "Relación de asientos sospechosos de manipulación o redondeo sistemático (ej. facturas justo por debajo de límites de aprobación)",
      "Auditoría de corte de operaciones: verificación de albaranes de entrega de los últimos 5 días de diciembre y primeros de enero",
      "Informe forense de asientos manuales atípicos con descuadres temporales o anulaciones sin justificación documental"
    ],
    clinicalRisks: [
      "Generar falsos positivos de fraude en cuentas con precios tarifarios fijos regulados no sujetos a distribución de Benford",
      "Falta de verificación documental de las evidencias digitales antes de formular conclusiones periciales de fraude",
      "Ignorar operaciones con partes vinculadas no reflejadas explícitamente en la memoria de las cuentas anuales"
    ],
    complianceStandards: ["Normas Internacionales de Auditoría adaptadas a España (NIA-ES 240 Fraude, NIA-ES 520)", "Ley 22/2015 de Auditoría de Cuentas"],
    recommendedModel: "GPT-4o"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Contabilidad (3 a 5 preguntas de impacto real)
 */
export const CONTABILIDAD_DIAGNOSTIC_QUESTIONS = [
  {
    id: "cont_plan_cuentas",
    title: "Estructura del Plan General de Contabilidad y Longitud de Subcuentas",
    context: "La estructura de cuentas determina la granularidad analítica, la compatibilidad con el ERP y las reglas de validación sintáctica.",
    options: [
      {
        id: "pgc_pymes_7",
        label: "PGC PYMES (Subcuentas de 7 u 8 dígitos)",
        impact: "Estándar para empresas con cifra de negocios < 10M €. Estructura simple de balance y cuenta de pérdidas y ganancias abreviada.",
        recommendation: "Configurar validador de subcuentas a 8 dígitos con relleno de ceros automáticos (ej. 43000001) para evitar colisiones."
      },
      {
        id: "pgc_normal_10",
        label: "PGC Normal / Gran Empresa (Subcuentas de 10 a 12 dígitos)",
        impact: "Exige desglose por centros de coste CeCo, proyectos y líneas de negocio vinculadas en el propio código contable.",
        recommendation: "Esquema relacional con tabla maestra de CeCos y validación de doble entrada analítica en cada apunte de diario."
      },
      {
        id: "ifrs_multidivisa",
        label: "Normas Internacionales NIIF / IFRS con Multidivisa",
        impact: "Cálculo continuo de diferencias de cambio realizadas e irrealizadas (cuentas 668/768) con revaluación mensual de saldos.",
        recommendation: "Integrar tabla diaria de tipos de cambio oficiales del Banco Central Europeo (BCE) con redondeo bancario estricto."
      }
    ]
  },
  {
    id: "cont_verifactu_compliance",
    title: "Cumplimiento del Reglamento VeriFactu y Facturación Electrónica B2B",
    context: "El RD 1007/2023 y la Ley Crea y Crece imponen requisitos de software de facturación inalterable y encadenamiento criptográfico.",
    options: [
      {
        id: "verifactu_remision_aeat",
        label: "Sistema VeriFactu con Remisión Inmediata a la AEAT",
        impact: "Envío telemático automático de cada registro de alta/anulación a la Agencia Tributaria en el momento de expedir la factura.",
        recommendation: "Cola de envíos asíncronos con reintentos automáticos y almacenamiento del código seguro de verificación (CSV) retornado."
      },
      {
        id: "verifactu_no_remision",
        label: "Sistema No-VeriFactu (Custodia Local con Hash Encadenado)",
        impact: "Exige firma electrónica del registro y encadenamiento SHA-256 de cada factura con la anterior, listo para inspección in situ.",
        recommendation: "Almacenamiento inmutable en DuckDB con clave criptográfica en módulo seguro (HSM) y generación de código QR obligatorio."
      },
      {
        id: "internal_drafts",
        label: "Borradores y Contabilidad Interna de Gestión (Sin validez fiscal)",
        impact: "Entorno de simulación contable previa sin consecuencias tributarias directas ni necesidad de encadenamiento de facturación.",
        recommendation: "Ideal para validación de algoritmos de matching bancario y conciliación sin restricciones burocráticas."
      }
    ]
  },
  {
    id: "cont_fiscal_regime",
    title: "Régimen de IVA y Frecuencia de Obligaciones Tributarias",
    context: "Determina la periodicidad de los modelos de la AEAT y las exigencias de plazos en el Suministro Inmediato de Información (SII).",
    options: [
      {
        id: "general_trimestral",
        label: "Régimen General Trimestral (Pymes y Autónomos)",
        impact: "Presentación trimestral del Modelo 303 (abril, julio, octubre, enero). Cero obligación de envío inmediato de facturas al SII.",
        recommendation: "Generador de borradores del Modelo 303 con acumulación periódica y comprobación de cuadre con el Modelo 390 anual."
      },
      {
        id: "sii_redeme_mensual",
        label: "SII Obligatorio / REDEME (Plazo legal de 4 días naturales)",
        impact: "Transmisión electrónica de facturas a la AEAT en 4 días naturales desde su expedición o registro contable (con exclusión de festivos nacionales).",
        recommendation: "Worker en background con alertas automáticas de caducidad de plazo (< 48 horas) para evitar sanciones de 0.5% del importe."
      },
      {
        id: "prorrata_sectores",
        label: "Actividades Mixtas con Regla de Prorrata (General o Especial)",
        impact: "Deducción fraccionada del IVA soportado según el porcentaje de operaciones con derecho a deducción sobre el volumen total.",
        recommendation: "Cálculo dinámico de la prorrata provisional y regularización automática en la autoliquidación del 4º trimestre."
      }
    ]
  },
  {
    id: "cont_erp_integration",
    title: "Nivel de Integración y Traspaso de Asientos al ERP",
    context: "El destino de los asientos contables determina las salvaguardas de control interno y los protocolos de sincronización.",
    options: [
      {
        id: "file_batch_import",
        label: "Ficheros de Importación por Lotes (Excel / CSV / XML)",
        impact: "El contable descarga un fichero estandarizado y lo importa manualmente en su ERP (A3, Sage, Contasol, Holded).",
        recommendation: "Formateador con perfiles de exportación predefinidos para los principales software contables españoles."
      },
      {
        id: "direct_api_sync",
        label: "Sincronización Directa vía API REST de ERP",
        impact: "Los asientos aprobados se insertan automáticamente en la base de datos del ERP mediante webhooks o endpoints REST.",
        recommendation: "Implementar cola de mensajes con idempotencia y token de bloqueo para impedir duplicaciones de asientos por reintentos de red."
      },
      {
        id: "human_review_portal",
        label: "Portal de Revisión y Validación Humana Previa Obligatoria",
        impact: "Ningún apunte contable entra al ERP sin la aprobación expresa de un contable con rol de supervisor o jefe de administración.",
        recommendation: "Bandeja de entrada con vista previa del asiento en partida doble y resaltado de discrepancias en color ámbar."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Contabilidad)
 */
export const CONTABILIDAD_PROJECT_TEMPLATES = [
  {
    id: "template-bank-reconciliation",
    name: "Motor de Conciliación Bancaria Automática (Norma 43 y CAMT.053)",
    desc: "Plataforma de conciliación que ingesta extractos bancarios de múltiples entidades, los cruza con la cuenta 572 y propone asientos de regularización.",
    techStack: [
      { name: "Python 3.12", role: "Backend analítico y parsers bancarios" },
      { name: "DuckDB + Parquet", role: "Motor columnar ultrarrápido para almacenamiento de extractos y mayores" },
      { name: "Streamlit o Flet Desktop", role: "Interfaz visual de matching de partidas con semáforo de confianza" },
      { name: "Claude 3.7 Sonnet", role: "Clasificación de conceptos no estructurados y propuesta de subcuentas PGC" }
    ],
    folderStructure: `bank_reconciliation_engine/
├── data/
│   ├── statements/          # Ficheros Norma 43 y CAMT.053 subidos
│   └── ledger/              # Extracto de la cuenta 572 del ERP
├── src/
│   ├── parsers/
│   │   ├── norma43.py       # Parser de ficheros CSB Norma 43
│   │   └── camt053.py       # Parser XML ISO 20022 CAMT.053
│   ├── matching/
│   │   ├── exact_matcher.py # Cruce por importe exacto y fecha valor (+/- 3 días)
│   │   └── fuzzy_concept.py # Matching difuso de conceptos bancarios
│   ├── journal_builder/
│   │   └── entries.py       # Generador de asientos en partida doble (Debe == Haber)
│   └── app.py               # Aplicación interactiva de conciliación
├── tests/
│   └── test_n43_parser.py   # Pruebas con extractos sintéticos
├── requirements.txt
└── README.md`,
    dependencies: ["duckdb>=1.1.0", "pandas>=2.2.3", "streamlit>=1.39.0", "pydantic>=2.9.0", "pytest>=8.3.0"],
    envVars: ["ERP_FORMAT=A3_INNUVIA", "TOLERANCE_DAYS=3", "AUTO_MATCH_THRESHOLD=0.95"],
    firstStep: "Ejecutar 'pip install -r requirements.txt' y correr 'streamlit run app.py' cargando un fichero Norma 43 de prueba para visualizar la conciliación automática."
  },
  {
    id: "template-ocr-verifactu-pipeline",
    name: "Pipeline OCR de Facturas y Emisor VeriFactu / FacturaE",
    desc: "Canalización de extracción documental de facturas de proveedores con generación de asientos PGC y encadenamiento criptográfico RD 1007/2023.",
    techStack: [
      { name: "Python 3.12 / FastAPI", role: "Microservicio de procesamiento documental" },
      { name: "PyMuPDF / doctr", role: "Extracción óptica de textos, tablas de bases y tipos de IVA" },
      { name: "cryptography / lxml", role: "Generación del hash encadenado SHA-256 y firma XML FacturaE 3.2.2" },
      { name: "DeepSeek V4", role: "Extracción estructurada JSON de facturas complejas o tickets arrugados" }
    ],
    folderStructure: `ocr_verifactu_pipeline/
├── src/
│   ├── ocr/
│   │   └── invoice_extractor.py # Extracción de emisor, NIF, bases y retención
│   ├── tax_validator/
│   │   └── vat_rules.py         # Validación de tipos de IVA (21%, 10%, 4%, 0%)
│   ├── verifactu/
│   │   ├── chain_hasher.py      # Encadenamiento SHA-256 (Hash N = f(Hash N-1, Factura N))
│   │   └── qr_generator.py      # Generador de código QR fiscal obligatorio
│   ├── export/
│   │   └── facturae_builder.py  # Generador de XML FacturaE 3.2.2
│   └── server.py                # Endpoint REST POST /v1/invoices/process
├── schemas/
│   └── facturae_3_2_2.xsd       # Esquema oficial de validación
├── requirements.txt
└── Dockerfile`,
    dependencies: ["fastapi>=0.115.0", "pydantic>=2.9.0", "cryptography>=43.0.0", "lxml>=5.3.0", "qrcode>=7.4.2", "uvicorn>=0.30.0"],
    envVars: ["COMPANY_CIF=B12345678", "VERIFACTU_PRIVATE_KEY=./keys/cert.pem", "STORAGE_DIR=./data/invoices"],
    firstStep: "Iniciar el servidor con 'uvicorn src.server:app --reload' y enviar un PDF de factura a '/v1/invoices/process' para recibir el asiento PGC y el hash VeriFactu."
  },
  {
    id: "template-forensic-audit-benford",
    name: "Suite de Auditoría Forense y Detección de Fraude (Benford & Cut-Off)",
    desc: "Herramienta analítica para auditores que somete el Libro Diario a pruebas de Benford, cortes de fin de año y asientos manuales atípicos.",
    techStack: [
      { name: "Python 3.12", role: "Motor estadístico de auditoría analítica" },
      { name: "DuckDB", role: "Ingesta masiva de Diarios de millones de filas en segundos" },
      { name: "SciPy / NumPy", role: "Cálculo de bondad de ajuste Chi-Cuadrado y distribuciones de Benford" },
      { name: "Plotly / React", role: "Gráficos de barras interactivos comparando frecuencias esperadas vs reales" }
    ],
    folderStructure: `forensic_audit_suite/
├── src/
│   ├── loader/
│   │   └── journal_loader.py # Ingesta de diarios desde Excel, CSV o DuckDB
│   ├── tests/
│   │   ├── benford_test.py   # Análisis de primer, segundo y dos primeros dígitos
│   │   ├── cutoff_audit.py   # Auditoría de corte de operaciones fin de ejercicio
│   │   └── weekend_posts.py  # Detección de asientos en festivos o fines de semana
│   ├── reporting/
│   │   └── audit_memo.py     # Generación de informe ejecutivo de anomalías
│   └── main.py               # Script de ejecución por línea de comandos
├── sample_data/
│   └── journal_2025.parquet  # Diario de ejemplo con anomalías inyectadas
├── requirements.txt
└── config.yaml`,
    dependencies: ["duckdb>=1.1.0", "scipy>=1.14.0", "numpy>=2.1.0", "plotly>=5.24.0", "jinja2>=3.1.4"],
    envVars: ["MATERIALITY_THRESHOLD=5000", "BENFORD_ALPHA=0.05", "OUTPUT_DIR=./reports"],
    firstStep: "Ejecutar 'python src/main.py --input sample_data/journal_2025.parquet' para generar el informe forense con las alertas de la Ley de Benford."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Contabilidad (12-15 puntos)
 */
export const CONTABILIDAD_DEPLOYMENT_CHECKLIST = [
  {
    category: "Integridad Contable y Partida Doble",
    items: [
      "Cuadre incondicional de partida doble: verificar que en el 100% de los asientos generados la Suma del Debe es exactamente igual a la Suma del Haber con 0.00 € de discrepancia.",
      "Comprobación de codificación según PGC: verificar que todas las cuentas contables empleadas existen en el cuadro de cuentas oficial (4 a 8 dígitos).",
      "Prueba de redondeo monetario: comprobar que los importes se redondean a exactamente 2 decimales según la norma bancaria estándar (aritmética Decimal).",
      "Prohibición de autoasientos: verificar que ningún apunte se inserta en el ERP sin aprobación expresa por un contable humano."
    ]
  },
  {
    category: "Cumplimiento Fiscal y VeriFactu (AEAT)",
    items: [
      "Verificación del hash encadenado VeriFactu: comprobar que el hash del registro N incluye el hash del registro N-1 y no puede alterarse a posteriori.",
      "Validación de estructura XML FacturaE contra el esquema XSD oficial del Ministerio de Asuntos Económicos y Transformación Digital.",
      "Prueba de tipos impositivos de IVA: comprobar que las bases del 21%, 10% y 4% se imputan a las subcuentas correspondientes de IVA repercutido/soportado.",
      "Control de plazos de envío al SII: verificar que los envíos automáticos respetan la ventana legal máxima de 4 días naturales."
    ]
  },
  {
    category: "Pista de Auditoría y Seguridad Antifraude",
    items: [
      "Comprobación de inmutabilidad en DuckDB: verificar que ningún asiento registrado puede ser eliminado sin dejar un apunte de anulación explícito.",
      "Prueba de detección de facturas duplicadas: asegurar que el sistema alerta de inmediato ante dos facturas con idéntico CIF emisor y número de factura.",
      "Registro inmutable con timestamp UTC, identificador de usuario contable y hash SHA-256 de cada factura procesada.",
      "Presencia del disclaimer legal de supervisión contable obligatoria previa a la firma de las cuentas anuales."
    ]
  },
  {
    category: "Rendimiento y Sincronización ERP",
    items: [
      "Rendimiento de ingesta: procesamiento de extractos bancarios de más de 5.000 movimientos en menos de 3 segundos sobre DuckDB.",
      "Generación de ficheros de traspaso al ERP (A3, Sage, Contasol, Holded) sin caracteres extraños ni fallos de codificación UTF-8."
    ]
  }
];

/**
 * Presets de configuración rápida para Contabilidad & ERP (MVP, Producción, Enterprise)
 */
export const CONTABILIDAD_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: Asesoría / Despacho Contable Ágil",
    description: "Para gestorías y despachos que procesan extractos bancarios y facturas en lotes mediante importación Excel/CSV al ERP.",
    recommendedConfig: {
      deploymentMode: "Local en PC de despacho con DuckDB + Parquet",
      ocrEngine: "Extracción híbrida OCR local + modelo ligero",
      erpSync: "Ficheros de exportación batch (A3, Sage 200, Contasol)",
      uiFramework: "Streamlit interactivo con tablas editables",
      primaryModel: "DeepSeek V4 (Económico, alta precisión numérica y extracción)"
    },
    estimatedApiCostMonthly: "0 € - 20 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Departamento Contable Corporativo / Pyme Mediana",
    description: "Para empresas medianas con facturación electrónica VeriFactu, conciliación diaria y liquidación de impuestos trimestrales.",
    recommendedConfig: {
      deploymentMode: "Servidor privado o VPS en la nube europea con PostgreSQL cifrado",
      ocrEngine: "Pipeline OCR de alta resolución con verificación contra censo VIES",
      erpSync: "Integración vía API REST con cola de aprobación de asientos",
      uiFramework: "React/Next.js o Flet Desktop con perfiles de contable y supervisor",
      primaryModel: "Claude 3.7 Sonnet (Máximo rigor en casuística fiscal y partida doble)"
    },
    estimatedApiCostMonthly: "50 € - 140 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Gran Grupo Consolidado / Shared Services Center",
    description: "Para grupos multinacionales con múltiples CIFs, SII diario obligatorio, contabilidad analítica ABC y auditoría forense continua.",
    recommendedConfig: {
      deploymentMode: "Clúster dedicado en nube privada con DuckDB en memoria y HSM para firma",
      ocrEngine: "Microservicio OCR distribuido con procesamiento de 10.000 facturas/día",
      erpSync: "Conector directo SAP S/4HANA o Microsoft Dynamics 365 con doble firma",
      uiFramework: "Microfrontends corporativos integrados en el portal financiero central",
      primaryModel: "Modelos privados con guardrails de no-alucinación y auditoría forense de Benford"
    },
    estimatedApiCostMonthly: "> 300 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de ingeniería contable y de sistemas)"
  }
];

/**
 * Tareas secundarias contextuales de Contabilidad & Auditoría
 */
export const CONTABILIDAD_SECONDARY_TASKS = [
  {
    id: "SEC-CONT-01",
    label: "Validador de Reglas Fiscales (IVA, IRPF, SII y Censo VIES)",
    desc: "Comprobación automática de tipos impositivos vigentes, inversión del sujeto pasivo y validación de CIF/NIF en bases de la AEAT."
  },
  {
    id: "SEC-CONT-02",
    label: "Pista de Auditoría Inmutable (Audit Trail) en DuckDB",
    desc: "Registro inmutable con sellado temporal UTC, usuario contable, documento fuente escaneado y hash SHA-256 de cada asiento."
  },
  {
    id: "SEC-CONT-03",
    label: "Sistema de Aprobación Jerárquica de Asientos por Umbrales",
    desc: "Enrutamiento automático hacia jefatura contable para apuntes manuales superiores a umbrales configurables (ej. > 10.000 €)."
  },
  {
    id: "SEC-CONT-04",
    label: "Persistencia Columnar Ultrarrápida y Modo Offline (DuckDB + Parquet)",
    desc: "Almacenamiento local optimizado para ejecutar consultas analíticas sobre millones de líneas de diario en milisegundos."
  },
  {
    id: "SEC-CONT-05",
    label: "Exportador a Formatos Estándar ERP (Excel, CSV, XML FacturaE)",
    desc: "Generación de ficheros de importación directa listos para SAP, Sage 200, Holded, A3 Software o Contasol."
  },
  {
    id: "SEC-CONT-06",
    label: "Detector Antimanipulación de Justificantes (Anti-Tampering)",
    desc: "Análisis forense de metadatos EXIF, inconsistencias en fuentes tipográficas y alineación de píxeles en facturas PDF/imagen."
  },
  {
    id: "SEC-CONT-07",
    label: "Guardrail Anti-Autoasiento y Verificación Humana Obligatoria",
    desc: "Prohibición categórica de registrar asientos directamente en el ERP sin revisión y validación expresa por un contable humano."
  },
  {
    id: "SEC-CONT-08",
    label: "Dataset Sintético de Contabilidad Completa DEMO para Modo Offline",
    desc: "Libro Diario, Mayor, Balances y 100 facturas sintéticas precargadas para probar y validar el sistema sin datos reales."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Contabilidad
 */
export const CONTABILIDAD_BRANCHING_RULES = [
  {
    id: "BR-CONT-01",
    condition: (answers) => answers.primaryTask === "C1.1",
    action: "Activar parser de Cuaderno 43 (Norma 43 CSB); verificar que la suma de Debe coincide exactamente con Haber en cada asiento propuesto."
  },
  {
    id: "BR-CONT-02",
    condition: (answers) => answers.primaryTask === "C1.2",
    action: "Integrar generador FacturaE 3.2.2 y módulo de encadenamiento VeriFactu (RD 1007/2023); activar validador de CIF en censo fiscal."
  },
  {
    id: "BR-CONT-03",
    condition: (answers) => answers.primaryTask === "C1.4",
    action: "Habilitar cálculo automático de casillas de los Modelos 303, 111 y 115 de la AEAT; incluir validador de plazos para envío del SII."
  },
  {
    id: "BR-CONT-04",
    condition: (answers) => answers.primaryTask === "C1.6",
    action: "Activar módulo estadístico de la Ley de Benford (distribución de primer dígito); forzar test de corte de operaciones (Cut-Off) de fin de año."
  },
  {
    id: "BR-CONT-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-CONT-07") || answers.primaryTask === "C1.1",
    action: "Inyectar middleware de Guardrails Anti-Autoasiento; exigir firma o confirmación manual antes de generar el fichero de exportación al ERP."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Contabilidad
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateContabilidadPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = CONTABILIDAD_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || CONTABILIDAD_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => CONTABILIDAD_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS CONTABLES (PRD)
## Producto Contable: ${data.appName || "Horizon Accounting Engine"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Contabilidad, ERP & Auditoría Financiera  
**Marco Regulatorio:** Plan General de Contabilidad (RD 1514/2007) / AEAT  
**Versión Documental:** v1.0.0 (Especificación Contable Formal)  

---

### 1. Resumen Ejecutivo y Alcance Operativo
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción del Núcleo Operativo:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Regla Fundamental de Cuadre:** Todos los asientos sugeridos respetan de forma estricta la partida doble (Suma Debe == Suma Haber).
- **Cláusula de Salvaguarda Profesional:** La aplicación es un sistema de soporte y automatización para departamentos contables. No sustituye la supervisión, validación y firma de las cuentas anuales por un profesional cualificado o auditor de cuentas.

---

### 2. Entradas, Salidas y Riesgos Contables
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Contables Mapeados y Medidas Mitigadoras:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Validación automática contra reglas PGC y obligatoriedad de confirmación humana previa al traspaso al ERP.`).join("\n") || "- Mitigación mediante validaciones automáticas."}

---

### 3. Tareas Secundarias de Soporte y Trazabilidad
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa con validaciones fiscales estándar y persistencia en DuckDB."}

---

### 4. Arquitectura Técnica e Integración ERP
- **Framework de Interfaz de Usuario:** ${data.uiFramework || "Flet (Python Desktop / Local)"}
- **Motor de Almacenamiento y Log:** ${data.storageEngine || "DuckDB + Parquet (Almacenamiento Local Cifrado)"}
- **Compatibilidad con Formatos ERP:** Exportación compatible con SAP, Sage 200, Holded, A3 Software y Contasol.
- **Estándares Fiscales Soportados:** FacturaE 3.2.2 (XML firmado), VeriFactu (RD 1007/2023), Cuaderno 43 de la AEB y formatos oficiales de la AEAT.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con Diario, Mayor y 100 facturas sintéticas DEMO precargadas." : "Requiere conectividad con APIs bancarias y tributarias."}

---

### 5. Guardrails Contables y Controles Antifraude
1. **Regla de Cero Descuadre:** Rechazo terminante de cualquier propuesta de asiento contable donde el Debe y el Haber no coincidan exactamente al céntimo.
2. **Prohibición de Autoasiento:** Todo apunte requiere validación y aprobación manual expresa antes de su inserción definitiva en el Libro Diario.
3. **Control de Encadenamiento VeriFactu:** Verificación continua de que ningún registro de facturación rompe el hash criptográfico del registro inmediatamente precedente.
4. **Pista de Auditoría Inmutable:** Registro con timestamp UTC, identificador de usuario y documento de respaldo para cada asiento registrado.

---

### 6. Checklist de Validación y Aseguramiento de Calidad Contable (QA)
${CONTABILIDAD_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const CONTABILIDAD_QA_CHECKLIST = CONTABILIDAD_DEPLOYMENT_CHECKLIST;
