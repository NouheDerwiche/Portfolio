"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const skills = [
  // Frontend
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend", percentage: 90 },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", percentage: 88 },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", category: "Frontend", percentage: 80 },
  { name: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", category: "Frontend", percentage: 85 },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend", percentage: 82 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend", percentage: 92 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend", percentage: 95 },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend", percentage: 98 },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend", percentage: 95 },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", percentage: 90 },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", category: "Frontend", percentage: 82 },
  { name: "shadcn/ui", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", percentage: 80 },

  // Backend
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Backend", percentage: 88 },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "Backend", percentage: 90 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", percentage: 86 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend", percentage: 80 },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Backend", percentage: 72 },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Backend", percentage: 68 },

  // APIs & AI
  { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "APIs & AI", percentage: 85 },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "APIs & AI", percentage: 75 },
  { name: "AI Integration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "APIs & AI", percentage: 78 },
  { name: "Prompt Engineering", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "APIs & AI", percentage: 76 },

  // Databases
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database", percentage: 80 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", percentage: 75 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database", percentage: 85 },

  // DevOps & Tools
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", percentage: 82 },
  { name: "Coolify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", percentage: 74 },
  { name: "Plesk", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps", percentage: 70 },
  { name: "SSH / PuTTY", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps", percentage: 76 },
  { name: "Firebase / FCM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "DevOps", percentage: 76 },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", percentage: 88 },

  // Agile
  { name: "Agile", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", category: "Agile", percentage: 84 },
  { name: "Scrum", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", category: "Agile", percentage: 82 },

  // Digital Marketing & Growth
  { name: "SEO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", category: "Marketing", percentage: 78 },
  { name: "Content Marketing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", category: "Marketing", percentage: 76 },
  { name: "LinkedIn Marketing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", category: "Marketing", percentage: 76 },
  { name: "Email Marketing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", category: "Marketing", percentage: 74 },
  { name: "Google Analytics", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", category: "Marketing", percentage: 72 },

  // Other
  { name: "RFID", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", category: "Other", percentage: 72 },
  { name: "OCR", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Other", percentage: 70 },
  { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", category: "Other", percentage: 70 },
  { name: "Travail en équipe", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Other", percentage: 88 },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps", "APIs & AI", "Agile", "Marketing", "Other"];
const RING_RADIUS = 26;
const RING_CIRC = Math.round(2 * Math.PI * RING_RADIUS);

type Skill = (typeof skills)[number];

const SkillCard = ({ skill, animate }: { skill: Skill; animate: boolean }) => {
  const offset = Math.round(RING_CIRC * (1 - skill.percentage / 100));
  return (
    <div className="sk-card group">
      <div className="sk-icon-wrap">
        <Image src={skill.icon} alt={skill.name} width={28} height={28} className="sk-icon" unoptimized />
      </div>
      <span className="sk-name">{skill.name}</span>
      <span className="sk-cat">{skill.category}</span>
      <div className="sk-ring-wrap">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r={RING_RADIUS} stroke="rgba(246,247,236,0.1)" strokeWidth="5" />
          <circle
            cx="32" cy="32" r={RING_RADIUS}
            stroke="#AD833C" strokeWidth="5"
            strokeDasharray={RING_CIRC}
            strokeDashoffset={animate ? offset : RING_CIRC}
            strokeLinecap="butt"
            transform="rotate(-90 32 32)"
            style={{ transition: animate ? "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" : "none" }}
          />
        </svg>
        <span className="sk-pct">{skill.percentage}%</span>
      </div>
    </div>
  );
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleFilter = (cat: string) => {
    setAnimate(false);
    setActiveCategory(cat);
    setTimeout(() => setAnimate(true), 60);
  };

  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Section ── */
        #skills {
          font-family: 'Inter', sans-serif;
          background-color: #F6F7EC;
          position: relative;
          overflow: hidden;
        }

        #skills::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0d1f58, #AD833C, #0d1f58);
          z-index: 2;
        }

        #skills::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 85% 10%, rgba(13,31,88,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 15% 90%, rgba(173,131,60,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Header ── */
        .sk-eyebrow {
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

        .sk-eyebrow::before,
        .sk-eyebrow::after {
          content: '';
          width: 2rem;
          height: 1px;
          background: #AD833C;
        }

        .sk-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: #0d1f58;
          line-height: 1.15;
          margin-bottom: 0;
        }

        .sk-title em {
          font-style: italic;
          color: #AD833C;
        }

        /* ── Filter buttons ── */
        .sk-filter-btn {
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(13,31,88,0.25);
          background: transparent;
          color: #0d1f58;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .sk-filter-btn:hover {
          border-color: #AD833C;
          color: #AD833C;
        }

        .sk-filter-btn.active {
          background: #0d1f58;
          border-color: #0d1f58;
          color: #F6F7EC;
          box-shadow: 0 4px 12px rgba(13,31,88,0.2);
        }

        /* ── Slider ── */
        .skills-slider {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1.5rem 0 2rem;
          /* fade edges */
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .skills-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: scrollSkills 38s linear infinite;
        }

        .skills-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollSkills {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Card ── */
        .sk-card {
          background: #0d1f58;
          border-radius: 1rem;
          border: 1px solid rgba(173,131,60,0.15);
          border-top: 2px solid #AD833C;
          padding: 1.5rem 1rem;
          width: 160px;
          min-width: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          position: relative;
          cursor: default;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          animation: floatCard 5s ease-in-out infinite;
        }

        .sk-card:nth-child(even)  { animation-delay: 1.2s; }
        .sk-card:nth-child(3n)    { animation-delay: 2.4s; }
        .sk-card:nth-child(4n)    { animation-delay: 0.6s; }

        .sk-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 16px 36px rgba(13,31,88,0.25), 0 0 0 1px rgba(173,131,60,0.4);
          border-color: #AD833C;
          animation-play-state: paused;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }

        /* ── Icon ── */
        .sk-icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(173,131,60,0.35);
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(246,247,236,0.05);
        }

        .sk-icon {
          width: 28px !important;
          height: 28px !important;
          object-fit: contain;
        }

        /* ── Text ── */
        .sk-name {
          color: #F6F7EC;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .sk-cat {
          color: #AD833C;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ── Ring ── */
        .sk-ring-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          margin-top: 0.25rem;
        }

        .sk-ring-wrap svg {
          position: absolute;
          inset: 0;
        }

        .sk-pct {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F6F7EC;
          font-weight: 700;
          font-size: 0.9rem;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .sk-card { min-width: 140px; width: 140px; padding: 1.25rem 0.875rem; }
          .sk-name { font-size: 0.8rem; }
          .sk-icon-wrap { width: 44px; height: 44px; }
          .skills-track { gap: 0.875rem; animation-duration: 24s; }
        }
      `}</style>

      <section id="skills" className="py-20">
        <div className="relative z-10 container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="sk-eyebrow">Stack & Expertise</p>
            <h2 className="sk-title">
              Mes <em>Compétences</em>
            </h2>
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`sk-filter-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="skills-slider">
            <div className="skills-track">
              {[...filtered, ...filtered].map((skill, index) => (
                <SkillCard key={`${skill.name}-${index}`} skill={skill} animate={animate} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};