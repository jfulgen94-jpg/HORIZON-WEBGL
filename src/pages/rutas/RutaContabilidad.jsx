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

// ─── Tools table data ─────────────────────────────────────────────────────────
const TOOLS_TABLE = [
  { capa: "Fase 0", subcapa: "Investigación", herramienta: "Laboratorio Contabilidad · BizFinBench · AuditBench", motivo: "Confirmar qué modelos lideran razonamiento contable antes de elegir." },
  { capa: "1", subcapa: "1.1–1.6", herramienta: "Documento de definición", motivo: "Precisar tipo de conciliación y usuario final." },
  { capa: "2", subcapa: "2.1", herramienta: "csv (stdlib) · pandas", motivo: "Leer extractos bancarios CSV con distintos formatos de fecha e importe." },
  { capa: "2", subcapa: "2.2", herramienta: "Pydantic v2", motivo: "Esquemas estrictos para transacciones bancarias y asientos ERP." },
  { capa: "2", subcapa: "2.3", herramienta: "Pydantic validators · Decimal", motivo: "Normalizar importes con precisión contable (no float)." },
  { capa: "2", subcapa: "2.4", herramienta: "DuckDB", motivo: "Historial de conciliaciones y consultas SQL para auditoría." },
  { capa: "2", subcapa: "2.5", herramienta: "Python dict / JSON", motivo: "Dataset de 20 transacciones con 2 descuadres intencionales." },
  { capa: "3", subcapa: "3.1", herramienta: "data_accounting/rankings/", motivo: "Seleccionar modelo con mejor score en BizFinBench_ERP." },
  { capa: "3", subcapa: "3.2", herramienta: "Python puro (determinista)", motivo: "El matching es lógica de negocio, no IA: tolerancia ±3 días, importe exacto ±0,01." },
  { capa: "3", subcapa: "3.3", herramienta: "httpx · openai SDK [VERIFICAR DOCS]", motivo: "Llamada al LLM para explicar descuadres no conciliados." },
  { capa: "3", subcapa: "3.4", herramienta: "json.loads · Pydantic", motivo: "Estructurar las causas devueltas por el LLM." },
  { capa: "3", subcapa: "3.5", herramienta: "Pydantic validators", motivo: "Verificar que las causas son genéricas, sin datos inventados." },
  { capa: "3", subcapa: "3.6", herramienta: "try/except", motivo: "Si falla el LLM, marcar para revisión manual sin bloquear." },
  { capa: "4", subcapa: "4.1", herramienta: "Papel / Excalidraw", motivo: "Definir las 3 pantallas antes de codificar." },
  { capa: "4", subcapa: "4.2–4.5", herramienta: "Flet", motivo: "Carga de archivos y tablas grandes en pocas líneas." },
  { capa: "5", subcapa: "5.1–5.5", herramienta: "Flet · DuckDB · python-dotenv", motivo: "Conectar capas y gestionar configuración." },
  { capa: "6", subcapa: "6.1–6.2", herramienta: "Pytest", motivo: "Tests del algoritmo de matching y parseo de CSV." },
  { capa: "6", subcapa: "6.3", herramienta: "Extractos reales del usuario", motivo: "Validación con datos reales antes de empaquetar." },
  { capa: "6", subcapa: "6.4", herramienta: "PyInstaller", motivo: "Ejecutable distribuible." },
  { capa: "6", subcapa: "6.5", herramienta: "VM sin Python", motivo: "Prueba en entorno limpio." },
  { capa: "Fase 7", subcapa: "Iteración", herramienta: "Foro Horizon", motivo: "Publicar y recoger feedback de contadores y auditores." },
];

// ─── Version extensions ──────────────────────────────────────────────────────—€
const VERSIONS = [
  {
    tag: "v2 · Impuestos",
    area: "Contabilidad fiscal",
    title: "Fisco Cero — Asistente de cierre fiscal",
    desc: "Misma arquitectura de Balance Inteligente aplicada al análisis de declaraciones de IVA e IS: detecta discrepancias entre los libros y las declaraciones presentadas, y explica cada diferencia.",
    badgeBg: "rgba(239,68,68,0.10)", badgeColor: "#DC2626",
    changes: [
      "Capa 2: nuevos esquemas para declaraciones trimestrales (Modelo 303, Modelo 200)",
      "Capa 3: el LLM compara bases imponibles declaradas vs. calculadas desde los libros",
      "Capa 3: el prompt añade instrucción de citar el artículo de la ley del IVA relevante",
      "Capa 4: tabla de períodos fiscales en lugar de rango de fechas libre",
      "Advertencia: los hallazgos no son asesoramiento fiscal; revisar con asesor tributario",
    ],
  },
  {
    tag: "v2 · Activos",
    area: "Contabilidad de activos",
    title: "Atlas Activos — Control de amortizaciones",
    desc: "Importa el registro de activos fijos y verifica que las amortizaciones contabilizadas son coherentes con el método y los años de vida útil declarados, señalando desviaciones con causa explicada.",
    badgeBg: "rgba(5,150,105,0.10)", badgeColor: "#059669",
    changes: [
      "Capa 2: esquema para FixedAsset (fecha alta, coste, método amortización, vida útil)",
      "Capa 3: algoritmo determinista calcula la amortización teórica y la compara con la real",
      "Capa 3: el LLM explica causas de desviación (cambio de método, baja parcial, etc.)",
      "Capa 4: gráfico de amortización acumulada por activo (Flet Chart si disponible)",
      "Capa 6: dataset de ejemplo con 10 activos y 2 desviaciones intencionales",
    ],
  },
  {
    tag: "v2 · Intercompany",
    area: "Grupos empresariales",
    title: "Nexo Grupo — Conciliación intercompany",
    desc: "Extiende Balance Inteligente a grupos de empresas: cruza las transacciones intercompany declaradas por cada entidad, detecta asimetrías y genera el informe de eliminaciones para la consolidación.",
    badgeBg: "rgba(59,111,212,0.10)", badgeColor: C.accent,
    changes: [
      "Capa 1: el usuario define hasta N entidades del grupo con sus extractos CSV",
      "Capa 2: esquema MultiEntity con mapa de relaciones entre entidades",
      "Capa 3: el algoritmo cruza transacciones bidireccionales (Aâ†’B y Bâ†’A deben coincidir)",
      "Capa 3: el LLM explica asimetrías (desfases de fecha, diferencias de tipo de cambio)",
      "Capa 4: vista consolidada del grupo con semáforo por entidad",
    ],
  },
];

