import React from 'react';
import { Card, CardContent } from './ui/card';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {(data || []).map((item, index) => (
            <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {item.degree}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          {item.field}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-16">
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {item.institution}
                      </h4>
                      
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
                    </div>
                  </div>
                  
                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-center font-semibold">
                      {item.cgpa || item.percentage}
                    </div>
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

export default Education;