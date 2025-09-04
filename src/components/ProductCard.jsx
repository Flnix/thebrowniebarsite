import React, { useState } from 'react';

const ProductCard = ({ product, addToCart, cart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Check if this is a topping and if there are non-topping items in cart
    if (product.category === 'toppings') {
      const hasNonToppings = cart && cart.some(item => item.category !== 'toppings');
      if (!hasNonToppings) {
        alert('Please add a brownie to your cart first before adding toppings!');
        return;
      }
    }
    
    addToCart(product, selectedSize, quantity);
    setQuantity(1);
  };

  const getCurrentPrice = () => {
    if (product.sizes && selectedSize) {
      return selectedSize.price;
    }
    return product.price;
  };

  const isCustomPrice = getCurrentPrice() === 'Custom';
  
  // Check if toppings can be added
  const canAddTopping = () => {
    if (product.category !== 'toppings') return true;
    return cart && cart.some(item => item.category !== 'toppings');
  };

  const isTopping = product.category === 'toppings';
  const canAdd = canAddTopping();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-amber-600 font-medium text-sm">Extra Topping</p>
            </div>
          </div>
        )}
        
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ Bestseller
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        {/* Size Selection */}
        {product.sizes && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedSize?.name === size.name
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Display */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {isCustomPrice ? (
              <span className="text-xl font-bold text-amber-600">Custom Price</span>
            ) : (
              <span className="text-xl font-bold text-amber-600">₹{getCurrentPrice()}</span>
            )}
          </div>
          {!isCustomPrice && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        {!isCustomPrice && (
          <>
            {isTopping && !canAdd ? (
              <div>
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed transition-all duration-300"
                >
                  Add Brownie First
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Add a brownie to your cart before selecting toppings
                </p>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            )}
          </>
        )}

        {isCustomPrice && (
          <button
            onClick={() => window.open('tel:+919876543210', '_self')}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Call for Price
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;