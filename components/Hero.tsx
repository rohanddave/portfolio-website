"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Profile } from "@/types";
import TypeWriter from "@/components/TypeWriter";
import { useParallaxScroll } from "@/hooks/useScrollAnimation";
import * as THREE from "three";

function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x525252,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create torus knot
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x404040,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusKnot);

    // Create icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x525252,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(2, 1, -1);
    scene.add(icosahedron);

    // Create ring
    const ringGeometry = new THREE.TorusGeometry(1.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x404040,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(-1, -1, -2);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate objects
      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.15;

      icosahedron.rotation.x = elapsedTime * 0.2;
      icosahedron.rotation.y = elapsedTime * 0.1;

      ring.rotation.z = elapsedTime * 0.1;

      // Particles follow mouse
      particlesMesh.rotation.x += mouseRef.current.y * 0.0005;
      particlesMesh.rotation.y += mouseRef.current.x * 0.0005;

      // Camera follows mouse slightly
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y +=
        (mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

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

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useParallaxScroll();

  useEffect(() => {
    getProfileData();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getProfileData = async () => {
    const response = await fetch("/data/profile.json");
    const data = await response.json();
    setProfile(data);
  };

  if (!profile) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-between gap-8 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Content */}
      <div
        className={`flex-1 max-w-lg space-y-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {profile.name}
          </h1>
          <h2 className="text-xl text-neutral-600 dark:text-neutral-400 font-light">
            <TypeWriter text={profile.openToRoles} />
          </h2>
        </div>

        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
          {profile.summary}
        </p>

        <div className="flex gap-3 pt-2">
          <Link
            href={profile.links.resume}
            className="px-6 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-md transition-all duration-150 hover:scale-[1.02] text-sm font-medium"
          >
            Resume
          </Link>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div
        className={`hidden lg:block w-[500px] h-[500px] flex-shrink-0 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <HeroCanvas />
      </div>
    </section>
  );
}
