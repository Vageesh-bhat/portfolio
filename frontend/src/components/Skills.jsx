import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Skills = ({ data }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    // Animate skills on component mount
    const timer = setTimeout(() => {
      setAnimatedSkills(data?.categories || []);
    }, 200);
    return () => clearTimeout(timer);
  }, [data]);

  const skillColors = {
    "Programming Languages": "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
    "Frontend Development": "bg-gradient-to-r from-green-500 to-green-700 text-white",
    "Backend Development": "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
    "Tools & Technologies": "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
    "Soft Skills": "bg-gradient-to-r from-pink-500 to-pink-700 text-white"
  };

  const skillIcons = {
    "Programming Languages": "💻",
    "Frontend Development": "🎨",
    "Backend Development": "⚙️",
    "Tools & Technologies": "🛠️",
    "Soft Skills": "🤝"
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data?.title || 'Technical Skills'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and skills I've mastered throughout my journey as a developer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animatedSkills.map((category, index) => (
            <Card 
              key={index} 
              className={`group relative hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 cursor-pointer overflow-hidden ${
                hoveredCategory === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              {/* Gradient background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3 animate-bounce">
                    {skillIcons[category.name] || '🔧'}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills?.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className={`${skillColors[category.name]} hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`}
                      style={{
                        animationDelay: `${(index * 100) + (skillIndex * 50)}ms`,
                        animation: 'fadeInScale 0.6s ease-out forwards'
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Skill count indicator */}
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {category.skills?.length || 0} skills
                </div>
              </CardContent>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Interactive Skills Cloud */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
            Skills at a Glance
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {data?.categories?.flatMap(category => category.skills).map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3 cursor-pointer text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'popIn 0.5s ease-out forwards'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Creative Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "5+", label: "Technologies", icon: "💻" },
            { number: "3+", label: "Years Experience", icon: "⏱️" },
            { number: "4+", label: "Projects Built", icon: "🚀" },
            { number: "∞", label: "Learning Journey", icon: "📚" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              <div className="text-3xl mb-2 animate-pulse">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;