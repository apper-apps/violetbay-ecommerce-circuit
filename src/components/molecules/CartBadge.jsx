import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import ApperIcon from '@/components/ApperIcon';

const CartBadge = ({ className = '' }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Link 
      to="/cart" 
      className={`relative inline-flex items-center p-2 text-gray-700 hover:text-primary transition-colors ${className}`}
    >
      <ApperIcon name="ShoppingCart" size={24} />
      
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
            key={itemCount}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default CartBadge;