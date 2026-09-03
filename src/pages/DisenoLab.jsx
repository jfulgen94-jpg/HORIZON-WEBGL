import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Palette } from "lucide-react";
import { Cpu } from "lucide-react";
import { GitBranch } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Eye } from "lucide-react";

// —€—€—€ Data —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

const RESEARCH_LINES = [
  {
    id: "visual-reasoning",
    number: "01",
    title: "Comprensión visual y razonamiento multimodal",
    color: "amber",
    summary:
      "Un modelo de visión-lenguaje que analiza una interfaz no solo necesita «ver» los elementos: necesita entender qué representan en su contexto cultural e histórico. Un icono de teléfono de auricular ya no tiene referente físico para la mayoría de los usuarios jóvenes, pero sigue comunicando «llamar» por convención aprendida.",
    detail:
      "Los benchmarks OK-VQA y A-OKVQA miden la capacidad de razonamiento visual que requiere conocimiento del mundo exterior, no solo de los píxeles. VQA con conocimiento externo evalúa si el modelo puede responder preguntas sobre imágenes que exigen conocimiento enciclopédico — condición necesaria para interpretar interfaces correctamente. VistaQA_Visual_Reasoning amplía la cobertura a tareas de razonamiento visual compositivo.",
    benchmarks: [
      { name: "OK-VQA", desc: "VQA con conocimiento del mundo exterior (enciclopédico)" },
      { name: "A-OKVQA", desc: "VQA augmentado con razonamiento externo multimodal" },
      { name: "VistaQA_Visual_Reasoning", desc: "Razonamiento visual compositivo sobre imágenes complejas" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "86.88", detail: "84.8 OK_VQA_Knowledge · 86.4 A_OKVQA_Multimodal · 89.2 VistaQA_Visual_Reasoning" },
  },
  {
    id: "visual-grounding",
    number: "02",
    title: "Evidencia visual y anclaje espacial (Visual Grounding)",
    color: "rose",
    summary:
      "Visual Grounding es la capacidad de un modelo de señalar exactamente dónde en una imagen está el elemento sobre el que razona, expresado como coordenadas de un bounding box. Esta capacidad es crítica para la crítica automatizada de interfaces: no basta con decir «el botón de llamada a la acción tiene poco contraste», hay que señalar exactamente qué botón.",
    detail:
      "El benchmark UI_Element_BBox_Detection mide precisamente esto: dado un nombre de elemento de interfaz, ¿puede el modelo localizar su posición en píxeles? VistaQA_Grounded_Boxes y Toloka_VQA_Grounding evalúan grounding en contextos más amplios. El podio de este área tiene datos para solo 2 modelos, con el tercer puesto pendiente de verificación (ver Módulo 4, punto 4.1).",
    benchmarks: [
      { name: "UI_Element_BBox_Detection", desc: "Localización de elementos de interfaz por bounding box" },
      { name: "VistaQA_Grounded_Boxes", desc: "Grounding visual con coordenadas en preguntas abiertas" },
      { name: "Toloka_VQA_Grounding", desc: "Validación de grounding con anotadores humanos (Toloka)" },
    ],
    topModel: { name: "Gemini 2.0 Pro", score: "89.75", detail: "88.0 VistaQA_Grounded_Boxes · 89.2 Toloka_VQA_Grounding · 92.4 UI_Element_BBox_Detection" },
    warning: true,
  },
  {
    id: "generative-spatial",
    number: "03",
    title: "Diseño generativo de espacios y coherencia estilística",
    color: "emerald",
    summary:
      "La generación de distribuciones espaciales — planos de planta, disposiciones de muebles en un interior, ergonomía de producto en 3D — requiere razonamiento sobre restricciones geométricas, circulaciones y coherencia estilística. El modelo debe proponer distribuciones que sean a la vez funcionales y estilísticamente coherentes.",
    detail:
      "Archigen_Spatial_Layout mide la capacidad de generar layouts arquitectónicos funcionales. Interior_Design_Style_Consistency evalúa si el modelo mantiene coherencia de estilo entre los elementos de un espacio. Product_3D_Ergonomics_Synthesis — el tercer benchmark — tiene cobertura incompleta (ArchiGPT-CAD-Flow y GPT-4.5 carecen de resultado, ver Módulo 4, punto 4.2).",
    benchmarks: [
      { name: "Archigen_Spatial_Layout", desc: "Generación de distribuciones arquitectónicas funcionales" },
      { name: "Interior_Design_Style_Consistency", desc: "Coherencia estilística en diseño de interiores" },
      { name: "Product_3D_Ergonomics_Synthesis", desc: "Síntesis ergonómica de producto en 3D (cobertura incompleta)" },
    ],
    topModel: { name: "ArchiGPT-CAD-Flow", score: "88.40", detail: "Especializado en generación de layouts espaciales y coherencia estilística arquitectónica" },
    warning: true,
  },
  {
    id: "ux-effectiveness",
    number: "04",
    title: "Efectividad de UI/UX en comportamiento real de usuario",
    color: "blue",
    summary:
      "La métrica última del diseño UX no es si una interfaz «parece bien diseñada» a un experto: es si convierte más, si reduce el abandono de carrito, si guía al usuario hasta completar la acción. WiserUI-Bench incluye más de 300 experimentos reales de A/B testing con resultados verificados de tasa de conversión.",
    detail:
      "WiserUI-Bench pregunta al modelo cuál de dos variantes ganó el test de conversión real, y comprueba si acierta. CTA_Visual_Hierarchy_Impact mide el impacto específico de la jerarquía visual en los elementos de llamada a la acción. Checkout_Friction_Reduction evalúa la detección de fricciones en flujos transaccionales. Las puntuaciones aquí son más bajas que en accesibilidad — ver Módulo 4, punto 4.4.",
    benchmarks: [
      { name: "WiserUI_Bench_AB_Winner", desc: "Predicción del ganador en 300+ experimentos A/B reales" },
      { name: "CTA_Visual_Hierarchy_Impact", desc: "Impacto de jerarquía visual en elementos de llamada a la acción" },
      { name: "Checkout_Friction_Reduction", desc: "Detección de puntos de fricción en flujos transaccionales" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "83.33", detail: "93.5 CTA_Visual_Hierarchy_Impact — cobertura parcial, datos en Checkout_Friction_Reduction pendientes" },
    warning: true,
  },
  {
    id: "accessibility",
    number: "05",
    title: "Calidad estética, accesibilidad y diseño funcional",
    color: "amber",
    summary:
      "El estándar WCAG 2.1 define criterios de contraste mínimo de color entre texto y fondo: nivel AA requiere un ratio de contraste de al menos 4.5:1 para texto normal. Eso no es una opinión de estilo: es un estándar verificable algorítmicamente.",
    detail:
      "WCAG_Accessibility_Compliance mide si el modelo puede auditar correctamente el cumplimiento de estos criterios. Visual_Balance_Typography_Ratio mide el equilibrio tipográfico y compositivo de una interfaz — un territorio que mezcla principios medibles (la regla áurea, la retícula de 8px) con criterio estético. Claude 3.7 Sonnet lidera ambos con 96.8 y 94.6 respectivamente.",
    benchmarks: [
      { name: "WCAG_Accessibility_Compliance", desc: "Auditoría de cumplimiento WCAG 2.1 — ratio de contraste y accesibilidad" },
      { name: "Visual_Balance_Typography_Ratio", desc: "Equilibrio tipográfico y compositivo (medible + criterio estético)" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.64", detail: "96.8 WCAG_Accessibility_Compliance · 94.6 Visual_Balance_Typography_Ratio" },
  },
  {
    id: "cultural",
    number: "06",
    title: "Comprensión cultural e iconográfica multilingüe",
    color: "rose",
    summary:
      "El rojo comunica «peligro» en occidente, «suerte» en China y «luto» en Sudáfrica. Un icono de «pulgar arriba» tiene distintas connotaciones dependiendo del mercado. CVQA (Cultural VQA) mide si un modelo entiende esa semántica visual cultural.",
    detail:
      "CVQA evalúa la comprensión de semántica cultural visual en múltiples idiomas y regiones. Multilingual_UI_Localization mide la capacidad de localizar correctamente interfaces para distintos mercados. Regional_Iconography_Semantics evalúa la interpretación de iconos con carga cultural específica. GPT-4.5 carece de evaluación en Multilingual_UI_Localization, y Gemini 2.0 Pro solo registra datos en Regional_Iconography_Semantics (ver Módulo 4, punto 4.2).",
    benchmarks: [
      { name: "CVQA", desc: "VQA cultural multilingüe — semántica visual por región" },
      { name: "Multilingual_UI_Localization", desc: "Localización correcta de interfaces para distintos mercados" },
      { name: "Regional_Iconography_Semantics", desc: "Interpretación de iconos con carga cultural específica" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "90.29", detail: "94.0 Multilingual_UI_Localization — líder en comprensión cultural e iconográfica multilingüe" },
    warning: true,
  },
];

const PROJECTS = [
  {
    id: "genesis",
    name: "Génesis Visual",
    tagline: "Cinco puntos de partida en el tiempo que normalmente tomaría uno",
    desc: "Toma la descripción de una marca y propone varias direcciones creativas completas — no elementos aislados, sino sistemas coherentes donde el concepto del logo, la paleta de color y la tipografía se justifican mutuamente. Genera especificaciones con concepto, paleta en HEX, tipografías verificadas en Google Fonts y rationale de cada decisión. No genera imágenes: genera puntos de partida para que el diseñador itere.",
    color: "amber",
    researchLines: ["01", "05", "06"],
    stack: [
      { role: "Análisis de referencias visuales y generación de direcciones creativas", tech: "Claude 3.7 Sonnet — líder comprensión visual multimodal (86.88/100) y calidad estética (94.64/100)" },
      { role: "Verificación de sensibilidad cultural de las propuestas", tech: "Claude 3.7 Sonnet — líder comprensión cultural e iconográfica (90.29/100)" },
      { role: "Verificación de disponibilidad de tipografías", tech: "Google Fonts API — confirmación de que las tipografías propuestas existen y son accesibles" },
      { role: "Verificación de accesibilidad de paletas", tech: "Cálculo algorítmico de ratios de contraste WCAG 2.1 sobre las paletas propuestas" },
      { role: "Almacenamiento", tech: "DuckDB — histórico de direcciones generadas por proyecto" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Comprensión visual multimodal", score: "86.88", area: "Comprensión Visual y Razonamiento Multimodal" },
      { model: "Claude 3.7 Sonnet", role: "Calidad estética y accesibilidad WCAG", score: "94.64", area: "Calidad Estética, Accesibilidad y Diseño Funcional" },
      { model: "Claude 3.7 Sonnet", role: "Sensibilidad y localización cultural", score: "90.29", area: "Comprensión Cultural e Iconográfica" },
    ],
    flow: [
      "Entrada: briefing de marca en lenguaje natural — nombre y descripción del negocio, valores que debe transmitir, público objetivo (segmento, edad aproximada, contexto cultural), sector y competidores de referencia (opcionales), referencias visuales de inspiración (imágenes, opcional)",
      "Análisis de referencias visuales si se adjuntan (Claude 3.7 Sonnet): ¿qué valores comunican visualmente estas referencias? ¿qué elementos recurrentes hay? ¿qué evitar para diferenciarse de los competidores?",
      "Generación de N direcciones creativas (Claude 3.7 Sonnet): para cada dirección — nombre del concepto, razonamiento estético, paleta de 4-6 colores en HEX con rol asignado (primario, secundario, acento, texto, fondo, estado de error), par tipográfico verificado en Google Fonts, concepto de logo en descripción sin generar imagen",
      "Verificación de accesibilidad de paletas (cálculo algorítmico WCAG 2.1): ratio de contraste texto/fondo para cada combinación — etiquetado PASA_AA | PASA_AAA | FALLA",
      "Verificación de sensibilidad cultural (Claude 3.7 Sonnet): ¿algún color tiene connotación problemática en el mercado objetivo? ¿los conceptos visuales tienen referencias culturales adecuadas?",
      "Salida A: N fichas de dirección creativa en Markdown (una por dirección) · Salida B: tabla comparativa de paletas con ratios WCAG · Salida C: advertencias de sensibilidad cultural si las hay",
    ],
    promptIDE: `Crea un módulo Python llamado genesis_visual.py con las siguientes funciones:
1. parse_brand_brief(brief: str | dict, llm_client) -> dict:
   normaliza el briefing de marca a estructura:
   {brand_name: str, description: str, values: list[str],
    target_audience: {segment, age_range, cultural_context},
    sector: str, competitors: list[str],
    visual_references: list[str] | null}.
2. analyze_visual_references(image_paths: list[str],
   llm_client) -> dict: analiza imágenes de referencia.
   Devuelve: {recurring_elements: list[str], communicated_values: list[str],
   elements_to_avoid: list[str], style_tags: list[str]}.
3. generate_creative_directions(brief: dict, analysis: dict,
   llm_client, n_directions: int = 4) -> list[dict]: genera N direcciones.
   Cada dirección: {direction_id, concept_name, aesthetic_rationale: str,
   palette: [{role, hex, name}], typography: {heading_font, body_font,
   heading_rationale, body_rationale}, logo_concept: str,
   cultural_notes: str | null}.
4. check_wcag_contrast(palette: list[dict]) -> list[dict]:
   calcula ratios de contraste WCAG 2.1 para cada combinación texto/fondo.
   Devuelve: [{combo_name, ratio: float, passes_AA: bool, passes_AAA: bool}].
5. verify_cultural_sensitivity(direction: dict, target_market: str,
   llm_client) -> dict:
   verifica si la dirección tiene elementos culturalmente sensibles.
   Devuelve: {is_sensitive: bool, warnings: list[str], recommendations: list[str]}.
6. generate_direction_card(direction: dict,
   wcag_results: list[dict]) -> str: genera la ficha en Markdown de la dirección
   con paleta, tipografías, concepto de logo y ratios de contraste.
Usa requests (Google Fonts API), duckdb y la librería estándar. Sin generación de imágenes.`,
    promptLLM: `Eres el director creativo asistente de Génesis Visual en el Laboratorio de Diseño
& UX de Horizon. Tu función es generar direcciones creativas completas y justificadas
a partir de un briefing de marca, no imágenes.

Se te proporciona: el briefing de marca normalizado y, si están disponibles,
el análisis de referencias visuales.

Para cada dirección creativa que generes:
1. Asigna un nombre de concepto evocador (2-3 palabras) que resuma la idea visual.
2. Justifica el razonamiento estético: por qué cada elemento (color, tipografía,
   forma del logo) comunica los valores del briefing. Sé específico: no digas
   "el azul transmite confianza" sin explicar qué tono de azul y en qué contexto.
3. Define la paleta de 5-6 colores con roles explícitos (primario, secundario,
   acento, texto-oscuro, fondo-claro, estado-alerta). Da los valores en HEX.
4. Propón un par tipográfico disponible en Google Fonts. Justifica cada tipografía
   por sus características formales, no por su popularidad genérica.
5. Describe el concepto de logo en 2-3 frases sin generar imagen:
   qué forma/símbolo/estructura propones y por qué conecta con el concepto.

Restricciones críticas:
- Cuando hagas una afirmación sobre psicología del color, distingue entre:
  "principio verificado en investigación de percepción visual" y
  "convención cultural occidental" y "opinión de estilo". Usa esas etiquetas.
- No prescribas una dirección como "la mejor": son opciones distintas para
  que el diseñador humano elija e itere.
- Si el briefing tiene información insuficiente para justificar una decisión,
  señálalo con "REQUIERE ACLARACI“N DEL EQUIPO DE MARCA".

Responde en JSON conforme al esquema de generate_creative_directions.`,
  },
  {
    id: "ariadna",
    name: "Ariadna UX",
    tagline: "El hilo que garantiza que el usuario encuentra el camino de vuelta",
    desc: "Analiza un flujo de usuario descrito en texto e identifica los puntos de fricción: dónde el flujo es ambiguo, dónde hay demasiados pasos para lo que el usuario quiere conseguir, dónde hay una decisión que el usuario no debería tener que tomar. Produce wireframes textuales de cada pantalla y un análisis heurístico completo contra los 10 principios de Nielsen. Para flujos transaccionales, activa un modelo especializado en detección de fricción en checkout.",
    color: "rose",
    researchLines: ["04", "05"],
    stack: [
      { role: "Análisis heurístico y detección de puntos de fricción generales", tech: "Claude 3.7 Sonnet — líder jerarquía visual CTA (93.5/100) y auditoría WCAG (94.64/100)" },
      { role: "Análisis de fricción específica en flujos transaccionales", tech: "DeepSeek-R1 — segundo en reducción de fricción en checkout (89.4 en Checkout_Friction_Reduction)" },
      { role: "Generación de wireframes textuales", tech: "Claude 3.7 Sonnet — especificaciones de pantalla en formato estructurado" },
      { role: "Verificación WCAG de paletas referenciadas en el flujo", tech: "Cálculo algorítmico de contraste para colores mencionados en las pantallas" },
      { role: "Almacenamiento", tech: "DuckDB — historial de análisis de flujos por proyecto" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Análisis heurístico + wireframes textuales", score: "94.64", area: "Calidad Estética, Accesibilidad y Diseño Funcional" },
      { model: "Claude 3.7 Sonnet", role: "Jerarquía visual CTA", score: "83.33", area: "Efectividad de UI/UX en Comportamiento de Usuario" },
      { model: "DeepSeek-R1", role: "Fricción en flujos transaccionales", score: "78.31", area: "Efectividad de UI/UX — Checkout Friction Reduction: 89.4" },
    ],
    flow: [
      "Entrada: descripción del flujo de usuario — nombre del flujo, lista de pasos con descripción de qué ve el usuario y qué puede hacer en cada paso, contexto (tipo de aplicación, dispositivo objetivo, usuario tipo), objetivo final del flujo (qué acción se considera completada con éxito)",
      "Análisis heurístico del flujo (Claude 3.7 Sonnet): ¿cuántos pasos tiene el flujo? ¿alguno es prescindible? ¿hay decisiones que el usuario no debería tomar? ¿la nomenclatura es consistente? Puntuación 1-10 por cada uno de los 10 principios de Nielsen",
      "Análisis de puntos de fricción específicos (DeepSeek-R1, si el flujo es transaccional): ¿en qué paso es más probable el abandono? ¿hay campos de formulario innecesarios? ¿el CTA es inequívoco?",
      "Generación de wireframes textuales (Claude 3.7 Sonnet): para cada pantalla — estructura de contenido, elemento CTA con posición y justificación, navegación, microcopy sugerido para labels, placeholders y mensajes de error",
      "Verificación de jerarquía visual (Claude 3.7 Sonnet): ¿el elemento más importante de cada pantalla es visualmente dominante? ¿hay conflicto de atención entre varios elementos del mismo peso visual?",
      "Salida A: informe de análisis heurístico con puntuación por principio · Salida B: puntos de fricción ordenados por impacto estimado · Salida C: wireframes textuales por pantalla · Salida D: sugerencias de microcopy",
    ],
    promptIDE: `Crea un módulo Python llamado ariadna_ux.py con las siguientes funciones:
1. parse_user_flow(description: str | dict, llm_client) -> dict:
   normaliza la descripción del flujo:
   {flow_name: str, flow_type: str ("onboarding"|"purchase"|"settings"|"other"),
    target_device: str, steps: [{step_id, screen_name, user_actions: list[str],
    visible_elements: list[str]}],
    success_criteria: str, user_persona: str | null}.
2. heuristic_analysis(flow: dict, llm_client) -> dict:
   analiza el flujo contra los 10 principios heurísticos de Nielsen.
   Devuelve: {overall_score: float,
   heuristics: [{principle_name, score: float (1-10), issues: list[str],
   severity: "low"|"medium"|"high"}],
   total_issues: int, critical_issues: int}.
3. friction_analysis(flow: dict, llm_client) -> list[dict]:
   identifica puntos de fricción. Devuelve lista:
   [{step_id, friction_type: str, description: str,
   estimated_drop_off_impact: "low"|"medium"|"high",
   suggested_fix: str}].
4. generate_wireframe_spec(step: dict, flow_context: dict,
   llm_client) -> dict: genera la especificación de pantalla:
   {screen_name, layout_structure: str, elements: [{name, type, position,
   visual_weight: "primary"|"secondary"|"tertiary", copy_suggestion: str}],
   cta: {text, position, rationale}, navigation_options: list[str]}.
5. check_visual_hierarchy(wireframe: dict, llm_client) -> dict:
   verifica la jerarquía visual de la pantalla.
   Devuelve: {has_clear_primary: bool, attention_conflicts: list[str],
   hierarchy_score: float, recommendations: list[str]}.
6. generate_flow_report(flow: dict, heuristics: dict, friction: list[dict],
   wireframes: list[dict]) -> str: genera el informe completo en Markdown.
Usa duckdb y la librería estándar.`,
    promptLLM: `Eres el analista de UX de Ariadna UX en el Laboratorio de Diseño & UX de Horizon.

TAREA 1 — Análisis heurístico:
Se te proporciona la descripción completa de un flujo de usuario.
Evalúa el flujo contra los 10 principios heurísticos de Nielsen:
1. Visibilidad del estado del sistema
2. Correspondencia entre el sistema y el mundo real
3. Control y libertad del usuario
4. Consistencia y estándares
5. Prevención de errores
6. Reconocimiento en lugar de recuerdo
7. Flexibilidad y eficiencia de uso
8. Diseño estético y minimalista
9. Ayuda a los usuarios a reconocer, diagnosticar y recuperarse de errores
10. Ayuda y documentación

Para cada principio:
- Asigna una puntuación de 1 a 10 (10 = sin problemas detectados).
- Lista los problemas concretos encontrados (con referencia al paso del flujo).
- Clasifica la severidad: low (molestia menor), medium (impacto en conversión),
  high (puede provocar abandono).

TAREA 2 — Generación de wireframe textual:
Para cada pantalla del flujo, genera la especificación de contenido.
Ordena los elementos por peso visual (primary > secondary > tertiary).
Para el CTA, justifica su posicionamiento con un principio verificable
(no con una preferencia de estilo).

Restricciones:
- Distingue entre problemas verificables y recomendaciones de estilo.
  Etiqueta las segundas como "RECOMENDACI“N DE ESTILO".
- No inventes datos de conversión que no estén en el briefing.
- Si un paso del flujo es ambiguo, señálalo antes de analizarlo.

Responde en JSON conforme a los esquemas de heuristic_analysis
y generate_wireframe_spec según la tarea activada.`,
  },
  {
    id: "vitral",
    name: "Vitral Crítico",
    tagline: "La crítica estructurada de una interfaz en segundos, no en horas",
    desc: "Recibe una captura de pantalla de una interfaz y produce una crítica estructurada de su composición visual: contraste texto/fondo verificado contra WCAG 2.1, jerarquía visual, alineación de elementos, consistencia de espaciado y densidad informativa. Usa una arquitectura en dos etapas: un modelo localiza los elementos con sus coordenadas de bounding box; el otro analiza cada elemento localizado y produce la crítica fundamentada por dimensión.",
    color: "emerald",
    researchLines: ["02", "05"],
    stack: [
      { role: "Detección y localización de elementos de interfaz (Visual Grounding)", tech: "Gemini 2.0 Pro — líder grounding y detección UI, 92.4 en UI_Element_BBox_Detection (89.75/100)" },
      { role: "Crítica de accesibilidad, jerarquía y composición", tech: "Claude 3.7 Sonnet — líder calidad estética y cumplimiento WCAG (94.64/100)" },
      { role: "Verificación WCAG algorítmica", tech: "Cálculo de ratios de contraste a partir de colores extraídos de la imagen (colorsys)" },
      { role: "Extracción de colores dominantes", tech: "Análisis de paleta de la captura para cálculo de contraste (Pillow)" },
      { role: "Anotación de imagen con bounding boxes", tech: "Pillow — marcado por nivel de severidad: rojo (bloqueante), naranja (usabilidad), gris (estilo)" },
      { role: "Almacenamiento", tech: "DuckDB — histórico de auditorías por interfaz y por versión" },
    ],
    whyModels: [
      { model: "Gemini 2.0 Pro", role: "Visual Grounding — localización de elementos UI", score: "89.75", area: "Evidencia Visual, Grounding y Segmentación" },
      { model: "Claude 3.7 Sonnet", role: "Auditoría WCAG y crítica de composición", score: "94.64", area: "Calidad Estética, Accesibilidad y Diseño Funcional" },
    ],
    flow: [
      "Entrada: captura de pantalla de la interfaz (PNG, JPG, WebP) + contexto opcional: tipo de interfaz, dispositivo, objetivo principal de la pantalla",
      "Detección y localización de elementos (Gemini 2.0 Pro): identificación de todos los elementos visibles, bounding box por elemento (x, y, w, h), clasificación del tipo (texto | botón | imagen | icono | campo de formulario | navegación | fondo), extracción del color de texto y fondo por elemento de texto",
      "Auditoría de contraste WCAG 2.1 (algorítmica): ratio de contraste texto/fondo para cada elemento de texto — etiquetado PASA_AA | PASA_AAA | FALLA | NO_APLICA",
      "Auditoría de jerarquía visual (Claude 3.7 Sonnet): ¿qué elemento debería ser el más importante según el objetivo? ¿es ese elemento visualmente dominante? ¿hay conflictos de atención entre elementos de igual peso visual?",
      "Auditoría de alineación y retícula: ¿los elementos están alineados a una retícula consistente? Inconsistencias de margen o padding entre elementos similares",
      "Auditoría de densidad informativa: ¿cuántos elementos compiten por la atención del usuario? ¿hay información que podría moverse a una pantalla siguiente?",
      "Generación de informe: por cada problema — descripción, elemento afectado con referencia al bounding box, severidad, sugerencia de corrección concreta · Puntuación global por dimensión (0-100) · Imagen anotada con bounding boxes coloreados por severidad",
    ],
    promptIDE: `Crea un módulo Python llamado vitral_critico.py con las siguientes funciones:
1. detect_ui_elements(image_path: str, vlm_client) -> list[dict]:
   detecta y localiza los elementos de la interfaz usando el VLM.
   Devuelve lista de elementos: {element_id: int, element_type: str,
   bbox: {x, y, width, height}, text_content: str | null,
   foreground_color_hex: str | null, background_color_hex: str | null}.
2. check_contrast(elements: list[dict]) -> list[dict]:
   calcula ratio de contraste WCAG 2.1 para cada elemento de texto.
   Devuelve: [{element_id, contrast_ratio: float,
   passes_AA: bool, passes_AAA: bool, text_size: str | null}].
3. audit_visual_hierarchy(elements: list[dict], screen_objective: str,
   llm_client) -> dict: evalúa la jerarquía visual.
   Devuelve: {expected_primary: str, actual_primary: str,
   hierarchy_conflicts: list[{element_id, conflict_description}],
   hierarchy_score: float}.
4. audit_alignment(elements: list[dict]) -> dict:
   detecta inconsistencias de alineación y retícula.
   Devuelve: {detected_grid_base: int | null,
   misaligned_elements: list[{element_id, expected_position, actual_position, delta_px}],
   alignment_score: float}.
5. audit_spacing(elements: list[dict]) -> dict:
   analiza la consistencia de espaciado.
   Devuelve: {spacing_system_base_px: int | null,
   inconsistencies: list[{element_pair, expected_gap, actual_gap, delta_px}],
   spacing_score: float}.
6. generate_critique_report(image_path: str, elements: list[dict],
   contrast: list[dict], hierarchy: dict, alignment: dict,
   spacing: dict, llm_client) -> dict: genera el informe crítico completo:
   {overall_score: float, issues: list[{element_id, bbox, severity,
   dimension, description, suggestion}], summary: str}.
7. annotate_image(image_path: str, issues: list[dict],
   output_path: str) -> None: genera la imagen anotada con bounding boxes
   por nivel de severidad.
Usa Pillow, colorsys (para cálculo de contraste), duckdb y la librería estándar.`,
    promptLLM: `Eres el crítico de diseño de Vitral Crítico en el Laboratorio de Diseño & UX
de Horizon. Tu función es analizar los elementos de una interfaz —ya detectados
y localizados por el sistema de grounding— y emitir una crítica fundamentada
por dimensión.

Se te proporciona:
- Lista de elementos de interfaz con sus coordenadas, tipos y colores
- Resultados de la verificación algorítmica de contraste WCAG
- El objetivo principal de la pantalla (qué acción debe completar el usuario)

Para cada dimensión de tu análisis, distingue explícitamente entre:
1. VERIFICABLE: problemas con criterio objetivo (contraste < 4.5:1 falla WCAG 2.1 AA).
   Cita el estándar o el criterio medible que se incumple.
2. HEURÍSTICO: problemas basados en principios de usabilidad establecidos.
   Cita el principio aplicado.
3. RECOMENDACI“N DE ESTILO: apreciaciones culturalmente situadas o dependientes
   de la guía de estilo del proyecto. Etiquétalas como tal.

Para cada problema, especifica:
- El element_id del elemento afectado
- La dimensión: CONTRASTE | JERARQUÍA | ALINEACI“N | ESPACIADO | DENSIDAD
- La severidad: BLOQUEANTE (accesibilidad incumplida) | USABILIDAD (impacto
  medible en conversión o comprensión) | ESTILO (recomendación opinable)
- Una sugerencia concreta de corrección (no genérica)

No uses frases como "la interfaz se ve abarrotada" sin cuantificar:
di cuántos elementos compiten por la atención en el área identificada.

Responde en JSON conforme al esquema de generate_critique_report.`,
  },
];

const MARKET_APPS = [
  {
    name: "Figma AI",
    desc: "La plataforma de diseño colaborativo líder incorpora funciones de IA generativa para la generación de wireframes, búsqueda visual y edición asistida. Incluye generación de capas y componentes a partir de descripciones textuales.",
    tag: "Diseño colaborativo",
    url: "https://figma.com/ai",
  },
  {
    name: "Adobe Firefly",
    desc: "Modelo generativo de Adobe integrado en Creative Cloud. Incluye generación de imágenes, expansión de fondo (generative fill), recoloración de vectores y generación de patrones de diseño.",
    tag: "Generación de imágenes",
    url: "https://firefly.adobe.com",
  },
  {
    name: "Uizard",
    desc: "Herramienta de prototipado rápido con IA que convierte capturas de wireframes dibujados a mano en prototipos digitales editables, y genera wireframes a partir de descripciones textuales.",
    tag: "Prototipado rápido",
    url: "https://uizard.io",
  },
  {
    name: "Galileo AI",
    desc: "Plataforma de generación de interfaces de usuario completas a partir de descripciones de texto, orientada a la creación rápida de pantallas de aplicación móvil y web.",
    tag: "Generación de UI",
    url: "https://usegalileo.ai",
  },
  {
    name: "UserTesting AI Insights",
    desc: "La plataforma UserTesting incorpora análisis de IA para identificar patrones en sesiones de test de usuario, destacar momentos de fricción y sintetizar feedback cualitativo en insights accionables.",
    tag: "Investigación de usuarios",
    url: "https://usertesting.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Podio incompleto en Evidencia Visual y Grounding",
    items: [
      "El área de Evidencia Visual, Grounding y Segmentación cuenta con evaluaciones registradas únicamente para 2 modelos: Gemini 2.0 Pro (89.75/100) y Claude 3.7 Sonnet (82.35/100) (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "El tercer puesto de este podio no cuenta con datos en el archivo de rankings y queda clasificado como [DATO PENDIENTE DE VERIFICAR].",
      "El proyecto Vitral Crítico asume la arquitectura de dos etapas basándose en los dos modelos disponibles. Si emerge un tercer modelo competitivo, el stack debe revisarse.",
    ],
  },
  {
    id: "v2",
    title: "4.2 Asimetría en la cobertura de benchmarks por modelo",
    items: [
      "Comprensión Visual: Gemini 2.0 Pro (67% de cobertura) carece de evaluación en OK_VQA_Knowledge (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "Diseño Generativo de Espacios: tanto ArchiGPT-CAD-Flow (67%) como GPT-4.5 (67%) carecen de resultado en Product_3D_Ergonomics_Synthesis.",
      "Efectividad de UI/UX: ningún modelo alcanza el 100% de cobertura — Claude 3.7 Sonnet no tiene datos en Checkout_Friction_Reduction, DeepSeek-R1 carece de evaluación en CTA_Visual_Hierarchy_Impact, y GPT-4.5 solo fue evaluado en WiserUI_Bench_AB_Winner (33% de cobertura).",
      "Calidad Estética y Accesibilidad: Archigen-Spatial-Agent (33%) solo dispone de evaluación en Visual_Balance_Typography_Ratio.",
      "Comprensión Cultural: GPT-4.5 (67%) carece de evaluación en Multilingual_UI_Localization, y Gemini 2.0 Pro (33%) solo registra datos en Regional_Iconography_Semantics.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de benchmarks de generación de identidades visuales corporativas",
    items: [
      "El catálogo oficial del módulo evalúa VQA con conocimiento externo, grounding, diseño espacial, experimentos A/B, accesibilidad WCAG y localización cultural.",
      "Las evaluaciones cuantitativas dedicadas específicamente a la síntesis de identidades corporativas completas (logotipos vectoriales, sistemas de marca) quedan registradas como [DATO PENDIENTE DE VERIFICAR].",
      "Los proyectos Génesis Visual y Vitral Crítico aplican benchmarks relacionados (calidad estética, coherencia estilística) como proxies razonados, no como medición directa de branding.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Puntuaciones bajas en Efectividad de UI/UX vs. otras áreas",
    items: [
      "Las puntuaciones del área de Efectividad de UI/UX en Comportamiento de Usuario son significativamente más bajas que las de otras áreas: el líder Claude 3.7 Sonnet alcanza 83.33/100, comparado con 94.64/100 en el área de accesibilidad (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "Este diferencial sugiere que la predicción de resultados reales de A/B testing es considerablemente más difícil que la auditoría de accesibilidad algorítmica.",
      "Debe comunicarse al usuario de Ariadna UX: el sistema puede auditar jerarquía y accesibilidad con alta fiabilidad, pero la predicción de conversión tiene mayor incertidumbre.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Latencias en inferencia multimodal y costes por token de visión",
    items: [
      "El tiempo de inferencia por imagen en alta resolución y el coste operativo por megapixel/token visual de los VLMs evaluados no constan en el archivo de rankings.",
      "Permanece como [DATO PENDIENTE DE VERIFICAR] — dato relevante para Vitral Crítico en uso intensivo (auditoría de múltiples pantallas en un sistema de diseño completo).",
      "Para despliegues en producción con volumen alto de auditorías, este dato es necesario para estimar el coste operativo real del sistema.",
    ],
  },
];

// —€—€—€ Styles —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

const STYLES = {
  amber: {
    accent: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    dot: "bg-amber-400",
    badge: "border-amber-400/30 text-amber-400",
    tabBorder: "border-amber-400",
    score: "text-amber-400",
    heroGlow: "rgba(251,191,36,0.08)",
    heroGrad: "amber-400",
  },
  rose: {
    accent: "text-rose-400",
    border: "border-rose-400/20",
    bg: "bg-rose-400/5",
    dot: "bg-rose-400",
    badge: "border-rose-400/30 text-rose-400",
    tabBorder: "border-rose-400",
    score: "text-rose-400",
    heroGlow: "rgba(251,113,133,0.08)",
    heroGrad: "rose-400",
  },
  emerald: {
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
    dot: "bg-emerald-400",
    badge: "border-emerald-400/30 text-emerald-400",
    tabBorder: "border-emerald-400",
    score: "text-emerald-400",
    heroGlow: "rgba(52,211,153,0.08)",
    heroGrad: "emerald-400",
  },
  blue: {
    accent: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
    dot: "bg-blue-400",
    badge: "border-blue-400/30 text-blue-400",
    tabBorder: "border-blue-400",
    score: "text-blue-400",
    heroGlow: "rgba(96,165,250,0.08)",
    heroGrad: "blue-400",
  },
};

// —€—€—€ Sub-components —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo líder · STATER Design Leaderboard</p>
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
        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <span className="text-[10px] text-accent font-bold">{index + 1}</span>
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
        <button
          onClick={copy}
          className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/10"
        >
          {copied ? "““ Copiado" : "Copiar"}
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
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs text-white/30">Líneas de investigación:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} · {line?.title.split(" ").slice(0, 3).join(" ")}–¦
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · STATER Design Leaderboard</p>
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
            <PromptBlock label="prompt_ide.txt — Para Cursor / VS Code + Copilot" content={project.promptIDE} />
            <PromptBlock label="prompt_llm.txt — Para el modelo LLM asistente" content={project.promptLLM} />
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
        <ChevronDown
          size={14}
          className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
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

// —€—€—€ Page —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

export default function DisenoLab() {
  return (
    <div className="min-h-full bg-[#111111]">
      {/* Back nav */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
          <Link
            to="/areas"
            className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Todos los laboratorios
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(251,191,36,0.07) 0%, rgba(251,113,133,0.04) 50%, transparent 70%)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Palette size={28} className="text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-amber-400/30 bg-amber-400/10 text-amber-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Design & UX · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-amber-400">Diseño</span>
                {" & "}
                <span className="text-rose-400">UX</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para branding generativo, análisis heurístico de flujos y crítica estructurada de interfaces.
                El laboratorio distingue explícitamente entre criterios verificables — contraste WCAG, tasas de conversión — y recomendaciones de estilo.
              </p>

              {/* Nota metodológica */}
              <div className="mt-5 inline-flex items-start gap-2 border border-amber-400/20 bg-amber-400/5 rounded-xl px-4 py-3 max-w-xl">
                <Eye size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/70 leading-relaxed">
                  <strong className="text-amber-300">Nota metodológica:</strong> en diseño, algunas afirmaciones son objetivamente medibles (ratio de contraste, tasa de abandono). Otras son recomendaciones de estilo, culturalmente situadas y legítimamente opinables. Este laboratorio distingue explícitamente entre ambas en cada módulo.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigación", value: "6" },
                  { label: "Proyectos activos", value: "3" },
                  { label: "Benchmarks cubiertos", value: "14" },
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

        {/* —€—€ Módulo 1 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué se investiga aquí</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                El diseño tiene una doble naturaleza: hay partes objetivamente medibles (ratio de contraste, tasa de abandono, porcentaje de elementos que cumplen WCAG 2.1) y partes genuinamente subjetivas (qué paleta comunica «confianza» para un público específico, qué tipografía transmite «autoridad sin frialdad»). Seis dimensiones activas de investigación, ordenadas desde la percepción visual hasta la comprensión cultural.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">De la percepción al impacto</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las seis dimensiones no son paralelas: se encadenan en el proceso real de un proyecto de diseño. El branding visual (dimensión 03) informa la paleta y tipografía de las interfaces (dimensión 05). La accesibilidad (dimensión 05) debe verificarse en todos los mercados objetivo (dimensión 06). Y la efectividad final se mide en comportamiento real de usuario (dimensión 04), que es el único juicio definitivo.
            </p>
          </div>
        </section>

        {/* —€—€ Módulo 2 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Tres proyectos que cubren el ciclo completo de diseño: de la identidad visual inicial (Génesis Visual) al análisis de flujos y usabilidad (Ariadna UX) hasta la crítica estructurada de interfaces existentes (Vitral Crítico). Cada uno distingue explícitamente entre lo verificable y lo opinable.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* —€—€ Módulo 3 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a diseño y UX que operan en el mercado en el momento de redacción de este cuaderno. Para detalles exactos de características actuales o precios, verificar en la web oficial de cada herramienta.
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
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
                    {app.name}
                  </h3>
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

        {/* —€—€ Módulo 4 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">Módulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco puntos que requieren revisión antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen podios incompletos, asimetrías de cobertura y el diferencial entre predicción de conversión y auditoría de accesibilidad.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => (
              <VerificationItem key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* —€—€ Footer CTA —€—€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · STATER Design & UX Leaderboard · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_design.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_design.yaml</code>.
              Distingue explícitamente entre criterios verificables y recomendaciones de estilo.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/taller"
              className="text-sm text-accent hover:text-accent-light border border-accent/30 hover:border-accent/60 px-4 py-2 rounded-xl transition-all"
            >
              Ver casos en el Taller â†’
            </Link>
            <Link
              to="/foro"
              className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all"
            >
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

