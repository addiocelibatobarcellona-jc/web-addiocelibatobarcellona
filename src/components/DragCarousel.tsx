"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

export default function DragCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const momentumId = useRef<number>(0);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    cancelAnimationFrame(momentumId.current);
    setDragging(true);
    startX.current = e.clientX;
    startScroll.current = trackRef.current?.scrollLeft ?? 0;
    lastX.current = e.clientX;
    velocity.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    velocity.current = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const walk = (e.clientX - startX.current) * 1.4;
    trackRef.current.scrollLeft = startScroll.current - walk;
  };

  const onMouseUp = () => {
    setDragging(false);
    applyMomentum();
  };

  const applyMomentum = () => {
    let v = velocity.current * -1.5;
    const el = trackRef.current;
    if (!el || Math.abs(v) < 0.5) return;
    const step = () => {
      el.scrollLeft += v;
      v *= 0.93;
      if (Math.abs(v) > 0.5) {
        momentumId.current = requestAnimationFrame(step);
      }
    };
    momentumId.current = requestAnimationFrame(step);
  };

  // Touch
  const touchStart = useRef(0);
  const touchScroll = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchScroll.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const walk = (touchStart.current - e.touches[0].clientX) * 1.2;
    trackRef.current.scrollLeft = touchScroll.current + walk;
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: dragging ? "grabbing" : "grab",
          paddingBottom: "4px",
          userSelect: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>

      {/* Progress bar */}
      <div style={{
        height: 1, background: "rgba(255,255,255,0.1)",
        marginTop: "2rem", borderRadius: 1,
      }}>
        <div style={{
          height: "100%", background: "#E8A020",
          borderRadius: 1,
          width: `${Math.round(progress * 100)}%`,
          transition: "width 0.15s ease",
          boxShadow: "0 0 8px rgba(232,160,32,0.6)",
        }} />
      </div>

      <p style={{
        textAlign: "center", marginTop: "0.875rem",
        fontSize: "0.65rem", letterSpacing: "0.25em",
        textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
        fontFamily: "var(--font-jakarta)", pointerEvents: "none",
      }}>
        ← trascina per esplorare →
      </p>
    </div>
  );
}
