import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, Calendar, ExternalLink } from 'lucide-react';

const Achievements = ({ data }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Competition':
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 'Academic':
        return <Medal className="w-6 h-6 text-blue-500" />;
      case 'Certification':
        return <Award className="w-6 h-6 text-green-500" />;
      default:
        return <Award className="w-6 h-6 text-purple-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Competition':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Certification':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
  };

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {(data || []).map((achievement) => (
            <Card
              key={achievement.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-200">
                    {getTypeIcon(achievement.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {achievement.title}
                      </h3>
                      <Badge className={`${getTypeColor(achievement.type)} font-semibold`}>
                        {achievement.type}
                      </Badge>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm leading-relaxed">
                      {achievement.description}
                    </p>

                    {achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-colors mb-2"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Certificate
                      </a>
                    )}

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {achievement.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-400">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-400">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">7.5</div>
              <div className="text-gray-600 dark:text-gray-400">CGPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
