import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';
import FloatingElements from '../components/FloatingElements';
import ScrollProgress from '../components/ScrollProgress';
import { portfolioAPI } from '../services/api';
import { mockData } from '../data/mockData';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState(mockData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const data = await portfolioAPI.getPortfolio();
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio data. Using default data.');
        // Keep using mockData as fallback
      } finally {
        setIsLoading(false);
      }
    };

    
    // fetchPortfolioData();
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        {/* Loading content */}
        <div className="relative z-10 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Loading Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing something amazing for you...
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-1000"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-2000"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''} relative`}>
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Error notification */}
      {error && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-lg max-w-sm">
          <p className="font-bold">Notice:</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Education data={portfolioData.education} />
        <Experience data={portfolioData.experience} />
        <Achievements data={portfolioData.achievements} />
        <Contact data={portfolioData.contact} />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;