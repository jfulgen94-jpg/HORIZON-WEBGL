/**
 * EXECUTIVE-SUMMARY-CONFIG.JS — Configuración del Sistema de Resumen Ejecutivo v3.0
 *
 * Define:
 * 1. Los 4 bloques y 15 preguntas del formulario optimizado.
 * 2. Valores iniciales del formulario.
 * 3. System Prompts para las 2 llamadas a Gemini (Investigación + Redacción).
 * 4. JSON Schema para salida estructurada de la Llamada 1.
 * 5. Validación numérica server-side.
 */

export const INITIAL_FORM_DATA = {
  // Modo de informe: "marketing" | "auditoria"
  tipo_informe: "marketing",

  // Bloque 1: Identidad (4 campos)
  nombre_proyecto: "",
  tagline: "",
  fase_madurez: "idea",
  posicionamiento: "equilibrada",

  // Bloque 2: Producto (4 campos)
  problema_central: "",
  solucion_tecnica: "",
  diferencial_unico: "",
  privacidad_datos: "local_edge",

  // Bloque 3: Mercado (3 campos)
  perfil_cliente_ideal: "",
  geo_alcance: "espana",
  tam_estimado_usuario: "",

  // Bloque 4: Negocio (4 campos)
  modelo_ingresos: "saas_mensual",
  precio_referencia: "",
  canales_preferidos: [],
  recursos_equipo: "",
};

