import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Cpu } from "lucide-react";
import { GitBranch } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Shield } from "lucide-react";

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "doc-extraction",
    number: "01",
    title: "ComprensiÃ³n y extracciÃ³n de informaciÃ³n en documentos financieros",
    color: "blue",
    summary:
      "Los informes anuales (10-K), trimestrales (10-Q) y las transcripciones de earnings calls son documentos densos, con tablas anidadas, notas al pie contradictorias y jerga sectorial especÃ­fica. AquÃ­ evaluamos si un modelo puede responder preguntas multi-salto sobre esos documentos.",
    detail:
      "FinQA y ConvFinQA son los benchmarks de referencia para este tipo de razonamiento encadenado sobre texto financiero real: 'Â¿En quÃ© porcentaje cambiÃ³ el margen operativo entre el Q3 de 2022 y el Q3 de 2023, considerando los ajustes de goodwill?' Los benchmarks estÃ¡n diseÃ±ados exactamente para este tipo de pregunta. DeepSeek-R1 lidera con 92.0/100 compuesto, registrando 92.5 en FinQA y 91.4 en ConvFinQA.",
    benchmarks: [
      { name: "FinQA", desc: "Preguntas multi-salto sobre documentos financieros reales con tablas anidadas" },
      { name: "ConvFinQA", desc: "Razonamiento conversacional encadenado sobre informes financieros" },
      { name: "FinBen_QA", desc: "Benchmark de QA financiero amplio con mÃºltiples dominios sectoriales" },
      { name: "BizFinBench_QA", desc: "QA sobre informaciÃ³n financiera empresarial estructurada" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "92.0",
      detail: "92.5 FinQA Â· 91.4 ConvFinQA â€” lÃ­der en razonamiento multi-salto financiero",
    },
    warning: true,
  },
  {
    id: "trading-signals",
    number: "02",
    title: "GeneraciÃ³n de seÃ±ales de mercado y trading algorÃ­tmico",
    color: "indigo",
    summary:
      "MÃ¡s allÃ¡ del anÃ¡lisis de texto, algunos modelos pueden actuar como piezas de un sistema de toma de decisiones: detectar patrones tÃ©cnicos, proponer factores de inversiÃ³n (alpha) y ejecutar lÃ³gica de entrada/salida. La pregunta no es si el modelo 'sabe quÃ© es una media mÃ³vil', sino si puede generar seÃ±ales que se traduzcan en retornos positivos sobre datos de prueba.",
    detail:
      "FinBen_Trading, QuantEval_Trading y AlphaBench miden exactamente eso: la capacidad de generar seÃ±ales accionables, no el conocimiento teÃ³rico. FinRobot Agent Swarm lidera con 85.1/100 compuesto: 85.2 en FinBen_Trading, 84.0 en QuantEval_Trading y 86.3 en AlphaBench. Ninguna seÃ±al de este sistema constituye recomendaciÃ³n de inversiÃ³n.",
    benchmarks: [
      { name: "FinBen_Trading", desc: "GeneraciÃ³n de seÃ±ales de trading sobre datos de mercado real" },
      { name: "QuantEval_Trading", desc: "EvaluaciÃ³n cuantitativa de la calidad de las seÃ±ales generadas" },
      { name: "AlphaBench", desc: "IdentificaciÃ³n de factores de inversiÃ³n (alpha) en datos histÃ³ricos" },
    ],
    topModel: {
      name: "FinRobot Agent Swarm",
      score: "85.1",
      detail: "85.2 FinBen_Trading Â· 84.0 QuantEval_Trading Â· 86.3 AlphaBench",
    },
    warning: true,
  },
  {
    id: "math-reasoning",
    number: "03",
    title: "Razonamiento matemÃ¡tico y cÃ¡lculo financiero",
    color: "blue",
    summary:
      "Valorar una opciÃ³n por Black-Scholes, calcular el VaR de una cartera o estimar el precio de un bono con cupones irregulares son problemas de Ã¡lgebra financiera aplicada. Los errores de precisiÃ³n en decimales tienen consecuencias reales â€” no es razonamiento abstracto.",
    detail:
      "QuantEval_Math, MATH_Finance y GSM8K_Finance cubren esta franja desde la aritmÃ©tica bÃ¡sica hasta el cÃ¡lculo actuarial. DeepSeek-R1 lidera con 94.3/100 compuesto â€” el diferencial de 0.1 puntos con o1-preview en el subconjunto de fisiopatologÃ­a financiera debe confirmarse (ver MÃ³dulo 4, punto 4.2). Para aplicaciones crÃ­ticas como la valoraciÃ³n de derivados, este diferencial puede ser determinante.",
    benchmarks: [
      { name: "QuantEval_Math", desc: "Razonamiento matemÃ¡tico financiero cuantitativo â€” VaR, Black-Scholes, duraciÃ³n" },
      { name: "MATH_Finance", desc: "Problemas matemÃ¡ticos financieros de dificultad gradual" },
      { name: "GSM8K_Finance", desc: "AritmÃ©tica financiera aplicada desde bÃ¡sico hasta cÃ¡lculo actuarial" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "94.3",
      detail: "Diferencial de 0.1 con o1-preview en subconjunto â€” ver punto 4.2",
    },
    warning: true,
  },
  {
    id: "code-generation",
    number: "04",
    title: "GeneraciÃ³n y depuraciÃ³n de cÃ³digo Python financiero",
    color: "indigo",
    summary:
      "Construir pipelines con pandas, numpy, scipy o backtesting.py es una tarea que cualquier analista quant hace a diario. La pregunta del laboratorio es: Â¿quÃ© modelo produce cÃ³digo que funciona de verdad, no solo cÃ³digo que tiene buena pinta?",
    detail:
      "QuantEval_Code, LiveCodeBench_Finance y HumanEval_FinData miden la tasa de cÃ³digo ejecutable sin errores, no solo la coherencia sintÃ¡ctica. Claude 3.5 Sonnet lidera con 91.3/100 compuesto (92.0 QuantEval_Code, 88.7 LiveCodeBench_Finance, 93.4 HumanEval_FinData), con DeepSeek-R1 en segunda posiciÃ³n con 91.0/100 a solo 0.3 puntos. Para OrÃ¡culo BursÃ¡til, se usa Claude 3.5 Sonnet como generador principal.",
    benchmarks: [
      { name: "QuantEval_Code", desc: "GeneraciÃ³n de cÃ³digo Python financiero ejecutable sin errores" },
      { name: "LiveCodeBench_Finance", desc: "CÃ³digo financiero evaluado en entornos de ejecuciÃ³n real" },
      { name: "HumanEval_FinData", desc: "EvaluaciÃ³n humana de cÃ³digo para manipulaciÃ³n de datos financieros" },
    ],
    topModel: {
      name: "Claude 3.5 Sonnet",
      score: "91.3",
      detail: "92.0 QuantEval_Code Â· 88.7 LiveCodeBench_Finance Â· 93.4 HumanEval_FinData",
    },
    warning: true,
  },
  {
    id: "agent-reliability",
    number: "05",
    title: "Fiabilidad, autonomÃ­a y tolerancia a fallos en agentes",
    color: "blue",
    summary:
      "Un agente financiero que falla silenciosamente en el paso 7 de un flujo de 12 pasos no es Ãºtil: es peligroso. AquÃ­ estudiamos arquitecturas multi-agente y su robustez ante inyecciones de error deliberadas.",
    detail:
      "CM-LRS, AFIB y AgentBench_Finance miden cuÃ¡ntos pasos completa un agente antes de colapsar y cÃ³mo se recupera. FinRobot Agent Swarm tiene 2 evaluaciones registradas (CM-LRS, AgentBench_Finance) pero carece de dato en AFIB (ver MÃ³dulo 4, punto 4.1). La fiabilidad de agentes es crÃ­tica para Argos Monitor: un sistema de vigilancia que falla silenciosamente propaga rankings obsoletos sin alertar.",
    benchmarks: [
      { name: "CM-LRS", desc: "Pasos completados sin colapso en flujos multi-etapa crÃ­ticos" },
      { name: "AFIB", desc: "Robustez ante inyecciones de error deliberadas en agentes financieros" },
      { name: "AgentBench_Finance", desc: "Benchmark general de agentes en tareas financieras complejas" },
    ],
    topModel: {
      name: "FinRobot Agent Swarm",
      score: "85.1",
      detail: "Dato AFIB pendiente de verificar â€” ver punto 4.1 en MÃ³dulo 4",
    },
    warning: true,
  },
  {
    id: "traceability",
    number: "06",
    title: "Trazabilidad regulatoria y control de alucinaciones",
    color: "indigo",
    summary:
      "En finanzas, una alucinaciÃ³n no es un fallo gracioso: puede ser el fundamento de una decisiÃ³n de inversiÃ³n errÃ³nea o una infracciÃ³n normativa. Esta lÃ­nea mide la tasa a la que un modelo inventa cifras, citas normativas o hechos que no existen en el documento fuente.",
    detail:
      "RegAudit_Bench, Hallucination_FinBench y FinFact miden directamente el control de alucinaciones en contexto financiero. DeepSeek-R1 y Claude 3.5 Sonnet empatan a 93.3/100 en esta Ã¡rea â€” el orden de desempate entre ambos no estÃ¡ documentado (ver MÃ³dulo 4, punto 4.2). Para cualquier aplicaciÃ³n regulatoria, esta ambigÃ¼edad debe resolverse antes de elegir modelo.",
    benchmarks: [
      { name: "RegAudit_Bench", desc: "Trazabilidad en auditorÃ­a regulatoria â€” citas normativas verificadas" },
      { name: "Hallucination_FinBench", desc: "Tasa de alucinaciÃ³n en cifras financieras y datos de mercado" },
      { name: "FinFact", desc: "VerificaciÃ³n factual de afirmaciones financieras contra fuentes documentadas" },
    ],
    topModel: {
      name: "DeepSeek-R1 / Claude 3.5 Sonnet",
      score: "93.3",
      detail: "Empate tÃ©cnico â€” regla de desempate pendiente de documentar (ver punto 4.2)",
    },
    warning: true,
  },
];

