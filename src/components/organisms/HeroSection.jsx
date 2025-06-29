import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <motion.h1
            className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Fashion Forward
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-surface">
              Style Unleashed
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Discover the latest trends in fashion with our curated collection of premium clothing and accessories. From casual wear to elegant pieces, find your perfect style.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link to="/products">
              <Button 
                variant="secondary" 
                size="lg"
                icon="ShoppingBag"
                className="bg-white text-primary hover:bg-gray-100 border-0 shadow-2xl"
              >
                Shop Now
              </Button>
            </Link>
            
            <Link to="/products?featured=true">
              <Button 
                variant="outline" 
                size="lg"
                icon="Star"
                className="border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                Featured Items
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48V0h1200v120z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;