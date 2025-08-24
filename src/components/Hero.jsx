import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import "../styles/hero.css";

const Hero = () => {
  const mountRef = useRef(null);
  const h1TopRef = useRef(null);
  const h1BottomRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0.2, 0.2, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    // lights
    const amb = new THREE.AmbientLight(0xffffff, 0.28);
    const key = new THREE.PointLight(0x64ffda, 1.45, 40);
    key.position.set(6, 6, 8);
    const rim = new THREE.PointLight(0x0fd0ff, 1.1, 40);
    rim.position.set(-6, -2.5, 5);
    scene.add(amb, key, rim);

    // glossy torus knot
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a3c4a"),
      metalness: 0.4,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      sheen: 1,
      sheenColor: new THREE.Color("#64FFDA"),
      envMapIntensity: 1.2,
      emissive: new THREE.Color("#0ad8ff"),
      emissiveIntensity: 0.16,
    });
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.44, 240, 36);
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.5, -0.2, 0);
    scene.add(knot);

    // faint stars
    const starN = 500;
    const starPos = new Float32Array(starN * 3);
    for (let i = 0; i < starN * 3; i++) starPos[i] = (Math.random() - 0.5) * 22;
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(starPos, 3)
      ),
      new THREE.PointsMaterial({ size: 0.015, color: 0x9bdff3, transparent: true, opacity: 0.5 })
    );
    scene.add(stars);

    // responsiveness: keep object inside its column on all widths
    const fit = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      // move camera a bit further back on very wide screens and closer on phones
      // t: 0 (mobile) -> 1 (xl)
      const t = Math.min(1, Math.max(0, (w - 360) / 900));
      camera.position.z = 6.8 - 1.6 * t; // 6.8 on phones, ~5.2 on xl

      // scale knot accordingly so it doesn't crash into text
      const s = 0.95 + 0.25 * t;
      knot.scale.setScalar(s);
    };
    fit();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    const tick = () => {
      knot.rotation.x += reduced ? 0.001 : 0.0032;
      knot.rotation.y += reduced ? 0.0012 : 0.004;
      stars.rotation.y -= 0.0008;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // gentle parallax scoped to canvas (smaller on mobile)
    const onPointerMove = (e) => {
      if (reduced) return;
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const amp = rect.width < 640 ? 0.35 : 0.7; // mobile vs desktop amplitude
      gsap.to(camera.position, { x: nx * amp, y: ny * amp * 0.85, duration: 0.6, ease: "power2.out" });
    };
    mount.addEventListener("pointermove", onPointerMove);

    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // copy entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(h1TopRef.current, { y: 24, opacity: 0, duration: 0.7 })
      .from(h1BottomRef.current, { y: 22, opacity: 0, duration: 0.7 }, "-=0.35")
      .from(bodyRef.current, { y: 16, opacity: 0, duration: 0.6 }, "-=0.25");
  }, []);

  return (
    <section
      id="hero"
      className="
        hero-wrap relative isolate
        pt-28 md:pt-32                /* leaves room under sticky nav */
        scroll-mt-24 md:scroll-mt-28
      "
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 pb-10 md:pb-20 grid md:grid-cols-12 gap-10 items-center">
        {/* LEFT – text */}
        <div className="hero-copy md:col-span-7 order-1">
          <h1 className="leading-[1.05] tracking-tight">
            <span
              ref={h1TopRef}
              className="block text-white text-[44px] sm:text-6xl md:text-7xl font-extrabold"
            >
              I’m Iren,
            </span>
            <span
              ref={h1BottomRef}
              className="block text-brand text-[44px] sm:text-6xl md:text-7xl font-extrabold"
            >
              Full-Stack Developer.
            </span>
          </h1>

          <p
            ref={bodyRef}
            className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed text-slate-300"
          >
            Based in Montreal, Canada, passionate about building{" "}
            <span className="brand-underline">scalable, high-impact products</span>. I’ve contributed
            to <span className="brand-underline">major enterprise feature launches</span>, powering
            millions of transactions and operations worldwide.
          </p>
        </div>

        {/* RIGHT – canvas (goes below text on mobile) */}
        <div className="relative md:col-span-5 order-2 md:order-none overflow-hidden">
          <div aria-hidden className="hero-glow" />
          <div ref={mountRef} className="hero-canvas" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
