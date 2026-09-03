import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Download } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { HardHat } from "lucide-react";

// â”€â”€â”€ Constantes de datos (Ingeniería & Arquitectura) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRIMARY_TASKS = [
  {
    id: "I1.1",
    label: "Generador de Distribuciones Espaciales y Layouts Arquitectónicos (Vitruvio IA)",
    desc: "Generación de propuestas de distribución espacial en cuadrícula paramétrica a partir de programa de necesidades, orientación solar y matriz de adyacencias, con exportación vectorial SVG.",
    audience: "Estudios de arquitectura, proyectistas, diseñadores de interiores, promotoras inmobiliarias.",
  },
  {
    id: "I1.2",
    label: "Simulador de Eficiencia Energética y Envolvente Térmica (Gaia Eficiencia)",
    desc: "Modelado higrotérmico, cálculo de transmitancias térmicas (valores U), puentes térmicos y optimización de demanda energética según Código Técnico (CTE DB-HE) y estándares Passivhaus.",
    audience: "Consultores de sostenibilidad, ingenieros de edificación, certificadores energéticos, proyectistas HVAC.",
  },
  {
    id: "I1.3",
    label: "Monitor de Planificación de Obras, Control de Costes y Desviaciones (Atlas Constructor)",
    desc: "Cuadro de mando para seguimiento de hitos constructivos, análisis de camino crítico (PERT/CPM), control de certificaciones acumuladas y prevención de sobrecostes.",
    audience: "Directores de obra, jefes de producción, project managers de construcción, empresas constructoras.",
  },
  {
    id: "I1.4",
    label: "Transformador Automático de Requisitos PRD a Diagramas UML y Modelo C4 (R2A Engine)",
    desc: "Conversión de especificaciones funcionales en diagramas de arquitectura de software (Componentes, Secuencia, Contenedores C4, PlantUML / Mermaid) con consistencia de interfaces.",
    audience: "Arquitectos de software, tech leads, ingenieros de sistemas, consultores de desarrollo.",
  },
  {
    id: "I1.5",
    label: "Motor de Optimización de Diseño Multidisciplinar (MDO) y Simulación Física",
    desc: "Exploración paramétrica en bucle cerrado que equilibra variables estructurales, aerodinámicas, térmicas y de masa con solucionadores SciPy y modelos sustitutos.",
    audience: "Ingenieros mecánicos, diseñadores aeroespaciales, analistas de simulación multifísica.",
  },
  {
    id: "I1.6",
    label: "Generador de Registros de Decisión Arquitectónica (ADRs) y Análisis de Trade-Offs",
    desc: "Formalización estructurada de decisiones técnicas en software o ingeniería civil, evaluando alternativas descartadas, consecuencias esperadas y riesgos operacionales.",
    audience: "Comités de arquitectura técnica, directores de ingeniería (CTO/VP Eng), consultores estratégicos.",
  },
];

const SECONDARY_TASKS = [
  { id: "SEC-ENG-01", label: "Validador de Cumplimiento Normativo (CTE DB-HE / Eurocódigos / ISO 19650)", desc: "Verificación automática de restricciones de edificación, retranqueos, coeficientes de seguridad y normativas constructivas." },
  { id: "SEC-ENG-02", label: "Generador de Planos Esquemáticos y Exportación Gráfica (SVG / DXF / PlantUML)", desc: "Renderizado visual directo de layouts y diagramas de flujo/arquitectura listos para CAD o documentación técnica." },
  { id: "SEC-ENG-03", label: "Pista de Trazabilidad Requisito-Código y Auditoría de Certificación en DuckDB", desc: "Mapeo bidireccional inmutable entre requisitos técnicos, decisiones tomadas y artefactos generados." },
  { id: "SEC-ENG-04", label: "Persistencia Columnar Ultrarrápida y Modo Offline (DuckDB + Parquet)", desc: "Almacenamiento analítico local de proyectos, variantes de diseño y simulaciones numéricas." },
  { id: "SEC-ENG-05", label: "Exportador a Formatos BIM / IFC e Interoperabilidad CAD", desc: "Generación de esquemas JSON estructurados compatibles con exportadores a Revit, ArchiCAD o FreeCAD." },
  { id: "SEC-ENG-06", label: "Detector de Riesgos Operacionales y Seguridad en Obra (Safety Red-Teaming)", desc: "Identificación preventiva de interferencias constructivas, riesgos de colisión y puntos críticos de seguridad laboral." },
  { id: "SEC-ENG-07", label: "Asistente Técnico con Guardrails Antialucinación y Aislamiento de Firma", desc: "Restricción severa que impide la validación autónoma de cálculos estructurales sin visado de técnico colegiado." },
  { id: "SEC-ENG-08", label: "Conector de Simulación Térmica y Meteorológica (EPW / EnergyPlus / OpenStudio)", desc: "Integración de series meteorológicas horarias y datos climáticos para simulaciones dinámicas." },
];

const ENGINEERING_DOMAINS = [
  "Arquitectura, Distribución Espacial & Urbanismo",
  "Ingeniería Estructural & Cálculo de Estructuras (Eurocódigos / CTE)",
  "Eficiencia Energética, Climatización (HVAC) & Sostenibilidad",
  "Ingeniería de Software, Arquitectura de Sistemas & Modelo C4",
  "Ingeniería Mecánica, MDO & Simulación Aeroespacial",
  "Gestión y Dirección de Obras de Construcción & BIM",
];

