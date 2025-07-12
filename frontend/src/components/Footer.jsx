import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A passionate Computer Science Engineering student dedicated to creating innovative solutions through code.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'Python', 'Node.js', 'MongoDB', 'AI/ML'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and</span>
              <Code className="w-4 h-4 text-blue-500" />
              <span>and lots of</span>
              <Coffee className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;