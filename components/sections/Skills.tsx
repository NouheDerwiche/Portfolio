"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from 'next/image';

// Hook pour détecter la taille de l'écran
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};

const skills = [
  {
    name: "Next.js",
    icon: "/skills/nextjs.svg",
    category: "Frontend",
    percentage: 90,
    color: "#008090"
  },
  {
    name: "Nuxt.js",
    icon: "/nuxt-js-logo.png",
    category: "Frontend",
    percentage: 85,
    color: "#008090"
  },
  {
    name: "Laravel",
    icon: "https://laravel.com/img/logomark.min.svg",
    category: "Backend",
    percentage: 88,
    color: "#008090"
  },
  {
    name: "Python",
    icon: "https://www.python.org/static/community_logos/python-logo-generic.svg",
    category: "Backend",
    percentage: 80,
    color: "#008090"
  },
  {
    name: "TypeScript",
    icon: "/skills/typescript.svg",
    category: "Frontend",
    percentage: 92,
    color: "#008090"
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    category: "Frontend",
    percentage: 95,
    color: "#008090"
  },
  {
    name: "HTML5",
    icon: "/skills/html-css.svg",
    category: "Frontend",
    percentage: 98,
    color: "#008090"
  },
  {
    name: "CSS3",
    icon: "/skills/html-css.svg",
    category: "Frontend",
    percentage: 95,
    color: "#008090"
  },
  {
    name: "GraphQL",
    icon: "/Untitled.png",
    category: "Backend",
    percentage: 75,
    color: "#E10098"
  },
  {
    name: "Arduino",
    icon: "/images.png",
    category: "Hardware",
    percentage: 70,
    color: "#008090"
  },
  {
    name: "MongoDB",
    icon: "/skills/mongodb.svg",
    category: "Database",
    percentage: 85,
    color: "#008090"
  },
  {
    name: "MySQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    category: "Database",
    percentage: 80,
    color: "#008090"
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    category: "Database",
    percentage: 75,
    color: "#008090"
  }
];

// Floating animation for technology logos
const FloatingLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="absolute w-8 h-8 opacity-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: ["0%", "100%", "0%"],
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Image
            src={skill.icon}
            alt={skill.name}
            width={32}
            height={32}
            className="w-full h-full object-contain"
            unoptimized={skill.icon.startsWith('http')}
          />
        </motion.div>
      ))}
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width < 768; // Breakpoint pour mobile

  // Group skills into sets based on screen size
  const cardsPerGroup = isMobile ? 1 : 3;
  const skillGroups = [];
  for (let i = 0; i < skills.length; i += cardsPerGroup) {
    skillGroups.push(skills.slice(i, i + cardsPerGroup));
  }

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skillGroups.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [skillGroups.length]);

  // Reset current slide when screen size changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  return (
    <section ref={ref} id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900" />
        
        {/* Organic shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03]">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              </filter>
            </defs>
            <g filter="url(#goo)">
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  r={50 + Math.random() * 100}
                  cx={100 + (i * 300)}
                  cy={100 + (i % 2) * 200}
                  fill="currentColor"
                  className="text-blue-200/30 dark:text-blue-700/20"
                  animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Radial gradients */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_700px_at_25%_25%,rgba(96,165,250,0.05),transparent)]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_700px_at_75%_75%,rgba(96,165,250,0.05),transparent)]" />
        
        {/* Flowing lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-300/20 to-transparent w-[200%]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                top: `${20 + i * 15}%`,
                transform: `rotate(${-10 + i * 5}deg)`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `rgba(96, 165, 250, ${0.1 + Math.random() * 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <FloatingLogos />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Mes Compétences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* 3D Skills Slider */}
        <div className="relative h-96 flex items-center justify-center">
          {/* SVG Gradient Definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative w-full max-w-4xl h-full perspective-1000">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="absolute inset-0 flex items-center justify-center gap-4 md:gap-8"
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{
                  opacity: currentSlide === groupIndex ? 1 : 0,
                  rotateY: currentSlide === groupIndex ? 0 : 90,
                  scale: currentSlide === groupIndex ? 1 : 0.8,
                  z: currentSlide === groupIndex ? 0 : -1000,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {group.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="relative"
                    initial={{ opacity: 0, y: 50, rotateY: -30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateY: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: skillIndex * 0.2,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateY: 15,
                      z: 50,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-blue-200/50 dark:border-blue-700/50 w-56 md:w-64 h-72 md:h-80 flex flex-col items-center justify-center relative overflow-hidden">
                      {/* 3D Card Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 rounded-2xl" />
                      
                      {/* Skill Icon with 3D Animation */}
                      <motion.div
                        className="mb-4 md:mb-6 relative"
                        animate={{
                          rotateY: [0, 10, 0],
                          rotateX: [0, 5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
                          <Image 
                            src={skill.icon} 
                            alt={skill.name} 
                            width={48}
                            height={48}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg" 
                            unoptimized={skill.icon.startsWith('http')}
                          />
                        </div>
                      </motion.div>

                      {/* Skill Name */}
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 text-center">
                        {skill.name}
                      </h3>

                      {/* Category */}
                      <div className="text-xs md:text-sm text-blue-500 font-medium mb-3 md:mb-4 px-2 md:px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                        {skill.category}
                      </div>

                      {/* Progress Circle */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 md:mb-4">
                        <svg width={isMobile ? "80" : "96"} height={isMobile ? "80" : "96"} className="transform -rotate-90">
                          <circle
                            cx={isMobile ? "40" : "48"}
                            cy={isMobile ? "40" : "48"}
                            r={isMobile ? "28" : "36"}
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx={isMobile ? "40" : "48"}
                            cy={isMobile ? "40" : "48"}
                            r={isMobile ? "28" : "36"}
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={isMobile ? 176 : 226}
                            strokeDashoffset={isMobile ? 176 : 226}
                            initial={{ strokeDashoffset: isMobile ? 176 : 226 }}
                            animate={{ strokeDashoffset: isMobile ? 176 - (176 * skill.percentage) / 100 : 226 - (226 * skill.percentage) / 100 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm md:text-lg font-bold text-blue-600 dark:text-blue-400">
                            {skill.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-1 h-1 bg-blue-300 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
            {skillGroups.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-blue-300 hover:bg-blue-400'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 md:w-64 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / skillGroups.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 