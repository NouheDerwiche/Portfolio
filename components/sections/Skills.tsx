"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from 'next/image';

interface Skill {
  category: string;
  items: Array<{
    name: string;
    percentage: number;
    logo: string;
  }>;
  icon: string;
}

const skills: Skill[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5 / CSS3", percentage: 90, logo: "/skills/html-css.svg" },
      { name: "JavaScript / TypeScript", percentage: 85, logo: "/skills/typescript.svg" },
      { name: "React.js", percentage: 85, logo: "/skills/react.svg" },
      { name: "Next.js", percentage: 80, logo: "/skills/nextjs.svg" },
      { name: "Tailwind CSS", percentage: 90, logo: "/skills/tailwind.svg" }
    ],
    icon: "🎨",
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", percentage: 80, logo: "/skills/nodejs.svg" },
      { name: "Express.js", percentage: 75, logo: "/skills/express.svg" },
      { name: "API REST", percentage: 85, logo: "/skills/api.svg" },
      { name: "MongoDB", percentage: 75, logo: "/skills/mongodb.svg" }
    ],
    icon: "⚙️",
  },
  {
    category: "Outils",
    items: [
      { name: "Git", percentage: 85, logo: "/skills/git.svg" },
      { name: "GitHub", percentage: 85, logo: "/skills/github.svg" },
      { name: "VS Code", percentage: 90, logo: "/skills/vscode.svg" },
      { name: "Figma", percentage: 75, logo: "/skills/figma.svg" }
    ],
    icon: "🛠️",
  },
];

// Floating animation for technology logos
const FloatingLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {skills.flatMap((category) => 
        category.items.map((item, index) => (
          <motion.div
            key={`${category.category}-${item.name}`}
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
              src={item.logo}
              alt={item.name}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))
      )}
    </div>
  );
};

// Animated circular percentage indicator
const SkillCircle = ({ percentage, logo, name, delay }: { percentage: number; logo: string; name: string; delay: number }) => {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true });
  const size = 80;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = isInView ? percentage : 0;

  return (
    <div ref={circleRef} className="relative flex items-center justify-center w-20 h-20">
      <svg width={size} height={size} className="absolute top-0 left-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex items-center justify-center w-full h-full">
        <span className="text-lg font-semibold text-blue-500">{percentage}%</span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };
  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/80 dark:bg-gray-800/80 p-7 rounded-xl shadow-lg border border-blue-100 backdrop-blur-md transition-all duration-200 ease-out"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl mb-2"
        >
          {skill.icon}
        </motion.div>
        <h3 className="text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          {skill.category}
        </h3>
        <div className="space-y-5">
          {skill.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <SkillCircle
                percentage={item.percentage}
                logo={item.logo}
                name={item.name}
                delay={0.2 * i}
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Flatten all skills into a single array with category info
  const allSkills = skills.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category, icon: cat.icon }))
  );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.15)" }}
              className="flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-blue-100 backdrop-blur-md p-6 transition-all duration-200 ease-out hover:shadow-xl"
            >
              <div className="mb-2">
                <img src={skill.logo} alt={skill.name} className="w-10 h-10 object-contain drop-shadow" />
              </div>
              <SkillCircle
                percentage={skill.percentage}
                logo={skill.logo}
                name={skill.name}
                delay={0.1 * i}
              />
              <div className="mt-3 text-center">
                <div className="text-base font-semibold text-gray-800 dark:text-gray-200">{skill.name}</div>
                <div className="text-xs text-blue-500 font-medium mt-1">{skill.category}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 