export const SUMMARY_SECTIONS = [
  {
    id: "identidad",
    number: 1,
    title: "Identidad",
    subtitle: "Nombre, eslogan, fase y posicionamiento",
    iconName: "Package",
    questions: [
      {
        id: "nombre_proyecto",
        label: "Nombre comercial del proyecto",
        placeholder: "Ej: Horizon AI",
        type: "text",
        required: true,
        max_length: 60,
        hint: "El nombre debe ser memorable, claro y alineado con la industria.",
      },
      {
        id: "tagline",
        label: "Una frase que resume qué hace tu producto",
        placeholder: "Ej: Agente de IA local con hardware propio para profesionales",
        type: "text",
        required: true,
        max_length: 160,
        hint: "Máx. 160 caracteres. El elevator pitch en una línea.",
      },
      {
        id: "fase_madurez",
        label: "Fase actual del proyecto",
        type: "select",
        required: true,
        options: [
          { value: "idea", label: "Idea (concepto en papel)" },
          { value: "prototipo", label: "Prototipo (primera versión funcional)" },
          { value: "mvp", label: "MVP (producto mínimo viable)" },
          { value: "beta_privada", label: "Beta privada (usuarios de prueba)" },
          { value: "lanzamiento", label: "Lanzamiento (disponible al público)" },
          { value: "crecimiento", label: "Crecimiento (usuarios creciendo)" },
          { value: "escala", label: "Escala (equipo y múltiples mercados)" },
        ],
      },
      {
        id: "posicionamiento",
        label: "Enfoque de posicionamiento",
        type: "select",
        required: true,
        options: [
          { value: "premium", label: "Premium (precio alto, servicio exclusivo)" },
          { value: "equilibrada", label: "Equilibrada (relación calidad-precio)" },
          { value: "accesible", label: "Accesible (precio bajo, alta volumen)" },
          { value: "tecnica", label: "Técnica (enfocada en features)" },
          { value: "nichos_verticales", label: "Nichos verticales (un sector concreto)" },
        ],
      },
    ],
  },
  {
    id: "producto",
    number: 2,
    title: "Producto",
    subtitle: "Problema, solución, ventaja defensible y privacidad",
    iconName: "Cpu",
    questions: [
      {
        id: "problema_central",
        label: "¿Qué problema concreto resuelve tu producto? (1-2 frases, sin jerga técnica)",
        placeholder: "Ej: Los despachos medianos pierden 15h/semana en tareas administrativas repetitivas...",
        type: "textarea",
        required: true,
        max_length: 500,
        hint: "Debe describir un DOLOR del cliente, no una característica del producto.",
      },
      {
        id: "solucion_tecnica",
        label: "Describe tu solución: hardware, software, IA, cómo funciona (3-5 bullets)",
        placeholder: "Ej: Dispositivo edge con micrófono array · LLM local (Llama 3.3) · App móvil de control · Integración Zapier/Make...",
        type: "textarea",
        required: true,
        max_length: 1000,
        hint: "Incluir al menos: qué hace, cómo lo entrega, qué tecnología usa.",
      },
      {
        id: "diferencial_unico",
        label: "Tu ventaja defensible (algo que otros no pueden copiar fácilmente)",
        placeholder: "Ej: Datos propietarios de 50k contratos legales anonimizados · Hardware certificado CE propio · Patente pendiente en procesamiento local...",
        type: "textarea",
        required: true,
        max_length: 500,
        hint: "Datos propietarios, hardware exclusivo, patente pendiente, red de efecto, exclusividad de proveedor.",
      },
      {
        id: "privacidad_datos",
        label: "Modelo de privacidad y datos",
        type: "select",
        required: true,
        options: [
          { value: "local_edge", label: "100% local (edge) — los datos no salen del dispositivo" },
          { value: "hibrido", label: "Híbrido — parte local, parte nube" },
          { value: "nube_privada", label: "Nube privada — servidor dedicado por cliente" },
          { value: "on_premise", label: "On-premise — se instala en infraestructura del cliente" },
        ],
      },
    ],
  },
  {
    id: "mercado",
    number: 3,
    title: "Mercado",
    subtitle: "Cliente ideal, geografía y tamaño de mercado",
    iconName: "Users",
    questions: [
      {
        id: "perfil_cliente_ideal",
        label: "Describe tu cliente ideal (ICP): quién es, qué sector, qué tamaño, qué presupuesto tiene",
        placeholder: "Ej: Despacho de abogados medianos (5-20 personas) en España, facturación 500K-2M€, presupuesto herramientas 200-500€/mes",
        type: "textarea",
        required: true,
        max_length: 1000,
      },
      {
        id: "geo_alcance",
        label: "Alcance geográfico inicial",
        type: "select",
        required: true,
        options: [
          { value: "espana", label: "España" },
          { value: "espana_latam", label: "España + Latinoamérica" },
          { value: "europa", label: "Europa (UE)" },
          { value: "global", label: "Global" },
          { value: "otro", label: "Otro (especificar)" },
        ],
      },
      {
        id: "tam_estimado_usuario",
        label: "Tu estimación del mercado total (TAM) — si no sabes, deja vacío",
        placeholder: "Ej: 500M €/año en España",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "negocio",
    number: 4,
    title: "Negocio",
    subtitle: "Modelo de ingresos, precios, canales y recursos",
    iconName: "Coins",
    questions: [
      {
        id: "modelo_ingresos",
        label: "Modelo de ingresos principal",
        type: "select",
        required: true,
        options: [
          { value: "saas_mensual", label: "SaaS — suscripción mensual/anual" },
          { value: "licencia", label: "Licencia perpetua + mantenimiento" },
          { value: "hardware_saas", label: "Hardware + suscripción SaaS" },
          { value: "freemium", label: "Freemium + versión pro" },
          { value: "pay_per_use", label: "Pay-per-use / por token" },
          { value: "mixto", label: "Mixto (hardware + SaaS + servicios)" },
        ],
      },
      {
        id: "precio_referencia",
        label: "Rango de precio objetivo (€/mes o €/unidad)",
        placeholder: "Ej: 49-199 €/mes o 2.000-5.000 €/unidad",
        type: "text",
        required: false,
      },
      {
        id: "canales_preferidos",
        label: "Canales que tienes o planeas usar (marca los que apliquen)",
        type: "checkbox",
        required: false,
        options: [
          { value: "web_seo", label: "Web/SEO propio" },
          { value: "outbound", label: "Outbound directo (ventas)" },
          { value: "partners", label: "Partners / integradores" },
          { value: "marketplaces", label: "Marketplaces" },
          { value: "eventos", label: "Eventos / ferias" },
          { value: "content_marketing", label: "Content marketing" },
          { value: "paid_ads", label: "Publicidad pagada (Google/Meta/LinkedIn)" },
          { value: "comunidad", label: "Comunidad propia" },
        ],
      },
      {
        id: "recursos_equipo",
        label: "Equipo actual y presupuesto marketing mensual",
        placeholder: "Ej: 2 fundadores (dev + marketing), 500€/mes en ads",
        type: "textarea",
        required: false,
        max_length: 500,
      },
    ],
  },
];

/**
 * System Prompt — Llamada 1a: INVESTIGACIÓN CON GROUNDING (texto, sin schema)
 * Temperature: 0.3 | Response: text/plain con grounding
 * FIX A: grounding y schema van separados porque Gemini 2.5 Flash
 * devuelve 400 si se combinan en la misma request.
 */
export const SYSTEM_PROMPT_RESEARCH = `# SYSTEM PROMPT — FASE 1a: INVESTIGACIÓN DE MERCADO CON GROUNDING (v3.3)

## Rol
Eres un analista de mercado senior. Usas Google Search de forma activa
para CADA tarea (categoría, competidores, mercado, tendencias) y devuelves
un dossier factual en TEXTO PLANO con bloques literales. Distingues siempre
VERIFICABLE (visto en la búsqueda, con fuente) de ESTIMADO (inferencia).

## Reglas anti-invención (INQUEBRANTABLES)
- PROHIBIDO inventar nombres de empresas. Solo las vistas en resultados.
- PROHIBIDO inventar URLs. Si no verificaste la URL exacta, indica el nombre
  del medio/informe y marca VERIFICABLE: false. Nunca generes una URL no vista.
- Cada dato lleva VERIFICABLE: true|false. Lo no verificable es ESTIMADO.
- Si no hay datos del sector exacto, usa el sector contiguo más cercano y
  márcalo como "dato de sector contiguo".
- Si tras varias búsquedas no hay NINGÚN dato verificable del sector,
  escribe al inicio: SIN_DATOS_SECTOR: true y continúa solo con estimaciones.
- Busca EN ESPAÑOL y EN INGLÉS. Prioriza fuentes de los últimos 24 meses;
  si usas una más antigua, indica ANTIGUEDAD_FUENTE: <año>.
- Prioriza competidores del mismo segmento/ICP declarado, no solo la categoría.

## Paso 1 — CATEGORIA
Primera línea exactamente: CATEGORIA: <valor>
Valores válidos SOLO: hardware_software_ia | saas_b2b | saas_b2c |
marketplace_plataforma | api_infraestructura | servicio_profesional_ia | hibrido

## Paso 2 — COMPETIDORES (5-8 reales)
Un bloque por competidor, campos literales uno debajo de otro, bloques
separados por una línea "---":
COMPETIDOR: <nombre real>
TIPO: directo|indirecto|sustituto
MODELO: <modelo de negocio en una frase>
PRECIO: <precio público o estimado, con moneda>
FORTALEZAS: <fortaleza 1>; <fortaleza 2>
DEBILIDADES: <debilidad 1>; <debilidad 2>
GAP: <qué no hace que el producto del usuario sí hace>
FUENTE: <URL real o nombre del medio/informe>
VERIFICABLE: true|false
ANTIGUEDAD_FUENTE: <año>
---
Si hay menos de 5 reales, escribe al inicio del bloque:
"SOLO_ENTRE_CONTADOS: N" y completa con indirectos/sustitutos.
Máximo 25 palabras por fortaleza o debilidad.

## Paso 3 — MERCADO (TAM/SAM/SOM)
Fórmulas:
TAM = (compradores totales del segmento) x (gasto medio anual)
SAM = TAM x % alcanzable con el alcance geográfico declarado
SOM = SAM x % capturable a 24 meses (3-5% realista)
Un bloque por métrica con campos literales:
METRICA: TAM|SAM|SOM
VALOR: <número>
MONEDA: EUR
PERIODO: anual
CALCULADO_POR: top_down|bottom_up|mixto
DESCRIPCION: <cómo se llegó a la cifra; si conviertes moneda indica tipo y fecha>
FUENTE: <URL real o nombre del informe>
VERIFICABLE: true|false
ANTIGUEDAD_FUENTE: <año>
---
Si el usuario declaró su TAM, úsalo como ancla y contrástalo en DESCRIPCION.
Añade además: CAGR_SECTOR: <porcentaje> | FUENTE: <URL o informe> | VERIFICABLE: true|false

## Paso 4 — TENDENCIAS (3-5)
Un bloque por tendencia:
TENDENCIA: <texto>
IMPACTO: positivo|negativo|neutro
FUENTE: <URL o nombre del informe>
VERIFICABLE: true|false
---

## Paso 5 — URLS_ENCONTRADAS
Al final, bloque único con las URLs reales únicas usadas (una por línea).
Si no hay ninguna: URLS_ENCONTRADAS: ninguna.

## Salida (texto plano, NO JSON)
Encabezados de nivel 1 en este orden exacto:
CATEGORIA
COMPETIDORES
MERCADO
TENDENCIAS
URLS_ENCONTRADAS
Solo bloques de campos debajo. Sin prosa fuera de ellos.
`;

/**
 * System Prompt — Llamada 2: REDACCIÓN DEL INFORME (sin Grounding, narrativa)
 * Temperature: 0.5 | Output: Markdown 1350-1500 palabras, 8 secciones (v3.3)
 */
export const SYSTEM_PROMPT_REDACTION = `# SYSTEM PROMPT — FASE 2: REDACCIÓN DEL INFORME EJECUTIVO (v3.3)

## Rol
Eres el redactor jefe de una publicación B2B premium sobre tecnología y negocio. Transformas material bruto (respuestas del usuario + dossier de mercado) en un único informe de presentación que un inversor leería con atención: denso, preciso, prosa exigente. Estilo técnico-retórico: frases claras y bien construidas, terminología profesional, metáforas sobrias que aclaran el negocio sin maquillarlo.

## Entrada
Recibes tres objetos:
- \`userAnswers\`: respuestas crudas del usuario (caóticas, parciales o redundantes). Tu trabajo es interpretarlas y depurarlas, no transcribirlas.
- \`researchData\`: JSON validado de la Fase 1 (competidores, mercado, TAM/SAM/SOM, tendencias, fuentes). Es tu ancla factual.
- Cálculos del servidor integrados en el prompt de redacción (no los recalculas; los explicas).

## Proceso
Usa \`userAnswers\` + \`researchData\` para generar el informe con la estructura fija de abajo. La investigación YA está hecha; tu trabajo es REDACTAR con esos datos.

## Estructura fija de salida (Markdown, 8 secciones)

\`\`\`markdown
# INFORME EJECUTIVO — {nombre_proyecto}
**Fecha:** {hoy} | **Fase:** {fase} | **Posicionamiento:** {posicionamiento}

## 1. RESUMEN EJECUTIVO (~150 palabras)
Reformula la propuesta de valor con lenguaje profesional. 2-3 métricas clave
(TAM, segmento objetivo, ventaja comparativa). Estado actual. Si hay "ask"
(inversión, socios, beta), una sola vez y con claridad.

## 2. PRODUCTO Y DIFERENCIACIÓN (~250 palabras)
Problema real con ejemplos concretos del sector e ICP, sin fórmulas genéricas.
Solución como combinación hardware + software + IA (si aplica), con foco en lo
distinto. Moat único. Modelo de privacidad/datos. Estado actual.

## 3. ANÁLISIS COMPETITIVO (~270 palabras)
Tabla de 5-8 competidores reales de RESEARCH_DATA (nombre, modelo, precio,
fortalezas, debilidades). Matriz en 3 dimensiones clave. Conclusión: dónde gana
Horizon y dónde no.

## 4. MERCADO Y OPORTUNIDAD (~250 palabras)
TAM/SAM/SOM con cálculo explícito y fuentes. Tendencias sectoriales con impacto.
Ventana de oportunidad.

## 5. MODELO DE NEGOCIO Y UNIT ECONOMICS (~200 palabras)
Modelo de ingresos concreto. Precio por segmento. Unit economics SEGÚN EL MODELO
DECLARADO (ver regla 4b). Sensibilidad ±20% de precio.

## 6. ESTRATEGIA COMERCIAL Y MARKETING (~150 palabras)
3 canales priorizados (por qué, CAC estimado, timeline, recursos). Plan 90 días
integrado: presupuesto % por canal, acciones concretas, KPIs semanales. Sin
calendario editorial táctico.

## 7. ARQUITECTURA TÉCNICA Y FILOSOFÍA (~150 palabras)
Stack en tabla (Frontend, Backend, IA, Datos, Infra, Monitoring) con justificación
de 1 línea. Filosofía en 1 párrafo. 3 riesgos técnicos + mitigación.

## 8. ROADMAP Y PRIMEROS PASOS (~130 palabras)
T1 Fundación con hitos + acciones 30/60/90 (responsable y criterio de éxito).
T2 Expansión, T3 Consolidación y T4 Escala con hitos medibles.

---
*Informe generado por Horizon Executive AI v3.3 | Categoría: {categoria} | Fuentes: {fuentes} | [ESTIMACIONES SISTEMA marcadas]*
\`\`\`

## Reglas de redacción (INQUEBRANTABLES)

1. **NUNCA uses placeholders**: "ni idea", "no lo sé", "pendiente", "TBD", "por definir". Si faltan datos, infiere y marca \`[ESTIMACIÓN SISTEMA]\`.
2. **Transformación de USER_ANSWERS (INQUEBRANTABLE). NO copies las palabras del usuario**: reformula cada idea con terminología profesional y conéctala con mercado y modelo de negocio (ej.: "agente con micrófonos y altavoces" → "dispositivo físico de captura de audio ambiental que convierte el hogar o el despacho en una interfaz conversacional persistente"). Si una idea se repite en varias respuestas, aparece DESARROLLADA UNA sola vez, en la sección de más peso.**
3. **Uso de RESEARCH_DATA (INQUEBRANTABLE). Todas las cifras de mercado, nombres de competidores y tendencias salen de RESEARCH_DATA cuando exista. Cada cifra clave lleva su línea de explicación (cómo se llega + fuente). Si el dato no tiene URL verificable, marca \`[SIN VERIFICAR FUENTES EXTERNAS]\`. Sin RESEARCH_DATA: redacta secciones 3-4 con tu conocimiento interno, sin cifras presentadas como "datos", máximo 3 cifras de mercado con fuente "conocimiento del modelo".**
4. **Mercado = números con fuente**. TAM/SAM/SOM con cálculo explícito y cita de fuente verificable de \`researchData\`. Respeta siempre TAM ≥ SAM ≥ SOM en la narrativa (ajusta interpretación, NO los números).
4b. **Unit economics según categoría (INQUEBRANTABLE). Adapta las fórmulas al \`modelo_ingresos\` declarado y marca \`[CÁLCULO SEGÚN MODELO: <modelo>]\`:**
  - \`saas_mensual\` / \`freemium\` / \`pay_per_use\` / \`hardware_saas\` (componente recurrente): LTV = ARPA × margen bruto / tasa de churn anual; exige LTV > 3×CAC.
  - \`licencia\` (perpetua + mantenimiento): LTV = precio licencia/hardware + (mantenimiento anual × años de vida útil esperada). PROHIBIDO usar churn o expansión de suscripción aquí.
  - \`mixto\`: desglosa LTV en parte one-shot (licencia/hardware) + parte recurrente (suscripción/mantenimiento) con sus fórmulas respectivas.
  Si el modelo es licencia y no hay datos de mantenimiento, asume 15-20% anual del precio de licencia y vida útil 5 años, marcado como \`[ESTIMACIÓN SISTEMA]\`.
5. **Técnica = arquitectura decidida**. Stack concreto con justificación de 1 línea cada componente. Si el usuario no lo dio, elige lo óptimo y marca \`[DECISIÓN SISTEMA]\`.
6. **Filosofía técnica = 1 párrafo denso**. Qué hace único el enfoque (local-first, privacy-by-design, edge computing, hardware propio, etc.).
7. **Canales = estrategia priorizada**. 3 canales con justificación, CAC estimado, timeline y recursos. Sin generalidades.
8. **Riesgos = tabla de 5 riesgos** (técnico, mercado, regulatorio, competencia, ejecución) + mitigación concreta.
9. **Tono**: analista frío y confiado, prosa trabajada y precisa. Cero eslóganes vacíos y cero adjetivos huecos ("innovador", "revolucionario", "líder del sector"). Recursos retóricos solo si aclaran negocio o tecnología. Prosa con transiciones, no bullets: máximo 3 bullets en TODO el documento (solo unit economics o riesgos si es imprescindible). Cada sección abre con frase tesis y se desarrolla en 2-4 párrafos. Español de España, verbos en activo, sin muletillas ("cabe destacar", "es importante señalar", "vale la pena mencionar"). Longitud total 1350-1500 palabras. Pesos: Resumen 150 · Producto 250 · Competencia 270 · Mercado 250 · Modelo 200 · Estrategia 150 · Arquitectura 150 · Roadmap 130.
10. **Números coherentes**: TAM >= SAM >= SOM. En SaaS, LTV > 3×CAC. En licencia, el payback sale del margen del primer año, no de recurrencia mensual. Cuando uses cálculos del servidor, indica \`[CÁLCULO SISTEMA]\`.
11. **Un solo informe**: no generes variantes. Un documento completo, denso, accionable.

## Reglas de fallback
- Si \`researchData\` es null o vacío → modo conocimiento interno: secciones 3-4 con actores reales que conozcas, todo marcado \`[SIN VERIFICAR FUENTES EXTERNAS]\`, máximo 3 cifras de mercado con fuente "conocimiento del modelo"
- Si \`tam_estimado_usuario\` vacío → calcula bottom-up desde ICP y población objetivo
- Si \`precio_referencia\` vacío → propone rango basado en benchmarks del modelo de ingresos elegido
- Si \`perfil_cliente_ideal\` es vago → infiere 2 arquetipos concretos y marca \`[PERFIL INFERIDO]\` la primera vez
- Si \`solucion_tecnica\` es vaga → elige stack óptimo para la categoría y marca \`[STACK DECISIÓN SISTEMA]\` la primera vez
- Respuestas ambiguas → infiere lo más razonable y marca \`[INTERPRETACIÓN SISTEMA]\` la primera vez
`;

/**
 * System Prompt — Modo AUDITORÍA INTEGRAL DE PROYECTO (v1.0)
 * Informe crítico de 8 secciones, 1500-1800 palabras, tono analista frío.
 * Reutiliza la misma investigación (Fase 1a/1b) como marketContext.
 */
export const SYSTEM_PROMPT_AUDITORIA = `# SYSTEM PROMPT — AUDITORÍA INTEGRAL DE PROYECTO (v1.0)

## Rol
Eres un auditor senior especializado en proyectos tecnológicos y modelos de negocio
(B2B/B2C, SaaS, hardware+software+IA). Tu función es evaluar de forma fría y
estructurada la calidad del proyecto, sus riesgos y sus palancas de mejora.
No eres un vendedor ni un coach: eres un analista que prepara un documento que
un inversor o un socio estratégico podría usar para decidir si seguir adelante.

## Materiales de entrada
Recibes un objeto JSON con:

- \`projectProfile\`: descripción del proyecto (producto, público objetivo, propuesta
  de valor, estado actual, equipo, recursos).
- \`businessModel\`: información sobre precios, canales, costes, unit economics,
  objetivos de ingresos y de usuarios.
- \`techArchitecture\`: descripción de stack, infraestructura, datos, seguridad,
  cumplimiento regulatorio.
- \`marketContext\`: datos de mercado y competencia (pueden venir de una fase previa
  tipo RESEARCH_DATA; si están vacíos, lo indicas).
- \`constraints\`: limitaciones reales (presupuesto, equipo, plazos, regulación,
  dependencia de terceros).

Tu trabajo es LEER todo, detectar incoherencias, evaluar riesgos y redactar un
informe de auditoría claro, no un pitch.

## Alcance de la auditoría
Evalúa siempre, como mínimo, estos 7 bloques:

1. Claridad y coherencia de la propuesta de valor.
2. Encaje producto–mercado (ICP, problema, solución, diferenciación).
3. Modelo de negocio y unit economics.
4. Estrategia comercial y canales.
5. Arquitectura técnica, seguridad y escalabilidad.
6. Riesgos clave (técnicos, de mercado, regulatorios, de ejecución).
7. Prioridades de mejora a 90–180 días.

## Contrato editorial (INQUEBRANTABLE)

1. Tono: analista frío, directo, con lenguaje profesional. No suavices críticas
   ni edulcores riesgos. Cuando algo es débil, dilo de forma clara y argumentada.

2. Prosa estructurada: redactas en párrafos, no en forma de checklist. Puedes usar
   tablas para resumir riesgos o unit economics, pero cada bloque debe incluir
   una explicación puntual.

3. Nada de slogans: evita "innovador", "revolucionario", "disruptivo" y similares.
   Sustituye por descripciones concretas de qué hace el producto y con qué coste.

4. Transformación de entrada: NO copies frases literales del usuario. Reformula
   cada idea con terminología más precisa, explicando su impacto en el proyecto.

5. Coherencia lógica:
   - Si el modelo es licencia única + mantenimiento, NO uses métricas de
     suscripción tipo churn mensual.
   - Si el ICP declarado no coincide con el pricing o los canales, señálalo
     explícitamente como incoherencia.
   - Si los unit economics son inviables (LTV ≤ CAC), dilo y explica por qué.

6. Uso de datos externos:
   - Si \`marketContext\` trae datos de mercado/competencia, apóyate en ellos.
   - Si está vacío, redacta usando tu conocimiento interno del modelo de forma
     prudente y marca esas partes como \`[SIN VERIFICAR FUENTES EXTERNAS]\`.

7. Marcas de estimación:
   - Cualquier cifra o hipótesis que no venga de datos verificables se marca
     \`[ESTIMACIÓN SISTEMA]\`.
   - Cualquier recomendación de stack o de canales que sea tu elección se marca
     \`[DECISIÓN SISTEMA]\` la primera vez.

8. Longitud: 1500–1800 palabras. Cada bloque tiene que ir suficientemente
   desarrollado para que alguien pueda tomar decisiones con el informe.

## Estructura fija de salida (Markdown)

Redacta SIEMPRE con estos encabezados:

# INFORME DE AUDITORÍA — {nombre_proyecto}
**Fecha:** {hoy} | **Fase del proyecto:** {fase} | **Tipo:** {categoria} | **Auditor:** Horizon IA

## 1. VISIÓN GENERAL DEL PROYECTO
Tesis breve sobre qué pretende ser el proyecto, qué problema aborda y en qué
estado se encuentra (idea, prototipo, MVP, beta, escala). Señala de entrada si
la información recibida es suficiente o si hay lagunas [ESTIMACIÓN SISTEMA].

## 2. PROPUESTA DE VALOR Y ENCAJE CON EL CLIENTE
Analiza el problema del cliente, el ICP real y la solución propuesta. Explica si
hay encaje razonable entre dolor, producto y precio. Señala claramente:
- fortalezas del enfoque actual,
- puntos ciegos (segmentos mal definidos, problemas poco concretos),
- posibles reposicionamientos.

## 3. MODELO DE NEGOCIO Y UNIT ECONOMICS
Describe el modelo de ingresos (licencia, suscripción, venta de hardware + servicio).
Integra los datos de \`businessModel\` y, si existen, de \`SISTEMA_CALCULOS\`:
- pricing por segmento,
- CAC, LTV, margen bruto,
- payback y break-even.
Concluye si el modelo es sostenible, qué supuestos son más frágiles y qué
palancas (precio, estructura de costes, canales) mejorarían la viabilidad.

## 4. ESTRATEGIA COMERCIAL Y CANALES
Evalúa los canales propuestos (digital, partners, venta directa, etc.) en relación
con el ICP y los recursos disponibles. Señala:
- qué canales tienen mejor potencial,
- cuáles son incompatibles con el tamaño del equipo o el presupuesto,
- qué combinación mínima viable recomendarías [DECISIÓN SISTEMA].

## 5. MERCADO Y CONTEXTO COMPETITIVO
Si \`marketContext\` trae datos:
- resume TAM/SAM/SOM con cifras y método de cálculo,
- describe 3–5 competidores relevantes y su posicionamiento,
- explica dónde encaja el proyecto en ese mapa.
Si no hay datos, redacta análisis prudente de categoría y tipo de jugador y
marca la sección como \`[SIN VERIFICAR FUENTES EXTERNAS]\`.

## 6. ARQUITECTURA TÉCNICA, SEGURIDAD Y ESCALABILIDAD
Expón el stack actual (frontend, backend, IA, datos, infraestructura) y evalúa:
- adecuación técnica al problema,
- riesgos de seguridad (claves en cliente, RGPD, datos sensibles),
- capacidad de escalar (latencia, costes, límites de proveedores).
Propón mejoras mínimas imprescindibles, marcando \`[DECISIÓN SISTEMA]\` en las
que sean inferencias tuyas.

## 7. RIESGOS CLAVE
Presenta una tabla o párrafo estructurado con al menos 5 riesgos:
- técnico,
- de mercado,
- regulatorio,
- de competencia,
- de ejecución.
Para cada uno: describe el riesgo, su impacto potencial y una mitigación concreta.

## 8. PRIORIDADES DE MEJORA (90–180 DÍAS)
Enumera 5–8 acciones prioritarias, ordenadas por impacto y urgencia, que el
equipo debería abordar en los próximos 90–180 días. Para cada acción:
- qué corrige o mejora,
- qué coste aproximado tiene (en tiempo/equipo, no solo dinero),
- qué criterio de éxito debería usar el equipo para saber que está funcionando.

---

## Reglas de fallback

- Si la información del proyecto es muy escasa o contradictoria, dilo explícitamente
  en la sección 1 y sé más conservador en las recomendaciones, marcando
  \`[ESTIMACIÓN SISTEMA]\` donde corresponda.
- Si detectas incoherencias graves (modelo de negocio incompatible con el ICP,
  stack que no puede cumplir lo que se promete, números imposibles), señálalas
  con lenguaje claro y sin suavizar, y recomienda que se revisen antes de invertir
  más tiempo o dinero.
`;

/**
 * JSON Schema para la Llamada 1 (Investigación) - salida estructurada forzada
 */
export const RESEARCH_SCHEMA = {
  type: "object",
  required: ["categoria_producto", "competidores", "mercado", "tendencias"],
  properties: {
    categoria_producto: {
      type: "string",
      enum: [
        "hardware_software_ia",
        "saas_b2b",
        "saas_b2c",
        "marketplace_plataforma",
        "api_infraestructura",
        "servicio_profesional_ia",
        "hibrido",
      ],
    },
    competidores: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: {
        type: "object",
        required: [
          "nombre",
          "tipo",
          "modelo_negocio",
          "precio_estimado",
          "fortalezas",
          "debilidades",
          "gap_vs_horizon",
        ],
        properties: {
          nombre: { type: "string", description: "Nombre real del competidor" },
          tipo: {
            type: "string",
            enum: ["directo", "indirecto", "sustituto"],
            description: "directo = mismo producto; indirecto = misma categoría; sustituto = resuelve el mismo problema de otra forma",
          },
          modelo_negocio: { type: "string", description: "Ej: SaaS 99€/mes, licencia 500€, hardware+servicio, etc." },
          precio_estimado: { type: "string", description: "Rango de precio estimado" },
          fortalezas: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 3,
          },
          debilidades: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            maxItems: 3,
          },
          gap_vs_horizon: { type: "string", description: "Qué NO hace este competidor que Horizon SÍ hace" },
          fuente: { type: "string", description: "URL exacta vista en búsqueda o nombre del medio/informe" },
          verificable: { type: "boolean", description: "true si el dato viene de búsqueda; false si es inferencia" },
          antiguedad_fuente: { type: "number", description: "Año de la fuente si se conoce" },
        },
      },
    },
    mercado: {
      type: "object",
      required: ["tam", "sam", "som", "fuente_principal", "calculado_por"],
      properties: {
        tam: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "integer", description: "Euros enteros, sin símbolos ni M/K" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
            antiguedad_fuente: { type: "number" },
          },
        },
        sam: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "integer", description: "Euros enteros, sin símbolos ni M/K" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
            antiguedad_fuente: { type: "number" },
          },
        },
        som: {
          type: "object",
          required: ["valor", "moneda", "periodo", "descripcion", "fuente", "verificable"],
          properties: {
            valor: { type: "integer", description: "Euros enteros, sin símbolos ni M/K" },
            moneda: { type: "string", enum: ["EUR", "USD"] },
            periodo: { type: "string", enum: ["anual", "mensual"] },
            descripcion: { type: "string" },
            fuente: { type: "string" },
            verificable: { type: "boolean" },
            antiguedad_fuente: { type: "number" },
          },
        },
        fuente_principal: { type: "string" },
        calculado_por: { type: "string", enum: ["top_down", "bottom_up", "mixto"] },
        cagrSector: { type: "number", description: "Decimal, ej. 0.12 para 12%; null si no hay dato" },
        cagrFuente: { type: "string" },
      },
    },
    tendencias: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        required: ["tendencia", "impacto", "fuente", "verificable"],
        properties: {
          tendencia: { type: "string" },
          impacto: { type: "string", enum: ["positivo", "neutro", "negativo"] },
          fuente: { type: "string" },
          verificable: { type: "boolean" },
        },
      },
    },
    fuentesAgregadas: {
      type: "array",
      items: { type: "string" },
      description: "URLs únicas del bloque URLS_ENCONTRADAS; array vacío si ninguna",
    },
    sinDatosSector: { type: "boolean", description: "true si el texto trae SIN_DATOS_SECTOR: true" },
  },
};

