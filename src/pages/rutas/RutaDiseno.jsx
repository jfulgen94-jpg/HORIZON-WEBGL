import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Layers } from "lucide-react";
import { Cpu } from "lucide-react";
import { Monitor } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Search } from "lucide-react";
import { Palette } from "lucide-react";
import { Star } from "lucide-react";
import { Clipboard } from "lucide-react";
import { Check } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio DiseÃ±o Â· AlpacaEval Â· MT-Bench Creative Â· LMSYS Chatbot Arena", motivo: "Verificar quÃ© modelos tienen mejor performance en escritura creativa y UX copy antes de elegir." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Definir quÃ© tipos de copy UX y criterios de evaluaciÃ³n cubre la v1." },
  { capa: "2", subcapa: "2.1", herramienta: "JSON local Â· entrada manual", motivo: "Biblioteca de tareas UX predefinidas + entrada libre del usuario." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para tareas UX y sus evaluaciones." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators Â· re", motivo: "Validar longitudes de copy, presencia de criterios obligatorios." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de generaciones con puntuaciones por criterio y modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual", motivo: "15 tareas UX de 3 categorÃ­as (microcopy, onboarding, mensajes de error)." },
  { capa: "3", subcapa: "3.1", herramienta: "data_design/rankings/", motivo: "Seleccionar modelo con mejor score en tareas de escritura creativa." },
  { capa: "3", subcapa: "3.2", herramienta: "Few-shot prompting", motivo: "Dar ejemplos de formato de respuesta (3 variantes numeradas con justificaciÃ³n)." },
  { capa: "3", subcapa: "3.3", herramienta: "re (regex) Â· json", motivo: "Extraer las 3 variantes numeradas del texto del LLM." },
  { capa: "3", subcapa: "3.4", herramienta: "Python puro (reglas)", motivo: "Criterios medibles automÃ¡ticamente: longitud, presencia de palabras clave." },
  { capa: "3", subcapa: "3.5", herramienta: "httpx Â· openai SDK [VERIFICAR DOCS]", motivo: "LLM-as-judge: un segundo LLM puntÃºa la calidad UX del copy." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Mostrar copy sin puntuaciÃ³n si el LLM-judge falla." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Tarjetas comparativas y paneles de puntuaciÃ³n." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "ConexiÃ³n entre capas." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de parseo de variantes y criterios de puntuaciÃ³n." },
  { capa: "6", subcapa: "6.3", herramienta: "Tareas UX reales del usuario", motivo: "ValidaciÃ³n con casos de uso reales." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar comparativas de modelos en tareas creativas." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Multimodal",
    area: "DiseÃ±o & UX",
    title: "GÃ©nesis Visual â€” Evaluador de copy con contexto visual",
    desc: "Extiende Forma IA aÃ±adiendo la imagen de la pantalla o componente como contexto. El LLM evalÃºa si el copy es coherente con el diseÃ±o visual circundante, no solo con la descripciÃ³n de texto.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el alcance incluye anÃ¡lisis de coherencia copyâ€“visual; requiere modelo multimodal (GPT-4o Vision, Claude Opus)",
      "Capa 2: UXTask aÃ±ade campo screenshot_path (imagen del componente o pantalla)",
      "Capa 3: el prompt del generador incluye la imagen y el texto como contexto conjunto",
      "Capa 3: el LLM-judge evalÃºa adicionalmente si el tono del copy encaja con el estilo visual detectado",
      "Capa 4: el formulario aÃ±ade un selector de imagen; las tarjetas de resultado muestran la imagen junto al copy",
      "Advertencia: los modelos multimodales tienen mayor coste por llamada; activar solo cuando la imagen sea relevante",
    ],
  },
  {
    tag: "v3 Â· Multimarca",
    area: "DiseÃ±o & UX",
    title: "Ariadna UX â€” Gestor de guÃ­as de tono de marca",
    desc: "Forma IA con perfiles de marca guardados. El usuario define una vez el tono, vocabulario y restricciones de cada cliente o producto; cada generaciÃ³n aplica automÃ¡ticamente el perfil correcto.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 2: tabla brand_profiles en DuckDB con tono, vocabulario preferido, palabras prohibidas, max_length por tipo de copy",
      "Capa 2: UXTask referencia un brand_profile_id en lugar de texto de contexto libre",
      "Capa 3: el prompt del generador inyecta el perfil completo de marca como instrucciÃ³n del sistema",
      "Capa 4: pantalla de gestiÃ³n de perfiles (crear, editar, duplicar) antes de la pantalla de generaciÃ³n",
      "Capa 5: la selecciÃ³n de perfil actualiza automÃ¡ticamente los criterios de evaluaciÃ³n configurados en ese perfil",
      "Ãštil para consultores de contenido que trabajan con mÃºltiples marcas con tonos muy diferentes",
    ],
  },
  {
    tag: "v4 Â· VotaciÃ³n",
    area: "DiseÃ±o & UX",
    title: "Vitral CrÃ­tico â€” Modo revisiÃ³n con voto humano",
    desc: "AÃ±ade un sistema de votaciÃ³n donde el usuario marca su variante favorita tras leer las puntuaciones del LLM-judge. Las preferencias humanas acumuladas generan un segundo leaderboard de modelos basado en criterio humano real.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 2: tabla human_votes con task_id, variant_index, user_comment y timestamp",
      "Capa 3: la puntuaciÃ³n aggregate_score combina el score del LLM-judge con el historial de votos humanos (ponderaciÃ³n configurable)",
      "Capa 4: cada tarjeta aÃ±ade un botÃ³n 'Mi favorita' que registra el voto; solo se puede votar una variante por tarea",
      "Capa 4: vista de EstadÃ­sticas muestra leaderboard de modelos segÃºn preferencia humana vs. segÃºn LLM-judge (comparativa)",
      "Relevante para analizar si el LLM-judge es un buen predictor del criterio humano en copy creativo",
      "Publicar el dataset de votos en el Foro de Proyectos para la comunidad de diseÃ±adores",
    ],
  },
];

