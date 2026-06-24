"use client";

import { useEffect, useRef } from "react";

const CELL = 44;
const RADIUS = 220;

export default function LEDGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let mx = -999, my = -999;
    let animId: number;

    const flickerBase: number[] = [];

    const initFlicker = () => {
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;
      flickerBase.length = cols * rows;
      for (let i = 0; i < flickerBase.length; i++) {
        flickerBase[i] = Math.random() * 0.06;
      }
    };
    initFlicker();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * CELL + CELL / 2;
          const cy = r * CELL + CELL / 2;
          const dist = Math.hypot(cx - mx, cy - my);

          let glow = 0;
          const idx = r * cols + c;

          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            glow = t * t * 0.85;
          } else {
            // Random flicker update every ~60 frames
            if (frameCount % 60 === 0 && Math.random() < 0.08) {
              flickerBase[idx] = Math.random() * 0.07;
            }
            glow = flickerBase[idx] ?? 0;
          }

          if (glow < 0.01) continue;

          const dotR = CELL * 0.06 + glow * CELL * 0.08;

          ctx.save();
          ctx.globalAlpha = Math.min(glow, 1);

          if (dist < RADIUS) {
            ctx.fillStyle = "#E8A020";
            ctx.shadowColor = "#E8A020";
            ctx.shadowBlur = 12 * glow;
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.shadowColor = "rgba(255,255,255,0.5)";
            ctx.shadowBlur = 4;
          }

          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(dotR, 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initFlicker();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.75,
      }}
    />
  );
}