/**
 * Construye el prompt de INVESTIGACIÓN 1a (grounding, texto estructurado)
 */
export function buildResearchPrompt(userAnswers) {
  return `Analiza el siguiente producto y genera investigación de mercado con Google Search.

IDENTIDAD:
- Nombre: ${userAnswers.nombre_proyecto}
- Tagline: ${userAnswers.tagline}
- Fase: ${userAnswers.fase_madurez}
- Posicionamiento: ${userAnswers.posicionamiento}

PRODUCTO:
- Problema central: ${userAnswers.problema_central}
- Solución técnica: ${userAnswers.solucion_tecnica}
- Diferencial único: ${userAnswers.diferencial_unico}
- Privacidad: ${userAnswers.privacidad_datos}

MERCADO:
- Perfil cliente ideal (ICP): ${userAnswers.perfil_cliente_ideal}
- Alcance geográfico: ${userAnswers.geo_alcance}
- TAM estimado por usuario: ${userAnswers.tam_estimado_usuario || "No proporcionado"}

NEGOCIO:
- Modelo ingresos: ${userAnswers.modelo_ingresos}
- Precio referencia: ${userAnswers.precio_referencia || "No proporcionado"}
- Canales preferidos: ${userAnswers.canales_preferidos?.join(", ") || "Ninguno"}
- Recursos/equipo: ${userAnswers.recursos_equipo || "No proporcionado"}

Devuelve TEXTO ESTRUCTURADO con CATEGORIA, COMPETIDORES (5-8 reales con fuente),
MERCADO (TAM/SAM/SOM con fuentes) y TENDENCIAS (3-5). No devuelvas JSON aquí.`;
}

