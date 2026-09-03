/**
 * PROMPTS-MEDICINA.JS — Biblioteca de Prompts Especializados en Medicina & IA Clínica
 * Área: Medicina & IA Clínica
 * Tareas: Genéricos, M1.1 a M1.6 y Tareas Secundarias
 */

export const MEDICINA_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "med-001",
        title: "Especificación Funcional y Alcance de Software Médico (SaMD)",
        desc: "Define el alcance asistencial, clasificación regulatoria (MDR UE 2017/745) y límites de responsabilidad clínica.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor Senior en Dispositivos Médicos y Software as a Medical Device (SaMD) bajo regulación europea MDR UE 2017/745 y FDA.
[COPIA AQUI TU IDEA]

Necesito que redactes la especificacion funcional y regulatoria para esta aplicacion clinica considerando:
1. Finalidad prevista (Intended Purpose): definir con precision si el software es de ayuda a la decision clinica (CDSS), triaje informativo, monitorizacion o archivo administrativo.
2. Clasificacion del riesgo del software segun Regla 11 del MDR (Clase I, IIa, IIb o III) y clasificacion IMDRF.
3. Identificacion de usuarios diana (medicos especialistas, medicos de atencion primaria, personal de enfermeria o pacientes en domicilio).
4. Delimitacion explicita de limites de uso: contraindicaciones de uso en emergencias vitales sin supervision y descargos de responsabilidad facultativa.
5. Gestion de riesgos clinicos segun norma ISO 14971: analisis de modos de fallo del software y su impacto potencial en la salud del paciente.

Restricciones:
- No uses ambiguedades; deja categoricamente establecido que el software nunca reemplaza el juicio clinico humano independiente.
- Emplea la terminologia oficial del reglamento MDR.

