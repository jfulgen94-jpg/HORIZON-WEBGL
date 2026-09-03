/**
 * PROMPTS-FINANZAS.JS — Biblioteca de Prompts Especializados en Finanzas & Mercados
 * Área: Finanzas & Mercados
 * Tareas: Genéricos, F1.1 a F1.6 y Tareas Secundarias
 */

export const FINANZAS_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "fin-001",
        title: "Especificación Funcional y Alcance de App Financiera",
        desc: "Define el alcance, activos negociables, frecuencia de datos y restricciones regulatorias para un proyecto financiero.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software Cuantitativo y Gestor de Riesgos con experiencia en banca de inversión.
[COPIA AQUI TU IDEA]

Necesito que redactes la especificacion funcional completa para esta aplicacion financiera considerando:
1. Taxonomia de activos compatibles (Renta Variable, Renta Fija, FX, Commodities o Criptoactivos) y granularidad temporal requerida (tick, 1m, 1h, diario).
2. Definicion de fuentes de datos primarias y mecanismos de contingencia ante cortes de conexion o latencia excesiva.
3. Arquitectura del pipeline de calculo (procesamiento en streaming vs procesamiento batch al cierre de mercado).
4. Restricciones operativas, politicas de control de liquidez y normativas aplicables (MiFID II, requerimientos UCITS o Basilea III).
5. Casos de uso prioritarios divididos por perfil de usuario (analista fundamental, trader cuantitativo, oficial de compliance).

Restricciones:
- No utilices descripciones genericas; especifica campos exactos, tolerancias de latencia y tipos de orden.
- Define claramente las asunciones tecnicas y limites computacionales del sistema.