// â”€â”€â”€ Phase map data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  {
    icon: Search,
    label: "Fase 0",
    title: "InvestigaciÃ³n",
    color: C.accent,
    summary: "Benchmarks de creatividad, LLM-as-judge y selecciÃ³n de modelos",
  },
  {
    icon: Layers,
    label: "Capas 1â€“2",
    title: "DefiniciÃ³n y datos",
    color: "#7C3AED",
    summary: "Alcance de v1, esquemas Pydantic, DuckDB y biblioteca de tareas UX",
  },
  {
    icon: Cpu,
    label: "Capa 3",
    title: "LÃ³gica / IA",
    color: C.emerald,
    summary: "Prompt maestro de variantes, parseo, evaluaciÃ³n automÃ¡tica y LLM-judge",
  },
  {
    icon: Monitor,
    label: "Capa 4",
    title: "Interfaz (Flet)",
    color: "#DB2777",
    summary: "Formulario, tarjetas comparativas, historial y estadÃ­sticas de modelos",
  },
  {
    icon: RefreshCw,
    label: "Capas 5â€“6",
    title: "IntegraciÃ³n y pruebas",
    color: C.amber,
    summary: "Pipeline completo, gestiÃ³n de errores, tests y empaquetado",
  },
  {
    icon: Star,
    label: "Fase 7",
    title: "IteraciÃ³n",
    color: "#64748B",
    summary: "Planificar v2 y publicar en el Foro de Proyectos Horizon",
  },
];

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaDiseno() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100%" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink to="/taller" label="Volver al Taller" />

        {/* â”€â”€ Header â”€â”€ */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(219,39,119,0.10)" }}>
              <Palette size={17} style={{ color: "#DB2777" }} />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "rgba(17,17,17,0.35)" }}>Ruta del Taller Â· DiseÃ±o & UX</div>
              <div className="text-[11px]" style={{ color: "rgba(17,17,17,0.30)" }}>Proyecto: Forma IA</div>
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl mb-4 leading-tight"
            style={{ color: C.dark }}>
            Forma IA
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "rgba(17,17,17,0.55)" }}>
            App de escritorio que ayuda a diseÃ±adores y creativos a evaluar la calidad de contenido UX/copy generado por LLMs â€” microcopy, mensajes de error, flujos de onboarding â€” calificÃ¡ndolo segÃºn criterios de diseÃ±o profesionales y comparando la calidad entre modelos.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Python", "Flet", "Pydantic v2", "DuckDB", "LLM-as-judge", "PyInstaller"].map(t => (
              <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
                style={{ borderColor: "rgba(219,39,119,0.20)", color: "#DB2777", background: "rgba(219,39,119,0.06)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* â”€â”€ Resultado esperado â”€â”€ */}
        <div className="rounded-2xl border p-6 mb-10"
          style={{ borderColor: "rgba(219,39,119,0.18)", background: "rgba(219,39,119,0.03)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Clipboard size={14} style={{ color: "#DB2777" }} />
            <span className="text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: "#DB2777" }}>Resultado esperado al completar la ruta</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Un ejecutable de escritorio que el usuario abre con doble clic, introduce una tarea de diseÃ±o UX (ej. "escribe el microcopy para el botÃ³n de confirmaciÃ³n de compra en un e-commerce de lujo"), recibe 3 variantes de copy de distintos LLMs, las evalÃºa con criterios configurables (claridad, tono de marca, longitud) y guarda el historial con puntuaciones comparativas. El sistema incluye un segundo LLM actuando como juez que puntÃºa la calidad de cada variante con criterios de UX profesional.
          </p>
        </div>

        {/* â”€â”€ Human validation warning â”€â”€ */}
        <HumanValidationWarning />

        {/* â”€â”€ Phase map â”€â”€ */}
        <div className="mb-10">
          <div className="text-[11px] font-semibold tracking-widest uppercase mb-5"
            style={{ color: "rgba(17,17,17,0.35)" }}>Mapa de la ruta</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {PHASES.map((ph, i) => {
              const Icon = ph.icon;
              return (
                <div key={i} className="rounded-xl border p-4"
                  style={{ borderColor: "rgba(17,17,17,0.09)", background: "white" }}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: ph.color + "14" }}>
                      <Icon size={13} style={{ color: ph.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest uppercase"
                        style={{ color: ph.color }}>{ph.label}</div>
                      <div className="text-[13px] font-semibold leading-tight" style={{ color: C.dark }}>{ph.title}</div>
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>{ph.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* â”€â”€ Tools table â”€â”€ */}
        <div className="mb-10">
          <button
            onClick={() => setToolsOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl border text-sm font-medium transition-colors hover:bg-black/[0.02]"
            style={{ borderColor: "rgba(17,17,17,0.10)", color: "rgba(17,17,17,0.55)", background: "white" }}>
            Herramientas necesarias por capa
            <ChevronDown size={15} style={{ transform: toolsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {toolsOpen && (
            <div className="mt-2 rounded-xl border overflow-hidden"
              style={{ borderColor: "rgba(17,17,17,0.09)" }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: "rgba(17,17,17,0.04)" }}>
                    {["Capa", "Subcapa", "Herramienta", "Por quÃ© aquÃ­"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold"
                        style={{ color: "rgba(17,17,17,0.50)", borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOOLS_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "white" : "rgba(17,17,17,0.015)" }}>
                      <td className="px-4 py-2.5 font-semibold" style={{ color: "#DB2777" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.50)" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-medium" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)" }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 â€” INVESTIGACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          color={C.accent}
          label="Fase 0"
          title="InvestigaciÃ³n â€” Benchmarks de creatividad y LLM-as-judge"
          desc="Antes de construir, entender quÃ© modelos son mÃ¡s potentes en escritura creativa y si el patrÃ³n LLM-as-judge es viable para evaluar copy UX."
        />

        <Step num="0.A" title="Benchmarks de escritura creativa y copy UX" defaultOpen
          goal="Saber quÃ© benchmarks miden la calidad de escritura creativa en LLMs y quÃ© modelo lidera.">
          <PromptBlock label="Prompt 0.A â€” Benchmarks de creatividad">
{`ActÃºa como Investigador Principal en EvaluaciÃ³n de Inteligencia Artificial para Tareas Creativas y Copywriting UX.

Tengo como objetivo seleccionar los modelos mÃ¡s capaces para "Forma IA", una herramienta de generaciÃ³n y evaluaciÃ³n de microcopy y textos de interfaz de usuario.

Analiza los benchmarks y entornos de evaluaciÃ³n de creatividad (AlpacaEval, MT-Bench Creative, LMSYS Chatbot Arena Creative, CreativeBench) y responde de forma estructurada a los siguientes puntos:

1. EVALUACIÃ“N DE ESCRITURA CREATIVA VS. COPYWRITING DE INTERFAZ:
   - Â¿QuÃ© diferencias metodolÃ³gicas existen entre evaluar "escritura creativa abierta" (relatos, metÃ¡foras) frente a "UX writing / microcopy" (concisiÃ³n, claridad operativa, reducciÃ³n de fricciÃ³n cognitiva, llamadas a la acciÃ³n directas)?
   - Â¿En quÃ© medida los benchmarks de seguimiento estricto de instrucciones (Instruction Following / IFEval) son mÃ¡s representativos para UX copy con lÃ­mites de caracteres que los benchmarks literarios?

2. RANKING COMPARATIVO DE MODELOS GENERADORES:
   - BasÃ¡ndote en datos de AlpacaEval y LMSYS Arena, Â¿quÃ© modelos actuales (Claude 3.5 Sonnet / 3.7, GPT-4o, Gemini 1.5/2.0 Pro) exhiben la mayor versatilidad tonal y el menor Ã­ndice de redundancia o frases de relleno?

3. PRECISIÃ“N EN RESTRICCIONES DE LONGITUD:
   - En microcopy para botones y tooltips (lÃ­mite estricto de 20-30 caracteres), Â¿quÃ© modelos respetan consistentemente las restricciones de longitud sin truncar de forma incoherente?

REGLAS ESTRICTAS:
- Cita mÃ©tricas y comportamientos observables reales. No inventes puntuaciones.`}
          </PromptBlock>
        </Step>

        <Step num="0.B" title="LLM-as-Judge: viabilidad para evaluar copy UX"
          goal="Entender las limitaciones del patrÃ³n LLM-as-judge antes de implementarlo.">
          <PromptBlock label="Prompt 0.B â€” LLM-as-judge">
{`ActÃºa como Especialista en Arquitecturas de EvaluaciÃ³n AutomÃ¡tica y PatrÃ³n LLM-as-a-Judge.

Antes de implementar el motor evaluador de "Forma IA", necesito definir la arquitectura de juicio automÃ¡tico para calificar copy UX:

1. SESGOS CONOCIDOS DEL PATRÃ“N LLM-AS-A-JUDGE:
   - Sesgo de autocomplacencia (*Self-enhancement bias*): Â¿Tiende un modelo a calificar mejor sus propias respuestas que las de modelos competidores?
   - Sesgo de longitud (*Verbosity bias*): Â¿Penaliza o premia indebidamente textos mÃ¡s largos en contextos donde se requiere extrema brevedad (microcopy)?
   - Sesgo de orden (*Position bias*): Â¿Afecta el orden de presentaciÃ³n de las variantes al emitir una puntuaciÃ³n comparativa?

2. ESTRATEGIA DE DESACOPLE (GENERADOR VS. JUEZ):
   - Â¿Es metodolÃ³gicamente preferible utilizar un modelo diferente como juez (ej. GPT-4o evaluando a Claude 3.5 o viceversa) o parametrizar el mismo modelo con temperatura 0.0 y rÃºbricas heurÃ­sticas estrictas?

3. TAXONOMÃA DE CRITERIOS EVALUABLES:
   - Clasifica los criterios de UX copy entre:
     a) Criterios Deterministas/Objetivos (calculables en cÃ³digo Python: longitud en caracteres, presencia de verbos de acciÃ³n, ausencia de palabras tÃ©cnicas).
     b) Criterios SemÃ¡nticos/Subjetivos (evaluables mediante LLM-judge: claridad del mensaje, empatÃ­a tonal, adecuaciÃ³n a la audiencia).

Entrega la rÃºbrica formal de evaluaciÃ³n con escala 0-10 para los criterios semÃ¡nticos.`}
          </PromptBlock>
          <div className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: "rgba(245,158,11,0.08)", borderLeft: "3px solid " + C.amber, color: "#92400E" }}>
            <strong>Advertencia sobre el LLM-as-judge:</strong> Las puntuaciones que genera un LLM para evaluar copy creativo son orientativas, no definitivas. El juicio humano de un diseÃ±ador con criterio de marca sigue siendo insustituible. La app presenta las puntuaciones como una guÃ­a, no como un veredicto.
          </div>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPAS 1â€“2 â€” DEFINICIÃ“N Y DATOS
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Layers}
          color="#7C3AED"
          label="Capas 1â€“2"
          title="DefiniciÃ³n del problema y estructura de datos"
          desc="QuiÃ©n usa la app, quÃ© entra y sale, esquemas Pydantic y biblioteca de tareas UX."
        />

        <Step num="1.1" title="Â¿QuiÃ©n usa esta app?"
          goal="Perfil de usuario concreto que determina el diseÃ±o de la interfaz.">
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario">
{`ActÃºa como DiseÃ±ador de Producto y UX Strategist en Sistemas de DiseÃ±o.

Define la ficha formal de perfil de usuario (User Persona) para "Forma IA":

1. IDENTIFICACIÃ“N Y ROL OPERATIVO:
   - Perfil principal: DiseÃ±ador de Producto / UX Writer en startups o agencias digitales que redacta microcopy para flujos de conversiÃ³n, onboarding y estados de error en interfaces web/mÃ³vil.
   - Perfil secundario: Consultor de contenido o Growth Marketer que gestiona mÃºltiples marcas con manuales de tono diferenciados.

2. FLUJO DE TRABAJO ACTUAL Y PUNTOS DE DOLOR:
   - Proceso actual: RedacciÃ³n manual o prompting ad-hoc en interfaces web de chat (ChatGPT/Claude), copiando y pegando variantes sin mÃ©tricas objetivas de longitud ni control de tono unificado.
   - Puntos crÃ­ticos: Exceder los lÃ­mites de caracteres de los componentes de diseÃ±o (botones, banners), usar jerga tÃ©cnica agresiva en mensajes de error y falta de trazabilidad en las decisiones de copy.

3. REQUERIMIENTOS CLAVE DE LA APLICACIÃ“N:
   - Vista en paralelo de 3 variantes contrastadas con justificaciÃ³n de enfoque.
   - PuntuaciÃ³n automÃ¡tica inmediata (longitud, verbos de acciÃ³n, tono de marca).
   - Copiado en un solo clic al portapapeles para pegar directamente en Figma o en el cÃ³digo fuente.`}
          </PromptBlock>
        </Step>

        <Step num="1.2" title="Â¿QuÃ© problema concreto resuelve?"
          goal="Una sola frase de problema. Tres variantes; elige una.">
          <PromptBlock label="Prompt 1.2 â€” DefiniciÃ³n del problema">
{`ActÃºa como Especialista en Propuesta de Valor y Estrategia UX.

Redacta la declaraciÃ³n formal del problema que resuelve "Forma IA":

1. ESTRUCTURA FORMAL DE LA FRASE MAESTRA:
   "[DISEÃ‘ADOR/A UX] invierte [TIEMPO EXCESIVO] iterando microcopy y textos de interfaz sin contar con [MÃ‰TRICAS OBJETIVAS NI COMPARATIVAS DE MODELOS], lo que provoca [COPY INCONSISTENTE CON EL TONO DE MARCA, ROTURA DE COMPONENTES POR EXCESO DE LONGITUD Y FRICCIÃ“N EN LA EXPERIENCIA DEL USUARIO]."

2. GENERACIÃ“N DE 3 VARIANTES DE ENFOQUE:
   - Variante 1 (Enfoque en Eficiencia y Velocidad de IteraciÃ³n): ReducciÃ³n drÃ¡stica del tiempo de redacciÃ³n de variantes en Figma.
   - Variante 2 (Enfoque en Calidad y Consistencia de Marca): GarantÃ­a de adhesiÃ³n a guÃ­as de tono y erradicaciÃ³n de lenguaje tÃ©cnico en errores.
   - Variante 3 (Enfoque en AuditorÃ­a y Benchmarking): ComparaciÃ³n objetiva de rendimiento entre diferentes modelos de lenguaje.

3. POSICIONAMIENTO DE LA HERRAMIENTA:
   - Lema rector: "Forma IA no sustituye el criterio del diseÃ±ador; genera variantes divergentes y evalÃºa heurÃ­sticas clave para fundamentar decisiones de diseÃ±o Ã¡giles y consistentes".`}
          </PromptBlock>
        </Step>

        <Step num="1.3" title="Â¿QuÃ© datos entran?"
          goal="Lista completa de inputs con tipo, restricciones y valor por defecto.">
          <PromptBlock label="Prompt 1.3 â€” Inputs">
{`ActÃºa como Arquitecto de InformaciÃ³n y DiseÃ±ador de Entradas en Sistemas de DiseÃ±o.

Define la especificaciÃ³n exhaustiva de todas las entradas (Inputs) admitidas por "Forma IA":

1. ENTRADAS DE TAREA Y CONTEXTO:
   - **DescripciÃ³n de la Tarea (Task Description):** Texto libre (hasta 500 caracteres) que define el componente y su objetivo (ej. *"BotÃ³n de confirmaciÃ³n de compra para e-commerce premium"*).
   - **Contexto de Marca (Brand Context):** Campo multilÃ­nea (hasta 300 caracteres) que define: tono (formal, cercano, ingenioso, sobrio), sector y pÃºblico objetivo.
   - **LÃ­mite MÃ¡ximo de Longitud (Max Length):** Entero opcional en caracteres (ej. 25 para botones, 80 para tooltips, 150 para onboarding).
   - **CategorÃ­a de Componente:** Selector exclusivo: \`microcopy\`, \`error_messages\`, \`onboarding\`, \`product_descriptions\`.

2. BIBLIOTECA PRECARGADA DE EJEMPLOS:
   - Selector para cargar instantÃ¡neamente cualquiera de las 15 tareas preconfiguradas del archivo local \`sample_ux_tasks.json\`.

3. PARÃMETROS DE GENERACIÃ“N Y EVALUACIÃ“N:
   - **Modelo Generador:** Selector de modelo (Claude 3.5 Sonnet por defecto).
   - **NÃºmero de Variantes:** 2 o 3 variantes divergentes.
   - **Criterios de EvaluaciÃ³n Seleccionados:** Checkboxes activos: Claridad, Verbo de AcciÃ³n, Longitud Apropiada, EmpatÃ­a Tonal.
   - **Switch LLM-as-a-Judge:** ActivaciÃ³n opcional de evaluaciÃ³n mediante un segundo modelo juez.`}
          </PromptBlock>
        </Step>

        <Step num="1.4" title="Â¿QuÃ© sale?"
          goal="Outputs por tarea: variantes, puntuaciones, comparativa, recomendaciÃ³n.">
          <PromptBlock label="Prompt 1.4 â€” Outputs">
{`ActÃºa como DiseÃ±ador de Salidas de InformaciÃ³n y Experiencia de Usuario.

Define las especificaciones de salida (Outputs) producidas por "Forma IA":

1. ESTRUCTURA DE CADA VARIANTE GENERADA (CopyVariant):
   - **Texto del Copy:** Texto final listo para su uso directo en la interfaz (sin comillas ni etiquetas redundantes).
   - **JustificaciÃ³n del Enfoque (1-2 frases):** ExplicaciÃ³n del razonamiento psicolÃ³gico y comunicativo empleado por el LLM.
   - **Conteo de Caracteres Reactivo:** NÃºmero exacto de caracteres e indicador visual si supera el lÃ­mite establecido.
   - **DetecciÃ³n de Verbo de AcciÃ³n:** Flag booleano que comprueba si la variante inicia con una llamada clara a la acciÃ³n.
   - **Puntuaciones por Criterio (0 a 10):** Desglose visual en barras de progreso para cada criterio evaluado.
   - **PuntuaciÃ³n Agregada (Aggregate Score):** Promedio ponderado de todas las dimensiones evaluadas.

2. COMPARATIVA Y RECOMENDACIÃ“N GLOBAL:
   - **Badge de Variante Recomendada:** Destacado visual en la tarjeta con la mayor puntuaciÃ³n agregada.
   - **BotÃ³n de Copiado en 1 Clic:** Copiado directo al portapapeles del sistema con feedback visual (SnackBar / cambio de icono).
   - **ExportaciÃ³n en Texto Plano / Markdown:** Informe descargable con todas las variantes y sus justificaciones para documentar el sistema de diseÃ±o.`}
          </PromptBlock>
        </Step>

        <Step num="1.5" title="Criterios de Ã©xito"
          goal="6â€“8 criterios verificables para saber cuÃ¡ndo la v1 estÃ¡ lista.">
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`ActÃºa como QA Lead y Evaluador de Calidad en Aplicaciones de DiseÃ±o.

Define los Criterios de AceptaciÃ³n Cuantitativos (Definition of Done - DoD) para certificar que Forma IA v1 estÃ¡ lista para producciÃ³n:

Formula entre 6 y 8 criterios verificables bajo la estructura:
"La aplicaciÃ³n se considera correcta y lista para entrega cuando [CONDICIÃ“N VERIFICABLE Y MEDIBLE]."

Incluye obligatoriamente:
1. EXTRACCIÃ“N Y PARSEO RESILIENTE: "El parser extrae correctamente el 100% de las 3 variantes estructuradas a partir de la respuesta del modelo generador."
2. CÃLCULO DETERMINISTA DE LONGITUD: "El recuento de caracteres y la validaciÃ³n de longitud mÃ¡xima se calculan con 100% de exactitud mediante cÃ³digo Python puro sin delegar en el LLM."
3. TOLERANCIA A FALLOS DEL JUEZ: "Si el modelo juez no responde o agota el timeout, la app despliega las variantes generadas con las mÃ©tricas automÃ¡ticas sin bloquear la interfaz."
4. PERSISTENCIA EN HISTORIAL: "Todas las tareas, variantes generadas y puntuaciones se persisten de forma Ã­ntegra en DuckDB y se recuperan instantÃ¡neamente entre sesiones."
5. VELOCIDAD Y USABILIDAD: "El copiado al portapapeles se ejecuta en < 100ms y la interfaz Flet no sufre bloqueos durante las llamadas asÃ­ncronas a las APIs."
6. UTILIDAD PERCIBIDA EN PRUEBA MANUAL: "En una evaluaciÃ³n manual de 10 tareas reales, al menos 8 generan variantes inmediatamente utilizables en un producto digital."`}
          </PromptBlock>
        </Step>

        <Step num="1.6" title="LÃ­mites explÃ­citos de la v1"
          goal="DeclaraciÃ³n de lo que la app no hace. Fundamental para gestionar expectativas.">
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites de la v1">
{`ActÃºa como Product Manager y DiseÃ±ador de Sistemas.

Redacta la DeclaraciÃ³n Formal de LÃ­mites y Alcance para "Forma IA v1":

1. LÃMITES TÃ‰CNICOS Y FUNCIONALES EXCLUIDOS EN LA V1:
   - Solo texto plano: No genera maquetas grÃ¡ficas, wireframes en SVG ni cÃ³digo HTML/CSS estilizado.
   - Idioma: Optimizado exclusivamente para espaÃ±ol e inglÃ©s en la v1.
   - Sin anÃ¡lisis multimodal de pantallas: No procesa capturas de pantalla ni archivos de Figma de forma directa (reservado para v2 GÃ©nesis Visual).

2. LÃMITES EN LA EVALUACIÃ“N AUTOMÃTICA (LLM-AS-A-JUDGE):
   - Naturaleza Orientativa: Las puntuaciones emitidas por el modelo juez son asistenciales y no sustituyen las pruebas de usabilidad con usuarios reales ni el criterio del diseÃ±ador.
   - Factores Subjetivos: La evaluaciÃ³n no puede certificar la "belleza" ni el "impacto emocional" absoluto de un copy fuera de su contexto interactivo completo.

3. COMUNICACIÃ“N EN LA INTERFAZ:
   - InclusiÃ³n de un badge visual permanente *"EvaluaciÃ³n Asistida por IA (Orientativa)"* junto a las barras de puntuaciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.1" 
          title="Fuente de datos â€” Biblioteca de tareas UX" 
          goal="FunciÃ³n de carga de la biblioteca y creaciÃ³n de tareas manuales."
        >
          <PromptBlock label="Prompt 2.1 â€” Fuente de datos">
{`ActÃºa como Ingeniero de Datos en Python y DiseÃ±ador de Bibliotecas UX.

Implementa el mÃ³dulo de ingesta y carga de tareas \`task_loader.py\` para "Forma IA":

1. FUNCIONES PRINCIPALES CON \`pathlib\`:
   - \`load_ux_task_library(file_path: Path | str) -> list[UXTask]\`:
     * Lee y deserializa el archivo local JSON de plantillas de diseÃ±o.
     * Valida cada entrada mediante el esquema Pydantic \`UXTask\`.
     * Retorna la lista ordenada por categorÃ­a (\`microcopy\`, \`error_messages\`, \`onboarding\`, \`product_descriptions\`).
     * En caso de ausencia del archivo, captura la excepciÃ³n y retorna una lista vacÃ­a con log explicativo.
   - \`create_manual_task(description: str, brand_context: str, max_length: int | None, category: str, criteria: list[str]) -> UXTask\`:
     * Genera un identificador Ãºnico \`task_id\` con formato UUID4.
     * Asigna \`source = "manual"\` y marca la fecha y hora de creaciÃ³n.

2. MANEJO DE RUTAS:
   - Prohibido utilizar rutas absolutas hardcodeadas. Emplear \`pathlib.Path(__file__).parent\` para resolver la ubicaciÃ³n relativa del dataset.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquemas Pydantic v2" 
          goal="UXTask, CopyVariant y UXEvaluation bien definidos con docstrings."
        >
          <PromptBlock label="Prompt 2.2 â€” Modelos Pydantic">
{`ActÃºa como Arquitecto de Software en Python y Especialista en Pydantic v2.

Crea el archivo \`models.py\` con los modelos de dominio de datos para "Forma IA":

1. MODELO \`UXTask\`:
   - \`task_id: str\` (Identificador Ãºnico UUID4)
   - \`description: str\` (DescripciÃ³n clara del componente y objetivo del copy)
   - \`brand_context: str\` (DefiniciÃ³n del tono de marca, sector y pÃºblico objetivo)
   - \`max_length: int | None = None\` (LÃ­mite estricto de caracteres permitido)
   - \`category: Literal["microcopy", "error_messages", "onboarding", "product_descriptions"]\`
   - \`source: Literal["library", "manual"] = "manual"\`
   - \`evaluation_criteria: list[str]\` (Criterios activos para evaluar)

2. MODELO \`CopyVariant\`:
   - \`variant_index: int\` (1, 2 o 3)
   - \`copy_text: str\` (Texto final de la variante)
   - \`llm_justification: str\` (ExplicaciÃ³n del enfoque persuasivo y psicolÃ³gico)
   - \`character_count: int\` (Longitud exacta en caracteres)
   - \`has_action_verb: bool\` (Flag de inicio con verbo de acciÃ³n)
   - \`exceeds_max_length: bool\` (True si supera el lÃ­mite definido)
   - \`llm_judge_scores: dict[str, float] | None = None\` (Puntuaciones semÃ¡nticas del juez 0-10)
   - \`aggregate_score: float | None = None\` (PuntuaciÃ³n media consolidada)

3. MODELO \`UXEvaluation\`:
   - \`task_id: str\`
   - \`model_name: str\` (Modelo generador utilizado)
   - \`variants: list[CopyVariant]\` (Lista de variantes producidas)
   - \`recommended_variant: int | None = None\` (Ãndice de la variante ganadora)
   - \`generated_at: datetime = Field(default_factory=datetime.utcnow)\`
   - \`judge_model_name: str | None = None\` (Modelo juez si estuvo activo)

Incluye docstrings exhaustivos y tipado estricto conforme a Pydantic v2.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ValidaciÃ³n del copy" 
          goal="ValidaciÃ³n no bloqueante: advertencias, no errores. El copy nunca se rechaza."
        >
          <PromptBlock label="Prompt 2.3 â€” ValidaciÃ³n y normalizaciÃ³n">
{`ActÃºa como Ingeniero de Calidad y ValidaciÃ³n LingÃ¼Ã­stica en Python.

Crea el mÃ³dulo \`validator.py\` con la funciÃ³n de comprobaciÃ³n heurÃ­stica \`validate_copy_variant(copy_text: str, task: UXTask) -> tuple[bool, list[str]]\`:

1. POLÃTICA DE VALIDACIÃ“N NO BLOQUEANTE:
   - El copy nunca se rechaza automÃ¡ticamente; la funciÃ³n devuelve una tupla \`(is_valid, warnings)\` con sugerencias de mejora para el diseÃ±ador.

2. REGLAS HEURÃSTICAS A COMPROBAR:
   - **ComprobaciÃ³n de VacÃ­o:** Si el copy estÃ¡ vacÃ­o o solo contiene espacios, \`is_valid = False\`.
   - **LÃ­mite de Longitud:** Si \`task.max_length\` estÃ¡ definido y \`len(copy_text) > task.max_length\`, aÃ±ade warning: *"Excede el lÃ­mite por X caracteres"*.
   - **DetecciÃ³n de Verbos de AcciÃ³n:** Comprueba si la primera palabra coincide con un verbo de acciÃ³n conjugado en imperativo o infinitivo (ej. *"Comprar"*, *"Descubre"*, *"Empieza"*, *"Guardar"*, *"Confirmar"*, *"Ãšnete"*).
   - **Filtrado de Lenguaje Agresivo en Errores:** Si la categorÃ­a es \`error_messages\`, detecta si inicia con tÃ©rminos punitivos como *"Error"*, *"Fallo"*, *"Prohibido"* o *"InvÃ¡lido"*, sugiriendo reformular en clave constructiva orientada a la soluciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="Historial de evaluaciones y vistas de comparativa de modelos."
        >
          <PromptBlock label="Prompt 2.4 â€” Persistencia DuckDB">
{`ActÃºa como Administrador de Bases de Datos Embebidas y Analista de Datos en DuckDB.

Crea el mÃ³dulo \`storage.py\` para gestionar el almacenamiento y la analÃ­tica de "Forma IA":

1. ESQUEMA DE TABLAS Y VISTAS SQL (\`init_design_db(db_path: str)\`):
   - Tabla \`ux_tasks\`: (\`task_id\` PK, \`description\`, \`brand_context\`, \`category\`, \`max_length\`, \`created_at\`).
   - Tabla \`ux_evaluations\`: (\`evaluation_id\` PK, \`task_id\` FK, \`model_name\`, \`judge_model_name\`, \`recommended_variant\`, \`generated_at\`).
   - Tabla \`copy_variants\`: (\`variant_id\` PK, \`evaluation_id\` FK, \`variant_index\`, \`copy_text\`, \`justification\`, \`char_count\`, \`has_action_verb\`, \`aggregate_score\`, \`scores_json\`).
   - Vista analÃ­tica \`vw_model_copy_quality\`: Consolida por \`model_name\` el total de tareas, el score promedio, la tasa de uso de verbos de acciÃ³n y la desviaciÃ³n respecto al lÃ­mite de longitud.

2. FUNCIONES OPERACIONALES:
   - \`store_evaluation(conn, task: UXTask, evaluation: UXEvaluation) -> str\`: Persiste de forma atÃ³mica la tarea y sus variantes.
   - \`get_model_copy_stats(conn) -> list[dict]\`: Devuelve los datos para la pantalla de estadÃ­sticas.
   - \`get_task_history(conn, category: str | None = None, limit: int = 30) -> list[dict]\`: Recupera evaluaciones histÃ³ricas.
   - \`export_evaluation_txt(conn, evaluation_id: str, output_path: str) -> str\`: Exporta las variantes formateadas a Markdown o texto plano.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo â€” 15 tareas UX de ejemplo" 
          goal="sample_ux_tasks.json listo para usar desde el primer arranque."
        >
          <PromptBlock label="Prompt 2.5 â€” Biblioteca de ejemplo">
{`ActÃºa como Especialista en UX Writing y Curador de Datasets de DiseÃ±o.

Genera el archivo estructurado \`sample_ux_tasks.json\` con 15 casos prÃ¡cticos reales distribuidos en 3 categorÃ­as clave:

1. 5 CASOS DE MICROCOPY (Botones y componentes interactivos, max_length = 25-35):
   - BotÃ³n de confirmaciÃ³n de pedido en checkout de alta conversiÃ³n.
   - BotÃ³n de cancelaciÃ³n de suscripciÃ³n con reducciÃ³n de fricciÃ³n emocional.
   - Tooltip explicativo de requisitos de seguridad en contraseÃ±a.
   - Label orientativo para selector de rango de fechas de reserva.
   - BotÃ³n de deshacer tras eliminar un elemento importante.

2. 5 CASOS DE MENSAJES DE ERROR (error_messages, max_length = 80-100):
   - ValidaciÃ³n de formato de correo electrÃ³nico no reconocido.
   - Rechazo de pasarela de pago bancaria por fondos insuficientes.
   - ExpiraciÃ³n de sesiÃ³n por inactividad prolongada.
   - Carga de archivo que supera el tamaÃ±o mÃ¡ximo permitido.
   - Nombre de usuario ya registrado en la plataforma.

3. 5 CASOS DE ONBOARDING Y PRODUCTO (onboarding, max_length = 120-150):
   - Pantalla de bienvenida paso 1 destacando el valor diferencial.
   - Banner de actualizaciÃ³n a plan profesional con prueba gratuita.
   - ConfirmaciÃ³n de activaciÃ³n de cuenta por enlace en email.
   - Indicador de progreso de perfil completo al 80%.
   - NotificaciÃ³n de primera publicaciÃ³n compartida con Ã©xito.

Incluye el script Python de validaciÃ³n de integridad para comprobar que las 15 tareas cumplen el esquema \`UXTask\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 â€” LÃ“GICA / IA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          color={C.emerald}
          label="Capa 3"
          title="LÃ³gica / IA â€” GeneraciÃ³n, parseo y evaluaciÃ³n"
          desc="Prompt maestro de variantes, llamada al modelo, evaluaciÃ³n automÃ¡tica y sistema LLM-as-judge."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo" 
          goal="Elegir el mejor modelo para generaciÃ³n y un segundo para juicio."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n de modelos">
{`ActÃºa como Arquitecto de Inteligencia Artificial y Evaluador de LLMs.

Define la selecciÃ³n formal de modelos generador y juez para "Forma IA":

1. SELECCIÃ“N DEL MODELO GENERADOR:
   - Modelo seleccionado: Claude 3.5 Sonnet / GPT-4o.
   - JustificaciÃ³n tÃ©cnica: Liderazgo en benchmarks creativos (AlpacaEval > 90% Win Rate), alta fluidez sintÃ¡ctica y mÃ­nima propensiÃ³n a clichÃ©s o pÃ¡rrafos de relleno.
   - ParÃ¡metros de inferencia: Temperatura 0.7 para asegurar divergencia entre variantes, max_tokens 800.

2. SELECCIÃ“N DEL MODELO JUEZ (LLM-as-a-Judge):
   - Modelo seleccionado: GPT-4o / Claude 3.5 Sonnet (o DeepSeek-V3 como alternativa de alta eficiencia).
   - JustificaciÃ³n tÃ©cnica: Excelente adhesiÃ³n a esquemas JSON estrictos y consistencia evaluativa.
   - ParÃ¡metros de inferencia: Temperatura 0.1 para garantizar objetividad y neutralidad en la calificaciÃ³n.

3. ESTRATEGIA DE COSTES Y ALTERNATIVAS OPEN-SOURCE:
   - ConfiguraciÃ³n para permitir usar la misma API Key para ambos roles o proveedores diferenciados.
   - Soporte para Llama 3.1 70B vÃ­a endpoint local/Ollama para entornos privados sin conexiÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Prompt central â€” GeneraciÃ³n de variantes" 
          goal="Prompt maestro que garantiza 3 variantes diferentes entre sÃ­."
        >
          <PromptBlock label="Prompt 3.2 â€” Prompt maestro">
{`ActÃºa como Lead UX Writer y DiseÃ±ador de Prompts en Sistemas de DiseÃ±o.

DiseÃ±a el prompt maestro para la generaciÃ³n de variantes en \`generator.py\`:

1. SYSTEM PROMPT DEL GENERADOR:
   "Eres un DiseÃ±ador de Contenido UX (Content Designer) senior especializado en copywriting de producto, psicologÃ­a de la persuasiÃ³n y microcopy de alta usabilidad. Tu misiÃ³n es generar variantes de texto concisas, claras y adaptadas estrictamente al contexto de marca y a los lÃ­mites de caracteres estipulados."

2. USER PROMPT ESTRUCTURADO:
   \`\`\`
   TAREA DE DISEÃ‘O: {{task_description}}
   CATEGORÃA: {{category}}
   CONTEXTO DE MARCA: {{brand_context}}
   LÃMITE MÃXIMO DE CARACTERES: {{max_length_str}}
   NÃšMERO DE VARIANTES A PRODUCIR: {{num_variants}}

   INSTRUCCIONES DE GENERACIÃ“N:
   1. Produce exactamente {{num_variants}} variantes numeradas utilizando el delimitador 'VARIANTE X:'.
   2. Cada variante debe adoptar un enfoque comunicativo DIFERENTE (ej. Variante 1: Directa y funcional; Variante 2: EmpÃ¡tica y cercana; Variante 3: Orientada al beneficio de valor).
   3. AÃ±ade una lÃ­nea 'JUSTIFICACIÃ“N:' por cada variante explicando la estrategia psicolÃ³gica empleada.
   4. No uses comillas ni etiquetas adicionales.
   \`\`\`

3. ESPECIFICACIÃ“N DEL PATRÃ“N DE RESPUESTA ESPERADO:
   VARIANTE 1:
   [Texto del copy]
   JUSTIFICACIÃ“N: [Enfoque directo centrado en la acciÃ³n inmediata]

   VARIANTE 2:
   [Texto del copy]
   JUSTIFICACIÃ“N: [Enfoque empÃ¡tico que reduce la incertidumbre del usuario]`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo y parseo" 
          goal="generate_copy_variants() y parse_copy_variants() con manejo de respuestas incompletas."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada y parseo">
{`ActÃºa como Ingeniero de Backend en Python y Conectores de LLM.

Implementa en \`generator.py\` las funciones de llamada asÃ­ncrona y parseo resiliente:

1. FUNCIÃ“N \`generate_copy_variants(task: UXTask, model_name: str, num_variants: int = 3) -> tuple[str, float]\`:
   - Utiliza cliente asÃ­ncrono \`httpx.AsyncClient\` con timeout estricto de 30 segundos y 2 reintentos exponenciales.
   - Registra el tiempo exacto de generaciÃ³n (\`gen_time\` en segundos).
   - Retorna la respuesta sin procesar junto a la mÃ©trica de latencia.

2. FUNCIÃ“N \`parse_copy_variants(raw_response: str, task: UXTask) -> list[CopyVariant]\`:
   - Aplica expresiones regulares multilÃ­nea para capturar los bloques \`VARIANTE (\\d+):\\s*(.+?)\\s*JUSTIFICACIÃ“N:\\s*(.+?)(?=(?:VARIANTE \\d+:|$))\`.
   - Limpia espacios en blanco, saltos de lÃ­nea superfluos y comillas no deseadas.
   - Calcula el recuento exacto de caracteres y ejecuta \`validate_copy_variant()\` para obtener \`has_action_verb\` y \`exceeds_max_length\`.
   - En caso de que el modelo solo devuelva 2 variantes en lugar de 3, parsea las rescatables sin lanzar excepciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="EvaluaciÃ³n automÃ¡tica por criterios" 
          goal="Puntuaciones 0â€“10 medibles sin LLM: longitud, verbo de acciÃ³n, claridad heurÃ­stica."
        >
          <PromptBlock label="Prompt 3.4 â€” EvaluaciÃ³n automÃ¡tica">
{`ActÃºa como Desarrollador de Algoritmos HeurÃ­sticos en Python.

Crea el mÃ³dulo \`scorer.py\` con la funciÃ³n pura \`evaluate_criteria_automatically(variant: CopyVariant, task: UXTask) -> dict[str, float]\`:

1. CÃLCULO DETERMINISTA DE CRITERIOS OBJETIVOS (0.0 a 10.0):
   - **Longitud Apropiada (\`appropriate_length\`):**
     * Si no hay lÃ­mite definido: 10.0.
     * Si estÃ¡ dentro del lÃ­mite: 10.0.
     * Si excede el lÃ­mite: \`max(0.0, 10.0 - (exceso / max_length) * 10.0)\`.
   - **Verbo de AcciÃ³n (\`action_verb\`):**
     * 10.0 si la variante inicia con un verbo de acciÃ³n reconocido.
     * 0.0 si no contiene llamada clara a la acciÃ³n al inicio.
   - **Claridad HeurÃ­stica (\`clarity_heuristic\`):**
     * Comienza en 10.0.
     * Resta 2.0 puntos si la longitud de palabras excede 20 tÃ©rminos (sobrecarga cognitiva).
     * Resta 1.5 puntos por cada tÃ©rmino tÃ©cnico punitivo detectado (ej. *"error"*, *"fallo"*, *"invÃ¡lido"*).
     * MÃ­nimo acotado en 0.0.

2. INTEGRACIÃ“N CON CRITERIOS SEMÃNTICOS:
   - Para criterios que requieren anÃ¡lisis contextual (ej. "empatÃ­a", "coherencia de marca"), devuelve \`None\` para delegar su evaluaciÃ³n al juez LLM.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="LLM-as-judge" 
          goal="Un segundo LLM puntÃºa la calidad UX del copy. Respuesta en JSON estructurado."
        >
          <PromptBlock label="Prompt 3.5 â€” Sistema LLM-as-judge">
{`ActÃºa como Ingeniero de EvaluaciÃ³n LLM-as-a-Judge y RÃºbricas HeurÃ­sticas.

Implementa en \`judge.py\` el sistema de evaluaciÃ³n semÃ¡ntica \`judge_copy_variant(variant: CopyVariant, task: UXTask, judge_model_name: str) -> dict[str, float]\`:

1. PROMPT DEL JUEZ CON ESQUEMA JSON ESTRICTO:
   "Eres un DiseÃ±ador Principal y CrÃ­tico Experto de UX Writing. Tu tarea es evaluar una variante de copy frente a su tarea y contexto de marca. EvalÃºa cada criterio con una puntuaciÃ³n objetiva de 0.0 a 10.0 y proporciona una justificaciÃ³n concisa en una sola frase."

2. INVOCACIÃ“N ASÃNCRONA:
   - EnvÃ­a el copy, el contexto de marca y la lista de criterios semÃ¡nticos.
   - Configura temperatura 0.1 y activa el modo JSON nativo del proveedor.

3. CONSOLIDACIÃ“N DE PUNTUACIONES:
   - Fusiona los scores automÃ¡ticos del paso 3.4 con los scores semÃ¡nticos del LLM-judge.
   - Calcula \`aggregate_score\` como la media aritmÃ©tica ponderada de todos los criterios evaluados.
   - En caso de fallo de red o parseo en el juez, preserva los scores automÃ¡ticos calculados en Python.`}
          </PromptBlock>
          <div className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: "rgba(245,158,11,0.08)", borderLeft: "3px solid " + C.amber, color: "#92400E" }}>
            <strong>Recordatorio:</strong> El juez LLM puede mostrar sesgo hacia su propio estilo de escritura. Nunca presentes las puntuaciones como evaluaciÃ³n definitiva en la interfaz â€” incluye siempre el badge "EvaluaciÃ³n orientativa (IA)".
          </div>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="La generaciÃ³n falla en silencio: nunca bloquear los resultados disponibles."
        >
          <PromptBlock label="Prompt 3.6 â€” Fallback completo">
{`ActÃºa como Arquitecto de Tolerancia a Fallos en Python.

Implementa en \`pipeline_core.py\` la funciÃ³n orquestadora con contingencia en cascada \`generate_and_evaluate_with_fallback(task: UXTask, generator_model: str, judge_model: str, num_variants: int = 3, use_judge: bool = True) -> tuple[UXEvaluation, bool, bool]\`:

1. MATRIZ DE DEGRADACIÃ“N GRADUAL:
   - **Fase 1 (GeneraciÃ³n de Variantes):** Invoca \`generate_copy_variants()\`. Si falla la API generadora, retorna un objeto \`UXEvaluation\` vacÃ­o con \`is_generator_used = False\` y mensaje claro para la interfaz.
   - **Fase 2 (EvaluaciÃ³n HeurÃ­stica Determinista):** Aplica \`evaluate_criteria_automatically()\` a todas las variantes extraÃ­das.
   - **Fase 3 (EvaluaciÃ³n SemÃ¡ntica con Juez):** Si \`use_judge = True\`, intenta calificar con el modelo juez. Si el juez agota el timeout o devuelve JSON errÃ³neo, captura la excepciÃ³n, registra el incidente en \`judges.log\` y continÃºa con los scores automÃ¡ticos (\`is_judge_used = False\`).
   - **Fase 4 (SelecciÃ³n de Ganadora):** Determina \`recommended_variant\` seleccionando el Ã­ndice con el mayor \`aggregate_score\` disponible.

2. RETORNO DE ESTADO:
   - Devuelve la tupla \`(evaluation, is_generator_used, is_judge_used)\` para que la UI informe con precisiÃ³n quÃ© capas se ejecutaron.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 â€” INTERFAZ (FLET)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Monitor}
          color="#DB2777"
          label="Capa 4"
          title="Interfaz de escritorio con Flet"
          desc="Formulario de entrada, tarjetas comparativas de variantes, historial y estadÃ­sticas de modelos."
        />

        <Step 
          num="4.1" 
          title="Wireframe mÃ­nimo â€” 3 pantallas" 
          goal="Definir la estructura antes de escribir cÃ³digo Flet."
        >
          <PromptBlock label="Prompt 4.1 â€” Wireframe">
{`ActÃºa como DiseÃ±ador de Interfaces UI y Especialista en Flet.

DiseÃ±a la arquitectura visual y wireframe de 3 pantallas para "Forma IA":

1. PANTALLA 1: GENERADOR Y ÃREA DE RESULTADOS (Principal):
   - SecciÃ³n superior: Formulario con campos para descripciÃ³n de la tarea, contexto de marca multilÃ­nea, lÃ­mite de caracteres (\`max_length\`), checkboxes de criterios y selectores de modelo.
   - Switch destacado: "Activar EvaluaciÃ³n LLM-as-a-Judge" (despliega el selector de modelo juez).
   - BotÃ³n de acciÃ³n principal: "Generar y Evaluar Variantes" con indicador reactivo de progreso.
   - SecciÃ³n inferior: Fila o cuadrÃ­cula con las 3 tarjetas de variantes comparables (\`ft.Card\`), destacando con borde acentuado la variante con mayor puntuaciÃ³n agregada.

2. PANTALLA 2: HISTORIAL DE EVALUACIONES:
   - Tabla interactiva con filtro por categorÃ­a (\`microcopy\`, \`error_messages\`, \`onboarding\`) y modelo.
   - Vista de inspecciÃ³n en modo solo lectura con botÃ³n "Reutilizar esta tarea" para reenviarla al generador.

3. PANTALLA 3: BENCHMARK Y ESTADÃSTICAS DE MODELOS:
   - Panel de mÃ©tricas acumuladas (\`vw_model_copy_quality\`): score medio, tasa de verbos de acciÃ³n y tiempo medio de respuesta por modelo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="Todos los campos del formulario con Flet: tipos, placeholders, interacciones."
        >
          <PromptBlock label="Prompt 4.2 â€” Formulario Flet">
{`ActÃºa como Desarrollador de Frontend en Python y Flet.

Crea en \`views/generator_form.py\` el componente interactivo de formulario de entrada para "Forma IA":

1. CAMPOS DE ENTRADA Y CONTROLES FLET:
   - \`task_input\`: \`ft.TextField(label="DescripciÃ³n de la tarea UX", multiline=True, min_lines=2, max_lines=4, max_length=500)\`.
   - \`brand_input\`: \`ft.TextField(label="Contexto de marca (tono, sector, pÃºblico)", multiline=True, min_lines=2, max_lines=3, max_length=300)\`.
   - \`length_input\`: \`ft.TextField(label="LÃ­mite mÃ¡x. caracteres (opcional)", keyboard_type=ft.KeyboardType.NUMBER, width=200)\`.
   - \`category_dropdown\`: \`ft.Dropdown(label="CategorÃ­a", options=[...])\`.
   - \`library_btn\`: \`ft.ElevatedButton("Cargar de biblioteca", icon=ft.icons.MENU_BOOK, on_click=open_library_modal)\`.

2. SELECTORES DE CRITERIOS Y MODELOS:
   - Fila de Checkboxes con los 4 criterios activos: Claridad, Longitud apropiada, Verbo de acciÃ³n, Tono empÃ¡tico.
   - Selector \`generator_dropdown\` con los modelos soportados (Claude 3.5 Sonnet, GPT-4o, Llama 3.1).
   - Selector \`variants_dropdown\` (2 o 3 variantes).
   - \`ft.Switch(label="EvaluaciÃ³n LLM-as-a-Judge")\` que muestra/oculta reactivamente el desplegable del modelo juez.
   - BotÃ³n \`generate_btn\`: \`ft.ElevatedButton("Generar Variantes", icon=ft.icons.AUTO_AWESOME, bgcolor="#DB2777", color="white")\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Tarjetas comparativas de resultados" 
          goal="N tarjetas con copy, justificaciÃ³n, barras de puntuaciÃ³n y botÃ³n de copia."
        >
          <PromptBlock label="Prompt 4.3 â€” Tarjetas de resultados">
{`ActÃºa como Desarrollador de Componentes Visuales en Flet.

Implementa en \`views/results_view.py\` el componente de renderizado de variantes para "Forma IA":

1. COMPONENTE DE TARJETA (\`build_variant_card(variant: CopyVariant, is_recommended: bool, is_judge_used: bool)\`):
   - Contenedor \`ft.Card\` con borde resaltado en magenta (\`#DB2777\`) y badge verde "â˜… RECOMENDADA" si \`is_recommended=True\`.
   - Texto del copy en tipografÃ­a grande (\`size=18, weight=ft.FontWeight.BOLD\`) sobre fondo claro con contraste accesible.
   - Metadatos superiores: Indicador de caracteres (\`"Caracteres: X / Max Y"\`) con color de alerta si excede el lÃ­mite.
   - JustificaciÃ³n estratÃ©gica en texto itÃ¡lico secundario.
   - Barras de puntuaciÃ³n: Para cada criterio evaluado, renderiza el nombre del criterio, la nota numÃ©rica (0-10) y un \`ft.ProgressBar(value=score/10.0)\`.
   - PuntuaciÃ³n agregada destacada: \`"Score Global: 8.7 / 10"\`.
   - BotÃ³n "Copiar al portapapeles": \`ft.ElevatedButton("Copiar Copy", icon=ft.icons.COPY, on_click=copy_to_clipboard)\` que interactÃºa con la API de portapapeles de Flet y muestra un SnackBar de confirmaciÃ³n.
   - Si \`is_judge_used=False\`, aÃ±ade un tag sutil: *"Solo criterios deterministas (juez no activo)"*.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="La interfaz nunca queda en un estado confuso: cada situaciÃ³n tiene su mensaje."
        >
          <PromptBlock label="Prompt 4.4 â€” Estados de la interfaz">
{`ActÃºa como Especialista en Estados de Interfaz y Manejo de Errores Visuales en Flet.

DiseÃ±a e implementa el catÃ¡logo de los 7 estados de visualizaciÃ³n de "Forma IA":

1. CATÃLOGO DE ESTADOS VISUALES:
   - **Estado Inicial / VacÃ­o:** Despliega un banner de bienvenida con 3 tarjetas clicables de ejemplo ("BotÃ³n de compra", "Error 404 empÃ¡tico", "Bienvenida onboarding") que auto-rellenan el formulario con un solo clic.
   - **Estado Generando:** Deshabilita el botÃ³n de acciÃ³n y muestra un \`ft.ProgressRing\` con el mensaje: *"Generando 3 variantes con [Modelo]..."*.
   - **Estado Evaluando (Juez):** Muestra un spinner secundario: *"Evaluando calidad UX con [Modelo Juez]..."*.
   - **Estado Reintento por Formato:** Si el LLM no genera delimitadores vÃ¡lidos, muestra alerta no intrusiva: *"Reintentando generaciÃ³n con temperatura reducida..."*.
   - **Estado Juez Inaccesible:** Muestra las variantes generadas con normalidad y un badge amarillo: *"Juez IA no disponible â€” Mostrando mÃ©tricas automÃ¡ticas"*.
   - **Estado Biblioteca Ausente:** Si falta \`sample_ux_tasks.json\`, muestra SnackBar informativo y permite operar en modo 100% manual.
   - **Estado ValidaciÃ³n de Entrada:** SnackBar rojo si el usuario intenta generar con < 20 caracteres o sin criterios seleccionados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n â€” 3 pantallas" 
          goal="NavigationBar con GeneraciÃ³n, Historial y EstadÃ­sticas de modelos."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n Flet">
{`ActÃºa como Arquitecto de Aplicaciones de Escritorio en Flet.

Crea el archivo principal \`main.py\` con el controlador de navegaciÃ³n y ciclo de vida de "Forma IA":

1. ESTRUCTURA DE NAVEGACIÃ“N MULTIPANTALLA:
   - Configura la ventana (\`title="Forma IA â€” Evaluador de Copy UX"\`, \`width=1100\`, \`height=850\`, \`theme_mode=ft.ThemeMode.LIGHT\`).
   - Implementa \`ft.NavigationBar\` inferior con 3 destinos:
     * Destino 0: \`ft.NavigationDestination(icon=ft.icons.AUTO_AWESOME, label="Generador")\`.
     * Destino 1: \`ft.NavigationDestination(icon=ft.icons.HISTORY, label="Historial")\`.
     * Destino 2: \`ft.NavigationDestination(icon=ft.icons.BAR_CHART, label="EstadÃ­sticas")\`.

2. GESTIÃ“N DE VISTAS Y REUTILIZACIÃ“N DE TAREAS:
   - Controlador de cambio de pestaÃ±a que monta y desmonta las vistas de forma eficiente.
   - Evento "Reutilizar Tarea" desde el Historial: Carga los parÃ¡metros en el formulario del Generador y conmuta automÃ¡ticamente a la pestaÃ±a 0 para permitir comparar contra otro LLM.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPAS 5â€“6 â€” INTEGRACIÃ“N Y PRUEBAS
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          color={C.amber}
          label="Capas 5â€“6"
          title="IntegraciÃ³n y logging"
          desc="Pipeline asÃ­ncrono completo, gestiÃ³n de errores en cascada, doble sistema de logs y configuraciÃ³n centralizada."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_generate_click() asÃ­ncrono que no bloquea la UI."
        >
          <PromptBlock label="Prompt 5.1 â€” on_generate_click">
{`ActÃºa como Ingeniero de IntegraciÃ³n AsÃ­ncrona en Python y Flet.

Implementa en \`controller.py\` el handler asÃ­ncrono de generaciÃ³n \`on_generate_click(e)\`:

1. VALIDACIÃ“N PREVIA Y GUARDRAILS:
   - Comprueba que la descripciÃ³n de la tarea tenga al menos 20 caracteres y que al menos 1 criterio de evaluaciÃ³n estÃ© seleccionado.
   - Despliega un \`ft.SnackBar\` de advertencia si la validaciÃ³n no se cumple.

2. ORQUESTACIÃ“N NO BLOQUEANTE:
   - Activa el estado visual de carga (deshabilita el botÃ³n y muestra \`ProgressRing\`).
   - Construye el objeto \`UXTask\` a partir de los campos del formulario.
   - Lanza la corutina \`ux_evaluation_pipeline()\` en segundo plano mediante \`asyncio.create_task()\` para mantener la interfaz 100% responsiva.

3. DESPLIEGUE Y ACTUALIZACIÃ“N:
   - Recibe la \`UXEvaluation\` consolidada.
   - Invoca \`results_view.render(evaluation)\` para dibujar las tarjetas con animaciÃ³n fluida.
   - Si la variante recomendada tiene una nota inferior a 6.0, muestra un aviso de sugerencia de re-escritura.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Pipeline de evaluaciÃ³n completo" 
          goal="ux_evaluation_pipeline() sin lÃ³gica de UI, con logging."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline de evaluaciÃ³n">
{`ActÃºa como Ingeniero de Backend y Pipeline de Procesamiento en Python.

Crea en \`pipeline.py\` la funciÃ³n pura de orquestaciÃ³n \`ux_evaluation_pipeline(task: UXTask, generator_model: str, judge_model: str | None, num_variants: int, use_judge: bool, conn: duckdb.DuckDBPyConnection) -> tuple[UXEvaluation, bool, bool]\`:

1. ETAPAS SECUENCIALES DEL PIPELINE:
   - Etapa 1: InvocaciÃ³n de \`generate_and_evaluate_with_fallback(task, generator_model, judge_model, num_variants, use_judge)\`.
   - Etapa 2: Persistencia atÃ³mica en DuckDB mediante \`store_evaluation(conn, task, evaluation)\`.
   - Etapa 3: Registro de mÃ©tricas operacionales en los loggers correspondientes (\`generations.log\` y \`judges.log\`).

2. FIRMA PURA Y DESACOPLE:
   - La funciÃ³n no contiene referencias a componentes grÃ¡ficos de Flet, permitiendo su ejecuciÃ³n en tests unitarios, scripts CLI o entorno web.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="DesignError, DesignException y tabla de decisiones por punto de fallo."
        >
          <PromptBlock label="Prompt 5.3 â€” Errores en cascada">
{`ActÃºa como Arquitecto de Tolerancia a Fallos en Python.

Crea el archivo \`exceptions.py\` con la jerarquÃ­a de excepciones y la matriz de contingencia en cascada para "Forma IA":

1. JERARQUÃA DE EXCEPCIONES:
\`\`\`python
from enum import Enum

class DesignErrorCode(str, Enum):
    GENERATOR_TIMEOUT = "GENERATOR_TIMEOUT"
    GENERATOR_AUTH_ERROR = "GENERATOR_AUTH_ERROR"
    PARSING_FAILED = "PARSING_FAILED"
    JUDGE_TIMEOUT = "JUDGE_TIMEOUT"
    JUDGE_MALFORMED_JSON = "JUDGE_MALFORMED_JSON"
    DB_PERSISTENCE_ERROR = "DB_PERSISTENCE_ERROR"
    LIBRARY_FILE_MISSING = "LIBRARY_FILE_MISSING"

class DesignException(Exception):
    def __init__(self, code: DesignErrorCode, message: str, technical_details: str = ""):
        super().__init__(message)
        self.code = code
        self.technical_details = technical_details
\`\`\`

2. MATRIZ DE DECISIONES DE FALLO (Regla de DegradaciÃ³n Elegante):
   - Fallo de API Generador: Muestra pantalla de error sin crash y sugiere revisar la API Key.
   - Fallo de Parseo Regex: Reintenta 1 vez con temperatura 0.3; si persiste, muestra el texto crudo.
   - Fallo de API Juez / JSON corrupto: Registra el incidente y continÃºa mostrando las variantes con puntuaciones automÃ¡ticas.
   - Fallo en DuckDB: Permite copiar variantes notificando que no se guardÃ³ en el historial local.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging â€” generations.log y judges.log" 
          goal="Dos logs separados para analizar el generador y el juez por separado."
        >
          <PromptBlock label="Prompt 5.4 â€” Logging">
{`ActÃºa como Ingeniero de Observabilidad y Logging en Python.

Crea el mÃ³dulo \`design_logger.py\` con doble sistema de registro desacoplado:

1. CONFIGURACIÃ“N DE LOS DOS CANALES DE LOG:
   - **Canal 1 (\`generations.log\` con RotatingFileHandler 5MB, 3 backups):** Registra cada llamada de generaciÃ³n: \`timestamp\`, \`task_id\`, \`generator_model\`, \`num_variants_requested\`, \`num_variants_obtained\`, \`gen_time_seconds\`, \`char_counts\`.
   - **Canal 2 (\`judges.log\` con RotatingFileHandler 5MB, 3 backups):** Registra las evaluaciones del juez: \`timestamp\`, \`task_id\`, \`judge_model\`, \`variant_index\`, \`criteria_evaluated\`, \`individual_scores\`, \`aggregate_score\`, \`judge_latency_seconds\`.

2. JUSTIFICACIÃ“N DE LA SEPARACIÃ“N:
   - Permite auditar la estabilidad y consistencia de las puntuaciones del LLM-as-a-Judge de forma independiente a la generaciÃ³n de texto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n â€” config.py y .env.example" 
          goal="Variables de entorno, constantes y .env.example comentado."
        >
          <PromptBlock label="Prompt 5.5 â€” ConfiguraciÃ³n">
{`ActÃºa como Ingeniero de Infraestructura y ConfiguraciÃ³n en Python.

Crea el mÃ³dulo \`config.py\` y la plantilla \`.env.example\` mediante \`pydantic-settings\`:

1. ESPECIFICACIÃ“N DE \`config.py\`:
\`\`\`python
from pydantic_settings import BaseSettings
from pathlib import Path

class FormaConfig(BaseSettings):
    FORMA_GENERATOR_API_KEY: str = ""
    FORMA_JUDGE_API_KEY: str = ""
    FORMA_GENERATOR_MODEL: str = "claude-3-5-sonnet-20241022"
    FORMA_JUDGE_MODEL: str = "gpt-4o"
    FORMA_DB_PATH: Path = Path.home() / ".forma_ia" / "evaluations.duckdb"
    FORMA_LOG_LEVEL: str = "INFO"
    FORMA_TASK_LIBRARY_PATH: Path = Path("./data_design/sample_ux_tasks.json")
    FORMA_LLM_TIMEOUT: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = FormaConfig()
\`\`\`

2. ARCHIVO \`.env.example\`:
   - Documenta que \`FORMA_JUDGE_API_KEY\` puede dejarse vacÃ­a para reutilizar la clave del generador si se emplea el mismo proveedor.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO (FORMA IA)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={FlaskConical} 
          label="Capa 6" 
          color={C.emerald} 
          title="Pruebas y empaquetado"
          desc="Suite Pytest de validaciÃ³n heurÃ­stica y parseo, tests de integraciÃ³n con mocks y ejecutable autÃ³nomo con PyInstaller." 
        />

        <Step 
          num="6.1" 
          title="Tests unitarios con Pytest" 
          goal="ValidaciÃ³n de copy, parseo y evaluaciÃ³n automÃ¡tica sin llamadas a APIs."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests unitarios">
{`ActÃºa como QA Lead y Especialista en Testing Automatizado de Software en Python.

Crea la suite de pruebas unitarias en \`tests/test_design_logic.py\` y sus fixtures en \`tests/conftest.py\`:

1. FIXTURES EN \`conftest.py\`:
   - \`sample_microcopy_task\`: Objeto \`UXTask\` para botÃ³n con \`max_length = 30\`.
   - \`sample_onboarding_task\`: Objeto \`UXTask\` sin lÃ­mite de longitud estricto.
   - \`sample_three_variants_raw_response\`: String simulado con 3 bloques \`VARIANTE X:\` y \`JUSTIFICACIÃ“N:\` vÃ¡lidos.
   - \`sample_malformed_response\`: Texto sin delimitadores para probar la tolerancia a fallos del parser.

2. CASOS DE PRUEBA EN \`test_design_logic.py\`:
   - \`test_validate_copy_variant()\`:
     * Valida copy dentro del lÃ­mite (True, sin warnings).
     * Valida copy que excede el lÃ­mite (True, con warning de exceso).
     * Valida detecciÃ³n de verbo de acciÃ³n (\`has_action_verb == True\`).
     * Valida detecciÃ³n de lenguaje agresivo en errores (genera warning constructivo).
   - \`test_parse_copy_variants()\`:
     * Extrae las 3 variantes con texto y justificaciÃ³n limpios.
     * Procesa respuestas con solo 2 variantes sin lanzar excepciÃ³n.
     * Gestiona respuestas malformadas devolviendo lista vacÃ­a de forma controlada.
   - \`test_evaluate_criteria_automatically()\`:
     * EvalÃºa longitud adecuada (10.0 si cumple, proporcional si excede).
     * EvalÃºa verbo de acciÃ³n (10.0 vs 0.0).
     * EvalÃºa claridad heurÃ­stica penalizando sobrecarga de palabras y tecnicismos.

3. REGLAS: Prohibido llamar a APIs reales o interactuar con DuckDB en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="Pipeline completo con mocks del generador y el juez. Verificar DuckDB."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de integraciÃ³n">
{`ActÃºa como Ingeniero de IntegraciÃ³n y Testing E2E en Python.

Crea el test de integraciÃ³n en \`tests/test_design_integration.py\` que valida el pipeline completo de "Forma IA" sin consumir crÃ©ditos de API:

1. CONFIGURACIÃ“N DEL ENTORNO:
   - Carga una tarea real desde \`sample_ux_tasks.json\`.
   - Inicializa una base de datos DuckDB volÃ¡til en memoria (\`conn = duckdb.connect(':memory:')\`).

2. MOCKING SELECTIVO:
   - Mockea \`generate_copy_variants()\` para devolver 3 variantes predefinidas.
   - Mockea \`judge_copy_variant()\` para inyectar puntuaciones semÃ¡nticas (\`clarity=9.0\`, \`action_verb=10.0\`, \`tone=8.5\`).

3. ASERCIONES OBLIGATORIAS:
   - Ejecuta \`await ux_evaluation_pipeline(...)\`.
   - Aserta que \`evaluation.variants\` contiene exactamente 3 objetos \`CopyVariant\`.
   - Aserta que \`recommended_variant\` coincide con la variante que tiene el mayor \`aggregate_score\`.
   - Aserta que los datos se persistieron en DuckDB y \`get_model_copy_stats(conn)\` refleja 1 evaluaciÃ³n con mÃ©tricas vÃ¡lidas.
   - Test de contingencia: Mockea una respuesta corrupta del juez y verifica que el pipeline completa con \`is_judge_used = False\` sin elevar excepciones no controladas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Protocolo de prueba manual" 
          goal="7 escenarios reales que validan la app antes del empaquetado."
        >
          <PromptBlock label="Prompt 6.3 â€” Prueba manual">
{`ActÃºa como DiseÃ±ador de Producto y Lead QA en Entornos UX.

Redacta el protocolo de validaciÃ³n manual exhaustivo (UAT) para certificar "Forma IA v1":

1. MATRIZ DE 7 ESCENARIOS DE PRUEBA CON CASOS REALES:
   - **Escenario 1 (Microcopy de BotÃ³n de Checkout):** Cargar tarea de compra; verificar que las 3 variantes son conceptualmente divergentes (directa, empÃ¡tica, de valor).
   - **Escenario 2 (Coherencia del LLM-Judge):** Activar el modelo juez y contrastar sus notas frente al criterio profesional de diseÃ±o.
   - **Escenario 3 (InteracciÃ³n con Portapapeles):** Pulsar "Copiar Copy" en la variante recomendada y pegarlo en un editor externo; comprobar que no incluye etiquetas auxiliares.
   - **Escenario 4 (RestricciÃ³n Estricta de Longitud max_length = 20):** Verificar que las variantes que exceden 20 caracteres son penalizadas visual y numÃ©ricamente.
   - **Escenario 5 (DesconexiÃ³n de Red / Modo Offline):** Desconectar internet; comprobar que la app entra en estado de contingencia sin crash.
   - **Escenario 6 (Benchmark Multi-Modelo):** Ejecutar la misma tarea con Claude 3.5 y GPT-4o; verificar que la pantalla de EstadÃ­sticas actualiza el leaderboard.
   - **Escenario 7 (Persistencia y Cierre de SesiÃ³n):** Cerrar la aplicaciÃ³n, reabrirla y verificar que el historial conserva todas las evaluaciones previas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Ejecutable distribuible con las tareas incluidas. Sin .env en el paquete."
        >
          <PromptBlock label="Prompt 6.4 â€” Empaquetado">
{`ActÃºa como Ingeniero de DistribuciÃ³n y Empaquetado de Software en Python.

Genera las especificaciones de compilaciÃ³n para crear el ejecutable autÃ³nomo \`FormaIA.exe\`:

1. ARCHIVO DE CONFIGURACIÃ“N \`forma_ia.spec\`:
   - Configura PyInstaller con:
     * \`entry_point = "main.py"\`
     * \`datas = [('data_design/sample_ux_tasks.json', 'data_design'), ('assets', 'assets')]\`
     * ExclusiÃ³n estricta de archivos \`.env\`, \`*.duckdb\` y carpetas de logs para evitar fugas de credenciales.
     * Modo ventana (\`console=False\` en Windows/macOS).

2. GUÃA DE INSTALACIÃ“N EN 3 PASOS PARA EL USUARIO FINAL:
   - Paso 1: Descomprimir \`FormaIA_v1.0_Win64.zip\`.
   - Paso 2: Crear el archivo \`.env\` junto al ejecutable con \`FORMA_GENERATOR_API_KEY=tu_clave\`.
   - Paso 3: Ejecutar \`FormaIA.exe\` con doble clic sin necesidad de instalar Python.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="Checklist en VM sin Python. Detectar errores comunes de Flet en Windows/macOS."
        >
          <PromptBlock label="Prompt 6.5 â€” Prueba en entorno limpio">
{`ActÃºa como Ingeniero de QA y CertificaciÃ³n de Entornos Limpios.

DiseÃ±a el protocolo de validaciÃ³n del binario \`FormaIA.exe\` en una mÃ¡quina virtual Windows 11 / macOS limpia (sin Python ni Git):

1. CHECKLIST DE EJECUCIÃ“N LIMPIA:
   - Arranque en frÃ­o en menos de 3.0 segundos sin terminal emergente.
   - Despliegue correcto de la biblioteca precargada (15 tareas UX seleccionables).
   - GeneraciÃ³n de variantes en vivo conectando con la API externa vÃ­a \`.env\`.
   - Funcionamiento del portapapeles nativo del sistema operativo al pulsar "Copiar".
   - VerificaciÃ³n de creaciÃ³n automÃ¡tica de la base de datos DuckDB en \`%USERPROFILE%\\.forma_ia\\evaluations.duckdb\`.
   - Instrucciones para que el usuario pueda aÃ±adir sus propias tareas JSON editando el archivo sin recompilar.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N Y PUBLICACIÃ“N (FORMA IA)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Star}
          color="#64748B"
          label="Fase 7"
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar v2, comparar criterio humano vs. LLM-judge y publicar en el Foro de Proyectos Horizon."
        />

        <Step 
          num="7.A" 
          title="Planificar la v2" 
          goal="Backlog priorizado con anÃ¡lisis de impacto por capa."
        >
          <PromptBlock label="Prompt 7.A â€” Backlog v2">
{`ActÃºa como Product Manager y Estratega en Herramientas de DiseÃ±o IA.

Elabora el backlog tÃ©cnico y funcional estructurado para la versiÃ³n 2.0 de "Forma IA":

1. MATRIZ DE MEJORAS PROPUESTAS:
   | ID | Funcionalidad Propuesta | Capa Afectada | Complejidad | Impacto en DiseÃ±o |
   |:---|:------------------------|:--------------|:------------|:-------------------|
   | V1 | **GÃ©nesis Visual (Multimodal):** Ingesta de capturas de pantalla/Figma para evaluar coherencia visual-copy | Capas 2, 3 y 4 | Alta | Permite adaptar el tono al estilo grÃ¡fico real de la interfaz |
   | V2 | **Ariadna UX (Multimarca):** Gestor de perfiles de tono y palabras prohibidas persistentes en DuckDB | Capas 2 y 3 | Media | Ahorra reintroducir el contexto de marca en cada sesiÃ³n |
   | V3 | **Vitral CrÃ­tico (Voto Humano):** BotÃ³n "Mi Favorita" para crear un leaderboard de preferencia humana vs LLM-judge | Capas 2, 4 y 5 | Media | Calibra la fiabilidad del juez contrastÃ¡ndolo con el criterio del diseÃ±ador |
   | V4 | **Soporte MultilingÃ¼e SimultÃ¡neo:** GeneraciÃ³n y traducciÃ³n alineada en espaÃ±ol, inglÃ©s y portuguÃ©s | Capa 3 | Baja | Agiliza la internacionalizaciÃ³n de flujos de onboarding |

2. SELECCIÃ“N DE SPRINT V2:
   - Define las 2 funcionalidades clave para el lanzamiento de la v2.0 justificando el valor aportado a los equipos de producto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en el Foro de Proyectos Horizon" 
          goal="Ficha de publicaciÃ³n lista para copiar y pegar en el foro de la comunidad."
        >
          <PromptBlock label="Prompt 7.B â€” Ficha de publicaciÃ³n">
{`ActÃºa como Divulgador de Herramientas de DiseÃ±o y Creador en la Comunidad Horizon.

Redacta la ficha de presentaciÃ³n de "Forma IA" para publicar en el Foro de la Comunidad Horizon (/comunidad/aplicaciones):

1. ESTRUCTURA DE LA PUBLICACIÃ“N:
   - **TÃ­tulo:** \`[PROYECTO] Forma IA v1.0 â€” Generador y Evaluador de Microcopy UX con LLM-as-a-Judge y DuckDB\`
   - **Etiquetas:** \`#DesignOps\` \`#UXWriting\` \`#Flet\` \`#Python\` \`#Pydantic\` \`#DuckDB\`
   - **Resumen Ejecutivo (150 palabras):** AplicaciÃ³n de escritorio que genera 3 variantes conceptuales de microcopy para interfaces y las califica con mÃ©tricas deterministas y evaluaciÃ³n semÃ¡ntica mediante un segundo LLM juez.
   - **InnovaciÃ³n TÃ©cnica:** Arquitectura de degradaciÃ³n elegante (si el juez falla, preserva mÃ©tricas automÃ¡ticas) y comparativa visual de modelos con persistencia analÃ­tica local.
   - **Advertencia para DiseÃ±adores:** Las notas del LLM-as-a-Judge son una guÃ­a orientativa para acelerar la toma de decisiones, no un veredicto definitivo.
   - **Pregunta para el Debate Comunitario:** *"Â¿En quÃ© tipos de copy (botones, errores, onboarding) considerÃ¡is que el LLM-as-a-Judge correlaciona mejor con el criterio humano de un diseÃ±ador senior?"*`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Result box â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "white", border: "1px solid rgba(219,39,119,0.2)" }}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: "rgba(219,39,119,0.10)" }}>
            <Check size={22} style={{ color: "#DB2777" }} />
          </div>
          <h2 className="font-display text-2xl mb-3" style={{ color: C.dark }}>Resultado final</h2>
          <p className="text-base leading-relaxed mb-2 max-w-[520px] mx-auto"
            style={{ color: "rgba(17,17,17,0.6)" }}>
            Un ejecutable de <strong style={{ color: C.dark }}>Forma IA</strong> que genera 3 variantes de microcopy y textos de interfaz, las evalÃºa con heurÃ­sticas automÃ¡ticas y un juez LLM, y permite compararlas visualmente para elegir la mejor opciÃ³n.
          </p>
          <p className="text-sm mb-6 max-w-[480px] mx-auto"
            style={{ color: "rgba(17,17,17,0.40)" }}>
            No sustituye al diseÃ±ador â€” le proporciona un banco de pruebas objetivo y divergente para acelerar decisiones de diseÃ±o.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#DB2777", color: "white" }}>
              Publicar en la Comunidad <ChevronRight size={14} />
            </Link>
            <Link to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}>
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* â”€â”€â”€ Version extensions â”€â”€ */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

