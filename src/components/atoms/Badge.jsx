import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'sm',
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800"
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1 text-base"
  };

  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;