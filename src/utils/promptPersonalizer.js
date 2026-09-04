/**
 * PROMPT-PERSONALIZER.JS — Lógica de síntesis de prompts personalizados
 *
 * Extraída de `src/components/prompts/Personalizer.jsx` (componente eliminado
 * por no tener consumidores en la aplicación).
 *
 * Solo contiene lógica pura, sin UI. Si en el futuro se reactiva un
 * personalizador de prompts, esta utilidad es la pieza reutilizable.
 */

export const CANONICAL_PLACEHOLDER = "[COPIA AQUI TU IDEA]";

export const AVAILABLE_TOOLS = [
  "Python",
  "DuckDB",
  "Pandas",
  "React",
  "Tailwind CSS",
  "FastAPI",
  "Pydantic v2",
  "SQLite",
  "Docker",
  "NumPy",
  "Flet",
];

/**
 * Construye el bloque de directrices de personalización que se añade
 * al prompt base una vez sustituido el placeholder canónico.
 * @param {Object} opts
 * @param {"principiante"|"intermedio"|"avanzado"} opts.experience
 * @param {string[]} opts.tools
 * @param {string} [opts.extraContext]
 * @returns {string}
 */
export function buildPersonalizationBlock({ experience, tools, extraContext = "" }) {
  const contextLine = extraContext.trim()
    ? `- Restricciones o contexto adicional del usuario: ${extraContext.trim()}\n`
    : "";
  return `\n\n[DIRECTRICES DE PERSONALIZACION APLICADA]:
- Nivel de experiencia del desarrollador: ${experience.toUpperCase()} (ajusta la profundidad tecnica y explica asunciones clave).
- Stack y herramientas activas del proyecto: ${tools.join(", ") || "General"}.
${contextLine}- Prohibicion de usar emojis y obligacion de redactar las salidas en espanol riguroso.`;
}

/**
 * Genera un prompt personalizado a partir del prompt base y la idea del usuario.
 * Sustituye el placeholder canónico y añade el bloque de directrices.
 * @param {string} basePrompt - Prompt base (puede contener [COPIA AQUI TU IDEA])
 * @param {Object} opts
 * @param {string} opts.idea - Descripción del proyecto del usuario
 * @param {string} opts.title - Título del prompt (para generar contexto si no hay idea)
 * @param {"principiante"|"intermedio"|"avanzado"} [opts.experience="intermedio"]
 * @param {string[]} [opts.tools]
 * @param {string} [opts.extraContext]
 * @returns {string} Prompt personalizado listo para copiar
 */
export function buildPersonalizedPrompt(basePrompt, { idea, title, experience = "intermedio", tools = [], extraContext = "" }) {
  const ideaText = idea.trim()
    ? `[CONTEXTO Y ESPECIFICACION DEL PROYECTO]:\n"${idea.trim()}"`
    : `[CONTEXTO DEL PROYECTO]: Idea preliminar para ${title}`;

  const base = basePrompt.replaceAll(CANONICAL_PLACEHOLDER, ideaText);
  return base + buildPersonalizationBlock({ experience, tools, extraContext });
}