import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ setLoading }) => {
  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Main content container with flex column layout */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Welcome to - coming from top */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            Welcome to
          </motion.div>

          {/* Name and title container */}
          <div className="flex items-center justify-center space-x-4 md:space-x-6">
            {/* Lahiru's - coming from left */}
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-extrabold text-blue-500"
            >
              Lahiru's
            </motion.span>
            
            {/* Portfolio - coming from right */}
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold text-blue-400"
            >
              Portfolio
            </motion.span>
          </div>
        </div>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="absolute mt-56 flex flex-col items-center"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2 }}
            className="text-sm text-gray-300"
          >
            Loading amazing content...
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
