import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/LahiruDCode/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/lahiru-dilhara-10365227b/' },
    { name: 'Twitter', url: 'https://twitter.com/Lahiruu01' },
  ];

  return (
    <footer className="footer-3d">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                background: 'linear-gradient(135deg, #fff 30%, var(--accent))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Lahiru Dilhara
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px' }}>
              © {currentYear} - All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
