import React, { createContext, useState, useContext, useEffect } from 'react';

const defaultData = {
  hero: {
    firstName: "MUHAMMED",
    lastName: "THOYYIB",
    role: "REACT DEVELOPER",
    description: "React Developer and BCA graduate with hands-on experience designing responsive, mobile-first web applications. Crafting modern full-stack solutions using React, Next.js, and Tailwind CSS.",
    cta: "Available for Work",
    button: "View Projects"
  },
  about: {
    heading1: "I'm a proactive React Developer",
    heading2: "with strong problem-solving skills,",
    heading3: "eager to expand technical expertise",
    heading4: "in real-world web projects.",
    desc1: "As a BCA graduate, I've completed a six-month intensive bootcamp at KINFRA & Scantech, focusing on modern web technologies like React.js, Next.js, and Node.js.",
    desc2: "I have delivered 7+ independent projects including e-commerce, fintech, and school management platforms. I'm highly skilled in frontend technologies and API integrations, seeking to collaborate on impactful web applications."
  },
  skills: [
    "React.js", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", 
    "Node.js", "Django", "Prisma ORM", "SQL",
    "MongoDB", "REST API", "Git", "React-Redux"
  ],
  projects: [
    {
      id: 1,
      title: "DSFX",
      category: "Full-Stack E-commerce Store",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "Node.js", "Tailwind CSS"],
      color: "#10b981",
      demoLink: "https://dsfx.vercel.app",
      githubLink: "https://github.com/sparrow-4/DSFX"
    },
    {
      id: 2,
      title: "Dreamy",
      category: "Full-Stack Web App",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
      tech: ["Next.js", "Prisma ORM", "Tailwind CSS"],
      color: "#a855f7",
      demoLink: "https://dreamy-olive.vercel.app",
      githubLink: "https://github.com/sparrow-4/dreamy"
    },
    {
      id: 3,
      title: "School Management System",
      category: "Web-based Admin Panel",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "REST API", "Tailwind CSS"],
      color: "#3b82f6",
      demoLink: "https://school-management-beta-rose.vercel.app",
      githubLink: "https://github.com/sparrow-4/school-manage"
    },
    {
      id: 4,
      title: "Scottin.dot",
      category: "E-Commerce Website",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
      tech: ["React.js", "Axios", "Tailwind CSS"],
      color: "#f59e0b",
      demoLink: "https://scottin-dot-afnx.vercel.app",
      githubLink: "https://github.com/sparrow-4/scottin.dot"
    }
  ],
  experience: [
    {
      role: "Web Development Training",
      company: "KINFRA & Scantech",
      period: "6 months",
      description: "Completed an intensive training program covering frontend and backend technologies including React.js, Node.js, and Python. Built and shipped 4+ hands-on projects."
    },
    {
      role: "Bachelor of Computer Applications",
      company: "PPTM Arts & Science College",
      period: "06/2022 - 05/2025",
      description: "Recent graduate with foundational knowledge in computer science, software engineering, and modern web application development."
    },
    {
      role: "Part-time Accountant",
      company: "Accounting Firm",
      period: "01/2023 - 10/2024",
      description: "Managed and recorded 50+ daily financial transactions with 100% ledger accuracy. Assisted in GST filings and internal audits, ensuring full compliance."
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
    const saved = localStorage.getItem('portfolioData_v2');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData_v2', JSON.stringify(data));
  }, [data]);

  const updateData = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('portfolioData_v2');
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
