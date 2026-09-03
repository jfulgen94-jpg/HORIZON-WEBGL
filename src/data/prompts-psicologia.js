/**
 * PROMPTS-PSICOLOGIA.JS — Biblioteca de Prompts Especializados en Psicología & Ciencias del Comportamiento
 * Área: Psicología & Ciencias del Comportamiento
 * Tareas: Genéricos, P1.1 a P1.6 y Tareas Secundarias
 */

export const PSICOLOGIA_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "psi-001",
        title: "Especificación Funcional de App de Escucha Activa y Bienestar No Clínico",
        desc: "Define el alcance de acompañamiento reflexivo, delimitación no sanitaria y protocolos de derivación inmediata.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Psicologo Organizacional y Consultor de Etica en Tecnologias del Comportamiento.
[COPIA AQUI TU IDEA]

Redacta la especificacion funcional y marco etico para esta aplicacion de bienestar y escucha activa:
1. Delimitacion del alcance no clinico: el software es exclusivamente una herramienta de soporte reflexivo, autoconocimiento y organizacion personal; bajo ninguna circunstancia ofrece diagnostico psicologico, psicoterapia ni tratamiento de trastornos mentales.
2. Definicion del perfil de usuario y casos de uso validos: gestion del estres cotidiano, clarificacion de metas, registro de habitos y reflexion personal.
3. Arquitectura del protocolo de seguridad: inclusion de un detector permanente de palabras clave de crisis que interrumpa la conversacion y ofrezca lineas telefonicas oficiales de atencion en salud mental.
4. Tono de comunicacion del sistema: empatico, acogedor, sobrio, sin generar dependencia emocional artificial ni fingir una relacion humana real.
5. Criterios de evaluacion del impacto en el bienestar: escalas validadas de autopercepcion del estres y satisfaccion personal.

Restricciones:
- Queda totalmente prohibido el uso de terminos clinicos como 'terapia', 'diagnostico', 'paciente' o 'cura'.
- Especifica el descargo de responsabilidad legal obligatorio que debe aceptar el usuario antes de comenzar.

