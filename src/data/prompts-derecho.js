/**
 * PROMPTS-DERECHO.JS — Biblioteca de Prompts Especializados en Derecho & Compliance
 * Área: Derecho & Compliance
 * Tareas: Genéricos, D1.1 a D1.6 y Tareas Secundarias
 */

export const DERECHO_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "der-001",
        title: "Especificación Funcional y Alcance de Software LegalTech",
        desc: "Define el marco regulatorio, confidencialidad letrado-cliente (secreto profesional) y taxonomía legal.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Senior y Consultor en Transformacion Digital de Despachos y Departamentos Juridicos.
[COPIA AQUI TU IDEA]

Necesito que redactes la especificacion funcional y marco de cumplimiento para esta aplicacion legal:
1. Alcance procesal y material: ramas del derecho cubiertas (Mercantil, Civil, Penal corporativo, Laboral, Administrativo o Tributario) y jurisdiccion aplicable (Espana / Derecho de la Union Europea).
2. Garantias estrictas de secreto profesional (art. 542 LOPJ y Codigo Deontologico de la Abogacia Espanola): aislamiento de datos por cliente y prohibicion de reentrenamiento de modelos de IA con informacion confidencial.
3. Arquitectura de permisos por rol: socios, abogados asociados, peritos externos, auditores de compliance y clientes con acceso de solo lectura.
4. Delimitacion de responsabilidad profesional: exclusion expresa de prestacion de asesoramiento juridico automatico vinculante (disclaimer de que la herramienta es soporte de research y redaccion para letrados colegiados).
5. Cadena de custodia digital de documentos probatorios conforme a la Ley de Enjuiciamiento Civil (LEC).

Restricciones:
- Emplea terminologia dogmatica y procesal espanola estricta.
- No dejes margen para interpretaciones laxas sobre el tratamiento de datos judiciales.

