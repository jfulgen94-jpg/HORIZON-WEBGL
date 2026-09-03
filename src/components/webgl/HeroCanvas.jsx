import { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
 * HeroCanvas — WebGL2 Floating Neon Squares
 * Cuadrados neon semi-transparentes con bordes luminosos
 * ~120 lineas GLSL, 0 dependencias externas
 * ───────────────────────────────────────────────────────────── */

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_res;
out vec4 fc;

// ── Hash function para generar posiciones/colores pseudo-aleatorios ──
float hash(vec2 p) {
  p = fract(p * vec2(443.897, 441.423));
  p += dot(p, p.yx + 19.19);
  return fract((p.x + p.y) * p.x);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// ── Rotacion 2D ──
mat2 rot2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// ── SDF de rectangulo rotado ──
float sdBox(vec2 p, vec2 b, float angle) {
  p = rot2(-angle) * p;
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// ── Glow del borde (mas luminoso) ──
float glowBorder(float d, float thickness, float glowRadius) {
  float border = smoothstep(thickness, thickness - 0.002, abs(d));
  float glow = exp(-abs(d) * 3.0 / glowRadius) * 0.72;
  return max(border * 0.35, glow);
}

// ── Paleta de colores neon (expandida: azul, cyan, verde calido, amarillo calido, rosa, violeta) ──
vec3 neonColor(float t) {
  vec3 c0 = vec3(0.231, 0.435, 0.831);  // #3B6FD4 azul
  vec3 c1 = vec3(0.220, 0.741, 0.973);  // #38BDF8 cian
  vec3 c2 = vec3(0.200, 0.780, 0.450);  // #33C773 verde calido
  vec3 c3 = vec3(0.950, 0.720, 0.150);  // #F2B826 amarillo calido
  vec3 c4 = vec3(0.900, 0.350, 0.550);  // #E5598C rosa
  vec3 c5 = vec3(0.650, 0.400, 0.950);  // #A666F2 violeta

  float seg = t * 5.0;
  if (seg < 1.0) return mix(c0, c1, fract(seg));
  if (seg < 2.0) return mix(c1, c2, fract(seg));
  if (seg < 3.0) return mix(c2, c3, fract(seg));
  if (seg < 4.0) return mix(c3, c4, fract(seg));
  return mix(c4, c5, fract(seg));
}

// ── SDF de triangulo equilatero ──
float sdTriangle(vec2 p, float size, float angle) {
  p = rot2(-angle) * p;
  const float k = sqrt(3.0);
  p.x = abs(p.x) - size;
  p.y = p.y + size / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * size, 0.0);
  return -length(p) * sign(p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // Fondo oscuro base
  vec3 bgColor = vec3(0.039, 0.047, 0.063); // #0A0C10

  // Grid de cuadrados: 6 columnas x 4 filas
  vec2 grid = vec2(6.0, 4.0);
  vec2 cell = uv * grid;

  vec3 color = bgColor;
  float totalGlow = 0.0;

  // Iterar sobre celdas vecinas para efecto de bordes
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cellIdx = floor(cell) + vec2(float(dx), float(dy));
      vec2 cellCenter = (cellIdx + 0.5) / grid;

      // Hash unico para esta celda
      float h = hash21(cellIdx);
      float h2 = hash21(cellIdx + 100.0);
      float h3 = hash21(cellIdx + 200.0);
      float h4 = hash21(cellIdx + 300.0);
      float h5 = hash21(cellIdx + 400.0);

      // Solo mostrar ~60% de las celdas (algunas vacias)
      if (h > 0.6) continue;

      // Tamano del cuadrado (0.18 - 0.32 del tamano de celda)
      float size = 0.18 + h2 * 0.14;

      // Offset de posicion (drift lento)
      float driftX = sin(u_time * 0.15 + h3 * 6.28) * 0.06;
      float driftY = cos(u_time * 0.12 + h4 * 6.28) * 0.05;

      // Rotacion lenta
      float rotation = u_time * 0.08 * (h5 - 0.5) * 2.0 + h3 * 6.28;

      // Posicion del cuadrado en UV
      vec2 squarePos = cellCenter + vec2(driftX, driftY);

      // Distancia al borde del cuadrado
      vec2 dUV = uv - squarePos;
      dUV.x *= aspect;
      float d = sdBox(dUV, vec2(size * 0.5), rotation);

      // Color neon de esta celda
      vec3 neon = neonColor(h);

      // Interior del cuadrado (oscuro, baja luminosidad)
      float interior = smoothstep(0.005, -0.005, d);
      float interiorBrightness = 0.04 + h2 * 0.03; // Muy oscuro dentro
      vec3 interiorColor = neon * interiorBrightness;

      // Borde con glow
      float borderGlow = glowBorder(d, 0.003, 0.025 + h3 * 0.015);

      // Combinar interior + borde
      vec3 squareColor = interiorColor + neon * borderGlow * 0.8;

      // Mezclar con el acumulado
      float alpha = max(interior, borderGlow * 0.7);
      color = mix(color, squareColor, alpha * (0.7 + h5 * 0.3));
      totalGlow += borderGlow * 0.15;
    }
  }

  // ── 5 Triangulos neon flotantes (mismo tamano que cuadrados, un poco mas pequenos) ──
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float hTri = hash21(vec2(777.0, fi * 131.0));
    float hTri2 = hash21(vec2(888.0, fi * 131.0));
    float hTri3 = hash21(vec2(999.0, fi * 131.0));
    float hTri4 = hash21(vec2(1111.0, fi * 131.0));

    // Posicion distribuida en la pantalla (5 puntos distribuidos)
    float posX = 0.1 + fi * 0.2;
    float posY = 0.2 + hTri * 0.6;
    vec2 triCenter = vec2(posX, posY);

    // Drift lento
    float driftX = sin(u_time * 0.12 + hTri2 * 6.28) * 0.05;
    float driftY = cos(u_time * 0.09 + hTri3 * 6.28) * 0.04;
    triCenter += vec2(driftX, driftY);

    // Tamano (0.06 - 0.10)
    float triSize = 0.06 + hTri2 * 0.04;

    // Rotacion lenta
    float triRot = u_time * 0.07 * (hTri3 - 0.5) * 2.0 + hTri * 6.28;

    // Distancia al triangulo
    vec2 dUVtri = uv - triCenter;
    dUVtri.x *= aspect;
    float dTri = sdTriangle(dUVtri, triSize, triRot);

    // Color neon del triangulo
    vec3 triNeon = neonColor(hTri + 0.3);

    // Interior oscuro
    float triInterior = smoothstep(0.005, -0.005, dTri);
    float triInteriorBright = 0.03 + hTri2 * 0.02;
    vec3 triIntColor = triNeon * triInteriorBright;

    // Borde con glow
    float triBorder = glowBorder(dTri, 0.002, 0.02 + hTri3 * 0.01);

    // Combinar
    vec3 triColor = triIntColor + triNeon * triBorder * 0.85;
    float triAlpha = max(triInterior, triBorder * 0.7);
    color = mix(color, triColor, triAlpha * (0.65 + hTri * 0.35));
    totalGlow += triBorder * 0.12;
  }

  // Viñeteado radial suave
  vec2 center = uv - 0.5;
  float vignette = 1.0 - dot(center, center) * 0.5;
  color *= vignette;

  // Brillo ambiental sutil por el glow acumulado
  color += vec3(0.03, 0.05, 0.09) * totalGlow;

  fc = vec4(color, 1.0);
}
`;

export default function HeroCanvas() {
  const ref = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) { setSupported(false); return; }

    /* ── DPR adaptativo ── */
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    function resize() {
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Compilar shaders ── */
    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { setSupported(false); return; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program error:', gl.getProgramInfoLog(prog));
      setSupported(false);
      return;
    }
    gl.useProgram(prog);

    /* ── Fullscreen quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* ── Uniforms ── */
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');

    /* ── Render loop con IntersectionObserver ── */
    let animId;
    let running = false;

    const observer = new IntersectionObserver(([entry]) => {
      const shouldRun = entry.isIntersecting;
      if (shouldRun && !running) {
        running = true;
        tick();
      } else if (!shouldRun) {
        running = false;
      }
    }, { threshold: 0.1 });
    observer.observe(canvas);

    /* ── prefers-reduced-motion ── */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectMotion = !mq.matches;
    const onMotionChange = (e) => {
      if (e.matches) { running = false; cancelAnimationFrame(animId); }
      else { running = true; tick(); }
    };
    mq.addEventListener('change', onMotionChange);

    function tick() {
      if (!running) return;
      resize();
      gl.uniform1f(uTime, performance.now() / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(tick);
    }

    if (respectMotion) tick();

    /* ── Context loss / restored ── */
    const onLost = (e) => { e.preventDefault(); running = false; cancelAnimationFrame(animId); };
    const onRestored = () => { running = true; tick(); };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    /* ── Cleanup ── */
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', onMotionChange);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  if (!supported) return null;

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ background: '#0A0C10' }}
    />
  );
}
