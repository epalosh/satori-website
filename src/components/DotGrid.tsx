export default function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, #333333 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        opacity: 0.35,
      }}
    />
  );
}
