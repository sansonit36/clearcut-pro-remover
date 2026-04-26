import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#D2D2D7]/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0066CC] flex items-center justify-center text-white">
                <Wand2 size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">ClearCut</span>
            </Link>
            <p className="text-[#86868B] max-w-sm leading-relaxed">
              Professional-grade background removal powered by local edge computing. 
              ClearCut respects your privacy by processing everything directly in your browser. 
              No images are ever sent to our servers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full hover:scale-110 transition-transform shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:scale-110 transition-transform shadow-sm">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[#86868B]">
              <li><Link to="/tool" className="hover:text-[#0066CC]">Remove Background</Link></li>
              <li><Link to="/#features" className="hover:text-[#0066CC]">Features</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-[#0066CC]">How it Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-[#86868B]">
              <li><Link to="/privacy" className="hover:text-[#0066CC]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#0066CC]">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-[#0066CC]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#D2D2D7]/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#86868B] font-medium">
          <p>© 2026 ClearCut Labs. All rights reserved.</p>
          <p>Running on Native Browser WebAssembly (No Server-Side AI)</p>
        </div>
      </div>
    </footer>
  );
}
