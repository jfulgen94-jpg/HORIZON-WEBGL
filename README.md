# Horizon – El Taller de la IA

Plataforma española de conocimiento sobre IA: ocho laboratorios, herramientas, benchmarks, contenido educativo, generación de resúmenes ejecutivos por IA y una futura comunidad de proyectos y profesionales.

## Stack

- **React 18** + **Vite 6** + **Tailwind**
- **Three.js** (solo en `/taller/mapa`, carga diferida)
- Despliegue en **Vercel** (Node.js Serverless Function en `api/ai/generate`)

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de producción (`vite build`) |
| `npm run preview` | Vista previa del build |

## ⚠️ Entorno local: `NODE_ENV=production`

**Hallazgo (CR-4):** esta máquina lanza las sesiones de desarrollo con `NODE_ENV=production` en el entorno del proceso. La variable no es del repositorio (no hay `.npmrc` ni `.env` que la definan) y no está registrada como variable persistente de Windows (Usuario/Máquina vacías). Se inyecta desde el lanzador/sesión que ejecuta los comandos.

**Consecuencia:** npm interpreta `NODE_ENV=production` y **podía eliminarse las `devDependencies`** (Vite, Tailwind, `@vitejs/plugin-react`, etc.), rompiendo el entorno.

**Mitigación:** cualquier instalación en esta máquina debe incluir las devDependencies explícitamente:

```bash
npm install --include=dev
```

Si la sesión ya tiene `NODE_ENV=production` forzado, desactívalo solo para el proceso antes de instalar:

```powershell
Remove-Item Env:NODE_ENV
npm install
```

> **Importante:** el build de producción **no se ve afectado**. Vercel inyecta `NODE_ENV=production` en su propio build; `npm run build` funciona correctamente con esa variable activa (verificado).

## Variables de entorno (Vercel)

Claves privadas de IA — configurar en **Vercel Dashboard → Settings → Environment Variables** (Production + Preview + Development). **Nunca** con prefijo `VITE_` (no se exponen al navegador).

```
GEMINI_API_KEY=
MISTRAL_API_KEY=
TOGETHER_API_KEY=
```

Ver `.env.example`.

## Web Analytics

Se usa la analítica integrada de Vercel (`@vercel/analytics`, sin cookies). Requiere activar **Web Analytics** en el proyecto desde el Dashboard de Vercel.

## Nota legal

Los textos legales (`/privacidad`, `/terminos`, `/cookies`, `/aviso-legal`) son borradores y requieren revisión jurídica profesional antes de su publicación definitiva.
