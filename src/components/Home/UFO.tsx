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
      color: 0x666666,
      metalness: 0.9,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(ufoBodyGeometry, bodyMaterial);

    const cockpitGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const cockpitMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.4,
      opacity: 0.5,
      transparent: true,
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.y = 0.85;
    body.add(cockpit);

    const cockpitDetailGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
    const cockpitDetailMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.5,
      roughness: 0.7,
    });
    const cockpitDetail = new THREE.Mesh(
      cockpitDetailGeometry,
      cockpitDetailMaterial
    );
    cockpitDetail.rotation.x = Math.PI / 2;
    cockpitDetail.position.y = 0.85;
    body.add(cockpitDetail);

    // Rim lights
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lights: Array<
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
    > = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({
        color: 0x6495ed,
        emissive: 0x6a5acd,
        emissiveIntensity: 3,
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

    // Tuned presets (calm follow, snappy swoosh, smooth roam)
    const presets = {
      // Drift disabled in roam to prevent fighting the spring/target
      roam:   { followStrength: 2.6, damping: 0.92,  maxAccel: 0.16, spin: 0.004,  driftScale: 0.0,  maxSpeed: 0.80, moveScale: 58, targetLerp: 1.0 },
      follow: { followStrength: 3.2, damping: 0.935, maxAccel: 0.14, spin: 0.0055, driftScale: 0.15, maxSpeed: 0.75, moveScale: 36, targetLerp: 0.12 },
      swoosh: { followStrength:10.5, damping: 0.84,  maxAccel: 0.50, spin: 0.009,  driftScale: 0.20, maxSpeed: 1.30, moveScale: 58, targetLerp: 0.40 },
    } as const;

    // Deadband to settle near the target (follow/swoosh)
    const DEADBAND = 0.6;
    const SNAPBAND = 0.22;

    // Idle → roam after this long without pointer movement
    const IDLE_TO_ROAM_MS = 1200;
    let lastPointerTs = performance.now();

    // "Sleep" when essentially at target (roam)
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

    const screenToWorld = (
      clientX: number,
      clientY: number,
      out: THREE.Vector3
    ) => {
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

    // -------- Roam waypoint scheduler (no jitter) ----------
    let roamStart = new THREE.Vector3(0, 0, 0);
    let roamGoal = new THREE.Vector3(0, 0, 0);
    let roamStartTime = performance.now();
    let roamDuration = 2600; // ms

    const randIn = (min: number, max: number) => min + Math.random() * (max - min);

    const pickRoamGoal = () => {
      const b = bounds();
      roamStart.copy(target); // start from current target
      roamGoal.set(
        randIn(-b.x * 0.7, b.x * 0.7),
        randIn(-b.y * 0.55, b.y * 0.55),
        0
      );
      roamStartTime = performance.now();
      roamDuration = randIn(2200, 3600); // 2.2–3.6s
    };

    const enterRoam = () => {
      mode = "roam";
      // soften any residual motion and schedule a fresh waypoint
      springVel.multiplyScalar(0.6);
      pickRoamGoal();
    };

    // Tiny “alive” swirl that’s extremely low amplitude
    const applySwirl = (v: THREE.Vector3, tSec: number) => {
      const amp = 0.10; // keep small to avoid visible jitter
      v.x += Math.sin(tSec * 0.7) * amp;
      v.y += Math.cos(tSec * 0.6) * amp;
    };

    // Events
    const onPointerMove = (x: number, y: number) => {
      lastPointerTs = performance.now();
      if (prefersReducedMotion) return;
      screenToWorld(x, y, temp);
      const t = mode === "swoosh" ? presets.swoosh.targetLerp : presets.follow.targetLerp;
      target.lerp(temp, t);
      if (mode !== "swoosh") mode = "follow";
    };

    const onPointerTap = (x: number, y: number) => {
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
      const t0 = e.touches[0];
      if (!t0) return;
      onPointerMove(t0.clientX, t0.clientY);
    };
    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0] ?? e.changedTouches[0];
      if (!t) return;
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
      if (rafId) cancelAnimationFrame(rafId);
    };
    const startLoop = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onBlur = () => {
      enterRoam();
      stopLoop();
    };
    const onFocus = () => {
      startLoop();
    };
    const onVisibility = () => {
      if (document.hidden) {
        enterRoam();
        stopLoop();
      } else {
        startLoop();
      }
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
      const dt = Math.min(0.033, clock.getDelta()); // <=33ms

      // Idle → roam
      if (mode === "follow" && nowMs - lastPointerTs > IDLE_TO_ROAM_MS) {
        enterRoam();
      }

      if (mode === "swoosh" && nowMs > modeUntil) mode = "follow";

      // Smooth waypoint-driven roam (no per-frame target jitter)
      if (mode === "roam") {
        let u = (nowMs - roamStartTime) / roamDuration;
        if (u >= 1) {
          // arrived → next goal
          roamStart.copy(roamGoal);
          pickRoamGoal();
          u = 0;
        }
        // Quintic smoothstep for C2-continuous velocity (very smooth)
        const s = u * u * u * (u * (6 * u - 15) + 10);
        temp.lerpVectors(roamStart, roamGoal, s);
        applySwirl(temp, nowMs * 0.001); // tiny life motion
        target.copy(temp);
      }

      // Hover wobble
      hoverT += 0.9 * dt;
      const hoverY = hoverBaseY + Math.sin(hoverT) * 0.5;

      // Params by mode
      const { followStrength, damping, maxAccel, spin, driftScale, maxSpeed, moveScale } =
        presets[mode];

      // Vector to target
      toTarget.subVectors(target, body.position);
      const dist = toTarget.length();

      // Drift:
      // - Disabled entirely in roam (driftScale=0)
      // - In follow: disabled inside deadband so we can settle
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

      // Spring toward target (accel and speed clamped)
      accel.copy(toTarget).multiplyScalar(followStrength * dt);
      if (accel.length() > maxAccel) accel.setLength(maxAccel);
      springVel.add(accel);

      // Extra damping near target to kill oscillation (follow/swoosh)
      const near = dist < DEADBAND && mode !== "roam";
      const nearFactor = near ? 0.80 : 1.0;
      springVel.multiplyScalar(damping * nearFactor);

      // Optional micro-snap when extremely close (follow/swoosh)
      if (dist < SNAPBAND && mode !== "roam") {
        body.position.lerp(target, 0.35);
        springVel.set(0, 0, 0);
      } else {
        // Clamp speed
        if (springVel.length() > maxSpeed) springVel.setLength(maxSpeed);
        body.position.addScaledVector(springVel, dt * moveScale);
      }

      // Sleep in roam when essentially parked at target (prevents micro-jitter)
      if (
        mode === "roam" &&
        springVel.length() < SPEED_SLEEP &&
        dist < DIST_SLEEP
      ) {
        springVel.set(0, 0, 0);
        body.position.copy(target);
      }

      // Maintain hover baseline
      body.position.y = THREE.MathUtils.lerp(body.position.y, hoverY, 0.12);

      // Spin + decaying boost
      body.rotation.y += spin + spinBoost;
      spinBoost = THREE.MathUtils.damp(spinBoost, 0, 20, dt);

      // Lights
      const now = nowMs * 0.001;
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
    let rafID = requestAnimationFrame(animate);

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
      if (rafID) cancelAnimationFrame(rafID);

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