"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 8, 20);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting - brighter for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x888888, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xaaaaaa, 0.6, 100);
    pointLight3.position.set(0, -5, 3);
    scene.add(pointLight3);

    // Enhanced particles with varying sizes
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 12;
      sizes[i] = Math.random() * 0.03 + 0.01;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x999999,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Main centerpiece - Larger Dodecahedron with phong material
    const mainGeometry = new THREE.DodecahedronGeometry(1.8, 0);
    const mainMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      shininess: 100,
      emissive: 0x222222,
    });
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    scene.add(mainMesh);

    // Inner rotating sphere
    const innerGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x999999,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      emissive: 0x333333,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Orbiting ring systems - more visible
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.TorusGeometry(
        2.2 + i * 0.4,
        0.025,
        16,
        100
      );
      const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.5 - i * 0.08,
        shininess: 80,
        emissive: 0x111111,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 4 + i * 0.3;
      ring.rotation.y = i * 0.6;
      rings.push(ring);
      scene.add(ring);
    }

    // Floating geometric shapes - larger and more visible
    const shapes: THREE.Mesh[] = [];

    // Icosahedron
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshPhongMaterial({
        color: 0x888888,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        emissive: 0x222222,
      })
    );
    ico.position.set(3.5, 2, -2);
    shapes.push(ico);
    scene.add(ico);

    // Octahedron
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.MeshPhongMaterial({
        color: 0x777777,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        emissive: 0x222222,
      })
    );
    octa.position.set(-3, -2, -1.5);
    shapes.push(octa);
    scene.add(octa);

    // Tetrahedron
    const tetra = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        emissive: 0x222222,
      })
    );
    tetra.position.set(-2, 2.5, -3);
    shapes.push(tetra);
    scene.add(tetra);

    // Additional cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshPhongMaterial({
        color: 0x777777,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        emissive: 0x222222,
      })
    );
    cube.position.set(2, -2.5, -2.5);
    shapes.push(cube);
    scene.add(cube);

    // Mouse move handler with smoother interpolation
    const handleMouseMove = (event: MouseEvent) => {
      targetRotationRef.current.x = (event.clientX / width) * 2 - 1;
      targetRotationRef.current.y = -(event.clientY / height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x +=
        (targetRotationRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (targetRotationRef.current.y - mouseRef.current.y) * 0.05;

      // Main mesh rotation - faster and more visible
      mainMesh.rotation.x = elapsedTime * 0.15 + mouseRef.current.y * 0.5;
      mainMesh.rotation.y = elapsedTime * 0.2 + mouseRef.current.x * 0.5;
      mainMesh.rotation.z = elapsedTime * 0.1;

      // Floating effect - more pronounced
      mainMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.25;

      // Pulsing scale effect
      const pulseScale = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
      mainMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Inner mesh - counter rotation
      innerMesh.rotation.x = -elapsedTime * 0.25;
      innerMesh.rotation.y = elapsedTime * 0.3;
      innerMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.25;

      // Orbiting rings - more dramatic
      rings.forEach((ring, index) => {
        ring.rotation.x += 0.003 * (index + 1);
        ring.rotation.y += 0.004 * (index + 1);
        ring.rotation.z = Math.sin(elapsedTime * 0.5 + index) * 0.3;

        // Pulsing rings
        const ringPulse = 1 + Math.sin(elapsedTime * 2 + index * 0.5) * 0.03;
        ring.scale.set(ringPulse, ringPulse, ringPulse);
      });

      // Floating shapes - much more visible
      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * (0.3 + index * 0.1);
        shape.rotation.y = elapsedTime * (0.25 + index * 0.08);
        shape.rotation.z = elapsedTime * (0.2 + index * 0.05);

        // Orbital movement
        const angle = elapsedTime * (0.5 + index * 0.2);
        shape.position.x += Math.cos(angle) * 0.005;
        shape.position.y += Math.sin(elapsedTime * (0.8 + index * 0.2)) * 0.01;
        shape.position.z += Math.sin(angle) * 0.005;
      });

      // Particles rotation with mouse influence - more responsive
      particlesMesh.rotation.x += 0.0005 + mouseRef.current.y * 0.0003;
      particlesMesh.rotation.y += 0.0007 + mouseRef.current.x * 0.0003;

      // Camera movement
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y +=
        (mouseRef.current.y * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Pulsing lights - more dramatic
      pointLight1.intensity = 1.5 + Math.sin(elapsedTime * 2.5) * 0.5;
      pointLight2.intensity = 0.8 + Math.sin(elapsedTime * 3) * 0.3;
      pointLight3.intensity = 0.6 + Math.sin(elapsedTime * 2) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
