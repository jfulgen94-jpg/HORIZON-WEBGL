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
import { Sigma } from "lucide-react";
import { AlertTriangle } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio MatemÃ¡ticas (data_math/rankings/) Â· MATH Â· GSM8K Â· MAFBench Â· AIME", motivo: "Verificar quÃ© modelos tienen scores reales verificables en razonamiento matemÃ¡tico formal." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Decidir quÃ© tipos de problema (Ã¡lgebra, cÃ¡lculo, combinatoria, GSM8K) cubre la v1 y cuÃ¡les no son verificables automÃ¡ticamente." },
  { capa: "2", subcapa: "2.1", herramienta: "data_math/raw/ Â· openai/gsm8k [VERIFICAR DOCS]", motivo: "Problemas GSM8K con respuesta numÃ©rica verificable ya descargados por el motor Horizon." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para MathProblem, MathSolution y EvaluationSession con campos de verificaciÃ³n." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators Â· re (regex)", motivo: "Extraer respuesta numÃ©rica de LaTeX \\boxed{}, fracciones, porcentajes y texto libre." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de evaluaciones con vistas de accuracy por modelo y desglose por nivel de dificultad." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual", motivo: "15 problemas de 3 niveles con respuesta exacta para desarrollo offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_math/rankings/", motivo: "Seleccionar modelo con score verificado en MATH dataset y GSM8K." },
  { capa: "3", subcapa: "3.2", herramienta: "Chain of Thought prompting", motivo: "Sin CoT la precisiÃ³n en matemÃ¡ticas baja significativamente; el modelo debe razonar paso a paso." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx Â· openai SDK [VERIFICAR DOCS]", motivo: "Llamada async con temperatura 0.0 para respuestas deterministas." },
  { capa: "3", subcapa: "3.4", herramienta: "re (regex) Â· sympy [VERIFICAR DOCS]", motivo: "Extraer y normalizar respuesta numÃ©rica final del CoT." },
  { capa: "3", subcapa: "3.5", herramienta: "math.isclose", motivo: "Comparar respuestas numÃ©ricas con tolerancia relativa; nunca usar == con floats." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Marcar como 'No verificable automÃ¡ticamente' cuando la extracciÃ³n falla sin bloquear la app." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir las 3 pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Ãrea scrollable para CoT largo, DataTable para estadÃ­sticas y badges de resultado prominentes." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "Pipeline completo: evaluar â†’ parsear â†’ detectar issues â†’ persistir â†’ actualizar UI." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de extracciÃ³n numÃ©rica, comparaciÃ³n con tolerancia y test de integraciÃ³n del pipeline." },
  { capa: "6", subcapa: "6.3", herramienta: "Problemas GSM8K reales", motivo: "ValidaciÃ³n con datos del laboratorio de MatemÃ¡ticas." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible; consideraciÃ³n especial con sympy." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar comparativas de accuracy de modelos y planificar v2 con evaluaciÃ³n paralela de 3 modelos." },
];

// â”€â”€â”€ Phases overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "InvestigaciÃ³n",         summary: "Benchmarks matemÃ¡ticos (MATH, GSM8K, AIME) y viabilidad de la verificaciÃ³n automÃ¡tica de respuestas." },
  { id: "1", label: "Capa 1", name: "DefiniciÃ³n",             summary: "Perfil de usuario, problema, inputs/outputs, criterios de Ã©xito y lÃ­mites: solo respuestas numÃ©ricas verificables en v1." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "Carga de GSM8K, Pydantic, extracciÃ³n de respuesta numÃ©rica con regex, DuckDB y 15 problemas de ejemplo." },
  { id: "3", label: "Capa 3", name: "LÃ³gica / IA",            summary: "SelecciÃ³n del modelo, Chain of Thought, llamada async, parseo de respuesta, detecciÃ³n de issues y fallback." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "3 pantallas: EvaluaciÃ³n (badge + CoT), EstadÃ­sticas (accuracy por modelo) e Historial con filtros." },
  { id: "5", label: "Capa 5", name: "IntegraciÃ³n",            summary: "Pipeline completo, errores en cascada, logging de evaluaciones y configuraciÃ³n con tolerancia numÃ©rica." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "Tests de extracciÃ³n numÃ©rica, test de integraciÃ³n del pipeline, prueba manual con 7 escenarios y PyInstaller." },
  { id: "7", label: "Fase 7", name: "IteraciÃ³n",              summary: "Publicar en el Foro de Proyectos y planificar v2 con evaluaciÃ³n simultÃ¡nea de 3 modelos y formato AIME." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Arena de modelos",
    area: "3 modelos simultÃ¡neos",
    title: "Prisma Arena â€” Comparativa paralela de razonamiento",
    desc: "EnvÃ­a el mismo problema a 3 modelos en paralelo con asyncio.gather, muestra los tres razonamientos en columnas y declara ganador automÃ¡ticamente por accuracy y tiempo de respuesta.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el usuario configura 3 API keys o selecciona 3 modelos del mismo proveedor",
      "Capa 3: solve_with_fallback() se lanza 3 veces con asyncio.gather; fallos individuales no cancelan los otros dos",
      "Capa 3: rank_solutions(): ordena los 3 resultados por is_correct + response_time",
      "Capa 4: pantalla Arena con 3 columnas de CoT + badges side-by-side",
      "Capa 4: banner 'Ganador: [MODELO]' con justificaciÃ³n (correcto + mÃ¡s rÃ¡pido)",
      "Capa 5: el pipeline paralelo actualiza DuckDB con las 3 evaluaciones como unidad",
    ],
  },
  {
    tag: "v3 Â· AIME",
    area: "CompeticiÃ³n matemÃ¡tica",
    title: "Prisma AIME â€” Problemas de alta dificultad",
    desc: "Extiende Prisma para soportar el formato AIME (problemas de competiciÃ³n matemÃ¡tica con respuesta entera 0-999), con timeout extendido y anÃ¡lisis de errores por etapa del razonamiento.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: nuevo tipo de problema AIME con respuesta entera 0-999 (nunca fracciÃ³n ni decimal)",
      "Capa 2: campo aime_answer_int: Optional[int] en MathSolution; validaciÃ³n de rango 0-999",
      "Capa 3: timeout de 120s para AIME (los razonamientos son mucho mÃ¡s largos)",
      "Capa 3: temperatura 0.0 obligatoria (los problemas AIME tienen respuesta Ãºnica exacta)",
      "Capa 4: badge especial 'AIME' en naranja; mostrar nÃºmero de pasos del CoT en grande",
      "Capa 6: dataset de 5 problemas AIME reales de dominio pÃºblico para testing",
    ],
  },
  {
    tag: "v4 Â· Informe PDF",
    area: "ExportaciÃ³n de resultados",
    title: "Prisma Report â€” Comparativa de modelos en PDF",
    desc: "Genera un informe PDF profesional con la comparativa de 2 o mÃ¡s modelos evaluados sobre el mismo conjunto estÃ¡ndar de 50 problemas GSM8K, con grÃ¡ficos de accuracy por nivel y anÃ¡lisis de errores comunes.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: nueva acciÃ³n 'Ejecutar benchmark completo' (50 problemas, puede tardar minutos)",
      "Capa 4: botÃ³n 'Exportar informe' visible en la pantalla de EstadÃ­sticas",
      "Capa 5: generate_pdf_report(): usa reportlab o weasyprint [VERIFICAR DOCS]",
      "Capa 5: el informe incluye: grÃ¡fico de barras de accuracy, tabla de errores comunes, tiempo medio de respuesta",
      "Capa 6: test de generaciÃ³n de PDF con datos de ejemplo (sin llamadas a API)",
      "Advertencia: el benchmark completo consume tokens de API; mostrar estimaciÃ³n de coste antes de ejecutar",
    ],
  },
];

