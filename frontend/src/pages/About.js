import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'RPA Developer',
    company: 'Trigon RCM',
    period: '2026 - Present',
    description: 'Building automation solutions using UiPath to streamline healthcare revenue cycle processes. Working with APIs to connect different systems and collaborating with the team to improve workflows and reduce manual effort.',
  },
  {
    title: 'RPA Developer',
    company: 'Collective RCM',
    period: '2024 - 2026',
    description: 'Developing automation solutions using UiPath to streamline business processes in the healthcare revenue cycle. Working with APIs to integrate external systems and enhance automation workflows, while collaborating with the team to identify and implement process improvements.',
  },
  {
    title: 'Co-Founder',
    company: 'Caelusk Digital Agency',
    period: '2022 - 2025',
    description: 'Co-founded a digital agency focused on delivering social media and web solutions for clients across different industries. Handled project planning, content creation, and client communication before pausing operations due to academic priorities.',
  },
  {
    title: 'Social Media Representative',
    company: 'DP Foundation',
    period: '2022 - 2024',
    description: "Managed and created social media content to promote the foundation's initiatives. Helped grow online engagement and maintain a consistent digital presence.",
  },
];

const education = [
  {
    degree: 'BSc (Hons) in Information Technology Specialising in Software Engineering',
    institution: 'SLIIT',
    year: '2023 - Present',
  },
  {
    degree: 'Diploma in Information Technology',
    institution: 'ESOFT Metro Campus',
    year: '2022 - 2023',
  },
  {
    degree: 'G.C.E. (A/L) Examination',
    institution: 'Asoka Vidyalaya, Colombo 10',
    year: '2018 - 2021',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-section">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-header"
      >
        <p className="section-label">Get to know me</p>
        <h1 className="section-title">About <span style={{ color: 'var(--accent)' }}>Me</span></h1>
        <div className="section-divider" />
      </motion.div>

      {/* Bio Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <div className="glass-card bio-card">
          <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '20px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            My Story
          </h2>
          <div>
            <p>
              Hello! I'm <b>Lahiru Dilhara</b>, an RPA Developer with a passion for automation and problem-solving.
              I currently work at <b>Trigon RCM</b>, a US-based Revenue Cycle Management company, where I use UiPath to automate repetitive tasks and improve business processes.
            </p>
            <p>
              Before joining <b>SLIIT</b>, I completed the DiTEC programme at <b>ESOFT</b> and was proud to be the <b>batch top in 2022.</b>
              I'm now a fourth year SE undergraduate at <b>SLIIT</b>, having joined in 2023.
              Along the way, I've explored areas like mobile app and full-stack development, which built a strong foundation in software and systems.
            </p>
            <p>
              When I'm not working or studying, you'll probably find me reading tech blogs, trying out new tools, or just relaxing with something non-tech for balance.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <section className="mb-16">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '36px' }}>
          <p className="section-label">Career</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            Work <span style={{ color: 'var(--accent)' }}>Experience</span>
          </h2>
          <div className="section-divider" style={{ margin: '12px 0 0' }} />
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="timeline-dot" />
              <div className="glass-card timeline-card">
                <div className="exp-header">
                  <span className="exp-title">{exp.title}</span>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <div className="exp-company">{exp.company}</div>
                <p className="exp-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '36px' }}>
          <p className="section-label">Academic</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            <span style={{ color: 'var(--accent)' }}>Education</span>
          </h2>
          <div className="section-divider" style={{ margin: '12px 0 0' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="glass-card edu-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p className="edu-degree">{edu.degree}</p>
              <p className="edu-institution">{edu.institution}</p>
              <span className="edu-year">{edu.year}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
