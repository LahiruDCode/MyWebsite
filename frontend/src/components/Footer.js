import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/LahiruDCode/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/lahiru-dilhara-10365227b/' },
    { name: 'Twitter', url: 'https://twitter.com/Lahiruu01' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </motion.div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
