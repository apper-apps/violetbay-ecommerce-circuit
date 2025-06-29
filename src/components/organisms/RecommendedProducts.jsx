import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import { useCart } from '@/hooks/useCart';
import { productService } from '@/services/api/productService';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const RecommendedProducts = ({ currentProductId, category, className = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const recommended = await productService.getRecommended(currentProductId, category);
        setProducts(recommended);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error('Error loading recommended products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentProductId) {
      loadRecommendedProducts();
    }
  }, [currentProductId, category]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`Added ${product.title} to cart!`);
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Recommended Products
        </h2>
        <Link 
          to="/products"
          className="text-primary hover:text-primary/80 font-medium flex items-center transition-colors"
        >
          View All
          <ApperIcon name="ArrowRight" size={16} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.Id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/products/${product.Id}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {product.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent" size="sm">
                      <ApperIcon name="Star" size={12} className="mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="danger" size="sm">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Badge variant="gray" size="xs" className="mb-2">
                {product.category}
              </Badge>
              
              <Link to={`/products/${product.Id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold gradient-text">
                  ${product.price}
                </span>
                {product.inStock ? (
                  <Badge variant="success" size="xs">
                    <ApperIcon name="Check" size={12} className="mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="danger" size="xs">
                    <ApperIcon name="X" size={12} className="mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>

              {product.inStock && (
                <Button
                  variant="primary"
                  size="sm"
                  icon="ShoppingCart"
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;