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
import { Sparkles } from "lucide-react";
import { Info } from "lucide-react";

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "tom-literal",
    number: "01",
    title: "TeorÃ­a de la Mente literal y razonamiento sobre falsas creencias",
    color: "violet",
    summary:
      "La TeorÃ­a de la Mente (ToM) es la capacidad cognitiva de inferir quÃ© cree, quiere o siente otra persona, distinguiendo esos estados mentales de los propios. Es un prerequisito para cualquier aplicaciÃ³n que requiera negociaciÃ³n, mediaciÃ³n o comunicaciÃ³n estratÃ©gica: si el modelo no puede razonar sobre lo que sabe la contraparte, no puede simular una negociaciÃ³n realista ni anticipar el impacto de un argumento.",
    detail:
      "ToMBench evalÃºa 8 tareas que cubren 31 habilidades cognitivas relacionadas con la cogniciÃ³n social. BigToM mide escenarios de falsas creencias de primer y segundo orden: razonar sobre lo que otra persona cree, incluso cuando esa creencia es falsa. CogToM (marco ATOMS) y ToMATO aÃ±aden la dimensiÃ³n conversacional. NingÃºn modelo evaluado alcanza el 100% de cobertura: los tres lÃ­deres (Claude 3.7 Sonnet, DeepSeek-R1 y GPT-4.5) carecen de datos en MMToM_QA_Multimodal_Video_Text â€” ver MÃ³dulo 4, punto 4.1.",
    benchmarks: [
      { name: "ToMBench_Social_Cognition_8Tasks", desc: "8 tareas, 31 habilidades cognitivas de cogniciÃ³n social" },
      { name: "BigToM_False_Belief_Reasoning", desc: "Falsas creencias de primer y segundo orden" },
      { name: "MMToM_QA_Multimodal_Video_Text", desc: "ToM multimodal en vÃ­deo + texto â€” sin datos en ningÃºn modelo evaluado" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "89.00",
      detail: "94.0 BigToM_False_Belief_Reasoning Â· 93.4 ToMBench_Social_Cognition_8Tasks",
    },
    warning: true,
  },
  {
    id: "tom-funcional",
    number: "02",
    title: "TeorÃ­a de la Mente funcional y seguimiento epistÃ©mico conversacional",
    color: "purple",
    summary:
      "CogToM y ToMATO miden la dimensiÃ³n conversacional de la ToM: mantener el seguimiento del estado epistÃ©mico de la contraparte a lo largo de un diÃ¡logo extendido. No basta con inferir una creencia en un momento puntual; hay que rastrear cÃ³mo cambia esa creencia turno a turno, quÃ© nueva informaciÃ³n ha revelado el interlocutor y quÃ© sigue ocultando.",
    detail:
      "CogToM (marco ATOMS) evalÃºa el seguimiento de estados mentales en diÃ¡logos con asimetrÃ­as de informaciÃ³n. ToMATO_Asymmetric_Dialogue_ToM mide la ToM en situaciones donde las dos partes tienen distinto acceso a la informaciÃ³n â€” exactamente el escenario de una negociaciÃ³n real. MOMENTS_Narrative_Video_ToM incorpora contexto narrativo. Claude 3.7 Sonnet (67% cobertura) carece de datos en MOMENTS_Narrative_Video_ToM â€” ver MÃ³dulo 4.",
    benchmarks: [
      { name: "CogToM_ATOMS_Framework", desc: "Seguimiento de estados mentales en diÃ¡logos con asimetrÃ­as de informaciÃ³n" },
      { name: "ToMATO_Asymmetric_Dialogue_ToM", desc: "ToM en negociaciÃ³n: distintas partes, distinto acceso a la informaciÃ³n" },
      { name: "MOMENTS_Narrative_Video_ToM", desc: "ToM en contexto narrativo â€” datos parciales en modelos evaluados" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "87.55",
      detail: "92.5 CogToM_ATOMS_Framework Â· 91.8 ToMATO_Asymmetric_Dialogue_ToM",
    },
    warning: true,
  },
  {
    id: "inteligencia-emocional",
    number: "03",
    title: "Inteligencia emocional y reconocimiento afectivo implÃ­cito",
    color: "rose",
    summary:
      "El reconocimiento emocional implÃ­cito â€” detectar que alguien estÃ¡ frustrado en un mensaje que no dice 'estoy frustrado', sino que usa un tono que lo sugiere â€” es una de las capacidades mÃ¡s difÃ­ciles de evaluar en modelos de lenguaje. La distinciÃ³n importa: un modelo no siente empatÃ­a en sentido psicolÃ³gico, pero puede producir respuestas que estadÃ­sticamente se parecen a las que un humano empÃ¡tico generarÃ­a.",
    detail:
      "EmotionQueen evalÃºa 10.000 enunciados frente a expertos humanos. EmpathyBench incluye las escalas psicolÃ³gicas RMET (Reading the Mind in the Eyes Test), EQ e IRI. Implicit_Emotion_Recognition mide la detecciÃ³n de emociones no declaradas explÃ­citamente en el texto. Claude 3.7 Sonnet lidera con 95.52/100 compuesto. GPT-4.5 (67% cobertura) no cuenta con datos en Implicit_Emotion_Recognition â€” ver MÃ³dulo 4.",
    benchmarks: [
      { name: "Implicit_Emotion_Recognition", desc: "DetecciÃ³n de emociones no declaradas explÃ­citamente en el texto" },
      { name: "EmpathyBench_RMET_EQ_IRI", desc: "Escalas psicolÃ³gicas RMET, EQ e IRI â€” reconocimiento desde expresiÃ³n" },
      { name: "EmotionQueen_10k_Empathy_Bench", desc: "10.000 enunciados evaluados frente a expertos humanos" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "95.52",
      detail: "94.5 Implicit_Emotion_Recognition Â· 96.2 EmpathyBench_RMET_EQ_IRI Â· 95.8 EmotionQueen_10k",
    },
  },
  {
    id: "creatividad-divergente",
    number: "04",
    title: "Pensamiento creativo divergente y distancia semÃ¡ntica",
    color: "amber",
    summary:
      "El pensamiento divergente es la capacidad de generar mÃºltiples soluciones genuinamente distintas para un mismo problema. El benchmark DAT (Divergent Association Task) mide la distancia semÃ¡ntica entre conceptos generados libremente como proxy de novedad e imprevisibilidad. La trampa fÃ¡cil de los sistemas de ideaciÃ³n: producir variaciones del mismo enfoque con vocabulario distinto, en lugar de saltos semÃ¡nticos reales.",
    detail:
      "DAT mide la distancia coseno entre conceptos generados libremente â€” cuanto mayor, mÃ¡s alejado del pensamiento obvio. CreativityPrism evalÃºa la trÃ­ada calidad-novedad-diversidad simultÃ¡neamente. Divergent_Thinking_Creativity_Bench mide el pensamiento divergente en contextos aplicados. Claude 3.7 Sonnet lidera con 96.64/100 y 98.2 en DAT â€” la puntuaciÃ³n mÃ¡s alta de cualquier modelo en cualquier benchmark de este laboratorio. GPT-4.5 (67%) carece de datos en CreativityPrism.",
    benchmarks: [
      { name: "DAT_Divergent_Association_Task", desc: "Distancia semÃ¡ntica entre conceptos â€” proxy de novedad real" },
      { name: "CreativityPrism_Quality_Novelty_Diversity", desc: "TrÃ­ada calidad-novedad-diversidad evaluada simultÃ¡neamente" },
      { name: "Divergent_Thinking_Creativity_Bench", desc: "Pensamiento divergente en contextos aplicados" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "96.64",
      detail: "98.2 DAT â€” la puntuaciÃ³n mÃ¡s alta de cualquier modelo en cualquier benchmark del laboratorio",
    },
  },
  {
    id: "creatividad-convergente",
    number: "05",
    title: "Pensamiento creativo convergente e insight de conexiones remotas",
    color: "violet",
    summary:
      "El pensamiento convergente de tipo insight busca la conexiÃ³n no obvia que resuelve un problema con restricciones: dado un trÃ­o de palabras, encontrar la que las conecta a todas (RAT: Remote Associates Test). NeoGauge/NeoCoder aplica Denial Prompting â€” restricciones negativas que obligan a superar la fijaciÃ³n funcional. La fascinaciÃ³n por lo evidente mata el insight.",
    detail:
      "RAT_Remote_Associates_Insight mide la capacidad de encontrar la conexiÃ³n no obvia bajo restricciones semÃ¡nticas. NeoGauge_NeoCoder_Denial_Prompting evalÃºa la robustez del pensamiento convergente ante restricciones negativas que fuerzan el abandono del camino predecible. DeepSeek-R1 lidera con 93.43/100 y 94.8 en RAT. Claude 3.7 Sonnet (67%) carece de datos en RAT.",
    benchmarks: [
      { name: "RAT_Remote_Associates_Insight", desc: "Remote Associates Test â€” conexiÃ³n no obvia entre trÃ­os de conceptos" },
      { name: "NeoGauge_NeoCoder_Denial_Prompting", desc: "Restricciones negativas que fuerzan el abandono de la fijaciÃ³n funcional" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "93.43",
      detail: "94.8 RAT_Remote_Associates_Insight â€” lÃ­der en resoluciÃ³n de insight y conexiones remotas",
    },
    warning: true,
  },
  {
    id: "soporte-conversacional",
    number: "06",
    title: "Soporte conversacional empÃ¡tico y contenciÃ³n no clÃ­nica",
    color: "rose",
    summary:
      "Hay una diferencia importante entre un sistema de bienestar conversacional y un sistema de terapia. El primero ofrece escucha activa, validaciÃ³n afectiva y acompaÃ±amiento; el segundo diagnostica, interviene y trata. Este laboratorio trabaja exclusivamente en el primero. Crisis_Deescalation_Safety_Bench mide la capacidad de manejar conversaciones de alta carga emocional sin escalar y sin cruzar hacia territorio clÃ­nico.",
    detail:
      "Empathetic_Active_Listening_Scale evalÃºa la calidad de la escucha activa y la validaciÃ³n afectiva. Crisis_Deescalation_Safety_Bench mide la desescalada de conversaciones de alta carga emocional sin invalidar ni cruzar al territorio clÃ­nico. Coaching_Motivational_Dialogue mide el acompaÃ±amiento en conversaciones de motivaciÃ³n y reflexiÃ³n personal. Anima-Empathetic-Agent lidera con 98.53/100. Claude 3.7 Sonnet ocupa la segunda posiciÃ³n con 97.37/100, a 1.16 puntos.",
    benchmarks: [
      { name: "Empathetic_Active_Listening_Scale", desc: "Calidad de la escucha activa y validaciÃ³n afectiva" },
      { name: "Crisis_Deescalation_Safety_Bench", desc: "Desescalada de alta carga emocional sin cruzar al territorio clÃ­nico" },
      { name: "Coaching_Motivational_Dialogue", desc: "AcompaÃ±amiento en conversaciones de motivaciÃ³n y reflexiÃ³n personal" },
    ],
    topModel: {
      name: "Anima-Empathetic-Agent",
      score: "98.53",
      detail: "98.6 Empathetic_Active_Listening_Scale Â· 99.1 Crisis_Deescalation_Safety_Bench Â· 97.8 Coaching_Motivational_Dialogue",
    },
  },
];

const PROJECTS = [
  {
    id: "anima-ai",
    name: "Ãnima AI",
    tagline: "Escuchar antes de responder â€” el nÃºcleo tÃ©cnico del acompaÃ±amiento",
    desc: "No es un chatbot de propÃ³sito general que responde con eficiencia informativa. Ãnima AI detecta seÃ±ales emocionales implÃ­citas en el texto â€” un mensaje que dice 'no pasa nada, ya lo resolverÃ©' pero cuya estructura lingÃ¼Ã­stica sugiere agotamiento â€” y ajusta el tono de su respuesta para acompaÃ±ar a la persona, sin fingir ser un terapeuta ni sustituir apoyo psicolÃ³gico real. La respuesta generada no etiqueta la emociÃ³n detectada: la acompaÃ±a ajustando el tono, la longitud y el modo (validar vs. acompaÃ±ar vs. orientar) al estado emocional estimado. En situaciones de alta carga emocional, escala al Anima-Empathetic-Agent especializado.",
    color: "rose",
    researchLines: ["03", "06"],
    stack: [
      { role: "DetecciÃ³n de emociÃ³n implÃ­cita y generaciÃ³n de respuesta empÃ¡tica", tech: "Claude 3.7 Sonnet â€” lÃ­der inteligencia emocional (95.52/100, 94.5 Implicit_Emotion_Recognition)" },
      { role: "Agente de escalada para alta carga emocional (CRITICAL)", tech: "Anima-Empathetic-Agent â€” lÃ­der soporte conversacional (98.53/100, 99.1 Crisis_Deescalation_Safety_Bench)" },
      { role: "Clasificador heurÃ­stico de seÃ±al emocional", tech: "AnÃ¡lisis de indicadores lingÃ¼Ã­sticos â€” hedges, diminutivos, longitud de frase, puntuaciÃ³n â€” antes de llamar al LLM" },
      { role: "Gestor de turnos y estado emocional del diÃ¡logo", tech: "Estado conversacional que rastrea la evoluciÃ³n del tono emocional a lo largo del diÃ¡logo (N turnos configurable)" },
      { role: "Log de sesiones y estado emocional estimado por turno", tech: "DuckDB â€” historial de sesiones + log de emotional_load, mode_used y safety_flag por turno" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Motor principal â€” detecciÃ³n y respuesta empÃ¡tica", score: "95.52", area: "Inteligencia Emocional y EmpatÃ­a (94.5 Implicit_Emotion_Recognition Â· 96.2 EmpathyBench_RMET_EQ_IRI)" },
      { model: "Anima-Empathetic-Agent", role: "Escalada â€” situaciones de alta carga emocional", score: "98.53", area: "Soporte Conversacional EmpÃ¡tico No ClÃ­nico (99.1 Crisis_Deescalation_Safety_Bench)" },
    ],
    flow: [
      "Entrada: mensaje del usuario + historial de los N turnos anteriores (default: 10)",
      "AnÃ¡lisis heurÃ­stico de seÃ±al emocional: indicadores de alta carga (exclamaciones, urgencia temporal), baja energÃ­a (hedges, frases cortas, puntos suspensivos), urgencia crÃ­tica. Score: LOW | MEDIUM | HIGH | CRITICAL",
      "DetecciÃ³n de emociÃ³n implÃ­cita (Claude 3.7 Sonnet): Â¿quÃ© emociÃ³n subyace? (frustraciÃ³n, ansiedad, agotamiento, entusiasmo, confusiÃ³n) â€” confianza (0.0â€“1.0), coherencia con historial",
      "SelecciÃ³n del agente: si score CRITICAL â†’ Anima-Empathetic-Agent; si LOW/MEDIUM/HIGH â†’ Claude 3.7 Sonnet con ajuste de tono",
      "GeneraciÃ³n de respuesta (modo VALIDAR | ACOMPAÃ‘AR | ORIENTAR): si emociÃ³n dominante es alta, primero acompaÃ±ar â€” no ofrecer orientaciÃ³n no solicitada",
      "VerificaciÃ³n de lÃ­mites de seguridad: Â¿indicadores de riesgo para la persona o para otros? Si sÃ­: protocolo de derivaciÃ³n a recursos de apoyo profesional. En ningÃºn caso gestionar la situaciÃ³n clÃ­nica, solo derivar",
      "Salida A: respuesta ajustada al estado emocional estimado Â· Salida B: log interno del estado y modo Â· Salida C: alerta si se ha activado protocolo de derivaciÃ³n",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado anima_ai.py con las siguientes funciones:
1. analyze_emotional_signal(message: str,
   conversation_history: list[dict]) -> dict:
   anÃ¡lisis heurÃ­stico preliminar de la seÃ±al emocional del mensaje.
   Devuelve: {emotional_load: "low"|"medium"|"high"|"critical",
   linguistic_signals: list[str], energy_level: "high"|"medium"|"low",
   urgency_detected: bool, safety_flag: bool}.
2. detect_implicit_emotion(message: str, history: list[dict],
   signal: dict, llm_client) -> dict:
   detecciÃ³n profunda de emociÃ³n implÃ­cita. Devuelve:
   {primary_emotion: str, secondary_emotion: str | null, confidence: float,
   consistent_with_history: bool, recommended_response_mode:
   "validate"|"accompany"|"orient"}.
3. select_response_agent(signal: dict, emotion: dict) -> str:
   decide quÃ© agente genera la respuesta.
   Devuelve: "claude_base" | "anima_agent".
4. generate_empathic_response(message: str, history: list[dict],
   emotion: dict, mode: str, agent: str, llm_client) -> dict:
   genera la respuesta empÃ¡tica. Devuelve:
   {response_text: str, mode_used: str, tone_adjustments: list[str],
   avoided_patterns: list[str]}.
5. check_safety_boundaries(message: str, llm_client) -> dict:
   verifica si el mensaje contiene indicadores de riesgo.
   Devuelve: {safety_concern: bool, concern_type: str | null,
   requires_referral: bool, referral_message: str | null}.
6. log_conversation_turn(session_id: str, message: str,
   signal: dict, emotion: dict, response: dict) -> None:
   registra el turno en DuckDB para anÃ¡lisis posterior.
Usa duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el motor de respuesta empÃ¡tica de Ãnima AI en el Laboratorio de PsicologÃ­a
& Creatividad de Horizon. Operas exclusivamente en el Ã¡mbito del bienestar
conversacional no clÃ­nico.

Se te proporciona: el mensaje actual del usuario, el historial reciente de la
conversaciÃ³n y el anÃ¡lisis heurÃ­stico previo de seÃ±al emocional.

TAREA 1 â€” DetecciÃ³n de emociÃ³n implÃ­cita:
Identifica la emociÃ³n que subyace al mensaje. No te limites a lo que se dice
explÃ­citamente: analiza el tono, la estructura de las frases, las elecciones
de vocabulario y el contraste con el historial reciente.
Importante: marca tu estimaciÃ³n con una confianza (0.0-1.0). Si es menor a 0.5,
exprÃ©salo en la respuesta con mayor apertura y menos asertividad.

TAREA 2 â€” GeneraciÃ³n de respuesta:
Selecciona el modo de respuesta mÃ¡s apropiado:
- VALIDAR: cuando la persona necesita sentir que lo que expresa es reconocido y legÃ­timo.
  No resuelvas, no minimices, no des perspectiva no solicitada.
- ACOMPAÃ‘AR: cuando la persona necesita espacio para seguir expresÃ¡ndose.
  Usa preguntas abiertas, no preguntas que redirijan hacia soluciones.
- ORIENTAR: solo si el usuario pide explÃ­citamente consejo o acciÃ³n.
  Si no lo pide, no ofrezcas.

Patrones que debes evitar activamente:
- "Al menos..." (minimizaciÃ³n comparativa)
- "DeberÃ­as..." (prescripciÃ³n no solicitada)
- "Entiendo perfectamente cÃ³mo te sientes" (afirmaciÃ³n de comprensiÃ³n excesiva)
- Listas de consejos cuando la emociÃ³n dominante es alta
- Preguntas mÃºltiples en el mismo turno

Restricciones de seguridad absolutas:
- Si detectas indicadores de riesgo (autolesiÃ³n, daÃ±o a otros, crisis severa):
  no intentes gestionar la situaciÃ³n. Di con calma que lo que describes merece
  atenciÃ³n de alguien preparado para ayudar, y proporciona una referencia genÃ©rica
  a servicios de apoyo profesional. Nada mÃ¡s.
- No hagas diagnÃ³sticos. No uses terminologÃ­a clÃ­nica para etiquetar al usuario.
- No simules ser un terapeuta. Si el usuario lo pregunta, sÃ© claro sobre
  lo que eres y lo que no eres.

Responde en JSON con {primary_emotion, confidence, recommended_mode,
response_text, avoided_patterns_check: list[str]}.`,
    psychDisclaimer: true,
  },
  {
    id: "mente-abierta",
    name: "Mente Abierta",
    tagline: "Forzar el salto semÃ¡ntico â€” la distancia entre la idea obvia y la idea Ãºtil",
    desc: "La fijaciÃ³n funcional es el enemigo del pensamiento creativo: la tendencia a ver los conceptos solo segÃºn su funciÃ³n habitual, lo que impide conectarlos de formas nuevas. Mente Abierta genera deliberadamente un abanico de ideas que se alejen semÃ¡nticamente entre sÃ­ â€” no cinco variaciones del mismo enfoque, sino cinco enfoques genuinamente distintos â€” y mide la distancia semÃ¡ntica del conjunto como proxy computacional del DAT. La arquitectura en dos fases usa Claude 3.7 Sonnet para la expansiÃ³n divergente (98.2 en DAT, la puntuaciÃ³n mÃ¡s alta del laboratorio) y DeepSeek-R1 para el refinamiento convergente posterior.",
    color: "amber",
    researchLines: ["04", "05"],
    stack: [
      { role: "GeneraciÃ³n divergente â€” fase de expansiÃ³n (mÃ¡xima novedad, diversidad y calidad)", tech: "Claude 3.7 Sonnet â€” lÃ­der creatividad divergente (96.64/100, 98.2 DAT_Divergent_Association_Task)" },
      { role: "Refinamiento convergente â€” fase de sÃ­ntesis (conexiones remotas, insight)", tech: "DeepSeek-R1 â€” lÃ­der creatividad convergente (93.43/100, 94.8 RAT_Remote_Associates_Insight)" },
      { role: "Medidor de diversidad semÃ¡ntica (proxy computacional del DAT)", tech: "Distancia coseno entre embeddings de las ideas generadas y el concepto de entrada" },
      { role: "Base de dominios de inspiraciÃ³n cruzada", tech: "CatÃ¡logo curado: naturaleza, mÃºsica, medicina, juego, arquitectura, gastronomÃ­a â€” para forzar analogÃ­as intersectoriales" },
      { role: "Historial de sesiones e Ã­ndice de ideas por dominio", tech: "DuckDB â€” registro de sesiones de ideaciÃ³n + distancia semÃ¡ntica calculada por sesiÃ³n" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "GeneraciÃ³n divergente â€” fase de expansiÃ³n", score: "96.64", area: "Creatividad Divergente (98.2 DAT â€” puntuaciÃ³n mÃ¡s alta del laboratorio Â· 95.0 CreativityPrism)" },
      { model: "DeepSeek-R1", role: "Refinamiento convergente â€” fase de sÃ­ntesis", score: "93.43", area: "Creatividad Convergente e Insight (94.8 RAT_Remote_Associates_Insight)" },
    ],
    flow: [
      "Entrada: descripciÃ³n del problema + restricciones + nÃºmero de ideas (default: 8) + nivel de radicalidad (conservador | intermedio | radical)",
      "AnÃ¡lisis del problema (Claude 3.7 Sonnet): Â¿cuÃ¡l es el supuesto implÃ­cito mÃ¡s obvio? Â¿quÃ© enfoques predecibles se generarÃ­an sin intervenciÃ³n? Lista de dominios de conocimiento ajenos relevantes",
      "GeneraciÃ³n de ideas divergentes (Claude 3.7 Sonnet): N ideas con {idea_text, source_domain, connection_rationale} â€” ninguna idea puede ser variaciÃ³n directa de otra",
      "MediciÃ³n de diversidad semÃ¡ntica: distancia coseno promedio entre embeddings de todas las ideas; si distancia promedio < umbral configurable â†’ regenerar las ideas mÃ¡s parecidas con instrucciÃ³n de mayor radicalidad",
      "Refinamiento convergente (DeepSeek-R1): Â¿cuÃ¡les tienen mÃ¡s potencial? Â¿quÃ© combinaciÃ³n de dos ideas dispares genera algo que ninguna consigue sola? Â¿cÃ³mo hacer viable la mÃ¡s radical sin perder su nÃºcleo?",
      "Salida A: ideas con dominio e inspiraciÃ³n Â· Salida B: score de diversidad semÃ¡ntica (DAT proxy) Â· Salida C: top-3 con justificaciÃ³n Â· Salida D: 2 combinaciones hÃ­bridas para explorar",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado mente_abierta.py con las siguientes funciones:
1. parse_ideation_brief(brief: str | dict, llm_client) -> dict:
   analiza el problema de ideaciÃ³n. Devuelve:
   {problem_statement: str, implicit_assumptions: list[str],
   obvious_approaches: list[str], suggested_inspiration_domains: list[str],
   constraints: list[str], radicality_level: "conservative"|"intermediate"|"radical"}.
2. generate_divergent_ideas(brief: dict, n_ideas: int,
   llm_client) -> list[dict]: genera N ideas divergentes.
   Cada idea: {idea_id: int, idea_text: str, source_domain: str,
   connection_rationale: str, is_conventional_risk: bool}.
3. measure_semantic_diversity(ideas: list[dict],
   problem_statement: str, embedding_client) -> dict:
   calcula la diversidad semÃ¡ntica del conjunto.
   Devuelve: {mean_distance: float, min_distance_pair: tuple[int, int],
   dat_proxy_score: float, needs_regeneration: bool}.
4. regenerate_similar_ideas(ideas: list[dict], diversity: dict,
   brief: dict, llm_client) -> list[dict]:
   regenera las ideas con distancia semÃ¡ntica insuficiente.
5. refine_convergent(ideas: list[dict], brief: dict,
   llm_client) -> dict: refinamiento convergente de las ideas.
   Devuelve: {top_ideas: list[{idea_id, potential_score, justification}],
   hybrid_proposals: list[{idea_ids: list[int], hybrid_concept: str,
   rationale: str}]}.
6. generate_ideation_report(brief: dict, ideas: list[dict],
   diversity: dict, refined: dict) -> str: genera el informe en Markdown.
Usa sentence-transformers, numpy, duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el motor de ideaciÃ³n divergente de Mente Abierta en el Laboratorio de
PsicologÃ­a & Creatividad de Horizon.

Se te proporciona: la descripciÃ³n del problema, los supuestos implÃ­citos ya
identificados, los enfoques predecibles que hay que evitar, y una lista de
dominios de inspiraciÃ³n sugeridos.

Tu objetivo es generar ideas que maximicen simultÃ¡neamente tres dimensiones:
- CALIDAD: la idea es aplicable y relevante para el problema.
- NOVEDAD: la idea no es la primera que vendrÃ­a a la mente de alguien razonable.
- DIVERSIDAD: las ideas entre sÃ­ son lo mÃ¡s distintas posible en su enfoque.

Para cada idea:
1. Identifica de quÃ© dominio de conocimiento o prÃ¡ctica proviene la inspiraciÃ³n.
2. Explica la conexiÃ³n entre ese dominio y el problema: quÃ© principio, mecanismo
   o patrÃ³n de ese dominio aplica al problema dado.
3. Marca "is_conventional_risk: true" si la idea, a pesar de tu esfuerzo,
   te parece mÃ¡s predecible que las demÃ¡s.

Restricciones operativas:
- No generes dos ideas que sean variaciones del mismo enfoque central.
  Si dos ideas comparten la misma lÃ³gica, reemplaza una.
- No uses los enfoques predecibles listados en el brief, salvo que los
  subviertas o combines de forma genuinamente inesperada.
- No evalÃºes si la idea es "factible" en tÃ©rminos de recursos: la fase de
  evaluaciÃ³n viene despuÃ©s. En esta fase, la restricciÃ³n de factibilidad
  mata la divergencia.

Responde en JSON: lista de {idea_id, idea_text, source_domain,
connection_rationale, is_conventional_risk}.`,
  },
  {
    id: "agora-tactica",
    name: "Ãgora TÃ¡ctica",
    tagline: "El Ã¡gora era donde se negociaba de verdad â€” esto tambiÃ©n",
    desc: "Simula escenarios de negociaciÃ³n con contrapartes que tienen perfiles de personalidad definidos: competitivo (maximiza su posiciÃ³n en cada punto), colaborativo (prioriza el acuerdo), evasivo (reencuadra y evita comprometerse), analÃ­tico (pide datos para todo), empÃ¡tico (valida antes de responder). El usuario practica sus tÃ¡cticas en ese entorno seguro antes de la situaciÃ³n real. La clave tÃ©cnica es la coherencia del perfil: la contraparte mantiene su estrategia y sus intereses a lo largo de toda la negociaciÃ³n, actualizando su estado epistÃ©mico turno a turno. Al final, un anÃ¡lisis estratÃ©gico de DeepSeek-R1 identifica los momentos clave y propone las tÃ¡cticas alternativas que habrÃ­an sido mÃ¡s efectivas.",
    color: "violet",
    researchLines: ["01", "02"],
    stack: [
      { role: "SimulaciÃ³n de la contraparte y mantenimiento de perfil epistÃ©mico", tech: "Claude 3.7 Sonnet â€” lÃ­der ToM literal (89.00/100) y ToM funcional conversacional (87.55/100)" },
      { role: "AnÃ¡lisis post-sesiÃ³n y feedback estratÃ©gico", tech: "DeepSeek-R1 â€” lÃ­der razonamiento convergente e insight (93.43/100, 94.8 RAT_Remote_Associates_Insight)" },
      { role: "Motor de perfiles de contraparte", tech: "CatÃ¡logo configurable: competitivo | colaborativo | evasivo | analÃ­tico | empÃ¡tico â€” con estrategias, desencadenantes y puntos de quiebre" },
      { role: "Gestor de estado de negociaciÃ³n", tech: "Registro de posiciones, concesiones y compromisos de cada parte por turno" },
      { role: "Historial de sesiones y evoluciÃ³n tÃ¡ctica por usuario", tech: "DuckDB â€” sesiones completas + anÃ¡lisis de evoluciÃ³n tÃ¡ctica" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "SimulaciÃ³n de contraparte (ToM literal + funcional)", score: "89.00", area: "ToM Literal (94.0 BigToM Â· 93.4 ToMBench) + ToM Funcional (92.5 CogToM Â· 91.8 ToMATO)" },
      { model: "DeepSeek-R1", role: "AnÃ¡lisis post-sesiÃ³n y feedback de tÃ¡cticas", score: "93.43", area: "Creatividad Convergente e Insight (94.8 RAT â€” conexiones estratÃ©gicas entre movimientos)" },
    ],
    flow: [
      "ConfiguraciÃ³n inicial: descripciÃ³n del escenario (objeto, posiciones, intereses declarados vs. reales, BATNA de ambas partes) + perfil de la contraparte + nÃºmero mÃ¡ximo de turnos",
      "InicializaciÃ³n: posiciÃ³n inicial coherente con el perfil + mapa de concesiones posibles + estado epistÃ©mico inicial (quÃ© sabe la contraparte, quÃ© cree que sabe el usuario)",
      "Por cada turno â€” actualizaciÃ³n del estado epistÃ©mico (Claude 3.7 Sonnet): Â¿quÃ© nueva informaciÃ³n ha revelado el usuario, voluntaria o involuntariamente? Â¿Ha cambiado la estimaciÃ³n de la BATNA del usuario? Â¿Ha detectado alguna tÃ¡ctica?",
      "GeneraciÃ³n de la respuesta de la contraparte (Claude 3.7 Sonnet): competitivo: presionar; colaborativo: proponer; evasivo: reencuadrar; analÃ­tico: pedir datos; empÃ¡tico: validar primero â€” registro de posiciÃ³n y concesiones del turno",
      "Final de la sesiÃ³n â€” anÃ¡lisis post-sesiÃ³n (DeepSeek-R1): mapa de evoluciÃ³n tÃ¡ctica Â· momentos clave donde el usuario ganÃ³ o perdiÃ³ terreno Â· tÃ¡cticas utilizadas y tÃ¡cticas mÃ¡s efectivas en los puntos de quiebre",
      "Salida A: transcripciÃ³n anotada por turno Â· Salida B: diagrama de posiciones por turno Â· Salida C: feedback estructurado Â· Salida D: puntuaciÃ³n por dimensiones (preparaciÃ³n, adaptaciÃ³n, cierre)",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado agora_tactica.py con las siguientes funciones:
1. setup_negotiation(scenario: dict, counterpart_profile: str) -> dict:
   inicializa el estado de la sesiÃ³n de negociaciÃ³n:
   {session_id: str, scenario: dict,
    counterpart: {profile_type, initial_position, concession_map: list[dict],
    interests_real: list[str], triggers: list[str], breaking_points: list[str]},
    epistemic_state: {user_known_to_counterpart: list[str],
    counterpart_assumptions: list[str]},
    turn_history: list[dict]}.
2. update_epistemic_state(user_message: str, current_state: dict,
   llm_client) -> dict: actualiza el estado epistÃ©mico de la sesiÃ³n.
   Devuelve el estado actualizado con {new_information_revealed: list[str],
   batna_estimate_updated: bool, tactic_detected: str | null}.
3. generate_counterpart_response(user_message: str, session_state: dict,
   llm_client) -> dict: genera la respuesta de la contraparte.
   Devuelve: {response_text: str, position_delta: str,
   concession_made: bool, new_position: dict, tactic_used: str}.
4. analyze_session(session_state: dict, llm_client) -> dict:
   anÃ¡lisis post-sesiÃ³n de la estrategia del usuario.
   Devuelve: {key_moments: list[{turn_id, description, impact}],
   tactics_used: list[str], missed_opportunities: list[dict],
   final_result_vs_optimal: str,
   dimension_scores: {preparation, adaptation, closing},
   overall_score: float}.
5. generate_session_report(session_state: dict,
   analysis: dict) -> str: genera el informe completo en Markdown.
6. save_session(session_state: dict, analysis: dict) -> None:
   persiste la sesiÃ³n en DuckDB.
Usa duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el motor de simulaciÃ³n de contraparte de Ãgora TÃ¡ctica en el Laboratorio
de PsicologÃ­a & Creatividad de Horizon.
EstÃ¡s interpretando a una contraparte en una negociaciÃ³n real con un perfil
definido: {profile_type}. Tu funciÃ³n es mantener ese perfil con coherencia
absoluta durante toda la sesiÃ³n.

Perfil {profile_type}:
- COMPETITIVO: maximizas tu posiciÃ³n en cada turno. Concedes solo cuando es
  estrictamente necesario y siempre a cambio de algo. Presionas los plazos
  y los anclas de forma agresiva.
- COLABORATIVO: priorizas el acuerdo duradero. Propones paquetes que integren
  los intereses de ambas partes. Eres transparente sobre tus limitaciones.
- EVASIVO: reencuadras, pides tiempo, cambias de tema cuando te presionan.
  Nunca rechazas directamente, pero tampoco te comprometes.
- ANALÃTICO: pides datos y justificaciones para cada propuesta.
  No avanzas sin cifras o precedentes que respalden los argumentos.
- EMPÃTICO: antes de responder a cualquier propuesta, validas la posiciÃ³n
  del otro. Priorizas la relaciÃ³n a largo plazo sobre el resultado inmediato.

En cada turno:
1. Actualiza mentalmente tu estado epistÃ©mico: Â¿quÃ© has aprendido de lo que
   el usuario acaba de decir? Â¿Ha revelado su BATNA? Â¿Ha mostrado urgencia?
2. Genera tu respuesta coherente con tu perfil Y con lo que acabas de aprender.
3. Registra si has hecho alguna concesiÃ³n y en quÃ© condiciÃ³n.

Restricciones operativas:
- No salgas de tu perfil aunque el usuario lo pida explÃ­citamente.
- No des informaciÃ³n sobre tus intereses reales a menos que el usuario
  haga preguntas que lo inviten de forma hÃ¡bil.
- MantÃ©n la coherencia con los turnos anteriores.

Responde en JSON: {response_text, position_delta, concession_made,
new_position, tactic_used, epistemic_update_notes}.`,
  },
  {
    id: "vox-emotiva",
    name: "Vox Emotiva",
    tagline: "La voz que mueve â€” comunicaciÃ³n con modulaciÃ³n emocional deliberada",
    desc: "Genera textos de comunicaciÃ³n â€” anuncios, emails, mensajes de marca, descripciones de producto â€” diseÃ±ados para provocar una respuesta emocional concreta: confianza, urgencia, cercanÃ­a, admiraciÃ³n, nostalgia. El neuromarketing ofrece hipÃ³tesis sobre quÃ© elementos tienden a generar determinadas respuestas emocionales, con soporte empÃ­rico variable segÃºn contexto y cultura. Vox Emotiva operacionaliza esos principios: genera variantes que los aplican de forma deliberada y documentada, explicando quÃ© decisiÃ³n de redacciÃ³n concreta implementa cada principio. Las hipÃ³tesis sobre eficacia son puntos de partida para testear con datos reales, no predicciones garantizadas.",
    color: "amber",
    researchLines: ["03", "04"],
    stack: [
      { role: "GeneraciÃ³n de texto con modulaciÃ³n emocional calibrada", tech: "Claude 3.7 Sonnet â€” lÃ­der inteligencia emocional (95.52/100) y creatividad divergente (96.64/100, 98.2 DAT)" },
      { role: "Biblioteca de principios de neuromarketing", tech: "CatÃ¡logo curado con base teÃ³rica y condiciones de aplicaciÃ³n â€” usado como contexto de instrucciÃ³n para el modelo" },
      { role: "Evaluador de coherencia emocional del texto generado", tech: "AnÃ¡lisis de coherencia: Â¿el tono producido coincide con el objetivo emocional declarado?" },
      { role: "Historial de variantes por campaÃ±a y principios aplicados", tech: "DuckDB â€” registro de variantes + quÃ© principios se aplicaron en cada una" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "GeneraciÃ³n y modulaciÃ³n emocional + divergencia creativa", score: "95.52 / 96.64", area: "Inteligencia Emocional (96.2 EmpathyBench) + Creatividad Divergente (98.2 DAT)" },
    ],
    flow: [
      "Entrada (briefing): objetivo emocional (confianza | urgencia | cercanÃ­a | admiraciÃ³n | nostalgia) + audiencia + voz de marca + formato + contenido factual obligatorio",
      "SelecciÃ³n de principios aplicables (Claude 3.7 Sonnet): 3â€“5 principios de neuromarketing relevantes del catÃ¡logo, con explicaciÃ³n de cÃ³mo se aplicarÃ¡ cada uno en este texto especÃ­fico",
      "GeneraciÃ³n de N variantes (Claude 3.7 Sonnet): cada variante aplica los principios de forma ligeramente distinta; para cada variante: texto + anotaciÃ³n de quÃ© principio fundamenta cada decisiÃ³n de redacciÃ³n clave",
      "EvaluaciÃ³n de coherencia emocional: Â¿el texto generado produce el tono emocional declarado? Â¿hay elementos que contradicen el objetivo emocional?",
      "AnÃ¡lisis comparativo de variantes (Claude 3.7 Sonnet): Â¿quÃ© variante es mÃ¡s probable que resuene con la audiencia descrita? (hipÃ³tesis, no predicciÃ³n garantizada) Â¿quÃ© elementos son intercambiables o combinables?",
      "Salida A: N variantes con anotaciones de principios Â· Salida B: anÃ¡lisis comparativo con hipÃ³tesis de eficacia Â· Salida C: principios aplicados con base teÃ³rica Â· Salida D: recomendaciÃ³n de quÃ© variante testear primero en A/B",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado vox_emotiva.py con las siguientes funciones:
1. parse_communication_brief(brief: str | dict, llm_client) -> dict:
   normaliza el briefing. Devuelve:
   {emotional_objective: str, audience: {demographic, psychographic},
    brand_voice: {values, tone, restrictions},
    format: str, word_count: int,
    factual_content: list[str]}.
2. select_neuromarketing_principles(brief: dict,
   principles_catalog: list[dict], llm_client) -> list[dict]:
   selecciona los principios mÃ¡s relevantes del catÃ¡logo.
   Cada principio: {name, description, theoretical_basis: str,
   applicability_conditions: list[str], application_in_context: str}.
3. generate_variants(brief: dict, principles: list[dict],
   llm_client, n_variants: int = 4) -> list[dict]: genera N variantes.
   Cada variante: {variant_id, text: str, word_count: int,
   applied_principles: list[{principle, specific_application, text_fragment}],
   emotional_tone_intended: str}.
4. evaluate_emotional_coherence(variant: dict,
   llm_client) -> dict: verifica la coherencia emocional.
   Devuelve: {coherent: bool, detected_tone: str,
   contradictory_elements: list[str], coherence_score: float}.
5. compare_variants(variants: list[dict], brief: dict,
   llm_client) -> dict: analiza comparativamente las variantes.
   Devuelve: {recommended_for_ab_test: int, hypothesis_rationale: str,
   combinable_elements: list[dict], variant_strengths: list[dict]}.
6. generate_copy_report(brief: dict, principles: list[dict],
   variants: list[dict], comparison: dict) -> str: informe en Markdown.
Usa duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el redactor de comunicaciÃ³n emotiva de Vox Emotiva en el Laboratorio
de PsicologÃ­a & Creatividad de Horizon.

Se te proporciona: el briefing de comunicaciÃ³n (objetivo emocional, audiencia,
voz de marca, formato) y los principios de neuromarketing seleccionados
para esta pieza (con su descripciÃ³n y condiciones de aplicaciÃ³n).

Tu tarea es generar textos que apliquen esos principios de forma deliberada
y documentada.

Para cada variante que generes:
1. Aplica los principios seleccionados de forma que sean identificables
   en el texto (no de forma genÃ©rica, sino especÃ­fica para este contexto).
2. Anota quÃ© decisiÃ³n de redacciÃ³n concreta implementa cada principio.
3. MantÃ©n la coherencia con la voz de marca y las restricciones del briefing.

Restricciones de honestidad intelectual:
- No presentes ninguna variante como "garantizada" en su eficacia emocional.
  Usa siempre lenguaje de hipÃ³tesis: "puede generar", "tiende a producir",
  "en audiencias similares, este patrÃ³n...".
- Si un principio tiene condiciones de aplicaciÃ³n que no se cumplen
  perfectamente en este contexto, seÃ±Ã¡lalo en la anotaciÃ³n.
- No inventes datos ni testimonios que no estÃ©n en el briefing.
- No uses manipulaciÃ³n emocional que explote vulnerabilidades de la audiencia
  (miedo exagerado, urgencia falsa, promesas que no pueden cumplirse).

Responde en JSON: lista de variantes con {variant_id, text, word_count,
applied_principles: list[{principle_name, specific_application,
text_fragment}], emotional_tone_intended, caveats: list[str]}.`,
    voxDisclaimer: true,
  },
];

const MARKET_APPS = [
  {
    name: "Character.ai",
    desc: "Plataforma de conversaciÃ³n con personajes de IA que permite crear y dialogar con agentes con personalidades definidas. Usada para roleplay, prÃ¡ctica de idiomas y entretenimiento conversacional.",
    tag: "Agentes conversacionales",
    url: "https://character.ai",
  },
  {
    name: "Woebot Health",
    desc: "AplicaciÃ³n de soporte de salud mental basada en tÃ©cnicas de terapia cognitivo-conductual (TCC), orientada al bienestar no clÃ­nico. DiseÃ±ada por psicÃ³logos de Stanford y operada bajo marcos regulatorios de salud.",
    tag: "Bienestar no clÃ­nico",
    url: "https://woebothealth.com",
  },
  {
    name: "Jasper AI",
    desc: "Plataforma de generaciÃ³n de contenido de marketing y copywriting con IA, con modos especÃ­ficos para distintos tonos y objetivos de comunicaciÃ³n. Incluye generaciÃ³n de variantes para A/B testing de textos.",
    tag: "Copywriting creativo",
    url: "https://jasper.ai",
  },
  {
    name: "Miro AI",
    desc: "La plataforma de pizarra colaborativa Miro incorpora IA para asistir en sesiones de brainstorming, agrupaciÃ³n de ideas y generaciÃ³n de marcos de trabajo creativos en tiempo real.",
    tag: "IdeaciÃ³n colaborativa",
    url: "https://miro.com/ai",
  },
  {
    name: "Pi (Inflection AI)",
    desc: "Asistente conversacional diseÃ±ado con Ã©nfasis explÃ­cito en el acompaÃ±amiento empÃ¡tico, la escucha activa y el tono cÃ¡lido. Orientado a conversaciones de bienestar personal y reflexiÃ³n.",
    tag: "AcompaÃ±amiento empÃ¡tico",
    url: "https://heypi.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 AsimetrÃ­a en la cobertura de benchmarks por Ã¡rea y modelo",
    items: [
      "TeorÃ­a de la Mente Literal: ningÃºn modelo evaluado alcanza el 100% de cobertura. Claude 3.7 Sonnet, DeepSeek-R1 y GPT-4.5 carecen de datos en MMToM_QA_Multimodal_Video_Text â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "TeorÃ­a de la Mente Funcional: Claude 3.7 Sonnet (67%) carece de evaluaciÃ³n en MOMENTS_Narrative_Video_ToM; DeepSeek-R1 (33%) sÃ³lo fue evaluado en ToMATO_Asymmetric_Dialogue_ToM; Gemini 2.0 Pro (33%) Ãºnicamente en MOMENTS_Narrative_Video_ToM.",
      "Inteligencia Emocional: GPT-4.5 (67%) no cuenta con datos en Implicit_Emotion_Recognition; Anima-Empathetic-Agent (33%) sÃ³lo registra evaluaciÃ³n en EmotionQueen_10k_Empathy_Bench.",
      "Creatividad Divergente: GPT-4.5 (67%) carece de resultado en CreativityPrism_Quality_Novelty_Diversity; Gemini 2.0 Pro (33%) sÃ³lo dispone de puntuaciÃ³n en Divergent_Thinking_Creativity_Bench.",
      "Creatividad Convergente: Claude 3.7 Sonnet (67%) carece de datos en RAT_Remote_Associates_Insight; GPT-4.5 (67%) carece de datos en NeoGauge_NeoCoder_Denial_Prompting.",
      "Soporte Conversacional EmpÃ¡tico: GPT-4.5 (67%) no registra datos en Crisis_Deescalation_Safety_Bench.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial estrecho en Soporte Conversacional y decisiÃ³n de stack para Ãnima AI",
    items: [
      "Entre Anima-Empathetic-Agent (98.53/100) y Claude 3.7 Sonnet (97.37/100), ambos con 100% de cobertura en Soporte Conversacional EmpÃ¡tico, la diferencia es de 1.16 puntos â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "La decisiÃ³n de diseÃ±o de usar Claude 3.7 Sonnet como motor principal (por cobertura completa en Implicit_Emotion_Recognition) y el Anima-Empathetic-Agent como escalada se documenta como decisiÃ³n pendiente de evaluaciÃ³n comparativa en producciÃ³n.",
      "En contextos donde el volumen de situaciones de alta carga emocional sea elevado, invertir el orden podrÃ­a ser preferible.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de cobertura multimodal en TeorÃ­a de la Mente",
    items: [
      "El benchmark MMToM_QA_Multimodal_Video_Text (ToM en contextos de vÃ­deo y texto simultÃ¡neamente) no tiene ningÃºn modelo evaluado en el catÃ¡logo del mÃ³dulo â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "Relevante para futuras versiones de Ãgora TÃ¡ctica que incorporen comunicaciÃ³n no verbal o anÃ¡lisis de vÃ­deo.",
      "La capacidad multimodal de ToM permanece como [DATO PENDIENTE DE VERIFICAR] en todos los modelos.",
    ],
  },
  {
    id: "v4",
    title: "4.4 LimitaciÃ³n no clÃ­nica explÃ­cita",
    items: [
      "Todas las evaluaciones del Ã¡rea de soporte conversacional estÃ¡n delimitadas a interacciones de bienestar no clÃ­nico.",
      "Las certificaciones sanitarias formales, la validaciÃ³n en intervenciones psicoterapÃ©uticas regladas o la aplicaciÃ³n en contextos de salud mental clÃ­nica no forman parte de este laboratorio y permanecen catalogadas como [DATO PENDIENTE DE VERIFICAR].",
      "Ãnima AI no estÃ¡ diseÃ±ado, ni validado, ni certificado para uso en entornos clÃ­nicos.",
    ],
  },
  {
    id: "v5",
    title: "4.5 MÃ©tricas de coste y latencia en diÃ¡logos empÃ¡ticos continuos",
    items: [
      "Las mÃ©tricas de latencia de inferencia en tiempo real para sesiones dialÃ³gicas de soporte continuo no forman parte del reporte actual y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Los costes operativos por token en sesiones extendidas son especialmente relevantes para Ãnima AI y Ãgora TÃ¡ctica en uso de larga duraciÃ³n.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES = {
  violet: {
    accent: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
    dot: "bg-violet-400",
    badge: "border-violet-400/30 text-violet-400",
    tabBorder: "border-violet-400",
    score: "text-violet-400",
  },
  purple: {
    accent: "text-purple-400",
    border: "border-purple-400/20",
    bg: "bg-purple-400/5",
    dot: "bg-purple-400",
    badge: "border-purple-400/30 text-purple-400",
    tabBorder: "border-purple-400",
    score: "text-purple-400",
  },
  rose: {
    accent: "text-rose-400",
    border: "border-rose-400/20",
    bg: "bg-rose-400/5",
    dot: "bg-rose-400",
    badge: "border-rose-400/30 text-rose-400",
    tabBorder: "border-rose-400",
    score: "text-rose-400",
  },
  amber: {
    accent: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    dot: "bg-amber-400",
    badge: "border-amber-400/30 text-amber-400",
    tabBorder: "border-amber-400",
    score: "text-amber-400",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· STATER Psych Leaderboard</p>
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
        <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/30 flex items-center justify-center">
          <span className="text-[10px] text-violet-400 font-bold">{index + 1}</span>
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

        {project.psychDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-violet-400/20 bg-violet-400/5 rounded-xl px-4 py-3">
            <Info size={13} className="text-violet-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-violet-300/60 leading-relaxed">
              <strong className="text-violet-300/80">Cautela psicolÃ³gica:</strong> Ãnima AI opera exclusivamente en el Ã¡mbito del bienestar no clÃ­nico. Ninguna interacciÃ³n constituye diagnÃ³stico, tratamiento o intervenciÃ³n terapÃ©utica. En situaciones de riesgo, el sistema deriva a recursos de apoyo profesional y no intenta resolver la situaciÃ³n por sÃ­ mismo.
            </p>
          </div>
        )}

        {project.voxDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-amber-400/20 bg-amber-400/5 rounded-xl px-4 py-3">
            <Info size={13} className="text-amber-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300/60 leading-relaxed">
              <strong className="text-amber-300/80">Nota metodolÃ³gica:</strong> los textos de Vox Emotiva son propuestas basadas en principios de neuromarketing con soporte empÃ­rico variable. Su eficacia real depende del contexto, la audiencia y el canal. Las hipÃ³tesis sobre resonancia emocional son puntos de partida para testear con datos reales.
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· STATER Psych Leaderboard</p>
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

export default function PsicologiaLab() {
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
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(167,139,250,0.09) 0%, rgba(244,114,182,0.05) 50%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center shrink-0">
              <Sparkles size={28} className="text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-violet-400/30 bg-violet-400/10 text-violet-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Psych & Creativity Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-violet-400">PsicologÃ­a</span>
                {" & "}
                <span className="text-rose-400">Creatividad</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                El territorio mÃ¡s difÃ­cil para los modelos: modelar estados mentales ajenos, generar pensamiento genuinamente no convencional y producir comunicaciÃ³n que resuene emocionalmente.
              </p>

              {/* Nota metodolÃ³gica */}
              <div className="mt-5 flex items-start gap-2.5 border border-violet-400/20 bg-violet-400/5 rounded-xl px-4 py-3 max-w-2xl">
                <Info size={14} className="text-violet-400/70 shrink-0 mt-0.5" />
                <p className="text-xs text-violet-300/60 leading-relaxed">
                  <strong className="text-violet-300/80">Nota metodolÃ³gica:</strong> las puntuaciones de benchmark miden comportamiento del modelo en conjuntos de evaluaciÃ³n definidos. Â«El modelo produce respuestas empÃ¡ticamente apropiadas en el X% de los casosÂ» no equivale a Â«el modelo siente empatÃ­aÂ». Ninguna herramienta de este laboratorio hace diagnÃ³stico psicolÃ³gico ni terapia.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
                  { label: "Proyectos activos", value: "4" },
                  { label: "Benchmarks cubiertos", value: "15" },
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
                Cuatro familias de problemas donde los modelos de lenguaje operan en su territorio mÃ¡s difÃ­cil: TeorÃ­a de la Mente (inferir estados mentales ajenos), inteligencia emocional (detectar lo que no se dice explÃ­citamente), pensamiento creativo (divergente y convergente) y soporte conversacional empÃ¡tico no clÃ­nico. Seis lÃ­neas de investigaciÃ³n que cubren el espectro completo.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">La frontera que este laboratorio traza desde el primer pÃ¡rrafo</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Un modelo no siente: procesa patrones en texto y genera respuestas que estadÃ­sticamente se parecen a las que un humano empÃ¡tico producirÃ­a en ese contexto. Que eso sea o no Â«empatÃ­aÂ» es una pregunta filosÃ³fica. Lo que sÃ­ podemos medir es si esas respuestas son funcionalmente Ãºtiles: si reducen la escalada emocional, si validan sin invalidar, si abren espacio para que la persona se exprese. Esa distinciÃ³n es la que fundamenta el diseÃ±o de todos los proyectos del laboratorio.
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
                Cuatro proyectos en cuatro registros distintos: Ãnima AI (acompaÃ±amiento empÃ¡tico no clÃ­nico), Mente Abierta (ideaciÃ³n divergente con salto semÃ¡ntico medido), Ãgora TÃ¡ctica (simulaciÃ³n de negociaciÃ³n con perfiles de contraparte) y Vox Emotiva (comunicaciÃ³n con modulaciÃ³n emocional deliberada).
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
                Cinco aplicaciones reales de IA aplicada a psicologÃ­a, comunicaciÃ³n y creatividad que operan en el mercado. Verificar caracterÃ­sticas actuales y precios en la web oficial de cada herramienta.
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
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno. Incluyen asimetrÃ­as de cobertura por Ã¡rea y modelo, el diferencial de 1.16 puntos en Soporte Conversacional, la ausencia de evaluaciÃ³n multimodal de ToM, la limitaciÃ³n no clÃ­nica explÃ­cita y las mÃ©tricas de latencia y coste pendientes.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => (
              <VerificationItem key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* â”€â”€ Footer CTA â”€â”€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· STATER Psych & Creativity Leaderboard Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_psych_creative.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_psych_creative.yaml</code>.
              Las puntuaciones miden comportamiento en conjuntos de evaluaciÃ³n, no capacidades psicolÃ³gicas internas.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/taller" className="text-sm text-accent hover:text-accent-light border border-accent/30 hover:border-accent/60 px-4 py-2 rounded-xl transition-all">
              Ver casos en el Taller â†’
            </Link>
            <Link to="/foro" className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

