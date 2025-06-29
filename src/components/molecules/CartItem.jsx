import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import { useCart } from '@/hooks/useCart';
import ApperIcon from '@/components/ApperIcon';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <Link to={`/product/${item.productId}`} className="shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/product/${item.productId}`}
            className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
          >
            {item.title}
          </Link>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                icon="Minus"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2"
              />
              
              <span className="font-semibold text-lg min-w-[2rem] text-center">
                {item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                icon="Plus"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2"
              />
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
              <p className="text-lg font-bold gradient-text">
                ${itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          icon="Trash2"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        />
      </div>
    </motion.div>
  );
};

export default CartItem;