// â”€â”€â”€ Math verification notice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MathVerificationNotice() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(59,111,212,0.04)", borderColor: "rgba(59,111,212,0.20)" }}>
      <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: C.accent }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(30,58,138,0.80)" }}>
        <strong>LÃ­mite de la verificaciÃ³n automÃ¡tica:</strong> Prisma MatemÃ¡tico verifica solo problemas con <strong>respuesta numÃ©rica exacta</strong>. Las demostraciones, los problemas de geometrÃ­a con soluciÃ³n grÃ¡fica y los problemas con mÃºltiples soluciones equivalentes requieren revisiÃ³n humana y se marcan como "No verificable" sin error.
      </p>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaMatematicas() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(59,111,212,0.10)", color: C.accent }}>
            MatemÃ¡ticas & Procesos Complejos Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Prisma MatemÃ¡tico
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que evalÃºa el razonamiento matemÃ¡tico de cualquier LLM: el usuario introduce un problema, Prisma obtiene la soluciÃ³n con Chain of Thought, verifica la respuesta contra la soluciÃ³n correcta y produce un anÃ¡lisis de errores con historial comparativo por modelo.
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

        {/* Verification notice */}
        <MathVerificationNotice />

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
                      <td className="px-4 py-2.5 font-medium" style={{ color: C.accent, whiteSpace: "nowrap" }}>{row.capa}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", whiteSpace: "nowrap" }}>{row.subcapa}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: C.dark }}>{row.herramienta}</td>
                      <td className="px-4 py-2.5" style={{ color: "rgba(17,17,17,0.55)", maxWidth: 320 }}>{row.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(17,17,17,0.06)", background: "rgba(59,111,212,0.03)" }}>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(17,17,17,0.50)" }}>
                  <strong>Â¿Por quÃ© Flet y no PyQt o Tkinter?</strong> Flet permite mostrar texto largo con scroll nativo y construir tablas de estadÃ­sticas con DataTable sin configuraciÃ³n adicional, lo que es suficiente para el contenido de Prisma MatemÃ¡tico sin necesidad del sistema de widgets mÃ¡s complejo de PyQt.
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
          desc="Confirmar quÃ© benchmarks evalÃºan razonamiento matemÃ¡tico y hasta dÃ³nde puede llegar la verificaciÃ³n automÃ¡tica de respuestas antes de implementar nada."
        />

        <Step 
          num="0.A" 
          title="Benchmarks matemÃ¡ticos clave" 
          goal="Identificar MATH, GSM8K, AIME y MAFBench; diferencias entre niveles; modelo lÃ­der en el ranking del laboratorio y alternativas open-source."
        >
          <PromptBlock label="Prompt 0.A â€” Benchmarks matemÃ¡ticos">
{`ActÃºa como especialista en evaluaciÃ³n de LLMs para razonamiento matemÃ¡tico.
Tengo acceso al Laboratorio de MatemÃ¡ticas de Horizon (\`data_math/rankings/\`).

RespÃ³ndeme:
1. Â¿QuÃ© benchmarks evalÃºan razonamiento matemÃ¡tico en LLMs? (MATH, GSM8K, AIME, MMLU-Math, MAFBench para multi-agente)
2. Â¿QuÃ© diferencia hay entre GSM8K (aritmÃ©tica de primaria) y MATH (matemÃ¡ticas universitarias)? Â¿CuÃ¡l es mÃ¡s relevante para [ESCRIBE TU CASO DE USO]?
3. Â¿CuÃ¡l es el modelo con mejor score en MATH segÃºn \`data_math/rankings/latest_rankings_math.json\`?
4. Â¿Hay un modelo open-source en el Top-5 que pueda usar sin API de pago?

No inventes datos. Cita scores especÃ­ficos del archivo de rankings.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Viabilidad de la verificaciÃ³n automÃ¡tica" 
          goal="Confirmar quÃ© tipos de problemas tienen respuesta verificable automÃ¡ticamente y cuÃ¡les no (demostraciones, geometrÃ­a grÃ¡fica, mÃºltiples soluciones equivalentes)."
        >
          <PromptBlock label="Prompt 0.B â€” Viabilidad de verificaciÃ³n automÃ¡tica">
{`Quiero construir Prisma MatemÃ¡tico, que verifica automÃ¡ticamente si un LLM resuelve correctamente problemas matemÃ¡ticos.

Antes de empezar, confirma:
1. Â¿Todos los problemas de GSM8K tienen respuesta numÃ©rica exacta verificable? Â¿Y los de MATH dataset? Â¿CuÃ¡l es el formato de la respuesta correcta en cada uno?
2. Â¿Es posible comparar la respuesta de un LLM con la soluciÃ³n correcta usando solo Python (sin motor CAS como Mathematica)? Â¿QuÃ© casos lÃ­mite existen (fracciones, expresiones equivalentes, diferentes notaciones)?
3. Â¿Para quÃ© tipos de problemas matemÃ¡ticos NO es posible la verificaciÃ³n automÃ¡tica (demostraciones, problemas de valor teÃ³rico)?

Esto determinarÃ¡ quÃ© tipos de problemas puede evaluar la v1 de forma fiable.`}
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
          desc="QuiÃ©n usa la app, quÃ© mÃ©tricas de evaluaciÃ³n importan, quÃ© entra, quÃ© sale y quÃ© tipos de problema quedan fuera de la verificaciÃ³n automÃ¡tica en v1."
        />

        <Step 
          num="1.1" 
          title="Â¿QuiÃ©n usa esta app?" 
          goal="Ficha con rol (docente, investigador, estudiante), nivel de matemÃ¡ticas, volumen de evaluaciones por sesiÃ³n y formato de resultados esperado."
        >
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario">
{`Define el perfil de usuario de Prisma MatemÃ¡tico.

La app evalÃºa el razonamiento matemÃ¡tico de LLMs comparando sus respuestas con soluciones correctas conocidas.

[DESCRIBE AQUÃ TU USUARIO OBJETIVO: ej. "profesor universitario de matemÃ¡ticas que quiere saber quÃ© LLM puede usar como tutor de su asignatura de cÃ¡lculo" o "investigador de IA que compara modelos en problemas de combinatoria"]

Genera una ficha con:
- Nombre ficticio y rol (docente, investigador, estudiante, developer)
- QuÃ© hace actualmente sin la app (Â¿prueba LLMs manualmente en el chat?)
- QuÃ© nivel de matemÃ¡ticas maneja (Â¿GSM8K de primaria o AIME de competiciÃ³n?)
- CuÃ¡ntos problemas quiere evaluar por sesiÃ³n (5, 50, 500)
- QuÃ© formato de respuesta espera ver (texto, tabla comparativa, porcentaje de aciertos)
- Nivel tÃ©cnico (Â¿sabe LaTeX? Â¿usa Python? Â¿solo web?)`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="Â¿QuÃ© problema concreto resuelve?" 
          goal="Una sola frase del problema. Aclarar si la app mide rendimiento del LLM, ayuda a aprender matemÃ¡ticas, o ambas, siendo honesto sobre los lÃ­mites de la verificaciÃ³n automÃ¡tica."
        >
          <PromptBlock label="Prompt 1.2 â€” Frase del problema">
{`BasÃ¡ndome en el perfil ([PEGA EL RESUMEN DEL PERFIL]), escribe UNA SOLA FRASE que defina el problema que Prisma MatemÃ¡tico resuelve.

Formato:
"[ROL] no puede [TAREA] porque [OBSTÃCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes. Para cada una, indica:
- Â¿El problema se puede resolver COMPLETAMENTE con evaluaciÃ³n automÃ¡tica, o algunos tipos de problema requieren revisiÃ³n humana?
- Â¿La app mide el rendimiento del LLM, ayuda al usuario a aprender matemÃ¡ticas, o ambas cosas?

SÃ© honesto sobre las limitaciones de la verificaciÃ³n automÃ¡tica en matemÃ¡ticas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="Â¿QuÃ© datos entran?" 
          goal="Lista completa: enunciado, carga desde GSM8K, modelo, nivel de dificultad, respuesta correcta opcional, Ã¡rea matemÃ¡tica y timeout de respuesta."
        >
          <PromptBlock label="Prompt 1.3 â€” Inputs de la app">
{`Para Prisma MatemÃ¡tico, define todos los datos de entrada.

El usuario puede:
- Escribir un problema matemÃ¡tico en texto libre (con o sin LaTeX)
- Cargar un conjunto de problemas desde el dataset GSM8K local
- Seleccionar el modelo LLM a evaluar
- Indicar la respuesta correcta conocida (si la tiene)
- Elegir el nivel de dificultad del problema: [BÃ¡sico/Intermedio/Avanzado]

Genera la lista completa de inputs con:
- Nombre del campo
- Tipo de dato (texto, nÃºmero, enum, archivo)
- Obligatorio u opcional
- Restricciones (ej. longitud mÃ¡xima del enunciado)
- QuÃ© hace la app si el campo obligatorio falta

[AÃ‘ADE CUALQUIER INPUT ADICIONAL QUE NECESITES: ej. Ã¡rea matemÃ¡tica (Ã¡lgebra, cÃ¡lculo, combinatoria), tiempo mÃ¡ximo para que el LLM responda]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="Â¿QuÃ© sale?" 
          goal="Outputs: CoT completo, respuesta extraÃ­da, badge CORRECTO/INCORRECTO/NO VERIFICABLE, paso del primer error, score acumulado y estadÃ­sticas de sesiÃ³n."
        >
          <PromptBlock label="Prompt 1.4 â€” Outputs de la app">
{`Define todos los outputs de Prisma MatemÃ¡tico para cada evaluaciÃ³n.

La app debe producir:
1. El razonamiento paso a paso del LLM (Chain of Thought completo)
2. La respuesta final extraÃ­da del razonamiento
3. ComparaciÃ³n con la respuesta correcta: Correcto / Incorrecto / No verificable
4. Si es incorrecto: en quÃ© paso del razonamiento se produce el primer error (si es detectable automÃ¡ticamente)
5. Score de precisiÃ³n acumulado del modelo en esta sesiÃ³n
6. EstadÃ­sticas de la sesiÃ³n: N evaluaciones, X% aciertos, desglose por nivel

Para cada output especifica:
- Formato exacto (texto con scroll, nÃºmero, barra de progreso, tabla)
- CuÃ¡ndo se genera
- Si se guarda automÃ¡ticamente en DuckDB

Â¿Necesitas exportar los resultados? Â¿En quÃ© formato?
[DEFINE TUS NECESIDADES CONCRETAS]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de Ã©xito" 
          goal="6â€“8 criterios verificables: precisiÃ³n de extracciÃ³n â‰¥95% en GSM8K, tiempo de evaluaciÃ³n, manejo de respuestas no numÃ©ricas, persistencia y comparativa de modelos."
        >
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`Define los criterios de Ã©xito de Prisma MatemÃ¡tico v1.

Genera 6-8 criterios verificables. Incluye obligatoriamente:
- PrecisiÃ³n de la extracciÃ³n de respuesta numÃ©rica (ej. "extrae correctamente la respuesta final en >=95% de los problemas GSM8K del dataset de ejemplo")
- Tiempo de evaluaciÃ³n (ej. "evalÃºa un problema GSM8K nivel bÃ¡sico en < 30s")
- Manejo de respuestas no numÃ©ricas (ej. "si el LLM no da respuesta numÃ©rica, marca como 'No verificable' sin excepciÃ³n")
- Persistencia (ej. "el historial de evaluaciones persiste entre sesiones")
- ComparaciÃ³n de modelos (ej. "puede evaluar el mismo problema con 2 modelos distintos y comparar resultados en la pantalla de estadÃ­sticas")

No uses criterios vagos. Cada uno debe poder verificarse en < 5 minutos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="LÃ­mites explÃ­citos de la v1" 
          goal="DeclaraciÃ³n formal: solo respuestas numÃ©ricas exactas. Lista de tipos de problema que requieren revisiÃ³n manual y en quÃ© versiÃ³n podrÃ­an aÃ±adirse."
        >
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites de la v1">
{`Define los lÃ­mites explÃ­citos de Prisma MatemÃ¡tico v1.

Problemas matemÃ¡ticos que NO puede verificar automÃ¡ticamente en v1:
[DECIDE CUÃLES EXCLUIR: ej. demostraciones (sin respuesta numÃ©rica), geometrÃ­a con respuesta grÃ¡fica, ecuaciones con mÃºltiples soluciones vÃ¡lidas equivalentes, problemas en LaTeX complejo]

Para cada lÃ­mite:
1. Â¿Por quÃ© no es verificable automÃ¡ticamente? (explica el problema tÃ©cnico)
2. Â¿Puede el usuario revisarlo manualmente dentro de la app?
3. Â¿En quÃ© versiÃ³n podrÃ­a aÃ±adirse?

Genera la declaraciÃ³n de lÃ­mites:
"Prisma MatemÃ¡tico v1 verifica automÃ¡ticamente SOLO problemas con respuesta numÃ©rica exacta (o fracciÃ³n simplificada). Los siguientes tipos requieren revisiÃ³n manual: [LISTA]."`}
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
          desc="Carga de GSM8K, modelos Pydantic, extracciÃ³n de respuesta numÃ©rica desde \boxed{} y texto libre, almacenamiento DuckDB y 15 problemas de ejemplo."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_gsm8k_problems() desde JSONL local (extrae respuesta del campo '####') y create_manual_problem() para entrada libre. Manejo de FileNotFoundError descriptivo."
        >
          <PromptBlock label="Prompt 2.1 â€” Fuente de datos">
{`Para Prisma MatemÃ¡tico, implementa la carga de problemas matemÃ¡ticos.

Fuente 1 (local): problemas GSM8K en \`data_math/raw/gsm8k_problems.json\`
Formato de cada problema GSM8K: \`question\`: str, \`answer\`: str (donde \`answer\` incluye el razonamiento paso a paso y termina con "#### [NÃšMERO]").

Escribe:
1. \`load_gsm8k_problems(file_path: str, limit: int = 50) -> list[MathProblem]\`:
   - Carga el archivo JSON local
   - Extrae la respuesta numÃ©rica del campo answer (texto despuÃ©s de "####")
   - Convierte a lista de \`MathProblem\`
   - Lanza \`FileNotFoundError\` descriptivo si el archivo no existe

2. \`create_manual_problem(question: str, correct_answer: Optional[str]) -> MathProblem\`:
   - Crea un problema a partir de la entrada manual del usuario
   - Si \`correct_answer\` es None: \`is_verifiable=False\`

Usa \`pathlib\` para rutas. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="MathProblem (con is_verifiable), MathSolution (con is_correct y error_step) y EvaluationSession (con accuracy). Pydantic v2, docstrings en todos."
        >
          <PromptBlock label="Prompt 2.2 â€” Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Prisma MatemÃ¡tico.

1. \`MathProblem\`:
   - \`problem_id\`: str (generado automÃ¡ticamente si es manual)
   - \`question\`: str (enunciado del problema)
   - \`correct_answer\`: Optional[str] (respuesta correcta como string)
   - \`correct_answer_numeric\`: Optional[float] (para comparaciÃ³n numÃ©rica)
   - \`source\`: Literal["gsm8k", "math_dataset", "manual"]
   - \`difficulty\`: Literal["basic", "intermediate", "advanced"]
   - \`math_area\`: Optional[str] (Ã¡lgebra, cÃ¡lculo, combinatoria, etc.)
   - \`is_verifiable\`: bool (True si tiene respuesta numÃ©rica exacta)

2. \`MathSolution\`:
   - \`problem_id\`: str
   - \`model_name\`: str
   - \`chain_of_thought\`: str (razonamiento completo)
   - \`extracted_answer\`: Optional[str] (respuesta final extraÃ­da)
   - \`extracted_answer_numeric\`: Optional[float]
   - \`is_correct\`: Optional[bool] (None si is_verifiable=False)
   - \`error_step\`: Optional[int] (paso donde se detecta el primer error)
   - \`evaluated_at\`: datetime
   - \`response_time_seconds\`: float

3. \`EvaluationSession\`:
   - \`session_id\`: str
   - \`model_name\`: str
   - \`problems_evaluated\`: int
   - \`correct\`: int
   - \`incorrect\`: int
   - \`not_verifiable\`: int
   - \`accuracy\`: float (0.0-1.0)
   - \`created_at\`: datetime

Usa Pydantic v2. Docstrings en cada modelo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ExtracciÃ³n y normalizaciÃ³n de respuestas" 
          goal="extract_numeric_answer(): busca \boxed{}, patrones de texto, fracciones y Ãºltimo nÃºmero. compare_answers() con math.isclose, nunca ==. Tests unitarios extensos."
        >
          <PromptBlock label="Prompt 2.3 â€” ExtracciÃ³n numÃ©rica">
{`La parte mÃ¡s crÃ­tica de Prisma MatemÃ¡tico es extraer la respuesta numÃ©rica del texto del LLM. Los LLMs pueden responder de formas muy distintas:
- "La respuesta es **42**"
- "Por tanto, x = 3/4"
- "El resultado final es \\boxed{156}" (formato LaTeX de MATH dataset)
- "Answer: 7.5"
- "42" (solo el nÃºmero)

Escribe \`extract_numeric_answer(llm_response: str) -> Optional[float]\` que:
1. Busca el patrÃ³n \`\\boxed{...}\` primero (formato MATH dataset) y extrae el valor
2. Si no: busca patrones como "La respuesta es X", "= X", "Answer: X"
3. Si no: busca el Ãºltimo nÃºmero en la respuesta
4. Convierte fracciones simples "3/4" a float (0.75)
5. Convierte porcentajes "75%" a float (0.75) SOLO si el problema lo pide
6. Devuelve \`None\` si no puede extraer ningÃºn nÃºmero

Escribe tambiÃ©n \`compare_answers(extracted: float, correct: float, tolerance: float = 1e-6) -> bool\` que:
- Usa \`math.isclose\` para comparaciÃ³n con tolerancia relativa y absoluta
- No usa \`==\`, nunca, para comparar floats

Incluye tests unitarios extensos para \`extract_numeric_answer\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_math_db(), store_solution(), get_model_stats() y get_history(). Vistas vw_model_accuracy y vw_difficulty_breakdown para la pantalla de estadÃ­sticas."
        >
          <PromptBlock label="Prompt 2.4 â€” DuckDB">
{`Crea la capa de persistencia de Prisma MatemÃ¡tico con DuckDB.

1. \`init_math_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`math_problems\`, \`math_solutions\`, \`evaluation_sessions\`
   - Vista: \`vw_model_accuracy\` (model_name, total, correct, accuracy, avg_response_time)
   - Vista: \`vw_difficulty_breakdown\` (model_name, difficulty, total, accuracy)

2. \`store_solution(conn, solution: MathSolution) -> str\`:
   - Guarda la soluciÃ³n del LLM
   - Actualiza la sesiÃ³n activa con los contadores

3. \`get_model_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - Devuelve estadÃ­sticas por modelo (o todas si model_name=None)
   - Usa la vista \`vw_model_accuracy\`

4. \`get_history(conn, limit: int = 50, difficulty: Optional[str] = None) -> list[dict]\`:
   - Devuelve evaluaciones pasadas con filtro opcional por dificultad

Maneja excepciones DuckDB. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="15 problemas (5 bÃ¡sicos, 5 intermedios, 5 avanzados) con respuesta numÃ©rica exacta, explanation paso a paso y math_area. Compatible con MathProblem de Pydantic."
        >
          <PromptBlock label="Prompt 2.5 â€” Dataset de ejemplo">
{`Genera un dataset de ejemplo para Prisma MatemÃ¡tico.

Archivo \`sample_math_problems.json\` con 15 problemas:
- 5 de nivel bÃ¡sico (aritmÃ©tica, porcentajes, regla de tres): tipo GSM8K
- 5 de nivel intermedio (ecuaciones de primer grado, probabilidad bÃ¡sica)
- 5 de nivel avanzado (combinatoria, ecuaciones cuadrÃ¡ticas, progresiones)

Para cada problema:
- \`question\`: str (enunciado claro en espaÃ±ol)
- \`correct_answer\`: str (respuesta en formato string, ej. "42" o "3/4")
- \`correct_answer_numeric\`: float
- \`difficulty\`: "basic" / "intermediate" / "advanced"
- \`math_area\`: str
- \`is_verifiable\`: true (todos deben tener respuesta numÃ©rica exacta)
- \`explanation\`: str (soluciÃ³n paso a paso, para que el usuario pueda verificar)

Los problemas deben ser originales o de dominio pÃºblico. No copies problemas con copyright.
Incluye el cÃ³digo Python que carga y valida este archivo con \`MathProblem\`.`}
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
          desc="SelecciÃ³n del modelo, Chain of Thought, llamada async con temperatura 0.0, parseo de respuesta numÃ©rica, detecciÃ³n de issues de razonamiento y fallback completo."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Modelo con mejor score en MATH y GSM8K. Verificar soporte de CoT, lÃ­mite de contexto para AIME, temperatura recomendada para matemÃ¡ticas y alternativa open-source."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`Para Prisma MatemÃ¡tico, necesito el LLM con mejor razonamiento matemÃ¡tico.

SegÃºn \`data_math/rankings/latest_rankings_math.json\`:
- Modelo #1 en MATH dataset: [ESCRIBE EL MODELO Y SU SCORE]
- Modelo #1 en GSM8K: [ESCRIBE EL MODELO Y SU SCORE]

Â¿Son el mismo modelo o diferentes? Si son diferentes, Â¿cuÃ¡l uso para Prisma, que evaluarÃ¡ ambos tipos de problema?

Confirma:
1. Â¿El modelo elegido soporta Chain of Thought (razonamiento paso a paso)?
2. Â¿CuÃ¡l es su lÃ­mite de contexto? Â¿Es suficiente para problemas AIME (que pueden ser complejos y requerir razonamientos largos)?
3. Â¿Tiene modo "math" o temperatura recomendada para tareas matemÃ¡ticas? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
4. Alternativa open-source: Â¿DeepSeek-Math o similar estÃ¡ disponible con API? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]

Justifica la elecciÃ³n en 3 lÃ­neas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="DiseÃ±o del prompt central" 
          goal="System prompt + user prompt con CoT numerado, \boxed{RESPUESTA} obligatorio al final, \boxed{NO_SOLUTION} si no puede resolver, y variante para nivel avanzado."
        >
          <PromptBlock label="Prompt 3.2 â€” Prompt Chain of Thought">
{`DiseÃ±a el prompt maestro de Prisma MatemÃ¡tico para que el LLM [MODELO ELEGIDO] resuelva problemas matemÃ¡ticos con Chain of Thought.

El prompt debe:
1. Instruir al modelo a resolver el problema paso a paso, numerando cada paso
2. En el Ãºltimo paso: escribir la respuesta final en el formato \`\\boxed{RESPUESTA}\` (esto facilita la extracciÃ³n automÃ¡tica)
3. Si el modelo no puede resolver el problema: escribir \`\\boxed{NO_SOLUTION}\` en lugar de inventar una respuesta
4. Prohibir explÃ­citamente: saltar pasos, aproximar sin justificaciÃ³n, inventar fÃ³rmulas no estÃ¡ndar

System prompt: comportamiento general de resoluciÃ³n matemÃ¡tica rigurosa.
User prompt: plantilla con marcador \`{{PROBLEMA}}\`.

Genera ambos. Incluye tambiÃ©n una variante del prompt para problemas de nivel avanzado que permite al modelo usar notaciÃ³n matemÃ¡tica mÃ¡s formal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo" 
          goal="solve_math_problem(): temperatura 0.0, retry 2 intentos, timeout 30s/60s segÃºn dificultad. Mide tiempo de respuesta. API key desde variable de entorno."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada al modelo">
{`Implementa \`solve_math_problem(problem: MathProblem, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Elige la temperatura: 0.0 para problemas bÃ¡sicos e intermedios (respuestas deterministas), 0.1 para avanzados (algo de flexibilidad en notaciÃ³n)
   [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL si temperatura 0.0 estÃ¡ soportada]
3. Mide el tiempo de respuesta con \`time.time()\`
4. Hace la llamada a la API de [MODELO]
5. Retry 2 intentos (mÃ¡ximo) con espera de 5s entre ellos
6. Timeout: 60s para problemas avanzados, 30s para bÃ¡sicos
7. Devuelve \`(respuesta_raw, tiempo_en_segundos)\`

API key desde \`PRISMA_LLM_API_KEY\`.
Registra en log: \`model_name\`, \`difficulty\` del problema, tiempo de respuesta.
No hardcodees ningÃºn valor sensible.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo y estructuraciÃ³n de la respuesta" 
          goal="parse_math_solution(): extrae respuesta numÃ©rica, cuenta pasos del CoT, maneja NO_SOLUTION, compara con la correcta y construye MathSolution completo."
        >
          <PromptBlock label="Prompt 3.4 â€” Parseo de respuesta">
{`Implementa \`parse_math_solution(raw_response: str, problem: MathProblem, model_name: str, response_time: float) -> MathSolution\` que:

1. Usa \`extract_numeric_answer()\` del paso 2.3 para extraer la respuesta final
2. Intenta identificar el nÃºmero de pasos en el Chain of Thought (contando lÃ­neas numeradas o separadores como "Paso 1:", "Step 1:")
3. Si la respuesta es NO_SOLUTION (el modelo declarÃ³ no poder resolverlo):
   - \`extracted_answer = None\`
   - \`is_correct = None\`
4. Si hay respuesta correcta conocida (\`problem.is_verifiable=True\`):
   - Compara con \`compare_answers()\` del paso 2.3
   - Asigna \`is_correct=True/False\`
5. Construye el objeto \`MathSolution\` completo

Si \`extract_numeric_answer\` devuelve \`None\` y \`problem.is_verifiable=True\`: marca \`is_correct=None\` con nota "Respuesta no extractable en formato numÃ©rico".`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="DetecciÃ³n de issues en el razonamiento" 
          goal="detect_math_issues(): probabilidad > 1.0, divisiÃ³n entre cero en texto, respuesta del CoT â‰  respuesta del boxed, nÃºmero de pasos insuficiente para dificultad."
        >
          <PromptBlock label="Prompt 3.5 â€” DetecciÃ³n de issues">
{`En matemÃ¡ticas, las alucinaciones son errores de razonamiento especÃ­ficos.
Implementa \`detect_math_issues(solution: MathSolution) -> list[str]\` que detecta:

1. La respuesta extraÃ­da es numÃ©ricamente imposible para el tipo de problema (ej. probabilidad > 1.0, precio negativo en problema de compra)
2. El razonamiento contiene afirmaciones matemÃ¡ticas claramente incorrectas que puede detectar con heurÃ­sticas simples:
   - DivisiÃ³n entre cero sin manejo (busca "/ 0" o "dividido entre 0")
   - RaÃ­z cuadrada de negativo sin nota de nÃºmeros complejos
3. La respuesta final y la respuesta en el cuerpo del razonamiento no coinciden (ej. el razonamiento llega a 42 pero el boxed dice 43)
4. El nÃºmero de pasos en el CoT es demasiado pequeÃ±o para la dificultad (ej. problema avanzado con solo 1 paso)

Devuelve lista de strings con los issues detectados.
Si la lista estÃ¡ vacÃ­a: no hay issues detectados (no garantiza que sea correcto).
Muestra los issues con la etiqueta "Revisar razonamiento".`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="solve_with_fallback(): siempre devuelve MathSolution vÃ¡lido. Timeout â†’ chain_of_thought=[TIMEOUT]. Error de API â†’ [ERROR]. Nunca bloquea la evaluaciÃ³n."
        >
          <PromptBlock label="Prompt 3.6 â€” Fallback">
{`Implementa \`solve_with_fallback(problem: MathProblem, model_name: str) -> tuple[MathSolution, bool]\` que:

1. Intenta \`solve_math_problem()\` + \`parse_math_solution()\`
2. Si falla por timeout: crea un \`MathSolution\` con:
   - \`chain_of_thought = "[TIMEOUT: el modelo tardÃ³ mÃ¡s de 60s sin responder]"\`
   - \`extracted_answer = None\`
   - \`is_correct = None\`
3. Si falla por error de API: crea un \`MathSolution\` con:
   - \`chain_of_thought = "[ERROR DE API: " + str(error) + "]"\`
4. Si \`parse_math_solution\` falla (respuesta parseada pero invÃ¡lida):
   - Guarda la \`raw_response\` completa en \`chain_of_thought\`
   - \`extracted_answer = None\`
   - \`is_correct = None\`

Devuelve \`(solution, is_model_available)\`.
Cuando \`is_model_available=False\`: la UI muestra "EvaluaciÃ³n no disponible (error de API)".`}
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
          desc="3 pantallas: EvaluaciÃ³n con badge prominente y CoT scrollable, EstadÃ­sticas con accuracy por modelo y desglose por nivel, e Historial con filtros."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="DescripciÃ³n textual de EvaluaciÃ³n, EstadÃ­sticas e Historial con componentes Flet para cada elemento, antes de escribir cÃ³digo."
        >
          <PromptBlock label="Prompt 4.1 â€” Wireframe">
{`Define el wireframe de Prisma MatemÃ¡tico con 3 pantallas:

1. Pantalla EvaluaciÃ³n (principal):
   - Ãrea de texto para introducir el problema (con botÃ³n "Cargar de GSM8K")
   - Selector de modelo LLM
   - Indicador de nivel de dificultad (dropdown)
   - Campo opcional para la respuesta correcta conocida
   - BotÃ³n "Evaluar"
   - Panel de resultados (aparece despuÃ©s de evaluar):
     - Razonamiento CoT en Ã¡rea scrollable
     - Respuesta extraÃ­da en grande
     - Badge: CORRECTO (verde) / INCORRECTO (rojo) / NO VERIFICABLE (gris)
     - Lista de issues si los hay

2. Pantalla EstadÃ­sticas:
   - Tabla de accuracy por modelo (usando vw_model_accuracy)
   - Desglose por nivel de dificultad
   - GrÃ¡fico de barras si Flet lo soporta [VERIFICAR EN DOCUMENTACIÃ“N DE FLET]

3. Pantalla Historial:
   - Lista de evaluaciones pasadas con filtros por modelo y nivel

Para cada elemento: componente Flet y justificaciÃ³n.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="TextField multiline, botÃ³n Cargar GSM8K, Dropdown de modelo y dificultad, campo de respuesta correcta opcional y botÃ³n Evaluar."
        >
          <PromptBlock label="Prompt 4.2 â€” Formulario">
{`Implementa el formulario de entrada de Prisma MatemÃ¡tico con Flet.

Escribe cÃ³digo Flet para:
1. Un \`ft.TextField\` multiline para el enunciado del problema
2. Un \`ft.ElevatedButton\` "Cargar problema de GSM8K" que abre un diÃ¡logo con la lista de problemas del dataset (tÃ­tulo truncado + dificultad)
3. Un \`ft.Dropdown\` para seleccionar el modelo LLM
4. Un \`ft.Dropdown\` para el nivel de dificultad
5. Un \`ft.TextField\` opcional para la respuesta correcta conocida (con placeholder "Deja vacÃ­o si no conoces la respuesta")
6. Un \`ft.ElevatedButton\` "Evaluar" que llama a \`on_evaluate_click\` (Capa 5)
7. Un contador de evaluaciones de la sesiÃ³n actual en la barra de estado

[VERIFICAR EN DOCUMENTACIÃ“N DE FLET el comportamiento exacto de FilePicker y dialogs para la selecciÃ³n de problemas GSM8K]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
          goal="Badge CORRECTO/INCORRECTO/NO VERIFICABLE con CoT en fuente monospace scrollable, lista de issues en ExpansionTile y tiempo de respuesta."
        >
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados">
{`Implementa el Ã¡rea de resultados de Prisma MatemÃ¡tico con Flet.

Recibe un \`MathSolution\` y una lista de issues.

Genera cÃ³digo Flet para:
1. Un \`ft.Container\` con el badge de resultado en grande:
   - CORRECTO: fondo verde, checkmark, respuesta correcta confirmada
   - INCORRECTO: fondo rojo, X, respuesta extraÃ­da vs. respuesta correcta
   - NO VERIFICABLE: fondo gris, "RevisiÃ³n manual requerida"

2. Un Ã¡rea scrollable (\`ft.Column\` con \`scroll=ft.ScrollMode.AUTO\`) con el \`chain_of_thought\` completo en \`ft.Text\` con fuente monospace
   [VERIFICAR EN DOCUMENTACIÃ“N DE FLET cÃ³mo especificar fuente monospace]

3. Si hay issues detectados: \`ft.ExpansionTile\` con "Posibles issues en el razonamiento" y la lista de issues dentro

4. Tiempo de respuesta del modelo en \`ft.Text\` pequeÃ±o (ej. "Respondido en 12.3s")

5. Botones: "Guardar evaluaciÃ³n", "Siguiente problema de GSM8K"

Los datos se reciben como parÃ¡metros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="7 estados: inicio sin problema, evaluando con timer, timeout, respuesta no extractable (badge gris, no error), error de API, GSM8K no encontrado y DB no inicializable."
        >
          <PromptBlock label="Prompt 4.4 â€” Estados de error">
{`Define los estados excepcionales de Prisma MatemÃ¡tico.

Para cada estado, escribe el cÃ³digo Flet:
1. Sin problema introducido (inicio): texto guÃ­a + ejemplo de problema
2. Evaluando: \`ft.ProgressRing\` + "Resolviendo con [MODELO]..." con el tiempo transcurrido actualizÃ¡ndose cada segundo
3. Timeout (modelo tardÃ³ > lÃ­mite): \`SnackBar\` "El modelo tardÃ³ demasiado. Â¿Reintentar?"
4. Respuesta no extractable: badge gris "No verificable - ver razonamiento" (no es un error, es un estado vÃ¡lido)
5. Error de API: \`AlertDialog\` con descripciÃ³n tÃ©cnica + botÃ³n "Reintentar"
6. Dataset GSM8K no encontrado: mensaje "Archivo GSM8K no encontrado. Usa el modo manual para introducir problemas." con ruta esperada del archivo
7. Base de datos no inicializable: \`AlertDialog\` con opciÃ³n de reiniciar la DB`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n entre 3 pantallas" 
          goal="NavigationBar, EstadÃ­sticas se actualiza al navegar, Historial permite recargar el problema en EvaluaciÃ³n para reevaluar con otro modelo."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n">
{`Implementa la navegaciÃ³n de Prisma MatemÃ¡tico con Flet.

3 pantallas: EvaluaciÃ³n, EstadÃ­sticas, Historial.

Implementa:
1. \`NavigationBar\` o \`Tabs\` con iconos para las 3 pantallas
2. La pantalla EstadÃ­sticas se actualiza automÃ¡ticamente al navegar a ella (no necesita botÃ³n de refresh)
3. Desde Historial: clic en una evaluaciÃ³n pasada muestra los detalles (\`chain_of_thought\` + badge) en un panel lateral o diÃ¡logo
4. Al cargar un problema de GSM8K desde Historial: vuelve a EvaluaciÃ³n con el mismo problema pre-cargado para reevaluarlo con un modelo diferente

Escribe el esqueleto completo de la app con las 3 pantallas y la navegaciÃ³n.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET el sistema de navegaciÃ³n actual]`}
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
          desc="Pipeline matemÃ¡tico completo, errores en cascada, logging de evaluaciones sin incluir el enunciado y configuraciÃ³n con tolerancia numÃ©rica ajustable."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_evaluate_click(): valida prompt â‰¥10 chars, async con timer visual, llama al pipeline, actualiza UI con badge + issues, persiste en DuckDB y actualiza contador de sesiÃ³n."
        >
          <PromptBlock label="Prompt 5.1 â€” ConexiÃ³n UI â†” lÃ³gica">
{`Implementa \`on_evaluate_click(e)\` para Prisma MatemÃ¡tico que:

1. Valida que hay un problema introducido (mÃ­nimo 10 caracteres)
2. Construye el \`MathProblem\` con los datos del formulario
3. Muestra estado "Evaluando..." con timer visual
4. Llama a \`solve_with_fallback(problem, model_name)\` de forma asÃ­ncrona
5. Llama a \`detect_math_issues(solution)\` para obtener los issues
6. Actualiza el Ã¡rea de resultados con badge + CoT + issues
7. Llama a \`store_solution(conn, solution)\` para persistir
8. Actualiza el contador de la barra de estado
9. Si \`is_model_available=False\`: muestra mensaje de error apropiado

Usa \`asyncio\` con Flet [VERIFICAR EN DOCUMENTACIÃ“N DE FLET].
No bloquees el hilo de UI. No hagas llamadas de red en el hilo principal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="math_evaluation_pipeline(): solve â†’ detect_issues â†’ store â†’ actualizar EvaluationSession. Sin lÃ³gica de UI. Log con mÃ©tricas pero sin el enunciado del problema."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline completo">
{`Escribe \`math_evaluation_pipeline(problem: MathProblem, model_name: str, conn: duckdb.DuckDBPyConnection) -> tuple[MathSolution, list[str]]\` que:

1. Llama a \`solve_with_fallback(problem, model_name)\`
2. Llama a \`detect_math_issues(solution)\`
3. Guarda en DuckDB con \`store_solution()\`
4. Si es el primer problema de la sesiÃ³n: crea una nueva \`EvaluationSession\` en DuckDB
5. Actualiza los contadores de la sesiÃ³n (\`correct\`/\`incorrect\`/\`not_verifiable\`)
6. Devuelve \`(solution, issues)\`

La funciÃ³n no tiene lÃ³gica de UI.
Registra en log: \`problem_id\`, \`model_name\`, \`is_correct\`, \`response_time_seconds\`.
Re-lanza excepciones de DuckDB con contexto adicional.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="PrismaError enum y PrismaException. Regla general: 'Nunca bloquear la evaluaciÃ³n por un error de persistencia.' Tabla de decisiones para cada punto de fallo."
        >
          <PromptBlock label="Prompt 5.3 â€” GestiÃ³n de errores">
{`Define el plan de errores en cascada para Prisma MatemÃ¡tico.

Puntos de fallo:
1. API LLM timeout â†’ \`MathSolution\` con \`chain_of_thought=[TIMEOUT]\`, badge gris
2. API LLM error â†’ \`MathSolution\` con \`chain_of_thought=[ERROR]\`, badge gris
3. \`extract_numeric_answer\` devuelve \`None\` â†’ badge gris (no verificable)
4. \`compare_answers\` falla (overflow, NaN) â†’ badge gris con nota tÃ©cnica
5. \`store_solution\` falla â†’ mostrar resultados igualmente, log del error
6. Dataset GSM8K no existe â†’ solo modo manual, con mensaje descriptivo

Genera:
1. Enum \`PrismaError\`
2. ExcepciÃ³n \`PrismaException\` con campo \`retry_possible\`
3. Tabla de decisiones: para cada error, acciÃ³n de la app
4. Regla general: "Nunca bloquear la evaluaciÃ³n por un error de persistencia"`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging de evaluaciones" 
          goal="math_logger.py con evaluations.log y debug.log. log_evaluation() sin el enunciado (ya en DuckDB), log_session_summary() al cerrar la app."
        >
          <PromptBlock label="Prompt 5.4 â€” Logging">
{`Escribe \`math_logger.py\` para Prisma MatemÃ¡tico:

1. Dos handlers: \`evaluations.log\` (rotativo 5MB) y \`debug.log\` (rotativo 2MB)
2. \`log_evaluation(problem_id: str, model_name: str, difficulty: str, is_correct: Optional[bool], response_time: float, issues_count: int)\`:
   - Registra mÃ©tricas de cada evaluaciÃ³n SIN el enunciado del problema (puede ser texto largo; el enunciado ya estÃ¡ en DuckDB)
3. \`log_session_summary(session_id: str, accuracy: float, total: int)\`:
   - Registra el resumen de la sesiÃ³n al cerrar la app
4. \`log_error(error_type: str, problem_id: str, message: str)\`: errores

Formato: \`[TIMESTAMP][NIVEL][MÃ“DULO] mensaje\`
Â¿Por quÃ© no guardar el enunciado en el log? Puede ser texto largo (problemas AIME) que harÃ­a los logs difÃ­ciles de leer. El enunciado completo estÃ¡ en DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py con PRISMA_ANSWER_TOLERANCE, timeouts por dificultad, PRISMA_GSM8K_PATH y constantes SUPPORTED_DIFFICULTIES y MAX_PROBLEM_LENGTH. .env.example completo."
        >
          <PromptBlock label="Prompt 5.5 â€” ConfiguraciÃ³n">
{`Escribe \`config.py\` para Prisma MatemÃ¡tico:

Variables de entorno:
- \`PRISMA_LLM_API_KEY\` (obligatoria)
- \`PRISMA_LLM_MODEL\` (por defecto: [MODELO ELEGIDO])
- \`PRISMA_DB_PATH\` (por defecto: \`~/.prisma_matematico/evaluations.duckdb\`)
- \`PRISMA_LOG_LEVEL\` (por defecto: \`INFO\`)
- \`PRISMA_GSM8K_PATH\` (por defecto: \`./data_math/raw/gsm8k_problems.json\`)
- \`PRISMA_TIMEOUT_BASIC\` (por defecto: 30, segundos)
- \`PRISMA_TIMEOUT_ADVANCED\` (por defecto: 60, segundos)
- \`PRISMA_ANSWER_TOLERANCE\` (por defecto: 1e-6, para \`compare_answers\`)

Constantes:
- \`SUPPORTED_DIFFICULTIES\`: list = ["basic", "intermediate", "advanced"]
- \`MAX_PROBLEM_LENGTH\`: int = 2000 (caracteres)

Genera \`.env.example\` completo con comentarios.
Valida todos los valores al inicializar. Crea directorios necesarios.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color="#0284C7"
          title="Pruebas y empaquetado"
          desc="Pytest unitario de extracciÃ³n numÃ©rica, test de integraciÃ³n del pipeline completo, checklist manual y PyInstaller con consideraciones de sympy y datos JSON."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_math_logic.py con extract_numeric_answer, compare_answers, detect_math_issues y parse_math_solution. Fixtures con conftest.py, sin llamadas a APIs ni DuckDB."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests unitarios">
{`Escribe tests unitarios con Pytest para Prisma MatemÃ¡tico.

Crea \`tests/test_math_logic.py\`:
1. \`extract_numeric_answer()\`: formato boxed, "la respuesta es X", "Answer: X", fracciÃ³n "3/4", solo nÃºmero, no hay nÃºmero â†’ None, mÃºltiples nÃºmeros â†’ toma el Ãºltimo/el del boxed
2. \`compare_answers()\`: iguales, tolerancia relativa, NaN â†’ False, infinito â†’ False, ambos negativos
3. \`detect_math_issues()\`: probabilidad > 1.0 en problema de probabilidad, divisiÃ³n entre cero en razonamiento, CoT muy corto para problema avanzado
4. \`parse_math_solution()\`: respuesta correcta verificable, respuesta incorrecta, NO_SOLUTION en boxed, sin boxed pero con nÃºmero al final

Fixtures en \`conftest.py\`: \`sample_basic_problem\`, \`sample_advanced_problem\`, \`sample_correct_solution_text\`, \`sample_incorrect_solution_text\`, \`sample_timeout_response\`.

No llames a APIs. No uses DuckDB en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_math_integration.py: DuckDB en memoria, mock de solve_math_problem con 3 problemas (CORRECTO, INCORRECTO, NO VERIFICABLE) y verificaciÃ³n de contadores de sesiÃ³n."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de integraciÃ³n">
{`Escribe \`tests/test_math_integration.py\`:

1. Carga \`sample_math_problems.json\`
2. DuckDB en memoria
3. Mockea SOLO \`solve_math_problem()\` con una respuesta CoT predefinida que incluye \`\\boxed{42}\` y la respuesta correcta del problema es 42
4. Ejecuta \`math_evaluation_pipeline()\` para 3 problemas del dataset
5. Verifica:
   a. 1 problema evaluado como CORRECTO (respuesta = 42)
   b. 1 problema evaluado como INCORRECTO (mock da respuesta incorrecta)
   c. 1 problema evaluado como NO VERIFICABLE (is_verifiable=False)
   d. La sesiÃ³n en DuckDB tiene: problems_evaluated=3, correct=1, incorrect=1, not_verifiable=1, accuracy=0.5
   e. \`get_model_stats()\` devuelve 1 modelo con los datos correctos

Test adicional: mock que da respuesta no extractable â†’ badge NO VERIFICABLE sin excepciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo con 7 escenarios: GSM8K bÃ¡sico, fracciones en Ã¡lgebra, sin respuesta conocida (badge gris), probabilidad imposible (issue), desconexiÃ³n de red, multi-modelo y persistencia."
        >
          <PromptBlock label="Prompt 6.3 â€” Protocolo manual">
{`Genera el protocolo de prueba manual de Prisma MatemÃ¡tico.

Escenarios:
1. Cargar 10 problemas GSM8K del nivel bÃ¡sico y evaluar 3 de ellos â†’ Â¿El porcentaje de aciertos del modelo es coherente con su score oficial en GSM8K?
2. Introducir manualmente un problema de ecuaciones de segundo grado con respuesta conocida â†’ Â¿La extracciÃ³n numÃ©rica funciona con fracciones?
3. Introducir un problema sin respuesta conocida â†’ Â¿Aparece badge gris sin error?
4. Intentar problema con respuesta imposible (probabilidad = 2.0) â†’ Â¿Se detecta como issue?
5. Desconectar internet â†’ Â¿Aparece el estado de fallback?
6. Evaluar mismo problema con 2 modelos diferentes â†’ Â¿Las estadÃ­sticas reflejan ambos?
7. Verificar que el historial persiste al cerrar y reabrir la app

SeÃ±ales de que estÃ¡ listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Comando PyInstaller, inclusiÃ³n de sample_math_problems.json y gsm8k_problems.json, consideraciÃ³n de sympy en el bundle e instrucciones para .env externo."
        >
          <PromptBlock label="Prompt 6.4 â€” PyInstaller">
{`Instrucciones de empaquetado para Prisma MatemÃ¡tico.

Dependencias: flet, duckdb, pydantic, httpx, python-dotenv
Archivos de datos: \`sample_math_problems.json\`, \`data_math/raw/gsm8k_problems.json\`
El \`.env\` NO se incluye.

Genera:
1. Comando de empaquetado (PyInstaller o flet build segÃºn documentaciÃ³n oficial) [VERIFICAR EN DOCUMENTACIÃ“N DE FLET Y PYINSTALLER el mÃ©todo recomendado]
2. CÃ³mo incluir los archivos JSON de problemas en el ejecutable
3. Problema conocido: sympy puede ser difÃ­cil de empaquetar con PyInstaller [VERIFICAR EN DOCUMENTACIÃ“N DE SYMPY y PyInstaller si hay issues conocidos]
4. Alternativa: si no usas sympy, documenta por quÃ© \`extract_numeric_answer\` no lo necesita para la v1
5. Instrucciones para configurar la API key sin modificar el ejecutable`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="Checklist en VM sin Python ni sympy instalados, persistencia DuckDB en Windows y actualizaciÃ³n de problemas GSM8K sin reinstalar."
        >
          <PromptBlock label="Prompt 6.5 â€” Prueba en mÃ¡quina limpia">
{`Protocolo de prueba del ejecutable de Prisma MatemÃ¡tico en entorno limpio.

1. Entorno: VM Windows o macOS sin Python ni sympy instalados
2. Archivos necesarios junto al .exe: \`.env\`, Â¿archivos JSON de problemas?
3. Checklist:
   - La app abre y muestra la pantalla de EvaluaciÃ³n
   - Se puede cargar un problema del dataset GSM8K
   - El modelo responde y aparece el badge de resultado
   - Las estadÃ­sticas se actualizan correctamente
   - El historial persiste tras cerrar y reabrir
4. Errores comunes de Flet/DuckDB en Windows y soluciones [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
5. CÃ³mo el usuario actualiza los archivos de problemas GSM8K sin reinstalar la app (\`.env\`)`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.cyan}
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar v2 con Arena de 3 modelos simultÃ¡neos, soporte de problemas AIME y reportes PDF, y publicar en el Foro de Proyectos Horizon."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog estructurado: Arena 3 modelos en paralelo, problemas AIME (alta dificultad), grÃ¡fico de evoluciÃ³n de accuracy por sesiÃ³n y reporte comparativo PDF."
        >
          <PromptBlock label="Prompt 7.A â€” Planificar v2">
{`Prisma MatemÃ¡tico v1 estÃ¡ funcionando. Planifica la v2.

Ideas para v2:
- Comparar 3 modelos en el mismo problema en paralelo
- Soporte para problemas AIME (formato diferente y mayor dificultad)
- GrÃ¡fico de evoluciÃ³n de accuracy por sesiÃ³n
- Exportar informe PDF de comparativa de modelos

Para cada idea:
1. Â¿QuÃ© capa del mapa 1-6 afecta?
2. Â¿Requiere cambios en el esquema DuckDB? (migraciÃ³n de datos)
3. Complejidad y prioridad

Genera el Backlog v2 en formato tabla:
| Funcionalidad | Capa afectada | MigraciÃ³n DB | Complejidad | Prioridad |`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha completa de lanzamiento para Horizon: tÃ­tulo, Ã¡rea temÃ¡tica, capturas requeridas, feedback buscado y preguntas de debate para la comunidad."
        >
          <PromptBlock label="Prompt 7.B â€” Publicar en Foro">
{`Genera la ficha de publicaciÃ³n de Prisma MatemÃ¡tico para el Foro Horizon.

1. TÃ­tulo: "Prisma MatemÃ¡tico v1 â€” [SUBTÃTULO]"
2. Ãrea: MatemÃ¡ticas & Procesos Complejos
3. DescripciÃ³n (mÃ¡x 150 palabras)
4. Capturas: badge CORRECTO con CoT, pantalla de estadÃ­sticas, historial
5. Instrucciones de instalaciÃ³n
6. QuÃ© feedback busco: Â¿tipos de problemas que fallan? Â¿modelos adicionales?
7. Pregunta para la comunidad: ej. "Â¿HabÃ©is encontrado casos donde \`extract_numeric_answer\` falla con una respuesta del LLM? Â¿QuÃ© formato usÃ³ el modelo?"`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Resultado esperado â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(59,111,212,0.05)", borderColor: "rgba(59,111,212,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sigma size={16} style={{ color: C.accent }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.accent }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1â€“6 + Fase 7), tendrÃ¡s un <strong>ejecutable de Prisma MatemÃ¡tico</strong> que evalÃºa el razonamiento matemÃ¡tico de cualquier LLM disponible por API, con verificaciÃ³n automÃ¡tica de respuestas numÃ©ricas, detecciÃ³n de posibles issues en el razonamiento, historial completo de evaluaciones almacenado con estadÃ­sticas de accuracy por modelo y nivel de dificultad.
          </p>
          <div className="flex flex-wrap gap-3 justify-start mt-6">
            <Link to="/comunidad/aplicaciones"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: C.accent, color: "white" }}>
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

