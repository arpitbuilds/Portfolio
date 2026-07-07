export interface Project {
  title: string;
  description: string;
  technologies: string[];
  bullets: string[];
  github: string;
  live?: string;
  featured: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  details?: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  duration: string;
  bullets: string[];
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
  gfg?: string;
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
  };
  projects: Project[];
  education: EducationItem[];
  achievements: string[];
  certifications: string[];
  leadership: LeadershipItem[];
}

export const portfolioData: PortfolioData = {
  name: "Arpit Singh",
  tagline: "Full-Stack Developer & Algorithmic Problem Solver",
  bio: "Final year Computer Science Engineering student passionate about crafting high-performance full-stack web applications and solving complex algorithmic challenges. Active coder with 700+ solved problems on LeetCode and experience building MERN-stack AI applications.",
  email: "arpitbuilds@gmail.com",
  phone: "+91 86043-79088",
  github: "https://github.com/arpitbuilds",
  linkedin: "https://www.linkedin.com/in/arpit-singh-a5380a348/",
  leetcode: "https://leetcode.com/u/punk_18/",
  gfg: "https://www.geeksforgeeks.org/profile/arpitcodes",
  skills: {
    languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    frontend: ["React.js", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Node.js", "Express.js", "Socket.io", "REST APIs"],
    databases: ["MongoDB"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Google OR-Tools"]
  },
  projects: [
    {
      title: "Schedulix (Timetable Generator)",
      description: "A secure MERN-stack scheduling system using Google OR-Tools to solve constraint-satisfaction problems.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "OR-Tools CP-SAT"],
      bullets: [
        "Engineered a MERN timetable management system utilizing Google OR-Tools to generate 100% conflict-free schedules, reducing manual allocation time by 80%.",
        "Automated low-latency bidirectional updates using Socket.io for instant schedule synchronization across multiple concurrent clients, and integrated offline PDF exports.",
        "Architected a highly secure infrastructure utilizing JWT authentication and bcrypt hashing, enforcing strict role-based access control (RBAC) across 3 distinct user tiers."
      ],
      github: "https://github.com/arpitbuilds/Schedulix",
      live: "#",
      featured: true
    },
    {
      title: "ResumeForge AI",
      description: "A full-stack AI-driven resume builder and ATS analyzer leveraging the Google Gemini API.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "Socket.io"],
      bullets: [
        "Developed ResumeForge AI utilizing the MERN stack and Google Gemini API, dynamically generating optimized professional content to boost overall ATS compatibility by over 40%.",
        "Implemented an intelligent ATS Analyzer and Job Matcher that evaluates profiles against target descriptions, delivering real-time match scores on a 0–100 scale alongside deep keyword gap analysis.",
        "Orchestrated advanced features including an AI-driven PDF parsing engine, real-time resume view tracking via Socket.io with persistent history storage, and secure authentication using JWT, bcrypt, and ImageKit."
      ],
      github: "https://github.com/arpitbuilds/ResumeForge",
      live: "#",
      featured: true
    },
    {
      title: "Social-Guard",
      description: "An AI-powered moderation and content verification system designed to combat misinformation and cyberbullying.",
      technologies: ["Python", "Streamlit", "LLaMA 3 (8B)", "Natural Language Processing", "YouTube API"],
      bullets: [
        "Engineered an AI content detection layer using NLP to flag offensive language, cyberbullying, and fake news across Facebook, Instagram, and Twitter.",
        "Integrated the YouTube API to fetch trending video content and cross-verify details with Google News articles, automatically flagging misleading media in real-time.",
        "Leveraged LLaMA 3 (8B) to transcribe audio tracks, summarize video contents, and provide translation support across multiple languages."
      ],
      github: "https://github.com/arpitbuilds/Social-Guard",
      featured: true
    },
    {
      title: "DataOne Database",
      description: "A lightweight, transaction-supported, file-based database management system with a custom query language.",
      technologies: ["Python", "Query Parsing", "Data Compression", "Data Persistence"],
      bullets: [
        "Designed and implemented a custom query parser executing human-readable database commands (like 'build', 'add', 'change', 'kick out', 'mix it up').",
        "Developed transaction management (begin, commit, rollback) and file-based compressed storage using Python's zlib and pickle libraries.",
        "Engineered table join functionality ('mix it up') enabling relational queries on common columns with low overhead."
      ],
      github: "https://github.com/arpitbuilds/DataOne",
      featured: true
    },
    {
      title: "Sumz (AI Summarizer)",
      description: "A clean, responsive AI article summarizer featuring multilingual translation and Text-to-Speech.",
      technologies: ["React.js", "Tailwind CSS", "REST APIs"],
      bullets: [
        "Launched Sumz, an AI-based article summarizer utilizing React, Vite, and Tailwind CSS to generate concise paragraph summaries, successfully processing up to 5000+ words per API request.",
        "Designed a responsive UI featuring multilingual summarization, integrated text-to-speech capabilities, configurable summary lengths, and dark mode, vastly improving overall platform accessibility.",
        "Incorporated persistent history management using local browser storage, offering 1-click downloads (.txt) and social sharing features to optimize the end-user experience."
      ],
      github: "https://github.com/arpitbuilds/Briefly",
      live: "#",
      featured: false
    }
  ],
  education: [
    {
      institution: "G.L. Bajaj Institute of Technology and Management",
      degree: "Bachelor of Technology in Computer Science and Engineering (CGPA: 8.5)",
      duration: "2023 – 2027",
      details: "Focusing on Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, and Operating Systems."
    },
    {
      institution: "Sri Raghukul Vidya Peeth",
      degree: "Class XII (CBSE) | Percentage: 94%",
      duration: "2023",
      details: "Science & Mathematics stream."
    }
  ],
  achievements: [
    "LeetCode Solver: Solved 700+ algorithmic problems on LeetCode with a Max Rating of 1795.",
    "Competitive Coding: Solved 200+ problems on GeeksforGeeks and earned a 5-Star rating in C++ on HackerRank."
  ],
  certifications: [
    "CCNA: Enterprise Networking, Security, and Automation (Cisco Networking Academy)",
    "CCNA: Switching, Routing, and Wireless Essentials (Cisco Networking Academy)",
    "CCNA: Introduction to Networks (Cisco Networking Academy)",
    "Python Essentials 1 & 2 (Cisco Networking Academy)",
    "C++ Programming (Abdul Bari)",
    "Complete Web Development (Hitesh Choudhary)",
    "Web Full Stack Internship (AICTE NEAT)"
  ],
  leadership: [
    {
      role: "Core Team Member",
      organization: "Google Developer Student Club (GDSC)",
      duration: "Sept 2024 – Present",
      bullets: [
        "Coordinated the planning and organization of 5+ technical events, workshops, and community sessions as a Core Team Member.",
        "Mentored peers in modern web development technologies and collaborated with the team to promote technical engagement on campus."
      ]
    }
  ]
};