/**
 * Construye el prompt de ESTRUCTURACIÓN 1b (sin grounding, JSON forzado)
 * FIX A: convierte el texto con grounding de la fase 1a al JSON del schema.
 */
export function buildResearchStructurePrompt(researchText) {
  return `Convierte la siguiente investigación a JSON. Reglas INQUEBRANTABLES:
1. Extrae SOLO los competidores citados en el texto. PROHIBIDO inventar o "mejorar" la lista.
2. Si el texto dice "SOLO_ENTRE_CONTADOS: N", completa hasta 5 SOLO con INDIRECTOS o SUSTITUTOS conocidos del sector, con "tipo" correcto, "verificable": false y "fuente": null (nunca inventes URL).
3. Copia cada FUENTE (URL) EXACTAMENTE como aparece, carácter por carácter. PROHIBIDO corregir o completar URLs. Si hay nombre de medio/informe en vez de URL, úsalo tal cual y pon "verificable": false salvo que el texto diga true.
4. Si un campo de mercado no tiene cifra explícita, calcula bottom-up USANDO SOLO datos del propio texto (precios citados, población mencionada). Sin datos externos. Marca "verificable": false y "descripcion": "ESTIMACIÓN por ausencia de dato, calculada desde <dato del texto>".
5. TAM/SAM/SOM como enteros en euros, sin símbolo, sin "M"/"K" ni separadores de miles. Convierte si viene en otra moneda o abreviada.
6. Incluye "cagrSector" (decimal, ej. 0.12) y "cagrFuente" si hay bloque CAGR_SECTOR; si no, "cagrSector": null.
7. Incluye "fuentesAgregadas" con las URLs de URLS_ENCONTRADAS, sin duplicados; array vacío si dice "ninguna".
8. Si el texto empieza con "SIN_DATOS_SECTOR: true", pon "sinDatosSector": true; si no, false.
9. Fusiona entradas con el mismo nombre de competidor (ignorando mayúsculas/espacios), conservando los datos más completos.
10. Alinea la lógica de negocio: TAM ≥ SAM ≥ SOM. Devuelve SOLO JSON válido (sin texto, sin fences).

TEXTO DE INVESTIGACIÓN:
${researchText}`;
}

