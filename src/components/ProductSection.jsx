import React, { useState } from 'react';
import ProductCard from './ProductCard';
import bento from '../assets/images/bento-min.png'
import browniebites from '../assets/images/brownie bites-min.png'
import choco from '../assets/images/choco-min.png'

import classicbrownie from '../assets/images/classicbrownie-min.png'
import nutella from '../assets/images/nutella-min.png'
import walnut from '../assets/images/walnut-min.png'
import triple from '../assets/images/triple-min.png'
const ProductSection = ({ products, addToCart, cart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'brownie', label: 'Brownies' },
    { id: 'toppings', label: 'Extra Toppings' },
    { id: 'others', label: 'Others' }
  ];

  // Default menu products based on your actual menu
  const defaultProducts = [
    // Brownie Products - Based on actual menu pricing
    {
      id: 'classic-brownie',
      name: 'Classic Brownie',
      category: 'brownie',
      description: 'A soft, chocolate brownie without nuts or toppings',
      image: classicbrownie,
      sizes: [
        { name: '250GM', price: 299 },
        { name: '500GM', price: 499 }
      ]
    },
    {
      id: 'triple-chocolate',
      name: 'Triple Chocolate',
      category: 'brownie',
      description: 'A rich brownie loaded with dark, milk, and white chocolate chunks',
      image: triple,
      bestseller: true,
      sizes: [
        { name: '250GM', price: 399 },
        { name: '500GM', price: 699 }
      ]
    },
    {
      id: 'walnut-brownie',
      name: 'Walnut Brownie',
      category: 'brownie',
      description: 'A chocolate brownie mixed with crunchy walnut pieces',
      image: walnut,
      sizes: [
        { name: '250GM', price: 349 },
        { name: '500GM', price: 599 }
      ]
    },
    {
      id: 'chocochip-brownie',
      name: 'Chocochip Brownie',
      category: 'brownie',
      description: 'A chocolate brownie mixed with premium chocolate chips',
      image: choco,
      sizes: [
        { name: '250GM', price: 349 },
        { name: '500GM', price: 599 }
      ]
    },
    {
      id: 'nutella-brownie',
      name: 'Nutella Brownie',
      category: 'brownie',
      description: 'A soft brownie filled and topped with gooey Nutella',
      image: nutella,
      bestseller: true,
      sizes: [
        { name: '250GM', price: 349 },
        { name: '500GM', price: 599 }
      ]
    },

    // Extra Toppings - All 50 rupees each (no images as requested)
    {
      id: 'cashew-topping',
      name: 'Cashew',
      category: 'toppings',
      description: 'Premium roasted cashews to add crunch to your brownies',
      price: 50
    },
    {
      id: 'chocochip-topping',
      name: 'Choco Chips',
      category: 'toppings',
      description: 'Extra chocolate chips for the ultimate chocolate experience',
      price: 50
    },
    {
      id: 'biscoff-topping',
      name: 'Biscoff',
      category: 'toppings',
      description: 'Crunchy Biscoff cookie pieces for added texture and flavor',
      price: 50
    },
    {
      id: 'double-chocolate-topping',
      name: 'Double Chocolate',
      category: 'toppings',
      description: 'Extra dark and milk chocolate chunks for chocolate lovers',
      price: 50
    },

    // Others category
    {
      id: 'brownie-bites',
      name: 'Brownie Bites',
      category: 'others',
      description: 'Mini-sized brownies loaded with Nutella, nuts and choco chips',
      image: browniebites,
      bestseller: true,
      price: 249
    },
    {
      id: 'bento-brownies',
      name: 'Bento Brownies',
      category: 'others',
      description: 'Cute, gift-style brownie box with rich brownies, perfect for special occasions or self-treats',
      image: bento,
      bestseller: true,
      price: 'Custom'
    }
  ];

  // Always use defaultProducts to ensure toppings are available
  const productsToShow = defaultProducts;

  const filteredProducts = selectedCategory === 'all'
    ? productsToShow
    : productsToShow.filter(product => product.category === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Our Premium Menu
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium brownies, each made with
            the finest ingredients and baked fresh to order.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-800 hover:bg-amber-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">No products found</h3>
            <p className="text-amber-700">Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;