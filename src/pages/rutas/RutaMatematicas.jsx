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

// —€—€—€ Tools table —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "Laboratorio Matemáticas (data_math/rankings/) · MATH · GSM8K · MAFBench · AIME", motivo: "Verificar qué modelos tienen scores reales verificables en razonamiento matemático formal." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Documento de definición", motivo: "Decidir qué tipos de problema (álgebra, cálculo, combinatoria, GSM8K) cubre la v1 y cuáles no son verificables automáticamente." },
  { capa: "2", subcapa: "2.1", herramienta: "data_math/raw/ · openai/gsm8k [VERIFICAR DOCS]", motivo: "Problemas GSM8K con respuesta numérica verificable ya descargados por el motor Horizon." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para MathProblem, MathSolution y EvaluationSession con campos de verificación." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators · re (regex)", motivo: "Extraer respuesta numérica de LaTeX \\boxed{}, fracciones, porcentajes y texto libre." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de evaluaciones con vistas de accuracy por modelo y desglose por nivel de dificultad." },
  { capa: "2", subcapa: "2.5", herramienta: "JSON manual", motivo: "15 problemas de 3 niveles con respuesta exacta para desarrollo offline." },
  { capa: "3", subcapa: "3.1", herramienta: "data_math/rankings/", motivo: "Seleccionar modelo con score verificado en MATH dataset y GSM8K." },
  { capa: "3", subcapa: "3.2", herramienta: "Chain of Thought prompting", motivo: "Sin CoT la precisión en matemáticas baja significativamente; el modelo debe razonar paso a paso." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx · openai SDK [VERIFICAR DOCS]", motivo: "Llamada async con temperatura 0.0 para respuestas deterministas." },
  { capa: "3", subcapa: "3.4", herramienta: "re (regex) · sympy [VERIFICAR DOCS]", motivo: "Extraer y normalizar respuesta numérica final del CoT." },
  { capa: "3", subcapa: "3.5", herramienta: "math.isclose", motivo: "Comparar respuestas numéricas con tolerancia relativa; nunca usar == con floats." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Marcar como 'No verificable automáticamente' cuando la extracción falla sin bloquear la app." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir las 3 pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2–4.5", herramienta: "Flet", motivo: "Área scrollable para CoT largo, DataTable para estadísticas y badges de resultado prominentes." },
  { capa: "5", subcapa: "5.1–5.5", herramienta: "Flet · DuckDB · python-dotenv", motivo: "Pipeline completo: evaluar â†’ parsear â†’ detectar issues â†’ persistir â†’ actualizar UI." },
  { capa: "6", subcapa: "6.1–6.2", herramienta: "Pytest", motivo: "Tests de extracción numérica, comparación con tolerancia y test de integración del pipeline." },
  { capa: "6", subcapa: "6.3", herramienta: "Problemas GSM8K reales", motivo: "Validación con datos del laboratorio de Matemáticas." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible; consideración especial con sympy." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon", motivo: "Publicar comparativas de accuracy de modelos y planificar v2 con evaluación paralela de 3 modelos." },
];

// —€—€—€ Phases overview —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const PHASES = [
  { id: "0", label: "Fase 0",  name: "Investigación",         summary: "Benchmarks matemáticos (MATH, GSM8K, AIME) y viabilidad de la verificación automática de respuestas." },
  { id: "1", label: "Capa 1", name: "Definición",             summary: "Perfil de usuario, problema, inputs/outputs, criterios de éxito y límites: solo respuestas numéricas verificables en v1." },
  { id: "2", label: "Capa 2", name: "Datos",                  summary: "Carga de GSM8K, Pydantic, extracción de respuesta numérica con regex, DuckDB y 15 problemas de ejemplo." },
  { id: "3", label: "Capa 3", name: "Lógica / IA",            summary: "Selección del modelo, Chain of Thought, llamada async, parseo de respuesta, detección de issues y fallback." },
  { id: "4", label: "Capa 4", name: "Interfaz (Flet)",        summary: "3 pantallas: Evaluación (badge + CoT), Estadísticas (accuracy por modelo) e Historial con filtros." },
  { id: "5", label: "Capa 5", name: "Integración",            summary: "Pipeline completo, errores en cascada, logging de evaluaciones y configuración con tolerancia numérica." },
  { id: "6", label: "Capa 6", name: "Pruebas y empaquetado",  summary: "Tests de extracción numérica, test de integración del pipeline, prueba manual con 7 escenarios y PyInstaller." },
  { id: "7", label: "Fase 7", name: "Iteración",              summary: "Publicar en el Foro de Proyectos y planificar v2 con evaluación simultánea de 3 modelos y formato AIME." },
];

// —€—€—€ Version extensions —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
const VERSIONS = [
  {
    tag: "v2 · Arena de modelos",
    area: "3 modelos simultáneos",
    title: "Prisma Arena — Comparativa paralela de razonamiento",
    desc: "Envía el mismo problema a 3 modelos en paralelo con asyncio.gather, muestra los tres razonamientos en columnas y declara ganador automáticamente por accuracy y tiempo de respuesta.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el usuario configura 3 API keys o selecciona 3 modelos del mismo proveedor",
      "Capa 3: solve_with_fallback() se lanza 3 veces con asyncio.gather; fallos individuales no cancelan los otros dos",
      "Capa 3: rank_solutions(): ordena los 3 resultados por is_correct + response_time",
      "Capa 4: pantalla Arena con 3 columnas de CoT + badges side-by-side",
      "Capa 4: banner 'Ganador: [MODELO]' con justificación (correcto + más rápido)",
      "Capa 5: el pipeline paralelo actualiza DuckDB con las 3 evaluaciones como unidad",
    ],
  },
  {
    tag: "v3 · AIME",
    area: "Competición matemática",
    title: "Prisma AIME — Problemas de alta dificultad",
    desc: "Extiende Prisma para soportar el formato AIME (problemas de competición matemática con respuesta entera 0-999), con timeout extendido y análisis de errores por etapa del razonamiento.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: nuevo tipo de problema AIME con respuesta entera 0-999 (nunca fracción ni decimal)",
      "Capa 2: campo aime_answer_int: Optional[int] en MathSolution; validación de rango 0-999",
      "Capa 3: timeout de 120s para AIME (los razonamientos son mucho más largos)",
      "Capa 3: temperatura 0.0 obligatoria (los problemas AIME tienen respuesta única exacta)",
      "Capa 4: badge especial 'AIME' en naranja; mostrar número de pasos del CoT en grande",
      "Capa 6: dataset de 5 problemas AIME reales de dominio público para testing",
    ],
  },
  {
    tag: "v4 · Informe PDF",
    area: "Exportación de resultados",
    title: "Prisma Report — Comparativa de modelos en PDF",
    desc: "Genera un informe PDF profesional con la comparativa de 2 o más modelos evaluados sobre el mismo conjunto estándar de 50 problemas GSM8K, con gráficos de accuracy por nivel y análisis de errores comunes.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: nueva acción 'Ejecutar benchmark completo' (50 problemas, puede tardar minutos)",
      "Capa 4: botón 'Exportar informe' visible en la pantalla de Estadísticas",
      "Capa 5: generate_pdf_report(): usa reportlab o weasyprint [VERIFICAR DOCS]",
      "Capa 5: el informe incluye: gráfico de barras de accuracy, tabla de errores comunes, tiempo medio de respuesta",
      "Capa 6: test de generación de PDF con datos de ejemplo (sin llamadas a API)",
      "Advertencia: el benchmark completo consume tokens de API; mostrar estimación de coste antes de ejecutar",
    ],
  },
];