const COMPUTATION_ENGINES = [
  "Python + NumPy / SciPy (Cálculo numérico y optimización física)",
  "svgwrite / ezdxf (Generación y manipulación de planos vectoriales SVG/DXF)",
  "PlantUML / Mermaid (Generación de diagramas de arquitectura C4 y UML)",
  "EnergyPlus / OpenStudio API (Simulación energética de edificios)",
  "NetworkX / PuLP (Optimización de cronogramas PERT/CPM y caminos críticos)",
  "DuckDB + Parquet (Almacén analítico de especificaciones y modelos)",
];

const ENGINEERING_METRICS = [
  { id: "circulation_eff", label: "Eficiencia de Circulación Espacial (Ratio Ãštil/Pasillos)", cat: "Diseño Espacial", desc: "Porcentaje de superficie útil respecto al área total construida del proyecto." },
  { id: "orientation_solar_score", label: "Índice de Captación y Orientación Solar", cat: "Diseño Espacial", desc: "Grado de concordancia entre la orientación de estancias principales y la radiación solar óptima." },
  { id: "thermal_transmittance_u", label: "Transmitancia Térmica Global U (W/m²K)", cat: "Eficiencia Energética", desc: "Aislamiento térmico medio ponderado de la envolvente del edificio según CTE DB-HE." },
  { id: "energy_demand_kwh", label: "Demanda Energética Anual Estimada (kWh/m²·año)", cat: "Eficiencia Energética", desc: "Consumo previsto para calefacción, refrigeración y ACS del inmueble." },
  { id: "schedule_variance_sv", label: "Varianza de Cronograma (Schedule Variance - EVM)", cat: "Gestión de Obra", desc: "Desviación temporal entre el valor ganado (EV) y el valor planificado (PV) en la planificación." },
  { id: "prd_to_uml_f1", label: "F1-Score en Síntesis de Diagramas (R2ABench)", cat: "Arquitectura Software", desc: "Precisión y exhaustividad en la traducción de requisitos funcionales a componentes UML/C4." },
  { id: "mdo_optimality_gap", label: "Convergencia Multidisciplinar (MDO Gap %)", cat: "Ingeniería Física", desc: "Alineación y equilibrio óptimo entre variables físicas contrapuestas (peso vs. resistencia)." },
  { id: "traceability_coverage", label: "Cobertura de Trazabilidad Requisito-Diseño", cat: "Seguridad & Calidad", desc: "Porcentaje de requisitos técnicos con validación verificable y artefacto de diseño asociado." },
];

const VALIDATION_MODELS = [
  "Doble Etapa: Razonamiento Multidominio GPT-4.5 + Verificación de Trazabilidad Claude 3.7 Sonnet",
  "Validación Determinista contra Normativa Técnica de la Edificación (CTE / Eurocódigos)",
  "Verificación Numérica de Transmitancias y Puentes Térmicos con Fórmulas Termodinámicas",
  "Auditoría de Grafos de Dependencia y Matriz de Adyacencias Espaciales",
];

const SAFETY_GUARDRAILS = [
  "Aislamiento de Responsabilidad Técnica: Prohibición de Visado Automático sin Técnico Colegiado",
  "Bloqueo Obligatorio ante Incumplimiento de Retranqueos Normativos o Superficies Mínimas",
  "Alerta de Seguridad Crítica en Interferencias de Estructura o Rutas de Evacuación",
  "Registro Inmutable de Trade-offs y Límites de Carga en Todo Informe de Diseño",
];

const UI_FRAMEWORKS = [
  "Streamlit (Dashboard interactivo con visores SVG de planos y gráficos energéticos)",
  "FastAPI + React / Next.js (Plataforma colaborativa BIM con visor 2D/3D y roles de equipo)",
  "Flet (Aplicación de escritorio local .exe para estaciones de ingeniería aisladas)",
];

