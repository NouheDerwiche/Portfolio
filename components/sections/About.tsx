"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CodeTraces = () => (
  <div className="ab-traces">
    <svg className="ab-traces-svg" viewBox="0 0 400 400">
      <motion.path
        d="M50,200 C100,100 300,300 350,200"
        stroke="rgba(246,247,236,0.15)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4,6"
      />
      <motion.circle
        cx="50" cy="200" r="3.5" fill="#F6F7EC"
        animate={{ cx: [50, 350, 50] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>

    {[...Array(7)].map((_, i) => (
      <motion.div
        key={i}
        className="ab-scan-line"
        style={{ top: `${(i + 1) * 12}%` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0], x: ["0%", "0%", "80%", "80%"] }}
        transition={{ duration: 4.5, delay: i * 0.55, repeat: Infinity, ease: "linear" }}
      />
    ))}

    <svg className="ab-traces-svg" viewBox="0 0 400 400">
      <motion.path
        d="M200,40 C150,140 250,260 200,360"
        stroke="rgba(246,247,236,0.1)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4,8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="200" cy="40" r="3" fill="#F6F7EC" opacity="0.5"
        animate={{ cy: [40, 360, 40] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>

    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`bracket-${i}`}
        className="ab-bracket"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -16] }}
        transition={{ duration: 3.5, delay: i * 1.1, repeat: Infinity }}
        style={{ left: `${18 + i * 28}%`, top: "28%" }}
      >
        {"{ }"}
      </motion.div>
    ))}

    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`pkt-${i}`}
        className="ab-packet"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0], x: [0, 80, 180, 280], y: [0, -40, 40, 0] }}
        transition={{ duration: 3.2, delay: i * 0.65, repeat: Infinity, ease: "linear" }}
        style={{ left: "18%", top: "62%" }}
      />
    ))}

    <svg className="ab-traces-svg" viewBox="0 0 400 400">
      <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(246,247,236,0.06)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="200" cy="200" r="98"  fill="none" stroke="rgba(246,247,236,0.03)" strokeWidth="1" strokeDasharray="3 8" />
    </svg>
  </div>
);

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { number: "2+",   label: "Années d'expérience" },
    { number: "5+",   label: "Projets Réalisés" },
    { number: "5+",   label: "Technologies Maîtrisées" },
    { number: "100%", label: "Satisfaction Client" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Split layout ── */
        #about {
          font-family: 'Inter', sans-serif;
          display: flex;
          min-height: 100vh;
          position: relative;
        }

        /* ── LEFT panel — cream ── */
        .ab-left {
          flex: 1;
          background: #F6F7EC;
          padding: 6rem 4rem 6rem 5vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }



        /* gold vertical rule at the seam */
        .ab-left::after {
          content: '';
          position: absolute;
          right: 0; top: 8%; bottom: 8%;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #AD833C 30%, #AD833C 70%, transparent);
        }

        /* ── RIGHT panel — navy ── */
        .ab-right {
          flex: 1;
          background: #0d1f58;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 560px;
        }

        /* gold top accent on navy */
        .ab-right::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #AD833C, rgba(173,131,60,0.2), #AD833C);
          z-index: 2;
        }

        /* ── Left content ── */
        .ab-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #AD833C;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.875rem;
        }

        .ab-eyebrow::before,
        .ab-eyebrow::after {
          content: '';
          width: 2rem;
          height: 1px;
          background: #AD833C;
        }

        .ab-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #0d1f58;
          line-height: 1.15;
          margin-bottom: 2.5rem;
        }

        .ab-title em {
          font-style: italic;
          color: #AD833C;
        }

        /* Bio card on cream */
        .ab-bio-card {
          background: #fff;
          border: 1px solid rgba(13,31,88,0.1);
          border-top: 2px solid #AD833C;
          border-radius: 1.25rem;
          padding: 1.75rem 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 24px rgba(13,31,88,0.06);
        }

        .ab-bio-primary {
          color: #0d1f58;
          font-size: 0.9375rem;
          line-height: 1.75;
        }

        .ab-bio-secondary {
          color: rgba(13,31,88,0.5);
          font-size: 0.875rem;
          line-height: 1.7;
          margin-top: 0.75rem;
        }

        .ab-divider {
          height: 1px;
          background: rgba(13,31,88,0.1);
          margin: 1.25rem 0;
        }

        .ab-pill {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          border: 1px solid rgba(173,131,60,0.5);
          color: #AD833C;
          background: rgba(173,131,60,0.07);
          transition: background 0.2s, color 0.2s;
        }

        .ab-pill:hover {
          background: rgba(173,131,60,0.18);
        }

        /* Stat grid */
        .ab-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.875rem;
        }

        .ab-stat {
          background: #fff;
          border: 1px solid rgba(173,131,60,0.3);
          border-radius: 1rem;
          padding: 1.1rem 1.25rem;
          box-shadow: 0 2px 12px rgba(13,31,88,0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ab-stat:hover {
          border-color: #AD833C;
          box-shadow: 0 4px 18px rgba(173,131,60,0.12);
        }

        .ab-stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #AD833C;
          line-height: 1;
        }

        .ab-stat-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(13,31,88,0.45);
          margin-top: 0.3rem;
        }

        /* ── Right: viz panel ── */
        .ab-viz {
          position: relative;
          width: 320px;
          height: 320px;
          z-index: 10;
        }

        .ab-code-tag {
          position: absolute;
          padding: 0.3rem 0.75rem;
          border-radius: 0.5rem;
          font-family: 'Courier New', monospace;
          font-size: 0.72rem;
          background: rgba(246,247,236,0.07);
          border: 1px solid rgba(246,247,236,0.2);
          color: rgba(246,247,236,0.7);
          pointer-events: none;
          z-index: 20;
        }

        /* traces helpers */
        .ab-traces {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ab-traces-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .ab-scan-line {
          position: absolute;
          left: 0;
          height: 1px;
          width: 55%;
          background: linear-gradient(to right, rgba(246,247,236,0.15), transparent);
        }

        .ab-bracket {
          position: absolute;
          font-family: monospace;
          font-size: 1.125rem;
          color: rgba(246,247,236,0.15);
          user-select: none;
        }

        .ab-packet {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(246,247,236,0.2);
        }

        /* glow orbs on navy side */
        .ab-glow-1 {
          position: absolute;
          top: -80px; right: -60px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(173,131,60,0.12), transparent 70%);
          pointer-events: none;
        }

        .ab-glow-2 {
          position: absolute;
          bottom: -60px; left: -40px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(173,131,60,0.08), transparent 70%);
          pointer-events: none;
        }

        /* ── Mobile: stack vertically ── */
        @media (max-width: 767px) {
          #about { flex-direction: column; }
          .ab-left { padding: 4rem 1.5rem; }
          .ab-left::after { display: none; }
          .ab-right { min-height: 420px; }
          .ab-viz { width: 240px; height: 240px; }
        }
      `}</style>

      <section id="about">

        {/* ── LEFT — cream panel ── */}
        <motion.div
          className="ab-left"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="ab-eyebrow">Découvrez</div>
          <h2 className="ab-title">
            À Propos <em>de Moi</em>
          </h2>

          <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Bio card */}
            <motion.div
              className="ab-bio-card"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="ab-bio-primary">
               Développeuse Full-Stack avec plus de 2 ans d’expérience dans la conception et le développement d’applications web
modernes. Passionnée par les nouvelles technologies, je conçois des solutions performantes, évolutives et centrées
sur les besoins des utilisateurs.
              </p>
              <p className="ab-bio-secondary">
                Mon objectif est de créer des expériences utilisateur
                exceptionnelles en combinant un design élégant avec des
                fonctionnalités robustes.
              </p>
              <div className="ab-divider" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"].map((s) => (
                  <span key={s} className="ab-pill">{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="ab-stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="ab-stat"
                >
                  <div className="ab-stat-number">{stat.number}</div>
                  <div className="ab-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — navy panel ── */}
        <motion.div
          className="ab-right"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          <div className="ab-glow-1" />
          <div className="ab-glow-2" />

          {/* Floating code tags */}
          {[
            { text: "</div>",       left: "8%",  top: "14%" },
            { text: "const x = ()", left: "52%", top: "19%" },
            { text: "{ state }",    left: "6%",  top: "70%" },
            { text: "async/await",  left: "50%", top: "67%" },
          ].map((tag, i) => (
            <motion.div
              key={i}
              className="ab-code-tag"
              style={{ left: tag.left, top: tag.top }}
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
              transition={{ duration: 3.2, delay: i * 0.55, repeat: Infinity }}
            >
              {tag.text}
            </motion.div>
          ))}

          {/* Laptop SVG */}
          <div className="ab-viz">
            <motion.div
              style={{ width: "100%", height: "100%" }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              transition={{
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <ellipse cx="130" cy="112" rx="92" ry="72" fill="rgba(173,131,60,0.05)" />
                <rect x="28" y="22" width="204" height="136" rx="12" fill="#1a2e6e" stroke="#AD833C" strokeWidth="1.5" opacity="0.9" />
                <rect x="40" y="34" width="180" height="112" rx="7" fill="#0d1f58" />
                <rect x="40" y="34" width="180" height="14" rx="7" fill="rgba(173,131,60,0.1)" />
                <circle cx="52" cy="41" r="3" fill="rgba(173,131,60,0.6)" />
                <circle cx="62" cy="41" r="3" fill="rgba(173,131,60,0.35)" />
                <circle cx="72" cy="41" r="3" fill="rgba(173,131,60,0.2)" />
                <rect x="50" y="58" width="52" height="5" rx="2.5" fill="#AD833C" opacity="0.9" />
                <rect x="108" y="58" width="34" height="5" rx="2.5" fill="rgba(246,247,236,0.3)" />
                <rect x="58" y="70" width="78" height="5" rx="2.5" fill="rgba(246,247,236,0.18)" />
                <rect x="58" y="82" width="38" height="5" rx="2.5" fill="#AD833C" opacity="0.6" />
                <rect x="102" y="82" width="56" height="5" rx="2.5" fill="rgba(246,247,236,0.14)" />
                <rect x="66" y="94" width="66" height="5" rx="2.5" fill="rgba(246,247,236,0.16)" />
                <rect x="66" y="106" width="30" height="5" rx="2.5" fill="#AD833C" opacity="0.65" />
                <rect x="102" y="106" width="50" height="5" rx="2.5" fill="rgba(246,247,236,0.14)" />
                <rect x="50" y="118" width="90" height="5" rx="2.5" fill="rgba(246,247,236,0.16)" />
                <rect x="50" y="130" width="55" height="5" rx="2.5" fill="#AD833C" opacity="0.45" />
                <rect x="110" y="130" width="3" height="5" rx="1.5" fill="#AD833C">
                  <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
                </rect>
                <rect x="28" y="156" width="204" height="5" rx="2.5" fill="#AD833C" opacity="0.3" />
                <rect x="18" y="159" width="224" height="16" rx="8" fill="#AD833C" opacity="0.65" />
                <rect x="100" y="178" width="60" height="38" rx="7" fill="rgba(173,131,60,0.1)" stroke="rgba(173,131,60,0.4)" strokeWidth="0.75" />
                <g transform="translate(130,14)" fill="none" strokeLinecap="round">
                  <path d="M -13,-14 A 19,19 0 0,1 13,-14" stroke="#AD833C" strokeWidth="2" opacity="0.25">
                    <animate attributeName="opacity" values="0.25;0.7;0.25" dur="2s" repeatCount="indefinite" begin="0s" />
                  </path>
                  <path d="M -8,-9 A 11,11 0 0,1 8,-9" stroke="#AD833C" strokeWidth="2" opacity="0.45">
                    <animate attributeName="opacity" values="0.45;1;0.45" dur="2s" repeatCount="indefinite" begin="0.3s" />
                  </path>
                  <circle cx="0" cy="-4" r="2.5" fill="#AD833C" opacity="0.85">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s" />
                  </circle>
                </g>
              </svg>
            </motion.div>
          </div>

          <CodeTraces />
        </motion.div>

      </section>
    </>
  );
};