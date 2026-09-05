// Biblioteca de Prompts Ejecutivos y de Dirección — contenido aprobado por el usuario.
// Fuente única de verdad para la página /biblioteca/direccion.
// No contiene secretos, APIs ni rutas externas. Solo texto editorial aprobado.

export const FICHA_SECTIONS = [
  "Identidad del proyecto",
  "Producto",
  "Cliente objetivo",
  "Diferencial",
  "Fase",
  "Posicionamiento",
  "Privacidad",
  "Restricciones",
  "Competidores identificados",
  "Alternativa actual del cliente",
  "Rango de precios",
  "Percepción de calidad",
  "Canales",
  "Barreras de entrada",
  "Juicio propio de competitividad",
  "Área geográfica",
  "Universo de compradores",
  "Mercado estimado",
  "Fuentes",
  "Tendencias",
  "Cuota objetivo",
  "Hipótesis de penetración",
  "Prioridades de expansión",
  "Presupuesto disponible",
  "Costes iniciales",
  "Costes mensuales",
  "Modelo de ingresos",
  "Precio",
  "CAC",
  "LTV",
  "Margen",
  "Break-even",
  "Necesidades de financiación",
  "Sensibilidad del modelo",
  "Propósito",
  "Misión",
  "Visión",
  "Valores",
  "Tono",
  "Mensajes permitidos",
  "Mensajes a evitar",
  "Promesa de calidad",
  "Criterio de relación con el cliente",
  "Prioridades",
  "Responsable",
  "Plazo",
  "KPI",
  "Criterio de éxito",
  "Decisión posterior",
  "Riesgos sin resolver",
];

