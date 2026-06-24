"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || target === 0) {
      setCount(target);
      return;
    }
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AnimatedCounters({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a]">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#080808] flex flex-col items-center justify-center py-14 px-6 text-center gap-3"
        >
          <div
            className="font-bebas text-[clamp(3.5rem,7vw,6rem)] leading-none"
            style={{ color: "var(--gold)" }}
          >
            <Counter target={stat.value} suffix={stat.suffix} />
          </div>
          <div
            className="text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "var(--muted)" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
