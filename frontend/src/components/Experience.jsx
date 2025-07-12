import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, Calendar, Award } from 'lucide-react';

const Experience = ({ data }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Leadership':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Full-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {(data || []).map((item, index) => (
            <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {item.position}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          {item.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.description}
                      </p>
                      
                      {item.achievements && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {(item.achievements || []).map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <Badge className={`${getTypeColor(item.type)} font-semibold`}>
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;