export const PROMPTS = [
  {
    id: "definicion",
    num: "01",
    title: "Definición del producto y de la idea",
    pregunta: "¿Qué estamos construyendo, para quién y por qué debería existir?",
    resuelve:
      "Transforma una intuición o una idea dispersa en una definición operativa. Delimita el problema, el cliente, la solución, el estado de madurez y la promesa de valor. Es el punto de partida: si esta definición no es clara, el análisis de mercado, precios y costes se construirá sobre una base inestable.",
    llevas:
      "Frase ejecutiva, categoría de producto, modelo de entrega, ciclo de cliente, diagnóstico de coherencia, implicaciones de posicionamiento y DAFO preliminar.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones.",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "identidad del proyecto",
      "producto",
      "cliente objetivo",
      "diferencial",
      "fase",
      "posicionamiento",
      "privacidad",
      "restricciones y riesgos iniciales",
    ],
    hereda: null,
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta a Competencia y Mercado» indicando qué datos verificados y qué estimaciones pasan al prompt 02. Después continúa con: Competencia y Mercado. No intentes fijar un precio definitivo antes de entender contra qué alternativas comparará el cliente tu propuesta.",
  },
  {
    id: "competencia",
    num: "02",
    title: "Estudio de la competencia y espacios de diferenciación",
    pregunta:
      "¿Quién compite por el mismo cliente, presupuesto o atención, y dónde existe un hueco que podamos ocupar?",
    resuelve:
      "Evita el error de analizar sólo empresas que hacen algo idéntico. Revisa competidores directos, indirectos y sustitutos, identifica sus precios, sus niveles de calidad, sus canales y las razones por las que un cliente ya podría estar resolviendo el problema sin nosotros.",
    llevas:
      "Mapa competitivo, benchmark de precios, lectura de canales dominantes, tres gaps explotables y recomendación de posición competitiva.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones. Para cada dato verificado exige fuente contrastable. Para cada estimación derivada muestra el cálculo (fórmula).",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "competidores identificados",
      "alternativa actual del cliente",
      "rango de precios",
      "percepción de calidad",
      "canales",
      "barreras de entrada y juicio propio de competitividad",
    ],
    hereda: "Recibe del prompt 01: definición del producto, cliente objetivo, diferencial y posicionamiento. Usa estos datos para identificar contra quién compites y dónde está el hueco.",
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta a Mercado» indicando qué datos verificados y qué estimaciones pasan al prompt 03. Después continúa con: Mercado. Los competidores muestran cómo se vende; el mercado muestra si existe suficiente demanda para sostener el negocio.",
  },
  {
    id: "mercado",
    num: "03",
    title: "Oportunidad de mercado y cuota alcanzable",
    pregunta:
      "¿Cuánto mercado existe realmente, qué porción podemos atender y qué captura sería razonable en 24 meses?",
    resuelve:
      "Convierte afirmaciones vagas del tipo «hay mucha demanda» en una hipótesis cuantificable. Separa el mercado total teórico (TAM), el mercado que la empresa puede servir con su geografía y canal (SAM), y la cuota alcanzable inicialmente (SOM). También analiza tendencias, momento de entrada y sensibilidad de penetración.",
    llevas:
      "Tabla TAM/SAM/SOM, tendencias, CAGR si se dispone de fuente, ventana de oportunidad y escenarios de cuota del 1%, 3%, 5% y 10% del SAM.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones. Para cada dato verificado exige fuente contrastable. Para cada estimación derivaada muestra el cálculo (fórmula).",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "área geográfica",
      "universo de compradores",
      "mercado estimado",
      "fuentes",
      "tendencias",
      "cuota objetivo",
      "hipótesis de penetración y prioridades de expansión",
    ],
    hereda: "Recibe del prompt 01: cliente objetivo y diferenciales. Recibe del prompt 02: competidores, precios y canales dominantes. Usa estos datos para dimensionar el mercado real reachable.",
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta a Costes y Viabilidad» indicando qué datos verificados y qué estimaciones pasan al prompt 04. Después continúa con: Costes y viabilidad. Un mercado grande no compensa un modelo que exige más capital del disponible para llegar a él.",
  },
  {
    id: "costes",
    num: "04",
    title: "Costes de despliegue y viabilidad financiera",
    pregunta:
      "¿Cuánto cuesta crear, vender y mantener el producto; cuántos clientes hacen falta para que el negocio se sostenga?",
    resuelve:
      "Separa inversión inicial de costes recurrentes y relaciona gastos con ingresos. Obliga a tratar el desarrollo, infraestructura, ventas, soporte, legal, mantenimiento y adquisición de clientes como partes del mismo sistema económico.",
    llevas:
      "Desglose CAPEX/OPEX, CAC, LTV, margen bruto, payback, punto de equilibrio, escenarios optimista/base/pesimista y palancas de optimización.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones. Para cada dato verificado exige fuente contrastable. Para cada estimación derivaada muestra el cálculo (fórmula).",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "presupuesto disponible",
      "costes iniciales",
      "costes mensuales",
      "modelo de ingresos",
      "precio",
      "CAC",
      "LTV",
      "margen",
      "break-even",
      "necesidades de financiación y sensibilidad del modelo",
    ],
    hereda: "Recibe del prompt 01: producto y ciclo de cliente. Recibe del prompt 02: rango de precios de la competencia. Recibe del prompt 03: TAM/SAM/SOM y escenarios de cuota. Usa estos datos para construir el modelo financiero.",
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta a Marca y Comunicación» indicando qué datos verificados y qué estimaciones pasan al prompt 05. Después continúa con: Marca y estrategia de comunicación. La promesa de marca debe ser posible de cumplir con el nivel de producto, soporte y precio que el modelo financiero permite.",
  },
  {
    id: "marca",
    num: "05",
    title: "Filosofía, misión, valores y comunicación",
    pregunta:
      "¿Qué defiende la empresa, qué promesa puede sostener y cómo debe hablar para resultar creíble ante su cliente?",
    resuelve:
      "Convierte la estrategia en una identidad consistente. No busca eslóganes: define principios que afectan a producto, servicio, privacidad, precio, soporte y relación comercial. Una marca útil reduce fricción de confianza y hace reconocible una propuesta frente a alternativas similares.",
    llevas:
      "Narrativa de marca, misión, visión, valores operativos, tono, personalidad comunicativa y relación entre marca y diferenciación.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones.",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "propósito",
      "misión",
      "visión",
      "valores",
      "tono",
      "mensajes permitidos",
      "mensajes a evitar",
      "promesa de calidad y criterio de relación con el cliente",
    ],
    hereda: "Recibe del prompt 01: propuesta de valor y diferencial. Recibe del prompt 04: modelo de ingresos y precio. Usa estos datos para definir una marca que pueda sostener la promesa con el nivel de producto y precio que el modelo permite.",
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta a Estrategia de Lanzamiento» indicando qué datos verificados y qué estimaciones pasan al prompt 06. Después continúa con: Estrategia de lanzamiento y dirección. La marca ya no es decorativa: se usa para decidir cómo presentar la oferta, qué canales usar y qué expectativa crear.",
  },
  {
    id: "direccion",
    num: "06",
    title: "Estrategia de lanzamiento, dirección y validación",
    pregunta:
      "¿Qué debe hacerse primero para pasar de hipótesis a negocio validado sin malgastar capital?",
    resuelve:
      "Integra las conclusiones de los cinco análisis anteriores en una secuencia de validación. Define qué hipótesis deben demostrarse primero, qué prueba mínima hacer, qué métrica decide si se sigue o se corrige, y qué recursos son necesarios para alcanzar un producto funcional simple.",
    llevas:
      "Prioridades de 30/60/90 días, hipótesis críticas, experimentos de validación, canales iniciales, indicadores de negocio, riesgos prioritarios y condiciones para pasar de idea a prototipo, MVP o lanzamiento.",
    reglas_lectura:
      "Cada conclusión debe separarse en: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra, competidor, coste o afirmación de mercado debe asociarse a una de estas etiquetas, con moneda, periodo y supuesto de cálculo en las estimaciones.",
    anti_alucinacion:
      "Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.",
    actualiza: [
      "prioridades",
      "responsable",
      "plazo",
      "presupuesto",
      "KPI",
      "criterio de éxito",
      "decisión posterior y riesgos sin resolver",
    ],
    hereda:
      "Recibe por referencia los cinco análisis anteriores. No los repitas: nómbralos cuando fundamente cada prioridad. Ejemplo: «Basado en el prompt 03 (cuota 3% del SAM de €X), la prioridad es…». Si algún análisis falta, indícalo como PENDIENTE y explica qué validación condicional se aplica.",
    siguiente:
      "Salida esperada lista para el siguiente análisis: añade al resultado un párrafo «Qué hereda y qué aporta al Prompt Maestro» indicando qué datos verificados y qué estimaciones pasan al diagnóstico integrado. Después continúa con: Prompt Maestro. El diagnóstico final no debe inventar nuevas premisas: debe consolidar lo que has decidido y señalar lo que sigue sin estar demostrado.",
  },
];

