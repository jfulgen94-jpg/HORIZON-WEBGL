/**
 * WIZARD-FINANZAS.JS — Contenido y Lógica Especializada para el Asistente de Finanzas & Algorítmica Cuantitativa
 * Tareas F1.1 a F1.6, MiFID II, Backtesting, Simulación Monte Carlo, Gestión de Riesgos y QA Financiero.
 */

/**
 * Tareas primarias expandidas de Finanzas con especificación detallada de inputs, outputs y riesgos financieros/regulatorios
 */
export const FINANZAS_PRIMARY_TASKS = [
  {
    id: "F1.1",
    label: "Simulador de Estrategias y Motor de Backtesting Cuantitativo",
    shortDesc: "Evaluación histórica rigurosa de algoritmos de trading con control de deslizamiento (slippage) y comisiones.",
    longDesc: "Motor analítico de backtesting orientado a estrategias sistemáticas que procesa series temporales tick-by-tick o barras OHLCV, simulando la ejecución en el libro de órdenes, calculando métricas de rendimiento ajustadas al riesgo (Sharpe, Sortino, Calmar, Maximum Drawdown) y aplicando técnicas de validación cruzada temporal (Walk-Forward Optimization y Monte Carlo) para neutralizar el sobreajuste.",
    audience: "Gestores cuantitativos, analistas de riesgo de mercado, operadores algorítmicos y mesas de tesorería.",
    requiredInputs: [
      "Series históricas de precios (OHLCV) o datos de libro de órdenes L2 con timestamp UTC",
      "Parámetros de la estrategia sistemática (reglas de entrada, salida, stop-loss, take-profit)",
      "Modelo de costes operativos: comisión de broker (fija/porcentaje), canon de bolsa y deslizamiento (slippage)"
    ],
    generatedOutputs: [
      "Curva de capital (Equity Curve) y curva de caída acumulada (Underwater Plot)",
      "Cuadro de ratios cuantitativos: Sharpe Ratio anualizado, Sortino, Profit Factor y Win Rate",
      "Matriz de distribución de rendimientos por trade y duración media de posición",
      "Informe de robustez de optimización Walk-Forward y test de deflación de Sharpe (Bailey & Lopez de Prado)"
    ],
    financialRisks: [
      "Sesgo de anticipación (Look-ahead bias): usar información del futuro durante el cálculo de señales pasadas",
      "Sesgo del superviviente: evaluar universos de activos sin incluir empresas deslistadas o en quiebra",
      "Subestimación de impacto de mercado y falta de liquidez en activos de baja capitalización"
    ],
    complianceStandards: ["MiFID II RTS 25 (Sincronización de relojes)", "Directrices ESMA de Negociación Algorítmica", "MAR (Reglamento de Abuso de Mercado)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "F1.2",
    label: "Evaluador y Optimizador de Carteras (Markowitz, Black-Litterman y HRP)",
    shortDesc: "Asignación óptima de activos basada en matriz de covarianzas, frontera eficiente y opiniones subjetivas.",
    longDesc: "Plataforma de optimización de carteras multi-activo que construye la frontera eficiente de Markowitz con regularización de covarianzas (Shrinkage de Ledoit-Wolf), integra el modelo de Black-Litterman para combinar equilibrios de mercado con visiones de los analistas y aplica el método de Paridad Jerárquica de Riesgo (Hierarchical Risk Parity / HRP) para carteras ultra-diversificadas resistentes a shocks de correlación.",
    audience: "Banca privada, family offices, gestoras de fondos (IIC) y comités de inversión.",
    requiredInputs: [
      "Matriz de rentabilidades históricas de los activos componentes del universo de inversión",
      "Vector de restricciones de asignación (ponderación mínima/máxima por activo, clase o geografía)",
      "Puntos de vista del inversor (Views) con matriz de incertidumbre para el modelo Black-Litterman"
    ],
    generatedOutputs: [
      "Vector de ponderaciones óptimas w* para el ratio de Sharpe máximo y la cartera de mínima varianza",
      "Curva de Frontera Eficiente de Markowitz con activos subyacentes mapeados",
      "Desglose de contribución marginal al riesgo total de la cartera por activo",
      "Propuesta de rebalanceo periódico con cálculo de impacto fiscal y costes de transacción"
    ],
    financialRisks: [
      "Inestabilidad numérica de la matriz inversa de covarianzas ante activos altamente colineales",
      "Concentración no deseada en activos con retornos históricos atípicos no extrapolables",
      "Fallo del supuesto de distribución normal en eventos de cola (Fat Tails y caídas sincronizadas)"
    ],
    complianceStandards: ["Reglamento UCITS V", "MiFID II Evaluación de Idoneidad", "Norma Circular 3/2008 CNMV"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "F1.3",
    label: "Analizador de Riesgo Crediticio y Scoring Regulatorio (Basilea III/IV)",
    shortDesc: "Modelado de Probabilidad de Incumplimiento (PD), Pérdida en Caso de Incumplimiento (LGD) y EAD con explicabilidad.",
    longDesc: "Motor de análisis de solvencia bancaria y corporativa que procesa estados contables, ratios de liquidez, historial de pagos y variables macroeconómicas para calcular la Probabilidad de Incumplimiento (PD), Pérdida en Caso de Incumplimiento (LGD) y Exposición en el Momento del Incumplimiento (EAD), generando una puntuación crediticia transparente con valores SHAP conforme a los requerimientos IRB de Basilea.",
    audience: "Departamentos de riesgos de entidades de crédito, plataformas de crowdlending y agencias de rating.",
    requiredInputs: [
      "Balancetes y cuentas anuales auditadas de los últimos 3 ejercicios económicos",
      "Información de registros de impagos (CIRBE, RAI, ASNEF) y morosidad histórica",
      "Parámetros macroeconómicos del escenario base y escenario de estrés"
    ],
    generatedOutputs: [
      "Score crediticio normalizado [0 - 1000] y rating equivalente (AAA a D)",
      "Parámetros de riesgo esperados: PD (%) a 1 año y a lo largo de la vida de la operación (IFRS 9 Stage 2)",
      "Pérdida Esperada (Expected Loss = PD * LGD * EAD) y Requerimiento de Capital Regulatorio",
      "Gráfico de explicabilidad individual con valores SHAP justificando las variables clave de la decisión"
    ],
    financialRisks: [
      "Sesgo algorítmico o discriminación indirecta por código postal o atributos no justificados",
      "Sobreajuste a periodos expansivos con ausencia de estrés en las curvas de calibración",
      "Desactualización de balances en sectores con ciclos de caja acelerados"
    ],
    complianceStandards: ["Directiva CRD V / CRR II (Basilea III)", "Norma NIIF 9 / IFRS 9", "Ley 5/2019 de Contratos de Crédito"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "F1.4",
    label: "Asistente de Cumplimiento Normativo MiFID II y Prevención de Blanqueo (AML)",
    shortDesc: "Auditoría de idoneidad del inversor, comisiones retrocesivas, control de incentivos y screening PEP/sanciones.",
    longDesc: "Sistema de cumplimiento regulatorio financiero que verifica automáticamente los cuestionarios de conveniencia e idoneidad de clientes según MiFID II, comprueba la adecuación del producto al mercado objetivo (Target Market), detecta conflictos de interés en esquemas de comisiones y realiza barridos cruzados en tiempo real contra listas oficiales de sanciones internacionales (OFAC, UE, Banco de España) y Personas de Responsabilidad Pública (PEP).",
    audience: "Oficiales de cumplimiento (Compliance Officers), directores de operaciones y unidades de control interno.",
    requiredInputs: [
      "Perfil del inversor: experiencia previa, objetivos financieros, capacidad de soportar pérdidas y horizonte temporal",
      "Ficha técnica y Documento de Datos Fundamentales (KID/PRIIPs) del producto a comercializar",
      "Identificación completa del titular y beneficiarios reales (KYC / Titularidad Real)"
    ],
    generatedOutputs: [
      "Dictamen de Idoneidad o Conveniencia formal con advertencias regulatorias automáticas",
      "Certificado de cribado de sanciones (Screening Report) con huella temporal inmutable",
      "Desglose ex-ante de todos los costes y gastos directos e indirectos soportados por el cliente",
      "Registro de auditoría conforme a MiFID II preparado para inspecciones de la CNMV / SEPBLAC"
    ],
    financialRisks: [
      "Venta indebida (Misselling) de productos complejos a inversores minoristas sin idoneidad",
      "Falsos negativos en el screening de listas de sanciones por variaciones ortográficas del nombre",
      "Falta de trazabilidad documental que derive en sanciones de inhabilitación o multas graves"
    ],
    complianceStandards: ["MiFID II (Directiva 2014/65/UE)", "PRIIPs (Reglamento 1286/2014)", "Ley 10/2010 de PBC/FT (SEPBLAC)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "F1.5",
    label: "Detector de Fraude Transaccional en Tiempo Real",
    shortDesc: "Inferencia continua sobre flujos de pago con Isolation Forests y detección de anomalías de baja latencia.",
    longDesc: "Canalización de procesamiento de eventos financieros que intercepta transacciones de pago con tarjeta o transferencias SEPA/SWIFT, extrayendo características de velocidad y geolocalización, evaluando el riesgo de fraude mediante modelos no supervisados y reglas deterministas en menos de 50 ms, y bloqueando de forma preventiva operaciones de suplantación de identidad (Account Takeover / Card-Not-Present).",
    audience: "Equipos antifraude bancario, pasarelas de pago (Payment Service Providers), neobancos y comercios electrónicos.",
    requiredInputs: [
      "Evento transaccional en formato JSON: ID cuenta, importe, divisa, fecha/hora, código comercio (MCC) e IP",
      "Historial de comportamiento reciente de la cuenta (gasto medio horario, frecuencia habitual, países comunes)",
      "Huella digital del dispositivo emisor (Device Fingerprint)"
    ],
    generatedOutputs: [
      "Score de riesgo de fraude de 0 a 100 con nivel de decisión: ACEPTAR, REVISAR (3D Secure), BLOQUEAR",
      "Lista de reglas de alerta activadas (ej. 'cambio imposible de localización física en 20 minutos')",
      "Payload formateado para notificación inmediata al usuario o cola de revisión manual",
      "Métricas de tasa de falsos positivos y volumen monetario de fraude prevenido"
    ],
    financialRisks: [
      "Fricción excesiva y tasa elevada de falsos positivos que bloqueen compras legítimas de clientes VIP",
      "Latencia superior a 100 ms que provoque timeouts en la pasarela de pago",
      "Degradación del modelo ante nuevas tipologías de fraude sintético no presentes en el histórico"
    ],
    complianceStandards: ["PSD2 / Directiva de Servicios de Pago (Autenticación Reforzada SCA)", "PCI-DSS v4.0", "RGPD"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "F1.6",
    label: "Generador de Informes Financieros y Análisis Fundamental Automatizado",
    shortDesc: "Compilación de ratios bursátiles, estados contables en XBRL y resúmenes ejecutivos para comités.",
    longDesc: "Módulo de análisis de renta variable y deuda que ingesta estados financieros oficiales en formato XBRL/iXBRL de la SEC (10-K, 10-Q) o CNMV, calcula matrices de valoración fundamental (PER, EV/EBITDA, FCF Yield, ROIC), ejecuta modelos de descuento de flujos de caja (DCF) con análisis de sensibilidad y compila un informe exhaustivo con tesis de inversión para comités de asignación.",
    audience: "Analistas de renta variable (Equity Research), gestores de fondos de autor y analistas M&A.",
    requiredInputs: [
      "Tickers o identificadores ISIN de las compañías a analizar",
      "Estados financieros de los últimos 5 ejercicios (Balance, Cuenta de Pérdidas y Ganancias, Estado de Flujos)",
      "Estimaciones de consenso de analistas y coste medio ponderado del capital (WACC)"
    ],
    generatedOutputs: [
      "Modelo financiero de Descuento de Flujos de Caja (DCF) con precio objetivo intrínseco",
      "Matriz de múltiplos comparables de empresas del mismo sector y múltiplos históricos",
      "Diagnóstico de calidad contable (Beneish M-Score para detección de manipulación de beneficios)",
      "Informe estructurado en Markdown y PDF listo para presentación a inversores"
    ],
    financialRisks: [
      "Hipersensibilidad del precio objetivo ante variaciones mínimas de la tasa de descuento o crecimiento terminal",
      "Uso de partidas extraordinarias o ingresos no recurrentes como base de estimación futura",
      "Falta de ajuste por pasivos fuera de balance (arrendamientos operativos, compromisos por pensiones)"
    ],
    complianceStandards: ["Reglamento de Abuso de Mercado (MAR - Recomendaciones de Inversión)", "IFRS / US GAAP", "XBRL International"],
    recommendedModel: "GPT-4o"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Finanzas (3 a 5 preguntas de impacto real)
 */
export const FINANZAS_DIAGNOSTIC_QUESTIONS = [
  {
    id: "fin_data_frequency",
    title: "Granularidad Temporal y Frecuencia de Datos Financieros",
    context: "La frecuencia de los datos determina la arquitectura de almacenamiento, el coste de proveedores de datos y los riesgos de sincronización.",
    options: [
      {
        id: "daily",
        label: "Diaria / Fin de Día (EOD - End of Day)",
        impact: "Volumen bajo de datos (~10 MB/año por activo). Ideal para estrategias swing, análisis fundamental y optimización mensual de carteras.",
        recommendation: "DuckDB local con ficheros Parquet comprimidos es más que suficiente; coste de infraestructura prácticamente nulo."
      },
      {
        id: "intraday_minute",
        label: "Intradía Minutario (1 min, 5 min, 15 min)",
        impact: "Volumen moderado (~500 MB/año por activo). Exige gestión rigurosa de zonas horarias de mercado, dividendos continuos y splits.",
        recommendation: "DuckDB o TimescaleDB optimizado; se requiere proveedor de datos institucional (Polygon.io, Alpaca, Interactive Brokers)."
      },
      {
        id: "tick_by_tick",
        label: "Tick-by-Tick y Libro de Órdenes L2",
        impact: "Volumen masivo (>10 GB/día). Requiere procesamiento de flujos en memoria, latencia de sub-milisegundo y servidores dedicados.",
        recommendation: "Base de datos columnar de alto rendimiento (ClickHouse) o almacenamiento en memoria; descartar SQLite y Python puro para la ejecución."
      }
    ]
  },
  {
    id: "fin_execution_broker",
    title: "Nivel de Integración y Ejecución de Órdenes",
    context: "El destino de las órdenes determina las salvaguardas de seguridad, las credenciales necesarias y el marco normativo aplicable.",
    options: [
      {
        id: "paper_trading",
        label: "Simulación Pura / Paper Trading (Sin dinero real)",
        impact: "Cero riesgo económico directo. Permite validar la lógica de la estrategia y la infraestructura sin exponer capital.",
        recommendation: "Simulador de libro de órdenes interno con latencia artificial inyectada (100-200 ms) para reflejar condiciones de mercado realistas."
      },
      {
        id: "broker_api",
        label: "Conexión a Broker vía API REST / WebSockets (Retail/Pro)",
        impact: "Ejecución real con dinero de clientes o propio. Riesgo de pérdidas por errores de software o desconexión del socket.",
        recommendation: "Integración con Interactive Brokers (ib_insync) o Alpaca; implementar Kill Switch inmediato y limitadores de tamaño máximo de orden."
      },
      {
        id: "institutional_fix",
        label: "Protocolo Institucional FIX (Financial Information eXchange)",
        impact: "Conexión directa con cámaras de compensación y mesas institucionales. Cumplimiento estricto de auditoría MiFID II RTS 25.",
        recommendation: "Motor QuickFIX en C++ o Python; registro inmutable de cada mensaje de envío, cancelación y ejecución con sellado de tiempo UTC."
      }
    ]
  },
  {
    id: "fin_regulatory_scope",
    title: "Marco Regulatorio y Tipología de Asesoramiento",
    context: "Ofrecer asesoramiento financiero personalizado o ejecutar órdenes por cuenta de terceros exige cumplimiento estricto con CNMV/SEC.",
    options: [
      {
        id: "internal_research",
        label: "Investigación Propia / Herramienta Interna sin Terceros",
        impact: "No requiere licencia de servicios de inversión ni validaciones de idoneidad MiFID II.",
        recommendation: "Centrar el esfuerzo en la robustez estadística y prevención de sobreajuste sin sobrecarga burocrática regulatoria."
      },
      {
        id: "client_facing_advice",
        label: "Asesoramiento o Recomendaciones a Clientes Finales",
        impact: "Exigencia obligatoria de cuestionarios MiFID II de idoneidad, desglose ex-ante de costes y registro formal de recomendaciones.",
        recommendation: "Incorporar módulo de validación MiFID II, disclaimers letrados obligatorios no eludibles y exportación de dictámenes firmados."
      },
      {
        id: "discretionary_management",
        label: "Gestión Discrecional de Carteras Automatizada (Robo-Advisor)",
        impact: "Máximo nivel de escrutinio por parte de CNMV/ESMA; algoritmos sujetos a auditorías de gobernanza y control de riesgo operativo.",
        recommendation: "Arquitectura con segregación estricta de cuentas, log forense en base de datos inmutable y supervisión humana permanente (Human-in-the-Loop)."
      }
    ]
  },
  {
    id: "fin_risk_model",
    title: "Modelo de Control de Riesgos y Gestión de Capital",
    context: "El dimensionamiento de posiciones es más determinante para la supervivencia del fondo que las propias señales de compra/venta.",
    options: [
      {
        id: "fixed_fractional",
        label: "Fracción Fija de Capital (% fijo por operación)",
        impact: "Simple y transparente. Limita el riesgo máximo por trade (ej. arriesgar máximo 1% del balance de la cuenta por operación).",
        recommendation: "Cálculo determinista inmediato en el módulo de gestión monetaria; recomendado para prototipos rápidos y MVPs."
      },
      {
        id: "volatility_parity",
        label: "Dimensionamiento por Volatilidad Inversa / ATR (Vol Target)",
        impact: "Normaliza el riesgo en el tiempo: asigna menos capital cuando la volatilidad se dispara y más en periodos tranquilos.",
        recommendation: "Motor de cálculo del Average True Range (ATR) continuo con rebalanceo dinámico de órdenes stop-loss."
      },
      {
        id: "var_cvar_montecarlo",
        label: "Value at Risk (VaR 99%) y Expected Shortfall con Monte Carlo",
        impact: "Medición institucional de colas pesadas y riesgo extremo ante shocks de mercado sistémicos.",
        recommendation: "Simulación de 10.000 trayectorias estocásticas con distribución t-Student o cópulas no gaussianas para capturar cisnes negros."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Finanzas)
 */
export const FINANZAS_PROJECT_TEMPLATES = [
  {
    id: "template-montecarlo-risk",
    name: "Simulador Cuantitativo de Monte Carlo y Riesgo de Cartera",
    desc: "Plataforma analítica para simulación de 10.000 trayectorias de rentabilidad de carteras multi-activo, cálculo de VaR/CVaR y estrés de liquidez.",
    techStack: [
      { name: "Python 3.12", role: "Backend analítico cuantitativo" },
      { name: "NumPy / SciPy / Numba", role: "Cálculo vectorial de alta velocidad en GPU/CPU" },
      { name: "DuckDB + Parquet", role: "Almacenamiento columnar ultrarrápido para series temporales" },
      { name: "Streamlit o React + Plotly", role: "Visualización interactiva de abanicos de trayectorias y distribuciones de cola" }
    ],
    folderStructure: `montecarlo_risk_engine/
├── data/
│   ├── raw/                 # Ficheros Parquet con precios históricos
│   └── synthetic/           # Matrices de simulación generadas
├── src/
│   ├── config.py            # Parámetros del universo y número de simulaciones
│   ├── data_loader.py       # Ingesta y cálculo de retornos logarítmicos
│   ├── copula_engine.py     # Generación de correlaciones t-Student
│   ├── simulator.py         # Kernel de simulación Monte Carlo vectorizado
│   └── risk_metrics.py      # Cálculo de VaR al 95%/99% y Expected Shortfall
├── notebooks/
│   └── validation.ipynb     # Cuaderno de contraste empírico
├── app.py                   # Dashboard interactivo con sliders de parámetros
├── requirements.txt
└── README.md`,
    dependencies: ["numpy>=2.1.0", "scipy>=1.14.0", "numba>=0.60.0", "duckdb>=1.1.0", "plotly>=5.24.0", "streamlit>=1.39.0"],
    envVars: ["MARKET_DATA_API_KEY=tu_api_key", "DUCKDB_PATH=./data/finance.duckdb", "NUM_SIMULATIONS=10000"],
    firstStep: "Ejecutar 'pip install -r requirements.txt' y correr 'python src/simulator.py --assets AAPL,MSFT,TLT --sims 10000' para generar la primera distribución de riesgo."
  },
  {
    id: "template-backtesting-engine",
    name: "Motor Algorítmico de Backtesting Sistemático y Órdenes FIX",
    desc: "Framework para pruebas de estrategias de trading cuantitativo con prevención de sesgos, simulación de deslizamiento y generación de métricas Sharpe.",
    techStack: [
      { name: "Python / Cython", role: "Lógica de simulación de libro de órdenes evento por evento" },
      { name: "Polars", role: "DataFrames ultrarrápidos para procesamiento de millones de barras en milisegundos" },
      { name: "Pydantic v2", role: "Validación estricta de esquemas de órdenes y parámetros de estrategia" },
      { name: "FastAPI", role: "API para monitorización y recepción de señales" }
    ],
    folderStructure: `backtesting_engine/
├── src/
│   ├── core/
│   │   ├── orderbook.py     # Simulador de libro y matching de órdenes L2
│   │   ├── portfolio.py     # Seguimiento de balance, margen y apalancamiento
│   │   └── execution.py     # Modelos de deslizamiento (Slippage) y comisiones
│   ├── strategies/
│   │   ├── base.py          # Clase abstracta Strategy con ciclo on_bar()
│   │   └── mean_reversion.py# Implementación de reversión a la media
│   ├── analytics/
│   │   ├── performance.py   # Ratios Sharpe, Sortino, Drawdown máximo
│   │   └── walk_forward.py  # Optimización cruzada temporal
│   └── main.py              # Punto de entrada de ejecución
├── tests/
│   └── test_slippage.py     # Pruebas unitarias de costes operativos
├── requirements.txt
└── config.yaml`,
    dependencies: ["polars>=1.5.0", "pydantic>=2.9.0", "fastapi>=0.115.0", "matplotlib>=3.9.0", "pytest>=8.3.0"],
    envVars: ["HISTORICAL_DATA_DIR=./data/ticks", "DEFAULT_SLIPPAGE_BPS=5", "DEFAULT_COMMISSION_PCT=0.001"],
    firstStep: "Ejecutar 'python src/main.py --strategy mean_reversion --data sample_bars.parquet' para obtener la curva de capital y el ratio de Sharpe verificado."
  },
  {
    id: "template-credit-scoring-shap",
    name: "Pipeline de Scoring Crediticio y Riesgo con Explicabilidad SHAP",
    desc: "Modelo predictivo de solvencia para pymes y particulares que calcula la Probabilidad de Incumplimiento (PD) y genera dictámenes legibles para auditores.",
    techStack: [
      { name: "Python 3.12", role: "Entorno de ciencia de datos" },
      { name: "LightGBM / XGBoost", role: "Algoritmos de Gradient Boosting para datos tabulares desbalanceados" },
      { name: "SHAP (SHapley Additive exPlanations)", role: "Explicabilidad matemática de la contribución de cada variable" },
      { name: "FastAPI + Pydantic", role: "Microservicio REST de inferencia con latencia < 20 ms" }
    ],
    folderStructure: `credit_scoring_pipeline/
├── src/
│   ├── data_prep/
│   │   ├── feature_engineering.py # Ratios de apalancamiento, liquidez y cobertura
│   │   └── woe_iv.py              # Weight of Evidence e Information Value
│   ├── models/
│   │   ├── train.py               # Entrenamiento con validación estratificada
│   │   └── inference.py           # Inferencia y umbral de decisión
│   ├── explainability/
│   │   └── shap_explainer.py      # Generador de gráficos de cascada y fuerza
│   └── api/
│       └── server.py              # Endpoint POST /v1/score con dictamen JSON
├── models_saved/
│   └── credit_model.joblib        # Binario del modelo calibrado
├── requirements.txt
└── Dockerfile`,
    dependencies: ["lightgbm>=4.5.0", "shap>=0.46.0", "scikit-learn>=1.5.0", "fastapi>=0.115.0", "uvicorn>=0.30.0"],
    envVars: ["MODEL_PATH=./models_saved/credit_model.joblib", "DEFAULT_PD_THRESHOLD=0.035", "LOG_LEVEL=INFO"],
    firstStep: "Ejecutar 'uvicorn src.api.server:app --reload' y enviar un payload JSON de prueba con los ratios financieros para recibir el score crediticio con su explicación SHAP."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Finanzas (12-15 puntos)
 */
export const FINANZAS_DEPLOYMENT_CHECKLIST = [
  {
    category: "Cumplimiento Regulatorio y Legal",
    items: [
      "Inclusión de advertencias y disclaimers MiFID II sobre riesgos de pérdida de capital en todas las pantallas con datos de rendimiento.",
      "Verificación de que las recomendaciones de inversión no superan los límites de la licencia de la entidad (exclusión de asesoramiento si aplica).",
      "Sellado temporal inmutable de cada orden de trading o simulación generada conforme a MiFID II RTS 25.",
      "Comprobación del protocolo de detección y comunicación de operaciones sospechosas de abuso de mercado (MAR)."
    ]
  },
  {
    category: "Seguridad y Gestión de Credenciales",
    items: [
      "Almacenamiento de claves API de broker exclusivamente en variables de entorno o gestores de secretos (AWS Secrets Manager / Vault); nunca en código fuente.",
      "Verificación de que las claves de broker en producción tienen permisos de retirada de fondos explícitamente bloqueados (solo lectura y ejecución).",
      "Implementación de un botón de parada de emergencia (Kill Switch) accesible en menos de 2 clics que cancele todas las órdenes vivas y cierre posiciones abiertas.",
      "Límite estricto de tamaño máximo de orden y nocional acumulado diario para prevenir pérdidas catastróficas por bugs (Fat-finger protection)."
    ]
  },
  {
    category: "Rendimiento y Tolerancia a Fallos",
    items: [
      "Latencia de inferencia y cálculo de la estrategia inferior a 50 milisegundos en condiciones de alta volatilidad.",
      "Manejo robusto de reconexión automática en sockets de cotizaciones con buffers en memoria para no perder ticks durante caídas de red.",
      "Prueba de carga concurrente: verificación de que el servidor responde sin bloqueos ante 50 consultas simultáneas de precios y riesgo."
    ]
  },
  {
    category: "Precisión Numérica y Calidad de Datos",
    items: [
      "Prohibición estricta de tipos de datos 'float' para saldos y cálculos monetarios; uso exclusivo de 'Decimal' o aritmética de enteros en céntimos.",
      "Verificación de ajuste histórico continuo por splits de acciones, ampliaciones de capital y dividendos en las series de precios.",
      "Auditoría matemática de ausencia de sesgo de anticipación (Look-ahead bias) en el código del algoritmo de trading.",
      "Contraste del cálculo de VaR y ratios de Sharpe contra librerías cuantitativas de referencia verificando discrepancia menor al 0.01%."
    ]
  }
];

/**
 * Presets de configuración rápida para Finanzas (MVP, Producción, Enterprise)
 */
export const FINANZAS_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: MVP Cuantitativo / Prototipo Rápido",
    description: "Ideal para validación de ideas de inversión, backtesting exploratorio y demostraciones sin dinero real en juego.",
    recommendedConfig: {
      dataFrequency: "Diaria (EOD)",
      executionMode: "Paper Trading simulado",
      storageEngine: "DuckDB local + ficheros Parquet",
      uiFramework: "Streamlit interactivo con gráficos Plotly",
      primaryModel: "DeepSeek V4 (Económico y potente para código analítico)"
    },
    estimatedApiCostMonthly: "0 € - 20 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Producción Profesional / Gestor Cuantitativo",
    description: "Para fondos de autor, asesores financieros acreditados y operadores con capital propio real en mercado.",
    recommendedConfig: {
      dataFrequency: "Intradía minutario (Polygon.io / Interactive Brokers)",
      executionMode: "API REST de Broker con Kill Switch y límites de nocional",
      storageEngine: "TimescaleDB o DuckDB persistente con backups cifrados",
      uiFramework: "React/Next.js o Flet Desktop de alta densidad de información",
      primaryModel: "Claude 3.7 Sonnet (Máximo rigor de razonamiento y cumplimiento)"
    },
    estimatedApiCostMonthly: "50 € - 150 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Institucional / Grado Bancario Enterprise",
    description: "Para entidades financieras reguladas, robo-advisors con miles de usuarios y mesas de tesorería corporativas.",
    recommendedConfig: {
      dataFrequency: "Tick-by-Tick y libro de órdenes L2 con sincronización de relojes",
      executionMode: "Protocolo FIX con colas de auditoría inmutables",
      storageEngine: "Cluster ClickHouse en la nube europea + PostgreSQL para metadatos",
      uiFramework: "Microfrontends en React con dashboards de baja latencia WebSockets",
      primaryModel: "Modelos privados dedicados con guardrails NeMo de gobernanza y no-alucinación"
    },
    estimatedApiCostMonthly: "> 300 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de ingeniería multidisciplinar)"
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Finanzas
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateFinanzasPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = FINANZAS_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || FINANZAS_PRIMARY_TASKS[0];

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS FINANCIEROS (PRD)
## Producto Fintech: ${data.appName || "Horizon Quantitative Platform"}

**Fecha de Emisión:** ${now}  
**Área Horizon:** Finanzas & Algorítmica Cuantitativa  
**Marco Regulatorio Principal:** ${data.regulatoryScope || "MiFID II / CNMV / Basilea III"}  
**Versión Documental:** v1.0.0 (Especificación de Grado Financiero)  

---

### 1. Resumen Ejecutivo y Propósito Cuantitativo
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción Operativa:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Cláusula de Exclusión Legal:** Este software opera como una herramienta técnica de simulación y soporte a la decisión. No constituye asesoramiento financiero regulado salvo que sea comercializado por una Entidad de Servicios de Inversión debidamente autorizada.

---

### 2. Entradas y Salidas del Sistema
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Financieros Mapeados y Mitigaciones:
${primary.financialRisks.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Controles matemáticos en pipeline y validación cruzada.`).join("\n")}

---

### 3. Arquitectura Técnica y Datos
- **Frecuencia de Datos:** ${data.dataFrequency || "Diaria (EOD) con formato Parquet"}
- **Modo de Ejecución:** ${data.executionMode || "Paper Trading con modelos de deslizamiento simulados"}
- **Motor de Almacenamiento:** ${data.storageEngine || "DuckDB + Parquet en local"}
- **Framework de Interfaz:** ${data.uiFramework || "Streamlit / React con gráficos Plotly"}
- **Modelo de IA Recomendado:** ${primary.recommendedModel}

---

### 4. Protocolo de Calidad y Pre-Despliegue (Checklist de Seguridad)
${FINANZAS_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const FINANZAS_QA_CHECKLIST = FINANZAS_DEPLOYMENT_CHECKLIST;
