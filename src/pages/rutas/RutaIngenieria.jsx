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

// ─── Tools table ────────────────────────────────────────────────────────────—
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "Laboratorio Ingeniería (data_engineering/rankings/) · HumanEval · MBPP · SWE-Bench", motivo: "Verificar scores reales en generación de código antes de elegir el modelo." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Documento de definición", motivo: "Decidir qué lenguajes y tipos de tarea cubre la v1 antes de tocar código." },
  { capa: "2", subcapa: "2.1", herramienta: "data_engineering/raw/ · openai/human-eval [VERIFICAR DOCS]", motivo: "Desafíos HumanEval ya descargados por el motor Horizon." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para CodingChallenge, GeneratedCode, ExecutionResult y CodingEvaluation." },
  { capa: "2", subcapa: "2.3", herramienta: "ast (stdlib)", motivo: "Verificar sintaxis Python sin ejecutarlo; análisis de docstring, type hints y LOC." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de evaluaciones con métricas de calidad y vistas de comparativa por modelo." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual", motivo: "10 desafíos con tests unitarios para desarrollo y pruebas offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_engineering/rankings/", motivo: "Seleccionar el modelo con mayor pass@1 en HumanEval según el ranking actualizado." },
  { capa: "3", subcapa: "3.2", herramienta: "Few-shot prompting", motivo: "Dar ejemplos de formato esperado: código + docstring + type hints + tests." },
  { capa: "3", subcapa: "3.3", herramienta: "re (regex) · ast", motivo: "Extraer el bloque de código del texto del LLM con validación de sintaxis." },
  { capa: "3", subcapa: "3.4", herramienta: "subprocess con timeout", motivo: "Ejecutar código en proceso aislado para no afectar la app principal." },
  { capa: "3", subcapa: "3.5", herramienta: "ast · análisis manual", motivo: "Análisis de calidad: docstring, type hints, LOC, quality score 0-100." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Si el LLM o el sandbox fallan, devuelve CodingEvaluation válida con estado descriptivo." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir 3 pantallas (Generación, Comparativa, Historial) antes de codificar." },
  { capa: "4", subcapa: "4.2–4.5", herramienta: "Flet", motivo: "Código en fuente monospace con scroll, badges de resultado y navegación entre pantallas." },
  { capa: "5", subcapa: "5.1–5.5", herramienta: "Flet · DuckDB · python-dotenv", motivo: "Conectar botón Generar con el pipeline; logging de sandbox y configuración centralizada." },
  { capa: "6", subcapa: "6.1–6.2", herramienta: "Pytest", motivo: "Tests de extracción de código, análisis de calidad y test de integración con sandbox real." },
  { capa: "6", subcapa: "6.3", herramienta: "Prompts de ingeniería reales", motivo: "7 escenarios de prueba manual incluyendo timeout de sandbox y modo offline." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible; decisión documentada sobre Python en el sandbox." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Validar el ejecutable en entorno limpio; verificar comportamiento del sandbox." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon", motivo: "Publicar comparativas de modelos en generación de código y planificar v2 con soporte SQL." },
];

// ─── Phases overview ─────────────────────────────────────────────────────────—€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "Investigación",          summary: "Benchmarks de código (HumanEval, MBPP, SWE-Bench) y riesgos de ejecutar código generado por LLM." },
  { id: "1", label: "Capa 1", name: "Definición",              summary: "Perfil de usuario, problema, inputs/outputs, criterios de éxito y límites de la v1 (solo Python, sandbox básico)." },
  { id: "2", label: "Capa 2", name: "Datos",                   summary: "Carga de HumanEval, esquemas Pydantic, extracción de código, DuckDB y dataset de 10 desafíos." },
  { id: "3", label: "Capa 3", name: "Lógica / IA",             summary: "Selección del modelo, prompt few-shot, llamada + extracción, sandbox, análisis de calidad y fallback." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",         summary: "3 pantallas: Generación, Comparativa, Historial. Código monospace, badges y advertencia de sandbox." },
  { id: "5", label: "Capa 5", name: "Integración",             summary: "Pipeline completo, errores en cascada, logging separado para sandbox y configuración centralizada." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",   summary: "Tests unitarios, test de integración con sandbox real, prueba manual y ejecutable con PyInstaller." },
  { id: "7", label: "Fase 7", name: "Iteración",               summary: "Publicar en el Foro de Proyectos y planificar v2 con soporte SQL y sandbox Docker." },
];

// ─── Version extensions ──────────────────────────────────────────────────────—€
const VERSIONS = [
  {
    tag: "v2 · Multi-lenguaje",
    area: "JavaScript + SQL",
    title: "Construtor Multi — Soporte para JS y SQL",
    desc: "Extiende el sandbox para ejecutar JavaScript con Node.js y consultas SQL con DuckDB como ejecutor, añadiendo dos nuevos lenguajes al dropdown de la pantalla de Generación.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el lenguaje de entrada ya no es solo Python; el usuario elige Python / JS / SQL",
      "Capa 2: campo language en CodingChallenge con Literal['python', 'javascript', 'sql']",
      "Capa 3: el sandbox detecta el lenguaje y llama a 'node' o ejecuta SQL en DuckDB en memoria",
      "Capa 3: el prompt central cambia según el lenguaje (few-shots específicos por lenguaje)",
      "Capa 4: el panel de código muestra el lenguaje seleccionado en el badge de resultado",
      "Capa 6: dataset ampliado con 5 desafíos por lenguaje; tests de integración para JS y SQL",
    ],
  },
  {
    tag: "v3 · Sandbox seguro",
    area: "Aislamiento con Docker",
    title: "Construtor Secure — Sandbox con contenedores",
    desc: "Reemplaza el subprocess básico por un contenedor Docker efímero para cada ejecución: sin acceso a red, sin acceso al sistema de archivos del host, con límite de memoria y CPU.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: el sandbox Docker es un requisito de instalación; documentar en los límites de v1",
      "Capa 3: execute_in_sandbox() usa docker run --rm --network=none con volumenes temporales",
      "Capa 3: el timeout ahora es doble: timeout de Docker + timeout de subprocess externo",
      "Capa 4: badge adicional 'Sandbox Seguro' cuando Docker está disponible",
      "Capa 5: config.py añade CONSTRUTOR_DOCKER_IMAGE y CONSTRUTOR_MEM_LIMIT",
      "Advertencia: Docker debe estar instalado en el equipo del usuario",
    ],
  },
  {
    tag: "v4 · Comparativa paralela",
    area: "3 modelos simultáneos",
    title: "Construtor Arena — Torneo de modelos",
    desc: "Envía el mismo desafío a 3 modelos en paralelo (asyncio.gather), muestra los tres resultados en columnas y calcula un ranking automático por quality_score.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: el usuario configura 3 API keys (o selecciona 3 modelos del mismo proveedor)",
      "Capa 3: generate_and_execute_with_fallback() se lanza 3 veces con asyncio.gather",
      "Capa 3: ranking_models(): ordena los 3 resultados por quality_score y declara ganador",
      "Capa 4: pantalla Arena con 3 columnas de código + badges side-by-side",
      "Capa 4: banner 'Ganador: [MODELO]' con quality_score más alto",
      "Capa 5: el pipeline paralelo maneja fallos individuales sin cancelar los otros dos",
    ],
  },
];

