"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      animId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.marginLeft = "-8px";
      ring.style.marginTop = "-8px";
      dot.style.opacity = "0";
    };
    const onLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(tick);

    const interactives = document.querySelectorAll("a, button, [data-magnetic]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 12, height: 12,
          borderRadius: "50%", background: "#E8A020", pointerEvents: "none",
          zIndex: 9999, opacity: 0, transition: "opacity 0.2s",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 40, height: 40,
          borderRadius: "50%", border: "1.5px solid #E8A020",
          pointerEvents: "none", zIndex: 9998, opacity: 0,
          transition: "width 0.25s cubic-bezier(0.33,1,0.68,1), height 0.25s cubic-bezier(0.33,1,0.68,1), opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
