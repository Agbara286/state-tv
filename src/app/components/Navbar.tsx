import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* The BCOS Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="BCOS Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
              BCOS<span className="text-blue-600">.</span>
            </h1>
          </div>
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex gap-6 font-bold text-slate-600 text-sm tracking-wide uppercase">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/category/politics" className="hover:text-blue-600 transition">Politics</Link>
          <Link href="/category/sports" className="hover:text-blue-600 transition">Sports</Link>
          <Link href="/category/entertainment" className="hover:text-blue-600 transition">Entertainment</Link>
          <Link href="/category/tech" className="hover:text-blue-600 transition">Tech</Link>
          <Link href="/category/crime" className="hover:text-blue-600 transition">Crime</Link>
        </div>

      </div>
    </nav>
  );
}