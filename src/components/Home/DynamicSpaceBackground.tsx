// app/DynamicSpaceBackground.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { isPaused?: boolean };

export default function DynamicSpaceBackground({ isPaused = false }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.BufferGeometry | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    // Particles
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = Math.random() * -200;

      velocities[i] = Math.random() * 0.2 + 0.1;

      const colorChoice = Math.floor(Math.random() * 4);
      if (colorChoice === 0) {
        colors[i * 3] = 100 / 255;
        colors[i * 3 + 1] = 149 / 255;
        colors[i * 3 + 2] = 237 / 255;
      } else if (colorChoice === 1) {
        colors[i * 3] = 35 / 255;
        colors[i * 3 + 1] = 57 / 255;
        colors[i * 3 + 2] = 91 / 255;
      } else if (colorChoice === 2) {
        colors[i * 3] = 26 / 255;
        colors[i * 3 + 1] = 46 / 255;
        colors[i * 3 + 2] = 74 / 255;
      } else {
        colors[i * 3] = 106 / 255;
        colors[i * 3 + 1] = 90 / 255;
        colors[i * 3 + 2] = 205 / 255;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.15 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    particlesRef.current = geometry;
    velocitiesRef.current = velocities;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animate
    const animate = () => {
      if (!isPaused && particlesRef.current && velocitiesRef.current) {
        const posAttr = particlesRef.current.getAttribute("position") as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const velArray = velocitiesRef.current;

        for (let i = 0; i < particleCount; i++) {
          posArray[i * 3 + 2] += velArray[i];
          if (posArray[i * 3 + 2] > 30) {
            posArray[i * 3 + 2] = Math.random() * -200;
            posArray[i * 3] = (Math.random() - 0.5) * 100;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
          }
        }

        points.rotation.x += mouseY * 0.005;
        points.rotation.y += mouseX * 0.005;

        (posAttr as any).needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Resize
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
      window.removeEventListener("mousemove", onMouseMove);
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);

      scene.remove(points);
      geometry.dispose();
      material.dispose();

      if (currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();

      particlesRef.current = null;
      velocitiesRef.current = null;
    };
  }, [isPaused]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
