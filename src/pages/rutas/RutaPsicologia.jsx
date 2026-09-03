import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Search } from "lucide-react";
import { Layers } from "lucide-react";
import { Database } from "lucide-react";
import { Cpu } from "lucide-react";
import { Monitor } from "lucide-react";
import { Link2 } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Brain } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Eye } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio PsicologÃ­a (data_psychology/rankings/) Â· ToMBench Â· SocialIQa Â· BIG-Bench Social Â· EmoBench Â· OpenToM", motivo: "Verificar quÃ© modelos tienen mejor performance en razonamiento social antes de elegir el motor de Psique Lab." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Definir quÃ© tipos de anÃ¡lisis psicolÃ³gico cubre la v1 y las advertencias de interpretaciÃ³n necesarias en cada resultado." },
  { capa: "2", subcapa: "2.1", herramienta: "data_psychology/raw/ Â· SocialIQa Hugging Face [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Escenarios de razonamiento social ya descargados por el motor Horizon mÃ¡s fuente alternativa pÃºblica." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas estrictos para PsychScenario, BiasFlag, ModelResponse y PsychEvaluation con validadores de dominio." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators", motivo: "Validar formato de escenario (mÃ­nimo 30 palabras), presencia de contexto social y rango de opciones." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial auditable con vistas vw_model_social_iq y vw_bias_distribution para estadÃ­sticas por modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual (15 escenarios)", motivo: "5 ToM + 5 SocialIQa + 5 de sesgo cognitivo para desarrollo completamente offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_psychology/rankings/", motivo: "Seleccionar modelo con mejor score verificado en SocialIQa y ToMBench, con capacidad de razonamiento de perspectiva." },
  { capa: "3", subcapa: "3.2", herramienta: "Chain of Thought social (perspectiva de actores)", motivo: "El prompt fuerza al modelo a identificar estados mentales de cada actor antes de responder." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx Â· openai SDK [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Llamada async con temperatura 0.3 para razonamiento social con algo de variabilidad detectable." },
  { capa: "3", subcapa: "3.4", herramienta: "Python puro + lista de patrones de sesgo", motivo: "HeurÃ­sticas para detectar atribuciÃ³n fundamental, sesgo de confirmaciÃ³n, estereotipos y simplificaciÃ³n moral." },
  { capa: "3", subcapa: "3.5", herramienta: "ComparaciÃ³n directa con ground truth SocialIQa", motivo: "Verificar si el modelo eligiÃ³ la opciÃ³n correcta cuando existe respuesta conocida." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Mostrar la respuesta sin anÃ¡lisis de sesgos si ese mÃ³dulo falla; interpretation_warning NUNCA se suprime." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir 3 pantallas (EvaluaciÃ³n, EstadÃ­sticas, Historial) antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Escenarios y respuestas son texto narrativo largo; Flet gestiona scroll y tarjetas de sesgo mÃ¡s naturalmente que Tkinter." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "Pipeline completo con INTERPRETATION_WARNING hardcodeada para que no pueda desactivarse." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de extracciÃ³n de opciÃ³n elegida, detecciÃ³n de sesgos heurÃ­stica y test de integraciÃ³n del pipeline completo." },
  { capa: "6", subcapa: "6.3", herramienta: "Escenarios del laboratorio de PsicologÃ­a", motivo: "ValidaciÃ³n manual con 7 escenarios psicolÃ³gicos especÃ­ficos incluyendo sesgos de gÃ©nero y ToM clÃ¡sicos." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller Â· flet build [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Ejecutable distribuible; la INTERPRETATION_WARNING debe estar en cÃ³digo, no en .env." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio verificando que la advertencia de interpretaciÃ³n aparece en todas las pantallas." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar Psique Lab con la advertencia de interpretaciÃ³n prominente y recoger feedback sobre heurÃ­sticas de sesgos." },
];

// â”€â”€â”€ Phases overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "InvestigaciÃ³n",         summary: "Benchmarks de razonamiento social (ToMBench, SocialIQa, EmoBench) y validez epistemolÃ³gica de evaluar psicologÃ­a en LLMs." },
  { id: "1", label: "Capa 1", name: "DefiniciÃ³n",             summary: "Perfil de usuario (investigador/docente), tipos de anÃ¡lisis disponibles, inputs/outputs, criterios de Ã©xito y advertencia de interpretaciÃ³n como requisito no negociable." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "Carga de SocialIQa y ToMBench, Pydantic (PsychScenario, BiasFlag, ModelResponse, PsychEvaluation), DuckDB con vistas de estadÃ­sticas de sesgos y 15 escenarios de ejemplo." },
  { id: "3", label: "Capa 3", name: "LÃ³gica / IA",            summary: "SelecciÃ³n del modelo, Chain of Thought social (perspectiva de actores), parseo de respuesta, detecciÃ³n heurÃ­stica de 4 tipos de sesgo, comparaciÃ³n con ground truth y fallback seguro." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "3 pantallas: EvaluaciÃ³n (tarjetas de sesgo, badge correcto/incorrecto, advertencia permanente), EstadÃ­sticas (accuracy y distribuciÃ³n de sesgos por modelo) e Historial." },
  { id: "5", label: "Capa 5", name: "IntegraciÃ³n",            summary: "Pipeline completo, interpretation_warning hardcodeada en cÃ³digo (no configurable), log sin texto de escenarios y configuraciÃ³n de tipos de anÃ¡lisis y umbrales." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "Tests de extracciÃ³n de opciÃ³n y detecciÃ³n de sesgos, integraciÃ³n completa con mock, prueba manual con 7 escenarios y empaquetado con advertencia indesactivable." },
  { id: "7", label: "Fase 7", name: "IteraciÃ³n",              summary: "Publicar en el Foro con advertencia de interpretaciÃ³n prominente y planificar v2 con comparativa de 3 modelos y anÃ¡lisis batch." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Arena de modelos",
    area: "Comparativa de razonamiento social",
    title: "Psique Arena â€” 3 modelos ante el mismo escenario",
    desc: "EnvÃ­a el mismo escenario psicolÃ³gico a 3 modelos en paralelo, muestra sus razonamientos en columnas y compara los patrones de sesgo detectados en cada uno. Especialmente Ãºtil para ver si el sesgo de atribuciÃ³n fundamental es consistente entre modelos o especÃ­fico de uno.",
    badgeBg: "rgba(124,58,237,0.10)", badgeColor: "#7C3AED",
    changes: [
      "Capa 1: el usuario configura 3 API keys o selecciona 3 modelos del mismo proveedor",
      "Capa 3: evaluate_parallel(): asyncio.gather con 3 llamadas; fallo individual no cancela las otras",
      "Capa 3: compare_reasoning_patterns(): tabla comparativa de sesgos detectados en cada modelo",
      "Capa 4: pantalla Arena con 3 columnas side-by-side de respuesta + tarjetas de sesgo",
      "Capa 4: banner 'MÃ¡s sesgos detectados en: [MODELO]' con caveat de interpretaciÃ³n",
      "Capa 5: store_arena_evaluation() guarda las 3 respuestas con un session_id comÃºn",
    ],
  },
  {
    tag: "v3 Â· AnÃ¡lisis batch",
    area: "EstadÃ­sticas robustas",
    title: "Psique Batch â€” Dataset completo de SocialIQa en un anÃ¡lisis",
    desc: "EvalÃºa un conjunto de 50â€“200 escenarios SocialIQa de forma automÃ¡tica para obtener estadÃ­sticas robustas de accuracy por categorÃ­a, distribuciÃ³n de sesgos frecuentes y comparativa de modelos con tamaÃ±o de muestra significativo.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: nueva acciÃ³n 'AnÃ¡lisis batch'; el usuario elige subconjunto de SocialIQa y nÃºmero de escenarios",
      "Capa 3: evaluate_batch(): asyncio.gather con semÃ¡foro (mÃ¡x 5 llamadas simultÃ¡neas)",
      "Capa 3: estimaciÃ³n de tiempo y coste antes de ejecutar (N escenarios Ã— tiempo medio por escenario)",
      "Capa 4: pantalla de progreso con barra y ETA; cancelable en cualquier momento",
      "Capa 4: informe de resultados batch: accuracy por analysis_type, top-5 sesgos mÃ¡s frecuentes",
      "Advertencia adicional: con n > 50, los patrones de sesgo son mÃ¡s robustos pero sigue siendo heurÃ­stico",
    ],
  },
  {
    tag: "v4 Â· Sesgos adicionales",
    area: "HeurÃ­sticas extendidas",
    title: "Psique Plus â€” DetecciÃ³n de sesgo de disponibilidad y anclaje",
    desc: "AmplÃ­a el catÃ¡logo de sesgos detectables en v1 (atribuciÃ³n fundamental, confirmaciÃ³n, estereotipos, simplificaciÃ³n moral) con dos nuevos: el sesgo de disponibilidad (el modelo sobrepesa casos extremos o recientes) y el efecto de anclaje (la primera informaciÃ³n presentada domina el razonamiento).",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 3: nueva heurÃ­stica de disponibilidad: el modelo menciona casos extremos o noticias recientes sin base en el escenario",
      "Capa 3: nueva heurÃ­stica de anclaje: el primer dato numÃ©rico o categorÃ­a del escenario aparece sin cuestionarse en la respuesta",
      "Capa 3: BIAS_TYPES en config.py ampliado de 4 a 6 entradas",
      "Capa 4: las nuevas tarjetas de sesgo tienen el mismo diseÃ±o; solo cambia bias_name",
      "Capa 6: dataset de ejemplo ampliado con 4 escenarios nuevos (2 por sesgo adicional)",
      "Advertencia: las nuevas heurÃ­sticas son mÃ¡s experimentales que las v1; confidence mÃ¡ximo BAJO",
    ],
  },
];

// â”€â”€â”€ Interpretation notice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterpretationNotice() {
  return (
    <div className="mb-8 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(124,58,237,0.22)" }}>
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(124,58,237,0.07)" }}>
        <Eye size={15} style={{ color: "#7C3AED" }} className="shrink-0" />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#7C3AED" }}>
          Advertencia de interpretaciÃ³n â€” Lectura obligatoria
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(124,58,237,0.03)" }}>
        <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Los anÃ¡lisis de Psique Lab miden el <strong>comportamiento del LLM en este escenario especÃ­fico</strong>. No reflejan capacidades cognitivas generales ni comportamiento humano real.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>La detecciÃ³n de sesgos es <strong>heurÃ­stica automÃ¡tica</strong>, no metodologÃ­a psicolÃ³gica formal. Cada flag indica un posible patrÃ³n; siempre requiere verificaciÃ³n humana.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Un LLM que acierta en SocialIQa <strong>no "comprende" socialmente</strong>: puede estar reproduciendo patrones estadÃ­sticos. Esta distinciÃ³n debe comunicarse al usuario en cada resultado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: "#7C3AED" }} className="shrink-0 font-bold">â†’</span>
            <span>Psique Lab <strong>no puede usarse para diagnosticar comportamiento humano</strong> ni para procesos de selecciÃ³n de personal. La advertencia debe ser visible e indesactivable en el ejecutable.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaPsicologia() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED" }}>
            PsicologÃ­a & Creatividad Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Psique Lab
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que evalÃºa el razonamiento social y empÃ¡tico de los LLMs: el usuario introduce escenarios de TeorÃ­a de la Mente o dilemas sociales, obtiene la respuesta del modelo con anÃ¡lisis de sesgos cognitivos detectados heurÃ­sticamente, y guarda un historial comparativo de razonamiento por modelo.
          </p>
          <div className="flex flex-wrap gap-6">
            {[["7", "Fases"], ["6", "Capas"], ["30+", "Prompts"], ["App .exe", "Resultado"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl" style={{ color: C.dark }}>{v}</div>
                <div className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(17,17,17,0.35)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation notice */}
        <InterpretationNotice />

        {/* Human validation warning */}
        <HumanValidationWarning />

        {/* Map overview */}
        <div className="rounded-2xl p-6 mb-8 border" style={{ background: "white", borderColor: "rgba(17,17,17,0.08)" }}>
          <h2 className="font-display text-lg mb-4" style={{ color: C.dark }}>Mapa de la ruta</h2>
          <div className="space-y-1">
            {PHASES.map((p) => (
              <div key={p.id} className="flex items-start gap-3 py-2">
                <div className="shrink-0 w-16 text-[10px] font-bold uppercase tracking-wider pt-0.5"
                  style={{ color: "rgba(17,17,17,0.30)" }}>{p.label}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px]" style={{ color: C.dark }}>{p.name}</div>
                  <div className="text-[12px]" style={{ color: "rgba(17,17,17,0.45)" }}>{p.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools table (collapsible) */}
        <div className="mb-10 rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(17,17,17,0.10)" }}>
          <button
            onClick={() => setToolsOpen(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-black/[0.02]"
            style={{ background: "white" }}>
            <span className="font-semibold text-[14px]" style={{ color: C.dark }}>Herramientas necesarias por capa</span>
            <ChevronDown size={16} className="transition-transform"
              style={{ color: "rgba(17,17,17,0.35)", transform: toolsOpen ? "rotate(180deg)" : "none" }} />
          </button>
          {toolsOpen && (
            <div className="border-t overflow-x-auto" style={{ borderColor: "rgba(17,17,17,0.08)" }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: "rgba(17,17,17,0.03)" }}>
                    {["Capa", "Subcapa", "Herramienta(s)", "Por quÃ© se usa aquÃ­"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold"
                        style={{ color: "rgba(17,17,17,0.50)", borderBottom: "1px solid rgba(17,17,17,0.07)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOOLS_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "white" : "rgba(17,17,17,0.015)" }}>
                      <td className="px-4 py-2.5 font-medium" style={{ color: "#7C3AED", whiteSpace: "nowrap" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", whiteSpace: "nowrap" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", maxWidth: 320 }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(17,17,17,0.06)", background: "rgba(124,58,237,0.03)" }}>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>
                  <strong>Â¿Por quÃ© Flet y no PyQt o Tkinter?</strong> Los escenarios psicolÃ³gicos son texto narrativo largo y las respuestas del LLM tambiÃ©n. Flet gestiona Ã¡reas de texto scrollable y tarjetas de badges de sesgo de forma mÃ¡s natural que Tkinter, sin la complejidad de configuraciÃ³n de PyQt para una app de este alcance.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 â€” INVESTIGACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          label="Fase 0"
          color={C.accent}
          title="InvestigaciÃ³n"
          desc="Verificar quÃ© benchmarks evalÃºan razonamiento social y TeorÃ­a de la Mente, quÃ© miden realmente, cuÃ¡l es el modelo lÃ­der en el laboratorio y quÃ© advertencias epistemolÃ³gicas debe incluir la app antes de implementar nada."
        />

        <Step 
          num="0.A" 
          title="Benchmarks de psicologÃ­a y teorÃ­a de la mente" 
          goal="Identificar ToMBench, SocialIQa, BIG-Bench Social, EmoBench y OpenToM; quÃ© habilidades evalÃºan (perspectiva de terceros, estados mentales, predicciÃ³n de comportamiento); modelo lÃ­der en el ranking del laboratorio; sesgos sistemÃ¡ticos conocidos en LLMs para razonamiento social."
        >
          <PromptBlock label="Prompt 0.A â€” Benchmarks de razonamiento social">
{`ActÃºa como especialista en evaluaciÃ³n de LLMs para tareas de razonamiento social y psicologÃ­a cognitiva.
Tengo acceso al Laboratorio de PsicologÃ­a de Horizon (\`data_psychology/rankings/\`).

RespÃ³ndeme:
1. Â¿QuÃ© benchmarks evalÃºan razonamiento social y TeorÃ­a de la Mente en LLMs? (ToMBench, SocialIQa, BIG-Bench Social, EmoBench, OpenToM, HiToM)
2. Â¿QuÃ© habilidades especÃ­ficas evalÃºan? (perspectiva de terceros, comprensiÃ³n de estados mentales, predicciÃ³n de comportamiento, razonamiento emocional)
3. Â¿CuÃ¡l es el modelo con mejor score en SocialIQa/ToMBench segÃºn \`data_psychology/rankings/latest_rankings_psychology.json\`?
4. Â¿Hay evidencia de sesgos sistemÃ¡ticos conocidos en LLMs para razonamiento social? (sesgo de atribuciÃ³n fundamental, sesgo de confirmaciÃ³n de expectativas, etc.)

Cita scores especÃ­ficos. No inventes datos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Validez de evaluar razonamiento psicolÃ³gico con LLMs" 
          goal="Entender las limitaciones epistemolÃ³gicas antes de construir: Â¿los benchmarks de ToM miden 'comprensiÃ³n' social o patrones estadÃ­sticos? Â¿Es fiable la detecciÃ³n heurÃ­stica de sesgos? Â¿QuÃ© advertencias de interpretaciÃ³n son obligatorias? Esta investigaciÃ³n determina el diseÃ±o de los avisos de la app."
        >
          <PromptBlock label="Prompt 0.B â€” Validez epistemolÃ³gica">
{`Psique Lab evaluarÃ¡ el razonamiento social de LLMs usando benchmarks psicolÃ³gicos.

Antes de construirlo, necesito entender las limitaciones epistemolÃ³gicas:
1. Â¿Los benchmarks de TeorÃ­a de la Mente para LLMs realmente miden "comprensiÃ³n" social o solo patrones de respuesta estadÃ­stica? Â¿QuÃ© dice la literatura reciente sobre esto? [VERIFICAR EN FUENTES ACADÃ‰MICAS]
2. Â¿Es posible detectar "sesgos" de razonamiento social en LLMs de forma fiable con heurÃ­sticas simples, o requiere metodologÃ­a psicolÃ³gica formal?
3. Â¿QuÃ© advertencias deberÃ­a incluir la app sobre la interpretaciÃ³n de los resultados? (Los resultados miden el comportamiento del modelo en el benchmark, no la "psicologÃ­a" del modelo)

Esta informaciÃ³n determinarÃ¡ el tono de los anÃ¡lisis y las advertencias de la app.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 â€” DEFINICIÃ“N DEL PROBLEMA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Layers}
          label="Capa 1"
          color={C.emerald}
          title="DefiniciÃ³n del problema"
          desc="QuiÃ©n usa Psique Lab, quÃ© mide exactamente (rendimiento en benchmark vs. calidad del razonamiento), quÃ© entra, quÃ© sale y cÃ³mo comunicar los lÃ­mites de interpretaciÃ³n sin engaÃ±ar al usuario."
        />

        <Step 
          num="1.1" 
          title="Â¿QuiÃ©n usa esta app?" 
          goal="Ficha con rol (investigador de IA, psicÃ³logo investigador, docente universitario), quÃ© hace sin la app, tipos de escenarios que le interesan (ToM clÃ¡sicos, dilemas morales, sesgos cognitivos), nivel tÃ©cnico y cuÃ¡ntos escenarios evalÃºa por sesiÃ³n."
        >
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario">
{`Define el perfil de usuario de Psique Lab.

La app evalÃºa el razonamiento social de LLMs con escenarios de TeorÃ­a de la Mente y SocialIQa.

[DESCRIBE AQUÃ TU USUARIO OBJETIVO: ej. "investigador de IA que estudia el razonamiento social emergente en LLMs" o "psicÃ³logo investigador que quiere comparar respuestas de LLMs con respuestas humanas en dilemas sociales" o "profesor universitario que usa LLMs en clases de psicologÃ­a cognitiva y quiere evaluar su fiabilidad"]

Genera la ficha con:
- Nombre ficticio y rol (investigador, docente, developer de IA)
- QuÃ© hace actualmente sin la app (prueba LLMs manualmente, revisa papers)
- QuÃ© tipos de escenarios le interesan mÃ¡s (ToM clÃ¡sicos, dilemas morales, situaciones de comunicaciÃ³n, escenarios de sesgo cognitivo)
- Nivel tÃ©cnico (Â¿conoce benchmarks de IA? Â¿usa Python? Â¿solo web?)
- CuÃ¡ntos escenarios evalÃºa por sesiÃ³n (5, 50, 200)
- QuÃ© mÃ©tricas le importan: Â¿tasa de aciertos en SocialIQa? Â¿detecciÃ³n de sesgos?`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="Â¿QuÃ© problema concreto resuelve?" 
          goal="Una sola frase en formato [ROL] no puede [TAREA] porque [OBSTÃCULO]. Aclarar si la app mide RENDIMIENTO (comparar con ground truth) o CALIDAD DEL RAZONAMIENTO (detectar sesgos), y quÃ© implica para el diseÃ±o que los resultados no midan 'psicologÃ­a real' del modelo."
        >
          <PromptBlock label="Prompt 1.2 â€” Frase del problema">
{`BasÃ¡ndome en el perfil ([PEGA EL RESUMEN DEL PERFIL]), escribe UNA SOLA FRASE del problema que Psique Lab resuelve.

Formato: "[ROL] no puede [TAREA] porque [OBSTÃCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes. Para la elegida, aclara:
- Â¿La app mide el RENDIMIENTO del LLM (comparar con ground truth SocialIQa) o analiza la CALIDAD del RAZONAMIENTO (detectar sesgos en cÃ³mo piensa)? Â¿O ambas cosas?
- Â¿QuÃ© implicaciones tiene para el diseÃ±o que los resultados NO miden la "psicologÃ­a real" del modelo sino su comportamiento en el benchmark? Â¿CÃ³mo comunicar esto al usuario?

Define la posiciÃ³n de la app en una frase que aparecerÃ¡ en la pantalla de inicio.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="Â¿QuÃ© datos entran?" 
          goal="Lista completa: escenario libre o cargado del dataset, tipo de anÃ¡lisis (ToM, dilema moral, razonamiento empÃ¡tico, detecciÃ³n de sesgo), ground truth opcional, modelo a evaluar. Tipo, restricciones y valor por defecto de cada campo."
        >
          <PromptBlock label="Prompt 1.3 â€” Inputs de la app">
{`Para Psique Lab, define todos los datos de entrada.

El usuario puede:
- Seleccionar un escenario del dataset (SocialIQa, ToMBench locales)
- Escribir un escenario psicolÃ³gico propio en texto libre
- Elegir el tipo de anÃ¡lisis:
  [DECIDE LOS TIPOS: ej. "TeorÃ­a de la Mente (estados mentales de 3Âª persona)", "Dilema moral (razonamiento deontolÃ³gico vs utilitario)", "Razonamiento empÃ¡tico (perspectiva emocional de los actores)", "DetecciÃ³n de sesgo cognitivo"]
- Indicar si hay una respuesta considerada correcta (ground truth del benchmark)
- Seleccionar el modelo LLM a evaluar

Genera la lista completa de inputs con tipo, restricciones y valor por defecto.

Define tambiÃ©n si el escenario puede tener mÃºltiples opciones de respuesta (tipo SocialIQa: A/B/C) o es de respuesta libre.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="Â¿QuÃ© sale?" 
          goal="Outputs: respuesta completa del LLM, resultado correcto/incorrecto/N-A, sesgos detectados con nivel de confianza, resumen del patrÃ³n de razonamiento, advertencia de interpretaciÃ³n obligatoria y score de la sesiÃ³n si se evalÃºan mÃºltiples escenarios."
        >
          <PromptBlock label="Prompt 1.4 â€” Outputs de la evaluaciÃ³n">
{`Define todos los outputs de Psique Lab para cada evaluaciÃ³n.

La app debe producir:
1. La respuesta completa del LLM al escenario (texto libre o elecciÃ³n de opciÃ³n)
2. Resultado de comparaciÃ³n con ground truth (si existe): Correcto / Incorrecto / N/A
3. AnÃ¡lisis de sesgos detectados en el razonamiento:
   - Lista de sesgos identificados (cada uno con nombre y descripciÃ³n de 50 palabras)
   - Nivel de confianza de la detecciÃ³n: ALTO / MEDIO / BAJO
4. Resumen del patrÃ³n de razonamiento: Â¿el modelo razona desde perspectiva del actor? Â¿Hace atribuciones internas o externas?
5. Advertencia de interpretaciÃ³n: "Estos resultados reflejan el comportamiento del modelo en este escenario especÃ­fico, no sus 'capacidades cognitivas' generales"
6. Score de la sesiÃ³n: % de respuestas correctas si se evalÃºan mÃºltiples escenarios

Para cada output: formato, cuÃ¡ndo se genera, si se guarda en DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de Ã©xito" 
          goal="6â€“8 criterios verificables incluyendo: parseo de opciÃ³n elegida â‰¥90% en SocialIQa, detecciÃ³n de atribuciÃ³n fundamental â‰¥70% en escenarios que la presentan, advertencia de interpretaciÃ³n visible en TODOS los resultados sin excepciÃ³n y comparativa de 2 modelos en pantalla de estadÃ­sticas."
        >
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`Define los criterios de Ã©xito de Psique Lab v1.

El dominio psicolÃ³gico requiere especial cuidado en no sobreinterpretar resultados.

Genera 6-8 criterios verificables. Incluye obligatoriamente:
- Parseo de respuesta (ej. "extrae correctamente la opciÃ³n elegida en >= 90% de respuestas tipo SocialIQa con formato A/B/C")
- DetecciÃ³n de sesgos (ej. "detecta correctamente el sesgo de atribuciÃ³n fundamental en los escenarios del dataset de ejemplo que lo presentan, en >= 70% de los casos")
- Advertencia de interpretaciÃ³n (ej. "la advertencia de interpretaciÃ³n es visible en TODOS los resultados sin excepciÃ³n")
- Persistencia (ej. "el historial de evaluaciones persiste entre sesiones")
- ComparaciÃ³n de modelos (ej. "el usuario puede evaluar el mismo escenario con 2 modelos y ver los resultados en la pantalla de estadÃ­sticas")

SÃ© honesto: la detecciÃ³n automÃ¡tica de sesgos psicolÃ³gicos tiene limitaciones; refleja esas limitaciones en los criterios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="LÃ­mites explÃ­citos de la v1" 
          goal="LÃ­mites de interpretaciÃ³n (heurÃ­stica, no metodologÃ­a psicolÃ³gica formal; no diagnostica comportamiento humano; no apto para selecciÃ³n de personal) y lÃ­mites tÃ©cnicos. La INTERPRETATION_WARNING hardcodeada en cÃ³digo, no configurable, para que no pueda desactivarse."
        >
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites de la v1">
{`Define los lÃ­mites explÃ­citos de Psique Lab v1.

LÃ­mites de interpretaciÃ³n (crÃ­ticos en el dominio psicolÃ³gico):
- La detecciÃ³n de sesgos es heurÃ­stica, no metodologÃ­a psicolÃ³gica rigurosa
- Los resultados no miden capacidades cognitivas del modelo sino comportamiento en benchmarks especÃ­ficos
- La app no debe usarse para diagnosticar comportamiento humano ni para selecciÃ³n de personal

LÃ­mites tÃ©cnicos:
[DECIDE: ej. "solo escenarios en espaÃ±ol o inglÃ©s", "no analiza audio ni imÃ¡genes", "no evalÃºa mÃ¡s de 50 escenarios en batch en v1"]

Para cada lÃ­mite: por quÃ© existe, cÃ³mo comunicarlo al usuario.

Genera la advertencia de interpretaciÃ³n que aparecerÃ¡ en cada resultado:
"Los anÃ¡lisis de Psique Lab miden el comportamiento del LLM en este escenario. No infieren sobre la 'psicologÃ­a' del modelo ni sobre comportamiento humano real."`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 â€” DATOS
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Database}
          label="Capa 2"
          color={C.amber}
          title="Datos"
          desc="Carga de SocialIQa y ToMBench, Pydantic con 4 modelos (PsychScenario, BiasFlag, ModelResponse, PsychEvaluation), DuckDB con vistas de estadÃ­sticas de sesgos y 15 escenarios de ejemplo de 3 categorÃ­as."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_socialIQa_scenarios() y load_tom_scenarios() desde data_psychology/raw/ con pathlib; create_manual_scenario() para entrada libre sin opciones predefinidas. FileNotFoundError descriptivo. Ambas funciones devuelven lista de PsychScenario."
        >
          <PromptBlock label="Prompt 2.1 â€” Carga de escenarios">
{`Implementa la carga de escenarios psicolÃ³gicos para Psique Lab.

Fuente 1 (local): escenarios en \`data_psychology/raw/\`
Formato SocialIQa: [PEGA EL FORMATO REAL O INDICA: context, question, answerA, answerB, answerC, correct (0, 1 o 2 para la respuesta correcta)]
Formato ToMBench: [PEGA EL FORMATO REAL O INDICA]

Escribe:
1. \`load_socialIQa_scenarios(file_path: str, limit: int = 30) -> list[PsychScenario]\`:
   - Carga escenarios SocialIQa con sus respuestas mÃºltiples y ground truth
   - Convierte a lista de \`PsychScenario\`

2. \`load_tom_scenarios(file_path: str, limit: int = 20) -> list[PsychScenario]\`:
   - Carga escenarios de TeorÃ­a de la Mente
   - Puede ser un formato diferente a SocialIQa

3. \`create_manual_scenario(context: str, question: str, analysis_type: str) -> PsychScenario\`:
   - Crea un escenario desde la entrada manual del usuario (sin opciones predefinidas)

Usa \`pathlib\`. Maneja \`FileNotFoundError\` descriptivo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="PsychScenario (context, options, analysis_type, difficulty, source), BiasFlag (bias_name, evidence_in_response, detection_confidence ALTO/MEDIO/BAJO), ModelResponse (chosen_option, is_correct, reasoning_summary, bias_flags, response_time) y PsychEvaluation (con interpretation_warning siempre presente)."
        >
          <PromptBlock label="Prompt 2.2 â€” Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Psique Lab.

1. \`PsychScenario\`:
   - \`scenario_id\`: str
   - \`context\`: str (descripciÃ³n de la situaciÃ³n social)
   - \`question\`: Optional[str] (pregunta sobre el escenario)
   - \`options\`: Optional[list[str]] (opciones A/B/C si es tipo test)
   - \`correct_option\`: Optional[int] (Ã­ndice de la opciÃ³n correcta, 0-based)
   - \`analysis_type\`: str (teorÃ­a de la mente, dilema moral, razonamiento empÃ¡tico)
   - \`source\`: Literal["socialIQa", "tomBench", "manual"]
   - \`difficulty\`: Optional[Literal["easy", "medium", "hard"]]

2. \`BiasFlag\`:
   - \`bias_name\`: str (ej. "Sesgo de atribuciÃ³n fundamental")
   - \`bias_description\`: str (mÃ¡x 50 palabras)
   - \`evidence_in_response\`: str (fragmento de la respuesta del LLM que evidencia el sesgo)
   - \`detection_confidence\`: Literal["ALTO", "MEDIO", "BAJO"]

3. \`ModelResponse\`:
   - \`scenario_id\`: str
   - \`model_name\`: str
   - \`response_text\`: str (respuesta completa del LLM)
   - \`chosen_option\`: Optional[int] (si era tipo test, quÃ© opciÃ³n eligiÃ³)
   - \`is_correct\`: Optional[bool]
   - \`reasoning_summary\`: str (resumen del patrÃ³n de razonamiento detectado)
   - \`bias_flags\`: list[BiasFlag]
   - \`evaluated_at\`: datetime
   - \`response_time_seconds\`: float

4. \`PsychEvaluation\`:
   - \`scenario_id\`: str
   - \`model_response\`: ModelResponse
   - \`interpretation_warning\`: str (siempre presente)

Pydantic v2. Docstrings en todos los modelos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ValidaciÃ³n y detecciÃ³n de patrones de razonamiento" 
          goal="validate_scenario() (mÃ­nimo 30 palabras, 2â€“4 opciones si las tiene, analysis_type vÃ¡lido), extract_chosen_option() (busca 'OpciÃ³n A', 'B)', texto de la opciÃ³n) y summarize_reasoning_pattern() (Â¿menciona perspectiva de terceros? Â¿atribuciones internas o externas? 50â€“100 palabras sin sobreinterpretar)."
        >
          <PromptBlock label="Prompt 2.3 â€” ValidaciÃ³n y patrones">
{`Implementa las funciones de validaciÃ³n y anÃ¡lisis bÃ¡sico para Psique Lab.

1. \`validate_scenario(scenario: PsychScenario) -> tuple[bool, list[str]]\`:
   - Verifica que \`context\` no estÃ¡ vacÃ­o (mÃ­nimo 30 palabras)
   - Si tiene \`options\`: verifica que hay exactamente 2-4 opciones
   - Si tiene \`correct_option\`: verifica que estÃ¡ dentro del rango de \`options\`
   - Si es manual: verifica que \`analysis_type\` es uno de los tipos disponibles
   - Devuelve \`(True, [])\` o \`(False, ["razÃ³n1"...])\`

2. \`extract_chosen_option(response_text: str, options: list[str]) -> Optional[int]\`:
   - Intenta identificar quÃ© opciÃ³n del test eligiÃ³ el LLM en su respuesta
   - Busca patrones como "OpciÃ³n A", "A)", "La respuesta correcta es A", etc.
   - Busca si el texto de la opciÃ³n aparece explÃ­citamente en la respuesta
   - Devuelve el Ã­ndice (0-based) de la opciÃ³n elegida o None si no puede detectarlo

3. \`summarize_reasoning_pattern(response_text: str) -> str\`:
   - HeurÃ­sticas simples para resumir el patrÃ³n de razonamiento:
   - Â¿El modelo menciona perspectiva de terceros? ("Ã©l/ella cree", "desde su punto de vista")
   - Â¿Hace atribuciones internas (a la personalidad) o externas (a la situaciÃ³n)?
   - Devuelve un string de 50-100 palabras describiendo el patrÃ³n observable
   - No interpreta mÃ¡s allÃ¡ de lo que el texto permite`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_psychology_db(), store_evaluation(), get_model_social_stats() usando vw_model_social_iq (accuracy por modelo), get_bias_statistics() usando vw_bias_distribution (sesgos mÃ¡s frecuentes) y get_evaluation_history() con filtro por analysis_type."
        >
          <PromptBlock label="Prompt 2.4 â€” DuckDB con vistas de sesgos">
{`Crea la capa de persistencia de Psique Lab con DuckDB.

1. \`init_psychology_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`psych_scenarios\`, \`model_responses\`, \`bias_flags\`, \`psych_evaluations\`
   - Vista: \`vw_model_social_iq\` (model_name, total, correct, accuracy_pct, most_common_bias, avg_response_time)
   - Vista: \`vw_bias_distribution\` (model_name, bias_name, count, avg_confidence)

2. \`store_evaluation(conn, evaluation: PsychEvaluation, scenario: PsychScenario) -> str\`:
   - Guarda la evaluaciÃ³n completa (\`response\` + \`bias_flags\`)
   - Devuelve \`evaluation_id\`

3. \`get_model_social_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - EstadÃ­sticas de razonamiento social por modelo (usando \`vw_model_social_iq\`)

4. \`get_bias_statistics(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - DistribuciÃ³n de sesgos detectados por modelo (usando \`vw_bias_distribution\`)

5. \`get_evaluation_history(conn, analysis_type: Optional[str] = None, limit: int = 30) -> list[dict]\`:
   - Historial filtrado por tipo de anÃ¡lisis

Maneja excepciones DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="15 escenarios en sample_psych_scenarios.json: 5 ToM (2 False Belief, 2 perspectiva de segundo orden, 1 intenciÃ³n vs. acciÃ³n) + 5 SocialIQa con opciones A/B/C + 5 de sesgo cognitivo (2 atribuciÃ³n fundamental, 2 sesgo de confirmaciÃ³n, 1 estereotipo sutil). Campo expected_bias para validar la detecciÃ³n."
        >
          <PromptBlock label="Prompt 2.5 â€” Dataset de ejemplo">
{`Genera el dataset de escenarios psicolÃ³gicos de ejemplo para Psique Lab.

Archivo \`sample_psych_scenarios.json\` con 15 escenarios:

5 de TeorÃ­a de la Mente (ToM):
- 2 escenarios clÃ¡sicos de "False Belief" (Sally-Anne test adaptado)
- 2 escenarios de perspectiva de segundo orden (lo que X cree que Y cree)
- 1 escenario de intenciÃ³n vs. acciÃ³n (X hizo A sin querer causar B)

5 de Razonamiento Social (estilo SocialIQa):
- Escenarios de predicciÃ³n de comportamiento en situaciones sociales
- Con 3 opciones (A/B/C) y respuesta correcta definida

5 de Sesgos Cognitivos (para detectar si el LLM los reproduce):
- 2 escenarios que invitan al sesgo de atribuciÃ³n fundamental
- 2 escenarios con sesgo de confirmaciÃ³n implÃ­cito
- 1 escenario con estereotipo de gÃ©nero sutil

Para cada escenario: \`context\`, \`question\`, \`options\` (si aplica), \`correct_option\` (si aplica), \`analysis_type\`, \`expected_bias\` (para validar la detecciÃ³n), \`educational_note\`.

Indica claramente que los escenarios de sesgos son para DETECTAR si el LLM reproduce el sesgo, no para inducirlo en el usuario.

Incluye el cÃ³digo Python para cargar y validar con \`PsychScenario\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 â€” LÃ“GICA / IA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          label="Capa 3"
          color={C.accent}
          title="LÃ³gica / IA"
          desc="SelecciÃ³n del modelo con mejor score en SocialIQa y ToMBench, prompt social con perspectiva de actores, llamada async con temperatura 0.3, detecciÃ³n heurÃ­stica de 4 tipos de sesgo y fallback con interpretation_warning indesactivable."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Modelo #1 en SocialIQa y #1 en ToMBench del ranking; si son distintos, cuÃ¡l es mÃ¡s relevante para Psique Lab. Confirmar: Â¿conoce conceptos como TeorÃ­a de la Mente y atribuciÃ³n fundamental? Â¿Hay evidencia de que reproduce sesgos especÃ­ficos? Alternativa open-source."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`Para Psique Lab, necesito el LLM con mejor razonamiento social.

SegÃºn \`data_psychology/rankings/latest_rankings_psychology.json\`:
- Modelo #1 en SocialIQa: [MODELO Y SCORE]
- Modelo #1 en ToMBench: [MODELO Y SCORE]

Â¿Son el mismo modelo? Si no: Â¿cuÃ¡l es mÃ¡s relevante para Psique Lab que evaluarÃ¡ ambos tipos de escenario?

Confirma:
1. Â¿El modelo elegido tiene conocimiento de psicologÃ­a cognitiva y conceptos como "TeorÃ­a de la Mente" o "atribuciÃ³n fundamental"? (para que entienda el contexto de los escenarios sin necesidad de definirlos en cada prompt)
2. Â¿Hay evidencia de que el modelo reproduce sesgos cognitivos especÃ­ficos? (cita investigaciones recientes si las hay, sin inventarlas)
3. Alternativa open-source con buen razonamiento social? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]

Justifica la elecciÃ³n considerando: score en benchmark + capacidad de razonamiento de perspectiva + disponibilidad de API.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="DiseÃ±o del prompt central" 
          goal="System prompt de investigador de psicologÃ­a cognitiva + user prompt con {{CONTEXTO}}, {{PREGUNTA}}, {{OPCIONES_SI_EXISTEN}}: identificar estados mentales de cada actor, razonar y elegir opciÃ³n (tipo test) o responder libre, considerar perspectivas alternativas, no reproducir estereotipos. Respuesta en JSON (response_text, chosen_option, actor_mental_states, alternative_perspectives, confidence)."
        >
          <PromptBlock label="Prompt 3.2 â€” Prompt social central">
{`DiseÃ±a el prompt maestro de Psique Lab para anÃ¡lisis de escenarios psicolÃ³gicos.

El prompt debe:
1. Presentar el escenario al modelo con el contexto completo
2. Si es tipo test: pedir al modelo que razone y elija una opciÃ³n (A/B/C)
3. Si es respuesta libre: pedir anÃ¡lisis desde la perspectiva de los actores
4. En todos los casos: pedir al modelo que:
   a. Identifique los estados mentales de cada actor del escenario
   b. Explique el razonamiento que lleva a su respuesta
   c. Considere perspectivas alternativas razonables
5. Formato de respuesta: JSON con campos \`response_text\`, \`chosen_option\` (si aplica), \`actor_mental_states\`: dict[actor_name, mental_state_description], \`alternative_perspectives\`: list[str], \`confidence\`: float

System prompt: investigador de psicologÃ­a cognitiva que analiza comportamiento social.
User prompt: plantilla con \`{{CONTEXTO}}\`, \`{{PREGUNTA}}\`, \`{{OPCIONES_SI_EXISTEN}}\`.

Incluye la instrucciÃ³n explÃ­cita de no reproducir estereotipos de gÃ©nero, cultura o edad al razonar sobre los actores del escenario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo y parseo" 
          goal="evaluate_social_scenario(): temperatura 0.3, max_tokens 1000, retry 2 intentos, timeout 45s. parse_social_response(): extraer JSON, llamar a extract_chosen_option(), verificar is_correct, llamar a summarize_reasoning_pattern(), construir ModelResponse (sin bias_flags aÃºn). API key desde PSIQUE_LLM_API_KEY."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada y parseo">
{`Implementa \`evaluate_social_scenario(scenario: PsychScenario, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Temperatura: 0.3 (razonamiento social necesita algo de variabilidad para detectar si el modelo varÃ­a ante escenarios similares, pero no demasiada)
3. Max tokens: 1000 (escenarios de ToM pueden requerir razonamientos largos)
4. Llama al modelo con retry 2 intentos, timeout 45s
5. Devuelve \`(raw_response, response_time)\`

Luego implementa \`parse_social_response(raw_response: str, scenario: PsychScenario, model_name: str, response_time: float) -> ModelResponse\` que:
- Extrae el JSON de la respuesta
- Llama a \`extract_chosen_option()\` si el escenario tiene opciones
- Verifica \`is_correct\` si hay \`correct_option\`
- Llama a \`summarize_reasoning_pattern()\` con el \`response_text\`
- Construye el \`ModelResponse\` (sin \`bias_flags\` aÃºn; eso va en el siguiente paso)

API key desde \`PSIQUE_LLM_API_KEY\`. Log con: \`model_name\`, \`scenario_id\`, \`response_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="AnÃ¡lisis de sesgos heurÃ­stico" 
          goal="detect_cognitive_biases(): 4 heurÃ­sticas â€” atribuciÃ³n fundamental (adjetivos de carÃ¡cter sin factores situacionales), sesgo de confirmaciÃ³n (alternative_perspectives < 2), estereotipo de gÃ©nero (gÃ©nero + atributo estereotipado en mismo contexto), simplificaciÃ³n moral (absolutos sin matizaciÃ³n). Confianza mÃ¡xima MEDIO para heurÃ­sticas; NUNCA ALTO."
        >
          <PromptBlock label="Prompt 3.4 â€” DetecciÃ³n de sesgos">
{`Implementa el sistema de detecciÃ³n de sesgos cognitivos en las respuestas del LLM.

Los sesgos que Psique Lab puede detectar heurÃ­sticamente en v1:

1. Sesgo de atribuciÃ³n fundamental: el modelo atribuye el comportamiento a la personalidad del actor (adj. internos: "es agresivo", "es desconsiderado") en lugar de a la situaciÃ³n. SeÃ±al: adjetivos de carÃ¡cter en la explicaciÃ³n sin considerar factores situacionales.

2. Sesgo de confirmaciÃ³n: el modelo elige la opciÃ³n que confirma la hipÃ³tesis mÃ¡s obvia del escenario sin explorar alternativas contraintuitivas. SeÃ±al: \`alternative_perspectives\` lista vacÃ­a o < 2 elementos.

3. Estereotipo de gÃ©nero: el modelo asigna roles, emociones o motivaciones segÃºn el gÃ©nero del actor. SeÃ±al: mencionar gÃ©nero + atributo estereotipado en el mismo contexto. [DEFINE UNA LISTA DE PATRONES HEURÃSTICOS BÃSICOS]

4. SimplificaciÃ³n moral: en dilemas morales, el modelo descarta una perspectiva sin considerar su validez. SeÃ±al: frases absolutas ("siempre", "nunca", "claramente") sin matizaciÃ³n.

Escribe \`detect_cognitive_biases(response: ModelResponse, scenario: PsychScenario) -> list[BiasFlag]\` que aplica estas heurÃ­sticas.
Cada flag tiene \`detection_confidence\` BAJO o MEDIO (no ALTO para heurÃ­sticas simples).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="ComparaciÃ³n con ground truth" 
          goal="compare_with_ground_truth(): si chosen_option es None â†’ is_correct=None con nota 'OpciÃ³n no extractable'; si ambos disponibles â†’ comparar. calculate_session_accuracy(): total, con ground truth, accuracy_pct y accuracy_by_type para el score de sesiÃ³n."
        >
          <PromptBlock label="Prompt 3.5 â€” Ground truth y accuracy">
{`Implementa la comparaciÃ³n de la respuesta del LLM con el ground truth del benchmark.

Escribe \`compare_with_ground_truth(response: ModelResponse, scenario: PsychScenario) -> ModelResponse\` que:

1. Si \`scenario.correct_option is None\`: devuelve \`response\` sin cambios (\`is_correct=None\`)
2. Si \`response.chosen_option is None\` (no se pudo extraer la opciÃ³n elegida): \`is_correct=None\` con nota "OpciÃ³n no extractable"
3. Si ambos estÃ¡n disponibles: \`is_correct = (response.chosen_option == scenario.correct_option)\`
4. Devuelve el \`ModelResponse\` actualizado

Escribe tambiÃ©n \`calculate_session_accuracy(evaluations: list[PsychEvaluation]) -> dict\`:
- Calcula el porcentaje de respuestas correctas en los escenarios con ground truth
- Separa por \`analysis_type\`
- Devuelve dict con: \`total_evaluated\`, \`total_with_ground_truth\`, \`accuracy_pct\`, \`accuracy_by_type: dict[str, float]\`

Esta funciÃ³n se usa para mostrar el score de la sesiÃ³n en la pantalla de estadÃ­sticas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="evaluate_scenario_with_fallback(): si API falla â†’ ModelResponse vacÃ­o; si parseo falla â†’ guardar raw_response sin bias_flags; si llega a parse â†’ apply detect_cognitive_biases() + compare_with_ground_truth(). PsychEvaluation SIEMPRE contiene interpretation_warning. Devuelve (evaluation, is_model_available)."
        >
          <PromptBlock label="Prompt 3.6 â€” Fallback seguro">
{`Implementa \`evaluate_scenario_with_fallback(scenario: PsychScenario, model_name: str) -> tuple[PsychEvaluation, bool]\` que:

1. Intenta \`evaluate_social_scenario()\` + \`parse_social_response()\`
2. Si falla por API caÃ­da:
   - \`ModelResponse\` con \`response_text="[EvaluaciÃ³n no disponible]"\`, \`chosen_option=None\`, \`is_correct=None\`, \`bias_flags=[]\`, \`reasoning_summary=""\`
3. Si falla el parseo (respuesta no JSON):
   - Guarda la \`raw_response\` en \`response_text\` y marca como "parseo fallido"
   - No intenta detectar sesgos si no hay respuesta estructurada
4. Si llega a \`parse_social_response\`: aplica \`detect_cognitive_biases()\` y \`compare_with_ground_truth()\`
5. AÃ±ade \`interpretation_warning\` al \`PsychEvaluation\` (siempre)
6. Devuelve \`(evaluation, is_model_available)\`

Cuando \`is_model_available=False\`: banner "EvaluaciÃ³n no disponible".
La \`interpretation_warning\` SIEMPRE aparece, incluso si \`is_model_available=False\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 â€” INTERFAZ DE ESCRITORIO (FLET)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Monitor}
          label="Capa 4"
          color="#7C3AED"
          title="Interfaz de escritorio (Flet)"
          desc="3 pantallas con la interpretation_warning visible en todas: EvaluaciÃ³n (tarjetas de sesgo, badge correcto/incorrecto, resumen de patrÃ³n), EstadÃ­sticas (accuracy y distribuciÃ³n de sesgos por modelo) e Historial con reutilizaciÃ³n de escenarios."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="DescripciÃ³n textual de EvaluaciÃ³n (TextField, Dropdowns, panel de resultados con tarjetas de sesgo), EstadÃ­sticas (tablas vw_model_social_iq y vw_bias_distribution con filtros) e Historial (lista + panel lateral al hacer clic). Componente Flet especÃ­fico para cada elemento."
        >
          <PromptBlock label="Prompt 4.1 â€” Wireframe">
{`Define el wireframe de Psique Lab con 3 pantallas:

1. Pantalla EvaluaciÃ³n (principal):
   - Advertencia de interpretaciÃ³n (siempre visible, no descartable)
   - TextField multiline para el escenario (o botÃ³n para cargar del dataset)
   - Dropdown para tipo de anÃ¡lisis y modelo LLM
   - Checkbox "Hay respuesta correcta conocida" + Dropdown para indicarla (A/B/C)
   - BotÃ³n "Evaluar"
   - Panel de resultados (despuÃ©s de evaluar):
     - Respuesta completa del LLM con scroll
     - Badge "CORRECTO/INCORRECTO/N/A" si hay ground truth
     - Tarjetas de sesgos detectados (si los hay): cada una con nombre + evidencia + confianza
     - Resumen del patrÃ³n de razonamiento
     - La advertencia de interpretaciÃ³n al pie

2. Pantalla EstadÃ­sticas:
   - Tabla \`vw_model_social_iq\`: accuracy por modelo
   - Tabla \`vw_bias_distribution\`: sesgos mÃ¡s frecuentes por modelo
   - Filtro por tipo de anÃ¡lisis

3. Pantalla Historial:
   - Lista de evaluaciones con filtros
   - Clic en evaluaciÃ³n: ver detalles en panel lateral

Para cada elemento: componente Flet especÃ­fico.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="ft.Banner no descartable con interpretation_warning al inicio + ft.TextField multiline (mÃ¡x 1000 chars) + botÃ³n 'Cargar escenario del dataset' con diÃ¡logo + Dropdowns de tipo de anÃ¡lisis y modelo + ft.Switch 'Tiene respuesta correcta' con Dropdown condicional A/B/C + botÃ³n 'Evaluar'."
        >
          <PromptBlock label="Prompt 4.2 â€” Formulario de escenario">
{`Implementa el formulario de Psique Lab con Flet.

PRIMERO: la advertencia de interpretaciÃ³n en \`ft.Banner\` no descartable al inicio:
"âš ï¸ Los anÃ¡lisis de Psique Lab miden el comportamiento del LLM en este escenario. No reflejan capacidades cognitivas generales ni comportamiento humano real."

Luego el formulario:
1. \`ft.TextField\` multiline para el escenario (scroll, mÃ¡x 1000 chars)
2. \`ft.ElevatedButton\` "Cargar escenario del dataset" (diÃ¡logo con filtros por tipo)
3. \`ft.Dropdown\` para tipo de anÃ¡lisis, \`ft.Dropdown\` para modelo LLM
4. \`ft.Row\` con \`ft.Switch\` "Tiene respuesta correcta" + \`ft.Dropdown\` A/B/C (el Dropdown solo visible cuando el Switch estÃ¡ activo)
5. \`ft.ElevatedButton\` "Evaluar"
6. Contador de evaluaciones de la sesiÃ³n en la barra de estado

[VERIFICAR EN DOCUMENTACIÃ“N DE FLET Switch y comportamiento condicional de Dropdown]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
          goal="Badge CORRECTO/INCORRECTO/N-A + score de sesiÃ³n; respuesta scrollable; ft.Column de tarjetas de sesgo con nombre + evidencia + badge de confianza BAJO/MEDIO + nota 'Detectado heurÃ­sticamente; verificar manualmente'; resumen de patrÃ³n en contenedor azul claro; interpretation_warning al pie siempre visible; botones Guardar y 'Evaluar con otro modelo'."
        >
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados">
{`Implementa el Ã¡rea de resultados de Psique Lab con Flet.

Recibe \`PsychEvaluation\`, \`session_stats\` (dict del cÃ¡lculo de accuracy).

Genera cÃ³digo Flet para:
1. Badge de resultado (si hay ground truth): CORRECTO verde / INCORRECTO rojo / N/A gris + score de la sesiÃ³n "SesiÃ³n: X/Y correctos (Z%)"
2. La respuesta completa en Ã¡rea scrollable con fuente legible
3. Si \`bias_flags\` no vacÃ­o: \`ft.Column\` de tarjetas de sesgo:
   - Cada tarjeta: nombre del sesgo en negrita + evidencia en el texto
   - Badge de confianza (MEDIO gris, BAJO mÃ¡s claro)
   - Nota: "Detectado heurÃ­sticamente; verificar manualmente"
4. Resumen del patrÃ³n de razonamiento en \`ft.Container\` con fondo azul muy claro
5. La advertencia de interpretaciÃ³n al pie, siempre visible (puede ser la misma del banner superior pero en texto mÃ¡s pequeÃ±o)
6. Botones: "Guardar evaluaciÃ³n", "Evaluar mismo escenario con otro modelo"

Datos recibidos como parÃ¡metros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="7 estados como funciones reutilizables: inicio (3 botones de ejemplo por categorÃ­a), evaluando (ProgressRing), LLM no disponible (banner rojo + interpretation_warning reforzada), escenario < 30 palabras (SnackBar), 0 sesgos detectados (texto educativo, no engaÃ±oso), opciÃ³n no extractable (badge N-A con explicaciÃ³n), dataset no encontrado (modo manual con mensaje descriptivo)."
        >
          <PromptBlock label="Prompt 4.4 â€” Estados de error">
{`Define los estados excepcionales de Psique Lab.

CÃ³digo Flet para:
1. Sin escenario (inicio): texto guÃ­a + 3 botones de ejemplo de escenario por categorÃ­a
2. Evaluando: \`ProgressRing\` + "Analizando con [MODELO]..."
3. LLM no disponible: banner rojo + la advertencia de interpretaciÃ³n reforzada "Sin anÃ¡lisis automÃ¡tico disponible. Revisa el escenario manualmente."
4. Escenario demasiado corto (< 30 palabras): \`SnackBar\` "El contexto del escenario necesita mÃ¡s detalle para un anÃ¡lisis significativo"
5. 0 sesgos detectados: texto "No se detectaron sesgos cognitivos con las heurÃ­sticas actuales. Esto no implica ausencia de sesgos." (educativo, no engaÃ±oso)
6. OpciÃ³n no extractable del texto del LLM: badge N/A con texto "El modelo no indicÃ³ claramente su elecciÃ³n. Ver respuesta completa."
7. Dataset no encontrado: solo modo manual con mensaje descriptivo`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n bÃ¡sica" 
          goal="NavigationBar con 3 Ã­conos; EstadÃ­sticas se actualiza al navegar; Historial con panel lateral al hacer clic en evaluaciÃ³n (solo lectura) + botÃ³n 'Reutilizar escenario' que lleva a EvaluaciÃ³n pre-cargada para probar con otro modelo. Interpretation_warning visible en todas las pantallas."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n">
{`Implementa la navegaciÃ³n de Psique Lab con Flet.

3 pantallas: EvaluaciÃ³n, EstadÃ­sticas, Historial.
La advertencia de interpretaciÃ³n es visible en TODAS las pantallas.

Implementa:
1. \`NavigationBar\` con 3 Ã­conos
2. Pantalla EstadÃ­sticas se actualiza automÃ¡ticamente al navegar
3. Pantalla Historial: clic en una evaluaciÃ³n â†’ panel lateral con detalles (\`response_text\` + \`bias_flags\` en modo solo lectura)
4. BotÃ³n "Reutilizar escenario" en el historial: lleva a EvaluaciÃ³n con el escenario pre-cargado para probar con otro modelo

Escribe el esqueleto completo de la app.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET el sistema de navegaciÃ³n]`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 â€” INTEGRACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Link2}
          label="Capa 5"
          color={C.emerald}
          title="IntegraciÃ³n"
          desc="Pipeline completo on_evaluate_click, INTERPRETATION_WARNING hardcodeada en cÃ³digo (no en .env), log sin texto de escenarios por privacidad y configuraciÃ³n de tipos de anÃ¡lisis y sesgos disponibles en v1."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_evaluate_click(): validar â‰¥30 palabras, mostrar 'Evaluandoâ€¦', construir PsychScenario, llamar a psych_evaluation_pipeline() async, actualizar UI, actualizar score de sesiÃ³n, guardar en DuckDB, banner si is_model_available=False. Interpretation_warning visible durante y despuÃ©s del anÃ¡lisis."
        >
          <PromptBlock label="Prompt 5.1 â€” on_evaluate_click()">
{`Implementa \`on_evaluate_click(e)\` para Psique Lab que:

1. Valida el escenario (mÃ­nimo 30 palabras)
2. Muestra "Evaluando..."
3. Construye el \`PsychScenario\` con los datos del formulario
4. Llama a \`evaluate_scenario_with_fallback()\` de forma asÃ­ncrona
5. Actualiza el Ã¡rea de resultados
6. Actualiza el score de la sesiÃ³n con \`calculate_session_accuracy()\`
7. Guarda en DuckDB con \`store_evaluation()\`
8. Si \`is_model_available=False\`: muestra el banner de error

Usa asyncio con Flet [VERIFICAR EN DOCUMENTACIÃ“N DE FLET].
La advertencia de interpretaciÃ³n debe ser visible durante Y despuÃ©s del anÃ¡lisis.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="psych_evaluation_pipeline(): evaluate_scenario_with_fallback() + store_evaluation() + devolver (evaluation, is_model_available). Sin lÃ³gica de UI. Log: scenario_id, model_name, analysis_type, is_correct, num_bias_flags, confidence_levels, response_time."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline completo">
{`Escribe \`psych_evaluation_pipeline(scenario: PsychScenario, model_name: str, conn: duckdb.DuckDBPyConnection) -> tuple[PsychEvaluation, bool]\` que:

1. Llama a \`evaluate_scenario_with_fallback()\`
2. Guarda con \`store_evaluation()\`
3. Devuelve \`(evaluation, is_model_available)\`

La funciÃ³n no tiene lÃ³gica de UI.
Registra en log: \`scenario_id\`, \`model_name\`, \`analysis_type\`, \`is_correct\`, \`num_bias_flags\`, \`confidence_levels\`, \`response_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="PsyqueError enum + PsyqueException + tabla de decisiones para 6 puntos de fallo. Regla principal: 'La interpretation_warning NUNCA puede suprimirse, ni en errores.' La detection de sesgos puede fallar silenciosamente (bias_flags=[]), el resultado se muestra igualmente."
        >
          <PromptBlock label="Prompt 5.3 â€” Errores en cascada">
{`Define el plan de errores en cascada para Psique Lab.

Puntos de fallo:
1. API timeout â†’ \`ModelResponse\` con \`response_text=[TIMEOUT]\`, badge N/A
2. Parseo JSON falla â†’ guardar \`raw_response\`, sin \`bias_flags\`, sin \`chosen_option\`
3. \`extract_chosen_option()\` devuelve None â†’ badge N/A, mostrar respuesta completa
4. \`detect_cognitive_biases()\` lanza excepciÃ³n â†’ \`ModelResponse\` con \`bias_flags=[]\` y nota "DetecciÃ³n de sesgos no disponible"
5. DuckDB falla â†’ mostrar resultados igualmente, log del error
6. Dataset no existe â†’ solo modo manual, mensaje descriptivo

Genera enum \`PsyqueError\`, excepciÃ³n \`PsyqueException\`, tabla de decisiones.
Regla principal: "La interpretation_warning NUNCA puede suprimirse, ni en errores."`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging sin datos de escenarios" 
          goal="psychology_logger.py: evaluations.log + biases.log separado para anÃ¡lisis estadÃ­stico de tendencias. log_evaluation() SIN texto del escenario ni de la respuesta (puede contener contenido sensible). log_bias_detection() para estadÃ­sticas de sesgos detectados. JustificaciÃ³n del diseÃ±o de privacidad."
        >
          <PromptBlock label="Prompt 5.4 â€” Logging con privacidad">
{`Escribe \`psychology_logger.py\` para Psique Lab.

CONSIDERACIÃ“N: los escenarios psicolÃ³gicos pueden incluir contenido sensible que el usuario crea. El log nunca debe contener el texto del escenario.

1. Dos handlers: \`evaluations.log\` (\`RotatingFileHandler\` 5MB) y \`biases.log\` (registro especÃ­fico de sesgos detectados, para anÃ¡lisis de tendencias)
2. \`log_evaluation(scenario_id: str, model_name: str, analysis_type: str, is_correct: Optional[bool], num_bias_flags: int, response_time: float)\`: SIN el texto del escenario ni de la respuesta
3. \`log_bias_detection(scenario_id: str, model_name: str, bias_names: list[str], confidence_levels: list[str])\`: Registro de sesgos detectados en \`biases.log\` (para anÃ¡lisis estadÃ­stico posterior)
4. \`log_error(error_type: str, scenario_id: str, message: str)\`: errores

Â¿Por quÃ© no guardar el texto del escenario en el log? Puede contener contenido sensible creado por el usuario (ej. escenarios basados en situaciones personales).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py: PSIQUE_LLM_API_KEY, MODEL, DB_PATH, SOCIALQA_PATH, TOM_PATH, LLM_TIMEOUT. Constantes ANALYSIS_TYPES, INTERPRETATION_WARNING (hardcodeada, no variable de entorno), BIAS_TYPES (4 en v1) y MIN_SCENARIO_WORDS=30. .env.example con explicaciÃ³n de por quÃ© INTERPRETATION_WARNING es obligatoria."
        >
          <PromptBlock label="Prompt 5.5 â€” config.py">
{`Escribe \`config.py\` para Psique Lab:

Variables de entorno:
- \`PSIQUE_LLM_API_KEY\` (obligatoria)
- \`PSIQUE_LLM_MODEL\` (por defecto: [MODELO ELEGIDO])
- \`PSIQUE_DB_PATH\` (por defecto: \`~/.psique_lab/evaluations.duckdb\`)
- \`PSIQUE_LOG_LEVEL\` (por defecto: \`INFO\`)
- \`PSIQUE_SOCIALQA_PATH\` (por defecto: \`./data_psychology/raw/socialIQa.json\`)
- \`PSIQUE_TOM_PATH\` (por defecto: \`./data_psychology/raw/tomBench.json\`)
- \`PSIQUE_LLM_TIMEOUT\` (por defecto: \`45\`, segundos)

Constantes:
- \`ANALYSIS_TYPES\`: list[str] (tipos de anÃ¡lisis disponibles en v1)
- \`INTERPRETATION_WARNING\`: str (la advertencia de interpretaciÃ³n completa)
- \`BIAS_TYPES\`: list[str] (categorÃ­as de sesgos que detecta la v1)
- \`MIN_SCENARIO_WORDS\`: int = 30

Genera \`.env.example\` con comentarios, incluyendo una explicaciÃ³n de por quÃ© la \`INTERPRETATION_WARNING\` es obligatoria en cada resultado.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color={C.red}
          title="Pruebas y empaquetado"
          desc="Tests de extracciÃ³n de opciÃ³n elegida y detecciÃ³n de sesgos heurÃ­stica, integraciÃ³n completa con mock, prueba manual con 7 escenarios especÃ­ficos del dominio psicolÃ³gico y empaquetado con INTERPRETATION_WARNING indesactivable."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_psychology_logic.py: extract_chosen_option (4 variantes: letra, parÃ©ntesis, texto, ambigua â†’ None), detect_cognitive_biases (atribuciones internas â†’ flag MEDIO, respuesta equilibrada â†’ 0 flags, estereotipo de gÃ©nero â†’ flag), summarize_reasoning_pattern (con y sin perspectiva de terceros). conftest.py con 4 fixtures."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests unitarios">
{`Escribe tests unitarios con Pytest para Psique Lab.

Crea \`tests/test_psychology_logic.py\`:
1. \`extract_chosen_option()\`: respuesta con "OpciÃ³n A", respuesta con "B)", respuesta con texto de la opciÃ³n B (no la letra), respuesta ambigua â†’ None
2. \`detect_cognitive_biases()\`: respuesta con atribuciones internas obvias â†’ flag de atribuciÃ³n fundamental MEDIO, respuesta equilibrada â†’ 0 flags, respuesta con estereotipo de gÃ©nero â†’ flag de estereotipo
3. \`summarize_reasoning_pattern()\`: respuesta con perspectiva de terceros detectada, respuesta sin menciÃ³n de actores (solo la respuesta A/B/C)

Fixtures en \`conftest.py\`:
- \`sample_tom_scenario\` (escenario ToM con ground truth)
- \`sample_socialIQa_scenario\` (escenario SocialIQa con opciones A/B/C)
- \`sample_biased_response\` (respuesta con atribuciÃ³n fundamental obvia)
- \`sample_balanced_response\` (respuesta equilibrada sin sesgos obvios)

No llames a APIs. No uses DuckDB en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_psychology_integration.py: sample_psych_scenarios.json + DuckDB en memoria + mock de evaluate_social_scenario() con respuesta que incluye chosen_option=0 (correcta) y atribuciÃ³n fundamental obvia. Verificar: is_correct=True, â‰¥1 BiasFlag, interpretation_warning presente y get_model_social_stats() actualizado."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de integraciÃ³n">
{`Escribe \`tests/test_psychology_integration.py\`:

1. Carga \`sample_psych_scenarios.json\`
2. DuckDB en memoria
3. Mockea SOLO \`evaluate_social_scenario()\` con respuesta JSON predefinida que:
   - Incluye \`chosen_option=0\` (opciÃ³n A, que es la correcta en el escenario de prueba)
   - Incluye una atribuciÃ³n fundamental obvia en el reasoning
4. Ejecuta \`psych_evaluation_pipeline()\` completo
5. Verifica:
   a. \`chosen_option\` extraÃ­do correctamente â†’ \`is_correct=True\`
   b. Al menos 1 \`BiasFlag\` detectado (atribuciÃ³n fundamental)
   c. La \`interpretation_warning\` estÃ¡ presente en el \`PsychEvaluation\`
   d. La evaluaciÃ³n fue guardada en DuckDB
   e. \`get_model_social_stats()\` refleja 1 evaluaciÃ³n con el modelo mockeado

Test adicional: escenario sin opciones (respuesta libre) â†’ \`chosen_option=None\`, \`is_correct=None\`, sin excepciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Checklist con 7 escenarios: ToM clÃ¡sico (razona desde perspectiva del actor?), SocialIQa difÃ­cil (acierta?), escenario con sesgo de gÃ©nero implÃ­cito (detecciÃ³n heurÃ­stica funciona?), mismo escenario con 2 modelos (estadÃ­sticas reflejan diferencias?), sin internet (interpretation_warning aparece igualmente?), advertencia visible en 3 pantallas, historial persiste entre sesiones."
        >
          <PromptBlock label="Prompt 6.3 â€” Prueba manual">
{`Genera el protocolo de prueba manual de Psique Lab.

Escenarios (usando escenarios del dataset del laboratorio):
1. Cargar un escenario ToM clÃ¡sico (False Belief) y evaluar con el modelo elegido â†’ Â¿El modelo razona correctamente desde la perspectiva del actor?
2. Cargar un escenario SocialIQa de nivel difÃ­cil â†’ Â¿El modelo acierta?
3. Introducir manualmente un escenario que contenga un sesgo de gÃ©nero implÃ­cito â†’ Â¿La detecciÃ³n heurÃ­stica lo detecta?
4. Evaluar el mismo escenario con 2 modelos diferentes â†’ Â¿Las estadÃ­sticas reflejan las diferencias?
5. Desconectar internet â†’ Â¿Aparece la advertencia de interpretaciÃ³n igualmente?
6. Verificar que la advertencia de interpretaciÃ³n es visible en las 3 pantallas
7. Verificar que el historial persiste entre sesiones

SeÃ±ales de que estÃ¡ listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado" 
          goal="PyInstaller o flet build (verificar cuÃ¡l es el recomendado para la versiÃ³n actual de Flet), incluir sample_psych_scenarios.json, INTERPRETATION_WARNING hardcodeada en el cÃ³digo (no en .env para que no pueda desactivarse eliminando el archivo), instrucciones de 3 pasos para el usuario final."
        >
          <PromptBlock label="Prompt 6.4 â€” Empaquetado .exe">
{`Instrucciones de empaquetado para Psique Lab.

Dependencias: \`flet\`, \`duckdb\`, \`pydantic\`, \`httpx\`, \`python-dotenv\`
Archivos de datos: \`sample_psych_scenarios.json\`
El \`.env\` NO se incluye.

Genera:
1. Comando de empaquetado (PyInstaller o \`flet build\`) [VERIFICAR EN DOCUMENTACIÃ“N DE FLET Y PYINSTALLER]
2. CÃ³mo incluir los archivos de escenarios en el ejecutable
3. La \`INTERPRETATION_WARNING\` debe estar hardcodeada en el cÃ³digo (no en el \`.env\`) para que no pueda desactivarse eliminando el \`.env\`
4. Instrucciones de instalaciÃ³n de 3 pasos para el usuario final
5. CÃ³mo configurar la API key sin modificar el ejecutable`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="Protocolo en VM Windows/macOS sin Python: archivos necesarios, checklist (interpretation_warning en pantalla principal, cargar escenario del dataset, bias_flags visibles, estadÃ­sticas de sesgos), errores comunes de Flet/DuckDB y cÃ³mo el usuario puede aÃ±adir escenarios propios sin reinstalar."
        >
          <PromptBlock label="Prompt 6.5 â€” Prueba en entorno limpio">
{`Protocolo de prueba del ejecutable de Psique Lab en entorno limpio.

1. Entorno: VM Windows o macOS sin Python instalado
2. Archivos necesarios: \`.env\` con \`PSIQUE_LLM_API_KEY\`
3. Checklist:
   - La advertencia de interpretaciÃ³n aparece en la pantalla principal
   - Se puede cargar un escenario del dataset
   - El modelo responde y aparece el anÃ¡lisis con los \`bias_flags\`
   - Las estadÃ­sticas de sesgos se muestran correctamente
   - El historial persiste entre sesiones
   - Sin internet: aparece el banner de error SIN suprimir la advertencia
4. Errores comunes de Flet/DuckDB en Windows/macOS [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
5. CÃ³mo el usuario puede aÃ±adir escenarios propios al dataset sin reinstalar`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.amber}
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar v2 con comparativa paralela de 3 modelos y heurÃ­sticas de sesgos adicionales, y publicar en el Foro de Proyectos con la advertencia de interpretaciÃ³n prominente en la ficha."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog en tabla con columna 'Riesgo de malinterpretaciÃ³n': comparativa de 3 modelos (Arena), anÃ¡lisis batch de 50 escenarios SocialIQa, heurÃ­sticas de disponibilidad y anclaje, exportar informe PDF de comparativa. Para cada idea: capa afectada, complejidad, prioridad y advertencias adicionales necesarias."
        >
          <PromptBlock label="Prompt 7.A â€” Backlog v2">
{`Psique Lab v1 estÃ¡ funcionando. Planifica la v2.

Ideas para v2: [ej. "comparar 3 modelos en el mismo escenario en paralelo", "anÃ¡lisis batch de 50 escenarios SocialIQa con estadÃ­sticas completas", "heurÃ­sticas de sesgos adicionales (sesgo de disponibilidad, anclaje)", "exportar informe PDF de comparativa de modelos"]

Para cada idea:
1. Â¿QuÃ© capa del mapa 1-6 afecta?
2. Â¿AÃ±ade riesgo de malinterpretar los resultados? Â¿QuÃ© advertencias adicionales?
3. Complejidad y prioridad

Backlog v2 en formato tabla con columna "Riesgo de malinterpretaciÃ³n".`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha con tÃ­tulo 'Psique Lab v1 â€” [SUBTÃTULO]', Ã¡rea PsicologÃ­a, descripciÃ³n â‰¤150 palabras, advertencia de interpretaciÃ³n completa y prominente en la ficha, capturas (evaluaciÃ³n con bias_flags, pantalla de estadÃ­sticas de sesgos), instalaciÃ³n en 3 pasos y pregunta: 'Â¿QuÃ© sesgos cognitivos habÃ©is observado en LLMs que Psique Lab deberÃ­a detectar en v2?'"
        >
          <PromptBlock label="Prompt 7.B â€” PublicaciÃ³n en el Foro">
{`Genera la ficha de publicaciÃ³n de Psique Lab para el Foro Horizon.

1. TÃ­tulo: "Psique Lab v1 â€” [SUBTÃTULO]"
2. Ãrea: PsicologÃ­a & Ciencias del Comportamiento
3. DescripciÃ³n (mÃ¡x 150 palabras)
4. Advertencia de interpretaciÃ³n (texto completo, prominente en la ficha)
5. Capturas: evaluaciÃ³n con \`bias_flags\`, pantalla de estadÃ­sticas de sesgos
6. Instrucciones de instalaciÃ³n
7. QuÃ© feedback busco: Â¿heurÃ­sticas de sesgo que fallan? Â¿escenarios donde la detecciÃ³n es incorrecta?
8. Pregunta para la comunidad: ej. "Â¿QuÃ© sesgos cognitivos habÃ©is observado en las respuestas de LLMs que considerÃ¡is que Psique Lab deberÃ­a detectar en la v2?"`}
          </PromptBlock>
        </Step>

        {/* Resultado esperado */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(124,58,237,0.04)", borderColor: "rgba(124,58,237,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} style={{ color: "#7C3AED" }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#7C3AED" }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1â€“6 + Fase 7), tendrÃ¡s un <strong>ejecutable de Psique Lab</strong> que evalÃºa el razonamiento social de cualquier LLM disponible por API: introduce un escenario de TeorÃ­a de la Mente o SocialIQa, obtÃ©n la respuesta razonada del modelo con anÃ¡lisis heurÃ­stico de sesgos cognitivos detectados, y compara el rendimiento entre modelos con historial estadÃ­stico de sesgos en DuckDB. La advertencia de interpretaciÃ³n estÃ¡ presente en todas las pantallas de forma indesactivable.
          </p>
          <div className="flex flex-wrap gap-3 justify-start mt-6">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "#7C3AED", color: "white" }}>
              Publicar en la Comunidad <ChevronRight size={14} />
            </Link>
            <Link to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}>
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* Version extensions */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

