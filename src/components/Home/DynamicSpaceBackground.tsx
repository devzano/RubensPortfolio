"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  accent?: string;
  isPaused?: boolean;
};

type StarLayer = {
  positions: Float32Array;
  speeds: Float32Array;
  drift: Float32Array;
  geometry: THREE.BufferGeometry;
  points: THREE.Points;
  spreadX: number;
  spreadY: number;
  depth: number;
};

const STAR_COLORS = ["#E5F0FF", "#BFD8FF", "#8FB7FF", "#D6CBFF"];

const toVec3 = (hex: string) => {
  const color = new THREE.Color(hex);
  return new THREE.Vector3(color.r, color.g, color.b);
};

const pickColor = () =>
  new THREE.Color(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] ?? "#E5F0FF");

function resetStar(
  positions: Float32Array,
  speeds: Float32Array,
  drift: Float32Array,
  index: number,
  spreadX: number,
  spreadY: number,
  depth: number
) {
  const i = index * 3;
  positions[i] = (Math.random() - 0.5) * spreadX;
  positions[i + 1] = (Math.random() - 0.5) * spreadY;
  positions[i + 2] = -Math.random() * depth;
  speeds[index] = 0.035 + Math.random() * 0.09;
  drift[i] = (Math.random() - 0.5) * 0.006;
  drift[i + 1] = (Math.random() - 0.5) * 0.006;
  drift[i + 2] = 0;
}

function createStarLayer(
  count: number,
  size: number,
  opacity: number,
  spreadX: number,
  spreadY: number,
  depth: number
): StarLayer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  const drift = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    resetStar(positions, speeds, drift, i, spreadX, spreadY, depth);
    const color = pickColor();
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = size * (0.8 + Math.random() * 1.4);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
      uAccent: { value: toVec3("#7DA7FF") },
    },
    vertexShader: `
      attribute float aSize;
      varying vec3 vColor;
      uniform float uPixelRatio;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio * (160.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uOpacity;
      uniform vec3 uAccent;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dist = dot(uv, uv);
        float alpha = smoothstep(0.25, 0.0, dist) * uOpacity;
        vec3 color = mix(vColor, uAccent, 0.38);
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  return {
    positions,
    speeds,
    drift,
    geometry,
    points: new THREE.Points(geometry, material),
    spreadX,
    spreadY,
    depth,
  };
}

export default function DynamicSpaceBackground({ accent = "#7DA7FF", isPaused = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(isPaused);
  const accentRef = useRef(accent);
  const applyAccentRef = useRef<(nextAccent: string) => void>(() => {});
  pausedRef.current = isPaused;
  accentRef.current = accent;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#030712", 0.018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    const setDpr = () => renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    setDpr();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const currentMount = mount;

    const layers = [
      createStarLayer(700, 1.1, 0.55, 70, 55, 90),
      createStarLayer(320, 1.8, 0.75, 52, 40, 65),
      createStarLayer(120, 2.8, 0.95, 38, 28, 45),
    ];

    layers.forEach((layer) => scene.add(layer.points));

    const nebulaGeometry = new THREE.PlaneGeometry(120, 90, 1, 1);
    const nebulaMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: toVec3(accentRef.current) },
        uAccentDeep: { value: toVec3(accentRef.current).multiplyScalar(0.42) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uAccent;
        uniform vec3 uAccentDeep;
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          vec2 flow = vec2(uTime * 0.008, -uTime * 0.004);
          float n1 = noise(uv * 2.1 + flow);
          float n2 = noise(uv * 3.7 - flow * 1.4);
          float cloud = smoothstep(0.52, 0.92, n1 * 0.65 + n2 * 0.35);
          vec3 colorA = mix(vec3(0.03, 0.05, 0.10), uAccentDeep, 0.8);
          vec3 colorB = mix(vec3(0.08, 0.10, 0.18), uAccent, 0.55);
          vec3 color = mix(colorA, colorB, n2);
          float vignette = smoothstep(1.35, 0.2, length(uv));
          gl_FragColor = vec4(color, cloud * 0.18 * vignette);
        }
      `,
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebula.position.z = -55;
    scene.add(nebula);

    const pointer = new THREE.Vector2();
    const smoothedPointer = new THREE.Vector2();
    const clock = new THREE.Clock();
    let frameId = 0;

    const onPointerMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      setDpr();

      for (const layer of layers) {
        const material = layer.points.material;
        if (material instanceof THREE.ShaderMaterial) {
          material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 1.75);
        }
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.033);
      smoothedPointer.lerp(pointer, 0.04);

      if (!pausedRef.current) {
        nebulaMaterial.uniforms.uTime.value += dt * 60;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, smoothedPointer.x * 0.8, 0.03);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -smoothedPointer.y * 0.55, 0.03);

        layers.forEach((layer, layerIndex) => {
          const posAttr = layer.geometry.getAttribute("position") as THREE.BufferAttribute;
          const posArray = layer.positions;
          const speedScale = 0.45 + layerIndex * 0.28;

          for (let i = 0; i < layer.speeds.length; i += 1) {
            const idx = i * 3;
            posArray[idx] += layer.drift[idx] * speedScale;
            posArray[idx + 1] += layer.drift[idx + 1] * speedScale;
            posArray[idx + 2] += layer.speeds[i] * (0.55 + layerIndex * 0.25);

            if (posArray[idx + 2] > 16) {
              resetStar(posArray, layer.speeds, layer.drift, i, layer.spreadX, layer.spreadY, layer.depth);
            }
          }

          posAttr.needsUpdate = true;
          layer.points.rotation.z += dt * 0.004 * (layerIndex + 1);
          layer.points.rotation.x = THREE.MathUtils.lerp(
            layer.points.rotation.x,
            smoothedPointer.y * 0.035 * (layerIndex + 1),
            0.03
          );
          layer.points.rotation.y = THREE.MathUtils.lerp(
            layer.points.rotation.y,
            smoothedPointer.x * 0.045 * (layerIndex + 1),
            0.03
          );
        });
      }

      renderer.render(scene, camera);
    };

    const applyAccent = (nextAccent: string) => {
      const accentVec = toVec3(nextAccent);
      const accentDeepVec = accentVec.clone().multiplyScalar(0.42);

      for (const layer of layers) {
        const material = layer.points.material;
        if (material instanceof THREE.ShaderMaterial) {
          material.uniforms.uAccent.value.copy(accentVec);
        }
      }

      nebulaMaterial.uniforms.uAccent.value.copy(accentVec);
      nebulaMaterial.uniforms.uAccentDeep.value.copy(accentDeepVec);
    };

    applyAccentRef.current = applyAccent;
    applyAccent(accentRef.current);

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);

      layers.forEach((layer) => {
        scene.remove(layer.points);
        const material = layer.points.material;
        layer.geometry.dispose();
        if (material instanceof THREE.Material) material.dispose();
      });

      scene.remove(nebula);
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      renderer.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      applyAccentRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    applyAccentRef.current(accent);
  }, [accent]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    />
  );
}
