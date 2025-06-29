import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button
            variant="primary"
            icon="RefreshCw"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;