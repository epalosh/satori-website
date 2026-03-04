export default function ParallaxDots() {
  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Ccircle cx='28' cy='28' r='2.2' fill='%23dde0e4'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
