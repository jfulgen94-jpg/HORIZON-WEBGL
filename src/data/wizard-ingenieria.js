/**
 * WIZARD-INGENIERIA.JS — Contenido y Lógica Especializada para el Asistente de Ingeniería & Arquitectura
 * Tareas I1.1 a I1.6, CTE, Código Estructural, Eurocódigos, OpenBIM (IFC4/BCF), Hidráulica y QA de Ingeniería.
 */

/**
 * Tareas primarias expandidas de Ingeniería con especificación de inputs, outputs y riesgos técnicos/normativos
 */
export const INGENIERIA_PRIMARY_TASKS = [
  {
    id: "I1.1",
    label: "Cálculo Matricial Estructural y Dimensionamiento (Código Estructural)",
    shortDesc: "Cálculo de pórticos espaciales 3D mediante rigidez directa, verificación de ELU/ELS y dimensionamiento según RD 470/2021.",
    longDesc: "Motor de análisis estructural tridimensional basado en el método de rigidez matricial directa y elementos finitos (FEM 1D/2D) para estructuras de hormigón armado y acero estructural, ensamblando la matriz de rigidez global K, resolviendo desplazamientos nodales y realizando las comprobaciones preceptivas de Estados Límite Últimos (ELU: flexión, cortante, pandeo) y de Servicio (ELS: flechas y fisuración) conforme al Código Estructural y Eurocódigos.",
    audience: "Ingenieros de caminos, canales y puertos, calculistas de estructuras, arquitectos e ingenieros mecánicos.",
    requiredInputs: [
      "Topología de nudos (coordenadas x, y, z) y conectividad de barras (nudo inicial, nudo final)",
      "Propiedades mecánicas de materiales: Módulo de Young E, Poisson nu, resistencia característica fck/fyk",
      "Hipótesis y combinaciones de carga ponderadas según CTE DB-SE / Eurocódigo 0 (permanentes, sobrecargas, viento y sismo)"
    ],
    generatedOutputs: [
      "Diagramas de esfuerzos internos a lo largo de cada barra: Axiles N(x), Cortantes V(x) y Momentos Flectores M(x)",
      "Comprobación de ratios de aprovechamiento tensional ELU (< 1.0) y flechas relativas ELS (< L/300)",
      "Dimensionamiento de armaduras longitudinales y estribos de cortante o perfiles metálicos normalizados (IPE, HEB)",
      "Fichero exportable de memoria de cálculo estructurada con justificación analítica para visado colegial"
    ],
    clinicalRisks: [
      "Omitir el análisis de pandeo lateral o inestabilidad global en perfiles metálicos esbeltos provocando colapso",
      "Subestimar los coeficientes de simultaneidad de sobrecargas de uso en naves de gran luz",
      "No considerar deformaciones diferidas por fluencia y retracción del hormigón a 30 años"
    ],
    complianceStandards: ["Código Estructural (RD 470/2021)", "CTE DB-SE", "Eurocódigo 2 (Hormigón)", "Eurocódigo 3 (Acero)"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "I1.2",
    label: "Simulador de Eficiencia Energética y Envolvente Térmica (CTE DB-HE)",
    shortDesc: "Modelado higrotérmico, cálculo de transmitancias térmicas (valores U), condensaciones intersticiales (Glaser) y demanda.",
    longDesc: "Plataforma de simulación de física de la edificación que modela la envolvente térmica del edificio multicapa, calcula la transmitancia térmica U (W/m²K) de cerramientos y cubiertas, evalúa el riesgo de condensaciones superficiales e intersticiales mediante el método de Glaser (ISO 13788) y computa la demanda energética anual de calefacción y refrigeración según el CTE DB-HE.",
    audience: "Consultores de sostenibilidad, ingenieros de edificación, certificadores energéticos y proyectistas HVAC.",
    requiredInputs: [
      "Composición estratigráfica de cerramientos: espesores de capa, conductividades térmicas lambda y factores mu",
      "Zona climática de la localidad según CTE (alfa, A, B, C, D, E y subzona 1-4)",
      "Superficie útil climatizada, volumen habitable y tasa de renovación de aire por hora (n_50)"
    ],
    generatedOutputs: [
      "Valor U de cada elemento constructivo comparado contra el valor límite reglamentario U_lim",
      "Diagrama de Glaser mes a mes con perfiles de presión de vapor de saturación vs presión de vapor real",
      "Comprobación de ausencia de condensación acumulada anual y riesgo de mohos superficiales",
      "Certificado preliminar de calificación energética con consumo de energía primaria no renovable (Cep,nren)"
    ],
    clinicalRisks: [
      "Ignorar puentes térmicos lineales en encuentros de fachada-forjado provocando patologías graves de humedad",
      "Colocar barreras de vapor en la cara fría del aislante induciendo condensaciones intersticiales masivas",
      "Falsear caudales mínimos de ventilación de salubridad (CTE DB-HS 3) para cumplir artificialmente la demanda energética"
    ],
    complianceStandards: ["CTE DB-HE (Ahorro de Energía)", "Norma UNE-EN ISO 13788 (Glaser)", "UNE-EN ISO 6946"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "I1.3",
    label: "Coordinación OpenBIM, Detección de Colisiones e IFC (IfcOpenShell)",
    shortDesc: "Auditoría de modelos IFC4, detección de colisiones geométricas (Clash Detection) y gestión de incidencias BCF.",
    longDesc: "Sistema de gestión de interoperabilidad BIM basado en estándares abiertos de buildingSMART que ingesta modelos IFC (Arquitectura, Estructura, MEP/Instalaciones), ejecuta algoritmos de detección de colisiones espaciales (interferencias duras tubería-pilar y holguras de mantenimiento blandas) y genera paquetes de incidencias normalizados en formato BCF (BIM Collaboration Format).",
    audience: "BIM Managers, coordinadores BIM de obra, ingenieros de instalaciones y directores de proyecto.",
    requiredInputs: [
      "Modelos digitales de las diferentes disciplinas en formato IFC2x3 o IFC4",
      "Matriz de tolerancias de colisión (ej. solape mínimo > 10 mm para choque duro, > 50 mm para holgura)",
      "Definición de sistemas prioritarios (ej. la red de gravedad de saneamiento prevalece sobre climatización)"
    ],
    generatedOutputs: [
      "Informe estructurado de colisiones clasificadas por severidad (Crítica, Mayor, Menor, Aprobada)",
      "Paquete de incidencias BCF 2.1 / 3.0 con capturas de cámara 3D, GUID de elementos y asignación a responsable",
      "Verificación de integridad de metadatos IFC (Information Delivery Specification / IDS)",
      "Visualización 3D interactiva en navegador mediante WebGL de los elementos en conflicto aislados"
    ],
    clinicalRisks: [
      "Saturar al equipo con miles de colisiones triviales ('falsos positivos' como tornillos atravesando placas)",
      "Descoordinación de sistemas de coordenadas georreferenciadas compartidas desplazando un modelo respecto a otro",
      "Pérdida de propiedades paramétricas durante la exportación de software propietario a IFC"
    ],
    complianceStandards: ["ISO 19650 (Gestión de la Información con BIM)", "buildingSMART IFC4", "BCF XML/API"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "I1.4",
    label: "Hidráulica de Redes, Golpe de Ariete y Transitorios (Darcy-Weisbach)",
    shortDesc: "Cálculo de pérdidas de carga, dimensionamiento de tuberías, fenómeno del golpe de ariete (Joukowsky) y cavitación.",
    longDesc: "Plataforma de ingeniería hidráulica para conducción de fluidos a presión (redes de abastecimiento, regadío y saneamiento) que resuelve las ecuaciones de Darcy-Weisbach y Colebrook-White para determinar pérdidas de carga por fricción y accesorios, simula el golpe de ariete por cierre brusco de válvulas mediante la fórmula de Joukowsky y verifica márgenes de cavitación en bombas (NPSH disponible vs requerido).",
    audience: "Ingenieros hidráulicos, proyectistas de redes de agua, técnicos municipales de saneamiento e ingenieros industriales.",
    requiredInputs: [
      "Trazado longitudinal de la conducción con cotas piezométricas y topográficas del terreno",
      "Caudal de diseño volumétrico Q (m³/h o L/s) y viscosidad cinemática del fluido",
      "Material de la tubería (rugosidad absoluta k en mm: fundición dúctil, PEAD, PVC-O, acero)"
    ],
    generatedOutputs: [
      "Diámetro interior óptimo manteniendo velocidades en rango económico y normativo (0.8 m/s <= v <= 2.0 m/s)",
      "Línea de energía y línea piezométrica a lo largo de todo el perfil longitudinal",
      "Presión de sobrepresión máxima de golpe de ariete Delta_P_max calculada con la celeridad de onda a",
      "Dimensionamiento de dispositivos de protección hidráulica (calderín de aire comprimido o chimenea de equilibrio)"
    ],
    clinicalRisks: [
      "Despreciar el golpe de ariete provocando rotura por fatiga de materiales plásticos o explosión de tubería",
      "Trabajar por debajo de la presión de vapor del agua generando bolsas de cavitación destructivas en bombas",
      "Velocidades excesivas (> 3 m/s) que causen abrasión acelerada de las paredes interiores de la tubería"
    ],
    complianceStandards: ["UNE-EN 805 (Abastecimiento de Agua)", "Ecuación de Colebrook-White", "Criterios del CEDEX"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "I1.5",
    label: "Seguridad Contra Incendios y Evacuación de Edificios (CTE DB-SI)",
    shortDesc: "Sectorización de incendios, cálculo de resistencia al fuego estructural (R/REI) y dimensionamiento de vías de evacuación.",
    longDesc: "Módulo de cumplimiento reglamentario de protección pasiva y activa contra incendios en edificación y naves industriales, que calcula la densidad de ocupación por uso, dimensiona la anchura de pasillos y escaleras de evacuación, verifica recorridos máximos hasta salidas seguras y asigna la resistencia al fuego requerida a elementos portantes y separadores (R, REI, EI).",
    audience: "Arquitectos proyectistas, ingenieros de seguridad, técnicos de bomberos y peritos de seguros.",
    requiredInputs: [
      "Uso característico del edificio (Residencial Vivienda, Administrativo, Comercial, Hospitalario, Docente)",
      "Superficie útil de cada recinto y planta, y altura de evacuación total del edificio",
      "Disponibilidad de rociadores automáticos (sprinklers) o sistemas de control de humos"
    ],
    generatedOutputs: [
      "Cálculo exacto del aforo y ocupación reglamentaria de personas por planta",
      "Comprobación de longitudes de evacuación: distancias máximas a salidas de planta (< 25 m con una salida, < 50 m con dos)",
      "Dimensionamiento del ancho libre de pasos y escaleras protegidas con fórmula A >= P / 200",
      "Ficha formal justificativa de cumplimiento de los 6 documentos básicos del CTE DB-SI 1 a SI 6"
    ],
    clinicalRisks: [
      "Infradimensionar escaleras de evacuación provocando estrangulamientos y aplastamientos humanos en emergencias",
      "Utilizar materiales de revestimiento con clase de reacción al fuego inadecuada (ej. inflamabilidad B-s3,d2 en techos)",
      "Crear fondos de saco de evacuación que superen los 15 metros permitidos sin salida alternativa"
    ],
    complianceStandards: ["CTE DB-SI (Seguridad en caso de Incendio)", "RSCIEI (Reglamento de Incendios en Establecimientos Industriales)", "Normas UNE 23007"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "I1.6",
    label: "Mantenimiento Predictivo Industrial y Análisis de Vibraciones (ISO 10816)",
    shortDesc: "Procesamiento de acelerómetros, transformada rápida de Fourier (FFT), severidad vibratoria y cálculo de vida remanente (RUL).",
    longDesc: "Motor analítico de monitorización de condición para maquinaria rotativa industrial (turbinas, compresores, bombas, motores eléctricos) que ingesta señales continuas de vibración temporal, aplica la transformada rápida de Fourier (FFT) para extraer el espectro de frecuencias, identifica defectos cinemáticos (desalineación a 2X, desequilibrio a 1X, fallos en pistas de rodamiento BPFI/BPFO) y estima la vida útil remanente (RUL) mediante modelos de degradación Weibull.",
    audience: "Ingenieros de mantenimiento de plantas industriales, técnicos de ensayos no destructivos (END) y responsables de fiabilidad.",
    requiredInputs: [
      "Serie temporal de aceleración v(t) muestreada a frecuencia adecuada (f_s >= 10 kHz)",
      "Velocidad de giro nominal del eje en RPM (frecuencia fundamental 1X)",
      "Geometría del rodamiento: número de bolas, diámetro primitivo, ángulo de contacto y clase de máquina (ISO 10816)"
    ],
    generatedOutputs: [
      "Espectro de vibración en velocidad RMS (mm/s) desglosado en frecuencias armónicas cardinales",
      "Clasificación del estado mecánico según norma ISO 10816: Zona A (Excelente), B (Aceptable), C (Alerta) o D (Peligro crítico)",
      "Detección de frecuencias de paso de elementos rodantes (BPFO exterior, BPFI interior, BSF bola)",
      "Curva de degradación temporal y estimación de Vida Útil Remanente (Remaining Useful Life / RUL en horas)"
    ],
    clinicalRisks: [
      "Aliasing de frecuencias por muestrear por debajo de la frecuencia de Nyquist ocultando componentes armónicas clave",
      "Confundir frecuencias de resonancia estructural del banco de pruebas con desequilibrio del rotor",
      "No actuar de inmediato ante entrada en Zona D provocando gripado violento o rotura catastrófica del eje"
    ],
    complianceStandards: ["ISO 10816 (Evaluación de Vibraciones en Maquinaria)", "ISO 13373", "Distribución de Weibull"],
    recommendedModel: "GPT-4o"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Ingeniería & Arquitectura (3 a 5 preguntas de impacto real)
 */
export const INGENIERIA_DIAGNOSTIC_QUESTIONS = [
  {
    id: "ing_normativa_scope",
    title: "Marco Normativo y Códigos de Edificación de Aplicación",
    context: "El marco normativo determina los coeficientes de seguridad de materiales, las combinaciones de carga y las fórmulas de comprobación.",
    options: [
      {
        id: "spain_cte_ce",
        label: "Código Técnico de la Edificación (CTE) y Código Estructural español",
        impact: "Cumplimiento obligatorio en España para proyectos de edificación y obra civil (RD 470/2021).",
        recommendation: "Configurar tablas oficiales de coeficientes de mayoración (gamma_G = 1.35, gamma_Q = 1.50) y comprobaciones de flechas ELS L/300 a L/500."
      },
      {
        id: "eurocodes_en",
        label: "Eurocódigos Estructurales Europeos (EN 1990 a EN 1999 con Anejos Nacionales)",
        impact: "Exigido en licitaciones europeas y proyectos internacionales en la UE con coeficientes de los Anejos Nacionales.",
        recommendation: "Esquema parametrizable de coeficientes psi_0, psi_1 y psi_2 según el país de implantación de la obra."
      },
      {
        id: "us_aci_aisc",
        label: "Normativa Norteamericana e Internacional (ACI 318 / AISC 360 / ASCE 7)",
        impact: "Diseño por factores de carga y resistencia (LRFD) habitual en proyectos en Latinoamérica, Oriente Medio y EE.UU.",
        recommendation: "Unidades en sistema imperial/métrico dual con factores de reducción de resistencia phi específicos por modo de fallo."
      }
    ]
  },
  {
    id: "ing_bim_lod_level",
    title: "Nivel de Desarrollo BIM y Formatos de Interoperabilidad (LOD)",
    context: "El nivel LOD define la precisión geométrica de los elementos y la densidad de metadatos técnicos en el modelo IFC.",
    options: [
      {
        id: "lod_200_conceptual",
        label: "LOD 200: Diseño Conceptual / Anteproyecto (Masas y Volúmenes)",
        impact: "Geometría genérica simplificada con propiedades aproximadas de transmitancia y cargas globales para estudios previos.",
        recommendation: "Filtros de clash detection de baja resolución; ignorar colisiones menores de tuberías o carpinterías."
      },
      {
        id: "lod_350_constructivo",
        label: "LOD 350: Proyecto de Ejecución / Coordinación de Interfaces",
        impact: "Elementos definidos con dimensiones exactas, encuentros, armaduras tipo, soportes y trazados MEP definitivos.",
        recommendation: "Clash detection estricto entre estructura e instalaciones con matriz de tolerancias de 10 mm y exportación BCF."
      },
      {
        id: "lod_400_fabricacion",
        label: "LOD 400/500: Fabricación de Taller y As-Built para Mantenimiento (Facility Management)",
        impact: "Detalle completo de tornillería, soldaduras, placas de anclaje y metadatos de mantenimiento COBie / Asset Management.",
        recommendation: "Motor de análisis espacial de alta precisión con indexación espacial BVH (Bounding Volume Hierarchy) para no saturar memoria."
      }
    ]
  },
  {
    id: "ing_calculation_method",
    title: "Metodología de Cálculo y Granularidad de Análisis",
    context: "Determina si el cálculo se resuelve mediante fórmulas analíticas directas, matricial de barras o elementos finitos volumétricos.",
    options: [
      {
        id: "direct_matrix_1d",
        label: "Cálculo Matricial 1D/2D (Pórticos, Celosías y Vigas Continuas)",
        impact: "Resolución exacta instantánea en milisegundos mediante el método de rigidez directa sobre matrices banda de barras.",
        recommendation: "Utilizar NumPy y SciPy Sparse con almacenamiento en matrices dispersas CSR para resolver grandes mallas en segundos."
      },
      {
        id: "fem_shell_plate_2d",
        label: "Elementos Finitos 2D (Láminas, Losas y Muros de Cortante)",
        impact: "Mallas de elementos triangulares o cuadriláteros con integración numérica de Gauss para tensiones en superficies complejas.",
        recommendation: "Generador de mallas Delaunay con control de aspecto y refinamiento local en nudos de concentración de tensiones."
      },
      {
        id: "cfd_fluid_dynamics",
        label: "Dinámica de Fluidos Computacional (CFD) y Transitorios Hidráulicos",
        impact: "Resolución de Navier-Stokes y transitorios elásticos de golpe de ariete paso a paso mediante el Método de las Características (MOC).",
        recommendation: "Discretización espacial Delta_x = c * Delta_t para cumplir exactamente la condición de estabilidad de Courant-Friedrichs-Lewy (CFL = 1)."
      }
    ]
  },
  {
    id: "ing_visado_responsibility",
    title: "Responsabilidad Profesional y Exigencia de Visado Colegial",
    context: "El software de ingeniería no puede asumir responsabilidad civil; esta recae exclusivamente en el proyectista legalmente habilitado.",
    options: [
      {
        id: "preliminary_study",
        label: "Estudio Previo / Predimensionamiento Interno (Sin valor constructivo)",
        impact: "Herramienta de apoyo analítico rápido para evaluación de alternativas en fase inicial de concurso o diseño.",
        recommendation: "Inyectar marca de agua visible 'DOCUMENTO DE PREDIMENSIONAMIENTO - NO APTO PARA EJECUCIÓN DE OBRA'."
      },
      {
        id: "executive_project_visado",
        label: "Proyecto de Ejecución Visado por Colegio Oficial de Ingenieros/Arquitectos",
        impact: "Memoria de cálculo completa con justificación analítica de cada fórmula, firmas electrónicas y hojas de comprobación ELU/ELS.",
        recommendation: "Generador de anexos de cálculo en PDF con desarrollo matemático paso a paso apto para revisión por el Colegio Oficial."
      },
      {
        id: "industrial_monitoring",
        label: "Monitorización y Mantenimiento Operativo en Planta Industrial",
        impact: "Supervisión continua en tiempo real sin generación de proyectos colegiados pero con impacto en paradas de planta.",
        recommendation: "Protocolo de alertas automáticas conforme a ISO 10816 con registro inmutable en base de datos para auditorías de seguros."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Ingeniería)
 */
export const INGENIERIA_PROJECT_TEMPLATES = [
  {
    id: "template-structural-matrix-calc",
    name: "Cálculo Matricial Estructural y Verificación ELU/ELS (PyStruct Engine)",
    desc: "Motor de análisis estructural para pórticos 2D/3D mediante rigidez directa, diagramas de momentos y comprobación del Código Estructural.",
    techStack: [
      { name: "Python 3.12", role: "Núcleo de cálculo matricial" },
      { name: "NumPy / SciPy", role: "Ensamblado de matriz de rigidez global K y resolución de K*u = F" },
      { name: "Matplotlib / Plotly", role: "Renderizado vectorial de deformadas, leyes de flectores y cortantes" },
      { name: "DeepSeek V4", role: "Generación de memorias de cálculo analíticas con justificación de fórmulas" }
    ],
    folderStructure: `pystruct_engine/
├── data/
│   ├── sections/            # Prontuario de perfiles normalizados IPE, HEB, tubos
│   └── models/              # Ficheros JSON con geometría de pórticos
├── src/
│   ├── core/
│   │   ├── node.py          # Definición de nudos y grados de libertad (DOFs)
│   │   ├── element.py       # Matriz de rigidez local 6x6 / 12x12
│   │   └── assembler.py     # Ensamblado de rigidez global y condiciones de contorno
│   ├── verification/
│   │   ├── concrete_ec2.py  # Comprobación de armaduras flexión/cortante
│   │   └── steel_ec3.py     # Pandeo lateral y esbeltez de perfiles metálicos
│   ├── visualizer/
│   │   └── plot_diagrams.py # Gráficos de leyes de esfuerzos interactivos
│   └── main.py              # CLI para cálculo y generación de memoria
├── tests/
│   └── test_cantilever.py   # Validación contra soluciones analíticas clásicas
├── requirements.txt
└── README.md`,
    dependencies: ["numpy>=2.1.0", "scipy>=1.14.0", "matplotlib>=3.9.0", "plotly>=5.24.0", "pydantic>=2.9.0"],
    envVars: ["CODE_STANDARD=CODIGO_ESTRUCTURAL_2021", "STEEL_GRADE=S275", "CONCRETE_GRADE=HA-30"],
    firstStep: "Ejecutar 'pip install -r requirements.txt' y correr 'python src/main.py --input sample_frame.json' para resolver el pórtico y abrir los diagramas de esfuerzos."
  },
  {
    id: "template-openbim-clash-detector",
    name: "Auditor y Coordinador OpenBIM con Detección de Colisiones (IfcOpenShell & BCF)",
    desc: "Plataforma de coordinación espacial que ingesta modelos IFC4 de arquitectura y MEP, detecta interferencias y genera reportes BCF.",
    techStack: [
      { name: "Python 3.12", role: "Procesamiento de modelos BIM" },
      { name: "IfcOpenShell", role: "Parser nativo de ficheros IFC2x3 e IFC4 y extracción de geometría" },
      { name: "python-bcf", role: "Generación de paquetes de incidencias BCF XML 2.1 / 3.0" },
      { name: "Claude 3.7 Sonnet", role: "Clasificación semántica de severidad de colisiones y propuestas de ruteo" }
    ],
    folderStructure: `openbim_coordinator/
├── data/
│   ├── ifc_models/          # Modelos IFC de estructura y climatización
│   └── bcf_packages/        # Incidencias BCF exportadas para Revit/ArchiCAD
├── src/
│   ├── ifc_parser/
│   │   └── loader.py        # Ingesta y filtrado de clases (IfcBeam, IfcPipeSegment)
│   ├── clash/
│   │   ├── bounding_box.py  # AABB / OBB de pre-filtrado rápido
│   │   └── exact_mesh.py    # Intersección booleana exacta de sólidos BREP
│   ├── bcf_builder/
│   │   └── issue_writer.py  # Generador de temas BCF con GUIDs y capturas
│   └── server.py            # API para coordinación y visor WebGL
├── requirements.txt
└── Dockerfile`,
    dependencies: ["ifcopenshell>=0.8.0", "trimesh>=4.0.8", "shapely>=2.0.6", "fastapi>=0.115.0", "uvicorn>=0.30.0"],
    envVars: ["TOLERANCE_HARD_CLASH_MM=10", "TOLERANCE_CLEARANCE_MM=50", "OUTPUT_BCF_VERSION=3.0"],
    firstStep: "Iniciar el servidor con 'uvicorn src.server:app --reload' y subir dos archivos IFC de prueba para ejecutar el análisis de colisiones espaciales."
  },
  {
    id: "template-hygrothermal-glaser",
    name: "Simulador Higrotérmico de Envolventes y Método de Glaser (CTE DB-HE)",
    desc: "Herramienta de cálculo higrotérmico que modela cerramientos multicapa, calcula valores U y previene condensaciones según ISO 13788.",
    techStack: [
      { name: "Python 3.12", role: "Cálculo higrotérmico mensual" },
      { name: "SciPy", role: "Interpolación de presiones de vapor de saturación de Antoine" },
      { name: "ReportLab", role: "Generación automática de memoria técnica en PDF para visado colegial" },
      { name: "Streamlit / React", role: "Interfaz interactiva con corte estratigráfico y gráfico de Glaser" }
    ],
    folderStructure: `hygrothermal_glaser/
├── data/
│   ├── materials.json       # Base de datos de conductividades (lambda) y resistencias al vapor (mu)
│   └── climates_spain.json  # Temperaturas y humedades mensuales de las zonas climáticas CTE
├── src/
│   ├── thermal/
│   │   └── u_value.py       # Cálculo de resistencias térmicas R y transmitancia U
│   ├── glaser/
│   │   ├── vapor_pressure.py# Presión de saturación vs presión real de vapor mes a mes
│   │   └── condensation.py  # Cálculo de masa de agua condensada y tasa de evaporación
│   ├── reporting/
│   │   └── pdf_memo.py      # Generador de memoria visable con diagramas
│   └── app.py               # Cuadro de mando interactivo
├── requirements.txt
└── README.md`,
    dependencies: ["scipy>=1.14.0", "numpy>=2.1.0", "streamlit>=1.39.0", "reportlab>=4.2.0", "matplotlib>=3.9.0"],
    envVars: ["DEFAULT_CLIMATE_ZONE=D3", "INDOOR_HYGROMETRY_CLASS=3", "SAFE_DRYING_CYCLE=true"],
    firstStep: "Correr 'streamlit run src/app.py' para seleccionar un cerramiento con aislamiento por el interior y verificar el diagrama de Glaser de condensación."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Ingeniería (12-15 puntos)
 */
export const INGENIERIA_DEPLOYMENT_CHECKLIST = [
  {
    category: "Seguridad Estructural y Coeficientes Reglamentarios",
    items: [
      "Comprobación de equilibrio estático global: suma de reacciones verticales, horizontales y momentos nulos en los apoyos en cada combinación.",
      "Verificación de coeficientes de seguridad de materiales y cargas: comprobar aplicación rigurosa de gamma_G = 1.35 y gamma_Q = 1.50.",
      "Comprobación de flechas relativas en Estado Límite de Servicio (ELS): asegurar flecha instantánea < L/300 y flecha activa a plazo infinito < L/400.",
      "Validación de ausencia de condensación anual acumulada según el método de Glaser (ISO 13788): evaporación estival > condensación invernal."
    ]
  },
  {
    category: "Seguridad Laboral y Prevención de Riesgos en Obra",
    items: [
      "Verificación de que las dimensiones de vías de evacuación cumplen A >= P / 200 conforme al CTE DB-SI sin estrangulamientos.",
      "Comprobación de alturas mínimas de paso (> 2.10 m en accesos y > 2.20 m en garajes) en el análisis de interferencias espaciales.",
      "Identificación automática de riesgos de caída en altura en bordes de forjado en la fase de análisis del modelo estructural.",
      "Inclusión obligatoria del disclaimer de necesidad de visado colegial y dirección facultativa antes de la ejecución material de la obra."
    ]
  },
  {
    category: "Rendimiento, Geometría BIM e Interoperabilidad",
    items: [
      "Validación de esquemas IFC: comprobar que el modelo exportado cumple sintáctica y semánticamente el estándar buildingSMART IFC4.",
      "Rendimiento de clash detection: detección de colisiones entre 10.000 elementos de estructura e instalaciones en menos de 10 segundos.",
      "Compatibilidad de visualización WebGL: renderizado de mallas tridimensionales a más de 30 FPS en navegadores web estándar."
    ]
  },
  {
    category: "Precisión Física, Unidades y Trazabilidad",
    items: [
      "Verificación del sistema internacional de unidades (SI): comprobación estricta de coherencia entre kN, MPa, mm y metros en todas las fórmulas.",
      "Comprobación de sobrepresión por golpe de ariete: asegurar que la presión máxima calculada no supera la presión nominal PN de la tubería.",
      "Registro inmutable con timestamp UTC, autor técnico colegiado y hash SHA-256 de cada memoria de cálculo emitida."
    ]
  }
];

/**
 * Presets de configuración rápida para Ingeniería & Arquitectura (MVP, Producción, Enterprise)
 */
export const INGENIERIA_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: Estudio de Arquitectura / Oficina Técnica de Proyectos",
    description: "Para pequeños estudios y profesionales independientes que necesitan predimensionar estructuras y cerramientos térmicos rápidamente.",
    recommendedConfig: {
      calculationEngine: "Matricial 2D y fórmulas analíticas directas",
      bimSupport: "Importación básica IFC para cálculo térmico",
      deploymentMode: "Local en PC de trabajo con Flet Desktop o Streamlit",
      uiFramework: "Flet / Streamlit con generación de planos SVG",
      primaryModel: "DeepSeek V4 (Excelente precisión analítica, fórmulas y código Python)"
    },
    estimatedApiCostMonthly: "0 € - 25 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de ingeniería)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Consultora de Ingeniería Estructural y BIM Manager",
    description: "Para firmas de ingeniería que coordinan proyectos de edificación complejos con OpenBIM, IFC4, BCF y memorias visables.",
    recommendedConfig: {
      calculationEngine: "Matricial espacial 3D con solver de rigidez SciPy Sparse",
      bimSupport: "IfcOpenShell con clash detection automático y generación BCF 3.0",
      deploymentMode: "Servidor privado con almacenamiento Parquet cifrado",
      uiFramework: "React con visor 3D WebGL (Three.js) y exportación PDF/A",
      primaryModel: "Claude 3.7 Sonnet (Máximo rigor normativo en CTE y Eurocódigos)"
    },
    estimatedApiCostMonthly: "60 € - 180 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería técnica)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Constructora Internacional / Gran Obra de Infraestructura",
    description: "Para consorcios de obra civil, túneles, presas y mantenimiento predictivo en plantas industriales con miles de sensores IoT.",
    recommendedConfig: {
      calculationEngine: "Módulo FEM no lineal con cálculo térmico dinámico EnergyPlus / OpenFOAM",
      bimSupport: "Servidor CDE (Common Data Environment) con sincronización BCF API en tiempo real",
      deploymentMode: "Clúster dedicado en la nube europea con aceleración GPU para FEM y FFT",
      uiFramework: "Plataforma web de gemelo digital con integración SCADA y visualización 3D masiva",
      primaryModel: "Modelos dedicados privados con guardrails de seguridad y trazabilidad para comités de arbitraje"
    },
    estimatedApiCostMonthly: "> 350 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de ingeniería multidisciplinar)"
  }
];

/**
 * Tareas secundarias contextuales de Ingeniería & Arquitectura
 */
export const INGENIERIA_SECONDARY_TASKS = [
  {
    id: "SEC-ING-01",
    label: "Validador Normativo de Coeficientes de Seguridad (CTE / Eurocódigos)",
    desc: "Comprobación automática de coeficientes de mayoración de acciones (gamma_G = 1.35, gamma_Q = 1.50) y minoración de materiales."
  },
  {
    id: "SEC-ING-02",
    label: "Generador de Planos Esquemáticos Vectoriales (SVG / DXF / PlantUML)",
    desc: "Renderizado de secciones transversales, alzados y esquemas hidráulicos listos para importar en programas CAD."
  },
  {
    id: "SEC-ING-03",
    label: "Pista de Auditoría de Decisiones y Registro Inmutable en DuckDB",
    desc: "Registro inmutable con timestamp UTC, fórmulas utilizadas, autor técnico y hash SHA-256 de cada cálculo para visado."
  },
  {
    id: "SEC-ING-04",
    label: "Persistencia de Modelos Geométricos y Matrices en Parquet",
    desc: "Almacenamiento columnar local de mallas de elementos finitos, geometrías de barras y resultados de simulación."
  },
  {
    id: "SEC-ING-05",
    label: "Exportador a Formatos BIM Abiertos (IFC4 y BCF 3.0)",
    desc: "Generación de modelos de información del edificio en esquemas de buildingSMART para coordinación OpenBIM."
  },
  {
    id: "SEC-ING-06",
    label: "Detector de Riesgos Laborales y Seguridad en Obra (Safety Red-Teaming)",
    desc: "Análisis preventivo de interferencias constructivas, accesos de maquinaria y medidas de protección colectiva según RD 1627/1997."
  },
  {
    id: "SEC-ING-07",
    label: "Guardrail Antialucinación Técnica y Requisito de Visado Colegial",
    desc: "Inyección de cláusula restrictiva que impide el uso directo en obra sin la firma y visado de un técnico legalmente competente."
  },
  {
    id: "SEC-ING-08",
    label: "Dataset Sintético de Proyectos y Estructuras DEMO para Modo Offline",
    desc: "Pórticos tipo, cerramientos multicapa y mallas IFC precargadas para probar y validar la aplicación sin conexión externa."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Ingeniería
 */
export const INGENIERIA_BRANCHING_RULES = [
  {
    id: "BR-ING-01",
    condition: (answers) => answers.primaryTask === "I1.1",
    action: "Activar método de rigidez matricial 3D; forzar comprobación de flechas ELS y coeficientes de pandeo Euler."
  },
  {
    id: "BR-ING-02",
    condition: (answers) => answers.primaryTask === "I1.2",
    action: "Integrar método de Glaser (ISO 13788) mes a mes; habilitar cálculo automático de la transmitancia térmica U según CTE DB-HE."
  },
  {
    id: "BR-ING-03",
    condition: (answers) => answers.primaryTask === "I1.3",
    action: "Activar librería IfcOpenShell; preconfigurar clash detection entre arquitectura y MEP; habilitar exportación de reportes BCF."
  },
  {
    id: "BR-ING-04",
    condition: (answers) => answers.primaryTask === "I1.4",
    action: "Activar solucionador de Colebrook-White y ecuación de Joukowsky para sobrepresiones por golpe de ariete."
  },
  {
    id: "BR-ING-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-ING-07") || answers.primaryTask === "I1.1",
    action: "Inyectar cláusula de exigencia de visado colegial y prohibición de ejecución material sin dirección facultativa en obra."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Ingeniería & Arquitectura
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateIngenieriaPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = INGENIERIA_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || INGENIERIA_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => INGENIERIA_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS DE INGENIERÍA (PRD)
## Producto de Ingeniería: ${data.appName || "Horizon Engineering Engine"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Ingeniería & Arquitectura Técnica  
**Marco Normativo de Referencia:** CTE / Código Estructural / Eurocódigos  
**Versión Documental:** v1.0.0 (Especificación de Grado de Ingeniería)  

---

### 1. Resumen Ejecutivo y Alcance del Proyecto
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción Operativa:** ${primary.longDesc}
- **Público Técnico Destinatario:** ${primary.audience}
- **Advertencia Legal Deontológica:** Los resultados generados por este software constituyen un predimensionamiento técnico y deben ser validados, firmados y visados colegialmente por un profesional legalmente competente antes de su ejecución material en obra.

---

### 2. Entradas, Salidas y Riesgos Técnicos
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos Técnicos Mapeados y Medidas Mitigadoras:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Verificación según coeficientes de seguridad del CTE y Eurocódigos con supervisión facultativa.`).join("\n") || "- Mitigación mediante coeficientes de seguridad normativos."}

---

### 3. Tareas Secundarias de Soporte y Trazabilidad
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa estándar con persistencia en DuckDB y dataset de demostración."}

---

### 4. Arquitectura Técnica y Estándares de Interoperabilidad
- **Framework de Interfaz:** ${data.uiFramework || "Flet (Python Desktop / Local) o React"}
- **Motor de Cálculo:** ${data.storageEngine || "NumPy + SciPy Sparse + IfcOpenShell"}
- **Estándares BIM:** buildingSMART IFC4 y paquetes de incidencias BCF 3.0.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con mallas y cerramientos sintéticos DEMO precargados." : "Requiere conectividad para sincronización de modelos BIM."}

---

### 5. Guardrails de Seguridad Técnica y Prevención de Errores
1. **Verificación de Coeficientes de Seguridad:** Imposibilidad de alterar a la baja los coeficientes reglamentarios de mayoración de acciones.
2. **Control de Estabilidad Estática:** Comprobación de que la estructura es isostática o hiperestática sin mecanismos inestables.
3. **Control de Pandeo y Flechas:** Bloqueo de perfiles que no satisfagan las comprobaciones de esbeltez o flechas máximas admisibles.
4. **Registro Inmutable con Hash:** Sellado temporal y criptográfico de cada memoria de cálculo emitida para visado colegial.

---

### 6. Checklist de Validación y Aseguramiento de Calidad Técnica (QA)
${INGENIERIA_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const INGENIERIA_QA_CHECKLIST = INGENIERIA_DEPLOYMENT_CHECKLIST;
