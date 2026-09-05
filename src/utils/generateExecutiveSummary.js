/**
 * GENERATE-EXECUTIVE-SUMMARY.JS — Cliente para API Server-Side Segura v3.1
 * 
 * Llama a /api/ai/generate (Vercel Function) que ejecuta:
 * 1a. Investigación con grounding (texto) — Gemini 2.5 Flash
 * 1b. Estructuración a JSON Schema — Gemini 2.5 Flash
 * 2. Redacción (8 secciones, 1150-1300 palabras) — cascada Gemini → Mistral → Together
 * 3. Fallback determinista server-side si la investigación falla
 * 
 * El navegador NO ve claves de API ni llama a proveedores directamente.
 */

import { buildResearchPrompt, buildResearchStructurePrompt, buildRedactionPrompt } from "../data/executive-summary-config";

const API_ENDPOINT = "/api/ai/generate";
const REQUEST_TIMEOUT_MS = 120000; // 2 llamadas + redacción = más tiempo

/**
 * Función principal: Genera el informe llamando a la API segura.
 * @param {Object} formData - Respuestas del formulario (15 campos)
 * @returns {Promise<{ markdown: string, provider: string, generatedAt: string, wordCount: number, researchData?: object }>}
 */
export async function generateExecutiveSummaryWithFallback(formData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data?.message || `Error HTTP ${response.status}`;
      throw new Error(errorMsg);
    }

    // Validar respuesta esperada
    if (!data?.markdown || !data?.provider) {
      throw new Error("Respuesta del servidor inválida");
    }

    return {
      markdown: data.markdown,
      provider: data.provider,
      generatedAt: data.generatedAt || new Date().toISOString(),
      wordCount: data.wordCount ?? data.markdown.trim().split(/\s+/).length,
      researchData: data.researchData, // Incluir datos de investigación para transparencia
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("La solicitud excedió el tiempo límite (2 min)");
    }
    throw err;
  }
}

// Exportar también las funciones de prompt por si se necesitan en el cliente
export { buildResearchPrompt, buildResearchStructurePrompt, buildRedactionPrompt };