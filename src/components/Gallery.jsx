import React, { useState } from 'react';

import one from '../assets/images/one-min.png'
import two from '../assets/images/two-min.png'
import three from '../assets/images/three-min.png'
import four from '../assets/images/four-min.png'
import classicbrownie from '../assets/images/classicbrownie-min.png'
import nutella from '../assets/images/nutella-min.png'
import walnut from '../assets/images/walnut-min.png'
import triple from '../assets/images/triple-min.png'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery images - can be replaced with actual product photos
    const galleryImages = [
    {
      id: 1,
      src: classicbrownie,
      alt: "Classic Chocolate Brownies",
      category: "classic"
    },
    {
      id: 2,
      src: triple,
      alt: "Triple Chocolate Brownies",
      category: "premium"
    },
    {
      id: 3,
      src: walnut,
      alt: "Walnut Brownies",
      category: "nutty"
    },
    {
      id: 4,
      src: nutella,
      alt: "Nutella Brownies",
      category: "premium"
    },
    {
      id: 5,
      src: two,
      alt: "Brownie Bites",
      category: "mini"
    },
    {
      id: 6,
      src: one,
      alt: "Fudgy Brownies",
      category: "classic"
    },
    {
      id: 7,
      src: four,
      alt: "Gourmet Brownies",
      category: "premium"
    },
    {
      id: 8,
      src: three,
      alt: "Chocolate Chip Brownies",
      category: "classic"
    },
    {
      id: 9,
      src: one,
      alt: "Bento Box Brownies",
      category: "gift"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4">Gallery</h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Feast your eyes on our handcrafted brownie creations
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Craving These Delicious Brownies?</h2>
            <p className="text-amber-100 mb-6 text-lg">Order now and get them delivered fresh to your doorstep!</p>
            <button
              onClick={() => {
                const menuElement = document.getElementById('menu');
                if (menuElement) {
                  menuElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Our Menu
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <h3 className="text-white text-xl font-semibold">{selectedImage.alt}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;