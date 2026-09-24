"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, NormalBufferAttributes } from "three";
import type { RequestKind } from "@/lib/request-details";

// Deliberately small, procedural scenes: no model downloads and no customer data.
export function ServiceScene({
  kind,
  paused = false,
}: {
  kind: RequestKind;
  paused?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    void import("three")
      .then((T) => {
        if (disposed) return;
        let renderer: InstanceType<typeof T.WebGLRenderer>;
        try {
          renderer = new T.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0xf3f1e9);
        renderer.outputColorSpace = T.SRGBColorSpace;
        const scene = new T.Scene();
        const world = new T.Group();
        scene.add(world);
        const camera = new T.PerspectiveCamera(36, 1, 0.1, 40);
        camera.position.set(4.2, 3.3, 6.7);
        camera.lookAt(0, 0.75, 0);
        scene.add(new T.HemisphereLight(0xfffaf0, 0x7c8175, 3));
        const key = new T.DirectionalLight(0xffefd2, 4);
        key.position.set(2, 6, 5);
        scene.add(key);
        const fill = new T.DirectionalLight(0xffffff, 2);
        fill.position.set(-4, 2, 1);
        scene.add(fill);
        const materials = {
          cream: new T.MeshStandardMaterial({
            color: 0xe7dfca,
            roughness: 0.7,
          }),
          white: new T.MeshStandardMaterial({
            color: 0xfaf7ef,
            roughness: 0.6,
          }),
          green: new T.MeshStandardMaterial({
            color: 0x315748,
            roughness: 0.6,
          }),
          dark: new T.MeshStandardMaterial({ color: 0x203c32, roughness: 0.8 }),
          gold: new T.MeshStandardMaterial({
            color: 0xd5a745,
            metalness: 0.7,
            roughness: 0.24,
          }),
          steel: new T.MeshStandardMaterial({
            color: 0x8e9a98,
            metalness: 0.7,
            roughness: 0.3,
          }),
          skin: new T.MeshStandardMaterial({ color: 0xd7a582, roughness: 0.8 }),
          wood: new T.MeshStandardMaterial({ color: 0xb58c60, roughness: 0.8 }),
        };
        type Material = keyof typeof materials;
        const geometries: BufferGeometry<NormalBufferAttributes>[] = [];
        function mesh(
          geometry: BufferGeometry<NormalBufferAttributes>,
          material: Material,
          x: number,
          y: number,
          z: number,
          parent = world,
        ) {
          geometries.push(geometry);
          const object = new T.Mesh(geometry, materials[material]);
          object.position.set(x, y, z);
          parent.add(object);
          return object;
        }
        function box(
          w: number,
          h: number,
          d: number,
          material: Material,
          x: number,
          y: number,
          z: number,
          parent = world,
        ) {
          return mesh(new T.BoxGeometry(w, h, d), material, x, y, z, parent);
        }
        function ring(
          r: number,
          x: number,
          y: number,
          z: number,
          parent = world,
        ) {
          return mesh(
            new T.TorusGeometry(r, r * 0.19, 10, 28),
            "gold",
            x,
            y,
            z,
            parent,
          );
        }
        function hand(x: number, y: number, z: number, rotation: number) {
          const group = new T.Group();
          group.position.set(x, y, z);
          group.rotation.y = rotation;
          world.add(group);
          box(0.37, 0.16, 0.47, "skin", 0, 0, 0, group);
          box(0.3, 0.2, 0.6, "green", 0, -0.01, 0.48, group);
          for (let i = 0; i < 4; i++) {
            const finger = mesh(
              new T.CapsuleGeometry(
                0.042,
                0.23 - Math.abs(i - 1.5) * 0.03,
                3,
                8,
              ),
              "skin",
              -0.135 + i * 0.09,
              -0.01,
              -0.31,
              group,
            );
            finger.rotation.x = Math.PI / 2;
          }
          const thumb = mesh(
            new T.CapsuleGeometry(0.052, 0.17, 3, 8),
            "skin",
            0.23,
            -0.015,
            -0.02,
            group,
          );
          thumb.rotation.z = -0.7;
          return group;
        }
        box(3.55, 0.18, 2.65, "cream", 0, -0.12, 0);
        let animate = (_time: number) => {
          void _time;
        };
        if (kind === "NEW_BUSINESS") {
          camera.position.set(3.5, 2.7, 7.5);
          camera.lookAt(0, 1, 0);
          box(3, 2.6, 0.18, "cream", 0, 1.25, -0.82);
          box(0.2, 2.55, 1.5, "cream", -1.4, 1.23, -0.05);
          box(0.2, 2.55, 1.5, "cream", 1.4, 1.23, -0.05);
          box(3.1, 0.42, 1.7, "green", 0, 2.5, -0.04);
          box(2.55, 0.045, 0.05, "gold", 0, 2.49, 0.83);
          box(2.55, 0.65, 0.55, "green", 0, 0.4, 0.15);
          box(2.64, 0.09, 0.65, "gold", 0, 0.77, 0.15);
          for (let i = 0; i < 5; i++) {
            box(0.34, 0.12, 0.25, "white", -0.96 + i * 0.48, 0.86, 0.18);
            ring(0.12, -0.96 + i * 0.48, 1.06, 0.18);
          }
          for (const x of [-0.8, 0, 0.8]) {
            box(0.53, 0.65, 0.09, "green", x, 1.68, -0.68);
            ring(0.18, x, 1.72, -0.59);
          }
          const shutter = new T.Group();
          world.add(shutter);
          for (let i = 0; i < 17; i++)
            box(2.62, 0.125, 0.1, "steel", 0, -i * 0.13, 0.78, shutter);
          animate = (t) => {
            const openness = 0.08 + (0.92 * (1 - Math.cos(t * 0.7))) / 2;
            shutter.position.y = 2.23;
            shutter.scale.y = 1 - openness * 0.96;
          };
        } else if (kind === "WHOLESALE") {
          camera.position.set(3.7, 4.8, 5.6);
          camera.lookAt(0, 0.45, 0);
          box(3.1, 0.52, 2.2, "green", 0, 0.23, 0);
          box(3.2, 0.1, 2.3, "gold", 0, 0.53, 0);
          box(2.16, 0.07, 1.65, "dark", -0.36, 0.61, 0);
          const jewelry: InstanceType<typeof T.Mesh>[] = [];
          for (let row = 0; row < 5; row++)
            for (let col = 0; col < 5; col++) {
              const x = -1.2 + col * 0.4,
                z = -0.65 + row * 0.32;
              box(0.34, 0.025, 0.27, "cream", x, 0.66, z);
              const piece = ring(row === 0 ? 0.115 : 0.084, x, 0.74, z);
              piece.rotation.x = -Math.PI / 2.5;
              jewelry.push(piece);
            }
          box(0.6, 0.18, 1.25, "cream", 1.12, 0.7, 0);
          box(0.48, 0.03, 1.1, "dark", 1.12, 0.81, 0);
          for (let i = 0; i < 3; i++) {
            const jewel = ring(0.12, 1.12, 0.88, -0.37 + i * 0.36);
            jewel.rotation.x = Math.PI / 2;
          }
          const buyer = hand(0.45, 1.6, 1.07, -0.65);
          const chosen = jewelry[14];
          animate = (t) => {
            const phase = (t % 7) / 7;
            const travel = Math.sin(phase * Math.PI) ** 2;
            chosen.position.x = 0.4 + travel * 0.72;
            chosen.position.y = 0.74 + Math.sin(phase * Math.PI) * 0.55;
            chosen.rotation.z = travel * 0.6;
            buyer.position.x = chosen.position.x + 0.05;
            buyer.position.y = chosen.position.y + 0.3;
            buyer.position.z = chosen.position.z + 0.42;
          };
        } else {
          camera.position.set(3.4, 4.5, 5.2);
          camera.lookAt(0, 0.4, 0);
          box(3.15, 0.42, 2.25, "wood", 0, 0.18, 0);
          box(1.55, 0.055, 1.3, "dark", 0, 0.43, -0.1);
          const jewel = ring(0.29, 0, 0.55, -0.1);
          jewel.rotation.x = Math.PI / 2;
          const stone = mesh(
            new T.OctahedronGeometry(0.115),
            "white",
            0,
            0.61,
            -0.36,
          );
          const left = hand(-0.62, 0.74, 0.2, -0.7);
          const right = hand(0.73, 0.8, 0.1, 0.85);
          const tool = box(0.06, 0.06, 0.72, "steel", 0, -0.11, -0.41, right);
          tool.rotation.x = -0.12;
          box(0.065, 0.065, 0.4, "gold", 0, -0.11, -0.18, right);
          const tool2 = box(0.06, 0.06, 0.62, "steel", 0, -0.1, -0.34, left);
          tool2.rotation.y = -0.2;
          for (let i = 0; i < 3; i++)
            box(
              0.065,
              0.065,
              0.7,
              i === 1 ? "gold" : "steel",
              -1.21 + i * 0.17,
              0.47,
              -0.22,
            );
          const sparkle = mesh(
            new T.OctahedronGeometry(0.04),
            "white",
            0.15,
            0.7,
            -0.25,
          );
          animate = (t) => {
            right.rotation.y = 0.85 + Math.sin(t * 1.8) * 0.1;
            right.position.y = 0.8 + Math.sin(t * 1.8) * 0.035;
            left.rotation.y = -0.7 + Math.sin(t * 1.8 + 1) * 0.04;
            sparkle.scale.setScalar(0.5 + Math.max(0, Math.sin(t * 2)) * 1.5);
            stone.rotation.y = t * 0.1;
          };
        }
        const motion = matchMedia("(prefers-reduced-motion: reduce)");
        let visible = true,
          lastFrame = 0;
        const render = (timestamp: number) => {
          if (timestamp - lastFrame < 32 && timestamp !== 0) return;
          lastFrame = timestamp;
          animate(paused || motion.matches ? 3.5 : timestamp / 1000);
          renderer.render(scene, camera);
        };
        const refresh = () => {
          renderer.setAnimationLoop(
            visible && !document.hidden && !paused && !motion.matches
              ? render
              : null,
          );
          render(0);
        };
        const resize = new ResizeObserver(() => {
          const w = container.clientWidth,
            h = container.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          render(0);
        });
        resize.observe(container);
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          refresh();
        });
        observer.observe(container);
        container.appendChild(renderer.domElement);
        container.dataset.ready = "true";
        document.addEventListener("visibilitychange", refresh);
        motion.addEventListener("change", refresh);
        refresh();
        cleanup = () => {
          renderer.setAnimationLoop(null);
          observer.disconnect();
          resize.disconnect();
          document.removeEventListener("visibilitychange", refresh);
          motion.removeEventListener("change", refresh);
          geometries.forEach((g) => g.dispose());
          Object.values(materials).forEach((m) => m.dispose());
          renderer.dispose();
          renderer.domElement.remove();
          delete container.dataset.ready;
        };
      })
      .catch(() => {
        /* Keep the service photo when WebGL is unavailable. */
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [kind, paused]);
  return <div ref={host} className="service-scene" aria-hidden="true" />;
}
