import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/organisms/HeroSection';
import CategoryShowcase from '@/components/organisms/CategoryShowcase';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
    </motion.div>
  );
};

export default HomePage;