// ─── Sandbox security banner ────────────────────────────────────────────────—
function SandboxBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(220,38,38,0.04)", borderColor: "rgba(220,38,38,0.20)" }}>
      <ShieldAlert size={18} className="shrink-0 mt-0.5" style={{ color: C.red }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(153,27,27,0.85)" }}>
        <strong>Advertencia de seguridad permanente:</strong> Construtor IA ejecuta código Python generado por un LLM en tu equipo. Aunque se aplica un timeout configurable, el sandbox de la v1 <strong>no aísla completamente el proceso</strong>. Revisa siempre el código antes de ejecutarlo y nunca uses la app con datos sensibles en el mismo directorio.
      </p>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────—
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
            Ingeniería & Arquitectura · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Construtor IA
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que genera código Python con el LLM líder en HumanEval, lo ejecuta en un sandbox con timeout configurable, y produce un informe de calidad con métricas objetivas: tests pasados, docstring, type hints y quality score 0–100.
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
                    {["Capa", "Subcapa", "Herramienta(s)", "Por qué se usa aquí"].map(h => (
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
                  <strong>¿Por qué Flet y no PyQt o Tkinter?</strong> Mostrar código fuente con scroll y fuente monospace es sencillo en Flet con ft.Text y la propiedad font_family. Para syntax highlighting avanzado en v2 se podría considerar un componente WebView, pero en v1 el texto plano con monospace es suficiente para leer el código generado.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 0 — INVESTIGACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Search}
          label="Fase 0"
          color={C.accent}
          title="Investigación"
          desc="Confirmar qué benchmarks evalúan generación de código y entender los riesgos reales de ejecutar código generado por un LLM antes de implementar el sandbox."
        />

        <Step 
          num="0.A" 
          title="Benchmarks de generación de código" 
          goal="Identificar HumanEval, MBPP, SWE-Bench; entender la métrica pass@k; saber qué modelo lidera en el ranking del laboratorio."
        >
          <PromptBlock label="Prompt 0.A — Benchmarks de código">
{`Actúa como especialista en evaluación de LLMs para generación de código.
Tengo acceso al Laboratorio de Ingeniería de Horizon (data_engineering/rankings/).

Respóndeme:
1. ¿Qué benchmarks evalúan generación de código en LLMs? (HumanEval, MBPP, SWE-Bench, LiveCodeBench, EvoEval)
2. ¿Qué métrica usa HumanEval exactamente? (pass@k: ¿qué es k=1 vs k=100?)
3. ¿Cuál es el modelo con mayor pass@1 en HumanEval según data_engineering/rankings/latest_rankings_engineering.json?
4. ¿Hay diferencia significativa entre modelos en SWE-Bench (bugs reales) vs HumanEval (algoritmos de libro)?

Cita scores específicos del archivo de rankings. No inventes datos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Riesgos de ejecutar código generado por LLM" 
          goal="Documentar qué protecciones ofrece subprocess, qué alternativas existen y qué nivel de sandbox es razonable para la v1."
        >
          <PromptBlock label="Prompt 0.B — Riesgos del sandbox">
{`Construtor IA ejecutará código Python generado por un LLM en el equipo del usuario.

Antes de implementar el sandbox, necesito entender los riesgos:
1. ¿Qué tipos de código malicioso podría generar un LLM aunque se le pida resolver un problema algorítmico? (ej. acceso a sistema de archivos, conexiones de red, fork bombs)
2. ¿Qué protecciones ofrece subprocess.run() con timeout? ¿Es suficiente para aislar el código o necesito algo más robusto?
3. ¿Cuáles son las alternativas más seguras para ejecutar código Python aislado en una app de escritorio? (RestrictedPython, PyPy sandboxing, Docker) [VERIFICAR EN DOCUMENTACI“N OFICIAL de cada opción]
4. Para la v1 con usuario técnico (desarrollador): ¿qué nivel de sandbox es razonable implementar sin añadir demasiada complejidad?

Esta decisión de seguridad debe documentarse explícitamente en la v1.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 — DEFINICI“N DEL PROBLEMA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Layers}
          label="Capa 1"
          color={C.emerald}
          title="Definición del problema"
          desc="Decidir exactamente qué construyes: quién lo usa, qué métricas de calidad importan, qué entra, qué sale y qué NO cubre la v1."
        />

        <Step 
          num="1.1" 
          title="¿Quién usa esta app?" 
          goal="Ficha de usuario con rol técnico, tipos de código que necesita generar, nivel de lectura de código y métricas que le importan."
        >
          <PromptBlock label="Prompt 1.1 — Perfil de usuario">
{`Define el perfil de usuario de Construtor IA.

La app genera código con LLMs, lo ejecuta en sandbox y reporta calidad.

[DESCRIBE AQUÍ TU USUARIO OBJETIVO: ej. "desarrollador Python junior que quiere comparar GPT-4o vs Claude 3.7 Sonnet en problemas de algoritmos antes de elegir cuál usar en su empresa" o "profesor de programación que evalúa qué LLM puede recomendar como tutor de sus estudiantes"]

Genera la ficha con:
- Nombre ficticio y rol técnico
- Qué hace actualmente sin la app
- Qué tipos de código necesita generar (algoritmos, funciones utilitarias, SQL, etc.)
- Nivel técnico (¿puede leer código Python? ¿hace code review?)
- Cuántas generaciones quiere evaluar por sesión
- Qué métricas le importan: ¿que funcione?, ¿que sea eficiente?, ¿que esté bien documentado?

Esta información determina qué análisis de calidad implementar en la v1.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="¿Qué problema concreto resuelve?" 
          goal="Una sola frase en formato [ROL] + [TAREA] + [OBSTÁCULO] + [CONSECUENCIA]. ¿Usar código de forma más informada, aprender, o ambas?"
        >
          <PromptBlock label="Prompt 1.2 — Frase del problema">
{`Basándome en el perfil ([PEGA EL RESUMEN DEL PERFIL]),
escribe UNA SOLA FRASE del problema que Construtor IA resuelve.

Formato: "[ROL] no puede [TAREA] porque [OBSTÁCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes y elige la más precisa.

Además, aclara: ¿la app ayuda al usuario a USAR código de LLMs de forma más informada, o a APRENDER a programar con feedback inmediato, o ambas?
Esto afecta qué tan técnicos deben ser los reportes de calidad.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="¿Qué datos entran?" 
          goal="Lista completa de inputs: prompt, desafío HumanEval, modelo, lenguaje, test cases, sandbox on/off y timeout de ejecución."
        >
          <PromptBlock label="Prompt 1.3 — Inputs de la app">
{`Para Construtor IA, define todos los datos de entrada.

El usuario puede:
- Introducir un prompt técnico (descripción del problema a resolver con código)
- Cargar un desafío del dataset HumanEval local
- Seleccionar el modelo LLM
- Elegir el lenguaje de programación: [Python en v1; otros en v2]
- Opcionalmente: definir casos de test que el código debe pasar
- Elegir si quiere ejecución en sandbox (puede desactivarla por seguridad)

Genera la lista completa de inputs con tipo, restricciones y valor por defecto.

Incluye el parámetro "timeout de ejecución" (segundos antes de matar el proceso) y documenta por qué es importante para seguridad.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="¿Qué sale?" 
          goal="Outputs: código generado, resultado del sandbox, tests pasados/fallados, análisis de calidad (docstring, type hints, LOC, quality score), historial."
        >
          <PromptBlock label="Prompt 1.4 — Outputs de la app">
{`Define todos los outputs de Construtor IA para cada generación.

La app debe producir:
1. El código generado por el LLM (formateado, con syntax indication)
2. Resultado de la ejecución en sandbox: éxito / error + traceback
3. Si hay tests definidos: cuántos pasaron vs. fallaron
4. Análisis básico de calidad:
   - ¿Tiene docstring? (Sí/No)
   - ¿Tiene type hints? (Sí/No)
   - Número de líneas de código (LOC)
   - Complejidad ciclomática estimada (si se implementa)
5. Pass/Fail badge (PASA / FALLA / ERROR DE EJECUCI“N / NO EJECUTADO)
6. Historial de generaciones del mismo prompt con distintos modelos

Para cada output: formato, cuándo se genera, si se guarda en DuckDB.
[A‘ADE OUTPUTS ADICIONALES QUE NECESITES]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de éxito" 
          goal="7–8 criterios verificables: extracción de código, timeout de sandbox, seguridad documentada, detección de docstring y rendimiento."
        >
          <PromptBlock label="Prompt 1.5 — Criterios de éxito">
{`Define los criterios de éxito de Construtor IA v1.

Incluye criterios para:
- Extracción de código del LLM (ej. "extrae el bloque de código correctamente en >= 90% de las respuestas del modelo elegido")
- Ejecución en sandbox (ej. "mata el proceso si supera el timeout configurado, sin bloquear la UI")
- Seguridad (ej. "el sandbox no permite que el código generado acceda a rutas fuera del directorio temporal asignado") [VERIFICAR si es técnicamente factible con subprocess en v1 o si esta limitación se documenta explícitamente]
- Análisis de calidad (ej. "detecta presencia/ausencia de docstring en 100% de los casos")
- Rendimiento (ej. "el código se genera y ejecuta en < 60s para prompts simples")

7-8 criterios. Ninguno vago.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="Límites explícitos de la v1" 
          goal="Solo Python, sandbox no completamente aislado, sin pip install en sandbox. Advertencia de seguridad para la primera activación."
        >
          <PromptBlock label="Prompt 1.6 — Límites de la v1">
{`Define los límites explícitos de Construtor IA v1.

Límites técnicos obligatorios:
1. Solo Python en v1 (no JavaScript, SQL, C++)
2. El sandbox NO es un entorno completamente aislado; documenta exactamente qué puede y no puede hacer el código generado
3. No se soportan dependencias externas en el código generado (no se puede hacer pip install en el sandbox)
4. El análisis de complejidad es estimado (conteo de bucles), no formal

Para cada límite:
- Por qué existe en v1
- Riesgo si se ignora
- Cómo gestionarlo: mensaje claro al usuario o bloqueo técnico

Genera también la advertencia de seguridad que aparece la primera vez que el usuario activa la ejecución en sandbox:
"Al activar la ejecución, el código generado por el LLM se ejecutará en tu equipo. Aunque se aplican restricciones básicas, revisa el código antes de ejecutarlo."`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 — DATOS
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Database}
          label="Capa 2"
          color={C.amber}
          title="Datos"
          desc="Carga de desafíos HumanEval, esquemas Pydantic, extracción y análisis de código con ast, almacenamiento DuckDB y dataset de 10 desafíos de ejemplo."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_humaneval_challenges() desde JSONL y create_manual_challenge() para entrada libre. Manejo de FileNotFoundError descriptivo."
        >
          <PromptBlock label="Prompt 2.1 — Fuente de datos">
{`Implementa la carga de desafíos de programación para Construtor IA.

Fuente 1 (local): desafíos HumanEval en \`data_engineering/raw/humaneval.json\`
Formato HumanEval: \`task_id\`, \`prompt\`, \`canonical_solution\`, \`test\` (código Python con assert statements), \`entry_point\` (nombre de la función a generar).

Escribe:
1. \`load_humaneval_challenges(file_path: str, limit: int = 20) -> list[CodingChallenge]\`:
   - Carga los desafíos HumanEval
   - Extrae el nombre de la función (\`entry_point\`), el prompt y los tests
   - Maneja el archivo JSONL (una línea por desafío) si es ese el formato
   - Lanza \`FileNotFoundError\` descriptivo si no existe

2. \`create_manual_challenge(prompt: str, test_code: Optional[str]) -> CodingChallenge\`:
   - Crea un desafío desde entrada manual
   - Si no hay \`test_code\`: \`is_auto_testable=False\`

Usa \`pathlib\`. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="CodingChallenge, GeneratedCode, ExecutionResult con status Literal, y CodingEvaluation. Pydantic v2, docstrings en todos los modelos."
        >
          <PromptBlock label="Prompt 2.2 — Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Construtor IA.

1. \`CodingChallenge\`:
   - \`challenge_id\`: str
   - \`prompt\`: str (descripción del problema)
   - \`function_name\`: Optional[str] (nombre de la función a implementar)
   - \`test_code\`: Optional[str] (código Python con asserts para validar)
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
          title="Extracción de código y análisis básico" 
          goal="extract_code_block() con regex + ast.parse(), y analyze_code_quality() para has_docstring, has_type_hints y LOC. Sin dependencias externas."
        >
          <PromptBlock label="Prompt 2.3 — Extracción y análisis">
{`Implementa la extracción del bloque de código de la respuesta del LLM.

Escribe \`extract_code_block(llm_response: str) -> Optional[str]\` que:
1. Busca bloques de código en markdown: \`\`\`python ... \`\`\` o \`\`\` ... \`\`\`
2. Si hay múltiples bloques: devuelve el más largo (probablemente es la solución)
3. Si no hay bloques markdown: intenta extraer texto que empiece con "def " o "class " y sigue con indentación Python
4. Valida la sintaxis del código extraído con \`ast.parse()\` (stdlib)
5. Si \`ast.parse()\` lanza \`SyntaxError\`: devuelve el código igualmente pero marca el error para el \`ExecutionResult\` (\`status=SYNTAX_ERROR\`)
6. Devuelve \`None\` si no puede extraer ningún bloque

Escribe también \`analyze_code_quality(code: str) -> dict\` que:
- \`has_docstring\`: verifica si la primera instrucción del cuerpo es un string literal
- \`has_type_hints\`: verifica si la firma de la función contiene ":"
- \`loc\`: cuenta líneas no vacías y no comentarios
- Devuelve dict con estos 3 campos

No uses radon ni otras dependencias externas para el análisis básico.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_engineering_db(), store_evaluation(), get_model_code_stats() y get_challenge_history(). Vistas de comparativa por modelo."
        >
          <PromptBlock label="Prompt 2.4 — DuckDB">
{`Crea la capa de persistencia de Construtor IA con DuckDB.

1. \`init_engineering_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`coding_challenges\`, \`generated_codes\`, \`execution_results\`
   - Vista: \`vw_model_code_quality\` (\`model_name\`, \`total\`, \`pass_rate\`, \`avg_loc\`, \`docstring_rate\`)
   - Vista: \`vw_challenge_comparison\` (\`challenge_id\`, \`model_name\`, \`status\`, \`tests_passed\`)

2. \`store_evaluation(conn, evaluation: CodingEvaluation) -> str\`:
   - Guarda código + resultado como unidad
   - Devuelve \`evaluation_id\`

3. \`get_model_code_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - Estadísticas de calidad de código por modelo

4. \`get_challenge_history(conn, challenge_id: str) -> list[dict]\`:
   - Todas las evaluaciones de un mismo desafío con distintos modelos

Maneja excepciones DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo" 
          goal="10 desafíos Python (4 fáciles, 3 medios, 3 difíciles) con tests verificables. Compatible con CodingChallenge de Pydantic."
        >
          <PromptBlock label="Prompt 2.5 — Dataset de ejemplo">
{`Genera el dataset de ejemplo para Construtor IA.

Archivo \`sample_coding_challenges.json\` con 10 desafíos Python:
- 4 fáciles (función para invertir una lista, suma de dígitos, factorial, FizzBuzz)
- 3 medios (búsqueda binaria, árbol de Fibonacci con memoización, anagramas)
- 3 difíciles (algoritmo de Dijkstra simplificado, caché LRU básico, merge sort)

Para cada desafío:
- \`prompt\`: descripción clara del problema
- \`function_name\`: nombre exacto de la función (\`entry_point\`)
- \`test_code\`: código Python con 3-5 asserts que verifican la función (el test_code importa la función por su entry_point y la prueba con valores conocidos)
- \`difficulty\` y \`is_auto_testable\`: \`true\` para todos

Los tests deben ser verificables: \`assert factorial(5) == 120\`, etc.

Incluye el código Python para cargar y validar con \`CodingChallenge\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 — L“GICA / IA
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Cpu}
          label="Capa 3"
          color={C.accent}
          title="Lógica / IA"
          desc="Selección del modelo, prompt few-shot, llamada + extracción, sandbox con subprocess, análisis de quality score y fallback cuando falla el LLM o el sandbox."
        />

        <Step 
          num="3.1" 
          title="Selección del modelo LLM" 
          goal="Modelo con mayor pass@1 en HumanEval según el ranking del laboratorio. Verificar que genera bloques markdown, límite de contexto y API disponible."
        >
          <PromptBlock label="Prompt 3.1 — Selección del modelo">
{`Para Construtor IA, necesito el LLM con mejor pass@1 en HumanEval.

Según \`data_engineering/rankings/latest_rankings_engineering.json\`:
- Modelo #1 en HumanEval pass@1: [MODELO Y SCORE]
- Modelo #1 en MBPP: [MODELO Y SCORE]

Confirma:
1. ¿El modelo elegido genera código Python funcional en un bloque markdown? (algunos modelos dan código en texto sin bloques, dificultando la extracción)
2. ¿Tiene límite de contexto suficiente para el prompt + código generado (prompts HumanEval pueden ser largos)?
3. ¿API pública? [VERIFICAR EN DOCUMENTACI“N OFICIAL]
4. Alternativa open-source: ¿DeepSeek-Coder, CodeLlama o similar está disponible con API? [VERIFICAR EN DOCUMENTACI“N OFICIAL]

Justifica la elección. Cita el pass@1 exacto del benchmark.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Diseño del prompt central (few-shot)" 
          goal="Few-shot con formato de respuesta esperada: código en bloque Python, docstring, type hints, comentario del algoritmo, sin dependencias externas."
        >
          <PromptBlock label="Prompt 3.2 — Prompt central (few-shot)">
{`Diseña el prompt maestro de Construtor IA para generación de código.

El prompt debe:
1. Pedir al modelo que genere šNICAMENTE el código Python en un bloque \`\`\`python (sin texto adicional antes ni después del bloque)
2. Incluir docstring con: descripción, argumentos, valor de retorno, ejemplo
3. Incluir type hints en la firma de la función
4. Incluir al menos 1 comentario inline explicando el algoritmo principal
5. No importar librerías externas (solo stdlib Python)
6. Si el problema no se puede resolver solo con stdlib: indicar explícitamente qué librería necesitaría en un comentario al inicio

System prompt: desarrollador senior Python que genera código limpio y legible.
User prompt: plantilla con \`{{NOMBRE_FUNCI“N}}\`, \`{{DESCRIPCI“N_PROBLEMA}}\`, \`{{TESTS_DE_REFERENCIA}}\` (los tests que debe pasar, para que el modelo los use como spec).

Genera ambos. Incluye un ejemplo de entrada/salida del prompt completo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo y extracción de código" 
          goal="generate_code() con temperatura 0.2, retry 2 intentos, timeout 45s. prepare_generated_code() que extrae código y construye GeneratedCode completo."
        >
          <PromptBlock label="Prompt 3.3 — Llamada + extracción">
{`Implementa \`generate_code(challenge: CodingChallenge, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Temperatura: 0.2 (código debe ser consistente; algo de variación para creatividad)
3. Max tokens: 1500 (suficiente para función + docstring + comentarios)
4. Llama a la API de [MODELO] [VERIFICAR EN DOCUMENTACI“N OFICIAL los parámetros]
5. Mide el tiempo de generación
6. Retry 2 intentos (espera 5s entre intentos)
7. Timeout: 45 segundos
8. Devuelve \`(raw_response, tiempo_generacion)\`

Luego implementa el pipeline de extracción:
\`prepare_generated_code(raw_response: str, challenge: CodingChallenge, model_name: str, gen_time: float) -> GeneratedCode\` que:
- Llama a \`extract_code_block()\`
- Llama a \`analyze_code_quality()\` si hay código extraído
- Construye el objeto \`GeneratedCode\` completo

API key desde \`CONSTRUTOR_LLM_API_KEY\`. Log con: \`model_name\`, \`challenge_id\`, \`gen_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Ejecución en sandbox" 
          goal="execute_in_sandbox() con subprocess + timeout. Archivo temporal, captura de stdout/stderr, limpieza garantizada. Documentar qué NO protege el sandbox."
        >
          <PromptBlock label="Prompt 3.4 — Sandbox subprocess">
{`Esta es la función más crítica de Construtor IA desde el punto de vista de seguridad.

Implementa \`execute_in_sandbox(code: GeneratedCode, challenge: CodingChallenge, timeout_seconds: int = 10) -> ExecutionResult\` que:

1. Crea un archivo Python temporal en un directorio temporal (\`tempfile.mkdtemp()\`)
2. Escribe en ese archivo: el código generado + los tests de \`challenge.test_code\` (los tests hacen assert sobre la función definida en el código)
3. Ejecuta \`subprocess.run(["python", archivo_temp], timeout=timeout_seconds, capture_output=True, text=True)\`
4. Si \`returncode == 0\`: \`status=PASS\`
5. Si \`returncode != 0\` y stderr contiene "AssertionError": \`status=FAIL\`
6. Si \`returncode != 0\` y stderr contiene "SyntaxError": \`status=SYNTAX_ERROR\`
7. Si subprocess lanza \`TimeoutExpired\`: \`status=TIMEOUT\`
8. Limpia el directorio temporal al final (siempre, incluso si hay error)
9. Extrae \`tests_passed\` y \`tests_total\` del output si el \`test_code\` los reporta

IMPORTANTE: documenta en el código qué protecciones tiene y qué NO tiene este sandbox.
Si el código generado hace \`os.system("rm -rf /")\` no hay protección en v1.
El usuario debe ser advertido de esto en la UI (paso 1.6).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Análisis de calidad" 
          goal="analyze_evaluation(): overall_badge, quality_score 0-100 por reglas fijas y improvement_tips generados por lógica, no por el LLM."
        >
          <PromptBlock label="Prompt 3.5 — Análisis de calidad">
{`Además del resultado de ejecución, Construtor IA analiza la calidad del código.

Escribe \`analyze_evaluation(code: GeneratedCode, result: ExecutionResult) -> dict\` que genera un resumen de calidad con:

1. \`overall_badge\`: "PASA" (verde) si PASS, "FALLA" (rojo) si FAIL/SYNTAX_ERROR, "TIMEOUT" (naranja), "NO EJECUTADO" (gris)
2. \`quality_score\`: entero 0-100 calculado así:
   - +40 si \`status=PASS\` (funciona)
   - +20 si \`has_docstring=True\`
   - +20 si \`has_type_hints=True\`
   - +10 si \`execution_time < 1 segundo\` (eficiente)
   - +10 si \`loc <= 30\` (conciso para problemas básicos) o proporcional para medios/difíciles
3. \`improvement_tips\`: lista de strings con sugerencias concretas:
   - "Añadir docstring para documentar la función"
   - "Añadir type hints para mayor claridad"
   - "El código tarda más de 1 segundo; considera optimizar el algoritmo"
   - (solo si aplica)

Devuelve el dict con estos 3 campos.
Las \`improvement_tips\` no son inventadas por el LLM; se generan por reglas fijas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Función de fallback" 
          goal="generate_and_execute_with_fallback(): siempre devuelve CodingEvaluation válida; nunca lanza excepción al usuario final. Fallbacks para API caída y extracción fallida."
        >
          <PromptBlock label="Prompt 3.6 — Fallback">
{`Implementa \`generate_and_execute_with_fallback(challenge: CodingChallenge, model_name: str, execute: bool = True) -> tuple[CodingEvaluation, bool]\` que:

1. Intenta \`generate_code()\` + \`prepare_generated_code()\`
2. Si \`execute=True\`: intenta \`execute_in_sandbox()\`
3. Si \`execute=False\`: crea \`ExecutionResult\` con \`status=NOT_EXECUTED\`

Manejo de fallos:
- Si \`generate_code()\` falla (API caída): \`GeneratedCode\` con \`extracted_code=None\`, \`ExecutionResult\` con \`status=NOT_EXECUTED\` y \`error_message="API no disponible"\`
- Si \`extract_code_block()\` devuelve \`None\`: \`ExecutionResult\` con \`status=SYNTAX_ERROR\` y \`error_message="No se pudo extraer código del LLM"\`
- Si \`execute_in_sandbox()\` falla inesperadamente: \`status=NOT_EXECUTED\` con el error

La UI muestra "Generación no disponible" cuando el LLM falla.
La ejecución puede fallar de forma independiente (código generado pero no ejecutado).`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 — INTERFAZ DE ESCRITORIO (FLET)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Monitor}
          label="Capa 4"
          color="#7C3AED"
          title="Interfaz de escritorio (Flet)"
          desc="3 pantallas: Generación con advertencia de sandbox, Comparativa de modelos y Historial. Código monospace con scroll y badges de resultado prominentes."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="Descripción textual de Generación, Comparativa e Historial con componentes Flet para cada elemento, antes de escribir código."
        >
          <PromptBlock label="Prompt 4.1 — Wireframe">
{`Define el wireframe de Construtor IA con 3 pantallas:

1. Pantalla Generación (principal):
   - TextField multiline para el prompt técnico
   - Botón "Cargar desafío HumanEval" (diálogo con lista)
   - Dropdown: modelo LLM, nivel de dificultad
   - Checkbox "Ejecutar en sandbox" (con nota de seguridad)
   - Botón "Generar y Evaluar"
   - Panel de resultados (aparece después):
     - Código generado en fuente monospace con scroll
     - Badge de resultado (PASA/FALLA/TIMEOUT/NO EJECUTADO)
     - Quality score (0-100) y lista de improvement_tips
     - Output del sandbox (traceback si falla)

2. Pantalla Comparativa:
   - Selector de desafío del historial
   - Tabla comparando modelos que evaluaron ese mismo desafío (model_name, status, quality_score, loc, has_docstring)

3. Pantalla Historial:
   - Lista de evaluaciones pasadas con filtros

Para cada elemento: componente Flet y justificación.
[VERIFICAR EN DOCUMENTACI“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="TextField multiline, botón Cargar HumanEval, Dropdowns de modelo/dificultad, Checkbox sandbox con advertencia expandible y timeout visible condicionalmente."
        >
          <PromptBlock label="Prompt 4.2 — Formulario">
{`Implementa el formulario de entrada de Construtor IA con Flet.

Escribe código Flet para:
1. \`ft.TextField\` multiline para el prompt (mín 3 líneas, máx 1000 chars con contador)
2. \`ft.ElevatedButton\` "Cargar desafío HumanEval" que abre un diálogo con la lista
3. \`ft.Dropdown\` para modelo LLM y \`ft.Dropdown\` para dificultad
4. \`ft.Checkbox\` "Ejecutar en sandbox (lee la nota de seguridad)" que al activarse muestra \`ft.Text\` con la advertencia de seguridad del paso 1.6
5. \`ft.TextField\` para el timeout de sandbox (por defecto: 10 segundos)
6. \`ft.ElevatedButton\` "Generar y Evaluar" que llama a \`on_generate_click\`

Todos los controles deben estar en un \`ft.Column\` con scroll.
El timeout solo es visible cuando el sandbox está activado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Área de resultados" 
          goal="Badge de resultado prominente, código monospace con scroll, traceback en rojo si falla, improvement_tips con iconos y métricas en fila horizontal."
        >
          <PromptBlock label="Prompt 4.3 — Área de resultados">
{`Implementa el área de resultados de Construtor IA con Flet.

Recibe \`CodingEvaluation\` y el dict de \`analyze_evaluation()\`.

Genera código Flet para:
1. Badge de resultado prominente (PASA verde, FALLA rojo, TIMEOUT naranja, NO EJECUTADO gris) con el \`quality_score\` como número secundario
2. El código extraído en \`ft.Text\` con \`font_family\` monospace y scroll
   [VERIFICAR EN DOCUMENTACI“N DE FLET cómo especificar font_family monospace]
   Tamaño reducido (ej. 12px) para que quepan más líneas
3. Si \`status=FAIL\` o \`SYNTAX_ERROR\`: el \`error_message\` / traceback en \`ft.Text\` con fondo rojo claro, también monospace
4. Lista de \`improvement_tips\` en \`ft.Column\` con iconos de bombilla o similar
5. Métricas de calidad en fila horizontal:
   \`LOC: X | Docstring: Sí/No | Type hints: Sí/No | Tiempo: Xs\`
6. Botones: "Guardar evaluación", "Comparar con otro modelo" (lleva a pantalla Comparativa)

Datos recibidos como parámetros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacíos y de error" 
          goal="7 estados: inicio sin prompt, generando, ejecutando en sandbox, código no ejecutado, extracción fallida, timeout y dataset no encontrado."
        >
          <PromptBlock label="Prompt 4.4 — Estados de error">
{`Define los estados excepcionales de Construtor IA.

Código Flet para:
1. Sin prompt (inicio): texto guía + ejemplo de prompt de ingeniería
2. Generando: \`ProgressRing\` + "Generando código con [MODELO]..."
3. Ejecutando en sandbox: \`ProgressRing\` + "Ejecutando en sandbox (máx [N]s)..."
4. Código generado pero no ejecutado (sandbox desactivado): Badge "NO EJECUTADO" gris + "Activa el sandbox para verificar el código"
5. LLM no extrajo bloque de código (devolvió texto sin markdown): Badge "ERROR DE EXTRACCI“N" + \`raw_response\` completa para inspección manual
6. Timeout de sandbox: Badge "TIMEOUT" naranja + "El código tardó más de [N]s"
7. Dataset HumanEval no encontrado: mensaje con la ruta esperada del archivo`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Navegación entre 3 pantallas" 
          goal="NavigationBar, Comparativa se activa desde resultados con challenge_id, Historial con panel lateral. Botón Regenerar que limpia y reejecutar."
        >
          <PromptBlock label="Prompt 4.5 — Navegación">
{`Implementa la navegación de Construtor IA con Flet.

3 pantallas: Generación, Comparativa, Historial.

Implementa:
1. \`NavigationBar\` con iconos para las 3 pantallas
2. Pantalla Comparativa se llena al hacer clic en "Comparar con otro modelo" desde los resultados (pasa el \`challenge_id\` como contexto)
3. Pantalla Historial: clic en una evaluación muestra el código + resultado en un panel lateral o diálogo
4. Botón "Regenerar" en el área de resultados: limpia los resultados y vuelve a ejecutar el mismo prompt con el mismo modelo

Esqueleto completo de la app con las 3 pantallas.
[VERIFICAR EN DOCUMENTACI“N DE FLET el sistema de navegación recomendado]`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 — INTEGRACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={Link2}
          label="Capa 5"
          color={C.emerald}
          title="Integración"
          desc="Conectar botón Generar con el pipeline, gestionar errores en cascada, logging separado para el sandbox y configuración centralizada con variables de entorno."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lógica" 
          goal="on_generate_click(): validación de prompt, advertencia de sandbox en primera activación, async con Flet sin bloquear la UI. Subprocess en hilo separado."
        >
          <PromptBlock label="Prompt 5.1 — Conexión UI â†” lógica">
{`Implementa \`on_generate_click(e)\` para Construtor IA que:

1. Valida que el prompt tiene al menos 20 caracteres
2. Si sandbox activado: muestra la advertencia de seguridad con botón "Entendido" si es la primera vez en esta sesión
3. Muestra "Generando código..."
4. Crea el \`CodingChallenge\` con los datos del formulario
5. Llama a \`generate_and_execute_with_fallback(challenge, model_name, execute)\` de forma asíncrona
6. Llama a \`analyze_evaluation(code, result)\`
7. Actualiza el área de resultados
8. Guarda en DuckDB con \`store_evaluation()\`
9. Si \`is_model_available=False\`: muestra "Generación no disponible"

Usa \`asyncio\` con Flet. No bloquees el hilo de UI.
El proceso de sandbox corre en subprocess, no en async directamente.
[VERIFICAR EN DOCUMENTACI“N DE FLET cómo lanzar subprocesos sin bloquear la UI]`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con datos" 
          goal="coding_evaluation_pipeline(): generate â†’ analyze â†’ store â†’ return. Sin lógica de UI. Log con challenge_id, model_name, status y quality_score."
        >
          <PromptBlock label="Prompt 5.2 — Pipeline completo">
{`Escribe \`coding_evaluation_pipeline(challenge: CodingChallenge, model_name: str, execute_sandbox: bool, timeout: int, conn: duckdb.DuckDBPyConnection) -> tuple[CodingEvaluation, dict]\` que:

1. Genera código con \`generate_and_execute_with_fallback()\`
2. Analiza con \`analyze_evaluation()\`
3. Guarda en DuckDB con \`store_evaluation()\`
4. Devuelve \`(evaluation, quality_analysis)\`

La función no tiene lógica de UI.
Registra en log: \`challenge_id\`, \`model_name\`, \`status\`, \`quality_score\`, \`gen_time\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Gestión de errores en cascada" 
          goal="CodingError enum y CodingException. Regla principal: el pipeline siempre devuelve CodingEvaluation válida, nunca lanza excepción al usuario."
        >
          <PromptBlock label="Prompt 5.3 — Gestión de errores">
{`Define el plan de errores en cascada para Construtor IA.

Puntos de fallo:
1. API LLM timeout â†’ \`status=NOT_EXECUTED\`, badge gris
2. No se extrae código â†’ \`status=SYNTAX_ERROR\`, mostrar raw_response
3. Sandbox timeout â†’ \`status=TIMEOUT\`, badge naranja
4. Sandbox error inesperado (excepción en Python que lanza el sandbox) â†’ \`status=FAIL\`, mostrar stderr completo
5. DuckDB falla al guardar â†’ mostrar resultados igualmente, log del error
6. HumanEval no encontrado â†’ solo modo manual, mensaje claro

Genera enum \`CodingError\`, excepción \`CodingException\`, tabla de decisiones.
Regla principal: "El pipeline siempre devuelve un \`CodingEvaluation\` válido, nunca lanza excepción al usuario final."`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging separado para sandbox" 
          goal="engineering_logger.py con evaluations.log y sandbox.log independientes. log_generation(), log_sandbox_execution(), log_quality() y log_error()."
        >
          <PromptBlock label="Prompt 5.4 — Logging de sandbox">
{`Escribe \`engineering_logger.py\` para Construtor IA:

1. Dos handlers: \`evaluations.log\` (RotatingFileHandler 5MB) y \`sandbox.log\` (registro específico de ejecuciones en sandbox, para auditoría de seguridad)
2. \`log_generation(challenge_id: str, model_name: str, gen_time: float, code_extracted: bool)\`: registro de la generación
3. \`log_sandbox_execution(challenge_id: str, status: str, exec_time: float, timeout_used: int)\`: registro de cada ejecución en sandbox (importante para detectar si el código generado tiende a hacer timeout)
4. \`log_quality(challenge_id: str, model_name: str, quality_score: int, has_docstring: bool, has_type_hints: bool, loc: int)\`: métricas de calidad
5. \`log_error(error_type: str, context: str)\`: errores del sistema

¿Por qué un log separado para sandbox? Las ejecuciones de sandbox son potencialmente más sensibles (errores de seguridad, timeouts) y conviene poder analizarlas por separado.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Configuración centralizada" 
          goal="config.py con CONSTRUTOR_LLM_API_KEY, SANDBOX_TIMEOUT, HUMANEVAL_PATH, constantes SANDBOX_WARNING_TEXT y MAX_PROMPT_LENGTH. .env.example completo."
        >
          <PromptBlock label="Prompt 5.5 — Configuración">
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
            CAPA 6 — PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color={C.red}
          title="Pruebas y empaquetado"
          desc="Tests unitarios de extracción y análisis, test de integración con sandbox real (no mockeado), prueba manual con 7 escenarios y ejecutable con PyInstaller."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_engineering_logic.py: extract_code_block(), analyze_code_quality(), analyze_evaluation(). Fixtures en conftest.py. Sin APIs ni sandbox."
        >
          <PromptBlock label="Prompt 6.1 — Tests unitarios">
{`Escribe tests unitarios con Pytest para Construtor IA.

Crea \`tests/test_engineering_logic.py\`:
1. \`extract_code_block()\`: bloque \`\`\`python, bloque \`\`\` sin especificar lenguaje, múltiples bloques (toma el más largo), texto con "def " sin bloques markdown, respuesta sin código â†’ \`None\`
2. \`analyze_code_quality()\`: función con docstring+type hints, función vacía, función con solo comentarios, LOC=0 â†’ LOC mínimo 1
3. \`analyze_evaluation()\`: PASS+docstring+type_hints â†’ quality_score alto, FAIL â†’ badge FALLA, TIMEOUT â†’ badge TIMEOUT, has_docstring=False â†’ tip de mejora

Fixtures en \`conftest.py\`:
- \`sample_easy_challenge\` (factorial con tests)
- \`sample_llm_response_with_code\` (markdown con bloque Python válido)
- \`sample_llm_response_no_code\` (texto sin bloques)
- \`sample_correct_execution_result\` (PASS, tests_passed=3, tests_total=3)

No llames a APIs. No uses sandbox en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_engineering_integration.py: mock de generate_code(), sandbox real con código correcto, verificación en DuckDB en memoria. Test de extracción fallida."
        >
          <PromptBlock label="Prompt 6.2 — Test de integración">
{`Escribe \`tests/test_engineering_integration.py\`:

1. Carga \`sample_coding_challenges.json\`
2. DuckDB en memoria
3. Mockea SOLO \`generate_code()\` con una respuesta que contiene código Python válido para el desafío factorial (la función correcta en markdown)
4. Para el sandbox: usa el código real generado por el mock (código correcto) y ejecuta el sandbox real (esto es un test de integración real, no mockeado)
   [VERIFICAR: asegúrate de que los tests de integración tienen un sandbox limpio]
5. Verifica:
   a. El código fue extraído correctamente
   b. El sandbox ejecutó y devolvió \`status=PASS\`
   c. La evaluación fue guardada en DuckDB
   d. \`get_model_code_stats()\` refleja 1 evaluación con PASS

Test adicional: mock que devuelve texto sin bloque de código â†’ \`status=SYNTAX_ERROR\` sin excepción en el pipeline.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="7 escenarios: factorial de HumanEval, prompt manual, comparativa de 2 modelos, prompt ambiguo, loop infinito (timeout), offline y persistencia entre sesiones."
        >
          <PromptBlock label="Prompt 6.3 — Prueba manual">
{`Genera el protocolo de prueba manual de Construtor IA.

Escenarios:
1. Cargar desafío "factorial" de HumanEval y generar código
   â†’ ¿El código funciona? ¿Pasan los tests del desafío?
2. Introducir manualmente: "Escribe una función que devuelva el número de vocales en una cadena de texto" â†’ ¿El código es correcto?
3. Comparar el mismo desafío con 2 modelos diferentes (necesita 2 API keys)
   â†’ ¿La tabla comparativa muestra los dos resultados correctamente?
4. Introducir un prompt ambiguo (ej. "haz algo con números")
   â†’ ¿El código generado intenta resolver el problema? ¿Los tests fallan?
5. Activar sandbox y ejecutar código con loop infinito intencionado
   â†’ ¿El timeout mata el proceso correctamente sin bloquear la app?
6. Desconectar internet â†’ ¿Aparece el estado de fallback?
7. Verificar que el historial persiste entre sesiones

Señales de que está listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Decisión documentada sobre Python en el sandbox (.exe vs. Python del usuario). Comando de empaquetado, nota al usuario sobre los requisitos del sandbox."
        >
          <PromptBlock label="Prompt 6.4 — Empaquetado .exe">
{`Instrucciones de empaquetado para Construtor IA.

Dependencias: flet, duckdb, pydantic, httpx, python-dotenv
Archivos de datos: \`sample_coding_challenges.json\`, \`data_engineering/raw/humaneval.json\`

Consideración especial: el sandbox ejecuta "python" como subprocess.
En el ejecutable empaquetado por PyInstaller, "python" puede no estar disponible en el PATH del entorno sin Python instalado.

Opciones:
A) Incluir el intérprete Python en el ejecutable (\`PyInstaller --add-binary\`)
   [VERIFICAR EN DOCUMENTACI“N DE PYINSTALLER si esto es posible y cómo]
B) Requerir que el usuario tenga Python instalado (limitación de v1)
C) Usar el ejecutable de Python que viene con la app Flet

Genera la recomendación para v1 con la justificación, el comando de empaquetado y la nota al usuario sobre los requisitos del sandbox.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en máquina limpia" 
          goal="Protocolo en VM con/sin Python según decisión del paso 6.4. Checklist del sandbox, errores comunes de Flet/DuckDB/subprocess en Windows."
        >
          <PromptBlock label="Prompt 6.5 — Prueba en máquina limpia">
{`Protocolo de prueba del ejecutable de Construtor IA en entorno limpio.

ATENCI“N: el sandbox ejecuta Python. Verifica si la máquina limpia necesita Python instalado para el sandbox, según la decisión del paso 6.4.

1. Entorno de prueba: VM Windows con/sin Python según la decisión tomada
2. Archivos necesarios junto al .exe: \`.env\`, archivos JSON de desafíos
3. Checklist:
   - La app abre y muestra la pantalla de Generación
   - Se puede cargar un desafío HumanEval
   - El LLM genera código correctamente
   - El sandbox funciona (si Python está disponible)
   - Sin internet: aparece el estado de fallback
4. Errores comunes de Flet/DuckDB/subprocess en Windows [VERIFICAR EN DOCUMENTACI“N OFICIAL]
5. Cómo actualizar el modelo LLM a usar sin reinstalar la app (\`.env\`)`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 — ITERACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.amber}
          title="Iteración y publicación"
          desc="Publicar Construtor IA en el Foro de Proyectos con la advertencia de seguridad obligatoria, y planificar v2 con soporte SQL y sandbox Docker."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog en tabla: JS + SQL, sandbox Docker, comparativa paralela de 3 modelos. Capa afectada, complejidad, riesgo de seguridad adicional y prioridad."
        >
          <PromptBlock label="Prompt 7.A — Backlog v2">
{`Construtor IA v1 está funcionando. Planifica la v2.

Ideas para v2:
- Soporte para JavaScript con Node.js sandbox
- Soporte para SQL con DuckDB como ejecutor
- Sandbox más seguro con Docker
- Comparativa automática de 3 modelos en el mismo desafío

Para cada idea, analiza:
1. ¿Qué capa del mapa 1-6 afecta principalmente?
2. ¿Requiere cambiar el sandbox? ¿Añade riesgos de seguridad?
3. Complejidad y prioridad

Backlog v2 en formato tabla.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha con advertencia de seguridad del sandbox (obligatoria), capturas de badge PASA y comparativa de modelos, pregunta abierta sobre nivel de aislamiento aceptable."
        >
          <PromptBlock label="Prompt 7.B — Publicación en el Foro">
{`Genera la ficha de publicación de Construtor IA para el Foro Horizon.

1. Título: "Construtor IA v1 — Generación y Evaluación Objetiva de Código con LLMs"
2. Área: Ingeniería & Arquitectura
3. Descripción (máx 150 palabras)
4. Advertencia de seguridad del sandbox (texto corto, obligatorio)
5. Capturas: código generado con badge PASA, comparativa de modelos, historial
6. Instrucciones de instalación
7. Qué feedback busco: ¿tipos de desafíos que fallan? ¿calidad del sandbox?
8. Pregunta para la comunidad: "¿Qué nivel de aislamiento del sandbox consideráis mínimo aceptable para un entorno educativo?"`}
          </PromptBlock>
        </Step>

        {/* ─── Resultado esperado ─── */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(59,111,212,0.05)", borderColor: "rgba(59,111,212,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={16} style={{ color: C.accent }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.accent }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1–6 + Fase 7), tendrás un <strong>ejecutable de Construtor IA</strong> que genera código Python con el LLM líder en HumanEval, lo ejecuta en un sandbox con timeout configurable, muestra el resultado (PASA / FALLA / TIMEOUT) con quality score 0–100, y guarda el historial completo de evaluaciones para comparar modelos a lo largo del tiempo.
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

        {/* ─── Version extensions ─── */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

