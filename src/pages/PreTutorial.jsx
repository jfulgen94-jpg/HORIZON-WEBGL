import { useParams, Link } from "react-router-dom";
import { getLabBySlug } from "../data/labs-data";
import { ArrowLeft, Megaphone, Rocket, BookOpen } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

const PRE_TUTORIAL_DATA = {
  finanzas: {
    why: "Los mercados financieros mueven billones de dolares al dia, pero la mayoria de las personas no tiene acceso a las mismas herramientas que los profesionales. Construir una app financiera con IA te permite nivelar el campo de juego: analizar datos que antes solo estaban disponibles para bancos, detectar patrones que el ojo humano no ve, y tomar decisiones basadas en evidencia, no en opiniones.",
    architecture: "Datos (APIs financieras, archivos CSV) -> Logica (calculo de indicadores, sentimiento, backtesting) -> Interfaz (dashboard, graficos, alertas)",
    audience: [
      "Analista que quiere automatizar el analisis de fundamentales",
      "Inversor particular que quiere entender mejor sus inversiones",
      "Estudiante de finanzas que quiere aprender practicando",
      "Desarrollador que quiere crear una herramienta financiera",
    ],
    needs: [
      "Quiero saber si una empresa esta sobrevalorada o infravalorada",
      "Necesito analizar el sentimiento de las noticias sobre mis inversiones",
      "Quiero probar estrategias antes de invertir dinero real",
      "Necesito un dashboard que me muestre todo en un solo lugar",
    ],
    examples: [
      { name: "Kairos Sentimiento", desc: "Analiza sentimiento de noticias financieras" },
      { name: "Kairos Portfolio", desc: "Simula carteras multiactivo" },
      { name: "Kairos Alert", desc: "Detecta divergencias precio-sentimiento" },
      { name: "FinScope", desc: "Dashboard macroeconomico interactivo" },
      { name: "RiskLens", desc: "Calcula VaR y stress testing" },
      { name: "ValueMap", desc: "Mapeo de fundamentales por sector" },
      { name: "SignalForge", desc: "Motor de senales tecnicas" },
      { name: "DivTracker", desc: "Radar de dividendos sostenibles" },
    ],
  },
  medicina: {
    why: "La medicina genera mas datos que nunca, pero la mayoria esta dispersa en historiales clinicos, papers scientificos y bases de datos fragmentadas. Construir una app medica con IA te permite sintetizar esa informacion, verificar afirmaciones clinicas contra evidencia real, y crear herramientas que ayuden a profesionales (no a sustituirlos).",
    architecture: "Datos clinicos (notas, informes, FHIR) -> Logica (verificacion, extraccion, codificacion) -> Interfaz (paneles clinicos, informes estructurados)",
    audience: [
      "Medico que quiere verificar afirmaciones clinicas rapidamente",
      "Investigador que necesita sintetizar literatura medica",
      "Departamento de IT hospitalario que quiere integrar sistemas",
      "Estudiante de medicina que quiere aprender con casos reales",
    ],
    needs: [
      "Necesito verificar si esta afirmacion medica es correcta",
      "Quiero extraer datos de notas clinicas a formato estructurado",
      "Necesito codificar diagnosticos con CIE-10 automaticamente",
      "Quiero crear un chatbot de seguimiento para pacientes cronico",
    ],
    examples: [
      { name: "Mente Medica", desc: "Verifica afirmaciones contra PubMed" },
      { name: "Nexo FHIR", desc: "Pipeline de datos clinicos a FHIR R4" },
      { name: "Higia IA", desc: "Seguimiento de adherencia medicamentosa" },
      { name: "Triaje Inteligente", desc: "Clasificacion de urgencias" },
      { name: "CalculClin", desc: "Escalas clinicas validadas (GFR, CHADS2-VASc)" },
      { name: "ResumenEHR", desc: "Resumenes de historiales clinicos" },
      { name: "PharmaCheck", desc: "Detector de interacciones farmacologicas" },
      { name: "AlertaSalud", desc: "Alertas sanitarias proactivas" },
    ],
  },
  derecho: {
    why: "El derecho genera montanas de documentos: contratos, resoluciones, legislacion, normativa. Construir una app legal con IA te permite analizar contratos rapidamente, verificar cumplimiento regulatorio, y encontrar jurisprudencia relevante en minutos, no en horas.",
    architecture: "Documentos legales (contratos, legislacion) -> Logica (analisis, clasificacion, verificacion) -> Interfaz (informes con semaforos, paneles de cumplimiento)",
    audience: [
      "Abogado que quiere auditar contratos rapidamente",
      "Oficial de cumplimiento que necesita verificar regulaciones",
      "Departamento legal que quiere detectar clausulas abusivas",
      "Estudiante de derecho que quiere aprender con casos reales",
    ],
    needs: [
      "Necesito revisar un contrato de 50 paginas en 10 minutos",
      "Quiero saber si cumplimos con el RGPD",
      "Necesito encontrar jurisprudencia relevante para mi caso",
      "Quiero detectar clausulas abusivas en un contrato",
    ],
    examples: [
      { name: "Lex Guardian", desc: "Auditor contractual y detector de clausulas" },
      { name: "Sententia Nova", desc: "Analizador de tendencias jurisprudenciales" },
      { name: "RegAudit", desc: "Motor de cumplimiento regulatorio" },
      { name: "Iuris RAG", desc: "Busqueda juridica semantica" },
      { name: "ClauseGuard", desc: "Detector de clausulas abusivas" },
      { name: "DueDiligenceBot", desc: "Informes de due diligence legal" },
      { name: "BOE Connect", desc: "Conector con bases de datos legislativas" },
      { name: "ContratoSeguro", desc: "Validador de contratos" },
    ],
  },
  contabilidad: {
    why: "La contabilidad es la columna vertebral de cualquier negocio, pero la mayoria de los procesos son manuales, propensos a errores y lentos. Construir una app contable con IA te permite automatizar conciliaciones, detectar anomalias, y generar informes en tiempo real.",
    architecture: "Datos contables (facturas, movimientos bancarios) -> Logica (conciliacion, clasificacion, calculo) -> Interfaz (dashboards, informes, exportaciones)",
    audience: [
      "Contador que quiere automatizar la conciliacion bancaria",
      "Departamento financiero que necesita detectar fraudes",
      "PYME que quiere gestionar su contabilidad sin software costoso",
      "Estudiante de contabilidad que quiere aprender practicando",
    ],
    needs: [
      "Necesito conciliar los movimientos bancarios con mi contabilidad",
      "Quiero detectar gastos anormales o sospechosos",
      "Necesito generar informes financieros automaticamente",
      "Quiero integrar mi contabilidad con mi ERP",
    ],
    examples: [
      { name: "ConciliaIA", desc: "Conciliacion bancaria automatica" },
      { name: "FacturaAuto", desc: "Automatizacion de facturacion" },
      { name: "CosteFinder", desc: "Analisis de costes por centro" },
      { name: "TribuCheck", desc: "Cumplimiento tributario automatizado" },
      { name: "FinDashboard", desc: "Dashboard financiero en tiempo real" },
      { name: "AuditorContable", desc: "Auditoria contable con IA" },
      { name: "ERPConnector", desc: "Integracion con SAGE, QuickBooks" },
      { name: "AnomaliaDetect", desc: "Detector de anomalias en gastos" },
    ],
  },
  matematicas: {
    why: "Las matematicas estan en todo: desde optimizar rutas de entrega hasta simular el comportamiento de sistemas complejos. Construir una app matematica con IA te permite resolver problemas que antes requerian supercomputadoras, visualizar patrones invisibles, y automatizar verificaciones logicas.",
    architecture: "Problema matematico (ecuacion, optimizacion, simulacion) -> Logica (algoritmo numerico, simbolico, estocastico) -> Interfaz (visualizacion, interactividad, exportacion)",
    audience: [
      "Ingeniero que necesita optimizar un sistema",
      "Investigador que quiere simular un modelo complejo",
      "Estudiante que quiere entender conceptos abstractos visualizando",
      "Desarrollador que necesita verificar codigo con logica formal",
    ],
    needs: [
      "Necesito optimizar una funcion con muchas variables",
      "Quiero simular que pasa si cambio estos parametros",
      "Necesito verificar que mi codigo es logicamente correcto",
      "Quiero visualizar un sistema dinamico complejo",
    ],
    examples: [
      { name: "SymCheck", desc: "Verificador logico y simbolico" },
      { name: "OptimaSolver", desc: "Optimizacion combinatoria" },
      { name: "RiskPredictor", desc: "Predictor de riesgo operacional" },
      { name: "CompSolver", desc: "Solucionador de competiciones matematicas" },
      { name: "MultiAgent", desc: "Sistema multi-agente coordinado" },
      { name: "CalcSimbolico", desc: "Calculador simbolico-numerico" },
      { name: "MonteCarloSim", desc: "Simulacion estocastica" },
      { name: "GraphViz", desc: "Visualizacion de grafos y redes" },
    ],
  },
  ingenieria: {
    why: "La ingenieria combina ciencia con practica. Construir una app de ingenieria con IA te permite automatizar calculos repetitivos, optimizar disenos, y generar documentacion tecnica automaticamente — todo sin perder la precision que el sector exige.",
    architecture: "Datos del proyecto (medidas, materiales, normativas) -> Logica (calculo, simulacion, optimizacion) -> Interfaz (planos, informes, modelos 3D)",
    audience: [
      "Arquitecto que quiere optimizar distribuciones espaciales",
      "Ingeniero que necesita simular eficiencia energetica",
      "Project manager que quiere monitorizar avance de obras",
      "Estudiante que quiere aprender con proyectos reales",
    ],
    needs: [
      "Necesito optimizar el diseno de un edificio para ahorrar energia",
      "Quiero generar planos automaticamente a partir de especificaciones",
      "Necesito monitorizar si la obra va segun el plan",
      "Quiero documentar decisiones tecnicas de forma automatica",
    ],
    examples: [
      { name: "Vitruvio IA", desc: "Generador de distribuciones espaciales" },
      { name: "Gaia", desc: "Simulador de eficiencia energetica" },
      { name: "Atlas", desc: "Monitor de planificacion de obras" },
      { name: "R2A Engine", desc: "Transformador PRD a UML/C4" },
      { name: "MDO Motor", desc: "Motor de optimizacion multidisciplinar" },
      { name: "ADR Creator", desc: "Generador de ADRs y trade-offs" },
      { name: "BIM Optimizer", desc: "Optimizacion de modelos BIM" },
      { name: "CalcEstructural", desc: "Calculo estructural asistido" },
    ],
  },
  diseno: {
    why: "El diseno no es solo estetica — es funcionalidad. Construir una app de diseno con IA te permite auditar interfaces, generar sistemas de diseno consistentes, y crear contenido visual de forma rapida, manteniendo la calidad y accesibilidad.",
    architecture: "Brief del proyecto (objetivos, usuarios, restricciones) -> Logica (auditoria, generacion, optimizacion) -> Interfaz (componentes, prototipos, guias de estilo)",
    audience: [
      "Disenador que quiere auditar una interfaz rapidamente",
      "Equipo de producto que necesita un sistema de diseno consistente",
      "Startup que quiere crear identidad de marca con IA",
      "Estudiante que quiere aprender UX con proyectos reales",
    ],
    needs: [
      "Necesito auditar mi interfaz contra heuristics de Nielsen",
      "Quiero crear un sistema de diseno consistente para mi app",
      "Necesito generar graficos vectoriales rapidamente",
      "Quiero optimizar la conversion de mi landing page",
    ],
    examples: [
      { name: "BrandForge", desc: "Generador de identidad de marca" },
      { name: "HeuristicPro", desc: "Auditor heuristico de interfaces" },
      { name: "DesignSystem", desc: "Generador de sistemas de diseno" },
      { name: "SVG Creator", desc: "Generador de graficos vectoriales" },
      { name: "WCAG Audit", desc: "Auditor de accesibilidad WCAG 2.1" },
      { name: "CRO Optimizer", desc: "Optimizador de conversion" },
      { name: "ColorPalette", desc: "Generador de paletas de color" },
      { name: "TypographyAI", desc: "Selector de tipografia contextual" },
    ],
  },
  psicologia: {
    why: "La psicologia estudia la mente humana, y la IA puede ayudar a crear herramientas que apoyen el bienestar emocional, la creatividad y la toma de decisiones — siempre sin sustituir a un profesional. Construir una app psicologica con IA te permite crear herramientas de escucha activa, analisis de sesgos, y estimulacion de la creatividad.",
    architecture: "Interaccion del usuario (texto, opciones, respuestas) -> Logica (analisis, clasificacion, generacion) -> Interfaz (conversacion, ejercicios, informes)",
    audience: [
      "Profesional de RRHH que quiere analizar el clima laboral",
      "Educador que necesita herramientas de creatividad para alumnos",
      "Emprendedor que quiere tomar decisiones menos sesgadas",
      "Persona que quiere reflexionar sobre sus emociones",
    ],
    needs: [
      "Quiero entender mejor como me siento y por que",
      "Necesito generar ideas creativas para un proyecto",
      "Quiero detectar mis sesgos cognitivos antes de decidir",
      "Necesito una herramienta de escucha activa para mi equipo",
    ],
    examples: [
      { name: "Anima AI", desc: "Sistema de escucha activa no clinica" },
      { name: "Divergent", desc: "Motor de pensamiento divergente" },
      { name: "Negociador", desc: "Simulador de negociacion con Teoria de la Mente" },
      { name: "ClimaAfect", desc: "Analizador de clima afectivo" },
      { name: "SesgoCheck", desc: "Evaluador de sesgos cognitivos" },
      { name: "PsicoEdu", desc: "Asistente de psicoeducacion" },
      { name: "CreativityLab", desc: "Laboratorio de creatividad asistida" },
      { name: "MindMirror", desc: "Espejo de reflexion personal" },
    ],
  },
};