export const RELACION_FICHA = [
  {
    prompt: "01. Producto e idea",
    alimenta: "Problema, solución, ICP, diferencial, posicionamiento",
    contrasta: "Precio, recursos, restricciones",
  },
  {
    prompt: "02. Competencia",
    alimenta: "Alternativas, precios, calidad, canales, gaps",
    contrasta: "Diferencial, posicionamiento",
  },
  {
    prompt: "03. Mercado",
    alimenta: "TAM, SAM, SOM, geografía, tendencias",
    contrasta: "ICP, precio, canal",
  },
  {
    prompt: "04. Costes",
    alimenta: "CAPEX, OPEX, CAC, LTV, margen, break-even",
    contrasta: "Mercado, precio, financiación",
  },
  {
    prompt: "05. Marca",
    alimenta: "Misión, valores, tono, promesa, confianza",
    contrasta: "Producto, diferencial, cliente",
  },
  {
    prompt: "06. Dirección",
    alimenta: "Prioridades, experimentos, KPI, responsables",
    contrasta: "Todos los apartados previos",
  },
];

export const LECTURA_RESULTADO = [
  {
    label: "Dato aportado",
    desc: "información confirmada por la empresa.",
  },
  {
    label: "Dato verificado",
    desc: "información acompañada de fuente contrastable.",
  },
  {
    label: "Estimación",
    desc: "hipótesis de trabajo que debe validarse.",
  },
  {
    label: "Decisión estratégica",
    desc: "elección de producto, precio, canal o posicionamiento que corresponde al equipo fundador.",
  },
  {
    label: "Riesgo o incoherencia",
    desc: "condición que puede impedir que el proyecto alcance sus objetivos.",
  },
];

