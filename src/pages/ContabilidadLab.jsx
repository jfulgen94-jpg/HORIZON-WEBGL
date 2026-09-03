import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Calculator } from "lucide-react";
import { Cpu } from "lucide-react";
import { GitBranch } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { FileText } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Search } from "lucide-react";
import { Layers } from "lucide-react";

// —€—€—€ Data —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

const RESEARCH_LINES = [
  {
    id: "reconciliation",
    number: "01",
    title: "Conciliación bancaria y automatización de asientos contables",
    icon: "bank",
    color: "blue",
    summary: "La conciliación bancaria es el proceso de cotejar, transacción a transacción, los movimientos del extracto bancario con los registros del Libro Mayor. En empresas con miles de movimientos mensuales, este proceso puede ocupar días enteros del equipo contable.",
    detail: "El laboratorio investiga si un modelo de lenguaje puede hacer el cruce inicial, identificar los descuadres y proponer la corrección probable antes de que el contable tenga que mirar la primera línea. El Libro Mayor (General Ledger) es el registro maestro de todas las transacciones financieras de la empresa; si no está cuadrado, nada de lo que venga después es fiable.",
    benchmarks: [
      { name: "Bank_Reconciliation_Auto", desc: "Conciliación bancaria automatizada de extremo a extremo" },
      { name: "FinBen_Financial_Reporting", desc: "Generación y validación de informes financieros" },
      { name: "BizFin_Cost_Allocation", desc: "Asignación automática de centros de coste" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "94.41", detail: "94.5 FinBen · 95.0 Bank_Reconciliation · 93.8 BizFin_Cost" },
  },
  {
    id: "invoices",
    number: "02",
    title: "Procesamiento de facturas y cumplimiento fiscal",
    icon: "invoice",
    color: "emerald",
    summary: "El OCR (reconocimiento óptico de caracteres) existe desde hace décadas, pero el problema de procesar facturas en formato libre sigue sin estar resuelto de forma general: campos en posiciones distintas, formatos de fecha variados, IVA desglosado de maneras diferentes según el proveedor.",
    detail: "El laboratorio investiga modelos multimodales capaces de extraer estructuradamente el contenido de cualquier factura, normalizarlo y validarlo contra las reglas de retención fiscal aplicables.",
    benchmarks: [
      { name: "Expense_Receipt_Structuring", desc: "Extracción de datos de tickets y justificantes" },
      { name: "FinBen_Document_OCR_Table", desc: "OCR y estructuración de tablas financieras" },
      { name: "Tax_Regulation_VAT_Compliance", desc: "Cumplimiento de normativa de IVA" },
    ],
    topModel: { name: "Claude 3.7 Sonnet", score: "96.43", detail: "97.2 Expense_Receipt · 96.8 OCR_Table · 95.2 Contract_Clause" },
  },
  {
    id: "assets",
    number: "03",
    title: "Auditoría de activos fijos y amortizaciones",
    icon: "asset",
    color: "purple",
    summary: "Los activos fijos se amortizan a lo largo de su vida útil. En carteras grandes, los errores se acumulan silenciosamente: vidas útiles mal aplicadas, activos amortizados dos veces, activos que deberían haberse dado de baja pero siguen generando asientos.",
    detail: "La amortización (depreciation) es la distribución contable del coste de un activo a lo largo de su vida útil estimada. Un error en la vida útil no es un error puntual: se propaga durante años, distorsionando el resultado contable en cada ejercicio. El laboratorio investiga si un modelo puede auditar esa cartera de forma continua.",
    benchmarks: [
      { name: "Contract_Financial_Clause_IE", desc: "Extracción de cláusulas financieras de contratos" },
      { name: "Audit_Trail_Consistency", desc: "Verificación de pista de auditoría completa" },
      { name: "BizFin_Ledger_Anomaly_Tracing", desc: "Detección de anomalías en asientos" },
    ],
    topModel: { name: "Claude 3.7 Sonnet + DeepSeek-R1", score: "95.75 / 95.55", detail: "Claude lidera trazabilidad · DeepSeek lidera detección de anomalías" },
  },
  {
    id: "fraud",
    number: "04",
    title: "Detección de fraude y anomalías en notas de gastos",
    icon: "fraud",
    color: "rose",
    summary: "Las notas de gastos corporativos son una de las áreas de mayor exposición a fraude por abuso interno: ticket duplicado, importe superior al límite de política, justificante en día no laborable.",
    detail: "El laboratorio investiga modelos que aprendan el patrón habitual de cada empleado y departamento, y marquen las desviaciones estadísticas significativas para revisión. El fraude en gastos raramente implica sumas enormes en una sola transacción: suele ser pequeño, repetido y suficientemente disperso como para pasar desapercibido en una revisión manual.",
    benchmarks: [
      { name: "FinBen_Fraud_Anomaly_Task", desc: "Detección de fraude en transacciones financieras" },
      { name: "BizFin_Ledger_Anomaly_Tracing", desc: "Trazado de anomalías en el Libro Mayor" },
      { name: "Duplicate_Invoice_Filter", desc: "Filtrado de facturas duplicadas" },
    ],
    topModel: { name: "DeepSeek-R1", score: "95.55", detail: "95.2 Fraud_Anomaly · 95.5 Ledger_Anomaly · 96.0 Duplicate_Filter" },
  },
];

const PROJECTS = [
  {
    id: "balance",
    name: "Balance Inteligente",
    tagline: "El primer revisor que llega antes que el contable",
    desc: "Motor de cuadre y conciliación automatizada. Cruza movimientos bancarios contra el Libro Mayor, detecta discrepancias —pagos duplicados, importes con decimales incorrectos, asientos huérfanos— y propone la corrección más probable para cada uno. No registra asientos definitivos: solo propone.",
    color: "blue",
    researchLines: ["01"],
    stack: [
      { role: "Modelo de conciliación y asientos", tech: "Claude 3.7 Sonnet — líder automatización contable (94.41/100)" },
      { role: "Modelo de detección de anomalías", tech: "DeepSeek-R1 — líder detección de fraude transaccional (95.55/100)" },
      { role: "Fuentes de datos", tech: "Extractos bancarios MT940 / CAMT.053 / CSV · Libro Mayor ERP" },
      { role: "Almacenamiento", tech: "DuckDB — historial conciliaciones + log propuestas aceptadas/rechazadas" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Propuesta de conciliación y corrección", score: "94.41", area: "Automatización Contable" },
      { model: "DeepSeek-R1", role: "Validación de anomalías y fraude", score: "95.55", area: "Detección de Anomalías y Fraude" },
    ],
    flow: [
      "Extracto bancario (MT940, CAMT.053 o CSV) + Movimientos del Libro Mayor del período",
      "Normalización de formatos y parsing de fechas, importes y conceptos",
      "Cruce automático: coincidencia exacta â†’ conciliado; parcial â†’ propuesta con confianza; sin coincidencia â†’ asiento huérfano",
      "Generación de propuestas de corrección (Claude 3.7 Sonnet): asientos de ajuste, duplicados identificados, contrapartidas probables",
      "Validación de anomalías (DeepSeek-R1): patrones estructurados para eludir umbrales, movimientos inusuales",
      "Informe de conciliación: conciliados automáticamente / pendientes revisión humana / anomalías marcadas",
      "Salida: informe JSON + Excel de conciliación + cola de revisión priorizada para el contable",
    ],
    promptIDE: `Crea un módulo Python llamado balance_inteligente.py con las siguientes funciones:
1. parse_bank_statement(filepath: str) -> pd.DataFrame: parsea un extracto bancario
   en formato MT940, CAMT.053 o CSV. Normaliza columnas a:
   [transaction_id, date, amount, currency, description, counterparty].
2. parse_general_ledger(filepath: str) -> pd.DataFrame: carga movimientos del Libro
   Mayor exportados del ERP (CSV/Excel). Normaliza a:
   [entry_id, date, debit_account, credit_account, amount, description, reference].
3. reconcile_transactions(bank: pd.DataFrame, ledger: pd.DataFrame,
   tolerance_eur: float = 0.01) -> dict: cruza ambos DataFrames.
   Devuelve {matched: list[dict], partial: list[dict], unmatched_bank: list[dict],
   unmatched_ledger: list[dict]}.
4. propose_corrections(unmatched: dict, llm_client) -> list[dict]: llama al LLM para
   proponer la corrección más probable para cada descuadre.
   Devuelve [{entry_id, issue_type, proposed_correction, confidence, rationale}].
5. generate_reconciliation_report(matched, partial, unmatched, corrections) -> dict:
   genera el informe final con recuento de casos por categoría y lista de correcciones
   propuestas ordenadas por confianza descendente.
Usa pandas, duckdb y la librería estándar. El módulo NO debe registrar asientos definitivos.`,
    promptLLM: `Eres el motor de propuesta de conciliación de Balance Inteligente en el Laboratorio
de Contabilidad & ERP de Horizon.
Se te proporciona un descuadre detectado entre el extracto bancario y el Libro Mayor.
El descuadre puede ser: importe incorrecto, asiento duplicado, contrapartida errónea
o asiento sin movimiento bancario correspondiente.

Tu tarea:
1. Analiza el descuadre y clasifícalo en una de las siguientes categorías:
   "duplicate_entry" | "amount_mismatch" | "wrong_account" | "orphan_bank_movement"
   | "orphan_ledger_entry" | "timing_difference".
2. Propone la corrección contable más probable. Si es un asiento de ajuste,
   especifica la cuenta de débito, la cuenta de crédito y el importe.
3. Asigna una confianza entre 0.0 y 1.0. Si la confianza es menor a 0.7,
   recomienda explícitamente revisión humana.

Restricciones críticas:
- No registres ni confirmes ningún asiento. Solo propones.
- Si el importe involucrado supera 10.000 EUR, añade siempre la nota
  "REQUIERE VALIDACI“N DE RESPONSABLE CONTABLE" con independencia de la confianza.
- No hagas afirmaciones sobre la normativa fiscal aplicable sin marcarlas como
  "[VERIFICAR NORMATIVA VIGENTE]".

Responde en JSON:
{
  "issue_type": str,
  "debit_account": str | null,
  "credit_account": str | null,
  "amount": float | null,
  "confidence": float,
  "rationale": str,
  "requires_human_review": bool,
  "review_reason": str | null
}`,
  },
  {
    id: "fisco",
    name: "Fisco Cero",
    tagline: "Cero facturas a mano, cero errores en la declaración",
    desc: "Sistema de extracción inteligente y validación fiscal de facturas. Combina OCR para lectura de documentos no estructurados con un motor de verificación que contrasta lo extraído contra las reglas de retención fiscal, detecta errores antes de la presentación de impuestos y propone la clasificación contable adecuada.",
    color: "emerald",
    researchLines: ["02"],
    stack: [
      { role: "OCR inteligente y estructuración documental", tech: "Claude 3.7 Sonnet — líder OCR contable (96.43/100)" },
      { role: "Verificación de cumplimiento fiscal", tech: "Claude 3.7 Sonnet — líder trazabilidad y cumplimiento (95.75/100)" },
      { role: "Motor OCR base", tech: "Tesseract / Azure Document Intelligence (preprocesamiento)" },
      { role: "Fuente de reglas fiscales", tech: "Tabla de tipos de IVA por tipo de gasto y país [VERIFICAR NORMATIVA VIGENTE]" },
      { role: "Almacenamiento", tech: "DuckDB — historial facturas procesadas + índice por proveedor y período" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Extracción multimodal y validación fiscal", score: "96.43", area: "OCR Contable y Estructuración" },
      { model: "Claude 3.7 Sonnet", role: "Trazabilidad y cumplimiento IVA", score: "95.75", area: "Trazabilidad y Cumplimiento Fiscal" },
    ],
    flow: [
      "Entrada: factura (PDF, imagen JPG/PNG, XML Factura-e, EDI)",
      "Preprocesamiento OCR según tipo: corrección de perspectiva (imagen) / extracción de tablas (PDF) / parsing directo (XML)",
      "Extracción estructurada (Claude 3.7 Sonnet): NIF emisor/receptor, número, fecha, conceptos, base imponible, IVA, retenciones, total",
      "Validación fiscal: tipo de IVA correcto para la naturaleza del bien/servicio [VERIFICAR NORMATIVA VIGENTE], coherencia aritmética, NIF válido, período de deducibilidad",
      "Clasificación contable: cuenta del Plan General Contable propuesta + centro de coste si hay información suficiente",
      "Salida A: registro JSON listo para ingesta en ERP · Salida B: informe de validación con errores y advertencias · Salida C: imagen anotada con campos extraídos",
    ],
    promptIDE: `Crea un módulo Python llamado fisco_cero.py con las siguientes funciones:
1. preprocess_document(filepath: str) -> dict: detecta el tipo de documento
   (image, pdf_text, pdf_scan, xml, edi) y preprocesa según el tipo.
   Devuelve {doc_type: str, raw_text: str, pages: list[str], source_file: str}.
2. extract_invoice_fields(doc: dict, llm_client) -> dict: extrae los campos clave
   de la factura usando el LLM. Devuelve:
   {issuer_nif: str, recipient_nif: str, invoice_number: str, invoice_date: str,
    line_items: list[{description, quantity, unit_price, subtotal}],
    tax_base: float, vat_rate: float, vat_amount: float,
    withholding_rate: float | null, withholding_amount: float | null,
    total: float, currency: str, confidence: float}.
3. validate_fiscal_compliance(invoice: dict, tax_rules: dict) -> dict:
   verifica la coherencia fiscal del documento.
   Devuelve {is_valid: bool, errors: list[str], warnings: list[str],
   vat_correct: bool, arithmetic_correct: bool}.
4. classify_to_chart_of_accounts(invoice: dict, chart_of_accounts: dict,
   llm_client) -> dict: propone la cuenta contable y el centro de coste.
   Devuelve {account_code: str, account_name: str, cost_center: str | null,
   confidence: float, classification_rationale: str}.
5. export_to_erp_format(invoice: dict, classification: dict) -> dict:
   genera el payload JSON para ingesta directa en ERP (formato configurable:
   SAP BAPI / Oracle REST / genérico).
Usa PyMuPDF, pytesseract, requests, duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de extracción y validación fiscal de Fisco Cero en el Laboratorio
de Contabilidad & ERP de Horizon.
Se te proporciona el texto extraído de un documento de factura (puede contener
errores de OCR, formatos irregulares de fecha o importes con separadores distintos).

Tarea 1 — Extracción:
Extrae todos los campos fiscalmente relevantes del documento. Si un campo no aparece
claramente en el texto, ponlo como null y marca confidence en 0.5 o menos.
No inventes datos que no estén en el documento.

Tarea 2 — Validación aritmética:
Verifica que: sum(line_item.subtotal) = tax_base, y que
tax_base * (1 + vat_rate/100) - withholding_amount = total.
Si hay discrepancia de más de 0.02 EUR, márcalo como error.

Tarea 3 — Advertencias fiscales:
Identifica posibles problemas fiscales (tipo de IVA inusual para el tipo de gasto,
fecha fuera del período habitual, NIF con formato inválido). Márcalos siempre como
"advertencia" y añade: "[VERIFICAR NORMATIVA VIGENTE]" junto a cualquier criterio
fiscal específico que cites.

Responde en JSON estricto con los campos definidos en extract_invoice_fields
más un campo "fiscal_warnings": list[str].`,
  },
  {
    id: "atlas",
    name: "Atlas Activos",
    tagline: "Auditor continuo de la cartera de activos fijos",
    desc: "Mantiene un registro vivo de cada activo fijo de la empresa — maquinaria, vehículos, equipos, licencias software capitalizadas —, verifica su calendario de amortización y detecta inconsistencias: activos amortizados dos veces, vidas útiles incorrectas o activos que deberían haberse dado de baja pero siguen generando asientos.",
    color: "purple",
    researchLines: ["03"],
    stack: [
      { role: "Extracción de datos de activos", tech: "Claude 3.7 Sonnet — líder extracción documental (96.43/100)" },
      { role: "Auditoría de trazabilidad", tech: "Claude 3.7 Sonnet — líder trazabilidad contable (95.75/100)" },
      { role: "Detección de duplicidades en asientos", tech: "DeepSeek-R1 — líder detección de anomalías (95.55/100)" },
      { role: "Motor de cálculo de amortización", tech: "Tablas configurables: lineal / degresivo / unidades producidas [VERIFICAR NORMATIVA VIGENTE]" },
      { role: "Almacenamiento", tech: "DuckDB — registro maestro de activos + serie temporal de asientos por activo" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Extracción y trazabilidad de activos", score: "96.43 / 95.75", area: "OCR Contable + Trazabilidad" },
      { model: "DeepSeek-R1", role: "Detección de duplicidades en asientos", score: "95.55", area: "Detección de Anomalías y Fraude" },
    ],
    flow: [
      "Entrada: documento de adquisición (factura, contrato de leasing, escritura, ficha de inventario)",
      "Extracción de datos del activo (Claude 3.7 Sonnet): descripción, categoría, fechas, valor, vida útil propuesta [VERIFICAR NORMATIVA VIGENTE]",
      "Cálculo del calendario de amortización: dotación anual/mensual, fechas de inicio y fin, asientos proyectados (propuesta, no definitivos)",
      "Monitorización continua (mensual): cruce asientos ERP vs. calendario proyectado · Detección duplicados/faltantes (DeepSeek-R1)",
      "Alertas por activos con vida útil agotada activos en sistema · Alertas por variación de valor contable",
      "Auditoría de trazabilidad (Claude 3.7 Sonnet): pista completa desde adquisición hasta baja, referencia de activo en cada asiento",
      "Salida A: dashboard estado de cartera · Salida B: inconsistencias con severidad · Salida C: informe auditoría exportable",
    ],
    promptIDE: `Crea un módulo Python llamado atlas_activos.py con las siguientes funciones:
1. register_asset(doc: dict, llm_client) -> dict: extrae los datos del activo desde
   un documento de adquisición procesado. Devuelve:
   {asset_id: str, description: str, category: str, acquisition_date: str,
    service_date: str, acquisition_cost: float, residual_value: float,
    useful_life_years: float, depreciation_method: str, confidence: float}.
2. compute_depreciation_schedule(asset: dict) -> list[dict]: calcula el calendario
   completo de amortización. Devuelve una lista de períodos:
   [{period: str (YYYY-MM), depreciation_amount: float, accumulated: float,
     net_book_value: float}].
3. audit_depreciation_entries(asset_id: str, erp_entries: pd.DataFrame,
   schedule: list[dict], llm_client) -> dict: compara los asientos registrados en ERP
   con el calendario proyectado. Devuelve:
   {discrepancies: list[{period, expected, actual, delta, issue_type}],
    anomalies: list[str], audit_score: float}.
4. generate_asset_report(asset: dict, schedule: list[dict],
   audit_result: dict) -> dict: genera el informe de estado del activo con:
   {asset_id, current_net_book_value, remaining_useful_life_months,
    is_fully_depreciated: bool, open_discrepancies: int, audit_score: float}.
5. flag_for_writeoff(asset: dict, schedule: list[dict]) -> dict:
   determina si el activo debe darse de baja. Devuelve:
   {should_write_off: bool, reason: str, recommended_action: str}.
Usa pandas, duckdb y la librería estándar. Sin dependencias adicionales.`,
    promptLLM: `Eres el módulo de auditoría de trazabilidad de Atlas Activos en el Laboratorio
de Contabilidad & ERP de Horizon.
Se te proporciona el historial completo de asientos de amortización de un activo
fijo (registrados en el ERP) y el calendario de amortización proyectado por el sistema.

Tu tarea:
1. Verifica que cada período del calendario tiene su asiento correspondiente en el ERP
   con el importe correcto (tolerancia: ±0.01 EUR por redondeo).
2. Identifica períodos con asientos duplicados o faltantes.
3. Verifica que la cuenta contable utilizada en cada asiento corresponde a la
   categoría del activo.
4. Comprueba que la pista de auditoría es completa: cada asiento debe referenciar
   el identificador del activo.
5. Emite un "audit_score" entre 0.0 y 1.0 donde 1.0 es trazabilidad perfecta.

Restricciones:
- No hagas afirmaciones sobre la normativa de amortización aplicable sin añadir
  "[VERIFICAR NORMATIVA VIGENTE]".
- Si detectas que la vida útil aplicada difiere de las tablas estándar, señálalo
  pero no concluyas que es incorrecto: puede haber una justificación técnica
  que el sistema no conoce.

Responde en JSON:
{
  "missing_periods": [str],
  "duplicate_periods": [str],
  "wrong_account_periods": [str],
  "orphan_entries": [str],
  "audit_score": float,
  "audit_notes": str
}`,
  },
  {
    id: "centinela",
    name: "Fisco Centinela",
    tagline: "Observa el patrón, no el gasto individual",
    desc: "No bloquea gastos, no rechaza reembolsos, no toma decisiones disciplinarias. Analiza cada nota de gasto, la compara con el patrón histórico del empleado y del departamento, y marca las que se salen del patrón para revisión humana. Mira el patrón, no el gasto individual aislado.",
    color: "rose",
    researchLines: ["04"],
    stack: [
      { role: "Extracción de justificantes de gasto", tech: "Claude 3.7 Sonnet — líder OCR contable (96.43/100) · 97.2 en Expense_Receipt_Structuring" },
      { role: "Detección de anomalías y fraude", tech: "DeepSeek-R1 — líder detección de fraude (95.55/100)" },
      { role: "Motor de perfilado estadístico", tech: "pandas + scipy — percentiles y desviaciones típicas por empleado/departamento" },
      { role: "Política de gastos", tech: "Reglas configurables: límites por categoría, días laborables, proveedores autorizados" },
      { role: "Almacenamiento", tech: "DuckDB — historial de gastos por empleado + log de alertas y resoluciones" },
    ],
    whyModels: [
      { model: "Claude 3.7 Sonnet", role: "Extracción estructurada de justificantes", score: "96.43", area: "OCR Contable y Estructuración" },
      { model: "DeepSeek-R1", role: "Análisis de anomalías y fraude transaccional", score: "95.55", area: "Detección de Anomalías y Fraude" },
    ],
    flow: [
      "Entrada: nota de gasto (ticket de imagen, factura PDF, formulario de reembolso)",
      "Extracción estructurada (Claude 3.7 Sonnet): fecha/hora, importe, proveedor, categoría, empleado, departamento",
      "Validación contra política de gastos: límites por categoría, proveedores en lista negra, días no laborables",
      "Detección de duplicados (DeepSeek-R1): comparación con histórico — mismo proveedor + importe + fecha cercana de este u otro empleado",
      "Análisis de patrón estadístico (DeepSeek-R1): percentil 95+ del historial, frecuencia inusual reciente, cambio significativo de patrón",
      "Clasificación de riesgo: VERDE (aprobación automática sugerida) · AMARILLO (revisión por responsable) · ROJO (auditoría interna)",
      "Salida A: clasificación de riesgo por gasto · Salida B: cola de revisión priorizada · Salida C: informe semanal por departamento",
    ],
    promptIDE: `Crea un módulo Python llamado fisco_centinela.py con las siguientes funciones:
1. extract_expense_data(filepath: str, llm_client) -> dict: extrae datos de un
   justificante de gasto. Devuelve:
   {expense_id: str, employee_id: str, department: str, date: str, time: str | null,
    amount: float, currency: str, vendor: str, category: str, description: str,
    confidence: float}.
2. check_policy_compliance(expense: dict, policy: dict) -> dict:
   verifica la política de gastos de la empresa. Devuelve:
   {compliant: bool, violations: list[{rule, description, severity: "warn"|"block"}]}.
3. detect_duplicates(expense: dict, history: pd.DataFrame,
   tolerance_days: int = 3) -> dict:
   busca gastos similares en el historial. Devuelve:
   {is_duplicate: bool, similar_expenses: list[dict], duplicate_confidence: float}.
4. compute_anomaly_score(expense: dict, employee_history: pd.DataFrame,
   llm_client) -> dict:
   calcula el score de anomalía estadística.
   Devuelve: {anomaly_score: float, percentile_amount: float,
   pattern_change_detected: bool, risk_level: "green"|"yellow"|"red",
   risk_factors: list[str]}.
5. generate_review_queue(expenses: list[dict]) -> list[dict]:
   ordena los gastos por nivel de riesgo y los devuelve como cola de revisión.
Usa pandas, scipy, duckdb y la librería estándar.`,
    promptLLM: `Eres el motor de análisis de anomalías de Fisco Centinela en el Laboratorio
de Contabilidad & ERP de Horizon.
Se te proporciona un gasto individual y el historial de gastos del empleado en los
últimos 12 meses, agrupado por categoría con estadísticas descriptivas (media, mediana,
percentil 90, frecuencia mensual).

Tu tarea:
1. Evalúa si el importe del gasto es estadísticamente inusual para ese empleado
   en esa categoría (umbral: percentil 95 del historial).
2. Evalúa si la frecuencia reciente de gastos en esa categoría es inusual
   respecto a los 6 meses anteriores.
3. Evalúa si hay señales contextuales de riesgo: proveedor nunca usado antes,
   fecha en día no laborable, descripción vaga o genérica.
4. Combina las señales en un risk_level ("green", "yellow", "red") y un
   anomaly_score entre 0.0 y 1.0.

Reglas de clasificación:
- RED: anomaly_score >= 0.80 o duplicado confirmado.
- YELLOW: 0.50 <= anomaly_score < 0.80.
- GREEN: anomaly_score < 0.50 y sin alertas de política.

Responde en JSON:
{
  "anomaly_score": float,
  "risk_level": "green" | "yellow" | "red",
  "amount_percentile": float,
  "frequency_anomaly": bool,
  "contextual_risk_signals": [str],
  "risk_factors": [str],
  "recommended_action": str
}

No tomes decisiones disciplinarias. No afirmes categóricamente que hay fraude:
usa siempre lenguaje de probabilidad y recomendación de revisión.`,
  },
];

const MARKET_APPS = [
  {
    name: "SAP Business AI (Joule)",
    desc: "SAP integra IA generativa bajo la marca Joule en sus productos ERP (S/4HANA, SuccessFactors). Incluye asistencia en procesos contables, conciliación y flujos de aprobación.",
    url: "https://sap.com/products/artificial-intelligence",
    tag: "ERP Corporativo",
  },
  {
    name: "Microsoft Dynamics 365 Copilot",
    desc: "Copilot integrado en Dynamics 365 Finance, con asistencia en conciliación, generación de previsiones financieras y automatización de cuentas a cobrar y pagar.",
    url: "https://microsoft.com/dynamics365",
    tag: "ERP + IA",
  },
  {
    name: "Sage Intacct + AI",
    desc: "Sage Intacct incorpora automatización basada en IA para medianas empresas: detección de anomalías en transacciones, automatización de cierres y conciliaciones bancarias.",
    url: "https://sage.com/intacct",
    tag: "Mediana Empresa",
  },
  {
    name: "Expensify",
    desc: "Gestión de notas de gastos con OCR automático de recibos, categorización con IA y detección de gastos duplicados o fuera de política. Ampliamente utilizada en empresas medianas.",
    url: "https://expensify.com",
    tag: "Gestión de Gastos",
  },
  {
    name: "Vic.ai",
    desc: "Automatización de cuentas a pagar (AP automation) basada en IA. Procesa facturas de proveedores, aprende a clasificarlas contablemente y automatiza el flujo de aprobación.",
    url: "https://vic.ai",
    tag: "Cuentas a Pagar",
  },
];

const VERIFICATION_POINTS = [
  {
    id: "v1",
    title: "Asimetría en la cobertura de benchmarks por modelo",
    items: [
      "Gestión de Clientes y Proveedores: Claude 3.7 Sonnet (67% cobertura) carece de evaluación en FinBen_Credit_Risk_Forecasting. SAP-Agent Swarm (33% cobertura) solo fue evaluado en Supplier_Dispute_Resolution.",
      "Workflows ERP: CrewAI-Accounting-Flow (67% cobertura) no tiene datos registrados para Three_Way_Matching_ERP.",
      "Detección de Anomalías: Claude 3.7 Sonnet (67% cobertura) no cuenta con datos en Duplicate_Invoice_Filter. GPT-4.5 (33% cobertura) solo registra datos en FinBen_Fraud_Anomaly_Task.",
      "OCR y Estructuración: SAP-Agent Swarm (33% cobertura) solo dispone de resultado en Contract_Financial_Clause_IE.",
      "Trazabilidad y Cumplimiento: GPT-4.5 (67% cobertura) no registra datos en FinBen_Decision_Compliance. DeepSeek-R1 (33% cobertura) solo fue evaluado en Tax_Regulation_VAT_Compliance.",
    ],
  },
  {
    id: "v2",
    title: "RegAudit_Bench y optimización tributaria avanzada",
    items: [
      "RegAudit_Bench está asignado al módulo de Finanzas en el sistema STATER, no a Contabilidad & ERP. El área contable evalúa Audit_Trail_Consistency y Tax_Regulation_VAT_Compliance como proxies de cumplimiento normativo.",
      "Las evaluaciones específicas de RegAudit_Bench aplicadas a flujos ERP permanecen como [DATO PENDIENTE DE VERIFICAR].",
      "La optimización tributaria estratégica corporativa más allá de la validación de retenciones de IVA/SII también queda como [DATO PENDIENTE DE VERIFICAR].",
    ],
  },
  {
    id: "v3",
    title: "Latencias en llamadas a conectores ERP",
    items: [
      "Las métricas de latencia de ejecución por llamada a APIs estándar de ERP (BAPI / OData de SAP o REST de Oracle) no forman parte del reporte de benchmarks.",
      "Este dato es especialmente relevante para los proyectos de orquestación multi-agente (Balance Inteligente y Fisco Centinela) en entornos de producción con SLA definidos.",
    ],
  },
  {
    id: "v4",
    title: "Normativa fiscal específica por jurisdicción",
    items: [
      "Todas las referencias a normativa fiscal en este cuaderno (tipos de IVA, tablas de amortización, retenciones) están marcadas como [VERIFICAR NORMATIVA VIGENTE].",
      "Las reglas cambian por jurisdicción y con cada ejercicio fiscal. Ningún dato de este cuaderno debe usarse como criterio fiscal definitivo sin validación por un asesor fiscal colegiado en la jurisdicción correspondiente.",
    ],
  },
];

// —€—€—€ Sub-components —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

function ResearchLineCard({ line }) {
  const [open, setOpen] = useState(false);

  const styles = {
    blue:    { card: "border-blue-400/30 bg-blue-400/5",    score: "text-blue-400",    badge: "bg-blue-400/10 text-blue-300 border-blue-400/20" },
    emerald: { card: "border-emerald-400/30 bg-emerald-400/5", score: "text-emerald-400", badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20" },
    purple:  { card: "border-purple-400/30 bg-purple-400/5",  score: "text-purple-400",  badge: "bg-purple-400/10 text-purple-300 border-purple-400/20" },
    rose:    { card: "border-rose-400/30 bg-rose-400/5",      score: "text-rose-400",    badge: "bg-rose-400/10 text-rose-300 border-rose-400/20" },
  };
  const s = styles[line.color];

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${s.card}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:opacity-90 transition-opacity"
      >
        <span className="font-display text-2xl sm:text-3xl text-white/20 shrink-0 leading-none mt-0.5">
          {line.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg text-white leading-snug">{line.title}</h3>
            <ChevronDown size={16} className={`shrink-0 text-white/40 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="text-white/50 text-sm mt-1.5 leading-relaxed line-clamp-2">{line.summary}</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`text-xs border px-2.5 py-0.5 rounded-full ${s.badge}`}>
              Top: {line.topModel.name}
            </span>
            <span className={`font-display text-sm font-bold ${s.score}`}>
              {line.topModel.score}/100
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/5 pt-4 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed">{line.detail}</p>
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Benchmarks de referencia</p>
            <div className="flex flex-wrap gap-2">
              {line.benchmarks.map((b) => (
                <div key={b.name} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-white/80">{b.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Modelo líder · STATER Accounting Leaderboard 2026-08-29</p>
            <p className="text-sm text-white font-medium">{line.topModel.name}</p>
            <p className="text-xs text-white/50 mt-0.5">{line.topModel.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowStep({ step, index, total }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <span className="text-[10px] text-accent font-bold">{index + 1}</span>
        </div>
        {index < total - 1 && <div className="w-px h-4 bg-white/10 mt-1" />}
      </div>
      <p className="text-sm text-white/60 pb-4 leading-relaxed">{step}</p>
    </div>
  );
}

function PromptBlock({ label, content }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-white/40" />
          <span className="text-xs text-white/50 font-mono">{label}</span>
        </div>
        <button onClick={copy} className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-0.5 rounded hover:bg-white/10">
          {copied ? "““ Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="text-xs text-white/70 p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono bg-black/20">
        {content}
      </pre>
    </div>
  );
}

function ProjectCard({ project }) {
  const [tab, setTab] = useState("stack");

  const styles = {
    blue:    { accent: "text-blue-400",    border: "border-blue-400/30",    bg: "bg-blue-400/5",    badge: "bg-blue-400/10 text-blue-300 border-blue-400/20",    dot: "bg-blue-400",    tabBorder: "border-blue-400/30" },
    emerald: { accent: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/5", badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20", dot: "bg-emerald-400", tabBorder: "border-emerald-400/30" },
    purple:  { accent: "text-purple-400",  border: "border-purple-400/30",  bg: "bg-purple-400/5",  badge: "bg-purple-400/10 text-purple-300 border-purple-400/20",  dot: "bg-purple-400",  tabBorder: "border-purple-400/30" },
    rose:    { accent: "text-rose-400",    border: "border-rose-400/30",    bg: "bg-rose-400/5",    badge: "bg-rose-400/10 text-rose-300 border-rose-400/20",    dot: "bg-rose-400",    tabBorder: "border-rose-400/30" },
  };
  const c = styles[project.color];
  const tabs = [
    { id: "stack", label: "Stack & Modelos" },
    { id: "flow", label: "Flujo de datos" },
    { id: "prompts", label: "Prompts maestros" },
  ];

  return (
    <div className={`border ${c.border} ${c.bg} rounded-2xl overflow-hidden`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${c.dot} mt-2 shrink-0`} />
          <div>
            <h3 className={`font-display text-2xl sm:text-3xl ${c.accent}`}>{project.name}</h3>
            <p className="text-white/40 text-sm mt-0.5">{project.tagline}</p>
          </div>
        </div>
        <p className="text-white/65 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-white/30">Líneas de investigación:</span>
          {project.researchLines.map((n) => {
            const line = RESEARCH_LINES.find((l) => l.number === n);
            return (
              <span key={n} className={`text-xs border px-2 py-0.5 rounded-full ${c.badge}`}>
                {n} · {line?.title.split(" ").slice(0, 3).join(" ")}–¦
              </span>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/5 flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 text-xs py-3 px-2 transition-all ${
              tab === t.id
                ? `${c.accent} border-b-2 ${c.tabBorder} bg-white/5`
                : "text-white/30 hover:text-white/60 border-b-2 border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {tab === "stack" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Componentes técnicos</p>
              <div className="space-y-2">
                {project.stack.map((s) => (
                  <div key={s.role} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">{s.role}</p>
                      <p className="text-sm text-white/80 font-mono">{s.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Por qué estos modelos · STATER Accounting Leaderboard</p>
              <div className="space-y-2">
                {project.whyModels.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white font-medium">{m.model}</p>
                      <p className="text-xs text-white/40 mt-0.5">{m.role}</p>
                      <p className="text-xs text-white/30 mt-1">{m.area}</p>
                    </div>
                    <div className={`text-lg font-display ${c.accent} shrink-0`}>{m.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "flow" && (
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Pipeline completo</p>
            {project.flow.map((step, i) => (
              <FlowStep key={i} step={step} index={i} total={project.flow.length} />
            ))}
          </div>
        )}

        {tab === "prompts" && (
          <div className="space-y-4">
            <PromptBlock label="prompt_ide.txt — Para Cursor / VS Code + Copilot" content={project.promptIDE} />
            <PromptBlock label="prompt_llm.txt — Para el modelo LLM asistente" content={project.promptLLM} />
          </div>
        )}
      </div>
    </div>
  );
}

function VerificationItem({ point }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-yellow-400/20 bg-yellow-400/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-yellow-400/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle size={14} className="text-yellow-400 shrink-0" />
          <span className="text-sm text-white/80">{point.title}</span>
        </div>
        <ChevronDown size={14} className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-yellow-400/10 pt-4 space-y-2">
          {point.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <ChevronRight size={12} className="text-yellow-400/50 mt-0.5 shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// —€—€—€ Page —€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€—€

export default function ContabilidadLab() {
  return (
    <div className="min-h-full bg-[#111111]">
      {/* Back nav */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
          <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft size={14} />
            Todos los laboratorios
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
              <Calculator size={28} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 px-3 py-0.5 rounded-full">
                  Laboratorio verificado
                </span>
                <span className="text-xs text-white/20">STATER Accounting · 2026-08-29</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de{" "}
                <span className="text-emerald-400">Contabilidad</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">
                IA para conciliación bancaria, procesamiento de facturas, auditoría de activos y
                detección de fraude. Benchmarks, decisiones de diseño justificadas por datos y
                cuatro proyectos en construcción.
              </p>

              {/* Aviso de dominio */}
              <div className="mt-5 inline-flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-xl px-4 py-3 max-w-xl">
                <AlertTriangle size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/70 leading-relaxed">
                  <strong className="text-yellow-300">Aviso de dominio:</strong> Las herramientas descritas son de apoyo técnico y analítico.
                  Ninguna sustituye el criterio de un asesor fiscal o contable colegiado.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[
                  { label: "Líneas de investigación", value: "4" },
                  { label: "Proyectos activos", value: "4" },
                  { label: "Benchmarks cubiertos", value: "12" },
                  { label: "Aplicaciones de mercado", value: "5" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-white">{s.value}</p>
                    <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-20">

        {/* —€—€ Módulo 1 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 1</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué se investiga aquí</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                La hipótesis central no es que la IA "automatiza la contabilidad": es que la IA puede ser la
                primera capa de revisión que llega antes que el contable, deja los casos simples resueltos
                y escala los complejos o ambiguos para criterio humano.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {RESEARCH_LINES.map((line) => <ResearchLineCard key={line.id} line={line} />)}
          </div>

          <div className="mt-6 border border-white/5 bg-white/2 rounded-2xl p-5">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Cadena de calidad del dato</p>
            <p className="text-sm text-white/45 leading-relaxed">
              Las cuatro líneas están ordenadas por su rol en la cadena. La conciliación (01) es la base:
              si el Libro Mayor no está cuadrado, nada de lo que venga después es fiable. El procesamiento
              de facturas (02) alimenta el Libro Mayor. La auditoría de activos (03) garantiza que el balance
              refleja la realidad. Y la detección de fraude (04) protege que nadie esté metiendo la mano
              en la caja mientras las otras tres funcionan correctamente.
            </p>
          </div>
        </section>

        {/* —€—€ Módulo 2 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 2</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Casos de desarrollo</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cuatro proyectos que cubren la cadena completa de calidad del dato contable. Cada uno incluye
                el stack técnico justificado por benchmarks, el flujo de datos completo y los prompts maestros
                para IDE y LLM asistente.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        {/* —€—€ Módulo 3 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch size={14} className="text-white/40" />
            </div>
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Módulo 3</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Qué aplicaciones ya existen en el mercado</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Cinco aplicaciones reales de IA aplicada a contabilidad y ERP. Ninguna sustituye el criterio de
                un contable o asesor fiscal colegiado. Los datos de características deben verificarse en las webs
                oficiales.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MARKET_APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs border border-white/10 text-white/30 px-2 py-0.5 rounded-full">{app.tag}</span>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug mb-2">{app.name}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{app.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-yellow-400/50 flex items-center gap-1.5">
                    <AlertTriangle size={10} />
                    Verificar características en web oficial
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* —€—€ Módulo 4 —€—€ */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-yellow-400/40 uppercase tracking-widest mb-1">Módulo 4</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">Puntos a verificar</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-2xl leading-relaxed">
                Los siguientes puntos requieren revisión antes de publicar o referenciar los datos de este
                cuaderno en materiales externos.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {VERIFICATION_POINTS.map((point) => <VerificationItem key={point.id} point={point} />)}
          </div>
        </section>

        {/* —€—€ Footer CTA —€—€ */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-white/25 mb-1">Cuaderno de trabajo · STATER Accounting & ERP · 2026-08-29</p>
            <p className="text-sm text-white/45">
              Datos de{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">latest_rankings_accounting.md</code>{" "}
              y{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/60">areas_accounting.yaml</code>.
              No constituye asesoramiento fiscal, contable o de auditoría.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/taller" className="text-sm text-accent hover:text-accent-light border border-accent/30 hover:border-accent/60 px-4 py-2 rounded-xl transition-all">
              Ver casos en el Taller â†’
            </Link>
            <Link to="/foro" className="text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              Publicar un proyecto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

