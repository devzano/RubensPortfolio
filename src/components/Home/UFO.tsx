// /src/app/components/Home/UFO.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { isPaused?: boolean };
type Mode = "roam" | "follow" | "swoosh";

const UFO: React.FC<Props> = ({ isPaused = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(isPaused);
  pausedRef.current = isPaused;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer / Scene / Camera
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const setDPR = () => renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    setDPR();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const onContextLost = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    // Model
    const ufoBodyGeometry = new THREE.CylinderGeometry(3, 3, 0.7, 64);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.9, roughness: 0.2 });
    const body = new THREE.Mesh(ufoBodyGeometry, bodyMaterial);

    const cockpitGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const cockpitMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333, metalness: 0.9, roughness: 0.4, opacity: 0.5, transparent: true,
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.y = 0.85;
    body.add(cockpit);

    const cockpitDetailGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
    const cockpitDetailMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.7 });
    const cockpitDetail = new THREE.Mesh(cockpitDetailGeometry, cockpitDetailMaterial);
    cockpitDetail.rotation.x = Math.PI / 2;
    cockpitDetail.position.y = 0.85;
    body.add(cockpitDetail);

    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lights: Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>> = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({
        color: 0x6495ed, emissive: 0x6a5acd, emissiveIntensity: 3,
      });
      const light = new THREE.Mesh(lightGeometry, mat);
      light.position.set(Math.cos(angle) * 2.8, -0.35, Math.sin(angle) * 2.8);
      body.add(light);
      lights.push(light);
    }

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

    // Tuned presets (slower, smoother follow)
    const presets = {
      roam:   { followStrength: 2.7, damping: 0.83, maxAccel: 0.19, spin: 0.004, driftScale: 1.13,  maxSpeed: 0.79, moveScale: 70, targetLerp: 0.65 },
      follow: { followStrength: 3.2, damping: 0.935, maxAccel: 0.14, spin: 0.0055, driftScale: 0.15, maxSpeed: 0.75, moveScale: 36, targetLerp: 0.12 },
      swoosh: { followStrength: 10.5, damping: 0.84, maxAccel: 0.50, spin: 0.009,  driftScale: 0.20, maxSpeed: 1.30, moveScale: 58, targetLerp: 0.40 },
    } as const;

    // Scratch
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const target = new THREE.Vector3(0, 0, 0);
    const temp = new THREE.Vector3();
    const toTarget = new THREE.Vector3();
    const accel = new THREE.Vector3();
    const c1 = new THREE.Color(0x6495ed);
    const c2 = new THREE.Color(0x6a5acd);
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

    const roamPhase = {
      x1: Math.random() * Math.PI * 2, x2: Math.random() * Math.PI * 2,
      y1: Math.random() * Math.PI * 2, y2: Math.random() * Math.PI * 2,
    };
    const roamUpdateTarget = (t: number) => {
      const b = bounds();
      const rx = Math.sin(t * 0.15 + roamPhase.x1) * 0.6 + Math.sin(t * 0.07 + roamPhase.x2) * 0.4;
      const ry = Math.cos(t * 0.13 + roamPhase.y1) * 0.6 + Math.cos(t * 0.05 + roamPhase.y2) * 0.4;
      temp.set(rx * (b.x * 0.7), ry * (b.y * 0.6), 0);
      target.lerp(temp, presets.roam.targetLerp);
    };

    // Events
    const onPointerMove = (x: number, y: number) => {
      if (prefersReducedMotion) return;
      screenToWorld(x, y, temp);
      // Heavier smoothing in follow mode for calmer motion
      const t = mode === "swoosh" ? presets.swoosh.targetLerp : presets.follow.targetLerp;
      target.lerp(temp, t);
      if (mode !== "swoosh") mode = "follow";
    };

    const onPointerTap = (x: number, y: number) => {
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
        mode = "roam";
      }
    };

    let running = true;
    let rafId = 0;
    const stopLoop = () => { running = false; if (rafId) cancelAnimationFrame(rafId); };
    const startLoop = () => { if (!running) { running = true; rafId = requestAnimationFrame(animate); } };

    const onBlur = () => { mode = "roam"; stopLoop(); };
    const onFocus = () => { startLoop(); };
    const onVisibility = () => { if (document.hidden) { mode = "roam"; stopLoop(); } else { startLoop(); } };

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

    // Loop
    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      if (pausedRef.current || prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const dt = Math.min(0.033, clock.getDelta());

      if (mode === "swoosh" && performance.now() > modeUntil) mode = "follow";
      if (mode === "roam") roamUpdateTarget(performance.now() * 0.001);

      // Hover wobble
      hoverT += 0.9 * dt;
      const hoverY = hoverBaseY + Math.sin(hoverT) * 0.5;

      // Mode params
      const { followStrength, damping, maxAccel, spin, driftScale, maxSpeed, moveScale } = presets[mode];

      // Drift (less in follow so it doesn't fight cursor)
      const b = bounds();
      body.position.x += driftVel.x * driftScale * dt * 60;
      body.position.y += driftVel.y * driftScale * dt * 60;
      body.position.z += driftVel.z * driftScale * dt * 60;
      if (body.position.x > b.x || body.position.x < -b.x) driftVel.x *= -1;
      if (body.position.y > b.y || body.position.y < -b.y) driftVel.y *= -1;
      if (body.position.z > b.z || body.position.z < -b.z) driftVel.z *= -1;

      // Spring toward target (slower, clamped)
      toTarget.subVectors(target, body.position);
      accel.copy(toTarget).multiplyScalar(followStrength * dt);
      if (accel.length() > maxAccel) accel.setLength(maxAccel);
      springVel.add(accel);

      // Extra damping near target to kill oscillation
      const dist = toTarget.length();
      const near = dist < 0.8;
      const nearFactor = near ? 0.85 : 1.0;
      springVel.multiplyScalar(damping * nearFactor);

      // Clamp speed so it can't overshoot wildly
      if (springVel.length() > maxSpeed) springVel.setLength(maxSpeed);

      body.position.addScaledVector(springVel, dt * moveScale);

      // Maintain hover baseline
      body.position.y = THREE.MathUtils.lerp(body.position.y, hoverY, 0.12);

      // Spin + decaying boost
      body.rotation.y += spin + spinBoost;
      spinBoost = THREE.MathUtils.damp(spinBoost, 0, 20, dt);

      // Lights
      const now = performance.now() * 0.001;
      for (let i = 0; i < lights.length; i++) {
        const t = (Math.sin(now + i) + 1) / 2;
        emissiveColor.lerpColors(c1, c2, t);
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
      if (rafId) cancelAnimationFrame(rafId);

      scene.remove(body);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);

      ufoBodyGeometry.dispose();
      cockpitGeometry.dispose();
      cockpitDetailGeometry.dispose();
      lightGeometry.dispose();

      bodyMaterial.dispose();
      cockpitMaterial.dispose();
      cockpitDetailMaterial.dispose();
      lights.forEach((l) => l.material.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    />
  );
};

export default UFO;