const PROJECTS = [
  {
    id: "argos",
    name: "ARGOS",
    tagline: "Motor de investigaciÃ³n financiera con trazabilidad epistemolÃ³gica completa",
    desc: "ARGOS es el motor de investigaciÃ³n del laboratorio: un sistema de descarga, anÃ¡lisis y auditorÃ­a de datos financieros donde cada dato lleva etiquetado su origen epistemolÃ³gico â€” si es un precio declarado, una cifra calculada, una inferencia de modelo o un escenario hipotÃ©tico simulado. El objetivo no es automatizar decisiones de inversiÃ³n, sino garantizar que el investigador nunca confunda la fuente de un dato con su fiabilidad.",
    color: "blue",
    financeDisclaimer: true,
    researchLines: ["01", "06"],
    stack: [
      { role: "Descarga y estructuraciÃ³n de datos fundamentales (10-K, 10-Q, earnings calls)", tech: "SEC EDGAR API Â· Yahoo Finance API Â· Alpha Vantage Â· [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]" },
      { role: "Descarga de precios OHLCV con trazabilidad de fuente y timestamp", tech: "Yahoo Finance Â· Alpha Vantage Â· Twelve Data â€” [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]" },
      { role: "Motor de anÃ¡lisis financiero: ratios, medias mÃ³viles, volatilidad histÃ³rica", tech: "Python Â· pandas Â· numpy Â· scipy â€” cÃ¡lculos etiquetados como [DATO CALCULADO]" },
      { role: "SeparaciÃ³n epistemolÃ³gica en todos los outputs", tech: "[DATO OBSERVADO] Â· [DATO CALCULADO] Â· [INFERENCIA IA] Â· [ESCENARIO HIPOTÃ‰TICO]" },
      { role: "Backstage de estrategias: diseÃ±o, simulaciÃ³n y versionado", tech: "Python Â· backtesting.py â€” seÃ±ales clasificadas como [ESCENARIO HIPOTÃ‰TICO]" },
      { role: "GeneraciÃ³n de informes auditables con trazabilidad completa", tech: "Markdown Â· HTML Â· PDF â€” fuente verificada por afirmaciÃ³n" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "ExtracciÃ³n de informaciÃ³n de documentos financieros densos (10-K, earnings calls)", score: "92.0", area: "QA Financiero Complejo (92.5 FinQA Â· 91.4 ConvFinQA)" },
      { model: "DeepSeek-R1 / Claude 3.5 Sonnet", role: "Trazabilidad regulatoria y control de alucinaciones en informes", score: "93.3", area: "Empate tÃ©cnico â€” desempate pendiente de documentar (ver punto 4.2)" },
    ],
    flow: [
      "Zona C â€” Descarga de fundamentales: el investigador selecciona empresa/sector/perÃ­odo; ARGOS descarga datos de SEC EDGAR o Yahoo Finance y etiqueta cada campo como [DATO OBSERVADO] con fuente, fecha y moneda",
      "Zona D â€” Descarga de precios OHLCV: precios de apertura, mÃ¡ximo, mÃ­nimo, cierre y volumen con timestamp de mercado; clasificados como [DATO OBSERVADO]; medias mÃ³viles derivadas etiquetadas como [DATO CALCULADO]",
      "Zona E â€” AnÃ¡lisis financiero: tablas de ratios, grÃ¡ficos de precio, indicadores tÃ©cnicos; cada output incluye metaetiqueta de tipo de dato, fuente y mÃ©todo de cÃ¡lculo",
      "Zona G â€” Backstage de estrategias: el investigador define reglas de entrada/salida en lenguaje natural; ARGOS genera cÃ³digo backtesting.py y clasifica todas las seÃ±ales simuladas como [ESCENARIO HIPOTÃ‰TICO]",
      "Zona H â€” GeneraciÃ³n de informes: informe auditable con trazabilidad completa por afirmaciÃ³n, exportable en MD/HTML/PDF/CSV/JSON; cada cifra lleva etiqueta epistemolÃ³gica y referencia de fuente",
      "Aviso permanente: ninguna salida del sistema constituye recomendaciÃ³n de inversiÃ³n ni seÃ±al de trading con validez financiera",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado argos_core.py con las siguientes funciones:
1. download_fundamentals(ticker: str, period: str, source: str) -> pd.DataFrame:
   descarga datos fundamentales (revenue, operating_income, net_income, eps, debt_equity)
   de la fuente indicada (SEC EDGAR, Yahoo Finance o Alpha Vantage) para el ticker y
   perÃ­odo especificados. Cada fila del DataFrame debe incluir campos adicionales:
   data_type ("OBSERVED"), source (str), as_of_date (str), currency (str).

2. download_ohlcv(ticker: str, start: str, end: str, source: str) -> pd.DataFrame:
   descarga precios OHLCV. Columnas: date, open, high, low, close, volume,
   data_type ("OBSERVED"), source, currency. AÃ±ade columnas SMA_20, SMA_50, EMA_12,
   EMA_26 calculadas a partir del cierre, con campo data_type_derived ("CALCULATED").

3. compute_ratios(fundamentals: pd.DataFrame, prices: pd.DataFrame) -> pd.DataFrame:
   calcula ratios financieros (P/E, P/B, ROE, ROA, current_ratio, debt_equity_ratio)
   con columna data_type ("CALCULATED"), formula (str) y input_sources (list[str]).

4. export_report(data: dict, format: str, output_path: str) -> None:
   exporta los datos a MD, HTML, CSV o JSON. Cada secciÃ³n del informe debe incluir
   un bloque de metadatos con: fuente, tipo de dato, fecha de extracciÃ³n y mÃ©todo.

Usa solo pandas, numpy, requests y la librerÃ­a estÃ¡ndar. Sin dependencias adicionales.`,
    promptLLM: `Eres el motor de anÃ¡lisis del sistema ARGOS en el Laboratorio de Finanzas de Horizon.
Se te proporciona un fragmento de texto de un informe financiero (10-K, 10-Q o
transcripciÃ³n de earnings call) y tu tarea es extraer informaciÃ³n estructurada.

Reglas obligatorias:
1. Extrae Ãºnicamente hechos explÃ­citamente declarados en el texto. No inferas cifras
   que no estÃ©n escritas. Si una cifra es ambigua (ajustada vs. no ajustada, GAAP vs.
   non-GAAP), marca la ambigÃ¼edad en el campo note.
2. Clasifica cada dato extraÃ­do segÃºn su tipo epistemolÃ³gico:
   - "OBSERVED": cifra declarada en el documento tal como aparece
   - "CALCULATED": cifra que requiere operaciÃ³n aritmÃ©tica sobre datos del documento
   - "INFERRED": interpretaciÃ³n del tono o contexto que no estÃ¡ cifrada explÃ­citamente
3. Para cada dato, incluye: value (str), data_type (str), source_quote (str, mÃ¡x. 100 chars),
   confidence (float 0â€“1), note (str | null).

Responde exclusivamente en JSON con esquema:
{
  "facts": [{"field": str, "value": str, "data_type": str, "source_quote": str,
             "confidence": float, "note": str | null}],
  "warnings": [str]
}

No inventes datos. Si el texto no contiene informaciÃ³n financiera cuantificable,
devuelve facts: [] y un warning explicando por quÃ©.`,
  },
  {
    id: "kairos",
    name: "KairÃ³s Sentimiento",
    tagline: "DetecciÃ³n de ventanas de asimetrÃ­a informativa en mercados â€” seÃ±al antes que precio",
    desc: "KairÃ³s Sentimiento cruza tres tipos de seÃ±ales: noticias financieras de fuentes estructuradas, transcripciones de earnings calls y datos de precio/volumen. El objetivo no es predecir el precio, sino estimar el sentimiento agregado de un activo o sector y convertirlo en un indicador de riesgo accionable. La hipÃ³tesis es que el lenguaje de los directivos en una earnings call contiene seÃ±al antes de que los estados financieros la hagan explÃ­cita.",
    color: "indigo",
    financeDisclaimer: true,
    researchLines: ["01", "02"],
    stack: [
      { role: "ExtracciÃ³n de texto de fuentes financieras estructuradas y earnings calls", tech: "Python Â· scrapers RSS/API + parsers PDF/HTML â€” fuentes verificadas individualmente" },
      { role: "AnÃ¡lisis semÃ¡ntico profundo y extracciÃ³n de seÃ±ales de sentimiento", tech: "DeepSeek-R1 â€” lÃ­der en QA financiero complejo (92.0/100, Fuente: STATER Leaderboard)" },
      { role: "ConversiÃ³n de sentimiento en seÃ±al direccional de mercado", tech: "FinRobot Agent Swarm â€” lÃ­der en generaciÃ³n de seÃ±ales de trading (85.1/100)" },
      { role: "Almacenamiento de series temporales de sentimiento", tech: "DuckDB â€” historial de sentimiento por activo/sector con timestamps" },
    ],
    whyModels: [
      { model: "DeepSeek-R1", role: "AnÃ¡lisis semÃ¡ntico multi-salto sobre texto financiero denso", score: "92.0", area: "QA Financiero Complejo (92.5 FinQA Â· 91.4 ConvFinQA)" },
      { model: "FinRobot Agent Swarm", role: "GeneraciÃ³n de seÃ±al direccional desde puntuaciÃ³n de sentimiento", score: "85.1", area: "Trading Cuantitativo (85.2 FinBen_Trading Â· 86.3 AlphaBench)" },
    ],
    flow: [
      "Fuentes de entrada: noticias (RSS/API), transcripciones de earnings calls (PDF/transcript), precios histÃ³ricos (API de mercado)",
      "ExtracciÃ³n y limpieza de texto: fragmentos de â‰¤2.000 tokens por documento con identificador de speaker (CEO, CFO, Analyst) cuando estÃ¡ disponible",
      "AnÃ¡lisis semÃ¡ntico multi-salto (DeepSeek-R1): hechos nuevos revelados, evasiÃ³n de preguntas, variaciÃ³n de vocabulario respecto al perÃ­odo anterior, tonalidad implÃ­cita vs. explÃ­cita",
      "PuntuaciÃ³n de sentimiento por activo en escala [-1.0, +1.0] con nivel de confianza [0.0, 1.0] â€” clasificada como [INFERENCIA IA]",
      "AgregaciÃ³n sectorial: indicador de riesgo sistÃ©mico compuesto por sector",
      "SeÃ±al direccional (FinRobot Agent Swarm): long / short / neutral con magnitud â€” clasificada como [ESCENARIO HIPOTÃ‰TICO]",
      "Almacenamiento en serie temporal (DuckDB) y emisiÃ³n de alerta si se supera umbral configurado",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado kairos_sentiment.py con las siguientes clases y funciones:
1. Clase EarningsCallParser: mÃ©todo parse(filepath: str) -> list[str] que extrae
   fragmentos de texto de una transcripciÃ³n de earnings call (PDF o TXT), divididos
   en chunks de mÃ¡ximo 1500 tokens, conservando el identificador del speaker
   (CEO, CFO, Analyst) si estÃ¡ disponible.
2. FunciÃ³n extract_sentiment_signals(chunks: list[str], model_client) -> dict:
   llama al LLM con cada chunk y devuelve un dict
   {chunk_id, sentiment_score (float -1 a 1), confidence (float 0 a 1), key_phrases (list[str])}.
3. FunciÃ³n aggregate_sentiment(signals: list[dict], asset_id: str) -> dict:
   agrega las seÃ±ales en un indicador compuesto por asset_id con media ponderada
   por confianza.
4. FunciÃ³n persist_to_duckdb(aggregated: dict, db_path: str) -> None:
   escribe el resultado en una tabla sentiment_history con columnas
   [asset_id, timestamp, sentiment_score, confidence, source_type].
Usa solo pandas, duckdb, PyMuPDF (fitz) y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres un analista de sentimiento especializado en documentos financieros para el
Laboratorio KairÃ³s de Horizon.
Se te proporciona un fragmento de texto de una transcripciÃ³n de earnings call o
noticia financiera. Tu tarea tiene tres partes:

1. Extrae los hechos financieros clave mencionados explÃ­citamente
   (cifras, variaciones, productos, mercados).
2. Identifica el tono implÃ­cito: Â¿hay evasiÃ³n de preguntas? Â¿cambio de vocabulario
   respecto a perÃ­odos anteriores? Â¿uso de eufemismos? DescrÃ­belo en una frase.
3. Asigna una puntuaciÃ³n de sentimiento entre -1.0 (muy negativo) y +1.0 (muy positivo)
   con un nivel de confianza entre 0.0 y 1.0. Justifica ambos valores con exactamente
   una frase por valor.

Responde exclusivamente en JSON con el siguiente esquema:
{
  "facts": [str],
  "implicit_tone": str,
  "sentiment_score": float,
  "confidence": float,
  "sentiment_rationale": str,
  "confidence_rationale": str
}

No inventes hechos que no estÃ©n en el texto. Si el fragmento no contiene informaciÃ³n
financiera relevante, devuelve sentiment_score: 0.0 y confidence: 0.1.`,
  },
  {
    id: "oraculo",
    name: "OrÃ¡culo BursÃ¡til",
    tagline: "Banco de pruebas de estrategias: de lenguaje natural a backtest auditado",
    desc: "OrÃ¡culo BursÃ¡til permite que un investigador defina una estrategia en lenguaje natural, la traduzca automÃ¡ticamente a cÃ³digo ejecutable con backtesting.py, la corra sobre datos histÃ³ricos y reciba un informe de resultados: retorno total, mÃ¡ximo drawdown, Sharpe ratio, nÃºmero de operaciones y distribuciÃ³n de ganancias/pÃ©rdidas. La hipÃ³tesis es que la generaciÃ³n de cÃ³digo financiero de alta precisiÃ³n es el cuello de botella principal â€” si el cÃ³digo tiene un bug sutil, el backtest miente.",
    color: "blue",
    financeDisclaimer: true,
    researchLines: ["03", "04"],
    stack: [
      { role: "Interfaz de entrada: descripciÃ³n en lenguaje natural + editor de reglas estructurado", tech: "Formulario con parser NLP â€” salida como dict estructurado de estrategia" },
      { role: "Generador de cÃ³digo Python financiero ejecutable", tech: "Claude 3.5 Sonnet â€” lÃ­der en generaciÃ³n de cÃ³digo financiero (91.3/100, 92.0 QuantEval_Code)" },
      { role: "Verificador matemÃ¡tico de fÃ³rmulas de indicadores tÃ©cnicos", tech: "DeepSeek-R1 â€” lÃ­der en razonamiento matemÃ¡tico financiero (94.3/100)" },
      { role: "Motor de backtesting sobre datos histÃ³ricos reales", tech: "backtesting.py Â· yfinance â€” datos clasificados como [DATO OBSERVADO]" },
      { role: "Entorno de ejecuciÃ³n seguro con timeout y lÃ­mite de recursos", tech: "subprocess aislado â€” sandbox Python con captura de stdout/stderr" },
    ],
    whyModels: [
      { model: "Claude 3.5 Sonnet", role: "Generador principal de cÃ³digo backtesting.py", score: "91.3", area: "CÃ³digo Python Financiero (92.0 QuantEval_Code Â· 93.4 HumanEval_FinData)" },
      { model: "DeepSeek-R1", role: "Verificador matemÃ¡tico de fÃ³rmulas (RSI, Black-Scholes, VaR)", score: "94.3", area: "Razonamiento MatemÃ¡tico Financiero â€” ver diferencial 0.1 pts con o1-preview" },
    ],
    flow: [
      "Entrada: descripciÃ³n en lenguaje natural de la estrategia ('compra cuando RSI < 30, vende cuando RSI > 70, stop-loss 5%')",
      "ExtracciÃ³n de parÃ¡metros estructurados (Claude 3.5 Sonnet): indicadores tÃ©cnicos con fÃ³rmulas y parÃ¡metros, reglas de entrada/salida/stop-loss/take-profit, universo de activos y perÃ­odo temporal",
      "VerificaciÃ³n matemÃ¡tica de fÃ³rmulas (DeepSeek-R1): Â¿el RSI estÃ¡ calculado correctamente? Â¿el lookback es el correcto? Â¿el stop-loss estÃ¡ en porcentaje o puntos absolutos?",
      "GeneraciÃ³n de cÃ³digo backtesting.py (Claude 3.5 Sonnet): cÃ³digo ejecutable con manejo de NaN, sin desfases temporales, conforme a Python 3.10+",
      "EjecuciÃ³n en sandbox: retorno total, mÃ¡ximo drawdown, Sharpe ratio, nÃºmero de operaciones â€” clasificados como [ESCENARIO HIPOTÃ‰TICO]",
      "SÃ­ntesis del informe en lenguaje natural + cÃ³digo fuente descargable + aviso: estos resultados son histÃ³ricos y no garantizan rendimientos futuros",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado oraculo_bursatil.py con las siguientes funciones:
1. parse_strategy(description: str, llm_client) -> dict: llama al LLM con la descripciÃ³n
   en lenguaje natural y devuelve un dict estructurado con campos:
   {indicators: list[{name, params}], entry_rules: str, exit_rules: str,
   stop_loss_pct: float | None, take_profit_pct: float | None,
   assets: list[str], start_date: str, end_date: str}.
2. generate_backtest_code(strategy: dict, llm_client) -> str: genera cÃ³digo Python
   completo y ejecutable usando backtesting.py a partir del dict de estrategia.
   El cÃ³digo debe incluir la descarga de datos con yfinance, la clase Strategy
   y la llamada a Backtest.run().
3. run_backtest_safe(code: str, timeout_seconds: int = 60) -> dict: ejecuta el cÃ³digo
   en un subprocess aislado con timeout y captura stdout/stderr.
   Devuelve {success: bool, results: dict | None, error: str | None}.
4. format_report(results: dict, strategy: dict) -> str: genera un informe en Markdown
   con retorno total, mÃ¡ximo drawdown, Sharpe ratio, nÃºmero de operaciones y las
   5 mejores y 5 peores operaciones.
Usa solo backtesting, yfinance, pandas, subprocess y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el ingeniero de backtesting del OrÃ¡culo BursÃ¡til en el Laboratorio de Finanzas
de Horizon.
Se te proporciona un dict Python con la estrategia de inversiÃ³n ya parseada:
indicadores tÃ©cnicos con sus parÃ¡metros, reglas de entrada y salida, stop-loss y
take-profit opcionales, lista de activos y rango de fechas.

Genera cÃ³digo Python completo y ejecutable que:
1. Descargue los datos OHLCV con yfinance para los activos y el perÃ­odo indicado.
2. Implemente la clase Strategy usando la API de backtesting.py
   (backtrader NO, solo backtesting.py).
3. Calcule los indicadores tÃ©cnicos usando pandas_ta o cÃ¡lculo manual si es mÃ¡s claro.
4. Implemente las seÃ±ales de entrada y salida exactamente como se describen en el dict.
5. Aplique el stop-loss y take-profit si estÃ¡n definidos.
6. Ejecute Backtest.run() e imprima los resultados en JSON con las claves:
   return_pct, max_drawdown_pct, sharpe_ratio, num_trades, win_rate.

Requisitos crÃ­ticos:
- Sin desfases temporales (no usar el cierre del dÃ­a actual para decisiones del mismo dÃ­a).
- Manejo explÃ­cito de NaN en los indicadores al inicio de la serie.
- El cÃ³digo debe ejecutarse sin errores con Python 3.10+.
- Incluye un bloque if __name__ == "__main__": al final.`,
  },
];

const MARKET_APPS = [
  {
    name: "Bloomberg Terminal + Bloomberg AI",
    desc: "Terminal financiero institucional de referencia. Integra anÃ¡lisis de texto, bÃºsqueda semÃ¡ntica y resÃºmenes automÃ¡ticos de noticias y filings. Bloomberg publicÃ³ su modelo especializado BloombergGPT en 2023.",
    tag: "Institucional",
    url: "https://www.bloomberg.com/professional/",
  },
  {
    name: "FactSet + FactSet Mercury",
    desc: "Plataforma de datos financieros institucionales con asistente de lenguaje natural (Mercury) para consultas sobre mercado, fundamentales y estimaciones de consenso.",
    tag: "Datos financieros",
    url: "https://www.factset.com",
  },
  {
    name: "Kensho (S&P Global)",
    desc: "Plataforma de anÃ¡lisis y NLP financiero adquirida por S&P Global. Incluye herramientas de extracciÃ³n de informaciÃ³n de documentos regulatorios (10-K, earnings calls) y anÃ¡lisis de eventos de mercado.",
    tag: "AnÃ¡lisis regulatorio",
    url: "https://www.kensho.com",
  },
  {
    name: "Alpaca Markets",
    desc: "BrÃ³ker orientado a desarrolladores con API de trading algorÃ­tmico y herramientas de backtesting. Permite integraciÃ³n con modelos externos para generaciÃ³n de seÃ±ales.",
    tag: "Trading algorÃ­tmico",
    url: "https://alpaca.markets",
  },
  {
    name: "Morningstar Intelligence Engine",
    desc: "Herramienta de anÃ¡lisis cuantitativo y lenguaje natural de Morningstar para consultas sobre fondos, acciones y carteras, integrada en sus plataformas de research institucional.",
    tag: "Research institucional",
    url: "https://www.morningstar.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "Preguntas y Respuestas Financieras: DeepSeek-R1 tiene 2 benchmarks evaluados (FinQA, ConvFinQA), mientras que Claude 3.5 Sonnet y GPT-4o tienen 4 (FinBen_QA, BizFinBench_QA, FinQA, ConvFinQA). Falta confirmar la evaluaciÃ³n de DeepSeek-R1 en FinBen_QA y BizFinBench_QA â€” Fuente: STATER Leaderboard, latest_rankings.md.",
      "GeneraciÃ³n de CÃ³digo Python Financiero: DeepSeek-R1 tiene 2 evaluaciones registradas (QuantEval_Code, HumanEval_FinData), sin dato para LiveCodeBench_Finance â€” Fuente: STATER Leaderboard, latest_rankings.md.",
      "Fiabilidad de Agentes: FinRobot Agent Swarm tiene 2 evaluaciones (CM-LRS, AgentBench_Finance) pero carece de dato en AFIB â€” Fuente: STATER Leaderboard, latest_rankings.md.",
      "Trazabilidad y Cumplimiento: DeepSeek-R1 tiene 2 evaluaciones (Hallucination_FinBench, FinFact) pero carece de dato en RegAudit_Bench â€” Fuente: STATER Leaderboard, latest_rankings.md.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Empate en Trazabilidad y regla de desempate no documentada",
    items: [
      "DeepSeek-R1 y Claude 3.5 Sonnet presentan una puntuaciÃ³n compuesta idÃ©ntica de 93.3/100 en el Ã¡rea de Trazabilidad, Cumplimiento Normativo y Auditabilidad â€” Fuente: STATER Leaderboard, latest_rankings.md.",
      "El ranking asigna Top 1 a DeepSeek-R1 y Top 2 a Claude 3.5 Sonnet sin documentar la regla de desempate (ponderaciÃ³n interna, fecha de evaluaciÃ³n, orden de registro).",
      "Pendiente de aclaraciÃ³n antes de recomendar pÃºblicamente uno sobre otro en aplicaciones regulatorias.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Diferencial de 0.1 puntos en Razonamiento MatemÃ¡tico",
    items: [
      "Entre el Top 1 (DeepSeek-R1 con 94.3/100) y el Top 2 (o1-preview con 94.2/100) la diferencia es de 0.1 puntos en el Ã¡rea de Razonamiento MatemÃ¡tico Financiero â€” Fuente: STATER Leaderboard, latest_rankings.md.",
      "Para aplicaciones de cÃ¡lculo crÃ­tico (valoraciÃ³n de derivados, Black-Scholes, VaR), este diferencial mÃ­nimo puede ser relevante en contextos de alta precisiÃ³n.",
      "Se recomienda verificar con benchmarks especÃ­ficos del caso de uso antes de tomar decisiones de stack basadas Ãºnicamente en la puntuaciÃ³n compuesta.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Costes operativos y latencia",
    items: [
      "El coste por millÃ³n de tokens (entrada/salida) y la latencia media de inferencia por peticiÃ³n para DeepSeek-R1, Claude 3.5 Sonnet, GPT-4o y FinRobot Agent Swarm no constan en el archivo de rankings y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Estos valores son crÃ­ticos para estimar el coste operativo de KairÃ³s Sentimiento (que procesa grandes volÃºmenes de texto) y de OrÃ¡culo BursÃ¡til (que necesita baja latencia en la generaciÃ³n de cÃ³digo).",
      "Verificar en los portales de cada proveedor antes de estimar costes de producciÃ³n.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Aplicaciones de mercado (MÃ³dulo 3)",
    items: [
      "Los datos de caracterÃ­sticas, precios y disponibilidad de Bloomberg AI, FactSet Mercury, Kensho, Alpaca Markets y Morningstar Intelligence Engine deben verificarse en sus webs oficiales antes de citarlos en materiales externos.",
      "Las funcionalidades evolucionan con frecuencia y los datos aquÃ­ recogidos son aproximaciones verificadas en la fecha de redacciÃ³n.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES = {
  blue: {
    accent: "text-[#3B6FD4]",
    border: "border-[#3B6FD4]/20",
    bg: "bg-[#3B6FD4]/5",
    dot: "bg-[#3B6FD4]",
    badge: "border-[#3B6FD4]/30 text-[#3B6FD4]",
    tabBorder: "border-[#3B6FD4]",
    score: "text-[#3B6FD4]",
  },
  indigo: {
    accent: "text-indigo-400",
    border: "border-indigo-400/20",
    bg: "bg-indigo-400/5",
    dot: "bg-indigo-400",
    badge: "border-indigo-400/30 text-indigo-400",
    tabBorder: "border-indigo-400",
    score: "text-indigo-400",
  },
};

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ResearchLineCard({ line }) {
  const [open, setOpen] = useState(false);
  const c = STYLES[line.color];
  return (
    <div className={`border ${c.border} ${c.bg} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 sm:px-6 py-5 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className={`text-xs font-mono ${c.accent} shrink-0 mt-0.5 opacity-60`}>{line.number}</span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm font-medium text-white leading-snug">{line.title}</h3>
              {line.warning && (
                <span className="text-xs border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertTriangle size={9} />
                  Datos parciales
                </span>
              )}
            </div>
            <p className="text-xs text-white/45 leading-relaxed">{line.summary}</p>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-white/30 shrink-0 transition-transform duration-200 mt-1 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-white/5 px-5 sm:px-6 py-5 space-y-5">
          <p className="text-sm text-white/55 leading-relaxed">{line.detail}</p>
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2.5">Benchmarks clave</p>
            <div className="space-y-2">
              {line.benchmarks.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                  <div>
                    <span className="text-xs font-mono text-white/60">{b.name}</span>
                    <p className="text-xs text-white/35 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`border ${c.border} ${c.bg} rounded-xl p-4 flex items-start justify-between gap-4`}>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· STATER Finance Leaderboard</p>
              <p className={`text-sm font-medium ${c.accent}`}>{line.topModel.name}</p>
              <p className="text-xs text-white/40 mt-1">{line.topModel.detail}</p>
            </div>
            <div className={`text-2xl font-display ${c.score} shrink-0`}>{line.topModel.score}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowStep({ step, index, total }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full bg-[#3B6FD4]/20 border border-[#3B6FD4]/30 flex items-center justify-center">
          <span className="text-[10px] text-[#3B6FD4] font-bold">{index + 1}</span>
        </div>
        {index < total - 1 && <div className="w-px h-4 bg-white/10 mt-1" />}
      </div>
      <p className="text-sm text-white/60 pb-4 leading-relaxed">{step}</p>
    </div>
  );
}

function PromptBlock({ label, content }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-white/40" />
          <span className="text-xs text-white/50 font-mono">{label}</span>
        </div>
        <button onClick={copy} className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/10">
          {copied ? "âœ“ Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="text-xs text-white/70 p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono bg-black/20">
        {content}
      </pre>
    </div>
  );
}

function ProjectCard({ project }) {
  const [tab, setTab] = useState("stack");
  const c = STYLES[project.color];
  const tabs = [
    { id: "stack", label: "Stack & Modelos" },
    { id: "flow", label: "Flujo de datos" },
    { id: "prompts", label: "Prompts maestros" },
  ];
  return (
    <div className={`border ${c.border} ${c.bg} rounded-2xl overflow-hidden`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${c.dot} mt-2 shrink-0`} />
          <div>
            <h3 className={`font-display text-2xl sm:text-3xl ${c.accent}`}>{project.name}</h3>
            <p className="text-white/40 text-sm mt-0.5">{project.tagline}</p>
          </div>
        </div>
        <p className="text-white/65 text-sm leading-relaxed mb-4">{project.desc}</p>

        {project.financeDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3">
            <Shield size={13} className="text-yellow-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/60 leading-relaxed">
              <strong className="text-yellow-300/80">Aviso de dominio:</strong> este proyecto es de apoyo a la investigaciÃ³n y anÃ¡lisis. Ninguna salida del sistema â€” seÃ±al, puntuaciÃ³n o informe â€” constituye recomendaciÃ³n de inversiÃ³n, asesoramiento financiero ni seÃ±al de trading con validez financiera.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs text-white/30">LÃ­neas de investigaciÃ³n:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} Â· {line?.title.split(" ").slice(0, 3).join(" ")}â€¦
              </span>
            );
          })}
        </div>
      </div>
      <div className="border-t border-white/5 flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 text-xs py-3 px-2 transition-all ${
              tab === t.id
                ? `${c.accent} border-b-2 ${c.tabBorder} bg-white/5`
                : "text-white/30 hover:text-white/60 border-b-2 border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-6 sm:p-8">
        {tab === "stack" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Componentes tÃ©cnicos</p>
              <div className="space-y-2">
                {project.stack.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">{s.role}</p>
                      <p className="text-sm text-white/80 font-mono">{s.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· STATER Finance Leaderboard</p>
              <div className="space-y-2">
                {project.whyModels.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white font-medium">{m.model}</p>
                      <p className="text-xs text-white/40 mt-0.5">{m.role}</p>
                      <p className="text-xs text-white/30 mt-1">{m.area}</p>
                    </div>
                    <div className={`text-lg font-display ${c.accent} shrink-0`}>{m.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "flow" && (
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Pipeline completo</p>
            {project.flow.map((step, i) => (
              <FlowStep key={i} step={step} index={i} total={project.flow.length} />
            ))}
          </div>
        )}
        {tab === "prompts" && (
          <div className="space-y-4">
            <PromptBlock label="prompt_ide.txt â€” Para Cursor / VS Code + Copilot" content={project.promptIDE} />
            <PromptBlock label="prompt_llm.txt â€” Para el modelo LLM asistente" content={project.promptLLM} />
          </div>
        )}
      </div>
    </div>
  );
}

function VerificationItem({ point }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-yellow-400/20 bg-yellow-400/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-yellow-400/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle size={14} className="text-yellow-400 shrink-0" />
          <span className="text-sm text-white/80">{point.title}</span>
        </div>
        <ChevronDown size={14} className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-yellow-400/10 pt-4 space-y-2">
          {point.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <ChevronRight size={12} className="text-yellow-400/50 mt-0.5 shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function FinanzasLab() {
  return (
    <div className="min-h-full bg-[#111111]">
      {/* Back nav */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
          <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft size={14} />
            Todos los laboratorios
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,111,212,0.09) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 flex items-center justify-center shrink-0">
              <TrendingUp size={28} className="text-[#3B6FD4]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-[#3B6FD4]/30 bg-[#3B6FD4]/10 text-[#3B6FD4] px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Finance Leaderboard Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-[#3B6FD4]">Finanzas</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                En finanzas, la diferencia entre dato observado, cÃ¡lculo derivado, inferencia de modelo y escenario hipotÃ©tico no es semÃ¡ntica: es la diferencia entre investigaciÃ³n rigurosa y ruido con apariencia de seÃ±al.
              </p>

              {/* Aviso de dominio prominente */}
              <div className="mt-5 flex items-start gap-2.5 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3 max-w-2xl">
                <Shield size={14} className="text-yellow-400/70 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/60 leading-relaxed">
                  <strong className="text-yellow-300/80">Aviso de dominio:</strong> todos los proyectos descritos en este laboratorio son de apoyo a la investigaciÃ³n y anÃ¡lisis. NingÃºn output â€” seÃ±al, puntuaciÃ³n, informe ni resultado de backtest â€” constituye recomendaciÃ³n de inversiÃ³n ni asesoramiento financiero.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "12" },
                  { label: "Aplicaciones de mercado", value: "5" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-white">{s.value}</p>
                    <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-20">

        {/* â”€â”€ MÃ³dulo 1 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">QuÃ© se investiga aquÃ­</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                El laboratorio aborda seis familias de problemas tÃ©cnicos donde los modelos de lenguaje flaquean al razonar sobre dinero, riesgo, normas y mercados. Los problemas son cualitativamente distintos entre sÃ­, y los benchmarks que usamos como brÃºjula los separan con precisiÃ³n quirÃºrgica.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Interdependencia de las lÃ­neas</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Estas seis lÃ­neas no son independientes: se retroalimentan. Un sistema de backtesting (lÃ­neas 2 y 4) que no puede auditar sus propias decisiones (lÃ­nea 6) es un sistema ciego. Por eso los tres proyectos del laboratorio estÃ¡n diseÃ±ados para cubrir intersecciones, no silos.
            </p>
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 2 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Tres proyectos en tres registros distintos: ARGOS es el motor de investigaciÃ³n con trazabilidad epistemolÃ³gica completa, KairÃ³s Sentimiento detecta asimetrÃ­a informativa en mercados antes de que el precio la refleje, y OrÃ¡culo BursÃ¡til traduce estrategias en lenguaje natural a backtests auditados.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 3 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">MÃ³dulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">QuÃ© aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a finanzas que operan en el mercado en el momento de redacciÃ³n de este cuaderno. Para detalles exactos de caracterÃ­sticas actuales o precios, verificar en la web oficial de cada herramienta.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MARKET_APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs border border-white/10 text-white/30 px-2 py-0.5 rounded-full">{app.tag}</span>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">{app.name}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{app.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-yellow-400/50 flex items-center gap-1.5">
                    <AlertTriangle size={10} />
                    Verificar caracterÃ­sticas en web oficial
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* â”€â”€ MÃ³dulo 4 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">MÃ³dulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen asimetrÃ­as de cobertura entre modelos, empates sin regla de desempate documentada, y datos pendientes de latencia y costes operativos.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => (
              <VerificationItem key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* â”€â”€ Wizard CTA â”€â”€ */}
        <div className="mt-16 mb-10 bg-gradient-to-br from-[#1a2540] to-[#0f1830] border border-[#3B6FD4]/25 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-[#3B6FD4]/15 border border-[#3B6FD4]/30 rounded-xl flex items-center justify-center shrink-0 text-[#3B6FD4] text-2xl">
              âš™
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3B6FD4]/70 mb-1">Herramienta interactiva Â· Horizon Lab</p>
              <h3 className="font-display text-[22px] sm:text-[26px] text-white leading-tight tracking-[-0.01em]">
                DiseÃ±ador de Proyectos â€” Finanzas
              </h3>
              <p className="text-white/45 text-sm mt-2 max-w-[420px] leading-relaxed">
                Define tu aplicaciÃ³n financiera paso a paso â€” tarea principal, mÃ³dulos, mÃ©tricas, backtest y stack tecnolÃ³gico â€” y genera automÃ¡ticamente su especificaciÃ³n tÃ©cnica completa lista para desarrollar.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["6 pasos guiados","LÃ³gica condicional","Informe ejecutivo","Descarga en .md"].map(tag => (
                  <span key={tag} className="text-[10px] bg-white/8 border border-white/10 text-white/50 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <Link
            to="/wizard/finanzas"
            className="shrink-0 flex items-center gap-2 bg-[#3B6FD4] hover:bg-[#2d5ab8] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Abrir DiseÃ±ador de Proyectos â†’
          </Link>
        </div>

        {/* â”€â”€ Footer CTA â”€â”€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· STATER Finance Leaderboard Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas.yaml</code>.
              Aviso: ningÃºn contenido constituye recomendaciÃ³n de inversiÃ³n ni asesoramiento financiero.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/taller" className="text-sm text-[#3B6FD4] hover:text-blue-300 border border-[#3B6FD4]/30 hover:border-[#3B6FD4]/60 px-4 py-2 rounded-xl transition-all">
              Ver casos en el Taller â†’
            </Link>
            <Link to="/comunidad" className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

