import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form data (static version):', formData);
      setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      label: 'Email',
      value: 'lahirudilhara08@gmail.com',
      href: 'mailto:lahirudilhara08@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Location',
      value: 'Colombo, Sri Lanka',
      href: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'LahiruDCode',
      href: 'https://github.com/LahiruDCode/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'Lahiru Dilhara',
      href: 'https://www.linkedin.com/in/lahiru-dilhara-10365227b/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="page-section">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-header"
      >
        <p className="section-label">Let's connect</p>
        <h1 className="section-title">Get in <span style={{ color: 'var(--accent)' }}>Touch</span></h1>
        <div className="section-divider" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '28px' }}>
              Contact Info
            </h2>

            {contactItems.map((item, i) => (
              <div key={i} className="contact-info-item">
                <div className="contact-icon-wrap">{item.icon}</div>
                <div>
                  <p className="contact-label">{item.label}</p>
                  <p className="contact-value">
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.6)', flexShrink: 0, animation: 'glowPulse 2s ease-in-out infinite' }} />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>Available for opportunities</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Open to full-time, freelance, and collaboration</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="glass-card"
          style={{ padding: '32px' }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '28px' }}>
            Send a Message
          </h2>

          {submitStatus && (
            <div
              style={{
                padding: '14px 18px',
                marginBottom: '20px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                background: submitStatus.type === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                border: `1px solid ${submitStatus.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                color: submitStatus.type === 'success' ? '#4ade80' : '#f87171',
              }}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-3d">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-3d"
                placeholder="Lahiru Dilhara"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-3d"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-3d"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="input-3d"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-3d-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px 28px', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