Formato de salida: Documento de especificacion funcional en Markdown con matriz de casos de uso y politicas de salvaguarda.`,
        tags: ["especificación", "bienestar", "no-clínico", "ética", "límites-legales"]
      },
      {
        id: "psi-002",
        title: "Arquitectura de Privacidad Rigurosa y Datos Psicométricos Cifrados",
        desc: "Diseña un modelo de cifrado de extremo a extremo (E2EE) para diarios personales conforme al RGPD y HIPAA.",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto de Ciberseguridad y Delegado de Proteccion de Datos (DPO) especializado en datos sensibles de salud y conducta.
[COPIA AQUI TU IDEA]

Disena la arquitectura de seguridad y privacidad para almacenar reflexiones personales y respuestas psicometricas:
1. Clasificacion de datos segun el articulo 9 del RGPD (datos relativos a la salud y estado emocional como categorias especiales de datos de proteccion reforzada).
2. Esquema de Cifrado de Extremo a Extremo (E2EE): generacion de claves criptograficas AES-256 en el dispositivo del usuario derivadas de contrasena con PBKDF2/Argon2; el servidor almacena solo blobs cifrados ilegibles (Zero-Knowledge Architecture).
3. Pseudonimizacion y segregacion de bases de datos: separacion fisica estricta entre la base de datos de identidad del usuario (email, facturacion) y la base de datos de actividad y reflexiones.
4. Protocolo de anonimizacion diferencial para agregaciones estadisticas de investigacion que impida ataques de reidentificacion por triangulacion.
5. Flujo automatizado de ejercicio de derechos ARCO-POL: mecanismo en un clic para exportacion integra de datos en JSON y borrado criptografico irreversible (derecho al olvido).

Restricciones:
- Los registros de auditoria no deben contener jamas fragmentos de texto escrito por los usuarios ni datos personales identificativos.

Formato de salida: Diagrama de arquitectura de seguridad en Mermaid y politicas tecnicas de retencion y cifrado en Markdown.`,
        tags: ["privacidad", "rgpd", "cifrado-e2ee", "zero-knowledge", "seguridad-datos"]
      },
      {
        id: "psi-003",
        title: "Selección de Tech Stack para Análisis Afectivo y Modelado del Comportamiento",
        desc: "Evalúa modelos de lenguaje, clasificadores de sentimiento y motores de reglas para sistemas reflexivos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead AI Engineer especializado en Procesamiento del Lenguaje Natural Aplicado a las Ciencias Afectivas.
[COPIA AQUI TU IDEA]

Justifica la seleccion del stack tecnologico para construir el motor reflexivo y de acompanamiento:
1. Seleccion del LLM base: evaluacion de Claude 3.7 Sonnet (altas capacidades de empatia matizada y apego estricto a directrices de seguridad) vs modelos locales abiertos (Llama 3.3 70B desplegado en local para maxima privacidad).
2. Capa de clasificacion afectiva y deteccion de crisis: clasificadores ligeros basados en RoBERTa / DeBERTa fine-tuned para deteccion de angustia en menos de 50 ms antes de llamar al modelo generador.
3. Base de datos vectorial para memoria episodica reflexiva: Qdrant o pgvector con embeddings anonimizados para contextualizar reflexiones pasadas del usuario.
4. Motor de politicas de moderacion y filtrado (Guardrails): integracion de NeMo Guardrails o Llama Guard para interceptar de inmediato cualquier intento de solicitar consejos medicos o instrucciones de autolesion.
5. Infraestructura de backend: FastAPI con Python async y validacion estricta de esquemas de respuesta JSON con Pydantic.

Restricciones:
- Prioriza modelos con politicas comprobadas contra la generacion de alucinaciones y con baja tendencia al halago complaciente (Sycophancy).

Formato de salida: Matriz comparativa de arquitectura tecnica en Markdown con diagrama de flujo de peticiones seguras.`,
        tags: ["tech-stack", "nlp-afectivo", "guardrails", "privacidad", "seguridad-ia"]
      },
      {
        id: "psi-004",
        title: "Diseño de Interfaz Empática, Sosegada y Accesible (Calm Technology)",
        desc: "Diseña un entorno visual relajante que reduce la ansiedad, con tipografía serena y colores desaturados.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Interfaz UX/UI especializado en Calm Technology y Diseno Sensorialmente Amigable.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para la aplicacion de bienestar y reflexion:
1. Paleta cromatica restaurativa: uso de tonos salvia, tierras suaves y azules crepusculares en el espacio OKLCH, evitando colores de alerta saturados (rojos agresivos reemplazados por coral suave).
2. Tipografia serena de alta legibilidad: fuentes con serifas humanas o sans-serif organicas (Inter, Merriweather, Literata) con interlineado generoso (1.6x) y ancho de linea comodo (60-70 caracteres por linea).
3. Espacio en blanco generoso: composiciones aireadas que eviten la sensacion de urgencia, eliminando elementos parpadeantes, alertas emergentes invasivas o insignias con numeros de tareas pendientes.
4. Micro-interacciones suaves: animaciones con desaceleraciones lentas (300-400 ms) inspiradas en la respiracion humana para inducir estados de calma.
5. Boton permanente de pausa o salida rapida ('Cerrar sesion segura') para usuarios en momentos de sobrecarga emocional.

Restricciones:
- No utilices elementos de gamificacion adictiva (rachas culpabilizadoras, clasificaciones competitivas o campanas ruidosas).

Formato de salida: Guia de diseno visual en Markdown con especificaciones de paleta, tokens CSS y layout de pantalla reflexiva.`,
        tags: ["calm-technology", "ui-empática", "ergonomía-visual", "paleta-relajante", "bienestar"]
      },
      {
        id: "psi-005",
        title: "Documentación Ética, Descargos de Responsabilidad Legal y Gobernanza",
        desc: "Redacta el consentimiento informado, términos de uso no sanitarios y gobernanza ética algorítmica.",
        model: "GPT-4o",
        prompt: `Eres un Asesor Legal y Bioeticista especializado en Regulacion de Inteligencia Artificial y Salud Digital.
[COPIA AQUI TU IDEA]

Elabora el marco documental legal y etico para la aplicacion interactiva:
1. Descargo de Responsabilidad Legal Prominente (Disclaimer Sanitario): clausula visible y obligatoria acreditando que el servicio no constituye atencion medica ni psicoterapia colegiada.
2. Consentimiento Informado del Usuario: explicacion transparente en lenguaje claro (nivel B1) sobre como se procesan sus reflexiones, limites de la inteligencia artificial y voluntariedad del uso.
3. Directorio de Recursos de Urgencia: inclusion de lineas telefonicas oficiales de atencion en crisis (Telefono de la Esperanza, 024 en Espana, 988 en EE.UU., lineas latinoamericanas).
4. Politica de No Generacion de Apego Parasocial: compromiso algoritmico de no imitar sentimientos humanos reales ni alentar la dependencia hacia el asistente digital.
5. Protocolo de Auditoria Bioetica Periodica: revision semestral de sesgos de genero, culturales y linguisticos en las respuestas del sistema.

Restricciones:
- Cumple rigurosamente con la Ley de Inteligencia Artificial de la UE (AI Act - Sistemas de alto riesgo / clasificacion de emociones).

Formato de salida: Documento legal y bioetico completo en Markdown estructurado en articulos formales listos para publicacion.`,
        tags: ["ética-ia", "disclaimer", "consentimiento", "ai-act", "gobernanza"]
      },
      {
        id: "psi-037",
        title: "Diseño de Arquitectura Ética y Protocolos de Derivación a Líneas de Crisis (024)",
        desc: "Establece guardrails que detectan ideación autolítica o crisis severas y activan teléfonos oficiales de emergencia.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Ética de Inteligencia Artificial y Psicólogo Asesor en Salud Mental Digital.
[COPIA AQUI TU IDEA]

Disena el protocolo de seguridad y derivacion de emergencia para una aplicacion de coaching y bienestar psicologico:
1. Deteccion en tiempo real de marcadores linguisticos de crisis extrema, ideacion suicida, autolesion o conductas lesivas hacia terceros.
2. Interrupcion inmediata del flujo conversacional ordinario: cancelacion de respuestas genericas de coaching o autoayuda.
3. Activacion del mensaje protocolario de emergencia institucional: presentacion destacada del telefono 024 (Linea de Atencion a la Conducta Suicida en Espana), el 112 (Emergencias generales) o lineas internacionales equivalentes (988 en EE.UU.).
4. Ofrecimiento de contacto directo con personas de apoyo de confianza preconfiguradas por el usuario en sus ajustes de seguridad.
5. Pista de auditoria confidencial y anonimizada de la activacion de alertas para revision de calidad de salvaguardas eticas.

Restricciones:
- La aplicacion debe declarar explicitamente en todo momento que no es un servicio de urgencias medicas ni una terapia sustitutiva.

Formato de salida: Protocolo de gestion de crisis en Markdown con arbol de decision de triage y textos literales aprobados para emergencias.`,
        tags: ["ética", "seguridad", "crisis-024", "salud-mental", "derivación-emergencia", "guardrails"]
      },
      {
        id: "psi-038",
        title: "Privacidad Absoluta Local-First con DuckDB y Encriptación en Reposo para Diarios de Reflexión",
        desc: "Garantiza que las reflexiones personales y emocionales queden cifradas en el dispositivo del usuario sin llegar al servidor.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Ciberseguridad y Arquitecto de Aplicaciones Local-First con Cero Conocimiento (Zero-Knowledge).
[COPIA AQUI TU IDEA]

Crea la arquitectura de almacenamiento de maxima privacidad para una aplicacion de auto-reflexion personal y diario de equipo:
1. Modelo de datos Local-First: la base de datos principal reside exclusivamente en el dispositivo del usuario utilizando DuckDB-WASM / SQLite en el navegador.
2. Cifrado en reposo simetrico AES-256-GCM con clave derivada de una contrasena maestra local mediante Argon2id.
3. Arquitectura de Cero Conocimiento (Zero-Knowledge Architecture): ninguna reflexion intima, analisis de estado de animo o metadatos viaja a servidores centrales sin cifrar.
4. Anonimizacion en origen si el usuario consiente compartir tendencias agregadas con su equipo (privacidad diferencial con inyeccion de ruido laplaciano).
5. Protocolo de borrado seguro irreversible (Cryptographic Shredding) que destruye las claves locales al solicitar el cierre de cuenta.

Restricciones:
- Las llamadas a APIs de LLMs deben anonimizar previamente nombres propios y ubicaciones antes de enviar el prompt para inferencia.

Formato de salida: Documento de arquitectura de seguridad en Markdown con codigo en TypeScript para la capa criptografica local.`,
        tags: ["local-first", "privacidad-absoluta", "zero-knowledge", "aes-256", "duckdb-wasm", "argon2"]
      }
    ]
  },
  {
    id: "escucha-activa",
    name: "Sistema de Escucha Activa No Clínica / Ánima AI (P1.1)",
    prompts: [
      {
        id: "psi-006",
        title: "Generación de Respuestas Empáticas con Escucha Reflexiva y Parafraseo",
        desc: "Responde a expresiones de frustración o incertidumbre mediante parafraseo fiel, validación y sintonía afectiva.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Comunicacion No Violenta (CNV de Marshall Rosenberg) y Escucha Reflexiva no directiva.
[COPIA AQUI TU IDEA]

Elabora una respuesta de escucha reflexiva profunda ante la situacion expresada por el usuario:
1. Parafraseo del contenido nuclear: reformula con tus propias palabras lo que la persona ha vivido, demostrando comprension exacta de los hechos sin interpretaciones gratuitas.
2. Identificacion y nombramiento del sentimiento subyacente: reconoce la emocion de fondo (frustracion, desconcierto, sobrecarga, vulnerabilidad) utilizando matices emocionales precisos.
3. Identificacion de la necesidad humana universal no satisfecha: senala la necesidad que origina la emocion (claridad, reconocimiento, autonomia, descanso, seguridad).
4. Cero juicio moral y cero consejos no solicitados: no intentes 'arreglar' la vida de la persona ni dar recetas rapidas de autoayuda; el objetivo es que se sienta plenamente escuchada y aceptada.
5. Pregunta abierta de exploracion suave: invita a profundizar a su propio ritmo si la persona lo desea.

Restricciones:
- No utilices frases hechas artificiales ('Entiendo perfectamente como te sientes'); demuestra empatia mediante precision en el reflejo.

Formato de salida: Texto de respuesta empatica estructurado internamente pero fluido y conversacional hacia el usuario.`,
        tags: ["escucha-activa", "parafraseo", "comunicación-no-violenta", "empatía", "no-directivo"]
      },
      {
        id: "psi-007",
        title: "Detección Inmediata de Crisis, Ideación Autolítica y Protocolo de Derivación",
        desc: "Detecta de inmediato menciones de autolesión, desesperanza terminal o ideación suicida activando derivación oficial.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Sistema de Triaje de Seguridad y Derivacion de Emergencia ante Situaciones de Riesgo Vital.
[COPIA AQUI TU IDEA]

Analiza el mensaje del usuario y activa de inmediato el protocolo de proteccion en caso de riesgo de autolesion o crisis aguda:
1. Evaluacion de senales de alarma: detectar explicitas o implicitas alusiones a no querer vivir, despedidas encubiertas, regalos de pertenencias valiosas, sensacion de carga insoportable o autolesion inminente.
2. Si se detecta cualquier indicio de ideacion autolitica:
   - Suspender de inmediato cualquier conversacion ordinaria o ejercicio reflexivo.
   - Mensaje de validacion y cuidado incondicional: transmitir con calidez serena que su vida tiene valor y que existen profesionales especializados disponibles en este mismo momento.
   - Presentacion prioritaria y destacada de telefonos oficiales de emergencia gratuitos y confidenciales:
     * Espana: 024 (Linea de atencion a la conducta suicida) y 717 003 717 (Telefono de la Esperanza) / Emergencias 112.
     * Internacional: 988 (EE.UU. y Canada), lineas nacionales correspondientes segun ubicacion.
   - Recomendacion explicita de contactar a un ser querido o acudir al centro de urgencias hospitalarias mas cercano.

Restricciones:
- No discutas, no minimices el sufrimiento ('seguro que manana te sientes mejor') y no intentes ejercer de terapeuta en crisis; deriva directamente.

Formato de salida: Respuesta humanizada de derivacion prioritaria y estructura de evento de alerta para el sistema.`,
        tags: ["crisis", "prevención-suicidio", "derivación-urgente", "seguridad-vital", "protocolo-024"]
      },
      {
        id: "psi-008",
        title: "Validación Emocional Incondicional sin Emisión de Juicios ni Consejos",
        desc: "Acoge emociones difíciles (rabia, vergüenza, celos) legitimando su existencia como reacciones humanas naturales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Acompanante Reflexivo especializado en Validacion Emocional y Aceptacion Radical.
[COPIA AQUI TU IDEA]

Construye una respuesta orientada a validar la experiencia emocional del usuario ante una vivencia conflictiva:
1. Legitimacion de la emocion: afirmar explicitamente que es completamente comprensible y humano sentir eso dadas las circunstancias vividas.
2. Desactivacion de la culpa secundaria o verguenza: normalizar que experimentar emociones socialmente mal vistas (envidia, rabia, alivio ante una perdida) no define el valor moral de la persona.
3. Postura de presencia compasiva: sostener el espacio reflexivo sin juzgar, sermonear ni emitir juicios de valor sobre lo que 'deberia' sentir.
4. Separacion entre emocion y conducta: reconocer la validez de sentir la emocion al tiempo que se reflexiona con serenidad sobre las acciones que se eligen emprender.
5. Tono de calidez incondicional y respeto reverente por el proceso interno del usuario.

Restricciones:
- Prohibido el positivismo toxico ('mira el lado bueno de las cosas' o 'todo pasa por una razon'); valida el dolor o la incomodidad tal como es.

Formato de salida: Mensaje conversacional empatico y sereno listo para ser entregado en la aplicacion de acompanamiento.`,
        tags: ["validación-emocional", "aceptación-radical", "cero-juicio", "humanismo", "ánima-ai"]
      },
      {
        id: "psi-009",
        title: "Reformulación de Pensamientos y Técnica Espejo de Clarificación",
        desc: "Devuelve al usuario sus propias palabras organizadas lógicamente para ayudarle a ordenar su mundo interior.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Facilitador de Dialogo Socratico y Tecnicas de Espejo Reflexivo.
[COPIA AQUI TU IDEA]

Aplica la tecnica de espejo reflexivo para ayudar al usuario a clarificar y ordenar sus pensamientos dispersos:
1. Estructuracion del caos cognitivo: toma el relato desordenado del usuario y desglosalo en tres componentes claros:
   - Hechos objetivos observables (lo que una camara de video habria registrado).
   - Interpretaciones y narrativas personales (lo que el usuario piensa o teme sobre esos hechos).
   - Impacto emocional y corporal (como se siente en su vida diaria).
2. Devolucion en espejo: 'Si te he escuchado bien, lo central que te preocupa se divide en estos puntos... ¿se ajusta a lo que sientes o hay matices que ajustar?'.
3. Peticion de precision: invitar al usuario a definir con mayor precision terminos vagos o absolutistas que generan angustia ('todo va mal', 'nunca sale nada').
4. Estimulacion del autodescubrimiento: permitir que sea la propia persona quien encuentre conexiones entre sus pensamientos sin imponerselas.

Restricciones:
- Mantente neutral; no tomes partido en conflictos interpersonales ni valides acusaciones como verdades absolutas.

Formato de salida: Respuesta en espejo estructurada con calidez y preguntas clarificadoras para devolver al usuario.`,
        tags: ["técnica-espejo", "clarificación", "diálogo-socrático", "organización-mental", "ánima-ai"]
      },
      {
        id: "psi-010",
        title: "Salvaguardas de Límites Éticos y Descargo Obligatorio No Clínico",
        desc: "Gestiona peticiones indebidas de diagnóstico o tratamiento reconduciendo con calidez hacia profesionales de la salud.",
        model: "GPT-4o",
        prompt: `Eres un Moderador de Limites Eticos y Asistente de Gobernanza en Inteligencia Artificial.
[COPIA AQUI TU IDEA]

Genera la respuesta adecuada cuando el usuario solicita explicitamente un diagnostico psicologico, medicacion o terapia:
1. Reconocimiento calido de la necesidad: 'Agradezco la confianza que muestras al compartir conmigo lo que te ocurre y entiendo que buscas respuestas claras...'.
2. Delimitacion firme y transparente del limite: 'Sin embargo, como sistema de inteligencia artificial, no tengo capacidad legal, clinica ni etica para evaluar sintomas, diagnosticar trastornos ni pautar intervenciones psicologicas'.
3. Explicacion pedagógica del por que: explicar que una evaluacion de salud mental requiere de un profesional humano colegiado que conozca su historia personal completa.
4. Reconduccion util: sugerir pasos realistas para buscar ayuda profesional acreditada (orientacion sobre como acudir al medico de atencion primaria o consultar el colegio oficial de psicologos).
5. Oferta de soporte en lo que si puede ayudar: 'En lo que si puedo acompanarte aqui es en ayudarte a organizar tus pensamientos para preparar esa consulta o en explorar tecnicas de respiracion'.

Restricciones:
- Mantener siempre la firmeza en el limite sin sonar punitivo, burocratico ni distante.

Formato de salida: Plantilla de respuesta estructurada en Markdown para gestion de limites de competencia profesional.`,
        tags: ["límites-éticos", "derivación-profesional", "gobernanza", "no-diagnóstico", "salvaguarda"]
      },
      {
        id: "psi-039",
        title: "Facilitación de Diálogos Socráticos para Síndrome del Impostor en Líderes Técnicos",
        desc: "Formula preguntas reflexivas que ayudan a confrontar creencias distorsionadas de incompetencia mediante evidencias objetivas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Coach Ejecutivo Certificado (ICF) y Mentor de Liderazgo Tecnológico y Resiliencia Cognitiva.
[COPIA AQUI TU IDEA]

Desarrolla el protocolo conversacional socratico para guiar a profesionales y lideres tecnicos afectados por el fenomeno del impostor:
1. Identificacion de distorsiones de atribucion: tendencia a atribuir los exitos a la suerte o factores externos y los fallos a incompetencia propia innata.
2. Serie estructurada de preguntas socraticas abiertas:
   - Examen de evidencias: '¿Que hechos verificables y medibles respaldan que no estas preparado para este reto?'
   - Reevaluacion de estandares: '¿Exiges a tus companeros o liderados el mismo nivel de perfeccion absoluta que te exiges a ti mismo?'
   - Perspectiva externa: 'Si un colega muy respetado estuviera en tu posicion exacta, ¿que valoracion harias de su trayectoria?'
3. Registro de evidencias reales de competencia (Portfolio de Logros Verificables): documentacion de hitos tecnicos, proyectos entregados y problemas complejos resueltos.
4. Normalizacion del error como parte inherente de la maestria y diseno de experimentos conductuales pequenos para tolerar la imperfeccion.
5. Cierre con plan de accion autonomo sin dependencia emocional del asistente de coaching.

Restricciones:
- No utilices frases hechas de validacion vacia o condescendiente; el valor reside en el cuestionamiento reflexivo riguroso.

Formato de salida: Guion de intervencion socratica en Markdown estructurado en 4 fases con ejemplos de dialogo y preguntas guia.`,
        tags: ["método-socrático", "síndrome-impostor", "liderazgo", "coaching-ejecutivo", "sesgos-cognitivos"]
      },
      {
        id: "psi-040",
        title: "Entrenamiento en Comunicación Asertiva y Resolución de Conflictos según Marshall Rosenberg (CNV)",
        desc: "Transforma reproches y quejas en los 4 componentes de la Comunicación No Violenta: Hechos, Sentimientos, Necesidades y Peticiones.",
        model: "GPT-4o",
        prompt: `Eres un Mediador Organizacional y Facilitador de Comunicación No Violenta (CNV).
[COPIA AQUI TU IDEA]

Construye el convertidor y entrenador interactivo de comunicacion asertiva para la resolucion de tensiones en equipos de trabajo:
1. Deconstruccion del mensaje conflictivo o queja inicial en los 4 pasos cardinales de Marshall Rosenberg:
   - Observacion neutra (Hechos objetivos comprobables sin juicio de valor ni generalizaciones como 'siempre' o 'nunca').
   - Expresion de sentimientos (Identificacion precisa de estados emocionales autenticos: frustracion, inquietud, sobrecarga).
   - Identificacion de necesidades universales insatisfechas (Claridad, colaboracion, reconocimiento, autonomia, seguridad).
   - Formulacion de peticiones concretas (Acciones positivas, medibles, realizables en el presente y negociables, no exigencias).
2. Deteccion de lenguaje evaluativo o punitivo: senalar palabras trampa que activan respuestas defensivas en el interlocutor.
3. Simulacion de roles (Role-Playing): generacion de respuestas hipoteticas de la otra parte para ensayar la conversacion antes de la reunion real.
4. Pautas para la recepcion empatica: como escuchar las quejas de un companero aplicando la misma estructura de 4 pasos.
5. Generacion de una ficha de preparacion de conversacion crucial lista para imprimir.

Restricciones:
- No suavices el mensaje hasta el punto de ocultar el problema de fondo; la asertividad exige firmeza con las necesidades y suavidad con las personas.

Formato de salida: Modulo de transformacion comunicativa con ejemplos contrastados 'Expresion habitual reactiva vs Expresion CNV asertiva'.`,
        tags: ["cnv", "comunicación-no-violenta", "mediación", "asertividad", "conflictos", "marshall-rosenberg"]
      },
      {
        id: "psi-041",
        title: "Análisis de Marcadores Lingüísticos de Sobrecarga Emocional en Diarios de Reflexión Escritos",
        desc: "Procesa la sintaxis y léxico de textos personales para identificar señales tempranas de agotamiento o rumiación.",
        model: "DeepSeek V4",
        prompt: `Eres un Lingüista Computacional y Analista de Procesamiento de Lenguaje Afectivo y Bienestar.
[COPIA AQUI TU IDEA]

Crea el pipeline analitico para monitorizar marcadores linguisticos de sobrecarga y rumiacion en textos de diarios reflexivos:
1. Ingesta de textos libres redactados voluntariamente por el usuario en sus sesiones de cierre de jornada.
2. Analisis de densidad de pronombres de primera persona del singular ('yo', 'mi', 'conmigo'): medicion de hiperfocalizacion egocentrica segun la investigacion de Pennebaker.
3. Deteccion de verbos y adverbios de necesidad o absolutistas ('debo', 'tengo que', 'imposible', 'todo', 'nada').
4. Calculo del indice de dispersion lexico-emocional: balance entre vocabulario afectivo constructivo vs lexico de tension o impotencia.
5. Identificacion de patrones de rumiacion circular: repeticion recurrente de los mismos terminos y conflictos a lo largo de multiples semanas sin avance hacia planes de accion.

Restricciones:
- Prohibe expresamente emitir etiquetas medicas o diagnosticos psicopatologicos; el informe debe limitarse a tendencias de estilo expresivo.

Formato de salida: Script de Python utilizando SpaCy / TextBlob con metricas cuantitativas de diversidad lexica y visualizacion de tendencias temporales.`,
        tags: ["nlp", "lingüística-afectiva", "pennebaker", "rumiación", "estilo-expresivo", "bienestar"]
      }
    ]
  },
  {
    id: "intervenciones-conductuales",
    name: "Diseño de Intervenciones Conductuales / Nudge Engine (P1.2)",
    prompts: [
      {
        id: "psi-011",
        title: "Diseño de Nudges Éticos Basados en Arquitectura de Decisiones (Thaler & Sunstein)",
        desc: "Diseña pequeños cambios en el entorno de decisión que facilitan elecciones positivas sin prohibir opciones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Economista Conductual y Arquitecto de Decisiones certificado en Ciencias del Comportamiento.
[COPIA AQUI TU IDEA]

Disena una intervencion conductual mediante 'Nudges' (pequenos empujones eticos) para favorecer el comportamiento deseado:
1. Diagnostico del comportamiento objetivo: definir con precision el comportamiento diana especifico y medible (ej: beber 2 litros de agua, ahorrar un 10% mensual, completar tareas a tiempo).
2. Mapeo de fricciones actuales (Sludge): identificar que barreras psicologicas o sobrecargas cognitivas frenan la accion en el entorno actual.
3. Diseno del Nudge segun las tipologias clasicas de Thaler & Sunstein:
   - Opcion por defecto beneficiosa (Default Option): configurar la alternativa saludable como predeterminada, manteniendo libertad total de cambio.
   - Prominencia y visibilidad (Salience): resaltar visualmente la opcion positiva en el momento exacto de la decision.
   - Normas sociales descriptivas: informar de forma veraz sobre lo que la mayoria de personas afines ya hace con exito.
   - Recordatorios oportunos (Just-in-Time Prompts): avisos situados en la ventana temporal optima de accion.
4. Principio de Paternalismo Libertario: garantizar que ninguna opcion legitima queda prohibida ni se aplican penalizaciones economicas.
5. Declaracion de transparencia: la intervencion debe ser abierta y evidente, nunca manipuladora ni engañosa.

Restricciones:
- No utilices patrones oscuros (Dark Patterns) que beneficien a la plataforma a costa del bienestar real del usuario.

Formato de salida: Propuesta de intervencion conductual en Markdown con ficha tecnica del Nudge y evaluacion de impacto etico.`,
        tags: ["nudges", "arquitectura-decisiones", "thaler-sunstein", "economía-conductual", "ética"]
      },
      {
        id: "psi-012",
        title: "Mapeo y Mitigación de Sesgos Cognitivos en Procesos de Elección",
        desc: "Identifica sesgos como aversión a la pérdida, sesgo de presente o anclaje, diseñando estrategias para contrarrestarlos.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador en Juicio Humano y Toma de Decisiones (Marco Kahneman & Tversky).
[COPIA AQUI TU IDEA]

Identifica los sesgos cognitivos presentes en el proceso de decision y formula tecnicas de desesgamiento (Debiasing):
1. Sesgo del Presente e Hiperbolico: tendencia a sobreponderar el placer inmediato frente a grandes beneficios futuros. Estrategia: pactos de Ulises o compromisos previos vinculantes.
2. Aversion a la Perdida (Loss Aversion): el dolor de perder se siente con el doble de intensidad que la satisfaccion de ganar. Estrategia: reformular el objetivo en terminos de no perder lo ya conquistado.
3. Sesgo de Confirmacion: buscar solo informacion que confirme creencias previas ignorando pruebas en contra. Estrategia: tecnica del Abogado del Diablo o 'Premortem Analysis'.
4. Efecto de Anclaje (Anchoring): quedar condicionado por el primer numero o dato expuesto. Estrategia: obligar a considerar valores extremos contrarios antes de decidir.
5. Efecto de Sobrecarga de Eleccion (Choice Overload): paralisis decisional ante demasiadas alternativas. Estrategia: limitar las opciones visibles a un maximo de tres.

Restricciones:
- Cada tecnica de mitigacion debe ser viable de implementar directamente en la interfaz digital o en la rutina del usuario.

Formato de salida: Matriz de sesgos y contramedidas en Markdown con evaluacion cuantitativa del impacto conductual.`,
        tags: ["sesgos-cognitivos", "kahneman", "tversky", "debiasing", "toma-decisiones"]
      },
      {
        id: "psi-013",
        title: "Diseño de Bucles de Comportamiento y Hábitos Sostenibles (Modelo Fogg / BJ Fogg)",
        desc: "Aplica la fórmula B = MAP (Comportamiento = Motivación * Capacidad * Disparador) para crear micro-hábitos duraderos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Diseno del Comportamiento formado en el Behavioral Design Lab de la Universidad de Stanford.
[COPIA AQUI TU IDEA]

Estructura un programa de formacion de habitos positivos utilizando el Modelo de Fogg (Fogg Behavior Model):
1. Formula B = MAP: el comportamiento (B) ocurre cuando confluyen al mismo tiempo Motivacion (M), Capacidad/Simplicidad (A) y Disparador (P).
2. Curva de Accion de Fogg: cuando la motivacion fluctua o es baja, la accion debe ser extremadamente facil de realizar para cruzar la linea de accion.
3. Diseno de 'Tiny Habits' (Micro-habitos): reducir la accion diana a una version diminuta que requiera menos de 30 segundos (ej: en lugar de 'hacer 45 minutos de ejercicio', empezar por 'hacer 2 flexiones al levantarme').
4. Disenador de Disparadores de Anclaje (Anchor Prompts): conectar el nuevo micro-habito a una rutina solida ya establecida mediante la estructura: 'Despues de [HABITO ACTUAL], yo voy a [NUEVO MICRO-HABITO]'.
5. Celebracion y Retroalimentacion Inmediata (Shine): asociar un refuerzo positivo instantaneo para liberar dopamina y consolidar el cableado neural del habito.

Restricciones:
- No confies en la fuerza de voluntad ni en picos temporales de motivacion; optimiza radicalmente la facilidad de ejecucion.

Formato de salida: Plan de implantacion de habitos en Markdown estructurado en tablas de anclaje y progresion incremental.`,
        tags: ["fogg-model", "hábitos", "tiny-habits", "conducta", "stanford-behavioral"]
      },
      {
        id: "psi-014",
        title: "Evaluación Experimental de Efectividad de Intervenciones (A/B Testing Conductual)",
        desc: "Diseña experimentos controlados aleatorizados para verificar científicamente el cambio de comportamiento real.",
        model: "DeepSeek V4",
        prompt: `Eres un Cientifico de Datos Conductual y Metodologo de Ensayos Controlados Aleatorizados (RCTs).
[COPIA AQUI TU IDEA]

Disena el protocolo de evaluacion experimental para medir el impacto real de la intervencion conductual:
1. Formulacion de hipotesis nula (H0) e hipotesis alternativa (H1) directas y falsables.
2. Definicion de la variable dependiente de resultado principal (medicion de comportamiento observable, no meras intenciones autodeclaradas).
3. Diseno de grupos experimentales: Grupo de Control (experiencia basal sin intervencion) vs Grupo Variante A (nudge visual) vs Grupo Variante B (nudge social).
4. Calculo del tamano muestral minimo requerido (Power Analysis) para detectar un tamano de efecto minimo relevante con potencia 1-beta = 0.80 y alpha = 0.05.
5. Analisis estadistico de diferencias: prueba t de Student, ANOVA o regresion logistica con control de variables confusoras (edad, engagement previo).
6. Evaluacion del efecto desgaste a medio plazo: comprobar si el cambio de comportamiento persiste tras 30 y 60 dias o sufre extincion.

Restricciones:
- Respeta los principios eticos de experimentacion con humanos (consentimiento informado y no generacion de perjuicios).

Formato de salida: Protocolo de investigacion conductual en Markdown con tablas de diseno experimental y formulas estadisticas.`,
        tags: ["ab-testing", "ensayo-controlado", "estadística-conductual", "metodología", "rct"]
      },
      {
        id: "psi-015",
        title: "Auditoría Ética de Nudges para Prevenir Patrones Oscuros (Sludge / Dark Patterns)",
        desc: "Audita sistemas interactivos identificando manipulaciones coercitivas, fricciones maliciosas y trampas de suscripción.",
        model: "GPT-4o",
        prompt: `Eres un Auditor de Etica Digital y Defensor de los Derechos del Consumidor de Interfaces.
[COPIA AQUI TU IDEA]

Audita el flujo de diseno identificando y eliminando patrones oscuros (Dark Patterns) y fricciones maliciosas (Sludge):
1. Deteccion de 'Roach Motel' (Facil entrar, imposible salir): procesos donde suscribirse toma 1 clic pero cancelar requiere llamadas telefonicas o 6 pasos laberinticos.
2. Deteccion de 'Confirmshaming': redactar los botones de rechazo apelando a la culpa o verguenza del usuario (ej: 'No, gracias, prefiero perder dinero').
3. Deteccion de 'Misdirection' y Asimetria Visual: resaltar el boton comercial con colores vivos y ocultar la alternativa libre en texto gris casi invisible.
4. Deteccion de 'Sneak into Basket': marcar casillas por defecto que anaden costes o servicios no solicitados expresamente.
5. Reescritura etica: transformacion de cada patron oscuro detectado en una eleccion limpia, transparente y simetrica.

Restricciones:
- Ajusta la auditoria a las directrices del Comite Europeo de Proteccion de Datos (EDPB) sobre Dark Patterns en redes sociales y servicios web.

Formato de salida: Informe de auditoria de patrones oscuros en tabla Markdown con evaluacion de legalidad y propuestas de diseno etico.`,
        tags: ["dark-patterns", "sludge", "ética-digital", "edpb", "derechos-usuario"]
      },
      {
        id: "psi-042",
        title: "Diseño de Nudges Conductuales Basados en la Teoría de Thaler y Sunstein para Hábitos Digitales",
        desc: "Crea empujoncitos sutiles en la arquitectura de decisión que fomentan desconexión saludable y foco sin prohibiciones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Economista Conductual y Diseñador de Arquitecturas de Decisión Éticas (Nudge Designer).
[COPIA AQUI TU IDEA]

Disena un catalogo de microintervenciones conductuales (Nudges) conforme al marco EAST (Easy, Attractive, Social, Timely) de Thaler y Sunstein:
1. Nudge de friccion positiva para desconexion digital: introduccion de un retardo consciente de 5 segundos antes de abrir aplicaciones de comunicacion fuera de horario laboral con la pregunta '¿Deseas atender esto manana a primera hora?'.
2. Opcion por defecto saludable (Default Setting): configuracion inicial de herramientas de mensajeria con notificaciones desactivadas por defecto a partir de las 19:00h.
3. Diseno de recordatorios en el momento oportuno (Timely Prompts): alertas sutiles de descanso justo al concluir una reunion de 50 minutos.
4. Normas sociales descriptivas eticas (Social Proof): comunicar estadisticas positivas agregadas (ej: 'El 85% de tu organizacion programa correos para horario de oficina').
5. Evaluacion del caracter libertario del paternalismo: asegurar que el usuario mantenga siempre la libertad incondicional de saltarse el nudge en un solo clic.

Restricciones:
- No utilices patrones oscuros de culpabilizacion; el nudge debe orientarse al bienestar genuino y la autonomia del usuario.

Formato de salida: Matriz de diseno de nudges en tabla Markdown con definicion de gatillo, sesgo cognitivo aprovechado, mecanismo y metrica de exito.`,
        tags: ["nudges", "economía-conductual", "thaler-sunstein", "arquitectura-decisión", "hábitos", "east"]
      },
      {
        id: "psi-043",
        title: "Modelado de Bucles de Hábito (Cue, Routine, Reward) según el Modelo Fogg (B=MAP)",
        desc: "Estructura la adquisición de rutinas profesionales de foco profundo analizando Motivación, Habilidad y Disparador.",
        model: "DeepSeek V4",
        prompt: `Eres un Científico del Comportamiento y Modelador de Hábitos según el Stanford Behavior Design Lab de BJ Fogg.
[COPIA AQUI TU IDEA]

Implementa el diseno sistematico de habitos profesionales sostenibles mediante la formula B = MAP (Behavior = Motivation x Ability x Prompt):
1. Calibracion de los tres elementos cardinales del modelo de Fogg:
   - Motivacion (M): conexion con aspiraciones profesionales intrinsecas en lugar de premios externos efimeros.
   - Habilidad (A - Simplicidad): reduccion del comportamiento deseado a una accion 'diminuta' (Tiny Habit) que requiera menos de 2 minutos y minimo esfuerzo inicial (ej: escribir una sola linea de resumen al acabar una tarea).
   - Disparador / Senal (P - Prompt): anclaje obligatorio a una rutina preexistente consolidada ('Despues de tomarme el primer cafe de la manana, abrire el planificador diario').
2. Bucle de retroalimentacion de recompensa inmediata: diseno de celebracion cognitiva instantanea para cablear el refuerzo neurobiologico positivo.
3. Estrategia de escalado progresivo: como incrementar la dificultad del habito unicamente cuando la rutina basica se ejecute de forma automatica durante 14 dias seguidos.
4. Resolucion de rupturas de habito: analisis de si el fallo provino de falta de disparador visible, complejidad excesiva de la accion o caida de motivacion.
5. Exportacion de la tarjeta de habito en formato estructurado para seguimiento diario.

Restricciones:
- Evita pretender cambios de comportamiento radicales que dependan exclusivamente de fuerza de voluntad heroica.

Formato de salida: Modulo de Python 'habit_loop_engine.py' con registro de seguimiento de habitos y diagnostico de friccion B=MAP.`,
        tags: ["fogg-model", "hábitos", "bj-fogg", "conducta", "b=map", "tiny-habits", "productividad"]
      },
      {
        id: "psi-044",
        title: "Intervenciones Breves de Reencuadre Cognitivo ante Errores Críticos en Entornos Ágiles",
        desc: "Guía el procesamiento emocional tras caídas de producción o incidentes graves para evitar parálisis y culpas.",
        model: "GPT-4o",
        prompt: `Eres un Facilitador de Resiliencia de Equipos de Ingeniería y Especialista en Postmortems Sin Culpa (Blameless Postmortems).
[COPIA AQUI TU IDEA]

Desarrolla el protocolo de intervencion psicologica breve de reencuadre cognitivo ante fallos operativos graves (ej: outage de servidor o brecha de seguridad):
1. Fase de contencion y desescalada emocional inmediata: tecnicas breves de regulacion del sistema nervioso simpatico (respiracion fisiologica de doble inhalacion) para reducir el cortisol agudo.
2. Neutralizacion de la autoinculpacion destructiva: separacion estricta entre el profesional como individuo integro vs el fallo de diseno del sistema que permitio el error.
3. Aplicacion del principio fundamental de la ingenieria de resiliencia: 'Las personas operan con la mejor intencion segun la informacion y herramientas que tenian en ese instante'.
4. Reencuadre socrático de la experiencia: transformar la vivencia traumatica en conocimiento de alto valor organizacional sobre la fragilidad oculta de la infraestructura.
5. Transicion guiada hacia la investigacion tecnica objetiva: pautas para participar en la reunion de postmortem con serenidad y mentalidad de mejora sistemica.

Restricciones:
- Excluye del protocolo cualquier dinamica que diluya la responsabilidad profesional exigible o que promueva la complacencia ante negligencias.

Formato de salida: Protocolo de actuacion para lideres tecnicos en Markdown con guia de facilitacion para las primeras 2 horas post-incidente.`,
        tags: ["reencuadre-cognitivo", "postmortem-sin-culpa", "resiliencia", "incidentes-críticos", "agile", "devops"]
      }
    ]
  },
  {
    id: "dinamicas-grupo",
    name: "Simulador de Dinámicas de Grupo / Sinergia (P1.3)",
    prompts: [
      {
        id: "psi-016",
        title: "Modelado y Balanceo de Roles de Equipo según la Metodología Belbin",
        desc: "Analiza perfiles de trabajo clasificando roles mentales, sociales y de acción para optimizar la sinergia de equipo.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor de Desarrollo Organizacional y Facilitador Acreditado en Roles de Equipo Belbin.
[COPIA AQUI TU IDEA]

Modela y optimiza la composicion del equipo de trabajo mediante el marco de los 9 Roles de Belbin:
1. Clasificacion de roles de los integrantes:
   - Roles Mentales: Cerebro (Creativo / Innovador), Monitor Evaluador (Analitico / Critico), Especialista.
   - Roles Sociales: Coordinador (Liderazgo / Delegador), Investigador de Recursos (Extrovertido / Oportunidades), Cohesionador (Empatico / Pacificador).
   - Roles de Accion: Impulsor (Energico / Orientado a retos), Implementador (Disciplinado / Eficiente), Finalizador (Detallista / Perfeccionista).
2. Diagnostico del equilibrio de equipo: identificacion de roles dominantes compartidos y vacios criticos (ej: equipo con 4 Cerebros y ningun Finalizador).
3. Prediccion de fricciones potenciales entre roles opuestos (ej: roces entre el Impulsor urgente y el Monitor Evaluador prudente).
4. Asignacion estrategica de responsabilidades segun las fortalezas naturales de cada rol.
5. Plan de contingencia para mitigar las debilidades permitidas de cada integrante.

Restricciones:
- Evita etiquetar a las personas de forma estatica; considera los roles como patrones de conducta adaptables al contexto.

Formato de salida: Informe de diagnostico de roles Belbin en Markdown con mapa de complementariedad y recomendaciones de liderazgo.`,
        tags: ["belbin", "roles-equipo", "dinámicas-grupo", "sinergia", "liderazgo"]
      },
      {
        id: "psi-017",
        title: "Resolución de Conflictos Interpersonales mediante el Modelo Thomas-Kilmann",
        desc: "Evalúa situaciones de tensión en el trabajo mapeando conductas entre asertividad y cooperación (TKI).",
        model: "DeepSeek V4",
        prompt: `Eres un Mediador Organizacional y Experto en Gestion de Conflictos (Instrumento Thomas-Kilmann - TKI).
[COPIA AQUI TU IDEA]

Analiza el conflicto interpersonal en el equipo y determina la estrategia optima de resolucion:
1. Mapeo de la conducta de las partes en dos ejes: Asertividad (foco en defender los propios intereses) vs Cooperacion (foco en atender los intereses del otro).
2. Evaluacion de los 5 modos de afrontamiento del conflicto:
   - Competir (Alta asertividad / Baja cooperacion): util en emergencias que exigen accion decisiva inmediata.
   - Colaborar (Alta asertividad / Alta cooperacion): integracion profunda de ambas perspectivas para encontrar una solucion ganar-ganar.
   - Comprometerse (Nivel medio en ambos ejes): reparto equitativo de concesiones cuando el tiempo apremia.
   - Evitar (Baja asertividad / Baja cooperacion): posponer la discusion hasta que las emociones se enfrien.
   - Acomodarse (Baja asertividad / Alta cooperacion): ceder para preservar la relacion a largo plazo.
3. Identificacion del modo disfuncional que origino el bloqueo actual.
4. Guion de mediacion estructurado paso a paso para sentar a las partes y negociar desde los intereses de fondo y no desde posiciones rigidas.

Restricciones:
- No busques culpables personales; centra el analisis en la dinamica sistémica y la incompatibilidad de objetivos.

Formato de salida: Protocolo de mediacion de conflictos en Markdown con guion de conversacion y acuerdos de seguimiento.`,
        tags: ["thomas-kilmann", "conflictos", "mediación", "negociación", "tki"]
      },
      {
        id: "psi-018",
        title: "Dinámicas y Entrenamiento en Comunicación Asertiva y Feedback Constructivo",
        desc: "Modela sesiones de retroalimentación utilizando el marco SBI (Situation-Behavior-Impact) y técnica del sándwich.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Coach de Liderazgo y Especialista en Comunicacion Asertiva en el Entorno Laboral.
[COPIA AQUI TU IDEA]

Disena la estructura para una conversacion de feedback constructivo utilizando el modelo SBI (Situacion - Comportamiento - Impacto):
1. Paso 1 - Situacion (S): acotar el contexto espacial y temporal exacto del hecho sin generalizaciones difusas (ej: 'El martes pasado en la reunion con el cliente...').
2. Paso 2 - Comportamiento (B): describir la accion concreta observable de forma neutral y factica, sin adjetivos descalificativos ni juicios sobre la personalidad (ej: 'interrumpiste la presentacion antes de que terminara...').
3. Paso 3 - Impacto (I): explicar con honestidad y vulnerabilidad las consecuencias reales que ese comportamiento produjo en el equipo, el proyecto o la relacion.
4. Paso 4 - Pausa y Escucha Activa: preguntar a la otra persona por su punto de vista y escuchar con genuina apertura sin interrumpir.
5. Paso 5 - Construccion conjunta de compromisos futuros verificables.

Restricciones:
- Elimina terminantemente el uso de acusaciones absolutistas como 'siempre haces lo mismo' o 'nunca te comprometes'.

Formato de salida: Guion practico de feedback en Markdown con dialogos simulados y tabla de pautas asertivas.`,
        tags: ["feedback-sbi", "comunicación-asertiva", "liderazgo", "equipos", "sinergia"]
      },
      {
        id: "psi-019",
        title: "Simulación de Fases de Madurez y Cohesión de Equipos según Tuckman",
        desc: "Diagnostica la etapa evolutiva del grupo (Forming, Storming, Norming, Performing) adaptando el estilo de liderazgo.",
        model: "GPT-4o",
        prompt: `Eres un Psicologo Social y Facilitador de Equipos de Alto Rendimiento (Modelo de Bruce Tuckman).
[COPIA AQUI TU IDEA]

Diagnostica la fase de desarrollo en la que se encuentra el equipo y define las intervenciones necesarias:
1. Evaluacion de indicadores de la etapa actual:
   - Fase 1: Formacion (Forming): educacion inicial, alta incertidumbre, necesidad de direccion clara y definicion de objetivos.
   - Fase 2: Conflicto (Storming): pugnas de poder, resistencia a los limites, friccion entre personalidades y cuestionamiento de liderazgos.
   - Fase 3: Normalizacion (Norming): establecimiento de reglas del juego consensuadas, cooperacion naciente, lenguaje comun y sentido de identidad.
   - Fase 4: Desempeno (Performing): autonomia operativa, alta confianza mutua, resolucion fluida de problemas y foco en resultados excelentes.
   - Fase 5: Disolucion (Adjourning): celebracion de logros y cierre de ciclo.
2. Identificacion de bloqueos que impiden evolucionar a la siguiente fase.
3. Recomendacion de estilo de liderazgo situacional correspondiente (Directivo, Entrenador, Facilitador o Delegador).
4. Diseno de una dinamica grupal practica para acelerar la consolidacion de la etapa deseada.

Restricciones:
- Documenta que la etapa de conflicto (Storming) es necesaria y saludable para la maduracion del grupo, no una patologia a reprimir.

Formato de salida: Plan de acompanamiento evolutivo del equipo en Markdown con mapa de diagnostico y dinamicas sugeridas.`,
        tags: ["tuckman", "forming-storming", "cohesión-equipo", "madurez-grupal", "liderazgo-situacional"]
      },
      {
        id: "psi-045",
        title: "Evaluación y Balance de Roles de Equipo Belbin en Células de Desarrollo de Software",
        desc: "Analiza perfiles de personalidad laboral para equilibrar roles de acción, mentales y sociales en squads de ingeniería.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor de Dinámica de Equipos de Alto Rendimiento y Analista Certificado en Roles Belbin.
[COPIA AQUI TU IDEA]

Crea el evaluador y optimizador de composicion de equipos de ingenieria basado en la metodologia de los 9 Roles de Equipo de Belbin:
1. Identificacion de roles dominantes y secundarios en los miembros del equipo:
   - Roles Mentales: Cerebro (Innovador iconoclasta), Monitor Evaluador (Critico analitico), Especialista (Dominio tecnico profundo).
   - Roles de Accion: Impulsor (Motor de presion y energia), Implementador (Disciplina practica y organizacion), Finalizador (Obsesion por el detalle y calidad).
   - Roles Sociales: Coordinador (Clarificador de metas y delegador), Cohesionador (Diplomatico y pacificador), Investigador de Recursos (Explorador de contactos externos).
2. Diagnostico de desequilibrios criticos de equipo:
   - Exceso de Cerebros sin Implementadores: proliferacion de ideas geniales sin ninguna entrega tangible a produccion.
   - Exceso de Impulsores sin Cohesionadores: tension interpersonal elevada, conflicto constante y riesgo de desgaste emocional.
   - Ausencia de Monitor Evaluador: toma de decisiones impulsiva sin analisis riguroso de riesgos.
3. Matriz de complementariedad: recomendaciones de asignacion de tareas segun fortalezas naturales de rol y debilidades permitidas.
4. Pautas para reuniones de equipo eficaces aprovechando la diversidad de perspectivas.

Restricciones:
- No utilices la evaluacion de roles como herramienta de etiquetado rigido o discriminacion laboral; los roles son dinamicos y situacionales.

Formato de salida: Modulo en Python 'belbin_team_balancer.py' con analisis de gaps de equipo y recomendaciones en tabla Markdown.`,
        tags: ["belbin", "roles-de-equipo", "dinámica-grupal", "alto-rendimiento", "squads", "organización"]
      },
      {
        id: "psi-046",
        title: "Diseño de Retrospectivas Tácticas para Equipos Remotos Asíncronos",
        desc: "Estructura dinámicas participativas anónimas que evitan el pensamiento de grupo (Groupthink) y el sesgo de autoridad.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Agile Coach Senior y Especialista en Facilitación de Dinámicas Grupales Asíncronas.
[COPIA AQUI TU IDEA]

Disena la infraestructura para ceremonias de retrospectiva tactica en equipos totalmente remotos distribuidos en diferentes zonas horarias:
1. Mecanismo de aportacion inicial silenciosa y anonima: recopilacion de observaciones en tablero digital durante una ventana de 24 horas antes de la discusion publica para mitigar el sesgo del primero en hablar (Anchoring) y el sesgo de conformidad con el jefe (HiPPO Effect).
2. Estructura formal de la dinamica (ej: 'Estrella de Mar' - Seguir haciendo, Hacer mas, Hacer menos, Empezar a hacer, Dejar de hacer).
3. Agrupacion semantica automatizada de temas afines para sintetizar preocupaciones compartidas sin redundancias.
4. Votacion ponderada por puntos (Dot Voting) anonima para priorizar los 2 temas cardinales de mayor impacto sobre los que enfocar la atencion.
5. Definicion obligatoria de Acciones SMART con responsable individual asignado y fecha limite de revision en el siguiente sprint.

Restricciones:
- Asegura que el entorno digital garantice el anonimato tecnico para que los desarrolladores junior puedan senalar problemas sin temor a represalias.

Formato de salida: Plantilla estructurada en Markdown con cronograma de facilitacion asincrona de 3 dias y matriz de acciones acordadas.`,
        tags: ["retrospectivas", "agile", "asíncrono", "remoto", "groupthink", "facilitación", "scrum"]
      }
    ]
  },
  {
    id: "carga-cognitiva",
    name: "Analizador de Carga Cognitiva y Fatiga Mental / Balance (P1.4)",
    prompts: [
      {
        id: "psi-020",
        title: "Evaluación de Carga de Trabajo Multidimensional mediante Escala NASA-TLX",
        desc: "Mide la carga mental, física, temporal, rendimiento, esfuerzo y frustración en tareas de alta concentración.",
        model: "DeepSeek V4",
        prompt: `Eres un Ergonomo Cognitivo y Evaluador de Factores Humanos en Puestos de Trabajo Digitales.
[COPIA AQUI TU IDEA]

Aplica la metodologia formal del NASA Task Load Index (NASA-TLX) para evaluar la carga de trabajo mental del usuario:
1. Desglose y definicion de las 6 dimensiones subjetivas:
   - Exigencia Mental: cuanta actividad mental y perceptiva se requirio (pensar, calcular, recordar).
   - Exigencia Fisica: cuanta actividad fisica fue necesaria.
   - Exigencia Temporal: cuanta presion de tiempo o ritmo acelerado se experimento.
   - Rendimiento Propio: que tan satisfecho se encuentra con el exito obtenido en la tarea.
   - Esfuerzo Global: que tan duro tuvo que trabajar mental o fisicamente para mantener el nivel.
   - Nivel de Frustracion: que tan inseguro, desanimado, irritado o estresado se sintio.
2. Fase de Ponderacion por pares (Weighting Phase): comparaciones cruzadas para determinar que dimensiones pesan mas en el contexto especifico.
3. Calculo del Indice Global de Carga de Trabajo ponderado (Weighted Workload Score de 0 a 100).
4. Interpretacion diagnostica del score obtenido: categorizacion del riesgo de fatiga mental (Bajo < 30, Moderado 30-60, Critico > 60).
5. Propuesta de rediseño de tareas para aliviar las dimensiones causantes de la sobrecarga.

Restricciones:
- Sigue escrupulosamente el protocolo estandarizado de la NASA sin alterar las definiciones oficiales de las subescalas.

Formato de salida: Cuestionario tabular en Markdown, algoritmo de calculo en Python y reporte diagnostico de carga mental.`,
        tags: ["nasa-tlx", "carga-mental", "ergonomía-cognitiva", "fatiga", "factores-humanos"]
      },
      {
        id: "psi-021",
        title: "Detección Temprana de Señales de Fatiga Cognitiva y Sobrecarga Laboral",
        desc: "Identifica indicadores de agotamiento, despersonalización y baja realización personal según el modelo de Maslach (MBI).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Psicologo del Trabajo y Especialista en Salud Ocupacional y Prevencion del Burnout.
[COPIA AQUI TU IDEA]

Analiza las senales sutiles de sobrecarga para prevenir el desarrollo del sindrome de agotamiento profesional (Burnout):
1. Evaluacion de las 3 dimensiones del Maslach Burnout Inventory (MBI):
   - Agotamiento Emocional: sensacion de vaciamiento de recursos energeticos internos y cansancio que no se repara con el descanso del fin de semana.
   - Despersonalizacion / Cinismo: distanciamiento afectivo, actitud fria o apatica hacia las personas con las que se interactua.
   - Baja Realizacion Personal: percepcion de ineficacia, sensacion de que el propio trabajo carece de sentido o utilidad.
2. Deteccion de alteraciones cognitivas asociadas a la fatiga: perdida de atencion sostenida, lapsus de memoria de trabajo, mayor tasa de errores en tareas rutinarias y dificultad para tomar decisiones.
3. Analisis de factores organizacionales estresores: sobrecarga cuantitativa, falta de autonomia, ambiguedad de rol o desequilibrio entre esfuerzo y recompensa.
4. Plan de intervencion preventiva inmediata: limites claros a la hiperconectividad y redimensionamiento de compromisos laborales.

Restricciones:
- Enfatiza que el burnout es un fenomeno ocupacional derivado del entorno laboral, no una debilidad o fallo personal del individuo.

Formato de salida: Informe de evaluacion de riesgo psicosocial en Markdown con semaforo de alertas y medidas preventivas urgentes.`,
        tags: ["burnout", "maslach", "agotamiento", "fatiga-cognitiva", "salud-laboral"]
      },
      {
        id: "psi-022",
        title: "Programación Adaptativa de Micro-Pausas y Descansos (Técnica Pomodoro)",
        desc: "Estructura ritmos de trabajo basados en ciclos ultradianos (90 minutos) y descansos activos para restaurar la vigilia.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Especialista en Cronobiologia y Ritmos Ultradianos del Rendimiento Humano.
[COPIA AQUI TU IDEA]

Disena el protocolo de micro-pausas y descanso activo adaptado a la jornada de concentracion mental:
1. Fundamentacion en los Ritmos Ultradianos Basicos de Reposo y Actividad (BRAC de Nathaniel Kleitman): ciclos naturales de 90 minutos de maxima alerta seguidos de una ventana de 15-20 minutos de declive energetico.
2. Adaptacion de la Tecnica Pomodoro segun la complejidad de la tarea:
   - Tareas operativas/mecanicas: bloques de 25 min de foco + 5 min de descanso.
   - Trabajo profundo creativo/analitico: bloques extendidos de 50 min de foco + 10 min de descanso activo.
3. Prescripcion de 'Descansos Reales' vs 'Falsos Descansos': prohibicion de usar las pausas para consultar pantallas o redes sociales (que siguen saturando la corteza prefrontal).
4. Catalogo de actividades de descanso activo: estiramientos fisicos suaves, hidratacion consciente, mirar hacia el horizonte distante para relajar la acomodacion ocular (regla 20-20-20) y respiracion pausada.
5. Algoritmo adaptativo: si el usuario comete errores crecientes o detecta fatiga, sugerir automaticamente acortar el siguiente bloque.

Restricciones:
- Diseña el protocolo para que sea respetuoso con la concentracion profunda (no interrumpir bruscamente si la persona esta en estado de Flow comprobado).

Formato de salida: Planificador de jornada en Markdown con temporizadores recomendados y guia de pausas activas.`,
        tags: ["pomodoro-adaptativo", "ritmos-ultradianos", "descanso-activo", "flow", "atención"]
      },
      {
        id: "psi-023",
        title: "Estrategias de Desconexión Digital y Restauración de la Atención (Teoría ART)",
        desc: "Aplica la Attention Restoration Theory (Kaplan) mediante contacto con la naturaleza y desintoxicación de pantallas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Psicologo Ambiental e Investigador en Restauracion Cognitiva y Desconexion Digital.
[COPIA AQUI TU IDEA]

Desarrolla el plan de restauracion cognitiva basado en la Teoria de la Restauracion de la Atencion (ART - Kaplan & Kaplan):
1. Diferenciacion entre Atencion Dirigida (recurso finito y agotable que consume la concentracion laboral) y Fascinacion Involuntaria (atencion sin esfuerzo que permite la recuperacion cerebral).
2. Los 4 componentes de un entorno restaurador segun la teoria ART:
   - Alejarse (Being Away): distancia psicologica y fisica de las demandas y presiones habituales.
   - Extension (Extent): sensacion de incursion en un entorno rico, coherente y espacioso.
   - Fascinacion (Fascination): estimulos naturales suaves (viento en las hojas, olas del mar, nubes) que capturan la atencion sin demandar juicio analitico.
   - Compatibilidad (Compatibility): concordancia entre los objetivos personales y lo que el entorno ofrece.
3. Estrategia de Higiene Digital: establecimiento de 'zonas libres de tecnologia' en el hogar y apagado programado de notificaciones laborales a partir de una hora fija.
4. Prescripcion de 'Micro-dosis de naturaleza' diarias (caminata consciente de 20 minutos por parques o zonas verdes sin auriculares).

Restricciones:
- Proporciona alternativas realistas para personas que viven en entornos urbanos densos sin facil acceso a grandes parajes naturales.

Formato de salida: Protocolo de restauracion de la atencion en Markdown con habitos semanales y pautas de higiene digital.`,
        tags: ["art", "restauración-atención", "desconexión-digital", "kaplan", "naturaleza"]
      },
      {
        id: "psi-047",
        title: "Medición Psicométrica de la Carga Mental de Trabajo con NASA-TLX Ponderado",
        desc: "Calcula el índice multidimensional de exigencia mental, temporal, física, esfuerzo, rendimiento y frustración.",
        model: "DeepSeek V4",
        prompt: `Eres un Ergónomo Cognitivo e Investigador de Factores Humanos en Sistemas Complejos.
[COPIA AQUI TU IDEA]

Implementa la escala de evaluacion de carga mental de trabajo NASA-TLX (Task Load Index) conforme al estandar original de Hart y Staveland:
1. Evaluacion de las 6 subescalas en escala continua de 0 a 100:
   - Exigencia Mental: esfuerzo intelectual, memoria y atencion requerida.
   - Exigencia Fisica: esfuerzo corporal o motriz demandado por la tarea.
   - Exigencia Temporal: sensacion de prisa o presion de tiempo experimentada.
   - Rendimiento Propio: satisfaccion con el nivel de exito alcanzado en la meta.
   - Esfuerzo: trabajo global invertido para lograr el nivel de desempeno.
   - Nivel de Frustracion: sensacion de inseguridad, desanimo, estres o enojo.
2. Fase de comparacion por pares (Ponderacion): presentacion de los 15 pares posibles entre las 6 dimensiones para que el usuario elija cual influyo mas en su fatiga, derivando los pesos especificos w_i.
3. Calculo del indice ponderado global NASA-TLX: Score = Suma(w_i * Subescala_i) / 15.
4. Comparativa de carga cognitiva entre diferentes herramientas de software o procedimientos operativos.
5. Deteccion de umbrales criticos de sobrecarga mental (Score > 65) asociados a un incremento exponencial en la tasa de errores operativos.

Restricciones:
- Conserva la orientacion inversa de la subescala de Rendimiento para que una peor percepcion de exito penalice adecuadamente la puntuacion final.

Formato de salida: Modulo de Python 'nasa_tlx_calculator.py' con funciones de captura de respuestas, calculo ponderado y graficos radiales en Plotly.`,
        tags: ["nasa-tlx", "ergonomía-cognitiva", "carga-mental", "factores-humanos", "psicometría", "usabilidad"]
      },
      {
        id: "psi-048",
        title: "Protocolos de Pausas Activas y Prevención de Fatiga Decisional en Jornadas Extensas",
        desc: "Modela el agotamiento del autocontrol según el modelo de fuerza del ego y programa micro-descansos restaurativos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Fisiólogo del Trabajo y Neurocientífico Especialista en Ritmos Ultradianos y Fatiga Mental.
[COPIA AQUI TU IDEA]

Desarrolla el protocolo ergonomico de pausas activas y recuperacion cognitiva para profesionales con alta demanda intelectual:
1. Modelado de los ciclos ultradianos basicos de descanso y actividad (BRAC de Kleitman): alternancia natural de 90 minutos de foco maximo seguidos de 15 a 20 minutos de disminucion de la alerta cortical.
2. Diseno de micro-pausas (Micro-Breaks de 2-3 minutos cada 30 minutos): ejercicios de acomodacion visual para fatiga de pantalla (Regla 20-20-20: mirar a 20 pies durante 20 segundos) y estiramientos cervicales especificos.
3. Intervenciones de Restauracion Atencional basadas en la Teoria de Restauracion de la Atencion (ART de Kaplan): estimulacion suave con elementos naturales pasivos que permiten el reposo de la atencion dirigida voluntaria.
4. Prevencion de la Fatiga Decisional: reglas para programar decisiones estrategicas complejas antes del mediodia, reservando tareas administrativas o mecanicas para tramos horarios de energia baja.
5. Medicion de la recuperacion subjetiva de energia antes y despues del descanso mediante escalas visuales analogicas breves.

Restricciones:
- No plantees pausas activas que consistan en revisar redes sociales o correo electronico, ya que mantienen activa la carga cognitiva ejecutiva.

Formato de salida: Guia de protocolos de recuperacion en Markdown con calendario diario recomendado y catalogo de micro-pausas guiadas.`,
        tags: ["fatiga-decisional", "pausas-activas", "ritmos-ultradianos", "ergonomía", "neurociencia", "atención"]
      },
      {
        id: "psi-049",
        title: "Evaluación de Carga de Atención Dividida en Entornos con Notificaciones Multicanal",
        desc: "Cuantifica el coste en productividad del cambio continuo de contexto (Attention Residue) en entornos Slack/Teams.",
        model: "GPT-4o",
        prompt: `Eres un Investigador de Productividad del Conocimiento y Neurociencia de la Atención según Gloria Mark y Cal Newport.
[COPIA AQUI TU IDEA]

Construye la herramienta analitica para cuantificar el impacto del Residuo Atencional (Attention Residue) y las interrupciones en el trabajo del conocimiento:
1. Cuantificacion del tiempo de recuperacion del foco: calculo del coste medio de reingreso al estado de flujo tras una interrupcion externa (estimado empiricamente en 23 minutos y 15 segundos segun estudios universitarios).
2. Calculo del indice de fragmentacion de la jornada laboral: division del tiempo de trabajo en bloques ininterrumpidos vs micro-fragmentos de menos de 10 minutos provocados por chats y correos.
3. Medidor del coste de conmutacion de tareas (Task Switching Cost): estimacion de la perdida de velocidad de procesamiento y aumento de la probabilidad de cometer fallos criticos al alternar entre programacion y respuesta inmediata a mensajes.
4. Propuesta de arquitectura de comunicacion por lotes (Batching Protocol): sustitucion de la expectativa de inmediatez sincrona por ventanas dedicadas de sincronizacion dos veces al dia.
5. Panel visual de salud atencional con diagnostico de 'dias troceados' para directores de equipo.

Restricciones:
- Fundamenta cuantitativamente las metricas de residuo atencional citando los papers de Leroy y Mark.

Formato de salida: Modulo de Python 'attention_residue_calculator.py' con analisis de logs de actividad y reporte ejecutivo de coste economico.`,
        tags: ["residuo-atencional", "atención-dividida", "notificaciones", "deep-work", "interrupciones", "productividad"]
      }
    ]
  },
  {
    id: "clima-laboral",
    name: "Evaluador de Clima Laboral y Seguridad Psicológica / Pulso (P1.5)",
    prompts: [
      {
        id: "psi-024",
        title: "Medición de Seguridad Psicológica en Equipos según el Modelo de Amy Edmondson",
        desc: "Evalúa si los miembros del equipo sienten que es seguro asumir riesgos interpersonales, admitir errores y hacer preguntas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor Senior en Cultura Organizacional y Seguridad Psicologica (Marco de la Dra. Amy Edmondson de Harvard).
[COPIA AQUI TU IDEA]

Evalua el nivel de Seguridad Psicologica (Psychological Safety) en el equipo de trabajo:
1. Aplicacion de los 7 reactivos estandarizados de Edmondson:
   - 'Si cometes un error en este equipo, a menudo se usa en tu contra' (puntuacion inversa).
   - 'Los miembros del equipo son capaces de plantear problemas y cuestiones dificiles'.
   - 'La gente en este equipo a veces rechaza a otros por ser diferentes' (puntuacion inversa).
   - 'Es seguro asumir riesgos en este equipo'.
   - 'Es dificil pedir ayuda a otros miembros del equipo' (puntuacion inversa).
   - 'Nadie en el equipo actuaria deliberadamente para socavar mis esfuerzos'.
   - 'Al trabajar con los miembros de este equipo, mis habilidades unicas son valoradas y utilizadas'.
2. Analisis de los 4 niveles de madurez de seguridad psicologica (Timothy Clark): Seguridad de Inclusion, Seguridad de Aprendizaje, Seguridad de Contribucion y Seguridad de Desafio.
3. Identificacion de conductas toxicas inhibidoras: miedo al ridiculo, castigo al mensajero o silencio forzado ante malas noticias.
4. Recomendaciones practicas para los lideres: modelar la vulnerabilidad propia, enmarcar el trabajo como un desafio de aprendizaje conjunto y responder a los errores con curiosidad indagatoria en lugar de culpa.

Restricciones:
- Asegura la absoluta confidencialidad agregada de las respuestas para evitar represalias internas.

Formato de salida: Cuestionario de diagnostico en Markdown con rubrica de puntuacion e informe de intervencion cultural.`,
        tags: ["seguridad-psicológica", "edmondson", "cultura-equipo", "vulnerabilidad", "harvard"]
      },
      {
        id: "psi-025",
        title: "Diseño y Despliegue de Encuestas de Pulso Anónimas de Alta Frecuencia",
        desc: "Crea micro-encuestas semanales de 3 preguntas que capturan el estado de ánimo y clima sin fatiga de respuesta.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Analitica de Personas (People Analytics) y Medicion de Clima Organizacional.
[COPIA AQUI TU IDEA]

Disena el sistema de encuestas de pulso frecuentes y anonimas (Pulse Surveys) para la organizacion:
1. Arquitectura de minima friccion: cuestionario ultra-corto de maximo 3 preguntas que se responde en menos de 60 segundos desde la interfaz de trabajo (Slack, Teams o web).
2. Estructura fija de las 3 preguntas semanales:
   - Pregunta 1 (Termometro de animo): escala visual Likert del 1 al 5 sobre energia y satisfaccion general durante la semana.
   - Pregunta 2 (Factor focal rotativo): una dimension especifica que rota semanalmente (claridad de objetivos, carga de trabajo, apoyo de companeros, reconocimiento).
   - Pregunta 3 (Pregunta abierta cualitativa opcional): '¿Que obstaculo podriamos eliminar para facilitarte la proxima semana?'.
3. Garantia criptografica de anonimato: agregacion de datos con umbral minimo de privacidad diferencial (no mostrar resultados de departamentos con menos de 5 respuestas).
4. Cuadro de mando en tiempo real con evolucion temporal de tendencias y alertas tempranas ante caidas bruscas de motivacion.

Restricciones:
- Diseña el ciclo para que la direccion comparta los resultados y las acciones correctivas con el equipo en un plazo maximo de 72 horas (evitar sensacion de 'agujero negro').

Formato de salida: Especificacion de preguntas en Markdown y diseno del flujo de notificacion y panel de metricas.`,
        tags: ["pulse-surveys", "people-analytics", "clima-laboral", "anonimato", "métricas-rrhh"]
      },
      {
        id: "psi-026",
        title: "Plan de Acción Organizacional para la Mejora Continua del Clima Laboral",
        desc: "Traduce los resultados cuantitativos de clima en planes de acción concretos con responsables y fechas límite.",
        model: "GPT-4o",
        prompt: `Eres un Director de Recursos Humanos y Facilitador de Cambio Cultural Organizacional.
[COPIA AQUI TU IDEA]

A partir de los resultados de la evaluacion de clima laboral, elabora el Plan de Accion Operativo:
1. Diagnostico de focos rojos: seleccion de las 2 areas con peor calificacion o mayor deterioro respecto al trimestre anterior.
2. Sesiones de indagacion colaborativa (Focus Groups): dinamica para profundizar en las causas raiz de los problemas sin buscar culpables individuales.
3. Formulacion de compromisos SMART: acciones Especificas, Medibles, Alcanzables, Relevantes y con Plazo determinado (evitar declaraciones vagas como 'mejorar la comunicacion').
4. Asignacion de propietarios de accion (Owners) dentro del equipo y definicion de los recursos presupuestarios necesarios.
5. Calendario de seguimiento publico: revision mensual de hitos y comunicacion transparente de los progresos conseguidos.

Restricciones:
- Prioriza acciones sencillas y de impacto inmediato que demuestren a la plantilla que su voz genera cambios tangibles reales.

Formato de salida: Matriz de plan de accion en Markdown con columnas [Problema Detectado, Causa Raiz, Accion SMART, Responsable, Plazo, Indicador de Exito].`,
        tags: ["plan-acción", "clima-laboral", "cultura-organizacional", "compromisos-smart", "focus-groups"]
      },
      {
        id: "psi-027",
        title: "Detección y Prevención de Conductas de Acoso, Micromachismos y Fricción",
        desc: "Estructura protocolos de alerta temprana ante dinámicas de exclusión, microagresiones o acoso psicológico (Mobbing).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Prevencion de Riesgos Psicosociales y Mediador de Protocolos Anti-Acoso.
[COPIA AQUI TU IDEA]

Disena la guia de deteccion temprana y protocolo de actuacion ante conductas de acoso y microagresiones en el entorno de trabajo:
1. Tipificacion clara de conductas inaceptables: agresiones verbales, exclusion sistematica, difamacion de companeros, asignacion deliberada de tareas inutiles o degradantes y microagresiones de genero o procedencia.
2. Diferenciacion rigurosa entre conflicto laboral puntual (desacuerdo profesional abierto) y acoso psicologico / mobbing (conducta hostil reiterada y sistematica con desequilibrio de poder).
3. Canal de comunicacion seguro y confidencial para que cualquier persona o testigo pueda reportar incidentes sin temor a represalias.
4. Procedimiento formal de investigacion neutral con garantias de presuncion de inocencia, escucha a ambas partes y medidas cautelares de proteccion.
5. Programa formativo preventivo de sensibilizacion en sesgos inconscientes y fomento de conductas de intervencion de testigos (Bystander Intervention).

Restricciones:
- Cumple con los requisitos legales obligatorios de los Protocolos de Acoso Laboral segun la legislacion laboral vigente.

Formato de salida: Manual de protocolo preventivo en Markdown estructurado en articulos de facil consulta para la organizacion.`,
        tags: ["anti-acoso", "mobbing", "riesgos-psicosociales", "microagresiones", "protocolo-laboral"]
      },
      {
        id: "psi-050",
        title: "Índice de Seguridad Psicológica en Equipos Técnicos según la Escala de Amy Edmondson",
        desc: "Mide anónimamente la confianza del equipo para expresar dudas, admitir errores y proponer ideas sin miedo al ridículo.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Investigador del Comportamiento Organizacional y Especialista en Seguridad Psicológica en el Trabajo.
[COPIA AQUI TU IDEA]

Desarrolla el sistema de medicion y diagnostico de Seguridad Psicologica en equipos de desarrollo basado en la escala validada de Amy Edmondson:
1. Evaluacion de los 7 items psicometricos clave en escala Likert (1 a 7):
   - Item 1: Si cometes un error en este equipo, a menudo se usa en tu contra (Inverso).
   - Item 2: Los miembros del equipo son capaces de plantear problemas y cuestiones dificiles.
   - Item 3: Las personas de este equipo a veces rechazan a otros por ser diferentes (Inverso).
   - Item 4: Es seguro arriesgarse en este equipo.
   - Item 5: Es dificil pedir ayuda a otros miembros del equipo (Inverso).
   - Item 6: Nadie en este equipo actuaria de manera deliberada para socavar mis esfuerzos.
   - Item 7: Al trabajar con miembros del equipo, mis habilidades y talentos unicos son valorados y utilizados.
2. Inversion automatica de puntuaciones de items negativos y calculo del Indice Global de Seguridad Psicologica (PSI).
3. Correlacion con resultados operativos: medicion de como niveles altos de seguridad psicologica aceleran la velocidad de despliegue y la deteccion temprana de defectos.
4. Identificacion de conductas de liderazgo facilitadoras: admitir la propia falibilidad, modelar la curiosidad activa y castigar el hostigamiento.
5. Plan de intervencion para equipos en situacion de zona de apatia o zona de ansiedad segun la matriz de Edmondson.

Restricciones:
- Garantiza anonimato de muestreo absoluto: ningun reporte de equipo se genera con menos de 5 respuestas individuales para evitar deducciones.

Formato de salida: Modulo de Python con analisis estadistico, pruebas de consistencia alfa de Cronbach y reporte en tabla Markdown.`,
        tags: ["seguridad-psicológica", "amy-edmondson", "clima-laboral", "equipos-técnicos", "psicometría", "cultura"]
      },
      {
        id: "psi-051",
        title: "Auditoría de Señales de Burnout Organizacional mediante el Maslach Burnout Inventory (MBI-GS)",
        desc: "Evalúa las dimensiones de Agotamiento Emocional, Cinismo / Despersonalización y Eficacia Profesional en el trabajo.",
        model: "DeepSeek V4",
        prompt: `Eres un Psicólogo del Trabajo y Consultor de Salud Ocupacional y Prevención de Riesgos Psicosociales.
[COPIA AQUI TU IDEA]

Implementa el instrumento de diagnostico temprano de desgaste profesional conforme al Maslach Burnout Inventory General Survey (MBI-GS):
1. Medicion de las 3 dimensiones ortogonales del burnout organizacional:
   - Agotamiento Emocional (Emotional Exhaustion): fatiga cronica y vaciado de recursos energeticos provocados por sobrecarga laboral continua.
   - Cinismo o Despersonalizacion (Cynicism / Depersonalization): actitud distante, indiferente o defensiva hacia el trabajo y los companeros.
   - Eficacia Profesional (Professional Efficacy): sentimientos de competencia y logro en las tareas laborales (evaluada positivamente).
2. Identificacion del patron clasico de Burnout Clinico: combinacion de alto agotamiento, alto cinismo y baja eficacia profesional percibida.
3. Analisis de causas estructurales segun el modelo de Desajuste Persona-Puesto (Areas of Worklife Survey): sobrecarga de trabajo, falta de control, recompensas insuficientes, quiebra de la comunidad, ausencia de equidad o conflicto de valores.
4. Recomendaciones organizacionales a nivel de sistema: redisenio de cargas de trabajo, eliminacion de guardias continuadas no compensadas y clarificacion de roles.
5. Protocolos de desconexion protegida para empleados en zona roja de agotamiento.

Restricciones:
- El uso de la escala es estrictamente de cribado preventivo y orientacion ergonomica de clima, no para etiquetado psiquiatrico individual.

Formato de salida: Script en Python con calculo tipificado de puntuaciones MBI y cuadro de mando de riesgos psicosociales en Markdown.`,
        tags: ["burnout", "mbi-gs", "maslach", "riesgos-psicosociales", "salud-ocupacional", "clima-organizacional"]
      }
    ]
  },
  {
    id: "pensamiento-divergente",
    name: "Motor de Pensamiento Divergente y Creatividad / Génesis (P1.6)",
    prompts: [
      {
        id: "psi-028",
        title: "Estimulación de Ideas Innovadoras mediante la Técnica SCAMPER",
        desc: "Guía al usuario por las 7 lentes creativas: Sustituir, Combinar, Adaptar, Modificar, Poner en otros usos, Eliminar y Reorganizar.",
        model: "DeepSeek V4",
        prompt: `Eres un Facilitador de Creatividad Aplicada y Diseno Innovador mediante la metodologia SCAMPER de Bob Eberle.
[COPIA AQUI TU IDEA]

Aplica las 7 preguntas provocadoras de la tecnica SCAMPER para transformar el reto o producto:
1. S - Sustituir: ¿que materiales, componentes, pasos del proceso o personas podemos cambiar por alternativas radicales?
2. C - Combinar: ¿como podemos fusionar esta idea con otro servicio completamente distinto de otra industria ajena?
3. A - Adaptar: ¿que solucion exitosa de la naturaleza (biomimetica) o de la historia podemos adaptar a este problema?
4. M - Modificar / Magnificar: ¿que ocurre si exageramos un atributo al extremo (hacerlo 100 veces mas rapido, ultra-grande o invisible)?
5. P - Poner en otros usos (Put to other uses): ¿como podria utilizar esto un colectivo totalmente diferente de usuarios (ninos, astronautas, ancianos)?
6. E - Eliminar / Minimizacion extrema: ¿que pasa si quitamos la caracteristica que todos consideran imprescindible en el producto?
7. R - Reorganizar / Invertir: ¿que sucede si cambiamos el orden cronologico o hacemos exactamente lo opuesto de lo convencional?

Restricciones:
- Genera al menos 2 propuestas disruptivas concretas para cada una de las 7 letras de la tecnica.

Formato de salida: Matriz de ideacion creativa en Markdown con fichas de innovacion por categoria de SCAMPER.`,
        tags: ["scamper", "creatividad", "pensamiento-divergente", "innovación", "ideación"]
      },
      {
        id: "psi-029",
        title: "Dinámica de Pensamiento Lateral y Provocaciones de Edward de Bono",
        desc: "Aplica técnicas de pensamiento lateral, la operación PO (Provocación) y el movimiento deliberado de ideas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Entrenador de Pensamiento Lateral formado en las tecnicas cognitivas del Dr. Edward de Bono.
[COPIA AQUI TU IDEA]

Desarrolla una dinamica de pensamiento lateral para romper bloqueos mentales mediante provocaciones deliberadas:
1. Identificacion del Patron de Pensamiento Dominante: que asunciones o logicas obvias estan dando por sentadas todas las personas al abordar este reto.
2. Generacion de Provocaciones (Operacion PO): formulacion deliberada de afirmaciones absurdas, ilogicas o imposibles que desafien el sentido comun (ej: 'PO: Los automoviles tienen ruedas cuadradas' o 'PO: Los restaurantes pagan a los clientes por comer').
3. Tecnica del Movimiento (de la provocacion a la idea util):
   - Extraer un principio subyacente de la idea absurda.
   - Enfocarse en las diferencias y no en la imposibilidad tecnica.
   - Buscar que beneficio secundario inesperado generaria esa situacion absurda.
4. Entrada Aleatoria (Random Input): seleccion de una palabra o concepto aleatorio sin relacion con el tema (ej: 'Nido de pajaros', 'Telescopio', 'Arena') y forzamiento de conexiones neuronales con el reto.
5. Cosecha y refinamiento de las ideas mas prometedoras obtenidas mediante el desvio lateral.

Restricciones:
- Durante la fase de provocacion queda prohibido cualquier juicio critico prematuro ('eso es imposible' o 'eso no tiene sentido').

Formato de salida: Sesion guiada de pensamiento lateral en Markdown con provocaciones explicitas y cosecha de soluciones viables.`,
        tags: ["pensamiento-lateral", "edward-de-bono", "provocación-po", "creatividad", "innovación-disruptiva"]
      },
      {
        id: "psi-030",
        title: "Desbloqueo Creativo y Lluvia de Ideas Estructurada (Brainstorming Inverso)",
        desc: "Aplica la técnica de inversión sistemática: '¿Cómo podríamos empeorar activamente el problema?' para hallar soluciones.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Facilitador de Dinamicas de Innovacion y Desbloqueo Creativo de Equipos.
[COPIA AQUI TU IDEA]

Ejecuta una sesion de Lluvia de Ideas Inversa (Reverse Brainstorming) para superar el estancamiento creativo:
1. Planteamiento de la Pregunta Invertida: en lugar de preguntar como resolver el problema, formular: '¿Que acciones deliberadas podriamos tomar para empeorar al maximo la situacion o garantizar un fracaso estrepitoso?'.
2. Fase de Destruccion Creativa: lluvia de ideas sin censura anotando todas las formas posibles de causar un desastre, enfurecer a los usuarios o paralizar el proyecto.
3. Analisis del Espejo Incomodo: revisar las ideas destructivas y evaluar honestamente si alguna de ellas ya esta ocurriendo en la practica en la actualidad.
4. Fase de Reversion e Iluminacion: tomar cada idea destructiva generada y preguntarse: '¿Como podemos hacer exactamente lo contrario de esto o blindar el sistema contra este fallo?'.
5. Priorizacion de soluciones innovadoras que nunca habrian surgido con un brainstorming convencional directo.

Restricciones:
- Estimula el humor y la desinhibicion inicial para liberar las tensiones y rigideces mentales del grupo.

Formato de salida: Guia de la sesion en Markdown con lista de ideas inversas, analisis de patrones y catalogo de soluciones resultantes.`,
        tags: ["brainstorming-inverso", "desbloqueo-creativo", "pensamiento-divergente", "resolución-problemas"]
      },
      {
        id: "psi-031",
        title: "Asociación Forzada de Conceptos Distantes y Analogías Biónicas",
        desc: "Conecta desafíos tecnológicos o conceptuales con mecanismos biológicos de la naturaleza y dominios lejanos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Investigador en Creatividad Combinatoria y Metodologia de Analogias Bionicas (Sinéctica).
[COPIA AQUI TU IDEA]

Aplica el pensamiento analogico forzado para descubrir soluciones novedosas al desafio planteado:
1. Analogia Directa con la Naturaleza (Biomimetica): como resuelve este problema de optimizacion, filtrado, resistencia o cooperacion un organismo vivo (bacterias, enjambres de estorninos, raices de hongos micorrizas, hojas de loto).
2. Analogia Personal: pedir al diseno o algoritmo que 'sienta': 'Si yo fuera el dato procesado en esta cola, ¿como me sentiria esperando y que preferiria que ocurriera?'.
3. Analogia Simbolica y Poetica: sintetizar la esencia del conflicto en una paradoja o metafora literaria visual (ej: 'transparencia opaca', 'velocidad serena').
4. Analogia Fantastica: ¿como resolveria este problema un mago con poderes sobrenaturales o una civilizacion extraterrestre avanzada con recursos ilimitados?
5. Destilacion a la realidad tecnologica: aterrizar los principios de funcionamiento extraidos de las analogias en especificaciones tecnicas aplicables.

Restricciones:
- No te quedes en la metafora poetica; traduce cada analogia en una propuesta de ingenieria o arquitectura funcional.

Formato de salida: Estudio de analogias creativas en Markdown con descripcion bionica y su correlato tecnico implementable.`,
        tags: ["sinéctica", "biomimética", "analogías", "creatividad-combinatoria", "génesis"]
      },
      {
        id: "psi-052",
        title: "Dinámicas de Pensamiento Lateral y Provocación Po según Edward de Bono",
        desc: "Rompe patrones de pensamiento convergente rígido utilizando la técnica de provocación (Po), inversiones y palabras aleatorias.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Facilitador de Creatividad Aplicada e Innovación Estratégica según la metodología de Edward de Bono.
[COPIA AQUI TU IDEA]

Crea el motor de dinamicas de Pensamiento Lateral para desbloquear soluciones creativas ante desafios tecnicos aparentemente irresolubles:
1. Formulacion de Provocaciones (Operador Po): construccion deliberada de afirmaciones ilogicas o absurdas que dinamitan los supuestos de partida (ej: 'Po: los aviones no tienen ruedas para aterrizar').
2. Tecnicas de Movimiento (Movement) a partir de la provocacion:
   - Extraccion de principios: ¿que principio fisico o funcional subyace en la provocacion que podriamos rescatar?
   - Enfoque en las consecuencias: ¿que ventajas derivadas ocurririan si esto fuera cierto?
   - Busqueda de momentos especiales: ¿en que condiciones extremas tendria pleno sentido la afirmacion?
3. Tecnica de Entrada Aleatoria (Random Word Technique): seleccion de un sustantivo desconectado del diccionario para tender puentes conceptuales analogicos con el problema tecnico.
4. Tecnica de Inversion Radical: tomar la forma habitual de operar y darle la vuelta al 100% (ej: en vez de que el cliente llame al soporte, el soporte llama antes de que ocurra la incidencia).
5. Formalizacion de las ideas embrionarias generadas en propuestas tecnicas viables y testeables.

Restricciones:
- Evita el juicio critico prematuro durante la fase de movimiento; la evaluacion de viabilidad debe postergarse estrictamente a la etapa convergente final.

Formato de salida: Taller interactivo de Pensamiento Lateral en Markdown estructurado paso a paso con registro de ideas divergentes.`,
        tags: ["pensamiento-lateral", "edward-de-bono", "provocación-po", "creatividad", "innovación", "heurística"]
      },
      {
        id: "psi-053",
        title: "Facilitación de Ideación Disruptiva mediante SCAMPER Aplicada a Modelos de Negocio",
        desc: "Explora sistemáticamente las 7 lentes creativas (Sustituir, Combinar, Adaptar, Modificar, Poner en otros usos, Eliminar, Reordenar).",
        model: "GPT-4o",
        prompt: `Eres un Especialista en Design Thinking e Innovación de Producto con el Método SCAMPER.
[COPIA AQUI TU IDEA]

Desarrolla el ejercicio de generacion de alternativas disruptivas sobre el producto o modelo operativo propuesto aplicando la matriz SCAMPER completa:
1. Sustituir (S): ¿Que materiales, componentes de software, intermediarios o pasos del proceso podemos sustituir por alternativas no convencionales?
2. Combinar (C): ¿Que servicios independientes, herramientas externas o tecnologias paralelas podemos fusionar para crear una propuesta sinergica de valor?
3. Adaptar (A): ¿Que solucion exitosa procedente de un sector radicalmente ajeno (ej: biologia, videojuegos, logistica militar) podemos trasladar a este contexto?
4. Modificar / Magnificar (M): ¿Que sucederia si exageramos al maximo una caracteristica central (velocidad extrema, tamano gigante, transparencia absoluta) o la reducimos al minimo?
5. Poner en otros usos (P): ¿Como podria aprovecharse este mismo desarrollo o base de datos por un perfil de usuario completamente diferente al previsto?
6. Eliminar (E): ¿Que funcionalidades complejas, interfaces o politicas podemos suprimir por completo para lograr una simplicidad radical y menor coste?
7. Reordenar / Invertir (R): ¿Que ocurre si invertimos el orden de las etapas, invertimos el modelo de cobro (ej: cobrar despues del exito o pagar al usuario) o cambiamos los roles?

Restricciones:
- Obliga a plantear al menos 3 propuestas audaces y concretas por cada una de las 7 letras de la matriz.

Formato de salida: Matriz SCAMPER completa en tabla estructurada de Markdown con clasificacion de las 5 ideas mas prometedoras segun impacto y viabilidad.`,
        tags: ["scamper", "ideación", "innovación", "design-thinking", "modelos-de-negocio", "brainstorming"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Reflexión, Hábitos y RGPD)",
    prompts: [
      {
        id: "psi-032",
        title: "Diario Reflexivo Guiado con Preguntas Socráticas de Autoconocimiento",
        desc: "Estructura plantillas de journaling nocturno o matutino para ordenar el estado mental y registrar aprendizajes.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Guia de Escritura Expresiva y Reflexion Personal (Metodologia de James Pennebaker).
[COPIA AQUI TU IDEA]

Disena la plantilla estructurada para una sesion de diario reflexivo guiado (Journaling):
1. Registro de Agradecimiento Especifico: identificar 2 momentos cotidianos concretos de la jornada que generaron bienestar (evitar generalidades y centrarse en detalles sensoriales).
2. Descarga de Mente y Ruido Interior (Brain Dump): espacio libre de 5 minutos para volcar pensamientos desordenados, preocupaciones o pendientes sin preocuparse por la gramatica.
3. Pregunta Socratica Focal del dia: formular una pregunta profunda que invite a cuestionar supuestos propios (ej: '¿Que estoy postergando por temor a no hacerlo perfecto?', '¿Que limite necesito poner manana?').
4. Extraccion del Aprendizaje Nuclear: 'Si pudiera revivir la jornada de hoy, ¿que eleccion consciente cambiaria?'.
5. Afirmacion de Compromiso con los propios valores personales de cara al dia siguiente.

Restricciones:
- Tono respetuoso, sobrio y exento de cursilerias; disena una herramienta de higiene mental rigurosa.

Formato de salida: Plantilla estructurada en Markdown lista para ser utilizada como entrada diaria en la aplicacion.`,
        tags: ["journaling", "escritura-expresiva", "diario-reflexivo", "autoconocimiento", "pennebaker"]
      },
      {
        id: "psi-033",
        title: "Guía de Respiración Diafragmática y Regulación Fisiológica del Vago",
        desc: "Modela pautas de respiración pausada (Respiración Cuadrada 4-4-4-4 o Coherencia Cardíaca 5.5) para desactivar el simpático.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Fisiologo Aplicado y Especialista en Biofeedback y Estimulacion del Tono Vagal.
[COPIA AQUI TU IDEA]

Disena el ejercicio interactivo guiado de regulacion fisiologica mediante respiracion controlada:
1. Fundamentacion neurofisiologica: explicar con sencillez como la respiracion lenta estimula el nervio vago, desacelera la frecuencia cardiaca e inhibe el sistema nervioso simpatico (eje de lucha o huida).
2. Seleccion del patron de respiracion adecuado:
   - Opcion A - Respiracion en Caja (Box Breathing 4-4-4-4): Inhalar en 4 seg, Retener con pulmones llenos 4 seg, Exhalar en 4 seg, Retener con pulmones vacios 4 seg (ideal para foco sereno).
   - Opcion B - Coherencia Cardiaca (Resonancia 5.5): Inhalar en 5.5 segundos y exhalar en 5.5 segundos (6 respiraciones completas por minuto para sincronizar ritmos cardiacos y cerebrales).
   - Opcion C - Suspiro Fisiologico (Physiological Sigh): Doble inhalacion nasal rapida seguida de una exhalacion bucal prolongada para vaciar alveolos y reducir estres agudo en 30 segundos.
3. Instrucciones sensoriales para la interfaz: acompanar con un circulo que se expande suavemente en la inhalacion y se contrae en la exhalacion.
4. Criterios de seguridad: advertir que el ejercicio debe interrumpirse si la persona siente cualquier mareo o molestia.

Restricciones:
- Lenguaje puramente cientifico y fisiologico, sin referencias misticas o pseudocientificas.

Formato de salida: Guion interactivo de respiracion en Markdown con conteo de segundos e instrucciones paso a paso.`,
        tags: ["respiración-diafragmática", "coherencia-cardíaca", "tono-vagal", "box-breathing", "regulación"]
      },
      {
        id: "psi-034",
        title: "Registro y Seguimiento de Hábitos Positivos (Atomic Habit Tracker)",
        desc: "Configura el tablero de seguimiento de consistencia diaria basado en micro-victorias y no romper la cadena.",
        model: "DeepSeek V4",
        prompt: `Eres un Disenador de Sistemas de Productividad y Consistencia Personal (Inspirado en James Clear).
[COPIA AQUI TU IDEA]

Disena la arquitectura del tablero interactivo de seguimiento de habitos (Habit Tracker):
1. Definicion de identidades deseadas: vincular cada habito no a una meta externa sino a una declaracion de identidad (ej: 'Soy una persona que cuida su cuerpo' en lugar de 'Perder peso').
2. Diseno del registro visual: cuadricula mensual minimalista con casillas marcables diarias inspirada en la regla de Seinfeld ('No rompas la cadena').
3. Regla de Oro de la Consistencia: 'Nunca falles dos dias seguidos'; si un dia es imposible realizar el habito completo por un imprevisto, aplicar la version de emergencia de 2 minutos para mantener la identidad viva.
4. Visualizacion de micro-victorias acumuladas: calcular el porcentaje de consistencia mensual evitando castigar de forma destructiva los dias de descanso planificados.
5. Mensajes de refuerzo intrinseco orientados a celebrar el esfuerzo y la constancia, no la perfeccion rigida.

Restricciones:
- No utilices sistemas de penalizacion o degradacion de nivel que generen frustracion o abandono de la aplicacion.

Formato de salida: Esquema de base de datos relacional para habitos y componente de interfaz en Markdown con representacion visual de progreso.`,
        tags: ["habit-tracker", "hábitos-atómicos", "consistencia", "productividad", "james-clear"]
      },
      {
        id: "psi-035",
        title: "Visualización Longitudinal de Progreso y Balance Vital (Rueda de la Vida)",
        desc: "Genera el gráfico radial interactivo evaluando satisfacción en áreas clave (salud, trabajo, relaciones, ocio).",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Coach Ejecutivo y Especialista en Evaluacion Holistica de Calidad de Vida.
[COPIA AQUI TU IDEA]

Crea la herramienta interactiva de visualizacion de balance vital basada en la 'Rueda de la Vida' (Wheel of Life):
1. Definicion de las 8 areas vitales de equilibrio:
   - Salud Fisica y Vitalidad.
   - Desarrollo Profesional y Carrera.
   - Estabilidad Financiera.
   - Relaciones Familiares y de Pareja.
   - Amistades y Vida Social.
   - Crecimiento Personal y Aprendizaje.
   - Ocio, Creatividad y Recreacion.
   - Entorno Fisico y Hogar.
2. Escala de autoevaluacion cuantitativa de 1 (insatisfaccion profunda) a 10 (plenitud total) en cada eje.
3. Generacion del grafico de radar (Radar/Spider Chart): representacion visual continua que muestre de un vistazo el equilibrio o las asimetrias pronunciadas en la rueda.
4. Identificacion de la 'Palanca de Cambio': que area vital especifica, al ser mejorada en solo 2 puntos, generaria el mayor impacto positivo colateral en las demas areas.
5. Plan de metas trimestrales enfocadas en armonizar el perimetro de la rueda vital.

Restricciones:
- La herramienta debe presentarse como un ejercicio de auto-observacion sereno, no como un juicio evaluativo que genere sensacion de insuficiencia.

Formato de salida: Componente de radar en JavaScript/Chart.js o Plotly con cuestionario de calibracion y reporte en Markdown.`,
        tags: ["rueda-de-la-vida", "balance-vital", "gráfico-radar", "bienestar", "calidad-vida"]
      },
      {
        id: "psi-036",
        title: "Protocolo de Exportación y Eliminación Definitiva de Datos (RGPD y Olvido)",
        desc: "Implementa el derecho a la portabilidad y borrado seguro de todo el historial de conversaciones y reflexiones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Delegado de Proteccion de Datos (DPO) y Desarrollador de Herramientas de Privacidad de Usuario.
[COPIA AQUI TU IDEA]

Disena e implementa los modulos de portabilidad y eliminacion irreversible de datos del usuario conforme al RGPD:
1. Derecho a la Portabilidad (Articulo 20 RGPD):
   - Generacion de un archivo comprimido (.zip) cifrado con contrasena elegida por el usuario.
   - Volcado de todas las conversaciones, reflexiones de diario, respuestas de cuestionarios y configuraciones en formato JSON estructurado, acompanado de una version legible en PDF/HTML.
2. Derecho de Supresion / Derecho al Olvido (Articulo 17 RGPD):
   - Procedimiento de eliminacion en dos pasos con confirmacion explicita y reautenticacion de seguridad.
   - Borrado criptografico definitivo (Cryptographic Erasure / Crypto-shredding) de las claves privadas asociadas en el backend, haciendo irrecuperables los datos de las copias de seguridad.
   - Eliminacion fisica de todas las filas en bases de datos relacionales, indices vectoriales y almacenes de cache (Redis).
3. Emision de Certificado Digital de Supresion: documento firmado criptograficamente acreditando la fecha, hora y alcance del borrado total de la informacion.

Restricciones:
- El proceso de borrado debe ejecutarse sin friccion deliberada ni periodos de retencion ocultos; el usuario es el unico propietario soberano de su intimidad.

Formato de salida: Script de Python/Node.js para el pipeline de exportacion y borrado, acompanado de los modelos de datos afectados.`,
        tags: ["derecho-al-olvido", "rgpd-art-17", "portabilidad-datos", "crypto-shredding", "privacidad-absoluta"]
      },
      {
        id: "psi-054",
        title: "Guardrail de No-Clínica y Bloqueo de Diagnósticos Psiquiátricos Automatizados",
        desc: "Middleware de supervisión que intercepta afirmaciones diagnósticas (DSM-5 / CIE-11) y garantiza el ámbito estrictamente preventivo y formativo.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Especialista en Responsabilidad Civil Sanitaria y Asesor Deontológico en Psico-Tecnología.
[COPIA AQUI TU IDEA]

Implementa el middleware determinista de guardrails para asegurar que la aplicacion opere exclusivamente en el ambito no clinico y de bienestar organizacional:
1. Bloqueo incondicional de emision de diagnosticos psicopatologicos formales segun categorias DSM-5 o CIE-11 (prohibido afirmar al usuario 'Usted padece Trastorno Depresivo Mayor', 'Tiene un Trastorno de Ansiedad Generalizada' o 'Muestra rasgos de TLP').
2. Reescritura automatica de lenguaje prescriptivo hacia recomendaciones de higiene del trabajo y coaching reflexivo (sustituir 'Tratamiento farmacologico' por 'Estrategias de organizacion de tareas').
3. Verificacion obligatoria de aviso legal (Disclaimer) permanente visible en el pie de cada pantalla y en la cabecera de los informes exportados.
4. Protocolo de bloqueo inmediato ante intentos de manipulacion maliciosa del usuario (Jailbreaking) para forzar al modelo a emitir recetas medicas o diagnosticos psicologicos clinicos.
5. Registro de auditoria inmutable de las respuestas interceptadas y corregidas por el guardrail para evaluacion de conformidad legal.

Restricciones:
- La latencia del chequeo de no-clinica debe ser inferior a 150 ms para no entorpecer la fluidez de la experiencia.

Formato de salida: Modulo de Python 'non_clinical_guardrail.py' con expresiones regulares, listas negras terminologicas y clase de validacion.`,
        tags: ["no-clínica", "dsm-5", "guardrails", "responsabilidad-legal", "deontología", "psico-tecnología"]
      },
      {
        id: "psi-055",
        title: "Generador de Informes de Bienestar Organizacional y Clima de Equipo Anonimizado",
        desc: "Compila métricas agregadas de seguridad psicológica, carga de trabajo y burnout con anonimato diferencial para comités de empresa.",
        model: "GPT-4o",
        prompt: `Eres un Director de Personas y Cultura (Chief People Officer) y Especialista en Analítica de Personas (People Analytics).
[COPIA AQUI TU IDEA]

Crea el generador formal de Informes de Bienestar y Clima Laboral Agregado para la direccion general y comites de seguridad y salud:
1. Consolidacion de indices psicometricos agregados del trimestre: Indice de Seguridad Psicologica (Edmondson), Escala NASA-TLX media, niveles de desgaste MBI y balance de habitos EAST.
2. Garantia de anonimato diferencial: supresion de desgloses de departamentos o equipos con menos de 6 integrantes para impedir la deduccion de respuestas individuales.
3. Tendencias longitudinales: graficos comparativos de evolucion trimestral identificando factores que mejoraron o empeoraron tras la implementacion de medidas organizativas.
4. Seccion de recomendaciones prioritarias de intervencion ergonomica (ej: limitar reuniones en viernes tarde, programas de mentorizacion en onboarding).
5. Exportacion de informe ejecutivo de 3 paginas en PDF formateado con diseno sobrio, graficos accesibles y lenguaje institucional constructivo.

Restricciones:
- No utilices metricas de rendimiento individual cruzadas con bienestar que puedan utilizarse con fines punitivos o de despido disciplinario.

Formato de salida: Script en Python con 'reportlab' y Pandas para generar el informe PDF oficial y resumen ejecutivo en Markdown.`,
        tags: ["clima-laboral", "people-analytics", "bienestar-organizacional", "informe-ejecutivo", "anonimato-diferencial"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Psicología & Ciencias del Comportamiento
 */
export const PSICOLOGIA_PROMPTS = PSICOLOGIA_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "psicologia",
    areaName: "Psicología & Ciencias del Comportamiento",
    areaColor: "#10B981",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
