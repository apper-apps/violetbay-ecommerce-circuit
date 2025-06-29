import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const CategoryShowcase = ({ categories = [] }) => {
  const categoryData = [
    {
      name: 'Men',
      image: 'https://picsum.photos/600/400?random=100',
      description: 'Discover sophisticated menswear',
      color: 'from-primary to-secondary'
    },
    {
      name: 'Women',
      image: 'https://picsum.photos/600/400?random=101',
      description: 'Elegant styles for every occasion',
      color: 'from-secondary to-accent'
    },
    {
      name: 'Kids',
      image: 'https://picsum.photos/600/400?random=102',
      description: 'Fun and comfortable kidswear',
      color: 'from-accent to-primary'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every style and occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.name}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-60 transition-opacity`}></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white text-opacity-90 mb-4">
                    {category.description}
                  </p>
                  
                  <Link to={`/products?category=${category.name}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="ArrowRight"
                      iconPosition="right"
                      className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-white hover:text-primary"
                    >
                      Explore {category.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;