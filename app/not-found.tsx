import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="text-6xl mb-4">🧠</div>
      <h1 className="text-3xl font-semibold mb-3">Page not found</h1>
      <p className="text-brand-dark/60 mb-8">The page you’re looking for doesn’t exist in Pillar 1.</p>
      <Link href="/" className="btn-primary inline-block px-8 py-3 rounded-full">Return home</Link>
    </div>
  );
}
