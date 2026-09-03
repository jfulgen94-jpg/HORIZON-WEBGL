/**
 * PROMPTS-INGENIERIA.JS — Biblioteca de Prompts Especializados en Ingeniería & Arquitectura
 * Área: Ingeniería & Arquitectura
 * Tareas: Genéricos, I1.1 a I1.6 y Tareas Secundarias
 */

export const INGENIERIA_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "ing-001",
        title: "Especificación Funcional y Marco Normativo para Software de Ingeniería",
        desc: "Define el marco reglamentario técnico (CTE, Eurocódigos, EHE-08/CE), tipos de análisis y tolerancias.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Consultor Senior y Arquitecto de Software Tecnico especializado en proyectos de edificacion y obra civil.
[COPIA AQUI TU IDEA]

Redacta la especificacion funcional y marco normativo tecnico para esta aplicacion de ingenieria:
1. Alcance tecnico y normativo aplicable: Codigo Tecnico de la Edificacion (CTE - DB-SE, DB-SI, DB-HE, DB-HR), Codigo Estructural espanol (Real Decreto 470/2021) y Eurocodigos estructurales (EN 1990 a EN 1999).
2. Definicion de tipologias de proyecto soportadas: residencial, terciario, industrial o rehabilitacion patrimonial con indicacion de hipotesis de uso y sobrecargas de servicio.
3. Arquitectura del motor de calculo: separacion estricta entre la definicion geometrica del modelo, la matriz de rigidez / ecuaciones de gobierno y los modulos de comprobacion normativa.
4. Criterios de convergencia numerica y tolerancias dimensionales (margen de error milimetrico, equilibrio nodal con residuo < 1e-5).
5. Trazabilidad de calculos para visado colegial: los resultados deben ser reproducibles, auditables y justificados formula a formula para su incorporacion a la memoria de calculo.

Restricciones:
- No utilices aproximaciones empiricas no homologadas; cada ecuacion debe referenciar el articulo de la norma correspondiente.
- Delimita con precision las hipotesis de linealidad geometrica y mecanica adoptadas.