// —€—€—€ Math verification notice —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
function MathVerificationNotice() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(59,111,212,0.04)", borderColor: "rgba(59,111,212,0.20)" }}>
      <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: C.accent }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(30,58,138,0.80)" }}>
        <strong>Límite de la verificación automática:</strong> Prisma Matemático verifica solo problemas con <strong>respuesta numérica exacta</strong>. Las demostraciones, los problemas de geometría con solución gráfica y los problemas con múltiples soluciones equivalentes requieren revisión humana y se marcan como "No verificable" sin error.
      </p>
    </div>
  );
}

// —€—€—€ Main component —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€
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
            Matemáticas & Procesos Complejos · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Prisma Matemático
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que evalúa el razonamiento matemático de cualquier LLM: el usuario introduce un problema, Prisma obtiene la solución con Chain of Thought, verifica la respuesta contra la solución correcta y produce un análisis de errores con historial comparativo por modelo.
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
                  <strong>¿Por qué Flet y no PyQt o Tkinter?</strong> Flet permite mostrar texto largo con scroll nativo y construir tablas de estadísticas con DataTable sin configuración adicional, lo que es suficiente para el contenido de Prisma Matemático sin necesidad del sistema de widgets más complejo de PyQt.
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
          desc="Confirmar qué benchmarks evalúan razonamiento matemático y hasta dónde puede llegar la verificación automática de respuestas antes de implementar nada."
        />

        <Step 
          num="0.A" 
          title="Benchmarks matemáticos clave" 
          goal="Identificar MATH, GSM8K, AIME y MAFBench; diferencias entre niveles; modelo líder en el ranking del laboratorio y alternativas open-source."
        >
          <PromptBlock label="Prompt 0.A — Benchmarks matemáticos">
{`Actúa como especialista en evaluación de LLMs para razonamiento matemático.
Tengo acceso al Laboratorio de Matemáticas de Horizon (\`data_math/rankings/\`).

Respóndeme:
1. ¿Qué benchmarks evalúan razonamiento matemático en LLMs? (MATH, GSM8K, AIME, MMLU-Math, MAFBench para multi-agente)
2. ¿Qué diferencia hay entre GSM8K (aritmética de primaria) y MATH (matemáticas universitarias)? ¿Cuál es más relevante para [ESCRIBE TU CASO DE USO]?
3. ¿Cuál es el modelo con mejor score en MATH según \`data_math/rankings/latest_rankings_math.json\`?
4. ¿Hay un modelo open-source en el Top-5 que pueda usar sin API de pago?

No inventes datos. Cita scores específicos del archivo de rankings.`}
          </PromptBlock>
        </Step>

        <Step 
          num="0.B" 
          title="Viabilidad de la verificación automática" 
          goal="Confirmar qué tipos de problemas tienen respuesta verificable automáticamente y cuáles no (demostraciones, geometría gráfica, múltiples soluciones equivalentes)."
        >
          <PromptBlock label="Prompt 0.B — Viabilidad de verificación automática">
{`Quiero construir Prisma Matemático, que verifica automáticamente si un LLM resuelve correctamente problemas matemáticos.

Antes de empezar, confirma:
1. ¿Todos los problemas de GSM8K tienen respuesta numérica exacta verificable? ¿Y los de MATH dataset? ¿Cuál es el formato de la respuesta correcta en cada uno?
2. ¿Es posible comparar la respuesta de un LLM con la solución correcta usando solo Python (sin motor CAS como Mathematica)? ¿Qué casos límite existen (fracciones, expresiones equivalentes, diferentes notaciones)?
3. ¿Para qué tipos de problemas matemáticos NO es posible la verificación automática (demostraciones, problemas de valor teórico)?

Esto determinará qué tipos de problemas puede evaluar la v1 de forma fiable.`}
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
          desc="Quién usa la app, qué métricas de evaluación importan, qué entra, qué sale y qué tipos de problema quedan fuera de la verificación automática en v1."
        />

        <Step 
          num="1.1" 
          title="¿Quién usa esta app?" 
          goal="Ficha con rol (docente, investigador, estudiante), nivel de matemáticas, volumen de evaluaciones por sesión y formato de resultados esperado."
        >
          <PromptBlock label="Prompt 1.1 — Perfil de usuario">
{`Define el perfil de usuario de Prisma Matemático.

La app evalúa el razonamiento matemático de LLMs comparando sus respuestas con soluciones correctas conocidas.

[DESCRIBE AQUÍ TU USUARIO OBJETIVO: ej. "profesor universitario de matemáticas que quiere saber qué LLM puede usar como tutor de su asignatura de cálculo" o "investigador de IA que compara modelos en problemas de combinatoria"]

Genera una ficha con:
- Nombre ficticio y rol (docente, investigador, estudiante, developer)
- Qué hace actualmente sin la app (¿prueba LLMs manualmente en el chat?)
- Qué nivel de matemáticas maneja (¿GSM8K de primaria o AIME de competición?)
- Cuántos problemas quiere evaluar por sesión (5, 50, 500)
- Qué formato de respuesta espera ver (texto, tabla comparativa, porcentaje de aciertos)
- Nivel técnico (¿sabe LaTeX? ¿usa Python? ¿solo web?)`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.2" 
          title="¿Qué problema concreto resuelve?" 
          goal="Una sola frase del problema. Aclarar si la app mide rendimiento del LLM, ayuda a aprender matemáticas, o ambas, siendo honesto sobre los límites de la verificación automática."
        >
          <PromptBlock label="Prompt 1.2 — Frase del problema">
{`Basándome en el perfil ([PEGA EL RESUMEN DEL PERFIL]), escribe UNA SOLA FRASE que defina el problema que Prisma Matemático resuelve.

Formato:
"[ROL] no puede [TAREA] porque [OBSTÁCULO], lo que provoca [CONSECUENCIA]."

Genera 3 variantes. Para cada una, indica:
- ¿El problema se puede resolver COMPLETAMENTE con evaluación automática, o algunos tipos de problema requieren revisión humana?
- ¿La app mide el rendimiento del LLM, ayuda al usuario a aprender matemáticas, o ambas cosas?

Sé honesto sobre las limitaciones de la verificación automática en matemáticas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.3" 
          title="¿Qué datos entran?" 
          goal="Lista completa: enunciado, carga desde GSM8K, modelo, nivel de dificultad, respuesta correcta opcional, área matemática y timeout de respuesta."
        >
          <PromptBlock label="Prompt 1.3 — Inputs de la app">
{`Para Prisma Matemático, define todos los datos de entrada.

El usuario puede:
- Escribir un problema matemático en texto libre (con o sin LaTeX)
- Cargar un conjunto de problemas desde el dataset GSM8K local
- Seleccionar el modelo LLM a evaluar
- Indicar la respuesta correcta conocida (si la tiene)
- Elegir el nivel de dificultad del problema: [Básico/Intermedio/Avanzado]

Genera la lista completa de inputs con:
- Nombre del campo
- Tipo de dato (texto, número, enum, archivo)
- Obligatorio u opcional
- Restricciones (ej. longitud máxima del enunciado)
- Qué hace la app si el campo obligatorio falta

[A‘ADE CUALQUIER INPUT ADICIONAL QUE NECESITES: ej. área matemática (álgebra, cálculo, combinatoria), tiempo máximo para que el LLM responda]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.4" 
          title="¿Qué sale?" 
          goal="Outputs: CoT completo, respuesta extraída, badge CORRECTO/INCORRECTO/NO VERIFICABLE, paso del primer error, score acumulado y estadísticas de sesión."
        >
          <PromptBlock label="Prompt 1.4 — Outputs de la app">
{`Define todos los outputs de Prisma Matemático para cada evaluación.

La app debe producir:
1. El razonamiento paso a paso del LLM (Chain of Thought completo)
2. La respuesta final extraída del razonamiento
3. Comparación con la respuesta correcta: Correcto / Incorrecto / No verificable
4. Si es incorrecto: en qué paso del razonamiento se produce el primer error (si es detectable automáticamente)
5. Score de precisión acumulado del modelo en esta sesión
6. Estadísticas de la sesión: N evaluaciones, X% aciertos, desglose por nivel

Para cada output especifica:
- Formato exacto (texto con scroll, número, barra de progreso, tabla)
- Cuándo se genera
- Si se guarda automáticamente en DuckDB

¿Necesitas exportar los resultados? ¿En qué formato?
[DEFINE TUS NECESIDADES CONCRETAS]`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.5" 
          title="Criterios de éxito" 
          goal="6–8 criterios verificables: precisión de extracción â‰¥95% en GSM8K, tiempo de evaluación, manejo de respuestas no numéricas, persistencia y comparativa de modelos."
        >
          <PromptBlock label="Prompt 1.5 — Criterios de éxito">
{`Define los criterios de éxito de Prisma Matemático v1.

Genera 6-8 criterios verificables. Incluye obligatoriamente:
- Precisión de la extracción de respuesta numérica (ej. "extrae correctamente la respuesta final en >=95% de los problemas GSM8K del dataset de ejemplo")
- Tiempo de evaluación (ej. "evalúa un problema GSM8K nivel básico en < 30s")
- Manejo de respuestas no numéricas (ej. "si el LLM no da respuesta numérica, marca como 'No verificable' sin excepción")
- Persistencia (ej. "el historial de evaluaciones persiste entre sesiones")
- Comparación de modelos (ej. "puede evaluar el mismo problema con 2 modelos distintos y comparar resultados en la pantalla de estadísticas")

No uses criterios vagos. Cada uno debe poder verificarse en < 5 minutos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="1.6" 
          title="Límites explícitos de la v1" 
          goal="Declaración formal: solo respuestas numéricas exactas. Lista de tipos de problema que requieren revisión manual y en qué versión podrían añadirse."
        >
          <PromptBlock label="Prompt 1.6 — Límites de la v1">
{`Define los límites explícitos de Prisma Matemático v1.

Problemas matemáticos que NO puede verificar automáticamente en v1:
[DECIDE CUÁLES EXCLUIR: ej. demostraciones (sin respuesta numérica), geometría con respuesta gráfica, ecuaciones con múltiples soluciones válidas equivalentes, problemas en LaTeX complejo]

Para cada límite:
1. ¿Por qué no es verificable automáticamente? (explica el problema técnico)
2. ¿Puede el usuario revisarlo manualmente dentro de la app?
3. ¿En qué versión podría añadirse?

Genera la declaración de límites:
"Prisma Matemático v1 verifica automáticamente SOLO problemas con respuesta numérica exacta (o fracción simplificada). Los siguientes tipos requieren revisión manual: [LISTA]."`}
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
          desc="Carga de GSM8K, modelos Pydantic, extracción de respuesta numérica desde \boxed{} y texto libre, almacenamiento DuckDB y 15 problemas de ejemplo."
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="load_gsm8k_problems() desde JSONL local (extrae respuesta del campo '####') y create_manual_problem() para entrada libre. Manejo de FileNotFoundError descriptivo."
        >
          <PromptBlock label="Prompt 2.1 — Fuente de datos">
{`Para Prisma Matemático, implementa la carga de problemas matemáticos.

Fuente 1 (local): problemas GSM8K en \`data_math/raw/gsm8k_problems.json\`
Formato de cada problema GSM8K: \`question\`: str, \`answer\`: str (donde \`answer\` incluye el razonamiento paso a paso y termina con "#### [NšMERO]").

Escribe:
1. \`load_gsm8k_problems(file_path: str, limit: int = 50) -> list[MathProblem]\`:
   - Carga el archivo JSON local
   - Extrae la respuesta numérica del campo answer (texto después de "####")
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
          <PromptBlock label="Prompt 2.2 — Modelos Pydantic">
{`Crea los modelos Pydantic v2 para Prisma Matemático.

1. \`MathProblem\`:
   - \`problem_id\`: str (generado automáticamente si es manual)
   - \`question\`: str (enunciado del problema)
   - \`correct_answer\`: Optional[str] (respuesta correcta como string)
   - \`correct_answer_numeric\`: Optional[float] (para comparación numérica)
   - \`source\`: Literal["gsm8k", "math_dataset", "manual"]
   - \`difficulty\`: Literal["basic", "intermediate", "advanced"]
   - \`math_area\`: Optional[str] (álgebra, cálculo, combinatoria, etc.)
   - \`is_verifiable\`: bool (True si tiene respuesta numérica exacta)

2. \`MathSolution\`:
   - \`problem_id\`: str
   - \`model_name\`: str
   - \`chain_of_thought\`: str (razonamiento completo)
   - \`extracted_answer\`: Optional[str] (respuesta final extraída)
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
          title="Extracción y normalización de respuestas" 
          goal="extract_numeric_answer(): busca \boxed{}, patrones de texto, fracciones y último número. compare_answers() con math.isclose, nunca ==. Tests unitarios extensos."
        >
          <PromptBlock label="Prompt 2.3 — Extracción numérica">
{`La parte más crítica de Prisma Matemático es extraer la respuesta numérica del texto del LLM. Los LLMs pueden responder de formas muy distintas:
- "La respuesta es **42**"
- "Por tanto, x = 3/4"
- "El resultado final es \\boxed{156}" (formato LaTeX de MATH dataset)
- "Answer: 7.5"
- "42" (solo el número)

Escribe \`extract_numeric_answer(llm_response: str) -> Optional[float]\` que:
1. Busca el patrón \`\\boxed{...}\` primero (formato MATH dataset) y extrae el valor
2. Si no: busca patrones como "La respuesta es X", "= X", "Answer: X"
3. Si no: busca el último número en la respuesta
4. Convierte fracciones simples "3/4" a float (0.75)
5. Convierte porcentajes "75%" a float (0.75) SOLO si el problema lo pide
6. Devuelve \`None\` si no puede extraer ningún número

Escribe también \`compare_answers(extracted: float, correct: float, tolerance: float = 1e-6) -> bool\` que:
- Usa \`math.isclose\` para comparación con tolerancia relativa y absoluta
- No usa \`==\`, nunca, para comparar floats

Incluye tests unitarios extensos para \`extract_numeric_answer\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="init_math_db(), store_solution(), get_model_stats() y get_history(). Vistas vw_model_accuracy y vw_difficulty_breakdown para la pantalla de estadísticas."
        >
          <PromptBlock label="Prompt 2.4 — DuckDB">
{`Crea la capa de persistencia de Prisma Matemático con DuckDB.

1. \`init_math_db(db_path: str) -> duckdb.DuckDBPyConnection\`:
   - Tablas: \`math_problems\`, \`math_solutions\`, \`evaluation_sessions\`
   - Vista: \`vw_model_accuracy\` (model_name, total, correct, accuracy, avg_response_time)
   - Vista: \`vw_difficulty_breakdown\` (model_name, difficulty, total, accuracy)

2. \`store_solution(conn, solution: MathSolution) -> str\`:
   - Guarda la solución del LLM
   - Actualiza la sesión activa con los contadores

3. \`get_model_stats(conn, model_name: Optional[str] = None) -> list[dict]\`:
   - Devuelve estadísticas por modelo (o todas si model_name=None)
   - Usa la vista \`vw_model_accuracy\`

4. \`get_history(conn, limit: int = 50, difficulty: Optional[str] = None) -> list[dict]\`:
   - Devuelve evaluaciones pasadas con filtro opcional por dificultad

Maneja excepciones DuckDB. No uses rutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo" 
          goal="15 problemas (5 básicos, 5 intermedios, 5 avanzados) con respuesta numérica exacta, explanation paso a paso y math_area. Compatible con MathProblem de Pydantic."
        >
          <PromptBlock label="Prompt 2.5 — Dataset de ejemplo">
{`Genera un dataset de ejemplo para Prisma Matemático.

Archivo \`sample_math_problems.json\` con 15 problemas:
- 5 de nivel básico (aritmética, porcentajes, regla de tres): tipo GSM8K
- 5 de nivel intermedio (ecuaciones de primer grado, probabilidad básica)
- 5 de nivel avanzado (combinatoria, ecuaciones cuadráticas, progresiones)

Para cada problema:
- \`question\`: str (enunciado claro en español)
- \`correct_answer\`: str (respuesta en formato string, ej. "42" o "3/4")
- \`correct_answer_numeric\`: float
- \`difficulty\`: "basic" / "intermediate" / "advanced"
- \`math_area\`: str
- \`is_verifiable\`: true (todos deben tener respuesta numérica exacta)
- \`explanation\`: str (solución paso a paso, para que el usuario pueda verificar)

Los problemas deben ser originales o de dominio público. No copies problemas con copyright.
Incluye el código Python que carga y valida este archivo con \`MathProblem\`.`}
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
          desc="Selección del modelo, Chain of Thought, llamada async con temperatura 0.0, parseo de respuesta numérica, detección de issues de razonamiento y fallback completo."
        />

        <Step 
          num="3.1" 
          title="Selección del modelo LLM" 
          goal="Modelo con mejor score en MATH y GSM8K. Verificar soporte de CoT, límite de contexto para AIME, temperatura recomendada para matemáticas y alternativa open-source."
        >
          <PromptBlock label="Prompt 3.1 — Selección del modelo">
{`Para Prisma Matemático, necesito el LLM con mejor razonamiento matemático.

Según \`data_math/rankings/latest_rankings_math.json\`:
- Modelo #1 en MATH dataset: [ESCRIBE EL MODELO Y SU SCORE]
- Modelo #1 en GSM8K: [ESCRIBE EL MODELO Y SU SCORE]

¿Son el mismo modelo o diferentes? Si son diferentes, ¿cuál uso para Prisma, que evaluará ambos tipos de problema?

Confirma:
1. ¿El modelo elegido soporta Chain of Thought (razonamiento paso a paso)?
2. ¿Cuál es su límite de contexto? ¿Es suficiente para problemas AIME (que pueden ser complejos y requerir razonamientos largos)?
3. ¿Tiene modo "math" o temperatura recomendada para tareas matemáticas? [VERIFICAR EN DOCUMENTACI“N OFICIAL]
4. Alternativa open-source: ¿DeepSeek-Math o similar está disponible con API? [VERIFICAR EN DOCUMENTACI“N OFICIAL]

Justifica la elección en 3 líneas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Diseño del prompt central" 
          goal="System prompt + user prompt con CoT numerado, \boxed{RESPUESTA} obligatorio al final, \boxed{NO_SOLUTION} si no puede resolver, y variante para nivel avanzado."
        >
          <PromptBlock label="Prompt 3.2 — Prompt Chain of Thought">
{`Diseña el prompt maestro de Prisma Matemático para que el LLM [MODELO ELEGIDO] resuelva problemas matemáticos con Chain of Thought.

El prompt debe:
1. Instruir al modelo a resolver el problema paso a paso, numerando cada paso
2. En el último paso: escribir la respuesta final en el formato \`\\boxed{RESPUESTA}\` (esto facilita la extracción automática)
3. Si el modelo no puede resolver el problema: escribir \`\\boxed{NO_SOLUTION}\` en lugar de inventar una respuesta
4. Prohibir explícitamente: saltar pasos, aproximar sin justificación, inventar fórmulas no estándar

System prompt: comportamiento general de resolución matemática rigurosa.
User prompt: plantilla con marcador \`{{PROBLEMA}}\`.

Genera ambos. Incluye también una variante del prompt para problemas de nivel avanzado que permite al modelo usar notación matemática más formal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo" 
          goal="solve_math_problem(): temperatura 0.0, retry 2 intentos, timeout 30s/60s según dificultad. Mide tiempo de respuesta. API key desde variable de entorno."
        >
          <PromptBlock label="Prompt 3.3 — Llamada al modelo">
{`Implementa \`solve_math_problem(problem: MathProblem, model_name: str) -> tuple[str, float]\` que:

1. Construye el mensaje con el prompt del paso anterior
2. Elige la temperatura: 0.0 para problemas básicos e intermedios (respuestas deterministas), 0.1 para avanzados (algo de flexibilidad en notación)
   [VERIFICAR EN DOCUMENTACI“N OFICIAL si temperatura 0.0 está soportada]
3. Mide el tiempo de respuesta con \`time.time()\`
4. Hace la llamada a la API de [MODELO]
5. Retry 2 intentos (máximo) con espera de 5s entre ellos
6. Timeout: 60s para problemas avanzados, 30s para básicos
7. Devuelve \`(respuesta_raw, tiempo_en_segundos)\`

API key desde \`PRISMA_LLM_API_KEY\`.
Registra en log: \`model_name\`, \`difficulty\` del problema, tiempo de respuesta.
No hardcodees ningún valor sensible.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo y estructuración de la respuesta" 
          goal="parse_math_solution(): extrae respuesta numérica, cuenta pasos del CoT, maneja NO_SOLUTION, compara con la correcta y construye MathSolution completo."
        >
          <PromptBlock label="Prompt 3.4 — Parseo de respuesta">
{`Implementa \`parse_math_solution(raw_response: str, problem: MathProblem, model_name: str, response_time: float) -> MathSolution\` que:

1. Usa \`extract_numeric_answer()\` del paso 2.3 para extraer la respuesta final
2. Intenta identificar el número de pasos en el Chain of Thought (contando líneas numeradas o separadores como "Paso 1:", "Step 1:")
3. Si la respuesta es NO_SOLUTION (el modelo declaró no poder resolverlo):
   - \`extracted_answer = None\`
   - \`is_correct = None\`
4. Si hay respuesta correcta conocida (\`problem.is_verifiable=True\`):
   - Compara con \`compare_answers()\` del paso 2.3
   - Asigna \`is_correct=True/False\`
5. Construye el objeto \`MathSolution\` completo

Si \`extract_numeric_answer\` devuelve \`None\` y \`problem.is_verifiable=True\`: marca \`is_correct=None\` con nota "Respuesta no extractable en formato numérico".`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Detección de issues en el razonamiento" 
          goal="detect_math_issues(): probabilidad > 1.0, división entre cero en texto, respuesta del CoT â‰  respuesta del boxed, número de pasos insuficiente para dificultad."
        >
          <PromptBlock label="Prompt 3.5 — Detección de issues">
{`En matemáticas, las alucinaciones son errores de razonamiento específicos.
Implementa \`detect_math_issues(solution: MathSolution) -> list[str]\` que detecta:

1. La respuesta extraída es numéricamente imposible para el tipo de problema (ej. probabilidad > 1.0, precio negativo en problema de compra)
2. El razonamiento contiene afirmaciones matemáticas claramente incorrectas que puede detectar con heurísticas simples:
   - División entre cero sin manejo (busca "/ 0" o "dividido entre 0")
   - Raíz cuadrada de negativo sin nota de números complejos
3. La respuesta final y la respuesta en el cuerpo del razonamiento no coinciden (ej. el razonamiento llega a 42 pero el boxed dice 43)
4. El número de pasos en el CoT es demasiado pequeño para la dificultad (ej. problema avanzado con solo 1 paso)

Devuelve lista de strings con los issues detectados.
Si la lista está vacía: no hay issues detectados (no garantiza que sea correcto).
Muestra los issues con la etiqueta "Revisar razonamiento".`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Función de fallback" 
          goal="solve_with_fallback(): siempre devuelve MathSolution válido. Timeout â†’ chain_of_thought=[TIMEOUT]. Error de API â†’ [ERROR]. Nunca bloquea la evaluación."
        >
          <PromptBlock label="Prompt 3.6 — Fallback">
{`Implementa \`solve_with_fallback(problem: MathProblem, model_name: str) -> tuple[MathSolution, bool]\` que:

1. Intenta \`solve_math_problem()\` + \`parse_math_solution()\`
2. Si falla por timeout: crea un \`MathSolution\` con:
   - \`chain_of_thought = "[TIMEOUT: el modelo tardó más de 60s sin responder]"\`
   - \`extracted_answer = None\`
   - \`is_correct = None\`
3. Si falla por error de API: crea un \`MathSolution\` con:
   - \`chain_of_thought = "[ERROR DE API: " + str(error) + "]"\`
4. Si \`parse_math_solution\` falla (respuesta parseada pero inválida):
   - Guarda la \`raw_response\` completa en \`chain_of_thought\`
   - \`extracted_answer = None\`
   - \`is_correct = None\`

Devuelve \`(solution, is_model_available)\`.
Cuando \`is_model_available=False\`: la UI muestra "Evaluación no disponible (error de API)".`}
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
          desc="3 pantallas: Evaluación con badge prominente y CoT scrollable, Estadísticas con accuracy por modelo y desglose por nivel, e Historial con filtros."
        />

        <Step 
          num="4.1" 
          title="Wireframe de 3 pantallas" 
          goal="Descripción textual de Evaluación, Estadísticas e Historial con componentes Flet para cada elemento, antes de escribir código."
        >
          <PromptBlock label="Prompt 4.1 — Wireframe">
{`Define el wireframe de Prisma Matemático con 3 pantallas:

1. Pantalla Evaluación (principal):
   - Área de texto para introducir el problema (con botón "Cargar de GSM8K")
   - Selector de modelo LLM
   - Indicador de nivel de dificultad (dropdown)
   - Campo opcional para la respuesta correcta conocida
   - Botón "Evaluar"
   - Panel de resultados (aparece después de evaluar):
     - Razonamiento CoT en área scrollable
     - Respuesta extraída en grande
     - Badge: CORRECTO (verde) / INCORRECTO (rojo) / NO VERIFICABLE (gris)
     - Lista de issues si los hay

2. Pantalla Estadísticas:
   - Tabla de accuracy por modelo (usando vw_model_accuracy)
   - Desglose por nivel de dificultad
   - Gráfico de barras si Flet lo soporta [VERIFICAR EN DOCUMENTACI“N DE FLET]

3. Pantalla Historial:
   - Lista de evaluaciones pasadas con filtros por modelo y nivel

Para cada elemento: componente Flet y justificación.
[VERIFICAR EN DOCUMENTACI“N DE FLET los componentes disponibles]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="TextField multiline, botón Cargar GSM8K, Dropdown de modelo y dificultad, campo de respuesta correcta opcional y botón Evaluar."
        >
          <PromptBlock label="Prompt 4.2 — Formulario">
{`Implementa el formulario de entrada de Prisma Matemático con Flet.

Escribe código Flet para:
1. Un \`ft.TextField\` multiline para el enunciado del problema
2. Un \`ft.ElevatedButton\` "Cargar problema de GSM8K" que abre un diálogo con la lista de problemas del dataset (título truncado + dificultad)
3. Un \`ft.Dropdown\` para seleccionar el modelo LLM
4. Un \`ft.Dropdown\` para el nivel de dificultad
5. Un \`ft.TextField\` opcional para la respuesta correcta conocida (con placeholder "Deja vacío si no conoces la respuesta")
6. Un \`ft.ElevatedButton\` "Evaluar" que llama a \`on_evaluate_click\` (Capa 5)
7. Un contador de evaluaciones de la sesión actual en la barra de estado

[VERIFICAR EN DOCUMENTACI“N DE FLET el comportamiento exacto de FilePicker y dialogs para la selección de problemas GSM8K]`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Área de resultados" 
          goal="Badge CORRECTO/INCORRECTO/NO VERIFICABLE con CoT en fuente monospace scrollable, lista de issues en ExpansionTile y tiempo de respuesta."
        >
          <PromptBlock label="Prompt 4.3 — Área de resultados">
{`Implementa el área de resultados de Prisma Matemático con Flet.

Recibe un \`MathSolution\` y una lista de issues.

Genera código Flet para:
1. Un \`ft.Container\` con el badge de resultado en grande:
   - CORRECTO: fondo verde, checkmark, respuesta correcta confirmada
   - INCORRECTO: fondo rojo, X, respuesta extraída vs. respuesta correcta
   - NO VERIFICABLE: fondo gris, "Revisión manual requerida"

2. Un área scrollable (\`ft.Column\` con \`scroll=ft.ScrollMode.AUTO\`) con el \`chain_of_thought\` completo en \`ft.Text\` con fuente monospace
   [VERIFICAR EN DOCUMENTACI“N DE FLET cómo especificar fuente monospace]

3. Si hay issues detectados: \`ft.ExpansionTile\` con "Posibles issues en el razonamiento" y la lista de issues dentro

4. Tiempo de respuesta del modelo en \`ft.Text\` pequeño (ej. "Respondido en 12.3s")

5. Botones: "Guardar evaluación", "Siguiente problema de GSM8K"

Los datos se reciben como parámetros, no hardcodeados.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacíos y de error" 
          goal="7 estados: inicio sin problema, evaluando con timer, timeout, respuesta no extractable (badge gris, no error), error de API, GSM8K no encontrado y DB no inicializable."
        >
          <PromptBlock label="Prompt 4.4 — Estados de error">
{`Define los estados excepcionales de Prisma Matemático.

Para cada estado, escribe el código Flet:
1. Sin problema introducido (inicio): texto guía + ejemplo de problema
2. Evaluando: \`ft.ProgressRing\` + "Resolviendo con [MODELO]..." con el tiempo transcurrido actualizándose cada segundo
3. Timeout (modelo tardó > límite): \`SnackBar\` "El modelo tardó demasiado. ¿Reintentar?"
4. Respuesta no extractable: badge gris "No verificable - ver razonamiento" (no es un error, es un estado válido)
5. Error de API: \`AlertDialog\` con descripción técnica + botón "Reintentar"
6. Dataset GSM8K no encontrado: mensaje "Archivo GSM8K no encontrado. Usa el modo manual para introducir problemas." con ruta esperada del archivo
7. Base de datos no inicializable: \`AlertDialog\` con opción de reiniciar la DB`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Navegación entre 3 pantallas" 
          goal="NavigationBar, Estadísticas se actualiza al navegar, Historial permite recargar el problema en Evaluación para reevaluar con otro modelo."
        >
          <PromptBlock label="Prompt 4.5 — Navegación">
{`Implementa la navegación de Prisma Matemático con Flet.

3 pantallas: Evaluación, Estadísticas, Historial.

Implementa:
1. \`NavigationBar\` o \`Tabs\` con iconos para las 3 pantallas
2. La pantalla Estadísticas se actualiza automáticamente al navegar a ella (no necesita botón de refresh)
3. Desde Historial: clic en una evaluación pasada muestra los detalles (\`chain_of_thought\` + badge) en un panel lateral o diálogo
4. Al cargar un problema de GSM8K desde Historial: vuelve a Evaluación con el mismo problema pre-cargado para reevaluarlo con un modelo diferente

Escribe el esqueleto completo de la app con las 3 pantallas y la navegación.
[VERIFICAR EN DOCUMENTACI“N DE FLET el sistema de navegación actual]`}
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
          desc="Pipeline matemático completo, errores en cascada, logging de evaluaciones sin incluir el enunciado y configuración con tolerancia numérica ajustable."
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lógica" 
          goal="on_evaluate_click(): valida prompt â‰¥10 chars, async con timer visual, llama al pipeline, actualiza UI con badge + issues, persiste en DuckDB y actualiza contador de sesión."
        >
          <PromptBlock label="Prompt 5.1 — Conexión UI â†” lógica">
{`Implementa \`on_evaluate_click(e)\` para Prisma Matemático que:

1. Valida que hay un problema introducido (mínimo 10 caracteres)
2. Construye el \`MathProblem\` con los datos del formulario
3. Muestra estado "Evaluando..." con timer visual
4. Llama a \`solve_with_fallback(problem, model_name)\` de forma asíncrona
5. Llama a \`detect_math_issues(solution)\` para obtener los issues
6. Actualiza el área de resultados con badge + CoT + issues
7. Llama a \`store_solution(conn, solution)\` para persistir
8. Actualiza el contador de la barra de estado
9. Si \`is_model_available=False\`: muestra mensaje de error apropiado

Usa \`asyncio\` con Flet [VERIFICAR EN DOCUMENTACI“N DE FLET].
No bloquees el hilo de UI. No hagas llamadas de red en el hilo principal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con datos" 
          goal="math_evaluation_pipeline(): solve â†’ detect_issues â†’ store â†’ actualizar EvaluationSession. Sin lógica de UI. Log con métricas pero sin el enunciado del problema."
        >
          <PromptBlock label="Prompt 5.2 — Pipeline completo">
{`Escribe \`math_evaluation_pipeline(problem: MathProblem, model_name: str, conn: duckdb.DuckDBPyConnection) -> tuple[MathSolution, list[str]]\` que:

1. Llama a \`solve_with_fallback(problem, model_name)\`
2. Llama a \`detect_math_issues(solution)\`
3. Guarda en DuckDB con \`store_solution()\`
4. Si es el primer problema de la sesión: crea una nueva \`EvaluationSession\` en DuckDB
5. Actualiza los contadores de la sesión (\`correct\`/\`incorrect\`/\`not_verifiable\`)
6. Devuelve \`(solution, issues)\`

La función no tiene lógica de UI.
Registra en log: \`problem_id\`, \`model_name\`, \`is_correct\`, \`response_time_seconds\`.
Re-lanza excepciones de DuckDB con contexto adicional.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Gestión de errores en cascada" 
          goal="PrismaError enum y PrismaException. Regla general: 'Nunca bloquear la evaluación por un error de persistencia.' Tabla de decisiones para cada punto de fallo."
        >
          <PromptBlock label="Prompt 5.3 — Gestión de errores">
{`Define el plan de errores en cascada para Prisma Matemático.

Puntos de fallo:
1. API LLM timeout â†’ \`MathSolution\` con \`chain_of_thought=[TIMEOUT]\`, badge gris
2. API LLM error â†’ \`MathSolution\` con \`chain_of_thought=[ERROR]\`, badge gris
3. \`extract_numeric_answer\` devuelve \`None\` â†’ badge gris (no verificable)
4. \`compare_answers\` falla (overflow, NaN) â†’ badge gris con nota técnica
5. \`store_solution\` falla â†’ mostrar resultados igualmente, log del error
6. Dataset GSM8K no existe â†’ solo modo manual, con mensaje descriptivo

Genera:
1. Enum \`PrismaError\`
2. Excepción \`PrismaException\` con campo \`retry_possible\`
3. Tabla de decisiones: para cada error, acción de la app
4. Regla general: "Nunca bloquear la evaluación por un error de persistencia"`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging de evaluaciones" 
          goal="math_logger.py con evaluations.log y debug.log. log_evaluation() sin el enunciado (ya en DuckDB), log_session_summary() al cerrar la app."
        >
          <PromptBlock label="Prompt 5.4 — Logging">
{`Escribe \`math_logger.py\` para Prisma Matemático:

1. Dos handlers: \`evaluations.log\` (rotativo 5MB) y \`debug.log\` (rotativo 2MB)
2. \`log_evaluation(problem_id: str, model_name: str, difficulty: str, is_correct: Optional[bool], response_time: float, issues_count: int)\`:
   - Registra métricas de cada evaluación SIN el enunciado del problema (puede ser texto largo; el enunciado ya está en DuckDB)
3. \`log_session_summary(session_id: str, accuracy: float, total: int)\`:
   - Registra el resumen de la sesión al cerrar la app
4. \`log_error(error_type: str, problem_id: str, message: str)\`: errores

Formato: \`[TIMESTAMP][NIVEL][M“DULO] mensaje\`
¿Por qué no guardar el enunciado en el log? Puede ser texto largo (problemas AIME) que haría los logs difíciles de leer. El enunciado completo está en DuckDB.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Configuración centralizada" 
          goal="config.py con PRISMA_ANSWER_TOLERANCE, timeouts por dificultad, PRISMA_GSM8K_PATH y constantes SUPPORTED_DIFFICULTIES y MAX_PROBLEM_LENGTH. .env.example completo."
        >
          <PromptBlock label="Prompt 5.5 — Configuración">
{`Escribe \`config.py\` para Prisma Matemático:

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
            CAPA 6 — PRUEBAS Y EMPAQUETADO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={FlaskConical}
          label="Capa 6"
          color="#0284C7"
          title="Pruebas y empaquetado"
          desc="Pytest unitario de extracción numérica, test de integración del pipeline completo, checklist manual y PyInstaller con consideraciones de sympy y datos JSON."
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="tests/test_math_logic.py con extract_numeric_answer, compare_answers, detect_math_issues y parse_math_solution. Fixtures con conftest.py, sin llamadas a APIs ni DuckDB."
        >
          <PromptBlock label="Prompt 6.1 — Tests unitarios">
{`Escribe tests unitarios con Pytest para Prisma Matemático.

Crea \`tests/test_math_logic.py\`:
1. \`extract_numeric_answer()\`: formato boxed, "la respuesta es X", "Answer: X", fracción "3/4", solo número, no hay número â†’ None, múltiples números â†’ toma el último/el del boxed
2. \`compare_answers()\`: iguales, tolerancia relativa, NaN â†’ False, infinito â†’ False, ambos negativos
3. \`detect_math_issues()\`: probabilidad > 1.0 en problema de probabilidad, división entre cero en razonamiento, CoT muy corto para problema avanzado
4. \`parse_math_solution()\`: respuesta correcta verificable, respuesta incorrecta, NO_SOLUTION en boxed, sin boxed pero con número al final

Fixtures en \`conftest.py\`: \`sample_basic_problem\`, \`sample_advanced_problem\`, \`sample_correct_solution_text\`, \`sample_incorrect_solution_text\`, \`sample_timeout_response\`.

No llames a APIs. No uses DuckDB en tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="tests/test_math_integration.py: DuckDB en memoria, mock de solve_math_problem con 3 problemas (CORRECTO, INCORRECTO, NO VERIFICABLE) y verificación de contadores de sesión."
        >
          <PromptBlock label="Prompt 6.2 — Test de integración">
{`Escribe \`tests/test_math_integration.py\`:

1. Carga \`sample_math_problems.json\`
2. DuckDB en memoria
3. Mockea SOLO \`solve_math_problem()\` con una respuesta CoT predefinida que incluye \`\\boxed{42}\` y la respuesta correcta del problema es 42
4. Ejecuta \`math_evaluation_pipeline()\` para 3 problemas del dataset
5. Verifica:
   a. 1 problema evaluado como CORRECTO (respuesta = 42)
   b. 1 problema evaluado como INCORRECTO (mock da respuesta incorrecta)
   c. 1 problema evaluado como NO VERIFICABLE (is_verifiable=False)
   d. La sesión en DuckDB tiene: problems_evaluated=3, correct=1, incorrect=1, not_verifiable=1, accuracy=0.5
   e. \`get_model_stats()\` devuelve 1 modelo con los datos correctos

Test adicional: mock que da respuesta no extractable â†’ badge NO VERIFICABLE sin excepción.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo con 7 escenarios: GSM8K básico, fracciones en álgebra, sin respuesta conocida (badge gris), probabilidad imposible (issue), desconexión de red, multi-modelo y persistencia."
        >
          <PromptBlock label="Prompt 6.3 — Protocolo manual">
{`Genera el protocolo de prueba manual de Prisma Matemático.

Escenarios:
1. Cargar 10 problemas GSM8K del nivel básico y evaluar 3 de ellos â†’ ¿El porcentaje de aciertos del modelo es coherente con su score oficial en GSM8K?
2. Introducir manualmente un problema de ecuaciones de segundo grado con respuesta conocida â†’ ¿La extracción numérica funciona con fracciones?
3. Introducir un problema sin respuesta conocida â†’ ¿Aparece badge gris sin error?
4. Intentar problema con respuesta imposible (probabilidad = 2.0) â†’ ¿Se detecta como issue?
5. Desconectar internet â†’ ¿Aparece el estado de fallback?
6. Evaluar mismo problema con 2 modelos diferentes â†’ ¿Las estadísticas reflejan ambos?
7. Verificar que el historial persiste al cerrar y reabrir la app

Señales de que está listo para empaquetar: [GENERA LA LISTA].`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Comando PyInstaller, inclusión de sample_math_problems.json y gsm8k_problems.json, consideración de sympy en el bundle e instrucciones para .env externo."
        >
          <PromptBlock label="Prompt 6.4 — PyInstaller">
{`Instrucciones de empaquetado para Prisma Matemático.

Dependencias: flet, duckdb, pydantic, httpx, python-dotenv
Archivos de datos: \`sample_math_problems.json\`, \`data_math/raw/gsm8k_problems.json\`
El \`.env\` NO se incluye.

Genera:
1. Comando de empaquetado (PyInstaller o flet build según documentación oficial) [VERIFICAR EN DOCUMENTACI“N DE FLET Y PYINSTALLER el método recomendado]
2. Cómo incluir los archivos JSON de problemas en el ejecutable
3. Problema conocido: sympy puede ser difícil de empaquetar con PyInstaller [VERIFICAR EN DOCUMENTACI“N DE SYMPY y PyInstaller si hay issues conocidos]
4. Alternativa: si no usas sympy, documenta por qué \`extract_numeric_answer\` no lo necesita para la v1
5. Instrucciones para configurar la API key sin modificar el ejecutable`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en máquina limpia" 
          goal="Checklist en VM sin Python ni sympy instalados, persistencia DuckDB en Windows y actualización de problemas GSM8K sin reinstalar."
        >
          <PromptBlock label="Prompt 6.5 — Prueba en máquina limpia">
{`Protocolo de prueba del ejecutable de Prisma Matemático en entorno limpio.

1. Entorno: VM Windows o macOS sin Python ni sympy instalados
2. Archivos necesarios junto al .exe: \`.env\`, ¿archivos JSON de problemas?
3. Checklist:
   - La app abre y muestra la pantalla de Evaluación
   - Se puede cargar un problema del dataset GSM8K
   - El modelo responde y aparece el badge de resultado
   - Las estadísticas se actualizan correctamente
   - El historial persiste tras cerrar y reabrir
4. Errores comunes de Flet/DuckDB en Windows y soluciones [VERIFICAR EN DOCUMENTACI“N OFICIAL]
5. Cómo el usuario actualiza los archivos de problemas GSM8K sin reinstalar la app (\`.env\`)`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 — ITERACI“N
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader
          icon={RefreshCw}
          label="Fase 7"
          color={C.cyan}
          title="Iteración y publicación"
          desc="Planificar v2 con Arena de 3 modelos simultáneos, soporte de problemas AIME y reportes PDF, y publicar en el Foro de Proyectos Horizon."
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog estructurado: Arena 3 modelos en paralelo, problemas AIME (alta dificultad), gráfico de evolución de accuracy por sesión y reporte comparativo PDF."
        >
          <PromptBlock label="Prompt 7.A — Planificar v2">
{`Prisma Matemático v1 está funcionando. Planifica la v2.

Ideas para v2:
- Comparar 3 modelos en el mismo problema en paralelo
- Soporte para problemas AIME (formato diferente y mayor dificultad)
- Gráfico de evolución de accuracy por sesión
- Exportar informe PDF de comparativa de modelos

Para cada idea:
1. ¿Qué capa del mapa 1-6 afecta?
2. ¿Requiere cambios en el esquema DuckDB? (migración de datos)
3. Complejidad y prioridad

Genera el Backlog v2 en formato tabla:
| Funcionalidad | Capa afectada | Migración DB | Complejidad | Prioridad |`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha completa de lanzamiento para Horizon: título, área temática, capturas requeridas, feedback buscado y preguntas de debate para la comunidad."
        >
          <PromptBlock label="Prompt 7.B — Publicar en Foro">
{`Genera la ficha de publicación de Prisma Matemático para el Foro Horizon.

1. Título: "Prisma Matemático v1 — [SUBTÍTULO]"
2. Área: Matemáticas & Procesos Complejos
3. Descripción (máx 150 palabras)
4. Capturas: badge CORRECTO con CoT, pantalla de estadísticas, historial
5. Instrucciones de instalación
6. Qué feedback busco: ¿tipos de problemas que fallan? ¿modelos adicionales?
7. Pregunta para la comunidad: ej. "¿Habéis encontrado casos donde \`extract_numeric_answer\` falla con una respuesta del LLM? ¿Qué formato usó el modelo?"`}
          </PromptBlock>
        </Step>

        {/* —€—€—€ Resultado esperado —€—€—€ */}
        <div className="mt-12 rounded-2xl p-6 border"
          style={{ background: "rgba(59,111,212,0.05)", borderColor: "rgba(59,111,212,0.18)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sigma size={16} style={{ color: C.accent }} />
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.accent }}>Resultado esperado</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(17,17,17,0.65)" }}>
            Al completar los 30+ prompts de esta ruta (Fase 0 + Capas 1–6 + Fase 7), tendrás un <strong>ejecutable de Prisma Matemático</strong> que evalúa el razonamiento matemático de cualquier LLM disponible por API, con verificación automática de respuestas numéricas, detección de posibles issues en el razonamiento, historial completo de evaluaciones almacenado con estadísticas de accuracy por modelo y nivel de dificultad.
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

        {/* —€—€—€ Version extensions —€—€—€ */}
        <VersionExtensions versions={VERSIONS} />

      </div>
    </div>
  );
}

