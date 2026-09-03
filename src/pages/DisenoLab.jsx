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

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RESEARCH_LINES = [
  {
    id: "visual-reasoning",
    number: "01",
    title: "ComprensiÃ³n visual y razonamiento multimodal",
    color: "amber",
    summary:
      "Un modelo de visiÃ³n-lenguaje que analiza una interfaz no solo necesita Â«verÂ» los elementos: necesita entender quÃ© representan en su contexto cultural e histÃ³rico. Un icono de telÃ©fono de auricular ya no tiene referente fÃ­sico para la mayorÃ­a de los usuarios jÃ³venes, pero sigue comunicando Â«llamarÂ» por convenciÃ³n aprendida.",
    detail:
      "Los benchmarks OK-VQA y A-OKVQA miden la capacidad de razonamiento visual que requiere conocimiento del mundo exterior, no solo de los pÃ­xeles. VQA con conocimiento externo evalÃºa si el modelo puede responder preguntas sobre imÃ¡genes que exigen conocimiento enciclopÃ©dico â€” condiciÃ³n necesaria para interpretar interfaces correctamente. VistaQA_Visual_Reasoning amplÃ­a la cobertura a tareas de razonamiento visual compositivo.",
    benchmarks: [
      { name: "OK-VQA", desc: "VQA con conocimiento del mundo exterior (enciclopÃ©dico)" },
      { name: "A-OKVQA", desc: "VQA augmentado con razonamiento externo multimodal" },
      { name: "VistaQA_Visual_Reasoning", desc: "Razonamiento visual compositivo sobre imÃ¡genes complejas" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "86.88", detail: "84.8 OK_VQA_Knowledge Â· 86.4 A_OKVQA_Multimodal Â· 89.2 VistaQA_Visual_Reasoning" },
  },
  {
    id: "visual-grounding",
    number: "02",
    title: "Evidencia visual y anclaje espacial (Visual Grounding)",
    color: "rose",
    summary:
      "Visual Grounding es la capacidad de un modelo de seÃ±alar exactamente dÃ³nde en una imagen estÃ¡ el elemento sobre el que razona, expresado como coordenadas de un bounding box. Esta capacidad es crÃ­tica para la crÃ­tica automatizada de interfaces: no basta con decir Â«el botÃ³n de llamada a la acciÃ³n tiene poco contrasteÂ», hay que seÃ±alar exactamente quÃ© botÃ³n.",
    detail:
      "El benchmark UI_Element_BBox_Detection mide precisamente esto: dado un nombre de elemento de interfaz, Â¿puede el modelo localizar su posiciÃ³n en pÃ­xeles? VistaQA_Grounded_Boxes y Toloka_VQA_Grounding evalÃºan grounding en contextos mÃ¡s amplios. El podio de este Ã¡rea tiene datos para solo 2 modelos, con el tercer puesto pendiente de verificaciÃ³n (ver MÃ³dulo 4, punto 4.1).",
    benchmarks: [
      { name: "UI_Element_BBox_Detection", desc: "LocalizaciÃ³n de elementos de interfaz por bounding box" },
      { name: "VistaQA_Grounded_Boxes", desc: "Grounding visual con coordenadas en preguntas abiertas" },
      { name: "Toloka_VQA_Grounding", desc: "ValidaciÃ³n de grounding con anotadores humanos (Toloka)" },
    ],
    topModel: { name: "Gemini 2.0 Pro", score: "89.75", detail: "88.0 VistaQA_Grounded_Boxes Â· 89.2 Toloka_VQA_Grounding Â· 92.4 UI_Element_BBox_Detection" },
    warning: true,
  },
  {
    id: "generative-spatial",
    number: "03",
    title: "DiseÃ±o generativo de espacios y coherencia estilÃ­stica",
    color: "emerald",
    summary:
      "La generaciÃ³n de distribuciones espaciales â€” planos de planta, disposiciones de muebles en un interior, ergonomÃ­a de producto en 3D â€” requiere razonamiento sobre restricciones geomÃ©tricas, circulaciones y coherencia estilÃ­stica. El modelo debe proponer distribuciones que sean a la vez funcionales y estilÃ­sticamente coherentes.",
    detail:
      "Archigen_Spatial_Layout mide la capacidad de generar layouts arquitectÃ³nicos funcionales. Interior_Design_Style_Consistency evalÃºa si el modelo mantiene coherencia de estilo entre los elementos de un espacio. Product_3D_Ergonomics_Synthesis â€” el tercer benchmark â€” tiene cobertura incompleta (ArchiGPT-CAD-Flow y GPT-4.5 carecen de resultado, ver MÃ³dulo 4, punto 4.2).",
    benchmarks: [
      { name: "Archigen_Spatial_Layout", desc: "GeneraciÃ³n de distribuciones arquitectÃ³nicas funcionales" },
      { name: "Interior_Design_Style_Consistency", desc: "Coherencia estilÃ­stica en diseÃ±o de interiores" },
      { name: "Product_3D_Ergonomics_Synthesis", desc: "SÃ­ntesis ergonÃ³mica de producto en 3D (cobertura incompleta)" },
    ],
    topModel: { name: "ArchiGPT-CAD-Flow", score: "88.40", detail: "Especializado en generaciÃ³n de layouts espaciales y coherencia estilÃ­stica arquitectÃ³nica" },
    warning: true,
  },
  {
    id: "ux-effectiveness",
    number: "04",
    title: "Efectividad de UI/UX en comportamiento real de usuario",
    color: "blue",
    summary:
      "La mÃ©trica Ãºltima del diseÃ±o UX no es si una interfaz Â«parece bien diseÃ±adaÂ» a un experto: es si convierte mÃ¡s, si reduce el abandono de carrito, si guÃ­a al usuario hasta completar la acciÃ³n. WiserUI-Bench incluye mÃ¡s de 300 experimentos reales de A/B testing con resultados verificados de tasa de conversiÃ³n.",
    detail:
      "WiserUI-Bench pregunta al modelo cuÃ¡l de dos variantes ganÃ³ el test de conversiÃ³n real, y comprueba si acierta. CTA_Visual_Hierarchy_Impact mide el impacto especÃ­fico de la jerarquÃ­a visual en los elementos de llamada a la acciÃ³n. Checkout_Friction_Reduction evalÃºa la detecciÃ³n de fricciones en flujos transaccionales. Las puntuaciones aquÃ­ son mÃ¡s bajas que en accesibilidad â€” ver MÃ³dulo 4, punto 4.4.",
    benchmarks: [
      { name: "WiserUI_Bench_AB_Winner", desc: "PredicciÃ³n del ganador en 300+ experimentos A/B reales" },
      { name: "CTA_Visual_Hierarchy_Impact", desc: "Impacto de jerarquÃ­a visual en elementos de llamada a la acciÃ³n" },
      { name: "Checkout_Friction_Reduction", desc: "DetecciÃ³n de puntos de fricciÃ³n en flujos transaccionales" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "83.33", detail: "93.5 CTA_Visual_Hierarchy_Impact â€” cobertura parcial, datos en Checkout_Friction_Reduction pendientes" },
    warning: true,
  },
  {
    id: "accessibility",
    number: "05",
    title: "Calidad estÃ©tica, accesibilidad y diseÃ±o funcional",
    color: "amber",
    summary:
      "El estÃ¡ndar WCAG 2.1 define criterios de contraste mÃ­nimo de color entre texto y fondo: nivel AA requiere un ratio de contraste de al menos 4.5:1 para texto normal. Eso no es una opiniÃ³n de estilo: es un estÃ¡ndar verificable algorÃ­tmicamente.",
    detail:
      "WCAG_Accessibility_Compliance mide si el modelo puede auditar correctamente el cumplimiento de estos criterios. Visual_Balance_Typography_Ratio mide el equilibrio tipogrÃ¡fico y compositivo de una interfaz â€” un territorio que mezcla principios medibles (la regla Ã¡urea, la retÃ­cula de 8px) con criterio estÃ©tico. Claude 3.7 Sonnet lidera ambos con 96.8 y 94.6 respectivamente.",
    benchmarks: [
      { name: "WCAG_Accessibility_Compliance", desc: "AuditorÃ­a de cumplimiento WCAG 2.1 â€” ratio de contraste y accesibilidad" },
      { name: "Visual_Balance_Typography_Ratio", desc: "Equilibrio tipogrÃ¡fico y compositivo (medible + criterio estÃ©tico)" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.64", detail: "96.8 WCAG_Accessibility_Compliance Â· 94.6 Visual_Balance_Typography_Ratio" },
  },
  {
    id: "cultural",
    number: "06",
    title: "ComprensiÃ³n cultural e iconogrÃ¡fica multilingÃ¼e",
    color: "rose",
    summary:
      "El rojo comunica Â«peligroÂ» en occidente, Â«suerteÂ» en China y Â«lutoÂ» en SudÃ¡frica. Un icono de Â«pulgar arribaÂ» tiene distintas connotaciones dependiendo del mercado. CVQA (Cultural VQA) mide si un modelo entiende esa semÃ¡ntica visual cultural.",
    detail:
      "CVQA evalÃºa la comprensiÃ³n de semÃ¡ntica cultural visual en mÃºltiples idiomas y regiones. Multilingual_UI_Localization mide la capacidad de localizar correctamente interfaces para distintos mercados. Regional_Iconography_Semantics evalÃºa la interpretaciÃ³n de iconos con carga cultural especÃ­fica. GPT-4.5 carece de evaluaciÃ³n en Multilingual_UI_Localization, y Gemini 2.0 Pro solo registra datos en Regional_Iconography_Semantics (ver MÃ³dulo 4, punto 4.2).",
    benchmarks: [
      { name: "CVQA", desc: "VQA cultural multilingÃ¼e â€” semÃ¡ntica visual por regiÃ³n" },
      { name: "Multilingual_UI_Localization", desc: "LocalizaciÃ³n correcta de interfaces para distintos mercados" },
      { name: "Regional_Iconography_Semantics", desc: "InterpretaciÃ³n de iconos con carga cultural especÃ­fica" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "90.29", detail: "94.0 Multilingual_UI_Localization â€” lÃ­der en comprensiÃ³n cultural e iconogrÃ¡fica multilingÃ¼e" },
    warning: true,
  },
];

const PROJECTS = [
  {
    id: "genesis",
    name: "GÃ©nesis Visual",
    tagline: "Cinco puntos de partida en el tiempo que normalmente tomarÃ­a uno",
    desc: "Toma la descripciÃ³n de una marca y propone varias direcciones creativas completas â€” no elementos aislados, sino sistemas coherentes donde el concepto del logo, la paleta de color y la tipografÃ­a se justifican mutuamente. Genera especificaciones con concepto, paleta en HEX, tipografÃ­as verificadas en Google Fonts y rationale de cada decisiÃ³n. No genera imÃ¡genes: genera puntos de partida para que el diseÃ±ador itere.",
    color: "amber",
    researchLines: ["01", "05", "06"],
    stack: [
      { role: "AnÃ¡lisis de referencias visuales y generaciÃ³n de direcciones creativas", tech: "Claude 3.7 Sonnet â€” lÃ­der comprensiÃ³n visual multimodal (86.88/100) y calidad estÃ©tica (94.64/100)" },
      { role: "VerificaciÃ³n de sensibilidad cultural de las propuestas", tech: "Claude 3.7 Sonnet â€” lÃ­der comprensiÃ³n cultural e iconogrÃ¡fica (90.29/100)" },
      { role: "VerificaciÃ³n de disponibilidad de tipografÃ­as", tech: "Google Fonts API â€” confirmaciÃ³n de que las tipografÃ­as propuestas existen y son accesibles" },
      { role: "VerificaciÃ³n de accesibilidad de paletas", tech: "CÃ¡lculo algorÃ­tmico de ratios de contraste WCAG 2.1 sobre las paletas propuestas" },
      { role: "Almacenamiento", tech: "DuckDB â€” histÃ³rico de direcciones generadas por proyecto" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "ComprensiÃ³n visual multimodal", score: "86.88", area: "ComprensiÃ³n Visual y Razonamiento Multimodal" },
      { model: "Claude 3.7 Sonnet", role: "Calidad estÃ©tica y accesibilidad WCAG", score: "94.64", area: "Calidad EstÃ©tica, Accesibilidad y DiseÃ±o Funcional" },
      { model: "Claude 3.7 Sonnet", role: "Sensibilidad y localizaciÃ³n cultural", score: "90.29", area: "ComprensiÃ³n Cultural e IconogrÃ¡fica" },
    ],
    flow: [
      "Entrada: briefing de marca en lenguaje natural â€” nombre y descripciÃ³n del negocio, valores que debe transmitir, pÃºblico objetivo (segmento, edad aproximada, contexto cultural), sector y competidores de referencia (opcionales), referencias visuales de inspiraciÃ³n (imÃ¡genes, opcional)",
      "AnÃ¡lisis de referencias visuales si se adjuntan (Claude 3.7 Sonnet): Â¿quÃ© valores comunican visualmente estas referencias? Â¿quÃ© elementos recurrentes hay? Â¿quÃ© evitar para diferenciarse de los competidores?",
      "GeneraciÃ³n de N direcciones creativas (Claude 3.7 Sonnet): para cada direcciÃ³n â€” nombre del concepto, razonamiento estÃ©tico, paleta de 4-6 colores en HEX con rol asignado (primario, secundario, acento, texto, fondo, estado de error), par tipogrÃ¡fico verificado en Google Fonts, concepto de logo en descripciÃ³n sin generar imagen",
      "VerificaciÃ³n de accesibilidad de paletas (cÃ¡lculo algorÃ­tmico WCAG 2.1): ratio de contraste texto/fondo para cada combinaciÃ³n â€” etiquetado PASA_AA | PASA_AAA | FALLA",
      "VerificaciÃ³n de sensibilidad cultural (Claude 3.7 Sonnet): Â¿algÃºn color tiene connotaciÃ³n problemÃ¡tica en el mercado objetivo? Â¿los conceptos visuales tienen referencias culturales adecuadas?",
      "Salida A: N fichas de direcciÃ³n creativa en Markdown (una por direcciÃ³n) Â· Salida B: tabla comparativa de paletas con ratios WCAG Â· Salida C: advertencias de sensibilidad cultural si las hay",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado genesis_visual.py con las siguientes funciones:
1. parse_brand_brief(brief: str | dict, llm_client) -> dict:
   normaliza el briefing de marca a estructura:
   {brand_name: str, description: str, values: list[str],
    target_audience: {segment, age_range, cultural_context},
    sector: str, competitors: list[str],
    visual_references: list[str] | null}.
2. analyze_visual_references(image_paths: list[str],
   llm_client) -> dict: analiza imÃ¡genes de referencia.
   Devuelve: {recurring_elements: list[str], communicated_values: list[str],
   elements_to_avoid: list[str], style_tags: list[str]}.
3. generate_creative_directions(brief: dict, analysis: dict,
   llm_client, n_directions: int = 4) -> list[dict]: genera N direcciones.
   Cada direcciÃ³n: {direction_id, concept_name, aesthetic_rationale: str,
   palette: [{role, hex, name}], typography: {heading_font, body_font,
   heading_rationale, body_rationale}, logo_concept: str,
   cultural_notes: str | null}.
4. check_wcag_contrast(palette: list[dict]) -> list[dict]:
   calcula ratios de contraste WCAG 2.1 para cada combinaciÃ³n texto/fondo.
   Devuelve: [{combo_name, ratio: float, passes_AA: bool, passes_AAA: bool}].
5. verify_cultural_sensitivity(direction: dict, target_market: str,
   llm_client) -> dict:
   verifica si la direcciÃ³n tiene elementos culturalmente sensibles.
   Devuelve: {is_sensitive: bool, warnings: list[str], recommendations: list[str]}.
6. generate_direction_card(direction: dict,
   wcag_results: list[dict]) -> str: genera la ficha en Markdown de la direcciÃ³n
   con paleta, tipografÃ­as, concepto de logo y ratios de contraste.
Usa requests (Google Fonts API), duckdb y la librerÃ­a estÃ¡ndar. Sin generaciÃ³n de imÃ¡genes.`,
    promptLLM: `Eres el director creativo asistente de GÃ©nesis Visual en el Laboratorio de DiseÃ±o
& UX de Horizon. Tu funciÃ³n es generar direcciones creativas completas y justificadas
a partir de un briefing de marca, no imÃ¡genes.

Se te proporciona: el briefing de marca normalizado y, si estÃ¡n disponibles,
el anÃ¡lisis de referencias visuales.

Para cada direcciÃ³n creativa que generes:
1. Asigna un nombre de concepto evocador (2-3 palabras) que resuma la idea visual.
2. Justifica el razonamiento estÃ©tico: por quÃ© cada elemento (color, tipografÃ­a,
   forma del logo) comunica los valores del briefing. SÃ© especÃ­fico: no digas
   "el azul transmite confianza" sin explicar quÃ© tono de azul y en quÃ© contexto.
3. Define la paleta de 5-6 colores con roles explÃ­citos (primario, secundario,
   acento, texto-oscuro, fondo-claro, estado-alerta). Da los valores en HEX.
4. PropÃ³n un par tipogrÃ¡fico disponible en Google Fonts. Justifica cada tipografÃ­a
   por sus caracterÃ­sticas formales, no por su popularidad genÃ©rica.
5. Describe el concepto de logo en 2-3 frases sin generar imagen:
   quÃ© forma/sÃ­mbolo/estructura propones y por quÃ© conecta con el concepto.

Restricciones crÃ­ticas:
- Cuando hagas una afirmaciÃ³n sobre psicologÃ­a del color, distingue entre:
  "principio verificado en investigaciÃ³n de percepciÃ³n visual" y
  "convenciÃ³n cultural occidental" y "opiniÃ³n de estilo". Usa esas etiquetas.
- No prescribas una direcciÃ³n como "la mejor": son opciones distintas para
  que el diseÃ±ador humano elija e itere.
- Si el briefing tiene informaciÃ³n insuficiente para justificar una decisiÃ³n,
  seÃ±Ã¡lalo con "REQUIERE ACLARACIÃ“N DEL EQUIPO DE MARCA".

Responde en JSON conforme al esquema de generate_creative_directions.`,
  },
  {
    id: "ariadna",
    name: "Ariadna UX",
    tagline: "El hilo que garantiza que el usuario encuentra el camino de vuelta",
    desc: "Analiza un flujo de usuario descrito en texto e identifica los puntos de fricciÃ³n: dÃ³nde el flujo es ambiguo, dÃ³nde hay demasiados pasos para lo que el usuario quiere conseguir, dÃ³nde hay una decisiÃ³n que el usuario no deberÃ­a tener que tomar. Produce wireframes textuales de cada pantalla y un anÃ¡lisis heurÃ­stico completo contra los 10 principios de Nielsen. Para flujos transaccionales, activa un modelo especializado en detecciÃ³n de fricciÃ³n en checkout.",
    color: "rose",
    researchLines: ["04", "05"],
    stack: [
      { role: "AnÃ¡lisis heurÃ­stico y detecciÃ³n de puntos de fricciÃ³n generales", tech: "Claude 3.7 Sonnet â€” lÃ­der jerarquÃ­a visual CTA (93.5/100) y auditorÃ­a WCAG (94.64/100)" },
      { role: "AnÃ¡lisis de fricciÃ³n especÃ­fica en flujos transaccionales", tech: "DeepSeek-R1 â€” segundo en reducciÃ³n de fricciÃ³n en checkout (89.4 en Checkout_Friction_Reduction)" },
      { role: "GeneraciÃ³n de wireframes textuales", tech: "Claude 3.7 Sonnet â€” especificaciones de pantalla en formato estructurado" },
      { role: "VerificaciÃ³n WCAG de paletas referenciadas en el flujo", tech: "CÃ¡lculo algorÃ­tmico de contraste para colores mencionados en las pantallas" },
      { role: "Almacenamiento", tech: "DuckDB â€” historial de anÃ¡lisis de flujos por proyecto" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "AnÃ¡lisis heurÃ­stico + wireframes textuales", score: "94.64", area: "Calidad EstÃ©tica, Accesibilidad y DiseÃ±o Funcional" },
      { model: "Claude 3.7 Sonnet", role: "JerarquÃ­a visual CTA", score: "83.33", area: "Efectividad de UI/UX en Comportamiento de Usuario" },
      { model: "DeepSeek-R1", role: "FricciÃ³n en flujos transaccionales", score: "78.31", area: "Efectividad de UI/UX â€” Checkout Friction Reduction: 89.4" },
    ],
    flow: [
      "Entrada: descripciÃ³n del flujo de usuario â€” nombre del flujo, lista de pasos con descripciÃ³n de quÃ© ve el usuario y quÃ© puede hacer en cada paso, contexto (tipo de aplicaciÃ³n, dispositivo objetivo, usuario tipo), objetivo final del flujo (quÃ© acciÃ³n se considera completada con Ã©xito)",
      "AnÃ¡lisis heurÃ­stico del flujo (Claude 3.7 Sonnet): Â¿cuÃ¡ntos pasos tiene el flujo? Â¿alguno es prescindible? Â¿hay decisiones que el usuario no deberÃ­a tomar? Â¿la nomenclatura es consistente? PuntuaciÃ³n 1-10 por cada uno de los 10 principios de Nielsen",
      "AnÃ¡lisis de puntos de fricciÃ³n especÃ­ficos (DeepSeek-R1, si el flujo es transaccional): Â¿en quÃ© paso es mÃ¡s probable el abandono? Â¿hay campos de formulario innecesarios? Â¿el CTA es inequÃ­voco?",
      "GeneraciÃ³n de wireframes textuales (Claude 3.7 Sonnet): para cada pantalla â€” estructura de contenido, elemento CTA con posiciÃ³n y justificaciÃ³n, navegaciÃ³n, microcopy sugerido para labels, placeholders y mensajes de error",
      "VerificaciÃ³n de jerarquÃ­a visual (Claude 3.7 Sonnet): Â¿el elemento mÃ¡s importante de cada pantalla es visualmente dominante? Â¿hay conflicto de atenciÃ³n entre varios elementos del mismo peso visual?",
      "Salida A: informe de anÃ¡lisis heurÃ­stico con puntuaciÃ³n por principio Â· Salida B: puntos de fricciÃ³n ordenados por impacto estimado Â· Salida C: wireframes textuales por pantalla Â· Salida D: sugerencias de microcopy",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado ariadna_ux.py con las siguientes funciones:
1. parse_user_flow(description: str | dict, llm_client) -> dict:
   normaliza la descripciÃ³n del flujo:
   {flow_name: str, flow_type: str ("onboarding"|"purchase"|"settings"|"other"),
    target_device: str, steps: [{step_id, screen_name, user_actions: list[str],
    visible_elements: list[str]}],
    success_criteria: str, user_persona: str | null}.
2. heuristic_analysis(flow: dict, llm_client) -> dict:
   analiza el flujo contra los 10 principios heurÃ­sticos de Nielsen.
   Devuelve: {overall_score: float,
   heuristics: [{principle_name, score: float (1-10), issues: list[str],
   severity: "low"|"medium"|"high"}],
   total_issues: int, critical_issues: int}.
3. friction_analysis(flow: dict, llm_client) -> list[dict]:
   identifica puntos de fricciÃ³n. Devuelve lista:
   [{step_id, friction_type: str, description: str,
   estimated_drop_off_impact: "low"|"medium"|"high",
   suggested_fix: str}].
4. generate_wireframe_spec(step: dict, flow_context: dict,
   llm_client) -> dict: genera la especificaciÃ³n de pantalla:
   {screen_name, layout_structure: str, elements: [{name, type, position,
   visual_weight: "primary"|"secondary"|"tertiary", copy_suggestion: str}],
   cta: {text, position, rationale}, navigation_options: list[str]}.
5. check_visual_hierarchy(wireframe: dict, llm_client) -> dict:
   verifica la jerarquÃ­a visual de la pantalla.
   Devuelve: {has_clear_primary: bool, attention_conflicts: list[str],
   hierarchy_score: float, recommendations: list[str]}.
6. generate_flow_report(flow: dict, heuristics: dict, friction: list[dict],
   wireframes: list[dict]) -> str: genera el informe completo en Markdown.
Usa duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el analista de UX de Ariadna UX en el Laboratorio de DiseÃ±o & UX de Horizon.

TAREA 1 â€” AnÃ¡lisis heurÃ­stico:
Se te proporciona la descripciÃ³n completa de un flujo de usuario.
EvalÃºa el flujo contra los 10 principios heurÃ­sticos de Nielsen:
1. Visibilidad del estado del sistema
2. Correspondencia entre el sistema y el mundo real
3. Control y libertad del usuario
4. Consistencia y estÃ¡ndares
5. PrevenciÃ³n de errores
6. Reconocimiento en lugar de recuerdo
7. Flexibilidad y eficiencia de uso
8. DiseÃ±o estÃ©tico y minimalista
9. Ayuda a los usuarios a reconocer, diagnosticar y recuperarse de errores
10. Ayuda y documentaciÃ³n

Para cada principio:
- Asigna una puntuaciÃ³n de 1 a 10 (10 = sin problemas detectados).
- Lista los problemas concretos encontrados (con referencia al paso del flujo).
- Clasifica la severidad: low (molestia menor), medium (impacto en conversiÃ³n),
  high (puede provocar abandono).

TAREA 2 â€” GeneraciÃ³n de wireframe textual:
Para cada pantalla del flujo, genera la especificaciÃ³n de contenido.
Ordena los elementos por peso visual (primary > secondary > tertiary).
Para el CTA, justifica su posicionamiento con un principio verificable
(no con una preferencia de estilo).

Restricciones:
- Distingue entre problemas verificables y recomendaciones de estilo.
  Etiqueta las segundas como "RECOMENDACIÃ“N DE ESTILO".
- No inventes datos de conversiÃ³n que no estÃ©n en el briefing.
- Si un paso del flujo es ambiguo, seÃ±Ã¡lalo antes de analizarlo.

Responde en JSON conforme a los esquemas de heuristic_analysis
y generate_wireframe_spec segÃºn la tarea activada.`,
  },
  {
    id: "vitral",
    name: "Vitral CrÃ­tico",
    tagline: "La crÃ­tica estructurada de una interfaz en segundos, no en horas",
    desc: "Recibe una captura de pantalla de una interfaz y produce una crÃ­tica estructurada de su composiciÃ³n visual: contraste texto/fondo verificado contra WCAG 2.1, jerarquÃ­a visual, alineaciÃ³n de elementos, consistencia de espaciado y densidad informativa. Usa una arquitectura en dos etapas: un modelo localiza los elementos con sus coordenadas de bounding box; el otro analiza cada elemento localizado y produce la crÃ­tica fundamentada por dimensiÃ³n.",
    color: "emerald",
    researchLines: ["02", "05"],
    stack: [
      { role: "DetecciÃ³n y localizaciÃ³n de elementos de interfaz (Visual Grounding)", tech: "Gemini 2.0 Pro â€” lÃ­der grounding y detecciÃ³n UI, 92.4 en UI_Element_BBox_Detection (89.75/100)" },
      { role: "CrÃ­tica de accesibilidad, jerarquÃ­a y composiciÃ³n", tech: "Claude 3.7 Sonnet â€” lÃ­der calidad estÃ©tica y cumplimiento WCAG (94.64/100)" },
      { role: "VerificaciÃ³n WCAG algorÃ­tmica", tech: "CÃ¡lculo de ratios de contraste a partir de colores extraÃ­dos de la imagen (colorsys)" },
      { role: "ExtracciÃ³n de colores dominantes", tech: "AnÃ¡lisis de paleta de la captura para cÃ¡lculo de contraste (Pillow)" },
      { role: "AnotaciÃ³n de imagen con bounding boxes", tech: "Pillow â€” marcado por nivel de severidad: rojo (bloqueante), naranja (usabilidad), gris (estilo)" },
      { role: "Almacenamiento", tech: "DuckDB â€” histÃ³rico de auditorÃ­as por interfaz y por versiÃ³n" },
    ],
    whyModels: [
      { model: "Gemini 2.0 Pro", role: "Visual Grounding â€” localizaciÃ³n de elementos UI", score: "89.75", area: "Evidencia Visual, Grounding y SegmentaciÃ³n" },
      { model: "Claude 3.7 Sonnet", role: "AuditorÃ­a WCAG y crÃ­tica de composiciÃ³n", score: "94.64", area: "Calidad EstÃ©tica, Accesibilidad y DiseÃ±o Funcional" },
    ],
    flow: [
      "Entrada: captura de pantalla de la interfaz (PNG, JPG, WebP) + contexto opcional: tipo de interfaz, dispositivo, objetivo principal de la pantalla",
      "DetecciÃ³n y localizaciÃ³n de elementos (Gemini 2.0 Pro): identificaciÃ³n de todos los elementos visibles, bounding box por elemento (x, y, w, h), clasificaciÃ³n del tipo (texto | botÃ³n | imagen | icono | campo de formulario | navegaciÃ³n | fondo), extracciÃ³n del color de texto y fondo por elemento de texto",
      "AuditorÃ­a de contraste WCAG 2.1 (algorÃ­tmica): ratio de contraste texto/fondo para cada elemento de texto â€” etiquetado PASA_AA | PASA_AAA | FALLA | NO_APLICA",
      "AuditorÃ­a de jerarquÃ­a visual (Claude 3.7 Sonnet): Â¿quÃ© elemento deberÃ­a ser el mÃ¡s importante segÃºn el objetivo? Â¿es ese elemento visualmente dominante? Â¿hay conflictos de atenciÃ³n entre elementos de igual peso visual?",
      "AuditorÃ­a de alineaciÃ³n y retÃ­cula: Â¿los elementos estÃ¡n alineados a una retÃ­cula consistente? Inconsistencias de margen o padding entre elementos similares",
      "AuditorÃ­a de densidad informativa: Â¿cuÃ¡ntos elementos compiten por la atenciÃ³n del usuario? Â¿hay informaciÃ³n que podrÃ­a moverse a una pantalla siguiente?",
      "GeneraciÃ³n de informe: por cada problema â€” descripciÃ³n, elemento afectado con referencia al bounding box, severidad, sugerencia de correcciÃ³n concreta Â· PuntuaciÃ³n global por dimensiÃ³n (0-100) Â· Imagen anotada con bounding boxes coloreados por severidad",
    ],
    promptIDE: `Crea un mÃ³dulo Python llamado vitral_critico.py con las siguientes funciones:
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
   llm_client) -> dict: evalÃºa la jerarquÃ­a visual.
   Devuelve: {expected_primary: str, actual_primary: str,
   hierarchy_conflicts: list[{element_id, conflict_description}],
   hierarchy_score: float}.
4. audit_alignment(elements: list[dict]) -> dict:
   detecta inconsistencias de alineaciÃ³n y retÃ­cula.
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
   spacing: dict, llm_client) -> dict: genera el informe crÃ­tico completo:
   {overall_score: float, issues: list[{element_id, bbox, severity,
   dimension, description, suggestion}], summary: str}.
7. annotate_image(image_path: str, issues: list[dict],
   output_path: str) -> None: genera la imagen anotada con bounding boxes
   por nivel de severidad.
Usa Pillow, colorsys (para cÃ¡lculo de contraste), duckdb y la librerÃ­a estÃ¡ndar.`,
    promptLLM: `Eres el crÃ­tico de diseÃ±o de Vitral CrÃ­tico en el Laboratorio de DiseÃ±o & UX
de Horizon. Tu funciÃ³n es analizar los elementos de una interfaz â€”ya detectados
y localizados por el sistema de groundingâ€” y emitir una crÃ­tica fundamentada
por dimensiÃ³n.

Se te proporciona:
- Lista de elementos de interfaz con sus coordenadas, tipos y colores
- Resultados de la verificaciÃ³n algorÃ­tmica de contraste WCAG
- El objetivo principal de la pantalla (quÃ© acciÃ³n debe completar el usuario)

Para cada dimensiÃ³n de tu anÃ¡lisis, distingue explÃ­citamente entre:
1. VERIFICABLE: problemas con criterio objetivo (contraste < 4.5:1 falla WCAG 2.1 AA).
   Cita el estÃ¡ndar o el criterio medible que se incumple.
2. HEURÃSTICO: problemas basados en principios de usabilidad establecidos.
   Cita el principio aplicado.
3. RECOMENDACIÃ“N DE ESTILO: apreciaciones culturalmente situadas o dependientes
   de la guÃ­a de estilo del proyecto. EtiquÃ©talas como tal.

Para cada problema, especifica:
- El element_id del elemento afectado
- La dimensiÃ³n: CONTRASTE | JERARQUÃA | ALINEACIÃ“N | ESPACIADO | DENSIDAD
- La severidad: BLOQUEANTE (accesibilidad incumplida) | USABILIDAD (impacto
  medible en conversiÃ³n o comprensiÃ³n) | ESTILO (recomendaciÃ³n opinable)
- Una sugerencia concreta de correcciÃ³n (no genÃ©rica)

No uses frases como "la interfaz se ve abarrotada" sin cuantificar:
di cuÃ¡ntos elementos compiten por la atenciÃ³n en el Ã¡rea identificada.

Responde en JSON conforme al esquema de generate_critique_report.`,
  },
];

const MARKET_APPS = [
  {
    name: "Figma AI",
    desc: "La plataforma de diseÃ±o colaborativo lÃ­der incorpora funciones de IA generativa para la generaciÃ³n de wireframes, bÃºsqueda visual y ediciÃ³n asistida. Incluye generaciÃ³n de capas y componentes a partir de descripciones textuales.",
    tag: "DiseÃ±o colaborativo",
    url: "https://figma.com/ai",
  },
  {
    name: "Adobe Firefly",
    desc: "Modelo generativo de Adobe integrado en Creative Cloud. Incluye generaciÃ³n de imÃ¡genes, expansiÃ³n de fondo (generative fill), recoloraciÃ³n de vectores y generaciÃ³n de patrones de diseÃ±o.",
    tag: "GeneraciÃ³n de imÃ¡genes",
    url: "https://firefly.adobe.com",
  },
  {
    name: "Uizard",
    desc: "Herramienta de prototipado rÃ¡pido con IA que convierte capturas de wireframes dibujados a mano en prototipos digitales editables, y genera wireframes a partir de descripciones textuales.",
    tag: "Prototipado rÃ¡pido",
    url: "https://uizard.io",
  },
  {
    name: "Galileo AI",
    desc: "Plataforma de generaciÃ³n de interfaces de usuario completas a partir de descripciones de texto, orientada a la creaciÃ³n rÃ¡pida de pantallas de aplicaciÃ³n mÃ³vil y web.",
    tag: "GeneraciÃ³n de UI",
    url: "https://usegalileo.ai",
  },
  {
    name: "UserTesting AI Insights",
    desc: "La plataforma UserTesting incorpora anÃ¡lisis de IA para identificar patrones en sesiones de test de usuario, destacar momentos de fricciÃ³n y sintetizar feedback cualitativo en insights accionables.",
    tag: "InvestigaciÃ³n de usuarios",
    url: "https://usertesting.com",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "4.1 Podio incompleto en Evidencia Visual y Grounding",
    items: [
      "El Ã¡rea de Evidencia Visual, Grounding y SegmentaciÃ³n cuenta con evaluaciones registradas Ãºnicamente para 2 modelos: Gemini 2.0 Pro (89.75/100) y Claude 3.7 Sonnet (82.35/100) (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "El tercer puesto de este podio no cuenta con datos en el archivo de rankings y queda clasificado como [DATO PENDIENTE DE VERIFICAR].",
      "El proyecto Vitral CrÃ­tico asume la arquitectura de dos etapas basÃ¡ndose en los dos modelos disponibles. Si emerge un tercer modelo competitivo, el stack debe revisarse.",
    ],
  },
  {
    id: "v2",
    title: "4.2 AsimetrÃ­a en la cobertura de benchmarks por modelo",
    items: [
      "ComprensiÃ³n Visual: Gemini 2.0 Pro (67% de cobertura) carece de evaluaciÃ³n en OK_VQA_Knowledge (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "DiseÃ±o Generativo de Espacios: tanto ArchiGPT-CAD-Flow (67%) como GPT-4.5 (67%) carecen de resultado en Product_3D_Ergonomics_Synthesis.",
      "Efectividad de UI/UX: ningÃºn modelo alcanza el 100% de cobertura â€” Claude 3.7 Sonnet no tiene datos en Checkout_Friction_Reduction, DeepSeek-R1 carece de evaluaciÃ³n en CTA_Visual_Hierarchy_Impact, y GPT-4.5 solo fue evaluado en WiserUI_Bench_AB_Winner (33% de cobertura).",
      "Calidad EstÃ©tica y Accesibilidad: Archigen-Spatial-Agent (33%) solo dispone de evaluaciÃ³n en Visual_Balance_Typography_Ratio.",
      "ComprensiÃ³n Cultural: GPT-4.5 (67%) carece de evaluaciÃ³n en Multilingual_UI_Localization, y Gemini 2.0 Pro (33%) solo registra datos en Regional_Iconography_Semantics.",
    ],
  },
  {
    id: "v3",
    title: "4.3 Ausencia de benchmarks de generaciÃ³n de identidades visuales corporativas",
    items: [
      "El catÃ¡logo oficial del mÃ³dulo evalÃºa VQA con conocimiento externo, grounding, diseÃ±o espacial, experimentos A/B, accesibilidad WCAG y localizaciÃ³n cultural.",
      "Las evaluaciones cuantitativas dedicadas especÃ­ficamente a la sÃ­ntesis de identidades corporativas completas (logotipos vectoriales, sistemas de marca) quedan registradas como [DATO PENDIENTE DE VERIFICAR].",
      "Los proyectos GÃ©nesis Visual y Vitral CrÃ­tico aplican benchmarks relacionados (calidad estÃ©tica, coherencia estilÃ­stica) como proxies razonados, no como mediciÃ³n directa de branding.",
    ],
  },
  {
    id: "v4",
    title: "4.4 Puntuaciones bajas en Efectividad de UI/UX vs. otras Ã¡reas",
    items: [
      "Las puntuaciones del Ã¡rea de Efectividad de UI/UX en Comportamiento de Usuario son significativamente mÃ¡s bajas que las de otras Ã¡reas: el lÃ­der Claude 3.7 Sonnet alcanza 83.33/100, comparado con 94.64/100 en el Ã¡rea de accesibilidad (Fuente: STATER Design Leaderboard, latest_rankings_design.md).",
      "Este diferencial sugiere que la predicciÃ³n de resultados reales de A/B testing es considerablemente mÃ¡s difÃ­cil que la auditorÃ­a de accesibilidad algorÃ­tmica.",
      "Debe comunicarse al usuario de Ariadna UX: el sistema puede auditar jerarquÃ­a y accesibilidad con alta fiabilidad, pero la predicciÃ³n de conversiÃ³n tiene mayor incertidumbre.",
    ],
  },
  {
    id: "v5",
    title: "4.5 Latencias en inferencia multimodal y costes por token de visiÃ³n",
    items: [
      "El tiempo de inferencia por imagen en alta resoluciÃ³n y el coste operativo por megapixel/token visual de los VLMs evaluados no constan en el archivo de rankings.",
      "Permanece como [DATO PENDIENTE DE VERIFICAR] â€” dato relevante para Vitral CrÃ­tico en uso intensivo (auditorÃ­a de mÃºltiples pantallas en un sistema de diseÃ±o completo).",
      "Para despliegues en producciÃ³n con volumen alto de auditorÃ­as, este dato es necesario para estimar el coste operativo real del sistema.",
    ],
  },
];

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Modelo lÃ­der Â· STATER Design Leaderboard</p>
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
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por quÃ© estos modelos Â· STATER Design Leaderboard</p>
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

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
                <span className="text-xs text-white/20">STATER Design & UX Â· 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-amber-400">DiseÃ±o</span>
                {" & "}
                <span className="text-rose-400">UX</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para branding generativo, anÃ¡lisis heurÃ­stico de flujos y crÃ­tica estructurada de interfaces.
                El laboratorio distingue explÃ­citamente entre criterios verificables â€” contraste WCAG, tasas de conversiÃ³n â€” y recomendaciones de estilo.
              </p>

              {/* Nota metodolÃ³gica */}
              <div className="mt-5 inline-flex items-start gap-2 border border-amber-400/20 bg-amber-400/5 rounded-xl px-4 py-3 max-w-xl">
                <Eye size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/70 leading-relaxed">
                  <strong className="text-amber-300">Nota metodolÃ³gica:</strong> en diseÃ±o, algunas afirmaciones son objetivamente medibles (ratio de contraste, tasa de abandono). Otras son recomendaciones de estilo, culturalmente situadas y legÃ­timamente opinables. Este laboratorio distingue explÃ­citamente entre ambas en cada mÃ³dulo.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Dimensiones de investigaciÃ³n", value: "6" },
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
                El diseÃ±o tiene una doble naturaleza: hay partes objetivamente medibles (ratio de contraste, tasa de abandono, porcentaje de elementos que cumplen WCAG 2.1) y partes genuinamente subjetivas (quÃ© paleta comunica Â«confianzaÂ» para un pÃºblico especÃ­fico, quÃ© tipografÃ­a transmite Â«autoridad sin frialdadÂ»). Seis dimensiones activas de investigaciÃ³n, ordenadas desde la percepciÃ³n visual hasta la comprensiÃ³n cultural.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => (
              <ResearchLineCard key={line.id} line={line} />
            ))}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">De la percepciÃ³n al impacto</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las seis dimensiones no son paralelas: se encadenan en el proceso real de un proyecto de diseÃ±o. El branding visual (dimensiÃ³n 03) informa la paleta y tipografÃ­a de las interfaces (dimensiÃ³n 05). La accesibilidad (dimensiÃ³n 05) debe verificarse en todos los mercados objetivo (dimensiÃ³n 06). Y la efectividad final se mide en comportamiento real de usuario (dimensiÃ³n 04), que es el Ãºnico juicio definitivo.
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
                Tres proyectos que cubren el ciclo completo de diseÃ±o: de la identidad visual inicial (GÃ©nesis Visual) al anÃ¡lisis de flujos y usabilidad (Ariadna UX) hasta la crÃ­tica estructurada de interfaces existentes (Vitral CrÃ­tico). Cada uno distingue explÃ­citamente entre lo verificable y lo opinable.
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
                Cinco aplicaciones reales de IA aplicada a diseÃ±o y UX que operan en el mercado en el momento de redacciÃ³n de este cuaderno. Para detalles exactos de caracterÃ­sticas actuales o precios, verificar en la web oficial de cada herramienta.
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
                Cinco puntos que requieren revisiÃ³n antes de publicar o referenciar los datos de este cuaderno en materiales externos. Incluyen podios incompletos, asimetrÃ­as de cobertura y el diferencial entre predicciÃ³n de conversiÃ³n y auditorÃ­a de accesibilidad.
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
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo Â· STATER Design & UX Leaderboard Â· 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_design.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_design.yaml</code>.
              Distingue explÃ­citamente entre criterios verificables y recomendaciones de estilo.
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