Formato de salida: Documento de especificacion tecnica en Markdown con matriz de requisitos y tabla de normativas aplicables.`,
        tags: ["ingeniería", "cte", "eurocódigos", "especificación", "normativa"]
      },
      {
        id: "ing-002",
        title: "Arquitectura de Datos CAD/BIM, Grafos Espaciales y Gemelos Digitales",
        desc: "Estructura el modelo de datos para entidades espaciales, topologías de recintos y relaciones BIM (IFC).",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto de Datos BIM y Desarrollador de Esquemas de Informacion Espacial (buildingSMART / IFC).
[COPIA AQUI TU IDEA]

Disena la arquitectura del modelo de datos para la representacion geometrica y espacial del proyecto:
1. Estructura jerarquica espacial segun estandar IFC: Project -> Site -> Building -> BuildingStorey -> Space / Zone.
2. Modelado de elementos constructivos (IfcWall, IfcSlab, IfcColumn, IfcBeam, IfcDoor, IfcWindow) con atributos geometricos (geometria B-Rep, extrusiones parametricas) y de materiales (capas con densidad, conductividad y resistencia).
3. Grafo topologico de recintos y adyacencias (Dual Graph): nodos = recintos/espacios, aristas = cerramientos/puertas compartidas para analisis de circulaciones y balance termico.
4. Definicion de conjuntos de propiedades estandarizados (Property Sets - Psets) y compatibilidad con esquemas abiertos IFC4 e IFC4.3.
5. Gestion del historico de modificaciones geometricas y soporte para gemelos digitales con sincronizacion de sensores IoT en tiempo real.

Restricciones:
- Respeta estrictamente la especificacion oficial de buildingSMART para evitar corrupcion de modelos en software BIM federado (Revit, Archicad, Allplan).

Formato de salida: Diagrama de clases en formato Mermaid y esquema JSON Schema / DDL en PostgreSQL con extension PostGIS.`,
        tags: ["bim", "ifc", "postgis", "geometría-espacial", "gemelo-digital"]
      },
      {
        id: "ing-003",
        title: "Selección de Tech Stack para Motores Geométricos y Visualización 3D",
        desc: "Evalúa tecnologías para cálculo geométrico computacional, librerías CAD y renderizado WebGL/Three.js.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Graphics & Computational Geometry Engineer evaluando componentes de software de ingenieria.
[COPIA AQUI TU IDEA]

Justifica la seleccion del stack tecnologico para construir el motor geometrico y visor 3D de la plataforma:
1. Motor geometrico de backend: evaluacion entre OpenCASCADE (C++/PythonOCC), Shapely/CGAL para operaciones booleanas y topologia, y trimesh para mallas poligonales.
2. Motor de renderizado en frontend web: comparativa entre Three.js, Babylon.js y bibliotecas especializadas en BIM abierto como Web-IFC / ThatOpenPlatform (IFC.js).
3. Formatos de transmision geometrica ligera: conversion eficiente de modelos pesados a glTF 2.0 binario (.glb) optimizado con compresion Draco.
4. Motor de calculo cientifico: NumPy/SciPy para resolucion de matrices matriciales de elementos finitos y sistemas lineales esparsos.
5. Estrategia de Web Workers / WebAssembly (Wasm) para ejecutar analisis geometricos pesados en segundo plano sin congelar la UI del navegador.

Restricciones:
- El stack seleccionado debe funcionar integramente en navegadores web modernos sin requerir instalacion de plugins ni software de escritorio.
- Tasa de refresco objetivo: 60 FPS en modelos con hasta 50.000 poligonos.

Formato de salida: Matriz tecnica de decision en Markdown con analisis de rendimiento, soporte comunitario y licencias de codigo abierto.`,
        tags: ["tech-stack", "threejs", "webgl", "opencascade", "gltf", "wasm"]
      },
      {
        id: "ing-004",
        title: "Diseño de Interfaz Técnica CAD/BIM con Árbol de Propiedades y Visor Gráfico",
        desc: "Diseña un viewport 3D interactivo con árbol de capas, panel de propiedades físicas y herramientas de corte.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Interfaz UX/UI especializado en aplicaciones CAD tecnicas y herramientas de modelado profesional.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para la aplicacion tecnica de ingenieria y arquitectura:
1. Viewport 3D protagonista: navegacion con orbitacion mediante boton central del raton, paneo, zoom y cubo de vistas ortogonales (Top, Front, Isometric) tipo ViewCube.
2. Panel lateral colapsable con arbol jerarquico de elementos (Outliner): seleccion multiple, aislamiento visual (solo ver seleccion), ocultacion por capas y tipos de elemento.
3. Inspector de propiedades contextual: al seleccionar un elemento constructivo, mostrar sus dimensiones exactas, material asignado, capas termicas y resultados de calculo.
4. Herramienta interactiva de planos de seccion (Section Planes): corte dinamico en los ejes X, Y, Z para visualizar el interior de recintos o deformadas estructurales.
5. Barra de herramientas flotante: modos de visualizacion (alámbrico, sombreado solido, mapa de calor de tensiones Von Mises o temperaturas).

Restricciones:
- Diseno sobrio de alta productividad, minimizando desplazamientos de raton y con atajos de teclado rapidos para comandos frecuentes.

Formato de salida: Guia de arquitectura de componentes visuales en React/Tailwind con mapa de interacciones del usuario.`,
        tags: ["ui-cad", "viewport-3d", "bim-viewer", "propiedades", "ergonomía"]
      },
      {
        id: "ing-005",
        title: "Redacción de Documentación Técnica de Proyecto y Pliego de Prescripciones",
        desc: "Estructura la memoria descriptiva, memoria constructiva, anejos de cálculo y pliego de condiciones técnicas.",
        model: "GPT-4o",
        prompt: `Eres un Arquitecto e Ingeniero Colegiado con amplia experiencia en redaccion y visado de proyectos de ejecucion.
[COPIA AQUI TU IDEA]

Redacta la estructura formal de la Memoria del Proyecto Tecnico conforme a la Parte I del Codigo Tecnico de la Edificacion:
1. Memoria Descriptiva: antecedentes, justificacion del programa de necesidades, adecuacion al entorno urbanistico, cuadro de superficies utiles y construidas.
2. Memoria Constructiva: descripcion de la sustentacion del edificio, estructura portante, envolvente termica, compartimentacion interior, acabados e instalaciones.
3. Anejos a la Memoria indispensables:
   - Anejo de Cumplimiento del CTE DB-SI (Seguridad en caso de Incendio).
   - Anejo de Ahorro de Energia y Eficiencia Termica (CTE DB-HE).
   - Anejo de Justificacion Estructural y Geotecnica (CTE DB-SE).
4. Pliego de Prescripciones Tecnicas Particulares: calidades de materiales recepcionados en obra, ensayos de control de calidad obligatorios y condiciones de ejecucion.
5. Presupuesto desglosado con mediciones y cuadros de precios descompuestos segun clasificacion estandar.

Restricciones:
- Redaccion rigurosa, precisa y oficial, sin frases genericas o vacias de contenido tecnico.

Formato de salida: Plantilla completa estructurada en Markdown con encabezados reglamentarios y marcadores de variables tecnicas.`,
        tags: ["memoria-técnica", "proyecto-ejecución", "pliego-condiciones", "cte", "visado"]
      },
      {
        id: "ing-037",
        title: "Cálculo de Cimentaciones Profundas y Pilotes según CTE DB-SE-C y Eurocódigo 7",
        desc: "Dimensiona la capacidad portante por punta y fuste de pilotes aislados y grupos de pilotes en suelos estratificados.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Geotécnico y Calculista de Cimentaciones Especiales.
[COPIA AQUI TU IDEA]

Desarrolla el modulo de calculo geotécnico y estructural para cimentaciones profundas mediante pilotes conforme al CTE DB-SE-C y Eurocódigo 7:
1. Ingesta de la columna estratigrafica del terreno: parametros geotecnicos por estrato (cohesion c, angulo de rozamiento interno phi, peso especifico gamma, modulo de deformacion E y nivel freatico).
2. Calculo analitico de la resistencia caracteristica del pilote:
   - Resistencia por punta (R_p) mediante formulaciones analiticas para suelos granulares y cohesivos.
   - Resistencia por fuste (R_f) integrando tensiones efectivas a lo largo del fuste con coeficientes de rozamiento lateral beta o alfa.
3. Evaluacion del efecto grupo de pilotes: determinacion de la eficiencia del grupo y comprobacion del mecanismo de rotura en bloque.
4. Estimacion de asientos individuales y del grupo mediante el metodo de transferencia de carga (Curvas t-z y q-z).
5. Dimensionamiento de armaduras longitudinales y cercos del fuste del pilote frente a esfuerzos combinados de axil y momento flector.

Restricciones:
- Aplica los coeficientes parciales de seguridad y factores de correlacion segun el numero de sondeos disponibles.

Formato de salida: Modulo de Python 'deep_foundations_calc.py' con tipado estricto Pydantic y memoria de calculo estructurada en Markdown.`,
        tags: ["geotecnia", "pilotes", "cimentaciones", "cte-db-se-c", "eurocódigo-7", "estructuras"]
      },
      {
        id: "ing-038",
        title: "Análisis Modal Espectral y Diseño Sismorresistente según NCSE-02 y Eurocódigo 8",
        desc: "Calcula frecuencias propias, modos de vibración y cortante basal de diseño frente a solicitaciones sísmicas.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Estructural Especialista en Dinámica de Estructuras e Ingeniería Sísmica.
[COPIA AQUI TU IDEA]

Implementa el motor de calculo modal espectral para estructuras de edificacion segun la norma NCSE-02 y Eurocodigo 8:
1. Ensamblado de la matriz de masa condensada M y matriz de rigidez elastica K del modelo tridimensional de porticos.
2. Resolucion del problema de autovalores generalizado K * phi_i = omega_i^2 * M * phi_i para obtener frecuencias naturales y modos de vibracion.
3. Calculo de los factores de participacion modal y masa efectiva participante, asegurando alcanzar al menos el 90% de la masa total del edificio.
4. Construccion del espectro de respuesta elastica y de diseno en funcion de la aceleracion sismica basica a_b, coeficiente de contribucion K y coeficiente de comportamiento por ductilidad q.
5. Combinacion modal de respuestas maximas mediante la regla CQC (Complete Quadratic Combination) para evaluar desplazamientos y cortante basal.

Restricciones:
- Comprueba que la excentricidad accidental de masa cumpla el minimo normativo del 5% de la dimension de la planta para considerar la torsion accidental.

Formato de salida: Script de Python utilizando NumPy y SciPy con graficos de formas modulares y memoria justificativa sismorresistente.`,
        tags: ["sismo", "análisis-modal", "ncse-02", "eurocódigo-8", "dinámica-estructural", "autovalores"]
      }
    ]
  },
  {
    id: "distribuciones-espaciales",
    name: "Generador de Distribuciones Espaciales / Vitruvio IA (I1.1)",
    prompts: [
      {
        id: "ing-006",
        title: "Generación Algorítmica de Distribuciones Espaciales y Layout Arquitectónico",
        desc: "Genera propuestas de distribución en planta optimizando adyacencias, orientación solar y ventilación natural.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto Algoritmico y Especialista en Diseno Generativo Espacial (Space Syntax).
[COPIA AQUI TU IDEA]

Genera la distribucion espacial interior para el perimetro edificable y programa de necesidades aportados:
1. Definicion de recintos requeridos: salon-comedor, cocina, dormitorios, banos, pasillos y zonas de almacenamiento con sus areas minimas reglamentarias.
2. Matriz de adyacencias deseables: cocina contigua a comedor, dormitorios agrupados en zona de noche con acceso directo a bano, aislamiento de areas ruidosas.
3. Criterios de optimizacion bioclimatica: orientacion sur para estancias de estancia diurna continuada (maxima ganancia solar pasiva), zonas de servicio al norte.
4. Minimizacion estricta de espacios residuales y pasillos de circulacion (pasillos < 12% de la superficie util total).
5. Garantia de iluminacion y ventilacion natural directa a fachada o patio reglamentario en todas las piezas habitables segun normativa.

Restricciones:
- Respeta escrupulosamente los circulos de giro de accesibilidad (diametro 1.50 m libre de obstaculos en vestibulo y pasillos principales).

Formato de salida: Descripcion geometrica de la distribucion con coordenadas 2D de poligonos de recintos, tabla de superficies y matriz de adyacencias.`,
        tags: ["distribución-espacial", "space-syntax", "diseño-generativo", "vitruvio", "layout"]
      },
      {
        id: "ing-007",
        title: "Optimización de Recorridos, Circulaciones y Evacuación según CTE-DB-SI",
        desc: "Calcula las rutas de evacuación óptimas verificando longitudes máximas y salidas de emergencia reglamentarias.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Seguridad contra Incendios y Evacuacion de Edificios conforme al CTE DB-SI.
[COPIA AQUI TU IDEA]

Calcula y verifica los recorridos de evacuacion en la planta arquitectonica:
1. Identificacion de Salidas de Planta y Salidas de Edificio hacia el espacio exterior seguro.
2. Calculo de recorridos de evacuacion desde el punto mas desfavorable de cada recinto hasta una salida de planta:
   - Maximo 25 metros si existe una unica salida disponible (fondo de saco).
   - Maximo 50 metros si existen al menos dos salidas alternativas con trayectorias que formen un angulo >= 45 grados.
3. Determinacion de la ocupacion teorica por recinto aplicando los coeficientes reglamentarios de metros cuadrados por persona segun uso.
4. Dimensionamiento del ancho util de pasillos y puertas de paso: A >= P / 200 (minimo estandar de 0.80 m para puertas y 1.00 m para pasillos).
5. Verificacion del sentido de apertura de puertas en el sentido de la evacuacion cuando la ocupacion supere las 50 personas.

Restricciones:
- No realices mediciones en linea recta si existen tabiques interpuestos; los recorridos deben medirse por el eje real de circulacion peatonal.

Formato de salida: Informe de justificacion del CTE DB-SI con tabla de recorridos, comprobacion de longitudes y diagrama de rutas criticas.`,
        tags: ["cte-db-si", "evacuación", "incendios", "recorridos", "seguridad"]
      },
      {
        id: "ing-008",
        title: "Verificación Automática de Normativa de Habitabilidad y Alturas Mínimas",
        desc: "Audita dimensiones mínimas de estancias, alturas libres entre forjados y huecos de iluminación.",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto Revisor de Licencias Urbanisticas y Normativas Autonomicas de Habitabilidad.
[COPIA AQUI TU IDEA]

Audita la planta arquitectonica verificando el cumplimiento estricto de los estandares de habitabilidad:
1. Altura libre minima interior entre pavimento y techo acabado: comprobar H >= 2.50 m en estancias principales y H >= 2.20 m en pasillos, banos y cocinas.
2. Superficie minima de piezas habitables: salon >= 14 m2, dormitorio principal >= 10 m2, dormitorios individuales >= 6-8 m2.
3. Inscripcion de figuras geometricas minimas: verificar que en cada recinto puede inscribirse un cuadrado libre de obstaculos reglamentario (ej: 3.00x3.00 m en estar).
4. Superficie minima de huecos de iluminacion natural (ventanas): comprobar que el area vidriada sea >= 1/8 o 1/10 de la superficie util de la pieza.
5. Superficie de ventilacion efectiva practicable: comprobar que sea >= 1/3 de la superficie de iluminacion obligatoria.

Restricciones:
- Si algun recinto no cumple los minimos, emite un aviso de 'No Conforme' especificando la desviacion cuantitativa exacta.

Formato de salida: Tabla de auditoria de habitabilidad en Markdown con columnas [Recinto, Area Calculada, Altura, Hueco Iluminacion, Estado de Conformidad].`,
        tags: ["habitabilidad", "alturas-mínimas", "normativa-vivienda", "iluminación", "auditoría"]
      },
      {
        id: "ing-009",
        title: "Exportación Paramétrica a Formatos Vectoriales DXF y SVG Limpio",
        desc: "Genera archivos CAD vectoriales limpios (.dxf con ezdxf) y gráficos SVG con capas organizadas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Desarrollador de Herramientas CAD y Automatizacion de Planos Tecnicos Vectoriales.
[COPIA AQUI TU IDEA]

Escribe el modulo en Python para exportar la distribucion arquitectonica a formatos vectoriales interoperables:
1. Exportacion a DXF (AutoCAD R2018) utilizando la biblioteca 'ezdxf':
   - Organizacion en capas normalizadas con colores y tipos de linea ISO: 'MUROS_CARGA' (blanco, grosor 0.50 mm), 'TABIQUERIA' (gris, 0.30 mm), 'CARPINTERIAS' (azul, 0.20 mm), 'COTAS' (rojo, 0.15 mm) y 'TEXTOS'.
   - Generacion de entidades geometricas nativas: polilineas cerradas (LWPOLYLINE), arcos de barrido para puertas y bloques para mobiliario basico.
2. Exportacion a SVG vectorial limpio para previsualizacion web: uso de viewBox escalado en metros, estilos CSS embebidos y etiquetas semanticas identificadas por id de recinto.
3. Acotacion automatica perimetral y de huecos de fachada con cotas alineadas legibles.
4. Rotulacion de superficies: texto central en cada recinto con su nombre y metros cuadrados utiles calculados.

Restricciones:
- No generes coordenadas con precision infinita innecesaria; redondea las coordenadas a 3 decimales (precision milimetrica).

Formato de salida: Script de Python completo con funciones 'export_to_dxf(layout, path)' y 'export_to_svg(layout, path)'.`,
        tags: ["dxf", "ezdxf", "svg", "cad-vectorial", "automatización-planos"]
      },
      {
        id: "ing-010",
        title: "Cómputo Automatizado de Superficies Útiles, Construidas y Ratios de Eficiencia",
        desc: "Calcula superficies computables según catastro y normativas urbanísticas desglosando zonas comunes.",
        model: "GPT-4o",
        prompt: `Eres un Aparejador y Tecnico Especialista en Medicion y Valoracion Inmobiliaria.
[COPIA AQUI TU IDEA]

Realiza el computo exhaustivo y desglose de superficies del proyecto arquitectonico:
1. Superficie Util por estancia (medida en el interior del perimetro de tabiques acabados, deduciendo pilares y patinillos > 0.10 m2).
2. Superficie Util Total interior y computo especial de terrazas cubiertas (computadas al 50% segun criterio catastral general).
3. Superficie Construida Propia: incluyendo el grosor de los cerramientos exteriores y la mitad de las medianeras compartidas.
4. Superficie Construida con Repercusion de Elementos Comunes: asignacion proporcional del portal, escaleras, cuartos de instalaciones y rellanos segun coeficiente de copropiedad.
5. Calculo del Ratio de Eficiencia Espacial: Ratio Util/Construida (rango optimo en residencial: 78% - 84%) y sugerencias de mejora.

Restricciones:
- Cuadra milimetricamente la suma de parciales con la superficie total del edificio para evitar descuadres registrales o catastrales.

Formato de salida: Cuadro oficial de superficies en Markdown formateado segun requerimientos del Colegio de Arquitectos y Catastro.`,
        tags: ["superficies", "útil-construida", "catastro", "eficiencia-espacial", "mediciones"]
      },
      {
        id: "ing-039",
        title: "Generación Algorítmica de Distribuciones Espaciales de Planta con Grafos de Adyacencia",
        desc: "Sintetiza layouts arquitectónicos optimizados respetando relaciones topológicas funcionales y zonificación solar.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto Computacional y Especialista en Diseño Generativo Espacial.
[COPIA AQUI TU IDEA]

Crea el algoritmo generativo de distribucion en planta a partir de grafos de adyacencia y restricciones espaciales:
1. Ingesta de la matriz de adyacencias deseadas entre estancias: Salón contiguo a Cocina, Dormitorios agrupados con Bano, Vestíbulo conectado al exterior.
2. Formulacion como un problema de embedding planar de grafos (Rectangular Dual Graphs) o Voronoi ponderado en planta cerrada.
3. Optimizacion multiobjetivo con restricciones:
   - Maximizacion de la radiacion solar en estancias de estancia diurna (orientacion Sur/Sureste).
   - Minimizacion de superficies de circulacion inutiles (pasillos).
   - Respeto de superficies minimas habitables segun normativa de habitabilidad autonomica.
4. Algoritmo evolutivo o de recocido simulado para generar múltiples variantes morfológicas viables.
5. Exportacion de la geometria vectorial de la distribucion en formato SVG y GeoJSON con etiquetas de estancias.

Restricciones:
- Garantiza que ninguna estancia principal carezca de fachada exterior con ventilacion e iluminacion natural directa.

Formato de salida: Modulo de Python 'spatial_layout_generator.py' con generador de graficos SVG interactivos en el navegador.`,
        tags: ["diseño-generativo", "layouts", "grafos-adyacencia", "arquitectura-computacional", "habitabilidad"]
      },
      {
        id: "ing-040",
        title: "Verificación de Compartimentación Passiva y Resistencia al Fuego según CTE DB-SI",
        desc: "Audita que muros cortafuegos, techos y puertas tengan la resistencia al fuego exigida por normativa.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Especialista en Seguridad Passiva contra Incendios y Certificador de Elementos Constructivos.
[COPIA AQUI TU IDEA]

Desarrolla el verificador de compartimentacion pasiva conforme al CTE DB-SI y la Norma Europea EN 13501:
1. Clasificacion de cada recinto segun su grupo de riesgo intrinseco (A1 a F) y nivel de prestacion exigido (REI 30, REI 60, REI 90, REI 120).
2. Verificacion de que los muros cortafuegos entre recintos de riesgo distinto cumplan la resistencia al fuego minima:
   - REI 60 entre garajes y viviendas.
   - REI 30 entre escaleras y recintos contiguos.
   - REI 90 entre recintos de riesgo alto y zonas de evacuacion.
3. Comprobacion de la estanqueidad al humo (clase Sa o S200) en uniones de tabiques con forjados y conductos.
4. Auditoria de puertas cortafuegos: verificacion de certificado CE, mecanismo de autocierre y estanqueidad perimetral.
5. Deteccion de patologias criticas: juntas de dilatacion sin mortero ignifugado, conductos de ventilacion sin cortafuegos yselladores intumescentes.

Restricciones:
- Utiliza la tabla de exigencias del Anexo SI del CTE DB-SI segmento 2 (Separacion Vertical) y segmento 3 (Separacion Horizontal).

Formato de salida: Informe de conformidad de compartimentacion pasiva en Markdown con tabla de recintos, exigencias normativas y estado de cumplimiento.`,
        tags: ["cte-db-si", "compartimentación", "resistencia-al-fuego", "rei", "seguridad-passiva", "en-13501"]
      },
      {
        id: "ing-041",
        title: "Modelado Espacial de Iluminación Natural y Factor de Luz Diurna (DF) según UNE-EN 17037",
        desc: "Simula la penetración solar en interiores calculando el Daylight Factor y horas de asoleamiento anual.",
        model: "GPT-4o",
        prompt: `Eres un Físico de la Edificación y Consultor de Confort Lumínico y Eficiencia Arquitectónica.
[COPIA AQUI TU IDEA]

Construye el motor de simulacion de iluminacion natural para espacios interiores conforme a la norma UNE-EN 17037:
1. Calculo del Factor de Luz Diurna (Daylight Factor / DF) en rejilla de puntos interiores a 0.85 m sobre el suelo: DF = (E_interior / E_exterior_horizontal) * 100 bajo condicion de cielo cubierto estandar CIE.
2. Evaluacion de niveles de conformidad lumínica: Nivel Minimo (DF >= 2.0% en el 50% del area), Nivel Medio (DF >= 3.0%), Nivel Alto (DF >= 5.0%).
3. Simulacion de horas de exposicion a la luz solar directa (asoleamiento en solsticio de invierno y equinoccios) considerando la carta solar estereografica local.
4. Evaluacion del riesgo de deslumbramiento diurno mediante la metrica DGP (Daylight Glare Probability).
5. Optimizacion del factor de transmision luminosa (TL) de acristalamientos y diseno de viseras/lamas de proteccion solar pasiva.

Restricciones:
- Considera el coeficiente de reflexion difusa de acabados interiores (suelos, paredes y techos) y el factor de suciedad del vidrio.

Formato de salida: Modulo de Python 'daylight_factor_sim.py' con mapas de calor 2D de iluminancia interior y reporte formal de cumplimiento.`,
        tags: ["iluminación-natural", "daylight-factor", "une-en-17037", "confort-visual", "arquitectura-bioclimática"]
      }
    ]
  },
  {
    id: "eficiencia-energetica",
    name: "Simulador de Eficiencia Energética / Gaia (I1.2)",
    prompts: [
      {
        id: "ing-011",
        title: "Simulación de Transmitancias Térmicas (Valores U) y Puentes Térmicos (CTE DB-HE 1)",
        desc: "Calcula el valor U de fachadas, cubiertas y suelos desglosando resistencias térmicas y puentes térmicos lineales.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Termomecanico y Certificador Energetico de Edificios conforme al CTE DB-HE.
[COPIA AQUI TU IDEA]

Calcula la transmitancia termica global (valor U en W/m2*K) y las transmitancias limite de la envolvente:
1. Descomposicion estratigrafica del cerramiento: espesor e_i (m) y conductividad termica lambda_i (W/m*K) de cada capa constructiva (ladrillo, aislamiento termico, camara de aire, yeso).
2. Calculo de la Resistencia Termica Total: R_total = R_se + sum(e_i / lambda_i) + R_camara + R_si, incorporando resistencias termicas superficiales segun direccion del flujo de calor.
3. Calculo de la Transmitancia Termica: U = 1 / R_total.
4. Caracterizacion de Puentes Termicos Lineales (PTL): calculo del coeficiente psi (W/m*K) para encuentros criticos (pilar en fachada, contorno de hueco, union forjado-fachada, caja de persiana).
5. Comprobacion de que los valores U no superan las transmitancias maximas permitidas por el CTE DB-HE 1 segun la zona climatica del municipio (alfa, A, B, C, D o E).

Restricciones:
- Documenta las fuentes oficiales de las propiedades de los materiales (Catalogo de Elementos Constructivos del CTE).

Formato de salida: Tabla de calculo termico detallada en Markdown y script de verificacion en Python.`,
        tags: ["transmitancia", "valor-u", "puentes-térmicos", "cte-db-he1", "envolvente"]
      },
      {
        id: "ing-012",
        title: "Cálculo de Demanda Energética y Consumo de Energía Primaria no Renovable",
        desc: "Evalúa indicadores Cep,nren y Cep,tot verificando el cumplimiento de los límites para edificios nZEB (CTE DB-HE 0).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor Energetico especializado en Edificios de Consumo de Energia Casi Nulo (nZEB / Passivhaus).
[COPIA AQUI TU IDEA]

Modela y evalua el desempeno energetico global del edificio segun el CTE DB-HE 0:
1. Calculo de la Demanda Energetica combinada de Calefaccion y Refrigeracion en kWh/m2*ano considerando ganancias solares, cargas internas y ventilacion.
2. Calculo del Consumo de Energia Primaria no Renovable (Cep,nren) y Consumo de Energia Primaria Total (Cep,tot) por metro cuadrado de superficie util habitable.
3. Evaluacion de factores de conversion de energia final a primaria segun el vector energetico utilizado (electricidad de red, gas natural, biomasa, aerotermia).
4. Comprobacion de limites reglamentarios estrictos segun zona climatica de invierno y verano.
5. Propuesta de medidas de mejora para reducir la demanda pasiva antes de aumentar la potencia de los equipos mecanicos.

Restricciones:
- Aplica los balances horarios/mensuales estandarizados segun la norma UNE-EN ISO 52000-1.

Formato de salida: Informe energetico en Markdown con tabla de indicadores globales y comparativa frente a los limites del CTE DB-HE 0.`,
        tags: ["demanda-energética", "nzeb", "cte-db-he0", "energía-primaria", "passivhaus"]
      },
      {
        id: "ing-013",
        title: "Modelado Bioclimático Pasivo: Sombreamiento, Ventilación Cruzada e Inercia Térmica",
        desc: "Optimiza la radiación solar incidente con voladizos, lamas y ventilación nocturna para eliminar climatización activa.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador Bioclimatico y Simulador de Fisica de la Edificacion.
[COPIA AQUI TU IDEA]

Desarrolla la estrategia bioclimatica pasiva para optimizar el confort termico estival e invernal:
1. Diseno geometrico de protecciones solares fijas: calculo de la profundidad de voladizos horizontales y lamas verticales en funcion de la carta solar local (azimut y elevacion solar en solsticios y equinoccios).
2. Simulacion del Factor Solar Modificado (F_sh,with) de los huecos acristalados para bloquear el 80% de la radiacion en julio y permitir el 70% en diciembre.
3. Cuantificacion del potencial de Ventilacion Cruzada Natural: dimensionamiento de aberturas enfrentadas y aprovechamiento del efecto chimenea en patios interiores.
4. Optimizacion de la Inercia Termica interior: uso de muros pesados para amortiguar la onda termica diaria y reducir la oscilacion termica interior.
5. Estrategia de ventilacion nocturna intensiva para disipar el calor acumulado en la masa del edificio durante el dia.

Restricciones:
- Demuestra numericamente la reduccion de horas de disconfort termico anual sin encender sistemas de aire acondicionado mecanico.

Formato de salida: Dictamen de diseno bioclimatico en Markdown con formulas geometricas de sombreamiento y diagramas explicativos.`,
        tags: ["bioclimática", "sombreamiento", "ventilación-cruzada", "inercia-térmica", "confort"]
      },
      {
        id: "ing-014",
        title: "Verificación de Condensaciones Superficiales e Intersticiales con Método Glaser",
        desc: "Aplica el método de Glaser (UNE-EN ISO 13788) para predecir formación de moho y condensaciones dentro del muro.",
        model: "DeepSeek V4",
        prompt: `Eres un Patologo de la Construccion y Fisico de Cerramientos especializado en higrotermica.
[COPIA AQUI TU IDEA]

Realiza la comprobacion higrotermica del cerramiento exterior mediante el Metodo de Glaser:
1. Perfil de presiones de vapor de agua: calculo de la Presion de Saturacion P_sat(T) y Presion de Vapor Real P_v en cada interfaz de capas constructivas.
2. Evaluacion de Condensaciones Intersticiales: comprobar si la presion real de vapor supera la de saturacion en algun punto interior del cerramiento durante los 12 meses del ano.
3. Calculo de la cantidad de agua condensada acumulada (g/m2) y verificacion de la condicion de evaporacion completa en el periodo estival.
4. Evaluacion del riesgo de Condensaciones Superficiales y formacion de moho: calculo del factor de temperatura superficial f_Rsi y contraste con el valor limite f_Rsi,max.
5. Diseno de la barrera de vapor (posicion adecuada en la cara caliente del aislamiento) si se detecta condensacion no tolerable.

Restricciones:
- Cumple rigurosamente la norma UNE-EN ISO 13788 y el documento de apoyo DA DB-HE / 2 del CTE.

Formato de salida: Codigo en Python que calcule las presiones mes a mes, verifique Glaser y devuelva la grafica de condensaciones.`,
        tags: ["glaser", "condensaciones", "higrotérmica", "moho", "cte-db-he"]
      },
      {
        id: "ing-015",
        title: "Generación del Informe de Certificación Energética Oficial (Etiqueta A/B)",
        desc: "Compila el informe técnico con la calificación energética en emisiones de CO2 y consumo energético para registro oficial.",
        model: "GPT-4o",
        prompt: `Eres un Tecnico Certificador Energetico Acreditado para la emision de Certificados de Eficiencia Energetica (CEE).
[COPIA AQUI TU IDEA]

Genera el Informe Oficial de Certificacion de Eficiencia Energetica del Edificio:
1. Datos identificativos del inmueble: referencia catastral, direccion, zona climatica, normativa de construccion aplicable y superficie util habitable.
2. Calificacion de Eficiencia Energetica obtenida: escala oficial de letras de la A a la G para:
   - Emisiones de dioxido de carbono (kg CO2 / m2*ano).
   - Consumo de energia primaria no renovable (kWh / m2*ano).
3. Desglose de demandas y consumos por servicios: Calefaccion, Refrigeracion, Agua Caliente Sanitaria (ACS), Ventilacion e Iluminacion.
4. Descripcion tecnica de las instalaciones termicas modeladas (bomba de calor aerotermica con COP/SCOP, recuperador de calor de alta eficiencia, solar fotovoltaica).
5. Pliego de medidas recomendadas de mejora con estimacion del periodo de amortizacion economica de la inversion.

Restricciones:
- Sigue escrupulosamente el formato oficial normalizado establecido por el Ministerio para la Transicion Ecologica y el Reto Demografico.

Formato de salida: Documento de Certificado Energetico completo en Markdown con tablas oficiales y propuesta de etiqueta energetica.`,
        tags: ["certificación-energética", "cee", "etiqueta-energética", "emisiones-co2", "miteco"]
      },
      {
        id: "ing-042",
        title: "Simulación Térmica Dinámica Horaria de Edificios con Motor EnergyPlus / OpenStudio",
        desc: "Modela la demanda de calefacción y refrigeración en pasos de 15 minutos integrando archivos climáticos EPW.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Energético de la Edificación y Modelador Térmico en EnergyPlus.
[COPIA AQUI TU IDEA]

Desarrolla el generador y procesador de modelos termicos horarios en EnergyPlus para calificacion energetica avanzada:
1. Generacion automatizada del archivo IDF de entrada a partir de la geometria de zonas termicas, composicion estratificada de cerramientos y condiciones de contorno.
2. Ingesta de archivos climaticos normalizados EPW de la zona geografica de emplazamiento.
3. Definicion de perfiles de uso horarios (Schedules): ocupacion de personas, densidad de potencia de iluminacion, equipos ofimaticos e infiltraciones de aire exterior.
4. Calculo dinamico balance termico zona a zona: temperaturas operativas horarias, demanda neta de calefaccion y refrigeracion, y horas de disconfort termico (modelo Fanger PMV/PPD segun ISO 7730).
5. Extraccion y analisis de resultados horarios en DuckDB para optimizar espesores de aislamiento y estrategias de ventilacion nocturna pasiva (Free Cooling).

Restricciones:
- Valida que la solucion convectiva-radiativa converja sin errores fatales en el archivo de log 'eplusout.err'.

Formato de salida: Script de Python utilizando 'eppy' y 'openstudio' con pipeline de ejecucion batch y visualizacion de demandas mensuales.`,
        tags: ["energyplus", "simulación-térmica", "epw", "eficiencia-energética", "climatización", "fanger"]
      },
      {
        id: "ing-043",
        title: "Auditoría de Puentes Térmicos 2D/3D y Riesgo de Condensaciones Intersticiales según ISO 10211",
        desc: "Modela por elementos finitos la transmitancia térmica lineal (Psi) y el factor de temperatura superficial (fRsi).",
        model: "DeepSeek V4",
        prompt: `Eres un Físico de Cerramientos y Auditor de Patologías Térmicas en la Envolvente Edificatoria.
[COPIA AQUI TU IDEA]

Implementa el calculador numerico bidimensional de puentes termicos conforme a la norma ISO 10211 e ISO 13788:
1. Discretizacion de nudos constructivos singulares (encuentro fachada-forjado, esquinas salientes/entrantes, contorno de huecos de ventana, cajas de persiana).
2. Resolucion de la ecuacion de conduccion estacionaria bidimensional: div(lambda * grad(T)) = 0 mediante diferencias finitas o elementos finitos.
3. Calculo de la transmitancia termica lineal Psi (W/m·K) restando las perdidas unidimensionales de los paramentos adyacentes del flujo termico total.
4. Determinacion del factor de temperatura de la superficie interior f_Rsi: comprobacion de que f_Rsi supere el limite critico (f_Rsi >= 0.80) para evitar condensaciones superficiales y proliferacion de moho segun CTE DB-HE.
5. Evaluacion del gradiente de presion de vapor y riesgo de condensaciones intersticiales mediante el metodo grafico de Glaser.

Restricciones:
- Utiliza las resistencias termicas superficiales normalizadas interior (R_si) y exterior (R_se) segun la direccion del flujo de calor.

Formato de salida: Modulo de Python 'thermal_bridge_solver.py' con mapas isotermicos en Matplotlib y valor certificado de Psi y fRsi.`,
        tags: ["puentes-térmicos", "iso-10211", "iso-13788", "glaser", "condensaciones", "cte-db-he"]
      },
      {
        id: "ing-044",
        title: "Diseño de Sistemas de Geotermia de Muy Baja Entalpía y Campos de Captación BHE",
        desc: "Dimensiona sondeos geotérmicos verticales (Borehole Heat Exchangers) utilizando g-functions de Eskilson y cargas horarias.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero Termomecánico Especialista en Energías Renovables y Climatización Geotérmica.
[COPIA AQUI TU IDEA]

Crea el algoritmo de dimensionamiento para un campo de sondeos geotermicos verticales (Borehole Heat Exchangers / BHE) con bomba de calor:
1. Ingesta de las caracteristicas termofisicas del terreno obtenidas en el Test de Respuesta Termica (TRT): conductividad termica lambda_s, capacidad calorifica volumetrica y temperatura no perturbada del suelo.
2. Ingesta de las demandas termicas mensuales y horarias del edificio (calefaccion, refrigeracion y agua caliente sanitaria ACS).
3. Evaluacion del balance termico anual del terreno: calculo del desequilibrio neto para prevenir el enfriamiento o calentamiento progresivo del subsuelo a 25 anos vista.
4. Modelado termico transitorio mediante funciones g analiticas (g-functions de Eskilson): calculo de la longitud total requerida de sondeos y separacion minima entre pozos (minimo 6 metros).
5. Estimacion del COP medio estacional de la bomba de calor geotermica (SCOP) y ahorro de emisiones de CO2 frente a sistemas de combustion tradicionales.

Restricciones:
- Considera la resistencia termica interior del sondeo (R_b) dependiente del tipo de lechada de inyeccion (bentonita termica) y geometria de la sonda en U.

Formato de salida: Script de Python utilizando la libreria 'pygfunction' con curvas de evolucion de temperatura del suelo y memoria tecnica.`,
        tags: ["geotermia", "bhe", "eskilson", "bomba-de-calor", "energías-renovables", "pygfunction"]
      }
    ]
  },
  {
    id: "planificacion-obras",
    name: "Monitor de Planificación de Obras / Atlas (I1.3)",
    prompts: [
      {
        id: "ing-016",
        title: "Generación de Diagrama de Gantt y Método de Camino Crítico (CPM)",
        desc: "Calcula fechas tempranas, tardías, holguras totales y actividades críticas para optimizar plazos de obra.",
        model: "DeepSeek V4",
        prompt: `Eres un Director de Produccion de Obra y Planificador Senior experto en Metodo de Camino Critico (CPM).
[COPIA AQUI TU IDEA]

Estructura y calcula la planificacion temporal detallada para el proyecto de construccion:
1. Descomposicion de tareas en Estructura de Desglose del Trabajo (EDT / WBS): demoliciones, cimentacion, estructura, cerramientos, instalaciones, acabados.
2. Matriz de dependencias y precedencias entre actividades (Fin-Inicio, Inicio-Inicio con solape, Fin-Fin).
3. Algoritmo CPM: calculo de Fechas Tempranas de Inicio/Fin (Early Start / Early Finish) mediante pase hacia adelante (Forward Pass).
4. Calculo de Fechas Tardias de Inicio/Fin (Late Start / Late Finish) mediante pase hacia atras (Backward Pass).
5. Calculo de Holguras Totales y Holguras Libres: identificacion de las actividades criticas (Holgura = 0) que conforman el Camino Critico del proyecto.

Restricciones:
- Si se acorta una actividad critica, recalcula automaticamente si el camino critico se desplaza a una rama secundaria.

Formato de salida: Tabla de planificacion temporal con campos CPM y definicion del Diagrama de Gantt en sintaxis Mermaid.`,
        tags: ["gantt", "cpm", "camino-crítico", "planificación-obra", "wbs"]
      },
      {
        id: "ing-017",
        title: "Gestión de Costes y Valor Ganado (Earned Value Management - EVM)",
        desc: "Calcula métricas clave como CPI, SPI, CV, SV y EAC para monitorizar desviaciones económicas y temporales de obra.",
        model: "DeepSeek V4",
        prompt: `Eres un Controller de Costes de Construccion certificado PMP aplicando la metodologia Earned Value Management (EVM).
[COPIA AQUI TU IDEA]

Calcula y analiza el estado economico y avance temporal de la obra en la fecha de corte:
1. Variables fundamentales de entrada:
   - Valor Planificado (PV - Planned Value): coste presupuestado del trabajo programado a la fecha actual.
   - Coste Real (AC - Actual Cost): gasto economico realmente devengado y facturado a la fecha.
   - Valor Ganado (EV - Earned Value): valor presupuestado del trabajo realmente ejecutado y certificado en obra.
2. Calculo de Varianzas: Varianza de Coste (CV = EV - AC) y Varianza de Cronograma (SV = EV - PV).
3. Indices de Desempeno: Indice de Rendimiento del Coste (CPI = EV / AC) e Indice de Rendimiento del Cronograma (SPI = EV / PV).
4. Proyecciones a final de obra: Estimacion a la Conclusion (EAC = BAC / CPI) y Variacion a la Conclusion (VAC).
5. Diagnostico ejecutivo de desviacion y plan de choque para reencauzar el proyecto dentro del presupuesto adjudicado.

Restricciones:
- Define con claridad si el proyecto se encuentra por encima/debajo de presupuesto y adelantado/retrasado segun los umbrales de CPI y SPI.

Formato de salida: Cuadro de mando EVM en Markdown con indicadores semaforizados y formulas de proyeccion financiera.`,
        tags: ["evm", "valor-ganado", "cpi", "spi", "control-costes", "pmp"]
      },
      {
        id: "ing-018",
        title: "Detección Precoz de Cuellos de Botella e Interferencias Temporales en Obra",
        desc: "Identifica saturación de tajos, solapes incompatibles de gremios y retrasos en suministros críticos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Jefe de Obra Principal especializado en logistica y coordinacion de oficios en tajos de construccion.
[COPIA AQUI TU IDEA]

Analiza la planificacion y el ritmo real de avance identificando cuellos de botella e interferencias operativas:
1. Deteccion de interferencias espaciales: ejecucion simultanea incompatible en la misma planta (ej: albanileria de tabiqueria ejecutandose en el mismo sector donde se hormigona el forjado superior).
2. Sobresaturacion de capacidad de medios auxiliares: demanda simultanea de la grua torre o montacargas por encima de su capacidad de ciclos por hora.
3. Suministros criticos de largo plazo de entrega (Long Lead Items): seguimiento de carpinterias exteriores a medida, climatizadoras y cuadros electricos principales.
4. Desequilibrio de rendimiento entre cuadrillas sucesivas (efecto acordeon): instalaciones tubulares avanzando mas rapido que el cerramiento de trasdosados.
5. Plan de mitigacion logistica: escalado de turnos, redistribucion de acopios y reprogramacion de tajos no criticos.

Restricciones:
- Prioriza las acciones preventivas que eviten paradas completas de cuadrillas de subcontratistas.

Formato de salida: Matriz de interferencias y cuellos de botella en Markdown con evaluacion de impacto en dias y plan de accion directo.`,
        tags: ["cuellos-botella", "jefe-obra", "interferencias", "tajos", "coordinación"]
      },
      {
        id: "ing-019",
        title: "Matriz de Riesgos Operacionales y Planes de Contingencia de Ejecución",
        desc: "Identifica riesgos climatológicos, geotécnicos y de suministro asignando mitigaciones preventivas.",
        model: "GPT-4o",
        prompt: `Eres un Director de Riesgos de Proyectos de Construccion e Infraestructuras.
[COPIA AQUI TU IDEA]

Elabora la Matriz de Gestion de Riesgos Operacionales para la fase de ejecucion de obra:
1. Identificacion de amenazas potenciales: imprevistos geotecnicos en excavacion (aparicion de nivel freatico o roca no prevista), inclemencias climatologicas severas (viento para gruas, heladas para hormigon), quiebra de subcontratista clave y huelgas de transporte.
2. Evaluacion cualitativa y cuantitativa: calculo del Nivel de Riesgo = Probabilidad (1-5) * Impacto en coste/plazo (1-5).
3. Estrategia de respuesta por riesgo: Mitigar, Transferir (seguro Todo Riesgo Construccion TRC, avales), Evitar o Aceptar activamente.
4. Planes de Contingencia inmediatos: protocolos de actuacion pormenorizados si el evento de riesgo se materializa.
5. Estimacion de la Reserva de Contingencia economica (en porcentaje sobre el presupuesto material) y colchon de dias en cronograma.

Restricciones:
- Ajusta el analisis al estandar internacional PMI / ISO 31000 de gestion del riesgo.

Formato de salida: Matriz de riesgos en tabla estructurada en Markdown con mapa de calor y fichas de contingencia individuales.`,
        tags: ["riesgos-obra", "contingencias", "iso-31000", "pmi", "seguridad"]
      },
      {
        id: "ing-045",
        title: "Nivelación de Recursos y Ruta Crítica (CPM / PERT) con Gestión de Cadena Crítica (CCPM)",
        desc: "Optimiza calendarios de proyectos constructivos calculando holguras, ruta crítica y amortiguadores de proyecto (Buffers).",
        model: "DeepSeek V4",
        prompt: `Eres un Director de Planificación y Control de Proyectos de Infraestructura (PMP / CCPM Specialist).
[COPIA AQUI TU IDEA]

Implementa el motor de programacion temporal de obra integrando el Metodo de la Ruta Critica (CPM) y la Cadena Critica de Goldratt:
1. Ingesta de la Estructura de Desglose del Trabajo (EDT / WBS) con tareas, duraciones estimadas y relaciones de precedencia (Fin-Inicio, Inicio-Inicio, retrasos).
2. Algoritmo de pase hacia adelante y hacia atras para calcular Tiempos Tempranos (ES, EF), Tiempos Tardios (LS, LF) y Holguras Totales y Libres.
3. Identificacion exacta de la Ruta Critica (actividades con Holgura Total = 0).
4. Nivelacion de recursos limitados (mano de obra especializada, gruas torre, hormigoneras): resolucion de sobreasignaciones retrasando tareas no criticas dentro de su holgura.
5. Insercion y gestion de amortiguadores de cadena critica: Project Buffer (PB) al final de la ruta y Feeding Buffers (FB) en convergencias de cadenas no criticas.

Restricciones:
- Incorpora calendarios laborales reales excluyendo festivos locales, paradas por veda meteorologica o descansos de convenio.

Formato de salida: Modulo de Python 'construction_cpm_scheduler.py' con diagrama de red en Mermaid y tabla de holguras en Markdown.`,
        tags: ["cpm", "pert", "cadena-crítica", "planificación", "nivelación-recursos", "wbs"]
      },
      {
        id: "ing-046",
        title: "Modelado BIM 4D de Secuencia Constructiva y Detección de Colisiones Espacio-Temporales",
        desc: "Vincula elementos IFC 3D con cronogramas de obra para detectar interferencias de maquinaria y fases de hormigonado.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Coordinador BIM Especialista en Simulación 4D y Constructibilidad de Obras.
[COPIA AQUI TU IDEA]

Disena el pipeline de integracion BIM 4D para vincular modelos IFC con cronogramas de ejecucion de obra:
1. Mapeo semantico de GUIDs de elementos IFC (muros, pilares, losas, instalaciones) hacia identificadores de actividad de la planificacion temporal.
2. Deteccion de colisiones espacio-temporales (Time-Space Clashes): identificar solapes donde dos subcontratistas distintos deben operar simultaneamente en el mismo espacio fisico confinado.
3. Simulacion de interferencias de radios de accion de maquinaria pesada: gruas torre concurrentes, bombas de hormigon y camiones de desmonte.
4. Generacion de la secuencia visual de construccion por estados de elemento: En construccion, Fraguando, Instalado, Verificado.
5. Exportacion de reportes de constructibilidad con incidencias BCF (BIM Collaboration Format) para reunion de coordinacion de obra.

Restricciones:
- Asegura que la secuencia respete los tiempos minimos preceptivos de desencofrado y curado del hormigon segun el Codigo Estructural.

Formato de salida: Script de Python utilizando 'ifcopenshell' con exportacion de fichero BCF-XML con las colisiones detectadas.`,
        tags: ["bim-4d", "ifc", "bcf", "constructibilidad", "planificación", "coordinación-bim"]
      },
      {
        id: "ing-047",
        title: "Control de Avance de Obra mediante Análisis del Valor Ganado (EVM) y Previsión EAC",
        desc: "Calcula métricas SPI, CPI y coste final estimado a la conclusión (EAC) a partir de certificaciones de obra reales.",
        model: "GPT-4o",
        prompt: `Eres un Controller de Costes de Obra (Quantity Surveyor) y Project Manager de Construcción.
[COPIA AQUI TU IDEA]

Construye el cuadro de mando de Gestion del Valor Ganado (Earned Value Management / EVM) conforme a la norma ISO 21508:
1. Ingesta mensual de parametros cardinales:
   - Valor Planificado (PV / BCWS): presupuesto previsto de obra hasta la fecha de corte.
   - Valor Ganado (EV / BCWP): valor presupuestado del trabajo realmente ejecutado y certificado en obra.
   - Coste Real (AC / ACWP): gasto directo e indirecto efectivamente incurrido en la obra.
2. Calculo de variaciones e indices de rendimiento:
   - Variacion de Coste (CV = EV - AC) e Indice de Rendimiento de Coste (CPI = EV / AC).
   - Variacion de Cronograma (SV = EV - PV) e Indice de Rendimiento de Cronograma (SPI = EV / PV).
3. Estimacion a la Conclusion (EAC): proyeccion del coste final de la obra asumiendo rendimiento historico (EAC = BAC / CPI) o considerando rendimiento combinado coste-plazo.
4. Estimacion para Concluir (ETC) e Indice de Rendimiento del Trabajo Restante (TCPI).
5. Diagnostico predictivo: alertas tempranas cuando el CPI caiga por debajo de 0.92 o el retraso acumulado exceda el buffer critico.

Restricciones:
- Desagrega las mediciones por capitulos presupuestarios (Movimiento de tierras, Estructuras, Fachadas, Instalaciones) para identificar focos de desvio.

Formato de salida: Modulo de Python 'earned_value_analysis.py' con curvas S en Plotly y reporte ejecutivo para la direccion facultativa.`,
        tags: ["evm", "valor-ganado", "cpi", "spi", "eac", "control-de-costes", "certificaciones"]
      }
    ]
  },
  {
    id: "prd-uml-c4",
    name: "Transformador PRD a UML/C4 / R2A Engine (I1.4)",
    prompts: [
      {
        id: "ing-020",
        title: "Transformación de Requisitos PRD a Diagramas de Arquitectura Modelo C4",
        desc: "Convierte especificaciones de producto en diagramas C4 de Contexto, Contenedores y Componentes.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software Principal experto en modelado arquitectonico segun el Modelo C4 de Simon Brown.
[COPIA AQUI TU IDEA]

A partir del Documento de Requisitos de Producto (PRD) adjunto, genera la arquitectura C4 completa:
1. Nivel 1 - Diagrama de Contexto del Sistema: el sistema en el centro, los usuarios/actores que interactuan con el y los sistemas externos integrados (APIs bancarias, servidores FHIR, ERPs).
2. Nivel 2 - Diagrama de Contenedores: aplicaciones web frontend, backends analiticos, bases de datos (DuckDB, PostgreSQL), colas de mensajeria y almacenes de archivos.
3. Nivel 3 - Diagrama de Componentes: descomposicion interna de los servicios clave en controladores, servicios de dominio, adaptadores de persistencia y procesadores asincronos.
4. Especificacion clara de protocolos de comunicacion entre contenedores (REST/JSON, gRPC, WebSockets, SQL directo).
5. Justificacion de la arquitectura seleccionada frente a requisitos no funcionales (escalabilidad, latencia, disponibilidad).

Restricciones:
- Utiliza la sintaxis estandar C4-PlantUML o Mermaid C4 para que los diagramas sean versionables y renderizables en repositorios Git.

Formato de salida: Codigo completo de los diagramas en Mermaid C4 acompanado de descripcion tecnica de cada bloque.`,
        tags: ["modelo-c4", "arquitectura-software", "prd", "contenedores", "plantuml"]
      },
      {
        id: "ing-021",
        title: "Generación Automática de Diagramas de Secuencia y Actividad UML en PlantUML/Mermaid",
        desc: "Modela flujos transaccionales complejos, llamadas asíncronas y gestión de excepciones en diagramas UML.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Software Especialista en Diseno Orientado a Objetos y Modelado UML formal.
[COPIA AQUI TU IDEA]

Disena los diagramas de comportamiento UML para el caso de uso mas critico del sistema:
1. Diagrama de Secuencia:
   - Lineas de vida de participantes: Usuario -> Frontend Client -> API Gateway -> Domain Service -> Database / External API.
   - Mensajeria sincrona (flechas solidas) y respuestas (flechas discontinuas).
   - Operaciones asincronas, tareas en segundo plano y Webhooks.
   - Bloques alternativos ('alt' para caminos exitosos vs 'else' para gestion de errores) y bucles ('loop').
2. Diagrama de Actividad:
   - Flujo de trabajo con nodos iniciales, bifurcaciones de decision romboidales y ramas de ejecucion paralela ('fork' / 'join').
3. Identificacion de posibles condiciones de carrera (Race Conditions) o timeouts en las llamadas de red.

Restricciones:
- No omitas nunca los caminos de fallo (red no disponible, validacion erronea, token caducado).

Formato de salida: Codigo fuente completo en formato Mermaid ('sequenceDiagram') listo para copiar y visualizar en cualquier editor Markdown.`,
        tags: ["uml", "diagrama-secuencia", "mermaid", "flujos", "casos-de-uso"]
      },
      {
        id: "ing-022",
        title: "Generación de Contratos y Especificación OpenAPI 3.1 a partir de Requisitos",
        desc: "Escribe la especificación REST OpenAPI (Swagger) formal con endpoints, esquemas JSON y códigos de estado.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de APIs especializado en diseno API-First y estandares OpenAPI 3.1.
[COPIA AQUI TU IDEA]

Genera la especificacion tecnica formal de la API REST a partir de las necesidades funcionales:
1. Informacion general: version de API, servidores de entorno (desarrollo, staging, produccion) y esquemas de autenticacion (Bearer JWT / OAuth2).
2. Definicion de rutas (Paths): endpoints para operaciones CRUD completas y operaciones RPC especializadas.
3. Parametros tipados de consulta (query), cabecera (header) y ruta (path) con validaciones de longitud y formato regex.
4. Cuerpos de peticion (Request Bodies) y esquemas de datos reutilizables en la seccion 'components/schemas'.
5. Respuestas HTTP exhaustivas para cada endpoint: codigos 200 OK / 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found y 500 Internal Error, con esquemas de error estandarizados segun RFC 7807 (Problem Details).

Restricciones:
- El documento debe ser un archivo YAML valido segun la especificacion OpenAPI 3.1.0 sin errores de indentacion.

Formato de salida: Archivo 'openapi.yaml' completo listo para importar en Swagger UI o Postman.`,
        tags: ["openapi", "swagger", "api-rest", "contratos", "api-first"]
      },
      {
        id: "ing-023",
        title: "Trazabilidad Bidireccional entre Historias de Usuario y Componentes de Software",
        desc: "Construye la matriz de trazabilidad garantizando cobertura total entre requisitos de negocio y código.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero de Calidad de Software (QA Lead) y Gestor de Requisitos.
[COPIA AQUI TU IDEA]

Construye la Matriz de Trazabilidad de Requisitos (RTM - Requirements Traceability Matrix) para el proyecto:
1. Identificador unico de Historia de Usuario / Requisito Funcional (ej: US-01, RF-03).
2. Criterios de Aceptacion en formato Gherkin (Dado... Cuando... Entonces...).
3. Mapeo al componente de software responsable de la implementacion (microservicio, modulo, clase).
4. Mapeo al endpoint de API asociado y tabla de base de datos afectada.
5. Suite de pruebas automatizadas (Tests unitarios, integracion, e2e) que verifican el cumplimiento del requisito.
6. Deteccion de funciones huerfanas (codigo desarrollado sin requisito justificado) o requisitos no cubiertos por pruebas.

Restricciones:
- Formato estructurado riguroso apto para auditorias de certificacion de calidad de software (ISO 25010 / CMMI).

Formato de salida: Matriz de trazabilidad en tabla Markdown con evaluacion del porcentaje de cobertura funcional alcanzado.`,
        tags: ["trazabilidad", "rtm", "gherkin", "qa", "historias-usuario"]
      },
      {
        id: "ing-048",
        title: "Especificación Formal de Arquitectura C4 para Gemelos Digitales de Infraestructura (Digital Twins)",
        desc: "Define el modelo de arquitectura C4 (Contexto, Contenedores, Componentes, Código) para sistemas SCADA y Gemelos IoT.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software Industrial y Gemelos Digitales para Infraestructuras Críticas.
[COPIA AQUI TU IDEA]

Disena la arquitectura de software completa para un Gemelo Digital de infraestructuras utilizando el modelo C4:
1. Nivel 1 - Diagrama de Contexto del Sistema: actores humanos (operadores de planta, ingenieros de mantenimiento), fuentes de datos fisicas (sensores IoT, PLCs via MQTT/OPC-UA) y sistemas externos (ERP, GIS corporativo, AEMET).
2. Nivel 2 - Diagrama de Contenedores: capa de ingesta de telemetria en tiempo real (Kafka / EMQX), base de datos de series temporales (TimescaleDB / InfluxDB), motor analitico de simulacion y frontend 3D WebGL (Three.js / Cesium).
3. Nivel 3 - Diagrama de Componentes del contenedor analitico: modulo de deteccion de anomalias, modulo de calculo de vida util remanente (RUL) y despachador de alertas predictivas.
4. Nivel 4 - Especificacion de interfaces de Codigo y APIs REST / WebSocket para bidireccionalidad.
5. Requisitos no funcionales de ciberseguridad industrial segun IEC 62443 (zonas y conductos, autenticacion mTLS).

Restricciones:
- Utiliza la notacion formal PlantUML / Structurizr C4 para que los diagramas sean autogenerables por codigo.

Formato de salida: Documento de arquitectura en Markdown con diagramas C4 en bloques de codigo PlantUML y tabla de integraciones.`,
        tags: ["modelo-c4", "gemelo-digital", "iot", "scada", "plantuml", "arquitectura-software"]
      },
      {
        id: "ing-049",
        title: "Modelado SysML v2 de Requisitos y Trazabilidad para Sistemas Ferroviarios Críticos",
        desc: "Estructura la ingeniería de sistemas basada en modelos (MBSE) conforme a las normas de seguridad CENELEC EN 50128.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Sistemas Críticos y Modelador MBSE en el Sector Ferroviario y Aeroespacial.
[COPIA AQUI TU IDEA]

Desarrolla el modelo formal de requisitos y arquitectura funcional en lenguaje SysML version 2 para un subsistema ferroviario critico (SIL 4):
1. Estructura de requisitos formales jerarquicos: Requisitos de usuario, Requisitos de seguridad funcional (CENELEC EN 50126/50128/50129) y Requisitos tecnicos derivados.
2. Definicion del diagrama de definicion de bloques (BDD / Definition) y diagrama de bloques internos (IBD / Usage) con puertos de flujo tipados (Flow Ports).
3. Diagrama de maquina de estados finitos (State Machine) modelando estados nominales, estados degradados y transicion segura a estado a prueba de fallos (Fail-Safe State).
4. Matriz de trazabilidad automatizada: verificacion de que cada requisito de seguridad este asignado a al menos un componente fisico y validado por un caso de prueba especifico.
5. Asignacion estricta de niveles de integridad de la seguridad (Safety Integrity Level / SIL) por subsistema.

Restricciones:
- No utilices lenguaje natural ambiguo; formaliza las restricciones de estado mediante especificaciones de invariantes matematicos.

Formato de salida: Archivo de texto formal en sintaxis textual SysML v2 (.sysml) con documentacion explicativa de trazabilidad.`,
        tags: ["sysml-v2", "mbse", "ferroviario", "cenelec", "sil-4", "fail-safe", "ingeniería-de-sistemas"]
      }
    ]
  },
  {
    id: "optimizacion-mdo",
    name: "Motor de Optimización MDO Multidisciplinar (I1.5)",
    prompts: [
      {
        id: "ing-024",
        title: "Formulación Multidisciplinar MDO: Optimización Estructural, Térmica y de Coste",
        desc: "Modela la optimización simultánea de peso estructural, transmitancia energética y presupuesto de construcción.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador en Optimizacion de Diseno Multidisciplinar (MDO - Multidisciplinary Design Optimization).
[COPIA AQUI TU IDEA]

Formula el problema de optimizacion global acoplando las tres disciplinas de ingenieria del proyecto:
1. Disciplina Estructural: minimizar el peso total de perfiles de acero o volumen de hormigon sujeto a limitaciones de tension Von Mises < f_yd y flecha < L/500.
2. Disciplina Termica: minimizar la transmitancia U global de la envolvente y la demanda energetica anual del edificio.
3. Disciplina Economica: minimizar el Presupuesto de Ejecucion Material (PEM) sumando costes de materiales, transporte y mano de obra.
4. Variables de diseno compartidas (Coupling Variables): espesores de forjados, secciones de pilares y distribucion de huecos de fachada que impactan simultaneamente en estructura y aislamiento.
5. Arquitectura de optimizacion MDO: seleccion entre arquitectura mononivel (MDF - Multidisciplinary Feasible) o multinivel (ATC - Analytical Target Cascading).

Restricciones:
- Define con precision matematica el vector de variables de diseno x, los parametros acoplados y el sistema de restricciones no lineales g(x) <= 0.

Formato de salida: Formulacion matematica formal en LaTeX y diagrama de acoplamiento de disciplinas en formato XDSM (eXtended Design Structure Matrix).`,
        tags: ["mdo", "optimización-multidisciplinar", "estructuras", "térmica", "costes"]
      },
      {
        id: "ing-025",
        title: "Análisis de Sensibilidad Paramétrica y Frentes de Pareto Multidisciplinares",
        desc: "Calcula derivadas de sensibilidad y frentes de compensación entre seguridad estructural y coste económico.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Matematico Aplicado a la Ingenieria Computacional y Analisis de Sensibilidad.
[COPIA AQUI TU IDEA]

Ejecuta el analisis de sensibilidad parametrica para entender la influencia de cada variable de diseno en el rendimiento global:
1. Calculo de Sensibilidades de Primer Orden (Gradientes dF/dx_i) analiticas mediante el metodo del Estado Adjunto (Adjoint Method) para optimizar tiempo de calculo.
2. Identificacion de las variables dominantes: que parametros geometricos generan el mayor impacto en la reduccion de costes frente al incremento de rigidez.
3. Generacion del Frente de Pareto bidimensional y tridimensional entre Masa Estructural vs Demanda Energetica vs Coste de Fabricacion.
4. Evaluacion de la robustez del optimo: comprobar que pequenas variaciones o tolerancias de ejecucion (+-5 mm en obra) no disparan las tensiones a valores inadmisibles.
5. Seleccion de la solucion optima de compromiso recomendada para el proyecto constructivo.

Restricciones:
- Muestra graficamente las correlaciones cruzadas mediante diagramas de dispersion y coordenadas paralelas.

Formato de salida: Script de Python utilizando Scipy y Plotly con generacion de la nube de puntos del Frente de Pareto y tabla de sensibilidades.`,
        tags: ["sensibilidad", "estado-adjunto", "pareto", "mdo", "gradientes"]
      },
      {
        id: "ing-026",
        title: "Trade-offs de Ingeniería: Compensación de Huella de Carbono vs Inversión",
        desc: "Cuantifica el impacto ambiental del ciclo de vida (LCA / CO2 embebido) frente al coste financiero del edificio.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Analisis de Ciclo de Vida (LCA) y Sostenibilidad en Ingenieria de la Construccion.
[COPIA AQUI TU IDEA]

Modela el trade-off formal entre la huella de carbono embebida de los materiales y el presupuesto de ejecucion:
1. Cuantificacion del Carbono Embebido (Embodied Carbon - Etapas A1 a A5 segun norma EN 15978): kg de CO2 equivalente por unidad de material (hormigon tradicional vs hormigon con escorias, acero reciclado vs virgen, madera laminada CLT).
2. Comparativa de escenarios constructivos alternativos:
   - Escenario 1: Estructura convencional de hormigon armado (menor coste financiero inicial, maxima huella de carbono).
   - Escenario 2: Estructura mixta de madera contralaminada CLT y acero (mayor coste financiero inicial, drastica reduccion de CO2 embebido).
3. Calculo del coste de abatimiento de carbono: euros adicionales invertidos por cada tonelada de CO2 evitada en la fase de construccion.
4. Retorno de inversion ambiental a 50 anos: punto de cruce donde el mejor aislamiento termico compensa el carbono invertido en fabricar los aislantes.
5. Recomendacion tecnica final para certificaciones ambientales BREEAM / LEED / VERDE.

Restricciones:
- Utiliza datos contrastados de Declaraciones Ambientales de Producto (DAP / EPD) oficiales de fabricantes verificados.

Formato de salida: Informe de sostenibilidad y trade-off en Markdown con graficos comparativos de ciclo de vida y matriz de decision.`,
        tags: ["huella-carbono", "lca", "clt", "sostenibilidad", "leed", "breeam"]
      },
      {
        id: "ing-027",
        title: "Análisis de Robustez y Tolerancias Dimensionales ante Incertidumbre",
        desc: "Aplica diseño probabilístico y tolerancia a variaciones en propiedades de materiales y tolerancias de montaje.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Mecanico de Precision y Analista de Confiabilidad Estructural.
[COPIA AQUI TU IDEA]

Analiza la robustez del diseno de ingenieria considerando la variabilidad estadistica de los parametros reales:
1. Caracterizacion probabilistica de la incertidumbre: distribucion normal de la resistencia del hormigon (f_ck caracteristico al 5%), variabilidad lognormal de las cargas de viento y tolerancias geometricas de fabricacion (+-3 mm).
2. Metodo de Superficie de Respuesta (RSM) o Colocacion Estocastica para propagar la incertidumbre a traves del modelo FEM.
3. Calculo del Indice de Fiabilidad beta de Hasofer-Lind y probabilidad formal de fallo P_f = Phi(-beta).
4. Verificacion de que el diseno no es hipersensible (el optimo no debe estar al borde exacto de un precipicio de fallo catastrofico ante minimas desviaciones).
5. Asignacion de tolerancias dimensionales optimas a las piezas constructivas para minimizar costes de mecanizado y ajuste en taller.

Restricciones:
- Asegura que el indice de fiabilidad cumpla con los requisitos minimos del Eurocodigo 0 (beta >= 3.8 para un periodo de retorno de 50 anos).

Formato de salida: Script en Python con analisis Monte Carlo de propagacion de tolerancias e informe de robustez estructural.`,
        tags: ["tolerancias", "incertidumbre", "fiabilidad", "hasofer-lind", "monte-carlo"]
      },
      {
        id: "ing-050",
        title: "Optimización Multidisciplinar (MDO) de Estructuras Reticulares con Algoritmos Genéticos NSGA-II",
        desc: "Optimiza trusses espaciales buscando el frente de Pareto entre masa total y flecha máxima bajo cargas dinámicas.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Estructural Computacional Especialista en Optimización Heurística Multiobjetivo.
[COPIA AQUI TU IDEA]

Desarrolla el optimizador multidisplinar (MDO) de celosias y estructuras reticulares tridimensionales:
1. Formulacion de los dos objetivos contrapuestos de optimizacion:
   - Minimizar la masa total de acero de la estructura (Coste de material).
   - Minimizar el desplazamiento maximo o flecha en el centro de vano (Deformabilidad).
2. Variables de diseno: seccion transversal de cada grupo de barras elegida entre perfiles normalizados comerciales (Tubulares redondos o perfiles IPE/HEB).
3. Restricciones de comprobacion mecanica segun Eurocodigo 3:
   - Resistencia de las barras frente a traccion y compresion con pandeo segun curvas de esbeltez normativas.
   - Flecha maxima admisible limitada a L/500 bajo combinacion caracteristica de acciones.
4. Implementacion del algoritmo genetico de clasificacion no dominada NSGA-II: operadores de cruce SBX, mutacion polinomica y distancia de hacinamiento (Crowding Distance).
5. Visualizacion y seleccion en el Frente de Pareto resultante: evaluacion de la solucion de compromiso (Knee Point) mediante el metodo TOPSIS.

Restricciones:
- Vectoriza la matriz de rigidez global del truss para resolver cada evaluacion estructural en menos de 10 milisegundos.

Formato de salida: Script de Python utilizando 'pymoo' y NumPy con graficos interactivos del Frente de Pareto y diseno optimo en 3D.`,
        tags: ["mdo", "nsga-ii", "frente-pareto", "eurocódigo-3", "trusses", "optimización-estructural"]
      },
      {
        id: "ing-051",
        title: "Análisis Aeroelástico y Ensayo Virtual de Túnel de Viento para Rascacielos Singulares",
        desc: "Modela el desprendimiento de vórtices (Vortex Shedding) y la aceleración en plantas superiores para confort humano según ISO 10137.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Especialista en Aerodinámica de Estructuras y Dinámica de Viento en Edificios Altos.
[COPIA AQUI TU IDEA]

Implementa el modulo de analisis aeroelastico y respuesta dinamica frente al viento para edificios singulares de gran altura:
1. Perfil atmosferico de viento segun la rugosidad del terreno (Ley potencial o logaritmica del viento segun el CTE DB-SE-AE).
2. Calculo de la fuerza estatica media en direccion longitudinal del viento y de la fuerza fluctuante por turbulencia atmosferica.
3. Calculo de la excitacion transversal por desprendimiento de vortices alternados de Von Karman: determinacion de la velocidad critica de resonancia v_crit = f_n * D / St (donde St es el numero de Strouhal).
4. Evaluacion de las aceleraciones pico en las plantas habitables superiores para un periodo de retorno de 1 y 10 anos.
5. Verificacion del confort humano frente a vibraciones segun la norma ISO 10137 (criterios de confort en edificios residenciales y de oficinas).
6. Diseno preliminar de un Amortiguador de Masa Sintonizada (Tuned Mass Damper / TMD) para reducir la respuesta oscilatoria en un 40%.

Restricciones:
- Si la velocidad critica de resonancia queda dentro del rango de velocidades esperadas de viento, formula recomendaciones de chaflanes o esquinas redondeadas.

Formato de salida: Modulo de Python 'tall_building_wind_dynamics.py' con graficos de aceleraciones espectrales y parametros de diseno del TMD.`,
        tags: ["viento", "rascacielos", "vortex-shedding", "tmd", "iso-10137", "aerodinámica"]
      }
    ]
  },
  {
    id: "adrs-tradeoffs",
    name: "Generador de ADRs y Trade-Offs (I1.6)",
    prompts: [
      {
        id: "ing-028",
        title: "Estructuración Formal de Architecture Decision Records (ADRs) según MADR",
        desc: "Documenta decisiones técnicas críticas utilizando la plantilla Markdown Architectural Decision Records.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Software Empresarial y Coordinador Tecnico de Ingenieria.
[COPIA AQUI TU IDEA]

Redacta el Architecture Decision Record (ADR) formal para la decision tecnica adoptada, siguiendo el estandar MADR v3.0:
1. Titulo del ADR: formato numerado 'ADR-00X: Titulo descriptivo de la decision'.
2. Estado: Propuesto / Aceptado / Superado / Rechazado.
3. Contexto del problema: descripcion del desafio tecnico, restricciones organizativas, controladores de arquitectura (Architectural Drivers) y requisitos en conflicto.
4. Decision tomada: declaracion categorica de la solucion elegida formulada en tiempo presente ('Decidimos usar X para Y').
5. Opciones consideradas: lista exhaustiva de alternativas tecnicas evaluadas con sus pros (+) y contras (-).
6. Consecuencias: impacto positivo en el sistema, compromisos negativos aceptados explicitamente y riesgos derivados que requeriran mitigacion futura.

Restricciones:
- Redaccion concisa, objetiva y fundamentada en hechos contrastables; no ocultes ninguna desventaja de la opcion elegida.

Formato de salida: Archivo Markdown individual listo para ser archivado en el directorio 'docs/adr/' del repositorio del proyecto.`,
        tags: ["adr", "madr", "decisiones-arquitectura", "documentación", "diseño-software"]
      },
      {
        id: "ing-029",
        title: "Evaluación Comparativa de Alternativas Técnicas y Trade-offs Arquitectónicos",
        desc: "Construye matrices de decisión ponderadas evaluando rendimiento, mantenibilidad, coste de licencia y madurez.",
        model: "DeepSeek V4",
        prompt: `Eres un Consultor Tecnologico Senior realizando analisis comparativos de seleccion de arquitectura.
[COPIA AQUI TU IDEA]

Realiza la evaluacion comparativa de las alternativas tecnicas disponibles para resolver la necesidad arquitectonica:
1. Identificacion de criterios de evaluacion ponderados (Peso 1 a 5): Rendimiento/Latencia, Facilidad de Mantenimiento, Madurez y Soporte Comunitario, Coste de Infraestructura/Licencia y Seguridad Normativa.
2. Puntuacion justificada de cada tecnologia candidata en una escala numerica de 1 a 10 para cada criterio.
3. Analisis de Trade-offs directos: que sacrificamos exactamente al elegir la opcion A frente a la B (ej: menor latencia a cambio de mayor complejidad operativa).
4. Calculo del Coste Total de Propiedad (TCO - Total Cost of Ownership) proyectado a 3 anos vista.
5. Recomendacion final categorica respaldada por la puntuacion ponderada resultante.

Restricciones:
- Cada puntuacion debe estar respaldada por un argumento tecnico verificable o benchmark empirico.

Formato de salida: Matriz de decision ponderada en Markdown con columnas [Criterio, Peso, Opcion A, Opcion B, Opcion C, Analisis Cualitativo].`,
        tags: ["trade-offs", "matriz-decisión", "comparativa", "tco", "evaluación-tecnológica"]
      },
      {
        id: "ing-030",
        title: "Justificación Racional de Decisiones Técnicas y Consecuencias a Largo Plazo",
        desc: "Defiende decisiones polémicas ante comités técnicos justificando por qué es la solución óptima para el negocio.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Chief Technology Officer (CTO) y Arquitecto Principal defendiendo una propuesta de diseno ante el Comite Tecnico.
[COPIA AQUI TU IDEA]

Elabora la defensa y justificacion tecnica rigurosa de la decision arquitectonica propuesta:
1. Planteamiento de la tesis: por que esta decision es la solucion optima para el modelo operativo del negocio a pesar de sus costes iniciales.
2. Desmontaje argumental de las alternativas aparentemente mas intuitivas o populares (explicar por que el 'hype' tecnologico actual no aplica a este caso).
3. Impacto a largo plazo en el equipo: curva de aprendizaje, facilidad de contratacion de perfiles especializados y reduccion de friccion en el mantenimiento.
4. Prevencion de dependencia de proveedor (Vendor Lock-in): como la decision adoptada permite una estrategia de salida si las condiciones cambian.
5. Plan de migracion y coexistencia con los sistemas heredados sin interrumpir la operacion actual.

Restricciones:
- Tono profesional, persuasivo, seguro y sustentado en evidencias tecnicas y de negocio.

Formato de salida: Documento de posicionamiento tecnico en Markdown estructurado en Argumentacion, Respuestas a Objeciones Habituales y Plan de Despliegue.`,
        tags: ["justificación-técnica", "comité-arquitectura", "cto", "estrategia", "vendor-lock-in"]
      },
      {
        id: "ing-031",
        title: "Auditoría de Deuda Técnica y Registro de ADRs Obsoletos o Superados",
        desc: "Revisa decisiones pasadas identificando cuándo deben ser reemplazadas por nuevas tecnologías o paradigmas.",
        model: "GPT-4o",
        prompt: `Eres un Auditor de Arquitectura de Software y Consultor de Refactorizacion de Sistemas Complejos.
[COPIA AQUI TU IDEA]

Audita el catalogo de decisiones arquitectonicas (ADRs) preexistentes e identifica la deuda tecnica acumulada:
1. Deteccion de asunciones caducadas: identificar decisiones tomadas bajo restricciones tecnicas o de volumen que ya no son ciertas en la actualidad.
2. Identificacion de ADRs obsoletos o contradichos por la practica real del equipo de ingenieria.
3. Cuantificacion de la Deuda Tecnica: impacto en velocidad de desarrollo (Lead Time), incidentes en produccion y costes de computacion innecesarios.
4. Redaccion del ADR de Reemplazo (Superseeded ADR): marcar el ADR antiguo como 'Superado por ADR-XXX' y redactar el nuevo registro justificando la evolucion.
5. Hoja de ruta de refactorizacion por fases para sanear la deuda tecnica sin paralizar la entrega de funcionalidades de negocio.

Restricciones:
- Prioriza las acciones de refactorizacion segun una matriz de Impacto vs Esfuerzo.

Formato de salida: Informe de auditoria de deuda tecnica en Markdown con listado de ADRs a actualizar y plan de refactorizacion.`,
        tags: ["deuda-técnica", "auditoría-código", "refactorización", "adr-superado", "evolución-software"]
      },
      {
        id: "ing-052",
        title: "ADR: Selección entre Hormigón Pretensado vs Estructura Metálica Mixta en Viaductos",
        desc: "Estructura el Architecture Decision Record evaluando huella de carbono, velocidad de montaje y costes de mantenimiento.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Caminos, Canales y Puertos Especialista en Tipologías de Puentes y Evaluación Multicriterio.
[COPIA AQUI TU IDEA]

Redacta el Architecture Decision Record (ADR) formal para la seleccion de la tipologia estructural de un viaducto de luces medias (40-60 m):
1. Contexto y planteamiento del problema: condicionantes geometricos de trazado, gálibos ferroviarios/hidraulicos y restricciones de ocupacion bajo el tablero.
2. Opciones tipologicas en competencia:
   - Opcion A: Tablero continuo de hormigon pretensado mediante dovelas prefabricadas o vigas artesa.
   - Opcion B: Estructura mixta acero-hormigon con vigas cajon metalicas y losa superior de hormigon armado conectada.
3. Analisis multidimensional cuantitativo de compensaciones (Trade-Offs):
   - Coste economico inicial de construccion (Capex) vs Coste de mantenimiento e inspeccion a 100 anos (Opex / LCC).
   - Velocidad y facilidad de montaje: afeccion al trafico inferior durante la construccion.
   - Huella de carbono embebida (Embodied Carbon en kg CO2eq / m2 de tablero segun Declaraciones Ambientales de Producto DAP).
   - Durabilidad frente a ambientes marinos o sales de deshielo.
4. Decision motivada final y consecuencias esperadas (riesgos aceptados y medidas mitigadoras).
5. Cuadro de mando de evaluacion con matriz AHP (Analytic Hierarchy Process).

Restricciones:
- No utilices valoraciones subjetivas desprovistas de justificacion cuantitativa; fundamenta cada puntuacion en datos empiricos.

Formato de salida: Documento formal ADR en Markdown con formato estandarizado (Contexto, Decision, Consecuencias, Matriz de Ponderacion).`,
        tags: ["adr", "viaductos", "puentes", "hormigón-pretensado", "estructura-mixta", "huella-carbono"]
      },
      {
        id: "ing-053",
        title: "Trade-off Energético: Bomba de Calor Aerotérmica vs Distrito Térmico Centralizado en Edificación",
        desc: "Compara soluciones de climatización centralizada comunitaria frente a redes urbanas District Heating & Cooling.",
        model: "GPT-4o",
        prompt: `Eres un Consultor de Planificación Energética Urbana e Infraestructuras de District Heating & Cooling.
[COPIA AQUI TU IDEA]

Elabora el informe tecnico de evaluacion de alternativas (Trade-Off Analysis) para la climatizacion de un desarrollo residencial multifamiliar:
1. Comparativa de alternativas tecnologicas:
   - Alternativa 1: Sistemas individuales o centralizados de Bomba de Calor Aerotermica de alta eficiencia con suelo radiante y fancoils.
   - Alternativa 2: Conexion a Red de Calor y Frio Urbana (District Energy Network de 4ª o 5ª generacion a baja temperatura).
2. Analisis termodinamico y de eficiencia global: consumo de energia primaria no renovable (Cep,nren) y emisiones de gases de efecto invernadero (factor de emision segun mix electrico vs mix de la red termica).
3. Evaluacion economica a 30 anos (Life Cycle Cost Analysis / LCCA): inversion inicial, termino fijo de potencia, coste del kWh util, sustitucion de equipos y costes de mantenimiento.
4. Confiabilidad y seguridad de suministro: resiliencia ante cortes electricos o picos de demanda estacional.
5. Impacto en el espacio util de la edificacion: eliminacion de salas de calderas en cubierta o sotano vs espacio requerido para subestaciones de intercambio de placas.

Restricciones:
- Aplica los factores oficiales de conversion de energia final a primaria del IDAE vigentes en Espana.

Formato de salida: Dictamen de decision tecnologica en Markdown con graficos de coste de ciclo de vida acumulado y recomendacion justificada.`,
        tags: ["district-heating", "aerotermia", "trade-off", "lcca", "idae", "eficiencia-energética"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Cálculo Estructural, Normativas CTE/Eurocódigo)",
    prompts: [
      {
        id: "ing-032",
        title: "Predimensionamiento Estructural Rápido de Vigas, Pilares y Cimentaciones",
        desc: "Aplica reglas heurísticas de predimensionado estructural (cantos L/10 a L/16) para encajar la geometría inicial.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Calculista de Estructuras realizando el prediseño estructural inicial de un edificio.
[COPIA AQUI TU IDEA]

Ejecuta el predimensionamiento rapido de los elementos estructurales principales a partir de las luces y cargas estimadas:
1. Estimacion de cargas superficiales: peso propio de forjados, solados y tabiqueria (cargas permanentes G) + sobrecarga de uso (Q) segun CTE DB-SE-AE.
2. Predimensionamiento de Vigas de hormigon armado y perfiles de acero: relaciones de canto en funcion de la luz libre (L/10 a L/12 para vigas continuas, L/8 para voladizos).
3. Predimensionamiento de Pilares: calculo del axil acumulado por planta por metodo de areas tributarias y estimacion de seccion por tension admisible a compresion simple.
4. Predimensionamiento de Zapatas aisladas y losas de cimentacion: dimension en planta en funcion de la tension admisible del terreno aportada por el informe geotecnico.
5. Verificacion de interferencias arquitectonicas: asegurar que los cantos de viga no descuelgan por debajo de la altura libre minima y que los pilares encajan en tabiques.

Restricciones:
- Advierte claramente que este predimensionado es valido para anteproyecto y debe ser validado posteriormente mediante calculo matricial completo.

Formato de salida: Tabla de predimensionamiento de elementos estructurales con esquemas de seccion y justificacion de ratios adoptados.`,
        tags: ["predimensionamiento", "estructuras", "vigas", "pilares", "cálculo-rápido"]
      },
      {
        id: "ing-033",
        title: "Verificación de Eurocódigos Estructurales y Coeficientes Parciales de Seguridad",
        desc: "Modela combinaciones de acciones en Estados Límite Últimos (ELU) aplicando factores gamma de mayoración.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Especialista en Normativa Europea de Estructuras (Eurocodigo EN 1990 y Eurocodigo 2/3).
[COPIA AQUI TU IDEA]

Modela y verifica las combinaciones de carga de Estados Limite Ultimos (ELU) segun la formulacion formal de los Eurocodigos:
1. Coeficientes parciales de seguridad para acciones permanentes (gamma_G = 1.35 desfavorable / 1.00 favorable) y variables (gamma_Q = 1.50).
2. Factores de combinacion psi_0 para acciones concomitantes (viento, nieve, sobrecarga de uso).
3. Generacion de la envolvente de esfuerzos mayorados: Esfuerzo_Ed = sum(gamma_G * G) + gamma_Q * Q_principal + sum(gamma_Q * psi_0 * Q_secundaria).
4. Comprobacion de agotamiento por flexocompresion esviada mediante diagramas de interaccion N-M tridimensionales.
5. Verificacion de cortante y bielas de compresion del hormigon segun modelo de bielas y tirantes del Codigo Estructural.

Restricciones:
- Emplea escrupulosamente los simbolos y subindices oficiales del Eurocodigo sin mezclar con nomenclaturas obsoletas.

Formato de salida: Informe de calculo de combinaciones ELU en Markdown con tabla de envolventes maximas y justificacion de coeficientes.`,
        tags: ["eurocódigos", "elu", "combinaciones-carga", "coeficientes-seguridad", "código-estructural"]
      },
      {
        id: "ing-034",
        title: "Ingesta y Exportación de Modelos IFC Abiertos con IfcOpenShell",
        desc: "Manipula programáticamente archivos BIM en formato abierto IFC4 utilizando Python e IfcOpenShell.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Programador BIM y Desarrollador de Herramientas OpenBIM utilizando IfcOpenShell en Python.
[COPIA AQUI TU IDEA]

Desarrolla el script para procesar, auditar y enriquecer modelos IFC abiertos mediante programacion:
1. Ingesta del archivo IFC (.ifc) y recorrido del arbol de entidades mediante 'ifcopenshell.open()'.
2. Filtrado de elementos constructivos por tipo: extraccion de todas las instancias de 'IfcWall' y 'IfcWindow'.
3. Extraccion de cantidades fisicas de medicion (Quantity Take-Off): volumen neto, area superficial, longitud y espesor a partir del Pset_Quantity correspondiente.
4. Enriquecimiento del modelo: creacion automatica de un PropertySet personalizado ('Pset_HorizonAudit') e insercion de propiedades de cumplimiento normativo en cada elemento.
5. Exportacion del nuevo archivo IFC modificado validando que la estructura sintactica STEP cumple la norma ISO 10303-21.

Restricciones:
- Gestiona correctamente los posibles errores de codificacion de caracteres especiales (acentos, diéresis) en los nombres de materiales.

Formato de salida: Codigo completo en Python utilizando 'ifcopenshell' con funciones documentadas y manejo de excepciones de schema.`,
        tags: ["ifcopenshell", "openbim", "ifc", "python-bim", "step"]
      },
      {
        id: "ing-035",
        title: "Redacción de Pliegos de Condiciones Técnicas Particulares de Proyecto",
        desc: "Genera las cláusulas técnicas obligatorias sobre recepción de materiales, tolerancias de ejecución y pruebas finales.",
        model: "GPT-4o",
        prompt: `Eres un Director de Calidad en Edificacion y Redactor de Pliegos de Condiciones Tecnicas de Obra.
[COPIA AQUI TU IDEA]

Redacta el Pliego de Condiciones Tecnicas Particulares para el capitulo de ejecucion de obra:
1. Condiciones de recepcion de materiales en obra: marcas de conformidad (Marcado CE, Sellos AENOR), documentacion preceptiva y certificados de garantia del fabricante.
2. Criterios de ejecucion y puesta en obra: temperaturas limite para hormigonado o aplicacion de morteros, curado y apuntalamiento.
3. Tolerancias dimensionales admisibles de ejecucion: desviaciones maximas de verticalidad (desplome), horizontalidad de forjados y planeidad superficial.
4. Plan de Control de Calidad y Ensayos obligatorios: rotura de probetas de hormigon a 7 y 28 dias, ensayos de estanqueidad en cubiertas y pruebas de presion en fontaneria.
5. Criterios de medicion y abono de las unidades de obra terminadas para certificaciones mensuales.

Restricciones:
- Redaccion solemne, contractual y legalmente vinculante entre la Propiedad y el Contratista principal.

Formato de salida: Documento de Pliego de Condiciones en Markdown estructurado en articulos correlativos listo para anexionar al contrato de obra.`,
        tags: ["pliego-condiciones", "control-calidad", "marcado-ce", "tolerancias-obra", "prescripciones"]
      },
      {
        id: "ing-036",
        title: "Sistema de Control de Versiones de Planos y Gestión de Revisiones (As-Built)",
        desc: "Organiza el histórico de revisiones de planos (Rev A, B, 0, 1), nubes de cambio y planos de fin de obra As-Built.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Document Controller y Coordinador BIM en un gran proyecto de ingenieria multidisciplinar.
[COPIA AQUI TU IDEA]

Disena e implementa el protocolo de control de versiones y trazabilidad de cambios en planos tecnicos:
1. Nomenclatura estandarizada de planos segun norma ISO 19650: [Proyecto]-[Originador]-[Volumen/Sistema]-[Nivel]-[TipoDoc]-[Disciplina]-[NumeroCorrelativo]-[Revision].
2. Estados del ciclo de vida del plano: S0 (Borrador inicial), S1 (Apto para coordinacion), S2 (Apto para aprobacion), S3 (Apto para contratacion) y S4 (Apto para construccion / For Construction).
3. Procedimiento de gestion de revisiones: marcado de modificaciones mediante nubes de revision (Revision Clouds) y triangulos identificadores correlativos.
4. Cajetin de plano estructurado: cuadro cronologico de revisiones con fecha, descripcion sintetica del cambio, redactor, revisor y aprobador.
5. Protocolo de transicion de planos de ejecucion a planos 'As-Built' (conforme a obra ejecutada) incorporando las modificaciones de campo antes del cierre de obra.

Restricciones:
- Garantiza que ninguna version obsoleta de un plano pueda ser utilizada en obra mediante un sistema de marcado claro de 'Plano Anulado'.

Formato de salida: Manual de gestion documental y control de versiones en Markdown con tabla de codificacion y plantilla de cajetin de plano.`,
        tags: ["control-versiones", "iso-19650", "as-built", "document-control", "planos"]
      },
      {
        id: "ing-054",
        title: "Automatización de Mediciones y Presupuestos en Formato FIEBDC-3 (BC3)",
        desc: "Parsea y genera ficheros estándar de bases de datos de costes de construcción (.bc3) con descomposición en árbol.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Software de Gestión de Costes de Construcción y Formatos Abiertos.
[COPIA AQUI TU IDEA]

Implementa el parser y generador de ficheros de intercambio de bases de precios y presupuestos en formato estandar FIEBDC-3 (extension .bc3):
1. Parseo estricto de registros del estandar BC3 segun la especificacion del Comite FIEBDC:
   - Registro ~C: Conceptos basicos, auxiliares y unitarios (codigo, unidad, resumen, precio unitario).
   - Registro ~D: Descomposicion en arbol jerarquico de capitulos, subcapitulos y partidas con sus rendimientos.
   - Registro ~M: Lineas de medicion detallada (comentario, unidades, longitud, latitud, altura).
   - Registro ~T: Texto descriptivo extendido de la partida.
2. Calculo automatico y ascendente de importes: Precio Unitario = Suma(Rendimiento_i * Precio_i) para partidas descompuestas.
3. Validacion de coherencia: deteccion de referencias circulares en partidas y verificacion de cuadre exacto del presupuesto total.
4. Generacion programatica de un nuevo fichero .bc3 a partir de mediciones extraidas de modelos BIM o tablas de datos.
5. Manejo estricto de codificacion de caracteres ANSI / Windows-1252 clasica de las bases de precios en Espana (Preoc, Centro, Guadalhorce).

Restricciones:
- Respeta los delimitadores de barra vertical '|' o barra inclinada '/' segun la version del estandar FIEBDC-3/2020.

Formato de salida: Modulo de Python 'bc3_budget_parser.py' con funciones de lectura, modificacion y exportacion de archivos .bc3.`,
        tags: ["bc3", "fiebdc-3", "mediciones", "presupuestos", "costes-construcción", "bim"]
      },
      {
        id: "ing-055",
        title: "Extracción y Filtrado Semántico de Archivos IFC con IfcOpenShell en Python",
        desc: "Consulta propiedades geométricas y Psets en modelos OpenBIM IFC4 para validación automatizada de reglas (Model Checking).",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero BIM y Desarrollador de Herramientas OpenBIM con Python e IfcOpenShell.
[COPIA AQUI TU IDEA]

Desarrolla el script de extraccion de datos y chequeo normativo de modelos IFC (IFC2x3 e IFC4) utilizando 'ifcopenshell':
1. Carga eficiente del archivo IFC y filtrado por clases de entidad espacial y constructiva (IfcWall, IfcColumn, IfcBeam, IfcSpace, IfcWindow).
2. Extraccion de conjuntos de propiedades estandarizados (Property Sets / Psets): Pset_WallCommon, Pset_SpaceCommon, Pset_DoorCommon.
3. Validacion automatizada de reglas de calidad del modelo (BIM Model Checking):
   - Comprobacion de que todo elemento constructivo tenga asignado un material especifico y su clasificacion GuBIM o Uniclass.
   - Comprobacion de que los elementos delimitadores de sector de incendio contengan la propiedad de resistencia al fuego reglamentaria (ej: FireRating = 'EI 120').
4. Calculo geometrico de cantidades (Quantities): volumen neto de hormigon, area de encofrado y superficie de acabados.
5. Exportacion de los resultados del chequeo en un fichero JSON estructurado o tabla analitica en DuckDB para auditorias de proyecto.

Restricciones:
- Optimiza la extraccion para modelos pesados (> 500 MB) evitando cargar geometrias complejas en memoria si solo se consultan propiedades alfanumericas.

Formato de salida: Script en Python con la clase 'OpenBimInspector' y generador de informes de control de calidad en Markdown.`,
        tags: ["ifc", "ifcopenshell", "openbim", "model-checking", "psets", "python-bim"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Ingeniería & Arquitectura
 */
export const INGENIERIA_PROMPTS = INGENIERIA_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "ingenieria",
    areaName: "Ingeniería & Arquitectura",
    areaColor: "#F97316",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
