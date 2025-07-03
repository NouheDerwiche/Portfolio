"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Déterminer la section active
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionTop = section.offsetTop - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: "Accueil", id: "home" },
    { name: "À propos", id: "about" },
    { name: "Compétences", id: "skills" },
    { name: "Projets", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#E6F3F9]/90 backdrop-blur-md shadow-[0_4px_20px_-1px_rgba(179,211,224,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <img 
              src="/logo.png" 
              alt="Logo Nouha Derwiche" 
              className="h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,153,204,0.3)]" 
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[#2A7BA1] hover:text-[#0099cc] transition-colors relative ${
                  activeSection === item.id 
                    ? "font-semibold after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#0099cc] after:bg-gradient-to-r after:from-[#79C7E3] after:to-[#0099cc]" 
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2A7BA1] hover:text-[#0099cc] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-[#E6F3F9]/95 backdrop-blur-md rounded-b-lg shadow-[0_4px_20px_-1px_rgba(179,211,224,0.3)]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 text-[#2A7BA1] hover:text-[#0099cc] transition-colors ${
                  activeSection === item.id ? "font-semibold bg-[#D5EAF2]" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#79C7E3] to-[#0099cc]"
        initial={{ width: "0%" }}
        animate={{ width: isScrolled ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
}; 