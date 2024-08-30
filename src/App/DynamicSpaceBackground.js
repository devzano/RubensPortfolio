import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DynamicSpaceBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    const particles = new THREE.BufferGeometry();
    const particleCount = 3000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 2] = Math.random() * -200;

      particleVelocities[i] = Math.random() * 0.2 + 0.1;

      const colorChoice = Math.floor(Math.random() * 4);

      if (colorChoice === 0) {
        particleColors[i * 3] = 100 / 255;
        particleColors[i * 3 + 1] = 149 / 255;
        particleColors[i * 3 + 2] = 237 / 255;
      } else if (colorChoice === 1) {
        particleColors[i * 3] = 35 / 255;
        particleColors[i * 3 + 1] = 57 / 255;
        particleColors[i * 3 + 2] = 91 / 255;
      } else if (colorChoice === 2) {
        particleColors[i * 3] = 26 / 255;
        particleColors[i * 3 + 1] = 46 / 255;
        particleColors[i * 3 + 2] = 74 / 255;
      } else {
        particleColors[i * 3] = 106 / 255;
        particleColors[i * 3 + 1] = 90 / 255;
        particleColors[i * 3 + 2] = 205 / 255;
      }
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({ vertexColors: true, size: 0.15 });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particles.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += particleVelocities[i];

        if (positions[i * 3 + 2] > 30) {
          positions[i * 3 + 2] = Math.random() * -200;
          positions[i * 3] = (Math.random() - 0.5) * 100;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        }
      }

      particleSystem.rotation.x += mouseY * 0.005;
      particleSystem.rotation.y += mouseX * 0.005;

      particles.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      currentRef.removeChild(renderer.domElement);
      scene.remove(particleSystem);
      particles.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default DynamicSpaceBackground;