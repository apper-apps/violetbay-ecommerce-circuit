import React, { useState, useEffect } from 'react';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const VariantSelector = ({ product, onVariantChange, className = '' }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  const variants = product?.variants || [];
  const sizes = [...new Set(variants.map(v => v.size))];
  const colors = [...new Set(variants.map(v => v.color))];

  useEffect(() => {
    // Auto-select first available options
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
    }
  }, [sizes, colors, selectedSize, selectedColor]);

  useEffect(() => {
    // Find matching variant when size or color changes
    if (selectedSize && selectedColor) {
      const variant = variants.find(v => 
        v.size === selectedSize && v.color === selectedColor
      );
      setSelectedVariant(variant);
      onVariantChange?.(variant);
    }
  }, [selectedSize, selectedColor, variants, onVariantChange]);

  const getVariantForSizeColor = (size, color) => {
    return variants.find(v => v.size === size && v.color === color);
  };

  const isVariantAvailable = (size, color) => {
    const variant = getVariantForSizeColor(size, color);
    return variant && variant.stock > 0;
  };

  if (variants.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => {
              const isAvailable = colors.some(color => 
                isVariantAvailable(size, color)
              );
              const isSelected = selectedSize === size;
              
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border rounded-lg font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : isAvailable
                        ? 'border-gray-300 hover:border-primary hover:bg-primary/5'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colors.map(color => {
              const isAvailable = selectedSize ? 
                isVariantAvailable(selectedSize, color) : 
                sizes.some(size => isVariantAvailable(size, color));
              const isSelected = selectedColor === color;
              
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={!isAvailable}
                  className={`relative flex items-center space-x-2 px-4 py-2 border rounded-lg font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : isAvailable
                        ? 'border-gray-300 hover:border-primary hover:bg-primary/5'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div 
                    className={`w-4 h-4 rounded-full border-2 ${
                      isSelected ? 'border-white' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="capitalize">{color}</span>
                  {!isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-red-500 rotate-45"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Variant Info */}
      {selectedVariant && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Selected: {selectedSize} • {selectedColor}
            </span>
            {selectedVariant.stock > 0 ? (
              <Badge variant="success" size="sm">
                <ApperIcon name="Check" size={14} className="mr-1" />
                {selectedVariant.stock} in stock
              </Badge>
            ) : (
              <Badge variant="danger" size="sm">
                <ApperIcon name="X" size={14} className="mr-1" />
                Out of stock
              </Badge>
            )}
          </div>
          
          {selectedVariant.priceAdjustment !== 0 && (
            <div className="text-sm text-gray-600">
              {selectedVariant.priceAdjustment > 0 ? '+' : ''}
              ${selectedVariant.priceAdjustment.toFixed(2)} price adjustment
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantSelector;