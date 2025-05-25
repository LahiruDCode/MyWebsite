import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ 
  title, 
  subtitle, 
  children, 
  className = '', 
  titleClassName = '',
  subtitleClassName = '',
  delay = 0 
}) => {
  return (
    <motion.section
      className={`py-12 md:py-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {title && (
        <div className="mb-10 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>
            {title.split(' ').map((word, index, array) => (
              <React.Fragment key={index}>
                {index === array.length - 1 ? (
                  <span className="text-primary dark:text-blue-400">{word}</span>
                ) : (
                  `${word} `
                )}
              </React.Fragment>
            ))}
          </h2>
          {subtitle && (
            <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
};

export default Section;
