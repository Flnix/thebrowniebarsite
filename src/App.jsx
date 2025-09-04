import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Gallery from './components/Gallery';
import './App.css';
import chocowal from './assets/images/chocowalnut-min.png'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const products = [
    {
      id: 1,
      name: "Classic Brownie",
      description: "A soft, chocolate brownie without nuts or toppings",
      sizes: [
        {size: "250GM", price: 299},
        {size: "500GM", price: 499}
      ],
      category: "brownie",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80"
    },
    {
      id: 2,
      name: "Triple Chocolate",
      description: "A rich brownie loaded with dark, milk, and white chocolate chunks",
      sizes: [
        {size: "250GM", price: 399},
        {size: "500GM", price: 699}
      ],
      category: "brownie",
      bestseller: true,
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80"
    },
    {
      id: 3,
      name: "Walnut/Chocochip Brownie", 
      description: "A chocolate brownie mixed with crunchy walnut pieces",
      sizes: [
        {size: "250GM", price: 349},
        {size: "500GM", price: 599}
      ],
      category: "brownie",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&q=80"
    },
    {
      id: 4,
      name: "Nutella Brownie",
      description: "A soft brownie filled and topped with gooey Nutella", 
      sizes: [
        {size: "250GM", price: 349},
        {size: "500GM", price: 599}
      ],
      category: "brownie",
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80"
    },
    {
      id: 5,
      name: "Brownie Bites",
      description: "Mini-sized brownies loaded with Nutella, nuts and choco chips",
      price: 249,
      category: "others",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80"
    },
    {
      id: 6,
      name: "Bento Brownies",
      description: "Cute, gift-style brownie box with rich brownies, perfect for special occasions",
      price: "Custom",
      category: "others", 
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80"
    }
  ];

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      size: selectedSize?.size || null,
      price: selectedSize?.price || product.price,
      quantity,
      image: product.image
    };

    setCart(prevCart => [...prevCart, cartItem]);
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    setIsCartOpen(false);
  };

  const Footer = () => (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-amber-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d97706 0%, transparent 50%)"
        }}></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.2 8.5H20L14.8 12.5L16 19L12 15.5L8 19L9.2 12.5L4 8.5H10.8L12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-amber-100">THE BROWNIE BAR</h3>
              </div>
              <p className="text-amber-200 mb-6 leading-relaxed max-w-md">
                Crafting premium handmade brownies with love and the finest ingredients. 
                Every bite tells a story of passion, quality, and pure indulgence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-sm font-bold">IG</span>
                </a>
                <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-sm font-bold">FB</span>
                </a>
                <a href="#" className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-sm font-bold">WA</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-100">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setCurrentPage('home')} className="text-amber-200 hover:text-amber-100 transition-colors duration-200">Home</button></li>
                <li><button onClick={() => setCurrentPage('gallery')} className="text-amber-200 hover:text-amber-100 transition-colors duration-200">Gallery</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="text-amber-200 hover:text-amber-100 transition-colors duration-200">About Us</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="text-amber-200 hover:text-amber-100 transition-colors duration-200">Contact</button></li>
                <li><button onClick={handleCartToggle} className="text-amber-200 hover:text-amber-100 transition-colors duration-200">Cart</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-100">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-amber-200 text-sm">Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span className="text-amber-200 text-sm">@thebrowniejbar.chennai</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-amber-200 text-sm">Pickup & Delivery Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-300 text-sm mb-4 md:mb-0">
              © 2025 The Brownie Bar. Made with ❤️ in Chennai
            </p>
            <p className="text-amber-400 text-sm">
              Premium brownies • Fresh daily • Order now!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <ProductSection 
              products={products} 
              addToCart={addToCart}
              cart={cart} 
            />
          </>
        );
      case 'gallery':
        return (
          <div className="pt-16">
            <Gallery />
          </div>
        );
      case 'checkout':
        return (
          <div className="pt-16">
            <Checkout 
              cart={cart}
              totalAmount={getTotalAmount()}
              onContinueToPayment={(customerData) => {
                setCustomerInfo(customerData);
                setCurrentPage('payment');
              }}
              onBackToCart={() => setCurrentPage('home')}
            />
          </div>
        );
      case 'payment':
        return (
          <div className="pt-16">
            <Payment 
              customerInfo={customerInfo}
              cart={cart}
              totalAmount={getTotalAmount()}
              onBackToCheckout={() => setCurrentPage('checkout')}
            />
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen flex flex-col pt-16">
            <div className="flex-1">
              <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.2 8.5H20L14.8 12.5L16 19L12 15.5L8 19L9.2 12.5L4 8.5H10.8L12 2Z"/>
                      </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">About The Brownie Bar</h1>
                    <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                      Where passion meets perfection in every handcrafted brownie
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="order-2 md:order-1">
                      <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h2>
                      <div className="text-lg text-gray-700 space-y-4">
                        <p>
                          Founded with a simple mission: to create the most delicious, indulgent brownies 
                          that bring joy to every occasion. What started as a passion project in our home 
                          kitchen has grown into Chennai's beloved brownie destination.
                        </p>
                        <p>
                          Every brownie is crafted with premium Belgian chocolate, farm-fresh ingredients, 
                          and traditional baking techniques passed down through generations. We believe 
                          that great desserts are made with love, attention to detail, and uncompromising quality.
                        </p>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-xl">
                        <img
                          src={chocowal}
                          alt="Brownie making process"
                          className="w-full h-64 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-16">
                    <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Made with Love</h3>
                        <p className="text-gray-700">Every brownie is handcrafted with care and passion</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Premium Quality</h3>
                        <p className="text-gray-700">Only the finest ingredients make it into our brownies</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Fresh Daily</h3>
                        <p className="text-gray-700">Baked fresh every day for the ultimate experience</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-amber-900 mb-6">From Our Kitchen to Your Heart</h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                      Thank you for choosing The Brownie Bar. Every order brings us joy, and we're 
                      committed to delivering not just brownies, but moments of happiness that create 
                      lasting memories.
                    </p>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      Explore Our Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="min-h-screen flex flex-col pt-16">
            <div className="flex-1">
              <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">Get In Touch</h1>
                    <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                      Ready to order or have questions? We're here to help make your brownie dreams come true!
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-xl">
                      <h2 className="text-2xl font-bold text-amber-900 mb-8">Contact Information</h2>
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 mb-1">Location</h3>
                            <p className="text-gray-700">Chennai, Tamil Nadu, India</p>
                            <p className="text-sm text-amber-600">Serving all across Chennai</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 mb-1">Instagram</h3>
                            <p className="text-gray-700">@thebrowniejbar.chennai</p>
                            <p className="text-sm text-amber-600">DM us for orders & inquiries</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 mb-1">Delivery Options</h3>
                            <p className="text-gray-700">Pickup • Uber Parcel • Courier</p>
                            <p className="text-sm text-amber-600">Fast & reliable delivery</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-100">
                      <h2 className="text-2xl font-bold text-amber-900 mb-8">How to Order</h2>
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            1
                          </div>
                          <div>
                            <h3 className="font-semibold text-amber-900 mb-1">Browse & Select</h3>
                            <p className="text-gray-700 text-sm">Choose from our delicious menu and add to cart</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            2
                          </div>
                          <div>
                            <h3 className="font-semibold text-amber-900 mb-1">Checkout</h3>
                            <p className="text-gray-700 text-sm">Provide your delivery details and preferences</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            3
                          </div>
                          <div>
                            <h3 className="font-semibold text-amber-900 mb-1">Secure Payment</h3>
                            <p className="text-gray-700 text-sm">Pay safely using UPI with our QR code system</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                            4
                          </div>
                          <div>
                            <h3 className="font-semibold text-amber-900 mb-1">Fresh Delivery</h3>
                            <p className="text-gray-700 text-sm">Receive your freshly baked brownies at your doorstep</p>
                          </div>
                        </div>
                      </div>

                    
                    </div>
                  </div>

                  <div className="text-center bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-12 text-white shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
                    <p className="text-xl mb-8 text-amber-100">
                      Start building your perfect brownie box today!
                    </p>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItems={getTotalItems()}
        onCartToggle={handleCartToggle}
      />

      <Cart 
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        totalAmount={getTotalAmount()}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;