import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Github, ExternalLink, Eye, Star, GitBranch, Users } from 'lucide-react';

const Projects = ({ data }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    // Stagger animation for projects
    data?.forEach((_, index) => {
      setTimeout(() => {
        setVisibleProjects(prev => [...prev, index]);
      }, index * 200);
    });
  }, [data]);

  const getRandomStats = () => ({
    stars: Math.floor(Math.random() * 100) + 10,
    forks: Math.floor(Math.random() * 50) + 5,
    contributors: Math.floor(Math.random() * 10) + 1
  });

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and creativity. Each project represents a unique challenge I've conquered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((project, index) => {
            const stats = getRandomStats();
            const isVisible = visibleProjects.includes(index);
            
            return (
              <Card 
                key={project.id} 
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                } ${hoveredProject === index ? 'ring-2 ring-blue-500 shadow-blue-500/25' : ''}`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <CardContent className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image_url || project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
                      }}
                    />
                    
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-4">
                        <a
                          href={project.github_url || project.githubUrl}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                          aria-label="View code"
                        >
                          <Github className="w-6 h-6 text-white" />
                        </a>
                        <a
                          href={project.live_url || project.liveUrl}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-6 h-6 text-white" />
                        </a>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full">Live</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs hover:scale-110 transition-transform duration-200 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Project stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{stats.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{stats.contributors}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={project.github_url || project.githubUrl}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 transform hover:scale-105"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                      <a
                        href={project.live_url || project.liveUrl}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 transform hover:scale-105"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </div>
                  </div>
                </CardContent>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Want to see more?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Check out my GitHub for more projects and contributions
              </p>
            </div>
            <a
              href="https://github.com/yourusername"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5 mr-2" />
              View More Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;