import React from 'react';
import TextReveal from './TextReveal';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import profileImage from '../assets/cinematic_profile.png';

const About = () => {
  const { data: { about } } = useData();
  
  return (
    <section id="about" className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto w-full">
        <TextReveal>
          <h2 className="text-sm tracking-widest uppercase text-primary font-bold mb-12">
            01 — About Me
          </h2>
        </TextReveal>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-3/5">
            <div className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mb-12">
              <TextReveal delay={0.1}>
                <p className="text-gray-300">
                  {about.heading1}
                </p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-white">
                  {about.heading2}
                </p>
              </TextReveal>
              <TextReveal delay={0.3}>
                <p className="text-white">
                  {about.heading3}
                </p>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="text-gray-300">
                  {about.heading4}
                </p>
              </TextReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 font-medium">
              <TextReveal delay={0.5}>
                <p>
                  {about.desc1}
                </p>
              </TextReveal>
              <TextReveal delay={0.6}>
                <p>
                  {about.desc2}
                </p>
              </TextReveal>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="lg:w-2/5 p-2 glass rounded-2xl rotate-2 relative isolate group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
            <img 
              src={profileImage} 
              alt="Muhammed Thoyyib" 
              className="w-full h-auto aspect-[3/4] object-cover rounded-xl filter grayscale-[20%] contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
