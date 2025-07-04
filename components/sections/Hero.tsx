"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { DevObjects } from "../3d/DevObjects";
import { OrbitControls } from "@react-three/drei";
import type { Variants } from "framer-motion";

const titleAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      repeat: 0,
      repeatDelay: 5,
    },
  },
};

const letterAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      repeat: 0,
      repeatDelay: 5,
    } as const,
  },
};

export const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const titleText = "Développeuse Web";
  const nameText = "Nouhe Derwiche";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with 3D Scene */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E6F3F9] via-[#F0F7FB] to-[#E6F3F9] opacity-95" />
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} color="#79C7E3" intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#0099cc" intensity={0.5} />
            <DevObjects />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              variants={titleAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.h2 className="text-5xl lg:text-7xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#2A7BA1] to-[#79C7E3]">
                {nameText}
              </motion.h2>

              <motion.h1 className="text-3xl lg:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-[#0099cc] to-[#79C7E3]">
                {titleText}
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl text-[#2A7BA1] max-w-2xl"
            >
              Développeuse web passionnée, je conçois des interfaces modernes, performantes et accessibles. Mon objectif : transformer vos idées en solutions digitales uniques, intuitives et engageantes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#79C7E3] to-[#0099cc] hover:from-[#0099cc] hover:to-[#79C7E3] text-white shadow-lg shadow-[#79C7E3]/25 border-0 transition-all duration-300"
              >
                <Link href="/CV nouha.pdf" download>Télécharger mon CV</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#79C7E3]/30 hover:bg-[#79C7E3]/10 text-[#2A7BA1] backdrop-blur-sm bg-white/5 transition-all duration-300"
              >
                <Link href="#contact">Me contacter</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Professional Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#79C7E3]/20 to-transparent backdrop-blur-sm" />
              <div className="absolute inset-0 border-2 border-[#79C7E3]/30 rounded-2xl" />
              
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#79C7E3] rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#79C7E3] rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#79C7E3] rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#79C7E3] rounded-br-2xl" />

              {/* Photo Container */}
              <div className="absolute inset-3 rounded-xl overflow-hidden bg-gradient-to-br from-[#E6F3F9] to-[#F0F7FB]">
                <img
                  src="/hobi.png"
                  alt="Nouhe Derwiche"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#79C7E3]/40 to-transparent" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 w-16 h-16 bg-[#79C7E3]/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [3, -3, 3],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#0099cc]/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#2A7BA1] text-sm flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </section>
  );
}; 