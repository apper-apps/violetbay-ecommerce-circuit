import React from 'react';

const Loading = ({ type = 'default', className = '' }) => {
  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card-gradient">
              <div className="bg-gradient-surface rounded-t-xl h-64 mb-4"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gradient-surface rounded w-3/4"></div>
                <div className="h-4 bg-gradient-surface rounded w-1/2"></div>
                <div className="h-6 bg-gradient-surface rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading amazing products...</p>
      </div>
    </div>
  );
};

export default Loading;