'use client';

import { useState, useEffect } from 'react';

export default function Carousel() {

  const images = [
    '/charizard.jpg',
    '/pikachu.jpg',
    '/gengar.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm border border-gray-200">

      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Carousel Images`}
          className={`absolute inset-0 w-full h-full object-cover object-[62%_38%] transition-opacity duration-1000 ease-in-out  ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

    </div>
  );
}