const STORAGE_ENGINES = [
  "DuckDB + Ficheros Parquet (Almacén analítico columnar para histórico de variantes y métricas)",
  "SQLite con Esquemas JSON para Grafo de Dependencias y Fichas de Estancias",
  "Repositorio de Ficheros SVG / DXF / PlantUML con Control de Versiones",
  "Almacenamiento Estructurado de Proyectos en Ficheros JSON-LD y Markdown",
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function getAutoMetrics(primaryId, secondaryIds) {
  const auto = new Set();
  if (primaryId === "I1.1") ["circulation_eff", "orientation_solar_score", "traceability_coverage"].forEach(m => auto.add(m));
  if (primaryId === "I1.2") ["thermal_transmittance_u", "energy_demand_kwh", "traceability_coverage"].forEach(m => auto.add(m));
  if (primaryId === "I1.3") ["schedule_variance_sv", "traceability_coverage"].forEach(m => auto.add(m));
  if (primaryId === "I1.4") ["prd_to_uml_f1", "traceability_coverage"].forEach(m => auto.add(m));
  if (primaryId === "I1.5") ["mdo_optimality_gap", "traceability_coverage"].forEach(m => auto.add(m));
  if (primaryId === "I1.6") ["traceability_coverage"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-ENG-01")) ["traceability_coverage"].forEach(m => auto.add(m));
  if (secondaryIds.includes("SEC-ENG-08")) ["thermal_transmittance_u", "energy_demand_kwh"].forEach(m => auto.add(m));
  return [...auto];
}

function getAutoStorage(secondaryIds, primaryId) {
  if (primaryId === "I1.1" || secondaryIds.includes("SEC-ENG-03") || secondaryIds.includes("SEC-ENG-04")) {
    return STORAGE_ENGINES[0]; // DuckDB + Parquet
  }
  return "";
}

function needsValidationStep(primaryId, secondaryIds) {
  return primaryId === "I1.1" || primaryId === "I1.2" || primaryId === "I1.5" || secondaryIds.includes("SEC-ENG-01") || secondaryIds.includes("SEC-ENG-06") || secondaryIds.includes("SEC-ENG-07");
}

// â”€â”€â”€ Generador del informe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function generateReport(data) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const primary = PRIMARY_TASKS.find(t => t.id === data.primaryTask);
  const secondaries = SECONDARY_TASKS.filter(s => data.secondaryTasks.includes(s.id));
  const metrics = ENGINEERING_METRICS.filter(m => data.selectedMetrics.includes(m.id));
  const appSlug = (data.appName || "eng_app").toLowerCase().replace(/\s+/g, "_");
  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);
  const hasSEC01 = data.secondaryTasks.includes("SEC-ENG-01");
  const hasSEC02 = data.secondaryTasks.includes("SEC-ENG-02");
  const hasSEC03 = data.secondaryTasks.includes("SEC-ENG-03");
  const hasSEC04 = data.secondaryTasks.includes("SEC-ENG-04");
  const hasSEC05 = data.secondaryTasks.includes("SEC-ENG-05");
  const hasSEC06 = data.secondaryTasks.includes("SEC-ENG-06");
  const hasSEC07 = data.secondaryTasks.includes("SEC-ENG-07");
  const hasSEC08 = data.secondaryTasks.includes("SEC-ENG-08");

  const metricsByCategory = metrics.reduce((acc, m) => {
    if (!acc[m.cat]) acc[m.cat] = [];
    acc[m.cat].push(m);
    return acc;
  }, {});

  const treeLines = [
    appSlug + "/",
    "â”œâ”€â”€ src/",
    "â”‚   â”œâ”€â”€ __init__.py",
    "â”‚   â”œâ”€â”€ config.py                 # Parámetros del proyecto, tolerancias geométricas y rutas",
    "â”‚   â”œâ”€â”€ schemas.py                # Modelos Pydantic v2 para estancias, envolventes y diagramas" + (hasSEC07 ? "\nâ”‚   â”‚                             # â†’ incluye middleware Guardrails de Aislamiento de Firma (BR-ENG-05)" : ""),
    data.primaryTask === "I1.1" ? "â”‚   â”œâ”€â”€ spatial_layout.py         # Motor de distribución en cuadrícula paramétrica (BR-ENG-01)" : null,
    data.primaryTask === "I1.1" || hasSEC02 ? "â”‚   â”œâ”€â”€ svg_renderer.py           # Renderizador vectorial de planos y diagramas con svgwrite" : null,
    data.primaryTask === "I1.2" || hasSEC08 ? "â”‚   â”œâ”€â”€ thermal_engine.py         # Simulador de transmitancia U y cálculo higrotérmico (BR-ENG-02)" : null,
    data.primaryTask === "I1.3" ? "â”‚   â”œâ”€â”€ construction_monitor.py   # Motor de seguimiento PERT/CPM y varianza de costes" : null,
    data.primaryTask === "I1.4" ? "â”‚   â”œâ”€â”€ prd_to_c4.py              # Sintetizador de requisitos funcionales a PlantUML / C4 (BR-ENG-03)" : null,
    data.primaryTask === "I1.5" ? "â”‚   â”œâ”€â”€ mdo_optimizer.py          # Optimizador multidisciplinar con modelos sustitutos" : null,
    data.primaryTask === "I1.6" ? "â”‚   â”œâ”€â”€ adr_generator.py          # Generador de Architecture Decision Records y trade-offs" : null,
    hasSEC01 ? "â”‚   â”œâ”€â”€ normative_checker.py      # Validador de cumplimiento de CTE y normativas técnicas" : null,
    "â”‚   â”œâ”€â”€ storage.py                # " + (hasSEC04 ? "DuckDB + Parquet (BR-ENG-04) con trazabilidad inmutable" : "Capa de persistencia técnica"),
    "â”‚   â”œâ”€â”€ technical_reporting.py    # Generador de memorias técnicas y memorias de cálculo (PDF / Markdown)",
    "â”‚   â””â”€â”€ ui/",
    "â”‚       â”œâ”€â”€ __init__.py",
    "â”‚       â”œâ”€â”€ components.py         # Visores de planos SVG, tablas de transmitancias y tarjetas de estancias",
    "â”‚       â””â”€â”€ main_view.py          # Dashboard de ingeniería y panel de proyecto",
    "â”œâ”€â”€ tests/",
    "â”‚   â”œâ”€â”€ test_schemas.py           # Pruebas de esquemas y validaciones geométricas",
    data.primaryTask === "I1.1" ? "â”‚   â”œâ”€â”€ test_spatial_layout.py    # Casos de prueba de adyacencias y retranqueos" : null,
    data.primaryTask === "I1.2" ? "â”‚   â””â”€â”€ test_thermal_calc.py      # Validación de fórmulas de transmitancia térmica" : null,
    "â”œâ”€â”€ data/                         # Ficheros SVG, series climáticas EPW y caché de proyecto",
    "â”œâ”€â”€ requirements.txt              # svgwrite, numpy, scipy, duckdb, pydantic, pytest",
    "â””â”€â”€ main.py                       # Punto de entrada de la aplicación de ingeniería",
  ].filter(Boolean).join("\n");

  const branchingLines = [
    data.primaryTask === "I1.1" ? "- **BR-ENG-01 (Vitruvio IA):** Generador de layout espacial activado; exportación SVG habilitada; matriz de adyacencias obligatoria." : null,
    data.primaryTask === "I1.2" ? "- **BR-ENG-02 (Gaia Eficiencia):** Motor de cálculo higrotérmico activado; verificación de transmitancia U según CTE DB-HE." : null,
    data.primaryTask === "I1.4" ? "- **BR-ENG-03 (PRD to C4):** Síntesis de diagramas activada; formato PlantUML / Mermaid estructurado." : null,
    hasSEC04 ? "- **BR-ENG-04 (Persistencia Analítica):** Almacén columnar preconfigurado en DuckDB + Parquet para proyectos y variantes." : null,
    hasSEC07 ? "- **BR-ENG-05 (Guardrail de Visado):** Restricción severa que impide atribuir validez de visado oficial a cálculos no revisados por facultativo." : null,
  ].filter(Boolean).join("\n");

  const metricsSection = Object.entries(metricsByCategory).map(([cat, ms]) =>
    "**" + cat + "**\n" + ms.map(m => "- **" + m.label + ":** " + m.desc).join("\n")
  ).join("\n\n");

  const validationSection = hasValidation
    ? [
        "- **Modelo de verificación y control técnico:** " + data.validationModel,
        "- **Guardrail de seguridad profesional:** " + data.safetyGuardrail,
        "- **Principio de Asistencia al Proyectista:** El sistema genera variantes de diseño y memorias de apoyo; la decisión final y firma corresponde exclusivamente al técnico competente.",
        "- **Verificación Estricta de Restricciones:** Comprobación automática de retranqueos mínimos, superficies útiles y limitaciones normativas del CTE.",
        "- **Trazabilidad Inmutable:** Cada propuesta técnica queda vinculada a su documento de requisitos de entrada con registro en DuckDB.",
      ].join("\n")
    : "La aplicación opera en modo de consulta o generación de documentación arquitectónica preliminar.";

  const qaLines = [
    "1. **Pruebas de Validación Geométrica:** Verificación de solapamiento nulo entre estancias y respeto estricto del perímetro edificable.",
    "2. **Validación de Fórmulas Térmicas:** Comprobación cruzada de valores de transmitancia U frente a tablas oficiales del CTE DB-HE.",
    "3. **Prueba de Generación de Diagramas:** Verificación sintáctica de diagramas PlantUML y Mermaid generados desde PRDs de prueba.",
    "4. **Prueba de Rendimiento Espacial:** Generación y evaluación de 20 distribuciones espaciales completas en menos de 5 segundos.",
  ].filter(Boolean).join("\n");

  return [
    "# INFORME EJECUTIVO DE ESPECIFICACIÃ“N TÃ‰CNICA",
    "## Proyecto de Software de Ingeniería / Arquitectura: " + data.appName,
    "",
    "**Fecha de Generación:** " + now,
    "**Área Horizon:** Ingeniería, Arquitectura & Simulación Técnica",
    "**Arquitecto / Diseñador:** " + (data.authorName || "Horizon User"),
    "**Versión del Documento:** v1.0.0 (Especificación Formal de Ingeniería)",
    "",
    "---",
    "",
    "### 1. Resumen Ejecutivo y Propósito del Software",
    "",
    "- **Tarea Principal (" + data.primaryTask + "):** " + (primary?.label || ""),
    "- **Descripción del núcleo funcional:** " + (primary?.desc || ""),
    "- **Público objetivo:** " + (primary?.audience || ""),
    "- **Especialidades de ingeniería:** " + data.engineeringDomains.join(", "),
    "- **Motores y librerías de cálculo:** " + data.computationEngines.join(", "),
    "",
    "**Exclusiones explícitas:** El sistema NO sustituye el visado colegial de proyectos técnicos de edificación o ingeniería, NO asume responsabilidad civil por colapso estructural y NO emite dictámenes periciales vinculantes.",
    "",
    "---",
    "",
    "### 2. Matriz de Arquitectura y Módulos Complementarios",
    "",
    secondaries.length === 0 ? "_No se han seleccionado módulos secundarios._" : secondaries.map(s => "- **[" + s.id + "] " + s.label + ":** " + s.desc).join("\n"),
    "",
    "**Reglas de lógica condicional aplicadas (Branching Rules):**",
    branchingLines || "_Ninguna regla de branching activada con la configuración actual._",
    "",
    "---",
    "",
    "### 3. Catálogo de Métricas y Control de Calidad Técnico",
    "",
    "El sistema implementará y monitorizará las siguientes métricas de diseño y eficiencia:",
    "",
    metricsSection || "_No se han seleccionado métricas._",
    "",
    "---",
    "",
    "### 4. Protocolos de Seguridad Operativa y Guardrails Profesionales",
    "",
    validationSection,
    "",
    "---",
    "",
    "### 5. Stack Tecnológico y Estructura de Scripts Python",
    "",
    "- **Capa de Presentación (UI):** " + data.uiFramework,
    "- **Capa de Persistencia y Datos:** " + data.storageEngine,
    "- **Validación de Datos:** Pydantic v2 con tipado estricto para modelos geométricos y físicos.",
    "- **Lenguaje:** Python 3.11+",
    "",
    "```text",
    treeLines,
    "```",
    "",
    "---",
    "",
    "### 6. Protocolo de Pruebas y Validación (QA de Ingeniería)",
    "",
    qaLines,
    "",
    "---",
    "",
    "### 7. Cláusula de Responsabilidad Profesional y Descargo Legal",
    "",
    "> **AVISO PROFESIONAL Y LEGAL OBLIGATORIO**",
    ">",
    "> Esta especificación técnica y cualquier software desarrollado a partir de ella tiene carácter **exclusivamente de herramienta de apoyo al diseño, optimización y simulación preliminar**.",
    ">",
    "> - **NO sustituye el criterio, dimensionamiento definitivo ni visado de un arquitecto, ingeniero o técnico competente colegiado**.",
    "> - Toda distribución espacial, dimensionamiento de envolvente térmica o estimación de costes debe ser **verificada y aprobada por el responsable facultativo del proyecto** antes de su ejecución material.",
    "> - Las herramientas de IA generan variantes exploratorias bajo el principio de supervisión humana (Human-in-the-Loop).",
    ">",
    "> Diseñado en **Horizon â€” Centro Interactivo de IA Aplicada.** Laboratorio de Ingeniería & Arquitectura.",
    "",
    "---",
    "",
    "_Fin del Informe Ejecutivo de Especificación Técnica â€” Generado automáticamente por Horizon EngAppWizard v1.0_",
  ].filter(l => l !== null).join("\n");
}

