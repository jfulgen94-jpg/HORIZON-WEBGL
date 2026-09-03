import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MAP_NODES, MAP_EDGES, SCENE_CONFIG } from "../../data/taller-map-data";

/* ─────────────────────────────────────────────────────────────
 * TallerMap — Three.js 3D Interactive Map
 * Modules 1-4: Scene + Nodes + Connections + Interaction
 * ───────────────────────────────────────────────────────────── */

const NODE_GEOMETRY = new THREE.SphereGeometry(1, 32, 32);

const EDGE_VERT = `
  attribute float arc;
  varying float vArc;
  void main() {
    vArc = arc;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EDGE_FRAG = `
  uniform float u_time;
  uniform vec3 u_color;
  varying float vArc;
  void main() {
    float pulse = 0.4 + 0.6 * (0.5 + 0.5 * sin(u_time * 2.0 + vArc * 6.28));
    float fade = smoothstep(0.0, 0.15, vArc) * smoothstep(1.0, 0.85, vArc);
    gl_FragColor = vec4(u_color, pulse * fade * 0.6);
  }
`;

const FRESNEL_VERT = `
  uniform vec3 viewVector;
  varying float intensity;
  void main() {
    vec3 vNormal = normalize(normalMatrix * normal);
    vec3 vNormel = normalize(normalMatrix * viewVector);
    intensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRESNEL_FRAG = `
  uniform vec3 glowColor;
  uniform float intensityMult;
  varying float intensity;
  void main() {
    float i = intensity * intensityMult;
    gl_FragColor = vec4(glowColor, 1.0) * i;
  }
`;

function createNodeMaterial(node) {
  const color = new THREE.Color(node.color);
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color.clone().multiplyScalar(0.15),
    emissiveIntensity: 0.4,
    metalness: 0.3,
    roughness: 0.6,
  });
}

function createFresnelMaterial(color) {
  const glowColor = new THREE.Color(color);
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: glowColor },
      viewVector: { value: new THREE.Vector3() },
      intensityMult: { value: 1.0 },
    },
    vertexShader: FRESNEL_VERT,
    fragmentShader: FRESNEL_FRAG,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

function createNodeLabel(node) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 128;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 48px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#F3F4F8";
  ctx.fillText(node.label, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(2.5 * node.scale, 0.6 * node.scale, 1);
  return sprite;
}

function createEdge(edge, nodeMap) {
  const src = nodeMap.get(edge.source);
  const tgt = nodeMap.get(edge.target);
  if (!src || !tgt) return null;

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...src.pos),
    new THREE.Vector3(
      (src.pos[0] + tgt.pos[0]) / 2,
      0.8,
      (src.pos[2] + tgt.pos[2]) / 2
    ),
    new THREE.Vector3(...tgt.pos)
  );

  const points = curve.getPoints(40);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const arcAttr = new Float32Array(points.length);
  for (let i = 0; i < points.length; i++) arcAttr[i] = i / (points.length - 1);
  geometry.setAttribute("arc", new THREE.BufferAttribute(arcAttr, 1));

  const srcColor = new THREE.Color(src.type === "hero" ? "#3B6FD4" : src.type === "hub" ? "#9BA3B8" : src.color);
  const tgtColor = new THREE.Color(tgt.type === "hero" ? "#3B6FD4" : tgt.type === "hub" ? "#9BA3B8" : tgt.color);
  const edgeColor = srcColor.clone().lerp(tgtColor, 0.5);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_color: { value: edgeColor },
    },
    vertexShader: EDGE_VERT,
    fragmentShader: EDGE_FRAG,
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Line(geometry, material);
}

