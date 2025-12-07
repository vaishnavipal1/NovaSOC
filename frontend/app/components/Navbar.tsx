"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full px-10 py-5 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-cyan-500/20 z-50">

      {/* LOGO SECTION */}
      <div className="flex items-center gap-3">
        <img 
          src="/assets/soc-logo.png" 
          alt="SOC Logo" 
          className="w-10 h-10 object-contain"
        />

        <h1 className="text-3xl font-extrabold text-cyan-400">
          NovaSOC
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-8 text-lg">
        <a href="/" className="hover:text-cyan-400">Home</a>
        <a href="#features" className="hover:text-cyan-400">Features</a>
        <a href="#about" className="hover:text-cyan-400">About</a>
        <a href="#contact" className="hover:text-cyan-400">Contact</a>
      </div>
    </nav>
  );
}
