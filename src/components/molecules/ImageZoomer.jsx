import React, { useState, useRef } from 'react';
import ReactImageZoom from 'react-image-zoom';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ImageZoomer = ({ images = [], product, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  
  // Use product image as fallback if no images array provided
  const imageList = images.length > 0 ? images : [product?.image].filter(Boolean);
  const currentImage = imageList[currentImageIndex] || product?.image;

  const zoomProps = {
    width: 500,
    height: 500,
    zoomWidth: 600,
    img: currentImage,
    offset: { vertical: 0, horizontal: 10 },
    zoomStyle: 'opacity: 0.8;',
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageList.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === imageList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Image with Zoom */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
        <div 
          className="w-full h-full"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
        >
          <ReactImageZoom {...zoomProps} />
        </div>
        
        {/* Navigation arrows for multiple images */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            >
              <ApperIcon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            >
              <ApperIcon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Badges */}
        {product?.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="accent" size="sm">
              <ApperIcon name="Star" size={14} className="mr-1" />
              Featured
            </Badge>
          </div>
        )}
        
        {!product?.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <Badge variant="danger" size="md">
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
            <ApperIcon name="ZoomIn" size={14} className="mr-1" />
            Hover to zoom
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {imageList.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${product?.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageZoomer;