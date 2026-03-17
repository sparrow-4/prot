import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { useData } from '../context/DataContext';

const Skills = () => {
  const { data: { skills } } = useData();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-white/5 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <TextReveal>
          <h2 className="text-sm tracking-widest uppercase text-primary font-bold mb-16">
            02 — Capabilities
          </h2>
        </TextReveal>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
              className="glass px-6 py-4 rounded-xl text-lg font-medium text-gray-200 border border-white/10 hover:border-primary/50 transition-colors cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
