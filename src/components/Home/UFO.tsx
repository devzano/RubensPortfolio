// /src/app/components/Home/UFO.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Mode = "roam" | "follow" | "swoosh";
type ColorLike = THREE.ColorRepresentation;

type UFOTheme = {
  body: ColorLike;
  cockpit: ColorLike;
  cockpitOpacity: number; // 0..1
  ring: ColorLike;
  lightBase: ColorLike;
  lightEmissiveA: ColorLike; // gradient start (pulsing)
  lightEmissiveB: ColorLike; // gradient end (pulsing)
};

const DEFAULT_THEME: UFOTheme = {
  body: "#333333",
  cockpit: "#666666",
  cockpitOpacity: 0.5,
  ring: "#333333",
  lightBase: "#6495ed",
  lightEmissiveA: "#6495ed",
  lightEmissiveB: "#6a5acd",
};

type Props = {
  isPaused?: boolean;
  theme?: Partial<UFOTheme>;
  /** When true, ignores cursor/taps and stays in roam mode */
  disableInput?: boolean;
  /** Size of the ship. "large" is the current/original size */
  shipSize?: "small" | "medium" | "large";
};

const SCALE_MAP = {
  small: 0.6,
  medium: 0.8,
  large: 1.0,
} as const;

const UFO: React.FC<Props> = ({
  isPaused = false,
  theme,
  disableInput = false,
  shipSize = "large",
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(isPaused);
  pausedRef.current = isPaused;

  // live flags/refs for runtime updates without remount
  const inputEnabledRef = useRef(!disableInput);
  inputEnabledRef.current = !disableInput;

  // Refs to materials/colors/mesh so we can live-update
  const bodyRef = useRef<THREE.Mesh | null>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cockpitMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const ringMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const lightMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const emissiveARef = useRef(new THREE.Color(DEFAULT_THEME.lightEmissiveA));
  const emissiveBRef = useRef(new THREE.Color(DEFAULT_THEME.lightEmissiveB));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const initialTheme: UFOTheme = { ...DEFAULT_THEME, ...(theme || {}) };

    // Renderer / Scene / Camera
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const setDPR = () =>
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    setDPR();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const onContextLost = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    // Model
    const ufoBodyGeometry = new THREE.CylinderGeometry(3, 3, 0.7, 64);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialTheme.body),
      metalness: 0.9,
      roughness: 0.2,
    });
    bodyMatRef.current = bodyMaterial;

    const body = new THREE.Mesh(ufoBodyGeometry, bodyMaterial);
    bodyRef.current = body;

    const cockpitGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const cockpitMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialTheme.cockpit),
      metalness: 0.9,
      roughness: 0.4,
      opacity: initialTheme.cockpitOpacity,
      transparent: true,
    });
    cockpitMatRef.current = cockpitMaterial;
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.y = 0.85;
    body.add(cockpit);

    const cockpitDetailGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
    const cockpitDetailMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialTheme.ring),
      metalness: 0.5,
      roughness: 0.7,
    });
    ringMatRef.current = cockpitDetailMaterial;
    const cockpitDetail = new THREE.Mesh(
      cockpitDetailGeometry,
      cockpitDetailMaterial
    );
    cockpitDetail.rotation.x = Math.PI / 2;
    cockpitDetail.position.y = 0.85;
    body.add(cockpitDetail);

    // Apply size
    body.scale.setScalar(SCALE_MAP[shipSize] ?? 1);

    // Rim lights
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    lightMatsRef.current = [];
    const lights: Array<
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
    > = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(initialTheme.lightBase),
        emissive: new THREE.Color(initialTheme.lightEmissiveA),
        emissiveIntensity: 3,
      });
      lightMatsRef.current.push(mat);
      const light = new THREE.Mesh(lightGeometry, mat);
      light.position.set(Math.cos(angle) * 2.8, -0.35, Math.sin(angle) * 2.8);
      body.add(light);
      lights.push(light);
    }

    emissiveARef.current.set(initialTheme.lightEmissiveA);
    emissiveBRef.current.set(initialTheme.lightEmissiveB);

    scene.add(body);

    // Lighting
    scene.add(new THREE.AmbientLight(0x333333));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1.4, 50, Math.PI / 4, 0.5);
    spotLight.position.set(15, 20, 10);
    scene.add(spotLight);

    // Motion / Interactivity
    const clock = new THREE.Clock();
    let mode: Mode = "roam";
    let modeUntil = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const presets = {
      roam:   { followStrength: 2.6, damping: 0.92,  maxAccel: 0.16, spin: 0.004,  driftScale: 0.0,  maxSpeed: 0.80, moveScale: 58, targetLerp: 1.0 },
      follow: { followStrength: 3.2, damping: 0.935, maxAccel: 0.14, spin: 0.0055, driftScale: 0.15, maxSpeed: 0.75, moveScale: 36, targetLerp: 0.12 },
      swoosh: { followStrength:10.5, damping: 0.84,  maxAccel: 0.50, spin: 0.009,  driftScale: 0.20, maxSpeed: 1.30, moveScale: 58, targetLerp: 0.40 },
    } as const;

    const DEADBAND = 0.6;
    const SNAPBAND = 0.22;
    const IDLE_TO_ROAM_MS = 1200;
    let lastPointerTs = performance.now();

    const SPEED_SLEEP = 0.02;
    const DIST_SLEEP = 0.06;

    // Scratch
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const target = new THREE.Vector3(0, 0, 0);
    const temp = new THREE.Vector3();
    const toTarget = new THREE.Vector3();
    const accel = new THREE.Vector3();

    const emissiveColor = new THREE.Color();

    const driftVel = new THREE.Vector3(0.02, 0.02, 0.02);
    const springVel = new THREE.Vector3();

    const hoverBaseY = 0;
    let hoverT = 0;

    let spinBoost = 0;
    let lightBoost = 0;

    const bounds = () => ({
      x: window.innerWidth / 100,
      y: window.innerHeight / 100,
      z: 6,
    });

    const screenToWorld = (clientX: number, clientY: number, out: THREE.Vector3) => {
      ndc.x = (clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(planeZ, out);
      const b = bounds();
      out.set(
        THREE.MathUtils.clamp(out.x, -b.x, b.x),
        THREE.MathUtils.clamp(out.y, -b.y, b.y),
        0
      );
    };

    // Roam waypoint scheduler
    const roamStart = new THREE.Vector3(0, 0, 0);
    const roamGoal = new THREE.Vector3(0, 0, 0);
    let roamStartTime = performance.now();
    let roamDuration = 2600; // ms

    const randIn = (min: number, max: number) => min + Math.random() * (max - min);

    const pickRoamGoal = () => {
      const b = bounds();
      roamStart.copy(target);
      roamGoal.set(
        randIn(-b.x * 0.7, b.x * 0.7),
        randIn(-b.y * 0.55, b.y * 0.55),
        0
      );
      roamStartTime = performance.now();
      roamDuration = randIn(2200, 3600);
    };

    const enterRoam = () => {
      mode = "roam";
      springVel.multiplyScalar(0.6);
      pickRoamGoal();
    };

    const applySwirl = (v: THREE.Vector3, tSec: number) => {
      const amp = 0.10;
      v.x += Math.sin(tSec * 0.7) * amp;
      v.y += Math.cos(tSec * 0.6) * amp;
    };

    // Events (gated by inputEnabledRef)
    const onPointerMove = (x: number, y: number) => {
      if (!inputEnabledRef.current) return;
      lastPointerTs = performance.now();
      if (prefersReducedMotion) return;
      screenToWorld(x, y, temp);
      const t = mode === "swoosh" ? presets.swoosh.targetLerp : presets.follow.targetLerp;
      target.lerp(temp, t);
      if (mode !== "swoosh") mode = "follow";
    };

    const onPointerTap = (x: number, y: number) => {
      if (!inputEnabledRef.current) return;
      lastPointerTs = performance.now();
      if (prefersReducedMotion) return;
      screenToWorld(x, y, temp);
      target.copy(temp);
      springVel.addScaledVector(temp.clone().sub(body.position), 0.6);
      spinBoost = 0.025;
      lightBoost = 2.2;
      mode = "swoosh";
      modeUntil = performance.now() + 280;
    };

    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseDown = (e: MouseEvent) => onPointerTap(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const t0 = e.touches[0]; if (!t0) return;
      onPointerMove(t0.clientX, t0.clientY);
    };
    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0] ?? e.changedTouches[0]; if (!t) return;
      onPointerTap(t.clientX, t.clientY);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || (e.relatedTarget as Node) === document.documentElement) {
        enterRoam();
      }
    };

    let running = true;
    let rafId = 0;
    const stopLoop = () => {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    };
    const startLoop = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onBlur = () => { enterRoam(); stopLoop(); };
    const onFocus = () => { startLoop(); };
    const onVisibility = () => {
      if (document.hidden) { enterRoam(); stopLoop(); } else { startLoop(); }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    // Init
    target.set(0, 0, 0);
    pickRoamGoal();

    // Loop
    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      if (pausedRef.current || prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const nowMs = performance.now();
      const dt = Math.min(0.033, clock.getDelta());

      // If input is disabled, always roam (no idle detection needed)
      if (!inputEnabledRef.current) {
        if (mode !== "roam") enterRoam();
      } else {
        if (mode === "follow" && nowMs - lastPointerTs > IDLE_TO_ROAM_MS) {
          enterRoam();
        }
        if (mode === "swoosh" && nowMs > modeUntil) mode = "follow";
      }

      if (mode === "roam") {
        let u = (nowMs - roamStartTime) / roamDuration;
        if (u >= 1) {
          roamStart.copy(roamGoal);
          pickRoamGoal();
          u = 0;
        }
        const s = u * u * u * (u * (6 * u - 15) + 10); // quintic
        temp.lerpVectors(roamStart, roamGoal, s);
        applySwirl(temp, nowMs * 0.001);
        target.copy(temp);
      }

      // Hover wobble
      hoverT += 0.9 * dt;
      const hoverY = hoverBaseY + Math.sin(hoverT) * 0.5;

      const { followStrength, damping, maxAccel, spin, driftScale, maxSpeed, moveScale } =
        presets[mode];

      toTarget.subVectors(target, body.position);
      const dist = toTarget.length();

      // Drift control
      const b = bounds();
      const driftActive = !(mode === "follow" && dist < DEADBAND) && driftScale > 0;
      if (driftActive) {
        body.position.x += driftVel.x * driftScale * dt * 60;
        body.position.y += driftVel.y * driftScale * dt * 60;
        body.position.z += driftVel.z * driftScale * dt * 60;
        if (body.position.x > b.x || body.position.x < -b.x) driftVel.x *= -1;
        if (body.position.y > b.y || body.position.y < -b.y) driftVel.y *= -1;
        if (body.position.z > b.z || body.position.z < -b.z) driftVel.z *= -1;
      }

      // Spring
      accel.copy(toTarget).multiplyScalar(followStrength * dt);
      if (accel.length() > maxAccel) accel.setLength(maxAccel);
      springVel.add(accel);

      const near = dist < DEADBAND && mode !== "roam";
      const nearFactor = near ? 0.80 : 1.0;
      springVel.multiplyScalar(damping * nearFactor);

      if (dist < SNAPBAND && mode !== "roam") {
        body.position.lerp(target, 0.35);
        springVel.set(0, 0, 0);
      } else {
        if (springVel.length() > maxSpeed) springVel.setLength(maxSpeed);
        body.position.addScaledVector(springVel, dt * moveScale);
      }

      if (mode === "roam" && springVel.length() < SPEED_SLEEP && dist < DIST_SLEEP) {
        springVel.set(0, 0, 0);
        body.position.copy(target);
      }

      // Maintain hover baseline
      body.position.y = THREE.MathUtils.lerp(body.position.y, hoverY, 0.12);

      // Spin + decaying boost
      body.rotation.y += spin + spinBoost;
      spinBoost = THREE.MathUtils.damp(spinBoost, 0, 20, dt);

      // Lights pulse using theme-driven gradient
      const now = nowMs * 0.001;
      for (let i = 0; i < lights.length; i++) {
        const t = (Math.sin(now + i) + 1) / 2;
        emissiveColor.lerpColors(emissiveARef.current, emissiveBRef.current, t);
        const mat = lights[i].material;
        mat.emissive.copy(emissiveColor);
        const base = 2 + Math.sin(now + i);
        mat.emissiveIntensity = base + lightBoost;
      }
      lightBoost = THREE.MathUtils.damp(lightBoost, 0, 10, dt);

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      setDPR();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);

      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }

      scene.remove(body);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);

      ufoBodyGeometry.dispose();
      cockpitGeometry.dispose();
      cockpitDetailGeometry.dispose();
      lightGeometry.dispose();

      bodyMatRef.current?.dispose();
      cockpitMatRef.current?.dispose();
      ringMatRef.current?.dispose();
      lightMatsRef.current.forEach((l) => l.dispose());

      renderer.dispose();
      lightMatsRef.current = [];
      bodyMatRef.current = cockpitMatRef.current = ringMatRef.current = null;
    };
  }, []); // mount only

  // Live theme updates
  useEffect(() => {
    const merged: UFOTheme = { ...DEFAULT_THEME, ...(theme || {}) };
    if (bodyMatRef.current) bodyMatRef.current.color.set(merged.body);
    if (cockpitMatRef.current) {
      cockpitMatRef.current.color.set(merged.cockpit);
      cockpitMatRef.current.opacity = merged.cockpitOpacity;
      cockpitMatRef.current.needsUpdate = true;
    }
    if (ringMatRef.current) ringMatRef.current.color.set(merged.ring);
    emissiveARef.current.set(merged.lightEmissiveA);
    emissiveBRef.current.set(merged.lightEmissiveB);
    if (lightMatsRef.current.length) {
      for (const m of lightMatsRef.current) m.color.set(merged.lightBase);
    }
  }, [theme]);

  // Live size updates
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scale.setScalar(SCALE_MAP[shipSize] ?? 1);
    }
  }, [shipSize]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    />
  );
};

export default UFO;