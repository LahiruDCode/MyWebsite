import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';

// 3D tilt card component
const TiltCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.transition = 'transform 0.5s ease';
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.1s ease';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        className="glass-card project-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transition: 'transform 0.5s ease, box-shadow 0.3s ease' }}
      >
        {/* Project Image */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-card-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
            }}
          />
        ) : null}
        <div
          className="project-card-img-placeholder"
          style={{ display: project.image ? 'none' : 'flex' }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="3 9 9 9 9 3"/><polyline points="21 9 15 9 15 3"/><polyline points="3 15 9 15 9 21"/><polyline points="21 15 15 15 15 21"/>
          </svg>
        </div>

        {/* Card Body */}
        <div className="project-card-body">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>

          {/* Tech Tags */}
          <div className="project-tech-tags">
            {project.technologies.map((tech) => (
              <span key={tech} className="project-tech-tag">{tech}</span>
            ))}
          </div>

          {/* Links */}
          <div className="project-links">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projectsToShow, setProjectsToShow] = useState(projectsData);

  const projectCategories = ['all', 'web', 'mobile'];

  useEffect(() => {
    if (filter === 'all') {
      setProjectsToShow(projectsData);
    } else {
      const filtered = projectsData.filter((p) =>
        p.category === filter ||
        p.technologies.some((t) => t.toLowerCase() === filter.toLowerCase())
      );
      setProjectsToShow(filtered);
    }
  }, [filter]);

  return (
    <div className="page-section">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-header"
      >
        <p className="section-label">My Work</p>
        <h1 className="section-title">Featured <span style={{ color: 'var(--accent)' }}>Projects</span></h1>
        <div className="section-divider" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0' }}>
          A collection of projects I've built — hover cards for a 3D effect!
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className="skill-tag"
            style={{
              background: filter === category ? 'var(--accent-dim)' : 'var(--bg-card)',
              borderColor: filter === category ? 'var(--accent)' : 'var(--border)',
              color: filter === category ? 'var(--accent)' : 'var(--text-muted)',
              padding: '8px 20px',
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'capitalize',
              transition: 'all 0.25s ease',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsToShow.length > 0 ? (
          projectsToShow.map((project, index) => (
            <TiltCard key={project.id || index} project={project} index={index} />
          ))
        ) : (
          <p
            className="col-span-3 text-center py-16"
            style={{ color: 'var(--text-muted)' }}
          >
            No projects found for this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
