import React from 'react';
import MagneticButton from './MagneticButton';
import { useData } from '../context/DataContext';

const Footer = () => {
  const { data: { footer } } = useData();
  
  return (
    <footer className="relative bg-black text-white pt-24 px-6 md:px-12 pb-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference">
            LET'S WORK<br />TOGETHER
          </h2>
          <p className="text-gray-400 max-w-sm mt-4">
            Available for freelance opportunities. Let's create something extraordinary.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:text-right">
          <MagneticButton className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors self-start md:self-end">
            {footer.email}
          </MagneticButton>
          
          <div className="flex flex-wrap gap-6 text-sm font-medium mt-8 justify-start md:justify-end">
            <a href={footer.whatsapp} target="_blank" rel="noreferrer" className="hover-target hover:text-primary transition-colors">WhatsApp</a>
            <a href={footer.instagram} target="_blank" rel="noreferrer" className="hover-target hover:text-primary transition-colors">Instagram</a>
            <a href={footer.linkedin} target="_blank" rel="noreferrer" className="hover-target hover:text-primary transition-colors">LinkedIn</a>
            <a href={footer.github} target="_blank" rel="noreferrer" className="hover-target hover:text-primary transition-colors">GitHub</a>
            <a href={footer.facebook} target="_blank" rel="noreferrer" className="hover-target hover:text-primary transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-gray-500 font-medium">
        <p>&copy; {new Date().getFullYear()} MUHAMMED THOYYIB KK. ALL RIGHTS RESERVED.</p>
        <p>CRAFTED WITH PASSION & ANIMATION.</p>
      </div>
    </footer>
  );
};

export default Footer;
