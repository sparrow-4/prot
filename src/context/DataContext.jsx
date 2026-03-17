import React, { createContext, useState, useContext, useEffect } from 'react';

const defaultData = {
  hero: {
    firstName: "MUHAMMED",
    lastName: "THOYYIB",
    role: "WEB DEVELOPER",
    description: "Recent BCA graduate specializing in React and Tailwind CSS. Crafting modern, high-performance web applications and immersive user experiences.",
    cta: "Available for Work",
    button: "View Projects"
  },
  about: {
    heading1: "I'm a proactive team player",
    heading2: "with strong problem-solving skills,",
    heading3: "eager to expand technical expertise",
    heading4: "in real-world web projects.",
    desc1: "As a recent Bachelor of Computer Applications graduate, I've completed a six-month hands-on training program at KINFRA and Scantech focused on modern web development.",
    desc2: "I'm highly skilled in frontend technologies like React and Tailwind CSS, while possessing foundational backend knowledge of Python, Django, and JavaScript. I enjoy transforming complex requirements into seamless, beautiful user interfaces."
  },
  skills: [
    "React JS", "Next.js", "Tailwind CSS", "Python", 
    "HTML5", "CSS3", "JavaScript", "Django",
    "SQL", "MongoDB", "Bootstrap 5", "React-Redux"
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Website",
      category: "Online Shopping Platform",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "TailwindCSS", "API Integration"],
      color: "#10b981",
      demoLink: "https://scottin.dot",
      githubLink: "https://github.com/sparrow-4"
    },
    {
      id: 2,
      title: "InoVest App",
      category: "BCA Final Project - Investor Platform",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
      tech: ["Flutter", "UI/UX", "Mobile"],
      color: "#a855f7",
      demoLink: "#",
      githubLink: "https://github.com/sparrow-4"
    },
    {
      id: 3,
      title: "Sable",
      category: "Digital Currency Web App",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "TailwindCSS", "Animations"],
      color: "#3b82f6",
      demoLink: "#",
      githubLink: "https://github.com/sparrow-4/Sable"
    },
    {
      id: 4,
      title: "Decoratio App",
      category: "Interior Design Inspiration",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "TailwindCSS"],
      color: "#f59e0b",
      demoLink: "#",
      githubLink: "https://github.com/sparrow-4/Decoratio-app"
    }
  ],
  experience: [
    {
      role: "Part-time Accountant",
      company: "Accounting Firm",
      period: "01/2023 - 10/2024",
      description: "Recorded daily transactions and maintained ledgers accurately. Supported GST filing and assisted in internal audits. Collaborated with management to review monthly cash flow trends."
    },
    {
      role: "Web Development Training",
      company: "KINFRA & Scantech",
      period: "Completed",
      description: "Completed six months of structured training focusing on frontend and backend fundamentals. Built small-scale web applications and UI prototypes."
    },
    {
      role: "Bachelor of Computer Applications",
      company: "PPTM Arts & Science College",
      period: "06/2022 - 05/2025",
      description: "Recent graduate with foundational knowledge in computer science, software engineering, and modern web application development."
    }
  ],
  footer: {
    email: "thoyyibcherur@gmail.com",
    whatsapp: "https://wa.me/919746285910",
    instagram: "https://instagram.com/thoyyiib.__",
    linkedin: "https://www.linkedin.com/in/thoyyib-kk-8153a3262",
    github: "https://github.com/sparrow-4",
    facebook: "https://www.facebook.com/mhd.thoyyib.1/"
  }
};

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('portfolioData');
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
