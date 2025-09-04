import React, { useState, useEffect } from 'react';
import qrImage from '../assets/images/qr.png';

const Payment = ({ customerInfo, cart, totalAmount, onBackToCheckout }) => {
  const [referenceCode, setReferenceCode] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [refCopySuccess, setRefCopySuccess] = useState(false);
  const [upiCopySuccess, setUpiCopySuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // UPI ID - Replace with your actual UPI ID
  const UPI_ID = 'example@upi';

  // Google Apps Script Web App URL
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAKFUdgXtpBPMLcOe-xNbNgfMCYAkoIXSpt4249jzcBxqRKzrp1z1Ap0i5Vd13q-gq/exec';

  // Generate random 8-character reference code
  useEffect(() => {
    const generateReferenceCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    setReferenceCode(generateReferenceCode());
  }, []);

  const copyReferenceCode = async () => {
    try {
      await navigator.clipboard.writeText(referenceCode);
      setRefCopySuccess(true);
      setTimeout(() => setRefCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setRefCopySuccess(true);
      setTimeout(() => setRefCopySuccess(false), 2000);
    }
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setUpiCopySuccess(true);
      setTimeout(() => setUpiCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = UPI_ID;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setUpiCopySuccess(true);
      setTimeout(() => setUpiCopySuccess(false), 2000);
    }
  };

  const sendToGoogleSheets = async (orderData) => {
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw0P2CCm9GGZqbKO1cWNhhhDsAFhNNCRrSe_E2eFp5gzUrbgVpnpmrS6_JVDAueJpzq/exec',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          mode: "no-cors",
        }
      );
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      return false;
    }
  };

  const handlePaymentConfirmation = async () => {
    setIsProcessing(true);

    // Calculate final amount including delivery
    const deliveryFee = 80;
    const finalAmount = totalAmount + deliveryFee;

    // Prepare order data for Google Sheets
    const orderData = {
      // Customer Information
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address,
      customerPincode: customerInfo.pincode,

      // Order Information
      referenceCode: referenceCode,
      orderDate: new Date().toISOString(),
      orderTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),

      // Cart Items
      cartItems: cart.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size || '',
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        image: item.image || ''
      })),

      // Pricing
      subtotal: totalAmount,
      deliveryFee: deliveryFee,
      finalAmount: finalAmount,

      // Status
      paymentStatus: 'Completed',
      orderStatus: 'Confirmed'
    };

    try {
      await sendToGoogleSheets(orderData);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentConfirmed(true);
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentConfirmed(true);
      }, 2000);
    }
  };

  // Calculate final amount including delivery
  const deliveryFee = 80;
  const finalAmount = totalAmount + deliveryFee;

  if (paymentConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for your order! We've received your payment and will start preparing your delicious brownies right away.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-xl mb-6">
              <p className="text-green-800 font-semibold text-lg">Reference: {referenceCode}</p>
              <p className="text-sm text-green-700 mt-2">Keep this reference for order tracking</p>
            </div>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Estimated delivery: 2-4 hours</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>Confirmation sent to {customerInfo.email}</span>
              </div>
            </div>
            <p className="text-gray-600">
              We'll contact you soon with delivery updates. Your fresh brownies are on the way!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Payment</h1>
                <p className="text-amber-100 mt-1">Complete your secure payment</p>
              </div>
              <button
                onClick={onBackToCheckout}
                className="p-2 hover:bg-amber-700 rounded-full transition-colors duration-200 text-amber-100 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Payment Instructions */}
              <div className="order-2 lg:order-1">
                <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  UPI Payment
                </h2>

                {/* UPI QR Code */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl mb-6 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">Scan QR Code to Pay</h3>
                  <div className="w-56 h-56 bg-white border-2 border-amber-300 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={qrImage}
                        alt="UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-amber-800 font-semibold text-lg">Amount: ₹{finalAmount}</p>
                  <p className="text-sm text-amber-600">Scan with any UPI app (GPay, PhonePe, Paytm, etc.)</p>
                </div>

                {/* Reference Code Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a2 2 0 01-2-2zm0 0V9a2 2 0 012-2h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a2 2 0 01-2-2z"/>
                    </svg>
                    Reference Code
                  </h3>
                  
                  <div className="bg-white rounded-xl p-4 border border-blue-200 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-blue-900 tracking-wider">
                        {referenceCode}
                      </span>
                      <button
                        onClick={copyReferenceCode}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          refCopySuccess 
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        {refCopySuccess ? (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-100 border border-blue-200 rounded-xl p-3">
                    <p className="text-blue-900 font-medium text-sm mb-1">
                      ⚠️ Important: Add this code in the payment note/remark field
                    </p>
                    <p className="text-blue-800 text-xs">
                      This helps us identify your payment and process your order quickly
                    </p>
                  </div>
                </div>

                {/* UPI ID Section - Yellow Theme */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.657-1.343-3-3-3H7a3 3 0 000 6h2a3 3 0 003-3zM17 9h-1a1 1 0 000 2h1a1 1 0 010 2h-1a1 1 0 100 2h1a3 3 0 000-6z"/>
                    </svg>
                    UPI ID
                  </h3>
                  
                  <div className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-mono font-semibold text-amber-900 tracking-tight break-all">
                        {UPI_ID}
                      </span>
                      <button
                        onClick={copyUpiId}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          upiCopySuccess 
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        {upiCopySuccess ? (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                            Copy UPI ID
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-amber-100 border border-amber-200 rounded-xl p-3 mt-3">
                    <p className="text-amber-900 font-medium text-sm mb-1">
                      💡 UPI ID provided for manual payment entry if needed
                    </p>
                    <p className="text-amber-800 text-xs">
                      Use this if QR scanning is not available on your device
                    </p>
                  </div>
                </div>

                {/* Payment Steps */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                    Payment Steps
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Open any UPI app (GPay, PhonePe, Paytm)',
                      'Scan the QR code above',
                      `Enter amount: ₹${finalAmount}`,
                      `Add "${referenceCode}" in notes/remarks`,
                      'Complete the payment',
                      'Click "Payment Completed" below'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-green-800 text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-1 lg:order-2">
                <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Order Summary
                </h2>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Delivery Details
                  </h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span className="truncate ml-2">{customerInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{customerInfo.phone}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-300">
                      <p className="font-medium">Address:</p>
                      <p className="text-gray-600 mt-1">{customerInfo.address}</p>
                      <p className="text-gray-600">Pincode: {customerInfo.pincode}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 shadow-sm border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-4">Items Ordered</h3>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-amber-100 rounded-lg overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-amber-900 text-sm">{item.name}</p>
                            {item.size && <p className="text-xs text-amber-700">{item.size}</p>}
                            <p className="text-xs text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                          </div>
                        </div>
                        <p className="font-bold text-amber-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-amber-300 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-amber-900 pt-2 border-t border-amber-300">
                      <span>Total Amount:</span>
                      <span>₹{finalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Confirmation */}
                <button
                  onClick={handlePaymentConfirmation}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Confirming Payment...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      I Have Completed Payment
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  ⚠️ Click only after completing the UPI payment with reference code
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
