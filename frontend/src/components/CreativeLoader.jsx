import React, { useState, useEffect } from 'react';
import { Sparkles, Code, Zap, Target, Lightbulb } from 'lucide-react';

const CreativeLoader = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Code, text: "Initializing creativity..." },
    { icon: Sparkles, text: "Adding magic touches..." },
    { icon: Zap, text: "Energizing components..." },
    { icon: Target, text: "Focusing on perfection..." },
    { icon: Lightbulb, text: "Illuminating brilliance..." }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <CurrentIcon className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Crafting Excellence
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {steps[currentStep].text}
        </p>
        
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {progress}% Complete
        </p>
      </div>
    </div>
  );
};

export default CreativeLoader;