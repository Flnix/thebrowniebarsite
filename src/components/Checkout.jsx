import React, { useState } from 'react';

const Checkout = ({ cart, totalAmount, onContinueToPayment, onBackToCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false);
        onContinueToPayment(formData);
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  const deliveryFee = 80;
  const finalAmount = totalAmount + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
                <p className="text-amber-100 mt-1 text-sm sm:text-base">Complete your order details</p>
              </div>
              <button
                onClick={onBackToCart}
                className="p-2 hover:bg-amber-700 rounded-full transition-colors duration-200 text-amber-100 hover:text-white"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Customer Information Form - Takes more space */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-4 sm:p-6 shadow-sm border border-amber-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    Delivery Information
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-base ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.name}</p>}
                    </div>

                    {/* Contact Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-base ${
                            errors.email 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-amber-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-base ${
                            errors.phone 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                          placeholder="10-digit number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-amber-900 mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-base resize-none ${
                          errors.address 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Enter your complete delivery address with landmarks"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.address}</p>}
                    </div>

                    {/* Pincode */}
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-semibold text-amber-900 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-base ${
                          errors.pincode 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="6-digit pincode"
                        maxLength="6"
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-2 flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.pincode}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to Payment
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary - Compact sidebar */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 shadow-sm border border-amber-200 sticky top-24">
                  <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                    </div>
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-amber-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-amber-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              // React icon for toppings without images
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-amber-900 text-sm truncate">{item.name}</h3>
                            {item.size && <p className="text-xs text-amber-700">{item.size}</p>}
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                              <span className="font-bold text-amber-900 text-sm">₹{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-amber-300 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-800">Subtotal:</span>
                      <span className="text-amber-900 font-medium">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-800">Delivery:</span>
                      <span className="text-amber-900">₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-amber-900 pt-2 border-t border-amber-300">
                      <span>Total:</span>
                      <span>₹{finalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;