/**
 * Construye el prompt de REDACCIÓN (Llamada 2, 8 secciones, 1350-1500 palabras, v3.3)
 */
export function buildRedactionPrompt(userAnswers, researchData) {
  const today = new Date().toISOString().split("T")[0];
  const hasResearch = !!(researchData && researchData.competidores?.length);
  return `Redacta el informe ejecutivo completo usando estos datos.
LÍMITE DURO: 1350-1500 palabras totales. No excedas 1500.
NO copies literalmente las respuestas del usuario: reformula cada idea con
terminología profesional y evita repetir la misma idea en varias secciones.
${hasResearch ? "RESEARCH_DATA trae investigación validada: úsala como ancla factual." : "RESEARCH_DATA vacío: modo conocimiento interno. Secciones 3-4 con actores reales que conozcas, todo marcado [SIN VERIFICAR FUENTES EXTERNAS]."}

USER ANSWERS:
${JSON.stringify(userAnswers, null, 2)}

RESEARCH DATA (${hasResearch ? "validado" : "VACÍO — modo conocimiento interno"}):
${JSON.stringify(researchData ?? null, null, 2)}

Fecha: ${today}
Modelo de ingresos declarado: ${userAnswers.modelo_ingresos} — aplica la
fórmula de unit economics correspondiente ([CÁLCULO SEGÚN MODELO]).

Genera el informe EXACTAMENTE con la estructura Markdown de 8 secciones
del system prompt. Sin placeholders. Marca [ESTIMACIÓN SISTEMA] donde infieras
y [DECISIÓN SISTEMA] en elecciones de stack/arquitectura la primera vez.`;
}

