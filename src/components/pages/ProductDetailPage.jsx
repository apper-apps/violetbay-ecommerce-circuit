import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ImageZoomer from "@/components/molecules/ImageZoomer";
import VariantSelector from "@/components/molecules/VariantSelector";
import RecommendedProducts from "@/components/organisms/RecommendedProducts";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { useCart } from "@/hooks/useCart";
import { productService } from "@/services/api/productService";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const { addToCart, getCartItem } = useCart();

  const cartItem = getCartItem(parseInt(id));

useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const productData = await productService.getById(id);
        setProduct(productData);
        
        // Load recommended products
        setLoadingRecommended(true);
        try {
          const recommended = await productService.getRecommended(parseInt(id), productData.category);
          setRecommendedProducts(recommended);
        } catch (recErr) {
          console.error('Error loading recommended products:', recErr);
        } finally {
          setLoadingRecommended(false);
        }
      } catch (err) {
        setError('Product not found');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        ...product,
        selectedVariant,
        variantPrice: selectedVariant ? product.price + selectedVariant.priceAdjustment : product.price
      };
      addToCart(productToAdd, quantity);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const getCurrentPrice = () => {
    if (selectedVariant) {
      return product.price + selectedVariant.priceAdjustment;
    }
    return product.price;
  };

  const isProductAvailable = () => {
    if (!product?.inStock) return false;
    if (selectedVariant) {
      return selectedVariant.stock > 0;
    }
    return true;
  };

if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error 
            message={error || "Product not found"} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li><ApperIcon name="ChevronRight" size={16} /></li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li><ApperIcon name="ChevronRight" size={16} /></li>
            <li className="text-gray-900 font-medium truncate">
              {product.title}
            </li>
          </ol>
        </nav>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
{/* Product Image with Zoom */}
          <div className="relative">
            <ImageZoomer 
              product={product}
              images={product.images}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="gray" size="sm" className="mb-3">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
<div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold gradient-text">
                  ${getCurrentPrice().toFixed(2)}
                </span>
                {selectedVariant?.priceAdjustment !== 0 && selectedVariant && (
                  <Badge variant="accent" size="sm">
                    {selectedVariant.priceAdjustment > 0 ? '+' : ''}
                    ${selectedVariant.priceAdjustment.toFixed(2)}
                  </Badge>
                )}
                {isProductAvailable() ? (
                  <Badge variant="success" size="sm">
                    <ApperIcon name="Check" size={14} className="mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="danger" size="sm">
                    <ApperIcon name="X" size={14} className="mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
</div>

            {/* Variant Selection */}
            <VariantSelector 
              product={product}
              onVariantChange={handleVariantChange}
            />

            {isProductAvailable() && (
              <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      icon="Minus"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-3"
                    />
                    
                    <span className="font-semibold text-xl min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      icon="Plus"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3"
                    />
                  </div>
                </div>

<div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    icon="ShoppingCart"
                    onClick={handleAddToCart}
                    className="flex-1"
                    disabled={selectedVariant && selectedVariant.stock === 0}
                  >
                    Add to Cart - ${(getCurrentPrice() * quantity).toFixed(2)}
                  </Button>
                  
                  {cartItem && (
                    <div className="flex items-center justify-center px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                      <Badge variant="success" size="sm">
                        <ApperIcon name="Check" size={14} className="mr-1" />
                        {cartItem.quantity} in cart
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ApperIcon name="Truck" size={16} className="mr-2" />
                      Free shipping
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                      30-day returns
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Shield" size={16} className="mr-2" />
                      Secure checkout
                    </div>
                  </div>
</div>
              </div>
            )}
          </div>
        </motion.div>
        {/* Recommended Products */}
        <RecommendedProducts 
          currentProductId={parseInt(id)}
          category={product.category}
          className="mt-16"
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;