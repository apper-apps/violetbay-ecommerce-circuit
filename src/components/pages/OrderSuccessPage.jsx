import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const orderData = JSON.parse(lastOrder);
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to parse order data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckCircle" size={48} className="text-green-500" />
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for your purchase! We've received your order and will send you a confirmation email shortly.
          </p>
          
          {order && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-8 text-left max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Order Number</p>
                    <p className="font-medium text-gray-900">#{order.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Order Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{order.billing.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Total</p>
                    <p className="font-medium text-2xl gradient-text">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Shipping Address
                </h3>
                <p className="text-gray-600">
                  {order.billing.name}<br />
                  {order.billing.address}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Items Ordered ({order.items.length})
                </h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {item.title}
                          </p>
                          <p className="text-gray-600 text-xs">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/products">
              <Button
                variant="primary"
                size="lg"
                icon="ShoppingBag"
              >
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                icon="Home"
              >
                Back to Home
              </Button>
            </Link>
          </motion.div>
          
          <div className="mt-12 pt-8 border-t max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <ApperIcon name="Truck" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <ApperIcon name="RotateCcw" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <ApperIcon name="Headphones" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-sm text-gray-600">We're here to help</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;