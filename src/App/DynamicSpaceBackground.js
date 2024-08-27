import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DynamicSpaceBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, document.body.scrollHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const particleData = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particleData[i] = (Math.random() - 0.5) * 25;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(particleData, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xAAAAAA, size: 0.02 });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += mouseY * 0.005;
      particleSystem.rotation.y += mouseX * 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = document.body.scrollHeight;
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