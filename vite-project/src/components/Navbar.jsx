import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Home, Star, Info, Mail, Menu, X } from "lucide-react";

const Navbar = ({ featureRef, heroRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Close mobile menu on click
    }
  };

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
            onClick={() => scrollToSection(heroRef)}
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text 
                      transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            VisualDS
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-gray-300 font-semibold tracking-wide">
            <li
              onClick={() => scrollToSection(heroRef)}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
                        hover:text-cyan-400 hover:shadow-cyan-400/50"
            >
              <Home size={20} /> Home
            </li>
            <li
              onClick={() => scrollToSection(featureRef)}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 
                        hover:text-cyan-400 hover:shadow-cyan-400/50"
            >
              <Star size={20} /> Features
            </li>
            <li className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-cyan-400 hover:shadow-cyan-400/50">
              <Info size={20} /> About
            </li>
            <li className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:text-cyan-400 hover:shadow-cyan-400/50">
              <Mail size={20} /> Contact
            </li>
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
          <button
            onClick={() => scrollToSection(heroRef)}
            className="flex items-center gap-3 px-6 py-3 w-full text-center 
                      hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300"
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => scrollToSection(featureRef)}
            className="flex items-center gap-3 px-6 py-3 w-full text-center 
                      hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300"
          >
            <Star size={20} /> Features
          </button>
          <button className="flex items-center gap-3 px-6 py-3 w-full text-center 
                      hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300">
            <Info size={20} /> About
          </button>
          <button className="flex items-center gap-3 px-6 py-3 w-full text-center 
                      hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300">
            <Mail size={20} /> Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
