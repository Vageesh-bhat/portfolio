import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Twitter, Mail, ArrowDown, Sparkles } from 'lucide-react';

const Hero = ({ data }) => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const titles = [
    "Full Stack Developer",
    "AI Enthusiast", 
    "Problem Solver",
    "Creative Thinker",
    "Tech Explorer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Greeting */}
          <div className="mb-8 mt-14 sm:mt-12">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-700/30">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Welcome to my digital space
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-8xl font-bold mb-10">
            <span className="mb-2 block text-gray-800 dark:text-white">
              Hi, I'm
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              {data?.name || 'Vageesh Bhat'}
            </span>
          </h1>
          
          {/* Animated subtitle */}
          <div className="mb-6 h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
              <span className="inline-block mr-2">I'm a</span>
              <span className={`inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${isTyping ? 'typewriter' : 'opacity-50'}`}>
                {titles[currentTitle]}
              </span>
            </h2>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {data?.description || "Passionate about creating innovative solutions through code. Currently pursuing my degree in Computer Science Engineering."}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href={data?.resume_url || "https://vageesh-cv.edgeone.app/Vageesh-Bhat-CV.pdf"}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Download Resume</span>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center px-8 py-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Let's Connect
            </a>
          </div>

          {/* Enhanced social links */}
          <div className="flex justify-center space-x-10 mb-12">
            {[
              { icon: Github, href: "https://github.com/Vageesh-bhat" || "#", color: "hover:bg-gray-900" },
              { icon: Linkedin, href:"https://linkedin.com/in/vageesh-bhat" || "#", color: "hover:bg-blue-600" },
              // { icon: Twitter, href: data?.social_links?.twitter || "#", color: "hover:bg-blue-400" },
              { icon: Mail, href: `mailto:${"vageeshbhat2003gmail.com" || ""}`, color: "hover:bg-red-500" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`group relative p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} hover:text-white border border-white/20 dark:border-gray-700/20`}
                aria-label={`Social link ${index + 1}`}
              >
                <social.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { number: "3+", label: "Years of Coding" },
              { number: "4+", label: "Projects Built" },
              { number: "5+", label: "Technologies" },
              { number: "∞", label: "Cups of Coffee" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll to explore</span>
          <button
            onClick={scrollToAbout}
            className="group p-3 rounded-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 animate-bounce hover:animate-none"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;