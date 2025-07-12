import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Scroll indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="relative">
          <div className="w-2 h-32 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          <div 
            className="absolute -left-1 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ top: `${scrollProgress}%`, transform: 'translateY(-50%)' }}
          />
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;