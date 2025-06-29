import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { useCart } from '@/hooks/useCart';
import ApperIcon from '@/components/ApperIcon';

const ProductCard = ({ product }) => {
  const { addToCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.Id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      className="card-gradient overflow-hidden group"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to={`/product/${product.Id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent" size="xs">
                <ApperIcon name="Star" size={12} className="mr-1" />
                Featured
              </Badge>
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge variant="gray" size="xs">
              {product.category}
            </Badge>
          </div>
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="danger">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-text">
                ${product.price}
              </span>
            </div>
            
            {cartItem ? (
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="xs">
                  <ApperIcon name="Check" size={12} className="mr-1" />
                  In Cart ({cartItem.quantity})
                </Badge>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon="ShoppingCart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="shrink-0"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;