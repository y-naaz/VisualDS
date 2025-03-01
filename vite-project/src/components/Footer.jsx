import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 py-3 text-center border-t border-gray-700 mt-10 mb-0">
      <p className="text-sm">&copy; {new Date().getFullYear()} LRU Cache Visualizer. All rights reserved.</p>
      <p className="text-xs">
        Built with ❤️ using React & Framer Motion
      </p>
    </footer>
  );
};

export default Footer;