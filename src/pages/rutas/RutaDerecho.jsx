import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Check } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Layers } from "lucide-react";
import { Cpu } from "lucide-react";
import { Monitor } from "lucide-react";
import { Link2 } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Search } from "lucide-react";
import { ShieldAlert } from "lucide-react";

import {
  C, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// ─── Tools table ────────────────────────────────────────────────────────────—
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "Laboratorio Derecho · LegalBench · CUAD · MMLU-Law", motivo: "Verificar qué modelos tienen mejor performance en razonamiento legal verificado." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Documento de definición", motivo: "Definir el tipo de análisis legal y las advertencias de responsabilidad de la v1." },
  { capa: "2", subcapa: "2.1", herramienta: "data_legal/raw/ · texto manual", motivo: "Dataset CUAD de contratos reales + entrada libre del usuario." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para documentos legales y resultados de análisis." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators · re", motivo: "Verificar que las citas textuales existen en el documento original." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de análisis con metadatos (sin el texto del documento si es sensible)." },
  { capa: "2", subcapa: "2.5", herramienta: "Cláusulas CUAD de dominio público", motivo: "10 cláusulas de contratos reales de fuente pública para testing." },
  { capa: "3", subcapa: "3.1", herramienta: "data_legal/rankings/", motivo: "Seleccionar modelo con mejor score en LegalBench y CUAD." },
  { capa: "3", subcapa: "3.2", herramienta: "Prompt con instrucción de citar textualmente", motivo: "Forzar al modelo a citar el fragmento exacto que respalda cada hallazgo." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx · openai SDK [VERIFICAR DOCS]", motivo: "Llamada async con el texto completo en el contexto." },
  { capa: "3", subcapa: "3.4", herramienta: "re (regex) · Pydantic", motivo: "Extraer hallazgos estructurados con sus citas textuales." },
  { capa: "3", subcapa: "3.5", herramienta: "Python str.find() o regex", motivo: "Verificar que cada cita existe literalmente en el documento original." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Mostrar documento sin análisis y advertencia si el LLM no responde." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2–4.5", herramienta: "Flet", motivo: "Texto largo con scroll, citas resaltadas y badges de riesgo." },
  { capa: "5", subcapa: "5.1–5.5", herramienta: "Flet · DuckDB · python-dotenv", motivo: "Conexión entre capas." },
  { capa: "6", subcapa: "6.1–6.2", herramienta: "Pytest", motivo: "Tests de verificación de citas y parseo de análisis." },
  { capa: "6", subcapa: "6.3", herramienta: "Contratos reales anonimizados", motivo: "Validación con casos de uso reales." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon", motivo: "Publicar comparativas de modelos en razonamiento legal." },
];

// ─── Version extensions ──────────────────────────────────────────────────────—€
const VERSIONS = [
  {
    tag: "v2 · RGPD",
    area: "Cumplimiento normativo",
    title: "Norma Aurea — Auditor RGPD de documentos",
    desc: "Misma arquitectura de Lex Analyst enfocada exclusivamente en detectar incumplimientos del Reglamento General de Protección de Datos en políticas de privacidad, términos de servicio y formularios de consentimiento.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el tipo de análisis único es 'Cumplimiento RGPD'; se eliminan otros tipos",
      "Capa 2: el prompt incluye los artículos del RGPD más frecuentemente incumplidos como contexto del sistema",
      "Capa 3: los hallazgos citan el artículo RGPD relevante además del fragmento del documento",
      "Capa 3: verificación adicional de que los artículos citados existen en el RGPD (lista predefinida en config)",
      "Capa 4: badge de cumplimiento RGPD con semáforo específico (Cumple / Riesgo / Incumplimiento)",
      "Advertencia: la app no certifica el cumplimiento RGPD; requiere revisión por DPO o asesor legal",
    ],
  },
  {
    tag: "v2 · Contratos",
    area: "Revisión contractual",
    title: "Sententia — Comparador de versiones de contrato",
    desc: "Recibe dos versiones del mismo contrato (original y modificada) y genera un análisis diferencial: qué cláusulas cambiaron, qué riesgos nuevos introducen los cambios y qué protecciones se eliminaron.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: dos entradas de texto (versión A y versión B del contrato)",
      "Capa 2: esquema ContractDiff con lista de cláusulas modificadas, añadidas y eliminadas",
      "Capa 3: el prompt primero identifica las diferencias y luego analiza el impacto de riesgo de cada una",
      "Capa 3: verificación de citas en ambas versiones del documento",
      "Capa 4: vista en dos columnas (versión A vs. B) con las diferencias resaltadas",
      "Capa 6: dataset de ejemplo con dos versiones de NDA y 3 cambios de riesgo intencionales",
    ],
  },
  {
    tag: "v2 · Laboral",
    area: "Derecho laboral",
    title: "Clavis Laboral — Análisis de contratos de trabajo",
    desc: "Lex Analyst especializado en derecho laboral español: detecta cláusulas que se desvían del Estatuto de los Trabajadores, condiciones de jornada inusuales, penalizaciones desproporcionadas y omisiones de derechos básicos.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: el perfil de usuario es empleado o RRHH revisando contratos de trabajo",
      "Capa 2: el prompt incluye los artículos más relevantes del Estatuto de los Trabajadores como contexto",
      "Capa 3: los hallazgos incluyen la referencia normativa española aplicable (ET, LGSS, convenio colectivo)",
      "Capa 3: lista predefinida de cláusulas habituales en contratos laborales españoles para comparar",
      "Capa 4: sección específica de 'Derechos básicos verificados' además de los riesgos detectados",
      "Advertencia reforzada: el análisis no tiene en cuenta el convenio colectivo aplicable",
    ],
  },
];

