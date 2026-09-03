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
import { HeartPulse } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { ShieldAlert } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio Medicina (data_medical/rankings/) Â· MedQA Â· PubMedQA Â· MedMCQA Â· ClinicalBench", motivo: "Verificar quÃ© modelos tienen scores reales en benchmarks mÃ©dicos antes de elegir el motor de Mente MÃ©dica." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n estructurado", motivo: "Definir explÃ­citamente quiÃ©n usa la app, quÃ© nivel de responsabilidad clÃ­nica implica y quÃ© lÃ­mites son no negociables en v1." },
  { capa: "2", subcapa: "2.1", herramienta: "Hugging Face Datasets (medalpaca/medical_meadow_medqa) [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Fuente pÃºblica de preguntas MedQA-USMLE para testing sin dependencia de APIs externas." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas estrictos para ClinicalQuery, ClinicalResponse y EvaluationResult con validadores especÃ­ficos del dominio mÃ©dico." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators Â· regex", motivo: "Detectar respuestas vacÃ­as, verificar formato de opciÃ³n mÃºltiple y marcar posibles referencias inventadas." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial auditable de evaluaciones clÃ­nicas con estadÃ­sticas de accuracy y distribuciÃ³n de badges de riesgo por modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual (10 preguntas)", motivo: "Dataset mÃ­nimo de preguntas MedQA-USMLE para desarrollo completamente offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_medical/rankings/ Â· MedQA leaderboard", motivo: "Seleccionar el modelo con mayor score real en benchmarks mÃ©dicos, no por popularidad de marketing." },
  { capa: "3", subcapa: "3.2", herramienta: "Prompt engineering (Chain of Thought clÃ­nico)", motivo: "El modelo debe razonar paso a paso y declarar su confianza; sin este prompt estructurado, la detecciÃ³n de alucinaciones no es posible." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx Â· openai SDK [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Llamada async con temperatura baja (0.1â€“0.2) para reducir variabilidad en respuestas clÃ­nicas." },
  { capa: "3", subcapa: "3.4", herramienta: "json.loads Â· Pydantic", motivo: "Extraer JSON estructurado (reasoning, answer, confidence, sources_cited) del texto del modelo." },
  { capa: "3", subcapa: "3.5", herramienta: "ComparaciÃ³n con respuesta correcta MedQA", motivo: "Detectar si el modelo eligiÃ³ la opciÃ³n incorrecta; base principal para el badge de riesgo." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except Â· mensaje estÃ¡tico", motivo: "En el dominio mÃ©dico, el fallback debe ser explÃ­cito: badge ALTO automÃ¡tico y banner no descartable." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir las 2 pantallas (EvaluaciÃ³n + Historial) antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Manejo nativo de texto largo (razonamiento clÃ­nico), badges de color y advertencia legal siempre visible sin stylesheets externos." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "Pipeline completo con pipeline de auditorÃ­a especÃ­fico para el dominio mÃ©dico." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de parseo, detecciÃ³n de alucinaciones y test de integraciÃ³n completo con mock de la API." },
  { capa: "6", subcapa: "6.3", herramienta: "Preguntas MedQA reales", motivo: "ValidaciÃ³n manual con 7 escenarios especÃ­ficos del dominio mÃ©dico." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller Â· flet build [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]", motivo: "Ejecutable distribuible; Flet puede tener su propio sistema de empaquetado." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio para verificar comportamiento sin dependencias instaladas." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar Mente MÃ©dica y recibir feedback clÃ­nico y tÃ©cnico de la comunidad." },
];

// â”€â”€â”€ Phases overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "InvestigaciÃ³n",         summary: "Benchmarks mÃ©dicos (MedQA, PubMedQA, MedMCQA, Do-No-Harm) y selecciÃ³n del modelo clÃ­nico mÃ¡s fiable del laboratorio." },
  { id: "1", label: "Capa 1", name: "DefiniciÃ³n",             summary: "Perfil de usuario clÃ­nico, problema concreto, inputs/outputs, criterios de Ã©xito con salvaguardas mÃ©dicas y lÃ­mites explÃ­citos de v1." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "Fuente de preguntas MedQA, Pydantic (ClinicalQuery, ClinicalResponse, EvaluationResult), validaciÃ³n de formato, DuckDB auditable y 10 preguntas de ejemplo." },
  { id: "3", label: "Capa 3", name: "LÃ³gica / IA",            summary: "SelecciÃ³n del modelo, prompt clÃ­nico con CoT y declaraciÃ³n de confianza, llamada async, parseo de respuesta estructurada, detecciÃ³n de alucinaciones y fallback seguro." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "2 pantallas: EvaluaciÃ³n (badge BAJO/MEDIO/ALTO prominente, reasoning scrollable, flags de alucinaciÃ³n) e Historial con filtros. Advertencia legal permanente." },
  { id: "5", label: "Capa 5", name: "IntegraciÃ³n",            summary: "Pipeline completo con gestiÃ³n de errores conservadora (dominio mÃ©dico), log de auditorÃ­a sin texto de preguntas y configuraciÃ³n de umbrales de riesgo." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "Tests de validaciÃ³n clÃ­nica, test de integraciÃ³n del pipeline con mock, prueba manual con 7 escenarios mÃ©dicos especÃ­ficos y PyInstaller/flet build." },
  { id: "7", label: "Fase 7", name: "IteraciÃ³n",              summary: "Publicar Mente MÃ©dica en el Foro de Proyectos con descargo mÃ©dico obligatorio y planificar v2 con evaluaciÃ³n batch y comparativa de modelos." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· EvaluaciÃ³n batch",
    area: "Rendimiento a escala",
    title: "Mente MÃ©dica Batch â€” Benchmarking automÃ¡tico de conjuntos MedQA",
    desc: "Ejecuta la evaluaciÃ³n completa sobre un conjunto de 50â€“200 preguntas MedQA de forma automÃ¡tica, generando estadÃ­sticas de accuracy, distribuciÃ³n de badges y anÃ¡lisis de errores frecuentes sin intervenciÃ³n del usuario pregunta a pregunta.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: nueva acciÃ³n 'Benchmark completo'; el usuario selecciona el subconjunto de MedQA y el modelo",
      "Capa 3: evaluate_batch(): asyncio.gather con semÃ¡foro para no saturar la API (mÃ¡x 5 llamadas simultÃ¡neas)",
      "Capa 3: estimaciÃ³n de coste en tokens antes de ejecutar el benchmark",
      "Capa 4: pantalla de progreso con barra y estimaciÃ³n de tiempo restante",
      "Capa 4: informe de resultados batch: accuracy total, distribuciÃ³n de badges, los 5 peores errores",
      "Capa 5: store_batch_evaluation() que guarda todas las evaluaciones como una sesiÃ³n Ãºnica en DuckDB",
    ],
  },
  {
    tag: "v3 Â· Arena de modelos",
    area: "Comparativa clÃ­nica",
    title: "Mente MÃ©dica Arena â€” 3 modelos side-by-side en preguntas clÃ­nicas",
    desc: "EnvÃ­a la misma pregunta clÃ­nica a 3 modelos en paralelo, muestra los tres razonamientos y badges en columnas, y declara automÃ¡ticamente el modelo mÃ¡s fiable basÃ¡ndose en is_correct y confidence declarada.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: el usuario configura 3 API keys o selecciona 3 modelos del mismo proveedor",
      "Capa 3: evaluate_parallel(): asyncio.gather con 3 llamadas; fallo individual no cancela las otras dos",
      "Capa 3: rank_clinical_responses(): ordena por is_correct â†’ confidence â†’ absence of hallucination flags",
      "Capa 4: pantalla Arena con 3 columnas de reasoning + badge; ganador destacado en verde",
      "Capa 5: el pipeline paralelo guarda las 3 evaluaciones como unidad en DuckDB con session_id comÃºn",
      "Capa 6: test de integraciÃ³n paralela con 3 mocks independientes",
    ],
  },
  {
    tag: "v4 Â· VerificaciÃ³n PubMed",
    area: "Anti-alucinaciÃ³n avanzada",
    title: "Mente MÃ©dica Verify â€” Contraste de citas clÃ­nicas con PubMed",
    desc: "Extiende la detecciÃ³n de alucinaciones consultando la API de PubMed para verificar automÃ¡ticamente si los estudios y fÃ¡rmacos citados por el modelo en su reasoning existen realmente, con enlace directo al artÃ­culo cuando se encuentra.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 3: verify_pubmed_citations(): extrae referencias del reasoning y consulta la API de Entrez/PubMed [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]",
      "Capa 3: los flags de alucinaciÃ³n incluyen ahora 'CITA NO ENCONTRADA EN PUBMED' vs 'CITA VERIFICADA'",
      "Capa 4: los flags verificados muestran enlace clickable a PubMed cuando la cita existe",
      "Capa 4: badge ALTO se asigna automÃ¡ticamente si alguna cita no se encuentra en PubMed",
      "Capa 5: la verificaciÃ³n PubMed es asÃ­ncrona y no bloquea la evaluaciÃ³n principal",
      "Advertencia: la verificaciÃ³n PubMed aÃ±ade latencia de 2â€“5s por cita; informar al usuario",
    ],
  },
];

