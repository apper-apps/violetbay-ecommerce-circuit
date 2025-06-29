import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No items found",
  description = "Try adjusting your search or filters",
  icon = "Package",
  actionText,
  onAction,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center py-16 ${className}`}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-surface rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={32} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {actionText && onAction && (
          <Button
            variant="primary"
            onClick={onAction}
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;