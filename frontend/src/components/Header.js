import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="navbar-3d"
      style={{
        borderBottomColor: scrolled ? 'rgba(194,164,255,0.18)' : 'rgba(194,164,255,0.08)',
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="nav-logo"
          >
            Lahiru Dilhara
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA Button */}
          <a
            href="mailto:lahirudilhara08@gmail.com"
            className="btn-3d-primary"
            style={{ padding: '8px 20px', fontSize: '0.82rem' }}
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md"
            aria-label="Toggle menu"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              borderTop: '1px solid rgba(194,164,255,0.1)',
              background: 'rgba(11,8,12,0.95)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link px-3 py-3 rounded-md ${location.pathname === item.href ? 'active' : ''}`}
                    style={{
                      background: location.pathname === item.href ? 'rgba(194,164,255,0.08)' : 'transparent',
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="mailto:lahirudilhara08@gmail.com"
                  className="btn-3d-primary mt-2"
                  style={{ textAlign: 'center' }}
                >
                  Hire Me
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
