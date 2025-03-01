import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Star, Info, Mail, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", icon: <Home size={20} /> },
  { name: "Features", icon: <Star size={20} /> },
  { name: "About", icon: <Info size={20} /> },
  { name: "Contact", icon: <Mail size={20} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg 
                      shadow-[0_4px_10px_rgba(0,255,255,0.3),0_6px_20px_rgba(0,0,0,0.5)] 
                      border-b border-cyan-500 transition-all duration-500 rounded-b-xl">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text 
                      transition-transform duration-300 hover:scale-110"
          >
            VisualDS
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-gray-300 font-semibold tracking-wide">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="flex items-center gap-2 cursor-pointer transition-all duration-300 
                          hover:text-cyan-400 hover:shadow-cyan-400/50"
              >
                {link.icon} {link.name}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-all duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transition-transform duration-500
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center mt-20 space-y-6 text-gray-300 font-semibold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-6 py-3 w-full text-center 
                        hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300"
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
