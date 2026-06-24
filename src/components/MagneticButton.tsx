"use client";

import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export default function MagneticButton({ children, href, className = "", style, target, rel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    inner.style.transform = `translate(${x}px, ${y}px)`;
    inner.style.transition = "transform 0.12s ease";
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = "translate(0,0)";
    inner.style.transition = "transform 0.55s cubic-bezier(0.33,1,0.68,1)";
  };

  const inner = href ? (
    <a href={href} className={className} style={style} target={target} rel={rel}>
      {children}
    </a>
  ) : (
    <span className={className} style={{ ...style, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </span>
  );

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-magnetic
      style={{ display: "inline-flex" }}
    >
      <div ref={innerRef} style={{ display: "inline-flex" }}>
        {inner}
      </div>
    </div>
  );
}
