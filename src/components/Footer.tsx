export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-8" style={{ backgroundColor: "transparent", borderTop: "1px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold" style={{ color: "#f2f2f2" }}>Satori Inference</span>
        <p className="text-sm" style={{ color: "#444444" }}>
          © {new Date().getFullYear()} Satori Inference. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
