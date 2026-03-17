import React from 'react';
import { NavLink } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 mix-blend-difference flex justify-between items-center text-white">
      <div className="font-bold text-xl tracking-tighter cursor-pointer hover-target">
        {"<THOYYIB />".toUpperCase()}
      </div>
      
      <div className="hidden md:flex gap-8 items-center text-sm font-medium">
        <NavLink to="#about" className="hover-target hover:text-primary transition-colors">About</NavLink>
        <NavLink to="#projects" className="hover-target hover:text-primary transition-colors">Projects</NavLink>
        <NavLink to="#experience" className="hover-target hover:text-primary transition-colors">Experience</NavLink>
      </div>

      <MagneticButton className="px-6 py-3 bg-white text-black font-semibold uppercase text-xs tracking-wider rounded-full hover:bg-gray-200 transition-colors">
        Contact Me
      </MagneticButton>
    </nav>
  );
};

export default Navbar;
