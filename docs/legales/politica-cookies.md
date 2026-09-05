# POLÍTICA DE COOKIES Y TECNOLOGÍAS SIMILARES

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL]**

## 1. ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Sirven para recordar preferencias, mejorar la experiencia de navegación y recoger información sobre cómo se utiliza el sitio.

Además de las cookies, existen otras tecnologías similares como el `localStorage`, `sessionStorage` e `indexedDB`, que permiten almacenar información en el navegador del usuario.

## 2. ¿Qué tecnologías utiliza este sitio?

### 2.1 Almacenamiento local (localStorage)

El Sitio utiliza `localStorage` del navegador para almacenar datos localmente en el dispositivo del usuario. Esta tecnología NO utiliza cookies, pero cumple una función similar de persistencia de datos.

| Clave | Contenido | Finalidad | Esencial | Caducidad |
|---|---|---|---|---|
| `horizon_taller_progress` | Progreso del taller (pasos completados) | Mantener el avance del usuario | **Sí** (funcional) | Persistente |
| `horizon_taller_notes` | Notas personales del taller | Anotaciones del usuario | **Sí** (funcional) | Persistente |

### 2.2 Cookies

El Sitio NO utiliza cookies de ningún tipo:
- No hay cookies de seguimiento
- No hay cookies analíticas
- No hay cookies de publicidad
- No hay cookies de terceros

### 2.2.bis Medición sin cookies (Vercel Analytics)

El Sitio mide visitas y páginas vistas con Vercel Analytics, que según el
proveedor no utiliza cookies. Esta medición no se puede desactivar desde el
panel de preferencias porque no usa almacenamiento en tu navegador.

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL]** — Confirmar si esta medición
requiere información reforzada o base jurídica adicional.

### 2.3 Otras tecnologías

- **No** se utiliza `indexedDB`
- **No** se utiliza `sessionStorage`
- **No** se utiliza Service Worker ni Cache API
- **No** se utilizan píxeles de rastreo

## 3. Servicios de terceros

### 3.1 Google Fonts

El Sitio carga tipografías desde los servidores de Google:
- **Proveedor:** Google LLC
- **Servicio:** Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
- **Datos transferidos:** Dirección IP del usuario, cadena de User-Agent
- **Finalidad:** Mostrar las tipografías DM Sans, DM Mono y DM Serif Display
- **Duración de la sesión:** Cache del navegador

**[REQUIERE ASESORAMIENTO JURÍDICO]** — La carga de Google Fonts antes de la aceptación del usuario podría constituir una transferencia de datos a un tercero no esencial. Opciones:
1. Self-host fonts (descargar WOFF2 a `/public/fonts/`)
2. Cargar condicionalmente tras aceptación
3. Legitimar como "necesario para el servicio" (discutible)

## 4. Cómo gestionar el consentimiento

### 4.1 Panel de preferencias

El usuario puede gestionar sus preferencias de almacenamiento en cualquier momento a través del enlace "Privacidad" disponible en el pie de página del Sitio.

### 4.2 Categorías

| Categoría | Descripción | Por defecto |
|---|---|---|
| **Estrictamente necesario** | Borrador del formulario, progreso del taller, notas, seguridad | Siempre activo |
| **Funcional** | Último resultado, control de uso, autenticación simulada | Requiere aceptación |
| **Terceros** | Google Fonts | Requiere aceptación |

### 4.3 Bloqueo técnico

Hasta que el usuario acepte la categoría correspondiente:
- **Funcional:** no se escribirán las claves `horizon_executive_last_result`, `horizon_rate_limit` ni `horizon_user_auth`
- **Terceros:** no se cargará Google Fonts (se usarán fuentes del sistema como fallback)

## 5. Cómo retirar el consentimiento

El usuario puede retirar su consentimiento en cualquier momento:
1. Hacer clic en "Privacidad" en el pie de página
2. Desactivar las categorías deseadas
3. Los datos almacenados correspondientes serán eliminados

## 6. Consecuencias de no aceptar

Si el usuario no acepta las categorías no esenciales:
- **Funcional:** no se guardará el último resultado ni el mock de autenticación; la funcionalidad principal del sitio no se ve afectada
- **Terceros:** se usarán fuentes del sistema; el diseño puede variar ligeramente

## 7. Actualizaciones de esta política

Esta política puede actualizarse para reflejar cambios en las tecnologías utilizadas o en la normativa aplicable. Se notificará al usuario de cambios significativos.

---

**Fecha de última actualización:** [FECHA PENDIENTE]

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL]** — Este borrador no constituye asesoramiento jurídico. Debe ser revisado por un profesional del derecho antes de su publicación, especialmente en lo relativo a la clasificación de Google Fonts y el almacenamiento local.
