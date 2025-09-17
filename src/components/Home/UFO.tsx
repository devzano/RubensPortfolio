// app/UFO.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  isPaused?: boolean;
};

const UFO: React.FC<Props> = ({ isPaused = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(isPaused);
  pausedRef.current = isPaused;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    // UFO body
    const ufoBodyGeometry = new THREE.CylinderGeometry(3, 3, 0.7, 64);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.9,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(ufoBodyGeometry, bodyMaterial);

    // Cockpit
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

    // Cockpit ring detail
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
    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0x6495ed,
      emissive: 0x6a5acd,
      emissiveIntensity: 3,
    });

    const lights: Array<
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
    > = [];

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(Math.cos(angle) * 2.8, -0.35, Math.sin(angle) * 2.8);
      body.add(light);
      lights.push(light);
    }

    scene.add(body);

    // Lighting
    scene.add(new THREE.AmbientLight(0x333333));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 50, Math.PI / 4, 0.5);
    spotLight.position.set(15, 20, 10);
    scene.add(spotLight);

    // Motion state
    const velocity = new THREE.Vector3(0.02, 0.02, 0.02);
    let hoverT = 0;
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // If paused: skip state updates but still render
      if (!pausedRef.current) {
        hoverT += 0.02;
        body.position.y = Math.sin(hoverT) * 0.5;

        body.position.add(velocity);
        const xBound = window.innerWidth / 100;
        const yBound = window.innerHeight / 100;
        if (body.position.x > xBound || body.position.x < -xBound) velocity.x *= -1;
        if (body.position.y > yBound || body.position.y < -yBound) velocity.y *= -1;
        if (body.position.z > 6 || body.position.z < -6) velocity.z *= -1;

        body.rotation.y += 0.005;

        lights.forEach((light, index) => {
          const time = performance.now() * 0.001 + index;
          const c1 = new THREE.Color(0x6495ed);
          const c2 = new THREE.Color(0x6a5acd);
          const lerp = (Math.sin(time) + 1) / 2;
          const emissiveColor = new THREE.Color().lerpColors(c1, c2, lerp);
          light.material.emissive.copy(emissiveColor);
          light.material.emissiveIntensity = 2 + Math.sin(time);
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);

      scene.remove(body);
      currentRef?.contains(renderer.domElement) &&
        currentRef.removeChild(renderer.domElement);

      ufoBodyGeometry.dispose();
      cockpitGeometry.dispose();
      cockpitDetailGeometry.dispose();
      lightGeometry.dispose();
      bodyMaterial.dispose();
      cockpitMaterial.dispose();
      cockpitDetailMaterial.dispose();
      lightMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
};

export default UFO;
