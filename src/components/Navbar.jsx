import React, { useState } from 'react';

const Navbar = ({ currentPage, setCurrentPage, cartItems, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-amber-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-xl md:text-2xl font-bold text-amber-900 hover:text-amber-800 transition-colors"
            >
              THE BROWNIE BAR
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  currentPage === item.id
                    ? 'text-white bg-amber-700 shadow-lg'
                    : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart Button & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 transition-all duration-300 rounded-full group"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M16 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 transition-all duration-300 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100 bg-white/95 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg mx-2 mb-1 ${
                  currentPage === item.id
                    ? 'text-white bg-amber-700 shadow-md'
                    : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;