export default function PreTutorial() {
  const { slug } = useParams();
  const lab = getLabBySlug(slug);
  const data = PRE_TUTORIAL_DATA[slug];

  useSEO({
    title: lab ? `${lab.name}: Pre-Tutorial` : "Pre-Tutorial",
    description: lab ? `Prepárate para construir en el laboratorio de ${lab.name}. Arquitectura, audiencia y necesidades.` : "Pre-Tutorial no encontrado.",
    path: `/areas/${slug}`,
  });

  if (!lab || !data) {
    return (
      <div className="pt-28 pb-24 px-6 text-center">
        <p className="text-[#9BA3B8]">Area no encontrada.</p>
        <Link to="/areas" className="text-[#3B6FD4] text-sm mt-4 inline-block">Volver a Areas</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb">
        <Link to="/areas" className="inline-flex items-center gap-2 text-sm text-[#525A70] hover:text-[#3B6FD4] transition-colors mb-8">
          <ArrowLeft size={14} /> Volver a Areas
        </Link>
        </nav>

        <div className="mb-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: lab.colorDim }}>
            <span className="text-2xl">{lab.icon === "trending-up" ? "📈" : lab.icon === "heart-pulse" ? "❤️" : lab.icon === "scale" ? "⚖️" : lab.icon === "file-text" ? "📄" : lab.icon === "sigma" ? "σ" : lab.icon === "cog" ? "⚙️" : lab.icon === "palette" ? "🎨" : "🧠"}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F3F4F8] mb-3">¿Por que crear una app en {lab.name}?</h1>
          <p className="text-[#9BA3B8] leading-relaxed">{data.why}</p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[#F3F4F8] mb-3">Como se distribuye</h2>
          <p className="text-sm text-[#9BA3B8] bg-[#10141D] border border-white/[0.08] rounded-xl px-5 py-4 font-mono">{data.architecture}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[#F3F4F8] mb-3">Para quien es</h2>
          <ul className="space-y-2">
            {data.audience.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#9BA3B8]">
                <span className="text-[#3B6FD4] mt-0.5">→</span> {a}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[#F3F4F8] mb-3">Que necesidades podria satisfacer</h2>
          <ul className="space-y-2">
            {data.needs.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#9BA3B8]">
                <span className="text-[#3B6FD4] mt-0.5">→</span> "{n}"
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-[#F3F4F8] mb-3">Ejemplos de apps que podrias construir</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#10141D] border border-white/[0.08] rounded-xl px-4 py-3">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: lab.color }} />
                <div>
                  <span className="text-sm text-[#F3F4F8] font-medium">{ex.name}</span>
                  <span className="text-xs text-[#525A70] ml-2">— {ex.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/[0.08] pt-8 mb-8">
          <Link to={`/marketing/${slug}`} className="flex items-center gap-3 text-sm text-[#9BA3B8] hover:text-[#3B6FD4] transition-colors group">
            <Megaphone size={16} className="text-[#3B6FD4]" />
            <span className="font-medium">{data.marketingPlanLabel}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={`/wizard/${slug}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3B6FD4] text-white text-sm font-medium hover:bg-[#2d5bb8] transition-colors">
            <Rocket size={16} /> Empezar con el Wizard
          </Link>
          <Link to={`/ruta/${slug}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/[0.12] text-[#9BA3B8] text-sm font-medium hover:border-[#3B6FD4]/40 hover:text-[#F3F4F8] transition-colors">
            <BookOpen size={16} /> Ver la Ruta de Aprendizaje
          </Link>
        </div>
      </div>
    </div>
  );
}