Formato de salida: Documento de especificacion tecnica estructurado en Markdown con tablas de requerimientos y matriz de riesgos operativos.`,
        tags: ["arquitectura", "alcance", "especificación", "compliance"]
      },
      {
        id: "fin-002",
        title: "Definición de Arquitectura de Datos y Esquema Financiero",
        desc: "Diseña la estructura de base de datos relacional y columnar para series temporales y estados financieros.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Datos especializado en infraestructuras financieras de alta velocidad y almacenamiento columnar.
[COPIA AQUI TU IDEA]

Necesito que disenes el modelo de datos optimizado para la aplicacion:
1. Esquema relacional para maestros de valores, dividendos, splits y taxonomias sectoriales (GICS/ICB).
2. Esquema columnar optimizado en DuckDB / Parquet para series temporales de precios (Open, High, Low, Close, Volume, VWAP, Open Interest).
3. Estructura normalizada para estados contables historicos (Balance, Cuenta de Perdidas y Ganancias, Flujo de Caja) evitando sesgo de supervivencia.
4. Particionamiento recomendado por activo, ano y frecuencia temporal para maximizar rendimiento de lectura.
5. Definicion de tipos de datos estrictos (evitar floats para moneda; usar enteros escalados o Decimal) y estrategia de indices primarios y compuestos.

Restricciones:
- Asegura tolerancia a ajustes retroactivos de precios por splits y dividendos en efectivo.
- Modela explicitamente la marca de tiempo de publicacion vs periodo fiscal reportado (point-in-time data).

Formato de salida: Sentencias DDL completas en SQL para PostgreSQL y DuckDB, acompanadas de diagrama de relaciones entidad-relacion en formato Mermaid.`,
        tags: ["datos", "duckdb", "sql", "series-temporales"]
      },
      {
        id: "fin-003",
        title: "Selección de Tech Stack y Bibliotecas Cuantitativas",
        desc: "Determina las librerías óptimas en Python o Node.js para cálculo vectorial, optimización y gráficos financieros.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Developer cuantitativo especializado en stack de alto rendimiento financiero.
[COPIA AQUI TU IDEA]

Necesito que selecciones y justifiques el stack tecnologico integral:
1. Motor de calculo numerico y manipulacion de datos tabulares (evaluacion comparativa entre Pandas, Polars y DuckDB para nuestro volumen).
2. Bibliotecas de calculo financiero y optimizacion matematica (NumPy, SciPy, cvxpy, PyPortfolioOpt).
3. Motor de renderizado grafico para visualizaciones financieras interactivas (Plotly, Lightweight Charts de TradingView o Apache ECharts).
4. Infraestructura de backend para exposicion de APIs analiticas (FastAPI con Pydantic v2 vs Go).
5. Estrategia de caching y almacenamiento de estado efimero (Redis para cotizaciones en vivo vs memoria compartida).

Restricciones:
- Prioriza dependencias de codigo abierto, con licencias permisivas (MIT, Apache 2.0, BSD) y bajo consumo de memoria RAM.
- Explica el impacto en latencia de cada decision tecnica.

Formato de salida: Matriz comparativa en Markdown con columnas [Componente, Opcion Seleccionada, Alternativas Descartadas, Justificacion Tecnica, Riesgos Asociados].`,
        tags: ["tech-stack", "polars", "fastapi", "optimizacion"]
      },
      {
        id: "fin-004",
        title: "Diseño de Interfaz de Usuario para Trading y Research",
        desc: "Estructura la experiencia visual para dashboards financieros de alta densidad de información.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Producto UX/UI especializado en terminales financieras profesionales estilo Bloomberg o FactSet.
[COPIA AQUI TU IDEA]

Necesito que concibas la arquitectura de interfaz para la aplicacion:
1. Distribucion espacial en rejilla (grid layout) modular de alta densidad para monitores widescreen y multipantalla.
2. Jerarquia de color estandarizada para mercados (verde/rojo configurable a azul/naranja para usuarios con daltonismo, fondo oscuro #0A0C10 para evitar fatiga visual).
3. Componentes criticos: panel de cotizaciones en tiempo real, grafico de velas con selector de temporalidad, panel de ordenes y libro de posiciones.
4. Accesibilidad y navegacion por atajos de teclado para operaciones criticas sin uso de raton.
5. Estados visuales de latencia de datos (mercado abierto, mercado cerrado, retraso de 15 minutos, desconexion de feed).

Restricciones:
- El diseno debe minimizar la sobrecarga cognitiva sin perder profundidad numerica.
- No incluyas elementos decorativos innecesarios; cada pixel debe aportar contexto operativo.

Formato de salida: Descripcion modular de pantallas y componentes con arbol de layout jerarquico y especificaciones tecnicas de diseno en Tailwind CSS.`,
        tags: ["ux", "diseño", "dashboard", "accesibilidad"]
      },
      {
        id: "fin-005",
        title: "Documentación y Generación de Informes Financieros Institucionales",
        desc: "Estructura plantillas de entrega y reportes para comités de inversión y reguladores.",
        model: "GPT-4o",
        prompt: `Eres un Redactor Jefe de Research Financiero y Consultor de Riesgos para fondos institucionales.
[COPIA AQUI TU IDEA]

Necesito que crees la estructura estandarizada para los informes automatizados que emitira el sistema:
1. Seccion ejecutiva: resumen de tesis de inversion, nivel de riesgo y recomendacion sintetica.
2. Desglose analitico: metricas de valoracion relativa, rentabilidad por dividendo y posicion competitiva frente a comparables (peers).
3. Graficos obligatorios: evolucion historica de drawdown, comparativa de retorno acumulado contra benchmark y distribucion de exposicion factorial.
4. Descargos de responsabilidad regulatorios (disclaimers de MiFID II / CNMV / SEC) sobre rentabilidades pasadas y conflicto de interes.
5. Pipeline de compilacion automatica a PDF y exportacion estructurada en JSON y Excel.

Restricciones:
- Tono sobrio, riguroso, estrictamente profesional sin terminos promocionales.
- Las tablas deben incluir precision decimal estandarizada (dos decimales para importes, cuatro para bps).

Formato de salida: Plantilla completa en Markdown con marcadores de posicion de variables dinamicas {{variable}} y directrices de maquetacion para ReportLab o WeasyPrint.`,
        tags: ["informes", "documentación", "reportes", "compliance"]
      }
    ]
  },
  {
    id: "motor-descarga",
    name: "Motor de Descarga y Análisis Fundamental (F1.1)",
    prompts: [
      {
        id: "fin-006",
        title: "Investigación y Selección de APIs de Datos Financieros",
        desc: "Evalúa proveedores de APIs financieras públicas y comerciales analizando cobertura, costes y límites.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Arquitecto de Datos Financieros evaluando fuentes de informacion de mercado para produccion.
[COPIA AQUI TU IDEA]

Necesito que elabores un analisis comparativo exhaustivo de APIs financieras para nuestro motor:
1. Proveedores a comparar: Yahoo Finance (yfinance), Financial Modeling Prep (FMP), Alpha Vantage, SEC EDGAR API y EOD Historical Data.
2. Criterios de evaluacion: limites de llamadas por minuto (rate limits), disponibilidad de estados financieros auditados a 10 anos, cobertura de acciones espanolas (BME) y europeas, soporte de datos punto en el tiempo (point-in-time) y costes de suscripcion.
3. Analisis de fiabilidad y retraso en anuncios corporativos de resultados (earnings releases).
4. Estrategia de fallback: algoritmo para conmutar de proveedor si la fuente primaria falla o devuelve HTTP 429.

Restricciones:
- Destaca claramente que APIs son viables bajo presupuesto 0 euros vs las que requieren pago para uso comercial.
- Identifica posibles problemas de raspado (web scraping) frente a APIs REST oficiales.

Formato de salida: Tabla comparativa detallada en Markdown mas funcion de Python con patron Circuit Breaker para gestionar solicitudes con reintentos exponenciales.`,
        tags: ["apis", "datos", "scraping", "integración"]
      },
      {
        id: "fin-007",
        title: "Normalización y Homogeneización de Estados Contables",
        desc: "Estandariza partidas contables de diferentes normas (NIIF vs US GAAP) en un esquema común.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor Contable y Programador Cuantitativo experto en IFRS/NIIF y US GAAP.
[COPIA AQUI TU IDEA]

Necesito que desarrolles el pipeline de normalizacion contable para homogeneizar reportes financieros:
1. Mapeo de cuentas de ingresos: Revenue / Turnover / Ventas Netas a una metrica canonica.
2. Conciliacion de magnitudes operativas: EBITDA, EBIT y Resultado de Explotacion considerando variaciones en amortizaciones y provisiones.
3. Tratamiento de deuda financiera: normalizacion de pasivos por arrendamiento operativo (NIIF 16) para calcular la Deuda Neta real.
4. Ajustes por partidas extraordinarias y discontinuadas para obtener el Beneficio Neto Normalizado.
5. Gestion de desfases temporales por empresas cuyo ejercicio fiscal no coincide con el ano natural (ej: cierres en enero o junio).

Restricciones:
- No realices supuestos opacos; cada ajuste contable debe dejar trazabilidad auditable en el log de transformacion.
- Gestiona correctamente los valores ausentes (NaN) diferenciando entre cero real y dato no reportado.

Formato de salida: Codigo en Python con Polars/Pandas que reciba DataFrames brutos y devuelva el balance y cuenta de resultados perfectamente mapeados.`,
        tags: ["contabilidad", "normalización", "niif", "us-gaap"]
      },
      {
        id: "fin-008",
        title: "Cálculo Automatizado de Múltiplos y Ratios de Valoración",
        desc: "Calcula métricas clave como EV/EBITDA, PER, FCF Yield, ROIC y WACC con validación estadística.",
        model: "DeepSeek V4",
        prompt: `Eres un Analista Senior de Equity Research y Modelizacion Financiera.
[COPIA AQUI TU IDEA]

Necesito que escribas el modulo matematico para calcular la bateria completa de ratios fundamentales:
1. Múltiplos de valoracion de mercado: Price to Earnings (PER), Enterprise Value to EBITDA (EV/EBITDA), Price to Book (P/B), EV/Sales y Free Cash Flow Yield.
2. Rentabilidad del capital: Return on Invested Capital (ROIC = NOPAT / Capital Empleado), Return on Equity (ROE desglosado mediante formula Dupont de 3 factores).
3. Salud financiera y solvencia: Ratio de Deuda Neta / EBITDA, Cobertura de Intereses (EBIT / Gastos Financieros) y Ratio Corriente.
4. Calculo del Coste Medio Ponderado del Capital (WACC): estimacion de Beta ajustada, prima de riesgo de mercado y coste de la deuda despues de impuestos.
5. Reglas de consistencia: detectar anomalias (ej: PER negativo por perdidas, EV distorsionado por caja neta extrema).

Restricciones:
- Define la formula exacta para cada indicador y gestiona divisiones por cero o denominadores negativos con alertas tipadas.

Formato de salida: Clase de Python pura o modulo de Polars con funciones tipadas y documentadas con docstrings cientificos (NumPy format).`,
        tags: ["ratios", "valoración", "roic", "wacc"]
      },
      {
        id: "fin-009",
        title: "Modelado de Datos Financieros con Pydantic v2",
        desc: "Crea contratos de datos estrictos para estados financieros, precios y ratios con validaciones de rango.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Software Python especializado en arquitecturas tipadas con Pydantic v2.
[COPIA AQUI TU IDEA]

Necesito que construyas los modelos de datos tipados y robustos para validar la ingesta financiera:
1. 'HistoricalPricePoint': fecha, OHLCV, vwap, numero de transacciones con validaciones (High >= Low, Volume >= 0).
2. 'BalanceSheetStatement': activos corrientes/no corrientes, pasivos, patrimonio neto, con validador de cuadre (Activo == Pasivo + Patrimonio).
3. 'IncomeStatement': ventas, margen bruto, EBITDA, EBIT, beneficio neto, con validadores de jerarquia aritmetica.
4. 'FundamentalMetrics': conjunto de ratios calculados con restrictores de rango razonable para detectar corrupcion de datos.
5. Serializacion personalizada para exportar a esquemas JSON compatibles con OpenAPI y Apache Arrow.

Restricciones:
- Utiliza caracteristicas modernas de Pydantic v2 (@field_validator, @model_validator(mode='after'), Annotated, Field con descripciones).
- Genera errores descriptivos en espanol cuando un dato no supere la validacion.

Formato de salida: Archivo de codigo 'schemas.py' completo, listo para ejecucion, sin dependencias prescindibles.`,
        tags: ["pydantic", "schemas", "python", "validación"]
      },
      {
        id: "fin-010",
        title: "Generador de Dataset Sintético Financiero para Modo DEMO",
        desc: "Genera series temporales y estados contables sintéticos con realismo estadístico sin conexión a APIs.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Cuantitativo y Especialista en Simulacion de Datos para pruebas de software financiero.
[COPIA AQUI TU IDEA]

Necesito un generador de datos financieros sinteticos realistas para que la aplicacion funcione en modo DEMO offline:
1. Generacion de precios diarios mediante Movimiento Browniano Geometrico (GBM) con saltos (modelo de Merton) que refleje clusters de volatilidad y colas pesadas.
2. Creacion de 5 empresas ficticias pertenecientes a sectores dispares (Banca, Tecnologia, Energia, Salud, Consumo) con tickers simulados.
3. Generacion de 8 trimestres consecutivos de estados financieros consistentes con estacionalidad, crecimiento organico e impuestos realistas.
4. Incorporacion deliberada de un evento de shock de mercado (caida del 15% en 3 sesiones) para verificar la reaccion de la UI.
5. Exportacion directa a archivos CSV y Parquet para inicializar la base de datos local con un comando.

Restricciones:
- No utilices series puramente lineales o aleatorias uniformes; deben cumplir propiedades de no estacionariedad tipicas de los mercados.
- Usa semillas deterministas (seed=42) para que las pruebas sean reproducibles.

Formato de salida: Script de Python ejecutable de un solo archivo que cree la carpeta 'demo_data/' con los archivos Parquet listos para consultar.`,
        tags: ["sintético", "demo", "simulación", "parquet"]
      },
      {
        id: "fin-011",
        title: "Generador de Informes Automatizados de Análisis Fundamental",
        desc: "Sintetiza la situación financiera de una compañía en un reporte ejecutivo con alertas cuantitativas.",
        model: "GPT-4o",
        prompt: `Eres un Analista Senior de Valoracion Fundamental preparando una nota para el Comite de Inversion.
[COPIA AQUI TU IDEA]

A partir de los estados contables y ratios proporcionados, necesito que redactes el informe fundamental:
1. Resumen de salud del negocio: tendencia del margen bruto y operativo durante los ultimos 5 anos.
2. Calidad de las ganancias (Earnings Quality): relacion entre el Beneficio Neto y el Flujo de Caja Operativo (deteccion de devengos agresivos).
3. Estructura de endeudamiento: vencimientos de deuda y capacidad de absorcion con el FCF actual.
4. Comparativa de multiplos frente a la mediana historica de la compania y sus competidores directos.
5. Semaforo de riesgos: clasificacion de la empresa en Verde (Segura), Amarillo (Vigilar) o Rojo (Alerta) con justificacion numerica estricta.

Restricciones:
- Basa cada afirmacion exclusivamente en datos numericos concretos; evita especulaciones no respaldadas.
- Incluye tabla resumen con magnitudes en millones de euros y variaciones interanuales (YoY).

Formato de salida: Informe analitico en Markdown formateado con estilo de boletin institucional.`,
        tags: ["fundamental", "informes", "análisis", "equity-research"]
      },
      {
        id: "fin-035",
        title: "Pipeline de Ingesta y Normalización de Ratios Piotroski F-Score y Altman Z-Score",
        desc: "Calcula de forma determinista el F-Score (0-9) y Z-Score sobre estados financieros normalizados.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Analista Cuantitativo Fundamental y Modelador de Solvencia Corporativa.
[COPIA AQUI TU IDEA]

Implementa el pipeline de calculo para los indicadores de fortaleza financiera Piotroski F-Score y Altman Z-Score:
1. Extraccion de las 9 variables binarias del F-Score divididas en rentabilidad, apalancamiento/liquidez y eficiencia operativa.
2. Formulacion del Altman Z-Score para empresas manufactureras y no manufactureras con sus coeficientes especificos.
3. Tratamiento de valores atipicos (outliers) y empresas con fondos propios negativos.
4. Generacion de senal categorica: Empresa Solida (F-Score >= 8, Z-Score > 2.99) vs Riesgo de Quiebra (F-Score <= 3, Z-Score < 1.81).
5. Exportacion a tabla estructurada en DuckDB / Pandas para screening cuantitativo.

Restricciones:
- No utilices aproximaciones; valida que los estados financieros cumplan el principio de devengo.
- Excluye del calculo a entidades financieras cuyo balance requiere adaptaciones especificas (CAMELS).

Formato de salida: Modulo de Python 'fundamental_scores.py' con tipado estricto Pydantic y tests unitarios con datos sinteticos.`,
        tags: ["fundamental", "piotroski", "altman-z", "solvencia", "screening"]
      },
      {
        id: "fin-036",
        title: "Detección de Manipulación Contable con M-Score de Beneish",
        desc: "Calcula los 8 índices del modelo probit de Beneish para detectar señales tempranas de fraude contable.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor Forense Financiero e Ingeniero de Datos Cuantitativos.
[COPIA AQUI TU IDEA]

Crea el algoritmo de deteccion de manipulacion contable mediante el M-Score de Beneish:
1. Calculo de los 8 subindices: DSRI (Dias de Ventas en Cuentas por Cobrar), GMI (Margen Bruto), AQI (Calidad de Activos), SGI (Crecimiento de Ventas), DEPI (Depreciacion), SGAI (Gastos Generales/Ventas), LVGI (Apalancamiento) y TATA (Devengos Totales sobre Activos).
2. Ponderacion formal segun la ecuacion parametrizada de Beneish: M = -4.84 + 0.920*DSRI + 0.528*GMI + 0.404*AQI + 0.892*SGI + 0.115*DEPI - 0.172*SGAI + 4.037*TATA + 0.032*LVGI.
3. Umbral de clasificacion: M-Score > -1.78 indica alta probabilidad de manipulacion contable.
4. Analisis de sensibilidad identificando que variable especifica empuja al alza el riesgo de anomalia.
5. Generacion de informe de alerta temprana con banderas rojas para comites de auditoria.

Restricciones:
- Requiere un minimo de dos ejercicios fiscales consecutivos cerrados para computar las tasas interanuales.

Formato de salida: Clase de Python 'BeneishFraudDetector' con metodos de analisis y reporte ejecutivo en Markdown.`,
        tags: ["auditoría", "beneish", "fraude", "forense", "contabilidad"]
      },
      {
        id: "fin-037",
        title: "Conciliación Automatizada de Dividendos y Fechas Ex-Date",
        desc: "Normaliza calendarios corporativos de dividendos, fechas ex-cupón y tipos impositivos de retención en origen.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero de Operaciones de Mercado (Middle Office) y Procesamiento de Eventos Corporativos.
[COPIA AQUI TU IDEA]

Disena el modulo de normalizacion y conciliacion de eventos corporativos de dividendos:
1. Ingesta estructurada de avisos de dividendos: Fecha de Anuncio, Fecha Ex-Date, Fecha de Registro (Record Date) y Fecha de Pago.
2. Distincion entre dividendos ordinarios, extraordinarios, scrip dividends (dividendo flexible) y devolucion de prima de emision.
3. Calculo de la retencion fiscal en origen segun la jurisdiccion del emisor y tratados de doble imposicion.
4. Ajuste automatico de series historicas de precios mediante factor multiplicativo de retroceso.
5. Alertas de desajustes temporales entre la confirmacion del custodio y el calendario de mercado.

Restricciones:
- Asegura trazabilidad completa de cada modificacion de precio historico con registro inmutable.

Formato de salida: Pipeline ETL en Python con almacenamiento en DuckDB y validacion con Pydantic.`,
        tags: ["dividendos", "eventos-corporativos", "etl", "middle-office", "ajustes"]
      }
    ]
  },
  {
    id: "backtesting",
    name: "Simulador de Estrategias Cuantitativas (F1.2)",
    prompts: [
      {
        id: "fin-012",
        title: "Diseño de Arquitectura de Motor de Backtesting Vectorial",
        desc: "Estructura un simulador rápido y modular para evaluar reglas de compra/venta históricas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Investigador Cuantitativo y Arquitecto de Sistemas de Negociacion Algoritmica.
[COPIA AQUI TU IDEA]

Necesito que estructures la arquitectura modular de nuestro motor de backtesting:
1. Separacion clara entre generacion de senales (logica pura), asignacion de capital (portfolio management) y ejecucion simulada (order execution).
2. Prevencion estricta del sesgo de anticipacion (look-ahead bias): las senales generadas al cierre del dia T solo se ejecutan al precio de apertura de T+1 o al cierre con retardo.
3. Soporte para posiciones largas (long) y cortas (short), gestion de efectivo disponible y apalancamiento maximo permitido.
4. Registro cronologico (trade log) que almacene: timestamp_in, ticker, side, price_in, size, timestamp_out, price_out, fees, pnl_neto, pnl_pct, duracion.
5. Comparacion contra estrategia buy & hold del indice de referencia en cada paso temporal.

Restricciones:
- Disena el motor priorizando operaciones vectorizadas con Polars o NumPy para procesar 10 anos de datos en menos de 2 segundos.
- Documenta las asunciones sobre ejecucion en el precio exacto vs ordenes limite no ejecutadas.

Formato de salida: Codigo completo de la clase 'VectorizedBacktester' en Python con tipado estricto y ejemplo de ejecucion.`,
        tags: ["backtesting", "algoritmos", "cuantitativo", "trading"]
      },
      {
        id: "fin-013",
        title: "Implementación de Optimización Walk-Forward y Prevención de Overfitting",
        desc: "Valida la robustez de una estrategia dividiendo la serie en ventanas móviles de entrenamiento y prueba fuera de muestra.",
        model: "DeepSeek V4",
        prompt: `Eres un Estadistico Cuantitativo especializado en validacion de modelos de machine learning y trading cuantitativo.
[COPIA AQUI TU IDEA]

Necesito que implementes el protocolo de validacion Walk-Forward Analysis (WFA):
1. Segmentacion temporal en ventanas rodantes o ancladas: periodo In-Sample (entrenamiento/optimizacion) y periodo Out-of-Sample (prueba ciega).
2. Calculo de la metrica Walk-Forward Efficiency (WFE): ratio entre el rendimiento anualizado Out-of-Sample y el In-Sample.
3. Deteccion de sobreajuste (overfitting): alertas si la estrategia requiere mas de 3 parametros libres o si el Sharpe cae mas del 40% fuera de muestra.
4. Generacion de la curva de equidad agregada concatenando exclusivamente los periodos Out-of-Sample reales.
5. Prueba de robustez Monte Carlo: permutacion aleatoria del orden de los retornos (bootstrap) para calcular el intervalo de confianza al 95% del Max Drawdown.

Restricciones:
- No permitas ninguna filtracion de informacion futura (data leakage) entre las particiones temporales.
- El codigo debe ser paralelizable mediante multiprocessing para evaluar multiples combinaciones de parametros.

Formato de salida: Script en Python con la funcion 'run_walk_forward_analysis()' y visualizacion de las ventanas temporales en consola.`,
        tags: ["walk-forward", "overfitting", "optimización", "estadística"]
      },
      {
        id: "fin-014",
        title: "Cálculo de Métricas de Rendimiento Ajustadas al Riesgo",
        desc: "Calcula Sharpe, Sortino, Calmar, Max Drawdown, CAGR y tasa de acierto con fórmulas matemáticas exactas.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Financiero encargado del modulo analitico de desempeno de carteras.
[COPIA AQUI TU IDEA]

A partir de una serie temporal de retornos periodicos de una estrategia, necesito que programes el calculo riguroso de:
1. CAGR (Compound Annual Growth Rate): tasa de crecimiento anual compuesto.
2. Volatilidad anualizada: desviacion estandar de los retornos escalada por raiz cuadrada del factor temporal (252 para dias, 52 para semanas).
3. Sharpe Ratio: exceso de retorno sobre la tasa libre de riesgo (Risk-Free Rate configurable) dividido por la volatilidad total.
4. Sortino Ratio: exceso de retorno dividido exclusivamente por la desviacion a la baja (Downside Deviation respecto a un target return).
5. Maximum Drawdown y Drawdown Duration: perdida maxima pico a valle en porcentaje y numero de dias naturales hasta recuperar el maximo anterior.
6. Calmar Ratio (CAGR / Max Drawdown), Win Rate (% de operaciones ganadoras) y Profit Factor (ganancias brutas / perdidas brutas).

Restricciones:
- Incluye el ajuste de anualizacion correcto segun la frecuencia de la serie temporal.
- Gestiona casos con volatilidad cero o periodos sin perdidas para evitar infinitos.

Formato de salida: Modulo de Python con funciones independientes y funcion agrupadora 'calculate_performance_metrics(returns_series, rf_rate=0.03)' devolviendo un diccionario estructurado.`,
        tags: ["sharpe", "sortino", "drawdown", "métricas"]
      },
      {
        id: "fin-015",
        title: "Simulador Realista de Costes de Fricción y Deslizamiento (Slippage)",
        desc: "Modela comisiones de broker, cánones de bolsa, spread bid-ask y deslizamiento por impacto en mercado.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Ejecucion Cuantitativa especializado en microestructura de mercados.
[COPIA AQUI TU IDEA]

Necesito que desarrolles el modelo de friccion operativa para nuestro simulador:
1. Comisiones de intermediacion: combinacion de tarifa plana por orden + porcentaje sobre volumen con minimo por transaccion.
2. Canones de liquidacion de mercado y tasas financieras (ej: Tasa Tobin espanola del 0.2% en compras de determinadas acciones).
3. Modelo de Spread Bid-Ask dinamico: coste directo de cruzar el libro de ordenes en funcion de la liquidez media del activo.
4. Modelo de impacto en mercado (Slippage): formula parametrica donde el deslizamiento es proporcional al tamano de la orden respecto al volumen medio diario (ADV).
5. Coste de financiacion (Carry / Swap) para posiciones apalancadas o posiciones cortas mantenidas durante el fin de semana.

Restricciones:
- El modelo debe demostrar el impacto acumulado de la friccion en estrategias de alta frecuencia frente a estrategias de posicion mensual.

Formato de salida: Clase 'FrictionModel' en Python que reciba una orden y devuelva el precio efectivo de ejecucion y el desglose de costes en moneda base.`,
        tags: ["slippage", "fricción", "comisiones", "ejecución"]
      },
      {
        id: "fin-016",
        title: "Generador de Ficha Ejecutiva de Rendimiento de Estrategia (Factsheet)",
        desc: "Crea una hoja resumen institucional con tabla de retornos mensuales y descomposicion de riesgo.",
        model: "GPT-4o",
        prompt: `Eres un Gestor Cuantitativo disenando el Factsheet mensual institucional de un fondo de inversion.
[COPIA AQUI TU IDEA]

A partir de los resultados de un backtest, redacta y estructura el reporte factsheet:
1. Resumen ejecutivo: nombre de la estrategia, filosofia de inversion, activo objetivo y horizonte temporal recomendado.
2. Tabla de retornos mes a mes (rejilla de 12 columnas por ano mas columna de retorno acumulado anual) con codigo de color por rendimiento.
3. Tabla de indicadores clave: Sharpe, Sortino, Max Drawdown, Volatilidad 12M, Beta contra el indice y Alfa de Jensen.
4. Grafico comparativo acumulado (Estrategia vs Benchmark) y panel inferior con grafico subyacente de Drawdown submarino.
5. Analisis de atribucion: % de ganancias generado en mercado alcista vs lateral vs bajista.

Restricciones:
- Los datos deben presentarse en formato profesional apto para auditoria externa.
- Incluye notas a pie de pagina especificando el tratamiento de dividendos (Gross vs Net Total Return).

Formato de salida: Documento estructurado en Markdown con tablas completas y fragmento CSS para estilizar la matriz mensual de retornos.`,
        tags: ["factsheet", "reporte", "mensual", "inversores"]
      },
      {
        id: "fin-038",
        title: "Simulación de Arbitraje Estadístico y Pares Cointegrados (Johansen / Engle-Granger)",
        desc: "Detecta cointegración entre activos y ejecuta estrategias market-neutral de reversión a la media.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Cuantitativo Senior de Arbitraje Estadístico en un Hedge Fund Market-Neutral.
[COPIA AQUI TU IDEA]

Desarrolla el motor de cointegracion y negociacion de pares de activos (Statistical Arbitrage Pairs Trading):
1. Test de estacionariedad Augmented Dickey-Fuller (ADF) sobre las series de precios individuales.
2. Test de cointegracion de Engle-Granger y procedimiento multivariante de Johansen para verificar relacion de equilibrio a largo plazo.
3. Estimacion del ratio de cobertura dinamico (Hedge Ratio) mediante regresion OLS y filtro de Kalman adaptativo.
4. Construccion de la serie de spread normalizada (Z-Score) con bandas de entrada (+/- 2.0 sigma) y salida (+/- 0.5 sigma o stop loss en 3.5 sigma).
5. Calculo del Half-Life de reversion a la media mediante el modelo Ornstein-Uhlenbeck para calibrar el horizonte de permanencia.

Restricciones:
- Aplica comisiones de corretaje y costes de prestamo de titulos (Borrowing Fees) para posiciones cortas.
- Deten la estrategia si la relacion de cointegracion se rompe estadisticamente durante la ventana movil.

Formato de salida: Codigo completo en Python con vectorizacion en NumPy y graficos de backtesting en Plotly.`,
        tags: ["arbitraje-estadístico", "cointegración", "pairs-trading", "kalman", "market-neutral"]
      },
      {
        id: "fin-039",
        title: "Optimización de Ejecución con Algoritmos VWAP / TWAP y Modelado de Slippage",
        desc: "Simula la ejecución fraccionada de órdenes institucionales minimizando impacto de mercado y slippage.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Algoritmos de Ejecucion Institucional en un Broker de Acceso Directo al Mercado (DMA).
[COPIA AQUI TU IDEA]

Crea el simulador de ejecucion de ordenes con perfiles VWAP (Volume-Weighted Average Price) y TWAP (Time-Weighted Average Price):
1. Curva historica de volumen intradiario (perfil U clasico) para fragmentacion de ordenes en ventanas de tiempo discretas.
2. Modelo de impacto de mercado no lineal de Almgren-Chriss considerando volatilidad instantanea y liquidez del libro.
3. Calculo del Implementation Shortfall: comparativa entre el precio de decision y el precio medio de ejecucion efectiva.
4. Simulacion de slippage estocastico dependiente del spread bid-ask y del tamano relativo de la orden frente al ADV (Average Daily Volume).
5. Metricas de rendimiento de ejecucion: slippage medio en puntos basicos (bps), participacion de volumen y desviacion estandar del VWAP.

Restricciones:
- Respeta estrictamente los limites de participacion de volumen (ej: no superar el 10% del volumen del intervalo).

Formato de salida: Script modular en Python con la clase 'OrderExecutionSimulator' y visualizacion de dispersion de ejecucion.`,
        tags: ["ejecución", "vwap", "twap", "slippage", "almgren-chriss"]
      },
      {
        id: "fin-040",
        title: "Pruebas de Robustez Monte Carlo sobre Curvas de Equity en Backtesting",
        desc: "Remuestrea operaciones históricas para evaluar riesgo de ruina, Maximum Drawdown esperado y sobreoptimización.",
        model: "Llama 3.3",
        prompt: `Eres un Validador de Modelos Cuantitativos y Auditor de Sistemas de Trading Algorítmico.
[COPIA AQUI TU IDEA]

Construye un modulo de analisis de robustez de Monte Carlo para curvas de rendimiento de estrategias de trading:
1. Ingesta de la serie de retornos por operacion (Trade PnL) de un backtesting finalizado.
2. Remuestreo estocastico con reemplazo (Bootstrapping no parametrico) sobre 10.000 iteraciones independientes.
3. Simulacion de ordenes temporales aleatorias para romper la autocorrelacion y verificar si los resultados dependen de la secuencia de aciertos.
4. Distribucion probabilistica del Maximum Drawdown: calculo del percentil 95% y 99% del drawdown peor esperado.
5. Probabilidad matematica de ruina o quiebra de la cuenta considerando un limite de capital de parada (Stop-Out Level).

Restricciones:
- No asumas normalidad en la distribucion de retornos; conserva la asimetria y curtosis observadas.

Formato de salida: Modulo de Python 'monte_carlo_equity.py' con generacion de graficos de abanico probabilistico (Fan Charts).`,
        tags: ["monte-carlo", "robustez", "drawdown", "riesgo-ruina", "bootstrapping"]
      }
    ]
  },
  {
    id: "sentimiento",
    name: "Analizador de Sentimiento Financiero (F1.3)",
    prompts: [
      {
        id: "fin-017",
        title: "Clasificación de Sentimiento Financiero Especializado con FinBERT",
        desc: "Analiza noticias y transcripciones de llamadas de resultados categorizando en Positivo, Neutral o Negativo.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Procesamiento de Lenguaje Natural Financiero (NLP) utilizando modelos como FinBERT y RoBERTa-Finance.
[COPIA AQUI TU IDEA]

Necesito que estructures el pipeline de clasificacion de sentimiento para noticias financieras:
1. Preprocesamiento de texto financiero: eliminacion de ruido (boilerplate de agencias, avisos legales), normalizacion de menciones monetarias y porcentajes.
2. Clasificacion de polaridad en tres clases: Positivo, Neutral, Negativo, asignando un score de confianza probabilistica entre 0.0 y 1.0.
3. Comprension de terminos idiomaticos de mercado (ej: 'headwinds', 'soft landing', 'guidance cut', 'margin expansion', 'beat expectations').
4. Ponderacion de la relevancia segun la ubicacion: mayor peso al titular y al primer parrafo frente al cuerpo secundario de la noticia.
5. Deteccion de noticias irrelevantes o meramente publicitarias para descartarlas del calculo del score de sentimiento global.

Restricciones:
- Evita clasificadores genericos de redes sociales; el lexico debe ser estrictamente financiero y corporativo.
- Gestiona correctamente frases con doble sentido o negaciones complejas.

Formato de salida: Codigo en Python utilizando la libreria Transformers de Hugging Face con un pipeline tipado y gestion de inferencia por lotes (batch processing).`,
        tags: ["nlp", "finbert", "sentimiento", "huggingface"]
      },
      {
        id: "fin-018",
        title: "Extracción de Entidades Nombradas Financieras (NER)",
        desc: "Identifica tickers, directivos, cifras de ingresos y magnitudes mencionadas en notas de prensa.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Informacion Cuantitativa experto en extraccion estructurada de eventos corporativos.
[COPIA AQUI TU IDEA]

Necesito un extractor de entidades financieras de alta precision sobre el texto de noticias:
1. Identificacion y mapeo de entidades de tipo ORGANIZACION a su ticker bursatil y codigo ISIN correspondiente.
2. Extraccion de magnitudes cuantitativas asociadas: cifra de facturacion, beneficio neto, porcentaje de dividendo, numero de empleados afectados en despidos.
3. Deteccion de fechas de impacto temporal (proximo trimestre fiscal, cierre de ano, fecha limite de OPA).
4. Extraccion de cargos clave (CEO, CFO, accionistas significativos) involucrados en declaraciones oficiales.
5. Normalizacion de monedas (convertir referencias a millones/billones y simbolos $, EUR, GBP a valores numericos puros).

Restricciones:
- Resuelve ambiguedades entre nombres de empresas comunes y palabras de diccionario (ej: Apple, Target, Block, Meta).
- Si no hay certeza en el ticker, marcar con bandera de ambiguedad y lista de posibles candidatos.

Formato de salida: Esquema JSON estructurado validado con Pydantic que capture la lista de entidades y sus relaciones semanticas.`,
        tags: ["ner", "entidades", "isin", "tickers"]
      },
      {
        id: "fin-019",
        title: "Detección de Divergencias entre Precio y Sentimiento de Mercado",
        desc: "Genera alertas cuantitativas cuando el sentimiento de las noticias choca con la acción del precio.",
        model: "DeepSeek V4",
        prompt: `Eres un Trader Cuantitativo especializado en estrategias contrarias (contrarian) y analisis de microestructura.
[COPIA AQUI TU IDEA]

Disena el algoritmo para identificar divergencias operativas entre la trayectoria del precio y el flujo de sentimiento:
1. Calculo del Sentimiento Acumulado Rodante (Moving Average del score de sentimiento a 3 y 7 dias).
2. Deteccion de Divergencia Alcista: el precio marca minimos decrecientes mientras el sentimiento medio de las noticias marca minimos crecientes (agotamiento vendedor).
3. Deteccion de Divergencia Bajista: el precio alcanza maximos mientras el flujo de noticias refleja debilidad o perdida de traccion fundamental.
4. Filtro de volumen: comprobacion de que el movimiento de precio viene respaldado o rechazado por volumen anormal (Z-Score de volumen > 2.0).
5. Cuantificacion del desfase temporal tipico (lag) entre la publicacion de la noticia y la reaccion del mercado.

Restricciones:
- Evita senales falsas durante dias festivos o sesiones de volumen bajo mediante umbrales minimos de noticias procesadas.

Formato de salida: Algoritmo en Python que reciba la serie temporal de precios y la serie de sentimiento, y genere una columna booleana 'divergence_signal' acompanada del motivo analitico.`,
        tags: ["divergencia", "contrarian", "señales", "volumen"]
      },
      {
        id: "fin-020",
        title: "Pipeline Completo de Ingesta y NLP para Feeds RSS Financieros",
        desc: "Automatiza la lectura continua de noticias de agencias financieras, deduplicación y almacenamiento.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Ingeniero de Datos en Streaming construyendo una canalizacion de noticias financieras en tiempo real.
[COPIA AQUI TU IDEA]

Necesito que construyas el pipeline integral de agregacion de noticias:
1. Ingesta periodica de fuentes RSS publicas (CNBC, Reuters, Investing.com, Bolsas y Mercados Espanoles).
2. Algoritmo de deduplicacion inteligente: detectar cuando 5 medios diferentes publican la misma noticia de agencia (calculo de similitud con TF-IDF o embeddings ligeros).
3. Procesamiento asincrono con colas de trabajo para no bloquear la aplicacion ante picos de noticias durante la apertura de Wall Street.
4. Almacenamiento optimizado en DuckDB o SQLite con tabla particionada por fecha y ticker.
5. Politica de retencion de datos: purga automatica de textos completos tras 90 dias conservando los scores agregados.

Restricciones:
- Manejo impecable de fallos de red, timeouts y cabeceras User-Agent respetuosas para evitar bloqueos IP.

Formato de salida: Codigo completo en Python con asyncio, feedparser y aiohttp listo para funcionar como un servicio demonio en segundo plano.`,
        tags: ["rss", "streaming", "asyncio", "pipeline"]
      },
      {
        id: "fin-041",
        title: "Análisis de Tono y Polaridad en Transcripciones de Earnings Calls con FinBERT",
        desc: "Segmenta intervenciones del CEO y CFO para extraer señales cuantitativas de optimismo y vacilación.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Ingeniero de NLP Financiero y Analista de Inteligencia de Mercado.
[COPIA AQUI TU IDEA]

Crea el pipeline de extraccion y scoring de sentimiento especializado en transcripciones de conferencias de resultados (Earnings Calls):
1. Segmentacion automatica del texto distinguiendo entre la Presentacion Formal de la Directiva y la Sesion de Preguntas y Respuestas (Q&A) de analistas.
2. Inferencia de polaridad con FinBERT (Positivo, Negativo, Neutro) a nivel de oracion con score continuo [-1.0, +1.0].
3. Deteccion de lenguaje evasivo, vacilaciones o marcadores de incertidumbre (Hedging Words segun el diccionario Loughran-McDonald).
4. Indice de divergencia tonal: comparacion entre el optimismo exhibido en la presentacion vs la tension en el turno de preguntas.
5. Correlacion historica entre el indice de tono obtenido y la sorpresa en resultados frente al consenso del mercado.

Restricciones:
- Descarta formulas de cortesia protocolaria que sesgan positivamente el analisis.

Formato de salida: Pipeline en Python con transformadores HuggingFace y tabla de resultados enriquecida en JSON.`,
        tags: ["nlp", "finbert", "earnings-calls", "sentimiento", "loughran-mcdonald"]
      },
      {
        id: "fin-042",
        title: "Detección de Anomalías y Spikes de Volumen en Redes Sociales Financieras",
        desc: "Monitorea streams de menciones de tickers para identificar picos repentinos y campañas coordinadas de retail.",
        model: "DeepSeek V4",
        prompt: `Eres un Cuantitativo de Senales Alternativas (Alternative Data) y Analista de Microestructura Social.
[COPIA AQUI TU IDEA]

Disena el detector de anomalias en series temporales de atencion en redes sociales y foros financieros:
1. Calculo de medias moviles y bandas Z-Score sobre el volumen diario y horario de menciones por ticker ($AAPL, $TSLA, etc.).
2. Deteccion de spikes anormales de atencion (> 3 desviaciones estandar sobre la media de 20 periodos).
3. Ratio de dispersión de autores: verificacion de si el volumen procede de miles de cuentas unicas o de pocas cuentas hiperactivas (deteccion de bots).
4. Correlacion cruzada temporal: determinar si el pico social precede o sigue al movimiento de precio y volumen bursatil.
5. Alerta temprana de estrangulamiento de posiciones cortas (Short Squeeze Risk) cuando coinciden alto short interest y spike social.

Restricciones:
- Aplica tecnicas de descarte de tickers ambiguos (ej: $A, $FOR, $CAN) para evitar falsos positivos.

Formato de salida: Servicio en Python con endpoints FastAPI y sistema de alertas asincronas.`,
        tags: ["datos-alternativos", "social-media", "spikes", "short-squeeze", "anomalías"]
      },
      {
        id: "fin-043",
        title: "Extracción Estructurada de Sentimiento Regulatorio en Informes SEC 10-K y 10-Q",
        desc: "Analiza la sección Item 1A (Factores de Riesgo) para cuantificar la evolución de contingencias legales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Analista de Riesgo Legal y Regulatorio Cuantitativo.
[COPIA AQUI TU IDEA]

Construye el analizador comparativo de factores de riesgo en informes oficiales presentados ante la SEC (Formularios 10-K y 10-Q):
1. Aislamiento y extraccion del Item 1A (Risk Factors) y el Item 7 (MD&A - Managements Discussion and Analysis).
2. Algoritmo de similitud textual (Jaccard / Cosine Similarity sobre embeddings) para medir el porcentaje de modificacion interanual.
3. Deteccion automatica de nuevos parrafos de riesgo anadidos (ej: ciberseguridad, sanciones geopoliticas, litigios en curso).
4. Clasificacion tematica de riesgos segun taxonomia predefinida (Operativo, Macro, Regulatorio, Tecnologico, Financiero).
5. Scoring de opacidad o legibilidad mediante los indices de Flesch-Kincaid y Gunning Fog.

Restricciones:
- Filtra las plantillas de texto estandar (Boilerplate Language) para centrarse exclusivamente en riesgos idiosincraticos novedosos.

Formato de salida: Script de Python utilizando 'sec-edgar-downloader' y 'beautifulsoup4' con reporte comparativo en Markdown.`,
        tags: ["sec-edgar", "10-k", "factores-riesgo", "regulatorio", "text-mining"]
      }
    ]
  },
  {
    id: "senales-tecnicas",
    name: "Generador de Señales Técnicas y Filtros (F1.4)",
    prompts: [
      {
        id: "fin-021",
        title: "Cálculo Determinista de Indicadores Técnicos Clásicos",
        desc: "Implementa medias móviles EMA/SMA, RSI, MACD, Bandas de Bollinger y ATR sin bibliotecas opacas.",
        model: "DeepSeek V4",
        prompt: `Eres un Programador Cuantitativo experto en matematicas de indicadores tecnicos y analisis de series temporales.
[COPIA AQUI TU IDEA]

Implementa de forma vectorial y determinista la siguiente bateria de indicadores tecnicos sobre una serie de precios OHLCV:
1. Medias Moviles: Simple (SMA) y Exponencial (EMA) con multiplicador alpha exacto = 2 / (periodo + 1).
2. Indice de Fuerza Relativa (RSI de Wilder de 14 periodos) utilizando media movil suavizada (RMA) para ganancias y perdidas.
3. MACD: linea rapida (EMA 12), linea lenta (EMA 26), linea de senal (EMA 9 del MACD) e histograma diferencial.
4. Bandas de Bollinger: banda media (SMA 20), banda superior (+2 desviaciones estandar muestrales) y banda inferior (-2 desviaciones estandar).
5. Average True Range (ATR de 14 periodos): calculo del rango verdadero considerando huecos (gaps) de apertura.

Restricciones:
- No utilices TA-Lib si introduce dependencias en C complejas de compilar; usa Polars o NumPy puro.
- Trata con precision los periodos de inicializacion (warm-up periods) rellenando con NaN antes del periodo minimo requerido.

Formato de salida: Modulo de Python con funciones puras altamente optimizadas, testeadas con datos de prueba unitarios comparables a TradingView.`,
        tags: ["indicadores", "rsi", "macd", "bollinger", "atr"]
      },
      {
        id: "fin-022",
        title: "Reconocimiento Algorítmico de Patrones de Velas Japonesas",
        desc: "Identifica patrones formales como Doji, Envolvente alcista/bajista, Martillo y Estrella de la mañana.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Desarrollador de Algoritmos de Reconocimiento de Patrones Graficos Financieros.
[COPIA AQUI TU IDEA]

Crea el motor algoritmico para clasificar patrones de velas japonesas basados en relaciones matematicas de tamano relativo:
1. Definicion de magnitudes: tamano del cuerpo (|Close - Open|), sombra superior (High - max(Open, Close)), sombra inferior (min(Open, Close) - Low) y rango total (High - Low).
2. Deteccion de Doji: cuerpo inferior al 5% del rango total de la vela.
3. Deteccion de Martillo (Hammer) y Estrella Fugaz (Shooting Star): sombra de al menos 2 veces el tamano del cuerpo y sombra opuesta casi nula.
4. Deteccion de Pauta Envolvente (Bullish / Bearish Engulfing): cuerpo de la vela actual que cubre completamente el cuerpo de la vela previa con cambio de direccion.
5. Contexto previo: validacion de que el patron ocurre tras una tendencia previa identificable (minimo 5 velas consecutivas en direccion alcista o bajista).

Restricciones:
- Cada patron debe definirse mediante formulas booleanas claras sin factores subjetivos o arbitrarios.

Formato de salida: Codigo en Python con Polars/Pandas que anada columnas booleanas ('pattern_hammer', 'pattern_engulfing_bull', etc.) y el nivel de fiabilidad.`,
        tags: ["velas", "patrones", "candlestick", "algoritmos"]
      },
      {
        id: "fin-023",
        title: "Matriz Multiactivo de Detección de Señales y Screener Técnico",
        desc: "Filtra un universo de 100+ acciones identificando aquellas que cumplen condiciones técnicas complejas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Desarrollador Cuantitativo construyendo un Screener de Mercado en tiempo real.
[COPIA AQUI TU IDEA]

Desarrolla el motor de escaneo (screener) para evaluar simultaneamente una lista de activos:
1. Evaluacion de filtros cruzados: precio sobre media de 200 sesiones + RSI saliendo de sobreventa (<35 cruzando al alza) + volumen del dia > 1.5x media de 20 sesiones.
2. Clasificacion por orden de fortaleza relativa: ranking de activos segun la distancia porcentual a sus maximos anuales (52-week highs).
3. Ejecucion en paralelo eficiente mediante multiprocesamiento o vectorizacion para evaluar 200 activos en menos de 1 segundo.
4. Salida en formato estructurado para alimentar tablas interactivas en el frontend.
5. Generacion automatica del texto justificativo de la senal (ej: 'Cruce dorado MA50 sobre MA200 confirmado con aumento de volumen del 85%').

Restricciones:
- Garantiza que la falta de datos de un activo (ej: cotizacion suspendida) no detenga el procesamiento del resto del universo.

Formato de salida: Script de Python completo que procese un directorio de archivos Parquet y devuelva un DataFrame con los candidatos que superan el filtro.`,
        tags: ["screener", "filtros", "multiactivo", "ranking"]
      },
      {
        id: "fin-044",
        title: "Cálculo de Microestructura y Flujo de Órdenes (Order Flow / Cumulative Volume Delta)",
        desc: "Procesa operaciones a mercado en el bid vs ask para calcular el Cumulative Volume Delta (CVD) e identificar absorción.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Microestructura de Mercado y Sistemas de Analisis de Flujo de Ordenes (Order Flow).
[COPIA AQUI TU IDEA]

Implementa el motor de computo de Cumulative Volume Delta (CVD) a partir de datos Tick-by-Tick / Time and Sales:
1. Clasificacion de cada transaccion segun el algoritmo de Lee-Ready o marca tick para determinar si fue agresion compradora (en el ask) o vendedora (en el bid).
2. Agregacion temporal del volumen delta: Delta = Volumen_Comprador - Volumen_Vendedor para cada vela.
3. Calculo acumulado del CVD y trazado continuo frente a la evolucion del precio del subyacente.
4. Deteccion algoritmica de divergencias: Divergencia Alcista (precio marca minimos decrecientes pero CVD marca minimos crecientes, senal de absorcion pasiva) y viceversa.
5. Calculo de zonas de Maxima Densidad de Volumen (Point of Control / POC) del perfil de volumen intradiario.

Restricciones:
- Optimiza el procesamiento mediante buffers continuos en NumPy para procesar mas de 100.000 operaciones por segundo.

Formato de salida: Modulo de Python vectorizado 'order_flow_cvd.py' con generacion de senales de absorcion.`,
        tags: ["order-flow", "cvd", "microestructura", "lee-ready", "divergencias"]
      },
      {
        id: "fin-045",
        title: "Filtros Adaptativos de Kalman para Seguimiento de Tendencias de Volatilidad",
        desc: "Aplica filtros de estado para separar la señal subyacente del ruido gaussiano de alta frecuencia en cotizaciones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Senales Cuantitativas y Filtrado Estadistico Aplicado a Series Temporales Financieras.
[COPIA AQUI TU IDEA]

Desarrolla un indicador de tendencia adaptativo basado en el Filtro de Kalman de 1D y 2D:
1. Formulacion del modelo espacio-estado: Ecuacion de estado (x_t = x_{t-1} + v_{t-1}) y ecuacion de observacion (z_t = x_t + w_t).
2. Calibracion dinamica de las covarianzas de ruido: Ruido del proceso Q (velocidad de adaptacion a cambios reales de tendencia) y ruido de medicion R (sensibilidad al ruido intradia).
3. Actualizacion iterativa paso a paso: Prediccion a priori, calculo de la ganancia de Kalman K_t y actualizacion a posteriori.
4. Generacion de senal de cruce suave: posicion larga cuando la estimacion de velocidad es positiva y el precio supera el estado filtrado.
5. Calculo del error cuadratico medio de estimacion para medir la certeza del filtro en periodos de choque de volatilidad.

Restricciones:
- No incurras en sesgo de anticipacion (Look-Ahead Bias); la actualizacion debe realizarse exclusivamente con informacion disponible en t.

Formato de salida: Modulo de Python con la clase 'KalmanTrendFilter' utilizando 'pykalman' o implementacion pura en NumPy.`,
        tags: ["kalman", "filtrado", "senales", "ruido", "espacio-estado"]
      },
      {
        id: "fin-046",
        title: "Modelado de Puntos Pivot y Zonas de Oferta/Demanda Institucional (Liquidity Pools)",
        desc: "Identifica zonas de liquidez concentrada, máximos y mínimos de sesiones previas y vacíos de liquidez (FVG).",
        model: "GPT-4o",
        prompt: `Eres un Especialista en Conceptos de Smart Money (SMC) y Modelado Algorítmico de Zonas de Liquidez.
[COPIA AQUI TU IDEA]

Construye el detector de niveles de liquidez institucional y vacios de liquidez (Fair Value Gaps / FVG):
1. Identificacion algoritmica de Swing Highs y Swing Lows mediante fractales de Williams o confirmacion de 3 velas.
2. Deteccion de Fair Value Gaps alcistas y bajistas: brechas entre la mecha de la vela 1 y la vela 3 con fuerte expansion en la vela 2.
3. Registro y seguimiento de estado de los FVGs: Abierto, Parcialmente Mitigado (50%) o Totalmente Mitigado/Relleno.
4. Mapeo de zonas de acumulacion de stop loss por encima de maximos iguales (Equal Highs / BSL) y por debajo de minimos iguales (Equal Lows / SSL).
5. Senal de barrido de liquidez (Liquidity Sweep) y cambio de caracter (Change of Character / CHoCH) para entradas contratendenciales.

Restricciones:
- Define con rigor matematico los umbrales de tamano minimo para que una vela sea clasificada como vela de expansion impulsiva.

Formato de salida: Codigo en Python integrado con Pandas que anada columnas booleanas de niveles y reporte de zonas activas.`,
        tags: ["smc", "fvg", "liquidez", "swing-trading", "acción-del-precio"]
      }
    ]
  },
  {
    id: "risk-management",
    name: "Calculadora de Riesgo, VaR y Stress Testing (F1.5)",
    prompts: [
      {
        id: "fin-024",
        title: "Cálculo de Value at Risk (VaR) y Conditional VaR (Expected Shortfall)",
        desc: "Implementa métodos paramétrico, histórico y Monte Carlo para cuantificar la pérdida máxima esperada.",
        model: "DeepSeek V4",
        prompt: `Eres un Oficial Principal de Riesgos de Mercado (CRO) y Doctor en Matematicas Financieras.
[COPIA AQUI TU IDEA]

Disena e implementa el modulo de calculo de riesgo de mercado para una cartera de inversion:
1. Parametric VaR (Varianza-Covarianza): asumiendo distribucion normal y t-Student multivariante, para horizontes temporales de 1 dia y 10 dias con niveles de confianza del 95% y 99%.
2. Historical VaR: ordenacion empirica de retornos historicos de los ultimos 500 dias sin supuestos de distribucion parametrica.
3. Monte Carlo VaR: simulacion de 10.000 trayectorias de precios correlacionadas mediante descomposicion de Cholesky de la matriz de covarianzas.
4. Conditional VaR (CVaR / Expected Shortfall): calculo de la perdida media esperada en los casos que exceden el umbral del VaR (coherente con requerimientos de Basilea IV).
5. Descomposicion del VaR por activo: identificar que posicion individual aporta mayor porcentaje al riesgo agregado de la cartera.

Restricciones:
- Maneja correctamente matrices de covarianza no definidas positivas mediante algoritmos de correccion espectral (nearest positive semi-definite matrix).

Formato de salida: Modulo de Python con la clase 'PortfolioRiskEngine' con tipado estricto, docstrings explicativos y tabla resumen de resultados.`,
        tags: ["var", "cvar", "riesgo", "monte-carlo", "basilea"]
      },
      {
        id: "fin-025",
        title: "Simulador de Stress Testing ante Escenarios de Crisis Histórica",
        desc: "Evalúa el impacto inmediato en la cartera de shocks como Lehman 2008, COVID 2020 o inflación 2022.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Gestor de Riesgos especializado en pruebas de estres y analisis de escenarios extremos para fondos de pensiones.
[COPIA AQUI TU IDEA]

Crea el motor de simulacion de escenarios de estres historicos e hipoteticos sobre la composicion de la cartera:
1. Escenarios historicos predefinidos:
   - Quiebra de Lehman Brothers (Septiembre 2008): shock de renta variable -35%, ampliacion de spreads de credito +400 bps, vuelo a la calidad en deuda soberana.
   - Crack del COVID-19 (Marzo 2020): shock de renta variable -30% en 4 semanas, colapso del petroleo -60%, repunte de volatilidad VIX > 80.
   - Shock de Tipos e Inflacion (2022): caida simultanea de renta variable (-20%) y renta fija (-15%) por subidas agresivas de bancos centrales.
2. Escenarios hipoteticos personalizables: aplicacion de variaciones arbitrarias simultaneas (ej: -15% Bolsa Europea, +50 bps Bono Aleman, +10% Dolar).
3. Matriz de correlaciones estresadas: contemplar que durante las crisis las correlaciones entre activos de riesgo tienden a converger a 1.0.
4. Estimacion del impacto patrimonial en euros y porcentaje sobre el valor neto liquidativo (NAV).

Restricciones:
- Modela con precision la duracion y convexidad para carteras con exposicion a renta fija.

Formato de salida: Codigo en Python con la funcion 'run_stress_test(portfolio_weights, scenario_name)' y salida estructurada en tabla Markdown.`,
        tags: ["stress-testing", "crisis", "escenarios", "cartera"]
      },
      {
        id: "fin-026",
        title: "Modelado de Optimización de Cartera Markowitz y Black-Litterman",
        desc: "Calcula la frontera eficiente, la cartera de mínima varianza y la cartera de máximo ratio Sharpe.",
        model: "DeepSeek V4",
        prompt: `Eres un Gestor de Activos Cuantitativo especializado en Teoria Moderna de Carteras.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de optimizacion y rebalanceo de pesos de una cartera de activos:
1. Optimizacion de Media-Varianza de Markowitz: formulacion del problema cuadratico con restricciones de pesos (no apalancamiento, pesos entre 0% y 25% por activo).
2. Generacion de la Frontera Eficiente: calculo de 50 carteras optimas a lo largo de la curva riesgo-retorno.
3. Identificacion de dos carteras clave: Cartera de Minima Varianza Global (GMV) y Cartera de Maximo Ratio Sharpe (Tangency Portfolio).
4. Implementacion del modelo Black-Litterman: combinacion del equilibrio de mercado con opiniones subjetivas del analista (views) y matriz de incertidumbre.
5. Calculo de los costes de transaccion implicitos al pasar de la cartera actual a la cartera optima recomendada.

Restricciones:
- Utiliza la libreria 'cvxpy' o 'scipy.optimize' asegurando convergencia determinista del optimizador cuadratico.

Formato de salida: Script en Python documentado con funcion 'optimize_portfolio(expected_returns, cov_matrix, constraints)' y generacion de coordenadas para el grafico de la frontera eficiente.`,
        tags: ["markowitz", "black-litterman", "optimización", "frontera-eficiente"]
      },
      {
        id: "fin-047",
        title: "Modelado de Volatilidad Estocástica Heston y Sonrisa de Volatilidad",
        desc: "Calibra el modelo de Heston contra precios de opciones de mercado para capturar la sonrisa y curtosis.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Financiero de Derivados Exoticos y Modelado de Volatilidad Estocastica.
[COPIA AQUI TU IDEA]

Implementa el modelo de volatilidad estocastica de Heston para valoracion de opciones y generacion de superficies de volatilidad:
1. Formulacion de las EDOs estocasticas acopladas para el activo S_t y la varianza v_t con correlacion Browniana rho.
2. Verificacion de la condicion de Feller (2*kappa*theta > sigma^2) para asegurar que la varianza permanece estrictamente positiva.
3. Valoracion de opciones Call y Put europeas mediante integracion numerica de la transformada de Fourier (metodo de Carr-Madan o Gauss-Laguerre).
4. Calibracion de parametros (kappa, theta, sigma, rho, v0) minimizando el error cuadratico medio frente a las volatilidades implicitas de mercado (Levenberg-Marquardt).
5. Visualizacion tridimensional de la superficie de volatilidad implicita resultante en funcion del Strike y el Vencimiento (Time to Maturity).

Restricciones:
- Controla la inestabilidad de rama en el plano complejo de la funcion caracteristica para evitar saltos discontinuos de precio.

Formato de salida: Script de Python utilizando 'scipy.optimize' y 'scipy.integrate' con graficos 3D en Plotly.`,
        tags: ["heston", "opciones", "volatilidad-estocástica", "derivados", "superficie-volatilidad"]
      },
      {
        id: "fin-048",
        title: "Cálculo de Greeks de Segundo Orden (Vanna, Volga, Charm) para Coberturas",
        desc: "Calcula derivadas cruzadas de la ecuación de Black-Scholes para la gestión dinámica de carteras de opciones complejas.",
        model: "DeepSeek V4",
        prompt: `Eres un Trader Cuantitativo de Volatilidad y Gestor de Libros de Opciones.
[COPIA AQUI TU IDEA]

Crea la calculadora analitica de sensibilidades de segundo y tercer orden para libros de opciones:
1. Greeks de primer orden: Delta (dC/dS), Gamma (d2C/dS2), Vega (dC/dsigma), Theta (-dC/dt), Rho (dC/dr).
2. Greeks cruzados de segundo orden:
   - Vanna (dDelta/dsigma = dVega/dS): sensibilidad del Delta a cambios en la volatilidad.
   - Volga / Vomma (d2C/dsigma2 = dVega/dsigma): curvatura del precio respecto a la volatilidad.
   - Charm / Delta Decay (-dDelta/dt): decaimiento temporal del Delta.
3. Analisis del impacto de Vanna y Volga en coberturas de cola en periodos de shock de volatilidad.
4. Matriz de sensibilidades agregadas a nivel de cartera con ponderacion por posicion neta de contratos.
5. Recomendacion de rebalanceo delta-neutral y vega-neutral con minimizacion de costes de transaccion.

Restricciones:
- Implementa calculo vectorial directo mediante formulas cerradas analiticas derivadas de Black-Scholes-Merton.

Formato de salida: Modulo de Python 'option_greeks_advanced.py' con tipado de datos estricto y benchmark de velocidad.`,
        tags: ["greeks", "vanna", "volga", "opciones", "coberturas", "black-scholes"]
      },
      {
        id: "fin-049",
        title: "Simulación de Crisis de Liquidez y Escenarios de Salida Forzada (Fire-Sale)",
        desc: "Modela el impacto en el precio de liquidaciones aceleradas de cartera en mercados ilíquidos bajo estrés.",
        model: "GPT-4o",
        prompt: `Eres un Director de Riesgos (CRO) modelando escenarios de liquidez para fondos de inversion UCITS y Hedge Funds.
[COPIA AQUI TU IDEA]

Desarrolla el modelo de simulacion de liquidacion forzosa de activos en condiciones de crisis de liquidez (Liquidity Stress Testing):
1. Estimacion del tiempo de liquidacion ordenada de la cartera segun dias de contratacion media (Days to Liquidate) bajo distintos porcentajes de participacion de volumen (10%, 20%, 30%).
2. Modelo de elasticidad precio-volumen con deterioro de liquidez en condiciones de panico de mercado.
3. Calculo de perdidas por realizacion acelerada de activos (Fire-Sale Losses) en ventanas temporales de 1, 5 y 10 dias de reembolso masivo.
4. Desglose de activos en cubos de liquidez segun normativa europea ESMA / UCITS (Bucket 1: <1 dia, Bucket 2: 2-7 dias, Bucket 3: >30 dias).
5. Medidas de contingencia: activacion de swing pricing, suspension temporal de reembolsos (Gates) y lineas de credito de respaldo.

Restricciones:
- Modela explicitamente la retroalimentacion de ventas cruzadas donde liquidar un activo deprime el precio de colaterales correlacionados.

Formato de salida: Herramienta de simulacion en Python con generacion de informe formal de estres de liquidez en PDF.`,
        tags: ["liquidez", "stress-testing", "fire-sale", "ucits", "esma", "reembolsos"]
      }
    ]
  },
  {
    id: "macro-dashboard",
    name: "Radar Macroeconómico y Curva de Tipos (F1.6)",
    prompts: [
      {
        id: "fin-027",
        title: "Monitorización de la Curva de Rendimientos e Indicadores de Recesión",
        desc: "Modela la pendiente de la curva soberana (10Y - 2Y) y señales de inversión como alerta anticipada.",
        model: "DeepSeek V4",
        prompt: `Eres un Macroestratega y Analista de Mercados de Renta Fija Soberana.
[COPIA AQUI TU IDEA]

Desarrolla el modulo para modelar y vigilar la estructura temporal de los tipos de interes (Yield Curve):
1. Ingesta de rendimientos soberanos a distintos plazos: 3 meses, 2 anos, 5 anos, 10 anos y 30 anos (tanto para bonos del Tesoro USA como Bund aleman / Bono espanol).
2. Calculo del diferencial de pendientes clave: Spread 10Y - 2Y y Spread 10Y - 3M.
3. Deteccion de inversion de la curva: generar alerta cuando el spread cae por debajo de 0 bps y contabilizar el numero de sesiones consecutivas invertida.
4. Ajuste parametrico de la curva mediante el modelo de Nelson-Siegel: calculo de los factores de nivel, pendiente y curvatura.
5. Cuantificacion de la probabilidad historica de recesion en los siguientes 12-18 meses a partir de la profundidad de la inversion.

Restricciones:
- Incluye el calculo del cambio diario en puntos basicos (bps) para cada nodo de la curva.

Formato de salida: Modulo de Python con funciones de ajuste de curva y generacion de grafico interactivo con Plotly visualizando la curva actual vs hace 1 mes vs hace 1 ano.`,
        tags: ["curva-tipos", "macro", "recesión", "bonos"]
      },
      {
        id: "fin-028",
        title: "Modelo de Descuento de Dividendos y Sensibilidad a Tipos de Interés",
        desc: "Aplica el modelo de Gordon-Shapiro y descuento de flujos para estimar el valor intrínseco.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Analista de Valoracion de Empresas y Economista Financiero.
[COPIA AQUI TU IDEA]

Implementa el modelo de valoracion por descuento de dividendos y analiza su sensibilidad macroeconomica:
1. Modelo de Gordon-Shapiro: V0 = D1 / (k - g), donde D1 es el dividendo esperado, k el coste del capital y g la tasa de crecimiento a perpetuidad.
2. Modelo de dividendos en dos fases: fase de alto crecimiento temporal (5 anos) seguida de estabilizacion al ritmo del PIB nominal.
3. Analisis de sensibilidad bidimensional: matriz que cruce diferentes niveles de tasa libre de riesgo (variaciones en k de +-150 bps) con variaciones en la tasa g.
4. Calculo de la duracion del dividendo (Dividend Duration): medida de que tan sensible es la cotizacion de la accion ante subidas de tipos de interes de los bancos centrales.
5. Comparacion entre el valor teorico calculado y el precio de cotizacion actual en mercado (% de sobrevaloracion o infravaloracion).

Restricciones:
- Comprueba la condicion matematica k > g para evitar valores negativos o indeterminados.

Formato de salida: Codigo en Python que calcule la valoracion y exporte la matriz de sensibilidad en formato HTML/Markdown para su visualizacion en el dashboard.`,
        tags: ["dividendos", "valoración", "gordon-shapiro", "sensibilidad"]
      },
      {
        id: "fin-029",
        title: "Radar Macroeconómico de Ciclo Económico y Asignación Táctica",
        desc: "Clasifica el régimen macroeconómico actual (Expansión, Desaceleración, Recesión, Recuperación).",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Gestor de Carteras Global Macro aplicando modelos de ciclo estilo Bridgewater o Cuadrante de Merrill Lynch.
[COPIA AQUI TU IDEA]

Construye la logica de clasificacion del regimen macroeconomico a partir de dos ejes (Crecimiento e Inflacion):
1. Variables de entrada: indicadores adelantados de actividad (PMI Manufacturero/Servicios, Ventas Minoristas) y sorpresas de inflacion (CPI, Core PCE).
2. Definicion de los 4 cuadrantes del ciclo:
   - Cuadrante 1: Crecimiento Acelerando + Inflacion Moderada (Expansion / Goldilocks) -> Sobreponderar Renta Variable.
   - Cuadrante 2: Crecimiento Acelerando + Inflacion Acelerando (Sobrecalentamiento) -> Sobreponderar Commodities / Cash.
   - Cuadrante 3: Crecimiento Desacelerando + Inflacion Acelerando (Estanflacion) -> Reducir riesgo general / Renta Fija Corto Plazo.
   - Cuadrante 4: Crecimiento Desacelerando + Inflacion Desacelerando (Deflacion / Recesion) -> Sobreponderar Bonos Soberanos Largo Plazo.
3. Calculo del Momentum Z-Score para cada indicador macro para evitar ruido de lecturas mensuales individuales.
4. Recomendacion tactica de ponderacion por clase de activo segun el cuadrante activo.

Restricciones:
- Define con rigor la periodicidad de actualizacion de cada dato y el desfase de reporte (reporting lag).

Formato de salida: Estructura de datos en Python que devuelva el cuadrante actual con nivel de conviccion y recomendaciones de asset allocation en formato JSON.`,
        tags: ["macro", "ciclo", "asset-allocation", "estrategia"]
      },
      {
        id: "fin-050",
        title: "Modelado de Curvas de Tipos Nelson-Siegel-Svensson y Riesgo de Duración",
        desc: "Ajusta la estructura temporal de tipos de interés soberanos para valorar bonos y calcular duración modificada.",
        model: "DeepSeek V4",
        prompt: `Eres un Estratega Cuantitativo de Renta Fija y Analista de Mercados de Deuda Soberana.
[COPIA AQUI TU IDEA]

Implementa el modelo parametrico de curva de tipos de interes de Nelson-Siegel y Svensson (NSS):
1. Formulacion matematica de la tasa instantanea forward y la curva de tipos cupon cero (Zero-Coupon Yield Curve) con los 6 parametros: beta_0, beta_1, beta_2, beta_3, tau_1, tau_2.
2. Interpretacion economica de los parametros: nivel a largo plazo (beta_0), pendiente a corto plazo (beta_1), curvatura 1 (beta_2) y curvatura 2 (beta_3).
3. Calibracion de parametros sobre cotizaciones de bonos soberanos (ej: bonos del Tesoro de EE.UU. o Deuda Publica de Espana) mediante optimizacion no lineal con restricciones.
4. Calculo exacto de la Duracion de Macaulay, Duracion Modificada y Convexidad para cualquier flujo de caja proyectado.
5. Inmunizacion de carteras de renta fija: ajuste de ponderaciones para igualar la duracion y convexidad del pasivo objetivo.

Restricciones:
- Valida que las tasas proyectadas a plazos infinitos converjan de forma asintotica y realista.

Formato de salida: Modulo de Python 'yield_curve_nss.py' con calibracion automatica y graficos comparativos de curvas en Matplotlib.`,
        tags: ["renta-fija", "curva-de-tipos", "nelson-siegel", "duración", "convexidad"]
      },
      {
        id: "fin-051",
        title: "Transmisión de Política Monetaria y Desajuste de Tipos Swap OIS",
        desc: "Monitorea la divergencia entre tipos interbancarios, depósitos del banco central y swaps OIS para anticipar subidas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Macroeconomista Cuantitativo y Trader de Tipos de Interes en una Mesa de Swaps.
[COPIA AQUI TU IDEA]

Disena el monitor analitico de transmision de politica monetaria y spreads de swaps OIS (Overnight Indexed Swap):
1. Ingesta de curvas OIS para el Banco Central Europeo (€STR) y la Reserva Federal (SOFR).
2. Descomposicion de las expectativas implicitas de tipos: calculo probabilistico de subidas/bajadas de tipos en cada reunion de politica monetaria programada.
3. Analisis del spread TED y OIS-Libor/Euribor como barometro de tension crediticia interbancaria y riesgo sistemico.
4. Evaluacion del impacto del endurecimiento cuantitativo (Quantitative Tightening / QT) en la liquidez excedentaria del sistema bancario.
5. Senal de divergencia macro: alertas cuando los precios de los swaps descuentan trayectorias de tipos que divergen de las proyecciones del dot plot oficial.

Restricciones:
- Especifica claramente las convenciones de conteo de dias (Act/360 vs Act/365) segun el instrumento y mercado.

Formato de salida: Codigo en Python con conexion a APIs publicas del BCE y la FED y cuadro de mando de expectativas de tipos.`,
        tags: ["política-monetaria", "ois", "sofr", "estr", "bancos-centrales"]
      },
      {
        id: "fin-052",
        title: "Índice Predictivo de Recesión mediante Diferenciales de Curva 10Y-2Y y 10Y-3M",
        desc: "Modela la probabilidad histórica de recesión en horizontes de 6-18 meses a partir de la inversión de la curva de tipos.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Econometrista Aplicado y Creador de Indicadores Líderes de Ciclo Económico.
[COPIA AQUI TU IDEA]

Construye un modelo probit de prediccion de recesiones macroeconomicas basado en la estructura temporal de tipos:
1. Calculo historico diario del spread de tipos de interes: Diferencial 10 anos menos 2 anos (10Y-2Y) y 10 anos menos 3 meses (10Y-3M).
2. Definicion de variables dependientes de recesion oficial segun los periodos documentados por el NBER (National Bureau of Economic Research).
3. Calibracion de un modelo de regresion Probit / Logit para estimar P(Recesion en t + k | Spread_t) en horizontes k = 6, 12 y 18 meses.
4. Identificacion de la senal de desinversion (Uninversion): analisis de por que la recesion suele materializarse cuando la curva vuelve a empinarse tras haber estado invertida.
5. Cuadro de mando visual con el indice probabilistico continuo (0% a 100%) y areas sombreadas de recesiones historicas.

Restricciones:
- Aplica validacion cruzada temporal (Time-Series Split) para evitar overfitting con datos historicos futuros.

Formato de salida: Script de Python utilizando 'statsmodels' y 'pandas' con exportacion de graficos interactivos.`,
        tags: ["recesión", "curva-invertida", "macroeconomía", "probit", "indicadores-líderes"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Auditoría, Exportación y Alertas)",
    prompts: [
      {
        id: "fin-030",
        title: "Conciliación y Validación de Integridad de Series Temporales Financieras",
        desc: "Detecta huecos de cotización, anomalías de precios, divisiones no ajustadas y fechas festivas.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Datos Cuantitativos garantizando la pureza de las series historicas.
[COPIA AQUI TU IDEA]

Crea el algoritmo de auditoria de integridad para series temporales de precios de mercado:
1. Deteccion de dias de cotizacion ausentes segun el calendario bursatil oficial del mercado (ej: festivos de BME o NYSE vs fallo de descarga).
2. Deteccion de saltos de precio anomalos (Spikes): variaciones diarias superiores al 30% que no coincidan con splits o hechos relevantes corporativos.
3. Comprobacion de coherencia basica OHLC: verificar que High >= max(Open, Close) y Low <= min(Open, Close).
4. Verificacion de volumen cero en activos con alta liquidez (sintoma de desconexion del feed de datos).
5. Imputacion controlada o descarte justificado con emision de informe de no conformidad antes de pasar los datos a los modelos de backtesting.

Restricciones:
- No reemplaces datos anomalos de forma silenciosa; todo ajuste debe quedar documentado en una tabla de auditoria.

Formato de salida: Script en Python con la funcion 'audit_financial_timeseries(df, exchange_calendar)' que devuelva el dataframe saneado y un informe de anomalias detectadas.`,
        tags: ["auditoría", "datos", "calidad", "limpieza"]
      },
      {
        id: "fin-031",
        title: "Exportación Avanzada a Excel con Fórmulas Nativas Financieras",
        desc: "Genera hojas de cálculo dinámicas en formato .xlsx con fórmulas vivas (=SUMA, =TIR, =PAGO) con openpyxl.",
        model: "GPT-4o",
        prompt: `Eres un Desarrollador Python especializado en generacion de modelos financieros en hojas de calculo corporativas.
[COPIA AQUI TU IDEA]

Desarrolla el modulo para exportar los datos analizados a un libro de Excel (.xlsx) interactivo:
1. Estructura multi-pestana: 'Resumen Ejecutivo', 'Series Historicas', 'Estados Financieros' y 'Parametros'.
2. Insercion de formulas nativas de Excel en lugar de valores estaticos (usar formulas como =SUM(...), =AVERAGE(...), =IRR(...), =XNPV(...)).
3. Formato numerico profesional: moneda con separador de miles y dos decimales, porcentajes con dos decimales y fechas en formato ISO YYYY-MM-DD.
4. Formato condicional automatico: escalas de color verde/rojo para rentabilidades y barras de datos para exposicion porcentual.
5. Bloqueo de celdas que contienen formulas matematicas para evitar manipulacion accidental por parte del usuario final.

Restricciones:
- No generes archivos CSV; debe ser un libro Excel binario (.xlsx) compatible con Microsoft Excel, Google Sheets y LibreOffice.

Formato de salida: Codigo en Python utilizando la libreria 'openpyxl' con una funcion 'export_to_financial_excel(data, output_path)' completa y estilizada con cabeceras oscuras.`,
        tags: ["excel", "openpyxl", "fórmulas", "exportación"]
      },
      {
        id: "fin-032",
        title: "Sistema de Alertas Financieras Multicanal con Umbrales de Seguridad",
        desc: "Envía notificaciones inmediatas por Webhook (Discord, Telegram, Slack o Email) ante roturas de soporte.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Ingeniero de Sistemas y Monitoreo de Alertas para mesas de tesoreria.
[COPIA AQUI TU IDEA]

Disena e implementa el despachador de alertas de mercado ante eventos criticos:
1. Disparadores soportados: rotura de niveles de stop-loss, caida de VaR por encima del umbral maximo permitido, aparicion de divergencia tecnica o anuncio de resultados.
2. Politica de consolidacion (anti-flooding): evitar enviar mas de 1 alerta cada 15 minutos para el mismo activo agrupando eventos secundarios.
3. Formato enriquecido para Webhooks de Discord y Telegram: uso de embeds con color segun severidad (Rojo = Emergencia, Amarillo = Advertencia, Azul = Info).
4. Canal secundario por correo electronico para resumenes de cierre de mercado mediante plantillas HTML sobrias.
5. Mecanismo de reintento con backoff exponencial si la API del canal de mensajeria devuelve error 429 o 5xx.

Restricciones:
- Ninguna credencial o token de webhook debe estar hardcodeada; utiliza variables de entorno (.env).

Formato de salida: Modulo de Python 'alert_dispatcher.py' con metodos asincronos listos para su integracion en los pipelines de trading.`,
        tags: ["alertas", "webhooks", "telegram", "discord", "automatización"]
      },
      {
        id: "fin-033",
        title: "Almacenamiento y Consulta Ultrarrápida de Series con DuckDB en Local",
        desc: "Configura DuckDB embebido para realizar consultas analíticas SQL sobre millones de velas en milisegundos.",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto de Bases de Datos Cuantitativas optimizando la velocidad de consulta en entornos de escritorio y web.
[COPIA AQUI TU IDEA]

Crea la capa de acceso a datos (DAO) basada en DuckDB embebido para operar en local sin costes de servidor:
1. Configuracion de la base de datos DuckDB con almacenamiento en archivo unico persistente ('horizon_finance.duckdb').
2. Consultas analiticas SQL directas sobre archivos Parquet externos mediante sintaxis 'SELECT * FROM read_parquet(...)'.
3. Calculo de medias moviles y agregaciones temporales (resampling de velas de 1 minuto a 1 hora o diario) utilizando funciones de ventana SQL nativas.
4. Optimizacion de memoria RAM: configuracion de limites de memoria y threads de ejecucion para no saturar portatiles modestos.
5. Soporte para consultas en caliente desde React / Vite utilizando DuckDB-WASM en el navegador sin dependencias de backend.

Restricciones:
- Escribe consultas SQL estrictamente ANSI compatibles optimizadas para ejecucion columnar.

Formato de salida: Codigo en Python con la clase 'DuckDBMarketStore' con metodos para insertar lotes de cotizaciones y ejecutar consultas de analisis de forma ultra eficiente.`,
        tags: ["duckdb", "sql", "parquet", "rendimiento", "local"]
      },
      {
        id: "fin-034",
        title: "Atribución de Rendimiento Factorial de Cartera (Fama-French)",
        desc: "Descompone el retorno de la cartera en factores de Mercado, Tamaño (SMB), Valor (HML) y Momentum (MOM).",
        model: "DeepSeek V4",
        prompt: `Eres un Econometrista Financiero especializado en modelos de valoracion de activos (Asset Pricing Models).
[COPIA AQUI TU IDEA]

Implementa el modulo econometrico para realizar la descomposicion factorial de retornos de una cartera segun el modelo de 3 y 4 factores de Fama-French y Carhart:
1. Regresion lineal multivariante (MCO / OLS): Retorno_Cartera - Rf = Alfa + Beta_Mkt*(Mkt - Rf) + Beta_SMB*(SMB) + Beta_HML*(HML) + Beta_MOM*(MOM) + Epsilon.
2. Interpretacion del Alfa de Jensen: cuantificar si el gestor genera exceso de rentabilidad genuino tras descontar las primas de riesgo de los factores.
3. Analisis de sesgos de estilo: determinar si la cartera esta sistematicamente expuesta a empresas pequenas (Small Caps) o a empresas de valor (Value).
4. Estadisticos de bondad de ajuste: R-cuadrado ajustado, estadistico t de Student y p-valor para cada coeficiente beta con significacion al 95%.
5. Grafico de atribucion porcentual: cuanto del retorno total proviene del mercado general vs seleccion de activos vs exposicion factorial.

Restricciones:
- Documenta con claridad las fuentes de datos para los factores de Fama-French (ej: base de datos publica de Kenneth French).

Formato de salida: Script de Python utilizando 'statsmodels' que devuelva una tabla de regresion formateada y diccionario con la interpretacion analitica de los coeficientes.`,
        tags: ["fama-french", "econometría", "factores", "atribución", "alfa"]
      },
      {
        id: "fin-053",
        title: "Motor de Conciliación de Órdenes y FIX Protocol Parser",
        desc: "Parsea mensajes FIX 4.2 / 4.4 de confirmación de ejecución (ExecutionReport) y concilia contra la base de datos interna.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Infraestructura de Trading y Protocolos Financieros de Baja Latencia.
[COPIA AQUI TU IDEA]

Desarrolla el parser y validador de mensajes de protocolo FIX (Financial Information eXchange) para el subsistema de ejecucion:
1. Parseo de mensajes FIX 4.2 / 4.4 con delimitador SOH (0x01): extraccion de campos obligatorios (MsgType=8 ExecutionReport, ClOrdID, OrderID, ExecType, OrdStatus, CumQty, AvgPx).
2. Verificacion de checksum (Tag 10) y consistencia de longitud de mensaje (Tag 9 BodyLength).
3. Mapeo del estado de la orden contra la maquina de estados interna (New, PartiallyFilled, Filled, Canceled, Rejected).
4. Conciliacion automatizada de operaciones: cruce de la confirmacion de ejecucion frente a la orden interna original con tolerancia cero a discrepancias.
5. Gestion de ejecuciones duplicadas o mensajes fuera de secuencia mediante comprobacion de SeqNum (Tag 34).

Restricciones:
- Optimiza el parser para procesar cadenas de texto crudas sin asignaciones excesivas de memoria en heap.

Formato de salida: Modulo de Python 'fix_parser.py' con tipado estricto y banco de pruebas de mensajes FIX sinteticos.`,
        tags: ["fix-protocol", "trading", "ejecución", "protocolos", "baja-latencia"]
      },
      {
        id: "fin-054",
        title: "Optimización de Carteras Black-Litterman con Vistas Subjetivas",
        desc: "Combina el equilibrio de mercado (CAPM inverso) con estimaciones del inversor para obtener pesos de asignación estables.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor Cuantitativo de Gestion de Activos e Ingenieria de Asignacion de Activos (Asset Allocation).
[COPIA AQUI TU IDEA]

Implementa el modelo de asignacion de activos de Black-Litterman para resolver la inestabilidad de la frontera eficiente de Markowitz:
1. Calculo de los retornos de equilibrio de mercado implicitos (Imputed Equilibrium Returns) mediante la inversion de la ecuacion de Markowitz: Pi = delta * Sigma * w_mercado.
2. Estructuracion de la matriz de vistas del inversor P y vector de retornos absolutos o relativos Q (ej: 'El activo A superara al activo B en un 2% con confianza del 70%').
3. Matriz de covarianza de la incertidumbre de las vistas Omega calculada mediante el metodo de He y Litterman o proporcional a tau * Sigma.
4. Combinacion bayesiana de la distribucion a priori (equilibrio de mercado) y las vistas para derivar el nuevo vector de retornos esperados E[R] y matriz de covarianza posterior Sigma_bl.
5. Optimizacion de pesos finales con restricciones de no apalancamiento (w_i >= 0) y maximo peso por activo (< 20%).

Restricciones:
- Muestra el contraste directo entre los pesos generados por Markowitz clasico (extremos y erráticos) vs Black-Litterman (estables y diversificados).

Formato de salida: Script en Python con la clase 'BlackLittermanOptimizer' utilizando 'scipy.optimize' y reporte de pesos en tabla Markdown.`,
        tags: ["black-litterman", "asset-allocation", "carteras", "markowitz", "bayesiano"]
      },
      {
        id: "fin-055",
        title: "Generador de Informes de Riesgo y Liquidez Formato UCITS KIID",
        desc: "Genera el informe regulatorio estandarizado con el indicador sintético de riesgo SRRI (1 a 7) y desglose de costes.",
        model: "GPT-4o",
        prompt: `Eres un Especialista en Cumplimiento Normativo y Reporting Regulatorio de Fondos de Inversion (UCITS / PRIIPs).
[COPIA AQUI TU IDEA]

Crea el generador automatizado de fichas informativas regulatorias estandarizadas de riesgo formato KIID / KID:
1. Calculo formal del Indicador Sintetico de Riesgo y Remuneracion (SRRI / SRI) en escala de 1 a 7 basado en la volatilidad anualizada a 5 anos.
2. Desglose de costes normalizado segun la metodologia PRIIPs: Costes de entrada/salida, costes corrientes y costes de transaccion de cartera.
3. Simulacion de escenarios de rentabilidad a 1, 3 y 5 anos: Escenario Favorable, Moderado, Desfavorable y de Estres.
4. Composicion de la cartera por tipo de activo, exposicion geografica y concentracion de los 10 principales emisores.
5. Exportacion de ficha formal de 2 paginas en PDF estructurado cumpliendo los requisitos tipograficos y de redaccion legal de la CNMV / ESMA.

Restricciones:
- No utilices abreviaturas no autorizadas por el reglamento de la Directiva UCITS V.

Formato de salida: Pipeline en Python con 'reportlab' para generacion del documento PDF estandarizado y metadatos en JSON.`,
        tags: ["ucits", "kiid", "priips", "compliance", "cnmv", "reporting"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Finanzas & Mercados
 */
export const FINANZAS_PROMPTS = FINANZAS_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "finanzas",
    areaName: "Finanzas & Mercados",
    areaColor: "#3B6FD4",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
