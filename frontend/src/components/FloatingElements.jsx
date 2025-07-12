import React, { useEffect, useState } from 'react';
import { Code, Coffee, Music, Gamepad2, BookOpen, Zap } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const icons = [
      { icon: Code, color: 'text-blue-500' },
      { icon: Coffee, color: 'text-amber-500' },
      { icon: Music, color: 'text-purple-500' },
      { icon: Gamepad2, color: 'text-green-500' },
      { icon: BookOpen, color: 'text-red-500' },
      { icon: Zap, color: 'text-yellow-500' }
    ];

    const newElements = Array.from({ length: 8 }, (_, i) => {
      const IconComponent = icons[i % icons.length].icon;
      return {
        id: i,
        Icon: IconComponent,
        color: icons[i % icons.length].color,
        size: Math.random() * 20 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5
      };
    });

    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute opacity-20 ${element.color}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animation: `float ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`
          }}
        >
          <element.Icon size={element.size} />
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;