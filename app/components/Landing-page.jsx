"use client";

import { useEffect, useRef, useState, useCallback } from "react";


/* ─── DESIGN TOKENS ─────────────────────────────────────────────────── */
const LIME = "#aff518";
const DARK = "#1C1C1C";
const BG = "#F5F4EB";
const ALT = "#EEEDE3";

/* ─── SVG ICON LIBRARY (no emojis) ─────────────────────────────────── */
const Icon = {
  Shield: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Server: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Users: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Lock: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Zap: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  RefreshCw: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  Ban: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  AlertTriangle: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  CreditCard: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  TrendingDown: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  Scissors: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  EyeOff: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  MessageSquare: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  Package: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  TrendingUp: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Target: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Film: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  CheckCircle: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  BarChart2: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Globe: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Mail: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MousePointer: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  ),
  Heart: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Scale: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M3 6l9-3 9 3" />
      <path d="M3 18l9 3 9-3" />
      <path d="M3 6c0 3.314 2.686 6 6 6s6-2.686 6-6" />
      <path d="M15 18c0 3.314 2.686 6 6 6" />
    </svg>
  ),
  Check: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Menu: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

/* ─── GSAP LOADER (dynamic import) ─────────────────────────────────── */
async function loadGSAP() {
  const [gsapMod, stMod] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
  const ScrollTrigger = stMod.ScrollTrigger || stMod.default;

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}

/* ─── THREE.JS HERO CANVAS ──────────────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let THREE;
    let renderer;
    let scene;
    let camera;
    let animId;
    let resizeHandler;
    let destroyed = false;

    let nodes = [];
    let nodeGeo;
    let nodeMat;

    let ring;
    let ring2;
    let ringGeo;
    let ringMat;
    let ring2Geo;
    let ring2Mat;

    let lineGeometry;
    let lineMaterial;
    let lineSegments;
    let linePositions;

    async function init() {
      THREE = await import("three");
      if (destroyed) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

      const setCanvasSize = () => {
        const w = canvas.offsetWidth || canvas.clientWidth || window.innerWidth;
        const h =
          canvas.offsetHeight || canvas.clientHeight || window.innerHeight;

        renderer.setSize(w, h, false);

        if (camera) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      };

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 5;

      setCanvasSize();

      const NODE_COUNT = 17;
      const MAX_DIST = 2.1;

      nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
      nodeMat = new THREE.MeshBasicMaterial({ color: 0xaff518 });

      for (let i = 0; i < NODE_COUNT; i++) {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);

        const x = (Math.random() - 0.5) * 12;
        const y = (Math.random() - 0.5) * 7;
        const z = (Math.random() - 0.5) * 3;

        mesh.position.set(x, y, z);

        mesh.userData = {
          vx: (Math.random() - 0.5) * 0.004,
          vy: (Math.random() - 0.5) * 0.004,
          ox: x,
          oy: y,
        };

        nodes.push(mesh);
        scene.add(mesh);
      }

      const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
      linePositions = new Float32Array(maxSegments * 2 * 3);

      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3),
      );
      lineGeometry.setDrawRange(0, 0);

      lineMaterial = new THREE.LineBasicMaterial({
        color: 0x1c1c1c,
        transparent: true,
        opacity: 0.12,
      });

      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      ringGeo = new THREE.TorusGeometry(1.4, 0.008, 6, 80);
      ringMat = new THREE.MeshBasicMaterial({
        color: 0xaff518,
        transparent: true,
        opacity: 0.18,
      });

      ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(3.5, -0.5, -1);
      scene.add(ring);

      ring2Geo = new THREE.TorusGeometry(0.8, 0.005, 6, 60);
      ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xaff518,
        transparent: true,
        opacity: 0.1,
      });

      ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.position.set(-4, 1.5, -0.5);
      scene.add(ring2);

      resizeHandler = () => {
        if (!renderer || !camera) return;
        setCanvasSize();
      };

      window.addEventListener("resize", resizeHandler);

      let lastFrameTime = 0;
      const FPS = 30;
      const FRAME_INTERVAL = 1000 / FPS;

      function animate(now = 0) {
        if (destroyed) return;

        animId = requestAnimationFrame(animate);

        // ✅ 60fps ke badle 30fps: smooth bhi rahega aur CPU/GPU kam use hoga
        if (now - lastFrameTime < FRAME_INTERVAL) return;
        lastFrameTime = now;

        if (ring) {
          ring.rotation.z += 0.003;
          ring.rotation.x += 0.001;
        }

        if (ring2) {
          ring2.rotation.z -= 0.002;
        }

        nodes.forEach((n) => {
          n.position.x += n.userData.vx;
          n.position.y += n.userData.vy;

          if (Math.abs(n.position.x - n.userData.ox) > 1.2) {
            n.userData.vx *= -1;
          }

          if (Math.abs(n.position.y - n.userData.oy) > 0.8) {
            n.userData.vy *= -1;
          }
        });

        // ✅ Existing buffer update hoga, new object create nahi hoga
        let segmentIndex = 0;

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = nodes[i].position.distanceTo(nodes[j].position);

            if (d < MAX_DIST) {
              const a = nodes[i].position;
              const b = nodes[j].position;

              const offset = segmentIndex * 6;

              linePositions[offset] = a.x;
              linePositions[offset + 1] = a.y;
              linePositions[offset + 2] = a.z;

              linePositions[offset + 3] = b.x;
              linePositions[offset + 4] = b.y;
              linePositions[offset + 5] = b.z;

              segmentIndex++;
            }
          }
        }

        lineGeometry.setDrawRange(0, segmentIndex * 2);
        lineGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();
    }

    init();

    return () => {
      destroyed = true;

      if (animId) {
        cancelAnimationFrame(animId);
      }

      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }

      if (lineGeometry) lineGeometry.dispose();
      if (lineMaterial) lineMaterial.dispose();

      if (nodeGeo) nodeGeo.dispose();
      if (nodeMat) nodeMat.dispose();

      if (ringGeo) ringGeo.dispose();
      if (ringMat) ringMat.dispose();

      if (ring2Geo) ring2Geo.dispose();
      if (ring2Mat) ring2Mat.dispose();

      if (renderer) {
        renderer.dispose();
      }

      nodes = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ─── ANIMATED COUNTER ──────────────────────────────────────────────── */