// â”€â”€â”€ Componentes auxiliares â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ProgressBar({ step, total }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-dark/50 uppercase tracking-widest">Paso {step} de {total}</span>
        <span className="text-xs text-dark/35">{Math.round((step / total) * 100)}% completado</span>
      </div>
      <div className="h-1.5 bg-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-cyan-600 text-white"
                : i + 1 === step
                ? "bg-cyan-600 text-white ring-4 ring-cyan-600/20"
                : "bg-dark/8 text-dark/30"
            }`}
          >
            {i + 1 < step ? <Check size={10} /> : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavButtons({ onPrev, onNext, nextLabel = "Siguiente", disabled = false }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark/8">
      {onPrev ? (
        <button onClick={onPrev} className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark/60 hover:text-dark border border-dark/12 hover:border-dark/25 rounded-sm transition-colors">
          <ChevronLeft size={15} /> Anterior
        </button>
      ) : <div />}
      <button
        onClick={onNext}
        disabled={disabled}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
      >
        {nextLabel} <ChevronRight size={15} />
      </button>
    </div>
  );
}

function StepCard({ children }) {
  return (
    <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-2">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-dark/50">{children}</label>
      {hint && <p className="text-[12px] text-dark/35 mt-0.5">{hint}</p>}
    </div>
  );
}

function InputText({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-dark/[0.02] border border-dark/12 text-dark text-sm rounded-sm px-3.5 py-2.5 focus:outline-hidden focus:border-cyan-500 placeholder:text-dark/25 transition-colors"
    />
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {options.map(opt => (
        <label
          key={opt.id || opt}
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            (value === (opt.id || opt))
              ? "border-cyan-500/40 bg-cyan-50/30"
              : "border-dark/10 hover:border-dark/20 hover:bg-dark/[0.01]"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
            value === (opt.id || opt) ? "border-cyan-600" : "border-dark/25"
          }`}>
            {value === (opt.id || opt) && <div className="w-2 h-2 rounded-full bg-cyan-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === (opt.id || opt)} onChange={() => onChange(opt.id || opt)} />
          <div>
            {opt.label ? (
              <>
                <p className="text-sm font-semibold text-dark"><span className="text-cyan-600 text-xs mr-1.5">{opt.id}</span>{opt.label}</p>
                <p className="text-[12.5px] text-dark/50 mt-0.5 leading-relaxed">{opt.desc}</p>
                {opt.audience && <p className="text-[11px] text-dark/35 mt-1"><span className="font-semibold">Destinatarios:</span> {opt.audience}</p>}
              </>
            ) : (
              <p className="text-sm text-dark">{opt}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ options, selected, onChange, max = 4 }) {
  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  }
  return (
    <div className="space-y-2">
      {options.map(opt => {
        const isChecked = selected.includes(opt.id || opt);
        const isDisabled = !isChecked && selected.length >= max;
        return (
          <label
            key={opt.id || opt}
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              isChecked ? "border-cyan-500/40 bg-cyan-50/30" : isDisabled ? "border-dark/6 opacity-40 cursor-not-allowed" : "border-dark/10 hover:border-dark/20"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${isChecked ? "border-cyan-600 bg-cyan-600" : "border-dark/25"}`}>
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={isChecked} disabled={isDisabled} onChange={() => !isDisabled && toggle(opt.id || opt)} />
            <div>
              {opt.label ? (
                <>
                  <p className="text-sm font-medium text-dark"><span className="text-xs text-cyan-600 mr-1">[{opt.id}]</span>{opt.label}</p>
                  <p className="text-[12px] text-dark/45 mt-0.5 leading-relaxed">{opt.desc}</p>
                </>
              ) : <p className="text-sm text-dark">{opt}</p>}
            </div>
          </label>
        );
      })}
    </div>
  );
}

function SelectGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
            value === opt ? "border-cyan-500/40 bg-cyan-50/30" : "border-dark/10 hover:border-dark/20"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${value === opt ? "border-cyan-600" : "border-dark/25"}`}>
            {value === opt && <div className="w-2 h-2 rounded-full bg-cyan-600" />}
          </div>
          <input type="radio" className="sr-only" checked={value === opt} onChange={() => onChange(opt)} />
          <p className="text-sm text-dark">{opt}</p>
        </label>
      ))}
    </div>
  );
}

