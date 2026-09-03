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
import { Code2 } from "lucide-react";
import { ShieldAlert } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio IngenierÃ­a (data_engineering/rankings/) Â· HumanEval Â· MBPP Â· SWE-Bench", motivo: "Verificar scores reales en generaciÃ³n de cÃ³digo antes de elegir el modelo." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Decidir quÃ© lenguajes y tipos de tarea cubre la v1 antes de tocar cÃ³digo." },
  { capa: "2", subcapa: "2.1", herramienta: "data_engineering/raw/ Â· openai/human-eval [VERIFICAR DOCS]", motivo: "DesafÃ­os HumanEval ya descargados por el motor Horizon." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para CodingChallenge, GeneratedCode, ExecutionResult y CodingEvaluation." },
  { capa: "2", subcapa: "2.3", herramienta: "ast (stdlib)", motivo: "Verificar sintaxis Python sin ejecutarlo; anÃ¡lisis de docstring, type hints y LOC." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de evaluaciones con mÃ©tricas de calidad y vistas de comparativa por modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual", motivo: "10 desafÃ­os con tests unitarios para desarrollo y pruebas offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_engineering/rankings/", motivo: "Seleccionar el modelo con mayor pass@1 en HumanEval segÃºn el ranking actualizado." },
  { capa: "3", subcapa: "3.2", herramienta: "Few-shot prompting", motivo: "Dar ejemplos de formato esperado: cÃ³digo + docstring + type hints + tests." },
  { capa: "3", subcapa: "3.3", herramienta: "re (regex) Â· ast", motivo: "Extraer el bloque de cÃ³digo del texto del LLM con validaciÃ³n de sintaxis." },
  { capa: "3", subcapa: "3.4", herramienta: "subprocess con timeout", motivo: "Ejecutar cÃ³digo en proceso aislado para no afectar la app principal." },
  { capa: "3", subcapa: "3.5", herramienta: "ast Â· anÃ¡lisis manual", motivo: "AnÃ¡lisis de calidad: docstring, type hints, LOC, quality score 0-100." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Si el LLM o el sandbox fallan, devuelve CodingEvaluation vÃ¡lida con estado descriptivo." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir 3 pantallas (GeneraciÃ³n, Comparativa, Historial) antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "CÃ³digo en fuente monospace con scroll, badges de resultado y navegaciÃ³n entre pantallas." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "Conectar botÃ³n Generar con el pipeline; logging de sandbox y configuraciÃ³n centralizada." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de extracciÃ³n de cÃ³digo, anÃ¡lisis de calidad y test de integraciÃ³n con sandbox real." },
  { capa: "6", subcapa: "6.3", herramienta: "Prompts de ingenierÃ­a reales", motivo: "7 escenarios de prueba manual incluyendo timeout de sandbox y modo offline." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible; decisiÃ³n documentada sobre Python en el sandbox." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Validar el ejecutable en entorno limpio; verificar comportamiento del sandbox." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar comparativas de modelos en generaciÃ³n de cÃ³digo y planificar v2 con soporte SQL." },
];

// â”€â”€â”€ Phases overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "InvestigaciÃ³n",          summary: "Benchmarks de cÃ³digo (HumanEval, MBPP, SWE-Bench) y riesgos de ejecutar cÃ³digo generado por LLM." },
  { id: "1", label: "Capa 1", name: "DefiniciÃ³n",              summary: "Perfil de usuario, problema, inputs/outputs, criterios de Ã©xito y lÃ­mites de la v1 (solo Python, sandbox bÃ¡sico)." },
  { id: "2", label: "Capa 2", name: "Datos",                   summary: "Carga de HumanEval, esquemas Pydantic, extracciÃ³n de cÃ³digo, DuckDB y dataset de 10 desafÃ­os." },
  { id: "3", label: "Capa 3", name: "LÃ³gica / IA",             summary: "SelecciÃ³n del modelo, prompt few-shot, llamada + extracciÃ³n, sandbox, anÃ¡lisis de calidad y fallback." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",         summary: "3 pantallas: GeneraciÃ³n, Comparativa, Historial. CÃ³digo monospace, badges y advertencia de sandbox." },
  { id: "5", label: "Capa 5", name: "IntegraciÃ³n",             summary: "Pipeline completo, errores en cascada, logging separado para sandbox y configuraciÃ³n centralizada." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",   summary: "Tests unitarios, test de integraciÃ³n con sandbox real, prueba manual y ejecutable con PyInstaller." },
  { id: "7", label: "Fase 7", name: "IteraciÃ³n",               summary: "Publicar en el Foro de Proyectos y planificar v2 con soporte SQL y sandbox Docker." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Multi-lenguaje",
    area: "JavaScript + SQL",
    title: "Construtor Multi â€” Soporte para JS y SQL",
    desc: "Extiende el sandbox para ejecutar JavaScript con Node.js y consultas SQL con DuckDB como ejecutor, aÃ±adiendo dos nuevos lenguajes al dropdown de la pantalla de GeneraciÃ³n.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el lenguaje de entrada ya no es solo Python; el usuario elige Python / JS / SQL",
      "Capa 2: campo language en CodingChallenge con Literal['python', 'javascript', 'sql']",
      "Capa 3: el sandbox detecta el lenguaje y llama a 'node' o ejecuta SQL en DuckDB en memoria",
      "Capa 3: el prompt central cambia segÃºn el lenguaje (few-shots especÃ­ficos por lenguaje)",
      "Capa 4: el panel de cÃ³digo muestra el lenguaje seleccionado en el badge de resultado",
      "Capa 6: dataset ampliado con 5 desafÃ­os por lenguaje; tests de integraciÃ³n para JS y SQL",
    ],
  },
  {
    tag: "v3 Â· Sandbox seguro",
    area: "Aislamiento con Docker",
    title: "Construtor Secure â€” Sandbox con contenedores",
    desc: "Reemplaza el subprocess bÃ¡sico por un contenedor Docker efÃ­mero para cada ejecuciÃ³n: sin acceso a red, sin acceso al sistema de archivos del host, con lÃ­mite de memoria y CPU.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: el sandbox Docker es un requisito de instalaciÃ³n; documentar en los lÃ­mites de v1",
      "Capa 3: execute_in_sandbox() usa docker run --rm --network=none con volumenes temporales",
      "Capa 3: el timeout ahora es doble: timeout de Docker + timeout de subprocess externo",
      "Capa 4: badge adicional 'Sandbox Seguro' cuando Docker estÃ¡ disponible",
      "Capa 5: config.py aÃ±ade CONSTRUTOR_DOCKER_IMAGE y CONSTRUTOR_MEM_LIMIT",
      "Advertencia: Docker debe estar instalado en el equipo del usuario",
    ],
  },
  {
    tag: "v4 Â· Comparativa paralela",
    area: "3 modelos simultÃ¡neos",
    title: "Construtor Arena â€” Torneo de modelos",
    desc: "EnvÃ­a el mismo desafÃ­o a 3 modelos en paralelo (asyncio.gather), muestra los tres resultados en columnas y calcula un ranking automÃ¡tico por quality_score.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: el usuario configura 3 API keys (o selecciona 3 modelos del mismo proveedor)",
      "Capa 3: generate_and_execute_with_fallback() se lanza 3 veces con asyncio.gather",
      "Capa 3: ranking_models(): ordena los 3 resultados por quality_score y declara ganador",
      "Capa 4: pantalla Arena con 3 columnas de cÃ³digo + badges side-by-side",
      "Capa 4: banner 'Ganador: [MODELO]' con quality_score mÃ¡s alto",
      "Capa 5: el pipeline paralelo maneja fallos individuales sin cancelar los otros dos",
    ],
  },
];

