import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeartCanvas3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Heart Geometry
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = {
      depth: 3,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 1.5,
      bevelThickness: 1.5
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    const material = new THREE.MeshPhongMaterial({
      color: 0xd81b60,
      emissive: 0x4a001a,
      shininess: 90,
      specular: 0xffb2bf
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.rotation.x = Math.PI; // Flip upright
    heartMesh.scale.set(0.7, 0.7, 0.7);
    scene.add(heartMesh);

    // Lighting
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 15, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfd6c9c, 0.8);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0xfff8f7, 0.6);
    scene.add(ambientLight);

    let animId;
    function animate(t) {
      heartMesh.rotation.y += 0.012;
      heartMesh.position.y = Math.sin(t * 0.002) * 0.8;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 sm:h-80 relative flex items-center justify-center cursor-pointer group"
    >
      <div className="absolute inset-0 bg-[#fd6c9c]/15 blur-3xl rounded-full scale-75 animate-pulse" />
    </div>
  );
}
