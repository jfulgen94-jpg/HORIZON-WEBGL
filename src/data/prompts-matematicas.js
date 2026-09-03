/**
 * PROMPTS-MATEMATICAS.JS — Biblioteca de Prompts Especializados en Matemáticas & Complejidad
 * Área: Matemáticas & Complejidad
 * Tareas: Genéricos, M4.1 a M4.6 y Tareas Secundarias
 */

export const MATEMATICAS_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "mat-001",
        title: "Especificación Funcional y Formulación Matemática Formal de Problemas",
        desc: "Define el marco axiomático, conjuntos de definición, hipótesis de partida y objetivos del problema matemático.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Matemático Investigador y Arquitecto de Software Científico especializado en modelización formal.
[COPIA AQUI TU IDEA]

Necesito que redactes la especificacion funcional y marco matematico riguroso para este proyecto:
1. Definicion formal del problema: espacio matematico de trabajo (espacio de Banach, variedad diferenciable, grafo finito conexo, espacio de probabilidad).
2. Conjunto de hipotesis y axiomas de partida explicitamente declarados sin asunciones tacitas.
3. Declaracion formal de variables de decision, parametros exogenos y constantes fundamentales con su dominio estricto (R, C, Z, matrices definidas positivas).
4. Formulacion del funcional objetivo y sistema de restricciones en lenguaje formal conjuntista y notacion estandarizada.
5. Criterios de exito y tolerancia de convergencia (norma del residuo < 1e-8, error relativo, gap de optimalidad porcentual).

Restricciones:
- Emplea notacion matematica formal rigurosa, no descripciones verbales vagas.
- Especifica las condiciones de existencia y unicidad de solucion segun los teoremas clasicos aplicables.

