export default function BackHome({
  light,
  href = "/",
  label,
}: {
  light?: boolean;
  href?: string;
  label?: string;
}) {
  const text = label ?? (href === "/" ? "← Torna alla Home" : "← Torna alle Attività");
  return (
    <a
      href={href}
      className="back-home-link"
      style={light ? { color: "rgba(255,255,255,0.35)" } : undefined}
    >
      {text}
    </a>
  );
}