// Texto copiable de cada prompt: ensamblado a partir de los campos aprobados.
// No añade proveedores, APIs ni instrucciones externas.
export function buildPromptText(p) {
  const lines = [
    `BIBLIOTECA HORIZON — ${p.num} · ${p.title}`,
    ``,
    `Pregunta central: ${p.pregunta}`,
    ``,
  ];

  if (p.hereda) {
    lines.push(`Entrada — qué recibe: ${p.hereda}`, ``);
  }

  lines.push(
    `Contexto de uso: ${p.resuelve}`,
    ``,
    `Cómo analizar: aplica las reglas de lectura y anti-alucinación que se indican más abajo.`,
    ``,
    `Analiza y devuelve: ${p.llevas}`,
    ``,
    `Reglas de lectura del resultado: ${p.reglas_lectura}`,
    ``,
    `Anti-alucinación: ${p.anti_alucinacion}`,
    ``,
    `Al terminar, indica qué apartados de la ficha técnica actualizas: ${p.actualiza.join("; ")}.`,
    ``,
    p.siguiente
  );

  return lines.join("\n");
}

export const PROMPT_MAESTRO_TEXTO = `PROMPT MAESTRO — Diagnóstico integrado de dirección y marketing operativo

Propósito: este prompt existe para consolidar los seis análisis en una única lectura ejecutiva cuando ya se ha trabajado la ficha técnica. Se usa al final, no al principio, y no sustituye el análisis previo.

Entrada — qué recibe:
- La ficha técnica completa y actualizada hasta donde el equipo haya llegado.
- Los resultados de los prompts 01 a 06 que se hayan ejecutado, indicando cuáles faltan.
- Restricciones reales: presupuesto, equipo disponible, plazos, dependencias externas y límites regulatorios.
- Resultados de la estrategia actual de marketing si existen (qué se ha probado, con qué coste y qué respuesta se obtuvo).

Estrategia de análisis — cómo debe razonar:
- Primero verifica coherencia interna: si la definición del producto no encaja con el cliente, el precio, los costes o los canales, lo señala antes de proponer nada.
- Después revisa cada bloque de la ficha: propuesta de valor, diferenciación, mercado, canales, costes, marca y prioridades.
- Detecta contradicciones y decisiones sin tomar, y explica cuál es la tensión entre ellas.
- Evalúa la estrategia de marketing desde la evidencia disponible: qué canales han funcionado, cuáles no y por qué.
- Integra todo en una lectura de viabilidad, no en una suma de resúmenes parciales.
- Nombra explícitamente cada prompt del que extrae datos: «Según el prompt 01 (definición)…», «Según el prompt 03 (cuota 3% del SAM)…». Si un prompt no se ejecutó, lo declara como PENDIENTE y trabaja con hipótesis condicionales.

Datos recibidos de 01–06 — bloque obligatorio antes del veredicto:
Antes de emitir cualquier diagnóstico, construye una tabla que cite qué resultado concreto recibiste de cada análisis ejecutado:
- Prompt 01 (Producto): [resumen del resultado o PENDIENTE]
- Prompt 02 (Competencia): [resumen del resultado o PENDIENTE]
- Prompt 03 (Mercado): [resumen del resultado o PENDIENTE]
- Prompt 04 (Costes): [resumen del resultado o PENDIENTE]
- Prompt 05 (Marca): [resumen del resultado o PENDIENTE]
- Prompt 06 (Dirección): [resumen del resultado o PENDIENTE]
Si no puedes citar el resultado concreto de un prompt (porque no se ejecutó o no tienes el dato), debes pedirlo en lugar de continuar con una suposición.

Tabla de tensiones — salida por defecto:
Antes del plan de acción, expón en tabla las tensiones detectadas entre bloques. Ejemplos de ejes: precio ↔ costes, canal ↔ cliente, mercado ↔ cuota, marca ↔ diferenciación, costes ↔ viabilidad. Cada tensión indica: qué bloques están en conflicto, cuál es la naturaleza del conflicto y qué decisión se requiere para resolverlo.

Estructura de salida — usa exactamente estos encabezados:
0. Datos recibidos de 01–06 (tabla obligatoria).
1. Veredicto ejecutivo y nivel de madurez: juicio global del proyecto y en qué punto está (idea, prototipo, MVP, tracción inicial, escala).
2. Propuesta de valor y diferenciación: si la promesa es clara, creíble y defendible, y qué habría que reforzar.
3. Mercado y competencia: tamaño razonable, espacios ocupados y huecos reales, con TAM/SAM/SOM cuando haya datos suficientes.
4. Modelo de negocio y viabilidad: ingresos, costes, márgenes, punto de equilibrio y sensibilidad del modelo.
5. Estrategia de marketing: canales que encajan con el cliente y los recursos, qué mantener, qué corregir y qué probar.
6. Riesgos y decisiones pendientes: técnicos, de mercado, regulatorios, de ejecución y de capital, con su impacto.
7. Tabla de tensiones (obligatoria): precio ↔ costes, canal ↔ cliente, mercado ↔ cuota, marca ↔ diferenciación, costes ↔ viabilidad.
8. Plan de 90 días: prioridades ordenadas con responsable, plazo, coste aproximado y criterio de éxito.
9. Próximo hito de validación: qué debe demostrarse antes de invertir más, cómo medirlo y qué decisión tomar según el resultado.

Cómo manejar contradicciones e información incompleta:
- Si falta información para un bloque, lo declara y trabaja con hipótesis marcadas como estimación, no como hechos.
- Si hay contradicciones entre bloques (por ejemplo precio frente a costes, o canal frente a cliente), las expone en la tabla de tensiones antes del plan.
- No inventa datos de mercado, competidores ni costes: los pide o los marca como pendientes de verificación.

Reglas de lectura del resultado:
Cada afirmación relevante debe etiquetarse como: Dato aportado / Dato verificado (con fuente) / Estimación / Decisión estratégica / Riesgo o incoherencia. Toda cifra lleva moneda, periodo y supuesto de cálculo. Si el modelo es licencia única + mantenimiento, no usa métricas de suscripción tipo churn mensual.

Anti-alucinación (obligatorio):
Si no dispones de una cifra, competidor, fuente o dato de mercado, no lo inventes: márcalo como PENDIENTE DE VERIFICACIÓN y explica cómo obtenerlo. Las respuestas generadas por IA no son hechos por sí mismas: deben contrastarse antes de usarse ante clientes, socios o inversores.

Presentación — el resultado debe permitir comprobar:
1. Coherencia entre producto, cliente, precio, costes y canales.
2. Diferenciación real frente a alternativas existentes.
3. Mercado suficiente para sostener el punto de equilibrio.
4. Estrategia de marketing basada en evidencia, no en intuición.
5. Riesgos principales con mitigación concreta.
6. Siguiente paso validable con criterio de éxito explícito.

Longitud: informe completo y denso, sin límite rígido de palabras, priorizando claridad sobre extensión. Si la ficha está incompleta, el diagnóstico será más corto y señalará qué falta.`;