Formato de salida: Documento de especificacion tecnica y juridica en Markdown con matriz de requisitos de cumplimiento normativo.`,
        tags: ["legaltech", "secreto-profesional", "especificación", "compliance"]
      },
      {
        id: "der-002",
        title: "Definición de Arquitectura de Taxonomías Jurídicas y Grafos Normativos",
        desc: "Estructura la base de conocimiento legal en grafos que relacionen artículos, leyes, directivas y sentencias.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero del Conocimiento Juridico y Desarrollador de Ontologias Legales (Akoma Ntoso / LegalDocML).
[COPIA AQUI TU IDEA]

Necesito que disenes la arquitectura ontologica y esquema de base de datos para relacionar fuentes del derecho:
1. Esquema de entidades principales: Norma (Ley, Real Decreto, Directiva UE), Articulo, Inciso/Letra, Resolucion Judicial (Sentencia, Auto), Organo Judicial (TS, TJUE, AN, AP) y Parte Procesal.
2. Modelado de relaciones semanticas: 'deroga_a', 'modifica_a', 'desarrolla_reglamentariamente', 'interpreta_en_sentido_reiterado', 'cita_como_precedente', 'declara_inconstitucional'.
3. Tratamiento temporal de la vigencia normativa: versionado historico de cada articulo reflejando redacciones anteriores y fecha de entrada en vigor de reformas legislativas.
4. Jerarquia normativa estricta conforme al principio de prelacion de fuentes (Constitucion > Derecho Comunitario Originario/Derivado > Ley Organica/Ordinaria > Reglamento).
5. Integracion de identificadores europeos de jurisprudencia (ECLI - European Case Law Identifier) y codigos de referencia del CENDOJ.

Restricciones:
- No utilices jerarquias planas; las normas deben modelarse como arboles de nodos transitivos navegables bidireccionalmente.

Formato de salida: Esquema formal en sintaxis Cypher (Neo4j) o sentencias DDL en SQL para PostgreSQL con extension de grafos (Apache AGE).`,
        tags: ["taxonomías", "grafos", "ontologías", "ecli", "akoma-ntoso"]
      },
      {
        id: "der-003",
        title: "Selección de Tech Stack para Análisis de Documentos Jurídicos y Anonimización",
        desc: "Selecciona tecnologías para parsing masivo de PDFs procesales, OCR de expedientes y anonimización de PII.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Sistemas LegalTech especializado en procesamiento masivo de expedientes judiciales.
[COPIA AQUI TU IDEA]

Necesito que justifiques la seleccion del stack tecnologico para nuestro motor juridico:
1. Motor de ingestion y parseo documental: evaluacion de herramientas para procesar PDFs de mala calidad, expedientes escaneados de juzgados y autos judiciales con tablas (PyMuPDF, Docling, Tesseract OCR).
2. Modulo de anonimizacion automatica de datos personales (PII): deteccion de nombres de litigantes, DNI/NIE, cuentas bancarias, matriculas y domicilios segun la doctrina del CENDOJ y LOPDGDD.
3. Almacenamiento vectorial y motor de busqueda hibrida (BM25 + embeddings densos adaptados a espanol juridico) como Qdrant o PostgreSQL con pgvector.
4. Framework de backend para orquestacion de agentes juridicos con trazabilidad estricta (FastAPI + Langfuse o Phoenix).
5. Hosting en servidores dedicados bajo jurisdiccion europea garantizando la confidencialidad de pleitos mercantiles corporativos.

Restricciones:
- Prioriza herramientas que funcionen en local o nube soberana sin enviar expedientes confidenciales a APIs públicas de terceros.

Formato de salida: Matriz comparativa en Markdown analizando rendimiento de extraccion, coste por pagina procesada y seguridad juridica.`,
        tags: ["tech-stack", "anonimización", "ocr", "docling", "qdrant"]
      },
      {
        id: "der-004",
        title: "Diseño de Interfaz de Usuario para Revisión de Contratos y Pleitos",
        desc: "Diseña la experiencia visual de lectura comparativa en paralelo (diff contractual) y panel de contingencias.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Interfaz UX/UI especializado en software de productividad para abogados y asesores juridicos.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para la plataforma juridica:
1. Vista comparativa a doble columna sincronizada (side-by-side contract diff) para analizar versiones sucesivas de borradores contractuales con resaltado de modificaciones.
2. Panel lateral de navegacion semantica por clausulas: listado colapsable de estipulaciones tipicas (Objeto, Precio, Responsabilidad, Resolucion, Fuerza Mayor, Confidencialidad).
3. Semaforizacion visual del nivel de riesgo juridico por clausula (Verde = Estandar de mercado, Amarillo = Desfavorable / Desequilibrada, Rojo = Riesgo critico / Nula).
4. Sistema de anotaciones y comentarios colaborativos tipo 'redlining' con historial de aprobaciones letradas.
5. Tipografia optimizada para lectura continuada de textos extensos (fuentes serif legibles en cuerpo de texto y sans-serif en paneles de control).

Restricciones:
- Evita interfaces recargadas; el texto del documento debe ocupar el protagonismo central sin distracciones visuales.

Formato de salida: Descripcion estructurada de la interfaz de usuario con especificacion de componentes, estados de interaccion y tokens de estilo CSS.`,
        tags: ["ui-legal", "redlining", "contratos", "comparador", "ergonomía"]
      },
      {
        id: "der-005",
        title: "Documentación de Validez Probatoria y Dictámenes Periciales Informáticos",
        desc: "Estructura informes periciales que acrediten la autenticidad, integridad y trazabilidad de pruebas digitales ante tribunales.",
        model: "GPT-4o",
        prompt: `Eres un Perito Judicial Informatico colegiado con experiencia en emision de dictamenes periciales ante Juzgados de lo Mercantil y Audiencias Provinciales.
[COPIA AQUI TU IDEA]

Crea la estructura formal del informe pericial acreditativo de la prueba digital:
1. Encabezamiento procesal formal: identificacion del perito, acreditaciones profesionales, designacion (a instancia de parte o judicial) y declaracion de promesa/juramento (art. 335.2 LEC).
2. Objeto de la pericia: descripcion categorica de los extremos tecnicos sobre los que se solicita dictamen pericial.
3. Metodologia de adquisicion de evidencias: garantia estricta de la cadena de custodia, hash criptografico de origen (SHA-256), sellado temporal cualificado y herramientas forenses empleadas.
4. Cuerpo de analisis tecnico: examen pormenorizado de logs de acceso, firmas electronicas cualificadas, metadatos y comunicaciones electronicas.
5. Conclusiones periciales formuladas de forma clara, directa, comprensible para el juzgador y libres de jerga tecnica innecesaria.

Restricciones:
- Redaccion solemne ajustada a las formalidades procesales de la Ley de Enjuiciamiento Civil espanola.

Formato de salida: Plantilla completa en Markdown con formula de juramento legal, apartados numerados y anejos documentales tipados.`,
        tags: ["peritaje", "prueba-digital", "lec", "cadena-custodia", "dictamen"]
      },
      {
        id: "der-032",
        title: "Matriz de Riesgos y Secreto Profesional en Soluciones LegalTech (Estatuto General de la Abogacía)",
        desc: "Audita la arquitectura de custodia documental para garantizar el secreto profesional y el deber de confidencialidad.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Especialista en Deontología Profesional y Consultor de Ciberseguridad LegalTech.
[COPIA AQUI TU IDEA]

Disena la matriz de riesgos y politicas de salvaguarda del secreto profesional para una aplicacion legal segun el Estatuto General de la Abogacia Espanola (RD 135/2021):
1. Garantia del privilegio letrado-cliente (Legal Privilege): medidas tecnicas para que ningun tercero, proveedor cloud o administrador de sistemas tenga acceso a textos de defensas procesales.
2. Cifrado integral de documentos de clientes en transito (TLS 1.3) y en reposo (AES-256) con gestion de claves en poder exclusivo del bufete (BYOK - Bring Your Own Key).
3. Politica de segregacion estricta de expedientes entre clientes para prevenir de forma automatizada cualquier conflicto de interes.
4. Clausulas contractuales con proveedores de modelos de lenguaje garantizando la no utilizacion de los prompts para reentrenamiento publico.
5. Protocolo de destruccion segura de copias de seguridad una vez prescritos los plazos de responsabilidad profesional.

Restricciones:
- No utilices recomendaciones genericas; fundamenta cada medida en los articulos 21 a 24 del Estatuto de la Abogacia.

Formato de salida: Documento de politicas de cumplimiento deontologico en Markdown con tabla de matriz de riesgos tecnicos y legales.`,
        tags: ["deontología", "secreto-profesional", "legaltech", "estatuto-abogacía", "confidencialidad"]
      },
      {
        id: "der-033",
        title: "Diseño de Arquitectura Multi-Jurisdiccional para Despachos Internacionales",
        desc: "Estructura bases de datos y motores de razonamiento que adaptan normas según la ley aplicable (Reglamentos Roma I y Roma II).",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Internacionalista y Arquitecto de Software de Derecho Comparado.
[COPIA AQUI TU IDEA]

Crea la arquitectura de datos para una plataforma de asesoramiento juridico multijurisdiccional:
1. Determinacion automatica de la ley aplicable a las obligaciones contractuales segun el Reglamento Roma I (CE 593/2008) y extracontractuales segun Roma II (CE 864/2007).
2. Segmentacion jerarquica de corpus normativos por jurisdiccion (Derecho de la Union Europea, legislacion estatal espanola, normativa foral/autonomica y convenios internacionales).
3. Motor de deteccion de normas de policia o de orden publico internacional que se aplican con caracter imperativo con independencia de la ley elegida por las partes.
4. Mapeo de terminos juridicos multilingues sin perdida de precision dogmatica (ej: distincion entre 'Damage' del Common Law vs 'Dano Emergente y Lucro Cesante' del Derecho Civil).
5. Sistema de resolucion de reenvios y conflictos de leyes en casos transfronterizos.

Restricciones:
- Define con rigor la prelacion de fuentes evitando la aplicacion cruzada de doctrinas jurisprudenciales de sistemas juridicos incompatibles.

Formato de salida: Especificacion tecnica en Markdown con diagrama de flujo de determinacion de ley aplicable en Mermaid.`,
        tags: ["derecho-internacional", "roma-i", "roma-ii", "multijurisdiccional", "derecho-comparado"]
      }
    ]
  },
  {
    id: "auditor-contractual",
    name: "Auditor Contractual y Revisión de Riesgos (D1.1)",
    prompts: [
      {
        id: "der-006",
        title: "Extracción y Matriz de Obligaciones, Plazos y Condiciones Resolutorias",
        desc: "Analiza contratos complejos extrayendo compromisos de cada parte, fechas críticas y causas de resolución.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado de Derecho Mercantil y Especialista en Contratacion Corporativa.
[COPIA AQUI TU IDEA]

Examina el contrato adjunto y extrae de forma sistematica su matriz de obligaciones principales:
1. Obligaciones de la Parte A (Proveedor / Vendedor / Prestador) vs Parte B (Cliente / Comprador): desglosar prestaciones principales y accesorias.
2. Calendario de hitos temporales y plazos criticos: fechas de entrega, periodos de preaviso para resolucion, renovaciones tacitas y plazos de garantia.
3. Condiciones suspensivas y resolutorias: eventos especificos que determinan la entrada en vigor o extincion automatica del vinculo contractual.
4. Mecanismo de notificaciones fehacientes: domicilios designados, canales admisibles (burofax, conducto notarial, comunicacion electronica certificada).
5. Identificacion de ambiguedades de redaccion o terminos vagos (ej: 'plazo razonable', 'mejores esfuerzos') que supongan riesgo de litigio futuro.

Restricciones:
- Cada obligacion debe asociarse exactamente a la clausula y numero de pagina de donde fue extraida.

Formato de salida: Matriz estructurada en tabla Markdown [Clausula, Parte Obligada, Descripcion de Obligacion, Plazo Asociado, Consecuencia Incumplimiento].`,
        tags: ["contratos", "obligaciones", "plazos", "resolución", "mercantil"]
      },
      {
        id: "der-007",
        title: "Análisis Crítico de Limitación de Responsabilidad e Indemnidad (Indemnity)",
        desc: "Audita topes indemnizatorios, exclusiones de lucro cesante y cláusulas de salvaguarda.",
        model: "DeepSeek V4",
        prompt: `Eres un Letrado Asesor de Empresas y Arbitro de la Corte de Arbitraje de Madrid especializado en litigios contractuales.
[COPIA AQUI TU IDEA]

Analiza minuciosamente las clausulas de limitacion de responsabilidad e indemnidad del contrato:
1. Alcance del tope indemnizatorio (Liability Cap): cuantificacion del limite economico (cifra fija vs multiplo de los honorarios de los ultimos 12 meses).
2. Exclusiones de responsabilidad: verificar si se excluyen danos indirectos, dano emergente, lucro cesante o perdida de reputacion comercial.
3. Excepciones legales al tope de responsabilidad: comprobar que no se limita la responsabilidad por dolo o negligencia grave (culpa grave), prohibido por el art. 1102 del Codigo Civil espanol.
4. Clausulas de indemnidad cruzada (Indemnification): obligacion de mantener indemne a la otra parte ante reclamaciones de terceros por infraccion de PI o dano a personal.
5. Comparacion con los estandares habituales de mercado (Market Standard) para el sector y dimension del contrato.

Restricciones:
- Alerta explicitamente si la clausula vulnera limites de orden publico o genera un desequilibrio abusivo evidente.

Formato de salida: Dictamen de riesgo de responsabilidad en Markdown con recomendaciones de redaccion alternativa (clausulas 'fall-back').`,
        tags: ["responsabilidad", "liability-cap", "indemnidad", "lucro-cesante"]
      },
      {
        id: "der-008",
        title: "Matriz de Contingencias Económicas y Penalizaciones por Incumplimiento",
        desc: "Modela cláusulas penales (Liquidated Damages), penalizaciones por SLA y deducciones automáticas.",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Corporativo especializado en acuerdos de nivel de servicio (SLA) y garantias contractuales.
[COPIA AQUI TU IDEA]

Modela y cuantifica el impacto de las clausulas penales contenidas en el acuerdo:
1. Identificacion de clausulas penales sustitutivas vs cumulativas (art. 1152 a 1154 del Codigo Civil): determinar si la penalizacion sustituye a la indemnizacion de danos o se suma a ella.
2. Escalado de penalizaciones por incumplimiento de niveles de servicio (SLA Service Credits): porcentaje de descuento sobre facturacion por cada hora/dia de caida.
3. Limite maximo acumulado de penalizaciones (Penalty Cap) para evitar contingencias financieras desproporcionadas.
4. Mecanismo de moderacion judicial: analisis de la probabilidad de que un juez modere equitativamente la pena en caso de cumplimiento parcial.
5. Ejecucion de garantias accesorias: avales bancarios a primer requerimiento, depositos en garantia (escrow) o retenciones de pago.

Restricciones:
- Proporciona formulas matematicas claras de calculo de cada penalizacion para su automatizacion en sistemas de facturacion.

Formato de salida: Tabla de penalizaciones con formulas de liquidacion y evaluacion del riesgo de impugnacion procesal.`,
        tags: ["cláusulas-penales", "sla", "liquidated-damages", "penalizaciones"]
      },
      {
        id: "der-009",
        title: "Auditoría de Propiedad Intelectual, Licencias y Confidencialidad (NDA)",
        desc: "Revisa cesiones de derechos de autor, licencias de software, know-how y pactos de no competencia.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Especialista en Propiedad Intelectual, Patentes y Secretos Empresariales (Ley 1/2019).
[COPIA AQUI TU IDEA]

Audita las estipulaciones de propiedad intelectual y secretos corporativos del documento:
1. Titularidad del 'Background IP' (propiedad intelectual preexistente) vs 'Foreground IP' (obras, desarrollos o invenciones generadas en ejecucion del contrato).
2. Modalidades de cesion: delimitacion de facultades cedidas (reproduccion, distribucion, comunicacion publica, transformacion), ambito territorial, duracion y caracter exclusivo o no exclusivo.
3. Cumplimiento de la Ley de Secretos Empresariales: definicion de Informacion Confidencial, excepciones estandar (informacion publica, requerimiento judicial) y periodo de vigencia del deber de secreto post-resolucion.
4. Clausulas de no captacion de clientes y no contratacion de empleados clave (Non-solicitation) con comprobacion de proporcionalidad temporal y espacial.
5. Garantia de indemnidad por infraccion de derechos de terceros en el software o tecnologia suministrada.

Restricciones:
- Verifica que las cesiones de derechos cumplen las exigencias de forma escrita y remuneracion del Texto Refundido de la Ley de Propiedad Intelectual (LPI).

Formato de salida: Informe de auditoria de PI en Markdown con listado de advertencias de titularidad y clausulado corregido propuesto.`,
        tags: ["propiedad-intelectual", "nda", "secretos-empresariales", "licencias"]
      },
      {
        id: "der-010",
        title: "Resolución de Conflictos, Ley Aplicable y Fuero Jurisdiccional",
        desc: "Evalúa cláusulas escalonadas de resolución de disputas: mediación previa, sumisión arbitral o tribunales ordinarios.",
        model: "GPT-4o",
        prompt: `Eres un Abogado Litigante y Experto en Derecho Internacional Privado y Litigacion Comercial Compleja.
[COPIA AQUI TU IDEA]

Analiza la clausula de ley aplicable, jurisdiccion y resolucion de controversias del contrato:
1. Determinacion de la ley rectora del contrato: aplicacion del Reglamento Roma I (Reglamento CE 593/2008) y consideracion de normas de policia u orden publico.
2. Clausulas escalonadas de resolucion de disputas (Multi-Tier Dispute Resolution): negociacion de buena fe -> mediacion formal -> litigio/arbitraje.
3. Arbitraje vs Tribunales ordinarios: analisis coste-beneficio de pactar sumision a cortes arbitrales (CCI Paris, CAM Madrid, CIAM) frente a jurisdiccion civil.
4. Fuero territorial: validez del pacto de sumision expresa segun la LEC y prevencion de fueros nulos en contratos de adhesion o con consumidores.
5. Renuncia a medidas cautelares: comprobar que la sumision arbitral no impide solicitar medidas cautelares urgentes ante juzgados de lo mercantil.

Restricciones:
- Redacta clausulas arbitrales estandar tipo recomendadas por las cortes oficiales para evitar clausulas 'patologicas' o inejecutables.

Formato de salida: Dictamen procesal comparativo recomendando la via de resolucion optima y texto final de la estipulacion jurisdiccional.`,
        tags: ["jurisdicción", "arbitraje", "roma-i", "resolución-disputas"]
      },
      {
        id: "der-034",
        title: "Auditoría de Pactos de Socios y Cláusulas Drag-Along / Tag-Along",
        desc: "Verifica la coherencia estatutaria y equilibrio de poderes en pactos parasociales de startups y rondas de inversión.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Mercantilista Especialista en Venture Capital y Pactos Parasociales.
[COPIA AQUI TU IDEA]

Audita minuciosamente el pacto de socios y acuerdos de inversion para identificar riesgos de bloqueo corporativo o desproteccion de socios:
1. Analisis de la clausula de arrastre (Drag-Along): verificacion de mayorias cualificadas requeridas, precio minimo garantizado (Fair Market Value) y protecciones de valoracion para socios fundadores.
2. Analisis de la clausula de acompanamiento (Tag-Along): comprobacion de derechos de venta conjunta proporcional vs total para socios minoritarios.
3. Clausulas de liquidacion preferente (Liquidation Preference): identificacion de multiplicadores (1x, 2x) y naturaleza participativa (Participating) vs no participativa (Non-Participating).
4. Clausulas de gobierno corporativo: composicion del consejo de administracion, materias reservadas (Veto Rights) y mecanismos de resolucion de bloqueos (Deadlock: Ruleta Rusa / Tiro Tejano).
5. Compromisos de permanencia y dedicacion exclusiva (Vesting) con clasificacion de supuestos de salida como Good Leaver vs Bad Leaver.

Restricciones:
- Alerta expresamente sobre contradicciones entre el pacto parasocial privado y los estatutos sociales inscritos en el Registro Mercantil.

Formato de salida: Informe de auditoria legal contractual con tabla comparativa de clausulas analizadas, riesgos detectados y redaccion alternativa propuesta.`,
        tags: ["mercantil", "venture-capital", "drag-along", "tag-along", "pacto-de-socios", "vesting"]
      },
      {
        id: "der-035",
        title: "Detección de Cláusulas de No Competencia Poscontractual Abusivas en Contratos Laborales",
        desc: "Evalúa la validez de los pactos de no competencia tras la extinción laboral según el artículo 21 del Estatuto de los Trabajadores.",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Laboralista Especialista en Litigios de Alta Direccion y Competencia Desleal.
[COPIA AQUI TU IDEA]

Crea el evaluador de legalidad de clausulas de no competencia poscontractual en contratos laborales conforme al articulo 21.2 del Estatuto de los Trabajadores:
1. Verificacion del interes comercial o industrial efectivo del empresario que justifique la restriccion de la libertad laboral.
2. Comprobacion de los limites temporales maximos legales: maximo 2 anos para personal tecnico y 6 meses para los demas trabajadores.
3. Evaluacion de la compensacion economica adecuada: comprobacion de que la indemnizacion pactada es real, sustancial y no meramente simbolica (criterio jurisprudencial habitual: >= 20-30% del salario anual).
4. Deteccion de clausulas abusivas de renuncia unilateral por parte de la empresa al pacto sin abonar la compensacion.
5. Analisis de proporcionalidad de las clausulas penales por incumplimiento del trabajador (evitar sanciones desmesuradas que excedan el importe de la compensacion recibida).

Restricciones:
- Documenta las sentencias clave de la Sala de lo Social del Tribunal Supremo que declaran la nulidad radical de pactos sin compensacion economica adecuada.

Formato de salida: Modulo de Python 'labor_noncompete_auditor.py' que procese el texto contractual y emita un dictamen de validez juridica.`,
        tags: ["laboral", "no-competencia", "estatuto-trabajadores", "clausulas-abusivas", "derecho-laboral"]
      },
      {
        id: "der-036",
        title: "Análisis de Acuerdos de Nivel de Servicio (SLA) y Penalizaciones por Incumplimiento Tecnológico",
        desc: "Audita contratos de servicios en la nube (SaaS/IaaS) evaluando compromisos de disponibilidad, ventanas y créditos de servicio.",
        model: "GPT-4o",
        prompt: `Eres un Abogado Especialista en Derecho Tecnologico y Contratacion Mercantil de Software.
[COPIA AQUI TU IDEA]

Audita los acuerdos de nivel de servicio (Service Level Agreement / SLA) de un contrato de suministro tecnologico o cloud:
1. Definicion y formula de calculo de la disponibilidad del servicio (Uptime mensual: 99.9%, 99.99% o 'cuatro nueves'): exclusion de mantenimientos programados vs ventanas de emergencia.
2. Clasificacion de incidentes por severidad (P1 Critico, P2 Grave, P3 Menor) con tiempos maximos vinculantes de respuesta inicial y resolucion definitiva.
3. Estructura de penalizaciones y creditos de servicio (Service Credits): porcentaje de descuento en factura mensual escalonado segun horas de caida no programada.
4. Mecanismo de resolucion contractual por incumplimiento grave continuado (ej: disponibilidad < 98% en dos meses consecutivos).
5. Clausulas de limitacion de responsabilidad: comprobar si las penalizaciones de SLA se configuran como unico remedio (Sole and Exclusive Remedy) limitando indemnizaciones por danos y perjuicios indirectos.

Restricciones:
- Verifica que el procedimiento de reclamacion de creditos no imponga plazos de caducidad excesivamente breves que imposibiliten su ejecucion.

Formato de salida: Matriz de auditoria de SLA en Markdown con recomendaciones de renegociacion de clausulas para el cliente receptor del servicio.`,
        tags: ["sla", "derecho-tecnológico", "saas", "cloud", "penalizaciones", "contratos-it"]
      }
    ]
  },
  {
    id: "jurisprudencia",
    name: "Análisis Jurisprudencial CENDOJ y Curia (D1.2)",
    prompts: [
      {
        id: "der-011",
        title: "Extracción Estructurada de Sentencias Judiciales (Hechos, Fundamentos, Fallo)",
        desc: "Parsea sentencias del CENDOJ o Curia aislando antecedentes, fundamentación jurídica y parte dispositiva.",
        model: "DeepSeek V4",
        prompt: `Eres un Letrado del Gabinete Tecnico del Tribunal Supremo especializado en clasificacion jurisprudencial.
[COPIA AQUI TU IDEA]

Procesa el texto integro de la resolucion judicial y estructuralo en sus componentes procesales canonicos:
1. Encabezamiento: Tribunal, Sala, Seccion, Numero de Sentencia, Recurso, Fecha y Magistrado Ponente.
2. Antecedentes de Hecho relevantes: resumen cronologico de los hechos probados de primera instancia y apelacion, eliminando detalles accesorios.
3. Fundamentos de Derecho: descomposicion numerada de los motivos casacionales o argumentos juridicos esgrimidos por las partes y analizados por la Sala.
4. Identificacion de la Ratio Decidendi (el nucleo argumental determinante del fallo) diferenciada de los Obiter Dicta (comentarios ilustrativos no vinculantes).
5. Fallo / Parte Dispositiva: declaracion de estimacion, desestimacion, costas procesales impuestas y fijacion de doctrina jurisprudencial si procede.

Restricciones:
- Cita los articulos exactos de leyes y tratados invocados por el tribunal en cada fundamento.

Formato de salida: Ficha estructurada en Markdown con campos normalizados y resumen ejecutivo de la resolucion en 200 palabras.`,
        tags: ["cendoj", "sentencias", "jurisprudencia", "ratio-decidendi"]
      },
      {
        id: "der-012",
        title: "Aislamiento y Análisis de la Ratio Decidendi frente a Obiter Dicta",
        desc: "Identifica con precisión quirúrgica el principio jurídico vinculante que sienta precedente jurisprudencial.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Catedratico de Derecho Procesal y Magistrado especialista en tecnica casacional.
[COPIA AQUI TU IDEA]

Analiza minuciosamente los fundamentos de derecho de la sentencia para aislar la Ratio Decidendi:
1. Identificacion de la cuestion juridica sustantiva central (el thema decidendi) que el tribunal debia resolver obligatoriamente.
2. Localizacion exacta de las premisas normativas y jurisprudenciales que constituyen el soporte logico indispensable del fallo (Ratio Decidendi).
3. Discriminacion de argumentos secundarios, citas de derecho comparado o reflexiones a mayor abundamiento (Obiter Dicta) que no tienen fuerza de precedente vinculante.
4. Evaluacion de la fuerza vinculante segun el organo: doctrina consolidada del Tribunal Supremo (dos o mas sentencias conformes, art. 1.6 CC) o resolucion aislada.
5. Impacto de votos particulares: analisis de los argumentos disidentes o concurrentes y su potencial para anticipar futuros cambios doctrinales.

Restricciones:
- Justifica de forma deductiva rigurosa por que un parrafo especifico es Ratio Decidendi y no mero Obiter Dictum.

Formato de salida: Dictamen de interpretacion jurisprudencial en Markdown destacando los parrafos determinantes con explicacion analitica.`,
        tags: ["ratio-decidendi", "obiter-dicta", "precedente", "doctrina"]
      },
      {
        id: "der-013",
        title: "Análisis de Contradicción Doctrinal para Recurso de Casación",
        desc: "Compara dos sentencias acreditando la identidad sustancial de hechos y la contradicción frontal de fallos.",
        model: "DeepSeek V4",
        prompt: `Eres un Letrado Especialista en Recursos Extraordinarios por Infraccion Procesal y Casacion ante el Tribunal Supremo.
[COPIA AQUI TU IDEA]

A partir de la sentencia recurrida y la sentencia de contraste aportada, fundamenta la contradiccion doctrinal exigida por el art. 477 LEC:
1. Triple identidad sustancial:
   - Identidad de supuestos de hecho analizados en ambas resoluciones judiciales.
   - Identidad de pretensiones y fundamentos de derecho invocados por las partes litigantes.
   - Contradiccion insalvable en los pronunciamientos de los respectivos fallos judiciales.
2. Acreditacion del Interes Casacional: demostrar que la sentencia recurrida se opone a la doctrina jurisprudencial fijada por el Tribunal Supremo o resuelve sobre normas con menos de 5 anos de vigencia sin doctrina consolidada.
3. Formulación formal del motivo casacional: redaccion de la infraccion de norma material sustantiva con cita precisa de articulos.
4. Pronostico de viabilidad de admision a tramite por la Sala de Admision del Tribunal Supremo.

Restricciones:
- No realices comparaciones superficiales; debes desarticular cualquier aparente distincion factica que pudiera alegar la parte contraria para inadmitir.

Formato de salida: Borrador de capitulo de Interes Casacional del recurso de casacion estructurado en formato procesal formal.`,
        tags: ["casación", "interés-casacional", "contradicción", "tribunal-supremo"]
      },
      {
        id: "der-014",
        title: "Mapeo de Jurisprudencia del TJUE y Diálogo Prejudicial Europeo",
        desc: "Rastrea sentencias del TJUE y cuestiones prejudiciales (art. 267 TFUE) aplicables a pleitos internos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Especialista en Litigacion ante el Tribunal de Justicia de la Union Europea (TJUE).
[COPIA AQUI TU IDEA]

Analiza la controversia juridica a la luz del Derecho de la Union Europea y la jurisprudencia de Curia:
1. Normativa comunitaria aplicable: directivas, reglamentos y Carta de los Derechos Fundamentales de la Union Europea (CDFUE).
2. Precedentes clave del TJUE: analisis de sentencias dictadas en procedimientos prejudiciales con su numero de asunto (ej: Asunto C-154/15) y fecha.
3. Principio de Primacia y Eficacia Directa: determinacion de si la norma nacional espanola debe ser inaplicada directamente por el juez ordinario en caso de oposicion al derecho de la UE (doctrina Simmenthal / Fratelli Costanzo).
4. Evaluacion de necesidad de plantear Cuestion Prejudicial (art. 267 TFUE): elaboracion de las preguntas prejudiciales exactas que deberia formular el juez nacional al TJUE.
5. Criterio de la doctrina del acto claro o acto aclarado (doctrina Cilfit) para dispensar o forzar la obligacion de remision prejudicial.

Restricciones:
- Cita los numeros de asunto oficiales de Curia y la fecha exacta de las sentencias del TJUE.

Formato de salida: Informe juridico de primacia europea en Markdown con propuesta redactada de cuestiones prejudiciales para elevar al TJUE.`,
        tags: ["tjue", "derecho-ue", "cuestión-prejudicial", "curia", "primacía"]
      },
      {
        id: "der-037",
        title: "Análisis Predictivo de Costas Procesales y Viabilidad de Litigios Civiles",
        desc: "Calcula el riesgo económico de litigar considerando el criterio de vencimiento objetivo y los criterios orientativos de honorarios.",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Procesalista Civil y Analista de Cuantificacion de Riesgo de Litigiosidad.
[COPIA AQUI TU IDEA]

Desarrolla el modelo de evaluacion economica y procesal del riesgo de imposicion de costas en la jurisdiccion civil espanola (Ley 1/2000 de Enjuiciamiento Civil):
1. Aplicacion del principio del vencimiento objetivo (Art. 394 LEC) y excepciones por 'serias dudas de hecho o de derecho'.
2. Estimacion cuantitativa de las costas procesales de la parte contraria en caso de desestimacion total (honorarios de letrado segun criterios orientativos del colegio de abogados de la sede, aranceles de procurador y peritos).
3. Regla del limite de la tercera parte de la cuantia del litigio (Art. 394.3 LEC) y supuestos de exclusion por temeridad o mala fe procesal.
4. Calculo del umbral de rentabilidad de litigar (Expected Monetary Value / EMV): balance entre probabilidad estimada de estimacion de la demanda vs coste global en caso de condena en costas.
5. Recomendacion procesal de allanamiento previo, requerimiento extrajudicial fehaciente (Burofax) para evitar condena en costas, o derivacion a mediacion intrajudicial.

Restricciones:
- Especifica claramente el caracter de los honorarios orientativos de los colegios de abogados tras las sanciones de la CNMC (uso exclusivo para tasacion de costas).

Formato de salida: Script en Python con la clase 'CivilLitigationRiskCalculator' y memoria de analisis de riesgo economico para el cliente.`,
        tags: ["procesal-civil", "costas", "lec", "litigios", "análisis-de-riesgo", "honorarios"]
      },
      {
        id: "der-038",
        title: "Extracción de Ratios Decidendi y Criterios Vinculantes del Tribunal Supremo y TJUE",
        desc: "Distingue la doctrina jurídica vinculante del mero obiter dicta en resoluciones extensas de casación.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Letrado del Gabinete Técnico del Tribunal Supremo y Especialista en Metodología Jurídica y Hermenéutica.
[COPIA AQUI TU IDEA]

Crea el pipeline de analisis jurisprudencial para desglosar sentencias complejas de la Sala Primera (Civil) y Tercera (Contencioso) del Tribunal Supremo y del TJUE:
1. Segmentacion estructural del texto judicial: Encabezamiento, Antecedentes de Hecho, Fundamentos de Derecho y Fallo / Parte Dispositiva.
2. Aislamiento formal de la Ratio Decidendi (el principio normativo indispensable que fundamenta directamente la resolucion del caso).
3. Identificacion de Obiter Dicta (comentarios, reflexiones colaterales o argumentaciones auxiliares no vinculantes para futuros litigios).
4. Verificacion de si la resolucion crea Jurisprudencia Reiterada (al menos dos sentencias conformes del Tribunal Supremo en el mismo sentido) o si fija Doctrina Casacional en unificacion de doctrina.
5. Deteccion de votos particulares concurrentes o discrepantes y analisis de su impacto en posibles cambios doctrinales futuros.

Restricciones:
- No utilices modelos genericos que confundan el resumen de los hechos con el criterio juridico abstracto fijado por el tribunal.

Formato de salida: Ficha de analisis jurisprudencial en Markdown estructurada con citas directas del parrafo exacto que contiene la ratio decidendi.`,
        tags: ["tribunal-supremo", "tjue", "ratio-decidendi", "doctrina-casacional", "jurisprudencia"]
      },
      {
        id: "der-039",
        title: "Monitorización de Cambios de Doctrina Jurisprudencial en las Audiencias Provinciales",
        desc: "Mapea divergencias de criterio entre secciones de diferentes Audiencias Provinciales previo a la unificación por casación.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Analista de Inteligencia Jurídica y Procesamiento Masivo de Resoluciones Judiciales (CENDOJ).
[COPIA AQUI TU IDEA]

Disena el monitor de divergencia jurisprudencial entre Audiencias Provinciales sobre una materia controvertida:
1. Ingesta estructurada de autos y sentencias del CENDOJ filtrados por orden jurisdiccional, materia y rango de fechas.
2. Agrupacion semantica de resoluciones en lineas doctrinales contrapuestas (Criterio Mayoritario A vs Criterio Minoritario B).
3. Mapeo geografico de Audiencias Provinciales segun la postura adoptada (ej: Audiencia Provincial de Madrid vs Audiencia Provincial de Barcelona).
4. Calculo del indice de dispersion doctrinal: porcentaje de resoluciones discrepantes en los ultimos 24 meses.
5. Identificacion de autos de admision de recursos de casacion por 'interes casacional por contradiccion entre Audiencias Provinciales' (Art. 477.3 LEC).

Restricciones:
- Requiere identificar con precision el numero de resolucion judicial (ECLI / ROJ) para garantizar trazabilidad inequivoca.

Formato de salida: Cuadro de mando comparativo en Markdown con matriz de Audiencias Provinciales y enlaces ECLI a las resoluciones lideres.`,
        tags: ["audiencias-provinciales", "cendoj", "ecli", "divergencia-doctrinal", "interés-casacional"]
      }
    ]
  },
  {
    id: "compliance",
    name: "Compliance Normativo y Prevención de Delitos (D1.3)",
    prompts: [
      {
        id: "der-015",
        title: "Mapeo de Riesgos Penales Corporativos según art. 31 bis del Código Penal",
        desc: "Diseña el mapa de riesgos penales identificando delitos imputables a la persona jurídica y controles preventivos.",
        model: "DeepSeek V4",
        prompt: `Eres un Chief Compliance Officer (CCO) y Abogado Penalista Corporativo experto en modelos de prevencion penal.
[COPIA AQUI TU IDEA]

Elabora el Mapa de Riesgos Penales de la empresa conforme al catalogo de delitos del art. 31 bis del Codigo Penal espanol y UNE 19601:
1. Identificacion de actividades con exposicion a tipos penales:
   - Delitos de corrupcion y cohecho (art. 286 bis, art. 427 CP).
   - Estafas, insolvencias punibles y falsedad documental en el trafico mercantil.
   - Delitos contra la Hacienda Publica y la Seguridad Social (art. 305 CP).
   - Delitos contra la propiedad intelectual e industrial y secretos de empresa (art. 278 CP).
   - Delitos contra los derechos de los trabajadores y medio ambiente.
2. Evaluacion del Riesgo Inherente: cuantificacion de probabilidad de ocurrencia e impacto de la sancion penal (multa, disolucion, clausura).
3. Catalogo de Controles Preventivos existentes y su eficacia mitigadora para calcular el Riesgo Residual.
4. Asignacion de responsables de control (Risk Owners) y periodicidad de revision de cada proceso operativo.
5. Plan de accion correctivo para los riesgos residuales situados en zonas no tolerables del mapa de calor.

Restricciones:
- Ajusta el analisis estrictamente al modelo de exencion de responsabilidad penal corporativa contemplado en la ley.

Formato de salida: Matriz de riesgos penales en tabla Markdown con escalas numericas y diagrama de calor de riesgos residuales.`,
        tags: ["compliance-penal", "art-31-bis", "mapa-riesgos", "une-19601"]
      },
      {
        id: "der-016",
        title: "Diseño de Canal Ético y Protocolo de Denuncias (Ley 2/2023 / Whistleblowing)",
        desc: "Estructura el sistema interno de información garantizando confidencialidad, no represalias y plazos legales.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Asesor Especialista en Canales de Denuncia y Cumplimiento de la Ley 2/2023 reguladora de la proteccion de informantes.
[COPIA AQUI TU IDEA]

Disena el Protocolo Operativo del Sistema Interno de Informacion (Canal Etico) de la organizacion:
1. Canales de comunicacion admitidos: plataforma digital cifrada, via postal, linea telefonica o reunion presencial a peticion del informante.
2. Garantias irrenunciables: admision de denuncias anonimas, preservacion absoluta de la confidencialidad de la identidad y prohibicion de represalias laborales.
3. Procedimiento y plazos procesales legales:
   - Envio de acuse de recibo de la comunicacion al informante en el plazo maximo de 7 dias naturales.
   - Plazo maximo para finalizar la investigacion interna y dar respuesta: 3 meses (prorrogables por otros 3 en casos de alta complejidad).
4. Procedimiento de admision, investigacion imparcial y derechos del denunciado (presuncion de inocencia, derecho a ser oido sin revelacion del denunciante).
5. Protocolo de derivacion inmediata al Ministerio Fiscal o a la Autoridad Independiente de Proteccion del Informante si los hechos revisten caracter de delito.

Restricciones:
- Cumple rigurosamente con la Directiva UE 2019/1937 y la Ley 2/2023 espanola sin omitir ninguna garantia obligatoria.

Formato de salida: Protocolo formal de gestion del canal etico en Markdown listo para aprobacion por el Consejo de Administracion.`,
        tags: ["canal-ético", "whistleblowing", "ley-2-2023", "denuncias", "protección-informante"]
      },
      {
        id: "der-017",
        title: "Protocolo de Investigación Interna y Preservación de Evidencias Digitales",
        desc: "Estandariza cómo realizar pesquisas laborales internas respetando la intimidad de los empleados (art. 18 CE / 20.3 ET).",
        model: "GPT-4o",
        prompt: `Eres un Abogado Laboralista y Especialista en Investigaciones Corporativas Forenses.
[COPIA AQUI TU IDEA]

Redacta el protocolo para llevar a cabo una investigacion interna ante sospechas fundadas de irregularidades laborales o penales:
1. Juicio de proporcionalidad de la medida de control (doctrina Barbulescu del TEDH y Tribunal Constitucional): justificacion de idoneidad, necesidad y proporcionalidad estricta.
2. Acceso a dispositivos corporativos (ordenador, correo electronico, telefono movil de empresa): verificacion de previa advertencia formal de que los medios son de uso exclusivamente profesional y pueden ser auditados.
3. Protocolo de entrada y registro: presencia obligatoria del trabajador o de un representante legal de los trabajadores / testigo imparcial durante la apertura y copia forense del disco.
4. Preservacion de la intimidad personal: cribado de correos con marcado 'Personal' o 'Privado' para evitar su inclusion en el expediente probatorio.
5. Cadena de custodia informatica y elaboracion del informe de conclusiones de la investigacion para su aportacion a un despido disciplinario o querella.

Restricciones:
- Evita cualquier recomendacion que vulnere el derecho fundamental al secreto de las comunicaciones o a la intimidad del trabajador.

Formato de salida: Protocolo de actuacion para el departamento de Recursos Humanos y Compliance estructurado paso a paso con checklists.`,
        tags: ["investigación-interna", "laboral", "privacidad", "evidencias", "barbulescu"]
      },
      {
        id: "der-040",
        title: "Auditoría de Cumplimiento del Reglamento DORA (Resiliencia Operativa Digital para Entidades Financieras)",
        desc: "Evalúa el marco de gestión de riesgos TIC, notificación de incidentes graves y contratos con proveedores externos según el Reglamento (UE) 2022/2554.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Especialista en Regulación Bancaria, Fintech y Ciberseguridad Financiera (DORA Compliance Officer).
[COPIA AQUI TU IDEA]

Elabora el protocolo de auditoria de cumplimiento integral del Reglamento DORA (Digital Operational Resilience Act - Reglamento UE 2022/2554):
1. Evaluacion del marco de gestion de riesgos de las TIC (Articulos 5 a 16): politicas de seguridad de la informacion, herramientas de continuidad de negocio y planes de recuperacion ante desastres (DRP).
2. Protocolo de clasificacion y notificacion de incidentes graves relacionados con las TIC ante la autoridad competente (Banco de Espana / CNMV) en los plazos reglamentarios.
3. Programa de pruebas de resiliencia operativa digital: realizacion obligatoria de pruebas avanzadas basadas en amenazas (Threat-Led Penetration Testing / TLPT) cada 3 anos.
4. Gestion del riesgo de terceros proveedores de servicios de TIC (Articulos 28 a 44): auditoria de contratos cloud, clausulas de cooperacion, planes de salida (Exit Strategies) y registro informativo de contratos.
5. Evaluacion del riesgo de concentracion de proveedores criticos de TIC segun las directrices conjuntas de las EBA, ESMA y EIOPA.

Restricciones:
- Detalla especificamente el impacto de la aplicabilidad directa del reglamento sin necesidad de norma de transposicion estatal.

Formato de salida: Checklist de auditoria DORA en tabla Markdown con matriz de evidencias requeridas y plan de remediacion priorizado.`,
        tags: ["dora", "resiliencia-operativa", "regulación-financiera", "ciberseguridad", "compliance-tic"]
      },
      {
        id: "der-041",
        title: "Plan de Adecuación a la Directiva NIS2 sobre Ciberseguridad y Responsabilidad de Órganos de Administración",
        desc: "Audita entidades esenciales e importantes para asegurar el cumplimiento de medidas de gestión de riesgos y gobierno corporativo.",
        model: "DeepSeek V4",
        prompt: `Eres un Consultor Jurídico de Ciberseguridad y Asesor de Consejos de Administración en Gobernanza Digital.
[COPIA AQUI TU IDEA]

Crea el plan de adecuacion legal a la Directiva NIS2 (Directiva UE 2022/2555) para entidades esenciales e importantes:
1. Determinacion de la condicion de Entidad Esencial vs Entidad Importante segun sector de actividad (energia, transporte, banca, salud, infraestructuras digitales, administracion publica) y tamano corporativo.
2. Responsabilidad personal y directa de los miembros de los organos de administracion: obligacion de aprobacion de medidas de gestion de riesgos y capacitacion obligatoria en ciberseguridad.
3. Medidas de gestion de riesgos de ciberseguridad obligatorias (Articulo 21): politicas de analisis de riesgos, gestion de incidentes, seguridad de la cadena de suministro, criptografia y control de accesos.
4. Obligaciones de notificacion escalonada de incidentes significativos al CSIRT nacional (INCIBE-CERT / CCN-CERT): alerta temprana a las 24 horas, notificacion de incidente a las 72 horas e informe final a un mes.
5. Regimen sancionador aplicable: multas administrativas de hasta 10 millones de euros o el 2% del volumen de negocio mundial total anual, y suspension temporal de funciones directivas.

Restricciones:
- Identifica con precision los requisitos especificos de auditoria de seguridad de proveedores de software en la cadena de suministro.

Formato de salida: Guia ejecutiva de adecuacion NIS2 para el Consejo de Administracion con cuadro de responsabilidades y calendario de implantacion.`,
        tags: ["nis2", "ciberseguridad", "consejo-administración", "responsabilidad-directiva", "compliance"]
      },
      {
        id: "der-042",
        title: "Evaluación de Impacto en Protección de Datos (EIPD / DPIA) según Directrices del CEPD y AEPD",
        desc: "Realiza la evaluación preceptiva según el artículo 35 del RGPD para tratamientos de alto riesgo o uso intensivo de IA.",
        model: "GPT-4o",
        prompt: `Eres un Delegado de Protección de Datos (DPO) Certificado y Auditor de Privacidad según el RGPD.
[COPIA AQUI TU IDEA]

Estructura el informe formal de Evaluacion de Impacto en la Proteccion de Datos (EIPD) conforme a la guia oficial de la AEPD y el Comite Europeo de Proteccion de Datos (CEPD):
1. Verificacion de obligatoriedad de la EIPD segun la lista de tratamientos del Art. 35.3 RGPD y lista nacional de la AEPD (tratamientos a gran escala, perfiles biometricos, uso de IA en toma de decisiones automatizadas, datos de salud).
2. Descripcion sistematica del ciclo de vida de los datos: recogida, almacenamiento, transferencias internacionales (mecanismos de adecuacion o clausulas tipo SCC) y plazos de supresion.
3. Evaluacion de la necesidad y proporcionalidad del tratamiento en relacion con la base legitimadora del Art. 6 RGPD.
4. Identificacion y valoracion de riesgos para los derechos y libertades de las personas fisicas: discriminacion algoritmica, suplantacion de identidad, reidentificacion y perdida de control.
5. Medidas tecnicas y organizativas mitigadoras: anonimizacion diferencial, cifrado en reposo, revision humana obligatoria (Human-in-the-Loop) y politicas de gestion de brechas de seguridad.

Restricciones:
- Incluye el dictamen preceptivo del Delegado de Proteccion de Datos (DPO) con valoracion vinculante de si procede la consulta previa a la autoridad de control (Art. 36 RGPD).

Formato de salida: Documento formal de EIPD en Markdown listo para incorporacion al Registro de Actividades de Tratamiento (RAT).`,
        tags: ["rgpd", "eipd", "dpia", "aepd", "privacidad", "derechos-fundamentales"]
      },
      {
        id: "der-043",
        title: "Auditoría del Canal Interno de Denuncias conforme a la Ley 2/2023 de Protección al Denunciante",
        desc: "Verifica el cumplimiento de la Ley 2/2023 de protección de personas que informen sobre infracciones normativas y de lucha contra la corrupción.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Penalista y Compliance Officer Especialista en Investigaciones Internas Corporativas.
[COPIA AQUI TU IDEA]

Audita la configuracion juridica y operativa del canal interno de denuncias segun la Ley 2/2023 (transposicion de la Directiva Whistleblowing UE 2019/1937):
1. Garantia absoluta de confidencialidad de la identidad del informante y de cualquier tercero mencionado, y admision preceptiva de denuncias anonimas.
2. Nombramiento formal y autonomia del Responsable del Sistema Interno de Informacion ante el Consejo de Administracion.
3. Procedimiento de gestion de informaciones: acuse de recibo en un plazo maximo de 7 dias naturales y plazo maximo de 3 meses para dar respuesta a las investigaciones.
4. Regimen reforzado de prohibicion de represalias contra el informante (despido nulo, degradacion de puesto, evaluacion negativa injustificada o inclusion en listas negras).
5. Medidas de proteccion de la persona afectada: presuncion de inocencia, derecho de defensa y acceso al expediente sin revelacion de la identidad del denunciante.

Restricciones:
- Comprueba que el tratamiento de datos personales en el canal cumpla la obligacion de cancelacion de datos en el plazo maximo de 3 meses si no se inician actuaciones judiciales.

Formato de salida: Dictamen de auditoria del canal de denuncias con protocolo de tramitacion de expedientes de investigacion interna en Markdown.`,
        tags: ["whistleblowing", "ley-2-2023", "canal-denuncias", "compliance-penal", "anticorrupción"]
      }
    ]
  },
  {
    id: "rag-juridico",
    name: "Asistente RAG Jurídico con Cita Normativa (D1.4)",
    prompts: [
      {
        id: "der-018",
        title: "Ingesta Jerárquica y Segmentación de Textos Normativos",
        desc: "Chunking semántico inteligente de leyes respetando Títulos, Capítulos, Artículos y Párrafos sin cortar conceptos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Software RAG especializado en procesamiento de textos normativos y boletines oficiales (BOE / DOUE).
[COPIA AQUI TU IDEA]

Disena la estrategia de segmentacion semantica (chunking) para ingestar codigos y leyes en un motor de busqueda vectorial:
1. Estrategia de particion jerarquica: cada chunk debe coincidir exactamente con una unidad juridica natural (un Articulo completo o, si excede tokens, un Apartado individual).
2. Enriquecimiento de metadatos obligatorio por chunk: Titulo de la Ley, Numero y fecha oficial, Libro, Titulo, Capitulo, Seccion, Numero de Articulo y Letra.
3. Inyeccion del contexto de cabecera: anteponer a cada chunk el resumen jerarquico (ej: '[Codigo Civil - Libro IV De las Obligaciones y Contratos - Articulo 1255]').
4. Tratamiento de disposiciones adicionales, transitorias, derogatorias y finales para que no se confundan con el articulado ordinario.
5. Preservacion de notas de vigencia y reformas que modificaron el texto original.

Restricciones:
- No cortes nunca un articulo por la mitad en base a limites arbitrarios de caracteres; utiliza chunking consciente de la estructura del BOE.

Formato de salida: Script en Python que procese el XML del BOE y devuelva la lista de documentos enriquecidos con metadatos para ingesta en base vectorial.`,
        tags: ["rag", "chunking", "boe", "segmentación", "metadatos"]
      },
      {
        id: "der-019",
        title: "Búsqueda Semántica con Verificación Estricta de Vigencia Temporal",
        desc: "Recupera artículos relevantes asegurando que no estén derogados tácita o expresamente a la fecha del caso.",
        model: "DeepSeek V4",
        prompt: `Eres un Documentalista Juridico y Desarrollador de Motores de Busqueda Legal.
[COPIA AQUI TU IDEA]

Crea la logica de recuperacion semantica filtrada temporalmente para resolver consultas de derecho sustantivo:
1. Doble filtro de recuperacion: busqueda semantica por embeddings + filtrado booleano estricto por metadato 'fecha_vigencia'.
2. Verificacion de derecho intertemporal: capacidad de consultar la redaccion exacta vigente en una fecha historica especifica (la fecha en que ocurrieron los hechos del litigio).
3. Deteccion de derogaciones expresas y tacitas: alerta inmediata si el articulo recuperado ha sido derogado total o parcialmente por una ley posterior.
4. Resolucion de remisiones normativas: si el articulo cita otra disposicion ('segun lo previsto en el articulo X'), recuperar automaticamente dicho articulo enlazado.
5. Inyeccion de las concordancias jurisprudenciales mas recientes asociadas a dicho precepto.

Restricciones:
- Ninguna respuesta debe presentar un precepto derogado como vigente sin emitir una advertencia destacada en rojo.

Formato de salida: Pipeline de consulta en Python utilizando DuckDB/pgvector que aplique los filtros de vigencia antes de enviar el contexto al LLM.`,
        tags: ["vigencia", "derecho-intertemporal", "derogación", "búsqueda-semántica"]
      },
      {
        id: "der-020",
        title: "Generación de Respuesta Jurídica Fundada con Cita Normativa Exacta",
        desc: "Responde a consultas legales citando artículo, apartado, ley y jurisprudencia consolidada sin alucinaciones.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Letrado Asesor dictaminando sobre una consulta juridica formal.
[COPIA AQUI TU IDEA]

Responde a la consulta juridica aplicando una fundamentacion de derecho rigurosa a partir del contexto normativo aportado:
1. Estructura de dictamen silogistico:
   - Premisa Mayor (La Norma): exposicion de los articulos de aplicacion con transcripcion literal de los pasajes pertinentes y cita formal de la ley.
   - Premisa Menor (Los Hechos): subsuncion del supuesto de hecho concreto del cliente bajo los supuestos contemplados por la norma.
   - Conclusion / Fallo: resolucion logica fundada con determinacion de derechos, plazos de prescripcion/caducidad y acciones procesales viables.
2. Citas doctrinales y jurisprudenciales: referencia de sentencias del Tribunal Supremo o TJUE que interpreten pacíficamente dichos preceptos.
3. Evaluacion de riesgos procesales: identificacion de argumentos contrarios que podria esgrimir la contraparte y solidez de nuestra posicion.

Restricciones:
- Prohibida cualquier invencion o cita inexacta de articulos; si un dato no esta en el contexto legal, declara expresamente la laguna.

Formato de salida: Dictamen juridico formal en Markdown estructurado en Hechos, Fundamentos de Derecho y Conclusiones.`,
        tags: ["dictamen", "citas", "silogismo", "fundamentación", "rigor"]
      },
      {
        id: "der-044",
        title: "RAG Jurídico Avanzado con Grafo de Citas Normativas y Verificación de Vigencia en el BOE",
        desc: "Construye un sistema de recuperación aumentada con generación que valida en tiempo real si una ley o artículo sigue vigente.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Inteligencia Artificial Legal y Especialista en Arquitecturas RAG Jurídicas.
[COPIA AQUI TU IDEA]

Implementa el pipeline de RAG (Retrieval-Augmented Generation) avanzado para consultas juridicas con verificacion automatica de vigencia:
1. Ingesta y chunking jerarquico de textos normativos preservando la estructura legal completa: Titulo -> Capitulo -> Articulo -> Apartado -> Letra.
2. Generacion de embeddings especializados en dominio juridico y almacenamiento en base de datos vectorial (ChromaDB o Qdrant).
3. Grafo de citas normativas (Knowledge Graph): vinculacion de articulos con sus disposiciones derogatorias, modificaciones posteriores y reglamentos de desarrollo.
4. Conexion con la API oficial del Boletin Oficial del Estado (BOE) para verificar el estado de vigencia del precepto legal en la fecha de la consulta.
5. Prevencion de alucinaciones normativas: si el RAG no encuentra una norma vigente con rango suficiente, devuelve una abstencion explicita en lugar de inventar un precepto.

Restricciones:
- Cada afirmacion de respuesta debe estar acompanada obligatoriamente de la cita exacta con hipervinculo verificable al texto consolidado del BOE.

Formato de salida: Codigo completo en Python con LangChain / LlamaIndex y modulos de comprobacion de vigencia temporal de leyes.`,
        tags: ["rag", "boe", "vigencia-normativa", "vectores", "knowledge-graph", "legaltech"]
      },
      {
        id: "der-045",
        title: "Desambiguación Semántica de Conceptos Jurídicos Indeterminados en Jurisprudencia",
        desc: "Analiza la concreción jurisprudencial de conceptos como 'buena fe', 'interés del menor' o 'diligencia de un buen padre de familia'.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Dogmático del Derecho Civil y Procesador Semántico de Textos Doctrinales.
[COPIA AQUI TU IDEA]

Construye el extractor y desambiguador semantico de conceptos juridicos indeterminados en resoluciones judiciales:
1. Identificacion de conceptos valvula o clausulas generales en el ordenamiento civil: Buena fe contractual (Art. 7 y 1258 CC), Diligencia exigible (Buen padre de familia vs Lex Artis ad hoc), Interes superior del menor, Abuso de derecho.
2. Extraccion de los parametros facticos concretos utilizados por los tribunales para dotar de contenido material al concepto en litigios precedentes.
3. Clasificacion de precedentes por patrones de hechos (Fact Patterns) comparables: cuando la conducta fue considerada contraria a la buena fe vs cuando fue amparada.
4. Generacion de argumentos juridicos duales: tesis favorable a la subsuncion de la conducta en el concepto vs antitesis de exclusion.
5. Analisis de evolucion temporal: como ha variado la interpretacion del estandar de diligencia con la introduccion de herramientas digitales.

Restricciones:
- Evita definiciones meramente enciclopedicas; aterriza el concepto en los elementos de prueba requeridos en sala de vistas.

Formato de salida: Informe dogmatico y jurisprudencial en Markdown estructurado para fundamentacion de demanda o contestacion civil.`,
        tags: ["conceptos-indeterminados", "buena-fe", "lex-artis", "hermenéutica", "dogmática-jurídica"]
      },
      {
        id: "der-046",
        title: "Pipeline de Recuperación Jerárquica de Tratados Internacionales y Directivas Europeas",
        desc: "Organiza la jerarquía normativa Kelseniana para resolver litigios con aplicación preferente de derecho comunitario.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Experto en Derecho de la Unión Europea y Jerarquía Normativa Constitucional.
[COPIA AQUI TU IDEA]

Desarrolla el pipeline de recuperacion jerarquica de fuentes del derecho conforme al principio de primacia del Derecho Comunitario:
1. Modelado de la piramide de fuentes segun jurisprudencia del TJUE (Costa c. ENEL, Simmenthal) y Tribunal Constitucional espanol (DTC 1/2004):
   - Tratados Fundacionales de la UE y Carta de Derechos Fundamentales
   - Reglamentos Europeos (eficacia directa y aplicabilidad inmediata)
   - Directivas Europeas (con distincion entre directivas transpuestas y efecto directo vertical por expiracion de plazo de transposicion)
   - Constitucion Espanola
   - Leyes Organicas y Ordinarias
   - Decretos y Reglamentos administrativos
2. Deteccion de situaciones de conflicto normativo entre ley nacional y directiva europea no transpuesta en plazo.
3. Formulacion de cuestiones prejudiciales ante el Tribunal de Justicia de la Union Europea segun el articulo 267 del TFUE.
4. Mapeo de la transposicion de directivas en el Boletin Oficial del Estado verificando posibles incumplimientos o deficiencias de transposicion.
5. Generacion de tabla de citas con indicacion del rango jerarquico y principio de resolucion del conflicto (Primacia, Jerarquia, Especialidad o Competencia).

Restricciones:
- Toda cita de derecho de la UE debe incluir el identificador CELEX oficial de EUR-Lex.

Formato de salida: Modulo de Python con indexador jerarquico y generador de fundamentos de derecho comunitario en Markdown.`,
        tags: ["derecho-comunitario", "tjue", "eur-lex", "celex", "primacía", "cuestión-prejudicial"]
      }
    ]
  },
  {
    id: "clausulas-abusivas",
    name: "Detector de Cláusulas Abusivas y Consumo (D1.5)",
    prompts: [
      {
        id: "der-021",
        title: "Detección de Cláusulas Abusivas en Contratos de Consumo y Préstamos",
        desc: "Examina hipotecas y contratos bancarios detectando cláusula suelo, gastos hipotecarios e intereses usurarios.",
        model: "DeepSeek V4",
        prompt: `Eres un Magistrado Especialista en Derecho del Consumo y Condiciones Generales de la Contratacion.
[COPIA AQUI TU IDEA]

Examina el contrato de prestamo o consumo y detecta la presencia de clausulas abusivas o nulas de pleno derecho:
1. Clausula Suelo (Floor Clause): limite a la bajada del tipo de interes variable sin correspondencia con techo o sin simulacion de escenarios.
2. Clausula de Gastos Hipotecarios: atribucion indiscriminada al prestatario de gastos de notaria, registro, gestoria y tasacion (contraria a doctrina STS 2019/2021).
3. Intereses Moratorios Desproporcionados: intereses de demora superiores en mas de 2 puntos porcentuales al interes remuneratorio pactado (doctrina STS Pleno 2015).
4. Vencimiento Anticipado por Incumplimiento de una sola cuota (nulidad segun jurisprudencia TJUE y art. 24 Ley 5/2019 de credito inmobiliario).
5. Intereses Remuneratorios Usurarios en tarjetas revolving (Ley de Represion de la Usura de 1908 / Ley Azcarate) comparados con las tablas del Banco de Espana.

Restricciones:
- Para cada clausula detectada, fundamenta la nulidad citando el precepto infringido de la LGDCU y la sentencia de unificacion de doctrina aplicable.

Formato de salida: Tabla de auditoria de abusividad [Clausula, Texto Localizado, Vicio Juridico, Jurisprudencia Aplicable, Accion Recomendada].`,
        tags: ["cláusulas-abusivas", "hipotecas", "suelo", "revolving", "consumidores"]
      },
      {
        id: "der-022",
        title: "Doble Control de Transparencia Formal y Material",
        desc: "Aplica el test de transparencia establecido por el Tribunal Supremo y el TJUE sobre cláusulas predispuestas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Letrado especialista en Derecho Bancario y Litigacion de Consumo ante el Tribunal Supremo y TJUE.
[COPIA AQUI TU IDEA]

Somete las estipulaciones contractuales al doble filtro de transparencia formal y material:
1. Control de Inclusion / Transparencia Formal: verificar legibilidad tipografica (tamano de letra > 1.5 mm segun LGDCU), redaccion gramatical clara y entrega previa de oferta vinculante (FIPER / FEIN).
2. Control de Comprensibilidad Real / Transparencia Material: analizar si el consumidor medio pudo comprender no solo la carga formal, sino la carga economica real y consecuencias financieras del contrato.
3. Analisis de la oferta precontractual: comprobar si existieron simulaciones de escenarios comparativos de evolucion de cuotas antes de la firma.
4. Consecuencia de la falta de transparencia: declaracion de nulidad de la condicion general con efecto restitutorio integro ('ex tunc', devolucion de cantidades indebidas mas intereses legales).

Restricciones:
- Aplica escrupulosamente los criterios de la historica STS de 9 de mayo de 2013 y sentencias del TJUE en materia de transparencia.

Formato de salida: Dictamen de transparencia en Markdown estructurado en Fases de Control con dictamen final sobre la viabilidad de la nulidad.`,
        tags: ["transparencia", "control-material", "bancario", "consumo"]
      },
      {
        id: "der-023",
        title: "Redacción de Reclamación Extrajudicial Previa a Entidad Financiera",
        desc: "Redacta el requerimiento formal de nulidad y devolución de importes ante el Servicio de Atención al Cliente.",
        model: "GPT-4o",
        prompt: `Eres un Abogado de Consumo redactando una reclamacion extrajudicial previa a la via judicial.
[COPIA AQUI TU IDEA]

Redacta el escrito formal de reclamacion previa dirigido al Servicio de Atencion al Cliente (SAC) de la entidad bancaria:
1. Identificacion formal del reclamante, contrato de prestamo hipotecario o poliza, fecha de firma y notaria autorizante.
2. Exposicion fundamentada de las clausulas impugnadas (clausula de gastos, comision de apertura o comisiones por reclamacion de posiciones deudoras).
3. Cita categorica de la jurisprudencia consolidada de la Sala Primera del Tribunal Supremo y sentencias del TJUE que declaran su nulidad radical.
4. Desglose provisional de cantidades cobradas indebidamente cuya restitucion integra se reclama, acompanadas de los intereses legales correspondientes desde la fecha de cada cobro.
5. Requerimiento de allanamiento en el plazo improrrogable de 30 dias (segun normativa del Banco de Espana) con advertencia expresa de interposicion de demanda judicial con expresa peticion de imposicion de costas procesales.

Restricciones:
- Redaccion persuasiva, solemne, juridicamente irreprochable y lista para su presentacion formal por burofax o en oficina bancaria.

Formato de salida: Documento procesal extrajudicial completo en Markdown listo para firma del cliente o letrado.`,
        tags: ["reclamación-extrajudicial", "sac", "restitución", "bancario"]
      },
      {
        id: "der-047",
        title: "Detección de Cláusulas Suelo y Gastos Hipotecarios Abusivos según Doctrina del TJUE",
        desc: "Audita escrituras de préstamo hipotecario aplicando los controles de transparencia material y formal de la Ley 5/2019.",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Especialista en Derecho Bancario y Protección de Consumidores Hipotecarios.
[COPIA AQUI TU IDEA]

Crea el sistema de auditoria automatizada de escrituras de prestamo hipotecario con consumidores:
1. Evaluacion de clausulas de limitacion a la variacion del tipo de interes (Clausulas Suelo): control de inclusion, transparencia formal y comprensibilidad real de la carga economica (Doctrina STS 9 mayo 2013 y TJUE 21 diciembre 2016).
2. Calculo retrospectivo de liquidaciones dinerarias: determinacion del exceso cobrado indebidamente desde la formalizacion del prestamo con intereses legales.
3. Auditoria de la clausula de distribucion de gastos hipotecarios: comprobacion de la nulidad de la atribucion total al prestatario y calculo de devolucion segun doctrina jurisprudencial (Notaria 50%, Registro 100%, Gestoria 100%, Tasacion 100%).
4. Evaluacion de clausulas accesorias abusivas: comision de apertura sin servicio efectivo acreditado, vencimiento anticipado por un solo impago (nulo tras STJUE 26 marzo 2019) e intereses de demora abusivos (> 2 puntos sobre remuneratorios).
5. Generacion automatizada del escrito de reclamacion previa extrajudicial ante el Servicio de Atencion al Cliente (SAC) de la entidad bancaria.

Restricciones:
- Requiere distinguir formalmente si el prestatario actuo como consumidor (persona fisica ajena a actividad mercantil) o como profesional/empresa.

Formato de salida: Modulo en Python 'mortgage_clause_auditor.py' con tabla de importes recuperables y escrito formal de reclamacion SAC.`,
        tags: ["bancario", "cláusulas-suelo", "gastos-hipoteca", "consumidores", "reclamación-sac", "tjue"]
      },
      {
        id: "der-048",
        title: "Auditoría de Condiciones Generales en Comercio Electrónico y Protección de Consumidores B2C",
        desc: "Verifica términos y condiciones de plataformas web frente a la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Experto en Contratación Digital, E-Commerce y Derechos del Consumidor Online.
[COPIA AQUI TU IDEA]

Audita los Terminos y Condiciones Generales de Venta de una plataforma de comercio electronico B2C segun el TRLGDCU (RD Legislativo 1/2007):
1. Verificacion del derecho de desistimiento legal: plazo minimo obligatorio de 14 dias naturales sin necesidad de justificacion ni penalizacion, e informacion clara sobre quien asume los costes de devolucion.
2. Deteccion de clausulas que restringen o eliminan indebidamente el plazo legal de garantia legal de conformidad (3 anos para bienes nuevos segun normativa actual).
3. Clausulas de sumision expresa a fueros territoriales lejanos (nulas de pleno derecho; el fuero del consumidor es imperativo e indisponible).
4. Clausulas de limitacion de responsabilidad por retrasos en la entrega o falta de stock imputables al comerciante.
5. Modificacion unilateral de precios o caracteristicas del producto con posterioridad a la formalizacion de la compra online.

Restricciones:
- Comprueba que la casilla de aceptacion de terminos no este pre-marcada por defecto (Pre-ticked box prohibido por la normativa europea).

Formato de salida: Informe de auditoria legal para e-commerce con identificacion de clausulas nulas segun los articulos 82 a 91 del TRLGDCU y texto alternativo ajustado a derecho.`,
        tags: ["e-commerce", "consumidores", "trlgdcu", "desistimiento", "garantía-legal", "contratación-online"]
      },
      {
        id: "der-049",
        title: "Evaluación de Cláusulas de Modificación Unilateral en Contratos de Servicios de Suscripción",
        desc: "Analiza términos de servicio SaaS y streaming para detectar cambios discrecionales de precios sin preaviso adecuado.",
        model: "GPT-4o",
        prompt: `Eres un Asesor Legal de Negocios de Suscripción Digital y Defensa de la Competencia.
[COPIA AQUI TU IDEA]

Audita las condiciones de servicio de modelos de suscripcion periodica mensual/anual en plataformas digitales:
1. Examen de las clausulas que facultan al prestador a modificar unilateralmente las tarifas o eliminar funcionalidades esenciales del servicio.
2. Requisitos de validez del preaviso: comunicacion individualizada, transparente y con antelacion minima razonable (minimo 30 dias).
3. Reconocimiento formal del derecho de resolucion gratuita e inmediata del contrato por parte del usuario en caso de no aceptar las nuevas tarifas.
4. Evaluacion de los mecanismos de renovacion automatica: transparencia de las politicas de cancelacion y exigencia de que cancelar sea tan sencillo como suscribirse (Principio de Simetria de Cancelacion).
5. Deteccion de renovaciones anuales con cobro integro sin previo aviso recordatorio al consumidor antes de la fecha limite.

Restricciones:
- Aplica las directrices recientes de la Comision Europea y autoridades de consumo sobre patrones oscuros en renovaciones de suscripcion.

Formato de salida: Dictamen de conformidad legal con matriz de semaforo de riesgo contractual (Verde, Amarillo, Rojo) para el operador del servicio.`,
        tags: ["suscripciones", "saas", "modificación-unilateral", "consumo-digital", "renovación-automática"]
      }
    ]
  },
  {
    id: "due-diligence",
    name: "Due Diligence Automatizada en Operaciones (D1.6)",
    prompts: [
      {
        id: "der-024",
        title: "Revisión Societaria de Libros de Actas, Estatutos y Pactos de Socios",
        desc: "Audita la secretaría corporativa, composición accionarial, ampliaciones de capital y restricciones de transmisión.",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Mercantilista Senior realizando la auditoria legal (Legal Due Diligence) de una sociedad mercantil target en un proceso de M&A.
[COPIA AQUI TU IDEA]

Examina los antecedentes societarios y la secretaria corporativa de la compania target:
1. Estructura de capital social y titularidad real: verificacion de la cadena ininterrumpida de transmisiones de participaciones/acciones y libro registro de socios.
2. Composicion y facultades del organo de administracion: poderes notariales vigentes, apoderamientos mancomunados/solidarios y vigencia del cargo.
3. Revision de Estatutos Sociales y Pactos Parasociales (Pactos de Socios): clausulas de arrastre (Drag-Along), acompanamiento (Tag-Along), derechos de adquisicion preferente y mayorias reforzadas.
4. Ampliaciones y reducciones de capital: regularidad en la toma de acuerdos de juntas generales, desembolso de aportaciones y debida inscripcion en el Registro Mercantil.
5. Operaciones vinculadas: prestamos socios-sociedad, retribucion de administradores y cumplimiento de los deberes de lealtad y abstencion por conflicto de interes.

Restricciones:
- Senala con bandera roja (Red Flag) cualquier discrepancia entre los acuerdos sociales y la titularidad inscrita en el Registro Mercantil.

Formato de salida: Seccion Societaria del informe de Due Diligence con tabla resumen de acuerdos clave y contingencias detectadas.`,
        tags: ["due-diligence", "societario", "m-and-a", "pacto-socios", "estatutos"]
      },
      {
        id: "der-025",
        title: "Auditoría de Contratos Materiales y Cláusulas de Cambio de Control (Change of Control)",
        desc: "Identifica contratos comerciales estratégicos que se rescinden si entra un nuevo inversor o comprador.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Fusiones y Adquisiciones (M&A) revisando la cartera de contratos comerciales de la target.
[COPIA AQUI TU IDEA]

Audita los contratos clave de la sociedad objetivo identificando riesgos operativos derivados de la transaccion de compraventa:
1. Deteccion de clausulas de Cambio de Control (Change of Control): estipulaciones que facultan a clientes clave, proveedores o entidades financieras a rescindir el contrato unilateralmente si cambia la propiedad accionarial.
2. Contratos de exclusividad, no competencia o distribucion geografica vinculante que limiten la expansion futura del grupo adquirente.
3. Clausulas de cesion contractual y subcontratacion: necesidad de consentimiento previo por escrito de la contraparte ante operaciones corporativas.
4. Obligaciones financieras y covenants bancarios: aceleracion automatica de creditos sindicados ante modificacion de socios de control.
5. Concentracion comercial: porcentaje de facturacion dependiente de los 3 principales clientes y vigencia de sus compromisos contractuales.

Restricciones:
- Califica el impacto economico de la perdida potencial de cada contrato afectado por clausula de cambio de control.

Formato de salida: Matriz de contratos materiales con columnas [Contraparte, Tipo Contrato, Clausula Cambio de Control Si/No, Necesidad de Consentimiento, Nivel de Riesgo].`,
        tags: ["change-of-control", "contratos-materiales", "m-and-a", "covenants"]
      },
      {
        id: "der-026",
        title: "Informe Ejecutivo de Due Diligence Legal (Red Flags Report)",
        desc: "Sintetiza los hallazgos críticos de la auditoría legal con cuantificación de riesgos y sugerencias de ajuste de precio.",
        model: "GPT-4o",
        prompt: `Eres el Socio Director de M&A de un bufete internacional preparando el Red Flags Report para el fondo adquirente.
[COPIA AQUI TU IDEA]

Sintetiza los hallazgos de la auditoria legal en un informe ejecutivo de banderas rojas (Red Flags):
1. Resumen ejecutivo de la operacion: objeto de compra, precio preliminar, estructura (Share Deal vs Asset Deal) y plazo de cierre (Closing).
2. Cuadro de mando de Contingencias por Area:
   - Contingencias Societarias y Contractuales.
   - Litigios pendientes o de resolucion inminente (cuantias reclamadas y provision contable requerida).
   - Contingencias Laborales (falsos autonomos, reclasificacion profesional, cesion ilegal).
   - Cumplimiento Regulatorio, Licencias de actividad y Proteccion de Datos.
3. Calificacion de severidad de contingencias: Deal Breakers (impiden cerrar la operacion sin subsanacion previa), Condiciones Precedentes (CP obligatorias antes del cierre), Ajustes al Precio de Compra (Purchase Price Adjustment) o Retenciones en Escrow.
4. Redaccion de clausulas de declaraciones y garantias (Representations & Warranties) especificas para blindar al comprador frente a los riesgos detectados.

Restricciones:
- Enfoque estrictamente transaccional, cuantitativo y pragmatico orientado a la toma de decision de inversion.

Formato de salida: Documento formal de Red Flags Report en Markdown con matriz de contingencias cuantificadas en euros y semaforo de viabilidad.`,
        tags: ["red-flags", "m-and-a", "contingencias", "declaraciones-garantías"]
      },
      {
        id: "der-050",
        title: "Informe de Red Flag Due Diligence en Propiedad Intelectual y Licencias Open Source",
        desc: "Audita repositorios de software de la empresa diana para detectar contaminación de licencias virales (GPL / AGPL).",
        model: "DeepSeek V4",
        prompt: `Eres un Abogado Tecnológico Especialista en Fusiones y Adquisiciones (M&A) y Propiedad Intelectual de Software.
[COPIA AQUI TU IDEA]

Elabora el informe de Red Flags de Due Diligence en Propiedad Intelectual sobre los activos de software de una compania tecnologica diana:
1. Auditoria de la cadena de titularidad del codigo fuente: contratos de cesion de derechos de autor con empleados y desarrolladores freelance (Work for Hire / Cesion en exclusiva).
2. Deteccion de contaminacion por licencias de software libre virales o con copyleft fuerte (GNU GPL v2/v3, AGPL) enlazadas estaticamente en el software propietario de la empresa.
3. Evaluacion del riesgo de obligatoriedad de liberacion publica del codigo propietario del producto comercial (GPL Infection Risk).
4. Comprobacion del estado de registro de marcas comerciales, dominios web y patentes de software en las jurisdicciones clave de operacion (EUIPO, OEPM, USPTO).
5. Clausulas de custodia de codigo fuente (Escrow Agreements) y compromisos de liberacion ante quiebra o cese de mantenimiento.

Restricciones:
- Cuantifica el impacto economico del coste de reescritura de los modulos de software afectados por licencias incompatibles.

Formato de salida: Seccion de Propiedad Intelectual del informe de Due Diligence con tabla de dependencias analizadas y categorizacion de severidad de riesgos.`,
        tags: ["due-diligence", "propiedad-intelectual", "open-source", "gpl", "m&a", "software"]
      },
      {
        id: "der-051",
        title: "Auditoría de Contingencias Laborales y Falsos Autónomos en Operaciones de M&A",
        desc: "Cuantifica deudas con la Seguridad Social por incorrecta laboralidad de contratas, riders o directivos mercantiles.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Abogado Laboralista Senior de Auditoría Preventiva en Procesos de Compraventa de Empresas (M&A).
[COPIA AQUI TU IDEA]

Calcula la matriz de contingencias laborales en un proceso de adquisicion corporativa:
1. Evaluacion del riesgo de recalificacion judicial de prestadores de servicios autonomos o contratas como falsos autonomos (Trade / TRADE irregular): ajenidad en los frutos, dependencia jerarquica e insercion en la organizacion.
2. Estimacion de actas de liquidacion de cuotas debidas a la Tesoreria General de la Seguridad Social (TGSS) en los ultimos 4 anos no prescritos con recargos del 20% al 35% e intereses de demora.
3. Analisis de la sucesion de empresa segun el articulo 44 del Estatuto de los Trabajadores: subrogacion obligatoria y responsabilidad solidaria del adquirente por deudas laborales y de seguridad social anteriores.
4. Comprobacion del cumplimiento de planes de igualdad, registro retributivo obligatorio y prevencion de riesgos laborales.
5. Propuesta de retencion en garantia del precio de compra (Holdback / Escrow Account) o indemnidad especifica (Specific Indemnity) para cubrir las contingencias detectadas.

Restricciones:
- Diferencia claramente entre directivos con contrato mercantil de administracion vs contrato de alta direccion (RD 1382/1985).

Formato de salida: Capitulo laboral del informe de Due Diligence con cuadro de contingencias cuantificadas economicamente en euros.`,
        tags: ["due-diligence", "laboral", "falsos-autónomos", "seguridad-social", "art-44-et", "m&a"]
      },
      {
        id: "der-052",
        title: "Matriz de Pasivos Ambientales y Licencias Urbanísticas en Transacciones Inmobiliarias",
        desc: "Evalúa licencias de actividad, suelo contaminado y cumplimiento ESG en adquisiciones de activos logísticos e industriales.",
        model: "GPT-4o",
        prompt: `Eres un Abogado Administrativista e Inmobiliario (Real Estate) Especialista en Due Diligence Ambiental.
[COPIA AQUI TU IDEA]

Audita los aspectos urbanisticos, de licencias y pasivos ambientales de un inmueble industrial o logistico en proceso de compraventa:
1. Verificacion de la legalidad urbanistica del activo: licencia de obras, licencia de primera ocupacion/actividad, compatibilidad de uso del suelo y prescripcion de infracciones urbanisticas.
2. Investigacion del historico de actividades potencialmente contaminantes del suelo segun el RD 9/2005 y evaluacion de la obligacion de presentar Informes Periodicos de Situacion del Suelo.
3. Responsabilidad legal por descontaminacion: afeccion real del suelo y responsabilidad subsidiaria del adquirente segun la Ley 7/2022 de residuos y suelos contaminados.
4. Cumplimiento de licencias ambientales integradas (IPPC) y autorizaciones de vertido de aguas residuales.
5. Verificacion del Certificado de Eficiencia Energetica (CEE) y cumplimiento de criterios taxonomicos ESG europeos para edificios sostenibles.

Restricciones:
- Incluye clausulas contractuales de declaraciones y garantias (Representations & Warranties) especificas de medio ambiente para proteger al comprador.

Formato de salida: Informe de Due Diligence inmobiliario y ambiental con semaforo de riesgos urbanisticos y redaccion de clausulas contractuales.`,
        tags: ["real-estate", "urbanismo", "medio-ambiente", "suelos-contaminados", "due-diligence", "licencias"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Dictámenes, Auditoría y Alertas)",
    prompts: [
      {
        id: "der-027",
        title: "Redacción Formal de Dictamen Jurídico Silogístico",
        desc: "Estructura opiniones legales complejas con fundamentación rigurosa apta para comités de dirección y consejos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Letrado Asesor del Consejo de Administracion redactando un dictamen juridico formal de alta direccion.
[COPIA AQUI TU IDEA]

Elabora el dictamen juridico colegiado sobre la cuestion legal controvertida:
1. Encabezamiento formal: destinatario (Consejo de Administracion / Comite de Auditoria), fecha, asunto y antecedentes facticos declarados.
2. Cuestiones juridicas sometidas a informe: delimitacion precisa de las interrogantes a responder.
3. Fundamentacion de Derecho: analisis dogmatico y jurisprudencial exhaustivo citando normativas aplicables y doctrina consolidada.
4. Juicio de prospeccion procesal: estimacion porcentual de probabilidad de exito ante un eventual contencioso judicial.
5. Conclusiones y recomendaciones operativas: lineas de actuacion concretas y mitigacion de contingencias de responsabilidad de administradores.

Restricciones:
- Tono solemne, academico, preciso y desprovisto de juicios personales no fundados en preceptos legales.

Formato de salida: Dictamen letrado estructurado en Markdown con numeracion juridica de parrafos (margenes y articulado) listo para firma colegiada.`,
        tags: ["dictamen", "consejo-administración", "alta-dirección", "formal"]
      },
      {
        id: "der-028",
        title: "Trazabilidad y Sellado de Tiempo Cualificado eIDAS para Evidencias",
        desc: "Garantiza la autenticidad y fecha cierta de documentos y contratos digitales según Reglamento eIDAS UE 910/2014.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Evidencia Electronica y Prestadores de Servicios de Confianza Cualificados (Reglamento eIDAS).
[COPIA AQUI TU IDEA]

Disena la arquitectura tecnica y legal para el sellado y custodia probatoria de documentos digitales:
1. Generacion de hash criptografico inalterable (SHA-256 o SHA-3) del documento digital original.
2. Protocolo de Sellado de Tiempo Cualificado (Qualified Timestamp) mediante integracion con Autoridades de Sellado de Tiempo (TSA) acreditadas por el Ministerio de Transformacion Digital.
3. Creacion de firma electronica avanzada o cualificada basada en certificados X.509 segun formato PAdES-LTV (Long Term Validation) para garantizar la validez probatoria durante mas de 10 anos.
4. Generacion de la ficha tecnica de acreditacion judicial conforme al art. 326 LEC para su admision como prueba documental publica en juicio.
5. Almacenamiento seguro en repositorio inmutable WORM para garantizar no repudio de la transaccion.

Restricciones:
- Cumple con todos los requisitos del Reglamento eIDAS (Reglamento UE 910/2014) y la Ley 6/2020 de servicios electronicos de confianza.

Formato de salida: Script de Python utilizando librerias criptograficas y cliente de sellado de tiempo RFC 3161 con explicacion procesal.`,
        tags: ["eidas", "sellado-tiempo", "firma-digital", "pades", "evidencia-digital"]
      },
      {
        id: "der-029",
        title: "Sistema de Alertas de Reformas Normativas en Boletines Oficiales (BOE / DOUE / CCAA)",
        desc: "Monitorea disposiciones publicadas alertando a los departamentos jurídicos de cambios con impacto directo.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Ingeniero de Automatizacion Legal construyendo un radar de reformas legislativas en tiempo real.
[COPIA AQUI TU IDEA]

Disena el sistema de monitoreo continuo y alertas tempranas sobre boletines oficiales:
1. Ingesta diaria de los sumarios oficiales: Boletin Oficial del Estado (BOE), Diario Oficial de la Union Europea (DOUE) y Boletines Oficiales de Comunidades Autonomas (BOCM, DOGC, etc.).
2. Filtros de palabras clave y materias juridicas relevantes (ej: contratos publicos, derecho laboral, proteccion de datos, fiscalidad societaria).
3. Clasificacion del tipo de disposicion: Ley Organica, Real Decreto-ley, Orden Ministerial, Circular de la CNMV o del Banco de Espana.
4. Analisis de impacto: extraccion automatica de la fecha de entrada en vigor y disposicion derogatoria para detectar normativas que decaen.
5. Despacho de alerta sintetica a los equipos juridicos afectados via correo corporativo o canal de Teams/Slack con enlace directo al texto oficial en PDF.

Restricciones:
- El sistema debe priorizar las entradas de aplicacion inmediata (Reales Decretos-leyes con entrada en vigor el dia de su publicacion).

Formato de salida: Pipeline en Python con peticiones asincronas a la API del BOE y generador de boletin de novedades legislativas en Markdown.`,
        tags: ["alertas-legales", "boe", "doue", "reformas", "automatización"]
      },
      {
        id: "der-030",
        title: "Anonimización Sistemática de Datos Personales en Demandas y Sentencias",
        desc: "Ofusca nombres, DNI, números de cuenta, direcciones y empresas preservando el sentido jurídico del pleito.",
        model: "DeepSeek V4",
        prompt: `Eres un Delegado de Proteccion de Datos (DPO) en un despacho de abogados y especialista en anonimizacion judicial.
[COPIA AQUI TU IDEA]

Anonimiza el documento procesal protegiendo la identidad de los intervinientes sin alterar la coherencia del litigio:
1. Reemplazo sistematico de personas fisicas por pseudonimos consistentes (ej: 'Don Juan Perez Garcia' -> '[Demandante 1]', 'Dona Maria Lopez' -> '[Testigo 1]').
2. Ofuscacion estricta de identificadores unicos: DNI/NIE, numeros de la Seguridad Social, cuentas bancarias IBAN, direcciones postales y telefonos.
3. Tratamiento de personas juridicas: sustitucion de denominaciones sociales que permitan identificar a las partes en litigios de notoriedad publica (ej: '[Entidad Bancaria A]').
4. Preservacion de fechas, importes economicos discutidos y citas de articulos de leyes esenciales para el analisis doctrinal de la resolucion.
5. Generacion de la tabla privada de correspondencias (tabla de descifrado) custodiada bajo cifrado simetrico para uso exclusivo del letrado titular.

Restricciones:
- No utilices marcado destructivo irrecuperable en la version de trabajo; asegura que la tabla de claves permite trazabilidad interna.
- Cumple con las pautas del CENDOJ de proteccion de datos en resoluciones judiciales.

Formato de salida: Texto procesal anonimizado en Markdown listo para publicacion o investigacion cientifica, seguido de la estructura de la tabla de claves.`,
        tags: ["anonimización", "rgpd", "pseudonimización", "privacidad-judicial"]
      },
      {
        id: "der-031",
        title: "Exportación de Expedientes Procesales con Foliado Digital e Índice Normalizado",
        desc: "Organiza documentos, demandas y pruebas periciales en un expediente digital foliado para LexNET / Justizia.",
        model: "GPT-4o",
        prompt: `Eres un Procurador de los Tribunales y Especialista en Presentacion Telematica de Escritos Judiciales (LexNET).
[COPIA AQUI TU IDEA]

Estructura y normaliza el expediente procesal para su presentacion formal telemática ante la sede judicial electronica:
1. Generacion del Indice General foliado hipervinculado: numero de documento, descripcion procesal breve (ej: 'Doc. Num. 1: Escritura de Poder General para Pleitos') y pagina de inicio/fin.
2. Foliado digital correlativo en la esquina superior derecha de todas las paginas que integran el expediente acumulado.
3. Separacion estricta entre el escrito principal (demanda, contestacion o recurso) y el bloque de documentos probatorios adjuntos conforme a las guias tecnicas del Ministerio de Justicia.
4. Verificacion de limites de peso de archivo (maximo 15 MB por envio en LexNET) con division automatica en piezas numeradas respetando la integridad de cada prueba.
5. Formato PDF/A con reconocimiento optico de caracteres (OCR) para permitir busqueda textual por el juez y letrado de la administracion de justicia.

Restricciones:
- Cumple las especificaciones tecnicas obligatorias del sistema LexNET y plataformas autonomicas equivalentes (Justizia, eJusticia, Vereda).

Formato de salida: Codigo en Python utilizando PyMuPDF/PyPDF para compilar, foliar, indexar e insertar marcadores en el expediente judicial digital.`,
        tags: ["lexnet", "foliado", "expediente-judicial", "procura", "pdf-a"]
      },
      {
        id: "der-053",
        title: "Conversión y Validación de Escritos Judiciales para Presentación Telemática en LexNET",
        desc: "Verifica que los documentos procesales cumplan los requisitos técnicos de formato PDF/A, peso máximo y foliación de LexNET.",
        model: "DeepSeek V4",
        prompt: `Eres un Procurador de los Tribunales y Experto en Procesamiento Telemático Judicial con LexNET / Justizia.
[COPIA AQUI TU IDEA]

Crea el validador y formateador de expedientes procesales para envio a traves de la plataforma LexNET del Ministerio de Justicia:
1. Conversion estricta de escritos principales y documentos adjuntos al estandar PDF/A con OCR integrado para permitir busqueda textual.
2. Verificacion del limite de peso maximo de transmision por envio (maximo 15 MB o division automatica en multiples envios vinculados con indice electronico).
3. Foliacion electronica automatizada correlativa del expediente y generacion del Indice de Documentos con hipervinculos funcionales hacia cada anexo.
4. Nomenclatura normalizada de archivos segun la guia del Comite Tecnico Estatal de la Administracion Judicial Electronica (CTEAJE).
5. Comprobacion de firma electronica reconocida o cualificada con certificado ACA de la Abogacia o FNMT conforme a eIDAS.

Restricciones:
- No permitas documentos escaneados como imagenes puras sin capa de texto OCR reconocible, causa frecuente de rechazo en secretarias judiciales.

Formato de salida: Script en Python con la clase 'LexNetPackageBuilder' utilizando 'pypdf' y generador de indice de prueba procesal.`,
        tags: ["lexnet", "procesal", "justicia-digital", "pdf-a", "firma-electrónica", "procuradores"]
      },
      {
        id: "der-054",
        title: "Pista de Auditoría Forense Criptográfica con Sellado de Tiempo eIDAS",
        desc: "Genera registros inmutables con hashes SHA-256 encadenados y sellado temporal cualificado para prueba pericial judicial.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Perito Judicial Informático Forense y Especialista en Prueba Electrónica según la LEC.
[COPIA AQUI TU IDEA]

Disena la arquitectura de la pista de auditoria inmutable para trazabilidad de evidencias digitales admisibles en juicio:
1. Generacion automatica del hash criptografico SHA-256 de cada documento, intervencion de usuario, modificacion de contrato o aceptacion de terminos.
2. Estructura de registro encadenado (Merkle Tree / Hash Chain) donde cada apunte incorpora el hash del apunte inmediatamente anterior impidiendo la alteracion retroactiva.
3. Protocolo de Sellado de Tiempo Cualificado (Qualified Timestamp) conforme al Reglamento eIDAS (Reglamento UE 910/2014) emitido por una Autoridad de Sellado de Tiempo reconocida.
4. Documentacion formal de la cadena de custodia digital: marca temporal UTC, direccion IP del firmante, agente de usuario (User-Agent) e identificador unico de sesion.
5. Generacion de dictamen pericial estandarizado listo para aportar como documento procesal al amparo del articulo 335 de la Ley de Enjuiciamiento Civil.

Restricciones:
- Asegura que el procedimiento pericial sea plenamente reproducible por el perito de la parte contraria sin divulgar secretos comerciales.

Formato de salida: Modulo de Python 'forensic_audit_trail.py' con funciones de sellado y generador de certificado pericial en PDF.`,
        tags: ["prueba-electrónica", "peritaje-informático", "eidas", "sha-256", "cadena-de-custodia", "forense"]
      },
      {
        id: "der-055",
        title: "Generador de Fichas de Encargo Profesional y Presupuestos Honorarios según Criterios Orientativos",
        desc: "Redacta hojas de encargo formal de servicios jurídicos con presupuesto cerrado o escalonado y consentimiento RGPD.",
        model: "GPT-4o",
        prompt: `Eres un Letrado Director de Despacho y Especialista en Gestión y Facturación de Servicios Jurídicos.
[COPIA AQUI TU IDEA]

Crea el generador formal de Hojas de Encargo Profesional de servicios juridicos conforme a la doctrina del Tribunal Supremo sobre transparencia de precios:
1. Identificacion de las partes: datos colegiales del letrado/sociedad profesional y datos identificativos completos del cliente.
2. Descripcion pormenorizada del objeto del encargo: delimitacion exacta de las fases procesales incluidas (primera instancia, recursos de apelacion, ejecucion de sentencia, medidas cautelares).
3. Estipulacion economica de honorarios: honorarios fijos por hito, precios por hora o pacto de cuota litis conforme a la legalidad (pacto de exito con porcentaje sobre el resultado obtenido).
4. Desglose explicito de gastos no incluidos: aranceles de procurador, honorarios de peritos, provisiones de fondos, tasas judiciales e indemnizaciones por costas procesales.
5. Clausula de prevencion de blanqueo de capitales (Ley 10/2010), autorizacion de comunicaciones electronicas y consentimiento informado de proteccion de datos (RGPD).

Restricciones:
- No utilices clausulas ambiguas de facturacion 'segun evolucion del asunto' sin fijar un orden de magnitud o presupuesto estimativo inicial.

Formato de salida: Plantilla automatizada en Python con exportacion a PDF formal de la Hoja de Encargo con firma electronica integrada.`,
        tags: ["hoja-de-encargo", "honorarios", "despacho-abogados", "cuota-litis", "facturación-jurídica"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Derecho & Compliance
 */
export const DERECHO_PROMPTS = DERECHO_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "derecho",
    areaName: "Derecho & Compliance",
    areaColor: "#DC2626",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
