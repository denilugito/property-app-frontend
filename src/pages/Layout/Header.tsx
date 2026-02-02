import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#1a1d24] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Y'S Property</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-300 hover:text-white transition text-sm font-medium">
            Home
          </a>
          <a href="/properties" className="text-gray-300 hover:text-white transition text-sm font-medium">
            Properties
          </a>
          <a href="/about" className="text-gray-300 hover:text-white transition text-sm font-medium">
            About
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white transition text-sm font-medium">
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </header>
  );
}
