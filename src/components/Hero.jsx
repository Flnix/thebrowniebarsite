import React, { useState, useEffect } from 'react';
import one from '../assets/images/one-min.png'
import two from '../assets/images/two-min.png'
import three from '../assets/images/three-min.png'
import four from '../assets/images/four-min.png'
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: one,
      title: "Decadent Chocolate Brownies",
      subtitle: "Rich, fudgy, and irresistibly delicious"
    },
    {
      url: two, 
      title: "Triple Chocolate Delight",
      subtitle: "Our signature bestseller"
    },
    {
      url: three,
      title: "Artisan Crafted Perfection",
      subtitle: "Made fresh daily with premium ingredients"
    },
    {
      url: four,
      title: "Gourmet Brownie Experience",
      subtitle: "Indulge in luxury desserts"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel Images */}
      <div className="relative h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-6 bg-amber-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-200/30">
              <svg className="w-10 h-10 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.2 8.5H20L14.8 12.5L16 19L12 15.5L8 19L9.2 12.5L4 8.5H10.8L12 2Z"/>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-2xl leading-tight">
            THE BROWNIE BAR
          </h1>
          <p className="text-lg md:text-2xl mb-2 drop-shadow-lg font-light text-amber-100">
            {carouselImages[currentSlide].title}
          </p>
          <p className="text-md md:text-lg mb-8 drop-shadow-lg text-amber-200/90 max-w-2xl mx-auto">
            {carouselImages[currentSlide].subtitle}
          </p>

          <button
            onClick={() => {
              const menuSection = document.getElementById('menu');
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-amber-500/30"
          >
            Explore Our Delicious Menu
          </button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-12 h-3 bg-amber-400 shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="text-white/70 text-center">
          <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
          <p className="text-sm">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;