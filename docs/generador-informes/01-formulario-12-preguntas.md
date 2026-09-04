# FORMULARIO — 12 PREGUNTAS AL USUARIO

## Estructura

4 bloques × 3 preguntas promedio = 12 preguntas totales.
Tiempo estimado de llenado: 2-3 minutos.

---

## BLOQUE 1 — IDENTIDAD DEL PROYECTO

### Pregunta 1: nombre_proyecto
- **Label:** Nombre comercial del proyecto
- **Tipo:** text
- **Requerido:** sí
- **Placeholder:** Horizon AI
- **Max length:** 60
- **Validación:** Sin caracteres especiales, solo letras números y espacios

### Pregunta 2: tagline
- **Label:** Una frase que resume qué hace tu producto
- **Tipo:** text
- **Requerido:** sí
- **Placeholder:** Agente de IA local con hardware propio para profesionales
- **Max length:** 160

### Pregunta 3: fase_madurez
- **Label:** Fase actual del proyecto
- **Tipo:** select
- **Requerido:** sí
- **Opciones:**
  - `idea` — Idea (concepto en papel)
  - `prototipo` — Prototipo (primera versión funcional)
  - `mvp` — MVP (producto mínimo viable)
  - `beta_privada` — Beta privada (usuarios de prueba)
  - `lanzamiento` — Lanzamiento (disponible al público)
  - `crecimiento` — Crecimiento (usuarios creciendo)
  - `escala` — Escala (equipo y múltiples mercados)

### Pregunta 4: posicionamiento
- **Label:** Enfoque de posicionamiento
- **Tipo:** select
- **Requerido:** sí
- **Opciones:**
  - `premium` — Premium (precio alto, servicio exclusivo)
  - `equilibrada` — Equilibrada (relación calidad-precio)
  - `accesible` — Accesible (precio bajo, alta volumen)
  - `tecnica` — Técnica (enfocada en features)
  - `nichos_verticales` — Nichos verticales (un sector concreto)

---

## BLOQUE 2 — EL PRODUCTO

### Pregunta 5: problema_central
- **Label:** ¿Qué problema concreto resuelve tu producto? (1-2 frases, sin jerga técnica)
- **Tipo:** textarea
- **Requerido:** sí
- **Max length:** 500
- **Validación:** Debe describir un DOLOR del cliente, no una característica del producto

### Pregunta 6: solucion_tecnica
- **Label:** Describe tu solución: hardware, software, IA, cómo funciona (3-5 bullets)
- **Tipo:** textarea
- **Requerido:** sí
- **Max length:** 1000
- **Validación:** Incluir al menos: qué hace, cómo lo entrega, qué tecnología usa

### Pregunta 7: diferencial_unico
- **Label:** Tu ventaja defensible (algo que otros no pueden copiar fácilmente)
- **Tipo:** textarea
- **Requerido:** sí
- **Max length:** 500
- **Ejemplos sugeridos:** Datos propietarios, Hardware exclusivo, Patente pendiente, Red de efecto, Exclusividad de proveedor

### Pregunta 8: privacidad_datos
- **Label:** Modelo de privacidad y datos
- **Tipo:** select
- **Requerido:** sí
- **Opciones:**
  - `local_edge` — 100% local (edge) — los datos no salen del dispositivo
  - `hibrido` — Híbrido — parte local, parte nube
  - `nube_privada` — Nube privada — servidor dedicado por cliente
  - `on_premise` — On-premise — se instala en infraestructura del cliente

---

## BLOQUE 3 — MERCADO OBJETIVO

### Pregunta 9: perfil_cliente_ideal
- **Label:** Describe tu cliente ideal (ICP): quién es, qué sector, qué tamaño, qué presupuesto tiene
- **Tipo:** textarea
- **Requerido:** sí
- **Max length:** 1000
- **Placeholder:** Ej: Despacho de abogados medianos (5-20 personas) en España, facturación 500K-2M€, presupuesto herramientas 200-500€/mes

### Pregunta 10: geo_alcance
- **Label:** Alcance geográfico inicial
- **Tipo:** select
- **Requerido:** sí
- **Opciones:**
  - `espana` — España
  - `espana_latam` — España + Latinoamérica
  - `europa` — Europa (UE)
  - `global` — Global
  - `otro` — Otro (especificar)

### Pregunta 11: tam_estimado_usuario
- **Label:** Tu estimación del mercado total (TAM) — si no sabes, deja vacío
- **Tipo:** text
- **Requerido:** no
- **Placeholder:** Ej: 500M €/año en España

---

## BLOQUE 4 — NEGOCIO

### Pregunta 12: modelo_ingresos
- **Label:** Modelo de ingresos principal
- **Tipo:** select
- **Requerido:** sí
- **Opciones:**
  - `saas_mensual` — SaaS — suscripción mensual/anual
  - `licencia` — Licencia perpetua + mantenimiento
  - `hardware_saas` — Hardware + suscripción SaaS
  - `freemium` — Freemium + versión pro
  - `pay_per_use` — Pay-per-use / por token
  - `mixto` — Mixto (hardware + SaaS + servicios)

### Pregunta 13: precio_referencia
- **Label:** Rango de precio objetivo (€/mes o €/unidad)
- **Tipo:** text
- **Requerido:** no
- **Placeholder:** Ej: 49-199 €/mes o 2.000-5.000 €/unidad

### Pregunta 14: canales_preferidos
- **Label:** Canales que tienes o planeas usar (marca los que apliquen)
- **Tipo:** checkbox
- **Requerido:** no
- **Opciones:**
  - `web_seo` — Web/SEO propio
  - `outbound` — Outbound directo (ventas)
  - `partners` — Partners / integradores
  - `marketplaces` — Marketplaces
  - `eventos` — Eventos / ferias
  - `content_marketing` — Content marketing
  - `paid_ads` — Publicidad pagada (Google/Meta/LinkedIn)
  - `comunidad` — Comunidad propia

### Pregunta 15: recursos_equipo
- **Label:** Equipo actual y presupuesto marketing mensual
- **Tipo:** textarea
- **Requerido:** no
- **Max length:** 500
- **Placeholder:** Ej: 2 fundadores (dev + marketing), 500€/mes en ads

---

## TOTAL: 15 campos (12 + 3 opcionales)

Los 3 opcionales (tam_estimado_usuario, precio_referencia, canales_preferidos, recursos_equipo) se envían vacíos y Gemini los infiere.
