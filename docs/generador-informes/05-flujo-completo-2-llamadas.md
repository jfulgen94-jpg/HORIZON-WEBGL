# FLUJO COMPLETO — ARQUITECTURA DE 2 LLAMADAS

## Diagrama

```
USUARIO (15 preguntas del formulario)
        ↓
┌─────────────────────────────────────────────┐
│  LLAMADA 1 — INVESTIGACIÓN (Grounding)      │
│  • Google Search activado                   │
│  • Schema JSON forzado                      │
│  • Temperature: 0.3                         │
│  • Output: competidores, mercado, tendencias │
│  • Fuentes verificables                     │
└─────────────────────────────────────────────┘
        ↓ JSON validado (server-side)
        ↓
┌─────────────────────────────────────────────┐
│  LLAMADA 2 — REDACCIÓN (Narrativa)          │
│  • Sin grounding (ya tiene los datos)       │
│  • Temperature: 0.5                         │
│  • Output: Markdown ~1000 palabras          │
│  • Tono ejecutivo, español España           │
└─────────────────────────────────────────────┘
        ↓
CLIENTE: Renderiza el informe en la UI
        ↓
FALLBACK DETERMINISTA: si ambas fallan,
genera plantilla local con los datos del usuario
```

## Configuración de cada llamada

| Parámetro | Llamada 1 (Investigación) | Llamada 2 (Redacción) |
|---|---|---|
| Model | gemini-2.5-flash | gemini-2.5-flash |
| Temperature | 0.3 | 0.5 |
| TopP | 0.8 | 0.9 |
| TopK | 40 | 40 |
| MaxOutputTokens | 8192 | 4096 |
| Grounding | Google Search | Ninguno |
| Response | JSON (schema forzado) | Texto libre (Markdown) |
| Duración estimada | 5-10s (búsqueda incluida) | 2-4s (sin búsqueda) |
| Coste estimado | ~$0.003-0.005 | ~$0.001-0.002 |

## Por qué separar en 2 llamadas

1. **Trazabilidad real**: puedes mostrar al usuario qué fuentes se usaron de verdad (vía groundingMetadata), no solo la etiqueta [ESTIMACIÓN SISTEMA].
2. **Menos alucinación en cifras**: separar cálculo (Fase 2) de redacción (Fase 3) reduce la carga cognitiva por llamada.
3. **Caché de investigación**: si dos usuarios describen productos de la misma categoría, puedes reutilizar la investigación de mercado sin repetir la búsqueda.
4. **Fallback más limpio**: la lógica de fallback determinista solo sustituye la Llamada 1; la Llamada 2 sigue con plantilla local.
5. **Validación separada**: puedes validar LTV > 3×CAC, TAM > SAM > SOM en código antes de mostrar el informe.

## Validación server-side post-Llamada 1

```javascript
function validateResearch(data) {
  const errors = [];
  
  if (data.mercado.tam.valor <= data.mercado.sam.valor) {
    errors.push("TAM debe ser mayor que SAM");
  }
  if (data.mercado.sam.valor <= data.mercado.som.valor) {
    errors.push("SAM debe ser mayor que SOM");
  }
  if (data.competidores.length < 5) {
    errors.push("Se necesitan al menos 5 competidores");
  }
  const nombres = data.competidores.map(c => c.nombre.toLowerCase());
  const duplicados = nombres.filter((n, i) => nombres.indexOf(n) !== i);
  if (duplicados.length > 0) {
    errors.push(`Competidores duplicados: ${duplicados.join(", ")}`);
  }
  const verificables = data.competidores.filter(c => c.verificable).length;
  if (verificables < 2) {
    errors.push("Al menos 2 competidores deben tener datos verificables");
  }
  if (data.tendencias.length < 3) {
    errors.push("Se necesitan al menos 3 tendencias");
  }
  
  return errors;
}
```

## Fallback determinista (si ambas llamadas fallan)

```javascript
function generateFallbackReport(userAnswers) {
  const { nombre_proyecto, tagline, fase_madurez, posicionamiento,
          problema_central, solucion_tecnica, diferencial_unico,
          perfil_cliente_ideal, geo_alcance, modelo_ingresos } = userAnswers;
  
  return `# INFORME EJECUTIVO — ${nombre_proyecto}
**Fecha:** ${new Date().toISOString().split('T')[0]} | **Fase:** ${fase_madurez} | **Posicionamiento:** ${posicionamiento}

## 1. RESUMEN EJECUTIVO
${tagline}

**Problema:** ${problema_central}

**Solución:** ${solucion_tecnica}

**Diferenciador:** ${diferencial_unico}

## 2. PRODUCTO Y DIFERENCIACIÓN
${solucion_tecnica}

**Ventaja defensible:** ${diferencial_unico}

## 3. ANÁLISIS COMPETITIVO
[DATOS NO DISPONIBLES — investigación de mercado no disponible en modo offline]

## 4. MERCADO Y OPORTUNIDAD
**Mercado objetivo:** ${perfil_cliente_ideal}
**Alcance:** ${geo_alcance}

[DATOS DE MERCADO NO DISPONIBLES — se requiere conexión para investigación]

## 5. MODELO DE NEGOCIO
**Modelo:** ${modelo_ingresos}

## 6-10. ESTRATEGIA, MARKETING, TÉCNICA, ROADMAP, PRÓXIMOS PASOS
[CONTENIDO NO DISPONIBLE — se requiere investigación de mercado para generar estos apartados]

---
*Informe generado en modo offline por Horizon Executive AI v3.0 | [DATOS DE MERCADO Y COMPETENCIA NO DISPONIBLES — se requiere conexión a internet para investigación completa]*`;
}
```

## Puntos de integración con el sistema actual

| Punto | Archivo actual | Cambio necesario |
|---|---|---|
| Formulario | `src/data/executive-summary-config.js` | Reemplazar `INITIAL_FORM_DATA` por los 15 campos nuevos |
| Construcción del prompt | `src/data/executive-summary-config.js` (`buildExecutivePrompt`) | Dividir en `buildResearchPrompt` + `buildReportPrompt` |
| Llamada API | `api/ai/generate.js` | Añadir Llamada 1 + validación + Llamada 2 |
| Fallback | `api/ai/generate.js` (`generateDeterministicFallback`) | Actualizar con la nueva estructura |
| UI | `src/pages/ExecutiveSummaryPage.jsx` | Actualizar formulario y rendering del informe |
| Contrato API | Request/Response | Mantener `{ markdown, provider, generatedAt, wordCount }` |
