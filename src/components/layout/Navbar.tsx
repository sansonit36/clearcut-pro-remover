import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Remove Background', path: '/tool' },
    { name: 'About', path: '/#features' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D2D2D7]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0066CC] flex items-center justify-center text-white">
            <Wand2 size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">ClearCut</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-[#0066CC] ${
                location.pathname === link.path ? 'text-[#0066CC]' : 'text-[#86868B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/tool"
            className="px-5 py-2 bg-[#0066CC] text-white rounded-full text-sm font-semibold hover:bg-[#004080] transition-all shadow-lg shadow-[#0066CC]/20"
          >
            Start Removing
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#D2D2D7]/30 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-[#1D1D1F]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/tool"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-3 bg-[#0066CC] text-white rounded-xl font-semibold"
          >
            Start Removing
          </Link>
        </div>
      )}
    </nav>
  );
}
