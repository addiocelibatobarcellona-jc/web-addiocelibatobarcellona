function makeScallop(cx: number, cy: number, rAvg: number, amplitude: number, n: number): string {
  const steps = n * 16;
  const f = (v: number) => v.toFixed(2);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const theta = (2 * Math.PI * i) / steps - Math.PI / 2;
    const r = rAvg + amplitude * Math.cos(n * (theta + Math.PI / 2));
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    d += i === 0 ? `M${f(x)},${f(y)}` : ` L${f(x)},${f(y)}`;
  }
  return d + "Z";
}

const PATH = makeScallop(130, 130, 107, 9, 14);

export default function BadgeHome() {
  return (
    <a href="/" aria-label="Torna alla Home" className="badge-home-link">
      <svg width="88" height="88" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH} fill="var(--blue)" />
        <circle cx="130" cy="130" r="92" fill="#000" />
        <circle cx="130" cy="130" r="86" fill="none" stroke="rgba(58,117,255,0.3)" strokeWidth="1.5" />
        <text
          x="130" y="116"
          textAnchor="middle"
          fill="#fff"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "28px", letterSpacing: "0.06em" }}
        >
          ADDIO AL
        </text>
        <text
          x="130" y="146"
          textAnchor="middle"
          fill="#fff"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "28px", letterSpacing: "0.06em" }}
        >
          CELIBATO
        </text>
        <text
          x="130" y="168"
          textAnchor="middle"
          fill="var(--blue)"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "0.35em" }}
        >
          BCN
        </text>
      </svg>
    </a>
  );
}