export default function TallerMap({ onNodeClick, onError, filter = "all" }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const frameRef = useRef(null);
  const nodesRef = useRef([]);
  const glowsRef = useRef([]);
  const labelsRef = useRef([]);
  const edgesRef = useRef([]);
  const hoveredRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [ready, setReady] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const handleNodeClick = useCallback((section) => {
    if (onNodeClick) onNodeClick(section);
  }, [onNodeClick]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── WebGL check ── */
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!gl) {
      if (onError) onError();
      return;
    }

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(SCENE_CONFIG.background);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE_CONFIG.background);
    scene.fog = new THREE.Fog(SCENE_CONFIG.fog.color, SCENE_CONFIG.fog.near, SCENE_CONFIG.fog.far);
    sceneRef.current = scene;

    /* ── Camera ── */
    const { fov, near, far, position } = SCENE_CONFIG.camera;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      near,
      far
    );
    camera.position.set(...position);
    camera.lookAt(0, 0, -4);
    cameraRef.current = camera;

    /* ── OrbitControls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.panSpeed = 0.8;
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.target.set(0, 0, -4);
    controlsRef.current = controls;

    /* ── Lights ── */
    const ambientLight = new THREE.AmbientLight(
      SCENE_CONFIG.ambient.color,
      SCENE_CONFIG.ambient.intensity
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      SCENE_CONFIG.directional.color,
      SCENE_CONFIG.directional.intensity
    );
    directionalLight.position.set(...SCENE_CONFIG.directional.position);
    scene.add(directionalLight);

    /* ── Grid helper sutil ── */
    const gridHelper = new THREE.GridHelper(30, 30, 0x1a1f2e, 0x111622);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    /* ── Create node spheres + Fresnel glow ── */
    const nodeMap = new Map(MAP_NODES.map((n) => [n.id, n]));
    const nodes = [];
    const glows = [];
    const labels = [];
    MAP_NODES.forEach((nodeData) => {
      const material = createNodeMaterial(nodeData);
      const mesh = new THREE.Mesh(NODE_GEOMETRY, material);
      mesh.position.set(...nodeData.pos);
      mesh.scale.setScalar(nodeData.scale);
      mesh.userData = { id: nodeData.id, section: nodeData.section, type: nodeData.type, label: nodeData.label };
      scene.add(mesh);
      nodes.push(mesh);

      const glowMat = createFresnelMaterial(nodeData.color);
      const glowMesh = new THREE.Mesh(NODE_GEOMETRY, glowMat);
      glowMesh.position.copy(mesh.position);
      glowMesh.scale.setScalar(nodeData.scale * 1.3);
      glowMesh.userData = { isGlow: true };
      scene.add(glowMesh);
      glows.push(glowMesh);

      const label = createNodeLabel(nodeData);
      label.position.set(nodeData.pos[0], nodeData.pos[1] + nodeData.scale + 0.6, nodeData.pos[2]);
      scene.add(label);
      labels.push(label);
    });
    nodesRef.current = nodes;
    glowsRef.current = glows;
    labelsRef.current = labels;

    /* ── Create edges ── */
    const edges = [];
    MAP_EDGES.forEach((edgeData) => {
      const line = createEdge(edgeData, nodeMap);
      if (line) {
        scene.add(line);
        edges.push(line);
      }
    });
    edgesRef.current = edges;

    /* ── Raycasting ── */
    function onMouseMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    renderer.domElement.addEventListener("mousemove", onMouseMove);

    function onClick() {
      if (hoveredRef.current) {
        handleNodeClick(hoveredRef.current.section);
      }
    }
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.style.cursor = "default";

    /* ── Resize handler ── */
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    /* ── Render loop ── */
    let running = true;
    const clock = new THREE.Clock();
    function animate() {
      if (!running) return;
      const elapsed = clock.getElapsedTime();

      controls.update();

      /* Update Fresnel viewVector */
      const camPos = camera.position;
      glows.forEach((g) => {
        g.material.uniforms.viewVector.value.copy(camPos).sub(g.position);
      });

      /* Animate edges */
      edges.forEach((line) => {
        line.material.uniforms.u_time.value = elapsed;
      });

      /* Raycasting */
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(nodes);
      let found = null;
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData && !obj.userData.isGlow) found = obj.userData;
      }

      /* Hover feedback */
      nodes.forEach((n) => {
        const glow = glows.find((g) => g.position.distanceTo(n.position) < 0.01);
        if (found && n.userData.id === found.id) {
          n.scale.setScalar(n.userData.scale * 1.15);
          if (glow) glow.material.uniforms.intensityMult.value = 2.0;
        } else {
          n.scale.setScalar(n.userData.scale);
          if (glow) glow.material.uniforms.intensityMult.value = 1.0;
        }
      });

      if (found) {
        renderer.domElement.style.cursor = "pointer";
        setTooltip({ x: (mouseRef.current.x + 1) / 2 * container.clientWidth, y: (-mouseRef.current.y + 1) / 2 * container.clientHeight, label: found.label });
        hoveredRef.current = found;
      } else {
        renderer.domElement.style.cursor = "default";
        setTooltip(null);
        hoveredRef.current = null;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }
    animate();

    setReady(true);

    /* ── Cleanup ── */
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      nodes.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
      glows.forEach((g) => { g.geometry.dispose(); g.material.dispose(); });
      labels.forEach((l) => { l.material.map?.dispose(); l.material.dispose(); });
      edges.forEach((l) => { l.geometry.dispose(); l.material.dispose(); });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleNodeClick, onError]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0C10]">
      <div ref={containerRef} className="w-full h-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#3B6FD4]/30 border-t-[#3B6FD4] rounded-full animate-spin" />
        </div>
      )}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 px-3 py-1.5 rounded-lg bg-[#1C2333] border border-white/[0.12] text-[#F3F4F8] text-sm font-medium shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 8 }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
}