// â”€â”€â”€ Sandbox security banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SandboxBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(220,38,38,0.04)", borderColor: "rgba(220,38,38,0.20)" }}>
      <ShieldAlert size={18} className="shrink-0 mt-0.5" style={{ color: C.red }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(153,27,27,0.85)" }}>
        <strong>Advertencia de seguridad permanente:</strong> Construtor IA ejecuta cÃ³digo Python generado por un LLM en tu equipo. Aunque se aplica un timeout configurable, el sandbox de la v1 <strong>no aÃ­sla completamente el proceso</strong>. Revisa siempre el cÃ³digo antes de ejecutarlo y nunca uses la app con datos sensibles en el mismo directorio.
      </p>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaIngenieria() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(59,111,212,0.10)", color: C.accent }}>
            IngenierÃ­a & Arquitectura Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Construtor IA
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que genera cÃ³digo Python con el LLM lÃ­der en HumanEval, lo ejecuta en un sandbox con timeout configurable, y produce un informe de calidad con mÃ©tricas objetivas: tests pasados, docstring, type hints y quality score 0â€“100.
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

        {/* Security banner */}
        <SandboxBanner />

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
                  <strong>Â¿Por quÃ© Flet y no PyQt o Tkinter?</strong> Mostrar cÃ³digo fuente con scroll y fuente monospace es sencillo en Flet con ft.Text y la propiedad font_family. Para syntax highlighting avanzado en v2 se podrÃ­a considerar un componente WebView, pero en v1 el texto plano con monospace es suficiente para leer el cÃ³digo generado.
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
          desc="Confirmar quÃ© benchmarks evalÃºan generaciÃ³n de cÃ³digo y entender los riesgos reales de ejecutar cÃ³digo generado por un LLM antes de implementar el sandbox."
        />

        <Step 
          num="0.A" 
          title="Benchmarks de generaciÃ³n de cÃ³digo" 
          goal="Identificar HumanEval, MBPP, SWE-Bench; entender la mÃ©trica pass@k; saber quÃ© modelo lidera en el ranking del laboratorio."
        >
          <PromptBlock label="Prompt 0.A â€” Benchmarks de cÃ³digo">
{`ActÃºa como especialista en evaluaciÃ³n de LLMs para generaciÃ³n de cÃ³digo.
Tengo acceso al Laboratorio de IngenierÃ­a de Horizon (data_engineering/rankings/).

RespÃ³ndeme:
1. Â¿QuÃ© benchmarks evalÃºan generaciÃ³n de cÃ³digo en LLMs? (HumanEval, MBPP, SWE-Bench, LiveCodeBench, EvoEval)
2. Â¿QuÃ© mÃ©trica usa HumanEval exactamente? (pass@k: Â¿quÃ© es k=1 vs k=100?)
3. Â¿CuÃ¡l es el modelo con mayor pass@1 en HumanEval segÃºn data_engineering/rankings/latest_rankings_engineering.json?
4. Â¿Hay diferencia significativa entre modelos en SWE-Bench (bugs reales) vs HumanEval (algoritmos de libro)?

Cita scores especÃ­ficos del archivo de rankings. No inventes datos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Riesgos de ejecutar cÃ³digo generado por LLM" 
          goal="Documentar quÃ© protecciones ofrece subprocess, quÃ© alternativas existen y quÃ© nivel de sandbox es razonable para la v1."
        >
          <PromptBlock label="Prompt 0.B â€” Riesgos del sandbox">
{`Construtor IA ejecutarÃ¡ cÃ³digo Python generado por un LLM en el equipo del usuario.

Antes de implementar el sandbox, necesito entender los riesgos:
1. Â¿QuÃ© tipos de cÃ³digo malicioso podrÃ­a generar un LLM aunque se le pida resolver un problema algorÃ­tmico? (ej. acceso a sistema de archivos, conexiones de red, fork bombs)
2. Â¿QuÃ© protecciones ofrece subprocess.run() con timeout? Â¿Es suficiente para aislar el cÃ³digo o necesito algo mÃ¡s robusto?
3. Â¿CuÃ¡les son las alternativas mÃ¡s seguras para ejecutar cÃ³digo Python aislado en una app de escritorio? (RestrictedPython, PyPy sandboxing, Docker) [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL de cada opciÃ³n]
4. Para la v1 con usuario tÃ©cnico (desarrollador): Â¿quÃ© nivel de sandbox es razonable implementar sin aÃ±adir demasiada complejidad?

Esta decisiÃ³n de seguridad debe documentarse explÃ­citamente en la v1.`}
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
          desc="Decidir exactamente quÃ© construyes: quiÃ©n lo usa, quÃ© mÃ©tricas de calidad importan, quÃ© entra, quÃ© sale y quÃ© NO cubre la v1."
        />

        <Step 
          num="1.1" 
          title="Â¿QuiÃ©n usa esta app?" 
          goal="Ficha de usuario con rol tÃ©cnico, tipos de cÃ³digo que necesita generar, nivel de lectura de cÃ³digo y mÃ©tricas que le importan."
        >
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario">
{`Define el perfil de usuario de Construtor IA.

La app genera cÃ³digo con LLMs, lo ejecuta en sandbox y reporta calidad.

[DESCRIBE AQUÃ TU USUARIO OBJETIVO: ej. "desarrollador Python junior que quiere comparar GPT-4o vs Claude 3.7 Sonnet en problemas de algoritmos antes de elegir cuÃ¡l usar en su empresa" o "profesor de programaciÃ³n que evalÃºa quÃ© LLM puede recomendar como tutor de sus estudiantes"]

Genera la ficha con:
- Nombre ficticio y rol tÃ©cnico
- QuÃ© hace actualmente sin la app
- QuÃ© tipos de cÃ³digo necesita generar (algoritmos, funciones utilitarias, SQL, etc.)
- Nivel tÃ©cnico (Â¿puede leer cÃ³digo Python? Â¿hace code review?)
- CuÃ¡ntas generaciones quiere evaluar por sesiÃ³n
- QuÃ© mÃ©tricas le importan: Â¿que funcione?, Â¿que sea eficiente?, Â¿que estÃ© bien documentado?

Esta informaciÃ³n determina quÃ© anÃ¡lisis de calidad implementar en la v1.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="Â¿QuÃ© problema concreto resuelve?" 
          goal="Una sola frase en formato [ROL] + [TAREA] + [OBSTÃCULO] + [CONSECUENCIA]. Â¿Usar cÃ³digo de forma mÃ¡s informada, aprender, o ambas?"
        >
          <PromptBlock label="Prompt 1.2 â€” Frase del problema">
{`BasÃ¡ndome en el perfil ([PEGA EL RESUMEN DEL PERFIL]),
escribe UNA SOLA FRASE del problema que Construtor IA resuelve.

Formato: "[ROL] no puede [TAREA] porque [OBSTÃCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes y elige la mÃ¡s precisa.

AdemÃ¡s, aclara: Â¿la app ayuda al usuario a USAR cÃ³digo de LLMs de forma mÃ¡s informada, o a APRENDER a programar con feedback inmediato, o ambas?
Esto afecta quÃ© tan tÃ©cnicos deben ser los reportes de calidad.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="Â¿QuÃ© datos entran?" 
          goal="Lista completa de inputs: prompt, desafÃ­o HumanEval, modelo, lenguaje, test cases, sandbox on/off y timeout de ejecuciÃ³n."
        >
          <PromptBlock label="Prompt 1.3 â€” Inputs de la app">
{`Para Construtor IA, define todos los datos de entrada.

El usuario puede:
- Introducir un prompt tÃ©cnico (descripciÃ³n del problema a resolver con cÃ³digo)
- Cargar un desafÃ­o del dataset HumanEval local
- Seleccionar el modelo LLM
- Elegir el lenguaje de programaciÃ³n: [Python en v1; otros en v2]
- Opcionalmente: definir casos de test que el cÃ³digo debe pasar
- Elegir si quiere ejecuciÃ³n en sandbox (puede desactivarla por seguridad)

Genera la lista completa de inputs con tipo, restricciones y valor por defecto.

Incluye el parÃ¡metro "timeout de ejecuciÃ³n" (segundos antes de matar el proceso) y documenta por quÃ© es importante para seguridad.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="Â¿QuÃ© sale?" 
          goal="Outputs: cÃ³digo generado, resultado del sandbox, tests pasados/fallados, anÃ¡lisis de calidad (docstring, type hints, LOC, quality score), historial."
        >
          <PromptBlock label="Prompt 1.4 â€” Outputs de la app">
{`Define todos los outputs de Construtor IA para cada generaciÃ³n.

La app debe producir:
1. El cÃ³digo generado por el LLM (formateado, con syntax indication)
2. Resultado de la ejecuciÃ³n en sandbox: Ã©xito / error + traceback
3. Si hay tests definidos: cuÃ¡ntos pasaron vs. fallaron
4. AnÃ¡lisis bÃ¡sico de calidad:
   - Â¿Tiene docstring? (SÃ­/No)
   - Â¿Tiene type hints? (SÃ­/No)
   - NÃºmero de lÃ­neas de cÃ³digo (LOC)
   - Complejidad ciclomÃ¡tica estimada (si se implementa)
5. Pass/Fail badge (PASA / FALLA / ERROR DE EJECUCIÃ“N / NO EJECUTADO)
6. Historial de generaciones del mismo prompt con distintos modelos

Para cada output: formato, cuÃ¡ndo se genera, si se guarda en DuckDB.
[AÃ‘ADE OUTPUTS ADICIONALES QUE NECESITES]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de Ã©xito" 
          goal="7â€“8 criterios verificables: extracciÃ³n de cÃ³digo, timeout de sandbox, seguridad documentada, detecciÃ³n de docstring y rendimiento."
        >
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`Define los criterios de Ã©xito de Construtor IA v1.

Incluye criterios para:
- ExtracciÃ³n de cÃ³digo del LLM (ej. "extrae el bloque de cÃ³digo correctamente en >= 90% de las respuestas del modelo elegido")
- EjecuciÃ³n en sandbox (ej. "mata el proceso si supera el timeout configurado, sin bloquear la UI")
- Seguridad (ej. "el sandbox no permite que el cÃ³digo generado acceda a rutas fuera del directorio temporal asignado") [VERIFICAR si es tÃ©cnicamente factible con subprocess en v1 o si esta limitaciÃ³n se documenta explÃ­citamente]
- AnÃ¡lisis de calidad (ej. "detecta presencia/ausencia de docstring en 100% de los casos")
- Rendimiento (ej. "el cÃ³digo se genera y ejecuta en < 60s para prompts simples")

7-8 criterios. Ninguno vago.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="LÃ­mites explÃ­citos de la v1" 
          goal="Solo Python, sandbox no completamente aislado, sin pip install en sandbox. Advertencia de seguridad para la primera activaciÃ³n."
        >
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites de la v1">
{`Define los lÃ­mites explÃ­citos de Construtor IA v1.

LÃ­mites tÃ©cnicos obligatorios:
1. Solo Python en v1 (no JavaScript, SQL, C++)
2. El sandbox NO es un entorno completamente aislado; documenta exactamente quÃ© puede y no puede hacer el cÃ³digo generado
3. No se soportan dependencias externas en el cÃ³digo generado (no se puede hacer pip install en el sandbox)
4. El anÃ¡lisis de complejidad es estimado (conteo de bucles), no formal

Para cada lÃ­mite:
- Por quÃ© existe en v1
- Riesgo si se ignora
- CÃ³mo gestionarlo: mensaje claro al usuario o bloqueo tÃ©cnico

Genera tambiÃ©n la advertencia de seguridad que aparece la primera vez que el usuario activa la ejecuciÃ³n en sandbox:
"Al activar la ejecuciÃ³n, el cÃ³digo generado por el LLM se ejecutarÃ¡ en tu equipo. Aunque se aplican restricciones bÃ¡sicas, revisa el cÃ³digo antes de ejecutarlo."`}
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
          desc="Carga de desafÃ­os HumanEval, esquemas Pydantic, extracciÃ³n y anÃ¡lisis de cÃ³digo con ast, almacenamiento DuckDB y dataset de 10 desafÃ­os de ejemplo."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_humaneval_challenges() desde JSONL y create_manual_challenge() para entrada libre. Manejo de FileNotFoundError descriptivo."
        >
          <PromptBlock label="Prompt 2.1 â€” Fuente de datos">
{`Implementa la carga de desafÃ­os de programaciÃ³n para Construtor IA.

Fuente 1 (local): desafÃ­os HumanEval en \`data_engineering/raw/humaneval.json\`
Formato HumanEval: \`task_id\`, \`prompt\`, \`canonical_solution\`, \`test\` (cÃ³digo Python con assert statements), \`entry_point\` (nombre de la funciÃ³n a generar).

Escribe:
1. \`load_humaneval_challenges(file_path: str, limit: int = 20) -> list[CodingChallenge]\`:
   - Carga los desafÃ­os HumanEval
   - Extrae el nombre de la funciÃ³n (\`entry_point\`), el prompt y los tests
   - Maneja el archivo JSONL (una lÃ­nea por desafÃ­o) si es ese el formato
   - Lanza \`FileNotFoundError\` descriptivo si no existe

2. \`create_manual_challenge(prompt: str, test_code: Optional[str]) -> CodingChallenge\`:
   - Crea un desafÃ­o desde entrada manual
   - Si no hay \`test_code\`: \`is_auto_testable=False\`

Usa \`pathlib\`. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="CodingChallenge, GeneratedCode, ExecutionResult con status Literal, y CodingEvaluation. Pydantic v2, docstrings en todos los modelos."
        >
          <PromptBlock label="Prompt 2.2 â€” Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Construtor IA.

1. \`CodingChallenge\`:
   - \`challenge_id\`: str
   - \`prompt\`: str (descripciÃ³n del problema)
   - \`function_name\`: Optional[str] (nombre de la funciÃ³n a implementar)
   - \`test_code\`: Optional[str] (cÃ³digo Python con asserts para validar)
   - \`source\`: Literal["humaneval", "manual"]
   - \`language\`: Literal["python"] (solo Python en v1)
   - \`difficulty\`: Literal["easy", "medium", "hard"]
   - \`is_auto_testable\`: bool

2. \`GeneratedCode\`:
   - \`challenge_id\`: str
   - \`model_name\`: str
   - \`raw_llm_response\`: str
   - \`extracted_code\`: Optional[str]
   - \`has_docstring\`: bool
   - \`has_type_hints\`: bool
   - \`loc\`: int (lines of code, excluyendo comentarios y docstring)
   - \`generated_at\`: datetime

3. \`ExecutionResult\`:
   - \`challenge_id\`: str
   - \`model_name\`: str
   - \`status\`: Literal["PASS", "FAIL", "SYNTAX_ERROR", "TIMEOUT", "NOT_EXECUTED"]
   - \`tests_passed\`: Optional[int]
   - \`tests_total\`: Optional[int]
   - \`error_message\`: Optional[str]
   - \`execution_time_seconds\`: Optional[float]

4. \`CodingEvaluation\`:
   - \`code\`: GeneratedCode
   - \`result\`: ExecutionResult

Pydantic v2. Docstrings en todos los modelos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ExtracciÃ³n de cÃ³digo y anÃ¡lisis bÃ¡sico" 
          goal="extract_code_block() con regex + ast.parse(), y analyze_code_quality() para has_docstring, has_type_hints y LOC. Sin dependencias externas."
        >
          <PromptBlock label="Prompt 2.3 â€” ExtracciÃ³n y anÃ¡lisis">
{`Implementa la extracciÃ³n del bloque de cÃ³digo de la respuesta del LLM.

Escribe \`extract_code_block(llm_response: str) -> Optional[str]\` que:
1. Busca bloques de cÃ³digo en markdown: \`\`\`python ... \`\`\` o \`\`\` ... \`\`\`
2. Si hay mÃºltiples bloques: devuelve el mÃ¡s largo (probablemente es la soluciÃ³n)
3. Si no hay bloques markdown: intenta extraer texto que empiece con "def " o "class " y sigue con indentaciÃ³n Python
4. Valida la sintaxis del cÃ³digo extraÃ­do con \`ast.parse()\` (stdlib)
5. Si \`ast.parse()\` lanza \`SyntaxError\`: devuelve el cÃ³digo igualmente pero marca el error para el \`ExecutionResult\` (\`status=SYNTAX_ERROR\`)
6. Devuelve \`None\` si no puede extraer ningÃºn bloque

Escribe tambiÃ©n \`analyze_code_quality(code: str) -> dict\` que:
- \`has_docstring\`: verifica si la primera instrucciÃ³n del cuerpo es un string literal
- \`has_type_hints\`: verifica si la firma de la funciÃ³n contiene ":"
- \`loc\`: cuenta lÃ­neas no vacÃ­as y no comentarios
- Devuelve dict con estos 3 campos

No uses radon ni otras dependencias externas para el anÃ¡lisis bÃ¡sico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_engineering_db(), store_evaluation(), get_model_code_stats() y get_challenge_history(). Vistas de comparativa por modelo."
        >
          <PromptBlock label="Prompt 2.4 â€” DuckDB">
{`Crea la capa de persistencia de Construtor IA con DuckDB.

1. \`init_engineering_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`coding_challenges\`, \`generated_codes\`, \`execution_results\`
   - Vista: \`vw_model_code_quality\` (\`model_name\`, \`total\`, \`pass_rate\`, \`avg_loc\`, \`docstring_rate\`)
   - Vista: \`vw_challenge_comparison\` (\`challenge_id\`, \`model_name\`, \`status\`, \`tests_passed\`)

2. \`store_evaluation(conn, evaluation: CodingEvaluation) -> str\`:
   - Guarda cÃ³digo + resultado como unidad
   - Devuelve \`evaluation_id\`

3. \`get_model_code_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - EstadÃ­sticas de calidad de cÃ³digo por modelo

4. \`get_challenge_history(conn, challenge_id: str) -> list[dict]\`:
   - Todas las evaluaciones de un mismo desafÃ­o con distintos modelos

Maneja excepciones DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="10 desafÃ­os Python (4 fÃ¡ciles, 3 medios, 3 difÃ­ciles) con tests verificables. Compatible con CodingChallenge de Pydantic."
        >
          <PromptBlock label="Prompt 2.5 â€” Dataset de ejemplo">
{`Genera el dataset de ejemplo para Construtor IA.

Archivo \`sample_coding_challenges.json\` con 10 desafÃ­os Python:
- 4 fÃ¡ciles (funciÃ³n para invertir una lista, suma de dÃ­gitos, factorial, FizzBuzz)
- 3 medios (bÃºsqueda binaria, Ã¡rbol de Fibonacci con memoizaciÃ³n, anagramas)
- 3 difÃ­ciles (algoritmo de Dijkstra simplificado, cachÃ© LRU bÃ¡sico, merge sort)

Para cada desafÃ­o:
- \`prompt\`: descripciÃ³n clara del problema
- \`function_name\`: nombre exacto de la funciÃ³n (\`entry_point\`)
- \`test_code\`: cÃ³digo Python con 3-5 asserts que verifican la funciÃ³n (el test_code importa la funciÃ³n por su entry_point y la prueba con valores conocidos)
- \`difficulty\` y \`is_auto_testable\`: \`true\` para todos

Los tests deben ser verificables: \`assert factorial(5) == 120\`, etc.

Incluye el cÃ³digo Python para cargar y validar con \`CodingChallenge\`.`}
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
          desc="SelecciÃ³n del modelo, prompt few-shot, llamada + extracciÃ³n, sandbox con subprocess, anÃ¡lisis de quality score y fallback cuando falla el LLM o el sandbox."
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Modelo con mayor pass@1 en HumanEval segÃºn el ranking del laboratorio. Verificar que genera bloques markdown, lÃ­mite de contexto y API disponible."
        >
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`Para Construtor IA, necesito el LLM con mejor pass@1 en HumanEval.

SegÃºn \`data_engineering/rankings/latest_rankings_engineering.json\`:
- Modelo #1 en HumanEval pass@1: [MODELO Y SCORE]
- Modelo #1 en MBPP: [MODELO Y SCORE]

Confirma:
1. Â¿El modelo elegido genera cÃ³digo Python funcional en un bloque markdown? (algunos modelos dan cÃ³digo en texto sin bloques, dificultando la extracciÃ³n)
2. Â¿Tiene lÃ­mite de contexto suficiente para el prompt + cÃ³digo generado (prompts HumanEval pueden ser largos)?
3. Â¿API pÃºblica? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
4. Alternativa open-source: Â¿DeepSeek-Coder, CodeLlama o similar estÃ¡ disponible con API? [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]

Justifica la elecciÃ³n. Cita el pass@1 exacto del benchmark.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="DiseÃ±o del prompt central (few-shot)" 
          goal="Few-shot con formato de respuesta esperada: cÃ³digo en bloque Python, docstring, type hints, comentario del algoritmo, sin dependencias externas."
        >
          <PromptBlock label="Prompt 3.2 â€” Prompt central (few-shot)">
{`DiseÃ±a el prompt maestro de Construtor IA para generaciÃ³n de cÃ³digo.

El prompt debe:
1. Pedir al modelo que genere ÃšNICAMENTE el cÃ³digo Python en un bloque \`\`\`python (sin texto adicional antes ni despuÃ©s del bloque)
2. Incluir docstring con: descripciÃ³n, argumentos, valor de retorno, ejemplo
3. Incluir type hints en la firma de la funciÃ³n
4. Incluir al menos 1 comentario inline explicando el algoritmo principal
5. No importar librerÃ­as externas (solo stdlib Python)
6. Si el problema no se puede resolver solo con stdlib: indicar explÃ­citamente quÃ© librerÃ­a necesitarÃ­a en un comentario al inicio

System prompt: desarrollador senior Python que genera cÃ³digo limpio y legible.
User prompt: plantilla con \`{{NOMBRE_FUNCIÃ“N}}\`, \`{{DESCRIPCIÃ“N_PROBLEMA}}\`, \`{{TESTS_DE_REFERENCIA}}\` (los tests que debe pasar, para que el modelo los use como spec).

Genera ambos. Incluye un ejemplo de entrada/salida del prompt completo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo y extracciÃ³n de cÃ³digo" 
          goal="generate_code() con temperatura 0.2, retry 2 intentos, timeout 45s. prepare_generated_code() que extrae cÃ³digo y construye GeneratedCode completo."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada + extracciÃ³n">
{`Implementa \`generate_code(challenge: CodingChallenge, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Temperatura: 0.2 (cÃ³digo debe ser consistente; algo de variaciÃ³n para creatividad)
3. Max tokens: 1500 (suficiente para funciÃ³n + docstring + comentarios)
4. Llama a la API de [MODELO] [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL los parÃ¡metros]
5. Mide el tiempo de generaciÃ³n
6. Retry 2 intentos (espera 5s entre intentos)
7. Timeout: 45 segundos
8. Devuelve \`(raw_response, tiempo_generacion)\`

Luego implementa el pipeline de extracciÃ³n:
\`prepare_generated_code(raw_response: str, challenge: CodingChallenge, model_name: str, gen_time: float) -> GeneratedCode\` que:
- Llama a \`extract_code_block()\`
- Llama a \`analyze_code_quality()\` si hay cÃ³digo extraÃ­do
- Construye el objeto \`GeneratedCode\` completo

API key desde \`CONSTRUTOR_LLM_API_KEY\`. Log con: \`model_name\`, \`challenge_id\`, \`gen_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="EjecuciÃ³n en sandbox" 
          goal="execute_in_sandbox() con subprocess + timeout. Archivo temporal, captura de stdout/stderr, limpieza garantizada. Documentar quÃ© NO protege el sandbox."
        >
          <PromptBlock label="Prompt 3.4 â€” Sandbox subprocess">
{`Esta es la funciÃ³n mÃ¡s crÃ­tica de Construtor IA desde el punto de vista de seguridad.

Implementa \`execute_in_sandbox(code: GeneratedCode, challenge: CodingChallenge, timeout_seconds: int = 10) -> ExecutionResult\` que:

1. Crea un archivo Python temporal en un directorio temporal (\`tempfile.mkdtemp()\`)
2. Escribe en ese archivo: el cÃ³digo generado + los tests de \`challenge.test_code\` (los tests hacen assert sobre la funciÃ³n definida en el cÃ³digo)
3. Ejecuta \`subprocess.run(["python", archivo_temp], timeout=timeout_seconds, capture_output=True, text=True)\`
4. Si \`returncode == 0\`: \`status=PASS\`
5. Si \`returncode != 0\` y stderr contiene "AssertionError": \`status=FAIL\`
6. Si \`returncode != 0\` y stderr contiene "SyntaxError": \`status=SYNTAX_ERROR\`
7. Si subprocess lanza \`TimeoutExpired\`: \`status=TIMEOUT\`
8. Limpia el directorio temporal al final (siempre, incluso si hay error)
9. Extrae \`tests_passed\` y \`tests_total\` del output si el \`test_code\` los reporta

IMPORTANTE: documenta en el cÃ³digo quÃ© protecciones tiene y quÃ© NO tiene este sandbox.
Si el cÃ³digo generado hace \`os.system("rm -rf /")\` no hay protecciÃ³n en v1.
El usuario debe ser advertido de esto en la UI (paso 1.6).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="AnÃ¡lisis de calidad" 
          goal="analyze_evaluation(): overall_badge, quality_score 0-100 por reglas fijas y improvement_tips generados por lÃ³gica, no por el LLM."
        >
          <PromptBlock label="Prompt 3.5 â€” AnÃ¡lisis de calidad">
{`AdemÃ¡s del resultado de ejecuciÃ³n, Construtor IA analiza la calidad del cÃ³digo.

Escribe \`analyze_evaluation(code: GeneratedCode, result: ExecutionResult) -> dict\` que genera un resumen de calidad con:

1. \`overall_badge\`: "PASA" (verde) si PASS, "FALLA" (rojo) si FAIL/SYNTAX_ERROR, "TIMEOUT" (naranja), "NO EJECUTADO" (gris)
2. \`quality_score\`: entero 0-100 calculado asÃ­:
   - +40 si \`status=PASS\` (funciona)
   - +20 si \`has_docstring=True\`
   - +20 si \`has_type_hints=True\`
   - +10 si \`execution_time < 1 segundo\` (eficiente)
   - +10 si \`loc <= 30\` (conciso para problemas bÃ¡sicos) o proporcional para medios/difÃ­ciles
3. \`improvement_tips\`: lista de strings con sugerencias concretas:
   - "AÃ±adir docstring para documentar la funciÃ³n"
   - "AÃ±adir type hints para mayor claridad"
   - "El cÃ³digo tarda mÃ¡s de 1 segundo; considera optimizar el algoritmo"
   - (solo si aplica)

Devuelve el dict con estos 3 campos.
Las \`improvement_tips\` no son inventadas por el LLM; se generan por reglas fijas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="generate_and_execute_with_fallback(): siempre devuelve CodingEvaluation vÃ¡lida; nunca lanza excepciÃ³n al usuario final. Fallbacks para API caÃ­da y extracciÃ³n fallida."
        >
          <PromptBlock label="Prompt 3.6 â€” Fallback">
{`Implementa \`generate_and_execute_with_fallback(challenge: CodingChallenge, model_name: str, execute: bool = True) -> tuple[CodingEvaluation, bool]\` que:

1. Intenta \`generate_code()\` + \`prepare_generated_code()\`
2. Si \`execute=True\`: intenta \`execute_in_sandbox()\`
3. Si \`execute=False\`: crea \`ExecutionResult\` con \`status=NOT_EXECUTED\`

Manejo de fallos:
- Si \`generate_code()\` falla (API caÃ­da): \`GeneratedCode\` con \`extracted_code=None\`, \`ExecutionResult\` con \`status=NOT_EXECUTED\` y \`error_message="API no disponible"\`
- Si \`extract_code_block()\` devuelve \`None\`: \`ExecutionResult\` con \`status=SYNTAX_ERROR\` y \`error_message="No se pudo extraer cÃ³digo del LLM"\`
- Si \`execute_in_sandbox()\` falla inesperadamente: \`status=NOT_EXECUTED\` con el error

La UI muestra "GeneraciÃ³n no disponible" cuando el LLM falla.
La ejecuciÃ³n puede fallar de forma independiente (cÃ³digo generado pero no ejecutado).`}
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
          desc="3 pantallas: GeneraciÃ³n con advertencia de sandbox, Comparativa de modelos y Historial. CÃ³digo monospace con scroll y badges de resultado prominentes."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="DescripciÃ³n textual de GeneraciÃ³n, Comparativa e Historial con componentes Flet para cada elemento, antes de escribir cÃ³digo."
        >
          <PromptBlock label="Prompt 4.1 â€” Wireframe">
{`Define el wireframe de Construtor IA con 3 pantallas:

1. Pantalla GeneraciÃ³n (principal):
   - TextField multiline para el prompt tÃ©cnico
   - BotÃ³n "Cargar desafÃ­o HumanEval" (diÃ¡logo con lista)
   - Dropdown: modelo LLM, nivel de dificultad
   - Checkbox "Ejecutar en sandbox" (con nota de seguridad)
   - BotÃ³n "Generar y Evaluar"
   - Panel de resultados (aparece despuÃ©s):
     - CÃ³digo generado en fuente monospace con scroll
     - Badge de resultado (PASA/FALLA/TIMEOUT/NO EJECUTADO)
     - Quality score (0-100) y lista de improvement_tips
     - Output del sandbox (traceback si falla)

2. Pantalla Comparativa:
   - Selector de desafÃ­o del historial
   - Tabla comparando modelos que evaluaron ese mismo desafÃ­o (model_name, status, quality_score, loc, has_docstring)

3. Pantalla Historial:
   - Lista de evaluaciones pasadas con filtros

Para cada elemento: componente Flet y justificaciÃ³n.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="TextField multiline, botÃ³n Cargar HumanEval, Dropdowns de modelo/dificultad, Checkbox sandbox con advertencia expandible y timeout visible condicionalmente."
        >
          <PromptBlock label="Prompt 4.2 â€” Formulario">
{`Implementa el formulario de entrada de Construtor IA con Flet.

Escribe cÃ³digo Flet para:
1. \`ft.TextField\` multiline para el prompt (mÃ­n 3 lÃ­neas, mÃ¡x 1000 chars con contador)
2. \`ft.ElevatedButton\` "Cargar desafÃ­o HumanEval" que abre un diÃ¡logo con la lista
3. \`ft.Dropdown\` para modelo LLM y \`ft.Dropdown\` para dificultad
4. \`ft.Checkbox\` "Ejecutar en sandbox (lee la nota de seguridad)" que al activarse muestra \`ft.Text\` con la advertencia de seguridad del paso 1.6
5. \`ft.TextField\` para el timeout de sandbox (por defecto: 10 segundos)
6. \`ft.ElevatedButton\` "Generar y Evaluar" que llama a \`on_generate_click\`

Todos los controles deben estar en un \`ft.Column\` con scroll.
El timeout solo es visible cuando el sandbox estÃ¡ activado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
          goal="Badge de resultado prominente, cÃ³digo monospace con scroll, traceback en rojo si falla, improvement_tips con iconos y mÃ©tricas en fila horizontal."
        >
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados">
{`Implementa el Ã¡rea de resultados de Construtor IA con Flet.

Recibe \`CodingEvaluation\` y el dict de \`analyze_evaluation()\`.

Genera cÃ³digo Flet para:
1. Badge de resultado prominente (PASA verde, FALLA rojo, TIMEOUT naranja, NO EJECUTADO gris) con el \`quality_score\` como nÃºmero secundario
2. El cÃ³digo extraÃ­do en \`ft.Text\` con \`font_family\` monospace y scroll
   [VERIFICAR EN DOCUMENTACIÃ“N DE FLET cÃ³mo especificar font_family monospace]
   TamaÃ±o reducido (ej. 12px) para que quepan mÃ¡s lÃ­neas
3. Si \`status=FAIL\` o \`SYNTAX_ERROR\`: el \`error_message\` / traceback en \`ft.Text\` con fondo rojo claro, tambiÃ©n monospace
4. Lista de \`improvement_tips\` en \`ft.Column\` con iconos de bombilla o similar
5. MÃ©tricas de calidad en fila horizontal:
   \`LOC: X | Docstring: SÃ­/No | Type hints: SÃ­/No | Tiempo: Xs\`
6. Botones: "Guardar evaluaciÃ³n", "Comparar con otro modelo" (lleva a pantalla Comparativa)

Datos recibidos como parÃ¡metros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="7 estados: inicio sin prompt, generando, ejecutando en sandbox, cÃ³digo no ejecutado, extracciÃ³n fallida, timeout y dataset no encontrado."
        >
          <PromptBlock label="Prompt 4.4 â€” Estados de error">
{`Define los estados excepcionales de Construtor IA.

CÃ³digo Flet para:
1. Sin prompt (inicio): texto guÃ­a + ejemplo de prompt de ingenierÃ­a
2. Generando: \`ProgressRing\` + "Generando cÃ³digo con [MODELO]..."
3. Ejecutando en sandbox: \`ProgressRing\` + "Ejecutando en sandbox (mÃ¡x [N]s)..."
4. CÃ³digo generado pero no ejecutado (sandbox desactivado): Badge "NO EJECUTADO" gris + "Activa el sandbox para verificar el cÃ³digo"
5. LLM no extrajo bloque de cÃ³digo (devolviÃ³ texto sin markdown): Badge "ERROR DE EXTRACCIÃ“N" + \`raw_response\` completa para inspecciÃ³n manual
6. Timeout de sandbox: Badge "TIMEOUT" naranja + "El cÃ³digo tardÃ³ mÃ¡s de [N]s"
7. Dataset HumanEval no encontrado: mensaje con la ruta esperada del archivo`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n entre 3 pantallas" 
          goal="NavigationBar, Comparativa se activa desde resultados con challenge_id, Historial con panel lateral. BotÃ³n Regenerar que limpia y reejecutar."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n">
{`Implementa la navegaciÃ³n de Construtor IA con Flet.

3 pantallas: GeneraciÃ³n, Comparativa, Historial.

Implementa:
1. \`NavigationBar\` con iconos para las 3 pantallas
2. Pantalla Comparativa se llena al hacer clic en "Comparar con otro modelo" desde los resultados (pasa el \`challenge_id\` como contexto)
3. Pantalla Historial: clic en una evaluaciÃ³n muestra el cÃ³digo + resultado en un panel lateral o diÃ¡logo
4. BotÃ³n "Regenerar" en el Ã¡rea de resultados: limpia los resultados y vuelve a ejecutar el mismo prompt con el mismo modelo

Esqueleto completo de la app con las 3 pantallas.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET el sistema de navegaciÃ³n recomendado]`}
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
          desc="Conectar botÃ³n Generar con el pipeline, gestionar errores en cascada, logging separado para el sandbox y configuraciÃ³n centralizada con variables de entorno."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_generate_click(): validaciÃ³n de prompt, advertencia de sandbox en primera activaciÃ³n, async con Flet sin bloquear la UI. Subprocess en hilo separado."
        >
          <PromptBlock label="Prompt 5.1 â€” ConexiÃ³n UI â†” lÃ³gica">
{`Implementa \`on_generate_click(e)\` para Construtor IA que:

1. Valida que el prompt tiene al menos 20 caracteres
2. Si sandbox activado: muestra la advertencia de seguridad con botÃ³n "Entendido" si es la primera vez en esta sesiÃ³n
3. Muestra "Generando cÃ³digo..."
4. Crea el \`CodingChallenge\` con los datos del formulario
5. Llama a \`generate_and_execute_with_fallback(challenge, model_name, execute)\` de forma asÃ­ncrona
6. Llama a \`analyze_evaluation(code, result)\`
7. Actualiza el Ã¡rea de resultados
8. Guarda en DuckDB con \`store_evaluation()\`
9. Si \`is_model_available=False\`: muestra "GeneraciÃ³n no disponible"

Usa \`asyncio\` con Flet. No bloquees el hilo de UI.
El proceso de sandbox corre en subprocess, no en async directamente.
[VERIFICAR EN DOCUMENTACIÃ“N DE FLET cÃ³mo lanzar subprocesos sin bloquear la UI]`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="coding_evaluation_pipeline(): generate â†’ analyze â†’ store â†’ return. Sin lÃ³gica de UI. Log con challenge_id, model_name, status y quality_score."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline completo">
{`Escribe \`coding_evaluation_pipeline(challenge: CodingChallenge, model_name: str, execute_sandbox: bool, timeout: int, conn: duckdb.DuckDBPyConnection) -> tuple[CodingEvaluation, dict]\` que:

1. Genera cÃ³digo con \`generate_and_execute_with_fallback()\`
2. Analiza con \`analyze_evaluation()\`
3. Guarda en DuckDB con \`store_evaluation()\`
4. Devuelve \`(evaluation, quality_analysis)\`

La funciÃ³n no tiene lÃ³gica de UI.
Registra en log: \`challenge_id\`, \`model_name\`, \`status\`, \`quality_score\`, \`gen_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="CodingError enum y CodingException. Regla principal: el pipeline siempre devuelve CodingEvaluation vÃ¡lida, nunca lanza excepciÃ³n al usuario."
        >
          <PromptBlock label="Prompt 5.3 â€” GestiÃ³n de errores">
{`Define el plan de errores en cascada para Construtor IA.

Puntos de fallo:
1. API LLM timeout â†’ \`status=NOT_EXECUTED\`, badge gris
2. No se extrae cÃ³digo â†’ \`status=SYNTAX_ERROR\`, mostrar raw_response
3. Sandbox timeout â†’ \`status=TIMEOUT\`, badge naranja
4. Sandbox error inesperado (excepciÃ³n en Python que lanza el sandbox) â†’ \`status=FAIL\`, mostrar stderr completo
5. DuckDB falla al guardar â†’ mostrar resultados igualmente, log del error
6. HumanEval no encontrado â†’ solo modo manual, mensaje claro

Genera enum \`CodingError\`, excepciÃ³n \`CodingException\`, tabla de decisiones.
Regla principal: "El pipeline siempre devuelve un \`CodingEvaluation\` vÃ¡lido, nunca lanza excepciÃ³n al usuario final."`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging separado para sandbox" 
          goal="engineering_logger.py con evaluations.log y sandbox.log independientes. log_generation(), log_sandbox_execution(), log_quality() y log_error()."
        >
          <PromptBlock label="Prompt 5.4 â€” Logging de sandbox">
{`Escribe \`engineering_logger.py\` para Construtor IA:

1. Dos handlers: \`evaluations.log\` (RotatingFileHandler 5MB) y \`sandbox.log\` (registro especÃ­fico de ejecuciones en sandbox, para auditorÃ­a de seguridad)
2. \`log_generation(challenge_id: str, model_name: str, gen_time: float, code_extracted: bool)\`: registro de la generaciÃ³n
3. \`log_sandbox_execution(challenge_id: str, status: str, exec_time: float, timeout_used: int)\`: registro de cada ejecuciÃ³n en sandbox (importante para detectar si el cÃ³digo generado tiende a hacer timeout)
4. \`log_quality(challenge_id: str, model_name: str, quality_score: int, has_docstring: bool, has_type_hints: bool, loc: int)\`: mÃ©tricas de calidad
5. \`log_error(error_type: str, context: str)\`: errores del sistema

Â¿Por quÃ© un log separado para sandbox? Las ejecuciones de sandbox son potencialmente mÃ¡s sensibles (errores de seguridad, timeouts) y conviene poder analizarlas por separado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py con CONSTRUTOR_LLM_API_KEY, SANDBOX_TIMEOUT, HUMANEVAL_PATH, constantes SANDBOX_WARNING_TEXT y MAX_PROMPT_LENGTH. .env.example completo."
        >
          <PromptBlock label="Prompt 5.5 â€” ConfiguraciÃ³n">
{`Escribe \`config.py\` para Construtor IA:

Variables de entorno:
- \`CONSTRUTOR_LLM_API_KEY\` (obligatoria)
- \`CONSTRUTOR_LLM_MODEL\` (por defecto: [MODELO ELEGIDO])
- \`CONSTRUTOR_DB_PATH\` (por defecto: \`~/.construtor_ia/evaluations.duckdb\`)
- \`CONSTRUTOR_LOG_LEVEL\` (por defecto: \`INFO\`)
- \`CONSTRUTOR_HUMANEVAL_PATH\` (por defecto: \`./data_engineering/raw/humaneval.json\`)
- \`CONSTRUTOR_SANDBOX_TIMEOUT\` (por defecto: 10, segundos)
- \`CONSTRUTOR_LLM_TIMEOUT\` (por defecto: 45, segundos)

Constantes:
- \`SANDBOX_WARNING_TEXT\`: str (el texto completo de la advertencia de seguridad)
- \`MAX_PROMPT_LENGTH\`: int = 1000
- \`MAX_GENERATED_CODE_TOKENS\`: int = 1500

Genera \`.env.example\` completo con comentarios incluyendo la nota de seguridad del sandbox como comentario en la variable \`CONSTRUTOR_SANDBOX_TIMEOUT\`.`}
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
          desc="Tests unitarios de extracciÃ³n y anÃ¡lisis, test de integraciÃ³n con sandbox real (no mockeado), prueba manual con 7 escenarios y ejecutable con PyInstaller."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_engineering_logic.py: extract_code_block(), analyze_code_quality(), analyze_evaluation(). Fixtures en conftest.py. Sin APIs ni sandbox."
        >
          <PromptBlock label="Prompt 6.1 â€” Tests unitarios">
{`Escribe tests unitarios con Pytest para Construtor IA.

Crea \`tests/test_engineering_logic.py\`:
1. \`extract_code_block()\`: bloque \`\`\`python, bloque \`\`\` sin especificar lenguaje, mÃºltiples bloques (toma el mÃ¡s largo), texto con "def " sin bloques markdown, respuesta sin cÃ³digo â†’ \`None\`
2. \`analyze_code_quality()\`: funciÃ³n con docstring+type hints, funciÃ³n vacÃ­a, funciÃ³n con solo comentarios, LOC=0 â†’ LOC mÃ­nimo 1
3. \`analyze_evaluation()\`: PASS+docstring+type_hints â†’ quality_score alto, FAIL â†’ badge FALLA, TIMEOUT â†’ badge TIMEOUT, has_docstring=False â†’ tip de mejora

Fixtures en \`conftest.py\`:
- \`sample_easy_challenge\` (factorial con tests)
- \`sample_llm_response_with_code\` (markdown con bloque Python vÃ¡lido)
- \`sample_llm_response_no_code\` (texto sin bloques)
- \`sample_correct_execution_result\` (PASS, tests_passed=3, tests_total=3)

No llames a APIs. No uses sandbox en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_engineering_integration.py: mock de generate_code(), sandbox real con cÃ³digo correcto, verificaciÃ³n en DuckDB en memoria. Test de extracciÃ³n fallida."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de integraciÃ³n">
{`Escribe \`tests/test_engineering_integration.py\`:

1. Carga \`sample_coding_challenges.json\`
2. DuckDB en memoria
3. Mockea SOLO \`generate_code()\` con una respuesta que contiene cÃ³digo Python vÃ¡lido para el desafÃ­o factorial (la funciÃ³n correcta en markdown)
4. Para el sandbox: usa el cÃ³digo real generado por el mock (cÃ³digo correcto) y ejecuta el sandbox real (esto es un test de integraciÃ³n real, no mockeado)
   [VERIFICAR: asegÃºrate de que los tests de integraciÃ³n tienen un sandbox limpio]
5. Verifica:
   a. El cÃ³digo fue extraÃ­do correctamente
   b. El sandbox ejecutÃ³ y devolviÃ³ \`status=PASS\`
   c. La evaluaciÃ³n fue guardada en DuckDB
   d. \`get_model_code_stats()\` refleja 1 evaluaciÃ³n con PASS

Test adicional: mock que devuelve texto sin bloque de cÃ³digo â†’ \`status=SYNTAX_ERROR\` sin excepciÃ³n en el pipeline.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="7 escenarios: factorial de HumanEval, prompt manual, comparativa de 2 modelos, prompt ambiguo, loop infinito (timeout), offline y persistencia entre sesiones."
        >
          <PromptBlock label="Prompt 6.3 â€” Prueba manual">
{`Genera el protocolo de prueba manual de Construtor IA.

Escenarios:
1. Cargar desafÃ­o "factorial" de HumanEval y generar cÃ³digo
   â†’ Â¿El cÃ³digo funciona? Â¿Pasan los tests del desafÃ­o?
2. Introducir manualmente: "Escribe una funciÃ³n que devuelva el nÃºmero de vocales en una cadena de texto" â†’ Â¿El cÃ³digo es correcto?
3. Comparar el mismo desafÃ­o con 2 modelos diferentes (necesita 2 API keys)
   â†’ Â¿La tabla comparativa muestra los dos resultados correctamente?
4. Introducir un prompt ambiguo (ej. "haz algo con nÃºmeros")
   â†’ Â¿El cÃ³digo generado intenta resolver el problema? Â¿Los tests fallan?
5. Activar sandbox y ejecutar cÃ³digo con loop infinito intencionado
   â†’ Â¿El timeout mata el proceso correctamente sin bloquear la app?
6. Desconectar internet â†’ Â¿Aparece el estado de fallback?
7. Verificar que el historial persiste entre sesiones

SeÃ±ales de que estÃ¡ listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="DecisiÃ³n documentada sobre Python en el sandbox (.exe vs. Python del usuario). Comando de empaquetado, nota al usuario sobre los requisitos del sandbox."
        >
          <PromptBlock label="Prompt 6.4 â€” Empaquetado .exe">
{`Instrucciones de empaquetado para Construtor IA.

Dependencias: flet, duckdb, pydantic, httpx, python-dotenv
Archivos de datos: \`sample_coding_challenges.json\`, \`data_engineering/raw/humaneval.json\`

ConsideraciÃ³n especial: el sandbox ejecuta "python" como subprocess.
En el ejecutable empaquetado por PyInstaller, "python" puede no estar disponible en el PATH del entorno sin Python instalado.

Opciones:
A) Incluir el intÃ©rprete Python en el ejecutable (\`PyInstaller --add-binary\`)
   [VERIFICAR EN DOCUMENTACIÃ“N DE PYINSTALLER si esto es posible y cÃ³mo]
B) Requerir que el usuario tenga Python instalado (limitaciÃ³n de v1)
C) Usar el ejecutable de Python que viene con la app Flet

Genera la recomendaciÃ³n para v1 con la justificaciÃ³n, el comando de empaquetado y la nota al usuario sobre los requisitos del sandbox.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="Protocolo en VM con/sin Python segÃºn decisiÃ³n del paso 6.4. Checklist del sandbox, errores comunes de Flet/DuckDB/subprocess en Windows."
        >
          <PromptBlock label="Prompt 6.5 â€” Prueba en mÃ¡quina limpia">
{`Protocolo de prueba del ejecutable de Construtor IA en entorno limpio.

ATENCIÃ“N: el sandbox ejecuta Python. Verifica si la mÃ¡quina limpia necesita Python instalado para el sandbox, segÃºn la decisiÃ³n del paso 6.4.

1. Entorno de prueba: VM Windows con/sin Python segÃºn la decisiÃ³n tomada
2. Archivos necesarios junto al .exe: \`.env\`, archivos JSON de desafÃ­os
3. Checklist:
   - La app abre y muestra la pantalla de GeneraciÃ³n
   - Se puede cargar un desafÃ­o HumanEval
   - El LLM genera cÃ³digo correctamente
   - El sandbox funciona (si Python estÃ¡ disponible)
   - Sin internet: aparece el estado de fallback
4. Errores comunes de Flet/DuckDB/subprocess en Windows [VERIFICAR EN DOCUMENTACIÃ“N OFICIAL]
5. CÃ³mo actualizar el modelo LLM a usar sin reinstalar la app (\`.env\`)`}
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
          desc="Publicar Construtor IA en el Foro de Proyectos con la advertencia de seguridad obligatoria, y planificar v2 con soporte SQL y sandbox Docker."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog en tabla: JS + SQL, sandbox Docker, comparativa paralela de 3 modelos. Capa afectada, complejidad, riesgo de seguridad adicional y prioridad."
        >
          <PromptBlock label="Prompt 7.A â€” Backlog v2">
{`Construtor IA v1 estÃ¡ funcionando. Planifica la v2.

Ideas para v2:
- Soporte para JavaScript con Node.js sandbox
- Soporte para SQL con DuckDB como ejecutor
- Sandbox mÃ¡s seguro con Docker
- Comparativa automÃ¡tica de 3 modelos en el mismo desafÃ­o

Para cada idea, analiza:
1. Â¿QuÃ© capa del mapa 1-6 afecta principalmente?
2. Â¿Requiere cambiar el sandbox? Â¿AÃ±ade riesgos de seguridad?
3. Complejidad y prioridad

Backlog v2 en formato tabla.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha con advertencia de seguridad del sandbox (obligatoria), capturas de badge PASA y comparativa de modelos, pregunta abierta sobre nivel de aislamiento aceptable."
        >
          <PromptBlock label="Prompt 7.B â€” PublicaciÃ³n en el Foro">
{`Genera la ficha de publicaciÃ³n de Construtor IA para el Foro Horizon.

1. TÃ­tulo: "Construtor IA v1 â€” GeneraciÃ³n y EvaluaciÃ³n Objetiva de CÃ³digo con LLMs"
2. Ãrea: IngenierÃ­a & Arquitectura
3. DescripciÃ³n (mÃ¡x 150 palabras)
4. Advertencia de seguridad del sandbox (texto corto, obligatorio)
5. Capturas: cÃ³digo generado con badge PASA, comparativa de modelos, historial
6. Instrucciones de instalaciÃ³n
7. QuÃ© feedback busco: Â¿tipos de desafÃ­os que fallan? Â¿calidad del sandbox?
8. Pregunta para la comunidad: "Â¿QuÃ© nivel de aislamiento del sandbox considerÃ¡is mÃ­nimo aceptable para un entorno educativo?"`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Resultado esperado â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(59,111,212,0.05)", borderColor: "rgba(59,111,212,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={16} style={{ color: C.accent }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.accent }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1â€“6 + Fase 7), tendrÃ¡s un <strong>ejecutable de Construtor IA</strong> que genera cÃ³digo Python con el LLM lÃ­der en HumanEval, lo ejecuta en un sandbox con timeout configurable, muestra el resultado (PASA / FALLA / TIMEOUT) con quality score 0â€“100, y guarda el historial completo de evaluaciones para comparar modelos a lo largo del tiempo.
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

