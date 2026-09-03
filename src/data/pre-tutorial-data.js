/**
 * PRE-TUTORIAL-DATA.JS — Contenido y Estructura para el Sistema de Pre-Tutorial por Area
 * 
 * Proporciona el marco orientador previo a los Wizards y Rutas para las 8 areas de Horizon:
 * 1. Sentido y valor de construir una app en el sector.
 * 2. Arquitectura conceptual de distribucion (Datos -> Logica -> Interfaz).
 * 3. Publico objetivo generico.
 * 4. Necesidades concretas que satisface.
 * 5. Ejemplos de aplicaciones reales viables.
 * 6. Enlace a Plan de Marketing.
 */

export const PRE_TUTORIAL_DATA = {
  finanzas: {
    slug: "finanzas",
    name: "Finanzas & Mercados",
    eyebrow: "Laboratorio 01",
    color: "#3B6FD4",
    colorDim: "rgba(59,111,212,0.12)",
    colorLight: "#6B95E8",
    icon: "trending-up",
    why: "Los mercados financieros mueven billones de dolares al dia, pero la mayoria de las personas no tiene acceso a las mismas herramientas que los profesionales. Construir una app financiera con IA te permite nivelar el campo de juego: analizar datos que antes solo estaban disponibles para bancos, detectar patrones que el ojo humano no ve, y tomar decisiones basadas en evidencia, no en opiniones.",
    architecture: {
      step1: {
        title: "Datos",
        desc: "APIs de mercados financieros, cotizaciones historicas, balances contables y archivos CSV/Parquet."
      },
      step2: {
        title: "Logica",
        desc: "Calculo cuantitativo de ratios, mineria de sentimiento FinBERT, backtesting historico y modelos VaR."
      },
      step3: {
        title: "Interfaz",
        desc: "Dashboard interactivo en tiempo real, graficos de rendimiento, matrices de riesgo y alertas proactivas."
      }
    },
    targetAudience: [
      { role: "Analista Financiero", desc: "Quiere automatizar el analisis fundamental y la extraccion masiva de cuentas anuales." },
      { role: "Inversor Particular", desc: "Desea entender objetivamente el riesgo y la exposicion factorial de su cartera personal." },
      { role: "Estudiante de Finanzas", desc: "Busca aprender metodos cuantitativos y gestion de carteras resolviendo casos reales." },
      { role: "Desarrollador Fintech", desc: "Necesita crear una herramienta financiera robusta con almacenamiento local y cero alucinaciones." }
    ],
    needs: [
      "Quiero saber si una empresa esta sobrevalorada o infravalorada comparada con su sector historico.",
      "Necesito analizar el sentimiento de cientos de noticias sobre mis inversiones en segundos.",
      "Quiero probar estrategias con walk-forward y costes reales antes de arriesgar capital real.",
      "Necesito un dashboard centralizado que me muestre todos los indicadores clave en un solo lugar."
    ],
    examples: [
      { name: "Kairos Sentimiento", desc: "Analiza el sentimiento de noticias financieras y titulares corporativos." },
      { name: "Kairos Portfolio", desc: "Simula y optimiza carteras multiactivo con frontera eficiente." },
      { name: "Kairos Alert", desc: "Detecta divergencias criticas entre precio de cotizacion y sentimiento mediatico." },
      { name: "FinScope", desc: "Dashboard macroeconomico interactivo con curvas de tipos de interes." },
      { name: "RiskLens", desc: "Calcula Value at Risk (VaR) parametrico y ejecuta pruebas de stress testing." },
      { name: "ValueMap", desc: "Mapeo visual de fundamentales y multiplos por sector economico." },
      { name: "SignalForge", desc: "Motor de generacion de senales tecnicas cuantitativas deterministas." },
      { name: "DivTracker", desc: "Radar de sostenibilidad de politicas de dividendos y cobertura de cash flow." }
    ],
    marketingPlanLink: "/marketing/finanzas",
    marketingPlanLabel: "Plan de Marketing para Apps Financieras"
  },

  medicina: {
    slug: "medicina",
    name: "Medicina & IA Clinica",
    eyebrow: "Laboratorio 02",
    color: "#0D9488",
    colorDim: "rgba(13,148,136,0.12)",
    colorLight: "#2DD4BF",
    icon: "heart-pulse",
    why: "La medicina genera mas datos que nunca, pero la mayoria esta dispersa en historiales clinicos, papers cientificos y bases de datos fragmentadas. Construir una app medica con IA te permite sintetizar esa informacion, verificar afirmaciones clinicas contra evidencia real, y crear herramientas que ayuden a profesionales (no a sustituirlos).",
    architecture: {
      step1: {
        title: "Datos Clinicos",
        desc: "Notas evolutivas, informes de alta, literatura indexada en PubMed y recursos interoperables FHIR R4."
      },
      step2: {
        title: "Logica Medica",
        desc: "Verificacion de evidencia, extraccion estructurada, codificacion CIE-10/SNOMED y guardrails Do-No-Harm."
      },
      step3: {
        title: "Interfaz",
        desc: "Paneles de apoyo clinico, informes estructurados SOAP, alertas farmacologicas y visualizadores de curvas."
      }
    },
    targetAudience: [
      { role: "Medico Especialista", desc: "Desea verificar afirmaciones clinicas rapidamente frente a la literatura indexada mas reciente." },
      { role: "Investigador Biomedico", desc: "Necesita sintetizar volumenes inabarcables de literatura medica y ensayos controlados." },
      { role: "Equipo de IT Hospitalario", desc: "Busca integrar pipelines normalizados bajo estandares abiertos FHIR R4." },
      { role: "Estudiante de Medicina", desc: "Quiere entrenar su razonamiento clinico y toma de decisiones con historiales anonimizados." }
    ],
    needs: [
      "Necesito verificar si esta afirmacion terapeutica esta respaldada por ensayos clinicos fiables.",
      "Quiero extraer datos de notas clinicas narrativas no estructuradas hacia un formato tabular limpio.",
      "Necesito codificar diagnosticos y procedimientos con CIE-10-ES de forma automatica y rigurosa.",
      "Quiero crear un asistente de seguimiento protocolizado para pacientes cronicos sin riesgo de diagnostico."
    ],
    examples: [
      { name: "Mente Medica", desc: "Verifica afirmaciones medicas contra abstracts indexados en PubMed." },
      { name: "Nexo FHIR", desc: "Pipeline de normalizacion de datos clinicos dispersos a estandares FHIR R4." },
      { name: "Higia IA", desc: "Monitorizacion y seguimiento estructurado de adherencia a pautas terapeuticas." },
      { name: "Triaje Inteligente", desc: "Clasificacion protocolizada de prioridades asistenciales en salas de urgencias." },
      { name: "CalculClin", desc: "Calculadora de escalas clinicas validadas (Filtrado Glomerular, CHA2DS2-VASc)." },
      { name: "ResumenEHR", desc: "Generador de resumenes ejecutivos de historiales clinicos complejos en formato SOAP." },
      { name: "PharmaCheck", desc: "Detector de interacciones farmacologicas adversas y contraindicaciones renales." },
      { name: "AlertaSalud", desc: "Sistema proactivo de notificaciones ante valores analiticos de laboratorio criticos." }
    ],
    marketingPlanLink: "/marketing/medicina",
    marketingPlanLabel: "Plan de Marketing para Apps Clinicas y SaMD"
  },

  derecho: {
    slug: "derecho",
    name: "Derecho & Compliance",
    eyebrow: "Laboratorio 06",
    color: "#D97706",
    colorDim: "rgba(217,119,6,0.12)",
    colorLight: "#FBBF24",
    icon: "scale",
    why: "El derecho genera montanas de documentos: contratos, resoluciones, legislacion, normativa. Construir una app legal con IA te permite analizar contratos rapidamente, verificar cumplimiento regulatorio, y encontrar jurisprudencia relevante en minutos, no en horas.",
    architecture: {
      step1: {
        title: "Documentos Legales",
        desc: "Contratos mercantiles, pliegos de contratacion publica, repertorios del BOE y resoluciones judiciales CENDOJ."
      },
      step2: {
        title: "Logica Juridica",
        desc: "Analisis clausular, clasificacion de contingencias, verificacion de plazos procesales y busqueda semantica."
      },
      step3: {
        title: "Interfaz",
        desc: "Informes con semaforos de riesgo, cuadros comparativos de versiones y dashboards de cumplimiento regulatorio."
      }
    },
    targetAudience: [
      { role: "Abogado Litigante", desc: "Busca auditar contratos complejos e identificar vulnerabilidades procesales en tiempo record." },
      { role: "Compliance Officer", desc: "Necesita supervisar matrices de riesgo penal corporativo y cumplimiento del RGPD." },
      { role: "Asesoria Juridica de Empresa", desc: "Desea estandarizar la revision de acuerdos de confidencialidad y pliegos de licitacion." },
      { role: "Estudiante de Derecho", desc: "Quiere contrastar casos practicos con jurisprudencia consolidada de Tribunales Superiores." }
    ],
    needs: [
      "Necesito revisar un contrato mercantil de 50 paginas en 10 minutos sin saltarme clausulas trampa.",
      "Quiero saber si las politicas de tratamiento de datos de mi organizacion cumplen al 100% el RGPD.",
      "Necesito localizar las tres sentencias mas relevantes del Tribunal Supremo para fundamentar mi demanda.",
      "Quiero detectar automaticamente clausulas abusivas o desproporcionadas en contratos de adhesion."
    ],
    examples: [
      { name: "Lex Guardian", desc: "Auditor contractual y detector de clausulas de penalizacion desproporcionadas." },
      { name: "Sententia Nova", desc: "Analizador de tendencias jurisprudenciales y estimacion de fallos judiciales." },
      { name: "RegAudit", desc: "Motor de cumplimiento regulatorio para normativas bancarias y de seguros." },
      { name: "Iuris RAG", desc: "Motor de busqueda semantica avanzada sobre el repositorio normativo del BOE." },
      { name: "ClauseGuard", desc: "Identificador de clausulas nulas de pleno derecho segun la Ley de Consumidores." },
      { name: "DueDiligenceBot", desc: "Generador de informes de debida diligencia legal en operaciones de M&A." },
      { name: "BOE Connect", desc: "Conector automatizado con alertas ante reformas legislativas sectoriales." },
      { name: "ContratoSeguro", desc: "Validador formal de contratos con verificacion de firmas y representacion legal." }
    ],
    marketingPlanLink: "/marketing/derecho",
    marketingPlanLabel: "Plan de Marketing para LegalTech & Compliance"
  },

  contabilidad: {
    slug: "contabilidad",
    name: "Contabilidad & ERP",
    eyebrow: "Laboratorio 03",
    color: "#10B981",
    colorDim: "rgba(16,185,129,0.12)",
    colorLight: "#34D399",
    icon: "file-text",
    why: "La contabilidad es la columna vertebral de cualquier negocio, pero la mayoria de los procesos son manuales, propensos a errores y lentos. Construir una app contable con IA te permite automatizar conciliaciones, detectar anomalias, y generar informes en tiempo real.",
    architecture: {
      step1: {
        title: "Datos Contables",
        desc: "Ficheros bancarios Norma 43, facturas en PDF/XML (FacturaE), tickets de gastos y extractos de ERP."
      },
      step2: {
        title: "Logica Contable",
        desc: "Cuadre estricto de partida doble, clasificacion segun PGC, verificacion VeriFactu y auditoria analitica."
      },
      step3: {
        title: "Interfaz",
        desc: "Dashboards de tesoreria, previsualizacion de libros oficiales, modelos tributarios y exportaciones a Excel/Parquet."
      }
    },
    targetAudience: [
      { role: "Director Financiero (CFO)", desc: "Desea monitorizar la liquidez proyectada y los costes operativos en tiempo real." },
      { role: "Contable Colegiado", desc: "Busca erradicar el punteo manual de bancos mediante conciliacion automatica inteligente." },
      { role: "Gestor Administrativo de PYME", desc: "Necesita liquidar modelos de IVA e IRPF sin errores y cumpliendo la normativa VeriFactu." },
      { role: "Auditor de Cuentas", desc: "Requiere aplicar tecnicas forenses como la Ley de Benford para detectar fraudes contables." }
    ],
    needs: [
      "Necesito conciliar los extractos bancarios mensuales con mi Libro Diario con cero discrepancia.",
      "Quiero detectar de inmediato facturas duplicadas, gastos anomalos o proveedores no registrados.",
      "Necesito generar el borrador de los Modelos 303 y 111 de Hacienda con calculo verificable.",
      "Quiero conectar mis facturas recibidas directamente con mi sistema ERP sin digitar asientos a mano."
    ],
    examples: [
      { name: "ConciliaIA", desc: "Conciliacion bancaria automatica multicuenta bajo estandar Norma 43." },
      { name: "FacturaAuto", desc: "Extraccion OCR determinista de facturas y generacion de esquemas FacturaE 3.2.2." },
      { name: "CosteFinder", desc: "Analisis analitico de imputacion de costes por centros de beneficio y proyectos." },
      { name: "TribuCheck", desc: "Comprobacion automatica de coherencia de libros de IVA frente al SII de la AEAT." },
      { name: "FinDashboard", desc: "Panel de control de ratios de liquidez, solvencia y fondo de maniobra a 12 meses." },
      { name: "AuditorContable", desc: "Auditoria preventiva de partida doble y deteccion de anomalias con Ley de Benford." },
      { name: "ERPConnector", desc: "Sincronizador bidireccional con software contable tradicional (Sage, Holded, A3)." },
      { name: "AnomaliaDetect", desc: "Detector de desviaciones presupuestarias y patrones sospechosos de fraude." }
    ],
    marketingPlanLink: "/marketing/contabilidad",
    marketingPlanLabel: "Plan de Marketing para Soluciones Contables & ERP"
  },

  matematicas: {
    slug: "matematicas",
    name: "Matematicas & Complejidad",
    eyebrow: "Laboratorio 04",
    color: "#6366F1",
    colorDim: "rgba(99,102,241,0.12)",
    colorLight: "#818CF8",
    icon: "sigma",
    why: "Las matematicas estan en todo: desde optimizar rutas de entrega hasta simular el comportamiento de sistemas complejos. Construir una app matematica con IA te permite resolver problemas que antes requerian supercomputadoras, visualizar patrones invisibles, y automatizar verificaciones logicas.",
    architecture: {
      step1: {
        title: "Problema Matematico",
        desc: "Ecuaciones diferenciales, matrices de pesos, funciones objetivo con restricciones y series estocasticas."
      },
      step2: {
        title: "Logica Numerica",
        desc: "Solvers de optimizacion MILP (HiGHS/PuLP), calculo simbolico SymPy, simulacion Quasi-Monte Carlo y grafos."
      },
      step3: {
        title: "Interfaz",
        desc: "Visualizadores 3D en WebGL, renderizado KaTeX de formulas, graficos de convergencia y exportacion a LaTeX."
      }
    },
    targetAudience: [
      { role: "Investigador Cientifico", desc: "Necesita simular sistemas dinamicos complejos y calcular exponentes de Lyapunov." },
      { role: "Ingeniero de Operaciones", desc: "Busca resolver problemas combinatorios de asignacion de recursos y rutas logisticas." },
      { role: "Estudiante Universitario", desc: "Desea comprender teoremas abstractos mediante exploracion visual e interactiva." },
      { role: "Desarrollador Algoritmico", desc: "Requiere validar la correccion formal de algoritmos y reducir tiempos de computo." }
    ],
    needs: [
      "Necesito optimizar una funcion con docenas de variables enteras y continuas bajo restricciones duras.",
      "Quiero simular que ocurre en un sistema fisico no lineal si altero los parametros iniciales de control.",
      "Necesito verificar analiticamente que una demostracion o integracion simbolica es exacta.",
      "Quiero renderizar atractores extranos y campos vectoriales en el navegador a 60 FPS estables."
    ],
    examples: [
      { name: "SymCheck", desc: "Verificador y simplificador algebraico simbolico con renderizado matematico KaTeX." },
      { name: "OptimaSolver", desc: "Solucionador de optimizacion lineal y entera mixta (MILP) con solver HiGHS." },
      { name: "RiskPredictor", desc: "Motor de simulacion Quasi-Monte Carlo con secuencias de baja discrepancia Sobol." },
      { name: "CompSolver", desc: "Resolutor estructurado paso a paso para desafios de competiciones matematicas (AIME/IMO)." },
      { name: "MultiAgent", desc: "Simulador de sistemas complejos con teoria de juegos y equilibrio de Nash." },
      { name: "CalcSimbolico", desc: "Calculadora de integrales impropias, series de Taylor y algebra tensorial." },
      { name: "MonteCarloSim", desc: "Plataforma de remuestreo bootstrap y valoracion estocastica multidimensional." },
      { name: "GraphViz", desc: "Visualizador espectral de grafos gigantes, modularidad y algoritmo PageRank." }
    ],
    marketingPlanLink: "/marketing/matematicas",
    marketingPlanLabel: "Plan de Marketing para Herramientas de Calculo Cientifico"
  },

  ingenieria: {
    slug: "ingenieria",
    name: "Ingenieria & Arquitectura",
    eyebrow: "Laboratorio 05",
    color: "#0284C7",
    colorDim: "rgba(2,132,199,0.12)",
    colorLight: "#38BDF8",
    icon: "hard-hat",
    why: "La ingenieria combina ciencia con practica. Construir una app de ingenieria con IA te permite automatizar calculos repetitivos, optimizar disenos, y generar documentacion tecnica automaticamente — todo sin perder la precision que el sector exige.",
    architecture: {
      step1: {
        title: "Datos del Proyecto",
        desc: "Coordenadas geometricas de nudos, especificaciones de materiales, cargas ponderadas y modelos IFC4."
      },
      step2: {
        title: "Logica de Calculo",
        desc: "Metodo matricial de rigidez 3D, metodo Glaser (ISO 13788), solvers hidraulicos y comprobacion CTE/Eurocodigos."
      },
      step3: {
        title: "Interfaz",
        desc: "Visores 3D de elementos estructurales, diagramas de esfuerzos NVM, memorias de calculo y reportes BCF."
      }
    },
    targetAudience: [
      { role: "Arquitecto Proyectista", desc: "Desea optimizar la envolvente termica y garantizar el cumplimiento del CTE DB-HE." },
      { role: "Ingeniero Calculista", desc: "Necesita dimensionar porticos espaciales y comprobar estados limites ultimos (ELU/ELS)." },
      { role: "BIM Manager", desc: "Busca auditar modelos IFC e identificar colisiones geometricas entre arquitectura y MEP." },
      { role: "Ingeniero de Mantenimiento", desc: "Requiere procesar seales de vibracion para predecir la vida util remanente de maquinaria." }
    ],
    needs: [
      "Necesito calcular las perdidas de carga y el golpe de ariete de una red de tuberias a presion.",
      "Quiero generar automaticamente la memoria justificativa del CTE DB-SI para evacuacion de incendios.",
      "Necesito verificar si mi muro multicapa presenta riesgo de condensaciones intersticiales en invierno.",
      "Quiero coordinar los modelos BIM de estructura e instalaciones detectando interferencias en formato BCF."
    ],
    examples: [
      { name: "Vitruvio IA", desc: "Generador de distribuciones espaciales y optimizacion de recorridos funcionales." },
      { name: "Gaia", desc: "Simulador de fisica de la edificacion, valores U de transmitancia y condensaciones Glaser." },
      { name: "Atlas", desc: "Monitor inteligente de planificacion temporal y avance de obras frente a diagramas Gantt." },
      { name: "R2A Engine", desc: "Transformador de requisitos funcionales en diagramas de arquitectura C4 y UML." },
      { name: "MDO Motor", desc: "Motor de optimizacion de diseno multidisciplinar para estructuras de minima masa." },
      { name: "ADR Creator", desc: "Generador estructurado de Architectural Decision Records y justificaciones de trade-off." },
      { name: "BIM Optimizer", desc: "Auditor de modelos OpenBIM IFC4 con deteccion de colisiones mediante IfcOpenShell." },
      { name: "CalcEstructural", desc: "Calculo matricial tridimensional de porticos de hormigon y acero segun Codigo Estructural." }
    ],
    marketingPlanLink: "/marketing/ingenieria",
    marketingPlanLabel: "Plan de Marketing para Software de Ingenieria & PropTech"
  },

  diseno: {
    slug: "diseno",
    name: "Diseno & UX",
    eyebrow: "Laboratorio 07",
    color: "#EC4899",
    colorDim: "rgba(236,72,153,0.12)",
    colorLight: "#F472B6",
    icon: "palette",
    why: "El diseno no es solo estetica — es funcionalidad. Construir una app de diseno con IA te permite auditar interfaces, generar sistemas de diseno consistentes, y crear contenido visual de forma rapida, manteniendo la calidad y accesibilidad.",
    architecture: {
      step1: {
        title: "Brief & Tokens",
        desc: "Valores fundamentales de marca, paletas cromaticas OKLCH, familias tipograficas y arbol de componentes."
      },
      step2: {
        title: "Logica de Diseno",
        desc: "Compilacion de Design Tokens W3C, auditoria de accesibilidad WCAG 2.2 / APCA y curvas de aceleracion FLIP."
      },
      step3: {
        title: "Interfaz",
        desc: "Visualizadores de temas claro/oscuro, mapas de contrastes, prototipos interactivos y codigo CSS/Tailwind."
      }
    },
    targetAudience: [
      { role: "Product Designer (UI/UX)", desc: "Busca auditar pantallas contra las 10 Heuristicas de Nielsen y medir la usabilidad con SUS." },
      { role: "Design Systems Engineer", desc: "Necesita crear una jerarquia de tokens W3C DTCG interoperable con Figma y codigo." },
      { role: "Auditor de Accesibilidad Web", desc: "Quiere validar el cumplimiento formal de WCAG 2.2 (objetivos tactiles, foco no oscurecido)." },
      { role: "Desarrollador Frontend", desc: "Desea implementar microinteracciones a 60 FPS respetando la reduccion de movimiento." }
    ],
    needs: [
      "Necesito auditar los contrastes de color de mi aplicacion segun la nueva escala APCA y WCAG 2.2.",
      "Quiero generar una biblioteca completa de tokens exportables a CSS Variables y Tailwind Config.",
      "Necesito crear animaciones de layout compartidas usando la tecnica FLIP sin caidas de frames.",
      "Quiero sustituir media queries fijas por tipografia fluida matematica con clamp() y Container Queries."
    ],
    examples: [
      { name: "BrandForge", desc: "Generador integral de identidad de marca, paletas cromaticas e iconografia SVG." },
      { name: "HeuristicPro", desc: "Auditor heuristico formal de pantallas con escala de severidad 0 a 4 de Nielsen." },
      { name: "DesignSystem", desc: "Generador de tokens parametricos W3C DTCG estructurados bajo Atomic Design." },
      { name: "SVG Creator", desc: "Generador determinista de graficos vectoriales optimizados libres de artefactos." },
      { name: "WCAG Audit", desc: "Validador algoritmico de conformidad de accesibilidad web (Nivel AA / AAA)." },
      { name: "CRO Optimizer", desc: "Optimizador predictivo de tasa de conversion y jerarquia visual de llamadas a la accion." },
      { name: "ColorPalette", desc: "Generador de paletas armonicas en espacio perceptual OKLCH con luminosidad constante." },
      { name: "TypographyAI", desc: "Calculador analitico de escalas modulares fluidas con sintaxis CSS clamp()." }
    ],
    marketingPlanLink: "/marketing/diseno",
    marketingPlanLabel: "Plan de Marketing para Herramientas de Diseno & DesignOps"
  },

  psicologia: {
    slug: "psicologia",
    name: "Psicologia & Creatividad",
    eyebrow: "Laboratorio 08",
    color: "#8B5CF6",
    colorDim: "rgba(139,92,246,0.12)",
    colorLight: "#A78BFA",
    icon: "brain",
    why: "La psicologia estudia la mente humana, y la IA puede ayudar a crear herramientas que apoyen el bienestar emocional, la creatividad y la toma de decisiones — siempre sin sustituir a un profesional. Construir una app psicologica con IA te permite crear herramientas de escucha activa, analisis de sesgos, y estimulacion de la creatividad.",
    architecture: {
      step1: {
        title: "Interaccion del Usuario",
        desc: "Entradas reflexivas, registros diarios de pensamientos, respuestas psicometricas y autorregistros TCC."
      },
      step2: {
        title: "Logica Analitica",
        desc: "Procesamiento de sesgos cognitivos, mapeo afectivo de Russell, protocolos de derivacion urgente y anonimizacion."
      },
      step3: {
        title: "Interfaz",
        desc: "Cuadernos de reestructuracion cognitiva, diagramas de dinamica de grupos, matrices SCAMPER e informes personales."
      }
    },
    targetAudience: [
      { role: "Terapeuta / Psicologo Colegiado", desc: "Desea dotar a sus pacientes de un cuaderno digital de autorregistro RPD entre sesiones." },
      { role: "Especialista en Personas y Cultura (RRHH)", desc: "Busca analizar el clima afectivo y la cohesion de equipos con sociogramas de Moreno." },
      { role: "Facilitador de Innovacion", desc: "Necesita dinamizar sesiones de pensamiento lateral mediante SCAMPER y Seis Sombreros." },
      { role: "Persona en Autoconocimiento", desc: "Desea explorar y cuestionar sus distorsiones cognitivas habituales de forma privada y segura." }
    ],
    needs: [
      "Quiero entender mejor como me siento y que pensamientos automaticos disparan mis estados de animo.",
      "Necesito dinamizar un taller de diseno de producto desbloqueando nuevas lineas de pensamiento creativo.",
      "Quiero detectar mis propios sesgos de confirmacion y disponibilidad antes de tomar una decision critica.",
      "Necesito un asistente de escucha activa con salvaguardas estrictas que no emita juicios ni diagnosticos."
    ],
    examples: [
      { name: "Anima AI", desc: "Sistema de escucha activa y autorreflexion no clinica con guardrail autolitico estricto." },
      { name: "Divergent", desc: "Motor de pensamiento divergente asistido basado en estimulacion de asociaciones remotas." },
      { name: "Negociador", desc: "Simulador de conversaciones dificiles con modelado de estados mentales mutuos." },
      { name: "ClimaAfect", desc: "Evaluador continuo del estado de animo del equipo segun el modelo circunflejo de Russell." },
      { name: "SesgoCheck", desc: "Detector de sesgos cognitivos (anclaje, coste hundido, sesgo de confirmacion) en textos." },
      { name: "PsicoEdu", desc: "Asistente de divulgacion psicoeducativa sobre regulacion emocional e higiene del sueno." },
      { name: "CreativityLab", desc: "Matriz interactiva de tecnicas SCAMPER y los Seis Sombreros para Pensar de De Bono." },
      { name: "MindMirror", desc: "Espejo de reestructuracion cognitiva para desarticular pensamientos catastrofistas." }
    ],
    marketingPlanLink: "/marketing/psicologia",
    marketingPlanLabel: "Plan de Marketing para Apps de Bienestar & Innovacion"
  }
};

/**
 * Obtiene los datos de pre-tutorial de un area por su slug
 */
export function getPreTutorialData(slug) {
  return PRE_TUTORIAL_DATA[slug] || PRE_TUTORIAL_DATA.finanzas;
}
