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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--bg)' }} // Dark background from theme
    >
      {/* Subtle purple background glow */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '35%', width: '30vw', height: '30vw',
          background: 'rgba(194, 164, 255, 0.08)', filter: 'blur(100px)', borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Welcome to */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontSize: '1rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              color: 'var(--text-muted)' 
            }}
          >
            Welcome to
          </motion.div>

          {/* Name and title container */}
          <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
            <motion.span
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontSize: '3.5rem', fontWeight: 800, color: '#ffffff' }}
              className="text-center md:text-left"
            >
              Lahiru's
            </motion.span>
            
            <motion.span
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ 
                fontSize: '3.5rem', 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff 10%, var(--accent) 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="text-center md:text-left"
            >
              Portfolio
            </motion.span>
          </div>
        </div>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute mt-64 flex flex-col items-center"
        >
          <div style={{
            width: '42px', height: '42px',
            border: '3px solid rgba(194, 164, 255, 0.15)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            boxShadow: '0 0 20px rgba(194, 164, 255, 0.3)'
          }} className="mb-5" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
          >
            INITIALIZING 3D ENVIRONMENT...
          </motion.span>
        </motion.div>
      </div>
      
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

export default Loader;
