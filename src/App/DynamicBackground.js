import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DynamicBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, document.body.scrollHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    renderer.setClearColor(0x000011, 1);

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const particleData = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particleData[i] = (Math.random() - 0.5) * 50;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particleData, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    const spaceshipGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);
    const spaceshipMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const spaceships = [];

    for (let i = 0; i < 3; i++) {
      const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial.clone());
      spaceship.rotation.x = Math.PI / 2;
      spaceship.position.set(-5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
      spaceships.push(spaceship);
      scene.add(spaceship);
      console.log(`Spaceship ${i} position:`, spaceship.position);
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    let spaceshipTimers = [0, 5, 10];

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      particleMaterial.size = 0.1 + 0.05 * Math.sin(Date.now() * 0.001);
      particleMaterial.opacity = 0.8 + 0.2 * Math.sin(Date.now() * 0.001);

      particleSystem.rotation.x += mouseY * 0.005;
      particleSystem.rotation.y += mouseX * 0.005;

      spaceships.forEach((spaceship, index) => {
        spaceshipTimers[index] += 0.01;
        if (spaceshipTimers[index] >= 15) {
          spaceshipTimers[index] = 0;
          spaceship.position.x = -5;
          spaceship.position.y = Math.random() * 5 - 2.5;
          spaceship.position.z = Math.random() * 5 - 2.5;
          spaceship.material.color.set(getRandomColor());
        }
        spaceship.position.x += 0.02;
        spaceship.rotation.z += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = document.body.scrollHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', onMouseMove);
      currentRef.removeChild(renderer.domElement);
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
        pointerEvents: 'none'
      }}
    />
  );
};

export default DynamicBackground;