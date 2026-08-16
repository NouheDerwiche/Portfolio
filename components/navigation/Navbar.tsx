"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";
        if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
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
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: "Accueil",     id: "home" },
    { name: "À propos",    id: "about" },
    { name: "Compétences", id: "skills" },
    { name: "Projets",     id: "projects" },
    { name: "Contact",     id: "contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

        /* ── Root ── */
        .nb-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          font-family: 'Inter', sans-serif;
          /* Always semi-transparent — never fully transparent */
          background: rgba(10, 24, 68, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(173, 131, 60, 0.15);
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .nb-root.scrolled {
          background: rgba(10, 24, 68, 0.96);
          box-shadow: 0 4px 28px rgba(10, 24, 68, 0.35);
          border-bottom-color: rgba(173, 131, 60, 0.25);
        }

        /* ── Inner strip ── */
        .nb-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 5rem;
          display: grid;
          /* 3-column grid: logo | links (centered) | cta */
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        /* ── Logo (left column) ── */
        .nb-logo-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-self: start;
        }

        /* ── Desktop links (center column) ── */
        .nb-links {
          display: none;
          align-items: center;
          gap: 0.125rem;
        }

        @media (min-width: 768px) {
          .nb-links { display: flex; }
        }

        .nb-link {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.45rem 0.9rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          /* High-contrast white — readable on any bg thanks to the backdrop */
          color: rgba(255, 255, 255, 0.75);
          border-radius: 999px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .nb-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.07);
        }

        .nb-link.active {
          color: #C9973F;
          font-weight: 600;
        }

        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1.5px;
          background: #C9973F;
          border-radius: 999px;
          transition: width 0.25s ease;
        }

        .nb-link.active::after {
          width: 55%;
        }

        /* ── CTA (right column) ── */
        .nb-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.75rem;
          grid-column: 3; /* always occupy the right column */
        }

        .nb-cta {
          display: none;
          background: linear-gradient(135deg, #AD833C, #c9973f);
          border: none;
          cursor: pointer;
          padding: 0.55rem 1.3rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          border-radius: 999px;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .nb-cta { display: block; }
        }

        .nb-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(173, 131, 60, 0.40);
        }

        /* ── Hamburger ── */
        .nb-hamburger {
          display: flex;
          background: none;
          border: 1px solid rgba(173, 131, 60, 0.45);
          border-radius: 0.5rem;
          padding: 0.45rem;
          cursor: pointer;
          color: #C9973F;
          transition: background 0.2s, border-color 0.2s;
        }

        @media (min-width: 768px) {
          .nb-hamburger { display: none; }
        }

        .nb-hamburger:hover {
          background: rgba(173, 131, 60, 0.12);
          border-color: #C9973F;
        }

        /* ── Mobile menu ── */
        .nb-mobile {
          overflow: hidden;
          background: rgba(10, 24, 68, 0.98);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-top: 1px solid rgba(173, 131, 60, 0.15);
          border-bottom: 1px solid rgba(173, 131, 60, 0.1);
        }

        .nb-mobile-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0.75rem 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nb-mobile-link {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          padding: 0.75rem 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          border-radius: 0.75rem;
          transition: background 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nb-mobile-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .nb-mobile-link.active {
          background: rgba(173, 131, 60, 0.12);
          color: #C9973F;
          font-weight: 600;
        }

        .nb-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9973F;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .nb-mobile-link.active .nb-dot { opacity: 1; }

        .nb-mobile-cta {
          margin-top: 0.5rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #AD833C, #c9973f);
          border: none;
          border-radius: 0.75rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          text-align: center;
          transition: opacity 0.2s;
        }

        .nb-mobile-cta:hover { opacity: 0.9; }

        /* ── Scroll progress ── */
        .nb-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #0d1f58, #C9973F);
          transition: width 0.1s linear;
          border-radius: 0 999px 999px 0;
        }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`nb-root ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="nb-inner">

         <button
  className="nb-logo-btn"
  onClick={() => scrollToSection("home")}
  aria-label="Accueil"
>
  <Image
    src="/LogoN.png"
    alt="Logo Nouha Derwiche"
    width={128}
    height={128}
    className="h-14 w-auto object-contain"
    priority
  />
</button>

          {/* Center — Desktop links */}
          <div className="nb-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nb-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right — CTA + Hamburger */}
          <div className="nb-right">
            <button className="nb-cta" onClick={() => scrollToSection("contact")}>
              Me contacter
            </button>

            <button
              className="nb-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="nb-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="nb-mobile-inner">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`nb-mobile-link ${activeSection === item.id ? "active" : ""}`}
                  >
                    <span className="nb-dot" />
                    {item.name}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.05 }}
                  onClick={() => scrollToSection("contact")}
                  className="nb-mobile-cta"
                >
                  Me contacter
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress bar */}
        <div className="nb-progress" style={{ width: `${scrollProgress}%` }} />
      </motion.nav>
    </>
  );
};