// â”€â”€â”€ Componente principal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TOTAL_STEPS = 6;

const initData = () => ({
  appName: "",
  authorName: "",
  primaryTask: "",
  secondaryTasks: [],
  engineeringDomains: [],
  computationEngines: [],
  selectedMetrics: [],
  validationModel: "",
  safetyGuardrail: "",
  uiFramework: "",
  storageEngine: "",
});

export default function WizardIngenieria() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initData);
  const [report, setReport] = useState("");
  const [errors, setErrors] = useState({});

  const set = useCallback((field) => (val) => setData(d => ({ ...d, [field]: val })), []);

  function handlePrimaryChange(val) {
    const autoMetrics = getAutoMetrics(val, data.secondaryTasks);
    const autoStorage = getAutoStorage(data.secondaryTasks, val);
    setData(d => ({
      ...d,
      primaryTask: val,
      selectedMetrics: autoMetrics,
      storageEngine: autoStorage || d.storageEngine,
    }));
  }

  function handleSecondaryChange(val) {
    const autoMetrics = getAutoMetrics(data.primaryTask, val);
    const autoStorage = getAutoStorage(val, data.primaryTask);
    setData(d => ({
      ...d,
      secondaryTasks: val,
      selectedMetrics: autoMetrics,
      storageEngine: autoStorage || d.storageEngine,
    }));
  }

  function validate() {
    const e = {};
    if (step === 1) {
      if (!data.appName.trim()) e.appName = "El nombre del proyecto es obligatorio.";
      if (!data.primaryTask) e.primaryTask = "Selecciona una tarea principal.";
    }
    if (step === 3) {
      if (data.engineeringDomains.length === 0) e.engineeringDomains = "Selecciona al menos una especialidad de ingeniería.";
      if (data.computationEngines.length === 0) e.computationEngines = "Selecciona al menos un motor de cálculo.";
    }
    if (step === 4) {
      if (data.selectedMetrics.length === 0) e.selectedMetrics = "Selecciona al menos una métrica de diseño.";
    }
    if (step === 5 && needsValidationStep(data.primaryTask, data.secondaryTasks)) {
      if (!data.validationModel) e.validationModel = "Selecciona un modelo de verificación técnica.";
      if (!data.safetyGuardrail) e.safetyGuardrail = "Selecciona el guardrail de seguridad profesional.";
    }
    if (step === 6) {
      if (!data.uiFramework) e.uiFramework = "Selecciona el framework de interfaz.";
      if (!data.storageEngine) e.storageEngine = "Selecciona el motor de persistencia.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (step === 6) {
      setReport(generateReport(data));
      setStep(7);
    } else {
      setStep(s => s + 1);
    }
  }

  function prev() { setStep(s => Math.max(1, s - 1)); }

  function reset() { setData(initData()); setStep(1); setReport(""); setErrors({}); }

  function downloadMd() {
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `informe_${(data.appName || "eng_app").toLowerCase().replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasValidation = needsValidationStep(data.primaryTask, data.secondaryTasks);

  return (
    <div className="min-h-full bg-[#F7F6F2]">
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8">
          <Link to="/areas/ingenieria" className="inline-flex items-center gap-1.5 text-xs text-dark/40 hover:text-dark transition-colors mb-6">
            <ArrowLeft size={13} /> Laboratorio de Ingeniería & Arquitectura
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0 text-cyan-600 font-display text-xl">ðŸ“</div>
            <div>
              <h1 className="font-display text-[28px] sm:text-[36px] text-dark tracking-[-0.02em] leading-tight">
                Diseñador de Proyectos â€” Ingeniería & Arquitectura
              </h1>
              <p className="text-dark/50 text-sm mt-1">
                Define tu aplicación técnica paso a paso con optimización espacial, simulación física y trazabilidad de requisitos.
              </p>
            </div>
          </div>
        </div>

        {/* â”€â”€ PASOS 1-6 â”€â”€ */}
        {step <= TOTAL_STEPS && (
          <>
            <ProgressBar step={step} total={TOTAL_STEPS} />

            {/* PASO 1 */}
            {step === 1 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 1 â€” Tarea Principal</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona el núcleo funcional que definirá la arquitectura de tu aplicación técnica.</p>

                <div className="space-y-5">
                  <div>
                    <FieldLabel hint="Será el título de tu especificación técnica de ingeniería.">Nombre del proyecto</FieldLabel>
                    <InputText value={data.appName} onChange={set("appName")} placeholder="Ej: Vitruvio IA, Gaia Eficiencia, Atlas Constructor, PRD to C4â€¦" />
                    {errors.appName && <p className="text-red-500 text-xs mt-1.5">{errors.appName}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Tu nombre, alias o estudio de arquitectura / ingeniería.">Diseñador / Estudio Técnico</FieldLabel>
                    <InputText value={data.authorName} onChange={set("authorName")} placeholder="Ej: Equipo Horizon, Estudio de Arquitectura, Departamento de Proyectosâ€¦" />
                  </div>
                  <div>
                    <FieldLabel hint="Elige la función principal. Esto determinará los motores computacionales y normativas técnicas requeridas.">Tarea principal de la aplicación</FieldLabel>
                    <RadioGroup options={PRIMARY_TASKS} value={data.primaryTask} onChange={handlePrimaryChange} />
                    {errors.primaryTask && <p className="text-red-500 text-xs mt-2">{errors.primaryTask}</p>}
                  </div>
                </div>

                <NavButtons onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 2 â€” Módulos Complementarios</h2>
                <p className="text-dark/45 text-sm mb-6">Añade hasta <strong>4 capacidades técnicas y de exportación</strong> para robustecer el sistema.</p>

                <div className="bg-cyan-500/[0.04] border border-cyan-500/15 rounded-xl px-4 py-3 mb-5 text-[13px] text-dark/60">
                  <strong className="text-dark">Tarea principal seleccionada:</strong> [{data.primaryTask}]{" "}
                  {PRIMARY_TASKS.find(t => t.id === data.primaryTask)?.label}
                </div>

                <FieldLabel hint="Selecciona entre 0 y 4 módulos secundarios.">Módulos secundarios</FieldLabel>
                <CheckGroup options={SECONDARY_TASKS} selected={data.secondaryTasks} onChange={handleSecondaryChange} max={4} />
                <p className="text-[11px] text-dark/30 mt-2">{data.secondaryTasks.length} / 4 módulos seleccionados</p>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 3 â€” Especialidades & Motores de Cálculo</h2>
                <p className="text-dark/45 text-sm mb-6">Configura las ramas de la ingeniería y los motores de cálculo vectorial y térmico que empleará el sistema.</p>

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Especialidades técnicas donde operará la solución.">Especialidades de ingeniería</FieldLabel>
                    <CheckGroup options={ENGINEERING_DOMAINS.map(a => ({ id: a, label: a, desc: "" }))} selected={data.engineeringDomains} onChange={set("engineeringDomains")} max={6} />
                    {errors.engineeringDomains && <p className="text-red-500 text-xs mt-1.5">{errors.engineeringDomains}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Librerías de cálculo físico, térmico, cronogramas y gráficos vectoriales.">Motores y librerías de cálculo</FieldLabel>
                    <CheckGroup options={COMPUTATION_ENGINES.map(a => ({ id: a, label: a, desc: "" }))} selected={data.computationEngines} onChange={set("computationEngines")} max={6} />
                    {errors.computationEngines && <p className="text-red-500 text-xs mt-1.5">{errors.computationEngines}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 4 */}
            {step === 4 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 4 â€” Catálogo de Métricas de Ingeniería</h2>
                <p className="text-dark/45 text-sm mb-6">Selecciona las métricas de eficiencia espacial, transmitancia térmica y planificación que evaluará el sistema.</p>

                {data.selectedMetrics.length > 0 && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-cyan-800">
                    âœ“ {data.selectedMetrics.length} métrica{data.selectedMetrics.length !== 1 ? "s" : ""} técnica{data.selectedMetrics.length !== 1 ? "s" : ""} preseleccionada{data.selectedMetrics.length !== 1 ? "s" : ""} automáticamente según tu tarea principal.
                  </div>
                )}

                {["Diseño Espacial", "Eficiencia Energética", "Gestión de Obra", "Arquitectura Software", "Ingeniería Física", "Seguridad & Calidad"].map(cat => (
                  <div key={cat} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-dark/40 mb-2.5">{cat}</p>
                    <div className="space-y-1.5">
                      {ENGINEERING_METRICS.filter(m => m.cat === cat).map(m => {
                        const isChecked = data.selectedMetrics.includes(m.id);
                        return (
                          <label key={m.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? "border-cyan-500/30 bg-cyan-50/30" : "border-dark/8 hover:border-dark/15"}`}>
                            <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isChecked ? "border-cyan-600 bg-cyan-600" : "border-dark/20"}`}>
                              {isChecked && <Check size={10} className="text-white" />}
                            </div>
                            <input type="checkbox" className="sr-only" checked={isChecked} onChange={() => {
                              set("selectedMetrics")(isChecked ? data.selectedMetrics.filter(x => x !== m.id) : [...data.selectedMetrics, m.id]);
                            }} />
                            <div>
                              <p className="text-sm font-medium text-dark">{m.label}</p>
                              <p className="text-[12px] text-dark/40 mt-0.5">{m.desc}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {errors.selectedMetrics && <p className="text-red-500 text-xs mt-1">{errors.selectedMetrics}</p>}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 5 */}
            {step === 5 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 5 â€” Verificación Técnica y Guardrails de Seguridad</h2>

                {hasValidation ? (
                  <>
                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-cyan-800 flex items-start gap-2">
                      <HardHat size={16} className="shrink-0 mt-0.5 text-cyan-600" />
                      Este paso está activo para garantizar la trazabilidad de requisitos, el cumplimiento normativo (CTE) y la no sustitución del visado técnico.
                    </div>
                    <div className="space-y-6">
                      <div>
                        <FieldLabel hint="Estrategia de validación de variantes espaciales o cálculos de envolvente.">Modelo de verificación técnica</FieldLabel>
                        <SelectGroup options={VALIDATION_MODELS} value={data.validationModel} onChange={set("validationModel")} />
                        {errors.validationModel && <p className="text-red-500 text-xs mt-1">{errors.validationModel}</p>}
                      </div>
                      <div>
                        <FieldLabel hint="Restricción de seguridad activa para evitar riesgos constructivos o normativos.">Guardrail de seguridad profesional</FieldLabel>
                        <SelectGroup options={SAFETY_GUARDRAILS} value={data.safetyGuardrail} onChange={set("safetyGuardrail")} />
                        {errors.safetyGuardrail && <p className="text-red-500 text-xs mt-1">{errors.safetyGuardrail}</p>}
                      </div>
                      <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-3">Principios de responsabilidad y rigor técnico (activados por diseño)</p>
                        {[
                          "Principio de Asistencia al Proyectista: la IA propone variantes; la firma y decisión es 100% humana.",
                          "Verificación Estricta CTE: comprobación automática de retranqueos, superficies mínimas y aislamiento.",
                          "Trazabilidad Requisito-Diseño: cada artefacto queda vinculado a su especificación de entrada en DuckDB.",
                        ].map(c => (
                          <div key={c} className="flex items-start gap-2.5 mb-2 last:mb-0">
                            <div className="w-4 h-4 rounded bg-cyan-100 border border-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} className="text-cyan-700" />
                            </div>
                            <p className="text-[12.5px] text-dark/60 leading-relaxed">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-dark/50 text-sm mb-6">Tu arquitectura opera en <strong className="text-dark">modo generación preliminar / documentación</strong> sin cálculo numérico crítico en tiempo real.</p>
                    <div className="bg-dark/[0.02] border border-dark/8 rounded-xl px-5 py-4 text-[13px] text-dark/50">
                      Si decides añadir simulación energética o verificación de layouts, vuelve al <strong>Paso 2</strong> y activa el módulo <code className="bg-dark/5 px-1 rounded text-xs">SEC-ENG-01</code> o <code className="bg-dark/5 px-1 rounded text-xs">SEC-ENG-07</code>.
                    </div>
                  </div>
                )}

                <NavButtons onPrev={prev} onNext={next} nextLabel="Siguiente" />
              </StepCard>
            )}

            {/* PASO 6 */}
            {step === 6 && (
              <StepCard>
                <h2 className="font-display text-[22px] text-dark mb-1">Paso 6 â€” Stack Tecnológico & Persistencia</h2>
                <p className="text-dark/45 text-sm mb-6">Elige la infraestructura y librerías que darán soporte a tu aplicación de ingeniería.</p>

                {data.secondaryTasks.includes("SEC-ENG-04") && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-2.5 mb-5 text-[12.5px] text-cyan-800">
                    âœ“ Persistencia analítica preconfigurada en <strong>DuckDB + Parquet</strong> por el módulo SEC-ENG-04.
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <FieldLabel hint="Entorno visual para proyectistas, arquitectos e ingenieros.">Framework de interfaz de usuario (UI)</FieldLabel>
                    <SelectGroup options={UI_FRAMEWORKS} value={data.uiFramework} onChange={set("uiFramework")} />
                    {errors.uiFramework && <p className="text-red-500 text-xs mt-1">{errors.uiFramework}</p>}
                  </div>
                  <div>
                    <FieldLabel hint="Almacén de especificaciones, planos vectoriales, grafos y variantes de diseño.">Motor de persistencia y datos</FieldLabel>
                    <SelectGroup options={STORAGE_ENGINES} value={data.storageEngine} onChange={set("storageEngine")} />
                    {errors.storageEngine && <p className="text-red-500 text-xs mt-1">{errors.storageEngine}</p>}
                  </div>
                </div>

                <NavButtons onPrev={prev} onNext={next} nextLabel="Generar Especificación de Ingeniería" />
              </StepCard>
            )}
          </>
        )}

        {/* â”€â”€ PANTALLA FINAL: INFORME â”€â”€ */}
        {step === 7 && (
          <div>
            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.05)] mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-cyan-100 border border-cyan-300 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-cyan-700" />
                </div>
                <h2 className="font-display text-[24px] text-dark">Especificación de ingeniería generada con éxito</h2>
              </div>
              <p className="text-dark/50 text-sm ml-11">
                La memoria técnica para <strong className="text-dark">{data.appName}</strong> está lista para desarrollo y ejecución técnica.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={downloadMd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-sm transition-colors"
                >
                  <Download size={15} /> Descargar Informe (.md)
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 border border-dark/15 hover:border-dark/30 text-dark/70 hover:text-dark text-sm font-medium rounded-sm transition-colors"
                >
                  <RefreshCw size={15} /> Crear otro diseño
                </button>
              </div>
            </div>

            <div className="bg-white border border-dark/10 rounded-2xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
              <ReportRenderer markdown={report} />
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[13px] text-amber-800 leading-relaxed">
                <strong>Aviso profesional y legal:</strong> Este informe especifica una arquitectura de software de apoyo al diseño y simulación. No constituye proyecto visado ni sustituye el dimensionamiento y firma de un arquitecto o ingeniero colegiado.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// â”€â”€â”€ Renderizador de Markdown ligero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ReportRenderer({ markdown }) {
  const lines = markdown.split("\n");

  return (
    <div className="space-y-1.5 text-[14px] text-dark/75 leading-[1.8] font-sans">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} className="font-display text-[28px] text-dark tracking-[-0.02em] mt-2 mb-2">{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} className="font-display text-[22px] text-dark tracking-[-0.01em] mt-6 mb-1">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="font-semibold text-[15px] text-dark mt-5 mb-1 pb-1.5 border-b border-dark/8">{line.slice(4)}</h3>;
        if (line.startsWith("---")) return <hr key={i} className="border-dark/10 my-4" />;
        if (line.startsWith("```")) return null;
        if (line.startsWith("- **") || line.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-2">
              <span className="text-cyan-600 mt-1.5 shrink-0">â€¢</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (/^\d+\. /.test(line)) {
          const num = line.match(/^(\d+)\./)[1];
          return (
            <div key={i} className="flex items-start gap-2.5 pl-2">
              <span className="text-cyan-600 font-semibold text-xs mt-1 shrink-0 w-4">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-4 border-cyan-500 bg-cyan-50 px-4 py-2 rounded-r-lg text-[13px] text-cyan-950 my-2">
              <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
            </div>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-dark" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
      })}
    </div>
  );
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-dark/5 px-1 py-0.5 rounded text-[12px] font-mono text-dark/70">$1</code>');
}