Formato de salida: Documento de especificacion tecnica y regulatoria en Markdown con tabla de gestion de riesgos ISO 14971.`,
        tags: ["samd", "mdr", "regulación", "alcance", "seguridad-clínica"]
      },
      {
        id: "med-002",
        title: "Definición de Arquitectura de Interoperabilidad HL7 FHIR R4",
        desc: "Estructura el modelo de datos clínico interoperable basado en recursos y perfiles FHIR R4 estándar.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Interoperabilidad Sanitaria certificado en estandares HL7 FHIR R4 y perfiles IHE.
[COPIA AQUI TU IDEA]

Necesito que disenes la arquitectura de interoperabilidad y modelo de recursos FHIR para la aplicacion:
1. Catalogo de recursos FHIR primarios necesarios: Patient, Encounter, Condition, Observation, MedicationStatement, AllergyIntolerance, DiagnosticReport.
2. Definicion de extensiones FHIR personalizadas para campos clinicos locales no cubiertos por la especificacion base.
3. Estrategia de autenticacion y autorizacion mediante protocolo SMART on FHIR y perfiles OAuth2 con alcances clinicos (scopes como 'patient/Observation.read').
4. Mecanismo de persistencia y busqueda (REST API de FHIR con soporte para busquedas complejas por codigo LOINC, fecha y paciente).
5. Modelo de sincronizacion con sistemas de historia clinica electronica (EHR / HIS hospitalario) mediante mensajeria HL7 v2 a traves de gateways Mirth/NextGen Connect.

Restricciones:
- Cumple rigurosamente la especificacion HL7 FHIR Release 4 (v4.0.1).
- Todos los recursos deben contar con referencias cruzadas validas (Subject -> Patient, Context -> Encounter).

Formato de salida: Especificacion de perfiles FHIR con estructura JSON schema y diagrama de flujo de integracion en formato Mermaid.`,
        tags: ["fhir", "hl7", "interoperabilidad", "smart-on-fhir"]
      },
      {
        id: "med-003",
        title: "Selección de Tech Stack y Almacenamiento Seguro Sanitario",
        desc: "Evalúa tecnologías para salud cumpliendo el RGPD sanitario español, la LOPDGDD y la HIPAA.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Director de Tecnologia (CTO) especializado en infraestructuras digitales para salud y cumplimiento normativo.
[COPIA AQUI TU IDEA]

Necesito que justifiques la seleccion del stack tecnologico para nuestra aplicacion clinica:
1. Backend clinico: evaluacion de frameworks (Python FastAPI vs Node.js/TypeScript) para procesamiento de grafos FHIR y pipelines de modelos medicos.
2. Motor de base de datos para datos de salud: evaluacion entre HAPI FHIR Server (JPA + PostgreSQL), Medplum o bases documentales con soporte JSONB.
3. Cifrado de datos en reposo y en transito: utilizacion de AES-256-GCM para volumenes de datos y TLS 1.3 con HSTS para todas las comunicaciones.
4. Segregacion criptografica de datos identificativos de salud (PII) respecto a datos clinicos desprovistos de identidad segun Esquema Nacional de Seguridad (ENS).
5. Infraestructura de computacion confidencial y hosting apto para datos de salud en territorio europeo (cumplimiento RGPD y soberania del dato).

Restricciones:
- No utilices soluciones que envien datos desanonimizados fuera del Espacio Economico Europeo.
- Especifica las librerias exactas para gestion segura de tokens de sesion y llaves criptograficas.

Formato de salida: Matriz tecnica de decision en Markdown con analisis de costes, latencia y cumplimiento del ENS categoria Alta.`,
        tags: ["tech-stack", "rgpd", "seguridad", "cifrado", "ens"]
      },
      {
        id: "med-004",
        title: "Diseño de Interfaz de Usuario Clínica Antifatiga y Accesible",
        desc: "Diseña pantallas de software médico ergonómicas, minimizando la fatiga por alarmas y la carga cognitiva.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Experiencia de Usuario (UX/UI) especializado en entornos hospitalarios de alta presion y ergonomia clinica.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para la aplicacion medica:
1. Diseno enfocado a mitigar la fatiga por alarmas: clasificacion estricta de notificaciones en 3 niveles (Informativa, Advertencia, Critica Vital) con codificacion visual y auditiva diferenciada.
2. Densidad de informacion calibrada para consulta medica: acceso a los signos vitales, alergias y medicacion actual en un golpe de vista sin scroll.
3. Modo de alto contraste y soporte para entornos con iluminacion tenue (guardias nocturnas en UCI / urgencias) o pantallas tactiles con guantes medicos.
4. Confirmacion en dos pasos con explicacion de consecuencias para acciones irreversibles (prescripcion de farmacos de alto riesgo o altas medicas).
5. Cumplimiento de las directrices WCAG 2.2 nivel AA para accesibilidad por personal sanitario con diversidad funcional visual.

Restricciones:
- Prohibido el uso de colores con bajo contraste (fondos grises claros con textos blancos o verdes palidos).
- Los elementos interactivos deben contar con un area tactil minima de 48x48 px.

Formato de salida: Guia de diseno de pantallas en Markdown con arbol de componentes y paleta cromatica basada en la escala de severidad clinica.`,
        tags: ["ui-clínica", "ergonomía", "fatiga-alarmas", "accesibilidad"]
      },
      {
        id: "med-005",
        title: "Documentación Clínica Estandarizada y Validación Regulatoria",
        desc: "Estructura expedientes de validación clínica, fichas técnicas y protocolos de consentimiento informado.",
        model: "GPT-4o",
        prompt: `Eres un Medico Especialista en Documentacion Clinica y Redaccion Cientifica Regulatoria.
[COPIA AQUI TU IDEA]

Crea la estructura documental para el expediente tecnico del sistema clinico:
1. Resumen de Caracteristicas del Producto (SmPC / Ficha Tecnica de software): indicaciones terapeuticas, contraindicaciones clinicas y efectos adversos potenciales.
2. Plan de Evaluacion Clinica (CEP) segun la guia MEDDEV 2.7/1 rev. 4 y MDCG 2020-6: metodologia de revision bibliografica y datos de rendimiento.
3. Modelo de Consentimiento Informado para el paciente detallando el papel del algoritmo de IA como asistente no vinculante.
4. Plan de Seguimiento Clinico Poscomercializacion (PMCF): recopilacion sistematica de incidentes adversos y descalibraciones del modelo.
5. Formato de informe pericial ante comites de etica de investigacion con medicamentos (CEIm).

Restricciones:
- Redaccion cientifico-medica formal en espanol, rigurosa y sin terminos coloquiales.
- Define con claridad las metricas de rendimiento clinico exigidas (Sensibilidad, Especificidad, VPP, VPN y Curva ROC-AUC).

Formato de salida: Plantilla completa en Markdown con todas las secciones numeradas y listas de comprobacion (checklists) de conformidad.`,
        tags: ["documentación", "ceim", "evaluación-clínica", "pmcf"]
      },
      {
        id: "med-030",
        title: "Arquitectura de Software SaMD conforme a IEC 62304 y Clasificación MDR Clase IIa/IIb",
        desc: "Estructura el ciclo de vida del software como dispositivo médico con trazabilidad de requisitos y verificación formal.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero Biomédico y Consultor Regulatorio especializado en Software as a Medical Device (SaMD).
[COPIA AQUI TU IDEA]

Disena la arquitectura del software clinico cumpliendo los requisitos de la norma IEC 62304 y el Reglamento Europeo de Productos Sanitarios (MDR 2017/745):
1. Clasificacion del software segun la regla 11 del MDR (Clase I, IIa, IIb o III) y justificacion formal basada en la gravedad de la decision clinica asistida.
2. Nivel de seguridad del software (Software Safety Class A, B o C segun IEC 62304) y matriz de gestion de riesgos de ciclo de vida.
3. Arquitectura modular con segregacion estricta entre modulos clinicos de calculo y capas de presentacion/UI para limitar el impacto de fallos.
4. Trazabilidad bidireccional de requisitos: Requisito de usuario -> Especificacion de software -> Caso de prueba de verificacion -> Resultado de validacion clinica.
5. Plan de mantenimiento de software posterior a la comercializacion (Post-Market Clinical Follow-up / PMCF) y gestion de parches de ciberseguridad.

Restricciones:
- No utilices descripciones genericas de software; aplica estrictamente la terminologia de la norma IEC 62304.

Formato de salida: Documento de arquitectura SaMD en Markdown con diagrama de trazabilidad matricial y tabla de clasificacion MDR.`,
        tags: ["samd", "iec-62304", "mdr", "regulatorio", "biomédico"]
      },
      {
        id: "med-031",
        title: "Gestión de Riesgos de Software Médico según ISO 14971 y FMEA",
        desc: "Aplica el análisis modal de fallos y efectos (FMEA) para mitigar peligros clínicos derivados de algoritmos de IA.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Garantia de Calidad Biomedica y Gestion de Riesgos Clinicos de Software.
[COPIA AQUI TU IDEA]

Elabora el analisis FMEA (Failure Mode and Effects Analysis) de software conforme al estandar ISO 14971:2019:
1. Identificacion de modos de fallo especificos de algoritmos de IA: Falsos negativos criticos, alucinacion de dosis farmacologicas, sesgo de poblacion y fallos de conectividad.
2. Estimacion de Severidad (S: 1 a 5), Probabilidad de Ocurrencia (O: 1 a 5) y Capacidad de Deteccion (D: 1 a 5) para calcular el Risk Priority Number (RPN).
3. Diseno de medidas de mitigacion inherentes al diseno (Inherent Safety): doble chequeo con reglas deterministas, confirmacion obligatoria del medico y limites fisicos de rango.
4. Evaluacion del riesgo residual tras la implementacion de salvaguardas y analisis de relacion beneficio-riesgo global.
5. Trazabilidad de cada peligro identificado hacia el expediente tecnico de gestion de riesgos (Risk Management File).

Restricciones:
- Todo fallo con severidad critica (muerte o dano irreversible) debe contar con una barrera fisica o logica redundante independiente.

Formato de salida: Matriz FMEA en tabla estructurada de Markdown y resumen ejecutivo de riesgos residuales para el Organismo Notificado.`,
        tags: ["iso-14971", "fmea", "riesgo-clínico", "seguridad-paciente", "calidad"]
      }
    ]
  },
  {
    id: "auditor-clinico",
    name: "Auditor Clínico y Verificación PubMed (M1.1)",
    prompts: [
      {
        id: "med-006",
        title: "Verificación de Afirmaciones Médicas contra Literatura PubMed",
        desc: "Contrasta afirmaciones clínicas extrayendo evidencia empírica de artículos indexados en MEDLINE/PubMed.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador Biomedico y Auditor de Medicina Basada en la Evidencia (MBE).
[COPIA AQUI TU IDEA]

Para cada afirmacion medica o pauta terapeutica extraida del texto, realiza la auditoria bibliografica:
1. Descomposicion de la afirmacion en terminos PICO (Paciente/Poblacion, Intervencion, Comparacion, Outcome/Resultado).
2. Formulacion de consultas booleanas avanzadas con descriptores MeSH para la API E-Utilities de PubMed/NCBI.
3. Filtro jerarquico de disenos de estudio: priorizar Metanalisis y Revisiones Sistematicas Cochrane > Ensayos Clinicos Aleatorizados (ECA) > Estudios de Cohortes > Series de Casos.
4. Extraccion de la evidencia empírica: tamano muestral (N), Hazard Ratio (HR), Riesgo Relativo (RR), Odds Ratio (OR) y p-valor de significacion.
5. Consecucion del identificador unico PMID y DOI para cada estudio respaldante.

Restricciones:
- No aceptes afirmaciones respaldadas unicamente por opiniones de expertos sin datos experimentales.
- Si no existe consenso cientifico, refleja explicitamente la controversia en la literatura.

Formato de salida: Informe de auditoria con tabla estructurada [Afirmacion, Terminos PICO, Consulta MeSH, PMID, Nivel de Evidencia, Conclusion].`,
        tags: ["pubmed", "mesh", "mbe", "evidencia", "auditoría"]
      },
      {
        id: "med-007",
        title: "Clasificación de Evidencia Clínica según Sistema GRADE",
        desc: "Clasifica afirmaciones clínicas en VERIFIED, UNVERIFIED o CONTRADICTED asignando calidad GRADE.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Miembro de Panel de Guias de Practica Clinica evaluando evidencia mediante la metodologia GRADE.
[COPIA AQUI TU IDEA]

Analiza las afirmaciones clinicas proporcionadas y clasificalas rigurosamente:
1. Asignacion del estado de verificacion:
   - VERIFIED: Respaldada fehacientemente por revisiones sistematicas o ensayos clinicos sin sesgos graves.
   - UNVERIFIED: Afirmacion plausible pero sin respaldo publicado concluyente o con muestras insuficientes.
   - CONTRADICTED: Refutada por la evidencia cientifica reciente o en contraindicacion directa de guias oficiales.
2. Determinacion del nivel de calidad de la evidencia GRADE:
   - ALTA: Es muy improbable que investigaciones adicionales cambien la confianza en el efecto estimado.
   - MODERADA: Investigaciones adicionales probablemente tendran un impacto importante.
   - BAJA: Es muy probable que investigaciones adicionales tengan un impacto importante.
   - MUY BAJA: Cualquier estimacion del efecto es muy incierta.
3. Evaluacion de sesgo de publicacion, inconsistencia entre estudios y falta de direccion directa (indirectness).

Restricciones:
- Justifica de forma transparente cada bajada de nivel de evidencia segun los criterios oficiales GRADE.

Formato de salida: Tabla de resumen de evidencia (GRADE Evidence Profile) en formato Markdown estructurado con badges de verificacion.`,
        tags: ["grade", "verified", "calidad-evidencia", "sesgos"]
      },
      {
        id: "med-008",
        title: "Generación de Informe de Auditoría Clínica Institucional",
        desc: "Genera el dictamen formal de auditoría sobre el uso de fármacos y tratamientos para comités hospitalarios.",
        model: "GPT-4o",
        prompt: `Eres el Presidente de la Comision de Farmacia y Terapeutica de un hospital universitario.
[COPIA AQUI TU IDEA]

Redacta el dictamen de auditoria clinica para el protocolo terapeutico propuesto:
1. Resumen clinico de la indicacion evaluada y alternativa farmacologica de referencia.
2. Analisis de eficacia clinica: reduccion absoluta del riesgo (RAR) y numero necesario a tratar (NNT).
3. Analisis de seguridad clinica: numero necesario para causar dano (NNH) e incidencia de efectos adversos graves.
4. Impacto en terminos de farmacoeconomia basica (coste-efectividad incremental respecto a la terapia estandar).
5. Dictamen final vinculante: Aprobado sin restricciones / Aprobado condicionado a perfil de paciente / Desestimado por falta de evidencia.

Restricciones:
- Tono estrictamente tecnico, objetivo, pericial y libre de sesgos de la industria farmaceutica.

Formato de salida: Dictamen clinico oficial estructurado en Markdown con encabezado hospitalario institucional y tabla resumen de indicadores.`,
        tags: ["informes", "farmacia-terapéutica", "nnt", "nnh", "dictamen"]
      },
      {
        id: "med-009",
        title: "Detección Sistemática de Interacciones Farmacológicas (DDI)",
        desc: "Analiza polimedicación identificando interacciones farmacocinéticas (CYP450) y farmacodinámicas graves.",
        model: "DeepSeek V4",
        prompt: `Eres un Farmacologo Clinico Especialista en Toxicologia y Polifarmacia en pacientes ancianos.
[COPIA AQUI TU IDEA]

A partir de la lista de medicamentos y suplementos prescritos al paciente, analiza las interacciones:
1. Interacciones Farmacocineticas:
   - Modulacion del citocromo P450 (inhibicion o induccion de CYP3A4, CYP2D6, CYP2C9, CYP1A2).
   - Competencia por la glicoproteina P (P-gp) o transportadores renales (OAT/OCT).
   - Modificacion de la absorcion gastrica por variacion de pH (IBP) o quelacion (cationes divalentes).
2. Interacciones Farmacodinamicas:
   - Sinergismo aditivo toxico (ej: prolongacion del intervalo QTc, riesgo de sangrado por anticoagulantes + AINEs, sindrome serotoninergico).
   - Antagonismo competitivo de receptores terapeuticos.
3. Clasificacion de severidad de la interaccion: Menor (vigilar), Moderada (ajustar dosis o espaciar tomas), Mayor/Contraindicada (evitar asociacion).
4. Pauta de sustitucion o ajuste de monitorizacion clinica recomendada (ej: determinacion de niveles plasmaticos o ECG de control).

Restricciones:
- No omitas interacciones con productos de herboristeria o nutrientes comunes (hierba de San Juan, zumo de pomelo).
- Cita el mecanismo molecular exacto de cada interaccion.

Formato de salida: Matriz de interacciones farmacologicas con semaforo de severidad y plan de intervencion farmaceutica.`,
        tags: ["farmacología", "interacciones", "cyp450", "qtc", "seguridad"]
      },
      {
        id: "med-032",
        title: "Validación de Guías de Práctica Clínica y Medicina Basada en Evidencia (GRADE)",
        desc: "Clasifica la evidencia de recomendaciones médicas utilizando el sistema GRADE y niveles de evidencia Oxford CEBM.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Metodólogo de Medicina Basada en la Evidencia y Auditor de Guías Clínicas.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de evaluacion de recomendaciones clinicas conforme a la metodologia GRADE (Grading of Recommendations Assessment, Development and Evaluation):
1. Clasificacion de la calidad de la evidencia: Alta, Moderada, Baja o Muy Baja segun diseno del estudio (ECA vs observacional), riesgo de sesgo, imprecision e inconsistencia.
2. Fuerza de la recomendacion: Fuerte a favor, Debil a favor, Debil en contra o Fuerte en contra, ponderando balance beneficios/riesgos y valores del paciente.
3. Extraccion automatica de desenlaces criticos (Critical Outcomes) vs desenlaces sustitutos (Surrogate Endpoints).
4. Deteccion de recomendaciones obsoletas mediante cotejo de fechas de publicacion frente a revisiones sistematicas recientes de la Cochrane Library.
5. Generacion de tabla de resumen de hallazgos (Summary of Findings / SoF) con estimaciones de efecto relativo y absoluto.

Restricciones:
- No emitas juicios de calidad sin documentar la fuente bibliografica primaria con su identificador DOI o PMID.

Formato de salida: Modulo de Python 'grade_evidence_evaluator.py' con representacion tabular de la evaluacion GRADE.`,
        tags: ["grade", "evidencia", "guías-clínicas", "cochrane", "metodología"]
      },
      {
        id: "med-033",
        title: "Detección de Contraindicaciones en Polifarmacia Geriátrica (Criterios STOPP/START)",
        desc: "Identifica prescripciones potencialmente inapropiadas en pacientes mayores de 65 años según criterios STOPP/START v3.",
        model: "GPT-4o",
        prompt: `Eres un Farmacéutico Clínico Especialista en Farmacoterapia Geriátrica y Deprescripción.
[COPIA AQUI TU IDEA]

Crea el motor de reglas clinicas para la deteccion de prescripciones inapropiadas basado en los criterios STOPP/START version 3:
1. Ingesta de la lista activa de farmacos (codificados en ATC) y lista de diagnosticos del paciente (codificados en CIE-10).
2. Reglas STOPP (Screening Tool of Older Persons Prescriptions): benzodiacepinas de vida media larga, uso prolongado de IBP sin indicacion, AINEs en hipertension o insuficiencia renal, anticolinergicos en deterioro cognitivo.
3. Reglas START (Screening Tool to Alert to Right Treatment): omisiones de estatinas en prevencion secundaria, anticoagulacion oral en fibrilacion auricular con CHA2DS2-VASc elevado.
4. Calculo de la carga anticolinergica acumulada (Anticholinergic Cognitive Burden / ACB) con escala de riesgo de confusion aguda.
5. Propuesta estructurada de deprescripcion escalonada con alternativas terapeuticas mas seguras en geriatria.

Restricciones:
- Requiere parametrizar la funcion renal (Filtrado Glomerular) para ajustar las alertas farmacologicas dependientes de aclaramiento.

Formato de salida: Servicio de validacion en Python con salida JSON estructurada con clasificacion de severidad de la alerta.`,
        tags: ["geriatría", "stopp-start", "polifarmacia", "deprescripción", "farmacia-clínica"]
      },
      {
        id: "med-034",
        title: "Auditoría de Dosificación en Insuficiencia Renal mediante Aclaramiento Cockcroft-Gault",
        desc: "Ajusta posologías de antibióticos y fármacos de estrecho margen terapéutico según función renal estimada.",
        model: "DeepSeek V4",
        prompt: `Eres un Farmacocinético Clínico y Especialista en Seguridad de Medicamentos de Eliminación Renal.
[COPIA AQUI TU IDEA]

Implementa el calculador de ajuste posologico renal conforme a guias farmacologicas oficiales (FDA / EMA):
1. Calculo del Aclaramiento de Creatinina (CrCl) mediante la formula clasica de Cockcroft-Gault considerando peso ideal o ajustado en obesidad.
2. Estimacion paralela del Filtrado Glomerular mediante la ecuacion CKD-EPI 2021 (sin modificador por raza) para clasificacion del estadio KDIGO.
3. Reglas de ajuste para farmacos criticos: Vancomicina, Aminoglucosidos (Gentamicina), Enoxaparina, Anticoagulantes Directos (ACOD), Digoxina y Metformina.
4. Modulacion de dosis: reduccion de la dosis unitaria manteniendo el intervalo vs alargamiento del intervalo de administracion.
5. Alertas de contraindicacion absoluta cuando el CrCl cae por debajo del umbral de toxicidad severa (ej: Metformina con FG < 30 mL/min).

Restricciones:
- Valida que los valores de creatinina serica se encuentren en estado estacionario (no aplicable directamente en Fracaso Renal Agudo no estabilizado).

Formato de salida: Modulo de Python 'renal_dosage_adjuster.py' con tipado de datos estricto y casos de prueba clinicos.`,
        tags: ["insuficiencia-renal", "cockcroft-gault", "ckd-epi", "dosificación", "farmacocinética"]
      },
      {
        id: "med-035",
        title: "Verificación de Seguridad en Administración de Medicamentos de Alto Riesgo (ISMP)",
        desc: "Audita prescripciones de fármacos de alto riesgo según el Institute for Safe Medication Practices.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Responsable de Seguridad del Paciente Hospitalario y Prevención de Errores de Medicación.
[COPIA AQUI TU IDEA]

Construye el validador de prescripciones para medicamentos de alto riesgo segun la lista oficial del ISMP (Institute for Safe Medication Practices):
1. Categorias criticas: Insulinas intravenosas y subcutaneas, opiaceos de alta potencia, anticoagulantes parenterales, electrolitos concentrados (Cloruro Potasico IV), agentes citostaticos.
2. Verificacion de 'Confusion por Similitud Ortografica o Fonetica' (Look-Alike Sound-Alike / LASA) con aplicacion de tipografia Tall Man Lettering (ej: DOPAmine vs DOBUTamine).
3. Comprobacion obligatoria de doble chequeo independiente (Independent Double-Check) antes de la generacion de la orden de administracion.
4. Validacion de dosis maximas absolutas y umbrales de alerta roja que bloquean el guardado sin override justificado del facultativo.
5. Pista de auditoria inmutable de cada advertencia mostrada al medico prescriptor y de los motivos de anulacion de alerta.

Restricciones:
- Prohibe terminantemente la omision o bypass de alertas en medicamentos con tasa de letalidad comprobada por sobredosis.

Formato de salida: Script en Python con motor de reglas y generacion de plantillas de alerta en Markdown para integracion en sistemas EHR.`,
        tags: ["ismp", "medicamentos-alto-riesgo", "seguridad-paciente", "lasa", "farmacovigilancia"]
      }
    ]
  },
  {
    id: "pipeline-fhir",
    name: "Pipeline de Normalización FHIR R4 (M1.2)",
    prompts: [
      {
        id: "med-010",
        title: "Extracción de Texto Clínico no Estructurado a Recursos FHIR R4",
        desc: "Parsea informes médicos en lenguaje natural transformándolos en recursos Patient, Condition y Observation.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Datos Clinicos experto en procesamiento de lenguaje natural medico y FHIR R4.
[COPIA AQUI TU IDEA]

Analiza el informe clinico no estructurado y extrae las entidades clinicas convirtiendolas a JSON FHIR R4 valido:
1. Recurso 'Condition': patologias activas y antecedentes medicos con fecha de inicio y estado clinico (active, resolved).
2. Recurso 'Observation': constantes vitales (TA, FC, SatO2, Temp), hallazgos de laboratorio y habitos toxicos con valor numerico y unidad UCUM.
3. Recurso 'MedicationStatement': farmacos pautados con dosis, via de administracion y pauta posologica.
4. Recurso 'AllergyIntolerance': alergias a medicamentos o sustancias con manifestacion clinica y grado de certeza.
5. Preservacion de referencias cruzadas: cada recurso debe enlazar al identificador anonimizado del 'Patient' y del 'Encounter'.

Restricciones:
- Todo JSON devuelto debe superar la validacion de esquema del HL7 FHIR Core sin campos obligatorios ausentes.
- Maneja con precision la negacion clinica (ej: 'niega dolor toracico' no debe generar un recurso Condition activo).

Formato de salida: Objeto JSON con la lista de recursos FHIR generados listos para su envio a un servidor interoperable.`,
        tags: ["fhir", "nlp-clínico", "observation", "condition", "json"]
      },
      {
        id: "med-011",
        title: "Codificación Terminológica Estandarizada (CIE-10, SNOMED-CT, LOINC)",
        desc: "Asigna códigos universales a diagnósticos (CIE-10), hallazgos clínicos (SNOMED-CT) y pruebas de laboratorio (LOINC).",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Documentacion Medica y Estandarizacion de Vocabularios Sanitarios.
[COPIA AQUI TU IDEA]

Para cada concepto clinico identificado en el texto, asigna su codificacion estandarizada precisa:
1. Diagnosticos y motivos de consulta: codigo CIE-10-ES (Clasificacion Internacional de Enfermedades 10 edicion modificacion clinica).
2. Conceptos clinicos multidimensionales: codigo conceptId de SNOMED Clinical Terms (SNOMED-CT) con su termino preferido oficial en espanol.
3. Pruebas de laboratorio y medidas clinicas: codigo LOINC (Logical Observation Identifiers Names and Codes) con componente, propiedad y sistema.
4. Medicamentos comerciales y principios activos: codigo ATC de la OMS y codigo nacional de farmacos.
5. Insercion de la estructura 'CodeableConcept' de FHIR conteniendo tanto el 'coding' oficial como el 'text' original del informe.

Restricciones:
- No utilices codigos residuales o inespecificos (ej: 'otro dolor toracico') si el informe aporta detalles para codificar con maxima especificidad.
- Comprueba que los codigos pertenecen a versiones vigentes de los catalogos oficiales.

Formato de salida: Tabla de mapeo [Texto Original, Vocabulario, Codigo Estandar, Descripcion Oficial, Estructura CodeableConcept FHIR].`,
        tags: ["codificación", "cie-10", "snomed-ct", "loinc", "terminología"]
      },
      {
        id: "med-012",
        title: "Construcción y Validación de FHIR Bundle Transaccional",
        desc: "Empaqueta múltiples recursos médicos en un Bundle atómico de tipo 'transaction' con comprobación de integridad.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Desarrollador de Software de Integracion Hospitalaria trabajando con servidores FHIR R4.
[COPIA AQUI TU IDEA]

A partir de los recursos clinicos generados, ensambla un FHIR Bundle de tipo 'transaction' para su insercion atomica:
1. Estructura general: 'resourceType': 'Bundle', 'type': 'transaction', identificador UUID y marca temporal ISO 8601 UTC.
2. Array 'entry' con cada recurso, asignando IDs temporales de tipo URN UUID ('urn:uuid:...') para resolver referencias cruzadas antes de persistir.
3. Configuracion del objeto 'request' para cada entrada: metodo HTTP POST y url relativa al tipo de recurso (ej: 'url': 'Observation').
4. Validacion semantica: verificar que las observaciones referencian al UUID temporal del paciente correcto incluido en el mismo Bundle.
5. Gestion de errores: simulacion de la respuesta 'Bundle-response' indicando codigos HTTP 201 Created esperados.

Restricciones:
- El bundle debe ser transaccional puro (si un solo recurso falla en el servidor, toda la operacion debe revertirse para evitar estados huerfanos).

Formato de salida: Archivo JSON FHIR Bundle completo, syntactically valid, listo para ser consumido mediante cliente HTTP (curl / Postman).`,
        tags: ["fhir-bundle", "transacción", "integridad", "json", "hapi-fhir"]
      },
      {
        id: "med-013",
        title: "Integración con Servidor HAPI FHIR y Consultas REST Complejas",
        desc: "Genera clientes en Python/TypeScript para consultar recursos mediante la API REST de HAPI FHIR.",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador Backend especializado en clientes REST para servidores HAPI FHIR / Smile CDR.
[COPIA AQUI TU IDEA]

Crea la clase de servicio en Python para interactuar de forma segura con un servidor HAPI FHIR:
1. Metodo 'get_patient_summary(patient_id)': recupera el paciente, sus alergias activas, condiciones actuales y ultimas 5 observaciones vitales mediante consulta encadenada '_include' o '_revinclude'.
2. Metodo 'search_observations_by_code(patient_id, loinc_code, date_range)': filtra observaciones por codigo LOINC con operadores de fecha ('ge', 'le').
3. Paginacion de bundles: gestion automatica de enlaces 'relation: next' para recuperar historiales con cientos de analiticas sin desbordar memoria.
4. Manejo de 'OperationOutcome': parseo de respuestas de error devueltas por el servidor HAPI FHIR transformandolas en excepciones legibles de Python.
5. Inyeccion de cabeceras de autorizacion Bearer token para entornos autenticados con Keycloak / SMART on FHIR.

Restricciones:
- Implementa reintentos exponenciales ante errores de conexion transitorios y timeouts ajustados a 10 segundos.

Formato de salida: Modulo de Python 'fhir_client.py' con tipado estricto, uso de httpx asincrono y pruebas unitarias de integracion.`,
        tags: ["hapi-fhir", "cliente-rest", "python", "httpx", "paginación"]
      },
      {
        id: "med-036",
        title: "Validación de Recursos FHIR R4 con Perfiles Core Europeos y Guías HL7",
        desc: "Valida la conformidad semántica y estructural de recursos Patient, Observation y Condition contra perfiles HL7 FHIR.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Interoperabilidad Sanitaria y Arquitecto de Sistemas FHIR R4.
[COPIA AQUI TU IDEA]

Crea el validador de recursos FHIR R4 con soporte para perfiles clinicos avanzados:
1. Validacion estructural contra el esquema oficial FHIR R4 (Resource schemas JSON/XML).
2. Verificacion de perfiles semanticos obligatorios (StructureDefinition): cardinalidades minimas, extensiones oficiales y slices de componentes.
3. Comprobacion de enlaces y referencias relacionales: Resource.subject apunta a un recurso Patient existente y valido en el Bundle.
4. Validacion de codificaciones obligatorias (CodeableConcept) contra ValueSets oficiales (ej: estado clinico de la condicion en http://hl7.org/fhir/ValueSet/condition-clinical).
5. Generacion del recurso OperationOutcome con la lista de violaciones estructurales, advertencias y severidades de diagnostico.

Restricciones:
- Rechaza bundles que contengan referencias rotas o tipos de datos mal formateados (ej: fechas sin offset de zona horaria ISO 8601).

Formato de salida: Validador en Python utilizando 'fhir.resources' y 'pydantic' con salida en JSON conforme a OperationOutcome.`,
        tags: ["fhir", "hl7", "interoperabilidad", "profiles", "operation-outcome"]
      },
      {
        id: "med-037",
        title: "Mapeo Terminológico entre CIE-10-ES y SNOMED CT con Módulos de Extensión",
        desc: "Transforma códigos de diagnóstico y procedimientos entre sistemas de clasificación clínica internacional.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Documentalista Médico y Experto en Terminologías Clínicas Estandarizadas.
[COPIA AQUI TU IDEA]

Desarrolla el servicio de mapeo terminologico bidireccional entre la clasificacion CIE-10-ES y el vocabulario ontologico SNOMED CT:
1. Ingesta de conceptos clinicos en texto libre o codigos de diagnostico CIE-10-ES (ej: I21.0 Infarto agudo de miocardio transmural de la pared anterior).
2. Mapeo semantico a conceptos SNOMED CT (ConceptID y Fully Specified Name / FSN) utilizando las tablas oficiales de equivalencias del Ministerio de Sanidad.
3. Clasificacion del grado de coincidencia del mapeo: Equivalente Exacto, Mas Amplio (Broader), Mas Estrecho (Narrower) o Parcial.
4. Mapeo de procedimientos quirurgicos y exploraciones entre CIE-10-ES Procedimientos y SNOMED CT.
5. Generacion del recurso FHIR ConceptMap estructurado con definicion de grupos, elementos y targets.

Restricciones:
- Documenta las reglas de desambiguacion cuando un codigo diagnostico administrativo admita multiples conceptos clinicos especificos.

Formato de salida: Codigo en Python con generacion del recurso FHIR ConceptMap en formato JSON valido.`,
        tags: ["snomed-ct", "cie-10", "conceptmap", "terminología", "documentación-médica"]
      },
      {
        id: "med-038",
        title: "Pipeline de Ingesta HL7 v2.x ADT/ORM y Transformación a FHIR Bundle Transaccional",
        desc: "Parsea mensajes tradicionales de admisión, alta y peticiones analíticas para convertirlos a recursos FHIR R4.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Integración Hospitalaria con experiencia en pasarelas HL7 tradicionales y modernas.
[COPIA AQUI TU IDEA]

Construye el convertidor de mensajes HL7 version 2.x (ADT_A01, ADT_A08, ORU_R01) hacia recursos FHIR R4:
1. Parseo de segmentos HL7 v2 (MSH, PID, PV1, OBR, OBX) extrayendo identificadores medicos, datos demograficos y resultados analiticos.
2. Mapeo de segmentos hacia recursos FHIR:
   - PID -> Patient
   - PV1 -> Encounter
   - OBR / OBX -> DiagnosticReport y Observation
3. Creacion de un FHIR Bundle de tipo 'transaction' con metodos HTTP correspondientes (PUT para pacientes idempotentes, POST para observaciones).
4. Normalizacion de fechas de formato YYYYMMDDHHMMSS a ISO 8601 con conversion de unidades de medida (UCUM).
5. Manejo de excepciones ante segmentos truncados o caracteres de escape mal codificados.

Restricciones:
- Garantiza la idempotencia del pipeline de forma que reenviar el mismo mensaje HL7 v2 no genere recursos duplicados en el servidor FHIR.

Formato de salida: Script en Python con la biblioteca 'hl7apy' y serializador JSON FHIR listo para ejecucion en microservicio.`,
        tags: ["hl7-v2", "fhir", "adt", "oru", "interoperabilidad-hospitalaria"]
      },
      {
        id: "med-039",
        title: "Normalización de Pruebas de Laboratorio Clínico con Códigos LOINC Estándar",
        desc: "Estandariza analíticas de sangre, orina y bioquímica vinculando cada parámetro a su código universal LOINC.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Bioquímico Clínico e Informático Médico especializado en Estandarización de Laboratorio.
[COPIA AQUI TU IDEA]

Disena el modulo de normalizacion de resultados analiticos hacia la terminologia universal LOINC (Logical Observation Identifiers Names and Codes):
1. Mapeo de parametros habituales de laboratorio (Hemograma, Bioquimica basica, Perfil lipidico, Coagulacion) a sus 6 ejes LOINC:
   - Componente (ej: Glucosa)
   - Propiedad (ej: Concentracion de masa / MCnc)
   - Tiempo (ej: Punto temporal / Pt)
   - Sistema (ej: Suero o plasma / Ser/Plas)
   - Escala (ej: Cuantitativa / Qn)
   - Metodo (ej: Enzimatico / Test strip)
2. Normalizacion de unidades de medida clinicas al estandar unificado UCUM (Unified Code for Units of Measure, ej: mg/dL vs mmol/L).
3. Estructuracion de intervalos de referencia biologicos (Reference Range) con desgloses por edad y sexo del paciente.
4. Marcado de valores de alarma o criticos (Panic Values) con banderas estandarizadas (High, Low, Critical High, Critical Low).
5. Exportacion del recurso FHIR Observation con codificacion LOINC obligatoria en el campo 'code'.

Restricciones:
- No realices conversiones de unidades entre magnitudes incompatibles (ej: masa a volumen sin peso molecular del analito).

Formato de salida: Modulo de Python 'loinc_lab_normalizer.py' con catalogo de mapeo para los 50 parametros de laboratorio mas frecuentes.`,
        tags: ["loinc", "ucum", "laboratorio", "bioquímica", "fhir", "unidades-medida"]
      }
    ]
  },
  {
    id: "adherencia-monitoreo",
    name: "Adherencia y Monitoreo de Pacientes (M1.3)",
    prompts: [
      {
        id: "med-014",
        title: "Agente Empático de Adherencia Terapéutica y Educación Farmacológica",
        desc: "Asiste al paciente en la toma de su medicación, resolución de dudas posológicas y estilo de vida saludable.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Asistente Sanitario Virtual de Apoyo a la Adherencia Terapeutica supervisado por el equipo medico.
[COPIA AQUI TU IDEA]

Interactua con el paciente cronico para maximizar la adherencia a su tratamiento prescrito:
1. Tono de comunicacion: empatico, cercano, comprensivo, adaptado a personas mayores y libre de juicios de culpabilidad si olvido una toma.
2. Pautas claras ante olvido de dosis: consultar la ficha tecnica del farmaco para indicar si debe tomarla inmediatamente o esperar a la siguiente (nunca doblar dosis).
3. Consejos practicos de administracion: con o sin alimentos, interacciones con liquidos (agua vs leche o zumo), conservacion (temperatura ambiente vs nevera).
4. Refuerzo positivo: celebracion de rachas de cumplimiento terapeutico continuado para consolidar el habito.
5. Recordatorio explicito de no suspender antibioticos, anticoagulantes ni psicofarmacos de forma brusca sin consultar previamente a su medico.

Restricciones:
- No realices cambios de dosis, sustituciones de principios activos ni nuevas prescripciones bajo ninguna circunstancia.
- Ante dudas complejas, genera una tarea de consulta diferida para el facultativo responsable.

Formato de salida: Dialogo interactivo estructurado con opciones de respuesta accesibles para el paciente y resumen de adherencia para el medico.`,
        tags: ["adherencia", "chatbot", "educación-paciente", "crónicos"]
      },
      {
        id: "med-015",
        title: "Detección Precoz y Graduación de Efectos Adversos (CTCAE)",
        desc: "Identifica síntomas reportados por el paciente clasificando su toxicidad según criterios CTCAE.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Medico Especialista en Farmacovigilancia y Evaluacion de Toxicidad en Tratamientos Complejos.
[COPIA AQUI TU IDEA]

Analiza las quejas o sintomas descritos por el paciente bajo tratamiento farmacologico:
1. Identificacion del posible efecto adverso (sospecha de RAM) y asociacion con los farmacos activos en su pauta.
2. Graduacion de severidad segun los Criterios Terminologicos Comunes para Acontecimientos Adversos (CTCAE v5.0):
   - Grado 1: Leve, asintomatico o sintomas leves; solo intervencion clinica o diagnostica.
   - Grado 2: Moderado; intervencion minima o no invasiva requerida; limitacion de actividades cotidianas instrumentales.
   - Grado 3: Grave o medicamente significativo pero no inmediatamente potencialmente mortal; hospitalizacion indicada.
   - Grado 4: Consecuencias que amenazan la vida; intervencion urgente indicada.
3. Algoritmo de accion clinica: pautas de automanejo sintomatico para Grado 1 vs llamada de control de enfermeria para Grado 2 vs derivacion a Urgencias para Grado 3/4.
4. Generacion de la ficha estructurada para notificacion al Sistema Espanol de Farmacovigilancia (Tarjeta Amarilla).

Restricciones:
- Cualquier sintoma sugestivo de anafilaxia, sangrado activo o disnea aguda debe catalogarse inmediatamente como de maxima prioridad.

Formato de salida: Ficha de evaluacion de toxicidad CTCAE en Markdown con accion clinica recomendada y borrador de notificacion.`,
        tags: ["farmacovigilancia", "ctcae", "toxicidad", "efectos-adversos"]
      },
      {
        id: "med-016",
        title: "Sistema de Alertas Tempranas Ambulatorias para Descompensación Crónica",
        desc: "Monitorea biomarcadores en domicilio detectando precozmente descompensaciones en insuficiencia cardíaca, EPOC o diabetes.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Medicina Interna y Telemedicina disenando algoritmos de deteccion precoz de descompensaciones.
[COPIA AQUI TU IDEA]

Disena la logica de monitorizacion domiciliaria para pacientes con patologias cronicas complejas:
1. Reglas de deteccion para Insuficiencia Cardiaca: aumento de peso > 2 kg en 48 horas (retencion hidrica) + incremento de disnea paroxistica nocturna o edemas maleolares.
2. Reglas de deteccion para EPOC: caida de SatO2 basal en > 3% + aumento de volumen/purulencia del esputo (criterios de Anthonisen).
3. Reglas de deteccion para Diabetes Mellitus: glucemias capilares continuadas > 250 mg/dL o eventos de hipoglucemia sintomatica < 60 mg/dL.
4. Ponderacion multivariable: combinacion de biomarcadores objetivos (peso, TA, SatO2) con cuestionario subjetivo diario de 3 preguntas.
5. Escalado gradual de avisos: notificativo al paciente -> mensaje al enfermero gestor de casos -> llamada telefonica prioritaria al medico de atencion primaria.

Restricciones:
- Define los umbrales de alerta con sensibilidad suficiente para evitar reingresos hospitalarios sin saturar al equipo con falsas alarmas.

Formato de salida: Algoritmo en pseudocodigo y modulo de Python con reglas deterministas que reciba mediciones diarias y devuelva el nivel de alerta.`,
        tags: ["telemedicina", "alertas-tempranas", "insuficiencia-cardíaca", "epoc"]
      },
      {
        id: "med-040",
        title: "Monitorización Remota de Insuficiencia Cardíaca con Detección de Congestión Temprana",
        desc: "Procesa registros diarios de peso, disnea y edemas para detectar descompensación hemodinámica antes del ingreso.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Cardiólogo Especialista en Insuficiencia Cardíaca y Telemedicina Avanzada.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de monitorizacion remota de pacientes ambulatorios con insuficiencia cardiaca cronica (ICC):
1. Ingesta diaria de variables fisiologicas: Peso corporal en ayunas, presion arterial, frecuencia cardiaca y sintomas referidos por el paciente (disnea paroxistica nocturna, ortopnea, edemas maleolares).
2. Algoritmo de deteccion de ganancia ponderal rapida (Criterio de alerta: incremento de peso > 2 kg en 3 dias o > 1.5 kg en 24 horas).
3. Clasificacion del nivel de alerta clinica segun el semaforo de descompensacion (Verde: Estable, Amarillo: Alerta de congestion, Rojo: Descompensacion inminente).
4. Protocolo de intervencion guiada en semaforo amarillo: ajuste temporal de diureticos de asa (ej: doblar dosis de Furosemida durante 48 horas) segun pauta medica previa.
5. Alerta de urgencia inmediata en semaforo rojo con instrucciones para acudir al servicio de emergencias o activar ambulancia medicalizada.

Restricciones:
- El sistema es una herramienta de apoyo al seguimiento domiciliario y no debe modificar pautas farmacologicas sin prescripcion medica previa por protocolo.

Formato de salida: Script de Python con logica de decision clinica y modulo de notificaciones asincronas al equipo de cardiologia.`,
        tags: ["insuficiencia-cardíaca", "telemedicina", "monitorización-remota", "descompensación", "cardiología"]
      },
      {
        id: "med-041",
        title: "Estratificación de Riesgo de Abandono Terapéutico con Machine Learning Explicable",
        desc: "Predice la probabilidad de incumplimiento de la pauta farmacológica a partir de patrones de dispensación y cuestionarios.",
        model: "DeepSeek V4",
        prompt: `Eres un Científico de Datos Clínicos especializado en Farmacoepidemiología y Modelado Predictivo.
[COPIA AQUI TU IDEA]

Construye un modelo de machine learning explicable para estratificar el riesgo de no adherencia terapeutica en pacientes cronicos:
1. Definicion de variables predictoras: Tasa de Posesion de Medicacion (Medication Possession Ratio / MPR), numero total de farmacos activos, complejidad del regimen posologico, edad, anos de evolucion de la patologia y respuestas al test de Morisky-Green (MMAS-8).
2. Entrenamiento de un modelo clasificador (LightGBM o XGBoost) calibrado para predecir no adherencia (MPR < 80%) en los proximos 6 meses.
3. Explicabilidad individual mediante valores SHAP (SHapley Additive exPlanations): cuantificacion de que factor especifico contribuye al riesgo de cada paciente (ej: pauta posologica de 3 tomas diarias, coste del copago, etc.).
4. Segmentacion en perfiles de intervencion: Pacientes con olvidos involuntarios (necesidad de recordatorios) vs Pacientes con dudas de eficacia/seguridad (necesidad de educacion sanitaria).
5. Diseno de planes de acompanamiento personalizados con evaluacion del impacto en salud.

Restricciones:
- El modelo debe auditarse para descartar sesgos de prediccion por condicion socioeconomica o genero.

Formato de salida: Pipeline en Python con entrenamiento de modelo, calculo de valores SHAP y grafico de cascada de explicabilidad individual.`,
        tags: ["adherencia", "machine-learning", "shap", "farmacoepidemiología", "morisky-green"]
      },
      {
        id: "med-042",
        title: "Gestión de Alertas de Glucemia Capilar Continua (CGM) y Tiempo en Rango (TIR)",
        desc: "Procesa series temporales de sensores de glucosa intersticial calculando métricas consensuadas ATTD.",
        model: "GPT-4o",
        prompt: `Eres un Endocrinólogo y Especialista en Tecnologías Aplicadas a la Diabetes Mellitus.
[COPIA AQUI TU IDEA]

Implementa el motor analitico para la monitorizacion continua de glucosa (CGM) conforme al consenso internacional ATTD:
1. Ingesta de la serie temporal de glucosa intersticial cada 5 minutos (formato Dexcom, Freestyle Libre o Medtronic).
2. Calculo de metricas clave de control glucemico a 14 y 30 dias:
   - Tiempo en Rango (TIR: 70-180 mg/dL): objetivo clinico > 70%
   - Tiempo por Debajo de Rango Nivel 1 (TBR: 54-69 mg/dL): objetivo < 4%
   - Tiempo por Debajo de Rango Nivel 2 / Hipoglucemia Severa (TBR: < 54 mg/dL): objetivo < 1%
   - Tiempo por Encima de Rango (TAR: > 180 mg/dL): objetivo < 25%
   - Coeficiente de Variacion Glucemica (%CV): objetivo < 36% para estabilidad glucemica
3. Estimacion del Indicador de Gestion de Glucosa (GMI) como proyeccion de la HbA1c esperada.
4. Deteccion de patrones recurrentes de hipoglucemia nocturna no advertida.
5. Alertas de accion inmediata ante tendencias de descenso rapido (> 2 mg/dL por minuto) con recomendacion de ingesta de hidratos de carbono simples (Regla del 15).

Restricciones:
- Aplica filtrado de lecturas aberrantes por presion sobre el sensor durante el sueno (Compression Lows).

Formato de salida: Modulo de Python 'cgm_metrics_engine.py' con visualizacion del Perfil Ambulatorio de Glucosa (AGP).`,
        tags: ["diabetes", "cgm", "tir", "glucosa", "endocrinología", "agp"]
      }
    ]
  },
  {
    id: "triaje-diagnostico",
    name: "Triaje y Diagnóstico Diferencial (M1.4)",
    prompts: [
      {
        id: "med-017",
        title: "Clasificación de Urgencia según Sistema de Triaje de Manchester (MTS)",
        desc: "Estratifica el nivel de urgencia del paciente en 5 categorías cromáticas según discriminadores clínicos objetivos.",
        model: "DeepSeek V4",
        prompt: `Eres un Medico Especialista en Medicina de Urgencias y Emergencias instructor acreditado del Sistema de Triaje de Manchester (MTS).
[COPIA AQUI TU IDEA]

Evalua los signos y sintomas iniciales del paciente y asigna la categoria de triaje segun el diagrama de flujo correspondiente del MTS:
1. Seleccion del diagrama de flujo de entrada adecuado entre los 52 diagramas del MTS (ej: Dolor Toracico, Cefalea, Dificultad Respiratoria, Disnea en adultos).
2. Evaluacion jerarquica de discriminadores generales y especificos:
   - Discriminadores de Nivel 1 (Rojo - Emergencia Vital): Obstruccion via aerea, respiracion inadecuada, shock, hemorragia exanguinante, convulsiones activas. Tiempo maximo de atencion: Inmediato (0 min).
   - Discriminadores de Nivel 2 (Naranja - Muy Urgente): Dolor muy severo, alteracion aguda de conciencia, deficit neurologico brusco. Tiempo: 10 min.
   - Discriminadores de Nivel 3 (Amarillo - Urgente): Dolor moderado, fiebre en paciente inmunodeprimido, vomitos persistentes. Tiempo: 60 min.
   - Discriminadores de Nivel 4 (Verde - Poco Urgente): Dolor leve, traumatismo menor reciente. Tiempo: 120 min.
   - Discriminadores de Nivel 5 (Azul - No Urgente): Problema cronico sin cambios recientes. Tiempo: 240 min.
3. Identificacion explicita del discriminador clave que determina la clasificacion final del paciente.

Restricciones:
- Sigue el principio estricto de seguridad del MTS: el paciente se clasifica por el discriminador mas grave que presente; nunca se promedia.

Formato de salida: Hoja de triaje estructurada con [Diagrama Seleccionado, Discriminador Hallado, Nivel de Prioridad, Color, Tiempo Maximo de Atencion].`,
        tags: ["triaje", "manchester", "urgencias", "mts", "priorización"]
      },
      {
        id: "med-018",
        title: "Generación de Diagnóstico Diferencial y Razonamiento Bayesiano",
        desc: "Genera una lista jerarquizada de hipótesis diagnósticas aplicando probabilidad pre-test y post-test.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Catedratico de Medicina Interna ensenando razonamiento clinico y diagnostico diferencial deductivo.
[COPIA AQUI TU IDEA]

A partir del cuadro clinico, antecedentes y exploracion fisica presentados, elabora el diagnostico diferencial:
1. Hipotesis mas probables (diagnosticos de sospecha principal): justificacion biologica basada en la coincidencia del patron de sintomas.
2. Hipotesis criticas que 'no se pueden dejar pasar' (Rule-Out Must-Not-Miss): patologias de alta mortalidad que comparten sintomas (ej: tromboembolismo pulmonar, diseccion aortica, sepsis).
3. Razonamiento bayesiano: consideracion de la probabilidad pre-test segun edad, sexo y prevalencia de la enfermedad en la comunidad.
4. Identificacion de pruebas complementarias discriminantes: que prueba especifica (laboratorio, imagen, ECG) tiene el mejor Cociente de Probabilidad positivo (Likelihood Ratio LR+) para confirmar o LR- para descartar.
5. Hipotesis alternativas menos frecuentes (diagnosticos de exclusión).

Restricciones:
- No emitas un diagnostico cerrado como dogma; formula hipotesis clinicas jerarquizadas indicando la incertidumbre remanente.

Formato de salida: Documento clinico estructurado con tabla comparativa de hipotesis, sensibilidad/especificidad de pruebas recomendadas y algoritmo de actuacion.`,
        tags: ["diagnóstico-diferencial", "bayesiano", "medicina-interna", "razonamiento"]
      },
      {
        id: "med-019",
        title: "Identificación Sistemática de Banderas Rojas (Red Flags)",
        desc: "Detecta signos de alarma críticos que obligan a derivación hospitalaria inmediata en cualquier consulta.",
        model: "DeepSeek V4",
        prompt: `Eres un Medico Consultor de Seguridad del Paciente y Auditoria de Riesgo Clinico.
[COPIA AQUI TU IDEA]

Analiza el caso clinico en busca de Banderas Rojas (Red Flags) que descartan organicidad grave:
1. Dolor de espalda / Lumbalgia: sindrome de cola de caballo (anestesia en silla de montar, incontinencia esfinteriana), sospecha de fractura por fragilidad, malignidad o espondilodiscitis infecciosa.
2. Cefalea: inicio subito en trueno (sospecha de HSA), signos focales neurologicos, papiledema, paciente > 50 anos con claudicacion mandibular (arteritis de celulas gigantes).
3. Dolor abdominal: signos de irritacion peritoneal (defensa, descompresion dolorosa / Blumberg positivo), pulsacion expansiva en aorta, inestabilidad hemodinamica.
4. Sintomas respiratorios: tiraje intercostal, estridor, taquipnea > 30 rpm, cianosis, incapacidad para pronunciar frases completas.
5. Conclusion y pauta de derivacion inmediata con indicacion del medio de transporte sanitario requerido (SVA vs SVB).

Restricciones:
- Si se detecta una sola Bandera Roja mayor, el sistema debe emitir una advertencia prioritaria destacada en la cabecera.

Formato de salida: Checklist de seguridad clinica en Markdown con evaluacion booleana de cada bandera roja y justificacion fisiopatologica.`,
        tags: ["red-flags", "banderas-rojas", "seguridad", "urgencia-vital"]
      },
      {
        id: "med-043",
        title: "Algoritmo de Triaje Manchester Computacional con Discriminadores Clave",
        desc: "Clasifica pacientes en urgencias en 5 niveles de prioridad clínica con cálculo de tiempo máximo de atención médica.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Médico Especialista en Urgencias y Emergencias Hospitalarias y Auditor de Triaje.
[COPIA AQUI TU IDEA]

Desarrolla el algoritmo de clasificacion de pacientes en el servicio de urgencias basado en el Sistema de Triaje Manchester (MTS):
1. Seleccion del diagrama de presentacion adecuado entre los 52 diagramas oficiales del MTS (ej: Dolor Toracico, Dificultad Respiratoria, Cefalea, Dolor Abdominal).
2. Evaluacion jerarquica de discriminadores generales (Amenaza inmediata para la vida, Dolor severo, Hemorragia mayor, Nivel de consciencia) y discriminadores especificos del motivo de consulta.
3. Asignacion estricta de una de las 5 categorias de prioridad con su color y tiempo maximo teorico de atencion:
   - Nivel 1 / Rojo: Reanimacion (Inmediato - 0 minutos)
   - Nivel 2 / Naranja: Muy Urgente (10 minutos)
   - Nivel 3 / Amarillo: Urgente (60 minutos)
   - Nivel 4 / Verde: Estandar (120 minutos)
   - Nivel 5 / Azul: No Urgente (240 minutos)
4. Registro cronometrado de constantes vitales basales (Tension Arterial, Frecuencia Cardiaca, Saturacion O2, Temperatura, Escala Glasgow).
5. Mecanismo de re-triaje obligatorio si el tiempo de espera supera el umbral reglamentario o si se detecta deterioro clinico.

Restricciones:
- No clasifiques a ningun paciente en nivel verde o azul si presenta alteracion de constantes vitales criticas.

Formato de salida: Motor de reglas en Python con validacion de caminos de decision clinica y registro auditable en DuckDB.`,
        tags: ["triaje", "manchester", "urgencias", "priorización", "medicina-de-urgencias"]
      },
      {
        id: "med-044",
        title: "Diagnóstico Diferencial Asistido en Dolor Torácico Agudo (Protocolo HEART)",
        desc: "Calcula el HEART Score para estratificar riesgo de eventos cardíacos adversos mayores (MACE) a 30 días.",
        model: "DeepSeek V4",
        prompt: `Eres un Cardiólogo de Cuidados Agudos y Médico de Urgencias Cardiovasculares.
[COPIA AQUI TU IDEA]

Implementa el protocolo de estratificacion y diagnostico diferencial para pacientes que consultan por dolor toracico agudo:
1. Calculo del HEART Score evaluando sus 5 componentes (0 a 2 puntos por factor, total 0-10):
   - Historia clinica (H: Altamente sospechosa, moderadamente sospechosa, poco sospechosa)
   - Electrocardiograma (E: Depresion ST significativa, alteraciones repolarizacion inespecificas, normal)
   - Edad (A: >= 65 anos, 45-64 anos, < 45 anos)
   - Factores de riesgo cardiovascular (R: >= 3 factores o aterosclerosis documentada, 1-2 factores, sin factores)
   - Troponina inicial (T: > 3x limite superior, 1-3x limite superior, normal)
2. Estratificacion de riesgo de MACE a 30 dias: Bajo Riesgo (0-3 puntos, riesgo MACE 1.7%), Riesgo Intermedio (4-6 puntos, riesgo MACE 16.6%), Alto Riesgo (7-10 puntos, riesgo MACE 50.1%).
3. Algoritmo diferencial de descarte de causas potencialmente mortales no isquemicas: Diseccion Aortica, Embolia Pulmonar, Neumotorax a Tension, Ruptura Esofagica (Sindrome de Boerhaave) y Taponamiento Cardiaco.
4. Recomendacion de destino asistencial: Alta precoz para estudio ambulatorio vs Observacion con curva de troponinas ultrasensibles (0h/1h o 0h/2h) vs Ingreso directo en Unidad Coronaria.

Restricciones:
- Exige la exclusion explicita de elevacion del segmento ST (SCACEST) que activa inmediatamente el protocolo de angioplastia primaria (Codigo Infarto).

Formato de salida: Modulo de Python 'heart_score_pathway.py' con arbol de decisiones clinicas y salidas estructuradas en JSON.`,
        tags: ["dolor-torácico", "heart-score", "mace", "urgencias", "cardiología", "código-infarto"]
      },
      {
        id: "med-045",
        title: "Detección Precoz de Sepsis Hospitalaria mediante Criterios qSOFA y NEWS2",
        desc: "Monitorea signos de disfunción orgánica aguda para activar el Código Sepsis en plantas de hospitalización.",
        model: "GPT-4o",
        prompt: `Eres un Médico Intensivista y Coordinador del Protocolo Código Sepsis Hospitalario.
[COPIA AQUI TU IDEA]

Crea el sistema de alerta temprana para la deteccion precoz de sepsis y shock septico en pacientes hospitalizados:
1. Calculo automatizado del qSOFA (quick SOFA) sobre 3 criterios clinicos a pie de cama (1 punto cada uno):
   - Frecuencia respiratoria >= 22 rpm
   - Alteracion del nivel de consciencia (Glasgow < 15)
   - Presion arterial sistolica <= 100 mmHg
   (Puntuacion >= 2 indica alta sospecha de sepsis con elevado riesgo de mortalidad).
2. Evaluacion continua del National Early Warning Score 2 (NEWS2) que incorpora saturacion de O2, aporte de oxigenoterapia y temperatura.
3. Activacion del paquete de medidas 'Sepsis Six' en la primera hora de deteccion (Golden Hour):
   - Administracion de oxigeno para saturacion 94-98%
   - Extraccion de hemocultivos antes de antibioticos
   - Inicio de antibioticos de amplio espectro por via intravenosa
   - Fluidoterapia intravenosa con cristaloides balanceados (30 mL/kg)
   - Medicion de lactato serico seriado
   - Monitorizacion horaria de diuresis mediante sondaje vesical
4. Criterios de shock septico: necesidad de vasopresores (Noradrenalina) para mantener PAM >= 65 mmHg y lactato > 2 mmol/L a pesar de fluidoterapia adecuada.

Restricciones:
- No demores el inicio de antibioticos mas alla de 60 minutos ante sospecha fundada de sepsis.

Formato de salida: Servicio de alertas en Python con conector a constantes vitales de EHR y generador de checklist del Codigo Sepsis.`,
        tags: ["sepsis", "qsofa", "news2", "código-sepsis", "cuidados-intensivos", "golden-hour"]
      },
      {
        id: "med-046",
        title: "Evaluación de Ictus Isquémico Agudo mediante Escala NIHSS y Ventana Terapéutica",
        desc: "Cuantifica el déficit neurológico con la escala NIHSS (0-42) y evalúa criterios de inclusión para trombólisis y trombectomía.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Neurólogo Vascular y Especialista en Unidades de Ictus de Alta Resolución.
[COPIA AQUI TU IDEA]

Desarrolla el calculador y protocolo de actuacion para la atencion inmediata del ictus isquemico agudo (Codigo Ictus):
1. Evaluacion de los 11 items de la escala National Institutes of Health Stroke Scale (NIHSS): Nivel de consciencia, mirada conjugada, campos visuales, paralisis facial, fuerza en extremidades, ataxia, sensibilidad, lenguaje (afasia), disartria y extincion/inatencion (puntuacion total 0 a 42).
2. Determinacion de la hora exacta de inicio de los sintomas o de 'ultima vez visto asintomatico' (Last Known Well / LKW) para definir la ventana de actuacion terapeutica.
3. Criterios de elegibilidad para trombolisis intravenosa con r-tPA / Tenecteplase (ventana estandar < 4.5 horas): verificacion de contraindicaciones (hemorragia cerebral previa, plaquetas < 100.000, anticoagulacion oral activa con INR > 1.7, cirugia mayor reciente).
4. Criterios de seleccion para trombectomia mecanica endovascular (ventana hasta 6 horas o hasta 24 horas guiada por neuroimagen con mismatch penumbra/nucleo segun criterios DAWN/DEFUSE-3).
5. Monitorizacion estricta de tension arterial: objetivo < 185/110 mmHg previo a trombolisis con labetalol o urapidil intravenoso.

Restricciones:
- El uso de la escala requiere verificacion formal de que no se incurre en errores de paralisis previa o deficits cronicos preexistentes.

Formato de salida: Modulo de Python 'nihss_stroke_protocol.py' con calculo puntuado item por item y checklist de inclusion terapeutica.`,
        tags: ["ictus", "nihss", "código-ictus", "neurología", "trombolisis", "trombectomía"]
      }
    ]
  },
  {
    id: "calculadora-medica",
    name: "Calculadora Médica y Razonamiento Fisiológico (M1.5)",
    prompts: [
      {
        id: "med-020",
        title: "Implementación Determinista de Escalas Clínicas (CKD-EPI, CHA2DS2-VASc, MELD)",
        desc: "Programa calculadoras clínicas con validación estricta de parámetros y ausencia de alucinaciones matemáticas.",
        model: "DeepSeek V4",
        prompt: `Eres un Matematico Biomedico y Desarrollador de Software de Calculo Clinico Validado.
[COPIA AQUI TU IDEA]

Implementa el modulo de calculo determinista para las siguientes escalas medicas de referencia:
1. Filtrado Glomerular Estimado (eGFR) mediante formula CKD-EPI 2021 (sin ajuste racial, basada en creatinina serica, edad y sexo).
2. Escala CHA2DS2-VASc de riesgo tromboembolico en Fibrilacion Auricular: puntuacion desglosada (IC, HTA, Edad >=75 (+2), Diabetes, Ictus previo (+2), Enf. Vascular, Edad 65-74, Sexo femenino).
3. Puntuacion MELD (Model for End-Stage Liver Disease) para severidad hepatica: formula logaritmica basada en Bilirrubina, INR y Creatinina serica.
4. Comprobacion de rangos biologicos admisibles (ej: creatinina entre 0.1 y 20 mg/dL, INR entre 0.8 y 15.0) para descartar errores tipograficos de entrada.
5. Estratificacion del riesgo clinico resultante segun las guias de practica clinica internacionales vigentes (KDIGO, ESC, AASLD).

Restricciones:
- Las formulas deben implementarse con exactitud matematica absoluta en codigo ejecutable, no mediante estimaciones probabilisticas del LLM.

Formato de salida: Funciones puras de Python completamente tipadas con doctests que verifiquen casos clinicos conocidos de referencia.`,
        tags: ["calculadoras", "ckd-epi", "chads-vasc", "meld", "determinista"]
      },
      {
        id: "med-021",
        title: "Razonamiento Fisiopatológico y Justificación Mecanística de Scores",
        desc: "Explica detalladamente la base fisiopatológica por la cual cada variable influye en el resultado de la escala.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Profesor de Fisiologia y Farmacologia Medica en la Facultad de Medicina.
[COPIA AQUI TU IDEA]

Para los resultados de la escala clinica evaluada, redacta la justificacion fisiopatologica integral:
1. Mecanismo biologico de cada variable individual: por que un valor alterado aumenta el riesgo hemodinamico, trombotico o metabolico.
2. Efecto sinergico de comorbilidades: como interactua, por ejemplo, la hipertension arterial con la edad avanzada en el dano del endotelio vascular cerebral.
3. Implicaciones pronosticas a corto y largo plazo si no se interviene clinicamente.
4. Umbrales de intervencion terapeutica: que puntuacion exacta activa la indicacion formal de tratamiento farmacologico segun guias (ej: anticoagulacion en CHA2DS2-VASc >= 1 en hombres o >= 2 en mujeres).
5. Factores modificables vs no modificables para orientar la educacion y el seguimiento del paciente.

Restricciones:
- Rigor fisiologico exhaustivo citando receptores, vias bioquimicas y fenomenos biomecanicos relevantes.

Formato de salida: Texto explicativo estructurado en secciones anatomoclinicas con diagramas conceptuales en formato de texto.`,
        tags: ["fisiopatología", "educación-médica", "mecanismos", "scores"]
      },
      {
        id: "med-047",
        title: "Calculadora de Riesgo Quirúrgico y Mortalidad Perioperatoria (ACS NSQIP y POSSUM)",
        desc: "Estima la probabilidad de complicaciones graves y mortalidad a 30 días en pacientes sometidos a cirugía mayor.",
        model: "DeepSeek V4",
        prompt: `Eres un Cirujano General y Analista de Seguridad y Calidad Quirúrgica Perioperatoria.
[COPIA AQUI TU IDEA]

Crea el calculador multidimensional de riesgo quirurgico preoperatorio combinando los modelos de la ACS NSQIP y P-POSSUM:
1. Ingesta de variables prequirurgicas del paciente: Edad, estado funcional dependiente/independiente, clasificacion ASA (I a V), comorbilidades (diabetes, EPOC, cardiopatia, hipertension), estado septico preoperatorio y procedimiento quirurgico previsto (codigo CPT).
2. Calculo del Physiological and Operative Severity Score for the Enumeration of Mortality and Morbidity (POSSUM): puntuacion fisiologica preoperatoria (12 parametros clinico-analiticos) y puntuacion de severidad operatoria (magnitud de la intervencion, perdida hematica, contaminacion peritoneal, presencia de malignidad).
3. Estimacion probabilistica mediante ecuacion logistica de mortalidad perioperatoria a 30 dias y morbilidad quirurgica mayor (dehiscencia de sutura, infeccion de sitio quirurgico, neumonia, fracaso renal).
4. Recomendaciones preoperatorias de optimizacion: correccion de anemia prequirurgica, deshabituacion tabaquica, terapia respiratoria y reserva de cama en UCI postquirurgica.
5. Generacion de documento explicativo para el proceso de consentimiento informado adaptado al nivel cultural del paciente.

Restricciones:
- Distingue claramente entre cirugia electiva programada vs cirugia urgente/emergente donde los riesgos se incrementan exponencialmente.

Formato de salida: Modulo en Python 'surgical_risk_possum.py' con calibracion parametrica y generacion de informe de riesgo en Markdown.`,
        tags: ["cirugía", "riesgo-quirúrgico", "possum", "asa", "perioperatorio", "mortalidad"]
      },
      {
        id: "med-048",
        title: "Estratificación de Riesgo de Tromboembolismo Venoso con Escala de Caprini y Padua",
        desc: "Determina la necesidad y tipo de tromboprofilaxis farmacológica y mecánica en pacientes médicos y quirúrgicos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Hematólogo Clínico y Consultor de Tromboprofilaxis en Pacientes Hospitalizados.
[COPIA AQUI TU IDEA]

Implementa el sistema de decision clinica para la prevencion de la enfermedad tromboembolica venosa (ETV: TVP y TEP):
1. Algoritmo para pacientes quirurgicos mediante el Score de Caprini: evaluacion de factores de riesgo ponderados (edad, cirugia mayor, inmovilizacion, cancer activo, antecedente de ETV, trombofilia genetica, etc.).
   - Riesgo Muy Bajo (0 puntos), Bajo (1-2), Moderado (3-4), Alto (5-8), Muy Alto (>= 9).
2. Algoritmo para pacientes medicos no quirurgicos mediante la Escala de Padua (puntuacion >= 4 indica alto riesgo tromboembolico).
3. Evaluacion concomitante del riesgo hemorragico mediante la escala IMPROVE Bleeding Risk Score para identificar contraindicaciones de anticoagulacion.
4. Protocolo de tromboprofilaxis guiada segun guias CHEST: Eleccion entre profilaxis mecanica (medias de compresion gradual / compresion neumatica intermitente) vs profilaxis farmacologica (Heparinas de Bajo Peso Molecular / HBPM como Enoxaparina o Bemiparina).
5. Ajuste de dosis de HBPM segun peso extremo (obesidad morbida IMC > 40) y funcion renal (aclaramiento de creatinina < 30 mL/min).

Restricciones:
- Si el riesgo hemorragico supera al riesgo tromboembolico, prescribe exclusivamente profilaxis mecanica hasta la estabilizacion del sangrado.

Formato de salida: Script de decision en Python con clases de riesgo y ficha de pauta profilactica estructurada en JSON.`,
        tags: ["tromboembolismo", "caprini", "padua", "tromboprofilaxis", "hbpm", "hematología"]
      },
      {
        id: "med-049",
        title: "Evaluación Pronóstica en Cirrosis Hepática mediante Puntuaciones MELD-Na y Child-Pugh",
        desc: "Calcula el MELD-Na para priorización en lista de trasplante hepático y Child-Pugh para reserva funcional.",
        model: "DeepSeek V4",
        prompt: `Eres un Hepatólogo Especialista en Trasplante Hepático y Enfermedad Hepática Terminal.
[COPIA AQUI TU IDEA]

Construye la calculadora pronostica de insuficiencia hepatica cronica y cirrosis descompensada:
1. Calculo de la clasificacion de Child-Pugh (5 a 15 puntos, estadios A, B y C) evaluando 5 parametros:
   - Bilirrubina total (mg/dL)
   - Albumina serica (g/dL)
   - INR / Tiempo de Protrombina
   - Grado de ascitis (Ausente, Leve/Moderada, Refractaria)
   - Grado de encefalopatia hepatica (Grados 0 a IV segun criterios de West Haven)
2. Calculo formal de la puntuacion MELD (Model for End-Stage Liver Disease) y MELD-Na segun la formula oficial de la UNOS/OPTN:
   - MELD = 9.57 * ln(Creatinina) + 3.78 * ln(Bilirrubina) + 11.2 * ln(INR) + 6.43
   - Ajuste por Sodio serico (MELD-Na): incorporacion de la hiponatremia dilucional como marcador independiente de mortalidad.
3. Estimacion de la supervivencia y mortalidad esperada a 3 meses segun la puntuacion MELD-Na obtenida.
4. Deteccion de criterios para indicacion de evaluacion de trasplante hepatico urgente (MELD-Na >= 15 o descompensacion hepatica grave).
5. Comprobacion de limites matematicos de corte segun normativa UNOS (limites de creatinina fijados entre 1.0 y 4.0 mg/dL).

Restricciones:
- Documenta explicitamente si el paciente se encuentra en tratamiento sustitutivo renal (hemodialisis) fijando la creatinina en 4.0 mg/dL automaticamente.

Formato de salida: Modulo de Python 'meld_child_pugh.py' con tipado estricto Pydantic y representacion grafica del pronostico.`,
        tags: ["hepatología", "meld", "meld-na", "child-pugh", "cirrosis", "trasplante-hepático"]
      }
    ]
  },
  {
    id: "analizador-ehr",
    name: "Analizador de EHR y Resumen SOAP (M1.6)",
    prompts: [
      {
        id: "med-022",
        title: "Resumen Cronológico Condensado de Historia Clínica Electrónica",
        desc: "Sintetiza historiales médicos extensos de 50+ páginas en un cronograma clínico relevante de 1 página.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Medico Especialista en Documentacion Clinica preparando el pase de guardia hospitalario.
[COPIA AQUI TU IDEA]

Sintetiza la historia clinica electronica completa del paciente preservando los hechos medicos determinantes:
1. Perfil del paciente: edad, sexo, alergias medicamentosas destacadas y diagnosticos cronicos basales principales.
2. Cronograma evolutivo: linea temporal ordenada de ingresos hospitalarios, intervenciones quirurgicas previas e hitos diagnosticos mayores.
3. Evolucion del episodio actual: motivo de consulta original, tratamientos administrados y respuesta clinica observada durante la estancia.
4. Tendencia de pruebas clave: tabla comparativa de la evolucion de los principales parametros biologicos (hemoglobina, leucocitos, PCR, creatinina).
5. Plan activo pendiente: pruebas diagnósticas pendientes de resultado, interconsultas solicitadas y objetivos para el alta.

Restricciones:
- Elimina redundancias burocraticas y notas repetitivas de enfermeria o constantes rutinarias normales.
- No omitas nunca ningun antecedente quirurgico mayor ni ningun tratamiento biologico o inmunosupresor activo.

Formato de salida: Resumen ejecutivo estructurado en Markdown apto para lectura en 60 segundos antes de entrar a ver al paciente.`,
        tags: ["ehr", "resumen-clínico", "cronograma", "pase-guardia"]
      },
      {
        id: "med-023",
        title: "Generación de Nota de Evolución Clínica Estructurada en Formato SOAP",
        desc: "Redacta notas médicas asistenciales estandarizadas en los bloques Subjetivo, Objetivo, Análisis y Plan.",
        model: "GPT-4o",
        prompt: `Eres un Medico Adjunto del Servicio de Medicina Interna redactando la nota de evolucion en la estacion clinica.
[COPIA AQUI TU IDEA]

A partir de los datos de la visita del dia de hoy, redacta la nota de evolucion clinica estandarizada en formato SOAP:
1. S (Subjetivo): sensaciones referidas por el paciente (dolor en escala EVA, disnea, descanso nocturno, tolerancia oral, diuresis y transito intestinal).
2. O (Objetivo): constantes vitales de las ultimas 24h (TA, FC, T, SatO2), exploracion fisica sistematizada por aparatos y resultados de analiticas o pruebas de imagen recibidas hoy.
3. A (Analisis / Evaluacion): juicio clinico sobre la situacion del paciente en comparacion con el dia previo (mejoria, estabilidad, empeoramiento), evaluacion de la respuesta al tratamiento y control de complicaciones.
4. P (Plan): modificaciones farmacologicas pautadas para las proximas 24 horas, pruebas a solicitar manana, pauta de fluidoterapia y prevision estimada de alta hospitalaria.
5. Firma electronica estandarizada con identificador facultativo ficticio y hora de la valoracion.

Restricciones:
- Respeta escrupulosamente la separacion de los 4 bloques del estandar SOAP; no mezcles datos subjetivos en el analisis.

Formato de salida: Nota clinica formateada en bloque de texto estandarizado para copia directa en el software hospitalario (EHR).`,
        tags: ["soap", "nota-clínica", "evolución", "subjetivo-objetivo"]
      },
      {
        id: "med-024",
        title: "Conciliación de Medicación Activa al Alta Hospitalaria",
        desc: "Compara la medicación crónica previa con la pauta hospitalaria resolviendo duplicidades y omisiones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Medico Especialista en Farmacia Clinica responsable de la conciliacion de medicacion al alta hospitalaria.
[COPIA AQUI TU IDEA]

Compara la lista de medicacion cronica domiciliaria con los farmacos prescritos durante el ingreso hospitalario:
1. Clasificacion de cada medicamento en una de las 4 categorias de conciliacion:
   - Continuado: medicacion cronica que debe mantenerse a la misma dosis y pauta.
   - Modificado: medicacion previa que requiere ajuste de dosis o frecuencia justificado por la situacion actual.
   - Suspendido: medicacion domiciliaria retirada deliberadamente (explicar motivo clinico exacto).
   - Nuevo: tratamiento pautado durante el ingreso que debe continuar de forma ambulatoria (especificar duracion prevista).
2. Deteccion de discrepancias no intencionadas: omisiones accidentales de farmacos esenciales o duplicidades terapeuticas por sustitucion por equivalentes terapeuticos en el hospital.
3. Informacion de transicion para el paciente: que medicinas que tomaba antes NO debe volver a tomar al llegar a casa.
4. Documento de conciliacion para el Medico de Atencion Primaria garantizando la continuidad asistencial.

Restricciones:
- Presta especial atencion a la conciliacion de anticoagulantes orales, antidiabeticos, antihipertensivos y analgesicos opioides.

Formato de salida: Tabla de conciliacion farmacoterapeutica al alta con columnas [Medicamento, Estado de Conciliacion, Pauta al Alta, Justificacion Clinica].`,
        tags: ["conciliación", "alta-hospitalaria", "seguridad-medicación", "farmacia"]
      },
      {
        id: "med-050",
        title: "Estructuración de Notas Clínicas Desestructuradas en Formato SOAP con Med-NER",
        desc: "Extrae entidades clínicas de texto libre y las clasifica en Subjetivo, Objetivo, Evaluación y Plan.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de NLP Biomédico y Analista de Historias Clínicas Electrónicas (EHR).
[COPIA AQUI TU IDEA]

Crea el pipeline de transformacion de notas clinicas narrativas desestructuradas hacia el estandar formal SOAP (Subjective, Objective, Assessment, Plan):
1. Reconocimiento de Entidades Nombradas Medicas (Med-NER): identificacion de sintomas, signos fisicos, pruebas complementarias, diagnosticos presuntivos y pautas farmacologicas.
2. Clasificacion por cuadrantes SOAP:
   - Subjetivo (S): Anamnesis, queja principal del paciente (Chief Complaint) e historia de la enfermedad actual.
   - Objetivo (O): Constantes vitales, hallazgos de la exploracion fisica y resultados de analiticas o radiodiagnostico.
   - Evaluacion (A): Juicio diagnostico del medico, analisis evolutivo y diagnostico diferencial.
   - Plan (P): Pruebas solicitadas, cambios terapeuticos, derivaciones a especialistas y citas de revision.
3. Deteccion de afirmaciones negadas (ej: 'niega fiebre', 'sin signos de focalidad neurologica') mediante adaptacion del algoritmo NegEx para no atribuir sintomas falsos.
4. Generacion de ficha estructurada en formato JSON con vinculacion de cada entidad a su fragmento de texto original (Character Offsets).
5. Resumen ejecutivo de 3 lineas para el pase de guardia medico entre facultativos.

Restricciones:
- No sintetices o alucines datos que no aparezcan explicitamente mencionados en el texto de la nota medica.

Formato de salida: Pipeline en Python utilizando modelos de SpaCy biomédicos y salida estructurada en JSON validada.`,
        tags: ["soap", "nlp", "ner", "ehr", "negex", "historia-clínica"]
      },
      {
        id: "med-051",
        title: "Línea Temporal Longitudinal de Comorbilidades y Cronología de Episodios Médicos",
        desc: "Reconstruye la trayectoria clínica de pacientes crónicos complejos ordenando ingresos, diagnósticos y cirugías.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Informático Médico y Desarrollador de Herramientas de Visualización Longitudinal de Pacientes.
[COPIA AQUI TU IDEA]

Construye el motor de cronologia clinica para pacientes cronicos pluripatologicos a partir de registros dispersos de EHR:
1. Ingesta y normalizacion de multiples episodios asistenciales: Consultas de atencion primaria, ingresos hospitalarios, atenciones en urgencias e intervenciones quirurgicas.
2. Resolucion de marcas temporales incompletas o relativas (ej: 'hace 3 anos', 'en mayo de 2021') a fechas absolutas ISO 8601.
3. Clasificacion tematica por lineas de evolucion de comorbilidades cronicas: Eje Cardiovascular, Eje Metabolico, Eje Oncologico, Eje Respiratorio.
4. Deteccion de hitos clinicos cardinales: fecha de primer diagnostico de enfermedad cronica, inicio de insulinizacion, colocacion de stent coronario o implante de protesis.
5. Calculo acumulado del Indice de Comorbilidad de Charlson (CCI) a lo largo del tiempo para evaluar la progresion del riesgo de mortalidad a 10 anos.

Restricciones:
- Detecta y fusiona menciones duplicadas de un mismo diagnostico formuladas en diferentes episodios para no sobreestimar la carga de enfermedad.

Formato de salida: Script de Python con generacion de esquema cronologico en JSON y renderizado de diagrama de Gantt clinico en Mermaid.`,
        tags: ["cronología-clínica", "longitudinal", "charlson", "pluripatológico", "ehr"]
      },
      {
        id: "med-052",
        title: "Detección de Reingresos Hospitalarios Evitables a 30 Días con Puntuación LACE",
        desc: "Calcula el índice LACE al alta hospitalaria para predecir reingreso no planificado o muerte precoz.",
        model: "DeepSeek V4",
        prompt: `Eres un Epidemiólogo Hospitalario y Gestor de Calidad Asistencial y Continuidad de Cuidados.
[COPIA AQUI TU IDEA]

Implementa el calculador del indice LACE (Length of stay, Acuity, Comorbidities, Emergency visits) para estratificar el riesgo de reingreso a 30 dias:
1. Calculo de los 4 componentes del LACE index (puntuacion total de 0 a 19):
   - L (Length of stay): Estancia hospitalaria en dias (0 a 7 puntos).
   - A (Acuity of admission): Ingreso urgente vs electivo (3 puntos si fue urgente a traves de urgencias, 0 si programado).
   - C (Comorbidities): Indice de comorbilidad de Charlson no ponderado (0 a 5 puntos).
   - E (Emergency department visits): Numero de visitas a urgencias en los 6 meses previos al ingreso actual (0 a 4 puntos).
2. Estratificacion del riesgo de reingreso precoz o fallecimiento a 30 dias: Riesgo Bajo (0-4), Riesgo Moderado (5-9), Riesgo Alto (>= 10).
3. Plan de transicion asistencial para pacientes de alto riesgo: cita presencial con atencion primaria en < 48-72 horas, llamada telefonica de seguimiento de enfermeria y conciliacion de medicacion en farmacia comunitaria.
4. Identificacion de factores modificables de vulnerabilidad social que incrementan el riesgo (vivir solo, dependencia funcional, barrera idiomatica).
5. Exportacion de panel analitico de tasas de reingreso por servicio clinico hospitalario.

Restricciones:
- Valida que la fecha de alta sea definitiva y no un traslado interservicios o interhospitalario.

Formato de salida: Modulo de Python 'lace_readmission_scorer.py' con tipado Pydantic y reporte de plan de transicion asistencial.`,
        tags: ["reingreso", "lace-index", "calidad-asistencial", "alta-hospitalaria", "continuidad-asistencial"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Guardrails, Auditoría y Alertas)",
    prompts: [
      {
        id: "med-025",
        title: "Guardrail de Seguridad Clínica Extrema para Respuestas de IA",
        desc: "Filtra salidas del modelo asegurando que nunca emita diagnósticos cerrados ni indicaciones farmacológicas letales.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Alineacion y Seguridad Clinica de Modelos de Inteligencia Artificial Sanitaria.
[COPIA AQUI TU IDEA]

Audita y filtra la respuesta generada por el agente de IA antes de que sea presentada en pantalla al usuario:
1. Verificacion de Guardrail 1 (No diagnostico definitivo): asegurar que la respuesta incluye formulas probabilistas ('podria sugerir', 'hallazgos compatibles con') y no aseveraciones categoricas.
2. Verificacion de Guardrail 2 (No dosis letales): comprobacion de que cualquier dosificacion farmacologica mencionada se encuentra dentro de los limites seguros de la ficha tecnica de la AEMPS/FDA.
3. Verificacion de Guardrail 3 (Supervision humana obligatoria): inclusion visible de la advertencia de que la informacion requiere validacion presencial por un facultativo colegiado.
4. Verificacion de Guardrail 4 (Protocolo ante ideacion autolitica): si se detecta cualquier mencion a suicidio o autolesion, bloquear la respuesta habitual y desplegar exclusivamente el telefono de atencion a la conducta suicida (024 en Espana / 988 en USA).
5. Veredicto del filtro: Aprobada para emision / Modificacion requerida / Rechazada y bloqueada.

Restricciones:
- Tolerancia cero a respuestas que puedan inducir a error terapeutico directo o retraso en la atencion medica urgente.

Formato de salida: JSON estructurado con {'passed': boolean, 'violations': list, 'filtered_output': string, 'risk_score': float}.`,
        tags: ["guardrails", "seguridad-ia", "alineamiento", "salud-mental"]
      },
      {
        id: "med-026",
        title: "Normalización de Abreviaturas y Acrónimos Médicos Locales",
        desc: "Traduce jerga y abreviaturas hospitalarias informales en terminología clínica formal comprensible.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Lingüista Computacional Medico experto en dialectos y jergas clinicas hospitalarias en espanol.
[COPIA AQUI TU IDEA]

Normaliza las abreviaturas medicas ambiguas del informe clinico transformandolas en su expresion canonica:
1. Desambiguacion segun el contexto de la especialidad (ej: 'FA' en cardiologia = Fibrilacion Auricular; en reumatologia = Fosfatasa Alcalina; en oncologia = Factor Antinuclear).
2. Normalizacion de abreviaturas de exploracion fisica: 'ACR' -> Auscultacion Cardiorrespiratoria, 'MVC' -> Murmullo Vesicular Conservado, 'PPL' -> Puno-Percusion Lumbar.
3. Expansion de pautas posologicas clasicas: 'c/8h v.o.' -> 'cada 8 horas por via oral', 's.c.' -> 'subcutanea', 'b.i.d.' -> 'dos veces al dia'.
4. Identificacion de acronimos de enfermedades: 'EPOC' -> Enfermedad Pulmonar Obstructiva Cronica, 'ACV' -> Accidente Cerebrovascular, 'SCA' -> Sindrome Coronario Agudo.
5. Preservacion del texto original enriquecido con etiquetas HTML accesibles <abbr title='Texto expandido'> para consulta interactiva.

Restricciones:
- Si una abreviatura resulta genuinamente indescifrable o ambigua en su contexto, marcarla como [Abreviatura no resuelta: XX] en lugar de inventar el significado.

Formato de salida: Texto clinico normalizado en espanol estandar acompanado del glosario de equivalencias aplicadas.`,
        tags: ["abreviaturas", "normalización", "jerga-médica", "acrónimos"]
      },
      {
        id: "med-027",
        title: "Exportación de Informes Médicos en PDF con Hash de Integridad Criptográfica",
        desc: "Genera informes clínicos listos para impresión con sello temporal y firma digital para garantizar no repudio.",
        model: "GPT-4o",
        prompt: `Eres un Especialista en Informatica Forense y Validez Juridica de la Historia Clinica Digital.
[COPIA AQUI TU IDEA]

Disena la plantilla y el proceso de compilacion a PDF del informe de asistencia medica:
1. Estructura visual sobria institucional: membrete del centro sanitario, identificador unico de episodio y numero de historia clinica anonimizado.
2. Contenido clinico estructurado: motivo de consulta, antecedentes, exploracion, juicio diagnostico, tratamiento prescrito y recomendaciones.
3. Seccion de trazabilidad forense al pie de pagina: fecha y hora exacta de creacion con zona horaria UTC, software y version generadora.
4. Generacion de huella digital criptografica (Hash SHA-256) del contenido textual del informe para garantizar que no ha sido alterado con posterioridad.
5. Insercion de codigo QR que codifica la URL de verificacion del hash en la sede electronica hospitalaria.

Restricciones:
- Maquetacion compatible con librerias de generacion de PDF (ReportLab en Python o WeasyPrint) con paginacion 'Pagina X de Y'.

Formato de salida: Codigo completo de plantilla HTML/CSS optimizada para impresion en pagina A4 y script de firma de hash en Python.`,
        tags: ["pdf", "firma-digital", "hash", "integridad", "forense"]
      },
      {
        id: "med-028",
        title: "Registro de Auditoría Inmutable (Audit Trail) para Cumplimiento HIPAA / RGPD",
        desc: "Estructura el log de accesos y modificaciones sobre datos de salud para auditorías de seguridad.",
        model: "DeepSeek V4",
        prompt: `Eres un Delegado de Proteccion de Datos (DPO) y Auditor de Seguridad de la Informacion Sanitaria (ISO 27799 / ENS).
[COPIA AQUI TU IDEA]

Disena el esquema y la logica de captura para el registro de auditoria inmutable (Audit Trail) de la aplicacion medica:
1. Eventos obligatorios a auditar segun RGPD y HIPAA: acceso a registro de paciente (Read), modificacion de diagnostico (Update), emision de receta (Create), exportacion de informe (Export) y consulta de IA asistida.
2. Campos obligatorios por registro: timestamp ISO 8601 con milisegundos UTC, user_id, user_role, patient_id, action_type, resource_affected, ip_address, terminal_id y justification_code (motivo asistencial del acceso).
3. Mecanismo de inmutabilidad: encadenamiento de registros mediante hashes criptograficos sucesivos (Audit Log Blockchain-like o append-only table en PostgreSQL con WORM).
4. Deteccion de accesos sospechosos o no autorizados: alertas ante accesos fuera de horario de guardia, consultas masivas o busquedas de figuras publicas/empleados.
5. Politica de retencion y archivo: conservacion obligatoria durante 5 anos segun legislacion espanola de autonomia del paciente (Ley 41/2002).

Restricciones:
- El propio archivo de log de auditoria NUNCA debe almacenar datos clinicos en plano para evitar que se convierta en vector de fuga de datos.

Formato de salida: Esquema DDL en SQL para base de datos relacional y funcion de Python 'log_clinical_access()' para su uso como decorador en el backend.`,
        tags: ["audit-trail", "rgpd", "hipaa", "seguridad", "inmutabilidad"]
      },
      {
        id: "med-029",
        title: "Despachador de Alertas Sanitarias de Código de Emergencia (Ictus, Sepsis, Parada)",
        desc: "Genera y despacha alertas inmediatas a buscapersonas y terminales hospitalarios ante sospecha de patología tiempo-dependiente.",
        model: "DeepSeek V4",
        prompt: `Eres un Coordinador Medico de Emergencias Hospitalarias responsable de la activacion de codigos de atencion tiempo-dependientes.
[COPIA AQUI TU IDEA]

Desarrolla el despachador de activacion de codigos medicos urgentes ante criterios de entrada:
1. Codigo Ictus: escala Cincinnati positiva (asimetria facial, debilidad en brazo, alteracion del lenguaje) con inicio de sintomas < 4.5 horas. Accion: alerta prioritaria a Neurologia, reserva inmediata de TAC craneal y preparacion de fibrinolisis.
2. Codigo Sepsis: sospecha de infeccion + puntuacion qSOFA >= 2 (TA sistolica <= 100 mmHg, FR >= 22 rpm, alteracion de conciencia). Accion: alerta a UCI/Urgencias, extraccion inmediata de hemocultivos y antibioterapia de amplio espectro en < 1 hora ('Golden Hour').
3. Codigo Infarto (SCACEST): dolor toracico opresivo + elevacion persistente de ST en ECG. Accion: activacion de sala de hemodinamica para angioplastia primaria en < 90 minutos.
4. Generacion del mensaje de difusion ultracorto (SMS / buscapersonas / alerta sonilente en estacion clinica): Ubicacion, Edad, Sexo, Codigo Activado, Hora de inicio.
5. Registro del tiempo puerta-aguja / puerta-balon para monitorizacion de calidad asistencial.

Restricciones:
- No agregues ninguna latencia innecesaria; el payload debe generarse en menos de 50 milisegundos sin llamadas lentas a LLMs externos.

Formato de salida: Modulo de Python 'emergency_code_dispatcher.py' con verificacion estricta de criterios y generacion de alertas prioritarias.`,
        tags: ["código-ictus", "sepsis", "emergencias", "tiempo-dependiente", "alertas"]
      },
      {
        id: "med-053",
        title: "Anonimización y Desidentificación de Informes Médicos conforme a HIPAA Safe Harbor y RGPD",
        desc: "Elimina de forma determinista y reversible (mediante salt criptográfico) los 18 identificadores protegidos de salud (PHI).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Delegado de Protección de Datos de Salud (DPO) y Especialista en Privacidad Biomédica.
[COPIA AQUI TU IDEA]

Construye el pipeline de anonimizacion y desidentificacion de historias clinicas de texto libre conforme a HIPAA Safe Harbor y el RGPD Art. 9:
1. Deteccion y enmascaramiento de los 18 elementos de Informacion Medica Protegida (PHI): Nombres, apellidos, direcciones postales, telefonos, emails, numeros de historia clinica (NHC), DNI/NIE, numero de la Seguridad Social, matriculas, identificadores biometricos y fotos faciales completas.
2. Desplazamiento temporal coherente de fechas (Date Shifting): modificacion de todas las fechas del historial de un paciente por un valor delta aleatorio pero constante por individuo (ej: +42 dias) para preservar los intervalos clinicos exactos sin exponer la fecha real del ingreso.
3. Anonimizacion o categorizacion de edades extremas (> 89 anos agrupadas en '>= 90').
4. Seudonimizacion con clave criptografica HMAC-SHA256 almacenada en entorno seguro para permitir reidentificacion exclusivamente en auditorias autorizadas.
5. Verificacion del riesgo de reidentificacion residual mediante modelos de k-anonimato y l-diversidad sobre los cuasi-identificadores restantes.

Restricciones:
- No enmascares terminologia clinica legitima que coincida foneticamente con nombres comunes (ej: no tapar 'enfermedad de Parkinson' o 'sindrome de Cushing').

Formato de salida: Modulo de Python 'phi_deidentifier.py' con expresion regular avanzada y modelos de NER biomedicos.`,
        tags: ["anonimización", "hipaa", "rgpd", "privacidad", "phi", "desidentificación"]
      },
      {
        id: "med-054",
        title: "Guardrail Clínico Do-No-Harm y Bloqueo de Alucinaciones Terapéuticas",
        desc: "Middleware de seguridad que intercepta recomendaciones de IA y las contrasta contra bases de conocimiento médico antes de mostrarlas.",
        model: "GPT-4o",
        prompt: `Eres un Auditor de Seguridad de Inteligencia Artificial Clínica y Validación Ética de Sistemas Médicos.
[COPIA AQUI TU IDEA]

Disena el middleware de guardrails clinicos 'Do-No-Harm' para supervisar en tiempo real las salidas generadas por LLMs en contextos medicos:
1. Verificacion cruzada de afirmaciones farmacologicas: comprobar que cualquier farmaco, dosis o via de administracion recomendada existe en la base de datos oficial de medicamentos (AEMPS / FDA).
2. Deteccion de dosis letales o desorbitadas: interceptar de inmediato recomendaciones que superen en mas del 50% la dosis maxima diaria autorizada en ficha tecnica.
3. Bloqueo incondicional de terapias alternativas pseudocientificas o no avaladas por consenso cientifico para patologias graves (ej: oncologia).
4. Verificacion de lenguaje no asertivo: obligatoriedad de que la respuesta recuerde explicitamente la necesidad de confirmacion presencial por el medico responsable.
5. Interrupcion inmediata de la generacion de respuesta (Fail-Safe) si el modelo produce una contradiccion clinica flagrante o alucinacion evidente.

Restricciones:
- El guardrail debe ejecutarse de forma determinista y sincrona con una latencia maxima inferior a 300 milisegundos.

Formato de salida: Middleware en Python con la clase 'DoNoHarmGuardrail' integrable con LangChain, LlamaIndex o llamadas directas a APIs.`,
        tags: ["guardrails", "do-no-harm", "alucinaciones", "seguridad-clínica", "aemps", "validación"]
      },
      {
        id: "med-055",
        title: "Generador de Informes de Alta Hospitalaria Estructurados con Firma Biomédica",
        desc: "Redacta el informe de epicrisis de alta médica con resumen clínico, conciliación al alta y plan de seguimiento ambulatorio.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Jefe de Servicio Hospitalario y Auditor de Documentación Clínica de Epicrisis y Altas Médicas.
[COPIA AQUI TU IDEA]

Crea el generador formal de Informes de Alta Hospitalaria (Epicrisis) conforme a la legislacion espanola (Real Decreto 1093/2010):
1. Cabecera reglamentaria: Identificacion del centro sanitario, servicio emisor, datos del facultativo responsable con numero de colegiado y datos del paciente.
2. Secciones clinicas preceptivas:
   - Motivo de ingreso y diagnostico principal codificado segun CIE-10-ES
   - Diagnosticos secundarios y comorbilidades relevantes
   - Resumen del curso clinico evolutivo e incidencias durante la estancia
   - Procedimientos quirurgicos o intervencionistas realizados con fecha y tecnica
   - Resumen de exploraciones complementarias significativas
3. Conciliacion de medicacion al alta: listado inequivoco de farmacos mantenidos, modificados o suspendidos, con dosis, via, pauta y duracion del tratamiento.
4. Recomendaciones higienico-dieteticas y plan de seguimiento: citas programadas en consultas externas y signos de alarma por los que acudir a urgencias.
5. Exportacion en formato PDF/A con firma electronica avanzada y metadatos estructurados en JSON FHIR Composition.

Restricciones:
- No utilices abreviaturas ambiguas o acronimos no universalmente aceptados en el plan de tratamiento al alta.

Formato de salida: Script en Python con 'reportlab' para generacion del documento PDF oficial y fichero JSON FHIR correspondiente.`,
        tags: ["alta-médica", "epicrisis", "rd-1093-2010", "informe-médico", "conciliación", "documentación"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Medicina & IA Clínica
 */
export const MEDICINA_PROMPTS = MEDICINA_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "medicina",
    areaName: "Medicina & IA Clínica",
    areaColor: "#059669",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