function CountUp({ to, prefix = "", suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(ease * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── MAGNETIC BUTTON ───────────────────────────────────────────────── */
function MagneticBtn({ href, children, style, className }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0) scale(1)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: "transform 0.25s cubic-bezier(.22,1,.36,1)",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

/* ─── REVEAL WRAPPER (IntersectionObserver) ─────────────────────────── */
function Reveal({ children, delay = 0, className = "", y = 36 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "-60px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── LABEL ──────────────────────────────────────────────────────────── */
function Label({ children }) {
  return (
    <span
      className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
      style={{ background: LIME, color: DARK }}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Why Us", href: "#positioning" },
    { label: "How It Works", href: "#solution" },
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Results", href: "#results" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(245,244,235,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #e2e0d4" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto  h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-1">
          <img
            src="/arrow_logo final.png"
            alt="PeptideScaling"
            className=" h-10  lg:h-15 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="text-[15px] lg:text-xl font-black tracking-tight"
              style={{ color: DARK }}
            >
              <span className="text-[15px] lg:text-xl font-normal tracking-tight pr-0.5">
                Peptide
              </span>
              <span style={{ color: "#c6e805" }}>Scaling</span>
            </span>
            <span
              className="text-[7px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: "grey" }}
            >
              Growth Marketing Agency
            </span>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium transition-all duration-200 hover:text-[#aff518] relative group"
              style={{ color: "#444" }}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: LIME }}
              />
            </a>
          ))}
        </nav>
        <MagneticBtn
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
          style={{ background: LIME, color: DARK }}
        >
          Get In Touch
          <Icon.ArrowRight className="w-3.5 h-3.5" />
        </MagneticBtn>

       <div className="lg:hidden flex items-center gap-2">
  <a
    href="/contact"
    className="flex items-center justify-center p-2 text-sm  font-semibold rounded-lg"
    style={{
      background: LIME,
      color: DARK,
      width:"auto"
    }}
  >
    Start Now
  </a>

  <button
    className="p-2"
    onClick={() => setOpen(!open)}
    aria-label="Menu"
  >
    {open ? (
      <Icon.X className="w-6 h-6" />
    ) : (
      <Icon.Menu className="w-6 h-6" />
    )}
  </button>
</div>
      </div>
      {open && (
        <div
          className="lg:hidden border-t px-6 py-5 flex flex-col gap-4"
          style={{ borderColor: "#e2e0d4", background: BG }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-semibold"
              onClick={() => setOpen(false)}
              style={{ color: DARK }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
            style={{ background: LIME, color: DARK }}
          >
            Get In Touch
            <Icon.ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const headRef = useRef(null);

  useEffect(() => {
    loadGSAP().then(({ gsap }) => {
      if (!headRef.current) return;
      const words = headRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 40, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    });
  }, []);

  const stats = [
    {
      value: 150,
      prefix: "$",
      suffix: "k /mo",
      label: "RUO Brand revenue",
      sub: "from $20k in 30 days",
    },
    {
      value: 270,
      prefix: "$",
      suffix: "k+ /mo",
      label: "Medspa Clinic revenue",
      sub: "from $160k in 30 days",
      dark: true,
    },
    {
      value: 0,
      prefix: "",
      suffix: " blackout",
      label: "Decentralized structure",
      sub: "No single point of failure",
      text: "Zero",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden"
      style={{ background: BG }}
    >
      <HeroCanvas />

      {/* Gradient overlay so text reads clearly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(245,244,235,0.85) 0%, rgba(245,244,235,0.4) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Reveal delay={0}>
          <Label>Growth Marketing Agency</Label>
        </Reveal>

        <h1
          ref={headRef}
          className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-black leading-[1.06] tracking-tight mb-6 overflow-hidden"
          style={{ color: DARK }}
        >
          {"Do you run === a RUO peptide or".split(" ").map((w, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.22em]"
              style={{ opacity: 0 }}
            >
              {w}
            </span>
          ))}
          <br />
          {["Telehealth", "Peptide", "Clinic"].map((w, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.22em]"
              style={{ color: LIME, opacity: 0 }}
            >
              {w}
            </span>
          ))}
          {["business?"].map((w, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.22em]"
              style={{ opacity: 0 }}
            >
              {w}
            </span>
          ))}
        </h1>

        <Reveal delay={0.5}>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#555" }}
          >
            The only performance marketing agency built specifically for peptide
            brands and telehealth peptide clinics. The issues with ads are
            inevitable, but we have solutions.
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <MagneticBtn
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold"
              style={{
                background: LIME,
                color: DARK,
                boxShadow: "0 6px 28px rgba(175,245,24,0.35)",
              }}
            >
              Get In Touch
              <Icon.ArrowRight className="w-4 h-4" />
            </MagneticBtn>
            <MagneticBtn
              href="#solution"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold border-2"
              style={{ borderColor: DARK, color: DARK }}
            >
              See How It Works
            </MagneticBtn>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={0.8}>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl overflow-hidden border"
            style={{ borderColor: "#e2e0d4" }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-8 py-7 flex flex-col items-center text-center relative group"
                style={{
                  background: s.dark ? DARK : "#fff",
                  borderRight: i < 2 ? "1px solid #e2e0d4" : "none",
                }}
              >
                {/* Lime accent line animates on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: LIME }}
                />
                <div className="mb-2">
                  {i < 2 ? (
                    <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                      <polyline
                        points="2,18 8,11 14,14 22,5 32,2"
                        stroke={LIME}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="32" cy="2" r="3" fill={LIME} />
                    </svg>
                  ) : (
                    <Icon.CheckCircle
                      className="w-6 h-6"
                      style={{ color: DARK }}
                    />
                  )}
                </div>
                <span
                  className="text-2xl sm:text-3xl font-black mb-1 tracking-tight"
                  style={{ color: s.dark ? LIME : DARK }}
                >
                  {s.text ?? (
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  )}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: s.dark ? "#ccc" : "#555" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: s.dark ? "#888" : "#999" }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Platform strip */}
        <Reveal delay={1.0}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase"
              style={{ color: "#bbb" }}
            >
              Channels we operate on
            </p>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {[
                {
                  label: "Meta Ads",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                    </svg>
                  ),
                },
                {
                  label: "Google Ads",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="black"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Email & CRM",
                  icon: <Icon.Mail className="w-4 h-4" />,
                },
                {
                  label: "Website CRO",
                  icon: <Icon.MousePointer className="w-4 h-4" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 opacity-35 hover:opacity-70 transition-opacity duration-300"
                  style={{ color: DARK }}
                >
                  {item.icon}
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   POSITIONING
═══════════════════════════════════════════════════════════════════════ */
function Positioning() {
  const [activeSlide, setActiveSlide] = useState(0);

  const cols = [
    {
      Icon: Icon.Shield,
      title: "Compliant by design",
      body: "Every campaign built within platform policy correct wording, right disclaimers, right structure. Sustainable growth, not a ticking clock.",
      stat: "100%",
      statLabel: "Policy-compliant",
    },
    {
      Icon: Icon.Layers,
      title: "Infrastructure, not luck",
      body: "Multiple Business Managers. Multiple agency-tier accounts. Restrictions don't stop campaigns they're absorbed.",
      stat: "0",
      statLabel: "Single points of failure",
    },
    {
      Icon: Icon.Users,
      title: "For both models",
      body: "RUO research brands and licensed medspa OR telehealth clinics. We know the rules for each, and build accordingly.",
      stat: "2",
      statLabel: "Business models covered",
    },
  ];

  // Touch swipe support
  const touchStart = useRef(null);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setActiveSlide((p) => Math.min(p + 1, cols.length - 1));
    if (diff < -40) setActiveSlide((p) => Math.max(p - 1, 0));
    touchStart.current = null;
  };

  return (
    <section
      id="positioning"
      className="py-24 px-6"
      style={{ background: ALT }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Label>Built Differently</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            A real system that scales.
          </h2>
        </Reveal>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {cols.map((c, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="p-8 rounded-2xl h-full border group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#c6e805]"
                style={{ background: "#fff", borderColor: "#e2e0d4" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: LIME, color: DARK }}
                >
                  <c.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: DARK }}>
                  {c.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#666" }}
                >
                  {c.body}
                </p>
                <div
                  className="pt-4 border-t flex items-end gap-2"
                  style={{ borderColor: "#f0efe6" }}
                >
                  <span className="text-3xl font-black" style={{ color: LIME }}>
                    {c.stat}
                  </span>
                  <span className="text-xs pb-1" style={{ color: "#999" }}>
                    {c.statLabel}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {cols.map((c, i) => (
                <div
                  key={i}
                  className="min-w-full p-8 rounded-2xl border"
                  style={{ background: "#fff", borderColor: "#e2e0d4" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: LIME, color: DARK }}
                  >
                    <c.Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: DARK }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#666" }}
                  >
                    {c.body}
                  </p>
                  <div
                    className="pt-4 border-t flex items-end gap-2"
                    style={{ borderColor: "#f0efe6" }}
                  >
                    <span
                      className="text-3xl font-black"
                      style={{ color: LIME }}
                    >
                      {c.stat}
                    </span>
                    <span className="text-xs pb-1" style={{ color: "#999" }}>
                      {c.statLabel}button
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {cols.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeSlide ? LIME : "#ccc",
                  width: i === activeSlide ? "20px" : "8px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Start Now button */}
        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <MagneticBtn
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold"
              style={{
                background: LIME,
                color: DARK,
                boxShadow: "0 6px 28px rgba(198,232,5,0.3)",
              }}
            >
              Start Now
              <Icon.ArrowRight className="w-4 h-4" />
            </MagneticBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAIN POINTS
═══════════════════════════════════════════════════════════════════════ */
function PainPoints() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setActiveSlide((p) => Math.min(p + 1, pains.length - 1));
    if (diff < -40) setActiveSlide((p) => Math.max(p - 1, 0));
    touchStart.current = null;
  };

  const pains = [
    {
      Icon: Icon.Ban,
      title: "Ad accounts banned overnight",
      body: "No warning. No clear reason. Revenue stops and the appeals process goes nowhere. Most brands rebuild, relaunch, and hit the same wall within weeks.",
    },
    {
      Icon: Icon.AlertTriangle,
      title: "One Business Manager takes everything",
      body: "A single BM restriction kills every account, page, pixel, and campaign inside it. One flag is all it takes.",
    },
    {
      Icon: Icon.CreditCard,
      title: "Payment processors drop you mid-campaign",
      body: "Stripe, PayPal, and most mainstream processors terminate peptide brands without notice. Frozen funds, broken checkout, disrupted spend.",
    },
    {
      Icon: Icon.TrendingDown,
      title: "Invisible spend ceilings",
      body: "Risk scoring limits how fast you can scale — silently, with no explanation. Brands hit walls they can't see and don't know how to break through.",
    },
    {
      Icon: Icon.Scissors,
      title: "Copy and creative pulled before anyone sees it",
      body: "Health claims, performance language, wrong structure all trigger instant rejection. Getting ads approved requires a specific framework, not generic advice.",
    },
    {
      Icon: Icon.EyeOff,
      title: "Optimizing on data that doesn't exist",
      body: "Browser pixels miss large portions of conversions because of iOS and ad blockers. Without server-side tracking, Meta learns from incomplete signals.",
    },
  ];

  const PainCard = ({ p, i, alwaysOpen = false }) => {
    const isOpen = alwaysOpen || openIndex === i;
    return (
      <div
        onClick={() => !alwaysOpen && setOpenIndex(openIndex === i ? null : i)}
        className="p-7 rounded-2xl border h-full transition-all duration-300 hover:shadow-md"
        style={{
          background: "#fff",
          borderColor: isOpen ? "#e05555" : "#e2e0d4",
          cursor: alwaysOpen ? "default" : "pointer",
          boxShadow: isOpen ? "0 4px 20px rgba(220,50,50,0.08)" : "",
        }}
      >
        {/* Icon — red background */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{ background: "#fff0f0", color: "#dc3535" }}
        >
          <p.Icon className="w-5 h-5" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-bold text-base leading-snug"
            style={{ color: DARK }}
          >
            {p.title}
          </h3>
          {/* Expand chevron */}
          {!alwaysOpen && (
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
              style={{ background: isOpen ? "#dc3535" : ALT }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOpen ? "#fff" : "#888"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 transition-transform duration-300"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          )}
        </div>

        {/* Expandable body */}
        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{
            maxHeight: isOpen ? "200px" : "0px",
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? "10px" : "0px",
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
            {p.body}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="pain" className="py-20 px-6" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-6">
          <Label>The Real Problem</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ color: DARK }}
          >
            If you&apos;ve tried paid ads before,
            <br />
            you already know what happens.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#666" }}>
            This niche breaks standard ad accounts. It breaks standard agencies.
            Here&apos;s exactly how.
          </p>
        </Reveal>

        {/* Desktop — full width accordion list */}
        <div className="hidden md:flex flex-col gap-3 mt-14 ">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className=" p-4 mx-20 rounded-2xl border transition-all duration-300 cursor-pointer group"
                style={{
                  background: "#fff",
                  borderColor: openIndex === i ? "#dc3535" : "#e2e0d4",
                  boxShadow:
                    openIndex === i ? "0 4px 24px rgba(220,50,50,0.08)" : "",
                }}
              >
                {/* Row: icon + title + chevron */}
                <div className="flex items-center gap-5">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-600"
                    style={{
                      background: openIndex === i ? "#dc3535" : "#fff0f0",
                      color: openIndex === i ? "#fff" : "#dc3535",
                    }}
                  >
                    <p.Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3
                    className="flex-1  text-lg leading-snug"
                    style={{ color: DARK }}
                  >
                    {p.title}
                  </h3>

                  {/* Chevron */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-600"
                    style={{
                      background: openIndex === i ? "#dc3535" : ALT,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={openIndex === i ? "#fff" : "#888"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform:
                          openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Expandable body */}
                <div
                  className="overflow-hidden transition-all duration-400 ease-out"
                  style={{
                    maxHeight: openIndex === i ? "200px" : "0px",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p
                    className="text-base leading-relaxed pt-5 pl-17"
                    style={{ color: "#666", paddingLeft: "68px" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden mt-14">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {pains.map((p, i) => (
                <div key={i} className="min-w-full">
                  <PainCard p={p} i={i} alwaysOpen={true} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {pains.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveSlide(i)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: i === activeSlide ? "#dc3535" : "#ccc",
                  width: i === activeSlide ? "20px" : "8px",
                }}
              />
            ))}
          </div>

          {/* Slide counter */}
          <p className="text-center text-xs mt-3" style={{ color: "#aaa" }}>
            {activeSlide + 1} / {pains.length}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SOLUTION  (dark section with animated infra SVG)
═══════════════════════════════════════════════════════════════════════ */

// function InfraDiagram() {
//   const [active, setActive] = useState(null);

//   const nodes = [
//     {
//       id: "pixel",
//       x: 60,
//       y: 110,
//       label: "Pixel BM",
//       sub: "Protected",
//       color: LIME,
//     },
//     {
//       id: "hub",
//       x: 210,
//       y: 110,
//       label: "Central Hub",
//       sub: "CAPI Pipeline",
//       color: "#fff",
//     },
//     {
//       id: "a1",
//       x: 360,
//       y: 50,
//       label: "Agency Acct",
//       sub: "Active",
//       color: "rgba(255,255,255,0.7)",
//     },
//     {
//       id: "a2",
//       x: 360,
//       y: 110,
//       label: "Agency Acct",
//       sub: "Active",
//       color: "rgba(255,255,255,0.7)",
//     },
//     {
//       id: "a3",
//       x: 360,
//       y: 170,
//       label: "Agency Acct",
//       sub: "Backup Ready",
//       color: "rgba(255,255,255,0.5)",
//     },
//   ];

//   const edges = [
//     { from: "pixel", to: "hub", dashed: true, color: LIME },
//     { from: "hub", to: "a1", color: "rgba(255,255,255,0.25)" },
//     { from: "hub", to: "a2", color: "rgba(255,255,255,0.25)" },
//     { from: "hub", to: "a3", color: "rgba(255,255,255,0.15)" },
//   ];

//   const getNode = (id) => nodes.find((n) => n.id === id);

//   return (
//     <div
//       className="p-5 rounded-xl border mt-4"
//       style={{
//         background: "rgba(255,255,255,0.03)",
//         borderColor: "rgba(175,245,24,0.2)",
//       }}
//     >
//       <p
//         className="text-xs font-bold tracking-[0.12em] uppercase mb-4"
//         style={{ color: LIME }}
//       >
//         Infrastructure at a glance
//       </p>
//       <svg
//         viewBox="0 0 440 220"
//         fill="none"
//         className="w-full"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* edges */}
//         {edges.map((e, i) => {
//           const from = getNode(e.from),
//             to = getNode(e.to);
//           return (
//             <line
//               key={i}
//               x1={from.x + 55}
//               y1={from.y + 18}
//               x2={to.x - 4}
//               y2={to.y + 18}
//               stroke={e.color}
//               strokeWidth={e.dashed ? 1.5 : 1}
//               strokeDasharray={e.dashed ? "5 3" : "none"}
//             />
//           );
//         })}
//         {/* nodes */}
//         {nodes.map((n) => (
//           <g
//             key={n.id}
//             style={{ cursor: "pointer" }}
//             onClick={() => setActive(active === n.id ? null : n.id)}
//           >
//             <rect
//               x={n.x - 4}
//               y={n.y}
//               width={n.id === "hub" ? 68 : 62}
//               height={36}
//               rx="7"
//               fill={
//                 n.id === "pixel"
//                   ? "rgba(175,245,24,0.15)"
//                   : n.id === "hub"
//                     ? "rgba(255,255,255,0.08)"
//                     : "rgba(255,255,255,0.04)"
//               }
//               stroke={
//                 active === n.id
//                   ? LIME
//                   : n.id === "pixel"
//                     ? LIME
//                     : n.id === "hub"
//                       ? "rgba(175,245,24,0.4)"
//                       : "rgba(255,255,255,0.12)"
//               }
//               strokeWidth={active === n.id ? 1.5 : 1}
//             />
//             <text
//               x={n.x + (n.id === "hub" ? 30 : 27)}
//               y={n.y + 15}
//               textAnchor="middle"
//               fill={n.color}
//               fontSize="7"
//               fontWeight="700"
//             >
//               {n.label}
//             </text>
//             <text
//               x={n.x + (n.id === "hub" ? 30 : 27)}
//               y={n.y + 27}
//               textAnchor="middle"
//               fill="rgba(175,245,24,0.6)"
//               fontSize="5.5"
//             >
//               {n.sub}
//             </text>
//           </g>
//         ))}
//         {/* Legend */}
//         <text x="10" y="210" fill="rgba(255,255,255,0.2)" fontSize="5.5">
//           Click nodes to highlight
//         </text>
//       </svg>
//     </div>
//   );
// }
/* ═══════════════════════════════════════════════════════════════════════
   Solution Section
═══════════════════════════════════════════════════════════════════════ */

function Solution() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openLayer, setOpenLayer] = useState(0);
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setActiveSlide((p) => Math.min(p + 1, layers.length - 1));
    if (diff < -40) setActiveSlide((p) => Math.max(p - 1, 0));
    touchStart.current = null;
  };

  const layers = [
    {
      Icon: Icon.Lock,
      title: "Pixel BM",
      body: "Dedicated BM holds your conversion pixel. Completely isolated from ad spend. Protected.",
    },
    {
      Icon: Icon.Zap,
      title: "Server-side event pipeline",
      body: "Custom backend tracking. Clean, accurate conversion signals sent directly to Meta.",
    },
    {
      Icon: Icon.Layers,
      title: "Multiple advertising BMs + agency accounts",
      body: "Spend split across accounts. No single account is the weak link.",
    },
    {
      Icon: Icon.RefreshCw,
      title: "Asset replacement on demand",
      body: "Profiles, pages, accounts, BMs — immediate access to replacements. No prolonged downtime.",
    },
  ];

  return (
    <section id="solution" className="py-24 px-6" style={{ background: DARK }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <Reveal>
            <span
              className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-5"
              style={{ background: LIME, color: DARK }}
            >
              How We Solve It
            </span>
            <h2
              className="text-4xl lg:text-5xl font-black tracking-tight mb-6"
              style={{ color: "#fff" }}
            >
              One ban can&apos;t stop everything.{" "}
              <span style={{ color: LIME }}>That&apos;s by design.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#bbb" }}
            >
              We built a decentralized ad infrastructure specifically for this
              niche. Multiple Business Managers. Multiple agency-tier ad
              accounts. Spend distributed so no single account carries enough
              volume to become a target.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#bbb" }}
            >
              If one account gets restricted, the structure keeps running. If a
              client arrives with everything banned, we have the assets to
              restart fast.
            </p>
            <div
              className="p-6 rounded-xl border-l-4"
              style={{
                background: "rgba(175,245,24,0.07)",
                borderLeftColor: LIME,
              }}
            >
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: "#ddd" }}
              >
                Server-side tracking is built into every client setup. A custom
                CAPI pipeline sends clean conversion signals directly to Meta
                bypassing iOS restrictions, ad blockers, and browser gaps. You
                optimize on real data, not estimates.
              </p>
            </div>
          </Reveal>

          {/* RIGHT SIDE */}
          <div>
            {/* Desktop — click to expand accordion */}
            <div className="hidden md:flex flex-col gap-3">
              {layers.map((l, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div
                    onClick={() => setOpenLayer(openLayer === i ? null : i)}
                    className="rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{
                      background:
                        openLayer === i
                          ? "rgba(198,232,5,0.08)"
                          : "rgba(255,255,255,0.04)",
                      borderColor:
                        openLayer === i ? LIME : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-center gap-4 p-5">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background:
                            openLayer === i ? LIME : "rgba(198,232,5,0.15)",
                          color: openLayer === i ? DARK : LIME,
                        }}
                      >
                        <l.Icon className="w-5 h-5" />
                      </div>
                      <h4
                        className="flex-1 font-bold text-sm"
                        style={{ color: "#fff" }}
                      >
                        {l.title}
                      </h4>
                      {/* Chevron */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background:
                            openLayer === i ? LIME : "rgba(255,255,255,0.08)",
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={openLayer === i ? DARK : "#888"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3.5 h-3.5 transition-transform duration-300"
                          style={{
                            transform:
                              openLayer === i
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable body */}
                    <div
                      className="overflow-hidden transition-all duration-400 ease-out"
                      style={{
                        maxHeight: openLayer === i ? "120px" : "0px",
                        opacity: openLayer === i ? 1 : 0,
                      }}
                    >
                      <p
                        className="text-xs leading-relaxed px-5 pb-5"
                        style={{ color: "#aaa", paddingLeft: "68px" }}
                      >
                        {l.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Platform logos */}
            <div
              className="mt-8 mb-5 p-5 rounded-xl border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                style={{ color: "#666" }}
              >
                Platforms we run on
              </p>
              <div className="flex items-center gap-8 flex-wrap">
                {/* Meta official */}
                <div className="flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path
                      d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"
                      fill="#aff518"
                    />
                  </svg>
                  <span className="text-sm font-bold" style={{ color: "#fff" }}>
                    Meta Ads
                  </span>
                </div>
                {/* Google official */}
                <div className="flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="#aff518"
                    />
                  </svg>
                  <span className="text-sm font-bold" style={{ color: "#fff" }}>
                    Google Ads
                  </span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <Icon.Mail className="w-6 h-6" style={{ color: LIME }} />
                  <span className="text-sm font-bold" style={{ color: "#fff" }}>
                    Email & CRM
                  </span>
                </div>
                {/* CRO */}
                <div className="flex items-center gap-3">
                  <Icon.MousePointer
                    className="w-6 h-6"
                    style={{ color: LIME }}
                  />
                  <span className="text-sm font-bold" style={{ color: "#fff" }}>
                    Website CRO
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile — swipe slider */}
            <div className="md:hidden">
              <div
                className="overflow-hidden rounded-xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-400 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {layers.map((l, i) => (
                    <div
                      key={i}
                      className="min-w-full p-6 rounded-xl border"
                      style={{
                        background: "rgba(198,232,5,0.08)",
                        borderColor: LIME,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ background: LIME, color: DARK }}
                      >
                        <l.Icon className="w-6 h-6" />
                      </div>
                      <h4
                        className="font-bold text-base mb-3"
                        style={{ color: "#fff" }}
                      >
                        {l.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#aaa" }}
                      >
                        {l.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {layers.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        i === activeSlide ? LIME : "rgba(255,255,255,0.2)",
                      width: i === activeSlide ? "20px" : "8px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Start Now CTA */}
        <div className="mt-12 flex justify-center">
          <MagneticBtn
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold"
            style={{
              background: LIME,
              color: DARK,
              boxShadow: "0 6px 28px rgba(198,232,5,0.25)",
            }}
          >
            Start Now
            <Icon.ArrowRight className="w-4 h-4" />
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOW IT WORKS  — horizontal process steps
═══════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      num: "01",
      Icon: Icon.MessageSquare,
      title: "Strategy Call",
      body: "We audit your current setup, understand your model (RUO or telehealth), and map out exactly what needs to be built or fixed.",
    },
    {
      num: "02",
      Icon: Icon.Server,
      title: "Infrastructure Build",
      body: "Decentralized BM setup, server-side CAPI pipeline, compliant landing pages, and agency-tier ad accounts — configured before anything goes live.",
    },
    {
      num: "03",
      Icon: Icon.Zap,
      title: "Warm-up & Launch",
      body: "Structured account warm-up, creative testing across multiple angles, compliance review on every asset — then full campaign launch.",
    },
    {
      num: "04",
      Icon: Icon.TrendingUp,
      title: "Scale & Protect",
      body: "Daily optimization, structured budget scaling, creative rotation, ongoing compliance monitoring. If anything gets restricted, we absorb it.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6"
      style={{ background: BG }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Label>The Process</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ color: DARK }}
          >
            From zero to scaling.
            <br />
            <span style={{ color: "#888" }}>Here&apos;s exactly how.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#666" }}>
            No guesswork. No generic playbook. A repeatable system built for
            this specific niche.
          </p>
        </Reveal>

        {/* Desktop: horizontal with animated connector */}

        <div className="hidden lg:block relative">
          {/* connector line */}
          <div
            className="absolute top-7 left-[12.5%] right-[12.5%] h-px"
            style={{
              background: `linear-gradient(90deg, ${LIME} 0%, rgba(175,245,24,0.15) 100%)`,
            }}
          />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.13}>
                <div className="flex flex-col items-center text-center group">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5 border-2 transition-all duration-300 group-hover:scale-110 relative z-10"
                    style={{
                      background: i === 0 ? LIME : "#fff",
                      borderColor: LIME,
                      color: i === 0 ? DARK : LIME,
                    }}
                  >
                    <s.Icon className="w-6 h-6" />
                  </div>
                  <span
                    className="text-xs font-black tracking-[0.15em] mb-2"
                    style={{ color: LIME }}
                  >
                    {s.num}
                  </span>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: DARK }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="flex lg:hidden flex-col gap-0 relative pl-8">
          <div
            className="absolute left-3 top-4 bottom-4 w-px"
            style={{
              background: `linear-gradient(180deg, ${LIME}, rgba(175,245,24,0.1))`,
            }}
          />
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative mb-10">
                <div
                  className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center border-2 top-1"
                  style={{
                    background: i === 0 ? LIME : "#fff",
                    borderColor: LIME,
                  }}
                >
                  <span
                    className="text-[9px] font-black"
                    style={{ color: i === 0 ? DARK : LIME }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div
                  className="p-6 rounded-2xl border"
                  style={{ background: "#fff", borderColor: "#e2e0d4" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: LIME, color: DARK }}
                    >
                      <s.Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-base" style={{ color: DARK }}>
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ASSETS
═══════════════════════════════════════════════════════════════════════ */
function Assets() {
  const cards = [
    {
      Icon: Icon.CheckCircle,
      title: "Compliant copy & creative that still converts",
      body: "Every ad and landing page built within a compliance framework for this niche. Right wording. Right disclaimers. Adjusted for RUO vs. clinical. Converts without getting pulled.",
    },
    {
      Icon: Icon.BarChart2,
      title: "Server-side tracking precise data, not estimates",
      body: "Every conversion captured and relayed to Meta via CAPI. Clean signals. Better algorithm learning. Real visibility on what's working.",
    },
  ];

  return (
    <section id="assets" className="py-18 px-6" style={{ background: ALT }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Label>The Unfair Advantages</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            Infrastructure and access most
            <br />
            brands can&apos;t build on their own.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2">
            <div
              className="p-10 rounded-2xl h-full border-2"
              style={{ background: DARK, borderColor: LIME }}
            >
              <span
                className="inline-block text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-5"
                style={{ background: LIME, color: DARK }}
              >
                Core Advantage
              </span>
              <h3
                className="text-2xl font-black mb-4"
                style={{ color: "#fff" }}
              >
                Agency-tier ad accounts
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#bbb" }}
              >
                We operate through a network of premium agency ad accounts
                deployed inside our decentralized structure and managed with
                techniques developed specifically for this niche.
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#bbb" }}
              >
                Structured warm-up protocols, deliberate campaign progression,
                and creative frameworks refined entirely inside the peptide and
                medspa space.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  "Greater resilience against policy flags and spend restrictions",
                  "Warm-up sequence before conversion campaigns launch",
                  "Creative frameworks that pass review without losing conversion",
                  "Configured correctly for RUO brands and licensed clinical/telehealth models",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: LIME }}
                    >
                      <Icon.Check className="w-3 h-3" style={{ color: DARK }} />
                    </div>
                    <span className="text-sm" style={{ color: "#ddd" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {cards.map((c, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div
                  className="p-7 rounded-2xl border h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#fff", borderColor: "#e2e0d4" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: LIME, color: DARK }}
                  >
                    <c.Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: DARK }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* Get In Touch CTA */}
        <Reveal delay={0.3}>
          <div className="text-center mt-8">
            <MagneticBtn
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold"
              style={{
                background: LIME,
                color: DARK,
                boxShadow: "0 6px 28px rgba(198,232,5,0.3)",
              }}
            >
              Get In Touch
              <Icon.ArrowRight className="w-4 h-4" />
            </MagneticBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════════════ */

function Services() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setActiveSlide((p) => Math.min(p + 1, others.length - 1));
    if (diff < -40) setActiveSlide((p) => Math.max(p - 1, 0));
    touchStart.current = null;
  };

  const meta = [
    {
      Icon: Icon.Target,
      title: "Funnel strategy",
      body: "Cold, warm, and retargeting audiences mapped before a single campaign launches. Every stage gets the right message, offer, and creative.",
    },
    {
      Icon: Icon.Film,
      title: "Creative production",
      body: "Static and video ads at scale AI-assisted and professional editing. Multiple angles tested. Consistent rotation to prevent fatigue.",
    },
    {
      Icon: Icon.CheckCircle,
      title: "Compliance management",
      body: "Every ad and landing page reviewed against our niche-specific framework before going live. We know what passes and how to adjust.",
    },
    {
      Icon: Icon.TrendingUp,
      title: "Daily management & scaling",
      body: "Active optimization every day budgets, audiences, creative rotation, structured scaling. Every decision backed by server-side data.",
    },
  ];

  const others = [
    {
      Icon: Icon.Globe,
      title: "Google Ads",
      sub: "The channel most peptide brands gave up on.",
      body: "We haven't. Proven techniques to get RUO brands running and scaling on Google Shopping and Search.",
      bullets: [
        "Google Merchant Center setup + Shopping feed management",
        "Search campaigns targeting high-intent buyers",
        "Specialized account configuration for health-adjacent categories",
      ],
    },
    {
      Icon: Icon.Mail,
      title: "Email & CRM",
      sub: "50–60% of your revenue lives here.",
      body: "Peptide brands with strong retention generate more than half their revenue from repeat buyers. That doesn't happen without deliberate CRM.",
      bullets: [
        "Welcome and post-purchase flows",
        "Reorder sequences timed to product consumption",
        "Win-back campaigns for lapsed customers",
        "Upsell and loyalty campaigns",
      ],
    },
    {
      Icon: Icon.MousePointer,
      title: "Website CRO",
      sub: "More from the traffic you're already paying for.",
      body: "We audit and improve key conversion points product pages, landing pages, checkout using real data from your server-side tracking setup.",
      bullets: [],
    },
  ];

  return (
    <section id="services" className="py-24 px-6" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Label>What We Do</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            Full-scope performance marketing.
            <br />
            <span style={{ color: LIME }}>Meta Ads</span> at the center.
          </h2>
        </Reveal>

        {/* Primary Service — bigger cards */}
        <Reveal>
          <div
            className="rounded-2xl border-2 p-8 mb-8"
            style={{ borderColor: LIME, background: "#fff" }}
          >
            <div className="mb-8">
              <span
                className="inline-block text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: LIME, color: DARK }}
              >
                Primary Service
              </span>
              <h3 className="text-2xl font-black" style={{ color: DARK }}>
                Meta Ads built for this niche, end to end.
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {meta.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl group transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col"
                  style={{ background: ALT }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: LIME, color: DARK }}
                  >
                    <s.Icon className="w-6 h-6" />
                  </div>
                  <h4
                    className="font-bold text-base mb-2"
                    style={{ color: DARK }}
                  >
                    {s.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Secondary services — desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {others.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="p-5 rounded-2xl border h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#fff", borderColor: "#e2e0d4" }}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "transparent",
                    border: `2px solid ${LIME}`,
                  }}
                >
                  <s.Icon className="w-6 h-6" style={{ color: LIME }} />
                </div>
                <h3 className="text-lg font-black mb-1" style={{ color: DARK }}>
                  {s.title}
                </h3>
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: LIME }}
                >
                  {s.sub}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#666" }}
                >
                  {s.body}
                </p>
                {s.bullets.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "#666" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ background: LIME }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Secondary services — mobile slider */}
        <div className="md:hidden">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {others.map((s, i) => (
                <div
                  key={i}
                  className="min-w-full p-8 rounded-2xl border"
                  style={{ background: "#fff", borderColor: "#e2e0d4" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center"
                    style={{
                      background: "transparent",
                      border: `2px solid ${LIME}`,
                    }}
                  >
                    <s.Icon className="w-6 h-6" style={{ color: LIME }} />
                  </div>
                  <h3
                    className="text-lg font-black mb-1"
                    style={{ color: DARK }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-3"
                    style={{ color: LIME }}
                  >
                    {s.sub}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "#666" }}
                  >
                    {s.body}
                  </p>
                  {s.bullets.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {s.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: "#666" }}
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ background: LIME }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {others.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveSlide(i)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: i === activeSlide ? LIME : "#ccc",
                  width: i === activeSlide ? "20px" : "8px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Start Now button */}
        <Reveal delay={0.2}>
          <div className="text-center mt-12">
            <MagneticBtn
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold"
              style={{
                background: LIME,
                color: DARK,
                boxShadow: "0 6px 28px rgba(198,232,5,0.3)",
              }}
            >
              Start Now
              <Icon.ArrowRight className="w-4 h-4" />
            </MagneticBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PACKAGES
═══════════════════════════════════════════════════════════════════════ */
function Packages() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 40) setActiveSlide((p) => Math.min(p + 1, pkgs.length - 1));
    if (diff < -40) setActiveSlide((p) => Math.max(p - 1, 0));
    touchStart.current = null;
  };

  const pkgs = [
    {
      badge: "Scale Program",
      title: "Scale what's already working.",
      for: "Established brands at $10k+/mo with product-market fit, ready to push growth without the infrastructure instability that's been limiting it.",
      items: [
        "Full Meta Ads strategy, creative, compliance, daily optimization",
        "Decentralized agency-tier infrastructure + server-side tracking setup",
        "Google Ads Shopping & Search",
        "Email & CRM retention, win-back, upsells",
        "Website CRO",
        "Full access to our partner network",
      ],
      cta: "Apply for Scale Program",
      highlight: true,
    },
    {
      badge: "Launch Program",
      title: "Build it right from the start.",
      for: "New brands entering the space, or existing brands rebuilding after bans, infrastructure failure, or the wrong agency.",
      items: [
        "Brand strategy and positioning",
        "Website conversion-optimized, compliance-ready",
        "Payment processor setup vetted and stable before day one",
        "Manufacturer and supplier introductions",
        "Full Meta Ads infrastructure + campaign launch",
        "Server-side tracking implementation",
        "Compliant creative production",
        "Email & CRM foundation",
        "Transition into Scale Program once targets are hit",
      ],
      cta: "Apply for Launch Program",
      highlight: false,
    },
  ];

  const PkgCard = ({ pkg }) => (
    <div
      className="p-4  lg:p-7 rounded-2xl border h-full flex flex-col transition-all duration-300"
      style={{
        background: pkg.highlight ? "#fff" : "rgba(255,255,255,0.04)",
        borderColor: pkg.highlight ? LIME : "rgba(255,255,255,0.1)",
        borderWidth: "2px",
      }}
    >
      <span
        className="inline-block text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-5 self-start"
        style={{
          background: pkg.highlight ? LIME : "rgba(175,245,24,0.12)",
          color: pkg.highlight ? DARK : LIME,
        }}
      >
        {pkg.badge}
      </span>
      <h3
        className="text-2xl font-black mb-3"
        style={{ color: pkg.highlight ? DARK : "#fff" }}
      >
        {pkg.title}
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: pkg.highlight ? "#666" : "#aaa" }}
      >
        {pkg.for}
      </p>
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {pkg.items.map((item, j) => (
          <li key={j} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: LIME }}
            >
              <Icon.Check className="w-3 h-3" style={{ color: DARK }} />
            </div>
            <span
              className="text-sm"
              style={{ color: pkg.highlight ? "#444" : "#ccc" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
      <MagneticBtn
        href="/contact"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm"
        style={
          pkg.highlight
            ? { background: DARK, color: "#fff" }
            : { background: LIME, color: DARK }
        }
      >
        {pkg.cta} <Icon.ArrowRight className="w-4 h-4" />
      </MagneticBtn>
    </div>
  );

  return (
    <section id="packages" className="py-24 px-6" style={{ background: DARK }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: LIME, color: DARK }}
          >
            Two Ways In
          </span>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ color: "#fff" }}
          >
            A path for where you are right now.
          </h2>
        </Reveal>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {pkgs.map((pkg, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <PkgCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {pkgs.map((pkg, i) => (
                <div key={i} className="min-w-full">
                  <PkgCard pkg={pkg} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {pkgs.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveSlide(i)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    i === activeSlide ? LIME : "rgba(255,255,255,0.2)",
                  width: i === activeSlide ? "20px" : "8px",
                }}
              />
            ))}
          </div>

          {/* Slide counter */}
          <p className="text-center text-xs mt-3" style={{ color: "#666" }}>
            {activeSlide + 1} / {pkgs.length}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   RESULTS  — animated bar charts + counters
═══════════════════════════════════════════════════════════════════════ */
function MiniBarChart({ fromK, toK }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const maxH = 64;
  const fromH = Math.round((fromK / toK) * maxH);

  return (
    <div ref={ref} className="flex items-end gap-3 my-4">
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-10 rounded-t-md overflow-hidden"
          style={{ height: maxH, background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-full rounded-t-md transition-all duration-1000 ease-out"
            style={{
              height: animated ? `${fromH}px` : "0px",
              background: "rgba(255,255,255,0.15)",
              marginTop: `${maxH - fromH}px`,
            }}
          />
        </div>
        <span className="text-xs" style={{ color: "#888" }}>
          ${fromK}k
        </span>
      </div>
      <div className="mb-6">
        <Icon.ArrowRight className="w-4 h-4" style={{ color: LIME }} />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-10 rounded-t-md overflow-hidden"
          style={{ height: maxH, background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-full rounded-t-md transition-all duration-1200 ease-out delay-300"
            style={{ height: animated ? `${maxH}px` : "0px", background: LIME }}
          />
        </div>
        <span className="text-xs font-bold" style={{ color: LIME }}>
          ${toK}k+
        </span>
      </div>
    </div>
  );
}

function RetentionBar() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs" style={{ color: "#888" }}>
          Repeat revenue
        </span>
        <span className="text-xs font-bold" style={{ color: LIME }}>
          50–60%
        </span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{
            width: animated ? "58%" : "0%",
            background: `linear-gradient(90deg, ${LIME}, rgba(175,245,24,0.6))`,
          }}
        />
      </div>
    </div>
  );
}

function Results() {
  const cards = [
    {
      tag: "RUO Brand • Meta Ads",
      headline: "$20,000 → $150,000 /mo",
      timeframe: "30 days",
      body: "Rebuilt from scratch after repeated bans. Decentralized structure. Compliant creative.",
      chart: <MiniBarChart fromK={20} toK={150} />,
    },
    {
      tag: "Medspa Clinic • Meta Ads",
      headline: "$160,000 → $270,000+/mo",
      timeframe: "30 days",
      body: "Scaled patient acquisition on agency infrastructure with full CAPI tracking.",
      chart: <MiniBarChart fromK={160} toK={270} />,
    },
    {
      tag: "Retention Benchmark",
      headline: "50–60% repeat revenue",
      timeframe: "Consistent",
      body: "Well-run peptide brands generate more than half their revenue from returning customers. We structure every acquisition program to maximize that number from day one.",
      chart: <RetentionBar />,
    },
  ];

  return (
    <section id="results" className="py-24 px-6" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <Label>Proven Results</Label>
          <h2
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            Numbers from live client campaigns.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="p-8 rounded-2xl h-full flex flex-col border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: DARK,
                  borderColor: i === 0 ? LIME : "rgba(175,245,24,0.2)",
                }}
              >
                <span
                  className="text-xs font-semibold tracking-wide mb-3"
                  style={{ color: "#888" }}
                >
                  {c.tag}
                </span>
                <span
                  className="text-2xl font-black mb-1 leading-tight"
                  style={{ color: LIME }}
                >
                  {c.headline}
                </span>
                <span
                  className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 self-start mt-1"
                  style={{ background: "rgba(175,245,24,0.12)", color: LIME }}
                >
                  {c.timeframe}
                </span>
                {c.chart}
                <p
                  className="text-sm leading-relaxed mt-auto pt-3 border-t"
                  style={{
                    color: "#bbb",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════ */
// function CTA() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     businessType: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if (!form.firstName || !form.email) return;
//     setLoading(true);
//     // ── wire your form endpoint here ──
//     await new Promise((r) => setTimeout(r, 900)); // remove when real API added
//     setLoading(false);
//     setSubmitted(true);
//   };

//   return (
//     <section
//       id="cta"
//       className="py-28 px-6 relative overflow-hidden"
//       style={{ background: LIME }}
//     >
//       {/* Animated background blobs — same as original */}
//       <div
//         className="absolute right-10 top-10 w-64 h-64 rounded-full opacity-10 animate-pulse"
//         style={{ background: DARK, animationDuration: "4s" }}
//       />
//       <div
//         className="absolute left-5 bottom-5 w-40 h-40 rounded-full opacity-10 animate-pulse"
//         style={{
//           background: DARK,
//           animationDuration: "6s",
//           animationDelay: "1s",
//         }}
//       />

//       <div className="max-w-2xl mx-auto relative z-10">
//         <Reveal>
//           {/* Heading */}
//           <h2
//             className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-center"
//             style={{ color: DARK }}
//           >
//             Ready to run ads that don&apos;t get shut down?
//           </h2>
//           <p
//             className="text-base mb-10 max-w-lg mx-auto text-center"
//             style={{ color: "rgba(28,28,28,0.72)" }}
//           >
//             Fill out the form below or reach out directly no pitch deck, no
//             generic proposal.
//           </p>

//           {/* ── FORM CARD ── */}
//           {!submitted ? (
//             <div
//               className="rounded-2xl p-4 lg:p-8"
//               style={{
//                 background: "#fff",
//                 border: "0.5px solid rgba(28,28,28,0.12)",
//               }}
//             >
//               {/* Row 1 */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div className="flex flex-col gap-1.5">
//                   <label
//                     className="text-xs font-bold tracking-[0.12em] uppercase"
//                     style={{ color: DARK }}
//                   >
//                     First name
//                   </label>
//                   <input
//                     name="firstName"
//                     value={form.firstName}
//                     onChange={handleChange}
//                     placeholder="John"
//                     className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
//                     style={{
//                       background: ALT,
//                       border: "1px solid transparent",
//                       color: DARK,
//                       fontFamily: "inherit",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = LIME)}
//                     onBlur={(e) => (e.target.style.borderColor = "transparent")}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1.5">
//                   <label
//                     className="text-xs font-bold tracking-[0.12em] uppercase"
//                     style={{ color: DARK }}
//                   >
//                     Last name
//                   </label>
//                   <input
//                     name="lastName"
//                     value={form.lastName}
//                     onChange={handleChange}
//                     placeholder="Doe"
//                     className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
//                     style={{
//                       background: ALT,
//                       border: "1px solid transparent",
//                       color: DARK,
//                       fontFamily: "inherit",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = LIME)}
//                     onBlur={(e) => (e.target.style.borderColor = "transparent")}
//                   />
//                 </div>
//               </div>

//               {/* Row 2 */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div className="flex flex-col gap-1.5">
//                   <label
//                     className="text-xs font-bold tracking-[0.12em] uppercase"
//                     style={{ color: DARK }}
//                   >
//                     Email
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="you@brand.com"
//                     className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
//                     style={{
//                       background: ALT,
//                       border: "1px solid transparent",
//                       color: DARK,
//                       fontFamily: "inherit",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = LIME)}
//                     onBlur={(e) => (e.target.style.borderColor = "transparent")}
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1.5">
//                   <label
//                     className="text-xs font-bold tracking-[0.12em] uppercase"
//                     style={{ color: DARK }}
//                   >
//                     Business type
//                   </label>
//                   <select
//                     name="businessType"
//                     value={form.businessType}
//                     onChange={handleChange}
//                     className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
//                     style={{
//                       background: ALT,
//                       border: "1px solid transparent",
//                       color: "black",
//                       fontFamily: "inherit",
//                       appearance: "none",
//                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
//                       backgroundRepeat: "no-repeat",
//                       backgroundPosition: "right 14px center",
//                       paddingRight: "36px",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = LIME)}
//                     onBlur={(e) => (e.target.style.borderColor = "transparent")}
//                   >
//                     <option value="" disabled>
//                       Select...
//                     </option>
//                     <option value="ruo">RUO Peptide Brand</option>
//                     <option value="telehealth">
//                       Telehealth / Medspa Clinic
//                     </option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 3 — textarea */}
//               <div className="flex flex-col gap-1.5 mb-6">
//                 <label
//                   className="text-xs font-bold tracking-[0.12em] uppercase"
//                   style={{ color: DARK }}
//                 >
//                   What do you need help with?
//                 </label>
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   placeholder="Tell us about your current setup, goals, or what's blocking you..."
//                   rows={4}
//                   className="rounded-xl px-4 py-3 text-sm outline-none resize-y transition-all duration-200"
//                   style={{
//                     background: ALT,
//                     border: "1px solid transparent",
//                     color: DARK,
//                     fontFamily: "inherit",
//                     minHeight: "100px",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = LIME)}
//                   onBlur={(e) => (e.target.style.borderColor = "transparent")}
//                 />
//               </div>

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-base font-bold transition-all duration-300"
//                 style={{
//                   background: loading ? "rgba(28,28,28,0.6)" : DARK,
//                   color: LIME,
//                   cursor: loading ? "not-allowed" : "pointer",
//                   border: "none",
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="w-4 h-4 animate-spin"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M21 12a9 9 0 11-6.219-8.56" />
//                     </svg>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Book a Strategy Call
//                     <Icon.ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>

//               {/* Divider */}
//               <div className="flex items-center gap-3 my-6">
//                 <div
//                   className="flex-1 h-px"
//                   style={{ background: "rgba(28,28,28,0.12)" }}
//                 />
//                 <span
//                   className="text-xs font-bold tracking-[0.14em] uppercase"
//                   style={{ color: "rgba(28,28,28,0.4)" }}
//                 >
//                   Or reach us directly
//                 </span>
//                 <div
//                   className="flex-1 h-px"
//                   style={{ background: "rgba(28,28,28,0.12)" }}
//                 />
//               </div>

//               {/* Telegram + WhatsApp — using MagneticBtn to stay consistent */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <MagneticBtn
//                   href="https://t.me/YOUR_HANDLE"
//                   className="flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white"
//                   style={{ background: "#24A1DE" }}
//                 >
//                   {/* Telegram icon */}
//                   <svg
//                     className="w-5 h-5 flex-shrink-0"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
//                   </svg>
//                   Message on Telegram
//                 </MagneticBtn>

//                 <MagneticBtn
//                   href="https://wa.me/YOUR_NUMBER"
//                   className="flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white"
//                   style={{ background: "#25D366" }}
//                 >
//                   {/* WhatsApp icon */}
//                   <svg
//                     className="w-5 h-5 flex-shrink-0"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
//                   </svg>
//                   Message on WhatsApp
//                 </MagneticBtn>
//               </div>
//             </div>
//           ) : (
//             /* ── SUCCESS STATE ── */
//             <Reveal>
//               <div
//                 className="rounded-2xl p-12 text-center"
//                 style={{
//                   background: "#fff",
//                   border: "0.5px solid rgba(28,28,28,0.12)",
//                 }}
//               >
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
//                   style={{ background: LIME }}
//                 >
//                   <Icon.Check className="w-8 h-8" style={{ color: DARK }} />
//                 </div>
//                 <h3
//                   className="text-2xl font-black mb-2"
//                   style={{ color: DARK }}
//                 >
//                   You&apos;re on our radar.
//                 </h3>
//                 <p className="text-sm" style={{ color: "#666" }}>
//                   We&apos;ll review your submission and reach out within 24
//                   hours. In the meantime, feel free to message us directly on
//                   Telegram or WhatsApp.
//                 </p>
//               </div>
//             </Reveal>
//           )}
//         </Reveal>
//       </div>
//     </section>
//   );
// }

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════ */
function Footer() {
  const links = [
    "Why Us",
    "Infrastructure",
    "Services",
    "Packages",
    "Network",
    "Results",
  ];
  const hrefs = [
    "#positioning",
    "#solution",
    "#services",
    "#packages",
    "#network",
    "#results",
  ];

  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ background: DARK, borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <a href="#hero" className="flex items-center gap-2">
              <img
                src="/arrow_logo final.png"
                alt="PeptideScaling"
                className="h-15 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-xl font-black tracking-tight"
                  style={{ color: "white" }}
                >
                  <span className="text-xl font-normal tracking-tight pr-0.5">
                    Peptide
                  </span>
                  <span style={{ color: "#c6e805" }}>Scaling</span>
                </span>
                <span
                  className="text-[9px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "#999" }}
                >
                  Growth Marketing Agency
                </span>
              </div>
            </a>
            <p className="text-xs max-w-xs mt-2" style={{ color: "#888" }}>
              Performance marketing for peptide brands & medspa/telehealth
              clinics.
            </p>
          </div>
          <nav className="flex flex-wrap  gap-6">
            {links.map((l, i) => (
              <a
                key={l}
                href={hrefs[i]}
                className="text-sm transition-all duration-200 hover:text-[#aff518] relative group"
                style={{ color: "#888" }}
              >
                {l}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: LIME }}
                />
              </a>
            ))}
          </nav>
        </div>
        <div
          className="pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs mb-3" style={{ color: "#444" }}>
            All advertising services are conducted in accordance with applicable
            platform policies. Results shown are from specific client campaigns
            and are not guaranteed. Regulatory compliance responsibility rests
            with the advertiser for their specific products and business model.
          </p>
          <p className="text-xs" style={{ color: "#444" }}>
            © {new Date().getFullYear()} PeptideScaling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  /* Global GSAP scroll-smooth cursor glow (subtle) */
  useEffect(() => {
    const glow = document.createElement("div");
    glow.style.cssText = `position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(175,245,24,0.06) 0%,transparent 70%);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.4s ease,top 0.4s ease;left:-300px;top:-300px;`;
    document.body.appendChild(glow);
    const move = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(glow);
    };
  }, []);

  return (
    <div style={{ background: BG }}>
      <Nav />
      <Hero />
      <Positioning />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <Assets />
      <Services />
      <Packages />
      <Results />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
