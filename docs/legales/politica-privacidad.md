# POLÍTICA DE PRIVACIDAD

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL]**

## 1. Responsable del tratamiento

Denominación: **Horizon – El Taller del Código**
Responsable: Jose Fulgencio Molina Garcia
NIF: 48646521-A
Email de contacto: [DATOS DEL RESPONSABLE PENDIENTES — introducir email de contacto]
Delegado de Protección de Datos (DPO): No aplica

## 2. Datos que se recogen

### 2.1 Datos proporcionados directamente por el usuario

| Categoría | Campos | Finalidad |
|---|---|---|
| Datos del formulario de generación | Nombre, email, teléfono, empresa, descripción, sector, ubicación, presupuesto, timeline, equipo, riesgos, métricas, stakeholders, compliance, y otros campos del formulario | Generación del resumen ejecutivo mediante IA |
| Notas del taller | Texto libre introducido por el usuario | Funcionalidad de anotaciones del taller |
| Datos de registro mock | Email, nombre, plan | Autenticación simulada (mock, sin backend real) |

### 2.2 Datos recogidos automáticamente

| Categoría | Datos | Finalidad |
|---|---|---|
| Almacenamiento local | Borrador del formulario, progreso del taller, último resultado, preferencia de tema | Funcionalidad y experiencia de usuario |
| Registros del servidor | Dirección IP, timestamp, resultado de la operación | Logs de seguridad y trazabilidad (función serverless) |

### 2.3 Datos que NO se recogen

- Cookies de seguimiento, analítica con cookies o publicidad
- Perfiles de navegación
- Datos de geolocalización
- Información de dispositivos
- Datos de terceros

### 2.4 Medición de visitas (Vercel Analytics)

El Sitio utiliza Vercel Analytics para contar visitas y páginas vistas. Según la
documentación del proveedor, esta medición **no utiliza cookies** y se procesa
en la infraestructura de Vercel Inc. (EE.UU.).

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL]** — Verificar base jurídica,
información al usuario y DPA con Vercel para esta finalidad.

## 3. Finalidades y base jurídica

| Finalidad | Base jurídica (RGPD Art. 6) | Detalle |
|---|---|---|
| Generación de resúmenes ejecutivos | Consentimiento (Art. 6.1.a) | El usuario solicita expresamente el servicio |
| Funcionamiento del taller | Ejecución de contrato / Consentimiento | Progreso y notas del usuario |
| Almacenamiento de borradores | Consentimiento | Persistencia del formulario para evitar pérdida de trabajo |
| Logs de seguridad | Interés legítimo (Art. 6.1.f) | Seguridad y trazabilidad del servicio |
| Comunidad y foros | Consentimiento | Publicación de mensajes y participación |

## 4. Destinatarios de los datos

| Destinatario | Datos recibidos | Ubicación | Finalidad |
|---|---|---|---|
| Google (Gemini) | Contenido del formulario (sin email/nombre directos) | EE.UU. | Generación de contenido IA |
| Mistral AI | Contenido del formulario (sin email/nombre directos) | Francia/EE.UU. | Generación de contenido IA (fallback) |
| Together AI | Contenido del formulario (sin email/nombre directos) | EE.UU. | Generación de contenido IA (fallback) |
| Vercel Inc. | Datos del servidor (logs, registros) | EE.UU. | Alojamiento del sitio web |

**[DATOS DEL RESPONSABLE PENDIENTES]** — Se requiere verificar la existencia de Acuerdos de Tratamiento de Datos (DPA) con cada proveedor.

## 5. Transferencias internacionales

Los datos pueden ser transferidos a terceros países (EE.UU.) en el marco de las siguientes garantías:

- **Google:** Cláusulas Contractuales Tipo (SCCs) de la Comisión Europea
- **Mistral AI:** SCCs y/o decisão de adecuación
- **Together AI:** SCCs de la Comisión Europea
- **Vercel:** SCCs de la Comisión Europea

