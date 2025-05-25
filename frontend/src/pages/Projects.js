import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import Section from '../components/Section';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projectsToShow, setProjectsToShow] = useState(projectsData);
  
  const projectCategories = ['all', 'web', 'mobile', 'design'];
  
  // Filter projects when the filter changes
  useEffect(() => {
    if (filter === 'all') {
      setProjectsToShow(projectsData);
    } else {
      const filtered = projectsData.filter(project => 
        project.category === filter || 
        project.technologies.some(tech => tech.toLowerCase() === filter.toLowerCase())
      );
      setProjectsToShow(filtered);
    }
  }, [filter]);

  return (
    <div className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Section 
          title="My Projects"
          subtitle="Here are some of the projects I've worked on. Click on a project to see more details."
        >
        {/* Project Filters */}
        <div className="flex flex-wrap justify-center mb-10">
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`mx-2 mb-2 px-4 py-2 rounded-full capitalize transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-white dark:bg-blue-500'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToShow.length > 0 ? (
            projectsToShow.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))
          ) : (
            <p className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
              No projects found matching the selected filter.
            </p>
          )}
        </div>
        </Section>
      </motion.div>
    </div>
  );
};

export default Projects;