// â”€â”€â”€ Medical disclaimer banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MedicalDisclaimerBanner() {
  return (
    <div className="mb-8 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(220,38,38,0.22)" }}>
      <div className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(220,38,38,0.07)" }}>
        <ShieldAlert size={15} style={{ color: C.red }} className="shrink-0" />
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.red }}>
          Aviso de dominio clÃ­nico â€” Lectura obligatoria
        </span>
      </div>
      <div className="px-5 py-4" style={{ background: "rgba(220,38,38,0.03)" }}>
        <ul className="space-y-2 text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.70)" }}>
          <li className="flex items-start gap-2">
            <span style={{ color: C.red }} className="shrink-0 font-bold">â†’</span>
            <span><strong>Mente MÃ©dica no es un dispositivo mÃ©dico.</strong> Sus resultados no deben usarse para diagnÃ³stico clÃ­nico, tratamiento ni decisiones sobre pacientes reales.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.red }} className="shrink-0 font-bold">â†’</span>
            <span>La detecciÃ³n de alucinaciones es <strong>automÃ¡tica y heurÃ­stica</strong>: marca posibles problemas, no los confirma. Siempre requiere revisiÃ³n humana cualificada.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.red }} className="shrink-0 font-bold">â†’</span>
            <span>Un badge BAJO no significa que la respuesta del LLM sea clÃ­nicamente correcta. Significa que el modelo acertÃ³ en un benchmark de tipo test. <strong>Son cosas distintas.</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: C.red }} className="shrink-0 font-bold">â†’</span>
            <span>La app estÃ¡ diseÃ±ada para <strong>investigaciÃ³n y evaluaciÃ³n de modelos</strong>, no para uso clÃ­nico. La advertencia debe ser visible en todas las pantallas del ejecutable.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaMedicina() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(220,38,38,0.08)", color: C.red }}>
            Medicina & IA ClÃ­nica Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Mente MÃ©dica
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que evalÃºa la precisiÃ³n clÃ­nica de respuestas LLM: el usuario introduce una pregunta estilo MedQA, el modelo responde con razonamiento paso a paso, y la app muestra al instante un badge de riesgo (BAJO / MEDIO / ALTO) con detecciÃ³n automÃ¡tica de posibles alucinaciones mÃ©dicas.
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

        {/* Medical disclaimer */}
        <MedicalDisclaimerBanner />

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
                      <td className="px-4 py-2.5 font-medium" style={{ color: C.red, whiteSpace: "nowrap" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", whiteSpace: "nowrap" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", maxWidth: 320 }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(17,17,17,0.06)", background: "rgba(220,38,38,0.03)" }}>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>
                  <strong>Â¿Por quÃ© Flet y no PyQt o Tkinter?</strong> El manejo de texto largo (preguntas clÃ­nicas, razonamientos detallados) y los badges de color (riesgo ALTO/MEDIO/BAJO) son mÃ¡s fÃ¡ciles de implementar en Flet con su sistema de componentes Material, sin necesidad de stylesheets externos.
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
          desc="Confirmar quÃ© benchmarks mÃ©dicos son los estÃ¡ndar para evaluar LLMs en diagnÃ³stico clÃ­nico, y quÃ© modelo tiene el score mÃ¡s alto verificado antes de tomar ninguna decisiÃ³n de implementaciÃ³n."
        />

        <Step 
          num="0.A" 
          title="Benchmarks mÃ©dicos clave" 
          goal="Identificar MedQA-USMLE, PubMedQA, MedMCQA y Do-No-Harm; quÃ© miden exactamente; modelo lÃ­der en el ranking del laboratorio de Medicina; diferencia de performance en seguridad clÃ­nica entre los Top-5."
        >
          <PromptBlock label="Prompt 0.A â€” Benchmarks mÃ©dicos clave">
{`ActÃºa como experto en evaluaciÃ³n de LLMs para aplicaciones mÃ©dicas.
Tengo acceso al Laboratorio de Medicina de Horizon (carpeta \`data_medical/rankings/\`).

Necesito que me respondas:
1. Â¿CuÃ¡les son los 3-5 benchmarks mÃ¡s citados para evaluar LLMs en tareas de diagnÃ³stico clÃ­nico y preguntas mÃ©dicas? (ej. MedQA-USMLE, PubMedQA, MedMCQA)
2. Â¿QuÃ© miden exactamente esos benchmarks? (tipo de pregunta, formato, mÃ©trica)
3. Â¿CuÃ¡l es el modelo con mejor score en MedQA segÃºn el archivo \`data_medical/rankings/latest_rankings_medical.json\`?
4. Â¿Hay diferencia significativa entre modelos en el Ã¡rea Do-No-Harm? Â¿QuÃ© modelos tienen mejor puntuaciÃ³n en seguridad clÃ­nica?

No inventes datos. Si no tienes acceso al archivo, usa datos reales publicados en los papers de MedQA y PubMedQA.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Elegir modelo para Mente MÃ©dica" 
          goal="Seleccionar el modelo del ranking con score verificable en MedQA, buena puntuaciÃ³n en Do-No-Harm y API accesible desde Python. Justificar en base a scores reales, no a marketing."
        >
          <PromptBlock label="Prompt 0.B â€” SelecciÃ³n del modelo clÃ­nico">
{`BasÃ¡ndome en el ranking del laboratorio de Medicina de Horizon, necesito elegir el LLM que usarÃ© como motor de Mente MÃ©dica.

Consideraciones especÃ­ficas para el dominio mÃ©dico:
- El modelo debe tener score > [UMBRAL QUE DEFINES TÃš] en MedQA
- Preferiblemente con buenos resultados en Do-No-Harm (no fabricar diagnÃ³sticos)
- Con API accesible desde Python

Analiza los modelos del Top-5 en \`data_medical/rankings/\` y recomiÃ©ndame uno justificando en base a sus scores reales, no a su popularidad.
Â¿Tiene modo "conservative" o parÃ¡metro de temperatura configurable? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL del modelo elegido]`}
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
          desc="QuiÃ©n usa Mente MÃ©dica, quÃ© problema clÃ­nico-tÃ©cnico resuelve, quÃ© datos entran, quÃ© outputs produce, criterios de Ã©xito con salvaguardas mÃ©dicas y lÃ­mites no negociables de v1."
        />

        <Step 
          num="1.1" 
          title="Â¿QuiÃ©n usa esta app?" 
          goal="Ficha de usuario con rol clÃ­nico o investigador, quÃ© hace sin la app (proceso manual), riesgos de usar un LLM sin evaluaciÃ³n en su contexto, nivel tÃ©cnico y frecuencia de uso esperada."
        >
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario clÃ­nico">
{`Necesito definir el perfil de usuario de Mente MÃ©dica antes de escribir cÃ³digo.

Mi app evalÃºa la precisiÃ³n clÃ­nica de respuestas LLM y detecta alucinaciones mÃ©dicas.

[DESCRIBE AQUÃ TU USUARIO OBJETIVO: ej. "mÃ©dico residente que quiere saber si puede fiarse de las respuestas de ChatGPT para preguntas de diagnÃ³stico diferencial" o "investigador que compara modelos en tareas clÃ­nicas"]

Genera una ficha de usuario con:
- Nombre ficticio y rol clÃ­nico/investigador
- QuÃ© hace actualmente sin la app (proceso manual)
- QuÃ© riesgos tiene usar un LLM sin evaluaciÃ³n previa en su contexto
- Nivel tÃ©cnico (Â¿conoce benchmarks de IA? Â¿usa Python?)
- Frecuencia de uso esperada
- Una cita en primera persona describiendo su frustraciÃ³n actual

SÃ© especÃ­fico. El dominio mÃ©dico tiene implicaciones de seguridad; inclÃºyelas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="Â¿QuÃ© problema concreto resuelve?" 
          goal="Una sola frase del problema en formato [ROL] no puede [TAREA] con un LLM porque [RIESGO REAL], lo que provoca [CONSECUENCIA]. 3 variantes; aclarar que la app evalÃºa LLMs, no proporciona diagnÃ³sticos."
        >
          <PromptBlock label="Prompt 1.2 â€” Frase del problema">
{`BasÃ¡ndome en el perfil de usuario ([PEGA EL RESUMEN DEL PERFIL]), escribe UNA SOLA FRASE que defina el problema que Mente MÃ©dica resuelve.

Formato obligatorio:
"[ROL CLÃNICO] no puede [TAREA CLÃNICA CONCRETA] con un LLM porque [RIESGO REAL], lo que provoca [CONSECUENCIA MEDIBLE EN EL CONTEXTO MÃ‰DICO]."

Genera 3 variantes. Para cada una, indica si el problema se puede resolver COMPLETAMENTE con una app de escritorio o solo parcialmente (y por quÃ©).

Nota: la app no proporciona diagnÃ³sticos mÃ©dicos. Ayuda a EVALUAR si un LLM da respuestas fiables en preguntas de tipo benchmark. AsegÃºrate de que la frase refleje esto sin sobreprometer.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="Â¿QuÃ© datos entran?" 
          goal="Lista completa: pregunta clÃ­nica libre o cargada de MedQA, modelo elegido, respuesta correcta opcional, umbral de confianza configurable. Nombre, tipo, obligatorio/opcional, valor por defecto, validaciÃ³n."
        >
          <PromptBlock label="Prompt 1.3 â€” Inputs de la app">
{`Para Mente MÃ©dica, define todos los datos que entran a la app.

El usuario puede:
- Escribir una pregunta clÃ­nica libre (texto)
- O seleccionar una pregunta del dataset MedQA cargado localmente
- Elegir el modelo a evaluar: [LISTA LOS MODELOS DISPONIBLES]
- Indicar si conoce la respuesta correcta (para calcular si el LLM acertÃ³)
- Configurar el umbral de confianza aceptable (ej. rechazar respuestas con confidence < 0.7)

Genera la lista completa de inputs con:
- Nombre del campo
- Tipo de dato
- Obligatorio u opcional
- Valor por defecto
- ValidaciÃ³n necesaria (ej. la pregunta no puede tener menos de 10 palabras)

Incluye tambiÃ©n los datos que la app carga automÃ¡ticamente sin intervenciÃ³n del usuario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="Â¿QuÃ© sale?" 
          goal="Outputs por evaluaciÃ³n: respuesta del LLM, score de confianza declarado (0â€“1), is_correct (SÃ­/No/None), badge de riesgo BAJO/MEDIO/ALTO, flags de posibles alucinaciones, nota de advertencia en badges MEDIO y ALTO."
        >
          <PromptBlock label="Prompt 1.4 â€” Outputs de la evaluaciÃ³n">
{`BasÃ¡ndome en los inputs del paso anterior, define todos los outputs de Mente MÃ©dica.

La app debe producir para cada evaluaciÃ³n:
1. La respuesta del LLM a la pregunta clÃ­nica
2. El score de confianza que el modelo declara (entre 0 y 1)
3. Si se conoce la respuesta correcta: Â¿acertÃ³ el modelo? (SÃ­/No/Parcial)
4. Un badge de riesgo: BAJO (confianza alta + correcto) / MEDIO / ALTO (baja confianza o incorrecto)
5. Las posibles alucinaciones detectadas (tÃ©rminos mÃ©dicos inventados, referencias a estudios inexistentes)
6. Una nota de advertencia si el badge es ALTO o MEDIO

Para cada output especifica: formato (texto, nÃºmero, color, icono), cuÃ¡ndo se genera, si se guarda en DuckDB para el historial.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de Ã©xito" 
          goal="7â€“9 criterios verificables en menos de 5 minutos, incluyendo obligatoriamente: comportamiento con respuesta incorrecta, con confidence bajo, advertencia visible de 'no es dispositivo mÃ©dico' y que no se puede guardar sin leer la advertencia."
        >
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`Define los criterios de Ã©xito de Mente MÃ©dica v1.

AdemÃ¡s de los criterios de funcionamiento tÃ©cnico, necesito criterios de seguridad especÃ­ficos para el dominio mÃ©dico.

Genera 7-9 criterios en formato:
"La app funciona correctamente cuando [CONDICIÃ“N VERIFICABLE]."

Incluye obligatoriamente criterios para:
- Tiempo de respuesta de la evaluaciÃ³n
- Comportamiento cuando el modelo da una respuesta incorrecta en MedQA
- Comportamiento cuando el score de confianza es bajo (< umbral configurado)
- Advertencia visible de que la app NO es un dispositivo mÃ©dico
- Que el usuario no puede guardar una evaluaciÃ³n sin haber leÃ­do la advertencia

No uses criterios vagos. Cada criterio debe poder verificarse en menos de 5 minutos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="LÃ­mites explÃ­citos de la v1" 
          goal="DeclaraciÃ³n formal de quÃ© NO hace Mente MÃ©dica v1: sin diagnÃ³stico directo, sin conexiÃ³n a registros mÃ©dicos reales, sin anÃ¡lisis de imÃ¡genes. RevisiÃ³n de implicaciones regulatorias (CE, FDA, HIPAA) para features futuras."
        >
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites de la v1">
{`Para Mente MÃ©dica v1, necesito definir lÃ­mites explÃ­citos, especialmente en lo que respecta a responsabilidad clÃ­nica.

Ideas que tengo para features pero que pueden ser peligrosas o demasiado complejas:
[DESCRIBE TUS IDEAS: ej. "conectar con registros mÃ©dicos reales", "dar diagnÃ³sticos directamente al paciente", "integrar con WhatsApp del mÃ©dico", "evaluar imÃ¡genes mÃ©dicas (radiografÃ­as)"]

Para cada idea:
1. Â¿Implica responsabilidad clÃ­nica directa? (SÃ­/No)
2. Â¿Requiere regulaciÃ³n especÃ­fica (CE, FDA, HIPAA)? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
3. Â¿Puede ir en v1 de forma segura? (SÃ­/No/Solo con ciertas salvaguardas)

Genera la declaraciÃ³n de lÃ­mites de la v1 incluyendo:
- Una advertencia legal estÃ¡ndar (no soy abogado; el usuario debe revisarla)
- Lista explÃ­cita de lo que la app NO hace
- Lista de lo que SÃ hace de forma segura`}
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
          desc="Fuente de preguntas MedQA, modelos Pydantic con validadores clÃ­nicos, validaciÃ³n de respuestas de LLM, DuckDB auditable y 10 preguntas de ejemplo para desarrollo offline."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="Decidir entre dataset MedQA local (data_medical/raw/), Hugging Face Hub o combinaciÃ³n con preguntas manuales. CÃ³digo Python que carga la fuente como lista de ClinicalQuery usando pathlib, sin rutas hardcodeadas."
        >
          <PromptBlock label="Prompt 2.1 â€” Fuente de datos MedQA">
{`Para Mente MÃ©dica, necesito decidir la fuente de datos de preguntas clÃ­nicas.

Opciones disponibles:
A) Dataset MedQA local: preguntas descargadas en \`data_medical/raw/\` por el motor Horizon
B) Hugging Face Hub: dataset pÃºblico de MedQA en espaÃ±ol o inglÃ©s [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL de Hugging Face Datasets la disponibilidad]
C) Preguntas introducidas manualmente por el usuario (sin respuesta correcta conocida)
D) CombinaciÃ³n de A/B para evaluaciÃ³n + C para uso libre

Mi caso de uso: [DESCRIBE SI NECESITAS PREGUNTAS CON RESPUESTA CORRECTA CONOCIDA O SOLO EVALUACIÃ“N DE CONFIANZA SIN GROUND TRUTH]

Genera la comparativa de opciones y el cÃ³digo Python que carga la fuente elegida como una lista de objetos \`ClinicalQuery\`. Usa \`pathlib\`, no rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="ClinicalQuery (question_text, options, correct_answer, source_benchmark, specialty), ClinicalResponse (model_name, response_text, declared_confidence, is_correct, evaluated_at) y EvaluationResult (risk_badge, hallucination_flags, reviewer_notes). Pydantic v2 con validadores."
        >
          <PromptBlock label="Prompt 2.2 â€” Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Mente MÃ©dica.

BasÃ¡ndome en el formato de preguntas MedQA ([PEGA AQUÃ UN EJEMPLO DE PREGUNTA REAL DEL DATASET]) y en los outputs definidos en el paso 1.4, necesito:

1. \`ClinicalQuery\`:
   - \`question_text\`: str (min 10 chars)
   - \`options\`: list[str] (si es tipo test; puede ser vacÃ­a si es pregunta abierta)
   - \`correct_answer\`: Optional[str] (puede ser None si el usuario no la conoce)
   - \`source_benchmark\`: str (ej. "MedQA", "PubMedQA", "manual")
   - \`specialty\`: Optional[str] (ej. "cardiologÃ­a", "neurologÃ­a")

2. \`ClinicalResponse\`:
   - \`query_id\`: str
   - \`model_name\`: str
   - \`response_text\`: str
   - \`declared_confidence\`: float (0.0-1.0)
   - \`is_correct\`: Optional[bool] (None si no hay respuesta correcta)
   - \`evaluated_at\`: datetime

3. \`EvaluationResult\`:
   - \`response\`: ClinicalResponse
   - \`risk_badge\`: Literal["BAJO", "MEDIO", "ALTO"]
   - \`hallucination_flags\`: list[str]
   - \`reviewer_notes\`: Optional[str]

Usa Pydantic v2. Incluye validadores para cada restricciÃ³n. Docstrings en cada modelo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ValidaciÃ³n y normalizaciÃ³n" 
          goal="validate_clinical_response(): respuesta no vacÃ­a, opciÃ³n indicada claramente en tipo test, frases de evasiÃ³n detectadas, referencias a fÃ¡rmacos o estudios con nombres inverosÃ­miles marcados como posibles alucinaciones (no como certeza)."
        >
          <PromptBlock label="Prompt 2.3 â€” ValidaciÃ³n de respuestas clÃ­nicas">
{`Tengo los modelos Pydantic del paso anterior. Ahora necesito una funciÃ³n de validaciÃ³n especÃ­fica para respuestas clÃ­nicas.

Escribe \`validate_clinical_response(response_text: str, query: ClinicalQuery) -> tuple[bool, list[str]]\` que:

1. Verifica que la respuesta no estÃ¡ vacÃ­a o es solo espacios en blanco
2. Si la query tiene opciones (tipo test), verifica que la respuesta indica claramente una opciÃ³n (A, B, C, D o el texto de la opciÃ³n)
3. Detecta si la respuesta contiene frases de incertidumbre excesiva ("no lo sÃ©", "podrÃ­a ser cualquier cosa", "consulte a su mÃ©dico" sin mÃ¡s explicaciÃ³n) que indican que el modelo evitÃ³ responder
4. Detecta referencias a estudios o fÃ¡rmacos con nombres claramente inventados (heurÃ­sticas bÃ¡sicas: nombres que no siguen patrones reales) â€” marca como posible alucinaciÃ³n, NO como certeza
5. Devuelve \`(True, [])\` si pasa o \`(False, ["motivo1"...])\` si hay problemas

Importante: esta funciÃ³n detecta POSIBLES alucinaciones, no las confirma. El badge de riesgo se calcula despuÃ©s, no aquÃ­.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_medical_db(), store_evaluation() idempotente, get_evaluation_history() con filtros por modelo y badge, get_model_stats() con accuracy, distribuciÃ³n de badges y confianza promedio declarada. Manejo de excepciones."
        >
          <PromptBlock label="Prompt 2.4 â€” DuckDB clÃ­nico">
{`Crea la capa de persistencia de Mente MÃ©dica con DuckDB.

Necesito:
1. \`init_medical_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`clinical_queries\`, \`clinical_responses\`, \`evaluation_results\`
   - Ãndices por \`model_name\`, \`evaluated_at\`, \`risk_badge\`

2. \`store_evaluation(conn, result: EvaluationResult) -> str\`:
   - Guarda query + response + evaluation_result como una unidad
   - Devuelve el ID del registro guardado
   - Idempotente: no duplica si ya existe (misma query_id + model_name + evaluated_at)

3. \`get_evaluation_history(conn, model_name: Optional[str] = None, risk_badge: Optional[str] = None, limit: int = 50) -> list[dict]\`:
   - Devuelve evaluaciones filtradas por modelo y/o badge de riesgo
   - Ordenadas por fecha descendente

4. \`get_model_stats(conn, model_name: str) -> dict\`:
   - Porcentaje de respuestas correctas, distribuciÃ³n de badges de riesgo, confianza promedio declarada

Maneja excepciones de DuckDB. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="10 preguntas MedQA-USMLE (dominio pÃºblico o inventadas) con question_text, 4 opciones Aâ€“D, correct_answer y specialty. Al menos 3 especialidades, 2 preguntas donde una opciÃ³n plausible podrÃ­a confundir al LLM. test_only: true."
        >
          <PromptBlock label="Prompt 2.5 â€” Dataset de ejemplo">
{`Necesito un dataset mÃ­nimo de 10 preguntas clÃ­nicas para desarrollar Mente MÃ©dica sin depender de APIs ni de descargas externas.

Genera un archivo JSON \`sample_medical_queries.json\` con:
- 10 preguntas tipo MedQA-USMLE (en espaÃ±ol o inglÃ©s, segÃºn tu preferencia)
- Para cada pregunta: \`question_text\`, 4 \`options\` (A-D), \`correct_answer\`, \`specialty\`
- Cubrir al menos 3 especialidades diferentes
- Incluir al menos 2 preguntas donde una respuesta plausible pero incorrecta podrÃ­a confundir a un LLM (para probar la detecciÃ³n de alucinaciones)

Las preguntas deben ser de dominio pÃºblico (tipo USMLE Step 1/2) o completamente inventadas para propÃ³sito de prueba. NO uses preguntas de exÃ¡menes con copyright.
Indica claramente en el JSON que estos datos son solo para prueba (\`"test_only": true\`).

Incluye el cÃ³digo Python para cargar y validar este archivo con los modelos Pydantic.`}
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
          desc="SelecciÃ³n del modelo clÃ­nico, prompt con Chain of Thought y declaraciÃ³n de confianza, llamada async con temperatura baja, parseo de respuesta estructurada, detecciÃ³n de alucinaciones y fallback seguro con badge ALTO automÃ¡tico."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Confirmar: API pÃºblica del modelo lÃ­der en MedQA, modo conservative si existe, score exacto en MedQA-USMLE del ranking, benchmark donde falla mÃ¡s (Do-No-Harm, PubMedQA) y alternativa open-source sin coste."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`SegÃºn \`data_medical/rankings/latest_rankings_medical.json\`, el modelo con mayor score en MedQA es [ESCRIBE EL MODELO QUE ENCONTRASTE EN EL LABORATORIO].

Para Mente MÃ©dica, este modelo responderÃ¡ preguntas clÃ­nicas y auto-evaluarÃ¡ su confianza.

Necesito confirmar:
1. Â¿Tiene API pÃºblica? Endpoint y mÃ©todo de autenticaciÃ³n [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
2. Â¿Tiene algÃºn modo "medical" o "careful" que reduzca alucinaciones? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
3. Â¿CuÃ¡l es el score exacto en MedQA-USMLE segÃºn el ranking? (cita el nÃºmero)
4. Â¿En quÃ© benchmark falla mÃ¡s este modelo? (Â¿Do-No-Harm? Â¿PubMedQA?)
5. Alternativa open-source sin coste: Â¿quÃ© modelo mÃ©dico afinado estÃ¡ disponible en Hugging Face o Ollama? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]

Decide y justifica en 3 lÃ­neas. La decisiÃ³n debe basarse en scores verificables, no en marketing del proveedor.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="DiseÃ±o del prompt central" 
          goal="System prompt + plantilla de user prompt con {{PREGUNTA}} y {{OPCIONES_SI_EXISTEN}}: razonamiento paso a paso, indicar opciÃ³n elegida en tipo test, confidence 0â€“1, citar fuente clÃ­nica, no fabricar estudios ni estadÃ­sticas. Respuesta en JSON."
        >
          <PromptBlock label="Prompt 3.2 â€” Prompt clÃ­nico central">
{`DiseÃ±a el prompt maestro que Mente MÃ©dica enviarÃ¡ al LLM [MODELO ELEGIDO] para evaluar su respuesta a preguntas clÃ­nicas.

El prompt debe:
1. Instruir al modelo a responder la pregunta clÃ­nica razonando paso a paso (Chain of Thought)
2. Si es tipo test (opciones A-D): indicar explÃ­citamente la opciÃ³n elegida
3. Declarar una puntuaciÃ³n de confianza entre 0.0 y 1.0 (donde indica su propia certeza, no la correcciÃ³n)
4. Citar la fuente o razonamiento clÃ­nico en que basa su respuesta
5. Si no sabe o tiene muy baja confianza (< 0.3): decir "No tengo suficiente informaciÃ³n para responder con fiabilidad" en lugar de inventar

Formato de respuesta obligatorio: JSON con campos \`reasoning\` (str), \`answer\` (str), \`confidence\` (float), \`sources_cited\` (list[str]).

Genera el system prompt y la plantilla del user prompt con marcador \`{{PREGUNTA}}\` y \`{{OPCIONES_SI_EXISTEN}}\`.
Incluye la instrucciÃ³n explÃ­cita de no fabricar estudios, fÃ¡rmacos ni estadÃ­sticas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo" 
          goal="evaluate_clinical_query(): temperatura 0.1â€“0.2, retry con backoff (3 intentos, 2s/4s/8s), timeout 45s, API key desde MENTE_MEDICA_API_KEY. Log: model_name, longitud de query, tiempo de respuesta."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada async al modelo">
{`Implementa la funciÃ³n \`evaluate_clinical_query(query: ClinicalQuery, model_name: str) -> str\` que:

1. Construye el mensaje usando el prompt maestro del paso anterior
2. Hace la llamada a la API de [MODELO ELEGIDO]
   [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL los parÃ¡metros: temperatura recomendada para aplicaciones mÃ©dicas, max_tokens necesarios para respuesta + razonamiento]
3. Usa temperatura baja (0.1-0.2) para reducir variabilidad en respuestas clÃ­nicas [VERIFICAR el parÃ¡metro exacto en la documentaciÃ³n del modelo]
4. Retry con backoff (3 intentos, espera 2s/4s/8s)
5. Timeout de 45 segundos (las respuestas mÃ©dicas razonadas pueden ser largas)
6. Devuelve la respuesta raw como string

API key desde variable de entorno \`MENTE_MEDICA_API_KEY\`.
No hardcodees ningÃºn valor sensible.
Registra en el log: \`model_name\`, longitud de query, tiempo de respuesta.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo y estructuraciÃ³n de la respuesta" 
          goal="parse_clinical_response(): extraer bloque JSON, validar reasoning/answer/confidence/sources_cited, verificar que answer coincide con opciÃ³n en tipo test, construir ClinicalResponse con is_correct. ValueError descriptivo si falla."
        >
          <PromptBlock label="Prompt 3.4 â€” Parseo de respuesta clÃ­nica">
{`La funciÃ³n \`evaluate_clinical_query\` devuelve una string con el JSON de respuesta.
([PEGA AQUÃ UN EJEMPLO DE RESPUESTA REAL O SIMULADA])

Escribe \`parse_clinical_response(raw_response: str, query: ClinicalQuery, model_name: str) -> ClinicalResponse\` que:

1. Extrae el bloque JSON (puede haber texto antes/despuÃ©s)
2. Valida los campos: \`reasoning\` (no vacÃ­o), \`answer\` (no vacÃ­o), \`confidence\` (0.0-1.0), \`sources_cited\` (puede ser lista vacÃ­a)
3. Si la respuesta es tipo test: verifica que \`answer\` coincide con una de las opciones (A, B, C, D o el texto completo de la opciÃ³n)
4. Construye el objeto \`ClinicalResponse\` con \`is_correct=None\` si la query no tiene \`correct_answer\`, o True/False comparando answer con correct_answer
5. Si el parseo falla: lanza \`ValueError\` descriptivo indicando el campo problemÃ¡tico

No silencie errores. El error debe incluir el \`raw_response\` truncado para diagnÃ³stico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Control antialucinaciÃ³n" 
          goal="detect_hallucinations(): badge BAJO (correcto + confidence â‰¥ umbral), MEDIO (correcto pero confidence < umbral, o sin ground truth + confianza aceptable), ALTO (incorrecto, confidence < 0.3, o cualquier flag). Flags: estudios inventados, nomenclatura INN invÃ¡lida, estadÃ­sticas sin fuente, contradicciÃ³n interna."
        >
          <PromptBlock label="Prompt 3.5 â€” DetecciÃ³n de alucinaciones">
{`Implementa el sistema de detecciÃ³n de alucinaciones para Mente MÃ©dica.

Escribe \`detect_hallucinations(response: ClinicalResponse, query: ClinicalQuery) -> tuple[str, list[str]]\` que:

1. Calcula el \`risk_badge\`:
   - "BAJO": \`is_correct=True\` Y \`confidence >= [UMBRAL QUE DEFINES TÃš]\`
   - "MEDIO": \`is_correct=True\` pero \`confidence < umbral\`, O \`is_correct=None\` (sin ground truth) Y \`confidence >= umbral\`
   - "ALTO": \`is_correct=False\`, O \`confidence < 0.3\`, O cualquier flag de alucinaciÃ³n

2. Detecta flags de alucinaciÃ³n en el reasoning:
   a. Referencias a estudios con formato inventado (ej. "Study et al., 2087")
   b. Nombres de fÃ¡rmacos que no siguen nomenclatura INN estÃ¡ndar (heurÃ­stica simple)
   c. Porcentajes o estadÃ­sticas sin fuente citada en \`sources_cited\`
   d. ContradicciÃ³n lÃ³gica: \`answer=A\` pero reasoning argumenta claramente B

3. Devuelve \`(risk_badge, hallucination_flags)\`

Importante: los flags son POSIBLES alucinaciones detectadas automÃ¡ticamente, no confirmadas. La app debe mostrarlos con la etiqueta "Verificar manualmente".`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="evaluate_with_fallback(): si cualquier paso falla, ClinicalResponse con 'EVALUACIÃ“N NO DISPONIBLE', confidence=0.0 y badge ALTO automÃ¡tico. Banner rojo no descartable en UI. Devuelve (EvaluationResult, is_model_available)."
        >
          <PromptBlock label="Prompt 3.6 â€” Fallback seguro">
{`Mente MÃ©dica debe comportarse de forma segura cuando el LLM no estÃ¡ disponible.

Escribe \`evaluate_with_fallback(query: ClinicalQuery, model_name: str) -> tuple[EvaluationResult, bool]\` que:

1. Intenta la evaluaciÃ³n completa (llamada â†’ parseo â†’ detecciÃ³n de alucinaciones)
2. Si cualquier paso falla:
   - Crea un \`ClinicalResponse\` con \`response_text="[EVALUACIÃ“N NO DISPONIBLE - Error de conexiÃ³n con el modelo]"\`, \`declared_confidence=0.0\`, \`is_correct=None\`
   - Asigna \`risk_badge="ALTO"\` automÃ¡ticamente (por precauciÃ³n: sin evaluaciÃ³n, no se puede confiar en ningÃºn uso mÃ©dico)
   - AÃ±ade \`hallucination_flags=["EVALUACIÃ“N NO REALIZADA: modelo no disponible"]\`
3. Devuelve \`(evaluation_result, is_model_available)\`

Cuando \`is_model_available=False\`, la UI debe mostrar un banner rojo prominente:
"âš ï¸ EvaluaciÃ³n no disponible. No use respuestas de IA sin verificaciÃ³n mÃ©dica."
Este mensaje no puede ser descartado por el usuario hasta que se complete la evaluaciÃ³n.`}
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
          desc="2 pantallas: EvaluaciÃ³n con badge BAJO/MEDIO/ALTO prominente, reasoning scrollable y flags de alucinaciÃ³n colapsables; Historial con filtros. Advertencia legal siempre visible en pie de pantalla."
        />

        <Step 
          num="4.1" 
          title="Wireframe mÃ­nimo" 
          goal="DescripciÃ³n textual de las 2 pantallas + advertencia legal permanente. Pantalla Principal: Ã¡rea de texto, selector de modelo, botÃ³n Evaluar, panel de respuesta, badge de riesgo, flags. Pantalla Historial: tabla con filtros, botÃ³n Ver detalle."
        >
          <PromptBlock label="Prompt 4.1 â€” Wireframe de 2 pantallas">
{`Define el wireframe de Mente MÃ©dica con las siguientes funcionalidades:
- Introducir una pregunta clÃ­nica (libre o desde MedQA)
- Ver la respuesta del LLM con su badge de riesgo
- Ver el historial de evaluaciones anteriores

Genera la descripciÃ³n textual del wireframe de cada pantalla:

1. Pantalla Principal (EvaluaciÃ³n):
   - Ãrea de texto para la pregunta
   - Selector de modelo
   - BotÃ³n "Evaluar"
   - Panel de respuesta (aparece despuÃ©s de evaluar)
   - Badge de riesgo prominente (BAJO=verde, MEDIO=naranja, ALTO=rojo)
   - Lista de \`hallucination_flags\` si los hay

2. Pantalla Historial:
   - Tabla de evaluaciones pasadas (fecha, pregunta truncada, modelo, badge)
   - Filtros por modelo y badge
   - BotÃ³n "Ver detalle" para cada evaluaciÃ³n

3. Advertencia legal siempre visible (pie de pantalla):
   "Esta app NO es un dispositivo mÃ©dico. No uses sus resultados para diagnÃ³stico clÃ­nico."

Para cada elemento: nombre del componente Flet que se usarÃ¡.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET la disponibilidad de cada componente]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="ft.TextField multiline (â‰¥3 lÃ­neas, max 500 chars), botÃ³n 'Cargar pregunta de muestra' con diÃ¡logo, Dropdown de modelo, checkboxes para respuesta correcta conocida, botÃ³n 'Evaluar' y advertencia legal en pie en ft.Text gris."
        >
          <PromptBlock label="Prompt 4.2 â€” Formulario de entrada clÃ­nica">
{`Implementa el formulario de entrada de Mente MÃ©dica con Flet.

Escribe el cÃ³digo Python para:
1. Un \`ft.TextField\` multiline para introducir la pregunta clÃ­nica (mÃ­nimo 3 lÃ­neas visibles, mÃ¡x 500 caracteres con contador)
2. Si el usuario quiere cargar desde MedQA: un \`ft.ElevatedButton\` "Cargar pregunta de muestra" que abre un diÃ¡logo con la lista de \`sample_medical_queries.json\`
3. Un \`ft.Dropdown\` para seleccionar el modelo a evaluar
4. Checkboxes para indicar si se conoce la respuesta correcta y cuÃ¡l es
5. Un \`ft.ElevatedButton\` "Evaluar" que llama a \`on_evaluate_click\` (Capa 5)
6. La advertencia legal en \`ft.Text\` con color gris, siempre visible

El formulario debe estar en un \`ft.Column\` con scroll si el contenido es largo.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET las propiedades exactas de TextField multiline]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
          goal="ft.Container coloreado segÃºn badge (verde/naranja/rojo), reasoning scrollable, confidence como porcentaje, is_correct; flags en ExpansionTile colapsada por defecto con tÃ­tulo 'âš ï¸ Posibles alucinaciones (verificar manualmente)'; banner rojo no descartable si is_model_available=False."
        >
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados">
{`Implementa el Ã¡rea de resultados de Mente MÃ©dica con Flet.

Recibe un \`EvaluationResult\` y un bool (\`is_model_available\`).

Genera cÃ³digo Flet para:
1. Un \`ft.Container\` con fondo de color segÃºn \`risk_badge\`:
   - BAJO: fondo verde claro
   - MEDIO: fondo naranja claro
   - ALTO: fondo rojo claro
   Que muestre: badge en texto grande, confidence como porcentaje, is_correct

2. El \`reasoning\` del modelo en un \`ft.Text\` scrollable (puede ser largo)

3. Si \`hallucination_flags\` no estÃ¡ vacÃ­o: una \`ft.ExpansionTile\` colapsada por defecto con tÃ­tulo "âš ï¸ Posibles alucinaciones detectadas (verificar manualmente)" y la lista de flags dentro [VERIFICAR EN DOCUMENTACIÃ“N DE FLET si ExpansionTile existe o el equivalente]

4. Si \`is_model_available=False\`: un \`ft.Banner\` rojo con el mensaje de advertencia del paso 3.6 que NO puede cerrarse (sin botÃ³n de dismiss)

5. BotÃ³n "Guardar evaluaciÃ³n" que llama a la funciÃ³n de persistencia (Capa 5)

Todos los componentes reciben datos como parÃ¡metros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="5 estados como funciones reutilizables: inicial (sin evaluaciÃ³n), evaluando (ProgressRing + botÃ³n desactivado), error de validaciÃ³n (pregunta < 10 palabras), error de API (AlertDialog con reintentar/offline) y error de base de datos (exportar como texto plano)."
        >
          <PromptBlock label="Prompt 4.4 â€” Estados de error">
{`Define los estados excepcionales de la interfaz de Mente MÃ©dica.

Para cada estado, escribe el cÃ³digo Flet:

1. Estado inicial (sin evaluaciÃ³n): 
   Mostrar texto "Introduce una pregunta clÃ­nica para comenzar la evaluaciÃ³n." con un ejemplo de pregunta tipo MedQA

2. Evaluando (esperando respuesta):
   \`ft.ProgressRing\` + texto "Consultando modelo [NOMBRE]... Puede tardar hasta 45s"
   El botÃ³n "Evaluar" debe estar desactivado durante este tiempo

3. Error de validaciÃ³n (pregunta demasiado corta):
   \`ft.SnackBar\` con mensaje especÃ­fico "La pregunta debe tener al menos 10 palabras"

4. Error de API (timeout, key invÃ¡lida):
   \`ft.AlertDialog\` con:
   - TÃ­tulo: "Error de conexiÃ³n con el modelo"
   - DescripciÃ³n del error (tÃ©cnica, para que el usuario pueda reportarla)
   - BotÃ³n "Reintentar" y botÃ³n "Continuar sin IA (modo offline)"

5. Error de base de datos:
   \`ft.AlertDialog\` con "No se pudo guardar la evaluaciÃ³n" y opciÃ³n de exportar el resultado como texto plano

Cada estado debe ser una funciÃ³n reutilizable que recibe el mensaje como parÃ¡metro.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n bÃ¡sica" 
          goal="NavegaciÃ³n entre 2 pantallas (EvaluaciÃ³n + Historial), estado del formulario preservado al cambiar de pantalla, barra de estado con modelo activo y nÃºmero de evaluaciones guardadas. Verificar mÃ©todo recomendado en docs de Flet."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n entre pantallas">
{`Implementa la navegaciÃ³n de Mente MÃ©dica con Flet.

La app tiene 2 pantallas: EvaluaciÃ³n e Historial.

Usando el sistema de navegaciÃ³n de Flet [VERIFICAR EN DOCUMENTACIÃ“N DE FLET el mÃ©todo recomendado para la versiÃ³n actual]:

1. Una barra de navegaciÃ³n inferior o lateral con los iconos de las 2 pantallas
2. La pantalla Historial muestra la tabla de evaluaciones guardadas con posibilidad de hacer clic en una fila para ver el detalle completo (los mismos componentes del Ã¡rea de resultados, en modo solo lectura)
3. Al navegar a Historial: el estado del formulario de EvaluaciÃ³n se preserva
4. Barra de estado siempre visible: modelo activo, nÃºmero de evaluaciones guardadas

Escribe el esqueleto completo de la app con las dos pantallas y la navegaciÃ³n.`}
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
          desc="Pipeline completo on_evaluate_click, gestiÃ³n de errores conservadora por dominio mÃ©dico, log de auditorÃ­a sin texto de preguntas, configuraciÃ³n de umbrales de riesgo y API key."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_evaluate_click(): validar â‰¥10 palabras, mostrar 'Evaluandoâ€¦', construir ClinicalQuery, llamar a evaluate_with_fallback() async, actualizar UI con EvaluationResult, banner si is_model_available=False, activar 'Guardar'. Log: query truncada, model_name, badge, tiempo."
        >
          <PromptBlock label="Prompt 5.1 â€” on_evaluate_click()">
{`Implementa \`on_evaluate_click(e)\` para Mente MÃ©dica que:

1. Valida que el campo de pregunta no estÃ¡ vacÃ­o y tiene >= 10 palabras (muestra error del paso 4.4 si no)
2. Muestra el estado "Evaluando..." (paso 4.4)
3. Construye el objeto \`ClinicalQuery\` con los datos del formulario
4. Llama a \`evaluate_with_fallback(query, model_name)\` de forma asÃ­ncrona
5. Actualiza el Ã¡rea de resultados con el \`EvaluationResult\` obtenido
6. Si \`is_model_available=False\`, muestra el banner de advertencia
7. Activa el botÃ³n "Guardar evaluaciÃ³n"
8. Registra en el log: query truncada, \`model_name\`, \`risk_badge\`, tiempo de respuesta

Usa \`asyncio\` correctamente con Flet [VERIFICAR EN DOCUMENTACIÃ“N DE FLET].
No bloquees el hilo de UI.
Gestiona todos los errores posibles con los estados del paso 4.4.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="save_evaluation_pipeline(): store_evaluation() + actualizar estadÃ­sticas en memoria + fallback a ~/.mente_medica/pending/ si DuckDB falla. retry_pending_evaluations() al iniciar la app."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline de persistencia">
{`Escribe \`save_evaluation_pipeline(evaluation: EvaluationResult, conn: duckdb.DuckDBPyConnection) -> str\` que:

1. Llama a \`store_evaluation(conn, evaluation)\` del paso 2.4
2. Actualiza las estadÃ­sticas del modelo en memoria (para mostrar en la barra de estado sin hacer query a DuckDB cada vez)
3. Si \`store_evaluation\` falla: guarda el \`EvaluationResult\` en un archivo JSON temporal en \`~/.mente_medica/pending/\` para reintentar mÃ¡s tarde
4. Devuelve el ID del registro guardado o "PENDIENTE" si estÃ¡ en cola local

Escribe tambiÃ©n \`retry_pending_evaluations(conn) -> int\` que:
- Intenta guardar todos los archivos en \`~/.mente_medica/pending/\`
- Devuelve el nÃºmero de registros guardados exitosamente
- Esta funciÃ³n se llama automÃ¡ticamente al iniciar la app`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="MenteError enum + tabla de decisiones para 6 puntos de fallo especÃ­ficos del dominio mÃ©dico. Regla: badge ALTO automÃ¡tico en cualquier error de evaluaciÃ³n. Advertencia especial en todos los errores: 'Nunca uses resultados no verificados para decisiones clÃ­nicas.'"
        >
          <PromptBlock label="Prompt 5.3 â€” Errores en cascada">
{`En Mente MÃ©dica, los errores tienen implicaciones especiales por el dominio mÃ©dico.
Define el plan de errores en cascada.

Para cada punto de fallo, define la respuesta de la app:
1. Falla la llamada al LLM â†’ modo fallback del paso 3.6 + badge ALTO automÃ¡tico
2. El parseo devuelve confidence=0.0 â†’ badge ALTO + mensaje "Respuesta no estructurada"
3. La validaciÃ³n antialucinaciÃ³n detecta flags â†’ badge sube un nivel + mostrar flags
4. Falla store_evaluation â†’ guardar en pending + continuar sin bloquear al usuario
5. La base de datos estÃ¡ corrupta â†’ modo solo lectura + botÃ³n "Exportar historial como CSV"
6. El usuario cierra la app durante una evaluaciÃ³n â†’ cancelar task async limpiamente

Genera:
1. El enum \`MenteError\` con los tipos de error
2. La tabla de decisiones en formato markdown
3. La advertencia especial que aparece en TODOS los casos de error mÃ©dico:
   "Error durante la evaluaciÃ³n. Nunca uses resultados no verificados para decisiones clÃ­nicas."`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging de auditorÃ­a" 
          goal="medical_logger.py: audit.log (nunca se borra, RotatingFileHandler con backup alto) con timestamp/model/badge/is_correct/confidence/len(flags) SIN texto de la pregunta; debug.log con reasoning truncado. JustificaciÃ³n del diseÃ±o de privacidad."
        >
          <PromptBlock label="Prompt 5.4 â€” Log de auditorÃ­a mÃ©dica">
{`Mente MÃ©dica necesita un log de auditorÃ­a especÃ­fico para evaluaciones mÃ©dicas.

Escribe un mÃ³dulo \`medical_logger.py\` que:
1. Configura logging estÃ¡ndar de Python con dos handlers:
   - Handler de auditorÃ­a: archivo \`~/.mente_medica/audit.log\` (nunca se borra, \`RotatingFileHandler\` con backup count alto)
   - Handler de debug: archivo \`~/.mente_medica/debug.log\` (\`RotatingFileHandler\` 5MB)
2. FunciÃ³n \`log_evaluation(query: ClinicalQuery, result: EvaluationResult)\` que:
   - Registra en \`audit.log\`: timestamp, \`model_name\`, \`risk_badge\`, \`is_correct\`, \`confidence\`, \`len(hallucination_flags)\` â€” SIN el texto de la pregunta (puede contener datos sensibles del usuario)
   - Registra en \`debug.log\`: todo lo anterior mÃ¡s el \`reasoning\` truncado a 200 chars
3. FunciÃ³n \`log_error(error_type: str, message: str, context: dict)\` para errores

Incluye la justificaciÃ³n del diseÃ±o: Â¿por quÃ© no guardar el texto de la pregunta en el log de auditorÃ­a?`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py: MENTE_MEDICA_API_KEY, MODEL, DB_PATH, LOG_LEVEL, CONFIDENCE_THRESHOLD (0.7), LLM_TIMEOUT (45), DATA_PATH. Constantes BADGE_LOW_THRESHOLD, MAX_QUESTION_LENGTH, MIN_QUESTION_WORDS. init_config() valida y crea directorios. .env.example comentado."
        >
          <PromptBlock label="Prompt 5.5 â€” config.py">
{`Escribe \`config.py\` para Mente MÃ©dica con:

Variables de entorno:
- \`MENTE_MEDICA_API_KEY\` (obligatoria)
- \`MENTE_MEDICA_MODEL\` (por defecto: [MODELO ELEGIDO EN 3.1])
- \`MENTE_MEDICA_DB_PATH\` (por defecto: \`~/.mente_medica/evaluations.duckdb\`)
- \`MENTE_MEDICA_LOG_LEVEL\` (por defecto: \`INFO\`)
- \`MENTE_MEDICA_CONFIDENCE_THRESHOLD\` (por defecto: \`0.7\`, para badge BAJO/MEDIO)
- \`MENTE_MEDICA_LLM_TIMEOUT\` (por defecto: \`45\`)
- \`MENTE_MEDICA_DATA_PATH\` (por defecto: \`./data_medical/\`)

ParÃ¡metros de negocio (no variables de entorno):
- \`BADGE_LOW_THRESHOLD\`: float = 0.7 (confianza mÃ­nima para badge BAJO)
- \`MAX_QUESTION_LENGTH\`: int = 500
- \`MIN_QUESTION_WORDS\`: int = 10

Genera tambiÃ©n el \`.env.example\` con comentarios explicativos en cada variable.
Usa \`python-dotenv\`. Valida y crea directorios necesarios en \`init_config()\`.`}
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
          desc="Tests unitarios de lÃ³gica clÃ­nica, test de integraciÃ³n del pipeline con mock de API, prueba manual con 7 escenarios mÃ©dicos especÃ­ficos, empaquetado y prueba en mÃ¡quina limpia."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_medical_logic.py: validate_clinical_response (vÃ¡lida, vacÃ­a, sin opciÃ³n indicada, fÃ¡rmaco inventado obvio), detect_hallucinations (correcto+alta confianzaâ†’BAJO, incorrectoâ†’ALTO, confidence=0â†’ALTO), parse_clinical_response (JSON vÃ¡lido, malformado, confidence fuera de rango)."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests unitarios mÃ©dicos">
{`Escribe tests unitarios con Pytest para Mente MÃ©dica.

Crea \`tests/test_medical_logic.py\` con tests para:
1. \`validate_clinical_response()\`: respuesta vÃ¡lida tipo test, respuesta vacÃ­a, respuesta sin indicar opciÃ³n, respuesta con nombre de fÃ¡rmaco inventado obvio
2. \`detect_hallucinations()\`: evaluaciÃ³n correcta+alta confianzaâ†’badge BAJO, evaluaciÃ³n incorrectaâ†’badge ALTO, confianza=0.0â†’badge ALTO, flags detectadosâ†’badge sube un nivel
3. \`parse_clinical_response()\`: JSON vÃ¡lido, JSON malformado, texto antes del JSON, confidence fuera de rango, answer no coincide con opciones

Para cada test:
- Datos de prueba fijos del dataset de ejemplo (no llamar a API)
- \`pytest.raises()\` para excepciones esperadas
- Nombres descriptivos: \`test_[funciÃ³n]_[escenario]\`

Incluye \`conftest.py\` con fixtures: \`sample_query_multiple_choice\`, \`sample_query_open\`, \`sample_correct_response\`, \`sample_hallucinated_response\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_medical_integration.py: 10 preguntas de sample_medical_queries.json, DuckDB en memoria, mock de evaluate_clinical_query() con respuesta fija (confidence=0.85, respuesta correcta). Verificar badge BAJO, persistencia en DuckDB y get_model_stats()."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de integraciÃ³n">
{`Escribe un test de integraciÃ³n para Mente MÃ©dica.

El test debe:
1. Usar \`sample_medical_queries.json\` del paso 2.5
2. DuckDB en memoria (\`:memory:\`)
3. Mockear SOLO \`evaluate_clinical_query()\` con una respuesta fija predefinida (un JSON vÃ¡lido con reasoning, answer, confidence=0.85, sources_cited)
4. Ejecutar el pipeline completo: \`ClinicalQuery\` â†’ evaluaciÃ³n â†’ parseo â†’ detecciÃ³n de alucinaciones â†’ guardado en DuckDB
5. Verificar:
   a. \`EvaluationResult\` tiene \`risk_badge="BAJO"\` para la respuesta correcta simulada
   b. La evaluaciÃ³n se guardÃ³ en DuckDB
   c. \`get_model_stats()\` devuelve 1 evaluaciÃ³n con el modelo mockeado
   d. No se lanzaron excepciones no controladas

Crea \`tests/test_medical_integration.py\`.
[VERIFICAR: usa \`pytest-asyncio\` si el pipeline usa async]`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Checklist con 7 escenarios: pregunta de cardiologÃ­a con badge coherente, respuesta deliberadamente incorrectaâ†’badge ALTO, sin internetâ†’banner, pregunta de 5 palabrasâ†’error, guardar 3 evaluacionesâ†’historial, filtrar por ALTO, advertencia legal visible en todas las pantallas."
        >
          <PromptBlock label="Prompt 6.3 â€” Prueba manual">
{`Genera el protocolo de prueba manual de Mente MÃ©dica antes de empaquetar.

Checklist con 7 escenarios especÃ­ficos:
1. Evaluar una pregunta de cardiologÃ­a de MedQA con el modelo elegido â†’ Verificar: Â¿el badge es coherente con si acertÃ³?
2. Evaluar una pregunta con una respuesta incorrecta deliberada (cambiar la opciÃ³n) â†’ Verificar: Â¿el badge es ALTO?
3. Desconectar internet y evaluar â†’ Verificar: Â¿aparece el banner de advertencia?
4. Introducir pregunta de 5 palabras â†’ Verificar: Â¿aparece el error de validaciÃ³n?
5. Guardar 3 evaluaciones y revisar el historial â†’ Verificar: Â¿estÃ¡n todas?
6. Filtrar historial por badge ALTO â†’ Verificar: Â¿solo aparecen las de badge ALTO?
7. Verificar que la advertencia legal es visible en todas las pantallas

Para cada escenario: resultado esperado, cÃ³mo verificarlo, quÃ© hacer si falla.

SeÃ±ales de que estÃ¡ listo para empaquetar: [GENERA LA LISTA DE CONDICIONES].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado" 
          goal="Instrucciones completas: comando PyInstaller con flags, problemas conocidos de Flet + DuckDB en empaquetado, instrucciones para que el ejecutable encuentre el .env, verificar si Flet tiene su propio flet build antes de usar PyInstaller directamente."
        >
          <PromptBlock label="Prompt 6.4 â€” Empaquetado .exe">
{`Genera las instrucciones completas de empaquetado para Mente MÃ©dica con PyInstaller.

El proyecto incluye:
- Punto de entrada: \`main.py\`
- Dependencias: \`flet\`, \`duckdb\`, \`pydantic\`, \`httpx\`, \`python-dotenv\`
- Archivos de datos necesarios: \`sample_medical_queries.json\`
- El \`.env\` NO se incluye en el ejecutable

Genera:
1. El comando PyInstaller completo con todas las flags [VERIFICAR EN DOCUMENTACIÃ“N DE PYINSTALLER la sintaxis correcta de --add-data en Windows vs macOS]
2. Posibles problemas especÃ­ficos de Flet + DuckDB en el empaquetado y sus soluciones [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL de Flet el proceso de empaquetado recomendado, ya que Flet puede tener su propio comando flet build]
3. Instrucciones para que el ejecutable encuentre el \`.env\` en su directorio
4. CÃ³mo incluir el archivo de auditorÃ­a (\`audit.log\`) en el instalador

Nota: Flet puede tener un sistema de build propio. Verifica la documentaciÃ³n oficial de Flet antes de usar PyInstaller directamente.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="Protocolo en VM Windows sin Python: archivos necesarios junto al ejecutable, checklist de verificaciÃ³n (advertencia legal visible en primera pantalla, evaluaciÃ³n de muestra, log de auditorÃ­a creado), errores tÃ­picos y cÃ³mo reportar un problema de seguridad clÃ­nica."
        >
          <PromptBlock label="Prompt 6.5 â€” Prueba en entorno limpio">
{`Protocolo de prueba del ejecutable de Mente MÃ©dica en entorno limpio.

Genera:
1. CÃ³mo crear el entorno de prueba (VM Windows sin Python)
2. Archivos necesarios junto al ejecutable:
   - Â¿Es necesario el \`.env\`? Â¿CÃ³mo configurar la API key sin archivo \`.env\`?
   - Â¿Se necesita \`sample_medical_queries.json\`?
3. Checklist de verificaciÃ³n en entorno limpio:
   - La app abre sin ventana de terminal
   - La advertencia legal es visible en la primera pantalla
   - Se puede evaluar una pregunta de muestra
   - El log de auditorÃ­a se crea en el directorio correcto del usuario
   - Sin internet: aparece el banner de advertencia correctamente
4. Errores tÃ­picos de PyInstaller/Flet en Windows y sus soluciones [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
5. CÃ³mo reportar un problema de seguridad (la app muestra datos mÃ©dicos incorrectos)`}
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
          desc="Planificar v2 de Mente MÃ©dica con evaluaciÃ³n batch y comparativa de modelos, y publicar en el Foro de Proyectos con el descargo mÃ©dico obligatorio."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog en tabla con columnas: Funcionalidad / Riesgo clÃ­nico / Capa afectada / Complejidad / Prioridad. Para cada idea evaluar si afecta la seguridad clÃ­nica y quÃ© salvaguardas aÃ±adir antes de implementar."
        >
          <PromptBlock label="Prompt 7.A â€” Backlog v2">
{`Mente MÃ©dica v1 estÃ¡ funcionando. Quiero planificar la v2.

Tengo estas ideas: [DESCRIBE TUS IDEAS: ej. "evaluaciÃ³n batch de 100 preguntas MedQA automÃ¡ticamente", "comparar 3 modelos simultÃ¡neamente", "exportar reporte PDF de auditorÃ­a", "integraciÃ³n con PubMed para verificar citas"].

Para cada idea:
1. Â¿Afecta la seguridad clÃ­nica del sistema? Si sÃ­, Â¿quÃ© salvaguardas aÃ±adir?
2. Â¿QuÃ© capas del mapa 1-6 se ven afectadas?
3. Complejidad: Alta/Media/Baja
4. Prioridad: P1/P2/P3

Genera backlog v2:
| Funcionalidad | Riesgo clÃ­nico | Capa afectada | Complejidad | Prioridad |`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha con tÃ­tulo 'Mente MÃ©dica v1 â€” [SUBTÃTULO]', Ã¡rea Medicina, descripciÃ³n â‰¤150 palabras, descargo de responsabilidad mÃ©dica obligatorio y visible, capturas (badge ALTO con flags, historial), instalaciÃ³n en 3 pasos y pregunta abierta para la comunidad."
        >
          <PromptBlock label="Prompt 7.B â€” PublicaciÃ³n en el Foro">
{`Genera la ficha de publicaciÃ³n de Mente MÃ©dica para el Foro de Proyectos Horizon.

Incluye:
1. TÃ­tulo: "Mente MÃ©dica v1 â€” [SUBTÃTULO]"
2. Ãrea: Medicina y Salud
3. DescripciÃ³n (mÃ¡x 150 palabras): quÃ© hace, a quiÃ©n va dirigido, quÃ© tecnologÃ­as usa
4. Descargo de responsabilidad mÃ©dica (obligatorio, en texto visible)
5. Capturas de pantalla a mostrar: evaluaciÃ³n con badge ALTO, historial
6. Instrucciones de instalaciÃ³n (3 pasos mÃ¡ximo)
7. QuÃ© feedback busco: Â¿sobre la detecciÃ³n de alucinaciones? Â¿sobre la UI?
8. Pregunta abierta para debate: ej. "Â¿QuÃ© umbral de confidence considerÃ¡is aceptable para uso en investigaciÃ³n (no clÃ­nico)?"`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Resultado esperado â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(220,38,38,0.04)", borderColor: "rgba(220,38,38,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <HeartPulse size={16} style={{ color: C.red }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.red }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1â€“6 + Fase 7), tendrÃ¡s un <strong>ejecutable de Mente MÃ©dica</strong> que evalÃºa la precisiÃ³n clÃ­nica de cualquier LLM disponible por API: introduce una pregunta estilo MedQA-USMLE, obtÃ©n la respuesta razonada del modelo y ve al instante un badge de riesgo basado en benchmarks reales, con detecciÃ³n de posibles alucinaciones mÃ©dicas y un historial auditable de evaluaciones guardado en DuckDB.
          </p>
          <div className="flex flex-wrap gap-3 justify-start mt-6">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: C.red, color: "white" }}>
              Publicar en la Comunidad <ChevronRight size={14} />
            </Link>
            <Link to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}>
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* â”€â”€â”€ Version extensions â”€â”€â”€ */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

