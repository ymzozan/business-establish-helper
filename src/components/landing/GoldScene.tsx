"use client";

import { useEffect, useRef } from "react";

export function GoldScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let cancelled = false;
    let cleanup = () => {};
    void import("three").then((THREE) => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, .1, 50);
      camera.position.z = 6;
      scene.add(new THREE.HemisphereLight(0xfff9e9, 0x706344, 3));
      const light = new THREE.DirectionalLight(0xfff4da, 5);
      light.position.set(3, 4, 5); scene.add(light);
      const rim = new THREE.DirectionalLight(0xffffff, 3);
      rim.position.set(-3, -1, 2); scene.add(rim);
      const geometry = new THREE.TorusGeometry(.85, .14, 20, 80);
      const material = new THREE.MeshStandardMaterial({ color: 0xd5ab50, metalness: .72, roughness: .24 });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(.4, .55, -.3); scene.add(ring);
      const second = new THREE.Mesh(geometry, material);
      second.scale.setScalar(.7); second.rotation.set(1.1, -.5, .4); second.position.set(.34, -.12, .1); scene.add(second);
      container.appendChild(renderer.domElement);
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true;
      let pointer = 0;
      const move = (event: PointerEvent) => { pointer = (event.clientX / window.innerWidth - .5) * .25; };
      const render = (time: number) => {
        if (!motion.matches) {
          ring.rotation.y = .55 + Math.sin(time * .0005) * .45 + pointer;
          ring.rotation.z = -.3 + Math.sin(time * .00035) * .1;
          second.rotation.y = -.5 + Math.sin(time * .0004) * .35;
          ring.position.y = Math.sin(time * .001) * .05;
        }
        renderer.render(scene, camera);
      };
      const refresh = () => {
        renderer.setAnimationLoop(visible && !document.hidden && !motion.matches ? render : null);
        render(0);
      };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); });
      observer.observe(container);
      const resize = new ResizeObserver(() => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix(); render(0);
      });
      resize.observe(container);
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("visibilitychange", refresh);
      motion.addEventListener("change", refresh);
      refresh();
      cleanup = () => {
        renderer.setAnimationLoop(null); observer.disconnect(); resize.disconnect();
        window.removeEventListener("pointermove", move);
        document.removeEventListener("visibilitychange", refresh); motion.removeEventListener("change", refresh);
        geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => { /* The static gold ring remains available without WebGL. */ });
    return () => { cancelled = true; cleanup(); };
  }, []);
  return <div ref={host} className="gold-scene" aria-hidden="true"><span className="gold-fallback" /></div>;
}
