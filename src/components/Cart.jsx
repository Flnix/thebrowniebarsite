import React, { useEffect } from 'react';

const Cart = ({ cart, updateQuantity, removeItem, totalAmount, onCheckout, isOpen, onClose }) => {
  // Close cart when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.cart-sidebar') && !event.target.closest('button[aria-label="cart"]')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    onClose();
    onCheckout();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300" 
          onClick={onClose} 
        />
      )}

      {/* Cart Sidebar */}
      <div className={`cart-sidebar fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900">Shopping Cart</h2>
              <p className="text-sm text-amber-700">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100 rounded-full transition-all duration-200 text-amber-800 hover:text-amber-900"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M16 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Add some delicious brownies to get started!</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md"
                            />
                          ) : (
                            // React icon for toppings without images
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-200 rounded-lg shadow-md flex items-center justify-center">
                              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-amber-900 text-sm sm:text-base truncate">{item.name}</h4>
                          {item.size && <p className="text-xs sm:text-sm text-amber-700 mt-1">{item.size}</p>}
                          <p className="text-lg sm:text-xl font-bold text-amber-800 mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-all duration-200"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-800 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                              </svg>
                            </button>
                            <span className="w-8 text-center font-bold text-amber-900 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-800 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-amber-700">Subtotal:</span>
                        <span className="font-bold text-amber-900">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-amber-200 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-semibold text-amber-800">Total:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-900">₹{totalAmount}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>
                <p className="text-center text-xs sm:text-sm text-amber-600">
                  Delivery: ₹80
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;