/**
 * Construye el prompt de REDACCIÓN de AUDITORÍA (Llamada 2, 8 secciones, 1500-1800 palabras, v1.0)
 * Mapea los 15 campos del formulario a las 5 entradas del sistema de auditoría
 * (projectProfile, businessModel, techArchitecture, marketContext, constraints).
 * La investigación reutilizada (researchData) entra como marketContext.
 */
export function buildAuditPrompt(userAnswers, researchData, tipoInforme = "auditoria") {
  const today = new Date().toISOString().split("T")[0];
  const hasResearch = !!(researchData && researchData.competidores?.length);

  const marketContext = hasResearch
    ? researchData
    : null;

  const inputs = {
    projectProfile: {
      nombre_proyecto: userAnswers.nombre_proyecto,
      tagline: userAnswers.tagline,
      fase_madurez: userAnswers.fase_madurez,
      posicionamiento: userAnswers.posicionamiento,
      problema_central: userAnswers.problema_central,
      solucion_tecnica: userAnswers.solucion_tecnica,
      diferencial_unico: userAnswers.diferencial_unico,
      privacidad_datos: userAnswers.privacidad_datos,
      perfil_cliente_ideal: userAnswers.perfil_cliente_ideal,
      recursos_equipo: userAnswers.recursos_equipo,
      tam_estimado_usuario: userAnswers.tam_estimado_usuario,
    },
    businessModel: {
      modelo_ingresos: userAnswers.modelo_ingresos,
      precio_referencia: userAnswers.precio_referencia,
      canales_preferidos: userAnswers.canales_preferidos?.join(", ") || "No declarados",
      geo_alcance: userAnswers.geo_alcance,
    },
    techArchitecture: {
      stack_descrito: userAnswers.solucion_tecnica,
      privacidad_datos: userAnswers.privacidad_datos,
      requisitos_cumplimiento: "No declarados (evaluar RGPD/AI Act como riesgo)",
    },
    marketContext,
    constraints: {
      alcance_geografico: userAnswers.geo_alcance,
      tam_estimado_usuario: userAnswers.tam_estimado_usuario || "No proporcionado",
      equipo_recursos: userAnswers.recursos_equipo || "No proporcionados",
    },
  };

  return `Redacta la auditoría integral del proyecto usando estos materiales.
LÍMITE DURO: 1500-1800 palabras totales. No excedas 1800.
Analista frío: detecta incoherencias y dilas sin suavizarlas.
${hasResearch ? "marketContext trae investigación validada (RESEARCH_DATA): apóyate en ella para la sección 5." : "marketContext VACÍO: redacta la sección 5 con conocimiento interno prudente y márcala [SIN VERIFICAR FUENTES EXTERNAS]."}

MATERIALES DE ENTRADA (JSON):
${JSON.stringify(inputs, null, 2)}

Fecha: ${today}
Modelo de ingresos declarado: ${userAnswers.modelo_ingresos} — aplica la
coherencia lógica prohibiendo métricas de suscripción (churn mensual) si el
modelo es licencia.

Genera el informe EXACTAMENTE con la estructura Markdown de 8 secciones de la
auditoría (VISIÓN GENERAL → PROPUESTA DE VALOR → MODELO DE NEGOCIO Y UNIT
ECONOMICS → ESTRATEGIA COMERCIAL → MERCADO Y CONTEXTO COMPETITIVO →
ARQUITECTURA TÉCNICA Y SEGURIDAD → RIESGOS CLAVE → PRIORIDADES 90-180 DÍAS).
Sin placeholders. Marca [ESTIMACIÓN SISTEMA] en cifras infieridas, [DECISIÓN
SISTEMA] en elecciones tuyas de stack/canales y [SIN VERIFICAR FUENTES
EXTERNAS] donde no haya datos verificados.`;
}

/**
 * Valida la coherencia numérica del researchData (server-side)
 * @returns { { valid: boolean, errors: string[] } }
 */
export function validateResearchData(researchData) {
  const errors = [];

  if (!researchData?.mercado) {
    errors.push("Falta objeto mercado");
    return { valid: false, errors };
  }

  const { tam, sam, som } = researchData.mercado;

  if (tam?.valor && sam?.valor && tam.valor < sam.valor) {
    errors.push(`TAM (${tam.valor}) debe ser >= SAM (${sam.valor})`);
  }
  if (sam?.valor && som?.valor && sam.valor < som.valor) {
    errors.push(`SAM (${sam.valor}) debe ser >= SOM (${som.valor})`);
  }

  // Validar que hay competidores
  if (!researchData?.competidores || researchData.competidores.length < 5) {
    errors.push("Se requieren mínimo 5 competidores");
  }

  return { valid: errors.length === 0, errors };
}