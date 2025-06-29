import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out transform focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-primary text-white shadow-lg hover:shadow-xl focus:ring-primary",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary",
    accent: "bg-gradient-accent text-white shadow-lg hover:shadow-xl focus:ring-accent",
    outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:ring-primary",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95";

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="animate-spin mr-2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} 
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          className="mr-2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} 
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          className="ml-2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} 
        />
      )}
    </motion.button>
  );
};

export default Button;