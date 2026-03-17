import React from 'react';
import TextReveal from './TextReveal';
import { useData } from '../context/DataContext';

const Experience = () => {
  const { data: { experience } } = useData();
  
  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <TextReveal>
          <h2 className="text-sm tracking-widest uppercase text-primary font-bold mb-16">
            04 — Experience
          </h2>
        </TextReveal>
        
        <div className="flex flex-col">
          {experience.map((exp, index) => (
            <div 
              key={index} 
              className="group border-t border-white/10 py-12 flex flex-col md:flex-row gap-8 md:gap-24 hover:bg-white/[0.02] transition-colors -mx-6 px-6 md:-mx-12 md:px-12 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              
              <div className="md:w-1/3 flex flex-col gap-2 relative z-10">
                <TextReveal delay={0.1}>
                  <p className="text-primary font-bold tracking-widest text-sm">{exp.period}</p>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <h3 className="text-3xl font-bold">{exp.role}</h3>
                </TextReveal>
                <TextReveal delay={0.3}>
                  <p className="text-gray-400 font-medium text-lg">{exp.company}</p>
                </TextReveal>
              </div>
              
              <div className="md:w-2/3 relative z-10">
                <TextReveal delay={0.4}>
                  <p className="text-gray-300 font-medium leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                    {exp.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