// Plantilla de ficha técnica descargable en Microsoft Word (.doc) editable.
// Genera HTML compatible con Word (namespace mso) servido como application/msword;
// Word lo abre como documento editable. No requiere dependencias externas.
export function buildFichaWord() {
  const escapeHtml = (v) =>
    String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const sections = FICHA_SECTIONS.map(
    (s) =>
      `<h2>${escapeHtml(s)}</h2>
<table cellpadding="4" cellspacing="0">
  <tr>
    <td width="130"><b>Estado:</b></td>
    <td>[PENDIENTE]</td>
  </tr>
  <tr>
    <td><b>Contenido:</b></td>
    <td></td>
  </tr>
</table>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<style>
  @page Section1 { size: 595.3pt 841.9pt; margin: 72pt 72pt 72pt 72pt; }
  div.Section1 { page: Section1; }
  body { font-family: "Calibri", "Segoe UI", sans-serif; font-size: 11pt; color: #1a1a1a; }
  h1 { font-size: 16pt; color: #3B6FD4; margin-bottom: 6pt; }
  h2 { font-size: 12.5pt; color: #16284d; margin-top: 14pt; margin-bottom: 4pt; }
</style>
</head>
<body>
<div class="Section1">
  <h1>FICHA TÉCNICA — Biblioteca de Prompts Ejecutivos y de Dirección (Horizon)</h1>
  <p><i>Plantilla editable. Complétala antes, durante o después de ejecutar los prompts. Marca cada apartado como [DATO APORTADO], [DATO VERIFICADO + fuente], [ESTIMACIÓN] o [PENDIENTE].</i></p>
  ${sections}
  <hr>
  <h2>Notas de coherencia (precio ↔ cliente ↔ costes ↔ canal ↔ mercado)</h2>
</div>
</body>
</html>`;
}
