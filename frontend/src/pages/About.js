import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const experiences = [
    {
      title: 'RPA Developer',
      company: 'Collective RCM',
      period: '2024 - Present',
      description: 'Developing automation solutions using UiPath to streamline business processes in the healthcare revenue cycle. Working with APIs to integrate external systems and enhance automation workflows, while collaborating with the team to identify and implement process improvements.'
    },
    {
      title: 'Co-Founder',
      company: 'Caelusk Digital Agency',
      period: '2022 - Present (Holded for now)',
      description: 'Co-founded a digital agency focused on delivering social media and web solutions for clients across different industries. Handled project planning, content creation, and client communication before pausing operations due to academic priorities.'
    },
    {
      title: 'Social Media Representative',
      company: 'DP Foundation',
      period: '2022 - 2024',
      description: 'Managed and created social media content to promote the foundation’s initiatives. Helped grow online engagement and maintain a consistent digital presence.'
    }
  ];

  const education = [
    {
      degree: 'BSc (Hons) in Information Technology Specialising in Software Engineering',
      institution: 'SLIIT',
      year: '2023 - Present'
    },
    {
      degree: 'Diploma in Information Technology',
      institution: 'ESOFT Metro Campus',
      year: '2022 - 2023'
    },
    {
      degree: 'G.C.E.(A/L) EXAMINATION',
      institution: 'Asoka Vidyalaya, Colombo 10',
      year: '2018 - 2021'
    }
  ];

  return (
    <div className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About <span className="text-primary dark:text-blue-400">Me</span>
        </h1>

        {/* Bio Section */}
        <section className="mb-12">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-blue-400">
              My Story
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
              Hello! I'm <b>Lahiru Dilhara</b>, an RPA Developer with a passion for automation and problem-solving.
              I currently work at <b>Collective RCM</b>, a US-based Revenue Cycle Management company, where I use UiPath to automate repetitive tasks and improve business processes.
              </p>
              <p>
              Before joining <b>SLIIT</b>, I completed the DiTec programme at <b>ESOFT Bambalapitiya</b> and was proud to be the <b>batch top in 2022.</b>
              I'm now a second-year IT undergraduate at <b>SLIIT</b>, moving into my third year in July 2025.
              Along the way, I’ve explored areas like mobile app and full-stack development, which built a strong foundation in software and systems.
              While RPA is my main focus, these experiences continue to shape my broader tech skills and problem-solving mindset.
              </p>
              <p>
              When I'm not working or studying, you'll probably find me reading tech blogs, trying out new tools, or just relaxing with something non-tech for balance.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Work <span className="text-primary dark:text-blue-400">Experience</span>
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-medium text-primary dark:text-blue-400">{exp.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
                </div>
                <h4 className="text-lg mb-2">{exp.company}</h4>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            <span className="text-primary dark:text-blue-400">Education</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-medium text-primary dark:text-blue-400">{edu.degree}</h3>
                <h4 className="text-lg mb-1">{edu.institution}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default About;