**[REQUIERE ASESORAMIENTO JURÍDICO]** — Verificar la vigencia de las garantías específicas con cada proveedor.

## 6. Conservación de los datos

| Datos | Plazo de conservación | Criterio |
|---|---|---|
| Borrador del formulario | Mientras el usuario lo mantenga | Almacenamiento local del navegador |
| Último resultado generado | Mientras el usuario lo mantenga | Almacenamiento local del navegador |
| Progreso del taller | Mientras el usuario lo mantenga | Almacenamiento local del navegador |
| Notas del taller | Mientras el usuario lo mantenga | Almacenamiento local del navegador |
| Datos del formulario (enviados a IA) | No se almacenan en nuestros servidores | Efímero (solo durante la petición) |
| Logs del servidor | [DATOS DEL RESPONSABLE PENDIENTES — plazo sugerido: 30 días] | Seguridad y trazabilidad |
| Datos de registro mock | Mientras el usuario no elimine su "cuenta" | Almacenamiento local del navegador |

**[REQUIERE ASESORAMIENTO JURÍDICO]** — El almacenamiento local persistente sin expiración podría ser incompatible con el principio de limitación del plazo (Art. 5.1.e GDPR).

## 7. Derechos del usuario

Conforme al RGPD, el usuario tiene derecho a:

- **Acceso** (Art. 15): conocer qué datos tratamos
- **Rectificación** (Art. 16): corregir datos inexactos
- **Supresión** (Art. 17): solicitar la eliminación de datos
- **Limitación** (Art. 18): solicitar la limitación del tratamiento
- **Portabilidad** (Art. 20): recibir sus datos en formato estructurado
- **Oposición** (Art. 21): oponerse al tratamiento
- **Revocar consentimiento** (Art. 7.3): en cualquier momento

Para ejercer estos derechos, el usuario debe enviar una solicitud identificada a: [DATOS DEL RESPONSABLE PENDIENTES — email de contacto]

El usuario tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que el tratamiento no se ajusta a la normativa vigente.

## 8. Medidas de seguridad

El titular ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, considerando el estado de la técnica, la naturaleza de los datos y los riesgos.

Medidas implementadas:
- Comunicación cifrada (HTTPS/TLS)
- Variables de entorno privadas (sin exposición al navegador)
- Validación estricta de entradas
- Timeouts y límites de ejecución
- Ausencia de persistencia de datos sensibles en servidor

## 9. Tratamiento de formularios

El formulario del Generador de Resúmenes Ejecutivos recoge datos de negocio del usuario. Estos datos:

- Se envían únicamente al servicio de generación de IA solicitado
- No se almacenan en nuestros servidores
- No se comparten con terceros distintos a los proveedores de IA
- Se procesan de forma efímera (durante la petición)
- El usuario puede solicitar su eliminación en cualquier momento

## 10. Comunidad y foros

**[DECISIÓN DE PRODUCTO PENDIENTES]** — Si la sección de comunidad permite publicación de contenido:

- Los mensajes publicados son visibles por defecto
- El usuario es responsable del contenido que publica
- El titular se reserva el derecho de moderar o eliminar contenido
- Los datos del perfil de usuario se tratan según esta política
- Los mensajes pueden contener datos personales del autor

## 11. Menores de edad

El Sitio no está dirigido a menores de 14 años. No se recogen datos personales de menores de forma intencionada. Si se detectase el tratamiento de datos de un menor, se procedería a su eliminación inmediata.

## 12. Cambios en esta política

El titular se reserva el derecho de modificar la presente Política de Privacidad. Se notificará al usuario de cambios significativos mediante aviso en el Sitio. El uso continuado del Sitio tras las modificaciones implicará la aceptación de las mismas.

---

**Fecha de última actualización:** [FECHA PENDIENTE]

**[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Este borrador no constituye asesoramiento jurídico. Debe ser revisado por un profesional del derecho antes de su publicación.**
