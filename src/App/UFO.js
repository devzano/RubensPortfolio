import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const UFO = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      'path/to/posx.jpg', 'path/to/negx.jpg',
      'path/to/posy.jpg', 'path/to/negy.jpg',
      'path/to/posz.jpg', 'path/to/negz.jpg'
    ]);
    scene.background = texture;

    const ufoBodyGeometry = new THREE.CylinderGeometry(3, 3, 0.7, 64);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.9,
      roughness: 0.2,
      envMap: texture
    });
    const body = new THREE.Mesh(ufoBodyGeometry, bodyMaterial);

    const cockpitGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const cockpitMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.4,
      opacity: 0.5,
      transparent: true,
      envMap: texture
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.y = 0.85;
    body.add(cockpit);

    const cockpitDetailGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
    const cockpitDetailMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.5,
      roughness: 0.7,
      envMap: texture
    });
    const cockpitDetail = new THREE.Mesh(cockpitDetailGeometry, cockpitDetailMaterial);
    cockpitDetail.rotation.x = Math.PI / 2;
    cockpitDetail.position.y = 0.85;
    body.add(cockpitDetail);

    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0x6495ED,
      emissive: 0x6A5ACD,
      emissiveIntensity: 3
    });

    const lights = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(Math.cos(angle) * 2.8, -0.35, Math.sin(angle) * 2.8);
      body.add(light);
      lights.push(light);
    }
    scene.add(body);
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 50, Math.PI / 4, 0.5);
    spotLight.position.set(15, 20, 10);
    scene.add(spotLight);

    camera.position.z = 12;
    let velocity = new THREE.Vector3(0.02, 0.02, 0.02);
    let hoverOffset = 0;
    let hoverDirection = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      hoverOffset += 0.005 * hoverDirection;
      if (hoverOffset > 0.5 || hoverOffset < -0.5) hoverDirection *= -1;
      body.position.y += hoverOffset;
      body.position.add(velocity);
      if (body.position.x > window.innerWidth / 100 || body.position.x < -window.innerWidth / 100) {
        velocity.x = -velocity.x;
      }
      if (body.position.y > window.innerHeight / 100 || body.position.y < -window.innerHeight / 100) {
        velocity.y = -velocity.y;
      }
      if (body.position.z > 6 || body.position.z < -6) {
        velocity.z = -velocity.z;
      }

      body.rotation.y += 0.005;
      lights.forEach((light, index) => {
        const time = Date.now() * 0.001 + index;
        const emissiveColor = new THREE.Color();
        emissiveColor.lerpColors(
          new THREE.Color(0x6495ED),
          new THREE.Color(0x6A5ACD),
          (Math.sin(time) + 1) / 2
        );
        light.material.emissive = emissiveColor;
        light.material.emissiveIntensity = 2 + Math.sin(time) * 1;
      });

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
      currentRef.removeChild(renderer.domElement);
      scene.remove(body);
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

export default UFO;