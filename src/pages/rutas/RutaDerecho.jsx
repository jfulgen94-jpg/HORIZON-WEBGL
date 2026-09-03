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

// â”€â”€â”€ Tools table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio Derecho Â· LegalBench Â· CUAD Â· MMLU-Law", motivo: "Verificar quÃ© modelos tienen mejor performance en razonamiento legal verificado." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Definir el tipo de anÃ¡lisis legal y las advertencias de responsabilidad de la v1." },
  { capa: "2", subcapa: "2.1", herramienta: "data_legal/raw/ Â· texto manual", motivo: "Dataset CUAD de contratos reales + entrada libre del usuario." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas para documentos legales y resultados de anÃ¡lisis." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators Â· re", motivo: "Verificar que las citas textuales existen en el documento original." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de anÃ¡lisis con metadatos (sin el texto del documento si es sensible)." },
  { capa: "2", subcapa: "2.5", herramienta: "ClÃ¡usulas CUAD de dominio pÃºblico", motivo: "10 clÃ¡usulas de contratos reales de fuente pÃºblica para testing." },
  { capa: "3", subcapa: "3.1", herramienta: "data_legal/rankings/", motivo: "Seleccionar modelo con mejor score en LegalBench y CUAD." },
  { capa: "3", subcapa: "3.2", herramienta: "Prompt con instrucciÃ³n de citar textualmente", motivo: "Forzar al modelo a citar el fragmento exacto que respalda cada hallazgo." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx Â· openai SDK [VERIFICAR DOCS]", motivo: "Llamada async con el texto completo en el contexto." },
  { capa: "3", subcapa: "3.4", herramienta: "re (regex) Â· Pydantic", motivo: "Extraer hallazgos estructurados con sus citas textuales." },
  { capa: "3", subcapa: "3.5", herramienta: "Python str.find() o regex", motivo: "Verificar que cada cita existe literalmente en el documento original." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Mostrar documento sin anÃ¡lisis y advertencia si el LLM no responde." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Texto largo con scroll, citas resaltadas y badges de riesgo." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "ConexiÃ³n entre capas." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests de verificaciÃ³n de citas y parseo de anÃ¡lisis." },
  { capa: "6", subcapa: "6.3", herramienta: "Contratos reales anonimizados", motivo: "ValidaciÃ³n con casos de uso reales." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar comparativas de modelos en razonamiento legal." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· RGPD",
    area: "Cumplimiento normativo",
    title: "Norma Aurea â€” Auditor RGPD de documentos",
    desc: "Misma arquitectura de Lex Analyst enfocada exclusivamente en detectar incumplimientos del Reglamento General de ProtecciÃ³n de Datos en polÃ­ticas de privacidad, tÃ©rminos de servicio y formularios de consentimiento.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el tipo de anÃ¡lisis Ãºnico es 'Cumplimiento RGPD'; se eliminan otros tipos",
      "Capa 2: el prompt incluye los artÃ­culos del RGPD mÃ¡s frecuentemente incumplidos como contexto del sistema",
      "Capa 3: los hallazgos citan el artÃ­culo RGPD relevante ademÃ¡s del fragmento del documento",
      "Capa 3: verificaciÃ³n adicional de que los artÃ­culos citados existen en el RGPD (lista predefinida en config)",
      "Capa 4: badge de cumplimiento RGPD con semÃ¡foro especÃ­fico (Cumple / Riesgo / Incumplimiento)",
      "Advertencia: la app no certifica el cumplimiento RGPD; requiere revisiÃ³n por DPO o asesor legal",
    ],
  },
  {
    tag: "v2 Â· Contratos",
    area: "RevisiÃ³n contractual",
    title: "Sententia â€” Comparador de versiones de contrato",
    desc: "Recibe dos versiones del mismo contrato (original y modificada) y genera un anÃ¡lisis diferencial: quÃ© clÃ¡usulas cambiaron, quÃ© riesgos nuevos introducen los cambios y quÃ© protecciones se eliminaron.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: C.emerald,
    changes: [
      "Capa 1: dos entradas de texto (versiÃ³n A y versiÃ³n B del contrato)",
      "Capa 2: esquema ContractDiff con lista de clÃ¡usulas modificadas, aÃ±adidas y eliminadas",
      "Capa 3: el prompt primero identifica las diferencias y luego analiza el impacto de riesgo de cada una",
      "Capa 3: verificaciÃ³n de citas en ambas versiones del documento",
      "Capa 4: vista en dos columnas (versiÃ³n A vs. B) con las diferencias resaltadas",
      "Capa 6: dataset de ejemplo con dos versiones de NDA y 3 cambios de riesgo intencionales",
    ],
  },
  {
    tag: "v2 Â· Laboral",
    area: "Derecho laboral",
    title: "Clavis Laboral â€” AnÃ¡lisis de contratos de trabajo",
    desc: "Lex Analyst especializado en derecho laboral espaÃ±ol: detecta clÃ¡usulas que se desvÃ­an del Estatuto de los Trabajadores, condiciones de jornada inusuales, penalizaciones desproporcionadas y omisiones de derechos bÃ¡sicos.",
    badgeBg: "rgba(217,119,6,0.10)", badgeColor: C.amber,
    changes: [
      "Capa 1: el perfil de usuario es empleado o RRHH revisando contratos de trabajo",
      "Capa 2: el prompt incluye los artÃ­culos mÃ¡s relevantes del Estatuto de los Trabajadores como contexto",
      "Capa 3: los hallazgos incluyen la referencia normativa espaÃ±ola aplicable (ET, LGSS, convenio colectivo)",
      "Capa 3: lista predefinida de clÃ¡usulas habituales en contratos laborales espaÃ±oles para comparar",
      "Capa 4: secciÃ³n especÃ­fica de 'Derechos bÃ¡sicos verificados' ademÃ¡s de los riesgos detectados",
      "Advertencia reforzada: el anÃ¡lisis no tiene en cuenta el convenio colectivo aplicable",
    ],
  },
];

// â”€â”€â”€ Legal disclaimer banner (permanent, non-dismissible) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LegalBanner() {
  return (
    <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-xl border"
      style={{ background: "rgba(220,38,38,0.04)", borderColor: "rgba(220,38,38,0.20)" }}>
      <ShieldAlert size={18} className="shrink-0 mt-0.5" style={{ color: C.red }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(153,27,27,0.85)" }}>
        <strong>Advertencia legal permanente:</strong> Lex Analyst es una herramienta de investigaciÃ³n y aprendizaje. Los anÃ¡lisis generados son orientativos y <strong>no constituyen asesoramiento legal</strong>. Consulta siempre a un profesional del derecho antes de tomar cualquier decisiÃ³n basada en estos resultados.
      </p>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            Derecho & Cumplimiento Normativo Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Lex Analyst
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que analiza textos legales y contratos con el LLM lÃ­der en LegalBench, detecta riesgos con citas textuales verificadas y genera un informe estructurado con advertencias legales explÃ­citas.
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
              { label: "Fase 0", desc: "InvestigaciÃ³n â€” LegalBench, CUAD, MMLU-Law", color: "#7C3AED" },
              { label: "Capa 1", desc: "DefiniciÃ³n â€” incluye advertencias de responsabilidad", color: C.accent },
              { label: "Capa 2", desc: "Datos â€” CUAD, Pydantic, verificaciÃ³n de citas", color: C.emerald },
              { label: "Capa 3", desc: "IA â€” anÃ¡lisis legal con citas + control antialucinaciÃ³n", color: C.amber },
              { label: "Capa 4", desc: "Interfaz Flet â€” texto largo, badges de riesgo, disclaimer fijo", color: "#0891B2" },
              { label: "Capa 5", desc: "IntegraciÃ³n â€” pipeline + log de privacidad (RGPD)", color: C.red },
              { label: "Capa 6", desc: "Pruebas y empaquetado", color: C.emerald },
              { label: "Fase 7", desc: "IteraciÃ³n y publicaciÃ³n en Foro", color: "rgba(17,17,17,0.4)" },
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
                    {["Capa", "Subcapa", "Herramienta(s)", "Por quÃ© se usa aquÃ­"].map(h => (
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
        <PhaseHeader icon={Search} label="Fase 0" color="#7C3AED" title="InvestigaciÃ³n"
          desc="Confirmar quÃ© benchmarks y quÃ© modelos lideran el razonamiento legal verificado antes de escribir cÃ³digo." />

        <Step num="0.A" title="Benchmarks de razonamiento legal"
          goal="Identificar quÃ© benchmarks evalÃºan clasificaciÃ³n de clÃ¡usulas, QA legal y extracciÃ³n de informaciÃ³n en contratos.">
          <PromptBlock label="Prompt 0.A â€” Benchmarks legales clave">
{`ActÃºa como Investigador Principal y Especialista en EvaluaciÃ³n de Inteligencia Artificial en el Dominio JurÃ­dico (LegalTech).

Tengo como objetivo seleccionar el modelo fundacional mÃ¡s fiable para "Lex Analyst", una herramienta de auditorÃ­a de contratos y detecciÃ³n de riesgos legales.

Analiza los benchmarks de dominio legal (LegalBench, CUAD - Contract Understanding Atticus Dataset, MMLU-Law, LexGLUE) y responde de forma rigurosa a los siguientes puntos:

1. METODOLOGÃA DE EVALUACIÃ“N:
   - Â¿QuÃ© tareas especÃ­ficas miden LegalBench y CUAD en relaciÃ³n a:
     a) ClasificaciÃ³n y tipificaciÃ³n de clÃ¡usulas contractuales (ej. indemnizaciÃ³n, no competencia, confidencialidad).
     b) ExtracciÃ³n exacta de citas y entidades normativas sin parafraseo.
     c) DetecciÃ³n de ambigÃ¼edades y clÃ¡usulas asimÃ©tricas o potencialmente abusivas.

2. RANKING COMPARATIVO DE MODELOS:
   - BasÃ¡ndote en datos empÃ­ricos de LegalBench y CUAD, Â¿quÃ© modelos actuales (Claude 3.5 Sonnet / 3.7, GPT-4o, DeepSeek-R1, Gemini 1.5/2.0 Pro) obtienen la mayor fidelidad en extracciÃ³n textual y la menor tasa de citas falsas (hallucinated citations)?

3. GESTIÃ“N DE VENTANA DE CONTEXTO:
   - Los contratos mercantiles pueden superar los 30.000 tokens. Â¿QuÃ© trade-off existe entre modelos con contexto ultra-largo (1M tokens) y modelos con ventanas de 128k en la atenciÃ³n a clÃ¡usulas crÃ­ticas ocultas al final del texto (Lost in the Middle problem)?

REGLAS ESTRICTAS:
- Cita mÃ©tricas reales (F1-score, exact match, accuracy). No inventes puntuaciones.
- Enfatiza la distinciÃ³n entre redacciÃ³n legal general y extracciÃ³n verÃ­dica de clÃ¡usulas contractuales.`}
          </PromptBlock>
        </Step>

        <Step num="0.B" title="Marco de responsabilidad para apps de anÃ¡lisis legal"
          goal="Definir disclaimers estÃ¡ndar de la industria y quÃ© advertencias mÃ­nimas son razonables para un uso de investigaciÃ³n.">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>Antes del cÃ³digo:</strong> Este paso define el tono de toda la app. Las advertencias legales no son opcionales â€” forman parte del producto.
          </div>
          <PromptBlock label="Prompt 0.B â€” Marco de responsabilidad">
{`ActÃºa como Asesor Senior en Compliance TecnolÃ³gico y Marco Regulatorio de IA (EU AI Act y Servicios JurÃ­dicos).

Antes de iniciar la codificaciÃ³n de "Lex Analyst", necesito definir la polÃ­tica de responsabilidad, descargos legales y privacidad de la aplicaciÃ³n:

1. TAXONOMÃA DE DISCLAIMERS EN LEGALTECH:
   - Analiza cÃ³mo gestionan la responsabilidad herramientas de referencia en el mercado (Harvey AI, Luminance, Robin AI, Casetext).
   - Â¿CuÃ¡l es la formulaciÃ³n jurÃ­dica estÃ¡ndar que distingue una herramienta de "asistencia y triaje documental previo" del "asesoramiento legal profesional reservado por ley"?

2. CUMPLIMIENTO CON EL REGLAMENTO EUROPEO DE IA (EU AI Act):
   - Â¿En quÃ© nivel de riesgo se clasifica una aplicaciÃ³n de anÃ¡lisis contractual interno para uso empresarial o formativo?
   - Â¿QuÃ© requisitos de supervisiÃ³n humana (Human-in-the-Loop) y transparencia algorÃ­tmica deben garantizarse en la interfaz?

3. POLÃTICA DE CONFIDENCIALIDAD Y RGPD:
   - Los contratos contienen datos identificativos, secretos comerciales y condiciones financieras.
   - Define el protocolo obligatorio de la app: advertencia visible sobre envÃ­o de datos a APIs externas, opciÃ³n de sanitizaciÃ³n local (Zero-PII) y polÃ­tica estricta de no persistencia documental por defecto (store_document_text = False).

Entrega la DeclaraciÃ³n Formal de Descargo que debe permanecer visible en todas las pantallas de la aplicaciÃ³n.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â• CAPA 1 â•â•â•â• */}
        <PhaseHeader icon={BookOpen} label="Capa 1" color={C.accent} title="DefiniciÃ³n del problema"
          desc="Seis preguntas que definen el problema, el usuario y los lÃ­mites de responsabilidad de la v1." />

        <Step num="1.1" title="Â¿QuiÃ©n usa esta app?" goal="El usuario puede no ser abogado. Eso cambia el tono de las advertencias y los tipos de anÃ¡lisis prioritarios.">
          <PromptBlock label="Prompt 1.1 â€” Perfil de usuario">
{`ActÃºa como DiseÃ±ador de Producto y Analista Funcional en LegalTech.

Define la ficha formal de perfil de usuario (User Persona) para "Lex Analyst":

1. IDENTIFICACIÃ“N Y ROL OPERATIVO:
   - Perfil principal: Responsable de Compras / Director de Operaciones en PYME o Startup que revisa contratos mercantiles (NDAs, contratos de prestaciÃ³n de servicios, SaaS, arrendamientos) antes de trasladarlos a la asesorÃ­a jurÃ­dica externa.
   - Perfil secundario: Abogado junior o estudiante de derecho que realiza una primera lectura de contraste para detectar clÃ¡usulas no estÃ¡ndar.

2. FLUJO DE TRABAJO ACTUAL (Puntos de Dolor):
   - Proceso manual actual: Lectura completa en PDF o Word con marcado de pÃ¡rrafos dudosos, invirtiendo de 2 a 4 horas por contrato.
   - Puntos crÃ­ticos: Pasar por alto plazos de preaviso de terminaciÃ³n automÃ¡tica, clÃ¡usulas de indemnizaciÃ³n ilimitada o sumisiÃ³n a tribunales extranjeros desfavorables.

3. EXPECTATIVAS RESPECTO A LA HERRAMIENTA:
   - El usuario no espera que la app emita un dictamen vinculante, sino que actÃºe como un escÃ¡ner de alta precisiÃ³n que resalte las secciones de mayor riesgo con el texto exacto entrecomillado.
   - Requiere un ejecutable de escritorio intuitivo, rÃ¡pido y con exportaciÃ³n directa en Markdown/PDF.`}
          </PromptBlock>
        </Step>

        <Step num="1.2" title="Â¿QuÃ© problema concreto resuelve?" goal="Una frase precisa. Distinguir: Â¿Lex Analyst REEMPLAZA la revisiÃ³n legal o hace una PRIMERA PASADA?">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(59,111,212,0.05)", borderLeft: "3px solid " + C.accent, color: "rgba(17,17,17,0.65)" }}>
            Esta distinciÃ³n (reemplazar vs. primera pasada) determina el diseÃ±o de todas las advertencias y el nivel de detalle de los anÃ¡lisis.
          </div>
          <PromptBlock label="Prompt 1.2 â€” DefiniciÃ³n del problema">
{`ActÃºa como Especialista en Propuesta de Valor y Estrategia LegalTech.

Redacta la declaraciÃ³n formal del problema que resuelve "Lex Analyst":

1. ESTRUCTURA FORMAL DE LA FRASE MAESTRA:
   "[ROL DE GESTIÃ“N] invierte [HORAS CRÃTICAS] en la lectura de contratos mercantiles sin contar con el criterio de un especialista para cada borrador, lo que provoca [RIESGO DE ACEPTAR CLÃUSULAS ABUSIVAS, COSTES LEGALES PREVENTIVOS ELEVADOS Y DEMORAS EN EL CIERRE DE ACUERDOS]."

2. GENERACIÃ“N DE 3 VARIANTES DE ENFOQUE:
   - Variante 1 (Ahorro de Tiempo y Coste): Enfoque en la eficiencia de la primera pasada previa al abogado.
   - Variante 2 (Control de Riesgo Contractual): Enfoque en la detecciÃ³n temprana de clÃ¡usulas lesivas.
   - Variante 3 (FormaciÃ³n y CapacitaciÃ³n): Enfoque en la comprensiÃ³n de jerga jurÃ­dica compleja.

3. DECLARACIÃ“N DE LÃMITES ENTRE REEMPLAZO Y COMPLEMENTO:
   - Define el lema rector de la app para su hero visual: "Lex Analyst no reemplaza al abogado; le proporciona a cualquier profesional una primera lectura rigurosa para negociar con conocimiento de causa".`}
          </PromptBlock>
        </Step>

        <Step num="1.3" title="Â¿QuÃ© datos entran?" goal="Texto pegado por el usuario, clÃ¡usulas CUAD de prÃ¡ctica, tipo de anÃ¡lisis y jurisdicciÃ³n.">
          <PromptBlock label="Prompt 1.3 â€” Datos de entrada">
{`ActÃºa como Ingeniero de Datos y DiseÃ±ador de Entradas en Sistemas Legales.

Define la especificaciÃ³n exhaustiva de todas las entradas (Inputs) admitidas por "Lex Analyst":

1. FUENTES DE TEXTO ADMITIDAS:
   - Entrada Manual / Portapapeles: Ãrea de texto multilÃ­nea para pegar fragmentos, clÃ¡usulas o contratos Ã­ntegros (hasta 50.000 caracteres / ~12.000 tokens en v1).
   - Biblioteca CUAD de PrÃ¡ctica: Selector desplegable con 10 clÃ¡usulas contractuales reales de dominio pÃºblico (NDAs, limitaciÃ³n de responsabilidad, resoluciÃ³n de disputas, terminaciÃ³n).

2. PARÃMETROS DE CONFIGURACIÃ“N DEL ANÃLISIS:
   - Tipo de AnÃ¡lisis (Selector exclusivo):
     * [DetecciÃ³n de Riesgos Contractuales Generales]
     * [AuditorÃ­a de Cumplimiento RGPD en PolÃ­ticas / ClÃ¡usulas de Datos]
     * [IdentificaciÃ³n de ClÃ¡usulas Abusivas o Desequilibradas]
     * [AnÃ¡lisis de ClÃ¡usulas de TerminaciÃ³n y Penalizaciones]
   - JurisdicciÃ³n de Referencia: EspaÃ±a (Derecho Civil / Mercantil), UniÃ³n Europea (Normativa Comunitaria), o Internacional (Common Law).
   - Modelo LLM: Selector de proveedor y modelo (Claude 3.5 Sonnet por defecto).

3. GESTIÃ“N DE DOCUMENTOS EXTENSOS:
   - Contador visual reactivo de tokens estimados.
   - Si el texto supera el lÃ­mite operativo, activa un diÃ¡logo de advertencia ofreciendo truncar al inicio/fin o procesar por secciones.`}
          </PromptBlock>
        </Step>

        <Step num="1.4" title="Â¿QuÃ© sale?" goal="Hallazgos con citas verificadas, badge de riesgo global, resumen ejecutivo e informe con disclaimer obligatorio.">
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}>
            <strong>Advertencia obligatoria en cada output:</strong> "Este anÃ¡lisis es orientativo. No constituye asesoramiento legal. Consulta a un profesional del derecho antes de tomar decisiones."
          </div>
          <PromptBlock label="Prompt 1.4 â€” Outputs">
{`ActÃºa como DiseÃ±ador de Salidas de InformaciÃ³n y AuditorÃ­a Legal.

Define las especificaciones de salida (Outputs) producidas por "Lex Analyst":

1. ESTRUCTURA DEL ANÃLISIS CONTRACTUAL:
   - Resumen Ejecutivo (Executive Summary): SÃ­ntesis de 150-200 palabras con el balance global del documento.
   - SemÃ¡foro de Riesgo Global: Badge visual destacado: [ALTO] (rojo), [MEDIO] (Ã¡mbar), [BAJO] (verde) o [INFORMATIVO] (azul), determinado por el riesgo del hallazgo mÃ¡s severo.
   - Lista Estructurada de Hallazgos (Risk Flags): Para cada riesgo detectado:
     * TÃ­tulo y Tipo de Riesgo (ej. "ClÃ¡usula de IndemnizaciÃ³n Desproporcionada").
     * Nivel de severidad individual.
     * Cita Textual Exacta (Verbatim Quote): Fragmento literal extraÃ­do del documento.
     * ExplicaciÃ³n del Riesgo (mÃ¡x. 100 palabras): Por quÃ© la clÃ¡usula puede perjudicar al usuario.
     * Nota de Consulta Recomendada: Pregunta concreta sugerida para trasladar al abogado (ej. "Solicitar inclusiÃ³n de un lÃ­mite cuantitativo de responsabilidad ligado al importe del contrato").
   - Notas de LimitaciÃ³n del AnÃ¡lisis: Lista de aspectos no evaluados (ej. "No se ha contrastado con convenios colectivos ni antecedentes registrales").

2. EXPORTABILIDAD:
   - GeneraciÃ³n de informe en Markdown (.md) y PDF con sello de tiempo UTC y descargo legal formal.`}
          </PromptBlock>
        </Step>

        <Step num="1.5" title="Criterios de Ã©xito" goal="7-9 criterios verificables, incluyendo: 100% de citas verificadas en el texto, advertencia visible en todas las pantallas.">
          <PromptBlock label="Prompt 1.5 â€” Criterios de Ã©xito">
{`ActÃºa como QA Lead y Auditor de Software Especializado en LegalTech.

Define los Criterios de AceptaciÃ³n Cuantitativos (DoD - Definition of Done) para certificar que Lex Analyst v1 estÃ¡ listo para entrega:

Formula entre 7 y 9 criterios verificables en menos de 10 minutos bajo la estructura:
"La aplicaciÃ³n se considera correcta y lista para producciÃ³n cuando [CONDICIÃ“N VERIFICABLE Y MEDIBLE]."

Incluye obligatoriamente:
1. VERIFICACIÃ“N DETERMINISTA DE CITAS: "El 100% de las citas textuales generadas por el LLM son verificadas automÃ¡ticamente contra el texto de entrada mediante bÃºsqueda de subcadena; si una cita no existe, se marca inmediatamente con badge de advertencia."
2. ADVERTENCIA PERMANENTE: "El banner legal de advertencia permanece visible en la pantalla principal y en cada informe exportado sin posibilidad de ser desactivado."
3. TOLERANCIA A DOCUMENTOS LARGOS: "La app procesa documentos de hasta 15.000 palabras sin bloquear el hilo de la interfaz de usuario ni agotar la memoria."
4. ROBUSTEZ EN MODO DESCONECTADO: "Si la API no responde o se desconecta la red, la app no sufre crashes y muestra el texto original con aviso de contingencia."
5. CALIDAD PERCIBIDA EN PRUEBA MANUAL: "En la evaluaciÃ³n con 5 contratos reales anonimizados, la app identifica con precisiÃ³n al menos el 80% de las clÃ¡usulas de riesgo identificadas previamente por un abogado."`}
          </PromptBlock>
        </Step>

        <Step num="1.6" title="LÃ­mites explÃ­citos de la v1" goal="QuÃ© idiomas, jurisdicciones y tipos de anÃ¡lisis NO cubre la v1, y la advertencia legal formal de la app.">
          <PromptBlock label="Prompt 1.6 â€” LÃ­mites v1 + advertencia legal formal">
{`ActÃºa como Asesor JurÃ­dico y Product Owner.

Redacta la DeclaraciÃ³n Formal de LÃ­mites y el Aviso Legal Integral para "Lex Analyst v1":

1. LÃMITES TÃ‰CNICOS Y FUNCIONALES EXCLUIDOS DE LA V1:
   - Idiomas soportados: Exclusivamente espaÃ±ol e inglÃ©s.
   - Sin anÃ¡lisis jurisprudencial dinÃ¡mico: El modelo no consulta bases de datos de sentencias judiciales en tiempo real.
   - Sin verificaciÃ³n de vigencia normativa: No contrasta en tiempo real con modificaciones de Ãºltima hora del BOE/DOUE.
   - No redacciÃ³n de contraofertas o adendas modificativas de forma automÃ¡tica.

2. TEXTO LEGAL FORMAL DEL DESCARGO (Aparece en pantalla inicial y pie de informes):
   "AVISO LEGAL IMPORTANTE: Lex Analyst es una herramienta de asistencia tecnolÃ³gica para el anÃ¡lisis preliminar de textos contractuales con fines de estudio e investigaciÃ³n. Los informes, clasificaciones y sugerencias emitidos NO CONSTITUYEN NI SUSTITUYEN EL ASESORAMIENTO JURÃDICO DE UN ABOGADO COLEGIADO. La interpretaciÃ³n de contratos requiere un anÃ¡lisis pormenorizado del contexto mercantil, la legislaciÃ³n aplicable y la jurisprudencia de cada jurisdicciÃ³n. El usuario es el Ãºnico responsable de someter cualquier borrador o acuerdo a la revisiÃ³n de un profesional del derecho antes de su firma o ejecuciÃ³n."`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 â€” DATOS (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Layers} 
          label="Capa 2" 
          color={C.emerald} 
          title="Datos"
          desc="CUAD como base de prÃ¡ctica, esquemas Pydantic, verificaciÃ³n de citas y almacenamiento con consideraciones de privacidad." 
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="Implementar carga desde CUAD local y creaciÃ³n de documentos desde texto pegado por el usuario."
        >
          <PromptBlock label="Prompt 2.1 â€” load_cuad_clauses() + create_manual_document()">
{`ActÃºa como Ingeniero de Datos en Python especializado en procesamiento de textos legales.

Crea el mÃ³dulo \`document_loader.py\` para la ingesta y preparaciÃ³n de documentos contractuales en "Lex Analyst":

1. ESPECIFICACIÃ“N DE FUNCIONES:
   - \`load_cuad_clauses(file_path: Path, limit: int = 20) -> list[LegalDocument]\`:
     * Carga el archivo local \`data_legal/raw/cuad_clauses.json\` conteniendo clÃ¡usulas anotadas del benchmark CUAD.
     * Soporta formato JSON array y JSONL.
     * Agrupa y normaliza por \`document_name\` y \`clause_type\` para su consumo directo en la interfaz de usuario.
     * Lanza \`FileNotFoundError\` con mensaje instructivo si el archivo de demostraciÃ³n no estÃ¡ presente.
   
   - \`create_manual_document(text: str, document_type: str, jurisdiction: str = "EspaÃ±a") -> LegalDocument\`:
     * Normaliza saltos de lÃ­nea (\\r\\n -> \\n) y limpia espacios en blanco redundantes.
     * EvalÃºa la longitud del texto. Si supera \`MAX_TEXT_LENGTH\` (ej. 50.000 caracteres), trunca de forma segura en el Ãºltimo punto y aparte y marca \`is_truncated = True\`.
     * Genera un identificador Ãºnico UUID4 para la sesiÃ³n de anÃ¡lisis.

2. REQUISITOS TÃ‰CNICOS:
   - Utiliza exclusivamente \`pathlib.Path\`. Prohibido el uso de rutas absolutas hardcodeadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="LegalDocument Â· RiskFlag Â· LegalAnalysis â€” incluyendo quote_verified y legal_disclaimer."
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
                    <li key={f} className="font-mono" style={{ color: "rgba(17,17,17,0.6)" }}>Â· {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 2.2 â€” Esquema Pydantic">
{`ActÃºa como Arquitecto de Software Python y Especialista en Modelado de Dominio LegalTech.

Crea el archivo \`schemas.py\` utilizando Pydantic v2 con validaciÃ³n estricta para "Lex Analyst":

1. ESPECIFICACIÃ“N DE MODELOS DE DOMINIO:
\`\`\`python
from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime
from uuid import UUID, uuid4

class LegalDocument(BaseModel):
    document_id: UUID = Field(default_factory=uuid4)
    text: str = Field(..., min_length=50, description="Texto completo del contrato o clÃ¡usula")
    document_type: str = Field(default="Contrato Mercantil General")
    jurisdiction: Optional[str] = Field(default="EspaÃ±a")
    source: Literal["cuad", "manual"] = "manual"
    is_truncated: bool = False
    original_length_chars: int = 0

class RiskFlag(BaseModel):
    flag_id: UUID = Field(default_factory=uuid4)
    finding_type: str = Field(..., description="Tipo de hallazgo (ej. IndemnizaciÃ³n ilimitada)")
    risk_level: Literal["ALTO", "MEDIO", "BAJO", "INFORMATIVO"]
    verbatim_quote: str = Field(..., description="Cita textual exacta extraÃ­da del contrato")
    quote_verified: bool = Field(default=False, description="True si la cita existe en el texto original")
    explanation: str = Field(..., max_length=600, description="ExplicaciÃ³n del riesgo en mÃ¡x 100 palabras")
    recommendation_note: str = Field(..., description="QuÃ© aspecto revisarÃ­a un abogado; sin asesorar")

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
   - Incluye docstrings explicativos en cada modelo y validadores para asegurar que \`legal_disclaimer\` no estÃ© vacÃ­o.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="VerificaciÃ³n de citas textuales" 
          goal="La funciÃ³n mÃ¡s importante de honestidad: verify_quote() comprueba que cada cita del LLM existe en el texto original."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla de oro:</strong> Si &gt;50% de las citas no se verifican en el documento, el anÃ¡lisis muestra advertencia global de fiabilidad.
          </div>
          <PromptBlock label="Prompt 2.3 â€” verify_quote() + verify_all_quotes()">
{`ActÃºa como Ingeniero de Algoritmos y AuditorÃ­a Textual en Python.

Crea el mÃ³dulo \`quote_verifier.py\` con el motor determinista de verificaciÃ³n de citas para erradicar alucinaciones en "Lex Analyst":

1. FUNCIÃ“N \`verify_quote(quote: str, document_text: str, fuzzy_threshold: float = 0.85) -> bool\`:
   - Fase 1 (BÃºsqueda Exacta): \`quote.strip() in document_text\`. Si coincide, retorna \`True\`.
   - Fase 2 (BÃºsqueda Normalizada): Elimina saltos de lÃ­nea redundantes, homologa comillas tipogrÃ¡ficas (Â« Â», â€œ â€, ' ') con comillas rectas (' "), y compara sin distinciÃ³n de mayÃºsculas/minÃºsculas.
   - Fase 3 (BÃºsqueda por Subcadena Tolerante): Si la cita es extensa (> 10 palabras), verifica si al menos el 85% de las secuencias de n-gramas coinciden de forma contigua en el documento.
   - Retorna \`False\` si no se verifica la presencia real de la cita.

2. FUNCIÃ“N \`verify_all_quotes(risk_flags: list[RiskFlag], document_text: str) -> tuple[list[RiskFlag], int, bool]\`:
   - Itera sobre todos los hallazgos y actualiza el campo booleano \`quote_verified\`.
   - Contabiliza las citas fallidas (\`unverified_count\`).
   - Activa \`has_critical_unverified_warning = True\` si mÃ¡s del 50% de las citas no pudieron verificarse en el texto fuente.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="Historial de anÃ¡lisis con decisiÃ³n de privacidad: guardar o no el texto completo del documento."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.amber }}>DecisiÃ³n de diseÃ±o:</strong> store_document_text=False por defecto. Los documentos legales del usuario pueden ser confidenciales.
          </div>
          <PromptBlock label="Prompt 2.4 â€” Persistencia DuckDB con privacidad">
{`ActÃºa como Especialista en Bases de Datos y Privacidad en Sistemas de InformaciÃ³n.

Crea el mÃ³dulo \`storage.py\` para gestionar la persistencia local de anÃ¡lisis legales en DuckDB (\`~/.lex_analyst/data/legal_history.duckdb\`):

1. ARQUITECTURA RELACIONAL Y PRIVACIDAD POR DEFECTO:
   - \`init_legal_db(db_path: Path, store_document_text: bool = False) -> duckdb.DuckDBPyConnection\`:
     * Tabla \`legal_analyses\`: \`analysis_id\`, \`document_id\`, \`model_name\`, \`analysis_type\`, \`global_risk_level\`, \`num_findings\`, \`unverified_quotes_count\`, \`analyzed_at\`.
     * Tabla \`risk_flags\`: \`flag_id\`, \`analysis_id\`, \`finding_type\`, \`risk_level\`, \`verbatim_quote\`, \`quote_verified\`, \`explanation\`.
     * Tabla opcional \`document_payloads\`: Solo se crea e inserta si \`store_document_text == True\` (desactivado por defecto para proteger el secreto comercial).

2. OPERACIONES TRANSACCIONALES:
   - \`store_analysis(conn, analysis: LegalAnalysis, document: LegalDocument, store_text: bool = False) -> str\`: InserciÃ³n atÃ³mica.
   - \`get_analysis_history(conn, limit: int = 25) -> list[dict]\`: Consulta cronolÃ³gica para la vista de Historial.
   - \`export_analysis_markdown(conn, analysis_id: str, output_path: Path) -> Path\`: Genera informe exportable completo con la advertencia legal fija.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="10 clÃ¡usulas de dominio pÃºblico: NDA, limitaciÃ³n de responsabilidad, resoluciÃ³n de disputas, terminaciÃ³n."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {[
              { tipo: "NDA (3)", desc: "Una estÃ¡ndar Â· una con plazo inusualmente largo Â· una con alcance muy amplio" },
              { tipo: "LimitaciÃ³n de responsabilidad (3)", desc: "Equilibrada Â· muy favorable a una parte Â· redacciÃ³n ambigua" },
              { tipo: "ResoluciÃ³n de disputas (2)", desc: "Con arbitraje Â· con elecciÃ³n de jurisdicciÃ³n extranjera" },
              { tipo: "TerminaciÃ³n (2)", desc: "EstÃ¡ndar Â· plazo de preaviso muy corto" },
            ].map(s => (
              <div key={s.tipo} className="p-3 rounded-lg text-[12px]"
                style={{ background: "rgba(17,17,17,0.03)", borderLeft: "2px solid rgba(17,17,17,0.10)" }}>
                <div className="font-semibold mb-1" style={{ color: C.dark }}>{s.tipo}</div>
                <div style={{ color: "rgba(17,17,17,0.55)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 2.5 â€” sample_legal_clauses.json">
{`ActÃºa como Abogado Mercantil y Curador de Datasets de FormaciÃ³n LegalTech.

Crea el archivo \`sample_legal_clauses.json\` con 10 clÃ¡usulas reales de contratos mercantiles de dominio pÃºblico para pruebas y calibraciÃ³n:

1. COMPOSICIÃ“N DEL CATÃLOGO (10 Casos):
   - **3 ClÃ¡usulas de Confidencialidad (NDA):**
     * ClÃ¡usula 1: RedacciÃ³n estÃ¡ndar y bilateral a 2 aÃ±os.
     * ClÃ¡usula 2: Plazo perpetuo e inusualmente lesivo para informaciÃ³n comercial no tÃ©cnica.
     * ClÃ¡usula 3: DefiniciÃ³n desmesuradamente amplia de informaciÃ³n confidencial incluyendo datos pÃºblicos.
   - **3 ClÃ¡usulas de LimitaciÃ³n de Responsabilidad:**
     * ClÃ¡usula 4: LÃ­mite equitativo indexado a las cantidades abonadas en los Ãºltimos 12 meses.
     * ClÃ¡usula 5: ExoneraciÃ³n total de responsabilidad por daÃ±os directos e indirectos solo a favor del proveedor.
     * ClÃ¡usula 6: RedacciÃ³n ambigua y contradictoria sobre lucro cesante.
   - **2 ClÃ¡usulas de ResoluciÃ³n de Conflictos:**
     * ClÃ¡usula 7: SumisiÃ³n a arbitraje vinculante en la CÃ¡mara de Comercio de Madrid.
     * ClÃ¡usula 8: ElecciÃ³n de fuero judicial en Delaware (EE.UU.) con renuncia expresa a tribunales locales del cliente.
   - **2 ClÃ¡usulas de TerminaciÃ³n y RescisiÃ³n:**
     * ClÃ¡usula 9: TerminaciÃ³n por incumplimiento con preaviso razonable de 30 dÃ­as hÃ¡biles.
     * ClÃ¡usula 10: Facultad de resoluciÃ³n unilateral inmediata sin causa con preaviso de solo 24 horas.

2. METADATOS POR CLÃUSULA:
   - \`clause_id\`, \`clause_type\`, \`text\`, \`expected_risk_level\` (para pruebas de aserciÃ³n) y \`educational_rationale\`.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 â€” LÃ“GICA / IA (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Cpu} 
          label="Capa 3" 
          color={C.amber} 
          title="LÃ³gica / IA"
          desc="SelecciÃ³n del modelo, prompt con citas obligatorias, parseo estructurado y control antialucinaciÃ³n por verificaciÃ³n de texto." 
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Elegir entre el lÃ­der en LegalBench y el lÃ­der en CUAD â€” pueden no ser el mismo."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}
          >
            Considerar especialmente: <strong>lÃ­mite de contexto</strong> (los contratos pueden tener 50.000+ tokens) y disponibilidad de API.
          </div>
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`ActÃºa como Investigador de IA especializado en Benchmarks JurÃ­dicos (LegalBench, CUAD, MMLU-Law).

Para "Lex Analyst", analiza y fundamenta la selecciÃ³n tÃ©cnica del modelo de lenguaje para la auditorÃ­a de contratos:

1. ANÃLISIS DE RENDIMIENTO COMPARADO:
   - Identifica el modelo comercial lÃ­der en LegalBench (ej. Claude 3.5 Sonnet / Claude 3.7) frente a GPT-4o y Gemini 1.5/2.0 Pro.
   - Compara su capacidad especÃ­fica en la tarea de extracciÃ³n exacta de citas (*Span Extraction*) en el benchmark CUAD.
   - Â¿QuÃ© modelo minimiza las "citas inventadas" o parafraseadas cuando se le instruye expresamente a citar entre comillas?

2. CAPACIDAD DE CONTEXTO Y COSTE:
   - EvalÃºa la ventana de contexto necesaria: Â¿Permite procesar contratos mercantiles de 20 a 40 pÃ¡ginas (~15.000 a 30.000 tokens) en una sola llamada sin degradaciÃ³n de atenciÃ³n (*Needle in a Haystack*)?
   - Define los parÃ¡metros Ã³ptimos: \`temperature = 0.1\` (rigor analÃ­tico y mÃ­nima variabilidad) y \`max_tokens = 2000\`.

3. ELECCIÃ“N FINAL JUSTIFICADA:
   - Redacta la memoria de elecciÃ³n en 4 lÃ­neas justificando el modelo principal y una alternativa recomendada.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="DiseÃ±o del prompt central" 
          goal="Prompt que obliga al modelo a citar textualmente, asignar riesgo y prohibir inventar fragmentos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald }}>
              <div className="font-semibold mb-1" style={{ color: C.emerald }}>Instrucciones obligatorias</div>
              <ul className="space-y-1 text-[12px]" style={{ color: "rgba(17,17,17,0.65)" }}>
                <li>Â· Citar textualmente el fragmento exacto</li>
                <li>Â· Asignar ALTO / MEDIO / BAJO / INFORMATIVO</li>
                <li>Â· MÃ¡x 100 palabras por explicaciÃ³n</li>
                <li>Â· Nota de recomendaciÃ³n (no consejo legal)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red }}>
              <div className="font-semibold mb-1" style={{ color: C.red }}>ProhibiciÃ³n explÃ­cita</div>
              <ul className="space-y-1 text-[12px]" style={{ color: "rgba(17,17,17,0.65)" }}>
                <li>Â· No inventar citas</li>
                <li>Â· Si no hay fragmento: "Sin cita directa disponible"</li>
                <li>Â· No proporcionar asesoramiento legal</li>
              </ul>
            </div>
          </div>
          <PromptBlock label="Prompt 3.2 â€” Prompt maestro de anÃ¡lisis legal">
{`ActÃºa como DiseÃ±ador de Prompts JurÃ­dicos de Alta PrecisiÃ³n.

DiseÃ±a el prompt central estructurado para el motor de anÃ¡lisis contractual de "Lex Analyst":

1. SYSTEM PROMPT (Especialista en Triaje Contractual y DetecciÃ³n de Riesgos):
   - Rol: "Eres un asistente tÃ©cnico de triaje contractual diseÃ±ado para identificar clÃ¡usulas de riesgo en documentos legales para una primera pasada de revisiÃ³n antes de la consulta con el abogado."
   - Reglas Absolutas:
     a) Cita Textual Obligatoria: Cada hallazgo debe incluir el fragmento literal exacto entrecomillado del documento (\`verbatim_quote\`).
     b) ProhibiciÃ³n de Citas Falsas: Si detectas un riesgo por omisiÃ³n o falta de clÃ¡usula, debes escribir estrictamente: \`"Sin cita directa disponible â€” Riesgo por omisiÃ³n"\`. Queda terminantemente prohibido inventar o parafrasear texto que no exista en el documento.
     c) ClasificaciÃ³n Estricta: Cada riesgo debe catalogarse exclusivamente como: \`ALTO\`, \`MEDIO\`, \`BAJO\` o \`INFORMATIVO\`.
     d) Lenguaje no vinculante: Las notas de recomendaciÃ³n deben formularse siempre bajo la estructura: *"Un abogado revisarÃ­a si..."* o *"Se aconseja contrastar con el asesor legal si..."*.

2. USER PROMPT TEMPLATE (Variables DinÃ¡micas):
   - Plantilla con variables: \`{{DOCUMENT_TEXT}}\`, \`{{ANALYSIS_TYPE}}\`, \`{{JURISDICTION}}\`.
   - Esquema JSON de salida obligado (\`response_format: {"type": "json_object"}\`).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo con gestiÃ³n de contexto largo" 
          goal="analyze_legal_text() con truncado controlado, temperatura 0.1 y timeout de 60s para documentos largos."
        >
          <PromptBlock label="Prompt 3.3 â€” analyze_legal_text()">
{`ActÃºa como Ingeniero de IntegraciÃ³n de LLMs en Python.

Escribe el mÃ³dulo \`legal_analyzer.py\` con la funciÃ³n asÃ­ncrona \`analyze_legal_text(...)\`:

1. ESPECIFICACIÃ“N DE LA FUNCIÃ“N:
\`\`\`python
async def analyze_legal_text(
    document: LegalDocument,
    analysis_type: str = "Riesgos Contractuales Generales",
    model_name: str = "claude-3-5-sonnet-20241022",
    api_key: Optional[str] = None
) -> tuple[str, float]:
\`\`\`

2. GESTIÃ“N DE DOCUMENTOS LARGOS:
   - Estima el nÃºmero de tokens (ratio 1 token â‰ˆ 4 caracteres para espaÃ±ol/inglÃ©s).
   - Si el documento excede el lÃ­mite configurado (\`MAX_ALLOWED_TOKENS\`), trunca respetando el lÃ­mite superior y marca \`document.is_truncated = True\`.
   - Timeout configurado en 60.0 segundos con 2 reintentos ante caÃ­das temporales de red.

3. RETORNO:
   - Devuelve \`(raw_json_response: str, latency_seconds: float)\`. Registra el tiempo de respuesta en el log de auditorÃ­a.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo del anÃ¡lisis legal" 
          goal="parse_legal_analysis() con validaciÃ³n Pydantic, cÃ¡lculo de global_risk_level y disclaimer aÃ±adido al resultado."
        >
          <PromptBlock label="Prompt 3.4 â€” parse_legal_analysis()">
{`ActÃºa como Ingeniero de Software especializado en Structured Outputs y ValidaciÃ³n Pydantic.

Implementa la funciÃ³n \`parse_legal_analysis(raw_response: str, document: LegalDocument, model_name: str, analysis_type: str) -> LegalAnalysis\` en \`parser.py\`:

1. PROCESAMIENTO RESILIENTE:
   - Extrae el bloque JSON de la respuesta eliminando posibles bloques markdown (\`\`\`json ... \`\`\`).
   - Valida el payload contra los esquemas Pydantic \`LegalAnalysis\` y \`RiskFlag\`.
   - Si el campo \`verbatim_quote\` estÃ¡ en blanco, lo normaliza automÃ¡ticamente a *"Sin cita directa disponible"*.

2. REGLA DE RIESGO GLOBAL:
   - Calcula el \`global_risk_level\` dinÃ¡micamente:
     * Si existe al menos un hallazgo \`ALTO\` -> Global = \`ALTO\`.
     * Si no hay \`ALTO\` pero hay \`MEDIO\` -> Global = \`MEDIO\`.
     * Si solo hay \`BAJO\` -> Global = \`BAJO\`.
     * En cualquier otro caso -> \`INFORMATIVO\`.

3. INYECCIÃ“N INMUTABLE DEL DESCARGO LEGAL:
   - Inyecta la advertencia legal formal obligatoria de la aplicaciÃ³n en el campo \`legal_disclaimer\` antes de retornar el objeto.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Control antialucinaciÃ³n: verificaciÃ³n de citas" 
          goal="validate_legal_analysis() que verifica cada cita en el texto original y muestra badge de advertencia en las no verificadas."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla crÃ­tica:</strong> No usar un segundo LLM para validar el primero. La verificaciÃ³n es siempre determinista: la cita existe o no existe en el texto.
          </div>
          <PromptBlock label="Prompt 3.5 â€” validate_legal_analysis()">
{`ActÃºa como Especialista en Guardrails AntialucinaciÃ³n y Calidad de Datos Legales.

Implementa la funciÃ³n \`validate_legal_analysis(analysis: LegalAnalysis, document: LegalDocument) -> tuple[LegalAnalysis, list[str]]\` en \`guardrails.py\`:

1. AUDITORÃA DETERMINISTA:
   - Para cada \`RiskFlag\`, invoca \`verify_quote(flag.verbatim_quote, document.text)\`.
   - Si la cita existe literalmente en el contrato, asigna \`flag.quote_verified = True\`.
   - Si la cita no se localiza en el texto original:
     * Asigna \`flag.quote_verified = False\`.
     * Anexa una advertencia al listado de incidencias: *"Cita no verificada en hallazgo: [Primeros 40 caracteres]"*.

2. ADVERTENCIA DE INTEGRIDAD GLOBAL:
   - Si mÃ¡s del 50% de las citas del anÃ¡lisis resultan no verificadas, aÃ±ade una nota de advertencia prioritaria en \`analysis.limitation_notes\`:
     *"[ALERTA DE FIABILIDAD: MÃ¡s del 50% de las citas textuales no pudieron ser localizadas literalmente en el documento. Se recomienda revisiÃ³n manual completa]"*.

3. RETORNO:
   - Devuelve \`(analysis_actualizado, issues_list)\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="analyze_with_fallback(): si el LLM falla, banner 'Consulta a un profesional legal' y anÃ¡lisis vacÃ­o bien seÃ±alizado."
        >
          <PromptBlock label="Prompt 3.6 â€” analyze_with_fallback()">
{`ActÃºa como Arquitecto de Resiliencia de Software en Entornos CrÃ­ticos.

Implementa en \`fallback.py\` la funciÃ³n orquestadora con contingencia \`analyze_with_fallback(document: LegalDocument, analysis_type: str, model_name: str) -> tuple[LegalAnalysis, bool]\`:

1. GESTIÃ“N DE CONTINGENCIA ANTE CAÃDAS:
   - Ejecuta la secuencia: \`analyze_legal_text()\` -> \`parse_legal_analysis()\` -> \`validate_legal_analysis()\`.
   - Si la llamada falla por timeout, caÃ­da de API externa o error de red:
     * Genera un objeto \`LegalAnalysis\` de emergencia con \`risk_flags = []\` y \`global_risk_level = "INFORMATIVO"\`.
     * Asigna como resumen ejecutivo: *"El servicio de anÃ¡lisis asistido por IA no estÃ¡ disponible temporalmente. No se han podido extraer riesgos automÃ¡ticos."*
     * Incluye en las notas de limitaciÃ³n: *"Se aconseja trasladar el documento directamente a su asesor jurÃ­dico colegiado para su revisiÃ³n manual."*
     * Inyecta el descargo legal formal completo.
     * Retorna \`(analysis_fallback, is_llm_used = False)\`.

2. COMPORTAMIENTO DE LA INTERFAZ:
   - Garantiza que la aplicaciÃ³n nunca experimente un crash o cierre forzado ante fallos del proveedor de IA.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 4 â€” INTERFAZ DE ESCRITORIO (FLET)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Monitor} 
          label="Capa 4" 
          color="#0891B2" 
          title="Interfaz de escritorio (Flet)"
          desc="Tres pantallas: AnÃ¡lisis, Historial y ConfiguraciÃ³n â€” con la advertencia legal fija en todas ellas." 
        />

        <Step 
          num="4.1" 
          title="Wireframe mÃ­nimo" 
          goal="Definir las 3 pantallas antes de codificar."
        >
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { n: "1", title: "AnÃ¡lisis", items: ["Advertencia legal permanente", "Ãrea de texto + clÃ¡usulas CUAD", "Tipo de anÃ¡lisis + jurisdicciÃ³n", "Badge riesgo global + hallazgos"] },
              { n: "2", title: "Historial", items: ["Lista de anÃ¡lisis anteriores", "Filtro por nivel de riesgo", "Modo solo lectura de resultados"] },
              { n: "3", title: "ConfiguraciÃ³n", items: ["store_document_text (on/off)", "API key", "Advertencia de privacidad datos"] },
            ].map(s => (
              <div key={s.n} className="p-4 rounded-xl border text-sm"
                style={{ borderColor: "rgba(8,145,178,0.2)", background: "rgba(8,145,178,0.03)" }}>
                <div className="font-semibold mb-2" style={{ color: "#0891B2" }}>Pantalla {s.n}: {s.title}</div>
                <ul className="space-y-1">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5 text-[12px]" style={{ color: "rgba(17,17,17,0.6)" }}>
                      <span style={{ color: "#0891B2" }}>Â·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.1 â€” Wireframe Flet">
{`ActÃºa como DiseÃ±ador de Interfaces Senior y Arquitecto UI en Flet (Python).

DiseÃ±a la arquitectura visual y distribuciÃ³n de componentes para "Lex Analyst":

1. PANTALLA 1: ANÃLISIS CONTRACTUAL (Vista Operativa Principal):
   - Encabezado: Banner fijo permanente e indescartable (ft.Banner o ft.Container con fondo rojizo suave y borde de aviso) que muestra: "Advertencia Legal: Esta herramienta no proporciona asesoramiento jurÃ­dico vinculante. Triaje y anÃ¡lisis previo para revisiÃ³n con abogado."
   - Entrada: ft.TextField multilÃ­nea de 350px de altura con scroll suave, contador reactivo de caracteres y estimaciÃ³n de tokens.
   - Barra de Herramientas de Carga: BotÃ³n ft.ElevatedButton con icono para abrir el modal de selecciÃ³n de clÃ¡usulas CUAD de ejemplo.
   - ParÃ¡metros: Dropdowns para Tipo de AnÃ¡lisis, JurisdicciÃ³n y SelecciÃ³n de Modelo LLM.
   - AcciÃ³n Principal: BotÃ³n prominente "Iniciar AnÃ¡lisis Contractual".
   - Panel de Resultados: Badge de riesgo global, lista de hallazgos en ft.ExpansionTile con citas textuales destacadas y badges de verificaciÃ³n, resumen ejecutivo y botÃ³n de exportaciÃ³n en Markdown.

2. PANTALLA 2: HISTORIAL DE AUDITORÃAS (Vista de Consulta):
   - Tabla cronolÃ³gica de contratos analizados con fecha, tipo, modelo, nivel de riesgo y conteo de hallazgos.
   - Modo consulta de solo lectura al hacer clic en un registro anterior.

3. PANTALLA 3: CONFIGURACIÃ“N Y PRIVACIDAD (Compliance):
   - Switch reactivo para store_document_text con advertencia expresa de secreto empresarial.
   - Campo para API Key con mÃ¡scara de contraseÃ±a y selector de directorio para base de datos DuckDB local.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="Banner de advertencia legal no descartable + formulario con contador de tokens estimados."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>DiseÃ±o obligatorio:</strong> El banner legal NO puede cerrarse. Es siempre visible en la pantalla principal.
          </div>
          <PromptBlock label="Prompt 4.2 â€” Formulario de entrada Flet">
{`ActÃºa como Desarrollador Frontend en Python con Flet.

Crea el componente ContractInputForm en ui_form.py para "Lex Analyst":

1. BANNER LEGAL PERMANENTE:
\`\`\`python
legal_notice = ft.Container(
    content=ft.Row([
        ft.Icon(ft.icons.SHIELD_ALERT_ROUNDED, color=ft.colors.RED_700, size=20),
        ft.Text(
            "AVISO LEGAL: Lex Analyst no es un despacho de abogados ni emite asesoramiento vinculante. "
            "Los resultados son orientativos para su posterior revisiÃ³n por un profesional del derecho.",
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
   - ft.TextField multilÃ­nea con min_lines=10, max_lines=15 y autofocus=True.
   - Evento on_change: calcula la longitud en caracteres y estima tokens (len(text) // 4). Actualiza una etiqueta de texto dinÃ¡mica: "Caracteres: 4.820 | Tokens estimados: ~1.205 / 16.000". Si supera los 50.000 caracteres, colorea el contador en rojo y advierte de truncado automÃ¡tico.

3. SELECTORES Y CARGA CUAD:
   - Selector desplegable con las 10 clÃ¡usulas CUAD de muestra para pruebas rÃ¡pidas sin requerir copiar y pegar.
   - Selector de Tipo de AnÃ¡lisis y JurisdicciÃ³n aplicable.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
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
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados Flet">
{`ActÃºa como DiseÃ±ador de Componentes Flet especializado en visualizaciÃ³n de auditorÃ­a documental.

Implementa ContractResultsView en ui_results.py que recibe un LegalAnalysis y construye el cuadro de mando:

1. BADGE DE RIESGO GLOBAL:
   - Tarjeta destacada superior con fondo dinÃ¡mico:
     * ALTO: Rojo (#DC2626) con texto: "NIVEL DE RIESGO GLOBAL: ALTO â€” Requiere revisiÃ³n prioritaria".
     * MEDIO: Ãmbar (#D97706) con texto: "NIVEL DE RIESGO GLOBAL: MEDIO â€” ClÃ¡usulas no estÃ¡ndar".
     * BAJO: Verde (#059669) con texto: "NIVEL DE RIESGO GLOBAL: BAJO â€” Condiciones habituales".
     * INFORMATIVO: Azul grisÃ¡ceo (#0891B2).

2. ACORDEONES EXPANDIBLES DE HALLAZGOS (ft.ExpansionTile):
   - Para cada RiskFlag:
     * TÃ­tulo: Nombre del hallazgo + badge de severidad individual.
     * Cita Textual Literal: Presentada en un contenedor con tipografÃ­a monoespaciada y comillas tipogrÃ¡ficas.
     * Badge de VerificaciÃ³n AntialucinaciÃ³n:
       - Si quote_verified == True: Badge verde "âœ“ Cita verificada en el contrato original".
       - Si quote_verified == False: Badge Ã¡mbar/rojo con icono "âš ï¸ Cita no verificada literalmente en el texto original".
     * ExplicaciÃ³n de impacto y nota de recomendaciÃ³n legal formulada en cursiva ("Aspecto sugerido para consulta con el abogado: ...").

3. RESUMEN EJECUTIVO Y EXPORTACIÃ“N:
   - Contenedor con el Resumen Ejecutivo, notas de limitaciÃ³n y botÃ³n ft.ElevatedButton "Exportar Informe Markdown (.md)".`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="6 estados: sin texto, analizando, texto muy largo, LLM no disponible, anÃ¡lisis parcial, 0 hallazgos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {[
              "Sin texto (inicio)",
              "Analizando (puede tardar 60s en documentos largos)",
              "Texto supera lÃ­mite del modelo",
              "LLM no disponible + banner 'Consulta a un profesional'",
              "AnÃ¡lisis parcial (algunos hallazgos no extraÃ­dos)",
              "0 hallazgos â€” badge verde con nota de limitaciÃ³n",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
                style={{ background: "rgba(17,17,17,0.04)", color: "rgba(17,17,17,0.6)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(17,17,17,0.1)", color: C.dark }}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.4 â€” Estados de error Flet">
{`ActÃºa como Especialista en UX y Manejo de Estados en Flet.

Implementa en ui_states.py los 6 estados del ciclo de vida para "Lex Analyst":

1. ESTADO 1 (Inicio / Sin Texto):
   - Muestra ilustraciÃ³n sutil o icono documental con mensaje guÃ­a: "Pega una clÃ¡usula o contrato mercantil arriba o selecciona un ejemplo de la biblioteca CUAD para comenzar".

2. ESTADO 2 (Procesamiento Activo):
   - ft.ProgressRing con mensaje dinÃ¡mico: "Analizando clÃ¡usulas y verificando referencias textuales con [Modelo]... (Esto puede tomar entre 15 y 45 segundos en contratos extensos)".

3. ESTADO 3 (Texto Excesivo / Alerta de Truncado):
   - Modal emergente ft.AlertDialog: "El documento supera los 50.000 caracteres. Para garantizar la mÃ¡xima fiabilidad, Lex Analyst analizarÃ¡ las secciones iniciales y esenciales. Â¿Deseas continuar?".

4. ESTADO 4 (Fallo de Proveedor de IA / Offline):
   - Banner de contingencia en rojo: "Servicio de IA no disponible temporalmente. No se ha podido completar la auditorÃ­a algorÃ­tmica. Por favor, remita el contrato a su asesor legal.".

5. ESTADO 5 (ExtracciÃ³n Parcial):
   - Alerta en Ã¡mbar: "El anÃ¡lisis se completÃ³ parcialmente. Algunos pÃ¡rrafos complejos requirieron verificaciÃ³n manual directa.".

6. ESTADO 6 (0 Riesgos Detectados):
   - Badge verde: "Sin riesgos evidentes detectados en las clÃ¡usulas analizadas", acompaÃ±ado obligatoriamente del aviso: "Este resultado algorÃ­tmico no constituye una garantÃ­a de validez legal. Consulte a su letrado."`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n bÃ¡sica" 
          goal="NavigationBar con 3 pantallas â€” la advertencia legal es visible en todas ellas."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n Flet">
{`ActÃºa como Arquitecto de Aplicaciones de Escritorio en Flet.

Crea el archivo principal main.py con el controlador de navegaciÃ³n y ciclo de vida de "Lex Analyst":

1. ARQUITECTURA DE LA VENTANA Y DISPATCHER:
   - ConfiguraciÃ³n de la ventana: TÃ­tulo "Lex Analyst â€” AuditorÃ­a Contractual & DetecciÃ³n de Riesgos", dimensiones iniciales 1100x850, soporte para tema claro con paleta corporativa neutra y acentos Ã­ndigo.
   - Barra de NavegaciÃ³n Inferior (ft.NavigationBar):
     * Destino 0: "AnÃ¡lisis" (ft.icons.DOCUMENT_SCANNER_ROUNDED).
     * Destino 1: "Historial" (ft.icons.HISTORY_ROUNDED).
     * Destino 2: "ConfiguraciÃ³n & Privacidad" (ft.icons.SHIELD_ROUNDED).

2. PERSISTENCIA OBLIGATORIA DEL DISCLAIMER:
   - Implementa un layout maestro donde el banner de advertencia legal se encuentra anclado en la parte superior de la vista de forma global, garantizando que el usuario siempre lo visualice independientemente de la pantalla en la que navegue.

3. MANEJO DE ESTADO REACTIVO:
   - Controla la transiciÃ³n fluida entre la pantalla de entrada, el estado de carga y la visualizaciÃ³n de resultados sin parpadeos ni pÃ©rdidas de contexto.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 â€” INTEGRACIÃ“N (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Link2} 
          label="Capa 5" 
          color={C.red} 
          title="IntegraciÃ³n"
          desc="Pipeline robusto con gestiÃ³n de errores conservadora â€” en el dominio legal, siempre se preserva la advertencia de revisiÃ³n profesional." 
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="on_analyze_click() con validaciÃ³n mÃ­nima de 100 chars, diÃ¡logo de truncado y guardado segÃºn store_document_text."
        >
          <PromptBlock label="Prompt 5.1 â€” on_analyze_click()">
{`ActÃºa como Ingeniero de IntegraciÃ³n AsÃ­ncrona en Python y Flet.

Escribe en controller.py el handler asÃ­ncrono para el evento de anÃ¡lisis on_analyze_click(e):

1. VALIDACIÃ“N PREVIA Y GUARDRAILS DE ENTRADA:
   - Comprueba que el texto introducido cuente con al menos 100 caracteres significativos. En caso contrario, muestra un ft.SnackBar informativo: "Por favor, introduce al menos una clÃ¡usula completa (mÃ­nimo 100 caracteres)".
   - Si la longitud excede MAX_TEXT_LENGTH, presenta el diÃ¡logo de advertencia de truncado antes de lanzar la corutina.

2. ORQUESTACIÃ“N NO BLOQUEANTE:
   - Cambia la UI al estado de carga activa (deshabilita el botÃ³n "Analizar" y muestra el indicador de progreso circular).
   - Crea el objeto de dominio LegalDocument mediante create_manual_document(...).
   - Ejecuta asÃ­ncronamente en segundo plano el pipeline orquestador (legal_analysis_pipeline) para mantener la interfaz 100% responsiva.

3. DESPLIEGUE Y REGISTRO:
   - Recibe el LegalAnalysis consolidado y las alertas de verificaciÃ³n de citas.
   - Actualiza reactivamente los componentes de ContractResultsView.
   - Si se identificaron citas no verificadas, despliega un aviso destacado de atenciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="legal_analysis_pipeline() sin lÃ³gica de UI, con log de metadatos (sin el texto del documento)."
        >
          <PromptBlock label="Prompt 5.2 â€” legal_analysis_pipeline()">
{`ActÃºa como Ingeniero de Pipeline y OrquestaciÃ³n de Backend en Python.

Crea en pipeline.py la funciÃ³n pura de orquestaciÃ³n legal_analysis_pipeline(...):

1. FIRMA DE LA FUNCIÃ“N PURA:
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
   - Etapa 1: InvocaciÃ³n con resiliencia y fallback mediante analyze_with_fallback(document, analysis_type, model_name).
   - Etapa 2: Control antialucinaciÃ³n mediante validate_legal_analysis(analysis, document) que contrasta cada cita contra el texto original.
   - Etapa 3: Persistencia en DuckDB mediante store_analysis(conn, validated_analysis, document, store_text=store_text).
   - Etapa 4: AuditorÃ­a de privacidad: registra la operaciÃ³n en el logger de seguridad omitiendo por completo el texto sensible del contrato.

3. RETORNO DESACOPLADO:
   - Devuelve (analysis_final, listado_incidencias_citas, is_llm_used) sin dependencias grÃ¡ficas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="Regla principal: ante cualquier error, conservar siempre la advertencia de consultar a un profesional legal."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.red }}>Principio de diseÃ±o:</strong> En caso de duda o error, nunca suprimir las notas de limitaciÃ³n. Siempre mostrar "Consulta a un profesional del derecho".
          </div>
          <PromptBlock label="Prompt 5.3 â€” LegalError + tabla de decisiones">
{`ActÃºa como Arquitecto de Tolerancia a Fallos en Sistemas Legales CrÃ­ticos.

Crea el mÃ³dulo exceptions.py con la jerarquÃ­a de excepciones y la matriz de contingencia en cascada para "Lex Analyst":

1. TAXONOMÃA DE EXCEPCIONES:
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
   - Fallo de Red/Timeout: Muestra mensaje explicativo sin crash y mantiene la recomendaciÃ³n de acudir al letrado.
   - Fallo de Parseo JSON: Extrae los hallazgos rescatables mediante regex y aÃ±ade aviso de informe preliminar parcial.
   - > 50% de citas no coincidentes: Marca el anÃ¡lisis con nivel de alerta mÃ¡xima por baja fidelidad textual.
   - Error en DuckDB: Permite visualizar y exportar el informe en memoria notificando que no se guardÃ³ en el historial local.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging bÃ¡sico" 
          goal="Dos logs separados: analyses.log para metadatos y security.log para auditorÃ­a de datos procesados (RGPD)."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.amber }}>Â¿Por quÃ© dos logs?</strong> Los anÃ¡lisis legales pueden implicar datos personales. El log de seguridad permite auditar quÃ© datos se procesaron.
          </div>
          <PromptBlock label="Prompt 5.4 â€” legal_logger.py (dos handlers)">
{`ActÃºa como Ingeniero de Seguridad y Cumplimiento Normativo (RGPD) en Python.

Crea el mÃ³dulo legal_logger.py con doble sistema de registro desacoplado para "Lex Analyst":

1. POLÃTICA ESTRICTA ZERO-PII / SECRETO CONTRACTUAL:
   - Queda terminantemente prohibido registrar el texto Ã­ntegro de las clÃ¡usulas, nombres propios de intervinientes o datos bancarios en los archivos de log.

2. ESPECIFICACIÃ“N DE LOS DOS CANALES DE LOG:
   - Canal 1 (analyses.log con RotatingFileHandler 5MB, 3 backups):
     * Registra mÃ©tricas operacionales: timestamp, document_id (UUID), analysis_type, model_name, global_risk_level, num_findings, unverified_quotes_count, latency_seconds.
   
   - Canal 2 (security.log para AuditorÃ­a de Privacidad y RGPD):
     * Registra eventos de tratamiento de datos: timestamp, user_session_id, action ("DOCUMENT_SENT_TO_LLM", "DOCUMENT_STORED_LOCAL_DB", "DB_TEXT_STORAGE_DISABLED"), char_count.

3. FUNCIONES EXPUESTAS:
   - log_analysis_event(...), log_security_audit(...) y log_system_error(...).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py con LEGAL_DISCLAIMER como constante, AVAILABLE_ANALYSIS_TYPES y LEX_STORE_DOCUMENT_TEXT=false por defecto."
        >
          <PromptBlock label="Prompt 5.5 â€” config.py + .env.example">
{`ActÃºa como Ingeniero de ConfiguraciÃ³n y Seguridad de Software en Python.

Crea el archivo config.py utilizando pydantic-settings y la plantilla .env.example para "Lex Analyst":

1. ESPECIFICACIÃ“N DEL MÃ“DULO config.py:
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
    LEX_STORE_DOCUMENT_TEXT: bool = False  # ProtecciÃ³n de secreto comercial por defecto

    LEGAL_DISCLAIMER: str = (
        "AVISO LEGAL PERMANENTE: Lex Analyst es una herramienta de software orientada "
        "al anÃ¡lisis preliminar de textos contractuales con fines de investigaciÃ³n y triaje. "
        "No constituye asesoramiento legal profesional. Consulte siempre a un abogado colegiado."
    )
    AVAILABLE_ANALYSIS_TYPES: list[str] = [
        "Riesgos Contractuales Generales",
        "AuditorÃ­a de Cumplimiento RGPD",
        "ClÃ¡usulas Abusivas y Desequilibrio Contractual",
        "TerminaciÃ³n, RescisiÃ³n y Penalizaciones"
    ]
    AVAILABLE_JURISDICTIONS: list[str] = ["EspaÃ±a (Civil/Mercantil)", "UniÃ³n Europea", "Internacional (Common Law)"]

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
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO (LEX ANALYST)
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
          goal="Tests de verify_quote(), validate_legal_analysis() y parse_legal_analysis() â€” incluyendo el caso de >50% citas no verificadas."
        >
          <PromptBlock label="Prompt 6.1 â€” tests/test_legal_logic.py">
{`ActÃºa como QA Lead y Especialista en Testing Automatizado de Software LegalTech en Python.

Crea la suite de pruebas unitarias en \`tests/test_legal_logic.py\` y sus fixtures en \`tests/conftest.py\`:

1. FIXTURES EN \`conftest.py\`:
   - \`sample_legal_document\`: Contrato ficticio con clÃ¡usulas de confidencialidad, indemnizaciÃ³n y fuero.
   - \`sample_analysis_all_verified\`: Objeto \`LegalAnalysis\` con 3 hallazgos cuyas citas existen al 100% de forma literal.
   - \`sample_analysis_some_unverified\`: Objeto con 1 cita exacta y 2 citas completamente alucinadas/inventadas.
   - \`sample_raw_llm_json\`: String simulado con respuesta vÃ¡lida formateada en JSON.

2. CASOS DE PRUEBA EN \`test_legal_logic.py\`:
   - \`test_verify_quote_exact_and_fuzzy()\`:
     * Valida coincidencia exacta (True).
     * Valida normalizaciÃ³n de comillas tipogrÃ¡ficas (Â« Â» / â€œ â€) contra comillas estÃ¡ndar (' / ") (True).
     * Valida cita ausente o inventada por el modelo (False).
   - \`test_validate_legal_analysis_integrity()\`:
     * Verifica que cuando el 100% de citas existen, \`issues\` estÃ¡ vacÃ­o y ninguna advertencia crÃ­tica se activa.
     * Verifica que si > 50% de las citas son inventadas, se aÃ±ade la alerta prioritaria en \`limitation_notes\`.
   - \`test_parse_legal_analysis_and_risk_escalation()\`:
     * Comprueba que si hay al menos un hallazgo con riesgo "ALTO", \`global_risk_level\` se consolida en "ALTO".
     * Valida que la constante \`LEGAL_DISCLAIMER\` se inyecta siempre de forma inmutable.

3. REGLAS: Prohibido llamar a APIs externas o crear bases de datos en disco durante los tests unitarios.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="Test de integraciÃ³n con 2 citas verificables + 1 cita inventada â€” el sistema debe detectar la inventada."
        >
          <PromptBlock label="Prompt 6.2 â€” tests/test_legal_integration.py">
{`ActÃºa como Ingeniero de IntegraciÃ³n y Testing E2E en Python.

Crea el test de integraciÃ³n en \`tests/test_legal_integration.py\` que valida el flujo completo del pipeline sin consumir crÃ©ditos de API:

1. CONFIGURACIÃ“N DEL ENTORNO DE PRUEBA:
   - Carga una clÃ¡usula real desde \`sample_legal_clauses.json\`.
   - Inicializa una base de datos DuckDB volÃ¡til en memoria (\`conn = duckdb.connect(':memory:')\`) con \`store_document_text = False\`.

2. MOCKING SELECTIVO DEL LLM:
   - Mockea exclusivamente la funciÃ³n \`analyze_legal_text()\` utilizando \`unittest.mock.AsyncMock\`.
   - Devuelve una respuesta simulada con 3 hallazgos:
     * Cita 1: PÃ¡rrafo existente textualmente en la clÃ¡usula.
     * Cita 2: PÃ¡rrafo existente con pequeÃ±as variaciones de espacios/comillas.
     * Cita 3: Cita totalmente inventada ("Las partes acuerdan someterse a la jurisdicciÃ³n de Singapur").

3. ASERCIONES OBLIGATORIAS:
   - Ejecuta \`await legal_analysis_pipeline(...)\`.
   - Aserta que exactamente 2 hallazgos tienen \`quote_verified == True\` y 1 hallazgo tiene \`quote_verified == False\`.
   - Aserta que \`verification_issues\` contiene exactamente la alerta de la cita inventada.
   - Aserta que la auditorÃ­a se persistiÃ³ en DuckDB sin registrar el texto confidencial del contrato.
   - Aserta que \`get_analysis_history(conn)\` devuelve exactamente 1 registro con los metadatos correctos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo de 7 escenarios con contratos reales anonimizados, incluyendo texto en inglÃ©s y prueba sin internet."
        >
          <PromptBlock label="Prompt 6.3 â€” Protocolo de prueba manual">
{`ActÃºa como Auditor de Calidad Funcional y Usabilidad (UAT) en Entornos Legales.

Redacta el protocolo de validaciÃ³n manual exhaustivo para certificar "Lex Analyst v1":

1. MATRIZ DE 7 ESCENARIOS DE PRUEBA CON CONTRATOS REALES ANONIMIZADOS:
   - Escenario 1 (NDA EstÃ¡ndar): Pegar un acuerdo de confidencialidad de 3 pÃ¡ginas y verificar que las citas identificadas se corresponden con los pÃ¡rrafos de definiciÃ³n y plazo.
   - Escenario 2 (ClÃ¡usula AsimÃ©trica de IndemnizaciÃ³n): Pegar una clÃ¡usula de responsabilidad ilimitada; comprobar que el sistema la cataloga como riesgo ALTO.
   - Escenario 3 (Contrato SaaS en InglÃ©s con Fuero en Delaware): Verificar que la app procesa correctamente texto anglosajÃ³n y resalta el fuero extranjero.
   - Escenario 4 (Documento Extenso > 50.000 Caracteres): Comprobar que salta el modal de advertencia de truncado y no congela la interfaz grÃ¡fica.
   - Escenario 5 (DesconexiÃ³n de Red / Modo Offline): Desconectar WiFi/Ethernet; verificar que el banner de contingencia aparece de inmediato sin cierres forzados.
   - Escenario 6 (AuditorÃ­a de Pantallas): Navegar por las 3 pestaÃ±as y comprobar que la advertencia legal permanece visible y anclada en todas ellas.
   - Escenario 7 (ExportaciÃ³n de Informe): Pulsar "Exportar Markdown" y validar que el archivo resultante incluye la fecha, los badges de citas y el texto Ã­ntegro del descargo legal.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Ejecutable con advertencia visible en la pantalla de inicio y sin el .env incluido (contiene la API key)."
        >
          <div className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}>
            <strong style={{ color: C.amber }}>Advertencia de privacidad para el usuario:</strong> "Los textos que introduces se envÃ­an al proveedor de IA. No introduzcas documentos con datos personales de terceros sin su consentimiento."
          </div>
          <PromptBlock label="Prompt 6.4 â€” Empaquetado">
{`ActÃºa como Ingeniero de DistribuciÃ³n y Empaquetado de Software de Escritorio en Python.

Genera las especificaciones de compilaciÃ³n y empaquetado para generar el ejecutable autÃ³nomo \`LexAnalyst.exe\`:

1. ARCHIVO DE CONFIGURACIÃ“N \`lex_analyst.spec\`:
   - Configura PyInstaller con:
     * \`entry_point = "main.py"\`
     * \`datas = [('data_legal/raw/cuad_clauses.json', 'data_legal/raw'), ('assets', 'assets')]\`
     * ExclusiÃ³n estricta: Bloquear la inclusiÃ³n de archivos \`.env\`, \`*.duckdb\` o logs locales en el empaquetado para prevenir fugas de credenciales.
     * Modo ventana (\`console=False\` en Windows).

2. GUÃA DE INSTALACIÃ“N Y DESPLIEGUE EN 3 PASOS:
   - Paso 1: Descomprimir el paquete \`LexAnalyst_v1.0_Win64.zip\`.
   - Paso 2: Crear el archivo \`.env\` junto al ejecutable introduciendo \`LEX_LLM_API_KEY=tu_clave_aqui\`.
   - Paso 3: Ejecutar \`LexAnalyst.exe\` con doble clic directo sin necesidad de instalar Python ni dependencias.

3. ADVERTENCIA DE PRIVACIDAD EN EL README DE DISTRIBUCIÃ“N:
   - Incluye la advertencia obligatoria de transferencia de datos a proveedores de IA de terceros para contratos con informaciÃ³n personal o confidencial.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="VerificaciÃ³n en VM sin Python â€” la advertencia legal debe aparecer prominente en la primera pantalla."
        >
          <PromptBlock label="Prompt 6.5 â€” Protocolo mÃ¡quina limpia">
{`ActÃºa como Ingeniero de QA y CertificaciÃ³n de Entornos Limpios.

DiseÃ±a el protocolo de verificaciÃ³n del binario \`LexAnalyst.exe\` en una mÃ¡quina virtual Windows 11 reciÃ©n instalada (sin Python, Git ni compiladores de C++):

1. CHECKLIST DE CONECTIVIDAD Y EJECUCIÃ“N LIMPIA:
   - VerificaciÃ³n de arranque en frÃ­o en menos de 3.5 segundos.
   - ConfirmaciÃ³n visual de que la advertencia legal de responsabilidad se renderiza de forma clara y nÃ­tida en el tercio superior.
   - Apertura de la biblioteca CUAD de prueba: verificar que las 10 clÃ¡usulas precargadas se visualizan y rellenan el Ã¡rea de texto con un clic.
   - EjecuciÃ³n de anÃ¡lisis en vivo con API Key configurada en el archivo \`.env\` externo.
   - ValidaciÃ³n de la creaciÃ³n automÃ¡tica de las carpetas de datos locales en \`%USERPROFILE%\\.lex_analyst\\logs\` y comprobaciÃ³n de que no se almacena texto confidencial.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N Y PUBLICACIÃ“N (LEX ANALYST)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={RefreshCw} 
          label="Fase 7" 
          color="rgba(17,17,17,0.4)" 
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar la v2 con conciencia del riesgo legal adicional que introduce cada nueva funcionalidad." 
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog con columna 'Riesgo legal adicional' â€” anÃ¡lisis batch, soporte PDF, comparativa de modelos...">
          <PromptBlock label="Prompt 7.A â€” PlanificaciÃ³n v2 (tabla con riesgo legal)">
{`ActÃºa como Product Owner y Estratega en LegalTech.

Elabora el backlog tÃ©cnico y funcional estructurado para la versiÃ³n 2.0 de "Lex Analyst":

1. MATRIZ DE MEJORAS CON EVALUACIÃ“N DE RIESGO JURÃDICO ADICIONAL:
   | ID | Funcionalidad Propuesta | Capa Afectada | Complejidad | Riesgo Legal Adicional | Medida de MitigaciÃ³n Requerida |
   |:---|:------------------------|:--------------|:------------|:-----------------------|:-------------------------------|
   | F1 | Ingesta nativa de archivos PDF/Word (pdfminer / python-docx) | Capa 2 (Datos) | Media | Riesgo de pÃ©rdida de texto por mal OCR en PDFs escaneados | Advertencia expresa: "Documentos escaneados pueden omitir clÃ¡usulas por calidad de imagen" |
   | F2 | AuditorÃ­a por lotes (Batch processing de 50+ contratos) | Capa 5 (IntegraciÃ³n) | Alta | Falta de revisiÃ³n individualizada de las citas detectadas | Reporte consolidado con indicador de fiabilidad (% citas verificadas) |
   | F3 | Benchmarking Multi-LLM en paralelo (Claude vs GPT vs DeepSeek) | Capa 3 (LÃ³gica) | Media | DictÃ¡menes divergentes entre modelos que confunden al usuario | Matriz comparativa destacando coincidencias unÃ¡nimes y discrepancias |
   | F4 | MÃ³dulo Especializado de AuditorÃ­a RGPD con cita de ArtÃ­culos | Capas 2, 3 y 4 | Media | Falsa apariencia de certificaciÃ³n oficial ante la AEPD | Disclaimer reforzado: "No sustituye la auditorÃ­a obligatoria de un DPO colegiado" |

2. PRIORIZACIÃ“N Y CRITERIO DE EXPANSIÃ“N:
   - Define las 2 funcionalidades prioritarias para el sprint de la v2.0 justificando el balance entre valor prÃ¡ctico y seguridad jurÃ­dica.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Ficha de publicaciÃ³n con el disclaimer legal completo visible en la propia ficha del foro."
        >
          <PromptBlock label="Prompt 7.B â€” Ficha para el Foro (con disclaimer)">
{`ActÃºa como Desarrollador LegalTech y Divulgador en la Comunidad Horizon.

Redacta la ficha de presentaciÃ³n de "Lex Analyst" para publicar en el Foro de la Comunidad Horizon (/comunidad/aplicaciones):

1. ESTRUCTURA DE LA PUBLICACIÃ“N:
   - **TÃ­tulo:** \`[PROYECTO] Lex Analyst v1.0 â€” EscÃ¡ner Contractual Asistido por IA con VerificaciÃ³n Determinista de Citas\`
   - **Etiquetas:** \`#LegalTech\` \`#Flet\` \`#Python\` \`#Pydantic\` \`#LegalBench\` \`#ZeroPII\`
   - **Resumen del Proyecto (150 palabras):** AplicaciÃ³n de escritorio diseÃ±ada para PYMEs y profesionales que necesitan una primera lectura rigurosa de contratos mercantiles antes de trasladarlos al abogado.
   - **InnovaciÃ³n TÃ©cnica Destacada:** Motor determinista de verificaciÃ³n de citas contra el texto fuente para erradicar clÃ¡usulas alucinadas o inventadas.
   - **Descargo de Responsabilidad Visible:** InclusiÃ³n Ã­ntegra del aviso legal de la aplicaciÃ³n.
   - **Pregunta para el Debate Comunitario:** *"Â¿QuÃ© umbral de similitud en la verificaciÃ³n de citas considerÃ¡is adecuado para equilibrar pequeÃ±as correcciones ortogrÃ¡ficas frente a invenciones del modelo en jerga jurÃ­dica?"*`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Result box â”€â”€â”€ */}
        <div className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "white", border: "1px solid rgba(59,111,212,0.2)" }}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: "rgba(59,111,212,0.10)" }}>
            <Check size={22} style={{ color: C.accent }} />
          </div>
          <h2 className="font-display text-2xl mb-3" style={{ color: C.dark }}>Resultado final</h2>
          <p className="text-base leading-relaxed mb-2 max-w-[520px] mx-auto"
            style={{ color: "rgba(17,17,17,0.6)" }}>
            Un ejecutable de <strong style={{ color: C.dark }}>Lex Analyst</strong> que analiza texto legal con el modelo lÃ­der en LegalBench, detecta riesgos con citas verificadas en el documento original y exporta un informe con advertencias legales integradas.
          </p>
          <p className="text-sm mb-6 max-w-[480px] mx-auto"
            style={{ color: "rgba(17,17,17,0.40)" }}>
            No reemplaza al abogado â€” le da a cualquier persona una primera pasada rigurosa antes de la revisiÃ³n profesional.
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

        {/* â”€â”€â”€ Version extensions â”€â”€â”€ */}
        <VersionExtensions versions={VERSIONS} />

        <div className="h-16" />
      </div>
    </div>
  );
}

