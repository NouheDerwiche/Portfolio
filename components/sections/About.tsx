"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CodeTraces = () => {
  return (
    <div className="absolute inset-0">
      {/* API Connection Traces */}
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* API Request/Response Flow */}
          <motion.path
            d="M50,200 C100,100 300,300 350,200"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,6"
          />
          <motion.circle
            cx="50"
            cy="200"
            r="4"
            fill="#3B82F6"
            animate={{
              cx: [50, 350, 50],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>

      {/* Code Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 h-px bg-gradient-to-r from-blue-400/20 to-transparent"
            style={{
              top: `${(i + 1) * 10}%`,
              width: "60%",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 0],
              opacity: [0, 0.5, 0.5, 0],
              x: ["0%", "0%", "100%", "100%"]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Database Connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <motion.path
          d="M200,50 C150,150 250,250 200,350"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.circle
          cx="200"
          cy="50"
          r="3"
          fill="#6366F1"
          animate={{
            cy: [50, 350, 50]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>

      {/* Function Brackets */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bracket-${i}`}
          className="absolute text-blue-400/20 font-mono text-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20]
          }}
          transition={{
            duration: 3,
            delay: i * 1,
            repeat: Infinity
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: '30%'
          }}
        >
          {'{'}
          <motion.span
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          >
            ( )
          </motion.span>
          {'}'}
        </motion.div>
      ))}

      {/* Terminal Commands */}
      <div className="absolute bottom-20 left-10 right-10">
        {['npm install', 'git commit', 'yarn build'].map((cmd, i) => (
          <motion.div
            key={`cmd-${i}`}
            className="text-sm font-mono text-green-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-20, 0, 0, 20]
            }}
            transition={{
              duration: 4,
              delay: i * 1.5,
              repeat: Infinity
            }}
          >
            $ {cmd}
          </motion.div>
        ))}
      </div>

      {/* Network Packets */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 1, 0],
            x: [0, 100, 200, 300],
            y: [0, -50, 50, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: '20%',
            top: '60%'
          }}
        />
      ))}
    </div>
  );
};

export const About = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true });

  const floatingElements = [
    // Technologies Front-end
    { content: "</>", delay: 0, className: "text-blue-500 font-mono" },
    { content: "⚛️", delay: 0.2, className: "text-blue-600" }, // React
    { content: "JS", delay: 0.4, className: "text-yellow-500 font-bold" },
    // Technologies Back-end
    { content: "🗄️", delay: 0.6, className: "" }, // Database
    { content: "API", delay: 0.8, className: "text-green-500 font-mono" },
    // Outils
    { content: "Git", delay: 1, className: "text-orange-500 font-mono" },
    // Design
    { content: "CSS", delay: 1.2, className: "text-blue-400 font-mono" },
    { content: "UI/UX", delay: 1.4, className: "text-purple-500 font-mono" },
    // Code symbols
    { content: "{}", delay: 1.6, className: "text-gray-600 font-mono" },
    { content: "( )", delay: 1.8, className: "text-gray-600 font-mono" },
    // Frameworks
    { content: "Next", delay: 2, className: "text-black font-bold dark:text-white" },
    { content: "Node", delay: 2.2, className: "text-green-600 font-mono" }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="min-h-screen py-32 relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-blue-200/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            À Propos de Moi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Content and Stats */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-blue-100 shadow-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  Développeuse Web avec un an d'expérience, je crée des applications web fiables et performantes. Autonome, rigoureuse et animée par la curiosité, je souhaite participer à des projets innovants tout en continuant à évoluer dans un environnement stimulant.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Mon objectif est de créer des expériences utilisateur exceptionnelles
                  en combinant un design élégant avec des fonctionnalités robustes.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { number: "1+", label: "Année d'expérience" },
                  { number: "4+", label: "Projets Réalisés" },
                  { number: "5+", label: "Technologies Maîtrisées" },
                  { number: "100%", label: "Satisfaction Client" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl blur group-hover:blur-xl transition-all duration-300"></div>
                    <div className="relative p-6 rounded-xl border border-blue-100 bg-white/80 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-blue-600">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Development Traces */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-8"
          >
            {/* Character in center */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.5
                  }
                }}
                className="relative"
              >
                {/* Body */}
                <div className="w-48 h-48 bg-pink-400 rounded-3xl relative transform rotate-45">
                  {/* Head */}
                  <div className="absolute -top-16 left-12 w-24 h-24 bg-[#FFD3B5] rounded-full">
                    {/* Face */}
                    <div className="relative">
                      {/* Eyes - Closed */}
                      <div className="absolute top-12 left-6 w-4 h-0.5 bg-gray-800 rounded-full"></div>
                      <div className="absolute top-12 right-6 w-4 h-0.5 bg-gray-800 rounded-full"></div>
                      {/* Smile */}
                      <div className="absolute top-16 left-8 w-8 h-8 border-b-2 border-gray-800 rounded-full"></div>
                      {/* Beard */}
                      <div className="absolute top-14 left-4 w-16 h-12 bg-gray-800 rounded-b-full"></div>
                    </div>
                  </div>
                  {/* Arms */}
                  <div className="absolute -left-8 top-12 w-8 h-24 bg-pink-400 rounded-full"></div>
                  <div className="absolute -right-8 top-12 w-8 h-24 bg-pink-400 rounded-full"></div>
                  {/* Legs */}
                  <div className="absolute -bottom-8 left-12 w-24 h-8 bg-gray-700 rounded-full"></div>
                </div>
              </motion.div>
            </div>

            {/* Development Traces */}
            <CodeTraces />
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 