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

import {
  C, CopyBtn, PromptBlock, Step, PhaseHeader, BackLink,
  HumanValidationWarning, VersionExtensions,
} from "./shared.jsx";

// â”€â”€â”€ Tools table data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "InvestigaciÃ³n", herramienta: "Laboratorio Contabilidad Â· BizFinBench Â· AuditBench", motivo: "Confirmar quÃ© modelos lideran razonamiento contable antes de elegir." },
  { capa: "1", subcapa: "1.1â€“1.6", herramienta: "Documento de definiciÃ³n", motivo: "Precisar tipo de conciliaciÃ³n y usuario final." },
  { capa: "2", subcapa: "2.1", herramienta: "csv (stdlib) Â· pandas", motivo: "Leer extractos bancarios CSV con distintos formatos de fecha e importe." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas estrictos para transacciones bancarias y asientos ERP." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators Â· Decimal", motivo: "Normalizar importes con precisiÃ³n contable (no float)." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de conciliaciones y consultas SQL para auditorÃ­a." },
  { capa: "2", subcapa: "2.5", herramienta: "Python dict / JSON", motivo: "Dataset de 20 transacciones con 2 descuadres intencionales." },
  { capa: "3", subcapa: "3.1", herramienta: "data_accounting/rankings/", motivo: "Seleccionar modelo con mejor score en BizFinBench_ERP." },
  { capa: "3", subcapa: "3.2", herramienta: "Python puro (determinista)", motivo: "El matching es lÃ³gica de negocio, no IA: tolerancia Â±3 dÃ­as, importe exacto Â±0,01." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx Â· openai SDK [VERIFICAR DOCS]", motivo: "Llamada al LLM para explicar descuadres no conciliados." },
  { capa: "3", subcapa: "3.4", herramienta: "json.loads Â· Pydantic", motivo: "Estructurar las causas devueltas por el LLM." },
  { capa: "3", subcapa: "3.5", herramienta: "Pydantic validators", motivo: "Verificar que las causas son genÃ©ricas, sin datos inventados." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Si falla el LLM, marcar para revisiÃ³n manual sin bloquear." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir las 3 pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2â€“4.5", herramienta: "Flet", motivo: "Carga de archivos y tablas grandes en pocas lÃ­neas." },
  { capa: "5", subcapa: "5.1â€“5.5", herramienta: "Flet Â· DuckDB Â· python-dotenv", motivo: "Conectar capas y gestionar configuraciÃ³n." },
  { capa: "6", subcapa: "6.1â€“6.2", herramienta: "Pytest", motivo: "Tests del algoritmo de matching y parseo de CSV." },
  { capa: "6", subcapa: "6.3", herramienta: "Extractos reales del usuario", motivo: "ValidaciÃ³n con datos reales antes de empaquetar." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "IteraciÃ³n", herramienta: "Foro Horizon", motivo: "Publicar y recoger feedback de contadores y auditores." },
];

// â”€â”€â”€ Version extensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VERSIONS = [
  {
    tag: "v2 Â· Impuestos",
    area: "Contabilidad fiscal",
    title: "Fisco Cero â€” Asistente de cierre fiscal",
    desc: "Misma arquitectura de Balance Inteligente aplicada al anÃ¡lisis de declaraciones de IVA e IS: detecta discrepancias entre los libros y las declaraciones presentadas, y explica cada diferencia.",
    badgeBg: "rgba(239,68,68,0.10)", badgeColor: "#DC2626",
    changes: [
      "Capa 2: nuevos esquemas para declaraciones trimestrales (Modelo 303, Modelo 200)",
      "Capa 3: el LLM compara bases imponibles declaradas vs. calculadas desde los libros",
      "Capa 3: el prompt aÃ±ade instrucciÃ³n de citar el artÃ­culo de la ley del IVA relevante",
      "Capa 4: tabla de perÃ­odos fiscales en lugar de rango de fechas libre",
      "Advertencia: los hallazgos no son asesoramiento fiscal; revisar con asesor tributario",
    ],
  },
  {
    tag: "v2 Â· Activos",
    area: "Contabilidad de activos",
    title: "Atlas Activos â€” Control de amortizaciones",
    desc: "Importa el registro de activos fijos y verifica que las amortizaciones contabilizadas son coherentes con el mÃ©todo y los aÃ±os de vida Ãºtil declarados, seÃ±alando desviaciones con causa explicada.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: "#059669",
    changes: [
      "Capa 2: esquema para FixedAsset (fecha alta, coste, mÃ©todo amortizaciÃ³n, vida Ãºtil)",
      "Capa 3: algoritmo determinista calcula la amortizaciÃ³n teÃ³rica y la compara con la real",
      "Capa 3: el LLM explica causas de desviaciÃ³n (cambio de mÃ©todo, baja parcial, etc.)",
      "Capa 4: grÃ¡fico de amortizaciÃ³n acumulada por activo (Flet Chart si disponible)",
      "Capa 6: dataset de ejemplo con 10 activos y 2 desviaciones intencionales",
    ],
  },
  {
    tag: "v2 Â· Intercompany",
    area: "Grupos empresariales",
    title: "Nexo Grupo â€” ConciliaciÃ³n intercompany",
    desc: "Extiende Balance Inteligente a grupos de empresas: cruza las transacciones intercompany declaradas por cada entidad, detecta asimetrÃ­as y genera el informe de eliminaciones para la consolidaciÃ³n.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el usuario define hasta N entidades del grupo con sus extractos CSV",
      "Capa 2: esquema MultiEntity con mapa de relaciones entre entidades",
      "Capa 3: el algoritmo cruza transacciones bidireccionales (Aâ†’B y Bâ†’A deben coincidir)",
      "Capa 3: el LLM explica asimetrÃ­as (desfases de fecha, diferencias de tipo de cambio)",
      "Capa 4: vista consolidada del grupo con semÃ¡foro por entidad",
    ],
  },
];

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function RutaContabilidad() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-10 sm:py-14">

        <BackLink />

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-5"
            style={{ background: "rgba(5,150,105,0.10)", color: C.emerald }}>
            Contabilidad & ERP Â· Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Balance Inteligente
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que importa extractos bancarios y registros ERP, los concilia automÃ¡ticamente detectando descuadres, y genera un informe de auditorÃ­a con las diferencias explicadas por IA.
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

        {/* â”€â”€ Human validation warning â”€â”€ */}
        <HumanValidationWarning />

        {/* Map overview */}
        <div className="rounded-2xl p-6 mb-8 border" style={{ background: "white", borderColor: "rgba(17,17,17,0.08)" }}>
          <h2 className="font-display text-lg mb-4" style={{ color: C.dark }}>Mapa de la ruta</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Fase 0", desc: "InvestigaciÃ³n â€” benchmarks contables", color: "#7C3AED" },
              { label: "Capa 1", desc: "DefiniciÃ³n del problema", color: C.accent },
              { label: "Capa 2", desc: "Datos â€” CSV, Pydantic, DuckDB", color: C.emerald },
              { label: "Capa 3", desc: "LÃ³gica / IA â€” matching + LLM", color: C.amber },
              { label: "Capa 4", desc: "Interfaz de escritorio (Flet)", color: "#0891B2" },
              { label: "Capa 5", desc: "IntegraciÃ³n y gestiÃ³n de errores", color: C.red },
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
          desc="Confirmar quÃ© benchmarks y quÃ© modelos respaldan la idea de Balance Inteligente antes de escribir una sola lÃ­nea de cÃ³digo." />

        <Step num="0.A" title="Benchmarks contables clave"
          goal="Identificar quÃ© benchmarks del laboratorio evalÃºan tareas de conciliaciÃ³n y ERP, y quÃ© modelo lidera esas tareas.">
          <PromptBlock label="Prompt 0.A â€” Benchmarks contables">{`ActÃºa como Investigador Principal de Benchmarks de Inteligencia Artificial especializado en Finanzas y Contabilidad Corporativa.

Tengo como objetivo seleccionar el modelo fundacional mÃ¡s preciso para una aplicaciÃ³n de conciliaciÃ³n bancaria y auditorÃ­a contable llamada "Balance Inteligente".

Analiza los benchmarks de dominio contable (BizFinBench, AuditBench, FinBen_Accounting) y responde de forma rigurosa y tÃ©cnica a los siguientes puntos:

1. METODOLOGÃA DE EVALUACIÃ“N:
   - Â¿QuÃ© mÃ©tricas especÃ­ficas evalÃºan BizFinBench y AuditBench en tareas de:
     a) CasaciÃ³n de asientos contables (Journal entry matching).
     b) DetecciÃ³n de descuadres y anomalÃ­as contables.
     c) 3-Way Matching (Factura vs. AlbarÃ¡n vs. Pedido de compra).

2. RANKING DE RENDIMIENTO DE MODELOS:
   - BasÃ¡ndote en datos empÃ­ricos de BizFinBench_ERP y AuditBench, Â¿quÃ© modelos actuales (Claude 3.5/3.7, GPT-4o, DeepSeek-R1, Gemini 1.5/2.0 Pro) obtienen la mayor tasa de acierto y menor tasa de alucinaciÃ³n en razonamiento deductivo contable?

3. POLÃTICA DE SELECCIÃ“N:
   - Define el criterio tÃ©cnico para justificar si la explicaciÃ³n de un descuadre debe delegarse a un LLM grande (Cloud API) o si es viable mediante un modelo SLM local (Small Language Model tipo Llama-3.1-8B-Instruct o Mistral-7B).

REGLAS ESTRICTAS:
- No inventes nombres de mÃ©tricas ni scores ficticios.
- Si citas capacidades de un modelo, especifica si destaca en razonamiento estructurado (JSON mode) o en comprensiÃ³n semÃ¡ntica de conceptos bancarios.`}</PromptBlock>
        </Step>
        <Step num="0.B" title="Viabilidad tÃ©cnica de la conciliaciÃ³n automÃ¡tica"
          goal="Confirmar si es tÃ©cnicamente posible conciliar CSV bancario con CSV ERP, y quÃ© papel juega el LLM.">
          <PromptBlock label="Prompt 0.B â€” Viabilidad tÃ©cnica">{`ActÃºa como Arquitecto de Software Financiero y Especialista en Sistemas ERP (SAP S/4HANA, Oracle NetSuite, Sage, A3).

Antes de iniciar la codificaciÃ³n de "Balance Inteligente", necesito una memoria de viabilidad tÃ©cnica sobre los estÃ¡ndares de interoperabilidad bancaria y contable:

1. ESPECIFICACIÃ“N DE FORMATOS DE ENTRADA:
   - Detalla la estructura de campos requerida para procesar extractos bancarios en:
     a) Cuaderno bancario espaÃ±ol Norma 43 (CSB 43 / AEB 43).
     b) EstÃ¡ndar internacional ISO 20022 (CAMT.053 XML).
     c) Extracto bancario tabular genÃ©rico (CSV).
   - Define quÃ© columnas mÃ­nimas del Libro Mayor (Cuenta 572 - TesorerÃ­a) son indispensables en el archivo exportado desde el ERP (Fecha apunte, Fecha valor, Documento, Concepto, Debe, Haber, Saldo, Referencia).

2. ARQUITECTURA DE DESACOPLE (Determinismo vs. IA):
   - Justifica por quÃ© el algoritmo de casaciÃ³n (Matching) DEBE ser 100% determinista en Python puro, y por quÃ© el LLM debe utilizarse ÃšNICAMENTE en la capa posterior de explicaciÃ³n y diagnÃ³stico de discrepancias.

3. TAXONOMÃA DE DESCUADRES BANCARIOS:
   - Clasifica los 5 motivos mÃ¡s recurrentes de descuadre en auditorÃ­a contable (Decalaje fecha valor, comisiones bancarias no contabilizadas, cobros de remesas agrupadas, retenciones fiscales imprevistas y errores tipogrÃ¡ficos de dÃ­gito invertido).`}</PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 â€” DEFINICIÃ“N DEL PROBLEMA (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={BookOpen} 
          label="Capa 1" 
          color={C.accent} 
          title="DefiniciÃ³n del problema"
          desc="Seis preguntas que definen con precisiÃ³n tÃ©cnica y contable quÃ© construyes, para quiÃ©n y bajo quÃ© criterios de Ã©xito estarÃ¡ terminado el software." 
        />

        {[
          [
            "1.1", 
            "Â¿QuiÃ©n usa esta app?", 
            "Definir si el usuario es contable de pyme, auditor externo o controller financiero.",
            `ActÃºa como Analista de Producto y Especialista en Flujos de Trabajo Contables.

Define la ficha formal del perfil de usuario (User Persona) para "Balance Inteligente", una aplicaciÃ³n de escritorio que automatiza la conciliaciÃ³n entre extractos bancarios y el libro mayor con diagnÃ³stico de descuadres por IA.

Genera una ficha tÃ©cnica con los siguientes apartados:
1. IDENTIFICACIÃ“N Y ROL:
   - Nombre ficticio y puesto (ej. Responsable de Contabilidad / Controller Financiero en PYME o AsesorÃ­a Externa).
   - Volumen operativo: 500 a 3.000 transacciones mensuales distribuidas en 3 cuentas bancarias principales.
2. FLUJO DE TRABAJO ACTUAL (Pain Points):
   - Proceso manual actual: Cotejo fila a fila en Microsoft Excel con fÃ³rmulas BUSCARV / XLOOKUP y coloreado manual de celdas.
   - Tiempo invertido: Entre 3 y 5 horas por cada cierre mensual y bancario.
   - Puntos crÃ­ticos de frustraciÃ³n: Descuadres por comisiones bancarias no registradas, transacciones agrupadas en remesas y errores tipogrÃ¡ficos de dÃ­gito invertido.
3. ENTORNO TECNOLÃ“GICO Y FORMATOS REALES:
   - Formato bancario disponible: Extractos en formato CSV delimitado por punto y coma (banca espaÃ±ola / internacional) y cuadernos Norma 43.
   - Formato ERP: ExportaciÃ³n del Libro Mayor (Cuenta 572 - TesorerÃ­a) en CSV / Excel desde ERPs como SAP, Sage 50/200, A3 o Contasol.
   - Nivel tÃ©cnico: Usuario avanzado en hojas de cÃ¡lculo y conceptos contables, pero sin conocimientos de programaciÃ³n ni consola de comandos (requiere ejecutable grÃ¡fico .exe).`
          ],
          [
            "1.2", 
            "Â¿QuÃ© problema concreto resuelve?", 
            "Una frase precisa del problema contable que Balance Inteligente resuelve.",
            `ActÃºa como Especialista en Propuesta de Valor y Arquitectura de Software Financiero.

BasÃ¡ndote en el perfil del contable de PYME y asesorÃ­as, escribe UNA SOLA FRASE MAESTRA que defina el problema nuclear que Balance Inteligente resuelve.

Sigue estrictamente la siguiente estructura formal:
"[ROL CONTABLE] invierte [TIEMPO EN HORAS] mensuales en conciliar manualmente [VOLUMEN] transacciones bancarias con su ERP debido a [DISCREPANCIAS EN FECHAS, REDONDEOS Y FORMATOS HETEROGÃ‰NEOS], lo que provoca [RETRASOS EN EL CIERRE, RIESGO FISCAL Y COSTE EN HORAS IMPRODUCTIVAS]."

Genera:
1. TRES VARIANTES con matices (Enfoque en Ahorro de Tiempo, Enfoque en PrecisiÃ³n Contable y Enfoque en AuditorÃ­a).
2. JustificaciÃ³n tÃ©cnica de la variante ganadora.
3. DeclaraciÃ³n de Alcance Honesto:
   - Â¿QuÃ© parte del proceso resuelve la app al 100% de forma autÃ³noma? (El matching determinista y la detecciÃ³n de diferencias).
   - Â¿QuÃ© parte del proceso sigue requiriendo juicio humano? (La validaciÃ³n final de asientos de ajuste y la regularizaciÃ³n en el ERP).`
          ],
          [
            "1.3", 
            "Â¿QuÃ© datos entran?", 
            "Listar exactamente quÃ© archivos y parÃ¡metros necesita la app.",
            `ActÃºa como Ingeniero de Datos y DiseÃ±ador de Contratos de Entrada para Software Financiero.

Define la especificaciÃ³n exhaustiva de todas las entradas (Inputs) requeridas por Balance Inteligente para ejecutar la conciliaciÃ³n:

1. FICHERO A â€” EXTRACTO BANCARIO:
   - Formatos admitidos: CSV (delimitado por , ; \\t) y Norma 43 (CSB 43).
   - Columnas obligatorias: Fecha de operaciÃ³n, Fecha valor, Concepto/DescripciÃ³n, Importe (con signo o columna Debe/Haber) y Saldo resultante.
   - Reglas de autodetecciÃ³n: DetecciÃ³n automÃ¡tica de codificaciÃ³n (UTF-8, UTF-8-BOM, Latin-1) y separador decimal (coma europea vs. punto anglosajÃ³n).

2. FICHERO B â€” LIBRO MAYOR ERP (Cuentas 572):
   - Formato admitido: CSV o JSON exportado del software contable.
   - Columnas requeridas: Fecha de apunte, NÃºmero de asiento/documento, CÃ³digo de subcuenta, Concepto, Importe Debe, Importe Haber y Saldo.

3. PARÃMETROS DE CONFIGURACIÃ“N OPERATIVA:
   - Rango temporal: Fecha inicial y Fecha final del perÃ­odo contable.
   - Tolerancia de fechas: Margen configurable de decalaje bancario (por defecto: Â±3 dÃ­as hÃ¡biles).
   - Tolerancia de importes: Margen para diferencias de redondeo o microcomisiones (por defecto: Â±0.00 â‚¬ o Â±0.05 â‚¬).`
          ],
          [
            "1.4", 
            "Â¿QuÃ© sale?", 
            "Definir los outputs: tabla de matches, lista de descuadres, informe exportable.",
            `ActÃºa como DiseÃ±ador de Datos y Especialista en Reporting de AuditorÃ­a.

Define los contratos de salida (Outputs) que producirÃ¡ Balance Inteligente tras procesar una sesiÃ³n de conciliaciÃ³n:

1. TABLA INTERACTIVA DE PARTIDAS CONCILIADAS (Matched Records):
   - Muestra las parejas confirmadas: [ID Banco, Fecha Banco, Concepto Banco, Importe] <===> [ID ERP, Asiento ERP, Fecha ERP, Concepto ERP, Importe].
   - Tipo de coincidencia clasificada: EXACT_MATCH (1.0), DATE_TOLERANCE (0.85), FUZZY_DESCRIPTION (0.70).

2. PANEL DE DESCUADRES Y DISCREPANCIAS (Unmatched Records):
   - Lista A: Movimientos bancarios sin asiento ERP (ej. comisiones no registradas o cargos imprevistos).
   - Lista B: Asientos ERP sin movimiento bancario (ej. cheques emitidos no cobrados o provisiones pendientes).
   - DiagnÃ³stico IA: 3 hipÃ³tesis contables plausibles y breves sobre la causa del descuadre, con badge de verificaciÃ³n.

3. RESUMEN EJECUTIVO Y MÃ‰TRICAS GLOBALES:
   - Cobertura de conciliaciÃ³n (% Casado sobre el total).
   - Sumatorio Total Debe vs. Haber vs. Movimientos Bancarios.
   - Descuadre Neto Total (â‚¬).

4. INFORME AUDITABLE EXPORTABLE (Markdown y PDF):
   - Documento formal descargable con marca de tiempo UTC, parÃ¡metros utilizados, tablas de descuadres y hash SHA-256 de integridad.`
          ],
          [
            "1.5", 
            "Criterios de Ã©xito", 
            "MÃ©tricas verificables para saber cuÃ¡ndo estÃ¡ terminado y funciona.",
            `ActÃºa como QA Lead y Auditor TÃ©cnico de Software Contable.

Define los Criterios de AceptaciÃ³n Cuantitativos (DoD - Definition of Done) para certificar que Balance Inteligente v1 funciona correctamente y estÃ¡ lista para entrega:

Genera entre 6 y 8 criterios formulados estrictamente bajo la estructura:
"La aplicaciÃ³n se considera correcta y lista para producciÃ³n cuando [CONDICIÃ“N VERIFICABLE Y MEDIBLE]."

Incluye obligatoriamente:
1. PRECISIÃ“N DEL MATCHING: "El algoritmo determinista empareja el 100% de las transacciones del dataset sintÃ©tico oficial que comparten importe exacto y fecha dentro del margen."
2. RESILIENCIA DE INGESTA: "La aplicaciÃ³n procesa sin fallos ni bloqueos archivos CSV con formato de nÃºmero europeo (1.234,56 â‚¬) y anglosajÃ³n (1,234.56 $), detectando automÃ¡ticamente el delimitador."
3. RENDIMIENTO TEMPORAL: "El procesamiento y cuadre de 2.000 lÃ­neas contables se completa en menos de 2.5 segundos en local."
4. ROBUSTEZ ANTE DESCONEXIÃ“N: "Si la mÃ¡quina no tiene acceso a internet o la API de IA no responde, la app completa la conciliaciÃ³n y muestra las hipÃ³tesis heurÃ­sticas locales sin emitir errores no controlados."
5. EXPORTABILIDAD: "El informe generado en Markdown y PDF se abre y renderiza correctamente en cualquier visor estÃ¡ndar, incluyendo el resumen numÃ©rico y el descargo legal."`
          ],
          [
            "1.6", 
            "LÃ­mites explÃ­citos de la v1", 
            "Decidir quÃ© formatos y funcionalidades NO incluye la v1.",
            `ActÃºa como Product Owner Senior y Especialista en GestiÃ³n de Riesgo de Software.

Define la DeclaraciÃ³n Formal de LÃ­mites y Exclusiones para la versiÃ³n 1.0 de Balance Inteligente con el objetivo de acotar el alcance y garantizar una entrega robusta:

1. FORMATOS Y CONECTORES EXCLUIDOS DE LA V1:
   - No soporte para conexiÃ³n directa vÃ­a API bancaria PSD2 / Open Banking (requiere carga manual de fichero CSV / Norma 43).
   - No integraciÃ³n directa por API a bases de datos de ERPs (SAP RFC, Oracle WebServices) para evitar dependencias de credenciales corporativas complejas.
   - No procesamiento de documentos PDF escaneados sin digitalizar previamente.

2. FUNCIONALIDADES POSTPUESTAS PARA V2:
   - No generaciÃ³n ni inyecciÃ³n automÃ¡tica de asientos correctivos en el libro diario del ERP sin supervisiÃ³n.
   - No gestiÃ³n de conciliaciÃ³n multimoneda con tipos de cambio fluctuantes en tiempo real.
   - No conciliaciÃ³n compleja de remesas 1 a N (agrupaciÃ³n de N facturas en un Ãºnico pago bancario).

3. DECLARACIÃ“N DE EXENCIÃ“N DE RESPONSABILIDAD (Legal Disclaimer):
   - Redacta el texto legal formal que aparecerÃ¡ en la pantalla de inicio y en los informes exportados, advirtiendo que la aplicaciÃ³n es una herramienta de asistencia contable que no sustituye la obligaciÃ³n legal de auditorÃ­a y supervisiÃ³n del profesional financiero.`
          ]
        ].map(([num, title, goal, prompt]) => (
          <Step key={num} num={num} title={title} goal={goal}>
            <PromptBlock label={`Prompt ${num}`}>{prompt}</PromptBlock>
          </Step>
        ))}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 â€” DATOS (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Layers} 
          label="Capa 2" 
          color={C.emerald} 
          title="Datos"
          desc="Lectura de archivos, modelos de datos, validaciÃ³n de importes y almacenamiento histÃ³rico." 
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="Lectura de CSV del extracto bancario y del libro mayor con detecciÃ³n automÃ¡tica de columnas."
        >
          <PromptBlock label="Prompt 2.1 â€” Lectura de archivos">
{`ActÃºa como Ingeniero de Datos Senior en Python especializado en sistemas financieros.

Escribe un mÃ³dulo robusto llamado \`parsers.py\` para la lectura e ingesta de extractos bancarios y libros mayores contables en formato tabular:

1. ESPECIFICACIÃ“N DE FUNCIONES:
   - \`read_bank_statement(file_path: Path) -> list[dict]\`:
     * Utiliza \`csv.Sniffer\` para detectar automÃ¡ticamente el delimitador del archivo (',', ';', '\\t', '|').
     * Soporta mÃºltiples codificaciones sin lanzar excepciones de decodificaciÃ³n ('utf-8', 'utf-8-sig' con BOM de Excel, 'latin-1' / 'cp1252').
     * Mapea dinÃ¡micamente cabeceras heterogÃ©neas mediante alias:
       - Fecha: ['fecha', 'f. operacion', 'date', 'booking_date'] -> \`transaction_date\`
       - Fecha Valor: ['fecha valor', 'f. valor', 'value_date'] -> \`value_date\`
       - Concepto: ['concepto', 'descripcion', 'detalle', 'narrative'] -> \`description\`
       - Importe: ['importe', 'monto', 'cantidad', 'amount'] -> \`amount\`
       - Saldo: ['saldo', 'balance', 'saldo resultante'] -> \`balance\`
     * Limpia espacios redundantes y caracteres de control en las cadenas de texto.

   - \`read_erp_ledger(file_path: Path) -> list[dict]\`:
     * Soporta exportaciones estÃ¡ndar del Libro Mayor (Cuenta 572) desde SAP, Sage, A3 o Contasol.
     * Identifica automÃ¡ticamente si el archivo contiene columnas de 'Debe' y 'Haber' separadas o una columna Ãºnica de 'Importe' con signo.

2. GESTIÃ“N DE ERRORES:
   - Define la excepciÃ³n \`DataIngestionError(Exception)\` que incluye: \`file_path\`, \`row_number\`, \`raw_content\` y \`missing_columns\`.
   - Si el archivo estÃ¡ vacÃ­o o carece de cabeceras reconocibles, lanza un error explicativo que informe al usuario del formato esperado.

3. REQUISITOS TÃ‰CNICOS:
   - Usa \`pathlib.Path\`, \`csv\` de la librerÃ­a estÃ¡ndar o \`pandas\`.
   - Prohibido utilizar rutas hardcodeadas en el cÃ³digo.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="Modelos para transacciones bancarias, asientos ERP y resultados de conciliaciÃ³n."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.emerald }}>Modelos clave:</strong> BankTransaction Â· ERPEntry Â· ReconciliationMatch Â· ReconciliationResult
          </div>
          <PromptBlock label="Prompt 2.2 â€” Esquema Pydantic">
{`ActÃºa como Arquitecto de Software Python y Especialista en Modelado Financiero.

Crea el archivo \`schemas.py\` con los modelos de dominio para "Balance Inteligente" utilizando Pydantic v2 con tipado estricto y precisiÃ³n contable:

1. ESPECIFICACIÃ“N DE MODELOS DE DOMINIO:
   \`\`\`python
   from pydantic import BaseModel, Field, field_validator
   from typing import Literal, Optional
   from datetime import date, datetime
   from decimal import Decimal
   from uuid import UUID, uuid4

   class BankTransaction(BaseModel):
       id: UUID = Field(default_factory=uuid4)
       transaction_date: date
       value_date: Optional[date] = None
       description: str = Field(..., min_length=2, max_length=500)
       amount: Decimal = Field(..., max_digits=15, decimal_places=2, description="Positivo=Cobro, Negativo=Pago")
       reference: Optional[str] = None
       balance_after: Optional[Decimal] = None

   class ERPEntry(BaseModel):
       id: UUID = Field(default_factory=uuid4)
       posting_date: date
       account_code: str = Field(..., pattern=r"^[0-9]{3,10}$", description="CÃ³digo de cuenta contable PGC")
       description: str = Field(..., min_length=2)
       debit: Decimal = Field(default=Decimal("0.00"), decimal_places=2)
       credit: Decimal = Field(default=Decimal("0.00"), decimal_places=2)
       document_number: Optional[str] = None
       cost_center: Optional[str] = None

       @property
       def net_amount(self) -> Decimal:
           return self.debit - self.credit

   class ReconciliationMatch(BaseModel):
       match_id: UUID = Field(default_factory=uuid4)
       bank_transaction: BankTransaction
       erp_entry: ERPEntry
       match_type: Literal["EXACT", "DATE_TOLERANCE", "DESCRIPTION_FUZZY"]
       date_difference_days: int
       amount_difference: Decimal = Field(default=Decimal("0.00"))
       confidence_score: float = Field(..., ge=0.0, le=1.0)

   class ReconciliationResult(BaseModel):
       session_id: str
       period_start: date
       period_end: date
       matches: list[ReconciliationMatch]
       unmatched_bank: list[BankTransaction]
       unmatched_erp: list[ERPEntry]
       total_bank_amount: Decimal
       total_erp_amount: Decimal
       net_discrepancy_amount: Decimal
       reconciliation_rate: float
       created_at: datetime = Field(default_factory=datetime.utcnow)
   \`\`\`

2. REGLAS DE VALIDACIÃ“N:
   - ProhÃ­be estrictamente el uso del tipo nativo \`float\` para importes monetarios.
   - Aplica validadores \`@field_validator\` para convertir automÃ¡ticamente strings numÃ©ricos a \`Decimal\` redondeando a 2 decimales.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="ValidaciÃ³n y normalizaciÃ³n de importes" 
          goal="FunciÃ³n que normaliza importes detectando coma decimal espaÃ±ola, espacios como separadores de miles, etc."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.amber }}>Punto crÃ­tico:</strong> CSV bancarios espaÃ±oles usan coma decimal (1.234,56). Usa <code className="text-xs bg-black/5 px-1 rounded-sm">Decimal</code>, nunca <code className="text-xs bg-black/5 px-1 rounded-sm">float</code>.
          </div>
          <PromptBlock label="Prompt 2.3 â€” NormalizaciÃ³n de importes">
{`ActÃºa como Especialista en Limpieza de Datos Financieros y Calidad de CÃ³digo.

Crea el mÃ³dulo \`normalizers.py\` con funciones puras y pruebas unitarias exhaustivas para normalizar formatos numÃ©ricos y fechas heterogÃ©neas:

1. FUNCIÃ“N \`normalize_amount(raw_value: Any) -> Decimal\`:
   - Detecta automÃ¡ticamente si el nÃºmero utiliza:
     * NotaciÃ³n espaÃ±ola / europea: '1.234.567,89 â‚¬' -> Decimal('1234567.89')
     * NotaciÃ³n anglosajona: '1,234,567.89 $' -> Decimal('1234567.89')
     * Formato plano: '1234.56' o '1234,56'
   - Regla de desambiguaciÃ³n: Si coexisten coma y punto en la misma cadena, el Ãºltimo carÃ¡cter que aparece actÃºa como separador decimal.
   - Tratamiento de convenciones contables especiales:
     * Importes entre parÃ©ntesis: '(1.500,00)' -> Decimal('-1500.00')
     * Signo negativo al final: '1.500,00-' -> Decimal('-1500.00')
   - Limpieza automÃ¡tica de sÃ­mbolos de moneda ('â‚¬', '$', 'Â£', 'EUR', 'USD') y espacios de no separaciÃ³n ('\\xa0').
   - Lanza \`ValueError\` con el valor original en el mensaje si la cadena no es convertible a nÃºmero.

2. FUNCIÃ“N \`normalize_date(raw_date: Any, date_hint: Optional[str] = None) -> date\`:
   - EvalÃºa de forma jerÃ¡rquica los formatos: 'DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY'.
   - Soporta marcas de tiempo ISO 8601 completas ('2025-11-30T14:32:00Z' -> date(2025, 11, 30)).

3. TESTS UNITARIOS ASOCIADOS (con \`pytest\`):
   - Incluye casos lÃ­mite: importes en cero ('0,00'), importes de 1 cÃ©ntimo ('0,01'), negativos con espacio ('- 450,20'), aÃ±os bisiestos ('29/02/2024') y cadenas no numÃ©ricas ('N/A', 'NULL', '--').`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="Base de datos que guarda el historial de conciliaciones para consulta y auditorÃ­a."
        >
          <PromptBlock label="Prompt 2.4 â€” Persistencia DuckDB">
{`ActÃºa como Ingeniero de Bases de Datos y Especialista en Persistencia AnalÃ­tica OLAP.

Crea el mÃ³dulo \`storage.py\` para la persistencia transaccional del historial de conciliaciones utilizando DuckDB embebido:

1. ESQUEMA RELACIONAL Y TABLAS (\`~/.balance_inteligente/data/reconciliations.duckdb\`):
   - Escribe \`init_reconciliation_db(db_path: Path) -> duckdb.DuckDBPyConnection\` que crea las tablas con claves forÃ¡neas e Ã­ndices:
     * \`reconciliation_sessions\` (session_id VARCHAR PRIMARY KEY, period_start DATE, period_end DATE, total_bank_amount DECIMAL, total_erp_amount DECIMAL, net_discrepancy DECIMAL, reconciliation_rate FLOAT, created_at TIMESTAMP, user_name VARCHAR)
     * \`bank_transactions\` (id VARCHAR, session_id VARCHAR, transaction_date DATE, value_date DATE, description VARCHAR, amount DECIMAL, reference VARCHAR, is_matched BOOLEAN)
     * \`erp_entries\` (id VARCHAR, session_id VARCHAR, posting_date DATE, account_code VARCHAR, description VARCHAR, debit DECIMAL, credit DECIMAL, net_amount DECIMAL, is_matched BOOLEAN)
     * \`reconciliation_matches\` (match_id VARCHAR, session_id VARCHAR, bank_id VARCHAR, erp_id VARCHAR, match_type VARCHAR, amount_diff DECIMAL, confidence_score FLOAT)

2. OPERACIONES TRANSACCIONALES:
   - \`store_reconciliation(conn, result: ReconciliationResult) -> str\`: Guarda toda la sesiÃ³n de conciliaciÃ³n de forma atÃ³mica en una Ãºnica transacciÃ³n (\`BEGIN TRANSACTION ... COMMIT\`).
   - \`get_reconciliation_history(conn, limit: int = 30) -> list[dict]\`: Devuelve el listado cronolÃ³gico de sesiones previas con sus KPIs para el panel de control.
   - \`export_reconciliation_csv(conn, session_id: str, output_dir: Path) -> tuple[Path, Path]\`: Exporta dos ficheros CSV (uno para matches confirmados y otro para descuadres) para su apertura en Excel.

3. CONTROL DE CONCURRENCIA Y BLOQUEOS:
   - Implementa un gestor de contexto (\`with\`) para asegurar el cierre de conexiones y evitar bloqueos de ficheros en Windows.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mÃ­nimo de ejemplo" 
          goal="Dos archivos CSV con 20 transacciones (18 conciliables + 2 descuadres intencionales)."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(59,111,212,0.05)", borderLeft: "3px solid " + C.accent, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.accent }}>Descuadres a incluir:</strong> 1 por diferencia de fecha Â· 1 por diferencia de importe (â‚¬1.234,56 banco vs â‚¬1.234,50 ERP)
          </div>
          <PromptBlock label="Prompt 2.5 â€” Dataset de ejemplo">
{`ActÃºa como QA Engineer y Generador de Datos SintÃ©ticos Financieros.

Crea un script \`generate_demo_dataset.py\` que genere dos archivos CSV de prueba para el mes de noviembre de 2025 con 20 transacciones y 2 descuadres controlados:

1. FICHERO 1: \`sample_bank_statement.csv\` (Extracto Bancario):
   - 20 movimientos representativos (NÃ³minas SEPA, Pago Proveedores, Cuotas Seguridad Social, LiquidaciÃ³n TPV, Recibo de Suministros).
   - Formato: Fechas en 'DD/MM/YYYY' e importes con coma decimal y formato espaÃ±ol ('1.234,56 â‚¬').
   - Columnas: \`fecha\`, \`concepto\`, \`importe\`, \`saldo\`.

2. FICHERO 2: \`sample_erp_ledger.csv\` (Libro Mayor Cuenta 5720001):
   - 20 asientos contables con nÃºmero de asiento y contrapartidas.
   - Columnas: \`fecha_asiento\`, \`cuenta\`, \`descripcion\`, \`debe\`, \`haber\`, \`documento\`.

3. DESCUADRES INTENCIONALES CONFIGURADOS:
   - **Descuadre 1 (Diferencia de fecha por decalaje):** Asiento en ERP contabilizado el 28/11/2025 correspondiente a una transferencia bancaria con fecha valor de abono el 01/12/2025.
   - **Descuadre 2 (Diferencia de importe):** Pago por transferencia bancaria de 1.234,56 â‚¬ registrado errÃ³neamente en el ERP por 1.234,50 â‚¬ (diferencia de 0,06 â‚¬ por error de tipeo).
   - **Descuadre 3 (ComisiÃ³n no contabilizada):** ComisiÃ³n de mantenimiento bancario de 25,00 â‚¬ en banco sin contrapartida en el ERP.
   - **Descuadre 4 (Asiento pendiente de pago):** ProvisiÃ³n de gastos de auditorÃ­a de 800,00 â‚¬ en ERP sin cargo en cuenta.

4. CÃ“DIGO DE VALIDACIÃ“N:
   - Incluye una funciÃ³n de prueba que lee ambos archivos con \`parsers.py\`, valida contra los esquemas Pydantic y confirma que se detectan exactamente las 18 coincidencias y los 2 descuadres principales.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 â€” LÃ“GICA / IA (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Cpu} 
          label="Capa 3" 
          color={C.amber} 
          title="LÃ³gica / IA"
          desc="Algoritmo determinista de conciliaciÃ³n + LLM para explicar causas de descuadres + control antialucinaciÃ³n." 
        />

        <Step 
          num="3.1" 
          title="SelecciÃ³n del modelo LLM" 
          goal="Elegir el modelo con mejor performance en tareas contables para explicar los descuadres."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}
          >
            El LLM <strong>no hace la conciliaciÃ³n</strong> â€” eso lo hace el algoritmo determinista en Python. El LLM solo diagnostica las causas posibles de los descuadres.
          </div>
          <PromptBlock label="Prompt 3.1 â€” SelecciÃ³n del modelo">
{`ActÃºa como Investigador de Inteligencia Artificial especializado en Modelos Contables y AuditorÃ­a.

Para "Balance Inteligente", define el criterio de selecciÃ³n del modelo fundacional para explicar las causas de los descuadres contables:

1. ANÃLISIS DE BENCHMARKS SECTORIALES:
   - SegÃºn los rankings de BizFinBench_ERP y AuditBench, identifica los 2 modelos comerciales (ej. Claude 3.5 Sonnet, GPT-4o) y el modelo open-source lÃ­der (ej. DeepSeek-R1 / Llama-3.3-70B) con mayor precisiÃ³n en deducciÃ³n contable.
   - Justifica por quÃ© el LLM NO debe realizar la conciliaciÃ³n numÃ©rica (tarea reservada al algoritmo determinista en Python) y solo debe diagnosticar hipÃ³tesis conceptuales.

2. ESTIMACIÃ“N DE COSTES Y LATENCIA:
   - Para un lote de 20 descuadres por cierre mensual (~300 tokens de contexto y ~150 tokens de salida por llamada), calcula el coste operativo aproximado por sesiÃ³n.
   - Especifica los parÃ¡metros recomendados para la llamada: temperature=0.1 o 0.2 (mÃ¡ximo determinismo) y timeout=20s.

3. DIRECTRICES DE PRIVACIDAD:
   - ObligaciÃ³n de sanitizar datos personales (PII), IBANs y nombres comerciales antes de enviar el prompt a la API.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Algoritmo de conciliaciÃ³n + prompt LLM" 
          goal="El algoritmo determinista de matching y el prompt que pide al LLM explicar causas de descuadres."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald }}>
              <div className="font-semibold mb-1" style={{ color: C.emerald }}>Parte A â€” Algoritmo determinista</div>
              <div style={{ color: "rgba(17,17,17,0.6)" }}>Match EXACT Â· DATE_TOLERANCE Â· DESCRIPTION_FUZZY Â· confidence 0â€“1</div>
            </div>
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber }}>
              <div className="font-semibold mb-1" style={{ color: C.amber }}>Parte B â€” Prompt LLM</div>
              <div style={{ color: "rgba(17,17,17,0.6)" }}>3 causas genÃ©ricas por descuadre Â· Prohibido inventar nombres, CIFs o importes</div>
            </div>
          </div>
          <PromptBlock label="Prompt 3.2 â€” Algoritmo + prompt LLM">
{`ActÃºa como Desarrollador Senior de Algoritmos Financieros y Prompt Engineer.

Balance Inteligente utiliza dos sistemas de inteligencia complementarios que debes implementar en \`reconciliation_engine.py\`:

PARTE A â€” ALGORITMO DETERMINISTA (Python puro):
Escribe \`reconcile_transactions(bank_list: list[BankTransaction], erp_list: list[ERPEntry], date_tolerance_days: int = 3, amount_tolerance: Decimal = Decimal("0.00")) -> ReconciliationResult\`:
1. Paso Exacto: Mismo importe exacto y misma fecha. Asigna confidence_score = 1.0.
2. Paso Decalaje: Mismo importe exacto y diferencia de fechas <= date_tolerance_days. Asigna confidence_score = 0.85.
3. Paso Fuzzy: Mismo importe con palabras clave coincidentes en la descripciÃ³n. Asigna confidence_score = 0.70.
4. Regla 1 a 1: Cada registro casado se elimina del pool para evitar duplicidades.
5. Los no conciliados se clasifican en unmatched_bank y unmatched_erp.

PARTE B â€” PROMPT LLM PARA DIAGNÃ“STICO DE DESCUADRES:
DiseÃ±a el prompt que, dado un movimiento no conciliado (tipo, importe, fecha relativa y descripciÃ³n sanitizada), solicita al modelo:
- Identificar exactamente 3 hipÃ³tesis contables plausibles (decalaje fecha valor, comisiÃ³n bancaria no registrada, asiento de provisiÃ³n pendiente, etc.).
- ProhibiciÃ³n estricta: No inventar nombres de empresas, CIFs ni cifras que no figuren en los datos.
- Formato de salida: JSON estricto con campos: causes (list[str]), confidence_note (str), requires_manual_review (bool).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo" 
          goal="FunciÃ³n que envÃ­a cada descuadre al LLM con blindaje de privacidad Zero-PII para obtener las causas posibles."
        >
          <PromptBlock label="Prompt 3.3 â€” Llamada al modelo">
{`ActÃºa como Ingeniero de IntegraciÃ³n de LLMs en Python.

Implementa en \`llm_client.py\` la funciÃ³n \`explain_discrepancy(transaction: BankTransaction, model_name: str) -> str\`:

1. CONSTRUCCIÃ“N DE LA PETICIÃ“N:
   - Sanitiza el concepto bancario eliminando nombres propios, CIFs e IBANs (Zero-PII).
   - Inyecta el prompt estructurado con los datos del movimiento (Importe, Fecha, Concepto normalizado).

2. PARÃMETROS DE LLAMADA ASÃNCRONA (VÃ­a httpx o SDK oficial):
   - temperature: 0.2 (respuestas consistentes y sin creatividad no fundamentada).
   - max_tokens: 350 (suficiente para 3 hipÃ³tesis concisas).
   - timeout: 20.0 segundos por peticiÃ³n.
   - Reintentos: MÃ¡ximo 2 reintentos con backoff exponencial ante errores HTTP 429 o 5xx.
   - EjecuciÃ³n secuencial o en pequeÃ±os batches para respetar los rate limits de la API.

3. GESTIÃ“N DE CREDENCIALES:
   - Carga segura de la clave desde la variable de entorno BALANCE_LLM_API_KEY.
   - Registro en log del tiempo de respuesta y tokens consumidos (sin registrar datos personales).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo de la respuesta" 
          goal="Convertir la respuesta del LLM en una lista estructurada de causas posibles mediante Pydantic."
        >
          <PromptBlock label="Prompt 3.4 â€” Parseo de la respuesta">
{`ActÃºa como Ingeniero de Software especializado en Structured Outputs y Pydantic.

Crea el mÃ³dulo \`response_parser.py\` para procesar las explicaciones devueltas por el LLM:

1. MODELO PYDANTIC DE SALIDA:
\`\`\`python
class DiscrepancyExplanation(BaseModel):
    causes: list[str] = Field(..., min_length=1, max_length=3, description="MÃ¡ximo 3 causas contables de < 120 caracteres cada una")
    confidence_note: str
    requires_manual_review: bool = True
\`\`\`

2. FUNCIÃ“N DE PARSEO RESILIENTE:
Escribe \`parse_discrepancy_explanation(raw_response: str) -> DiscrepancyExplanation\`:
- Extrae el bloque JSON utilizando expresiones regulares si la respuesta contiene texto explicativo alrededor.
- Si el JSON es vÃ¡lido, instancia y valida el modelo DiscrepancyExplanation.
- Trunca cualquier causa que exceda los 120 caracteres para mantener la limpieza en la UI.
- Si el parseo falla o el JSON estÃ¡ incompleto, recupera las causas que pueda o genera por defecto: "Causa no identificada automÃ¡ticamente â€” RevisiÃ³n manual requerida".
- La funciÃ³n NUNCA lanza una excepciÃ³n no controlada hacia la interfaz de usuario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Control antialucinaciÃ³n" 
          goal="Verificar que las causas del LLM no contienen datos inventados especÃ­ficos de la transacciÃ³n."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla crÃ­tica:</strong> No usar un segundo LLM para validar el primero. DetecciÃ³n heurÃ­stica determinista simple con expresiones regulares.
          </div>
          <PromptBlock label="Prompt 3.5 â€” validate_explanation()">
{`ActÃºa como Ingeniero de Calidad y Seguridad en Sistemas de Inteligencia Artificial.

Crea el mÃ³dulo \`guardrails.py\` con la funciÃ³n \`validate_explanation(explanation: DiscrepancyExplanation, transaction: BankTransaction) -> tuple[DiscrepancyExplanation, list[str]]\`:

1. REGLAS DE DETECCIÃ“N HEURÃSTICA DETERMINISTA (Sin usar un segundo LLM):
   - Regla 1 (Importes inventados): Analiza el texto con expresiones regulares en busca de cantidades monetarias. Si detecta importes numÃ©ricos distintos al de la transacciÃ³n, activa flag_invented_amount = True.
   - Regla 2 (Entidades inventadas): Busca patrones de CIF/NIF o nombres de bancos no proporcionados en los datos de entrada.
   - Regla 3 (VerificaciÃ³n de razonabilidad): Comprueba que las causas citan conceptos contables reconocidos (fecha valor, remesa, comisiÃ³n, provisiÃ³n, redondeo).

2. ACCIÃ“N DE MITIGACIÃ“N:
   - Si se detecta cualquier anomalÃ­a, marca requires_manual_review = True y anexa un aviso al reporte: "[ADVERTENCIA: Causa no confirmada documentalmente. Verificar antes de regularizar]".
   - Retorna la explicaciÃ³n auditada junto con la lista de advertencias detectadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="FunciÃ³n de fallback" 
          goal="Comportamiento cuando el LLM no estÃ¡ disponible â€” la conciliaciÃ³n determinista siempre funciona en modo offline."
        >
          <PromptBlock label="Prompt 3.6 â€” explain_discrepancy_with_fallback()">
{`ActÃºa como Arquitecto de Resiliencia de Software.

Implementa en \`fallback_engine.py\` la funciÃ³n \`explain_discrepancy_with_fallback(transaction: BankTransaction, model_name: str) -> tuple[DiscrepancyExplanation, bool]\`:

1. FLUJO DE DEGRADACIÃ“N CONTROLADA:
   - Intenta la llamada remota al LLM mediante \`explain_discrepancy()\`.
   - Si la API no estÃ¡ disponible (sin internet, timeout, cuota agotada o sin API key configurada):
     * Activa el Motor HeurÃ­stico Local con reglas deterministas:
       - Si el concepto contiene "COMIS" o "MANT" -> "ComisiÃ³n bancaria no contabilizada en cuenta 669".
       - Si es un cobro a final de mes sin asiento -> "Remesa o cobro de cliente pendiente de contabilizar".
       - Si es un cargo directo sin contrapartida -> "Pago o adeudo domiciliado pendiente de registrar".
       - En cualquier otro caso -> "Partida pendiente de regularizaciÃ³n â€” RevisiÃ³n contable manual requerida".
     * Genera una DiscrepancyExplanation vÃ¡lida con requires_manual_review = True.
     * Retorna (explanation, is_llm_used=False).

2. INTEGRACIÃ“N VISUAL:
   - La interfaz grÃ¡fica mostrarÃ¡ un badge Ã¡mbar [ANÃLISIS HEURÃSTICO LOCAL] cuando is_llm_used sea False, garantizando que la conciliaciÃ³n nunca se detenga.`}
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
          desc="Las 3 pantallas de Balance Inteligente â€” carga, resultados e historial." 
        />

        <Step 
          num="4.1" 
          title="Wireframe mÃ­nimo" 
          goal="Definir las 3 pantallas antes de codificar: Carga Â· Resultados Â· Historial."
        >
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { n: "1", title: "Carga", items: ["Drag & drop de archivos", "Selector de perÃ­odo", "Tolerancias configurables", "BotÃ³n Conciliar"] },
              { n: "2", title: "Resultados", items: ["Resumen numÃ©rico", "Tabla de matches", "Lista de descuadres + causas LLM", "Exportar informe"] },
              { n: "3", title: "Historial", items: ["Lista de sesiones anteriores", "Cargar conciliaciÃ³n pasada"] },
            ].map(s => (
              <div key={s.n} className="p-4 rounded-xl border text-sm"
                style={{ borderColor: "rgba(8,145,178,0.2)", background: "rgba(8,145,178,0.03)" }}>
                <div className="font-semibold mb-2" style={{ color: "#0891B2" }}>Pantalla {s.n}: {s.title}</div>
                <ul className="space-y-1">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5" style={{ color: "rgba(17,17,17,0.6)" }}>
                      <span style={{ color: "#0891B2" }}>Â·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.1 â€” Wireframe Flet">
{`ActÃºa como DiseÃ±ador de Interfaces y Desarrollador Frontend Senior en Python con Flet (Flutter Engine).

Crea la arquitectura de interfaz de usuario de "Balance Inteligente" en el mÃ³dulo \`ui/app.py\`:

1. ESTRUCTURA DE PANTALLAS (3 Vistas con ft.View):
   - Vista 1 (Ingesta y ConfiguraciÃ³n):
     * 2 zonas interactivas de carga (ft.FilePicker con Drag & Drop) para Extracto Bancario y Libro Mayor ERP.
     * Selectores de fecha para el perÃ­odo contable (ft.DatePicker).
     * Controles deslizantes/campos para tolerancia de fechas (0 a 7 dÃ­as) y tolerancia de cÃ©ntimos (0 a 5 cÃ©ntimos).
     * ft.ElevatedButton ("Ejecutar ConciliaciÃ³n") desactivado por defecto hasta validar que ambos ficheros estÃ¡n cargados.
   - Vista 2 (Panel de Resultados y DiagnÃ³stico):
     * Tarjetas KPI en la cabecera: Total Registros, % Cuadre, Total Conciliado (â‚¬) y Descuadre Neto (â‚¬).
     * ft.Tabs con dos pestaÃ±as:
       a) PestaÃ±a "Partidas Conciliadas": ft.DataTable paginada con scroll virtualizado.
       b) PestaÃ±a "Descuadres & DiagnÃ³stico IA": Lista de tarjetas (ft.Card) con badges de confianza ([EXACTO], [TOLERANCIA], [IA DIAGNÃ“STICO], [FALLBACK]).
     * BotÃ³n flotante para exportar informe ("Descargar Informe PDF / Markdown").
   - Vista 3 (Historial y AuditorÃ­a):
     * Tabla cronolÃ³gica de conciliaciones almacenadas en DuckDB con opciÃ³n de recargar cualquier sesiÃ³n pasada.

2. GESTIÃ“N DE ESTADOS Y FEEDBACK:
   - Indicador de progreso (ft.ProgressRing / ft.ProgressBar) con mensaje de estado dinÃ¡mico durante el cÃ³mputo.
   - Notificaciones emergentes (ft.SnackBar) con cÃ³digo de color (Verde = Cuadre satisfactorio, Rojo = Error de fichero, Ãmbar = Descuadre detectado).`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="Pantalla de carga de archivos con validaciÃ³n visual en Flet."
        >
          <PromptBlock label="Prompt 4.2 â€” Componente carga de ficheros">
{`ActÃºa como Especialista en UI/UX para Aplicaciones de Productividad.

Implementa el componente de ingesta de ficheros \`ui/components/file_loader.py\` en Flet:

1. ESPECIFICACIÃ“N TÃ‰CNICA:
   - Implementa FilePicker para interceptar la selecciÃ³n de archivos .csv, .txt o .json.
   - Tras la selecciÃ³n, ejecuta una pre-lectura de las primeras 5 lÃ­neas (preview) sin bloquear el hilo principal de la UI.
   - Muestra inmediatamente:
     * Nombre del archivo e icono del formato.
     * NÃºmero de filas totales detectadas.
     * TamaÃ±o en KB/MB.
     * Check verde si contiene las columnas mÃ­nimas obligatorias (fecha, concepto, importe) o alerta roja si faltan cabeceras.

2. MANEJO DE ERRORES VISUALES:
   - Si el usuario sube un archivo no soportado (ej. .xlsx o .pdf), muestra un ft.Banner explicativo con instrucciones claras para exportar desde Excel en formato CSV UTF-8.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Ãrea de resultados" 
          goal="Tabla de matches (tabs Conciliados / Descuadres) y tarjetas con diagnÃ³stico IA."
        >
          <PromptBlock label="Prompt 4.3 â€” Ãrea de resultados">
{`ActÃºa como DiseÃ±ador Frontend en Python con Flet.

Implementa la pantalla de resultados de Balance Inteligente en \`ui/views/results_view.py\`:

1. CABECERA CON TARJETAS KPI:
   - 4 Tarjetas de resumen mÃ©trico:
     * Total Registros Bancarios vs. ERP.
     * Porcentaje de Cobertura Conciliada (Verde si >= 95%, Naranja si 80-94%, Rojo si < 80%).
     * Total Importe Conciliado (â‚¬).
     * Descuadre Neto Total (â‚¬).

2. PESTAÃ‘AS DE VISUALIZACIÃ“N (ft.Tabs):
   - PestaÃ±a 1 ("Conciliadas"): ft.DataTable con scroll virtualizado que muestra las coincidencias: Fecha Banco, Concepto Banco, Importe, Asiento ERP, Fecha ERP, Concepto ERP, Tipo Match y Score. Fondo verde tenue para coincidencias exactas.
   - PestaÃ±a 2 ("Descuadres"): Lista de tarjetas (ft.Card) por cada partida no conciliada, mostrando:
     * Datos del movimiento (Fecha, Concepto, Importe).
     * Las 3 hipÃ³tesis del diagnÃ³stico IA (o regla heurÃ­stica).
     * Badge de estado: [EXACTO], [TOLERANCIA], [IA DIAGNÃ“STICO], [VERIFICAR MANUALMENTE].

3. ACCIONES DE EXPORTACIÃ“N:
   - ft.ElevatedButton ("Descargar Informe Markdown / PDF") con selector de ruta local.
   - ft.OutlinedButton ("Nueva ConciliaciÃ³n") que regresa a la pantalla de carga previa confirmaciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacÃ­os y de error" 
          goal="Mensajes claros para cada error posible en la carga y procesamiento de archivos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {["Sin archivos cargados", "Archivo invÃ¡lido (columnas incorrectas)", "PerÃ­odo sin transacciones", "Conciliando (progress ring)", "Error durante la conciliaciÃ³n", "Descuadre total (0% conciliado)"].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
                style={{ background: "rgba(17,17,17,0.04)", color: "rgba(17,17,17,0.6)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(17,17,17,0.1)", color: C.dark }}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.4 â€” Estados de error">
{`ActÃºa como Especialista en UX y GestiÃ³n de Estados Excepcionales en Flet.

Implementa el mÃ³dulo \`ui/components/error_states.py\` para gestionar de forma elegante todas las situaciones lÃ­mite de Balance Inteligente:

1. CATÃLOGO DE ESTADOS VISUALES:
   - Estado 1 (Sin archivos cargados - Inicio): Panel instructivo con iconos de arrastrar archivos y botÃ³n para cargar el dataset DEMO de prueba.
   - Estado 2 (Fichero CSV invÃ¡lido / columnas ausentes): ft.SnackBar rojo de alta visibilidad: "El archivo no contiene las columnas requeridas [LISTA]. Haz clic para ver el formato esperado".
   - Estado 3 (PerÃ­odo sin movimientos): Mensaje informativo: "No se han localizado movimientos en el rango de fechas seleccionado. Ajusta el perÃ­odo contable".
   - Estado 4 (Procesamiento activo): ft.ProgressRing animado con texto reactivo: "Conciliando transacciones y diagnosticando descuadres...". BotÃ³n de conciliar deshabilitado.
   - Estado 5 (Fallo imprevisto de ejecuciÃ³n): ft.AlertDialog con detalle tÃ©cnico del error y opciÃ³n para guardar el log de depuraciÃ³n.
   - Estado 6 (Descuadre total - 0% conciliado): Banner Ã¡mbar de advertencia: "AtenciÃ³n: Ninguna partida pudo conciliarse. Verifica que las fechas y cuentas correspondan al mismo ejercicio contable".`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="NavegaciÃ³n bÃ¡sica" 
          goal="Flujo entre las 3 pantallas: Carga â†’ Resultados â†’ (opcional) Historial."
        >
          <PromptBlock label="Prompt 4.5 â€” NavegaciÃ³n Flet">
{`ActÃºa como Arquitecto Frontend en Flet.

Implementa la arquitectura de navegaciÃ³n fluida entre las 3 pantallas de Balance Inteligente en \`ui/navigation.py\`:

1. CONTROLADOR DE VISTAS (ft.View):
   - Pantalla 1 (Carga): Formulario de drag & drop, selectores de fecha y tolerancias.
   - Pantalla 2 (Resultados): Dashboard de KPIs, tabla de matches, tarjetas de descuadres y exportador.
   - Pantalla 3 (Historial): Listado de sesiones pasadas guardadas en DuckDB.

2. REGLAS DE NAVEGACIÃ“N:
   - Al pulsar "Conciliar" y concluir el pipeline con Ã©xito: TransiciÃ³n automÃ¡tica a la pantalla de Resultados con los datos ya renderizados.
   - BotÃ³n "Historial" accesible en la barra superior (ft.AppBar) desde cualquier vista.
   - En la vista de Historial, cada fila cuenta con el botÃ³n "Cargar sesiÃ³n" que abre los resultados pasados en modo consulta.
   - BotÃ³n "Volver a Ingesta" con diÃ¡logo de confirmaciÃ³n si existen resultados no exportados.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 â€” INTEGRACIÃ“N (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Link2} 
          label="Capa 5" 
          color={C.red} 
          title="IntegraciÃ³n"
          desc="Conectar interfaz, lÃ³gica y datos en un pipeline robusto con gestiÃ³n de errores en cascada y auditorÃ­a segura." 
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lÃ³gica" 
          goal="La funciÃ³n on_reconcile_click() que ejecuta el pipeline completo desde la UI sin bloquear la ventana grÃ¡fica."
        >
          <PromptBlock label="Prompt 5.1 â€” Evento UI AsÃ­ncrono">
{`ActÃºa como Ingeniero Frontend Senior en Python con Flet.

Implementa la funciÃ³n controladora de eventos \`on_reconcile_click(e)\` en \`ui/controllers.py\` para disparar la conciliaciÃ³n desde la interfaz:

1. REQUISITOS DE CONCURRENCIA:
   - La ejecuciÃ³n del pipeline debe lanzarse en una tarea asÃ­ncrona independiente (\`asyncio.create_task\` o \`threading.Thread\`) para que la ventana de Flet no se congele durante el procesamiento masivo de miles de lÃ­neas.
   - Deshabilita temporalmente el botÃ³n "Conciliar" y muestra el indicador de carga (\`ft.ProgressRing\`).
   - Implementa un callback de progreso (\`progress_callback(percent: int, message: str)\`) para actualizar la barra de estado visual en tiempo real.

2. SECUENCIA DEL CONTROLADOR:
   1. Valida que las rutas de los dos archivos (extracto bancario y libro mayor) existan en el sistema.
   2. Extrae las fechas del perÃ­odo contable y los mÃ¡rgenes de tolerancia de los controles visuales.
   3. Invoca la funciÃ³n \`run_reconciliation_pipeline(...)\`.
   4. Al finalizar con Ã©xito: Puebla las tablas de matches, las tarjetas de descuadres y navega automÃ¡ticamente a la pantalla de Resultados.
   5. Si ocurre una excepciÃ³n: Captura el error y despliega un \`ft.AlertDialog\` explicativo con sugerencias de soluciÃ³n.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lÃ³gica con datos" 
          goal="Pipeline puro reconciliation_pipeline() que conecta la lectura, el algoritmo, la IA y la persistencia en DuckDB."
        >
          <PromptBlock label="Prompt 5.2 â€” Pipeline Orquestador">
{`ActÃºa como Ingeniero de IntegraciÃ³n y Arquitecto de Software en Python.

Escribe el mÃ³dulo \`pipeline.py\` con la funciÃ³n orquestadora central \`reconciliation_pipeline(...)\` completamente desacoplada de la interfaz grÃ¡fica:

1. CONTRATO FORMAL DE LA FUNCIÃ“N:
   \`\`\`python
   def run_reconciliation_pipeline(
       bank_file_path: Path,
       erp_file_path: Path,
       period_start: date,
       period_end: date,
       date_tolerance_days: int,
       amount_tolerance: Decimal,
       conn: duckdb.DuckDBPyConnection,
       model_name: str,
       progress_callback: Optional[Callable[[int, str], None]] = None
   ) -> ReconciliationResult:
   \`\`\`

2. FLUJO DE EJECUCIÃ“N SECUENCIAL (End-to-End):
   - **Paso 1 (Ingesta):** Llama a \`read_bank_statement()\` y \`read_erp_ledger()\` de \`parsers.py\` (15% progreso).
   - **Paso 2 (ValidaciÃ³n):** Instancia y valida las listas de modelos Pydantic \`BankTransaction\` y \`ERPEntry\` (30% progreso).
   - **Paso 3 (Filtrado Temporal):** Filtra los registros que correspondan estrictamente al rango [period_start, period_end].
   - **Paso 4 (Matching Determinista):** Ejecuta \`reconcile_transactions()\` de \`reconciliation_engine.py\` resolviendo todas las coincidencias 1 a 1 (60% progreso).
   - **Paso 5 (DiagnÃ³stico de Descuadres):** Para cada partida no casada, invoca \`explain_discrepancy_with_fallback()\` aplicando guardrails antialucinaciÃ³n (80% progreso).
   - **Paso 6 (Persistencia AtÃ³mica):** Guarda la sesiÃ³n completa en DuckDB mediante \`store_reconciliation()\` (95% progreso).
   - **Paso 7 (Cierre):** Retorna el objeto canÃ³nico \`ReconciliationResult\` (100% progreso).

3. MANEJO DE EXCEPCIONES:
   - Captura y re-lanza excepciones con contexto enriquecido (especificando quÃ© paso fallÃ³).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="GestiÃ³n de errores en cascada" 
          goal="Plan de resiliencia ante CSVs malformados, perÃ­odos vacÃ­os, caÃ­das de la API del LLM o fallos de base de datos."
        >
          <PromptBlock label="Prompt 5.3 â€” Matriz de Errores y Excepciones">
{`ActÃºa como Arquitecto de Resiliencia de Software en Sistemas CrÃ­ticos.

Crea el mÃ³dulo \`exceptions.py\` con la jerarquÃ­a de excepciones personalizadas y la matriz de decisiones de error de "Balance Inteligente":

1. JERARQUÃA DE ERRORES:
   \`\`\`python
   from enum import Enum

   class ErrorSeverity(Enum):
       WARNING = "WARNING"          # No bloquea el flujo (ej. fallo de API de IA -> usa fallback)
       RECOVERABLE = "RECOVERABLE"  # Permite corregir parÃ¡metros (ej. fecha sin movimientos)
       FATAL = "FATAL"              # Aborta la operaciÃ³n (ej. fichero corrupto o disco lleno)

   class BalanceException(Exception):
       def __init__(self, message: str, code: str, severity: ErrorSeverity, user_hint: str):
           super().__init__(message)
           self.code = code
           self.severity = severity
           self.user_hint = user_hint
   \`\`\`

2. TABLA DE DECISIONES DE ERROR (Fail-Safe Strategy):
   - **Fallo 1 (CSV malformado o delimitador desconocido):** Lanza \`BalanceException\` (FATAL) indicando el nÃºmero de fila conflictiva y sugiriendo revisar la codificaciÃ³n del archivo.
   - **Fallo 2 (PerÃ­odo sin movimientos):** Emite advertencia (WARNING) permitiendo al usuario ampliar el rango de fechas sin reiniciar la app.
   - **Fallo 3 (Timeout o caÃ­da de la API del LLM):** Degrada silenciosamente al motor heurÃ­stico local, marca \`is_llm_used = False\` y continÃºa la entrega sin bloquear el reporte.
   - **Fallo 4 (Error de escritura en DuckDB):** Muestra el resultado en pantalla igualmente y genera un volcado de emergencia en JSON en \`%APPDATA%/BalanceInteligente/emergency_backup/\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging bÃ¡sico y auditorÃ­a" 
          goal="Sistema de logging para auditorÃ­a de conciliaciones sin volcar datos personales ni conceptos bancarios (RGPD)."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>RGPD:</strong> No guardar el concepto bancario en el log. Puede contener nombres de personas o empresas.
          </div>
          <PromptBlock label="Prompt 5.4 â€” reconciliation_logger.py">
{`ActÃºa como Especialista en Ciberseguridad y Privacidad de Datos en Software Financiero.

Crea el mÃ³dulo \`logger.py\` para la auditorÃ­a tÃ©cnica y depuraciÃ³n en producciÃ³n cumpliendo estrictamente con el RGPD:

1. CONFIGURACIÃ“N DEL SISTEMA DE LOGGING:
   - Archivo destino: \`~/.balance_inteligente/logs/reconciliation.log\`.
   - RotaciÃ³n automÃ¡tica: \`RotatingFileHandler\` con tamaÃ±o mÃ¡ximo de 5MB y 3 ficheros de respaldo.
   - Formato estructurado: \`[%(asctime)s UTC] [%(levelname)s] [%(name)s] %(message)s\`.
   - Nivel de log configurable dinÃ¡micamente mediante la variable de entorno \`BALANCE_LOG_LEVEL\` (por defecto: INFO).

2. MÃSCARA ESTRICTA DE PRIVACIDAD (Privacy by Design):
   - ProhÃ­be explÃ­citamente volcar en los logs: conceptos bancarios originales, descripciones de asientos contables y nombres de personas o empresas.
   - Enmascara nÃºmeros de cuenta bancaria IBAN dejando solo los Ãºltimos 4 dÃ­gitos (\`ES** **** **** **** 1234\`).
   - Registra Ãºnicamente metadatos operacionales: Session UUID, nÃºmero de transacciones procesadas, tiempo de cÃ³mputo en milisegundos, porcentaje de conciliaciÃ³n y cÃ³digos de error HTTP.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="ConfiguraciÃ³n centralizada" 
          goal="config.py con Pydantic Settings v2 para gestionar variables de entorno, constantes de negocio y fichero .env."
        >
          <PromptBlock label="Prompt 5.5 â€” config.py + .env.example">
{`ActÃºa como Ingeniero DevOps / SRE en Python.

Crea el mÃ³dulo \`config.py\` utilizando \`pydantic-settings\` para la gestiÃ³n centralizada de la configuraciÃ³n de "Balance Inteligente":

1. ESPECIFICACIÃ“N DEL MODELO DE AJUSTES:
   \`\`\`python
   from pydantic_settings import BaseSettings, SettingsConfigDict
   from pathlib import Path
   from typing import Optional
   from decimal import Decimal

   class AppSettings(BaseSettings):
       model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

       BALANCE_LLM_API_KEY: Optional[str] = None
       BALANCE_LLM_MODEL: str = "gpt-4o-mini"
       BALANCE_DB_PATH: Path = Path.home() / ".balance_inteligente" / "data" / "reconciliations.duckdb"
       BALANCE_LOG_PATH: Path = Path.home() / ".balance_inteligente" / "logs" / "reconciliation.log"
       BALANCE_LOG_LEVEL: str = "INFO"
       BALANCE_DEFAULT_DATE_TOLERANCE: int = 3
       BALANCE_DEFAULT_AMOUNT_TOLERANCE: Decimal = Decimal("0.00")
       BALANCE_MAX_TRANSACTIONS: int = 5000
   \`\`\`

2. FUNCIÃ“N DE INICIALIZACIÃ“N:
   - \`init_environment() -> AppSettings\`: Crea automÃ¡ticamente en el sistema de archivos los directorios necesarios (\`data/\`, \`logs/\`, \`exports/\`) si no existen al arrancar la app.

3. GENERADOR DEL FICHERO \`.env.example\`:
   - Escribe la plantilla comentada \`.env.example\` explicando el propÃ³sito de cada variable y cÃ³mo configurar la clave de API para activar el diagnÃ³stico por IA.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 â€” PRUEBAS Y EMPAQUETADO (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={FlaskConical} 
          label="Capa 6" 
          color={C.emerald} 
          title="Pruebas y empaquetado"
          desc="Tests unitarios, test de flujo completo, protocolo de validaciÃ³n manual y generaciÃ³n del ejecutable autÃ³nomo (.exe)." 
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="Tests Pytest para el algoritmo de matching determinista, normalizaciÃ³n de importes Decimal y parseo de respuestas."
        >
          <PromptBlock label="Prompt 6.1 â€” Suite Pytest Unitaria">
{`ActÃºa como QA Lead y Especialista en Testing Automatizado de Software Financiero.

Crea la suite de pruebas unitarias en el archivo \`tests/test_unit_reconciliation.py\` utilizando \`pytest\`:

1. PRUEBAS DE NORMALIZACIÃ“N (\`normalizers.py\`):
   - \`test_normalize_amount_spanish_format\`: Verifica que '1.234.567,89 â‚¬' se convierte exactamente en \`Decimal('1234567.89')\`.
   - \`test_normalize_amount_english_format\`: Verifica que '1,234,567.89' se convierte en \`Decimal('1234567.89')\`.
   - \`test_normalize_amount_accounting_parentheses\`: Verifica que '(450,20)' se convierte en \`Decimal('-450.20')\`.
   - \`test_normalize_amount_invalid_raises_error\`: Verifica que cadenas como 'N/A' o 'PENDIENTE' lanzan \`ValueError\`.

2. PRUEBAS DEL MOTOR DE MATCHING (\`reconciliation_engine.py\`):
   - \`test_exact_match_success\`: Dos transacciones con idÃ©ntico importe y fecha se casan con score 1.0.
   - \`test_date_tolerance_match\`: Transacciones con decalaje de 2 dÃ­as se casan con score 0.85 si la tolerancia es 3 dÃ­as.
   - \`test_one_to_one_uniqueness\`: Comprueba que una transacciÃ³n bancaria nunca se empareja con dos asientos ERP distintos.

3. PRUEBAS DE GUARDRAILS (\`guardrails.py\`):
   - \`test_audit_ai_detects_invented_amount\`: Pasa una explicaciÃ³n con un importe falso y verifica que se activa el flag de alucinaciÃ³n y el badge de revisiÃ³n.

REQUISITO: Todos los tests deben ejecutarse sin conexiÃ³n y en menos de 1.5 segundos con \`pytest tests/test_unit_reconciliation.py -v\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="Test de integraciÃ³n End-to-End del pipeline con los archivos CSV de ejemplo y DuckDB en memoria."
        >
          <PromptBlock label="Prompt 6.2 â€” Test de IntegraciÃ³n E2E">
{`ActÃºa como Ingeniero de IntegraciÃ³n y AutomatizaciÃ³n de Pruebas.

Escribe el test de integraciÃ³n en \`tests/test_pipeline_integration.py\`:

1. ESPECIFICACIÃ“N DEL ESCENARIO E2E:
   - Carga los ficheros sintÃ©ticos \`demo_bank_statement.csv\` y \`demo_erp_ledger.csv\`.
   - Inicializa una base de datos DuckDB en memoria (\`:memory:\`).
   - Mockea la llamada externa al LLM (\`unittest.mock.patch\` sobre \`explain_discrepancy\`) para devolver un diagnÃ³stico controlado sin consumir tokens ni requerir API Key.
   - Ejecuta la funciÃ³n principal \`run_reconciliation_pipeline(...)\`.

2. ASERCIONES OBLIGATORIAS (Verificaciones de Integridad):
   - Confirma que de las 20 transacciones bancarias, exactamente 18 resultan conciliadas (\`len(result.matches) == 18\`).
   - Confirma que se identifican con precisiÃ³n los 2 descuadres intencionales (\`len(result.unmatched_bank) == 2\`).
   - Confirma que la tasa de conciliaciÃ³n calculada es igual al 90.0% (\`result.reconciliation_rate == 0.90\`).
   - Verifica que los datos quedan persistidos en DuckDB consultando \`get_reconciliation_history(conn)\` y comprobando que devuelve 1 sesiÃ³n vÃ¡lida.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo de aceptaciÃ³n UAT con los extractos reales del usuario antes del empaquetado final."
        >
          <PromptBlock label="Prompt 6.3 â€” Protocolo UAT Manual">
{`ActÃºa como Consultor de Calidad y Especialista en AceptaciÃ³n de Usuario (UAT).

Genera el protocolo de prueba manual de "Balance Inteligente" para que un contable valide la aplicaciÃ³n con datos reales de su empresa:

1. MATRIZ DE ESCENARIOS DE PRUEBA:
   - **Escenario 1 (Carga de Extracto Real):** Carga un CSV bancario de su entidad (Santander, BBVA, CaixaBank, Sabadell) -> Comprobar que las columnas e importes con coma se detectan automÃ¡ticamente sin error.
   - **Escenario 2 (Cierre del Ãšltimo Mes):** Ejecutar la conciliaciÃ³n del mes vencido -> Comparar el porcentaje de coincidencia automÃ¡tico con el resultado manual histÃ³rico.
   - **Escenario 3 (RevisiÃ³n de Descuadres):** Analizar 2 descuadres reales en pantalla -> Comprobar que las hipÃ³tesis generadas por la IA son coherentes con la operativa contable.
   - **Escenario 4 (ExportaciÃ³n del Dictamen):** Pulsar "Exportar Informe Markdown" -> Abrir el fichero generado y comprobar que contiene el resumen de cifras y la advertencia legal.
   - **Escenario 5 (SimulaciÃ³n Offline):** Desconectar el cable de red / WiFi y pulsar "Conciliar" -> Comprobar que la app opera con el motor heurÃ­stico local sin bloquearse.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Generar el ejecutable autÃ³nomo distribuible (.exe) de Balance Inteligente."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.emerald }}>Nota tÃ©cnica:</strong> Se genera un binario sin ventana de consola (<code className="text-xs bg-black/5 px-1 rounded-sm">console=False</code>) que empaqueta DuckDB, Flet y Pydantic v2.
          </div>
          <PromptBlock label="Prompt 6.4 â€” EspecificaciÃ³n de CompilaciÃ³n (.spec)">
{`ActÃºa como Ingeniero de Empaquetado y Despliegue de Aplicaciones de Escritorio.

Genera el archivo \`balance_inteligente.spec\` y el script de compilaciÃ³n para construir el ejecutable autÃ³nomo (\`.exe\` en Windows o binario en macOS) mediante PyInstaller:

1. CONFIGURACIÃ“N DEL ARCHIVO \`.spec\`:
   - Script de entrada: \`main.py\`.
   - InclusiÃ³n de archivos estÃ¡ticos (\`datas\`):
     * Carpeta de datasets de ejemplo: \`('demo_data', 'demo_data')\`.
     * Iconos y assets visuales: \`('assets', 'assets')\`.
   - Importaciones dinÃ¡micas (\`hiddenimports\`): \`['flet', 'duckdb', 'pydantic', 'pydantic_core', 'pydantic_settings', 'httpx', 'anyio']\`.
   - ConfiguraciÃ³n del ejecutable (\`EXE\`):
     * \`name='BalanceInteligente'\`
     * \`console=False\` (Oculta la ventana negra de terminal).
     * \`icon='assets/icon.ico'\`
     * Modo distribuible optimizado (\`onedir=True\` para arranque ultrarrÃ¡pido o \`onefile=True\`).

2. RESOLUCIÃ“N DE BINARIOS DINÃMICOS:
   - Instrucciones para asegurar que las librerÃ­as dinÃ¡micas de C++ de DuckDB y el motor Flutter de Flet queden correctamente enlazadas en mÃ¡quinas sin Python.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en mÃ¡quina limpia" 
          goal="VerificaciÃ³n y checklist formal del ejecutable en un entorno sin Python instalado."
        >
          <PromptBlock label="Prompt 6.5 â€” Checklist de ValidaciÃ³n en MÃ¡quina Limpia">
{`ActÃºa como Ingeniero de Release y Control de Calidad Final.

Genera el protocolo de verificaciÃ³n formal del ejecutable en una mÃ¡quina virtual limpia (Windows 10/11 sin Python, sin Git y sin dependencias previas):

1. CHECKLIST DE COMPROBACIONES OBLIGATORIAS:
   - [ ] **Arranque AutÃ³nomo:** Doble clic en \`BalanceInteligente.exe\` -> La ventana grÃ¡fica se despliega en menos de 3 segundos sin solicitar permisos de administrador.
   - [ ] **Carga de Datos de Ejemplo:** Acceder al diÃ¡logo de carga y seleccionar los CSVs de demostraciÃ³n incluidos en la app.
   - [ ] **EjecuciÃ³n Completa:** Pulsar "Conciliar" -> Verificar que la barra de progreso avanza fluidamente y las tablas de resultados se pueblan al 100%.
   - [ ] **ConfiguraciÃ³n Externa:** Comprobar que la app lee la clave \`BALANCE_LLM_API_KEY\` desde un archivo \`.env\` colocado en la misma carpeta del ejecutable.
   - [ ] **Persistencia Local:** Cerrar la aplicaciÃ³n, volver a abrirla y verificar que la base de datos DuckDB conserva el historial de conciliaciones previas en la ruta local del usuario.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 â€” ITERACIÃ“N Y PUBLICACIÃ“N (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={RefreshCw} 
          label="Fase 7" 
          color="rgba(17,17,17,0.4)" 
          title="IteraciÃ³n y publicaciÃ³n"
          desc="Planificar la versiÃ³n 2.0 y compartir Balance Inteligente con la comunidad de desarrolladores y auditores de Horizon." 
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog de funcionalidades para la siguiente versiÃ³n: Norma 43, MT940, remesas 1 a N y APIs de ERPs."
        >
          <PromptBlock label="Prompt 7.A â€” PlanificaciÃ³n v2">
{`ActÃºa como Product Owner y Estratega de Software Financiero.

Una vez consolidada la versiÃ³n 1.0 de "Balance Inteligente", genera el backlog tÃ©cnico y funcional estructurado para la versiÃ³n 2.0:

1. MATRIZ DE MEJORAS PROPUESTAS (en formato tabla):
| ID | Funcionalidad Propuesta | Capa Afectada | Complejidad | Prioridad | Valor Aportado |
|:---|:---|:---|:---|:---|:---|
| F2-01 | Soporte para Cuaderno Bancario Norma 43 y MT940 nativo | Capa 2 (Parsers) | Media | ALTA | Permite importar ficheros bancarios oficiales sin conversiÃ³n previa. |
| F2-02 | ConciliaciÃ³n de Remesas 1 a N (Una lÃ­nea bancaria = N facturas) | Capa 3 (Matching) | Alta | ALTA | Resuelve pagos agrupados de nÃ³minas y liquidaciones TPV. |
| F2-03 | Generador de Asientos de Ajuste Directos (A3 / Sage / Contasol) | Capa 5 (IntegraciÃ³n) | Media | MEDIA | Automatiza la contabilizaciÃ³n de comisiones y diferencias de redondeo. |
| F2-04 | ConexiÃ³n Open Banking / PSD2 para descarga directa de bancos | Capa 2 (Data Fetch) | Alta | BAJA (v3) | Elimina la descarga manual de ficheros CSV. |

2. REQUISITOS DE COMPLIANCE PARA V2:
- AnÃ¡lisis de implicaciones de seguridad, cifrado en reposo y custodia de credenciales para conectores bancarios automÃ¡ticos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Generar la ficha tÃ©cnica formal de presentaciÃ³n de Balance Inteligente para el Foro Horizon."
        >
          <PromptBlock label="Prompt 7.B â€” Ficha para el Foro">
{`ActÃºa como Tech Lead y Portavoz del Proyecto en la Comunidad Horizon.

Genera la ficha tÃ©cnica formal de presentaciÃ³n de "Balance Inteligente v1" para su publicaciÃ³n en el Foro de Proyectos Horizon:

1. ESTRUCTURA DE LA FICHA:
- TÃ­tulo: Balance Inteligente v1 â€” ConciliaciÃ³n Bancaria Determinista y DiagnÃ³stico Contable Asistido por IA
- Ãrea TemÃ¡tica: Contabilidad Financiera, AuditorÃ­a ERP & AutomatizaciÃ³n.
- Resumen Ejecutivo (MÃ¡ximo 120 palabras): AplicaciÃ³n de escritorio desarrollada en Python y Flet que resuelve el cierre contable mensual conciliando extractos bancarios y libros mayores en segundos, combinando un motor determinista 1-a-1 con diagnÃ³stico inteligente de descuadres sin alucinaciones numÃ©ricas.
- Arquitectura y Stack: Python 3.11+, Flet (Flutter UI), Pydantic v2 (Strict Decimal Types), DuckDB (OLAP local inmutable), Pytest y PyInstaller.
- Diferenciadores TÃ©cnicos:
  1. Desacople estricto entre lÃ³gica matemÃ¡tica determinista e inferencia explicativa.
  2. Blindaje de privacidad Zero-PII y modo 100% offline garantizado.
  3. Trazabilidad completa con sellado SHA-256 en cada informe exportado.
- Instrucciones RÃ¡pidas de Uso (3 pasos): Descargar .exe, cargar ficheros CSV y pulsar "Conciliar".
- Pregunta de Debate para la Comunidad: Â¿QuÃ© margen de tolerancia temporal (dÃ­as fecha valor vs. fecha contable) considerÃ¡is mÃ¡s adecuado para conciliaciones comerciales internacionales en vuestras empresas?`}
          </PromptBlock>
        </Step>

        {/* â”€â”€â”€ Recuadro de Resultado Final â”€â”€â”€ */}
        <div 
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "white", border: "1px solid rgba(5,150,105,0.2)" }}
        >
          <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: "rgba(5,150,105,0.1)" }}
          >
            <Check size={22} style={{ color: C.emerald }} />
          </div>
          <h2 className="font-display text-2xl mb-3" style={{ color: C.dark }}>
            Resultado final
          </h2>
          <p 
            className="text-base leading-relaxed mb-6 max-w-[520px] mx-auto"
            style={{ color: "rgba(17,17,17,0.6)" }}
          >
            Un ejecutable de <strong style={{ color: C.dark }}>Balance Inteligente</strong> que importa dos CSV, concilia en segundos y exporta un informe con las diferencias explicadas por el modelo lÃ­der en contabilidad â€” sin Python instalado ni conexiÃ³n a ningÃºn ERP.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              to="/foro"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ background: C.emerald, color: "white" }}
            >
              Publicar en el Foro <ChevronRight size={14} />
            </Link>
            <Link 
              to="/taller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: "rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.6)" }}
            >
              Volver al Taller
            </Link>
          </div>
        </div>

        {/* â”€â”€â”€ Extensiones de VersiÃ³n â”€â”€â”€ */}
        <VersionExtensions versions={VERSIONS} />

        <div className="h-16" />
      </div>
    </div>
  );
}

