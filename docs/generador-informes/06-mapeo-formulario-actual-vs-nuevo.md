# MAPEO — FORMULARIO ACTUAL vs NUEVO

## Campos actuales en `INITIAL_FORM_DATA` (20 campos)

| # | Campo actual | Tipo | Se mantiene | Equivalente nuevo |
|---|---|---|---|---|
| 1 | `nombre` | text | Sí | `nombre_proyecto` |
| 2 | `descripcion` | textarea | Sí (reformulado) | `problema_central` |
| 3 | `posicion` | select | Sí | `posicionamiento` |
| 4 | `diferencial` | textarea | Sí | `diferencial_unico` |
| 5 | `publico_objetivo` | textarea | Sí (reformulado) | `perfil_cliente_ideal` |
| 6 | `problema_resuelve` | textarea | **Fusionado** con `descripcion` | `problema_central` |
| 7 | `tecnologia` | textarea | Sí (reformulado) | `solucion_tecnica` |
| 8 | `modelo_negocio` | select | Sí | `modelo_ingresos` |
| 9 | `precios` | text | Sí | `precio_referencia` |
| 10 | `competencia` | textarea | **Eliminado** (Gemini investiga) | — |
| 11 | `ventaja_competitiva` | textarea | **Fusionado** con `diferencial` | `diferencial_unico` |
| 12 | `canal_distribucion` | text | Sí (reformulado) | `canales_preferidos` |
| 13 | `marketing` | text | Sí (reformulado) | `recursos_equipo` |
| 14 | `proveedores` | text | **Eliminado** (Gemini investiga) | — |
| 15 | `calidad` | text | **Eliminado** (no esencial) | — |
| 16 | `riesgos` | textarea | **Eliminado** (Gemini genera) | — |
| 17 | `métricas` | text | **Eliminado** (Gemini calcula) | — |
| 18 | `stakeholders` | text | **Eliminado** (no esencial) | — |
| 19 | `timeline` | text | **Eliminado** (Gemini genera roadmap) | — |
| 20 | `presupuesto` | text | Sí | `recursos_equipo` |

## Campos nuevos (15 campos)

| # | Campo nuevo | Tipo | Requerido | Fuente |
|---|---|---|---|---|
| 1 | `nombre_proyecto` | text | Sí | Nuevo |
| 2 | `tagline` | text | Sí | Nuevo |
| 3 | `fase_madurez` | select | Sí | Nuevo |
| 4 | `posicionamiento` | select | Sí | Migrado de `posicion` |
| 5 | `problema_central` | textarea | Sí | Fusionado de `descripcion` + `problema_resuelve` |
| 6 | `solucion_tecnica` | textarea | Sí | Migrado de `tecnologia` |
| 7 | `diferencial_unico` | textarea | Sí | Fusionado de `diferencial` + `ventaja_competitiva` |
| 8 | `privacidad_datos` | select | Sí | Nuevo |
| 9 | `perfil_cliente_ideal` | textarea | Sí | Migrado de `publico_objetivo` |
| 10 | `geo_alcance` | select | Sí | Nuevo |
| 11 | `tam_estimado_usuario` | text | No | Nuevo |
| 12 | `modelo_ingresos` | select | Sí | Migrado de `modelo_negocio` |
| 13 | `precio_referencia` | text | No | Migrado de `precios` |
| 14 | `canales_preferidos` | checkbox | No | Migrado de `canal_distribucion` |
| 15 | `recursos_equipo` | textarea | No | Fusionado de `marketing` + `presupuesto` |

## Resumen de cambios

- **20 campos → 15 campos** (25% menos de preguntas al usuario)
- **5 campos eliminados**: competencia, ventaja_competitiva (fusionado), proveedores, calidad, riesgos, métricas, stakeholders, timeline (Gemini los genera)
- **3 campos fusionados**: descripcion+problema_resuelve → problema_central; diferencial+ventaja_competitiva → diferencial_unico; marketing+presupuesto → recursos_equipo
- **4 campos nuevos**: tagline, fase_madurez, privacidad_datos, geo_alcance, tam_estimado_usuario
- **Tiempo de llenado estimado**: 2-3 minutos (vs 5-7 minutos antes)
