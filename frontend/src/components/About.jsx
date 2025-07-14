import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Download, Coffee, Code, Heart } from 'lucide-react';

const About = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Multiple profile images for variety
  const profileImages = [
    data?.image_url || "https://i.postimg.cc/zGq290Kj/IMG-20250714-WA0070-1.jpg",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
  ];

  const personalityTraits = [
    { icon: "🎯", label: "Goal-Oriented", desc: "Always focused on achieving objectives" },
    { icon: "🚀", label: "Innovative", desc: "Love exploring new technologies" },
    { icon: "🤝", label: "Collaborative", desc: "Enjoy working in teams" },
    { icon: "📚", label: "Continuous Learner", desc: "Always expanding knowledge" }
  ];

  const funFacts = [
    "🌙 Night owl who codes best after midnight",
    "☕ Powered by Tea and determination",
    "🎮 Gaming enthusiast who loves problem-solving",
    "🎵 Music lover who codes to lo-fi beats",
    "📱 Always exploring the latest tech trends"
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data?.title || 'About Me'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {data?.description || "I'm a passionate Computer Science Engineering student with a strong foundation in software development and a keen interest in emerging technologies."}
              </p>
            </div>
            
            {/* Highlights with animations */}
            <div className="space-y-4">
              {(data?.highlights || []).map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInLeft 0.8s ease-out forwards'
                  }}
                >
                  <span className="text-2xl group-hover:animate-bounce">{highlight.split(' ')[0]}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{highlight.substring(2)}</span>
                </div>
              ))}
            </div>

            {/* Personality Traits */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What Drives Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {personalityTraits.map((trait, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInScale 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">{trait.icon}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{trait.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trait.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className={`flex justify-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main profile card */}
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2 max-w-sm mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-0 relative">
                  {/* Profile image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={profileImages[currentImageIndex]}
                      alt="Profile"
                      className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://i.postimg.cc/zGq290Kj/IMG-20250714-WA0070-1.jpg";
                      }}
                    />
                    
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                    </div>
                  </div>
                  
                  {/* Profile info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-xl font-bold mb-1">CSE Student</h3>
                    <p className="text-sm opacity-90">Full Stack Developer</p>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full animate-pulse opacity-60"></div>
              
              {/* Floating icons */}
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 space-y-4">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <Code className="w-5 h-5 text-blue-500" />
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <Coffee className="w-5 h-5 text-amber-500" />
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
            Fun Facts About Me
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'bounceIn 0.8s ease-out forwards'
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;