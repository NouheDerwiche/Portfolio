"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { DevObjects } from "../3d/DevObjects";
import Image from "next/image";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');

        #home { font-family: 'Inter', sans-serif; }

        /* ── Noise texture overlay ── */
        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          z-index: 1;
        }

        /* ── Geometric grid on navy panel ── */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(173,131,60,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(173,131,60,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── Typography ── */
        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 8vw, 5.5rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: #F6F7EC;
        }

        .hero-name-gold {
          font-style: italic;
          color: #AD833C;
        }

        .hero-role {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.875rem, 2vw, 1.0625rem);
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(197,204,232,0.75);
        }

        .hero-description {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(168,179,208,0.85);
          max-width: 38ch;
        }

        /* ── Eyebrow ── */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-eyebrow-line {
          display: block;
          width: 2.5rem;
          height: 1.5px;
          background: #AD833C;
        }

        .hero-eyebrow-text {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #AD833C;
        }

        /* ── Divider ── */
        .hero-divider {
          width: 4rem;
          height: 1.5px;
          background: linear-gradient(90deg, #AD833C, rgba(173,131,60,0.2));
        }

        /* ── CTA buttons ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: #AD833C;
          color: #F6F7EC;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary:hover {
          background: #bf9244;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(173,131,60,0.35);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: transparent;
          color: #F6F7EC;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(246,247,236,0.3);
          border-radius: 0;
          cursor: pointer;
          transition: border-color 0.22s, color 0.22s, transform 0.18s;
        }

        .btn-secondary:hover {
          border-color: #AD833C;
          color: #AD833C;
          transform: translateY(-2px);
        }

        /* ── Photo frame ── */
        .photo-frame {
          position: relative;
          width: clamp(260px, 32vw, 400px);
        }

        .photo-shadow-block {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 100%;
          height: 100%;
          background: #0a1844;
          border: 1px solid rgba(173,131,60,0.2);
        }

        .photo-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/5;
          border: 1.5px solid rgba(173,131,60,0.5);
        }

        .photo-wash {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, transparent 50%, rgba(13,31,88,0.6) 100%);
        }

        /* Gold corners */
        .corner {
          position: absolute;
          width: 1.75rem;
          height: 1.75rem;
          border-color: #AD833C;
          border-style: solid;
        }

        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        /* Badge */
        .photo-badge {
          position: absolute;
          bottom: -1rem;
          right: -1rem;
          background: #AD833C;
          padding: 0.6rem 1.25rem;
        }

        .photo-badge-text {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F6F7EC;
          white-space: nowrap;
        }

        /* ── Stats strip ── */
        .stats-strip {
          display: flex;
          gap: 2rem;
          padding-top: 0.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.625rem;
          font-weight: 700;
          color: #AD833C;
          line-height: 1;
        }

        .stat-lbl {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(197,204,232,0.5);
        }

        .stat-sep {
          width: 1px;
          background: rgba(173,131,60,0.25);
          align-self: stretch;
        }

        /* ── Scroll indicator ── */
        .scroll-ind {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #AD833C;
          z-index: 20;
        }

        .scroll-ind-text {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .scroll-ind-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #AD833C, transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.5); opacity: 0.4; }
        }
      `}</style>

      <section
        id="home"
        className="min-h-screen relative overflow-hidden"
        style={{ backgroundColor: "#F6F7EC" }}
      >
        {/* 3D canvas layer */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} color="#AD833C" intensity={1} />
              <DevObjects />
            </Suspense>
          </Canvas>
        </div>

        {/* Navy left panel */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[54%] z-10"
          style={{ backgroundColor: "#0d1f58" }}
        >
          <div className="hero-grid" />

          {/* Diagonal gold accent */}
          <div
            className="absolute bottom-0 right-0 opacity-[0.07]"
            style={{
              width: 200,
              height: "115%",
              background: "#AD833C",
              transform: "rotate(-12deg)",
              transformOrigin: "bottom right",
            }}
          />
          {/* Thin vertical rule */}
          <div
            className="absolute right-0 top-[10%] bottom-[10%] w-px opacity-20"
            style={{ background: "linear-gradient(to bottom, transparent, #AD833C 30%, #AD833C 70%, transparent)" }}
          />
        </div>

        {/* Noise */}
        <div className="hero-noise" />

        {/* Main layout */}
        <div className="relative z-20 container mx-auto px-6 sm:px-10 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center w-full">

            {/* ── Left: Text ── */}
            <div className="py-24 lg:py-0 lg:pr-20" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

              {/* Eyebrow */}
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="hero-eyebrow">
                <span className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">Portfolio · Développeuse Web</span>
              </motion.div>

              {/* Name */}
              <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="hero-name">
                Nouhe
                <br />
                <em className="hero-name-gold">Derwiche</em>
              </motion.h2>

              {/* Role */}
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="hero-role">
                Développeuse Full-Stack
              </motion.p>

              {/* Divider */}
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="hero-divider" />

              {/* Description */}
              <motion.p custom={4} variants={fadeUp} initial="hidden" animate="visible" className="hero-description">
                Je conçois des interfaces modernes, performantes et accessibles —
                en transformant vos idées en solutions digitales intuitives et engageantes.
              </motion.p>

              {/* Stats strip */}
              <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="stats-strip">
                <div className="stat-item">
                  <span className="stat-num">2+</span>
                  <span className="stat-lbl">Années exp.</span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                  <span className="stat-num">9+</span>
                  <span className="stat-lbl">Projets</span>
                </div>
                <div className="stat-sep" />
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Satisfaction</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                custom={6}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", paddingTop: "0.25rem" }}
              >
                <Link href="/CV DN.pdf" download>
                  <span className="btn-primary">
                    <svg style={{ width: "0.875rem", height: "0.875rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger CV
                  </span>
                </Link>
                <Link href="#contact">
                  <span className="btn-secondary">
                    <svg style={{ width: "0.875rem", height: "0.875rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Me contacter
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Photo ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}
            >
              <div className="photo-frame">

                {/* Shadow block */}
                <div className="photo-shadow-block" />

                {/* Photo */}
                <div className="photo-container">
                  <Image
                    src="/noh.png"
                    alt="Nouhe Derwiche"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="photo-wash" />
                </div>

                {/* Corner accents */}
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="photo-badge"
                >
                  <p className="photo-badge-text">Full-Stack Dev</p>
                </motion.div>

                {/* Floating tech pill */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "-3.5rem",
                    background: "rgba(13,31,88,0.92)",
                    border: "1px solid rgba(173,131,60,0.4)",
                    padding: "0.5rem 0.875rem",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#AD833C", display: "block", animation: "pulse-dot 2s infinite" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#F6F7EC", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    Open to work
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="scroll-ind"
        >
          <span className="scroll-ind-text">Scroll</span>
          <div className="scroll-ind-line" />
        </motion.div>

        {/* Pulse animation keyframe */}
        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.75); }
          }
        `}</style>
      </section>
    </>
  );
};