// ─── Legal disclaimer banner (permanent, non-dismissible) ──────────────────—
function LegalBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(220,38,38,0.04)", borderColor: "rgba(220,38,38,0.20)" }}>
      <ShieldAlert size={18} className="shrink-0 mt-0.5" style={{ color: C.red }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(153,27,27,0.85)" }}>
        <strong>Advertencia legal permanente:</strong> Lex Analyst es una herramienta de investigación y aprendizaje. Los análisis generados son orientativos y <strong>no constituyen asesoramiento legal</strong>. Consulta siempre a un profesional del derecho antes de tomar cualquier decisión basada en estos resultados.
      </p>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────—
export default function RutaDerecho() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(59,111,212,0.10)", color: C.accent }}>
            Derecho & Cumplimiento Normativo · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Lex Analyst
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que analiza textos legales y contratos con el LLM líder en LegalBench, detecta riesgos con citas textuales verificadas y genera un informe estructurado con advertencias legales explícitas.
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

        {/* Permanent legal banner */}
        <LegalBanner />

        {/* Human validation warning */}
        <HumanValidationWarning />

        {/* Map overview */}
        <div className="rounded-2xl p-6 mb-8 border" style={{ background: "white", borderColor: "rgba(17,17,17,0.08)" }}>
          <h2 className="font-display text-lg mb-4" style={{ color: C.dark }}>Mapa de la ruta</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Fase 0", desc: "Investigación — LegalBench, CUAD, MMLU-Law", color: "#7C3AED" },
              { label: "Capa 1", desc: "Definición — incluye advertencias de responsabilidad", color: C.accent },
              { label: "Capa 2", desc: "Datos — CUAD, Pydantic, verificación de citas", color: C.emerald },
              { label: "Capa 3", desc: "IA — análisis legal con citas + control antialucinación", color: C.amber },
              { label: "Capa 4", desc: "Interfaz Flet — texto largo, badges de riesgo, disclaimer fijo", color: "#0891B2" },
              { label: "Capa 5", desc: "Integración — pipeline + log de privacidad (RGPD)", color: C.red },
              { label: "Capa 6", desc: "Pruebas y empaquetado", color: C.emerald },
              { label: "Fase 7", desc: "Iteración y publicación en Foro", color: "rgba(17,17,17,0.4)" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-[72px] shrink-0 text-[11px] font-semibold" style={{ color: row.color }}>{row.label}</div>
                <div className="flex-1 h-px" style={{ background: row.color + "30" }} />
                <div className="text-[12px]" style={{ color: "rgba(17,17,17,0.55)" }}>{row.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools table toggle */}
        <div className="mb-8">
          <button onClick={() => setToolsOpen(v => !v)}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: C.accent }}>
            <Layers size={15} />
            {toolsOpen ? "Ocultar" : "Ver"} herramientas por capa
            <ChevronDown size={14} style={{ transform: toolsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {toolsOpen && (
            <div className="mt-4 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(17,17,17,0.08)" }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: "rgba(17,17,17,0.04)" }}>
                    {["Capa", "Subcapa", "Herramienta(s)", "Por qué se usa aquí"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold" style={{ color: "rgba(17,17,17,0.5)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOOLS_TABLE.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "white" : "rgba(17,17,17,0.015)" }}>
                      <td className="px-4 py-2 font-semibold" style={{ color: C.accent }}>{r.capa}</td>
                      <td className="px-4 py-2" style={{ color: "rgba(17,17,17,0.5)" }}>{r.subcapa}</td>
                      <td className="px-4 py-2 font-mono text-[11px]" style={{ color: C.dark }}>{r.herramienta}</td>
                      <td className="px-4 py-2" style={{ color: "rgba(17,17,17,0.6)" }}>{r.motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* â•â•â•â• FASE 0 â•â•â•â• */}
        <PhaseHeader icon={Search} label="Fase 0" color="#7C3AED" title="Investigación"
          desc="Confirmar qué benchmarks y qué modelos lideran el razonamiento legal verificado antes de escribir código." />

        <Step num="0.A" title="Benchmarks de razonamiento legal"
          goal="Identificar qué benchmarks evalúan clasificación de cláusulas, QA legal y extracción de información en contratos.">
          <PromptBlock label="Prompt 0.A — Benchmarks legales clave">
{`Actúa como Investigador Principal y Especialista en Evaluación de Inteligencia Artificial en el Dominio Jurídico (LegalTech).

Tengo como objetivo seleccionar el modelo fundacional más fiable para "Lex Analyst", una herramienta de auditoría de contratos y detección de riesgos legales.

Analiza los benchmarks de dominio legal (LegalBench, CUAD - Contract Understanding Atticus Dataset, MMLU-Law, LexGLUE) y responde de forma rigurosa a los siguientes puntos:

1. METODOLOGÍA DE EVALUACI“N:
   - ¿Qué tareas específicas miden LegalBench y CUAD en relación a:
     a) Clasificación y tipificación de cláusulas contractuales (ej. indemnización, no competencia, confidencialidad).
     b) Extracción exacta de citas y entidades normativas sin parafraseo.
     c) Detección de ambigüedades y cláusulas asimétricas o potencialmente abusivas.

2. RANKING COMPARATIVO DE MODELOS:
   - Basándote en datos empíricos de LegalBench y CUAD, ¿qué modelos actuales (Claude 3.5 Sonnet / 3.7, GPT-4o, DeepSeek-R1, Gemini 1.5/2.0 Pro) obtienen la mayor fidelidad en extracción textual y la menor tasa de citas falsas (hallucinated citations)?

3. GESTI“N DE VENTANA DE CONTEXTO:
   - Los contratos mercantiles pueden superar los 30.000 tokens. ¿Qué trade-off existe entre modelos con contexto ultra-largo (1M tokens) y modelos con ventanas de 128k en la atención a cláusulas críticas ocultas al final del texto (Lost in the Middle problem)?

REGLAS ESTRICTAS:
- Cita métricas reales (F1-score, exact match, accuracy). No inventes puntuaciones.
- Enfatiza la distinción entre redacción legal general y extracción verídica de cláusulas contractuales.`}
          </PromptBlock>
        </Step>

        <Step num="0.B" title="Marco de responsabilidad para apps de análisis legal"
          goal="Definir disclaimers estándar de la industria y qué advertencias mínimas son razonables para un uso de investigación.">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>Antes del código:</strong> Este paso define el tono de toda la app. Las advertencias legales no son opcionales — forman parte del producto.
          </div>
          <PromptBlock label="Prompt 0.B — Marco de responsabilidad">
{`Actúa como Asesor Senior en Compliance Tecnológico y Marco Regulatorio de IA (EU AI Act y Servicios Jurídicos).

Antes de iniciar la codificación de "Lex Analyst", necesito definir la política de responsabilidad, descargos legales y privacidad de la aplicación:

1. TAXONOMÍA DE DISCLAIMERS EN LEGALTECH:
   - Analiza cómo gestionan la responsabilidad herramientas de referencia en el mercado (Harvey AI, Luminance, Robin AI, Casetext).
   - ¿Cuál es la formulación jurídica estándar que distingue una herramienta de "asistencia y triaje documental previo" del "asesoramiento legal profesional reservado por ley"?

2. CUMPLIMIENTO CON EL REGLAMENTO EUROPEO DE IA (EU AI Act):
   - ¿En qué nivel de riesgo se clasifica una aplicación de análisis contractual interno para uso empresarial o formativo?
   - ¿Qué requisitos de supervisión humana (Human-in-the-Loop) y transparencia algorítmica deben garantizarse en la interfaz?

3. POLÍTICA DE CONFIDENCIALIDAD Y RGPD:
   - Los contratos contienen datos identificativos, secretos comerciales y condiciones financieras.
   - Define el protocolo obligatorio de la app: advertencia visible sobre envío de datos a APIs externas, opción de sanitización local (Zero-PII) y política estricta de no persistencia documental por defecto (store_document_text = False).

Entrega la Declaración Formal de Descargo que debe permanecer visible en todas las pantallas de la aplicación.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â• CAPA 1 â•â•â•â• */}
        <PhaseHeader icon={BookOpen} label="Capa 1" color={C.accent} title="Definición del problema"
          desc="Seis preguntas que definen el problema, el usuario y los límites de responsabilidad de la v1." />

        <Step num="1.1" title="¿Quién usa esta app?" goal="El usuario puede no ser abogado. Eso cambia el tono de las advertencias y los tipos de análisis prioritarios.">
          <PromptBlock label="Prompt 1.1 — Perfil de usuario">
{`Actúa como Diseñador de Producto y Analista Funcional en LegalTech.

Define la ficha formal de perfil de usuario (User Persona) para "Lex Analyst":

1. IDENTIFICACI“N Y ROL OPERATIVO:
   - Perfil principal: Responsable de Compras / Director de Operaciones en PYME o Startup que revisa contratos mercantiles (NDAs, contratos de prestación de servicios, SaaS, arrendamientos) antes de trasladarlos a la asesoría jurídica externa.
   - Perfil secundario: Abogado junior o estudiante de derecho que realiza una primera lectura de contraste para detectar cláusulas no estándar.

2. FLUJO DE TRABAJO ACTUAL (Puntos de Dolor):
   - Proceso manual actual: Lectura completa en PDF o Word con marcado de párrafos dudosos, invirtiendo de 2 a 4 horas por contrato.
   - Puntos críticos: Pasar por alto plazos de preaviso de terminación automática, cláusulas de indemnización ilimitada o sumisión a tribunales extranjeros desfavorables.

3. EXPECTATIVAS RESPECTO A LA HERRAMIENTA:
   - El usuario no espera que la app emita un dictamen vinculante, sino que actúe como un escáner de alta precisión que resalte las secciones de mayor riesgo con el texto exacto entrecomillado.
   - Requiere un ejecutable de escritorio intuitivo, rápido y con exportación directa en Markdown/PDF.`}
          </PromptBlock>
        </Step>

        <Step num="1.2" title="¿Qué problema concreto resuelve?" goal="Una frase precisa. Distinguir: ¿Lex Analyst REEMPLAZA la revisión legal o hace una PRIMERA PASADA?">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(59,111,212,0.05)", borderLeft: "3px solid " + C.accent, color: "rgba(17,17,17,0.65)" }}>
            Esta distinción (reemplazar vs. primera pasada) determina el diseño de todas las advertencias y el nivel de detalle de los análisis.
          </div>
          <PromptBlock label="Prompt 1.2 — Definición del problema">
{`Actúa como Especialista en Propuesta de Valor y Estrategia LegalTech.

Redacta la declaración formal del problema que resuelve "Lex Analyst":

1. ESTRUCTURA FORMAL DE LA FRASE MAESTRA:
   "[ROL DE GESTI“N] invierte [HORAS CRÍTICAS] en la lectura de contratos mercantiles sin contar con el criterio de un especialista para cada borrador, lo que provoca [RIESGO DE ACEPTAR CLÁUSULAS ABUSIVAS, COSTES LEGALES PREVENTIVOS ELEVADOS Y DEMORAS EN EL CIERRE DE ACUERDOS]."

2. GENERACI“N DE 3 VARIANTES DE ENFOQUE:
   - Variante 1 (Ahorro de Tiempo y Coste): Enfoque en la eficiencia de la primera pasada previa al abogado.
   - Variante 2 (Control de Riesgo Contractual): Enfoque en la detección temprana de cláusulas lesivas.
   - Variante 3 (Formación y Capacitación): Enfoque en la comprensión de jerga jurídica compleja.

3. DECLARACI“N DE LÍMITES ENTRE REEMPLAZO Y COMPLEMENTO:
   - Define el lema rector de la app para su hero visual: "Lex Analyst no reemplaza al abogado; le proporciona a cualquier profesional una primera lectura rigurosa para negociar con conocimiento de causa".`}
          </PromptBlock>
        </Step>

        <Step num="1.3" title="¿Qué datos entran?" goal="Texto pegado por el usuario, cláusulas CUAD de práctica, tipo de análisis y jurisdicción.">
          <PromptBlock label="Prompt 1.3 — Datos de entrada">
{`Actúa como Ingeniero de Datos y Diseñador de Entradas en Sistemas Legales.

Define la especificación exhaustiva de todas las entradas (Inputs) admitidas por "Lex Analyst":

1. FUENTES DE TEXTO ADMITIDAS:
   - Entrada Manual / Portapapeles: Área de texto multilínea para pegar fragmentos, cláusulas o contratos íntegros (hasta 50.000 caracteres / ~12.000 tokens en v1).
   - Biblioteca CUAD de Práctica: Selector desplegable con 10 cláusulas contractuales reales de dominio público (NDAs, limitación de responsabilidad, resolución de disputas, terminación).

2. PARÁMETROS DE CONFIGURACI“N DEL ANÁLISIS:
   - Tipo de Análisis (Selector exclusivo):
     * [Detección de Riesgos Contractuales Generales]
     * [Auditoría de Cumplimiento RGPD en Políticas / Cláusulas de Datos]
     * [Identificación de Cláusulas Abusivas o Desequilibradas]
     * [Análisis de Cláusulas de Terminación y Penalizaciones]
   - Jurisdicción de Referencia: España (Derecho Civil / Mercantil), Unión Europea (Normativa Comunitaria), o Internacional (Common Law).
   - Modelo LLM: Selector de proveedor y modelo (Claude 3.5 Sonnet por defecto).

3. GESTI“N DE DOCUMENTOS EXTENSOS:
   - Contador visual reactivo de tokens estimados.
   - Si el texto supera el límite operativo, activa un diálogo de advertencia ofreciendo truncar al inicio/fin o procesar por secciones.`}
          </PromptBlock>
        </Step>

        <Step num="1.4" title="¿Qué sale?" goal="Hallazgos con citas verificadas, badge de riesgo global, resumen ejecutivo e informe con disclaimer obligatorio.">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}>
            <strong>Advertencia obligatoria en cada output:</strong> "Este análisis es orientativo. No constituye asesoramiento legal. Consulta a un profesional del derecho antes de tomar decisiones."
          </div>
          <PromptBlock label="Prompt 1.4 — Outputs">
{`Actúa como Diseñador de Salidas de Información y Auditoría Legal.

Define las especificaciones de salida (Outputs) producidas por "Lex Analyst":

1. ESTRUCTURA DEL ANÁLISIS CONTRACTUAL:
   - Resumen Ejecutivo (Executive Summary): Síntesis de 150-200 palabras con el balance global del documento.
   - Semáforo de Riesgo Global: Badge visual destacado: [ALTO] (rojo), [MEDIO] (ámbar), [BAJO] (verde) o [INFORMATIVO] (azul), determinado por el riesgo del hallazgo más severo.
   - Lista Estructurada de Hallazgos (Risk Flags): Para cada riesgo detectado:
     * Título y Tipo de Riesgo (ej. "Cláusula de Indemnización Desproporcionada").
     * Nivel de severidad individual.
     * Cita Textual Exacta (Verbatim Quote): Fragmento literal extraído del documento.
     * Explicación del Riesgo (máx. 100 palabras): Por qué la cláusula puede perjudicar al usuario.
     * Nota de Consulta Recomendada: Pregunta concreta sugerida para trasladar al abogado (ej. "Solicitar inclusión de un límite cuantitativo de responsabilidad ligado al importe del contrato").
   - Notas de Limitación del Análisis: Lista de aspectos no evaluados (ej. "No se ha contrastado con convenios colectivos ni antecedentes registrales").

2. EXPORTABILIDAD:
   - Generación de informe en Markdown (.md) y PDF con sello de tiempo UTC y descargo legal formal.`}
          </PromptBlock>
        </Step>

        <Step num="1.5" title="Criterios de éxito" goal="7-9 criterios verificables, incluyendo: 100% de citas verificadas en el texto, advertencia visible en todas las pantallas.">
          <PromptBlock label="Prompt 1.5 — Criterios de éxito">
{`Actúa como QA Lead y Auditor de Software Especializado en LegalTech.

Define los Criterios de Aceptación Cuantitativos (DoD - Definition of Done) para certificar que Lex Analyst v1 está listo para entrega:

Formula entre 7 y 9 criterios verificables en menos de 10 minutos bajo la estructura:
"La aplicación se considera correcta y lista para producción cuando [CONDICI“N VERIFICABLE Y MEDIBLE]."

Incluye obligatoriamente:
1. VERIFICACI“N DETERMINISTA DE CITAS: "El 100% de las citas textuales generadas por el LLM son verificadas automáticamente contra el texto de entrada mediante búsqueda de subcadena; si una cita no existe, se marca inmediatamente con badge de advertencia."
2. ADVERTENCIA PERMANENTE: "El banner legal de advertencia permanece visible en la pantalla principal y en cada informe exportado sin posibilidad de ser desactivado."
3. TOLERANCIA A DOCUMENTOS LARGOS: "La app procesa documentos de hasta 15.000 palabras sin bloquear el hilo de la interfaz de usuario ni agotar la memoria."
4. ROBUSTEZ EN MODO DESCONECTADO: "Si la API no responde o se desconecta la red, la app no sufre crashes y muestra el texto original con aviso de contingencia."
5. CALIDAD PERCIBIDA EN PRUEBA MANUAL: "En la evaluación con 5 contratos reales anonimizados, la app identifica con precisión al menos el 80% de las cláusulas de riesgo identificadas previamente por un abogado."`}
          </PromptBlock>
        </Step>

        <Step num="1.6" title="Límites explícitos de la v1" goal="Qué idiomas, jurisdicciones y tipos de análisis NO cubre la v1, y la advertencia legal formal de la app.">
          <PromptBlock label="Prompt 1.6 — Límites v1 + advertencia legal formal">
{`Actúa como Asesor Jurídico y Product Owner.

Redacta la Declaración Formal de Límites y el Aviso Legal Integral para "Lex Analyst v1":

1. LÍMITES TÃ‰CNICOS Y FUNCIONALES EXCLUIDOS DE LA V1:
   - Idiomas soportados: Exclusivamente español e inglés.
   - Sin análisis jurisprudencial dinámico: El modelo no consulta bases de datos de sentencias judiciales en tiempo real.
   - Sin verificación de vigencia normativa: No contrasta en tiempo real con modificaciones de última hora del BOE/DOUE.
   - No redacción de contraofertas o adendas modificativas de forma automática.

2. TEXTO LEGAL FORMAL DEL DESCARGO (Aparece en pantalla inicial y pie de informes):
   "AVISO LEGAL IMPORTANTE: Lex Analyst es una herramienta de asistencia tecnológica para el análisis preliminar de textos contractuales con fines de estudio e investigación. Los informes, clasificaciones y sugerencias emitidos NO CONSTITUYEN NI SUSTITUYEN EL ASESORAMIENTO JURÍDICO DE UN ABOGADO COLEGIADO. La interpretación de contratos requiere un análisis pormenorizado del contexto mercantil, la legislación aplicable y la jurisprudencia de cada jurisdicción. El usuario es el único responsable de someter cualquier borrador o acuerdo a la revisión de un profesional del derecho antes de su firma o ejecución."`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 — DATOS (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Layers} 
          label="Capa 2" 
          color={C.emerald} 
          title="Datos"
          desc="CUAD como base de práctica, esquemas Pydantic, verificación de citas y almacenamiento con consideraciones de privacidad." 
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="Implementar carga desde CUAD local y creación de documentos desde texto pegado por el usuario."
        >
          <PromptBlock label="Prompt 2.1 — load_cuad_clauses() + create_manual_document()">
{`Actúa como Ingeniero de Datos en Python especializado en procesamiento de textos legales.

Crea el módulo \`document_loader.py\` para la ingesta y preparación de documentos contractuales en "Lex Analyst":

1. ESPECIFICACI“N DE FUNCIONES:
   - \`load_cuad_clauses(file_path: Path, limit: int = 20) -> list[LegalDocument]\`:
     * Carga el archivo local \`data_legal/raw/cuad_clauses.json\` conteniendo cláusulas anotadas del benchmark CUAD.
     * Soporta formato JSON array y JSONL.
     * Agrupa y normaliza por \`document_name\` y \`clause_type\` para su consumo directo en la interfaz de usuario.
     * Lanza \`FileNotFoundError\` con mensaje instructivo si el archivo de demostración no está presente.
   
   - \`create_manual_document(text: str, document_type: str, jurisdiction: str = "España") -> LegalDocument\`:
     * Normaliza saltos de línea (\\r\\n -> \\n) y limpia espacios en blanco redundantes.
     * Evalúa la longitud del texto. Si supera \`MAX_TEXT_LENGTH\` (ej. 50.000 caracteres), trunca de forma segura en el último punto y aparte y marca \`is_truncated = True\`.
     * Genera un identificador único UUID4 para la sesión de análisis.

2. REQUISITOS TÃ‰CNICOS:
   - Utiliza exclusivamente \`pathlib.Path\`. Prohibido el uso de rutas absolutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="LegalDocument · RiskFlag · LegalAnalysis — incluyendo quote_verified y legal_disclaimer."
        >
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { name: "LegalDocument", fields: ["document_id", "text", "document_type", "jurisdiction", "source", "is_truncated"] },
              { name: "RiskFlag", fields: ["finding_type", "risk_level", "verbatim_quote", "quote_verified", "explanation", "recommendation_note"] },
              { name: "LegalAnalysis", fields: ["risk_flags", "global_risk_level", "executive_summary", "limitation_notes", "legal_disclaimer"] },
            ].map(m => (
              <div key={m.name} className="p-4 rounded-xl border text-[12px]"
                style={{ borderColor: "rgba(5,150,105,0.2)", background: "rgba(5,150,105,0.03)" }}>
                <div className="font-semibold mb-2 font-mono" style={{ color: C.emerald }}>{m.name}</div>
                <ul className="space-y-1">
                  {m.fields.map(f => (
                    <li key={f} className="font-mono" style={{ color: "rgba(17,17,17,0.6)" }}>· {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 2.2 — Esquema Pydantic">
{`Actúa como Arquitecto de Software Python y Especialista en Modelado de Dominio LegalTech.

Crea el archivo \`schemas.py\` utilizando Pydantic v2 con validación estricta para "Lex Analyst":

1. ESPECIFICACI“N DE MODELOS DE DOMINIO:
\`\`\`python
from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime
from uuid import UUID, uuid4

class LegalDocument(BaseModel):
    document_id: UUID = Field(default_factory=uuid4)
    text: str = Field(..., min_length=50, description="Texto completo del contrato o cláusula")
    document_type: str = Field(default="Contrato Mercantil General")
    jurisdiction: Optional[str] = Field(default="España")
    source: Literal["cuad", "manual"] = "manual"
    is_truncated: bool = False
    original_length_chars: int = 0

class RiskFlag(BaseModel):
    flag_id: UUID = Field(default_factory=uuid4)
    finding_type: str = Field(..., description="Tipo de hallazgo (ej. Indemnización ilimitada)")
    risk_level: Literal["ALTO", "MEDIO", "BAJO", "INFORMATIVO"]
    verbatim_quote: str = Field(..., description="Cita textual exacta extraída del contrato")
    quote_verified: bool = Field(default=False, description="True si la cita existe en el texto original")
    explanation: str = Field(..., max_length=600, description="Explicación del riesgo en máx 100 palabras")
    recommendation_note: str = Field(..., description="Qué aspecto revisaría un abogado; sin asesorar")

class LegalAnalysis(BaseModel):
    analysis_id: UUID = Field(default_factory=uuid4)
    document_id: UUID
    model_name: str
    analysis_type: str
    risk_flags: list[RiskFlag]
    global_risk_level: Literal["ALTO", "MEDIO", "BAJO", "INFORMATIVO"]
    executive_summary: str = Field(..., max_length=1500)
    limitation_notes: list[str] = Field(default_factory=list)
    analyzed_at: datetime = Field(default_factory=datetime.utcnow)
    legal_disclaimer: str
\`\`\`

2. MÃ‰TODOS Y VALIDACIONES:
   - Incluye docstrings explicativos en cada modelo y validadores para asegurar que \`legal_disclaimer\` no esté vacío.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="Verificación de citas textuales" 
          goal="La función más importante de honestidad: verify_quote() comprueba que cada cita del LLM existe en el texto original."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla de oro:</strong> Si &gt;50% de las citas no se verifican en el documento, el análisis muestra advertencia global de fiabilidad.
          </div>
          <PromptBlock label="Prompt 2.3 — verify_quote() + verify_all_quotes()">
{`Actúa como Ingeniero de Algoritmos y Auditoría Textual en Python.

Crea el módulo \`quote_verifier.py\` con el motor determinista de verificación de citas para erradicar alucinaciones en "Lex Analyst":

1. FUNCI“N \`verify_quote(quote: str, document_text: str, fuzzy_threshold: float = 0.85) -> bool\`:
   - Fase 1 (Búsqueda Exacta): \`quote.strip() in document_text\`. Si coincide, retorna \`True\`.
   - Fase 2 (Búsqueda Normalizada): Elimina saltos de línea redundantes, homologa comillas tipográficas (« », “ –, ' ') con comillas rectas (' "), y compara sin distinción de mayúsculas/minúsculas.
   - Fase 3 (Búsqueda por Subcadena Tolerante): Si la cita es extensa (> 10 palabras), verifica si al menos el 85% de las secuencias de n-gramas coinciden de forma contigua en el documento.
   - Retorna \`False\` si no se verifica la presencia real de la cita.

2. FUNCI“N \`verify_all_quotes(risk_flags: list[RiskFlag], document_text: str) -> tuple[list[RiskFlag], int, bool]\`:
   - Itera sobre todos los hallazgos y actualiza el campo booleano \`quote_verified\`.
   - Contabiliza las citas fallidas (\`unverified_count\`).
   - Activa \`has_critical_unverified_warning = True\` si más del 50% de las citas no pudieron verificarse en el texto fuente.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="Historial de análisis con decisión de privacidad: guardar o no el texto completo del documento."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.amber }}>Decisión de diseño:</strong> store_document_text=False por defecto. Los documentos legales del usuario pueden ser confidenciales.
          </div>
          <PromptBlock label="Prompt 2.4 — Persistencia DuckDB con privacidad">
{`Actúa como Especialista en Bases de Datos y Privacidad en Sistemas de Información.

Crea el módulo \`storage.py\` para gestionar la persistencia local de análisis legales en DuckDB (\`~/.lex_analyst/data/legal_history.duckdb\`):

1. ARQUITECTURA RELACIONAL Y PRIVACIDAD POR DEFECTO:
   - \`init_legal_db(db_path: Path, store_document_text: bool = False) -> duckdb.DuckDBPyConnection\`:
     * Tabla \`legal_analyses\`: \`analysis_id\`, \`document_id\`, \`model_name\`, \`analysis_type\`, \`global_risk_level\`, \`num_findings\`, \`unverified_quotes_count\`, \`analyzed_at\`.
     * Tabla \`risk_flags\`: \`flag_id\`, \`analysis_id\`, \`finding_type\`, \`risk_level\`, \`verbatim_quote\`, \`quote_verified\`, \`explanation\`.
     * Tabla opcional \`document_payloads\`: Solo se crea e inserta si \`store_document_text == True\` (desactivado por defecto para proteger el secreto comercial).

2. OPERACIONES TRANSACCIONALES:
   - \`store_analysis(conn, analysis: LegalAnalysis, document: LegalDocument, store_text: bool = False) -> str\`: Inserción atómica.
   - \`get_analysis_history(conn, limit: int = 25) -> list[dict]\`: Consulta cronológica para la vista de Historial.
   - \`export_analysis_markdown(conn, analysis_id: str, output_path: Path) -> Path\`: Genera informe exportable completo con la advertencia legal fija.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo" 
          goal="10 cláusulas de dominio público: NDA, limitación de responsabilidad, resolución de disputas, terminación."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {[
              { tipo: "NDA (3)", desc: "Una estándar · una con plazo inusualmente largo · una con alcance muy amplio" },
              { tipo: "Limitación de responsabilidad (3)", desc: "Equilibrada · muy favorable a una parte · redacción ambigua" },
              { tipo: "Resolución de disputas (2)", desc: "Con arbitraje · con elección de jurisdicción extranjera" },
              { tipo: "Terminación (2)", desc: "Estándar · plazo de preaviso muy corto" },
            ].map(s => (
              <div key={s.tipo} className="p-3 rounded-lg text-[12px]"
                style={{ background: "rgba(17,17,17,0.03)", borderLeft: "2px solid rgba(17,17,17,0.10)" }}>
                <div className="font-semibold mb-1" style={{ color: C.dark }}>{s.tipo}</div>
                <div style={{ color: "rgba(17,17,17,0.55)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 2.5 — sample_legal_clauses.json">
{`Actúa como Abogado Mercantil y Curador de Datasets de Formación LegalTech.

Crea el archivo \`sample_legal_clauses.json\` con 10 cláusulas reales de contratos mercantiles de dominio público para pruebas y calibración:

1. COMPOSICI“N DEL CATÁLOGO (10 Casos):
   - **3 Cláusulas de Confidencialidad (NDA):**
     * Cláusula 1: Redacción estándar y bilateral a 2 años.
     * Cláusula 2: Plazo perpetuo e inusualmente lesivo para información comercial no técnica.
     * Cláusula 3: Definición desmesuradamente amplia de información confidencial incluyendo datos públicos.
   - **3 Cláusulas de Limitación de Responsabilidad:**
     * Cláusula 4: Límite equitativo indexado a las cantidades abonadas en los últimos 12 meses.
     * Cláusula 5: Exoneración total de responsabilidad por daños directos e indirectos solo a favor del proveedor.
     * Cláusula 6: Redacción ambigua y contradictoria sobre lucro cesante.
   - **2 Cláusulas de Resolución de Conflictos:**
     * Cláusula 7: Sumisión a arbitraje vinculante en la Cámara de Comercio de Madrid.
     * Cláusula 8: Elección de fuero judicial en Delaware (EE.UU.) con renuncia expresa a tribunales locales del cliente.
   - **2 Cláusulas de Terminación y Rescisión:**
     * Cláusula 9: Terminación por incumplimiento con preaviso razonable de 30 días hábiles.
     * Cláusula 10: Facultad de resolución unilateral inmediata sin causa con preaviso de solo 24 horas.

2. METADATOS POR CLÁUSULA:
   - \`clause_id\`, \`clause_type\`, \`text\`, \`expected_risk_level\` (para pruebas de aserción) y \`educational_rationale\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 — L“GICA / IA (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Cpu} 
          label="Capa 3" 
          color={C.amber} 
          title="Lógica / IA"
          desc="Selección del modelo, prompt con citas obligatorias, parseo estructurado y control antialucinación por verificación de texto." 
        />

        <Step 
          num="3.1" 
          title="Selección del modelo LLM" 
          goal="Elegir entre el líder en LegalBench y el líder en CUAD — pueden no ser el mismo."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}
          >
            Considerar especialmente: <strong>límite de contexto</strong> (los contratos pueden tener 50.000+ tokens) y disponibilidad de API.
          </div>
          <PromptBlock label="Prompt 3.1 — Selección del modelo">
{`Actúa como Investigador de IA especializado en Benchmarks Jurídicos (LegalBench, CUAD, MMLU-Law).

Para "Lex Analyst", analiza y fundamenta la selección técnica del modelo de lenguaje para la auditoría de contratos:

1. ANÁLISIS DE RENDIMIENTO COMPARADO:
   - Identifica el modelo comercial líder en LegalBench (ej. Claude 3.5 Sonnet / Claude 3.7) frente a GPT-4o y Gemini 1.5/2.0 Pro.
   - Compara su capacidad específica en la tarea de extracción exacta de citas (*Span Extraction*) en el benchmark CUAD.
   - ¿Qué modelo minimiza las "citas inventadas" o parafraseadas cuando se le instruye expresamente a citar entre comillas?

2. CAPACIDAD DE CONTEXTO Y COSTE:
   - Evalúa la ventana de contexto necesaria: ¿Permite procesar contratos mercantiles de 20 a 40 páginas (~15.000 a 30.000 tokens) en una sola llamada sin degradación de atención (*Needle in a Haystack*)?
   - Define los parámetros óptimos: \`temperature = 0.1\` (rigor analítico y mínima variabilidad) y \`max_tokens = 2000\`.

3. ELECCI“N FINAL JUSTIFICADA:
   - Redacta la memoria de elección en 4 líneas justificando el modelo principal y una alternativa recomendada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Diseño del prompt central" 
          goal="Prompt que obliga al modelo a citar textualmente, asignar riesgo y prohibir inventar fragmentos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald }}>
              <div className="font-semibold mb-1" style={{ color: C.emerald }}>Instrucciones obligatorias</div>
              <ul className="space-y-1 text-[12px]" style={{ color: "rgba(17,17,17,0.65)" }}>
                <li>· Citar textualmente el fragmento exacto</li>
                <li>· Asignar ALTO / MEDIO / BAJO / INFORMATIVO</li>
                <li>· Máx 100 palabras por explicación</li>
                <li>· Nota de recomendación (no consejo legal)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red }}>
              <div className="font-semibold mb-1" style={{ color: C.red }}>Prohibición explícita</div>
              <ul className="space-y-1 text-[12px]" style={{ color: "rgba(17,17,17,0.65)" }}>
                <li>· No inventar citas</li>
                <li>· Si no hay fragmento: "Sin cita directa disponible"</li>
                <li>· No proporcionar asesoramiento legal</li>
              </ul>
            </div>
          </div>
          <PromptBlock label="Prompt 3.2 — Prompt maestro de análisis legal">
{`Actúa como Diseñador de Prompts Jurídicos de Alta Precisión.

Diseña el prompt central estructurado para el motor de análisis contractual de "Lex Analyst":

1. SYSTEM PROMPT (Especialista en Triaje Contractual y Detección de Riesgos):
   - Rol: "Eres un asistente técnico de triaje contractual diseñado para identificar cláusulas de riesgo en documentos legales para una primera pasada de revisión antes de la consulta con el abogado."
   - Reglas Absolutas:
     a) Cita Textual Obligatoria: Cada hallazgo debe incluir el fragmento literal exacto entrecomillado del documento (\`verbatim_quote\`).
     b) Prohibición de Citas Falsas: Si detectas un riesgo por omisión o falta de cláusula, debes escribir estrictamente: \`"Sin cita directa disponible — Riesgo por omisión"\`. Queda terminantemente prohibido inventar o parafrasear texto que no exista en el documento.
     c) Clasificación Estricta: Cada riesgo debe catalogarse exclusivamente como: \`ALTO\`, \`MEDIO\`, \`BAJO\` o \`INFORMATIVO\`.
     d) Lenguaje no vinculante: Las notas de recomendación deben formularse siempre bajo la estructura: *"Un abogado revisaría si..."* o *"Se aconseja contrastar con el asesor legal si..."*.

2. USER PROMPT TEMPLATE (Variables Dinámicas):
   - Plantilla con variables: \`{{DOCUMENT_TEXT}}\`, \`{{ANALYSIS_TYPE}}\`, \`{{JURISDICTION}}\`.
   - Esquema JSON de salida obligado (\`response_format: {"type": "json_object"}\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo con gestión de contexto largo" 
          goal="analyze_legal_text() con truncado controlado, temperatura 0.1 y timeout de 60s para documentos largos."
        >
          <PromptBlock label="Prompt 3.3 — analyze_legal_text()">
{`Actúa como Ingeniero de Integración de LLMs en Python.

Escribe el módulo \`legal_analyzer.py\` con la función asíncrona \`analyze_legal_text(...)\`:

1. ESPECIFICACI“N DE LA FUNCI“N:
\`\`\`python
async def analyze_legal_text(
    document: LegalDocument,
    analysis_type: str = "Riesgos Contractuales Generales",
    model_name: str = "claude-3-5-sonnet-20241022",
    api_key: Optional[str] = None
) -> tuple[str, float]:
\`\`\`

2. GESTI“N DE DOCUMENTOS LARGOS:
   - Estima el número de tokens (ratio 1 token â‰ˆ 4 caracteres para español/inglés).
   - Si el documento excede el límite configurado (\`MAX_ALLOWED_TOKENS\`), trunca respetando el límite superior y marca \`document.is_truncated = True\`.
   - Timeout configurado en 60.0 segundos con 2 reintentos ante caídas temporales de red.

3. RETORNO:
   - Devuelve \`(raw_json_response: str, latency_seconds: float)\`. Registra el tiempo de respuesta en el log de auditoría.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo del análisis legal" 
          goal="parse_legal_analysis() con validación Pydantic, cálculo de global_risk_level y disclaimer añadido al resultado."
        >
          <PromptBlock label="Prompt 3.4 — parse_legal_analysis()">
{`Actúa como Ingeniero de Software especializado en Structured Outputs y Validación Pydantic.

Implementa la función \`parse_legal_analysis(raw_response: str, document: LegalDocument, model_name: str, analysis_type: str) -> LegalAnalysis\` en \`parser.py\`:

1. PROCESAMIENTO RESILIENTE:
   - Extrae el bloque JSON de la respuesta eliminando posibles bloques markdown (\`\`\`json ... \`\`\`).
   - Valida el payload contra los esquemas Pydantic \`LegalAnalysis\` y \`RiskFlag\`.
   - Si el campo \`verbatim_quote\` está en blanco, lo normaliza automáticamente a *"Sin cita directa disponible"*.

2. REGLA DE RIESGO GLOBAL:
   - Calcula el \`global_risk_level\` dinámicamente:
     * Si existe al menos un hallazgo \`ALTO\` -> Global = \`ALTO\`.
     * Si no hay \`ALTO\` pero hay \`MEDIO\` -> Global = \`MEDIO\`.
     * Si solo hay \`BAJO\` -> Global = \`BAJO\`.
     * En cualquier otro caso -> \`INFORMATIVO\`.

3. INYECCI“N INMUTABLE DEL DESCARGO LEGAL:
   - Inyecta la advertencia legal formal obligatoria de la aplicación en el campo \`legal_disclaimer\` antes de retornar el objeto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Control antialucinación: verificación de citas" 
          goal="validate_legal_analysis() que verifica cada cita en el texto original y muestra badge de advertencia en las no verificadas."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla crítica:</strong> No usar un segundo LLM para validar el primero. La verificación es siempre determinista: la cita existe o no existe en el texto.
          </div>
          <PromptBlock label="Prompt 3.5 — validate_legal_analysis()">
{`Actúa como Especialista en Guardrails Antialucinación y Calidad de Datos Legales.

Implementa la función \`validate_legal_analysis(analysis: LegalAnalysis, document: LegalDocument) -> tuple[LegalAnalysis, list[str]]\` en \`guardrails.py\`:

1. AUDITORÍA DETERMINISTA:
   - Para cada \`RiskFlag\`, invoca \`verify_quote(flag.verbatim_quote, document.text)\`.
   - Si la cita existe literalmente en el contrato, asigna \`flag.quote_verified = True\`.
   - Si la cita no se localiza en el texto original:
     * Asigna \`flag.quote_verified = False\`.
     * Anexa una advertencia al listado de incidencias: *"Cita no verificada en hallazgo: [Primeros 40 caracteres]"*.

2. ADVERTENCIA DE INTEGRIDAD GLOBAL:
   - Si más del 50% de las citas del análisis resultan no verificadas, añade una nota de advertencia prioritaria en \`analysis.limitation_notes\`:
     *"[ALERTA DE FIABILIDAD: Más del 50% de las citas textuales no pudieron ser localizadas literalmente en el documento. Se recomienda revisión manual completa]"*.

3. RETORNO:
   - Devuelve \`(analysis_actualizado, issues_list)\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Función de fallback" 
          goal="analyze_with_fallback(): si el LLM falla, banner 'Consulta a un profesional legal' y análisis vacío bien señalizado."
        >
          <PromptBlock label="Prompt 3.6 — analyze_with_fallback()">
{`Actúa como Arquitecto de Resiliencia de Software en Entornos Críticos.

Implementa en \`fallback.py\` la función orquestadora con contingencia \`analyze_with_fallback(document: LegalDocument, analysis_type: str, model_name: str) -> tuple[LegalAnalysis, bool]\`:

1. GESTI“N DE CONTINGENCIA ANTE CAÍDAS:
   - Ejecuta la secuencia: \`analyze_legal_text()\` -> \`parse_legal_analysis()\` -> \`validate_legal_analysis()\`.
   - Si la llamada falla por timeout, caída de API externa o error de red:
     * Genera un objeto \`LegalAnalysis\` de emergencia con \`risk_flags = []\` y \`global_risk_level = "INFORMATIVO"\`.
     * Asigna como resumen ejecutivo: *"El servicio de análisis asistido por IA no está disponible temporalmente. No se han podido extraer riesgos automáticos."*
     * Incluye en las notas de limitación: *"Se aconseja trasladar el documento directamente a su asesor jurídico colegiado para su revisión manual."*
     * Inyecta el descargo legal formal completo.
     * Retorna \`(analysis_fallback, is_llm_used = False)\`.

2. COMPORTAMIENTO DE LA INTERFAZ:
   - Garantiza que la aplicación nunca experimente un crash o cierre forzado ante fallos del proveedor de IA.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 — INTERFAZ DE ESCRITORIO (FLET)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Monitor} 
          label="Capa 4" 
          color="#0891B2" 
          title="Interfaz de escritorio (Flet)"
          desc="Tres pantallas: Análisis, Historial y Configuración — con la advertencia legal fija en todas ellas." 
        />

        <Step 
          num="4.1" 
          title="Wireframe mínimo" 
          goal="Definir las 3 pantallas antes de codificar."
        >
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { n: "1", title: "Análisis", items: ["Advertencia legal permanente", "Área de texto + cláusulas CUAD", "Tipo de análisis + jurisdicción", "Badge riesgo global + hallazgos"] },
              { n: "2", title: "Historial", items: ["Lista de análisis anteriores", "Filtro por nivel de riesgo", "Modo solo lectura de resultados"] },
              { n: "3", title: "Configuración", items: ["store_document_text (on/off)", "API key", "Advertencia de privacidad datos"] },
            ].map(s => (
              <div key={s.n} className="p-4 rounded-xl border text-sm"
                style={{ borderColor: "rgba(8,145,178,0.2)", background: "rgba(8,145,178,0.03)" }}>
                <div className="font-semibold mb-2" style={{ color: "#0891B2" }}>Pantalla {s.n}: {s.title}</div>
                <ul className="space-y-1">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5 text-[12px]" style={{ color: "rgba(17,17,17,0.6)" }}>
                      <span style={{ color: "#0891B2" }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.1 — Wireframe Flet">
{`Actúa como Diseñador de Interfaces Senior y Arquitecto UI en Flet (Python).

Diseña la arquitectura visual y distribución de componentes para "Lex Analyst":

1. PANTALLA 1: ANÁLISIS CONTRACTUAL (Vista Operativa Principal):
   - Encabezado: Banner fijo permanente e indescartable (ft.Banner o ft.Container con fondo rojizo suave y borde de aviso) que muestra: "Advertencia Legal: Esta herramienta no proporciona asesoramiento jurídico vinculante. Triaje y análisis previo para revisión con abogado."
   - Entrada: ft.TextField multilínea de 350px de altura con scroll suave, contador reactivo de caracteres y estimación de tokens.
   - Barra de Herramientas de Carga: Botón ft.ElevatedButton con icono para abrir el modal de selección de cláusulas CUAD de ejemplo.
   - Parámetros: Dropdowns para Tipo de Análisis, Jurisdicción y Selección de Modelo LLM.
   - Acción Principal: Botón prominente "Iniciar Análisis Contractual".
   - Panel de Resultados: Badge de riesgo global, lista de hallazgos en ft.ExpansionTile con citas textuales destacadas y badges de verificación, resumen ejecutivo y botón de exportación en Markdown.

2. PANTALLA 2: HISTORIAL DE AUDITORÍAS (Vista de Consulta):
   - Tabla cronológica de contratos analizados con fecha, tipo, modelo, nivel de riesgo y conteo de hallazgos.
   - Modo consulta de solo lectura al hacer clic en un registro anterior.

3. PANTALLA 3: CONFIGURACI“N Y PRIVACIDAD (Compliance):
   - Switch reactivo para store_document_text con advertencia expresa de secreto empresarial.
   - Campo para API Key con máscara de contraseña y selector de directorio para base de datos DuckDB local.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="Banner de advertencia legal no descartable + formulario con contador de tokens estimados."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>Diseño obligatorio:</strong> El banner legal NO puede cerrarse. Es siempre visible en la pantalla principal.
          </div>
          <PromptBlock label="Prompt 4.2 — Formulario de entrada Flet">
{`Actúa como Desarrollador Frontend en Python con Flet.

Crea el componente ContractInputForm en ui_form.py para "Lex Analyst":

1. BANNER LEGAL PERMANENTE:
\`\`\`python
legal_notice = ft.Container(
    content=ft.Row([
        ft.Icon(ft.icons.SHIELD_ALERT_ROUNDED, color=ft.colors.RED_700, size=20),
        ft.Text(
            "AVISO LEGAL: Lex Analyst no es un despacho de abogados ni emite asesoramiento vinculante. "
            "Los resultados son orientativos para su posterior revisión por un profesional del derecho.",
            size=12,
            weight=ft.FontWeight.W_500,
            color=ft.colors.RED_900,
            expand=True
        )
    ]),
    bgcolor=ft.colors.RED_50,
    border=ft.border.all(1, ft.colors.RED_200),
    border_radius=8,
    padding=12,
    margin=ft.margin.only(bottom=15)
)
\`\`\`

2. ENTRADA DE TEXTO Y ESTIMADOR DE TOKENS REACTIVO:
   - ft.TextField multilínea con min_lines=10, max_lines=15 y autofocus=True.
   - Evento on_change: calcula la longitud en caracteres y estima tokens (len(text) // 4). Actualiza una etiqueta de texto dinámica: "Caracteres: 4.820 | Tokens estimados: ~1.205 / 16.000". Si supera los 50.000 caracteres, colorea el contador en rojo y advierte de truncado automático.

3. SELECTORES Y CARGA CUAD:
   - Selector desplegable con las 10 cláusulas CUAD de muestra para pruebas rápidas sin requerir copiar y pegar.
   - Selector de Tipo de Análisis y Jurisdicción aplicable.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Área de resultados" 
          goal="Badge de riesgo grande, hallazgos en acordeones, citas no verificadas con badge de advertencia, resumen ejecutivo."
        >
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "ALTO", bg: "rgba(220,38,38,0.12)", color: C.red },
              { label: "MEDIO", bg: "rgba(217,119,6,0.12)", color: C.amber },
              { label: "BAJO", bg: "rgba(5,150,105,0.12)", color: C.emerald },
              { label: "INFORMATIVO", bg: "rgba(8,145,178,0.12)", color: "#0891B2" },
            ].map(b => (
              <span key={b.label} className="px-3 py-1 rounded-full text-[11px] font-bold"
                style={{ background: b.bg, color: b.color }}>{b.label}</span>
            ))}
          </div>
          <PromptBlock label="Prompt 4.3 — Área de resultados Flet">
{`Actúa como Diseñador de Componentes Flet especializado en visualización de auditoría documental.

Implementa ContractResultsView en ui_results.py que recibe un LegalAnalysis y construye el cuadro de mando:

1. BADGE DE RIESGO GLOBAL:
   - Tarjeta destacada superior con fondo dinámico:
     * ALTO: Rojo (#DC2626) con texto: "NIVEL DE RIESGO GLOBAL: ALTO — Requiere revisión prioritaria".
     * MEDIO: Ámbar (#D97706) con texto: "NIVEL DE RIESGO GLOBAL: MEDIO — Cláusulas no estándar".
     * BAJO: Verde (#059669) con texto: "NIVEL DE RIESGO GLOBAL: BAJO — Condiciones habituales".
     * INFORMATIVO: Azul grisáceo (#0891B2).

2. ACORDEONES EXPANDIBLES DE HALLAZGOS (ft.ExpansionTile):
   - Para cada RiskFlag:
     * Título: Nombre del hallazgo + badge de severidad individual.
     * Cita Textual Literal: Presentada en un contenedor con tipografía monoespaciada y comillas tipográficas.
     * Badge de Verificación Antialucinación:
       - Si quote_verified == True: Badge verde "““ Cita verificada en el contrato original".
       - Si quote_verified == False: Badge ámbar/rojo con icono "→ ️ Cita no verificada literalmente en el texto original".
     * Explicación de impacto y nota de recomendación legal formulada en cursiva ("Aspecto sugerido para consulta con el abogado: ...").

3. RESUMEN EJECUTIVO Y EXPORTACI“N:
   - Contenedor con el Resumen Ejecutivo, notas de limitación y botón ft.ElevatedButton "Exportar Informe Markdown (.md)".`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacíos y de error" 
          goal="6 estados: sin texto, analizando, texto muy largo, LLM no disponible, análisis parcial, 0 hallazgos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {[
              "Sin texto (inicio)",
              "Analizando (puede tardar 60s en documentos largos)",
              "Texto supera límite del modelo",
              "LLM no disponible + banner 'Consulta a un profesional'",
              "Análisis parcial (algunos hallazgos no extraídos)",
              "0 hallazgos — badge verde con nota de limitación",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
                style={{ background: "rgba(17,17,17,0.04)", color: "rgba(17,17,17,0.6)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(17,17,17,0.1)", color: C.dark }}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.4 — Estados de error Flet">
{`Actúa como Especialista en UX y Manejo de Estados en Flet.

Implementa en ui_states.py los 6 estados del ciclo de vida para "Lex Analyst":

1. ESTADO 1 (Inicio / Sin Texto):
   - Muestra ilustración sutil o icono documental con mensaje guía: "Pega una cláusula o contrato mercantil arriba o selecciona un ejemplo de la biblioteca CUAD para comenzar".

2. ESTADO 2 (Procesamiento Activo):
   - ft.ProgressRing con mensaje dinámico: "Analizando cláusulas y verificando referencias textuales con [Modelo]... (Esto puede tomar entre 15 y 45 segundos en contratos extensos)".

3. ESTADO 3 (Texto Excesivo / Alerta de Truncado):
   - Modal emergente ft.AlertDialog: "El documento supera los 50.000 caracteres. Para garantizar la máxima fiabilidad, Lex Analyst analizará las secciones iniciales y esenciales. ¿Deseas continuar?".

4. ESTADO 4 (Fallo de Proveedor de IA / Offline):
   - Banner de contingencia en rojo: "Servicio de IA no disponible temporalmente. No se ha podido completar la auditoría algorítmica. Por favor, remita el contrato a su asesor legal.".

5. ESTADO 5 (Extracción Parcial):
   - Alerta en ámbar: "El análisis se completó parcialmente. Algunos párrafos complejos requirieron verificación manual directa.".

6. ESTADO 6 (0 Riesgos Detectados):
   - Badge verde: "Sin riesgos evidentes detectados en las cláusulas analizadas", acompañado obligatoriamente del aviso: "Este resultado algorítmico no constituye una garantía de validez legal. Consulte a su letrado."`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Navegación básica" 
          goal="NavigationBar con 3 pantallas — la advertencia legal es visible en todas ellas."
        >
          <PromptBlock label="Prompt 4.5 — Navegación Flet">
{`Actúa como Arquitecto de Aplicaciones de Escritorio en Flet.

Crea el archivo principal main.py con el controlador de navegación y ciclo de vida de "Lex Analyst":

1. ARQUITECTURA DE LA VENTANA Y DISPATCHER:
   - Configuración de la ventana: Título "Lex Analyst — Auditoría Contractual & Detección de Riesgos", dimensiones iniciales 1100x850, soporte para tema claro con paleta corporativa neutra y acentos índigo.
   - Barra de Navegación Inferior (ft.NavigationBar):
     * Destino 0: "Análisis" (ft.icons.DOCUMENT_SCANNER_ROUNDED).
     * Destino 1: "Historial" (ft.icons.HISTORY_ROUNDED).
     * Destino 2: "Configuración & Privacidad" (ft.icons.SHIELD_ROUNDED).

2. PERSISTENCIA OBLIGATORIA DEL DISCLAIMER:
   - Implementa un layout maestro donde el banner de advertencia legal se encuentra anclado en la parte superior de la vista de forma global, garantizando que el usuario siempre lo visualice independientemente de la pantalla en la que navegue.

3. MANEJO DE ESTADO REACTIVO:
   - Controla la transición fluida entre la pantalla de entrada, el estado de carga y la visualización de resultados sin parpadeos ni pérdidas de contexto.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 — INTEGRACI“N (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Link2} 
          label="Capa 5" 
          color={C.red} 
          title="Integración"
          desc="Pipeline robusto con gestión de errores conservadora — en el dominio legal, siempre se preserva la advertencia de revisión profesional." 
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lógica" 
          goal="on_analyze_click() con validación mínima de 100 chars, diálogo de truncado y guardado según store_document_text."
        >
          <PromptBlock label="Prompt 5.1 — on_analyze_click()">
{`Actúa como Ingeniero de Integración Asíncrona en Python y Flet.

Escribe en controller.py el handler asíncrono para el evento de análisis on_analyze_click(e):

1. VALIDACI“N PREVIA Y GUARDRAILS DE ENTRADA:
   - Comprueba que el texto introducido cuente con al menos 100 caracteres significativos. En caso contrario, muestra un ft.SnackBar informativo: "Por favor, introduce al menos una cláusula completa (mínimo 100 caracteres)".
   - Si la longitud excede MAX_TEXT_LENGTH, presenta el diálogo de advertencia de truncado antes de lanzar la corutina.

2. ORQUESTACI“N NO BLOQUEANTE:
   - Cambia la UI al estado de carga activa (deshabilita el botón "Analizar" y muestra el indicador de progreso circular).
   - Crea el objeto de dominio LegalDocument mediante create_manual_document(...).
   - Ejecuta asíncronamente en segundo plano el pipeline orquestador (legal_analysis_pipeline) para mantener la interfaz 100% responsiva.

3. DESPLIEGUE Y REGISTRO:
   - Recibe el LegalAnalysis consolidado y las alertas de verificación de citas.
   - Actualiza reactivamente los componentes de ContractResultsView.
   - Si se identificaron citas no verificadas, despliega un aviso destacado de atención.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con datos" 
          goal="legal_analysis_pipeline() sin lógica de UI, con log de metadatos (sin el texto del documento)."
        >
          <PromptBlock label="Prompt 5.2 — legal_analysis_pipeline()">
{`Actúa como Ingeniero de Pipeline y Orquestación de Backend en Python.

Crea en pipeline.py la función pura de orquestación legal_analysis_pipeline(...):

1. FIRMA DE LA FUNCI“N PURA:
\`\`\`python
async def legal_analysis_pipeline(
    document: LegalDocument,
    analysis_type: str,
    model_name: str,
    conn: duckdb.DuckDBPyConnection,
    store_text: bool = False
) -> tuple[LegalAnalysis, list[str], bool]:
\`\`\`

2. ETAPAS SECUENCIALES DEL PIPELINE:
   - Etapa 1: Invocación con resiliencia y fallback mediante analyze_with_fallback(document, analysis_type, model_name).
   - Etapa 2: Control antialucinación mediante validate_legal_analysis(analysis, document) que contrasta cada cita contra el texto original.
   - Etapa 3: Persistencia en DuckDB mediante store_analysis(conn, validated_analysis, document, store_text=store_text).
   - Etapa 4: Auditoría de privacidad: registra la operación en el logger de seguridad omitiendo por completo el texto sensible del contrato.

3. RETORNO DESACOPLADO:
   - Devuelve (analysis_final, listado_incidencias_citas, is_llm_used) sin dependencias gráficas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Gestión de errores en cascada" 
          goal="Regla principal: ante cualquier error, conservar siempre la advertencia de consultar a un profesional legal."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>Principio de diseño:</strong> En caso de duda o error, nunca suprimir las notas de limitación. Siempre mostrar "Consulta a un profesional del derecho".
          </div>
          <PromptBlock label="Prompt 5.3 — LegalError + tabla de decisiones">
{`Actúa como Arquitecto de Tolerancia a Fallos en Sistemas Legales Críticos.

Crea el módulo exceptions.py con la jerarquía de excepciones y la matriz de contingencia en cascada para "Lex Analyst":

1. TAXONOMÍA DE EXCEPCIONES:
\`\`\`python
from enum import Enum

class LegalErrorCode(str, Enum):
    API_TIMEOUT = "API_TIMEOUT"
    API_AUTH_ERROR = "API_AUTH_ERROR"
    JSON_PARSE_ERROR = "JSON_PARSE_ERROR"
    UNVERIFIED_QUOTES_CRITICAL = "UNVERIFIED_QUOTES_CRITICAL"
    DOCUMENT_TOO_LARGE = "DOCUMENT_TOO_LARGE"
    DB_PERSISTENCE_ERROR = "DB_PERSISTENCE_ERROR"
    CUAD_FILE_MISSING = "CUAD_FILE_MISSING"

class LegalException(Exception):
    def __init__(self, code: LegalErrorCode, message: str, technical_details: str = ""):
        super().__init__(message)
        self.code = code
        self.technical_details = technical_details
\`\`\`

2. MATRIZ DE DECISIONES DE FALLO (Regla Conservadora):
   - Fallo de Red/Timeout: Muestra mensaje explicativo sin crash y mantiene la recomendación de acudir al letrado.
   - Fallo de Parseo JSON: Extrae los hallazgos rescatables mediante regex y añade aviso de informe preliminar parcial.
   - > 50% de citas no coincidentes: Marca el análisis con nivel de alerta máxima por baja fidelidad textual.
   - Error en DuckDB: Permite visualizar y exportar el informe en memoria notificando que no se guardó en el historial local.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging básico" 
          goal="Dos logs separados: analyses.log para metadatos y security.log para auditoría de datos procesados (RGPD)."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.amber }}>¿Por qué dos logs?</strong> Los análisis legales pueden implicar datos personales. El log de seguridad permite auditar qué datos se procesaron.
          </div>
          <PromptBlock label="Prompt 5.4 — legal_logger.py (dos handlers)">
{`Actúa como Ingeniero de Seguridad y Cumplimiento Normativo (RGPD) en Python.

Crea el módulo legal_logger.py con doble sistema de registro desacoplado para "Lex Analyst":

1. POLÍTICA ESTRICTA ZERO-PII / SECRETO CONTRACTUAL:
   - Queda terminantemente prohibido registrar el texto íntegro de las cláusulas, nombres propios de intervinientes o datos bancarios en los archivos de log.

2. ESPECIFICACI“N DE LOS DOS CANALES DE LOG:
   - Canal 1 (analyses.log con RotatingFileHandler 5MB, 3 backups):
     * Registra métricas operacionales: timestamp, document_id (UUID), analysis_type, model_name, global_risk_level, num_findings, unverified_quotes_count, latency_seconds.
   
   - Canal 2 (security.log para Auditoría de Privacidad y RGPD):
     * Registra eventos de tratamiento de datos: timestamp, user_session_id, action ("DOCUMENT_SENT_TO_LLM", "DOCUMENT_STORED_LOCAL_DB", "DB_TEXT_STORAGE_DISABLED"), char_count.

3. FUNCIONES EXPUESTAS:
   - log_analysis_event(...), log_security_audit(...) y log_system_error(...).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Configuración centralizada" 
          goal="config.py con LEGAL_DISCLAIMER como constante, AVAILABLE_ANALYSIS_TYPES y LEX_STORE_DOCUMENT_TEXT=false por defecto."
        >
          <PromptBlock label="Prompt 5.5 — config.py + .env.example">
{`Actúa como Ingeniero de Configuración y Seguridad de Software en Python.

Crea el archivo config.py utilizando pydantic-settings y la plantilla .env.example para "Lex Analyst":

1. ESPECIFICACI“N DEL M“DULO config.py:
\`\`\`python
from pydantic_settings import BaseSettings
from pathlib import Path
from typing import list

class LexConfig(BaseSettings):
    LEX_LLM_API_KEY: str
    LEX_LLM_MODEL: str = "claude-3-5-sonnet-20241022"
    LEX_DB_PATH: Path = Path.home() / ".lex_analyst" / "legal_history.duckdb"
    LEX_LOG_DIR: Path = Path.home() / ".lex_analyst" / "logs"
    LEX_CUAD_PATH: Path = Path("./data_legal/raw/cuad_clauses.json")
    LEX_MAX_TEXT_LENGTH: int = 50000
    LEX_LLM_TIMEOUT_SECONDS: float = 60.0
    LEX_QUOTE_VERIFY_THRESHOLD: float = 0.85
    LEX_STORE_DOCUMENT_TEXT: bool = False  # Protección de secreto comercial por defecto

    LEGAL_DISCLAIMER: str = (
        "AVISO LEGAL PERMANENTE: Lex Analyst es una herramienta de software orientada "
        "al análisis preliminar de textos contractuales con fines de investigación y triaje. "
        "No constituye asesoramiento legal profesional. Consulte siempre a un abogado colegiado."
    )
    AVAILABLE_ANALYSIS_TYPES: list[str] = [
        "Riesgos Contractuales Generales",
        "Auditoría de Cumplimiento RGPD",
        "Cláusulas Abusivas y Desequilibrio Contractual",
        "Terminación, Rescisión y Penalizaciones"
    ]
    AVAILABLE_JURISDICTIONS: list[str] = ["España (Civil/Mercantil)", "Unión Europea", "Internacional (Common Law)"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = LexConfig()
\`\`\`

2. ARCHIVO .env.example:
   - Incluye comentarios explicativos en cada clave, destacando que LEX_STORE_DOCUMENT_TEXT=false asegura que el texto del contrato nunca se escriba en el disco duro local.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 — PRUEBAS Y EMPAQUETADO (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={FlaskConical} 
          label="Capa 6" 
          color={C.emerald} 
          title="Pruebas y empaquetado"
          desc="Tests que verifican la honestidad del sistema (citas verificadas) y el protocolo de prueba con contratos reales anonimizados." 
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="Tests de verify_quote(), validate_legal_analysis() y parse_legal_analysis() — incluyendo el caso de >50% citas no verificadas."
        >
          <PromptBlock label="Prompt 6.1 — tests/test_legal_logic.py">
{`Actúa como QA Lead y Especialista en Testing Automatizado de Software LegalTech en Python.

Crea la suite de pruebas unitarias en \`tests/test_legal_logic.py\` y sus fixtures en \`tests/conftest.py\`:

1. FIXTURES EN \`conftest.py\`:
   - \`sample_legal_document\`: Contrato ficticio con cláusulas de confidencialidad, indemnización y fuero.
   - \`sample_analysis_all_verified\`: Objeto \`LegalAnalysis\` con 3 hallazgos cuyas citas existen al 100% de forma literal.
   - \`sample_analysis_some_unverified\`: Objeto con 1 cita exacta y 2 citas completamente alucinadas/inventadas.
   - \`sample_raw_llm_json\`: String simulado con respuesta válida formateada en JSON.

2. CASOS DE PRUEBA EN \`test_legal_logic.py\`:
   - \`test_verify_quote_exact_and_fuzzy()\`:
     * Valida coincidencia exacta (True).
     * Valida normalización de comillas tipográficas (« » / “ –) contra comillas estándar (' / ") (True).
     * Valida cita ausente o inventada por el modelo (False).
   - \`test_validate_legal_analysis_integrity()\`:
     * Verifica que cuando el 100% de citas existen, \`issues\` está vacío y ninguna advertencia crítica se activa.
     * Verifica que si > 50% de las citas son inventadas, se añade la alerta prioritaria en \`limitation_notes\`.
   - \`test_parse_legal_analysis_and_risk_escalation()\`:
     * Comprueba que si hay al menos un hallazgo con riesgo "ALTO", \`global_risk_level\` se consolida en "ALTO".
     * Valida que la constante \`LEGAL_DISCLAIMER\` se inyecta siempre de forma inmutable.

3. REGLAS: Prohibido llamar a APIs externas o crear bases de datos en disco durante los tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="Test de integración con 2 citas verificables + 1 cita inventada — el sistema debe detectar la inventada."
        >
          <PromptBlock label="Prompt 6.2 — tests/test_legal_integration.py">
{`Actúa como Ingeniero de Integración y Testing E2E en Python.

Crea el test de integración en \`tests/test_legal_integration.py\` que valida el flujo completo del pipeline sin consumir créditos de API:

1. CONFIGURACI“N DEL ENTORNO DE PRUEBA:
   - Carga una cláusula real desde \`sample_legal_clauses.json\`.
   - Inicializa una base de datos DuckDB volátil en memoria (\`conn = duckdb.connect(':memory:')\`) con \`store_document_text = False\`.

2. MOCKING SELECTIVO DEL LLM:
   - Mockea exclusivamente la función \`analyze_legal_text()\` utilizando \`unittest.mock.AsyncMock\`.
   - Devuelve una respuesta simulada con 3 hallazgos:
     * Cita 1: Párrafo existente textualmente en la cláusula.
     * Cita 2: Párrafo existente con pequeñas variaciones de espacios/comillas.
     * Cita 3: Cita totalmente inventada ("Las partes acuerdan someterse a la jurisdicción de Singapur").

3. ASERCIONES OBLIGATORIAS:
   - Ejecuta \`await legal_analysis_pipeline(...)\`.
   - Aserta que exactamente 2 hallazgos tienen \`quote_verified == True\` y 1 hallazgo tiene \`quote_verified == False\`.
   - Aserta que \`verification_issues\` contiene exactamente la alerta de la cita inventada.
   - Aserta que la auditoría se persistió en DuckDB sin registrar el texto confidencial del contrato.
   - Aserta que \`get_analysis_history(conn)\` devuelve exactamente 1 registro con los metadatos correctos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo de 7 escenarios con contratos reales anonimizados, incluyendo texto en inglés y prueba sin internet."
        >
          <PromptBlock label="Prompt 6.3 — Protocolo de prueba manual">
{`Actúa como Auditor de Calidad Funcional y Usabilidad (UAT) en Entornos Legales.

Redacta el protocolo de validación manual exhaustivo para certificar "Lex Analyst v1":

1. MATRIZ DE 7 ESCENARIOS DE PRUEBA CON CONTRATOS REALES ANONIMIZADOS:
   - Escenario 1 (NDA Estándar): Pegar un acuerdo de confidencialidad de 3 páginas y verificar que las citas identificadas se corresponden con los párrafos de definición y plazo.
   - Escenario 2 (Cláusula Asimétrica de Indemnización): Pegar una cláusula de responsabilidad ilimitada; comprobar que el sistema la cataloga como riesgo ALTO.
   - Escenario 3 (Contrato SaaS en Inglés con Fuero en Delaware): Verificar que la app procesa correctamente texto anglosajón y resalta el fuero extranjero.
   - Escenario 4 (Documento Extenso > 50.000 Caracteres): Comprobar que salta el modal de advertencia de truncado y no congela la interfaz gráfica.
   - Escenario 5 (Desconexión de Red / Modo Offline): Desconectar WiFi/Ethernet; verificar que el banner de contingencia aparece de inmediato sin cierres forzados.
   - Escenario 6 (Auditoría de Pantallas): Navegar por las 3 pestañas y comprobar que la advertencia legal permanece visible y anclada en todas ellas.
   - Escenario 7 (Exportación de Informe): Pulsar "Exportar Markdown" y validar que el archivo resultante incluye la fecha, los badges de citas y el texto íntegro del descargo legal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Ejecutable con advertencia visible en la pantalla de inicio y sin el .env incluido (contiene la API key)."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.amber }}>Advertencia de privacidad para el usuario:</strong> "Los textos que introduces se envían al proveedor de IA. No introduzcas documentos con datos personales de terceros sin su consentimiento."
          </div>
          <PromptBlock label="Prompt 6.4 — Empaquetado">
{`Actúa como Ingeniero de Distribución y Empaquetado de Software de Escritorio en Python.

Genera las especificaciones de compilación y empaquetado para generar el ejecutable autónomo \`LexAnalyst.exe\`:

1. ARCHIVO DE CONFIGURACI“N \`lex_analyst.spec\`:
   - Configura PyInstaller con:
     * \`entry_point = "main.py"\`
     * \`datas = [('data_legal/raw/cuad_clauses.json', 'data_legal/raw'), ('assets', 'assets')]\`
     * Exclusión estricta: Bloquear la inclusión de archivos \`.env\`, \`*.duckdb\` o logs locales en el empaquetado para prevenir fugas de credenciales.
     * Modo ventana (\`console=False\` en Windows).

2. GUÍA DE INSTALACI“N Y DESPLIEGUE EN 3 PASOS:
   - Paso 1: Descomprimir el paquete \`LexAnalyst_v1.0_Win64.zip\`.
   - Paso 2: Crear el archivo \`.env\` junto al ejecutable introduciendo \`LEX_LLM_API_KEY=tu_clave_aqui\`.
   - Paso 3: Ejecutar \`LexAnalyst.exe\` con doble clic directo sin necesidad de instalar Python ni dependencias.

3. ADVERTENCIA DE PRIVACIDAD EN EL README DE DISTRIBUCI“N:
   - Incluye la advertencia obligatoria de transferencia de datos a proveedores de IA de terceros para contratos con información personal o confidencial.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en máquina limpia" 
          goal="Verificación en VM sin Python — la advertencia legal debe aparecer prominente en la primera pantalla."
        >
          <PromptBlock label="Prompt 6.5 — Protocolo máquina limpia">
{`Actúa como Ingeniero de QA y Certificación de Entornos Limpios.

Diseña el protocolo de verificación del binario \`LexAnalyst.exe\` en una máquina virtual Windows 11 recién instalada (sin Python, Git ni compiladores de C++):

1. CHECKLIST DE CONECTIVIDAD Y EJECUCI“N LIMPIA:
   - Verificación de arranque en frío en menos de 3.5 segundos.
   - Confirmación visual de que la advertencia legal de responsabilidad se renderiza de forma clara y nítida en el tercio superior.
   - Apertura de la biblioteca CUAD de prueba: verificar que las 10 cláusulas precargadas se visualizan y rellenan el área de texto con un clic.
   - Ejecución de análisis en vivo con API Key configurada en el archivo \`.env\` externo.
   - Validación de la creación automática de las carpetas de datos locales en \`%USERPROFILE%\\.lex_analyst\\logs\` y comprobación de que no se almacena texto confidencial.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 — ITERACI“N Y PUBLICACI“N (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={RefreshCw} 
          label="Fase 7" 
          color="rgba(17,17,17,0.4)" 
          title="Iteración y publicación"
          desc="Planificar la v2 con conciencia del riesgo legal adicional que introduce cada nueva funcionalidad." 
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog con columna 'Riesgo legal adicional' — análisis batch, soporte PDF, comparativa de modelos...">
          <PromptBlock label="Prompt 7.A — Planificación v2 (tabla con riesgo legal)">
{`Actúa como Product Owner y Estratega en LegalTech.

Elabora el backlog técnico y funcional estructurado para la versión 2.0 de "Lex Analyst":

1. MATRIZ DE MEJORAS CON EVALUACI“N DE RIESGO JURÍDICO ADICIONAL:
   | ID | Funcionalidad Propuesta | Capa Afectada | Complejidad | Riesgo Legal Adicional | Medida de Mitigación Requerida |
   |:---|:------------------------|:--------------|:------------|:-----------------------|:-------------------------------|
   | F1 | Ingesta nativa de archivos PDF/Word (pdfminer / python-docx) | Capa 2 (Datos) | Media | Riesgo de pérdida de texto por mal OCR en PDFs escaneados | Advertencia expresa: "Documentos escaneados pueden omitir cláusulas por calidad de imagen" |
   | F2 | Auditoría por lotes (Batch processing de 50+ contratos) | Capa 5 (Integración) | Alta | Falta de revisión individualizada de las citas detectadas | Reporte consolidado con indicador de fiabilidad (% citas verificadas) |
   | F3 | Benchmarking Multi-LLM en paralelo (Claude vs GPT vs DeepSeek) | Capa 3 (Lógica) | Media | Dictámenes divergentes entre modelos que confunden al usuario | Matriz comparativa destacando coincidencias unánimes y discrepancias |
   | F4 | Módulo Especializado de Auditoría RGPD con cita de Artículos | Capas 2, 3 y 4 | Media | Falsa apariencia de certificación oficial ante la AEPD | Disclaimer reforzado: "No sustituye la auditoría obligatoria de un DPO colegiado" |

2. PRIORIZACI“N Y CRITERIO DE EXPANSI“N:
   - Define las 2 funcionalidades prioritarias para el sprint de la v2.0 justificando el balance entre valor práctico y seguridad jurídica.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha de publicación con el disclaimer legal completo visible en la propia ficha del foro."
        >
          <PromptBlock label="Prompt 7.B — Ficha para el Foro (con disclaimer)">
{`Actúa como Desarrollador LegalTech y Divulgador en la Comunidad Horizon.

Redacta la ficha de presentación de "Lex Analyst" para publicar en el Foro de la Comunidad Horizon (/comunidad/aplicaciones):

1. ESTRUCTURA DE LA PUBLICACI“N:
   - **Título:** \`[PROYECTO] Lex Analyst v1.0 — Escáner Contractual Asistido por IA con Verificación Determinista de Citas\`
   - **Etiquetas:** \`#LegalTech\` \`#Flet\` \`#Python\` \`#Pydantic\` \`#LegalBench\` \`#ZeroPII\`
   - **Resumen del Proyecto (150 palabras):** Aplicación de escritorio diseñada para PYMEs y profesionales que necesitan una primera lectura rigurosa de contratos mercantiles antes de trasladarlos al abogado.
   - **Innovación Técnica Destacada:** Motor determinista de verificación de citas contra el texto fuente para erradicar cláusulas alucinadas o inventadas.
   - **Descargo de Responsabilidad Visible:** Inclusión íntegra del aviso legal de la aplicación.
   - **Pregunta para el Debate Comunitario:** *"¿Qué umbral de similitud en la verificación de citas consideráis adecuado para equilibrar pequeñas correcciones ortográficas frente a invenciones del modelo en jerga jurídica?"*`}
          </PromptBlock>
        </Step>

        {/* ─── Result box ─── */}
        <div className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "white", border: "1px solid rgba(59,111,212,0.2)" }}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: "rgba(59,111,212,0.10)" }}>
            <Check size={22} style={{ color: C.accent }} />
          </div>
          <h2 className="font-display text-2xl mb-3" style={{ color: C.dark }}>Resultado final</h2>
          <p className="text-base leading-relaxed mb-2 max-w-[520px] mx-auto"
            style={{ color: "rgba(17,17,17,0.6)" }}>
            Un ejecutable de <strong style={{ color: C.dark }}>Lex Analyst</strong> que analiza texto legal con el modelo líder en LegalBench, detecta riesgos con citas verificadas en el documento original y exporta un informe con advertencias legales integradas.
          </p>
          <p className="text-sm mb-6 max-w-[480px] mx-auto"
            style={{ color: "rgba(17,17,17,0.40)" }}>
            No reemplaza al abogado — le da a cualquier persona una primera pasada rigurosa antes de la revisión profesional.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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

        <div className="h-16" />
      </div>
    </div>
  );
}