// ─── Main component ─────────────────────────────────────────────────────────—
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
            Contabilidad & ERP · Ruta completa
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4"
            style={{ color: C.dark, lineHeight: 1.05 }}>
            Balance Inteligente
          </h1>
          <p className="text-lg leading-relaxed mb-6"
            style={{ color: "rgba(17,17,17,0.55)", maxWidth: 620 }}>
            App de escritorio que importa extractos bancarios y registros ERP, los concilia automáticamente detectando descuadres, y genera un informe de auditoría con las diferencias explicadas por IA.
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

        {/* Human validation warning */}
        <HumanValidationWarning />

        {/* Map overview */}
        <div className="rounded-2xl p-6 mb-8 border" style={{ background: "white", borderColor: "rgba(17,17,17,0.08)" }}>
          <h2 className="font-display text-lg mb-4" style={{ color: C.dark }}>Mapa de la ruta</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Fase 0", desc: "Investigación — benchmarks contables", color: "#7C3AED" },
              { label: "Capa 1", desc: "Definición del problema", color: C.accent },
              { label: "Capa 2", desc: "Datos — CSV, Pydantic, DuckDB", color: C.emerald },
              { label: "Capa 3", desc: "Lógica / IA — matching + LLM", color: C.amber },
              { label: "Capa 4", desc: "Interfaz de escritorio (Flet)", color: "#0891B2" },
              { label: "Capa 5", desc: "Integración y gestión de errores", color: C.red },
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
          desc="Confirmar qué benchmarks y qué modelos respaldan la idea de Balance Inteligente antes de escribir una sola línea de código." />

        <Step num="0.A" title="Benchmarks contables clave"
          goal="Identificar qué benchmarks del laboratorio evalúan tareas de conciliación y ERP, y qué modelo lidera esas tareas.">
          <PromptBlock label="Prompt 0.A — Benchmarks contables">{`Actúa como Investigador Principal de Benchmarks de Inteligencia Artificial especializado en Finanzas y Contabilidad Corporativa.

Tengo como objetivo seleccionar el modelo fundacional más preciso para una aplicación de conciliación bancaria y auditoría contable llamada "Balance Inteligente".

Analiza los benchmarks de dominio contable (BizFinBench, AuditBench, FinBen_Accounting) y responde de forma rigurosa y técnica a los siguientes puntos:

1. METODOLOGÍA DE EVALUACI“N:
   - ¿Qué métricas específicas evalúan BizFinBench y AuditBench en tareas de:
     a) Casación de asientos contables (Journal entry matching).
     b) Detección de descuadres y anomalías contables.
     c) 3-Way Matching (Factura vs. Albarán vs. Pedido de compra).

2. RANKING DE RENDIMIENTO DE MODELOS:
   - Basándote en datos empíricos de BizFinBench_ERP y AuditBench, ¿qué modelos actuales (Claude 3.5/3.7, GPT-4o, DeepSeek-R1, Gemini 1.5/2.0 Pro) obtienen la mayor tasa de acierto y menor tasa de alucinación en razonamiento deductivo contable?

3. POLÍTICA DE SELECCI“N:
   - Define el criterio técnico para justificar si la explicación de un descuadre debe delegarse a un LLM grande (Cloud API) o si es viable mediante un modelo SLM local (Small Language Model tipo Llama-3.1-8B-Instruct o Mistral-7B).

REGLAS ESTRICTAS:
- No inventes nombres de métricas ni scores ficticios.
- Si citas capacidades de un modelo, especifica si destaca en razonamiento estructurado (JSON mode) o en comprensión semántica de conceptos bancarios.`}</PromptBlock>
        </Step>
        <Step num="0.B" title="Viabilidad técnica de la conciliación automática"
          goal="Confirmar si es técnicamente posible conciliar CSV bancario con CSV ERP, y qué papel juega el LLM.">
          <PromptBlock label="Prompt 0.B — Viabilidad técnica">{`Actúa como Arquitecto de Software Financiero y Especialista en Sistemas ERP (SAP S/4HANA, Oracle NetSuite, Sage, A3).

Antes de iniciar la codificación de "Balance Inteligente", necesito una memoria de viabilidad técnica sobre los estándares de interoperabilidad bancaria y contable:

1. ESPECIFICACI“N DE FORMATOS DE ENTRADA:
   - Detalla la estructura de campos requerida para procesar extractos bancarios en:
     a) Cuaderno bancario español Norma 43 (CSB 43 / AEB 43).
     b) Estándar internacional ISO 20022 (CAMT.053 XML).
     c) Extracto bancario tabular genérico (CSV).
   - Define qué columnas mínimas del Libro Mayor (Cuenta 572 - Tesorería) son indispensables en el archivo exportado desde el ERP (Fecha apunte, Fecha valor, Documento, Concepto, Debe, Haber, Saldo, Referencia).

2. ARQUITECTURA DE DESACOPLE (Determinismo vs. IA):
   - Justifica por qué el algoritmo de casación (Matching) DEBE ser 100% determinista en Python puro, y por qué el LLM debe utilizarse šNICAMENTE en la capa posterior de explicación y diagnóstico de discrepancias.

3. TAXONOMÍA DE DESCUADRES BANCARIOS:
   - Clasifica los 5 motivos más recurrentes de descuadre en auditoría contable (Decalaje fecha valor, comisiones bancarias no contabilizadas, cobros de remesas agrupadas, retenciones fiscales imprevistas y errores tipográficos de dígito invertido).`}</PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 1 — DEFINICI“N DEL PROBLEMA (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={BookOpen} 
          label="Capa 1" 
          color={C.accent} 
          title="Definición del problema"
          desc="Seis preguntas que definen con precisión técnica y contable qué construyes, para quién y bajo qué criterios de éxito estará terminado el software." 
        />

        {[
          [
            "1.1", 
            "¿Quién usa esta app?", 
            "Definir si el usuario es contable de pyme, auditor externo o controller financiero.",
            `Actúa como Analista de Producto y Especialista en Flujos de Trabajo Contables.

Define la ficha formal del perfil de usuario (User Persona) para "Balance Inteligente", una aplicación de escritorio que automatiza la conciliación entre extractos bancarios y el libro mayor con diagnóstico de descuadres por IA.

Genera una ficha técnica con los siguientes apartados:
1. IDENTIFICACI“N Y ROL:
   - Nombre ficticio y puesto (ej. Responsable de Contabilidad / Controller Financiero en PYME o Asesoría Externa).
   - Volumen operativo: 500 a 3.000 transacciones mensuales distribuidas en 3 cuentas bancarias principales.
2. FLUJO DE TRABAJO ACTUAL (Pain Points):
   - Proceso manual actual: Cotejo fila a fila en Microsoft Excel con fórmulas BUSCARV / XLOOKUP y coloreado manual de celdas.
   - Tiempo invertido: Entre 3 y 5 horas por cada cierre mensual y bancario.
   - Puntos críticos de frustración: Descuadres por comisiones bancarias no registradas, transacciones agrupadas en remesas y errores tipográficos de dígito invertido.
3. ENTORNO TECNOL“GICO Y FORMATOS REALES:
   - Formato bancario disponible: Extractos en formato CSV delimitado por punto y coma (banca española / internacional) y cuadernos Norma 43.
   - Formato ERP: Exportación del Libro Mayor (Cuenta 572 - Tesorería) en CSV / Excel desde ERPs como SAP, Sage 50/200, A3 o Contasol.
   - Nivel técnico: Usuario avanzado en hojas de cálculo y conceptos contables, pero sin conocimientos de programación ni consola de comandos (requiere ejecutable gráfico .exe).`
          ],
          [
            "1.2", 
            "¿Qué problema concreto resuelve?", 
            "Una frase precisa del problema contable que Balance Inteligente resuelve.",
            `Actúa como Especialista en Propuesta de Valor y Arquitectura de Software Financiero.

Basándote en el perfil del contable de PYME y asesorías, escribe UNA SOLA FRASE MAESTRA que defina el problema nuclear que Balance Inteligente resuelve.

Sigue estrictamente la siguiente estructura formal:
"[ROL CONTABLE] invierte [TIEMPO EN HORAS] mensuales en conciliar manualmente [VOLUMEN] transacciones bancarias con su ERP debido a [DISCREPANCIAS EN FECHAS, REDONDEOS Y FORMATOS HETEROGÃ‰NEOS], lo que provoca [RETRASOS EN EL CIERRE, RIESGO FISCAL Y COSTE EN HORAS IMPRODUCTIVAS]."

Genera:
1. TRES VARIANTES con matices (Enfoque en Ahorro de Tiempo, Enfoque en Precisión Contable y Enfoque en Auditoría).
2. Justificación técnica de la variante ganadora.
3. Declaración de Alcance Honesto:
   - ¿Qué parte del proceso resuelve la app al 100% de forma autónoma? (El matching determinista y la detección de diferencias).
   - ¿Qué parte del proceso sigue requiriendo juicio humano? (La validación final de asientos de ajuste y la regularización en el ERP).`
          ],
          [
            "1.3", 
            "¿Qué datos entran?", 
            "Listar exactamente qué archivos y parámetros necesita la app.",
            `Actúa como Ingeniero de Datos y Diseñador de Contratos de Entrada para Software Financiero.

Define la especificación exhaustiva de todas las entradas (Inputs) requeridas por Balance Inteligente para ejecutar la conciliación:

1. FICHERO A — EXTRACTO BANCARIO:
   - Formatos admitidos: CSV (delimitado por , ; \\t) y Norma 43 (CSB 43).
   - Columnas obligatorias: Fecha de operación, Fecha valor, Concepto/Descripción, Importe (con signo o columna Debe/Haber) y Saldo resultante.
   - Reglas de autodetección: Detección automática de codificación (UTF-8, UTF-8-BOM, Latin-1) y separador decimal (coma europea vs. punto anglosajón).

2. FICHERO B — LIBRO MAYOR ERP (Cuentas 572):
   - Formato admitido: CSV o JSON exportado del software contable.
   - Columnas requeridas: Fecha de apunte, Número de asiento/documento, Código de subcuenta, Concepto, Importe Debe, Importe Haber y Saldo.

3. PARÁMETROS DE CONFIGURACI“N OPERATIVA:
   - Rango temporal: Fecha inicial y Fecha final del período contable.
   - Tolerancia de fechas: Margen configurable de decalaje bancario (por defecto: ±3 días hábiles).
   - Tolerancia de importes: Margen para diferencias de redondeo o microcomisiones (por defecto: ±0.00 â‚¬ o ±0.05 â‚¬).`
          ],
          [
            "1.4", 
            "¿Qué sale?", 
            "Definir los outputs: tabla de matches, lista de descuadres, informe exportable.",
            `Actúa como Diseñador de Datos y Especialista en Reporting de Auditoría.

Define los contratos de salida (Outputs) que producirá Balance Inteligente tras procesar una sesión de conciliación:

1. TABLA INTERACTIVA DE PARTIDAS CONCILIADAS (Matched Records):
   - Muestra las parejas confirmadas: [ID Banco, Fecha Banco, Concepto Banco, Importe] <===> [ID ERP, Asiento ERP, Fecha ERP, Concepto ERP, Importe].
   - Tipo de coincidencia clasificada: EXACT_MATCH (1.0), DATE_TOLERANCE (0.85), FUZZY_DESCRIPTION (0.70).

2. PANEL DE DESCUADRES Y DISCREPANCIAS (Unmatched Records):
   - Lista A: Movimientos bancarios sin asiento ERP (ej. comisiones no registradas o cargos imprevistos).
   - Lista B: Asientos ERP sin movimiento bancario (ej. cheques emitidos no cobrados o provisiones pendientes).
   - Diagnóstico IA: 3 hipótesis contables plausibles y breves sobre la causa del descuadre, con badge de verificación.

3. RESUMEN EJECUTIVO Y MÃ‰TRICAS GLOBALES:
   - Cobertura de conciliación (% Casado sobre el total).
   - Sumatorio Total Debe vs. Haber vs. Movimientos Bancarios.
   - Descuadre Neto Total (â‚¬).

4. INFORME AUDITABLE EXPORTABLE (Markdown y PDF):
   - Documento formal descargable con marca de tiempo UTC, parámetros utilizados, tablas de descuadres y hash SHA-256 de integridad.`
          ],
          [
            "1.5", 
            "Criterios de éxito", 
            "Métricas verificables para saber cuándo está terminado y funciona.",
            `Actúa como QA Lead y Auditor Técnico de Software Contable.

Define los Criterios de Aceptación Cuantitativos (DoD - Definition of Done) para certificar que Balance Inteligente v1 funciona correctamente y está lista para entrega:

Genera entre 6 y 8 criterios formulados estrictamente bajo la estructura:
"La aplicación se considera correcta y lista para producción cuando [CONDICI“N VERIFICABLE Y MEDIBLE]."

Incluye obligatoriamente:
1. PRECISI“N DEL MATCHING: "El algoritmo determinista empareja el 100% de las transacciones del dataset sintético oficial que comparten importe exacto y fecha dentro del margen."
2. RESILIENCIA DE INGESTA: "La aplicación procesa sin fallos ni bloqueos archivos CSV con formato de número europeo (1.234,56 â‚¬) y anglosajón (1,234.56 $), detectando automáticamente el delimitador."
3. RENDIMIENTO TEMPORAL: "El procesamiento y cuadre de 2.000 líneas contables se completa en menos de 2.5 segundos en local."
4. ROBUSTEZ ANTE DESCONEXI“N: "Si la máquina no tiene acceso a internet o la API de IA no responde, la app completa la conciliación y muestra las hipótesis heurísticas locales sin emitir errores no controlados."
5. EXPORTABILIDAD: "El informe generado en Markdown y PDF se abre y renderiza correctamente en cualquier visor estándar, incluyendo el resumen numérico y el descargo legal."`
          ],
          [
            "1.6", 
            "Límites explícitos de la v1", 
            "Decidir qué formatos y funcionalidades NO incluye la v1.",
            `Actúa como Product Owner Senior y Especialista en Gestión de Riesgo de Software.

Define la Declaración Formal de Límites y Exclusiones para la versión 1.0 de Balance Inteligente con el objetivo de acotar el alcance y garantizar una entrega robusta:

1. FORMATOS Y CONECTORES EXCLUIDOS DE LA V1:
   - No soporte para conexión directa vía API bancaria PSD2 / Open Banking (requiere carga manual de fichero CSV / Norma 43).
   - No integración directa por API a bases de datos de ERPs (SAP RFC, Oracle WebServices) para evitar dependencias de credenciales corporativas complejas.
   - No procesamiento de documentos PDF escaneados sin digitalizar previamente.

2. FUNCIONALIDADES POSTPUESTAS PARA V2:
   - No generación ni inyección automática de asientos correctivos en el libro diario del ERP sin supervisión.
   - No gestión de conciliación multimoneda con tipos de cambio fluctuantes en tiempo real.
   - No conciliación compleja de remesas 1 a N (agrupación de N facturas en un único pago bancario).

3. DECLARACI“N DE EXENCI“N DE RESPONSABILIDAD (Legal Disclaimer):
   - Redacta el texto legal formal que aparecerá en la pantalla de inicio y en los informes exportados, advirtiendo que la aplicación es una herramienta de asistencia contable que no sustituye la obligación legal de auditoría y supervisión del profesional financiero.`
          ]
        ].map(([num, title, goal, prompt]) => (
          <Step key={num} num={num} title={title} goal={goal}>
            <PromptBlock label={`Prompt ${num}`}>{prompt}</PromptBlock>
          </Step>
        ))}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 2 — DATOS (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Layers} 
          label="Capa 2" 
          color={C.emerald} 
          title="Datos"
          desc="Lectura de archivos, modelos de datos, validación de importes y almacenamiento histórico." 
        />

        <Step 
          num="2.1" 
          title="Fuente de datos" 
          goal="Lectura de CSV del extracto bancario y del libro mayor con detección automática de columnas."
        >
          <PromptBlock label="Prompt 2.1 — Lectura de archivos">
{`Actúa como Ingeniero de Datos Senior en Python especializado en sistemas financieros.

Escribe un módulo robusto llamado \`parsers.py\` para la lectura e ingesta de extractos bancarios y libros mayores contables en formato tabular:

1. ESPECIFICACI“N DE FUNCIONES:
   - \`read_bank_statement(file_path: Path) -> list[dict]\`:
     * Utiliza \`csv.Sniffer\` para detectar automáticamente el delimitador del archivo (',', ';', '\\t', '|').
     * Soporta múltiples codificaciones sin lanzar excepciones de decodificación ('utf-8', 'utf-8-sig' con BOM de Excel, 'latin-1' / 'cp1252').
     * Mapea dinámicamente cabeceras heterogéneas mediante alias:
       - Fecha: ['fecha', 'f. operacion', 'date', 'booking_date'] -> \`transaction_date\`
       - Fecha Valor: ['fecha valor', 'f. valor', 'value_date'] -> \`value_date\`
       - Concepto: ['concepto', 'descripcion', 'detalle', 'narrative'] -> \`description\`
       - Importe: ['importe', 'monto', 'cantidad', 'amount'] -> \`amount\`
       - Saldo: ['saldo', 'balance', 'saldo resultante'] -> \`balance\`
     * Limpia espacios redundantes y caracteres de control en las cadenas de texto.

   - \`read_erp_ledger(file_path: Path) -> list[dict]\`:
     * Soporta exportaciones estándar del Libro Mayor (Cuenta 572) desde SAP, Sage, A3 o Contasol.
     * Identifica automáticamente si el archivo contiene columnas de 'Debe' y 'Haber' separadas o una columna única de 'Importe' con signo.

2. GESTI“N DE ERRORES:
   - Define la excepción \`DataIngestionError(Exception)\` que incluye: \`file_path\`, \`row_number\`, \`raw_content\` y \`missing_columns\`.
   - Si el archivo está vacío o carece de cabeceras reconocibles, lanza un error explicativo que informe al usuario del formato esperado.

3. REQUISITOS TÃ‰CNICOS:
   - Usa \`pathlib.Path\`, \`csv\` de la librería estándar o \`pandas\`.
   - Prohibido utilizar rutas hardcodeadas en el código.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.2" 
          title="Esquema de datos con Pydantic" 
          goal="Modelos para transacciones bancarias, asientos ERP y resultados de conciliación."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.emerald }}>Modelos clave:</strong> BankTransaction · ERPEntry · ReconciliationMatch · ReconciliationResult
          </div>
          <PromptBlock label="Prompt 2.2 — Esquema Pydantic">
{`Actúa como Arquitecto de Software Python y Especialista en Modelado Financiero.

Crea el archivo \`schemas.py\` con los modelos de dominio para "Balance Inteligente" utilizando Pydantic v2 con tipado estricto y precisión contable:

1. ESPECIFICACI“N DE MODELOS DE DOMINIO:
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
       account_code: str = Field(..., pattern=r"^[0-9]{3,10}$", description="Código de cuenta contable PGC")
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

2. REGLAS DE VALIDACI“N:
   - Prohíbe estrictamente el uso del tipo nativo \`float\` para importes monetarios.
   - Aplica validadores \`@field_validator\` para convertir automáticamente strings numéricos a \`Decimal\` redondeando a 2 decimales.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.3" 
          title="Validación y normalización de importes" 
          goal="Función que normaliza importes detectando coma decimal española, espacios como separadores de miles, etc."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.amber }}>Punto crítico:</strong> CSV bancarios españoles usan coma decimal (1.234,56). Usa <code className="text-xs bg-black/5 px-1 rounded-sm">Decimal</code>, nunca <code className="text-xs bg-black/5 px-1 rounded-sm">float</code>.
          </div>
          <PromptBlock label="Prompt 2.3 — Normalización de importes">
{`Actúa como Especialista en Limpieza de Datos Financieros y Calidad de Código.

Crea el módulo \`normalizers.py\` con funciones puras y pruebas unitarias exhaustivas para normalizar formatos numéricos y fechas heterogéneas:

1. FUNCI“N \`normalize_amount(raw_value: Any) -> Decimal\`:
   - Detecta automáticamente si el número utiliza:
     * Notación española / europea: '1.234.567,89 â‚¬' -> Decimal('1234567.89')
     * Notación anglosajona: '1,234,567.89 $' -> Decimal('1234567.89')
     * Formato plano: '1234.56' o '1234,56'
   - Regla de desambiguación: Si coexisten coma y punto en la misma cadena, el último carácter que aparece actúa como separador decimal.
   - Tratamiento de convenciones contables especiales:
     * Importes entre paréntesis: '(1.500,00)' -> Decimal('-1500.00')
     * Signo negativo al final: '1.500,00-' -> Decimal('-1500.00')
   - Limpieza automática de símbolos de moneda ('â‚¬', '$', '£', 'EUR', 'USD') y espacios de no separación ('\\xa0').
   - Lanza \`ValueError\` con el valor original en el mensaje si la cadena no es convertible a número.

2. FUNCI“N \`normalize_date(raw_date: Any, date_hint: Optional[str] = None) -> date\`:
   - Evalúa de forma jerárquica los formatos: 'DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY'.
   - Soporta marcas de tiempo ISO 8601 completas ('2025-11-30T14:32:00Z' -> date(2025, 11, 30)).

3. TESTS UNITARIOS ASOCIADOS (con \`pytest\`):
   - Incluye casos límite: importes en cero ('0,00'), importes de 1 céntimo ('0,01'), negativos con espacio ('- 450,20'), años bisiestos ('29/02/2024') y cadenas no numéricas ('N/A', 'NULL', '--').`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.4" 
          title="Almacenamiento en DuckDB" 
          goal="Base de datos que guarda el historial de conciliaciones para consulta y auditoría."
        >
          <PromptBlock label="Prompt 2.4 — Persistencia DuckDB">
{`Actúa como Ingeniero de Bases de Datos y Especialista en Persistencia Analítica OLAP.

Crea el módulo \`storage.py\` para la persistencia transaccional del historial de conciliaciones utilizando DuckDB embebido:

1. ESQUEMA RELACIONAL Y TABLAS (\`~/.balance_inteligente/data/reconciliations.duckdb\`):
   - Escribe \`init_reconciliation_db(db_path: Path) -> duckdb.DuckDBPyConnection\` que crea las tablas con claves foráneas e índices:
     * \`reconciliation_sessions\` (session_id VARCHAR PRIMARY KEY, period_start DATE, period_end DATE, total_bank_amount DECIMAL, total_erp_amount DECIMAL, net_discrepancy DECIMAL, reconciliation_rate FLOAT, created_at TIMESTAMP, user_name VARCHAR)
     * \`bank_transactions\` (id VARCHAR, session_id VARCHAR, transaction_date DATE, value_date DATE, description VARCHAR, amount DECIMAL, reference VARCHAR, is_matched BOOLEAN)
     * \`erp_entries\` (id VARCHAR, session_id VARCHAR, posting_date DATE, account_code VARCHAR, description VARCHAR, debit DECIMAL, credit DECIMAL, net_amount DECIMAL, is_matched BOOLEAN)
     * \`reconciliation_matches\` (match_id VARCHAR, session_id VARCHAR, bank_id VARCHAR, erp_id VARCHAR, match_type VARCHAR, amount_diff DECIMAL, confidence_score FLOAT)

2. OPERACIONES TRANSACCIONALES:
   - \`store_reconciliation(conn, result: ReconciliationResult) -> str\`: Guarda toda la sesión de conciliación de forma atómica en una única transacción (\`BEGIN TRANSACTION ... COMMIT\`).
   - \`get_reconciliation_history(conn, limit: int = 30) -> list[dict]\`: Devuelve el listado cronológico de sesiones previas con sus KPIs para el panel de control.
   - \`export_reconciliation_csv(conn, session_id: str, output_dir: Path) -> tuple[Path, Path]\`: Exporta dos ficheros CSV (uno para matches confirmados y otro para descuadres) para su apertura en Excel.

3. CONTROL DE CONCURRENCIA Y BLOQUEOS:
   - Implementa un gestor de contexto (\`with\`) para asegurar el cierre de conexiones y evitar bloqueos de ficheros en Windows.`}
          </PromptBlock>
        </Step>

        <Step 
          num="2.5" 
          title="Dataset mínimo de ejemplo" 
          goal="Dos archivos CSV con 20 transacciones (18 conciliables + 2 descuadres intencionales)."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(59,111,212,0.05)", borderLeft: "3px solid " + C.accent, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.accent }}>Descuadres a incluir:</strong> 1 por diferencia de fecha · 1 por diferencia de importe (â‚¬1.234,56 banco vs â‚¬1.234,50 ERP)
          </div>
          <PromptBlock label="Prompt 2.5 — Dataset de ejemplo">
{`Actúa como QA Engineer y Generador de Datos Sintéticos Financieros.

Crea un script \`generate_demo_dataset.py\` que genere dos archivos CSV de prueba para el mes de noviembre de 2025 con 20 transacciones y 2 descuadres controlados:

1. FICHERO 1: \`sample_bank_statement.csv\` (Extracto Bancario):
   - 20 movimientos representativos (Nóminas SEPA, Pago Proveedores, Cuotas Seguridad Social, Liquidación TPV, Recibo de Suministros).
   - Formato: Fechas en 'DD/MM/YYYY' e importes con coma decimal y formato español ('1.234,56 â‚¬').
   - Columnas: \`fecha\`, \`concepto\`, \`importe\`, \`saldo\`.

2. FICHERO 2: \`sample_erp_ledger.csv\` (Libro Mayor Cuenta 5720001):
   - 20 asientos contables con número de asiento y contrapartidas.
   - Columnas: \`fecha_asiento\`, \`cuenta\`, \`descripcion\`, \`debe\`, \`haber\`, \`documento\`.

3. DESCUADRES INTENCIONALES CONFIGURADOS:
   - **Descuadre 1 (Diferencia de fecha por decalaje):** Asiento en ERP contabilizado el 28/11/2025 correspondiente a una transferencia bancaria con fecha valor de abono el 01/12/2025.
   - **Descuadre 2 (Diferencia de importe):** Pago por transferencia bancaria de 1.234,56 â‚¬ registrado erróneamente en el ERP por 1.234,50 â‚¬ (diferencia de 0,06 â‚¬ por error de tipeo).
   - **Descuadre 3 (Comisión no contabilizada):** Comisión de mantenimiento bancario de 25,00 â‚¬ en banco sin contrapartida en el ERP.
   - **Descuadre 4 (Asiento pendiente de pago):** Provisión de gastos de auditoría de 800,00 â‚¬ en ERP sin cargo en cuenta.

4. C“DIGO DE VALIDACI“N:
   - Incluye una función de prueba que lee ambos archivos con \`parsers.py\`, valida contra los esquemas Pydantic y confirma que se detectan exactamente las 18 coincidencias y los 2 descuadres principales.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 3 — L“GICA / IA (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Cpu} 
          label="Capa 3" 
          color={C.amber} 
          title="Lógica / IA"
          desc="Algoritmo determinista de conciliación + LLM para explicar causas de descuadres + control antialucinación." 
        />

        <Step 
          num="3.1" 
          title="Selección del modelo LLM" 
          goal="Elegir el modelo con mejor performance en tareas contables para explicar los descuadres."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(17,17,17,0.04)", borderLeft: "3px solid rgba(17,17,17,0.15)", color: "rgba(17,17,17,0.65)" }}
          >
            El LLM <strong>no hace la conciliación</strong> — eso lo hace el algoritmo determinista en Python. El LLM solo diagnostica las causas posibles de los descuadres.
          </div>
          <PromptBlock label="Prompt 3.1 — Selección del modelo">
{`Actúa como Investigador de Inteligencia Artificial especializado en Modelos Contables y Auditoría.

Para "Balance Inteligente", define el criterio de selección del modelo fundacional para explicar las causas de los descuadres contables:

1. ANÁLISIS DE BENCHMARKS SECTORIALES:
   - Según los rankings de BizFinBench_ERP y AuditBench, identifica los 2 modelos comerciales (ej. Claude 3.5 Sonnet, GPT-4o) y el modelo open-source líder (ej. DeepSeek-R1 / Llama-3.3-70B) con mayor precisión en deducción contable.
   - Justifica por qué el LLM NO debe realizar la conciliación numérica (tarea reservada al algoritmo determinista en Python) y solo debe diagnosticar hipótesis conceptuales.

2. ESTIMACI“N DE COSTES Y LATENCIA:
   - Para un lote de 20 descuadres por cierre mensual (~300 tokens de contexto y ~150 tokens de salida por llamada), calcula el coste operativo aproximado por sesión.
   - Especifica los parámetros recomendados para la llamada: temperature=0.1 o 0.2 (máximo determinismo) y timeout=20s.

3. DIRECTRICES DE PRIVACIDAD:
   - Obligación de sanitizar datos personales (PII), IBANs y nombres comerciales antes de enviar el prompt a la API.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.2" 
          title="Algoritmo de conciliación + prompt LLM" 
          goal="El algoritmo determinista de matching y el prompt que pide al LLM explicar causas de descuadres."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald }}>
              <div className="font-semibold mb-1" style={{ color: C.emerald }}>Parte A — Algoritmo determinista</div>
              <div style={{ color: "rgba(17,17,17,0.6)" }}>Match EXACT · DATE_TOLERANCE · DESCRIPTION_FUZZY · confidence 0–1</div>
            </div>
            <div className="p-4 rounded-lg text-sm" style={{ background: "rgba(217,119,6,0.05)", borderLeft: "3px solid " + C.amber }}>
              <div className="font-semibold mb-1" style={{ color: C.amber }}>Parte B — Prompt LLM</div>
              <div style={{ color: "rgba(17,17,17,0.6)" }}>3 causas genéricas por descuadre · Prohibido inventar nombres, CIFs o importes</div>
            </div>
          </div>
          <PromptBlock label="Prompt 3.2 — Algoritmo + prompt LLM">
{`Actúa como Desarrollador Senior de Algoritmos Financieros y Prompt Engineer.

Balance Inteligente utiliza dos sistemas de inteligencia complementarios que debes implementar en \`reconciliation_engine.py\`:

PARTE A — ALGORITMO DETERMINISTA (Python puro):
Escribe \`reconcile_transactions(bank_list: list[BankTransaction], erp_list: list[ERPEntry], date_tolerance_days: int = 3, amount_tolerance: Decimal = Decimal("0.00")) -> ReconciliationResult\`:
1. Paso Exacto: Mismo importe exacto y misma fecha. Asigna confidence_score = 1.0.
2. Paso Decalaje: Mismo importe exacto y diferencia de fechas <= date_tolerance_days. Asigna confidence_score = 0.85.
3. Paso Fuzzy: Mismo importe con palabras clave coincidentes en la descripción. Asigna confidence_score = 0.70.
4. Regla 1 a 1: Cada registro casado se elimina del pool para evitar duplicidades.
5. Los no conciliados se clasifican en unmatched_bank y unmatched_erp.

PARTE B — PROMPT LLM PARA DIAGN“STICO DE DESCUADRES:
Diseña el prompt que, dado un movimiento no conciliado (tipo, importe, fecha relativa y descripción sanitizada), solicita al modelo:
- Identificar exactamente 3 hipótesis contables plausibles (decalaje fecha valor, comisión bancaria no registrada, asiento de provisión pendiente, etc.).
- Prohibición estricta: No inventar nombres de empresas, CIFs ni cifras que no figuren en los datos.
- Formato de salida: JSON estricto con campos: causes (list[str]), confidence_note (str), requires_manual_review (bool).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.3" 
          title="Llamada al modelo" 
          goal="Función que envía cada descuadre al LLM con blindaje de privacidad Zero-PII para obtener las causas posibles."
        >
          <PromptBlock label="Prompt 3.3 — Llamada al modelo">
{`Actúa como Ingeniero de Integración de LLMs en Python.

Implementa en \`llm_client.py\` la función \`explain_discrepancy(transaction: BankTransaction, model_name: str) -> str\`:

1. CONSTRUCCI“N DE LA PETICI“N:
   - Sanitiza el concepto bancario eliminando nombres propios, CIFs e IBANs (Zero-PII).
   - Inyecta el prompt estructurado con los datos del movimiento (Importe, Fecha, Concepto normalizado).

2. PARÁMETROS DE LLAMADA ASÍNCRONA (Vía httpx o SDK oficial):
   - temperature: 0.2 (respuestas consistentes y sin creatividad no fundamentada).
   - max_tokens: 350 (suficiente para 3 hipótesis concisas).
   - timeout: 20.0 segundos por petición.
   - Reintentos: Máximo 2 reintentos con backoff exponencial ante errores HTTP 429 o 5xx.
   - Ejecución secuencial o en pequeños batches para respetar los rate limits de la API.

3. GESTI“N DE CREDENCIALES:
   - Carga segura de la clave desde la variable de entorno BALANCE_LLM_API_KEY.
   - Registro en log del tiempo de respuesta y tokens consumidos (sin registrar datos personales).`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.4" 
          title="Parseo de la respuesta" 
          goal="Convertir la respuesta del LLM en una lista estructurada de causas posibles mediante Pydantic."
        >
          <PromptBlock label="Prompt 3.4 — Parseo de la respuesta">
{`Actúa como Ingeniero de Software especializado en Structured Outputs y Pydantic.

Crea el módulo \`response_parser.py\` para procesar las explicaciones devueltas por el LLM:

1. MODELO PYDANTIC DE SALIDA:
\`\`\`python
class DiscrepancyExplanation(BaseModel):
    causes: list[str] = Field(..., min_length=1, max_length=3, description="Máximo 3 causas contables de < 120 caracteres cada una")
    confidence_note: str
    requires_manual_review: bool = True
\`\`\`

2. FUNCI“N DE PARSEO RESILIENTE:
Escribe \`parse_discrepancy_explanation(raw_response: str) -> DiscrepancyExplanation\`:
- Extrae el bloque JSON utilizando expresiones regulares si la respuesta contiene texto explicativo alrededor.
- Si el JSON es válido, instancia y valida el modelo DiscrepancyExplanation.
- Trunca cualquier causa que exceda los 120 caracteres para mantener la limpieza en la UI.
- Si el parseo falla o el JSON está incompleto, recupera las causas que pueda o genera por defecto: "Causa no identificada automáticamente — Revisión manual requerida".
- La función NUNCA lanza una excepción no controlada hacia la interfaz de usuario.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.5" 
          title="Control antialucinación" 
          goal="Verificar que las causas del LLM no contienen datos inventados específicos de la transacción."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>Regla crítica:</strong> No usar un segundo LLM para validar el primero. Detección heurística determinista simple con expresiones regulares.
          </div>
          <PromptBlock label="Prompt 3.5 — validate_explanation()">
{`Actúa como Ingeniero de Calidad y Seguridad en Sistemas de Inteligencia Artificial.

Crea el módulo \`guardrails.py\` con la función \`validate_explanation(explanation: DiscrepancyExplanation, transaction: BankTransaction) -> tuple[DiscrepancyExplanation, list[str]]\`:

1. REGLAS DE DETECCI“N HEURÍSTICA DETERMINISTA (Sin usar un segundo LLM):
   - Regla 1 (Importes inventados): Analiza el texto con expresiones regulares en busca de cantidades monetarias. Si detecta importes numéricos distintos al de la transacción, activa flag_invented_amount = True.
   - Regla 2 (Entidades inventadas): Busca patrones de CIF/NIF o nombres de bancos no proporcionados en los datos de entrada.
   - Regla 3 (Verificación de razonabilidad): Comprueba que las causas citan conceptos contables reconocidos (fecha valor, remesa, comisión, provisión, redondeo).

2. ACCI“N DE MITIGACI“N:
   - Si se detecta cualquier anomalía, marca requires_manual_review = True y anexa un aviso al reporte: "[ADVERTENCIA: Causa no confirmada documentalmente. Verificar antes de regularizar]".
   - Retorna la explicación auditada junto con la lista de advertencias detectadas.`}
          </PromptBlock>
        </Step>

        <Step 
          num="3.6" 
          title="Función de fallback" 
          goal="Comportamiento cuando el LLM no está disponible — la conciliación determinista siempre funciona en modo offline."
        >
          <PromptBlock label="Prompt 3.6 — explain_discrepancy_with_fallback()">
{`Actúa como Arquitecto de Resiliencia de Software.

Implementa en \`fallback_engine.py\` la función \`explain_discrepancy_with_fallback(transaction: BankTransaction, model_name: str) -> tuple[DiscrepancyExplanation, bool]\`:

1. FLUJO DE DEGRADACI“N CONTROLADA:
   - Intenta la llamada remota al LLM mediante \`explain_discrepancy()\`.
   - Si la API no está disponible (sin internet, timeout, cuota agotada o sin API key configurada):
     * Activa el Motor Heurístico Local con reglas deterministas:
       - Si el concepto contiene "COMIS" o "MANT" -> "Comisión bancaria no contabilizada en cuenta 669".
       - Si es un cobro a final de mes sin asiento -> "Remesa o cobro de cliente pendiente de contabilizar".
       - Si es un cargo directo sin contrapartida -> "Pago o adeudo domiciliado pendiente de registrar".
       - En cualquier otro caso -> "Partida pendiente de regularización — Revisión contable manual requerida".
     * Genera una DiscrepancyExplanation válida con requires_manual_review = True.
     * Retorna (explanation, is_llm_used=False).

2. INTEGRACI“N VISUAL:
   - La interfaz gráfica mostrará un badge ámbar [ANÁLISIS HEURÍSTICO LOCAL] cuando is_llm_used sea False, garantizando que la conciliación nunca se detenga.`}
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
          desc="Las 3 pantallas de Balance Inteligente — carga, resultados e historial." 
        />

        <Step 
          num="4.1" 
          title="Wireframe mínimo" 
          goal="Definir las 3 pantallas antes de codificar: Carga · Resultados · Historial."
        >
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            {[
              { n: "1", title: "Carga", items: ["Drag & drop de archivos", "Selector de período", "Tolerancias configurables", "Botón Conciliar"] },
              { n: "2", title: "Resultados", items: ["Resumen numérico", "Tabla de matches", "Lista de descuadres + causas LLM", "Exportar informe"] },
              { n: "3", title: "Historial", items: ["Lista de sesiones anteriores", "Cargar conciliación pasada"] },
            ].map(s => (
              <div key={s.n} className="p-4 rounded-xl border text-sm"
                style={{ borderColor: "rgba(8,145,178,0.2)", background: "rgba(8,145,178,0.03)" }}>
                <div className="font-semibold mb-2" style={{ color: "#0891B2" }}>Pantalla {s.n}: {s.title}</div>
                <ul className="space-y-1">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5" style={{ color: "rgba(17,17,17,0.6)" }}>
                      <span style={{ color: "#0891B2" }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.1 — Wireframe Flet">
{`Actúa como Diseñador de Interfaces y Desarrollador Frontend Senior en Python con Flet (Flutter Engine).

Crea la arquitectura de interfaz de usuario de "Balance Inteligente" en el módulo \`ui/app.py\`:

1. ESTRUCTURA DE PANTALLAS (3 Vistas con ft.View):
   - Vista 1 (Ingesta y Configuración):
     * 2 zonas interactivas de carga (ft.FilePicker con Drag & Drop) para Extracto Bancario y Libro Mayor ERP.
     * Selectores de fecha para el período contable (ft.DatePicker).
     * Controles deslizantes/campos para tolerancia de fechas (0 a 7 días) y tolerancia de céntimos (0 a 5 céntimos).
     * ft.ElevatedButton ("Ejecutar Conciliación") desactivado por defecto hasta validar que ambos ficheros están cargados.
   - Vista 2 (Panel de Resultados y Diagnóstico):
     * Tarjetas KPI en la cabecera: Total Registros, % Cuadre, Total Conciliado (â‚¬) y Descuadre Neto (â‚¬).
     * ft.Tabs con dos pestañas:
       a) Pestaña "Partidas Conciliadas": ft.DataTable paginada con scroll virtualizado.
       b) Pestaña "Descuadres & Diagnóstico IA": Lista de tarjetas (ft.Card) con badges de confianza ([EXACTO], [TOLERANCIA], [IA DIAGN“STICO], [FALLBACK]).
     * Botón flotante para exportar informe ("Descargar Informe PDF / Markdown").
   - Vista 3 (Historial y Auditoría):
     * Tabla cronológica de conciliaciones almacenadas en DuckDB con opción de recargar cualquier sesión pasada.

2. GESTI“N DE ESTADOS Y FEEDBACK:
   - Indicador de progreso (ft.ProgressRing / ft.ProgressBar) con mensaje de estado dinámico durante el cómputo.
   - Notificaciones emergentes (ft.SnackBar) con código de color (Verde = Cuadre satisfactorio, Rojo = Error de fichero, Ámbar = Descuadre detectado).`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.2" 
          title="Formulario de entrada" 
          goal="Pantalla de carga de archivos con validación visual en Flet."
        >
          <PromptBlock label="Prompt 4.2 — Componente carga de ficheros">
{`Actúa como Especialista en UI/UX para Aplicaciones de Productividad.

Implementa el componente de ingesta de ficheros \`ui/components/file_loader.py\` en Flet:

1. ESPECIFICACI“N TÃ‰CNICA:
   - Implementa FilePicker para interceptar la selección de archivos .csv, .txt o .json.
   - Tras la selección, ejecuta una pre-lectura de las primeras 5 líneas (preview) sin bloquear el hilo principal de la UI.
   - Muestra inmediatamente:
     * Nombre del archivo e icono del formato.
     * Número de filas totales detectadas.
     * Tamaño en KB/MB.
     * Check verde si contiene las columnas mínimas obligatorias (fecha, concepto, importe) o alerta roja si faltan cabeceras.

2. MANEJO DE ERRORES VISUALES:
   - Si el usuario sube un archivo no soportado (ej. .xlsx o .pdf), muestra un ft.Banner explicativo con instrucciones claras para exportar desde Excel en formato CSV UTF-8.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.3" 
          title="Área de resultados" 
          goal="Tabla de matches (tabs Conciliados / Descuadres) y tarjetas con diagnóstico IA."
        >
          <PromptBlock label="Prompt 4.3 — Área de resultados">
{`Actúa como Diseñador Frontend en Python con Flet.

Implementa la pantalla de resultados de Balance Inteligente en \`ui/views/results_view.py\`:

1. CABECERA CON TARJETAS KPI:
   - 4 Tarjetas de resumen métrico:
     * Total Registros Bancarios vs. ERP.
     * Porcentaje de Cobertura Conciliada (Verde si >= 95%, Naranja si 80-94%, Rojo si < 80%).
     * Total Importe Conciliado (â‚¬).
     * Descuadre Neto Total (â‚¬).

2. PESTA‘AS DE VISUALIZACI“N (ft.Tabs):
   - Pestaña 1 ("Conciliadas"): ft.DataTable con scroll virtualizado que muestra las coincidencias: Fecha Banco, Concepto Banco, Importe, Asiento ERP, Fecha ERP, Concepto ERP, Tipo Match y Score. Fondo verde tenue para coincidencias exactas.
   - Pestaña 2 ("Descuadres"): Lista de tarjetas (ft.Card) por cada partida no conciliada, mostrando:
     * Datos del movimiento (Fecha, Concepto, Importe).
     * Las 3 hipótesis del diagnóstico IA (o regla heurística).
     * Badge de estado: [EXACTO], [TOLERANCIA], [IA DIAGN“STICO], [VERIFICAR MANUALMENTE].

3. ACCIONES DE EXPORTACI“N:
   - ft.ElevatedButton ("Descargar Informe Markdown / PDF") con selector de ruta local.
   - ft.OutlinedButton ("Nueva Conciliación") que regresa a la pantalla de carga previa confirmación.`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.4" 
          title="Estados vacíos y de error" 
          goal="Mensajes claros para cada error posible en la carga y procesamiento de archivos."
        >
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {["Sin archivos cargados", "Archivo inválido (columnas incorrectas)", "Período sin transacciones", "Conciliando (progress ring)", "Error durante la conciliación", "Descuadre total (0% conciliado)"].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-lg"
                style={{ background: "rgba(17,17,17,0.04)", color: "rgba(17,17,17,0.6)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(17,17,17,0.1)", color: C.dark }}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <PromptBlock label="Prompt 4.4 — Estados de error">
{`Actúa como Especialista en UX y Gestión de Estados Excepcionales en Flet.

Implementa el módulo \`ui/components/error_states.py\` para gestionar de forma elegante todas las situaciones límite de Balance Inteligente:

1. CATÁLOGO DE ESTADOS VISUALES:
   - Estado 1 (Sin archivos cargados - Inicio): Panel instructivo con iconos de arrastrar archivos y botón para cargar el dataset DEMO de prueba.
   - Estado 2 (Fichero CSV inválido / columnas ausentes): ft.SnackBar rojo de alta visibilidad: "El archivo no contiene las columnas requeridas [LISTA]. Haz clic para ver el formato esperado".
   - Estado 3 (Período sin movimientos): Mensaje informativo: "No se han localizado movimientos en el rango de fechas seleccionado. Ajusta el período contable".
   - Estado 4 (Procesamiento activo): ft.ProgressRing animado con texto reactivo: "Conciliando transacciones y diagnosticando descuadres...". Botón de conciliar deshabilitado.
   - Estado 5 (Fallo imprevisto de ejecución): ft.AlertDialog con detalle técnico del error y opción para guardar el log de depuración.
   - Estado 6 (Descuadre total - 0% conciliado): Banner ámbar de advertencia: "Atención: Ninguna partida pudo conciliarse. Verifica que las fechas y cuentas correspondan al mismo ejercicio contable".`}
          </PromptBlock>
        </Step>

        <Step 
          num="4.5" 
          title="Navegación básica" 
          goal="Flujo entre las 3 pantallas: Carga â†’ Resultados â†’ (opcional) Historial."
        >
          <PromptBlock label="Prompt 4.5 — Navegación Flet">
{`Actúa como Arquitecto Frontend en Flet.

Implementa la arquitectura de navegación fluida entre las 3 pantallas de Balance Inteligente en \`ui/navigation.py\`:

1. CONTROLADOR DE VISTAS (ft.View):
   - Pantalla 1 (Carga): Formulario de drag & drop, selectores de fecha y tolerancias.
   - Pantalla 2 (Resultados): Dashboard de KPIs, tabla de matches, tarjetas de descuadres y exportador.
   - Pantalla 3 (Historial): Listado de sesiones pasadas guardadas en DuckDB.

2. REGLAS DE NAVEGACI“N:
   - Al pulsar "Conciliar" y concluir el pipeline con éxito: Transición automática a la pantalla de Resultados con los datos ya renderizados.
   - Botón "Historial" accesible en la barra superior (ft.AppBar) desde cualquier vista.
   - En la vista de Historial, cada fila cuenta con el botón "Cargar sesión" que abre los resultados pasados en modo consulta.
   - Botón "Volver a Ingesta" con diálogo de confirmación si existen resultados no exportados.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 5 — INTEGRACI“N (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={Link2} 
          label="Capa 5" 
          color={C.red} 
          title="Integración"
          desc="Conectar interfaz, lógica y datos en un pipeline robusto con gestión de errores en cascada y auditoría segura." 
        />

        <Step 
          num="5.1" 
          title="Conectar interfaz con lógica" 
          goal="La función on_reconcile_click() que ejecuta el pipeline completo desde la UI sin bloquear la ventana gráfica."
        >
          <PromptBlock label="Prompt 5.1 — Evento UI Asíncrono">
{`Actúa como Ingeniero Frontend Senior en Python con Flet.

Implementa la función controladora de eventos \`on_reconcile_click(e)\` en \`ui/controllers.py\` para disparar la conciliación desde la interfaz:

1. REQUISITOS DE CONCURRENCIA:
   - La ejecución del pipeline debe lanzarse en una tarea asíncrona independiente (\`asyncio.create_task\` o \`threading.Thread\`) para que la ventana de Flet no se congele durante el procesamiento masivo de miles de líneas.
   - Deshabilita temporalmente el botón "Conciliar" y muestra el indicador de carga (\`ft.ProgressRing\`).
   - Implementa un callback de progreso (\`progress_callback(percent: int, message: str)\`) para actualizar la barra de estado visual en tiempo real.

2. SECUENCIA DEL CONTROLADOR:
   1. Valida que las rutas de los dos archivos (extracto bancario y libro mayor) existan en el sistema.
   2. Extrae las fechas del período contable y los márgenes de tolerancia de los controles visuales.
   3. Invoca la función \`run_reconciliation_pipeline(...)\`.
   4. Al finalizar con éxito: Puebla las tablas de matches, las tarjetas de descuadres y navega automáticamente a la pantalla de Resultados.
   5. Si ocurre una excepción: Captura el error y despliega un \`ft.AlertDialog\` explicativo con sugerencias de solución.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.2" 
          title="Conectar lógica con datos" 
          goal="Pipeline puro reconciliation_pipeline() que conecta la lectura, el algoritmo, la IA y la persistencia en DuckDB."
        >
          <PromptBlock label="Prompt 5.2 — Pipeline Orquestador">
{`Actúa como Ingeniero de Integración y Arquitecto de Software en Python.

Escribe el módulo \`pipeline.py\` con la función orquestadora central \`reconciliation_pipeline(...)\` completamente desacoplada de la interfaz gráfica:

1. CONTRATO FORMAL DE LA FUNCI“N:
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

2. FLUJO DE EJECUCI“N SECUENCIAL (End-to-End):
   - **Paso 1 (Ingesta):** Llama a \`read_bank_statement()\` y \`read_erp_ledger()\` de \`parsers.py\` (15% progreso).
   - **Paso 2 (Validación):** Instancia y valida las listas de modelos Pydantic \`BankTransaction\` y \`ERPEntry\` (30% progreso).
   - **Paso 3 (Filtrado Temporal):** Filtra los registros que correspondan estrictamente al rango [period_start, period_end].
   - **Paso 4 (Matching Determinista):** Ejecuta \`reconcile_transactions()\` de \`reconciliation_engine.py\` resolviendo todas las coincidencias 1 a 1 (60% progreso).
   - **Paso 5 (Diagnóstico de Descuadres):** Para cada partida no casada, invoca \`explain_discrepancy_with_fallback()\` aplicando guardrails antialucinación (80% progreso).
   - **Paso 6 (Persistencia Atómica):** Guarda la sesión completa en DuckDB mediante \`store_reconciliation()\` (95% progreso).
   - **Paso 7 (Cierre):** Retorna el objeto canónico \`ReconciliationResult\` (100% progreso).

3. MANEJO DE EXCEPCIONES:
   - Captura y re-lanza excepciones con contexto enriquecido (especificando qué paso falló).`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.3" 
          title="Gestión de errores en cascada" 
          goal="Plan de resiliencia ante CSVs malformados, períodos vacíos, caídas de la API del LLM o fallos de base de datos."
        >
          <PromptBlock label="Prompt 5.3 — Matriz de Errores y Excepciones">
{`Actúa como Arquitecto de Resiliencia de Software en Sistemas Críticos.

Crea el módulo \`exceptions.py\` con la jerarquía de excepciones personalizadas y la matriz de decisiones de error de "Balance Inteligente":

1. JERARQUÍA DE ERRORES:
   \`\`\`python
   from enum import Enum

   class ErrorSeverity(Enum):
       WARNING = "WARNING"          # No bloquea el flujo (ej. fallo de API de IA -> usa fallback)
       RECOVERABLE = "RECOVERABLE"  # Permite corregir parámetros (ej. fecha sin movimientos)
       FATAL = "FATAL"              # Aborta la operación (ej. fichero corrupto o disco lleno)

   class BalanceException(Exception):
       def __init__(self, message: str, code: str, severity: ErrorSeverity, user_hint: str):
           super().__init__(message)
           self.code = code
           self.severity = severity
           self.user_hint = user_hint
   \`\`\`

2. TABLA DE DECISIONES DE ERROR (Fail-Safe Strategy):
   - **Fallo 1 (CSV malformado o delimitador desconocido):** Lanza \`BalanceException\` (FATAL) indicando el número de fila conflictiva y sugiriendo revisar la codificación del archivo.
   - **Fallo 2 (Período sin movimientos):** Emite advertencia (WARNING) permitiendo al usuario ampliar el rango de fechas sin reiniciar la app.
   - **Fallo 3 (Timeout o caída de la API del LLM):** Degrada silenciosamente al motor heurístico local, marca \`is_llm_used = False\` y continúa la entrega sin bloquear el reporte.
   - **Fallo 4 (Error de escritura en DuckDB):** Muestra el resultado en pantalla igualmente y genera un volcado de emergencia en JSON en \`%APPDATA%/BalanceInteligente/emergency_backup/\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.4" 
          title="Logging básico y auditoría" 
          goal="Sistema de logging para auditoría de conciliaciones sin volcar datos personales ni conceptos bancarios (RGPD)."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(220,38,38,0.05)", borderLeft: "3px solid " + C.red, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.red }}>RGPD:</strong> No guardar el concepto bancario en el log. Puede contener nombres de personas o empresas.
          </div>
          <PromptBlock label="Prompt 5.4 — reconciliation_logger.py">
{`Actúa como Especialista en Ciberseguridad y Privacidad de Datos en Software Financiero.

Crea el módulo \`logger.py\` para la auditoría técnica y depuración en producción cumpliendo estrictamente con el RGPD:

1. CONFIGURACI“N DEL SISTEMA DE LOGGING:
   - Archivo destino: \`~/.balance_inteligente/logs/reconciliation.log\`.
   - Rotación automática: \`RotatingFileHandler\` con tamaño máximo de 5MB y 3 ficheros de respaldo.
   - Formato estructurado: \`[%(asctime)s UTC] [%(levelname)s] [%(name)s] %(message)s\`.
   - Nivel de log configurable dinámicamente mediante la variable de entorno \`BALANCE_LOG_LEVEL\` (por defecto: INFO).

2. MÁSCARA ESTRICTA DE PRIVACIDAD (Privacy by Design):
   - Prohíbe explícitamente volcar en los logs: conceptos bancarios originales, descripciones de asientos contables y nombres de personas o empresas.
   - Enmascara números de cuenta bancaria IBAN dejando solo los últimos 4 dígitos (\`ES** **** **** **** 1234\`).
   - Registra únicamente metadatos operacionales: Session UUID, número de transacciones procesadas, tiempo de cómputo en milisegundos, porcentaje de conciliación y códigos de error HTTP.`}
          </PromptBlock>
        </Step>

        <Step 
          num="5.5" 
          title="Configuración centralizada" 
          goal="config.py con Pydantic Settings v2 para gestionar variables de entorno, constantes de negocio y fichero .env."
        >
          <PromptBlock label="Prompt 5.5 — config.py + .env.example">
{`Actúa como Ingeniero DevOps / SRE en Python.

Crea el módulo \`config.py\` utilizando \`pydantic-settings\` para la gestión centralizada de la configuración de "Balance Inteligente":

1. ESPECIFICACI“N DEL MODELO DE AJUSTES:
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

2. FUNCI“N DE INICIALIZACI“N:
   - \`init_environment() -> AppSettings\`: Crea automáticamente en el sistema de archivos los directorios necesarios (\`data/\`, \`logs/\`, \`exports/\`) si no existen al arrancar la app.

3. GENERADOR DEL FICHERO \`.env.example\`:
   - Escribe la plantilla comentada \`.env.example\` explicando el propósito de cada variable y cómo configurar la clave de API para activar el diagnóstico por IA.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CAPA 6 — PRUEBAS Y EMPAQUETADO (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={FlaskConical} 
          label="Capa 6" 
          color={C.emerald} 
          title="Pruebas y empaquetado"
          desc="Tests unitarios, test de flujo completo, protocolo de validación manual y generación del ejecutable autónomo (.exe)." 
        />

        <Step 
          num="6.1" 
          title="Tests unitarios" 
          goal="Tests Pytest para el algoritmo de matching determinista, normalización de importes Decimal y parseo de respuestas."
        >
          <PromptBlock label="Prompt 6.1 — Suite Pytest Unitaria">
{`Actúa como QA Lead y Especialista en Testing Automatizado de Software Financiero.

Crea la suite de pruebas unitarias en el archivo \`tests/test_unit_reconciliation.py\` utilizando \`pytest\`:

1. PRUEBAS DE NORMALIZACI“N (\`normalizers.py\`):
   - \`test_normalize_amount_spanish_format\`: Verifica que '1.234.567,89 â‚¬' se convierte exactamente en \`Decimal('1234567.89')\`.
   - \`test_normalize_amount_english_format\`: Verifica que '1,234,567.89' se convierte en \`Decimal('1234567.89')\`.
   - \`test_normalize_amount_accounting_parentheses\`: Verifica que '(450,20)' se convierte en \`Decimal('-450.20')\`.
   - \`test_normalize_amount_invalid_raises_error\`: Verifica que cadenas como 'N/A' o 'PENDIENTE' lanzan \`ValueError\`.

2. PRUEBAS DEL MOTOR DE MATCHING (\`reconciliation_engine.py\`):
   - \`test_exact_match_success\`: Dos transacciones con idéntico importe y fecha se casan con score 1.0.
   - \`test_date_tolerance_match\`: Transacciones con decalaje de 2 días se casan con score 0.85 si la tolerancia es 3 días.
   - \`test_one_to_one_uniqueness\`: Comprueba que una transacción bancaria nunca se empareja con dos asientos ERP distintos.

3. PRUEBAS DE GUARDRAILS (\`guardrails.py\`):
   - \`test_audit_ai_detects_invented_amount\`: Pasa una explicación con un importe falso y verifica que se activa el flag de alucinación y el badge de revisión.

REQUISITO: Todos los tests deben ejecutarse sin conexión y en menos de 1.5 segundos con \`pytest tests/test_unit_reconciliation.py -v\`.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.2" 
          title="Test de flujo completo" 
          goal="Test de integración End-to-End del pipeline con los archivos CSV de ejemplo y DuckDB en memoria."
        >
          <PromptBlock label="Prompt 6.2 — Test de Integración E2E">
{`Actúa como Ingeniero de Integración y Automatización de Pruebas.

Escribe el test de integración en \`tests/test_pipeline_integration.py\`:

1. ESPECIFICACI“N DEL ESCENARIO E2E:
   - Carga los ficheros sintéticos \`demo_bank_statement.csv\` y \`demo_erp_ledger.csv\`.
   - Inicializa una base de datos DuckDB en memoria (\`:memory:\`).
   - Mockea la llamada externa al LLM (\`unittest.mock.patch\` sobre \`explain_discrepancy\`) para devolver un diagnóstico controlado sin consumir tokens ni requerir API Key.
   - Ejecuta la función principal \`run_reconciliation_pipeline(...)\`.

2. ASERCIONES OBLIGATORIAS (Verificaciones de Integridad):
   - Confirma que de las 20 transacciones bancarias, exactamente 18 resultan conciliadas (\`len(result.matches) == 18\`).
   - Confirma que se identifican con precisión los 2 descuadres intencionales (\`len(result.unmatched_bank) == 2\`).
   - Confirma que la tasa de conciliación calculada es igual al 90.0% (\`result.reconciliation_rate == 0.90\`).
   - Verifica que los datos quedan persistidos en DuckDB consultando \`get_reconciliation_history(conn)\` y comprobando que devuelve 1 sesión válida.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.3" 
          title="Prueba manual con datos reales" 
          goal="Protocolo de aceptación UAT con los extractos reales del usuario antes del empaquetado final."
        >
          <PromptBlock label="Prompt 6.3 — Protocolo UAT Manual">
{`Actúa como Consultor de Calidad y Especialista en Aceptación de Usuario (UAT).

Genera el protocolo de prueba manual de "Balance Inteligente" para que un contable valide la aplicación con datos reales de su empresa:

1. MATRIZ DE ESCENARIOS DE PRUEBA:
   - **Escenario 1 (Carga de Extracto Real):** Carga un CSV bancario de su entidad (Santander, BBVA, CaixaBank, Sabadell) -> Comprobar que las columnas e importes con coma se detectan automáticamente sin error.
   - **Escenario 2 (Cierre del šltimo Mes):** Ejecutar la conciliación del mes vencido -> Comparar el porcentaje de coincidencia automático con el resultado manual histórico.
   - **Escenario 3 (Revisión de Descuadres):** Analizar 2 descuadres reales en pantalla -> Comprobar que las hipótesis generadas por la IA son coherentes con la operativa contable.
   - **Escenario 4 (Exportación del Dictamen):** Pulsar "Exportar Informe Markdown" -> Abrir el fichero generado y comprobar que contiene el resumen de cifras y la advertencia legal.
   - **Escenario 5 (Simulación Offline):** Desconectar el cable de red / WiFi y pulsar "Conciliar" -> Comprobar que la app opera con el motor heurístico local sin bloquearse.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.4" 
          title="Empaquetado con PyInstaller" 
          goal="Generar el ejecutable autónomo distribuible (.exe) de Balance Inteligente."
        >
          <div 
            className="mt-3 p-4 rounded-lg text-sm"
            style={{ background: "rgba(5,150,105,0.05)", borderLeft: "3px solid " + C.emerald, color: "rgba(17,17,17,0.65)" }}
          >
            <strong style={{ color: C.emerald }}>Nota técnica:</strong> Se genera un binario sin ventana de consola (<code className="text-xs bg-black/5 px-1 rounded-sm">console=False</code>) que empaqueta DuckDB, Flet y Pydantic v2.
          </div>
          <PromptBlock label="Prompt 6.4 — Especificación de Compilación (.spec)">
{`Actúa como Ingeniero de Empaquetado y Despliegue de Aplicaciones de Escritorio.

Genera el archivo \`balance_inteligente.spec\` y el script de compilación para construir el ejecutable autónomo (\`.exe\` en Windows o binario en macOS) mediante PyInstaller:

1. CONFIGURACI“N DEL ARCHIVO \`.spec\`:
   - Script de entrada: \`main.py\`.
   - Inclusión de archivos estáticos (\`datas\`):
     * Carpeta de datasets de ejemplo: \`('demo_data', 'demo_data')\`.
     * Iconos y assets visuales: \`('assets', 'assets')\`.
   - Importaciones dinámicas (\`hiddenimports\`): \`['flet', 'duckdb', 'pydantic', 'pydantic_core', 'pydantic_settings', 'httpx', 'anyio']\`.
   - Configuración del ejecutable (\`EXE\`):
     * \`name='BalanceInteligente'\`
     * \`console=False\` (Oculta la ventana negra de terminal).
     * \`icon='assets/icon.ico'\`
     * Modo distribuible optimizado (\`onedir=True\` para arranque ultrarrápido o \`onefile=True\`).

2. RESOLUCI“N DE BINARIOS DINÁMICOS:
   - Instrucciones para asegurar que las librerías dinámicas de C++ de DuckDB y el motor Flutter de Flet queden correctamente enlazadas en máquinas sin Python.`}
          </PromptBlock>
        </Step>

        <Step 
          num="6.5" 
          title="Prueba del ejecutable en máquina limpia" 
          goal="Verificación y checklist formal del ejecutable en un entorno sin Python instalado."
        >
          <PromptBlock label="Prompt 6.5 — Checklist de Validación en Máquina Limpia">
{`Actúa como Ingeniero de Release y Control de Calidad Final.

Genera el protocolo de verificación formal del ejecutable en una máquina virtual limpia (Windows 10/11 sin Python, sin Git y sin dependencias previas):

1. CHECKLIST DE COMPROBACIONES OBLIGATORIAS:
   - [ ] **Arranque Autónomo:** Doble clic en \`BalanceInteligente.exe\` -> La ventana gráfica se despliega en menos de 3 segundos sin solicitar permisos de administrador.
   - [ ] **Carga de Datos de Ejemplo:** Acceder al diálogo de carga y seleccionar los CSVs de demostración incluidos en la app.
   - [ ] **Ejecución Completa:** Pulsar "Conciliar" -> Verificar que la barra de progreso avanza fluidamente y las tablas de resultados se pueblan al 100%.
   - [ ] **Configuración Externa:** Comprobar que la app lee la clave \`BALANCE_LLM_API_KEY\` desde un archivo \`.env\` colocado en la misma carpeta del ejecutable.
   - [ ] **Persistencia Local:** Cerrar la aplicación, volver a abrirla y verificar que la base de datos DuckDB conserva el historial de conciliaciones previas en la ruta local del usuario.`}
          </PromptBlock>
        </Step>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FASE 7 — ITERACI“N Y PUBLICACI“N (BALANCE INTELIGENTE)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <PhaseHeader 
          icon={RefreshCw} 
          label="Fase 7" 
          color="rgba(17,17,17,0.4)" 
          title="Iteración y publicación"
          desc="Planificar la versión 2.0 y compartir Balance Inteligente con la comunidad de desarrolladores y auditores de Horizon." 
        />

        <Step 
          num="7.A" 
          title="Planificar v2" 
          goal="Backlog de funcionalidades para la siguiente versión: Norma 43, MT940, remesas 1 a N y APIs de ERPs."
        >
          <PromptBlock label="Prompt 7.A — Planificación v2">
{`Actúa como Product Owner y Estratega de Software Financiero.

Una vez consolidada la versión 1.0 de "Balance Inteligente", genera el backlog técnico y funcional estructurado para la versión 2.0:

1. MATRIZ DE MEJORAS PROPUESTAS (en formato tabla):
| ID | Funcionalidad Propuesta | Capa Afectada | Complejidad | Prioridad | Valor Aportado |
|:---|:---|:---|:---|:---|:---|
| F2-01 | Soporte para Cuaderno Bancario Norma 43 y MT940 nativo | Capa 2 (Parsers) | Media | ALTA | Permite importar ficheros bancarios oficiales sin conversión previa. |
| F2-02 | Conciliación de Remesas 1 a N (Una línea bancaria = N facturas) | Capa 3 (Matching) | Alta | ALTA | Resuelve pagos agrupados de nóminas y liquidaciones TPV. |
| F2-03 | Generador de Asientos de Ajuste Directos (A3 / Sage / Contasol) | Capa 5 (Integración) | Media | MEDIA | Automatiza la contabilización de comisiones y diferencias de redondeo. |
| F2-04 | Conexión Open Banking / PSD2 para descarga directa de bancos | Capa 2 (Data Fetch) | Alta | BAJA (v3) | Elimina la descarga manual de ficheros CSV. |

2. REQUISITOS DE COMPLIANCE PARA V2:
- Análisis de implicaciones de seguridad, cifrado en reposo y custodia de credenciales para conectores bancarios automáticos.`}
          </PromptBlock>
        </Step>

        <Step 
          num="7.B" 
          title="Publicar en Foro de Proyectos" 
          goal="Generar la ficha técnica formal de presentación de Balance Inteligente para el Foro Horizon."
        >
          <PromptBlock label="Prompt 7.B — Ficha para el Foro">
{`Actúa como Tech Lead y Portavoz del Proyecto en la Comunidad Horizon.

Genera la ficha técnica formal de presentación de "Balance Inteligente v1" para su publicación en el Foro de Proyectos Horizon:

1. ESTRUCTURA DE LA FICHA:
- Título: Balance Inteligente v1 — Conciliación Bancaria Determinista y Diagnóstico Contable Asistido por IA
- Área Temática: Contabilidad Financiera, Auditoría ERP & Automatización.
- Resumen Ejecutivo (Máximo 120 palabras): Aplicación de escritorio desarrollada en Python y Flet que resuelve el cierre contable mensual conciliando extractos bancarios y libros mayores en segundos, combinando un motor determinista 1-a-1 con diagnóstico inteligente de descuadres sin alucinaciones numéricas.
- Arquitectura y Stack: Python 3.11+, Flet (Flutter UI), Pydantic v2 (Strict Decimal Types), DuckDB (OLAP local inmutable), Pytest y PyInstaller.
- Diferenciadores Técnicos:
  1. Desacople estricto entre lógica matemática determinista e inferencia explicativa.
  2. Blindaje de privacidad Zero-PII y modo 100% offline garantizado.
  3. Trazabilidad completa con sellado SHA-256 en cada informe exportado.
- Instrucciones Rápidas de Uso (3 pasos): Descargar .exe, cargar ficheros CSV y pulsar "Conciliar".
- Pregunta de Debate para la Comunidad: ¿Qué margen de tolerancia temporal (días fecha valor vs. fecha contable) consideráis más adecuado para conciliaciones comerciales internacionales en vuestras empresas?`}
          </PromptBlock>
        </Step>

        {/* ─── Recuadro de Resultado Final ─── */}
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
            Un ejecutable de <strong style={{ color: C.dark }}>Balance Inteligente</strong> que importa dos CSV, concilia en segundos y exporta un informe con las diferencias explicadas por el modelo líder en contabilidad — sin Python instalado ni conexión a ningún ERP.
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

        {/* ─── Extensiones de Versión ─── */}
        <VersionExtensions versions={VERSIONS} />

        <div className="h-16" />
      </div>
    </div>
  );
}

