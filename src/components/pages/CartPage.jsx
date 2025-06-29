import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import CartItem from '@/components/molecules/CartItem';
import Empty from '@/components/ui/Empty';
import { useCart } from '@/hooks/useCart';
import ApperIcon from '@/components/ApperIcon';

const CartPage = () => {
  const { items, getCartTotal, getCartItemCount, clearCart } = useCart();
  const total = getCartTotal();
  const itemCount = getCartItemCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>
          
          <Empty
            title="Your cart is empty"
            description="Add some amazing products to get started!"
            icon="ShoppingCart"
            actionText="Continue Shopping"
            onAction={() => window.location.href = '/products'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Shopping Cart
              <span className="text-lg text-gray-600 ml-2 font-normal">
                ({itemCount} item{itemCount !== 1 ? 's' : ''})
              </span>
            </h1>
            
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold gradient-text">
                        ${(total * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Link to="/checkout" className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      icon="CreditCard"
                      className="w-full"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link to="/products" className="block">
                    <Button
                      variant="outline"
                      size="md"
                      icon="ArrowLeft"
                      className="w-full"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ApperIcon name="Shield" size={16} className="mr-2" />
                      Secure checkout
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                      Easy returns
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;