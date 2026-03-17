import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { ExternalLink, Github } from 'lucide-react';
import { useData } from '../context/DataContext';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden glass border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
      
      <motion.img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <motion.div
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex gap-2 mb-4">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full glass border border-white/20">
                {t}
              </span>
            ))}
          </div>
          
          <h3 className="text-4xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 font-medium mb-6">{project.category}</p>
          
          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <a href="#" className="flex items-center gap-2 text-sm font-bold hover:text-primary hover-target">
              <ExternalLink size={16} /> Live Demo
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-bold hover:text-primary hover-target">
              <Github size={16} /> Source
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { data: { projects } } = useData();
  
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <TextReveal>
          <h2 className="text-sm tracking-widest uppercase text-primary font-bold mb-16">
            03 — Selected Works
          </h2>
        </TextReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.id || index} className={index % 2 === 1 ? "md:mt-24" : ""}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
