import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const footerLinks = {
    'Shop': [
      { name: 'All Products', href: '/products' },
      { name: 'Men', href: '/products?category=Men' },
      { name: 'Women', href: '/products?category=Women' },
      { name: 'Kids', href: '/products?category=Kids' }
    ],
    'Customer Care': [
      { name: 'Contact Us', href: '#' },
      { name: 'Size Guide', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' }
    ],
    'Company': [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Youtube', icon: 'Youtube', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Sparkles" className="text-white" size={20} />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                VioletBay
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Your destination for premium fashion and style. Discover the latest trends and timeless pieces that make you feel confident and beautiful.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 VioletBay. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <ApperIcon name="Shield" size={16} />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <ApperIcon name="Truck" size={16} />
              <span>Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;