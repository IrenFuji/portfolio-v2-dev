import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const Hero = () => {
  const mountRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // ---- THREE.JS (right column canvas) ----
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.PointLight(0x6d5fff, 2, 30);
    key.position.set(5, 4, 6);
    const fill = new THREE.PointLight(0x00e0ff, 1.4, 30);
    fill.position.set(-6, -2, 4);
    scene.add(key, fill);

    // Mesh
    const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x2630a5,
      metalness: 0.45,
      roughness: 0.25,
      emissive: 0x2930ff,
      emissiveIntensity: 0.22,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Particles
    const count = 450;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 18;
    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      ),
      new THREE.PointsMaterial({
        size: 0.015,
        color: 0x8aa1ff,
        transparent: true,
        opacity: 0.6,
      })
    );
    scene.add(particles);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    const render = () => {
      mesh.rotation.x += prefersReduced ? 0.001 : 0.0035;
      mesh.rotation.y += prefersReduced ? 0.0012 : 0.0045;
      particles.rotation.y -= 0.0008;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    // Parallax scoped to canvas
    const onPointerMove = (e) => {
      if (prefersReduced) return;
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(camera.position, {
        x: nx * 0.6,
        y: ny * 0.6,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    mount.addEventListener("pointermove", onPointerMove);

    // Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // ---- GSAP ENTRANCE ----
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(titleRef.current, { y: 20, opacity: 0, duration: 0.8 })
      .from(subtitleRef.current, { y: 12, opacity: 0, duration: 0.7 }, "-=0.3");
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate scroll-mt-24 md:scroll-mt-28"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 min-h-[70vh] grid md:grid-cols-12 items-center gap-10">
        {/* LEFT: copy */}
        <div className="md:col-span-7 text-left">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.08]
                       text-slate-900 dark:text-white tracking-tight"
          >
            Hello, I’m{" "}
            <span className="bg-gradient-to-r from-brand via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-neon">
              Iren
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-5 max-w-xl text-base sm:text-lg md:text-xl
                       text-slate-600 dark:text-slate-300"
          >
            Full-stack developer blending{" "}
            <span className="font-semibold">creative flair</span> with{" "}
            <span className="font-semibold">solid engineering</span>—building
            fast, accessible, modern experiences.
          </p>
        </div>

        {/* RIGHT: 3D canvas */}
        <div className="md:col-span-5 relative">
          {/* soft glow behind canvas */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[2rem]
                       bg-gradient-to-br from-brand/25 via-cyan-300/10 to-transparent blur-2xl"
          />
          <div
            ref={mountRef}
            className="relative h-[38vh] sm:h-[44vh] md:h-[60vh] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
