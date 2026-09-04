# CHECKLIST DE IMPLEMENTACIÓN — GENERADOR DE INFORMES v3.0

## Fase 1 — Formulario (Frontend)

- [ ] Actualizar `INITIAL_FORM_DATA` en `src/data/executive-summary-config.js` → 15 campos nuevos
- [ ] Actualizar `buildExecutivePrompt` → dividir en `buildResearchPrompt` + `buildReportPrompt`
- [ ] Actualizar `ExecutiveSummaryPage.jsx` → formulario con 4 bloques, 15 campos
- [ ] Añadir estados de carga para 2 fases: "Investigando mercado..." + "Redactando informe..."
- [ ] Renderizar el informe Markdown con soporte de tablas
- [ ] Mostrar fuentes de investigación si están disponibles
- [ ] Mantener fallback local funcionando

## Fase 2 — API Serverless (Backend)

- [ ] Actualizar `api/ai/generate.js` → flujo de 2 llamadas
- [ ] Añadir Llamada 1: investigación con grounding + schema JSON
- [ ] Añadir Llamada 2: redacción narrativa sin grounding
- [ ] Añadir `validateResearch()` post-Llamada 1
- [ ] Añadir `validateReport()` post-Llamada 2
- [ ] Añadir reintentos (max 1 retry por Llamada)
- [ ] Actualizar fallback determinista para 15 campos
- [ ] Mantener contrato API: `{ markdown, provider, generatedAt, wordCount }`

## Fase 3 — Seguridad y Validación

- [ ] Validar que los 10 campos requeridos no están vacíos
- [ ] Validar longitud máxima por campo
- [ ] Validar que `tam_estimado_usuario` es numérico si se proporciona
- [ ] Validar que `precio_referencia` contiene "€" si se proporciona
- [ ] Sanitizar todos los textos del usuario antes de inyectarlos en el prompt
- [ ] Mantener límite de 5000 caracteres combinados → HTTP 413
- [ ] Mantener timeout 45s con AbortController

## Fase 4 — Verificación

- [ ] `npm run build` sin errores
- [ ] Formulario renderiza correctamente (15 campos, 4 bloques)
- [ ] Llamada 1 devuelve JSON válido con competidores reales
- [ ] Llamada 2 devuelve Markdown de ~1000 palabras
- [ ] Fallback determinista funciona sin conexión
- [ ] Sin placeholders en el informe final
- [ ] Sin referencias a VITE_* en el cliente
- [ ] Headers de seguridad intactos (CSP, etc.)
- [ ] Consentimiento de cookies no afectado

## Fase 5 — Documentación

- [ ] Actualizar README.md con las nuevas variables de entorno
- [ ] Documentar el flujo de 2 llamadas
- [ ] Documentar los schemas JSON
- [ ] Documentar las reglas de validación
- [ ] Marcar [REQUIERE REVISIÓN JURÍDICA PROFESIONAL] donde aplique

## Puntos de integración

| Archivo | Qué cambiar |
|---|---|
| `src/data/executive-summary-config.js` | `INITIAL_FORM_DATA` + `buildExecutivePrompt` → 2 funciones nuevas |
| `src/pages/ExecutiveSummaryPage.jsx` | Formulario + estados de carga + rendering |
| `api/ai/generate.js` | Flujo de 2 llamadas + validación |
| `src/utils/generateExecutiveSummary.js` | Sin cambios (ya es cliente delgado) |
| `vercel.json` | Sin cambios |
| `.env.example` | Sin cambios (las 3 claves ya están documentadas) |