Formato de salida: Documento de especificacion matematica estructurado en Markdown con ecuaciones en KaTeX/LaTeX y diagrama formal de relaciones.`,
        tags: ["especificación", "modelización", "formulación-formal", "katex", "axiomas"]
      },
      {
        id: "mat-002",
        title: "Arquitectura de Computación Simbólica y Numérica",
        desc: "Diseña la integración entre manipulación analítica exacta y solvers numéricos de coma flotante.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Computacion Cientifica y Desarrollador de Sistemas de Algebra Computacional (CAS).
[COPIA AQUI TU IDEA]

Disena la arquitectura del pipeline computacional integrando algebra simbolica y resolucion numerica:
1. Modulo Simbolico: simplificacion algebraica previa, obtencion analitica exacta de Jacobianos, Hessianasy transformadas integrales (mediante SymPy o similar).
2. Generacion automatica de codigo numerico compilado (Code Generation / lambdify) a funciones C o LLVM vectorizadas.
3. Modulo Numerico: ejecucion de algoritmos de optimizacion o integracion utilizando arrays de alta velocidad (NumPy / SciPy).
4. Control de estabilidad numerica: deteccion precoz de cancelacion catastrofica, matrices mal condicionadas (Numero de condicion kappa > 1e12) y bifurcaciones.
5. Arquitectura de almacenamiento de estados intermedios y arboles de expresiones matematicas (Abstract Syntax Tree - AST).

Restricciones:
- Define la frontera exacta donde el calculo simbolico se detiene y se transfiere la ejecucion al motor numerico.
- Justifica la seleccion de los formatos de intercambio interno.

Formato de salida: Diagrama de arquitectura de software en Mermaid y diseno de interfaces tipadas en Python con esquemas Pydantic.`,
        tags: ["computación-simbólica", "análisis-numérico", "sympy", "numpy", "ast"]
      },
      {
        id: "mat-003",
        title: "Selección de Tech Stack y Bibliotecas de Computación Científica",
        desc: "Determina librerías óptimas para optimización MILP, solvers EDO y cálculo vectorial determinista.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Developer Cuantitativo evaluando ecosistemas de programacion cientifica de alto rendimiento.
[COPIA AQUI TU IDEA]

Justifica la seleccion del stack tecnologico integral para nuestra plataforma de investigacion matematica:
1. Lenguaje base y runtime: Python (CPython con Numba JIT / Cython vs Julia vs Rust) analizando curva de desarrollo frente a velocidad de ejecucion bruta.
2. Bibliotecas de computacion vectorial y matricial: evaluacion de NumPy, JAX (diferenciacion automatica y ejecucion en GPU) y PyTorch para tensores.
3. Solvers de Optimizacion Matematica (LP/MILP/QP): comparativa tecnica y de licenciamiento entre HiGHS, SciPy Optimize, CVXPY y SCIP.
4. Motores de calculo simbolico: SymPy en local vs integracion con sistemas formales como SageMath o Lean 4.
5. Visualizacion de geometrias y variedades: Matplotlib, Plotly 3D y renderizado interactivo en frontend web via Three.js / KaTeX.

Restricciones:
- Prioriza licencias de codigo abierto permisivas (MIT, BSD, Apache 2.0) aptas para uso sin royalties comerciales.
- Cuantifica el overhead de memoria de cada eleccion.

Formato de salida: Matriz comparativa de stack en Markdown con benchmarking estimado de latencia por tipo de operacion.`,
        tags: ["tech-stack", "scipy", "highs", "jax", "computación-científica"]
      },
      {
        id: "mat-004",
        title: "Diseño de Interfaz de Usuario Matemática con KaTeX y Gráficos",
        desc: "Diseña una UI limpia para exploración interactiva de parámetros, renderizado LaTeX y visualizaciones dinámicas.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Experiencia de Usuario (UX/UI) especializado en herramientas cientificas y exploradores matematicos interactivos.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para la aplicacion matematica:
1. Renderizado en tiempo real de formulas complejas en KaTeX/LaTeX con tipografia Computer Modern o Latin Modern Math sin tirones al teclear.
2. Controles interactivos continuos (sliders con escala lineal y logaritmica, selectores de precision) para variar parametros en caliente y observar la respuesta del sistema.
3. Lienzo grafico bidimensional y tridimensional sincronizado: soporte para zoom profundo, rotacion orbital suave y trazado de curvas de nivel / lineas de campo.
4. Cuadro de estado numerico: monitorizacion en vivo de normas matriciales, eigenvalues, residuos y tiempo de computo por iteracion.
5. Paleta de colores cientifica accesible y perceptualmente uniforme (Viridis, Magma, Plasma) que evite distorsiones visuales en mapas de densidad.

Restricciones:
- El lienzo de graficado debe mantener 60 FPS estables durante la manipulacion interactiva de parametros.
- Todas las formulas deben incluir texto alternativo accesible para lectores de pantalla.

Formato de salida: Guia de arquitectura de componentes UI en React con especificaciones de estilado y arbol jerarquico de visualizacion.`,
        tags: ["ui-matemática", "katex", "tres-dimensiones", "gráficos", "ergonomía"]
      },
      {
        id: "mat-005",
        title: "Documentación Rigurosa y Formateo de Demostraciones en LaTeX",
        desc: "Estructura artículos matemáticos estándar con lemas, proposiciones, teoremas, corolarios y Q.E.D.",
        model: "GPT-4o",
        prompt: `Eres un Editor Cientifico de Revistas de Matematicas Puras y Aplicadas (estilo Annals of Mathematics o SIAM).
[COPIA AQUI TU IDEA]

Crea la plantilla y el estandar documental para redactar las memorias de investigacion y demostraciones formales:
1. Estructura canonica de paper matematico: Titulo, Abstract sintetico, Introduccion con estado del arte, Marco conceptual, Resultados principales y Referencias bibliograficas en BibTeX.
2. Entornos matematicos rigurosos estandarizados en LaTeX: 'theorem', 'lemma', 'proposition', 'corollary', 'definition', 'remark' y 'example' con numeracion correlativa subordinada por seccion.
3. Entorno de demostracion ('proof') con estructura silogistica deductiva paso a paso culminando en simbolo formal de fin de prueba (cuadrado negro Q.E.D. / \\blacksquare).
4. Estandar de formato de ecuaciones numeradas con etiquetas semanticas (\\label{eq:...}) para referencias cruzadas automaticas.
5. Insercion de diagramas conmutativos mediante paquetes TikZ o amscd.

Restricciones:
- Redaccion academica impecable, sobria y rigurosa en espanol o ingles cientifico.
- Cero ambiguedad en el uso de cuantificadores universales (\\forall) y existenciales (\\exists).

Formato de salida: Codigo fuente completo de plantilla LaTeX (.tex compilable con pdflatex/xelatex) con preambulo y paquetes AMS.`,
        tags: ["latex", "demostraciones", "teoremas", "siam", "publicación"]
      },
      {
        id: "mat-037",
        title: "Validación de Estabilidad Numérica y Propagación de Errores de Redondeo (IEEE 754)",
        desc: "Audita algoritmos computacionales para detectar cancelación catastrófica, subdesbordamiento e inestabilidad.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Analista Numérico y Especialista en Precisión de Coma Flotante según el estándar IEEE 754.
[COPIA AQUI TU IDEA]

Disena la auditoria de estabilidad numerica y condicionamiento para un algoritmo computacional:
1. Analisis del numero de condicionamiento (Condition Number kappa) del problema: determinar si una pequena perturbacion en la entrada produce divergencias inaceptables en la salida.
2. Deteccion de cancelacion catastrofica en operaciones de sustraccion de numeros de magnitud similar (ej: calculo ingenuo de varianza o raices de polinomios cuadraticos).
3. Reformulacion algebraica analitica para sustituir operaciones numericamente peligrosas por identidades equivalentes estables (ej: uso de log-sum-exp, formulas de Taylor o trigonometria estable).
4. Verificacion del comportamiento de numeros subnormales (Denormals), ceros con signo (+0.0 vs -0.0) y propagacion de valores NaN/Inf.
5. Medicion cuantitativa del error relativo acotado mediante analisis de error hacia atras (Backward Error Analysis) de Wilkinson.

Restricciones:
- Comprueba que la precision doble (float64 de 53 bits de significante) es suficiente o si el nucleo requiere precision arbitraria con mpmath.

Formato de salida: Modulo de Python con tests de estres numerico y reformulacion de funciones inestables documentada en Markdown.`,
        tags: ["ieee-754", "estabilidad-numérica", "coma-flotante", "cancelación-catastrófica", "condicionamiento"]
      },
      {
        id: "mat-038",
        title: "Pipeline de Benchmarking para Solvers Matemáticos (HiGHS vs SCIP vs GLPK)",
        desc: "Mide tiempos de convergencia, uso de memoria RAM y gap de optimalidad en modelos de programación entera mixta.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Benchmarking y Optimizador de Algoritmos de Investigación Operativa.
[COPIA AQUI TU IDEA]

Crea el banco de pruebas comparativo (Benchmarking Suite) para evaluar solvers de optimizacion abierta y comercial:
1. Seleccion de solvers candidatos: HiGHS (C++ de alto rendimiento), SCIP, GLPK y PuLP-CBC.
2. Ingesta estandarizada de un conjunto de problemas de prueba en formato canónico MPS y LP (instancias de la libreria MIPLIB 2017).
3. Metricas cuantitativas a evaluar:
   - Tiempo de resolucion en segundos (Wall-Clock Time y CPU Time)
   - GAP de optimalidad final alcanzado: |Primal - Dual| / |Primal| * 100
   - Consumo maximo de memoria RAM (Peak RAM) durante el arbol de Branch-and-Bound
   - Numero de nodos explorados y cortes de Gomory aplicados
4. Visualizacion mediante graficos de perfiles de rendimiento de Dolan-More (Performance Profiles).
5. Determinacion objetiva del solver con mejor relacion velocidad/memoria para despliegue en contenedores de produccion.

Restricciones:
- Fija limites estrictos de tiempo por instancia (Time-Limit = 300 s) y semillas deterministas para asegurar reproducibilidad.

Formato de salida: Script en Python con generador de graficos de perfiles de rendimiento en Plotly y tabla comparativa en Markdown.`,
        tags: ["benchmarking", "solvers", "highs", "scip", "dolan-more", "miplib"]
      }
    ]
  },
  {
    id: "auditor-logico",
    name: "Auditor Lógico y Verificador Simbólico (M4.1)",
    prompts: [
      {
        id: "mat-006",
        title: "Verificación Formal de Demostraciones Matemáticas y Detección de Brechas",
        desc: "Analiza demostraciones deductivas paso a paso identificando saltos no justificados, circularidades o hipótesis omitidas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Logico Matematico y Revisor de Demostraciones Formales para certificar la validez de teoremas.
[COPIA AQUI TU IDEA]

Audita la demostracion matematica aportada examinando cada paso deductivo:
1. Descomposicion en proposiciones atomicas: desglosar la cadena de deduccion en una secuencia finita de inferencias formales P1 -> P2 -> ... -> Pn.
2. Verificacion de reglas de inferencia validas (Modus Ponens, Modus Tollens, Reduccion al Absurdo, Induccion Matematica transfinita).
3. Deteccion de brechas logicas (Gaps): localizar afirmaciones donde la conclusion no se deriva formalmente de las premisas anteriores sin justificacion adicional.
4. Identificacion de peticion de principio (Petitio Principii): verificar que la demostracion no asume de forma implicita lo que pretende probar.
5. Comprobacion de hipotesis de frontera: asegurar que no se ha incurrido en divisiones por cero, series divergentes sumadas ilegalmente o intercambio no convergente de limites e integrales (violacion del Teorema de la Convergencia Dominada).

Restricciones:
- Si localizas un error, explicita el contraejemplo matematico minimo que refuta el paso concreto.

Formato de salida: Informe de auditoria logica en Markdown con evaluacion de validez booleana (VALOR: CORRECTO / BRECHA DETECTADA / REFUTADO) y detalle por parrafo.`,
        tags: ["verificación-formal", "lógica", "demostraciones", "contraejemplos", "auditoría"]
      },
      {
        id: "mat-007",
        title: "Formalización de Teoremas en Lean 4 y Verificación con SymPy",
        desc: "Traduce razonamientos matemáticos a código ejecutable en el asistente interactivo de pruebas Lean 4.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Formalizacion Matematica experto en Lean 4 y asistentes de pruebas interactivos (ITP).
[COPIA AQUI TU IDEA]

Traduce el enunciado y la demostracion matematica a codigo formal en Lean 4:
1. Declaracion formal de tipos, estructuras algebraicas y signaturas de variables (Mathlib standard).
2. Enunciado formal del teorema mediante la clausula 'theorem nombre_teorema (hipotesis) : tesis'.
3. Escritura de la prueba interactiva utilizando tacticas estandar de Lean 4 ('intro', 'apply', 'exact', 'simp', 'rw', 'omega', 'ring', 'linarith').
4. Aislamiento de lemas auxiliares ('lemma') para pasos intermedios complejos que faciliten la convergencia del verificador de tipos de Lean.
5. Verificacion paralela con modulo auxiliar en Python usando SymPy para validar computacionalmente las identidades algebraicas del proceso.

Restricciones:
- El codigo de Lean 4 debe compilar limpiamente sin admitir tacticas de evasion ('sorry') en la version final.

Formato de salida: Archivo de codigo completo en Lean 4 (.lean) con comentarios didacticos sobre cada tactica empleada.`,
        tags: ["lean-4", "mathlib", "verificación-formal", "tactics", "sympy"]
      },
      {
        id: "mat-008",
        title: "Detección y Refutación de Falacias Lógicas y Errores de Subsunción",
        desc: "Detecta falacias formales (afirmación del consecuente, negación del antecedente) en argumentos técnicos.",
        model: "DeepSeek V4",
        prompt: `Eres un Filosofo de la Logica y Analista de Validez de Argumentos Matematicos.
[COPIA AQUI TU IDEA]

Analiza el texto tecnico o deduccion matematica identificando falacias logicas formales e informales:
1. Deteccion de Afirmacion del Consecuente: concluir que P es verdadero simplemente porque Q es verdadero y P implica Q.
2. Deteccion de Negacion del Antecedente: concluir erroneamente que no-Q se cumple porque no-P se cumple.
3. Falacias de composicion y division: atribuir propiedades de elementos individuales al conjunto global o viceversa.
4. Generalizacion apresurada a partir de casos particulares sin induccion matematica completa o base inductiva demostrada.
5. Construccion de contraejemplos explicitos que evidencien la no validez universal del razonamiento expuesto.

Restricciones:
- Clasifica cada falacia segun la taxonomica clasica de la logica proposicional y modal.

Formato de salida: Matriz de refutacion estructurada en Markdown con cita textual del error, identificacion de la falacia y construccion del contraejemplo refutatorio.`,
        tags: ["falacias", "lógica-proposicional", "contraejemplos", "refutación"]
      },
      {
        id: "mat-009",
        title: "Simplificación Simbólica Determinista y Reducción Canónica",
        desc: "Aplica reglas de reescritura algebraica y bases de Gröbner para transformar expresiones a forma normal.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Algebra Computacional y Algoritmos de Reescritura Simbolica.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de simplificacion y reduccion canonica para las expresiones algebraicas dadas:
1. Transformacion a Forma Normal Canónica: expansion racional, cancelacion de factores comunes mediante calculo del MCD de polinomios (algoritmo euclideo extendido).
2. Calculo de Bases de Gröbner mediante el algoritmo de Buchberger para decidir pertenencia a ideales algebraicos y simplificar sistemas polinomiales multivariables.
3. Simplificacion trigonometrica y exponencial aplicando identidades de Euler y transformaciones hiperbolicas.
4. Tratamiento riguroso de funciones multievaluadas (ramas de logaritmos complejos y raices enesimas) para evitar simplificaciones ilegales (ej: sqrt(a*b) != sqrt(a)*sqrt(b) en los complejos).
5. Descomposicion en fracciones simples para expresiones racionales.

Restricciones:
- El resultado debe ser determinista, minimal en numero de terminos y algebraicamente equivalente en todo el dominio de definicion.

Formato de salida: Codigo en Python con SymPy que aplique la secuencia optima de simplificaciones y devuelva la expresion final en LaTeX y string evaluable.`,
        tags: ["simplificación", "álgebra-computacional", "bases-grobner", "sympy", "forma-canónica"]
      },
      {
        id: "mat-010",
        title: "Generación de Informe de Auditoría y Certificación Formal de Teoremas",
        desc: "Emite el dictamen final de validez matemática institucional con certificación de exhaustividad.",
        model: "GPT-4o",
        prompt: `Eres el Presidente del Comite de Arbitraje de un Instituto de Investigacion Matematica Avanzada.
[COPIA AQUI TU IDEA]

Elabora el informe formal de certificacion y auditoria del resultado matematico sometido a revision:
1. Resumen formal del teorema auditado y su relevancia en el campo de estudio.
2. Dictamen del proceso de verificacion paso a paso: analisis de robustez de los lemas previos y de la prueba principal.
3. Inventario de casos limite verificados: analisis de degeneraciones (valores cero, infinitos, dimensiones n=1 y n tendiendo a infinito).
4. Certificacion de originalidad y determinacion de dependencia respecto a teoremas previos de la literatura.
5. Calificacion oficial del comite: CERTIFICADO PLENO / CONDICIONADO A SUBSANACION DE BRECHA / RECHAZADO POR INVALIDO.

Restricciones:
- Tono institucional formal, riguroso, objetivo y pericial apto para ser publicado como dictamen de evaluacion por pares (peer-review).

Formato de salida: Dictamen de auditoria matematica en Markdown con sellos formales de seccion y tabla resumen de indicadores de solidez.`,
        tags: ["certificación", "informe", "peer-review", "auditoría", "dictamen"]
      },
      {
        id: "mat-039",
        title: "Verificación Formal de Teoremas con Asistentes de Demostración (Lean 4 / Coq)",
        desc: "Escribe y verifica pruebas matemáticas formales libres de errores utilizando la teoría de tipos dependientes en Lean 4.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lógico Matemático y Desarrollador de Pruebas Formales en el Asistente Lean 4.
[COPIA AQUI TU IDEA]

Formaliza el teorema propuesto y desarrolla su demostracion computacionalmente verificable en Lean 4:
1. Declaracion formal de tipos, estructuras algebraicas y axiomas necesarios dentro del entorno Mathlib.
2. Enunciado formal del teorema utilizando la sintaxis de tipos dependientes de Lean 4.
3. Estrategia de demostracion guiada por tacticas interactivas (intro, apply, rewrite, simp, induction, linarith, ring).
4. Descomposicion de la prueba en lemas auxiliares estructurados para evitar expresiones gigantescas.
5. Verificacion de ausencia de axiomas 'sorry' asegurando que la prueba esta cerrada al 100% por el kernel de Lean.

Restricciones:
- El codigo generado debe compilar limpiamente en la version actual de Lean 4 con Mathlib sin dependencias externas invalidas.

Formato de salida: Archivo de codigo fuente en Lean 4 (.lean) con comentarios explicativos paso a paso de cada tactica empleada.`,
        tags: ["lean-4", "coq", "demostración-formal", "mathlib", "lógica-matemática", "tipos-dependientes"]
      },
      {
        id: "mat-040",
        title: "Detección de Falacias Lógicas y Errores de Cuantificación en Razonamiento Matemático",
        desc: "Audita demostraciones paso a paso para identificar afirmaciones del consecuente, divisiones por cero encubiertas y saltos lógicos.",
        model: "DeepSeek V4",
        prompt: `Eres un Catedrático de Lógica y Metodología Matemática Especializado en Detección de Errores Formales.
[COPIA AQUI TU IDEA]

Audita minuciosamente la cadena de demostracion matematica paso a paso para identificar errores sutiles:
1. Comprobacion de cuantificadores: intercambio indebido del orden de cuantificadores universales y existenciales (ej: confundir continuidad puntual con continuidad uniforme: forall eps exists delta vs exists delta forall eps).
2. Deteccion de divisiones encubiertas por expresiones que pueden anularse bajo determinadas condiciones de contorno.
3. Verificacion de casos degenerados: comprobar si la demostracion asume implicitamente no nulidad, no vacuidad o positividad estricta sin justificacion.
4. Identificacion de razonamientos circulares (Petitio Principii) donde la tesis se asume disimuladamente como lema previo.
5. Validacion de pasos de paso al limite: comprobar que se satisfacen las hipotesis de convergencia dominada de Lebesgue o de convergencia uniforme antes de permutar limite e integral o suma y derivada.

Restricciones:
- Senala con precision milimetrica el numero de linea o ecuacion exacta donde se produce la ruptura de rigor logico.

Formato de salida: Dictamen de auditoria logica en Markdown con analisis de cada paso deductivo y contraejemplo concreto si el teorema es falso.`,
        tags: ["lógica", "falacias", "cuantificadores", "rigor", "auditoría-matemática", "contraejemplos"]
      },
      {
        id: "mat-041",
        title: "Comprobación de Satisfacibilidad Proposicional y Aritmética con Solvers SMT (Z3)",
        desc: "Modela restricciones complejas de lógica de primer orden, aritmética lineal y arrays para verificar correctitud formal con Z3.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero de Métodos Formales y Verificación de Sistemas Críticos con Z3 SMT Solver.
[COPIA AQUI TU IDEA]

Formula el problema de verificacion formal utilizando el solver SMT Z3 de Microsoft Research:
1. Declaracion de variables en teorias especificas: Aritmetica Lineal Real/Entera (LRA/LIA), Bitvectors para modelar registros hardware, y Teoria de Arrays para memoria.
2. Definicion de invariantes del sistema como restricciones logicas inviolables.
3. Codificacion de la propiedad de seguridad a refutar: configurar el solver buscando un contraejemplo satisfactible (SAT) que viole la propiedad deseada.
4. Ejecucion del solver Z3 mediante su API de Python ('z3-solver'):
   - Si retorna 'unsat': la propiedad esta formalmente demostrada para todas las entradas posibles.
   - Si retorna 'sat': extraer el modelo concreto (Counterexample) con los valores exactos que provocan el fallo.
5. Optimizacion de tacticas de simplificacion previa (Simplify, Purify, QFNRA) para evitar cuellos de botella en problemas no lineales.

Restricciones:
- Documenta las restricciones temporales (Timeout) para prevenir bloqueos en teorias indecidibles.

Formato de salida: Script de Python utilizando 'z3' con generacion automatica de contraejemplos e interpretacion formal de resultados.`,
        tags: ["z3", "smt", "satisfacibilidad", "métodos-formales", "verificación", "contraejemplos"]
      }
    ]
  },
  {
    id: "optimizacion-combinatoria",
    name: "Motor de Optimización Combinatoria y MILP (M4.2)",
    prompts: [
      {
        id: "mat-011",
        title: "Formulación Formal de Problemas de Optimización Combinatoria y MILP",
        desc: "Modela problemas de transporte, asignación, empaquetado (Knapsack) y rutas (VRP) como Programación Entera Mixta.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador Operativo y Experto en Optimizacion Matematica Discreta.
[COPIA AQUI TU IDEA]

Modela el problema de optimizacion industrial o logistico como un modelo de Programacion Lineal Entera Mixta (MILP):
1. Definicion formal de conjuntos e indices (nodos, aristas, vehiculos, franjas temporales, articulos).
2. Declaracion de parametros del problema: capacidades, distancias, costes unitarios, demandas y penalizaciones.
3. Declaracion de variables de decision: variables binarias (ej: x_{i,j} in {0,1} si se viaja del nodo i al j), enteras y continuas.
4. Formulacion matematica de la Funcion Objetivo: minimizacion de costes globales o maximizacion de eficiencia operativa.
5. Sistema completo de restricciones: conservacion de flujo, capacidades maximas, restricciones de subrutas (eliminacion de subtours mediante Miller-Tucker-Zemlin MTZ o Dantzig-Fulkerson-Johnson DFJ) y ventanas de tiempo.

Restricciones:
- Asegura que la formulacion sea lineal pura (sin productos de variables de decision que rompan la linealidad; aplica linearizaciones si es necesario).
- Maximiza la compacidad del poliedro asociado para acelerar la resolucion por Branch-and-Cut.

Formato de salida: Modelo matematico formal completo en LaTeX y su representacion equivalente en Python utilizando 'cvxpy' o 'pulp'.`,
        tags: ["milp", "optimización-combinatoria", "vrp", "knapsack", "investigación-operativa"]
      },
      {
        id: "mat-012",
        title: "Resolución Determinista de MILP con Solver HiGHS y SciPy",
        desc: "Implementa el código ejecutable conectando con el solver libre de alto rendimiento HiGHS con gestión de gaps.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador de Algoritmos de Optimizacion de Alto Rendimiento trabajando con HiGHS.
[COPIA AQUI TU IDEA]

Escribe el codigo en Python para resolver el problema MILP utilizando la interfaz de HiGHS a traves de SciPy o Highs-Python:
1. Construccion de matrices de restricciones esparsas (formato CSR / CSC de scipy.sparse) para optimizar memoria en problemas de gran escala.
2. Parametrizacion avanzada del solver HiGHS: tolerancia de gap de optimalidad (mip_rel_gap = 1e-4), tiempo limite de ejecucion (time_limit = 60s) y numero de hilos paralelos.
3. Ejecucion del algoritmo Branch-and-Cut e interpretacion del estado de salida (Optimal, Infeasible, TimeLimit).
4. Extraccion estructurada de la solucion: valor optimo de la funcion objetivo y valores asignados a cada variable de decision.
5. Gestion de infactibilidad: identificacion del conjunto irreducible de restricciones inconsistentes (IIS) si el problema no tiene solucion viable.

Restricciones:
- Codigo de produccion, con tipado estricto, medicion de tiempos de ejecucion y sin bibliotecas de pago (Gurobi o CPLEX descartados).

Formato de salida: Script de Python completo ejecutable de un solo archivo con ejemplo de prueba y reporte de metricas de optimizacion.`,
        tags: ["highs", "scipy", "branch-and-cut", "solver", "sparse"]
      },
      {
        id: "mat-013",
        title: "Optimización Multiobjetivo y Construcción de Frentes de Pareto",
        desc: "Calcula soluciones no dominadas cuando entran en conflicto dos o más objetivos contrapuestos (coste vs tiempo).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Optimizacion Multiobjetivo y Teoria de la Decision.
[COPIA AQUI TU IDEA]

Disena el algoritmo para obtener el Frente de Pareto entre dos o mas objetivos en conflicto:
1. Definicion de los funcionales objetivos en competencia (ej: Minimizar Coste Financiero f1(x) vs Minimizar Tiempo de Emision f2(x) vs Maximizar Fiabilidad f3(x)).
2. Implementacion del metodo de la Epsilon-Restriccion: optimizar un objetivo principal manteniendo los demas acotados por umbrales parametricos escalonados.
3. Generacion de 30 soluciones no dominadas representativas distribuidas a lo largo de todo el frente de compromiso.
4. Calculo de metricas de calidad del frente: hipervolumen cubierto (Hypervolume Indicator) y espaciado (Spacing Metric).
5. Seleccion de la solucion de compromiso optimo basada en el criterio de la distancia minima al Punto Ideal utopico.

Restricciones:
- No utilices suma ponderada simple si el frente de Pareto presenta concavidades (zonas no convexas no detectables por ponderacion lineal).

Formato de salida: Script en Python con graficado automatico en 2D/3D del Frente de Pareto utilizando Plotly y tabla de soluciones no dominadas.`,
        tags: ["multiobjetivo", "frente-pareto", "epsilon-restricción", "toma-decisión", "hipervolumen"]
      },
      {
        id: "mat-014",
        title: "Diseño de Metaheurísticas Adaptativas (Algoritmos Genéticos y Tabu Search)",
        desc: "Resuelve problemas NP-hard a gran escala cuando los solvers exactos no convergen en tiempo razonable.",
        model: "DeepSeek V4",
        prompt: `Eres un Disenador de Algoritmos Bioinspirados y Metaheuristicas para Complejidad Computacional.
[COPIA AQUI TU IDEA]

Desarrolla un algoritmo metaheuristico hibrido para aproximar el optimo en un problema NP-hard de gran dimension:
1. Codificacion cromosomica de la solucion: representacion adecuada (permutacion de enteros, vector binario) y funcion de fitness con penalizacion por restricciones.
2. Operadores de variacion genetica: cruzamiento ordenado (OX / PMX) para evitar soluciones no viables y mutacion adaptativa por intercambio (swap/inversion).
3. Mecanismo de seleccion: seleccion por torneo con mantenimiento de diversidad poblacional mediante crowding distance para evitar convergencia prematura.
4. Hibridacion con Busqueda Local (Memetic Algorithm): aplicacion de Tabu Search o busqueda por vecindad variable (VNS) sobre los mejores individuos.
5. Criterio de parada dual: estabilizacion de la poblacion tras N generaciones sin mejora o agotamiento del presupuesto temporal.

Restricciones:
- El algoritmo debe ser determinista si se fija la semilla aleatoria ('seed=42') para garantizar reproducibilidad en auditorias.

Formato de salida: Modulo de Python 'metaheuristic_solver.py' con ejecucion paralelizada y grafico de convergencia generacional.`,
        tags: ["metaheurísticas", "algoritmos-genéticos", "tabu-search", "np-hard", "memético"]
      },
      {
        id: "mat-015",
        title: "Informe Ejecutivo de Solución Óptima y Análisis de Sensibilidad Dual",
        desc: "Analiza precios sombra (Shadow Prices), costes reducidos y holguras para la toma de decisiones directivas.",
        model: "GPT-4o",
        prompt: `Eres un Consultor Senior en Optimizacion Industrial y Analisis Post-Optimal.
[COPIA AQUI TU IDEA]

Elabora el informe ejecutivo de resultados del modelo de optimizacion con analisis de sensibilidad:
1. Resumen ejecutivo de la solucion optima encontrada: valor del objetivo, desglose por areas operativas y ahorro porcentual respecto al estado basal.
2. Analisis de Precios Sombra (Variables Duales): cuantificacion exacta de cuanto mejoraria la funcion objetivo si se incrementa en una unidad cada recurso limitante (cuellos de botella).
3. Rangos de variabilidad permitida: limites inferior y superior de los coeficientes de costes y terminos independientes donde la base optima actual sigue siendo valida.
4. Identificacion de recursos con holgura (Slack Variables): activos o capacidades infrautilizados en la planificacion optima.
5. Recomendaciones estrategicas directivas: que inversiones en capacidad ofrecen el mayor retorno marginal segun los valores duales obtenidos.

Restricciones:
- Traduce los conceptos matematicos duales a lenguaje corporativo comprensible para directores generales sin formacion matematica avanzada.

Formato de salida: Documento de sintesis ejecutiva en Markdown con tablas de analisis dual y recomendaciones accionables.`,
        tags: ["análisis-dual", "precios-sombra", "sensibilidad", "informe-ejecutivo", "controller"]
      },
      {
        id: "mat-042",
        title: "Optimización No Convexa con Métodos de Puntos Interiores y Regularización de Tikhonov",
        desc: "Resuelve problemas no lineales mal condicionados aplicando funciones de barrera logarítmica y amortiguamiento.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Experto en Optimización Numérica Continua y Métodos de Puntos Interiores No Lineales.
[COPIA AQUI TU IDEA]

Desarrolla el solucionador de optimizacion no lineal con restricciones generales (NLP) mediante el metodo de Puntos Interiores (Primal-Dual Interior Point Method):
1. Formulacion del problema canónico: Minimizacion de f(x) sujeto a restricciones de igualdad g(x) = 0 y de desigualdad h(x) <= 0.
2. Incorporacion de variables de holgura y barrera logaritmica para transformar las desigualdades en penalizaciones suaves con parametro mu.
3. Derivacion analitica de las condiciones de Karush-Kuhn-Tucker (KKT) y ensamblado del sistema de Newton primal-dual.
4. Regularizacion de Tikhonov en la matriz Hessiana para garantizar condicionamiento numerico positivo y evitar singularidades en zonas de baja curvatura.
5. Estrategia de reduccion adaptativa del parametro de barrera mu y control de longitud de paso mediante busqueda lineal de Armijo (Backtracking Line Search).

Restricciones:
- Provee la matriz Jacobiana y Hessiana analitica o mediante diferenciacion automatica para acelerar la convergencia cuadratica.

Formato de salida: Modulo de Python 'interior_point_solver.py' con SciPy / NumPy y diagnostico de convergencia iteracion a iteracion.`,
        tags: ["puntos-interiores", "kkt", "tikhonov", "no-lineal", "optimización-continua", "newton"]
      },
      {
        id: "mat-043",
        title: "Resolución Exacta del Problema del Viajante de Comercio (TSP) con Cortes de Dantzig-Fulkerson-Johnson",
        desc: "Implementa la formulación DFJ con separación dinámica de restricciones de eliminación de subciclos (Subtour Elimination).",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador Operativo Especialista en Optimización Poliédrica y Algoritmos Branch-and-Cut.
[COPIA AQUI TU IDEA]

Implementa el solucionador exacto del Problema del Viajante de Comercio (Traveling Salesperson Problem / TSP) mediante la formulacion clasica de Dantzig-Fulkerson-Johnson (DFJ):
1. Formulacion ILP con variables binarias x_{i,j} que indican si la arista (i, j) forma parte del tour optimo.
2. Restricciones de grado: cada nodo debe tener exactamente un grado de entrada y un grado de salida iguales a 1.
3. Separacion dinamica de subciclos (Lazy Constraints): en lugar de anadir las 2^n restricciones de eliminacion de subciclos de antemano, resolver la relajacion y anadir cortes de subciclos identificados mediante busqueda de componentes conexas en el grafo de soporte.
4. Resolucion mediante el solver HiGHS o PuLP con callbacks de generacion de cortes (Branch-and-Cut).
5. Comparacion de rendimiento frente a la formulacion Miller-Tucker-Zemlin (MTZ), demostrando por que DFJ ofrece una relajacion lineal infinitamente mas fuerte.

Restricciones:
- Optimiza la deteccion de subciclos con el algoritmo de Tarjan o BFS en NetworkX en menos de 5 ms por llamada de callback.

Formato de salida: Modulo en Python 'tsp_dfj_solver.py' con visualizacion interactiva del tour optimo sobre plano 2D en Plotly.`,
        tags: ["tsp", "dantzig-fulkerson-johnson", "branch-and-cut", "subciclos", "highs", "grafos"]
      },
      {
        id: "mat-044",
        title: "Optimización Topológica Estructural de Materiales mediante el Método SIMP",
        desc: "Distribuye densidades de material en una malla 2D/3D para maximizar la rigidez mecánica minimizando la masa.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero Computacional y Especialista en Optimización Topológica de Estructuras (Solid Isotropic Material with Penalization).
[COPIA AQUI TU IDEA]

Crea el algoritmo de optimizacion topologica 2D basado en el metodo SIMP para diseno de estructuras optimas:
1. Discretizacion del dominio de diseno mediante una malla regular de elementos finitos rectangulares (Q4).
2. Asignacion de una densidad continua rho_e in [0, 1] a cada elemento con penalizacion exponencial del modulo de Young: E_e = E_min + rho_e^p * (E_0 - E_min) con p = 3.
3. Funcion objetivo: Minimizar la flexibilidad estructural (Compliance c = U^T * K * U) sujeta a una fraccion de volumen maximo de material (V <= V_max).
4. Calculo de sensibilidades de la funcion objetivo respecto a la densidad de cada elemento y aplicacion de filtro espacial de densidades para evitar el efecto tablero de ajedrez (Checkerboard Problem).
5. Algoritmo de optimizacion: Criterios de Optimalidad (Optimality Criteria / OC) o Metodo de Asintotas Moviles (MMA).

Restricciones:
- Implementa el codigo vectorizado para mallas de al menos 100x60 elementos resolviendo en menos de 30 segundos por iteracion.

Formato de salida: Script compacto en Python con NumPy y Matplotlib que genere la animacion de la evolucion de la distribucion de material.`,
        tags: ["optimización-topológica", "simp", "elementos-finitos", "rigidez", "compliance", "ingeniería-mecánica"]
      }
    ]
  },
  {
    id: "predictor-riesgo",
    name: "Predictor de Riesgo Operacional (M4.3)",
    prompts: [
      {
        id: "mat-016",
        title: "Modelado de Procesos Estocásticos y Ruina de Cramér-Lundberg",
        desc: "Modela la probabilidad de ruina y supervivencia de sistemas operacionales ante reclamaciones o siniestros imprevistos.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Actuarial y Especialista en Procesos Estocasticos de Ruina.
[COPIA AQUI TU IDEA]

Modela la dinamica de solvencia operacional de un sistema mediante el modelo clasico de Cramér-Lundberg:
1. Formulacion del proceso de reserva de capital: U(t) = u + c*t - sum_{i=1}^{N(t)} X_i, donde u es el capital inicial, c la tasa de prima y N(t) un proceso de Poisson homogéneo.
2. Modelizacion de las severidades X_i mediante distribuciones de colas pesadas (Pareto, Lognormal, Weibull) para capturar siniestros catastroficos.
3. Calculo analitico de la condicion de ganancia neta: c > lambda * E[X] para garantizar que la ruina no es segura a tiempo infinito.
4. Resolucion de la probabilidad de ruina a tiempo finito mediante simulacion Monte Carlo de trayectorias (100.000 simulaciones).
5. Determinacion del capital de reserva minimo u* necesario para garantizar una probabilidad de supervivencia superior al 99.9% anual.

Restricciones:
- Documenta con precision matematica la ecuacion integral de renovación para la probabilidad de ruina.

Formato de salida: Codigo en Python con simulacion estocastica y generacion de curvas de supervivencia en funcion del capital inicial.`,
        tags: ["procesos-estocásticos", "ruina", "cramer-lundberg", "poisson", "actuarial"]
      },
      {
        id: "mat-017",
        title: "Simulación de Cadenas de Markov de Tiempo Continuo y Discreto",
        desc: "Estructura matrices de transición, estados absorbentes y distribución estacionaria para modelar degradación de sistemas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Probabilista Aplicado modelando la fiabilidad y degradacion de componentes criticos mediante Cadenas de Markov.
[COPIA AQUI TU IDEA]

Disena el modelo markoviano para estudiar la disponibilidad y transicion de estados del sistema:
1. Definicion del espacio de estados discretos: S = {0: Operativo Optimo, 1: Degradacion Leve, 2: Degradacion Severa, 3: Fallo Critico / Estado Absorbente}.
2. Construccion de la Matriz de Transicion de Probabilidades P (o matriz generadora infinitesimal Q para tiempo continuo).
3. Clasificacion formal de estados: estados recurrentes, transitorios y absorbentes; verificacion de irreducibilidad y aperiodicidad.
4. Calculo de la Distribucion Estacionaria pi satisfaciendo pi * P = pi mediante resolucion del sistema lineal homogeneo con restriccion de normalizacion.
5. Tiempo Medio hasta la Absorcion (MTTF - Mean Time to Failure): calculo de la matriz fundamental N = (I - Q)^{-1} para estimar la vida util restante esperada.

Restricciones:
- Comprueba que la suma de probabilidades en cada fila de la matriz de transicion sume exactamente 1.000000.

Formato de salida: Modulo de Python con la clase 'MarkovReliabilityModel' con metodos para calcular metricas asintoticas y visualizar el grafo de transiciones.`,
        tags: ["markov", "cadenas-markov", "fiabilidad", "distribución-estacionaria", "mttf"]
      },
      {
        id: "mat-018",
        title: "Teoría de Colas (M/M/c, M/G/1) y Cuellos de Botella Operacionales",
        desc: "Calcula tiempos de espera, longitud de colas y dimensionamiento óptimo de servidores en sistemas concurrentes.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico de Operaciones especializado en Teoria de Colas y Modelos de Congestion.
[COPIA AQUI TU IDEA]

Modela analiticamente el sistema de colas para optimizar la capacidad y evitar cuellos de botella:
1. Clasificacion del sistema segun notacion de Kendall (ej: M/M/c para llegadas poissonianas, servicio exponencial y c servidores paralelos).
2. Calculo de la intensidad de trafico rho = lambda / (c * mu) y comprobacion de la condicion de estabilidad ergonomica (rho < 1).
3. Formulas exactas de Erlang-C: probabilidad de que un elemento entrante deba esperar en cola P(W > 0).
4. Calculo de metricas fundamentales mediante formulas de Little: L (numero medio de clientes en el sistema), Lq (longitud de la cola), W (tiempo medio en el sistema) y Wq (tiempo medio de espera).
5. Extension a modelo M/G/1 con tiempos de servicio de distribucion arbitraria mediante la formula de Pollaczek-Khinchine.

Restricciones:
- Define la dimension minima de servidores c para que el percentil 95 del tiempo de espera no supere un umbral critico preestablecido.

Formato de salida: Script en Python con funciones puras que evaluan las formulas analiticas de colas y generan graficas de saturacion.`,
        tags: ["teoría-colas", "erlang-c", "m-m-c", "congestión", "little"]
      },
      {
        id: "mat-019",
        title: "Stress Testing Estocástico y Distribuciones de Cola Pesada (Fat Tails)",
        desc: "Evalúa la exposición a cisnes negros utilizando la Teoría de Valores Extremos (EVT) y distribución GEV/GPD.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Especialista en Teoria de Valores Extremos (EVT) y Analisis de Riesgo de Cola.
[COPIA AQUI TU IDEA]

Implementa el modulo de modelado de eventos extremos y colas pesadas para la variable de riesgo operacional:
1. Metodologia Peaks Over Threshold (POT): seleccion del umbral optimo u mediante grafico de exceso medio de vida residual (Mean Excess Plot).
2. Ajuste de la Distribucion Generalizada de Pareto (GPD) a los excesos sobre el umbral mediante estimacion por maxima verosimilitud (MLE).
3. Estimacion del parametro de forma xi (Indice de Cola): clasificacion en sub-exponencial (xi > 0, colas pesadas tipo Frechet) vs exponencial (xi = 0, tipo Gumbel).
4. Calculo del Value at Risk extremo (VaR_p) y Expected Shortfall extremo (ES_p) para niveles de confianza ultra-altos (99.9% y 99.99%).
5. Generacion de trayectorias de estres simulando la aparicion de cisnes negros combinados en un periodo temporal concentrado.

Restricciones:
- No utilices modelos gaussianos estandar; justifica numericamente por que la distribucion normal subestima drasticamente la probabilidad de eventos extremos.

Formato de salida: Modulo de Python con la libreria 'scipy.stats' ajustando GPD y graficando la cola empirica frente a la cola estimada.`,
        tags: ["evt", "fat-tails", "valores-extremos", "pareto", "cisne-negro"]
      },
      {
        id: "mat-045",
        title: "Modelado de Colas Pesadas y Teoría de Valores Extremos (Distribución GEV / GPD)",
        desc: "Modela eventos catastróficos raros mediante los métodos Block Maxima (GEV) y Peaks Over Threshold (GPD).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Actuario Matemático y Estadístico Especialista en Teoría de Valores Extremos (EVT).
[COPIA AQUI TU IDEA]

Implementa el modulo de estimacion de eventos extremos sobre series temporales de colas pesadas:
1. Enfoque Block Maxima: particionamiento temporal y ajuste de la Distribucion Generalizada de Valores Extremos (GEV) con sus 3 parametros: localizacion mu, escala sigma y forma xi (Frechet si xi > 0, Gumbel si xi = 0, Weibull si xi < 0).
2. Enfoque Peaks Over Threshold (POT): seleccion optima del umbral u mediante grafico de exceso medio de vida (Mean Residual Life Plot) y ajuste de la Distribucion de Pareto Generalizada (GPD).
3. Estimacion del Valor en Riesgo extremo (VaR_p) y Expected Shortfall (ES_p) para niveles de confianza ultra-elevados (99.9% y 99.99%).
4. Calculo del periodo de retorno (Return Period T) y estimacion de las cotas maximas probables a 100 y 500 anos.
5. Diagnostico del ajuste mediante graficos cuantil-cuantil (Q-Q Plot) y test de razon de verosimilitudes.

Restricciones:
- No asumas normalidad en las colas; verifica formalmente la condicion de variacion regular en el infinito.

Formato de salida: Modulo de Python 'extreme_value_theory.py' con 'scipy.stats' y generador de graficos de diagnostico.`,
        tags: ["evt", "valores-extremos", "gev", "gpd", "colas-pesadas", "var-extremo", "actuarial"]
      },
      {
        id: "mat-046",
        title: "Descomposición Ortogonal Propia (POD) y Modelos de Orden Reducido (ROM)",
        desc: "Reduce la dimensionalidad de simulaciones complejas de fluidos o EDPs preservando el 99% de la energía del sistema.",
        model: "DeepSeek V4",
        prompt: `Eres un Físico Computacional y Especialista en Reducción de Modelos Dinámicos (ROM).
[COPIA AQUI TU IDEA]

Construye el motor de reduccion dimensional basado en Descomposicion Ortogonal Propia (Proper Orthogonal Decomposition / POD):
1. Ingesta de la matriz de instantaneas temporales (Snapshots Matrix S) procedente de una simulacion numerica de alta fidelidad (ej: campo de velocidades de Navier-Stokes).
2. Descomposicion en Valores Singulares (SVD) de la matriz de instantaneas centrada: S = U * Sigma * V^T.
3. Evaluacion del espectro de energias relativas: calculo del numero optimo de modos POD 'r' necesarios para capturar el 99% de la energia cinetica acumulada.
4. Proyeccion de Galerkin de las ecuaciones originales sobre el subespacio reducido generado por las bases ortonormales U_r.
5. Construccion del modelo reducido (ROM) para integrar la dinamica temporal a una velocidad 1.000 veces superior a la simulacion completa.

Restricciones:
- Valida la conservacion de propiedades de estabilidad asintotica en el modelo proyectado para evitar divergencias ficticias.

Formato de salida: Script de Python utilizando NumPy y SciPy con reconstruccion del campo dinámico y graficos de modos espaciales.`,
        tags: ["pod", "rom", "svd", "reducción-dimensional", "galerkin", "fluidodinámica"]
      }
    ]
  },
  {
    id: "solucionador-competiciones",
    name: "Solucionador de Competiciones AIME / IMO (M4.4)",
    prompts: [
      {
        id: "mat-020",
        title: "Descomposición Heurística y Búsqueda de Invariantes para Problemas AIME/IMO",
        desc: "Aplica técnicas de olimpíada matemática: principio del invariante, monovariantes y coloraciones de tableros.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Entrenador de Equipos Nacionales de la Olimpiada Internacional de Matematicas (IMO) y Medallista de Oro.
[COPIA AQUI TU IDEA]

Aborda y resuelve el problema de competicion matematica olimpica utilizando tecnicas de razonamiento heuristico avanzado:
1. Exploracion de casos pequenos (n=1, 2, 3, 4) para identificar patrones, regularidades, periodicidades o simetrias ocultas.
2. Identificacion del Invariante: descubrir una cantidad numerica o propiedad estructural que permanece estrictamente constante bajo las operaciones permitidas.
3. Aplicacion de Monovariantes (funciones semivariantes que crecen o decrecen monotonicamente) para demostrar terminacion o cotas asintoticas.
4. Reduccion a casos extremos (Principio del Extremo): considerar el elemento con valor maximo o minimo en el conjunto.
5. Redaccion de la solucion formal final libre de huecos logicos y explicada con el maximo rigor exigido por el tribunal de la IMO.

Restricciones:
- No te limites al resultado numerico; el valor principal radica en la demostracion exhaustiva del teorema.

Formato de salida: Solucion completa estructurada en tres fases: [Estrategia Intuitiva y Descubrimiento], [Demostracion Formal Rigurosa], [Generalizacion del Problema].`,
        tags: ["olimpíada", "imo", "aime", "invariantes", "heurística"]
      },
      {
        id: "mat-021",
        title: "Métodos de Combinatoria Extrema y Principio del Palomar Ponderado",
        desc: "Resuelve problemas combinatorios complejos aplicando doble conteo, principio del palomar y lema de Sperner.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador en Combinatoria Algebraica y Problemas Extremos de Olimpíada.
[COPIA AQUI TU IDEA]

Resuelve el desafio combinatorio aplicando tecnicas combinatorias rigurosas:
1. Tecnica de Doble Conteo (Double Counting): contar una cantidad bipartita de dos formas diferentes para establecer una identidad o desigualdad algebraica fundamental.
2. Principio del Palomar Ponderado / Teorema de Pigeonhole Generalizado: formulacion de conjuntos y casilleros para garantizar la existencia de configuraciones ordenadas.
3. Teoria de Grafos Extremales: aplicacion del Teorema de Turan o Teorema de Ramsey para delimitar el tamano de subgrafos monocromaticos.
4. Funciones Generatrices: uso de series formales de potencias para resolver recurrencias complejas y particiones de enteros.
5. Formalizacion de la cota minima y construccion explicita de un ejemplo concreto que demuestre que la cota es alcanzable (tight bound).

Restricciones:
- Cada afirmacion de conteo debe estar justificada analiticamente con formulas combinatorias explicitas.

Formato de salida: Resolucion formal paso a paso en Markdown con expresiones en KaTeX y diagrama esquematico de la construccion extremal.`,
        tags: ["combinatoria", "doble-conteo", "palomar", "ramsey", "olimpíadas"]
      },
      {
        id: "mat-022",
        title: "Teoría de Números Olímpica: Aritmética Modular, Residuos y Ecuaciones Diofánticas",
        desc: "Aplica Teorema Chino del Resto, Teorema de Euler-Fermat, orden multiplicativo y lema de Hensel.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Teoria Analitica y Algebraica de Numeros para Competiciones Universitarias (Putnam / IMO).
[COPIA AQUI TU IDEA]

Resuelve el problema de teoria de numeros proporcionando una demostracion completa:
1. Analisis modular estrategico: seleccion del modulo optimo mod p (ej: mod 3, mod 4, mod 7 o mod 9) para restringir residuos cuadraticos o cubicos.
2. Aplicacion del Teorema de Euler-Fermat, Pequeno Teorema de Fermat y Teorema de Wilson.
3. Calculo de ordenes multiplicativos y aplicacion del Lema de Levantamiento del Exponente (LTE - Lifting The Exponent Lemma) para potencias primas p^k.
4. Resolucion de Ecuaciones Diofanticas: factorizaciones algebraicas, completado de cuadrados y descenso infinito de Fermat.
5. Evaluacion de reciprocidad cuadratica mediante el Simbolo de Legendre / Jacobi.

Restricciones:
- Si el problema pide hallar todas las soluciones enteras, demuestra rigurosamente que no existen soluciones adicionales fuera de las halladas.

Formato de salida: Demostracion numerica formal estructurada con lemas intermedios en KaTeX y resumen de las soluciones enteras (x, y, z).`,
        tags: ["teoría-números", "aritmética-modular", "diofánticas", "lte", "putnam"]
      },
      {
        id: "mat-023",
        title: "Geometría Sintética Avanzada y Coordenadas Baricéntricas",
        desc: "Demuestra colinealidades, concurrencias y propiedades circulares usando Menelao, Ceva y baricéntricas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Maestro de Geometria Sintetica y Proyectiva para Olimpíadas Internacionales de Matematicas.
[COPIA AQUI TU IDEA]

Resuelve el problema geometrico mediante tecnicas sinteticas y proyectivas avanzadas:
1. Demostracion de concurrencias y colinealidades: aplicacion de los Teoremas de Ceva y Menelao (en sus versiones trigonometricas o de longitud).
2. Propiedades de cuadrilateros ciclicos y arcos de circulos: caza de angulos (Angle Chasing), potencia de un punto y eje radical de circunferencias.
3. Transformaciones geometricas: homotecias, reflexiones, simedianas e inversion respecto a un circulo.
4. Si la geometria sintetica resulta inabordable: computo riguroso en Coordenadas Baricentricas homogeneas o numeros complejos referenciados al circuncirculo unitario.
5. Construccion de la figura geometrica complementaria para ilustrar los puntos de concurrencia.

Restricciones:
- Prohibidas afirmaciones visuales engañosas ('se aprecia claramente en el dibujo'); cada relacion debe justificarse axiomáticamente.

Formato de salida: Demostracion geometrica formal paso a paso en Markdown acompanada de instrucciones geometricas precisas para reproducir la figura en GeoGebra.`,
        tags: ["geometría", "ceva", "menelao", "baricéntricas", "cuadriláteros-cíclicos"]
      },
      {
        id: "mat-047",
        title: "Resolución Asistida de Problemas de Teoría de Números de Nivel Competición IMO / Putnam",
        desc: "Aplica aritmética modular, orden multiplicativo, raíces primitivas y descenso infinito para resolver ecuaciones diofánticas.",
        model: "DeepSeek V4",
        prompt: `Eres un Entrenador Olímpico de Competiciones Matemáticas Internacionales (IMO / Putnam).
[COPIA AQUI TU IDEA]

Resuelve el problema olimpico de teoria de numeros proporcionando la demostracion matematica completa y formal:
1. Identificacion de la estructura algebraica fundamental: congruencias modulares, propiedades de divisibilidad y descomposicion en factores primos.
2. Exploracion sistematica mediante modulos pequenos (mod 2, 3, 4, 8, 9, 13) para delimitar o descartar la existencia de soluciones.
3. Aplicacion de teoremas avanzados de teoria de numeros cuando proceda: Pequeno Teorema de Fermat, Teorema de Euler-Fermat, Teorema de Wilson, Teorema Chino del Resto, Lema de Hensel o Lifting The Exponent Lemma (LTE).
4. Metodo de descenso infinito de Fermat o principio del buen orden para demostrar la no existencia de soluciones no triviales.
5. Redaccion final impecable de la solucion con rigor formal exhaustivo sin saltos argumentales.

Restricciones:
- No utilices soluciones por fuerza bruta numerica; la respuesta debe consistir en una demostracion analitica pura.

Formato de salida: Solucion completa en formato LaTeX con tipografia impecable y justificacion formal de cada paso deductivo.`,
        tags: ["teoría-de-números", "imo", "putnam", "diofánticas", "lte", "competiciones"]
      },
      {
        id: "mat-048",
        title: "Estrategias de Invariantes y Monovariantes en Combinatoria Extrema y Juegos",
        desc: "Identifica magnitudes invariantes bajo transformaciones de estado para demostrar imposibilidad de configuraciones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Combinatoria Olímpica, Teoría de Juegos Combinatorios y Problemas Extremos.
[COPIA AQUI TU IDEA]

Desarrolla la resolucion del problema combinatorio mediante la tecnica de invariantes y monovariantes:
1. Formulacion del sistema como un autómata de estados: configuracion inicial S_0 y conjunto de transiciones de estado permitidas T.
2. Descubrimiento de una cantidad invariante I(S): una funcion matematica cuyo valor se mantiene estrictamente constante tras cualquier transicion (I(S_{t+1}) = I(S_t)).
3. Demostracion de imposibilidad: comprobar que el estado objetivo final S_final tiene un valor de invariante diferente del estado inicial (I(S_final) != I(S_0)), concluyendo la inalcanzabilidad.
4. Descubrimiento de monovariantes (funciones de Liapunov discretas): una magnitud que crece o decrece estrictamente en cada paso, demostrando que el proceso debe terminar en un numero finito de pasos.
5. Aplicacion de coloraciones de grafos, paridades modulares o funciones de peso polinomiales.

Restricciones:
- Estructura la demostracion con total claridad conceptual separando la fase heuristica de descubrimiento de la prueba formal deductiva.

Formato de salida: Documento formal en LaTeX con enunciado, definicion explicita de la funcion invariante y conclusion demostrada.`,
        tags: ["combinatoria", "invariantes", "monovariantes", "teoría-de-juegos", "olimpiadas-matemáticas"]
      }
    ]
  },
  {
    id: "multi-agente-coordinado",
    name: "Sistema Multi-Agente Coordinado (M4.5)",
    prompts: [
      {
        id: "mat-024",
        title: "Protocolos de Consenso Distribuido y Sincronización en Redes Complejas",
        desc: "Modela el algoritmo de consenso de primer y segundo orden sobre grafos dirigidos y topologías dinámicas.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Especialista en Teoria de Control Distribuido y Sistemas Complejos en Red.
[COPIA AQUI TU IDEA]

Modela y analiza la dinamica de consenso distribuido para un conjunto de N agentes interconectados:
1. Representacion de la red mediante Grafo Dirigido G = (V, E) y su Matriz Laplaciana asociada L = D - A.
2. Formulacion de la ecuacion diferencial de consenso de primer orden: dx_i/dt = sum_{j in N_i} a_{ij} * (x_j - x_i).
3. Analisis espectral de convergencia: demostrar que el sistema alcanza el consenso si y solo si el grafo contiene un arbol dirigido generador (Spanning Tree), condicionado por el segundo autovalor mas pequeno lambda_2(L) (Conectividad Algebraica de Fiedler).
4. Evaluacion del efecto de retrasos temporales en la comunicacion (Time Delays tau > 0) y delimitacion del retardo critico de desestabilizacion.
5. Protocolo de consenso robusto ante agentes bizantinos o ruidosos mediante algoritmos W-MSR (Weighted Mean Subsequence Reduced).

Restricciones:
- Proporciona demostraciones de estabilidad aplicando funciones de Lyapunov globales V(x) = x^T * P * x.

Formato de salida: Modulo de simulacion en Python utilizando NumPy y NetworkX con graficado de las trayectorias de convergencia de los agentes.`,
        tags: ["consenso", "multi-agente", "laplaciana", "fiedler", "redes-complejas"]
      },
      {
        id: "mat-025",
        title: "Teoría de Juegos Algorítmica y Cálculo del Equilibrio de Nash",
        desc: "Modela juegos no cooperativos en forma normal y extensiva, calculando equilibrios en estrategias puras y mixtas.",
        model: "DeepSeek V4",
        prompt: `Eres un Econometrista Matematico y Experto en Teoria de Juegos Algoritmica.
[COPIA AQUI TU IDEA]

Analiza el juego estrategico multi-jugador y calcula sus equilibrios formales:
1. Formalizacion del juego en Forma Normal: definicion del conjunto de jugadores N, espacios de estrategias puras S_i y funciones de pago (Payoffs) u_i(s).
2. Eliminacion Iterativa de Estrategias Estrictamente Dominadas (IESDS) para simplificar la matriz de pagos.
3. Calculo de Equilibrios de Nash en Estrategias Puras (PNE) identificando mejores respuestas mutuas (Best Responses).
4. Formulacion y calculo del Equilibrio de Nash en Estrategias Mixtas (MSNE) resolviendo el sistema de complementariedad lineal o mediante el algoritmo de Lemke-Howson.
5. Calculo del Precio de la Anarquia (PoA - Price of Anarchy): ratio entre el bienestar social en el optimo centralizado y el peor equilibrio de Nash.

Restricciones:
- Verifica exhaustivamente si existen equilibrios multiples y clasificalos segun estabilidad y dominancia de Pareto.

Formato de salida: Script de Python utilizando la libreria 'nashpy' o formulacion matricial pura con reporte analitico de los equilibrios calculados.`,
        tags: ["teoría-juegos", "nash", "equilibrio-nash", "precio-anarquía", "estrategias-mixtas"]
      },
      {
        id: "mat-026",
        title: "Negociación Distribuida y Subastas Combinatorias Multi-Ronda",
        desc: "Modela asignaciones de recursos indivisibles mediante subastas VCG (Vickrey-Clarke-Groves) a prueba de manipulación.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Disenador de Mecanismos Economicos (Mechanism Design) y Subastas Algoritmicas.
[COPIA AQUI TU IDEA]

Disena el mecanismo de subasta y asignacion optima de recursos entre agentes competidores:
1. Definicion del conjunto de bienes indivisibles y funciones de valoracion de cada agente sobre paquetes de bienes (Bundle Valuations con complementariedad y sustituibilidad).
2. Formulacion del problema de determinacion del ganador (Winner Determination Problem - WDP) como un problema de optimizacion entera.
3. Implementacion del Mecanismo VCG (Vickrey-Clarke-Groves): regla de asignacion que maximiza el bienestar social eficiente.
4. Calculo de los pagos de Clarke: cada agente ganador paga el coste de oportunidad o dano que su presencia causa a los demas participantes.
5. Demostracion formal de Compatibilidad de Incentivos (Strategy-Proofness / Dominant Strategy Incentive Compatibility): probar que decir la verdad es una estrategia estrictamente dominante para todos los agentes.

Restricciones:
- Documenta las propiedades de balance presupuestario (Budget Balance) e individual rational (IR) del mecanismo disenado.

Formato de salida: Codigo en Python que implemente el resolvedor WDP con HiGHS y calcule los pagos VCG individuales con trazabilidad completa.`,
        tags: ["subastas-combinatorias", "vcg", "mechanism-design", "incentivos", "wdp"]
      },
      {
        id: "mat-027",
        title: "Dinámicas de Agentes Basadas en Campos de Fuerza y Enjambres (Swarm Intelligence)",
        desc: "Implementa modelos de comportamiento colectivo auto-organizado basados en reglas locales de Reynolds (Boids).",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Fisico Computacional y Desarrollador de Modelos de Materia Activa e Inteligencia de Enjambre.
[COPIA AQUI TU IDEA]

Modela la dinamica colectiva auto-organizada de un enjambre de N agentes autonomos en un espacio 2D/3D:
1. Reglas vectoriales de interaccion local de Reynolds:
   - Separacion: fuerza repulsiva de corto alcance inversamente proporcional a la distancia para evitar colisiones.
   - Alineacion: fuerza adaptativa que empareja el vector velocidad con el promedio del vecindario local.
   - Cohesion: fuerza atractiva hacia el centro de masas aparente del grupo local.
2. Inyeccion de obstaculos del entorno mediante funciones de potencial repulsivo de Lennard-Jones o campos de distancia con signo (SDF).
3. Integracion temporal de las ecuaciones del movimiento mediante el esquema simplectico de Verlet o Runge-Kutta de 4 orden (RK4).
4. Emergencia de transiciones de fase: cuantificacion del parametro de orden de polarizacion global (flocking parameter) en funcion del ruido ambiental.
5. Optimizacion de busqueda de vecinos cercanos utilizando particionamiento espacial por grillas hash (Spatial Hashing) en O(N).

Restricciones:
- El algoritmo debe ser computacionalmente escalable para soportar 2.000 agentes a 60 frames por segundo en local.

Formato de salida: Modulo de Python vectorizado con NumPy listo para renderizar la animacion de particulas interactivas.`,
        tags: ["enjambres", "boids", "materia-activa", "reynolds", "simulación-partículas"]
      },
      {
        id: "mat-049",
        title: "Simulación de Consenso y Sincronización en Redes de Osciladores de Kuramoto",
        desc: "Modela la transición de fase hacia la sincronización colectiva en sistemas acoplados no lineales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Físico Teórico y Modelador de Sistemas Complejos y Fenómenos Colectivos.
[COPIA AQUI TU IDEA]

Implementa el simulador del modelo de Kuramoto para estudiar la sincronizacion espontanea en redes de osciladores acoplados:
1. Ecuaciones diferenciales no lineales del sistema de N osciladores de fase: dtheta_i/dt = omega_i + (K/N) * sum_j sin(theta_j - theta_i).
2. Asignacion de frecuencias naturales omega_i segun una distribucion lorentziana o gaussiana.
3. Calculo continuo del parametro de orden de Kuramoto r(t) * exp(i * psi(t)) = (1/N) * sum_j exp(i * theta_j):
   - r = 0 indica fase incoherente desordenada.
   - r = 1 indica sincronizacion total en fase.
4. Determinacion del acoplamiento critico K_c teorico y transicion de fase continua hacia el orden macroscopico.
5. Extension a topologias de red complejas mediante matriz de adyacencia (Small-World de Watts-Strogatz o Scale-Free de Barabasi-Albert).

Restricciones:
- Vectoriza la integracion temporal con Numba o RK45 en NumPy para simular redes de mas de 1.000 osciladores a 60 FPS.

Formato de salida: Script de Python con simulacion interactiva y animacion del circulo unitario de osciladores en Matplotlib.`,
        tags: ["kuramoto", "sincronización", "sistemas-complejos", "osciladores", "redes-complejas"]
      },
      {
        id: "mat-050",
        title: "Modelado de Juegos No Cooperativos y Cálculo del Equilibrio de Nash en Estrategias Mixtas",
        desc: "Calcula equilibrios de Nash exactos en juegos matriciales bimatriciales de suma no nula mediante Lemke-Howson.",
        model: "DeepSeek V4",
        prompt: `Eres un Teórico de Juegos y Economista Matemático Especializado en Teoría del Equilibrio.
[COPIA AQUI TU IDEA]

Construye el motor computacional de resolucion de juegos estrategicos no cooperativos de 2 jugadores:
1. Ingesta de las matrices de pagos A y B de dimension m x n para los jugadores 1 y 2.
2. Deteccion de equilibrios de Nash en estrategias puras mediante la verificacion de mejores respuestas mutuas (Dominancia estricta y debil).
3. Algoritmo de Lemke-Howson para encontrar al menos un equilibrio de Nash en estrategias mixtas en juegos bimatriciales generales.
4. Formulacion complementaria como problema de programacion lineal o problema de complementariedad lineal (Linear Complementarity Problem / LCP).
5. Calculo del precio de la anarquia (Price of Anarchy / PoA): ratio entre el bienestar social en el peor equilibrio de Nash vs el optimo social coordinado.

Restricciones:
- Garantiza que las probabilidades de las estrategias mixtas calculadas sumen exactamente 1.0 y pertenezcan al simplex unitario.

Formato de salida: Modulo de Python 'nash_equilibrium_solver.py' utilizando 'nashpy' o implementacion LCP pura con SciPy.`,
        tags: ["teoría-de-juegos", "equilibrio-de-nash", "lemke-howson", "estrategias-mixtas", "economía-matemática"]
      }
    ]
  },
  {
    id: "calculador-simbolico-numerico",
    name: "Calculador Simbólico-Numérico (M4.6)",
    prompts: [
      {
        id: "mat-028",
        title: "Resolución Numérica y Simbólica de Ecuaciones Diferenciales Ordinarias (EDO)",
        desc: "Aplica métodos analíticos exactos y esquemas adaptativos de paso embebido (Dormand-Prince / Radau) para EDOs rígidas.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Numerico Especialista en Ecuaciones Diferenciales y Sistemas Dinamicos.
[COPIA AQUI TU IDEA]

Desarrolla el modulo para resolver el sistema de Ecuaciones Diferenciales Ordinarias (EDO):
1. Intento de resolucion analitica exacta previa mediante SymPy (metodos de separacion de variables, factores integrantes, variacion de parametros o transformadas de Laplace).
2. Si no admite solucion analitica cerrada: diagnostico de rigidez del sistema (Stiffness Ratio entre el mayor y menor autovalor de la matriz jacobiana).
3. Seleccion del integrador optimo de scipy.integrate.solve_ivp:
   - Sistemas no rigidos: metodo explicito de Runge-Kutta orden 5(4) de Dormand-Prince (RK45).
   - Sistemas rigidos (Stiff): metodo implicito Radau IIA de orden 5 o BDF (Backward Differentiation Formulas) con calculo analitico del Jacobiano.
4. Control estricto de tolerancias de error local: rtol=1e-9, atol=1e-12 y deteccion de eventos criticos (zero-crossing detection).
5. Interpolacion polinomial densa (Dense Output) para evaluar la trayectoria en cualquier instante continuo sin recomputar.

Restricciones:
- Proporciona siempre la matriz Jacobiana exacta calculada analiticamente para maximizar la velocidad y estabilidad del solver implicito.

Formato de salida: Codigo completo en Python con funciones tipadas, ejecucion del solver y comparativa grafica de trayectorias.`,
        tags: ["edos", "runge-kutta", "stiff", "radau", "scipy-integrate"]
      },
      {
        id: "mat-029",
        title: "Integración Numérica Adaptativa Multidimensional (Gauss-Kronrod)",
        desc: "Calcula integrales impropias y multidimensionales aplicando cuadraturas gaussianas y métodos de Monte Carlo.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Cuadratura Numerica y Calculo Cientifico de Integrales Complejas.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de integracion numerica de alta precision para el funcional o funcion multivariable:
1. Cuadratura Adaptativa de Gauss-Kronrod (regla G7-K15 / QAGS de QUADPACK) para integrales unidimensionales con gestion de singularidades algebraicas y logaritmicas en los extremos.
2. Tratamiento de dominios semi-infinitos o infinitos (-inf, +inf) mediante mapeos algebraicos de transformacion de variables.
3. Integrales dobles y triples mediante cuadraturas iteradas anidadas con limites de integracion variables.
4. Para dimensiones altas (D >= 4): conmutacion a metodos de Integracion Monte Carlo / Quasi-Monte Carlo utilizando secuencias de baja discrepancia (Sobol / Halton) y reduccion de varianza por muestreo estratificado.
5. Estimacion rigurosa del error absoluto cometido (|I_estimada - I_real| <= eps_abs).

Restricciones:
- Documenta las regiones de divergencia o de oscilacion violenta de la funcion subyacente.

Formato de salida: Script de Python utilizando 'scipy.integrate' y 'scipy.stats.qmc' con informe de convergencia y numero de evaluaciones de funcion requeridas.`,
        tags: ["integración-numérica", "gauss-kronrod", "quadpack", "quasi-monte-carlo", "sobol"]
      },
      {
        id: "mat-030",
        title: "Aritmética de Precisión Arbitraria con mpmath y Control de Errores",
        desc: "Computa constantes, funciones especiales y series complejas con 100+ dígitos decimales garantizados.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Especialista en Aritmetica de Precision Arbitraria y Analisis de Errores de Redondeo.
[COPIA AQUI TU IDEA]

Implementa el modulo de computacion numerica con precision extendida utilizando la libreria 'mpmath':
1. Fijacion de contexto de precision configurable (ej: 50, 100 o 500 digitos decimales de mantisa exacta).
2. Evaluacion de funciones especiales y trascendentes complejas: funcion Gamma, Zeta de Riemann, funciones de Bessel y polilogaritmos.
3. Aceleracion de convergencia de series infinitas mediante algoritmos de aceleracion de Euler-Maclaurin, Shanks o extrapolacion de Richardson.
4. Identificacion de cancelacion catastrofica en diferencias de numeros cercanos y reescritura analitica estable.
5. Certificacion rigurosa de cotas de error de redondeo segun el estandar IEEE 1788 de Aritmetica de Intervalos (Interval Arithmetic).

Restricciones:
- Asegura que ninguna operacion intermedia sufra degradacion involuntaria a coma flotante de 64 bits de hardware (float nativo de Python).

Formato de salida: Codigo en Python con 'mpmath' acompanado de verificacion de digitos significativos exactos frente a valores de referencia conocidos.`,
        tags: ["mpmath", "precisión-arbitraria", "análisis-errores", "funciones-especiales", "intervalos"]
      },
      {
        id: "mat-031",
        title: "Álgebra Lineal Numérica: Factorizaciones Espectrales y Condicionamiento",
        desc: "Calcula descomposiciones SVD, QR y Cholesky analizando autovalores y estabilidad numérica en matrices mal condicionadas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Algebra Lineal Numerica de Alto Rendimiento (LAPACK / BLAS).
[COPIA AQUI TU IDEA]

Desarrolla el pipeline de factorizacion matricial y analisis espectral para matrices complejas:
1. Calculo del Numero de Condicion kappa(A) = ||A|| * ||A^{-1}|| respecto a la norma espectral para medir la sensibilidad a perturbaciones.
2. Descomposicion en Valores Singulares (SVD truncado / Full SVD): extraccion de valores singulares, espacio nulo (kernel) y rango numerico efectivo.
3. Factorizacion de Cholesky A = L * L^T para matrices simetricas definidas positivas, con algoritmo de regularizacion espectral minima (Tikhonov) si la matriz es semi-definida.
4. Factorizacion QR mediante reflectores de Householder para resolver problemas de minimos cuadrados lineales sobredeterminados con maxima estabilidad.
5. Calculo de pseudoinversa de Moore-Penrose A^+ para inversion robusta de matrices singulares.

Restricciones:
- Implementa comprobaciones previas de simetria y positividad antes de invocar algoritmos especializados.

Formato de salida: Modulo de Python optimizado con 'scipy.linalg' que devuelva las factorizaciones, cotas de estabilidad y autovalores principales.`,
        tags: ["álgebra-lineal", "svd", "cholesky", "qr", "condicionamiento"]
      },
      {
        id: "mat-051",
        title: "Integración Simbólica de Expresiones Trascendentes mediante el Algoritmo de Risch",
        desc: "Determina analíticamente si una integral indefinida es elemental o requiere funciones especiales no elementales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Álgebra Computacional y Algoritmos Simbólicos de Integración.
[COPIA AQUI TU IDEA]

Desarrolla el analizador algebraico de integrabilidad elemental basado en el algoritmo de Risch y Liouville:
1. Analisis de la funcion f(x) para descomponerla en extensiones trascendentes sucesivas (logaritmicas y exponenciales) sobre el cuerpo de funciones racionales C(x).
2. Aplicacion del Teorema de Liouville: si f(x) admite una primitiva elemental, esta debe ser de la forma v0 + sum c_i * log(v_i), donde v0 y v_i pertenecen al mismo cuerpo de extension.
3. Decision analitica: comprobar si integrales no elementales clasicas (ej: exp(-x^2), sin(x)/x, 1/log(x)) pueden resolverse en terminos de funciones elementales o si requieren funciones especiales (erf, Si, Li).
4. Ejecucion e integracion mediante el motor simbolico SymPy con descomposicion en fracciones parciales algebraicas de Hermite.
5. Demostracion rigurosa en caso de no elementalidad citando el diferencial de Liouville correspondiente.

Restricciones:
- No utilices reglas heuristicas de integracion de bachillerato; fundamenta el analisis en la teoria de cuerpos diferenciales de Picard-Vessiot.

Formato de salida: Modulo de Python con SymPy que clasifique la funcion, devuelva la primitiva analitica o emita el dictamen de no elementalidad con justificacion formal.`,
        tags: ["risch", "integración-simbólica", "sympy", "liouville", "álgebra-computacional"]
      },
      {
        id: "mat-052",
        title: "Cálculo de Funciones Especiales con Precisión Arbitraria de 500 Dígitos (mpmath)",
        desc: "Calcula ceros no triviales de la función Zeta de Riemann, funciones de Bessel e hipergeométricas sin redondeo.",
        model: "DeepSeek V4",
        prompt: `Eres un Analista Numérico de Alta Precisión y Especialista en Funciones Especiales Matemáticas.
[COPIA AQUI TU IDEA]

Implementa el modulo de computacion numerica de ultra-alta precision (500 digitos significativos) utilizando 'mpmath':
1. Configuracion del contexto de precision de mpmath: mp.dps = 500 (decimal places) y control del redondeo hacia el par mas proximo.
2. Calculo de los ceros no triviales de la funcion Zeta de Riemann zeta(s) sobre la linea critica Re(s) = 1/2 utilizando la formula de Riemann-Siegel.
3. Evaluacion de funciones hipergeometricas gaussianas 2F1(a, b; c; z) y confluentes 1F1 mediante series aceleradas y fracciones continuas.
4. Calculo de funciones de Bessel de primera y segunda especie (J_nu, Y_nu) y de Airy (Ai, Bi) en el plano complejo con tolerancia de error < 10^-490.
5. Verificacion de identidades funcionales analiticas exactas (ej: ecuacion funcional de la funcion Gamma y formula de reflexion de Euler) para auditar la precision efectiva del calculo.

Restricciones:
- Asegura que los parametros de entrada sean convertidos a cadenas de texto ('string') antes de pasarlos a mpmath para no perder precision en la conversion de float de Python.

Formato de salida: Script de Python 'high_precision_special_functions.py' con ejecucion de benchmarks y tabla de resultados con 500 digitos.`,
        tags: ["mpmath", "alta-precisión", "zeta-riemann", "funciones-especiales", "bessel"]
      },
      {
        id: "mat-053",
        title: "Resolución Numérica de Ecuaciones en Derivadas Parciales (EDPs) con Galerkin Discontinuo",
        desc: "Resuelve ecuaciones hiperbólicas de conservación (ondas, advección) mediante el método numérico de Galerkin Discontinuo (DG-FEM).",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero Matemático Computacional Especializado en Métodos de Elementos Finitos Avanzados (DG-FEM).
[COPIA AQUI TU IDEA]

Construye el solucionador numerico para ecuaciones hiperbolicas en derivadas parciales mediante Galerkin Discontinuo 1D:
1. Formulacion de la ley de conservacion: du/dt + d(f(u))/dx = 0 en el dominio [x_L, x_R] con condiciones periodicas o de frontera absorbentes.
2. Discretizacion espacial en K elementos no conformes con polinomios de Lagrange de orden N sobre nodos de Legendre-Gauss-Lobatto (LGL).
3. Formulacion debil en cada elemento permitiendo discontinuidades en las interfaces interelementales.
4. Calculo de los flujos numericos en las fronteras de los elementos mediante el flujo de Lax-Friedrichs o Roe para garantizar estabilidad y captura de choques sin oscilaciones espurias.
5. Integracion temporal explicita de tercer orden Runge-Kutta Total Variation Diminishing (TVD-RK3) respetando la condicion de Courant-Friedrichs-Lewy (CFL).

Restricciones:
- Incorpora limitador de pendiente (Slope Limiter / Minmod) en zonas de gradiente extremo para evitar el fenomeno de Gibbs.

Formato de salida: Modulo de Python con NumPy y animacion en Matplotlib de la propagacion de ondas y formacion de frentes de choque.`,
        tags: ["galerkin-discontinuo", "dg-fem", "edp", "hiperbólicas", "tvd-rk3", "lax-friedrichs"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Precisión Numérica, Visualización y Benchmarks)",
    prompts: [
      {
        id: "mat-032",
        title: "Renderizado Dinámico de Ecuaciones KaTeX en Tiempo Real sin Parpadeo",
        desc: "Integra KaTeX en aplicaciones web React/Vite garantizando compilación matemática ultra-rápida y tipografía impecable.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Desarrollador Frontend especializado en herramientas cientificas interactivas y motores de renderizado matematico.
[COPIA AQUI TU IDEA]

Crea el componente de renderizado dinamico en React para expresiones matematicas utilizando KaTeX:
1. Compilacion en caliente (Instant Preview): renderizado asincrono sin parpadeo (flicker-free) mediante 'katex.renderToString' o integracion memoizada.
2. Soporte dual para formulas en linea (inline: $...$) y formulas en bloque independiente (display mode: $$...$$).
3. Manejo tolerante de errores de sintaxis LaTeX: capturar excepciones de KaTeX y mostrar visualmente el token erroneo en rojo sin romper la aplicacion.
4. Soporte para macros personalizadas comunes de algebra, calculo y logica (ej: \\R, \\N, \\eps, \\norm{}).
5. Copia rapida en un clic: boton flotante para copiar el codigo fuente LaTeX original de cualquier formula al portapapeles.

Restricciones:
- Optimiza el componente con 'useMemo' para que la re-renderizacion no degrade la interfaz en documentos con mas de 100 ecuaciones simultaneas.

Formato de salida: Componente de React 'KaTeXRenderer.jsx' completo, con estilos CSS integrados y manejo de dependencias.`,
        tags: ["katex", "react", "frontend", "renderizado", "latex-web"]
      },
      {
        id: "mat-033",
        title: "Exportación Automatizada de Demostraciones y Papers a LaTeX Compilable",
        desc: "Genera proyectos completos en LaTeX (.tex + .bib) listos para compilar en Overleaf o con TeXLive.",
        model: "GPT-4o",
        prompt: `Eres un Editor de Publicaciones Cientificas en Matematicas y Ciencias de la Computacion.
[COPIA AQUI TU IDEA]

Desarrolla el conversor para exportar los resultados, teoremas y graficos analizados a un archivo LaTeX compilable:
1. Generacion del archivo principal 'documento.tex' con preambulo profesional usando la clase 'amsart' o 'article'.
2. Inclusion automatica de paquetes indispensables: 'amsmath', 'amssymb', 'amsthm', 'mathtools', 'microtype', 'hyperref' y 'booktabs'.
3. Definicion formal de los teoremas con numeracion automatica (\\newtheorem{theorem}{Teorema}[section]).
4. Formateo de tablas de datos cientificos con estetica formal (reglas \\toprule, \\midrule, \\bottomrule sin lineas verticales).
5. Generacion del archivo de bibliografia 'referencias.bib' con entradas limpias y verificables.

Restricciones:
- El codigo generado debe compilar directamente con 'pdflatex' sin producir un solo error ni advertencia grave.

Formato de salida: Archivo de texto estructurado con el codigo fuente completo de 'main.tex' y 'references.bib' listo para compilar.`,
        tags: ["latex", "overleaf", "amsart", "exportación", "publicación"]
      },
      {
        id: "mat-034",
        title: "Visualización Interactiva 2D/3D de Grafos Complejos y Atractores",
        desc: "Construye visualizaciones científicas interactivas con Three.js, Plotly o WebGL para sistemas no lineales.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Programador Grafico Cientifico especializado en visualizacion de datos matematicos y sistemas no lineales.
[COPIA AQUI TU IDEA]

Crea la visualizacion interactiva en 3D para el sistema dinamico o grafo complejo:
1. Renderizado de trayectorias en el espacio de fases (ej: Atractor de Lorenz, Atractor de Rossler o mapa tridimensional).
2. Trazado continuo con gradiente de color dinamico codificando la velocidad tangencial o el tiempo transcurrido en la trayectoria.
3. Controles orbitales completos de camara: rotacion 360 grados, paneo lateral y zoom interactivo mediante raton o gestos tactiles.
4. Animacion temporal de la particula guia recorriendo la trayectoria a velocidad ajustable.
5. Exportacion de capturas de pantalla en alta resolucion (PNG a 300 DPI) y secuencias para generacion de video cientifico.

Restricciones:
- Asegura que el pipeline grafico aproveche aceleracion por hardware WebGL manteniendo tasas de refresco de 60 FPS.

Formato de salida: Codigo completo en JavaScript utilizando Three.js o Plotly con canvas responsivo y panel de configuracion.`,
        tags: ["visualización-3d", "threejs", "plotly", "atractores", "sistemas-dinámicos"]
      },
      {
        id: "mat-035",
        title: "Suite de Benchmarking de Algoritmos y Notación Asintótica Big-O",
        desc: "Mide experimentalmente el tiempo de ejecución y consumo de memoria ajustando curvas empíricas a órdenes O(n), O(n log n), O(n^2).",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Complejidad Computacional y Benchmarking Experimental de Algoritmos.
[COPIA AQUI TU IDEA]

Disena la suite de pruebas para medir y validar la complejidad asintotica real del algoritmo implementado:
1. Bateria de pruebas para tamanos de entrada crecientes: n in {10, 50, 100, 500, 1.000, 5.000, 10.000, 50.000}.
2. Medicion rigurosa de tiempos de CPU aislados mediante 'time.perf_counter_ns()' con multiples repeticiones (minimo 10 ejecuciones por tamano para eliminar ruido del sistema operativo).
3. Medicion del pico de memoria RAM consumido utilizando 'tracemalloc'.
4. Ajuste por regresion no lineal de minimos cuadrados a modelos teoricos candidatos: O(n), O(n log n), O(n^2), O(2^n).
5. Determinacion del Coeficiente de Determinacion R^2 para cada hipotesis y dictamen final sobre la clase de complejidad empirica observada.

Restricciones:
- Acondiciona los datos de entrada para evaluar tanto el mejor caso, caso promedio como el peor caso teorico.

Formato de salida: Script de Python completo 'benchmark_suite.py' con reporte en consola y grafico de escalabilidad logaritmica.`,
        tags: ["benchmarking", "complejidad", "big-o", "rendimiento", "tracemalloc"]
      },
      {
        id: "mat-036",
        title: "Generador de Datasets Matemáticos Sintéticos con Soluciones Verificadas",
        desc: "Crea problemas matemáticos algorítmicamente generados con sus respuestas exactas para pruebas de regresión y benchmarks.",
        model: "DeepSeek V4",
        prompt: `Eres un Disenador de Benchmarks Cientificos y Generador de Datos para Evaluacion de Modelos de Razonamiento.
[COPIA AQUI TU IDEA]

Desarrolla el generador sintetico de problemas matematicos parametrizados con ground-truth exacto:
1. Generacion de instancias sinteticas de dificultad calibrada (desde nivel basico escolar hasta nivel competicion AIME).
2. Construccion inversa (Inverse Problem Generation): empezar por la solucion entera o racional deseada y construir hacia atras el polinomio, sistema o matriz correspondiente para garantizar soluciones limpias.
3. Tipologias soportadas: sistemas lineales de N ecuaciones, problemas de optimizacion MILP con solucion conocida, integrales simbolicas y matrices con autovalores predefinidos.
4. Comprobacion determinista obligatoria de que la solucion generada satisface todas las condiciones originales mediante verificacion formal en SymPy.
5. Exportacion del dataset en formatos estandar JSONL y Parquet enriquecido con pasos de resolucion paso a paso.

Restricciones:
- Cero tolerancia a soluciones aproximadas o con errores de redondeo; todas las soluciones deben ser exactas.

Formato de salida: Script en Python con clase generadora que cree 500 instancias verificadas y las almacene en un archivo estructurado.`,
        tags: ["datasets-sintéticos", "benchmarks", "ground-truth", "evaluación", "sympy"]
      },
      {
        id: "mat-054",
        title: "Acelerador Numérico Vectorizado SIMD en Python con Numba y Tipado Estricto",
        desc: "Compila bucles matemáticos intensivos en código máquina nativo x86_64 con directivas AVX-512 y multiprocesamiento prange.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Compiladores JIT y Computación Científica de Alto Rendimiento (HPC).
[COPIA AQUI TU IDEA]

Optimiza el nucleo de computo matematico intensivo mediante Numba para alcanzar velocidad de ejecucion equiparable a C puro:
1. Aplicacion del decorador '@njit(fastmath=True, parallel=True, cache=True)' sobre funciones criticas con bucles anidados.
2. Paralelizacion automatica de bucles independientes mediante 'prange' con balanceo de carga en hilos de CPU.
3. Vectorizacion explicita aprovechando instrucciones SIMD (AVX2 / AVX-512) asegurando disposicion de datos contigua en memoria (C-Order).
4. Precalentamiento obligatorio (Warm-up call) con datos sinteticos para que la compilacion JIT inicial no penalice la primera peticion del usuario.
5. Medicion cuantitativa de aceleracion (Speedup factor) frente a Python puro y frente a NumPy estandar.

Restricciones:
- Prohibe cualquier asignacion de memoria dentro del bucle paralelo y asegura ausencia total de retroceso al interprete de Python (nopython mode estricto).

Formato de salida: Modulo de Python 'numba_accelerated_kernel.py' con benchmark comparativo de tiempos de ejecucion y uso de CPU.`,
        tags: ["numba", "jit", "simd", "paralelismo", "hpc", "optimización-rendimiento"]
      },
      {
        id: "mat-055",
        title: "Exportador de Cuadernos Jupyter Interactivos con Fórmulas KaTeX y Widgets",
        desc: "Genera notebooks reproducibles (.ipynb) estructurados con celdas de markdown, código Python y gráficos embebidos.",
        model: "GPT-4o",
        prompt: `Eres un Desarrollador de Herramientas de Ciencia Reproducible y Automatización de Cuadernos Jupyter.
[COPIA AQUI TU IDEA]

Crea el generador programatico de cuadernos Jupyter (.ipynb) reproducibles a partir de especificaciones matematicas:
1. Generacion formal del esquema JSON valido de Jupyter Notebook v4 (nbformat 4).
2. Estructuracion de celdas markdown con tipografia matematica en LaTeX / KaTeX, tablas explicativas y bloques de advertencia.
3. Inyeccion de celdas de codigo ejecutables con dependencias minimas (NumPy, SciPy, Matplotlib), comentarios pedagogicos y manejo de excepciones.
4. Incorporacion de widgets interactivos con 'ipywidgets' (sliders para ajustar parametros de ecuaciones y observar graficos en tiempo real).
5. Fijacion obligatoria de semillas deterministas para garantizar que ejecutar el cuaderno desde cero produzca graficos y resultados identicos bit a bit.

Restricciones:
- Valida que el fichero JSON generado cumpla estrictamente la especificacion oficial de nbformat sin errores de sintaxis al abrirse en JupyterLab o Google Colab.

Formato de salida: Script en Python con la clase 'JupyterNotebookBuilder' que cree el archivo .ipynb listo para descarga y ejecucion.`,
        tags: ["jupyter", "ipynb", "reproducibilidad", "widgets", "katex", "ciencia-abierta"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Matemáticas & Complejidad
 */
export const MATEMATICAS_PROMPTS = MATEMATICAS_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "matematicas",
    areaName: "Matemáticas & Complejidad",
    areaColor: "#6366F1",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
