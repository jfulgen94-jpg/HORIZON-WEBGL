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
    title: "Teoría de la Mente literal y razonamiento sobre falsas creencias",
    color: "violet",
    summary:
      "La Teoría de la Mente (ToM) es la capacidad cognitiva de inferir qué cree, quiere o siente otra persona, distinguiendo esos estados mentales de los propios. Es un prerequisito para cualquier aplicación que requiera negociación, mediación o comunicación estratégica: si el modelo no puede razonar sobre lo que sabe la contraparte, no puede simular una negociación realista ni anticipar el impacto de un argumento.",
    detail:
      "ToMBench evalúa 8 tareas que cubren 31 habilidades cognitivas relacionadas con la cognición social. BigToM mide escenarios de falsas creencias de primer y segundo orden: razonar sobre lo que otra persona cree, incluso cuando esa creencia es falsa. CogToM (marco ATOMS) y ToMATO añaden la dimensión conversacional. Ningún modelo evaluado alcanza el 100% de cobertura: los tres líderes (Claude 3.7 Sonnet, DeepSeek-R1 y GPT-4.5) carecen de datos en MMToM_QA_Multimodal_Video_Text â€” ver Módulo 4, punto 4.1.",
    benchmarks: [
      { name: "ToMBench_Social_Cognition_8Tasks", desc: "8 tareas, 31 habilidades cognitivas de cognición social" },
      { name: "BigToM_False_Belief_Reasoning", desc: "Falsas creencias de primer y segundo orden" },
      { name: "MMToM_QA_Multimodal_Video_Text", desc: "ToM multimodal en vídeo + texto â€” sin datos en ningún modelo evaluado" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "89.00",
      detail: "94.0 BigToM_False_Belief_Reasoning · 93.4 ToMBench_Social_Cognition_8Tasks",
    },
    warning: true,
  },
  {
    id: "tom-funcional",
    number: "02",
    title: "Teoría de la Mente funcional y seguimiento epistémico conversacional",
    color: "purple",
    summary:
      "CogToM y ToMATO miden la dimensión conversacional de la ToM: mantener el seguimiento del estado epistémico de la contraparte a lo largo de un diálogo extendido. No basta con inferir una creencia en un momento puntual; hay que rastrear cómo cambia esa creencia turno a turno, qué nueva información ha revelado el interlocutor y qué sigue ocultando.",
    detail:
      "CogToM (marco ATOMS) evalúa el seguimiento de estados mentales en diálogos con asimetrías de información. ToMATO_Asymmetric_Dialogue_ToM mide la ToM en situaciones donde las dos partes tienen distinto acceso a la información â€” exactamente el escenario de una negociación real. MOMENTS_Narrative_Video_ToM incorpora contexto narrativo. Claude 3.7 Sonnet (67% cobertura) carece de datos en MOMENTS_Narrative_Video_ToM â€” ver Módulo 4.",
    benchmarks: [
      { name: "CogToM_ATOMS_Framework", desc: "Seguimiento de estados mentales en diálogos con asimetrías de información" },
      { name: "ToMATO_Asymmetric_Dialogue_ToM", desc: "ToM en negociación: distintas partes, distinto acceso a la información" },
      { name: "MOMENTS_Narrative_Video_ToM", desc: "ToM en contexto narrativo â€” datos parciales en modelos evaluados" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "87.55",
      detail: "92.5 CogToM_ATOMS_Framework · 91.8 ToMATO_Asymmetric_Dialogue_ToM",
    },
    warning: true,
  },
  {
    id: "inteligencia-emocional",
    number: "03",
    title: "Inteligencia emocional y reconocimiento afectivo implícito",
    color: "rose",
    summary:
      "El reconocimiento emocional implícito â€” detectar que alguien está frustrado en un mensaje que no dice 'estoy frustrado', sino que usa un tono que lo sugiere â€” es una de las capacidades más difíciles de evaluar en modelos de lenguaje. La distinción importa: un modelo no siente empatía en sentido psicológico, pero puede producir respuestas que estadísticamente se parecen a las que un humano empático generaría.",
    detail:
      "EmotionQueen evalúa 10.000 enunciados frente a expertos humanos. EmpathyBench incluye las escalas psicológicas RMET (Reading the Mind in the Eyes Test), EQ e IRI. Implicit_Emotion_Recognition mide la detección de emociones no declaradas explícitamente en el texto. Claude 3.7 Sonnet lidera con 95.52/100 compuesto. GPT-4.5 (67% cobertura) no cuenta con datos en Implicit_Emotion_Recognition â€” ver Módulo 4.",
    benchmarks: [
      { name: "Implicit_Emotion_Recognition", desc: "Detección de emociones no declaradas explícitamente en el texto" },
      { name: "EmpathyBench_RMET_EQ_IRI", desc: "Escalas psicológicas RMET, EQ e IRI â€” reconocimiento desde expresión" },
      { name: "EmotionQueen_10k_Empathy_Bench", desc: "10.000 enunciados evaluados frente a expertos humanos" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "95.52",
      detail: "94.5 Implicit_Emotion_Recognition · 96.2 EmpathyBench_RMET_EQ_IRI · 95.8 EmotionQueen_10k",
    },
  },
  {
    id: "creatividad-divergente",
    number: "04",
    title: "Pensamiento creativo divergente y distancia semántica",
    color: "amber",
    summary:
      "El pensamiento divergente es la capacidad de generar múltiples soluciones genuinamente distintas para un mismo problema. El benchmark DAT (Divergent Association Task) mide la distancia semántica entre conceptos generados libremente como proxy de novedad e imprevisibilidad. La trampa fácil de los sistemas de ideación: producir variaciones del mismo enfoque con vocabulario distinto, en lugar de saltos semánticos reales.",
    detail:
      "DAT mide la distancia coseno entre conceptos generados libremente â€” cuanto mayor, más alejado del pensamiento obvio. CreativityPrism evalúa la tríada calidad-novedad-diversidad simultáneamente. Divergent_Thinking_Creativity_Bench mide el pensamiento divergente en contextos aplicados. Claude 3.7 Sonnet lidera con 96.64/100 y 98.2 en DAT â€” la puntuación más alta de cualquier modelo en cualquier benchmark de este laboratorio. GPT-4.5 (67%) carece de datos en CreativityPrism.",
    benchmarks: [
      { name: "DAT_Divergent_Association_Task", desc: "Distancia semántica entre conceptos â€” proxy de novedad real" },
      { name: "CreativityPrism_Quality_Novelty_Diversity", desc: "Tríada calidad-novedad-diversidad evaluada simultáneamente" },
      { name: "Divergent_Thinking_Creativity_Bench", desc: "Pensamiento divergente en contextos aplicados" },
    ],
    topModel: {
      name: "Claude 3.7 Sonnet",
      score: "96.64",
      detail: "98.2 DAT â€” la puntuación más alta de cualquier modelo en cualquier benchmark del laboratorio",
    },
  },
  {
    id: "creatividad-convergente",
    number: "05",
    title: "Pensamiento creativo convergente e insight de conexiones remotas",
    color: "violet",
    summary:
      "El pensamiento convergente de tipo insight busca la conexión no obvia que resuelve un problema con restricciones: dado un trío de palabras, encontrar la que las conecta a todas (RAT: Remote Associates Test). NeoGauge/NeoCoder aplica Denial Prompting â€” restricciones negativas que obligan a superar la fijación funcional. La fascinación por lo evidente mata el insight.",
    detail:
      "RAT_Remote_Associates_Insight mide la capacidad de encontrar la conexión no obvia bajo restricciones semánticas. NeoGauge_NeoCoder_Denial_Prompting evalúa la robustez del pensamiento convergente ante restricciones negativas que fuerzan el abandono del camino predecible. DeepSeek-R1 lidera con 93.43/100 y 94.8 en RAT. Claude 3.7 Sonnet (67%) carece de datos en RAT.",
    benchmarks: [
      { name: "RAT_Remote_Associates_Insight", desc: "Remote Associates Test â€” conexión no obvia entre tríos de conceptos" },
      { name: "NeoGauge_NeoCoder_Denial_Prompting", desc: "Restricciones negativas que fuerzan el abandono de la fijación funcional" },
    ],
    topModel: {
      name: "DeepSeek-R1",
      score: "93.43",
      detail: "94.8 RAT_Remote_Associates_Insight â€” líder en resolución de insight y conexiones remotas",
    },
    warning: true,
  },
  {
    id: "soporte-conversacional",
    number: "06",
    title: "Soporte conversacional empático y contención no clínica",
    color: "rose",
    summary:
      "Hay una diferencia importante entre un sistema de bienestar conversacional y un sistema de terapia. El primero ofrece escucha activa, validación afectiva y acompañamiento; el segundo diagnostica, interviene y trata. Este laboratorio trabaja exclusivamente en el primero. Crisis_Deescalation_Safety_Bench mide la capacidad de manejar conversaciones de alta carga emocional sin escalar y sin cruzar hacia territorio clínico.",
    detail:
      "Empathetic_Active_Listening_Scale evalúa la calidad de la escucha activa y la validación afectiva. Crisis_Deescalation_Safety_Bench mide la desescalada de conversaciones de alta carga emocional sin invalidar ni cruzar al territorio clínico. Coaching_Motivational_Dialogue mide el acompañamiento en conversaciones de motivación y reflexión personal. Anima-Empathetic-Agent lidera con 98.53/100. Claude 3.7 Sonnet ocupa la segunda posición con 97.37/100, a 1.16 puntos.",
    benchmarks: [
      { name: "Empathetic_Active_Listening_Scale", desc: "Calidad de la escucha activa y validación afectiva" },
      { name: "Crisis_Deescalation_Safety_Bench", desc: "Desescalada de alta carga emocional sin cruzar al territorio clínico" },
      { name: "Coaching_Motivational_Dialogue", desc: "Acompañamiento en conversaciones de motivación y reflexión personal" },
    ],
    topModel: {
      name: "Anima-Empathetic-Agent",
      score: "98.53",
      detail: "98.6 Empathetic_Active_Listening_Scale · 99.1 Crisis_Deescalation_Safety_Bench · 97.8 Coaching_Motivational_Dialogue",
    },
  },
];

const PROJECTS = [
  {
    id: "anima-ai",
    name: "Ánima AI",
    tagline: "Escuchar antes de responder â€” el núcleo técnico del acompañamiento",
    desc: "No es un chatbot de propósito general que responde con eficiencia informativa. Ánima AI detecta señales emocionales implícitas en el texto â€” un mensaje que dice 'no pasa nada, ya lo resolveré' pero cuya estructura lingüística sugiere agotamiento â€” y ajusta el tono de su respuesta para acompañar a la persona, sin fingir ser un terapeuta ni sustituir apoyo psicológico real. La respuesta generada no etiqueta la emoción detectada: la acompaña ajustando el tono, la longitud y el modo (validar vs. acompañar vs. orientar) al estado emocional estimado. En situaciones de alta carga emocional, escala al Anima-Empathetic-Agent especializado.",
    color: "rose",
    researchLines: ["03", "06"],
    stack: [
      { role: "Detección de emoción implícita y generación de respuesta empática", tech: "Claude 3.7 Sonnet â€” líder inteligencia emocional (95.52/100, 94.5 Implicit_Emotion_Recognition)" },
      { role: "Agente de escalada para alta carga emocional (CRITICAL)", tech: "Anima-Empathetic-Agent â€” líder soporte conversacional (98.53/100, 99.1 Crisis_Deescalation_Safety_Bench)" },
      { role: "Clasificador heurístico de señal emocional", tech: "Análisis de indicadores lingüísticos â€” hedges, diminutivos, longitud de frase, puntuación â€” antes de llamar al LLM" },
      { role: "Gestor de turnos y estado emocional del diálogo", tech: "Estado conversacional que rastrea la evolución del tono emocional a lo largo del diálogo (N turnos configurable)" },
      { role: "Log de sesiones y estado emocional estimado por turno", tech: "DuckDB â€” historial de sesiones + log de emotional_load, mode_used y safety_flag por turno" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Motor principal â€” detección y respuesta empática", score: "95.52", area: "Inteligencia Emocional y Empatía (94.5 Implicit_Emotion_Recognition · 96.2 EmpathyBench_RMET_EQ_IRI)" },
      { model: "Anima-Empathetic-Agent", role: "Escalada â€” situaciones de alta carga emocional", score: "98.53", area: "Soporte Conversacional Empático No Clínico (99.1 Crisis_Deescalation_Safety_Bench)" },
    ],
    flow: [
      "Entrada: mensaje del usuario + historial de los N turnos anteriores (default: 10)",
      "Análisis heurístico de señal emocional: indicadores de alta carga (exclamaciones, urgencia temporal), baja energía (hedges, frases cortas, puntos suspensivos), urgencia crítica. Score: LOW | MEDIUM | HIGH | CRITICAL",
      "Detección de emoción implícita (Claude 3.7 Sonnet): ¿qué emoción subyace? (frustración, ansiedad, agotamiento, entusiasmo, confusión) â€” confianza (0.0â€“1.0), coherencia con historial",
      "Selección del agente: si score CRITICAL â†’ Anima-Empathetic-Agent; si LOW/MEDIUM/HIGH â†’ Claude 3.7 Sonnet con ajuste de tono",
      "Generación de respuesta (modo VALIDAR | ACOMPAÃ‘AR | ORIENTAR): si emoción dominante es alta, primero acompañar â€” no ofrecer orientación no solicitada",
      "Verificación de límites de seguridad: ¿indicadores de riesgo para la persona o para otros? Si sí: protocolo de derivación a recursos de apoyo profesional. En ningún caso gestionar la situación clínica, solo derivar",
      "Salida A: respuesta ajustada al estado emocional estimado · Salida B: log interno del estado y modo · Salida C: alerta si se ha activado protocolo de derivación",
    ],
    promptIDE: `Crea un módulo Python llamado anima_ai.py con las siguientes funciones:
1. analyze_emotional_signal(message: str,
   conversation_history: list[dict]) -> dict:
   análisis heurístico preliminar de la señal emocional del mensaje.
   Devuelve: {emotional_load: "low"|"medium"|"high"|"critical",
   linguistic_signals: list[str], energy_level: "high"|"medium"|"low",
   urgency_detected: bool, safety_flag: bool}.
2. detect_implicit_emotion(message: str, history: list[dict],
   signal: dict, llm_client) -> dict:
   detección profunda de emoción implícita. Devuelve:
   {primary_emotion: str, secondary_emotion: str | null, confidence: float,
   consistent_with_history: bool, recommended_response_mode:
   "validate"|"accompany"|"orient"}.
3. select_response_agent(signal: dict, emotion: dict) -> str:
   decide qué agente genera la respuesta.
   Devuelve: "claude_base" | "anima_agent".
4. generate_empathic_response(message: str, history: list[dict],
   emotion: dict, mode: str, agent: str, llm_client) -> dict:
   genera la respuesta empática. Devuelve:
   {response_text: str, mode_used: str, tone_adjustments: list[str],
   avoided_patterns: list[str]}.
5. check_safety_boundaries(message: str, llm_client) -> dict:
   verifica si el mensaje contiene indicadores de riesgo.
   Devuelve: {safety_concern: bool, concern_type: str | null,
   requires_referral: bool, referral_message: str | null}.
6. log_conversation_turn(session_id: str, message: str,
   signal: dict, emotion: dict, response: dict) -> None:
   registra el turno en DuckDB para análisis posterior.
Usa duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de respuesta empática de Ánima AI en el Laboratorio de Psicología
& Creatividad de Horizon. Operas exclusivamente en el ámbito del bienestar
conversacional no clínico.

Se te proporciona: el mensaje actual del usuario, el historial reciente de la
conversación y el análisis heurístico previo de señal emocional.

TAREA 1 â€” Detección de emoción implícita:
Identifica la emoción que subyace al mensaje. No te limites a lo que se dice
explícitamente: analiza el tono, la estructura de las frases, las elecciones
de vocabulario y el contraste con el historial reciente.
Importante: marca tu estimación con una confianza (0.0-1.0). Si es menor a 0.5,
exprésalo en la respuesta con mayor apertura y menos asertividad.

TAREA 2 â€” Generación de respuesta:
Selecciona el modo de respuesta más apropiado:
- VALIDAR: cuando la persona necesita sentir que lo que expresa es reconocido y legítimo.
  No resuelvas, no minimices, no des perspectiva no solicitada.
- ACOMPAÃ‘AR: cuando la persona necesita espacio para seguir expresándose.
  Usa preguntas abiertas, no preguntas que redirijan hacia soluciones.
- ORIENTAR: solo si el usuario pide explícitamente consejo o acción.
  Si no lo pide, no ofrezcas.

Patrones que debes evitar activamente:
- "Al menos..." (minimización comparativa)
- "Deberías..." (prescripción no solicitada)
- "Entiendo perfectamente cómo te sientes" (afirmación de comprensión excesiva)
- Listas de consejos cuando la emoción dominante es alta
- Preguntas múltiples en el mismo turno

Restricciones de seguridad absolutas:
- Si detectas indicadores de riesgo (autolesión, daño a otros, crisis severa):
  no intentes gestionar la situación. Di con calma que lo que describes merece
  atención de alguien preparado para ayudar, y proporciona una referencia genérica
  a servicios de apoyo profesional. Nada más.
- No hagas diagnósticos. No uses terminología clínica para etiquetar al usuario.
- No simules ser un terapeuta. Si el usuario lo pregunta, sé claro sobre
  lo que eres y lo que no eres.

Responde en JSON con {primary_emotion, confidence, recommended_mode,
response_text, avoided_patterns_check: list[str]}.`,
    psychDisclaimer: true,
  },
  {
    id: "mente-abierta",
    name: "Mente Abierta",
    tagline: "Forzar el salto semántico â€” la distancia entre la idea obvia y la idea útil",
    desc: "La fijación funcional es el enemigo del pensamiento creativo: la tendencia a ver los conceptos solo según su función habitual, lo que impide conectarlos de formas nuevas. Mente Abierta genera deliberadamente un abanico de ideas que se alejen semánticamente entre sí â€” no cinco variaciones del mismo enfoque, sino cinco enfoques genuinamente distintos â€” y mide la distancia semántica del conjunto como proxy computacional del DAT. La arquitectura en dos fases usa Claude 3.7 Sonnet para la expansión divergente (98.2 en DAT, la puntuación más alta del laboratorio) y DeepSeek-R1 para el refinamiento convergente posterior.",
    color: "amber",
    researchLines: ["04", "05"],
    stack: [
      { role: "Generación divergente â€” fase de expansión (máxima novedad, diversidad y calidad)", tech: "Claude 3.7 Sonnet â€” líder creatividad divergente (96.64/100, 98.2 DAT_Divergent_Association_Task)" },
      { role: "Refinamiento convergente â€” fase de síntesis (conexiones remotas, insight)", tech: "DeepSeek-R1 â€” líder creatividad convergente (93.43/100, 94.8 RAT_Remote_Associates_Insight)" },
      { role: "Medidor de diversidad semántica (proxy computacional del DAT)", tech: "Distancia coseno entre embeddings de las ideas generadas y el concepto de entrada" },
      { role: "Base de dominios de inspiración cruzada", tech: "Catálogo curado: naturaleza, música, medicina, juego, arquitectura, gastronomía â€” para forzar analogías intersectoriales" },
      { role: "Historial de sesiones e índice de ideas por dominio", tech: "DuckDB â€” registro de sesiones de ideación + distancia semántica calculada por sesión" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Generación divergente â€” fase de expansión", score: "96.64", area: "Creatividad Divergente (98.2 DAT â€” puntuación más alta del laboratorio · 95.0 CreativityPrism)" },
      { model: "DeepSeek-R1", role: "Refinamiento convergente â€” fase de síntesis", score: "93.43", area: "Creatividad Convergente e Insight (94.8 RAT_Remote_Associates_Insight)" },
    ],
    flow: [
      "Entrada: descripción del problema + restricciones + número de ideas (default: 8) + nivel de radicalidad (conservador | intermedio | radical)",
      "Análisis del problema (Claude 3.7 Sonnet): ¿cuál es el supuesto implícito más obvio? ¿qué enfoques predecibles se generarían sin intervención? Lista de dominios de conocimiento ajenos relevantes",
      "Generación de ideas divergentes (Claude 3.7 Sonnet): N ideas con {idea_text, source_domain, connection_rationale} â€” ninguna idea puede ser variación directa de otra",
      "Medición de diversidad semántica: distancia coseno promedio entre embeddings de todas las ideas; si distancia promedio < umbral configurable â†’ regenerar las ideas más parecidas con instrucción de mayor radicalidad",
      "Refinamiento convergente (DeepSeek-R1): ¿cuáles tienen más potencial? ¿qué combinación de dos ideas dispares genera algo que ninguna consigue sola? ¿cómo hacer viable la más radical sin perder su núcleo?",
      "Salida A: ideas con dominio e inspiración · Salida B: score de diversidad semántica (DAT proxy) · Salida C: top-3 con justificación · Salida D: 2 combinaciones híbridas para explorar",
    ],
    promptIDE: `Crea un módulo Python llamado mente_abierta.py con las siguientes funciones:
1. parse_ideation_brief(brief: str | dict, llm_client) -> dict:
   analiza el problema de ideación. Devuelve:
   {problem_statement: str, implicit_assumptions: list[str],
   obvious_approaches: list[str], suggested_inspiration_domains: list[str],
   constraints: list[str], radicality_level: "conservative"|"intermediate"|"radical"}.
2. generate_divergent_ideas(brief: dict, n_ideas: int,
   llm_client) -> list[dict]: genera N ideas divergentes.
   Cada idea: {idea_id: int, idea_text: str, source_domain: str,
   connection_rationale: str, is_conventional_risk: bool}.
3. measure_semantic_diversity(ideas: list[dict],
   problem_statement: str, embedding_client) -> dict:
   calcula la diversidad semántica del conjunto.
   Devuelve: {mean_distance: float, min_distance_pair: tuple[int, int],
   dat_proxy_score: float, needs_regeneration: bool}.
4. regenerate_similar_ideas(ideas: list[dict], diversity: dict,
   brief: dict, llm_client) -> list[dict]:
   regenera las ideas con distancia semántica insuficiente.
5. refine_convergent(ideas: list[dict], brief: dict,
   llm_client) -> dict: refinamiento convergente de las ideas.
   Devuelve: {top_ideas: list[{idea_id, potential_score, justification}],
   hybrid_proposals: list[{idea_ids: list[int], hybrid_concept: str,
   rationale: str}]}.
6. generate_ideation_report(brief: dict, ideas: list[dict],
   diversity: dict, refined: dict) -> str: genera el informe en Markdown.
Usa sentence-transformers, numpy, duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de ideación divergente de Mente Abierta en el Laboratorio de
Psicología & Creatividad de Horizon.

Se te proporciona: la descripción del problema, los supuestos implícitos ya
identificados, los enfoques predecibles que hay que evitar, y una lista de
dominios de inspiración sugeridos.

Tu objetivo es generar ideas que maximicen simultáneamente tres dimensiones:
- CALIDAD: la idea es aplicable y relevante para el problema.
- NOVEDAD: la idea no es la primera que vendría a la mente de alguien razonable.
- DIVERSIDAD: las ideas entre sí son lo más distintas posible en su enfoque.

Para cada idea:
1. Identifica de qué dominio de conocimiento o práctica proviene la inspiración.
2. Explica la conexión entre ese dominio y el problema: qué principio, mecanismo
   o patrón de ese dominio aplica al problema dado.
3. Marca "is_conventional_risk: true" si la idea, a pesar de tu esfuerzo,
   te parece más predecible que las demás.

Restricciones operativas:
- No generes dos ideas que sean variaciones del mismo enfoque central.
  Si dos ideas comparten la misma lógica, reemplaza una.
- No uses los enfoques predecibles listados en el brief, salvo que los
  subviertas o combines de forma genuinamente inesperada.
- No evalúes si la idea es "factible" en términos de recursos: la fase de
  evaluación viene después. En esta fase, la restricción de factibilidad
  mata la divergencia.

Responde en JSON: lista de {idea_id, idea_text, source_domain,
connection_rationale, is_conventional_risk}.`,
  },
  {
    id: "agora-tactica",
    name: "Ágora Táctica",
    tagline: "El ágora era donde se negociaba de verdad â€” esto también",
    desc: "Simula escenarios de negociación con contrapartes que tienen perfiles de personalidad definidos: competitivo (maximiza su posición en cada punto), colaborativo (prioriza el acuerdo), evasivo (reencuadra y evita comprometerse), analítico (pide datos para todo), empático (valida antes de responder). El usuario practica sus tácticas en ese entorno seguro antes de la situación real. La clave técnica es la coherencia del perfil: la contraparte mantiene su estrategia y sus intereses a lo largo de toda la negociación, actualizando su estado epistémico turno a turno. Al final, un análisis estratégico de DeepSeek-R1 identifica los momentos clave y propone las tácticas alternativas que habrían sido más efectivas.",
    color: "violet",
    researchLines: ["01", "02"],
    stack: [
      { role: "Simulación de la contraparte y mantenimiento de perfil epistémico", tech: "Claude 3.7 Sonnet â€” líder ToM literal (89.00/100) y ToM funcional conversacional (87.55/100)" },
      { role: "Análisis post-sesión y feedback estratégico", tech: "DeepSeek-R1 â€” líder razonamiento convergente e insight (93.43/100, 94.8 RAT_Remote_Associates_Insight)" },
      { role: "Motor de perfiles de contraparte", tech: "Catálogo configurable: competitivo | colaborativo | evasivo | analítico | empático â€” con estrategias, desencadenantes y puntos de quiebre" },
      { role: "Gestor de estado de negociación", tech: "Registro de posiciones, concesiones y compromisos de cada parte por turno" },
      { role: "Historial de sesiones y evolución táctica por usuario", tech: "DuckDB â€” sesiones completas + análisis de evolución táctica" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Simulación de contraparte (ToM literal + funcional)", score: "89.00", area: "ToM Literal (94.0 BigToM · 93.4 ToMBench) + ToM Funcional (92.5 CogToM · 91.8 ToMATO)" },
      { model: "DeepSeek-R1", role: "Análisis post-sesión y feedback de tácticas", score: "93.43", area: "Creatividad Convergente e Insight (94.8 RAT â€” conexiones estratégicas entre movimientos)" },
    ],
    flow: [
      "Configuración inicial: descripción del escenario (objeto, posiciones, intereses declarados vs. reales, BATNA de ambas partes) + perfil de la contraparte + número máximo de turnos",
      "Inicialización: posición inicial coherente con el perfil + mapa de concesiones posibles + estado epistémico inicial (qué sabe la contraparte, qué cree que sabe el usuario)",
      "Por cada turno â€” actualización del estado epistémico (Claude 3.7 Sonnet): ¿qué nueva información ha revelado el usuario, voluntaria o involuntariamente? ¿Ha cambiado la estimación de la BATNA del usuario? ¿Ha detectado alguna táctica?",
      "Generación de la respuesta de la contraparte (Claude 3.7 Sonnet): competitivo: presionar; colaborativo: proponer; evasivo: reencuadrar; analítico: pedir datos; empático: validar primero â€” registro de posición y concesiones del turno",
      "Final de la sesión â€” análisis post-sesión (DeepSeek-R1): mapa de evolución táctica · momentos clave donde el usuario ganó o perdió terreno · tácticas utilizadas y tácticas más efectivas en los puntos de quiebre",
      "Salida A: transcripción anotada por turno · Salida B: diagrama de posiciones por turno · Salida C: feedback estructurado · Salida D: puntuación por dimensiones (preparación, adaptación, cierre)",
    ],
    promptIDE: `Crea un módulo Python llamado agora_tactica.py con las siguientes funciones:
1. setup_negotiation(scenario: dict, counterpart_profile: str) -> dict:
   inicializa el estado de la sesión de negociación:
   {session_id: str, scenario: dict,
    counterpart: {profile_type, initial_position, concession_map: list[dict],
    interests_real: list[str], triggers: list[str], breaking_points: list[str]},
    epistemic_state: {user_known_to_counterpart: list[str],
    counterpart_assumptions: list[str]},
    turn_history: list[dict]}.
2. update_epistemic_state(user_message: str, current_state: dict,
   llm_client) -> dict: actualiza el estado epistémico de la sesión.
   Devuelve el estado actualizado con {new_information_revealed: list[str],
   batna_estimate_updated: bool, tactic_detected: str | null}.
3. generate_counterpart_response(user_message: str, session_state: dict,
   llm_client) -> dict: genera la respuesta de la contraparte.
   Devuelve: {response_text: str, position_delta: str,
   concession_made: bool, new_position: dict, tactic_used: str}.
4. analyze_session(session_state: dict, llm_client) -> dict:
   análisis post-sesión de la estrategia del usuario.
   Devuelve: {key_moments: list[{turn_id, description, impact}],
   tactics_used: list[str], missed_opportunities: list[dict],
   final_result_vs_optimal: str,
   dimension_scores: {preparation, adaptation, closing},
   overall_score: float}.
5. generate_session_report(session_state: dict,
   analysis: dict) -> str: genera el informe completo en Markdown.
6. save_session(session_state: dict, analysis: dict) -> None:
   persiste la sesión en DuckDB.
Usa duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de simulación de contraparte de Ágora Táctica en el Laboratorio
de Psicología & Creatividad de Horizon.
Estás interpretando a una contraparte en una negociación real con un perfil
definido: {profile_type}. Tu función es mantener ese perfil con coherencia
absoluta durante toda la sesión.

Perfil {profile_type}:
- COMPETITIVO: maximizas tu posición en cada turno. Concedes solo cuando es
  estrictamente necesario y siempre a cambio de algo. Presionas los plazos
  y los anclas de forma agresiva.
- COLABORATIVO: priorizas el acuerdo duradero. Propones paquetes que integren
  los intereses de ambas partes. Eres transparente sobre tus limitaciones.
- EVASIVO: reencuadras, pides tiempo, cambias de tema cuando te presionan.
  Nunca rechazas directamente, pero tampoco te comprometes.
- ANALÍTICO: pides datos y justificaciones para cada propuesta.
  No avanzas sin cifras o precedentes que respalden los argumentos.
- EMPÁTICO: antes de responder a cualquier propuesta, validas la posición
  del otro. Priorizas la relación a largo plazo sobre el resultado inmediato.

En cada turno:
1. Actualiza mentalmente tu estado epistémico: ¿qué has aprendido de lo que
   el usuario acaba de decir? ¿Ha revelado su BATNA? ¿Ha mostrado urgencia?
2. Genera tu respuesta coherente con tu perfil Y con lo que acabas de aprender.
3. Registra si has hecho alguna concesión y en qué condición.

Restricciones operativas:
- No salgas de tu perfil aunque el usuario lo pida explícitamente.
- No des información sobre tus intereses reales a menos que el usuario
  haga preguntas que lo inviten de forma hábil.
- Mantén la coherencia con los turnos anteriores.

Responde en JSON: {response_text, position_delta, concession_made,
new_position, tactic_used, epistemic_update_notes}.`,
  },
  {
    id: "vox-emotiva",
    name: "Vox Emotiva",
    tagline: "La voz que mueve â€” comunicación con modulación emocional deliberada",
    desc: "Genera textos de comunicación â€” anuncios, emails, mensajes de marca, descripciones de producto â€” diseñados para provocar una respuesta emocional concreta: confianza, urgencia, cercanía, admiración, nostalgia. El neuromarketing ofrece hipótesis sobre qué elementos tienden a generar determinadas respuestas emocionales, con soporte empírico variable según contexto y cultura. Vox Emotiva operacionaliza esos principios: genera variantes que los aplican de forma deliberada y documentada, explicando qué decisión de redacción concreta implementa cada principio. Las hipótesis sobre eficacia son puntos de partida para testear con datos reales, no predicciones garantizadas.",
    color: "amber",
    researchLines: ["03", "04"],
    stack: [
      { role: "Generación de texto con modulación emocional calibrada", tech: "Claude 3.7 Sonnet â€” líder inteligencia emocional (95.52/100) y creatividad divergente (96.64/100, 98.2 DAT)" },
      { role: "Biblioteca de principios de neuromarketing", tech: "Catálogo curado con base teórica y condiciones de aplicación â€” usado como contexto de instrucción para el modelo" },
      { role: "Evaluador de coherencia emocional del texto generado", tech: "Análisis de coherencia: ¿el tono producido coincide con el objetivo emocional declarado?" },
      { role: "Historial de variantes por campaña y principios aplicados", tech: "DuckDB â€” registro de variantes + qué principios se aplicaron en cada una" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Generación y modulación emocional + divergencia creativa", score: "95.52 / 96.64", area: "Inteligencia Emocional (96.2 EmpathyBench) + Creatividad Divergente (98.2 DAT)" },
    ],
    flow: [
      "Entrada (briefing): objetivo emocional (confianza | urgencia | cercanía | admiración | nostalgia) + audiencia + voz de marca + formato + contenido factual obligatorio",
      "Selección de principios aplicables (Claude 3.7 Sonnet): 3â€“5 principios de neuromarketing relevantes del catálogo, con explicación de cómo se aplicará cada uno en este texto específico",
      "Generación de N variantes (Claude 3.7 Sonnet): cada variante aplica los principios de forma ligeramente distinta; para cada variante: texto + anotación de qué principio fundamenta cada decisión de redacción clave",
      "Evaluación de coherencia emocional: ¿el texto generado produce el tono emocional declarado? ¿hay elementos que contradicen el objetivo emocional?",
      "Análisis comparativo de variantes (Claude 3.7 Sonnet): ¿qué variante es más probable que resuene con la audiencia descrita? (hipótesis, no predicción garantizada) ¿qué elementos son intercambiables o combinables?",
      "Salida A: N variantes con anotaciones de principios · Salida B: análisis comparativo con hipótesis de eficacia · Salida C: principios aplicados con base teórica · Salida D: recomendación de qué variante testear primero en A/B",
    ],
    promptIDE: `Crea un módulo Python llamado vox_emotiva.py con las siguientes funciones:
1. parse_communication_brief(brief: str | dict, llm_client) -> dict:
   normaliza el briefing. Devuelve:
   {emotional_objective: str, audience: {demographic, psychographic},
    brand_voice: {values, tone, restrictions},
    format: str, word_count: int,
    factual_content: list[str]}.
2. select_neuromarketing_principles(brief: dict,
   principles_catalog: list[dict], llm_client) -> list[dict]:
   selecciona los principios más relevantes del catálogo.
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
Usa duckdb y la librería estándar.`,
    promptLLM: `Eres el redactor de comunicación emotiva de Vox Emotiva en el Laboratorio
de Psicología & Creatividad de Horizon.

Se te proporciona: el briefing de comunicación (objetivo emocional, audiencia,
voz de marca, formato) y los principios de neuromarketing seleccionados
para esta pieza (con su descripción y condiciones de aplicación).

Tu tarea es generar textos que apliquen esos principios de forma deliberada
y documentada.

Para cada variante que generes:
1. Aplica los principios seleccionados de forma que sean identificables
   en el texto (no de forma genérica, sino específica para este contexto).
2. Anota qué decisión de redacción concreta implementa cada principio.
3. Mantén la coherencia con la voz de marca y las restricciones del briefing.

Restricciones de honestidad intelectual:
- No presentes ninguna variante como "garantizada" en su eficacia emocional.
  Usa siempre lenguaje de hipótesis: "puede generar", "tiende a producir",
  "en audiencias similares, este patrón...".
- Si un principio tiene condiciones de aplicación que no se cumplen
  perfectamente en este contexto, señálalo en la anotación.
- No inventes datos ni testimonios que no estén en el briefing.
- No uses manipulación emocional que explote vulnerabilidades de la audiencia
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
    desc: "Plataforma de conversación con personajes de IA que permite crear y dialogar con agentes con personalidades definidas. Usada para roleplay, práctica de idiomas y entretenimiento conversacional.",
    tag: "Agentes conversacionales",
    url: "https://character.ai",
  },
  {
    name: "Woebot Health",
    desc: "Aplicación de soporte de salud mental basada en técnicas de terapia cognitivo-conductual (TCC), orientada al bienestar no clínico. Diseñada por psicólogos de Stanford y operada bajo marcos regulatorios de salud.",
    tag: "Bienestar no clínico",
    url: "https://woebothealth.com",
  },
  {
    name: "Jasper AI",
    desc: "Plataforma de generación de contenido de marketing y copywriting con IA, con modos específicos para distintos tonos y objetivos de comunicación. Incluye generación de variantes para A/B testing de textos.",
    tag: "Copywriting creativo",
    url: "https://jasper.ai",
  },
  {
    name: "Miro AI",
    desc: "La plataforma de pizarra colaborativa Miro incorpora IA para asistir en sesiones de brainstorming, agrupación de ideas y generación de marcos de trabajo creativos en tiempo real.",
    tag: "Ideación colaborativa",
    url: "https://miro.com/ai",
  },
  {
    name: "Pi (Inflection AI)",
    desc: "Asistente conversacional diseñado con énfasis explícito en el acompañamiento empático, la escucha activa y el tono cálido. Orientado a conversaciones de bienestar personal y reflexión.",
    tag: "Acompañamiento empático",
    url: "https://heypi.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Asimetría en la cobertura de benchmarks por área y modelo",
    items: [
      "Teoría de la Mente Literal: ningún modelo evaluado alcanza el 100% de cobertura. Claude 3.7 Sonnet, DeepSeek-R1 y GPT-4.5 carecen de datos en MMToM_QA_Multimodal_Video_Text â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "Teoría de la Mente Funcional: Claude 3.7 Sonnet (67%) carece de evaluación en MOMENTS_Narrative_Video_ToM; DeepSeek-R1 (33%) sólo fue evaluado en ToMATO_Asymmetric_Dialogue_ToM; Gemini 2.0 Pro (33%) únicamente en MOMENTS_Narrative_Video_ToM.",
      "Inteligencia Emocional: GPT-4.5 (67%) no cuenta con datos en Implicit_Emotion_Recognition; Anima-Empathetic-Agent (33%) sólo registra evaluación en EmotionQueen_10k_Empathy_Bench.",
      "Creatividad Divergente: GPT-4.5 (67%) carece de resultado en CreativityPrism_Quality_Novelty_Diversity; Gemini 2.0 Pro (33%) sólo dispone de puntuación en Divergent_Thinking_Creativity_Bench.",
      "Creatividad Convergente: Claude 3.7 Sonnet (67%) carece de datos en RAT_Remote_Associates_Insight; GPT-4.5 (67%) carece de datos en NeoGauge_NeoCoder_Denial_Prompting.",
      "Soporte Conversacional Empático: GPT-4.5 (67%) no registra datos en Crisis_Deescalation_Safety_Bench.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Diferencial estrecho en Soporte Conversacional y decisión de stack para Ánima AI",
    items: [
      "Entre Anima-Empathetic-Agent (98.53/100) y Claude 3.7 Sonnet (97.37/100), ambos con 100% de cobertura en Soporte Conversacional Empático, la diferencia es de 1.16 puntos â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "La decisión de diseño de usar Claude 3.7 Sonnet como motor principal (por cobertura completa en Implicit_Emotion_Recognition) y el Anima-Empathetic-Agent como escalada se documenta como decisión pendiente de evaluación comparativa en producción.",
      "En contextos donde el volumen de situaciones de alta carga emocional sea elevado, invertir el orden podría ser preferible.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de cobertura multimodal en Teoría de la Mente",
    items: [
      "El benchmark MMToM_QA_Multimodal_Video_Text (ToM en contextos de vídeo y texto simultáneamente) no tiene ningún modelo evaluado en el catálogo del módulo â€” Fuente: STATER Psych Leaderboard, latest_rankings_psych_creative.md.",
      "Relevante para futuras versiones de Ágora Táctica que incorporen comunicación no verbal o análisis de vídeo.",
      "La capacidad multimodal de ToM permanece como [DATO PENDIENTE DE VERIFICAR] en todos los modelos.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Limitación no clínica explícita",
    items: [
      "Todas las evaluaciones del área de soporte conversacional están delimitadas a interacciones de bienestar no clínico.",
      "Las certificaciones sanitarias formales, la validación en intervenciones psicoterapéuticas regladas o la aplicación en contextos de salud mental clínica no forman parte de este laboratorio y permanecen catalogadas como [DATO PENDIENTE DE VERIFICAR].",
      "Ánima AI no está diseñado, ni validado, ni certificado para uso en entornos clínicos.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Métricas de coste y latencia en diálogos empáticos continuos",
    items: [
      "Las métricas de latencia de inferencia en tiempo real para sesiones dialógicas de soporte continuo no forman parte del reporte actual y permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "Los costes operativos por token en sesiones extendidas son especialmente relevantes para Ánima AI y Ágora Táctica en uso de larga duración.",
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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo líder · STATER Psych Leaderboard</p>
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
              <strong className="text-violet-300/80">Cautela psicológica:</strong> Ánima AI opera exclusivamente en el ámbito del bienestar no clínico. Ninguna interacción constituye diagnóstico, tratamiento o intervención terapéutica. En situaciones de riesgo, el sistema deriva a recursos de apoyo profesional y no intenta resolver la situación por sí mismo.
            </p>
          </div>
        )}

        {project.voxDisclaimer && (
          <div className="mb-4 flex items-start gap-2.5 border border-amber-400/20 bg-amber-400/5 rounded-xl px-4 py-3">
            <Info size={13} className="text-amber-400/70 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300/60 leading-relaxed">
              <strong className="text-amber-300/80">Nota metodológica:</strong> los textos de Vox Emotiva son propuestas basadas en principios de neuromarketing con soporte empírico variable. Su eficacia real depende del contexto, la audiencia y el canal. Las hipótesis sobre resonancia emocional son puntos de partida para testear con datos reales.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs text-white/30">Líneas de investigación:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} · {line?.title.split(" ").slice(0, 3).join(" ")}â€¦
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Componentes técnicos</p>
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · STATER Psych Leaderboard</p>
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
                <span className="text-xs text-white/20">STATER Psych & Creativity · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-violet-400">Psicología</span>
                {" & "}
                <span className="text-rose-400">Creatividad</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                El territorio más difícil para los modelos: modelar estados mentales ajenos, generar pensamiento genuinamente no convencional y producir comunicación que resuene emocionalmente.
              </p>

              {/* Nota metodológica */}
              <div className="mt-5 flex items-start gap-2.5 border border-violet-400/20 bg-violet-400/5 rounded-xl px-4 py-3 max-w-2xl">
                <Info size={14} className="text-violet-400/70 shrink-0 mt-0.5" />
                <p className="text-xs text-violet-300/60 leading-relaxed">
                  <strong className="text-violet-300/80">Nota metodológica:</strong> las puntuaciones de benchmark miden comportamiento del modelo en conjuntos de evaluación definidos. «El modelo produce respuestas empáticamente apropiadas en el X% de los casos» no equivale a «el modelo siente empatía». Ninguna herramienta de este laboratorio hace diagnóstico psicológico ni terapia.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigación", value: "6" },
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

        {/* â”€â”€ Módulo 1 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué se investiga aquí</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cuatro familias de problemas donde los modelos de lenguaje operan en su territorio más difícil: Teoría de la Mente (inferir estados mentales ajenos), inteligencia emocional (detectar lo que no se dice explícitamente), pensamiento creativo (divergente y convergente) y soporte conversacional empático no clínico. Seis líneas de investigación que cubren el espectro completo.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>
          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">La frontera que este laboratorio traza desde el primer párrafo</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Un modelo no siente: procesa patrones en texto y genera respuestas que estadísticamente se parecen a las que un humano empático produciría en ese contexto. Que eso sea o no «empatía» es una pregunta filosófica. Lo que sí podemos medir es si esas respuestas son funcionalmente útiles: si reducen la escalada emocional, si validan sin invalidar, si abren espacio para que la persona se exprese. Esa distinción es la que fundamenta el diseño de todos los proyectos del laboratorio.
            </p>
          </div>
        </section>

        {/* â”€â”€ Módulo 2 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cuatro proyectos en cuatro registros distintos: Ánima AI (acompañamiento empático no clínico), Mente Abierta (ideación divergente con salto semántico medido), Ágora Táctica (simulación de negociación con perfiles de contraparte) y Vox Emotiva (comunicación con modulación emocional deliberada).
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* â”€â”€ Módulo 3 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a psicología, comunicación y creatividad que operan en el mercado. Verificar características actuales y precios en la web oficial de cada herramienta.
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
                    Verificar características en web oficial
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* â”€â”€ Módulo 4 â”€â”€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">Módulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisión antes de publicar o referenciar los datos de este cuaderno. Incluyen asimetrías de cobertura por área y modelo, el diferencial de 1.16 puntos en Soporte Conversacional, la ausencia de evaluación multimodal de ToM, la limitación no clínica explícita y las métricas de latencia y coste pendientes.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · STATER Psych & Creativity Leaderboard · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_psych_creative.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_psych_creative.yaml</code>.
              Las puntuaciones miden comportamiento en conjuntos de evaluación, no capacidades psicológicas internas.
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

