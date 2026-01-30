export default function Footer() {
  return (
    <footer className="bg-[#1a1d24] border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <h2 className="text-white text-xl font-bold">Y'S Property</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. 
              We offer a wide range of residential and commercial properties across Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white text-sm transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/properties" className="text-gray-400 hover:text-white text-sm transition">
                  Properties
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white text-sm transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white text-sm transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 info@ysproperty.com</li>
              <li>📱 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Y'S Property. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
