import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gray-800 text-gray-400 mt-10">
      <p>© {new Date().getFullYear()} LRU Cache Visualizer. Built with ❤️ by Your Name</p>
      <p>
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          GitHub
        </a>{" "}
        |{" "}
        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          Portfolio
        </a>
      </p>
    </footer>
  );
};

export default Footer;
