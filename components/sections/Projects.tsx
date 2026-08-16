"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
////
const projects = [
  {
    title: "FlyAndFerry.com",
    description: "Plateforme complète de gestion de voyages avec architecture moderne et API scalable.",
    image: "/fly.png",
    tags: ["Nuxt", "GraphQL", "MongoDB", "Tailwind"],
    demoLink: "https://flyandferry.com",
  },
  {
    title: "Siry.svrap.tn",
    description: "Système de gestion d'inventaire et livraison avec dashboard intelligent.",
    image: "/siry.png",
    tags: ["Laravel", "Next.js", "PostgreSQL", "Prisma"],
    demoLink: "https://siry.svrapp.tn",
  },
  {
    title: "FreeOui.com",
    description: "Plateforme d'offres et gestion commerciale automatisée.",
    image: "/freeoui.png",
    tags: ["Laravel", "Bootstrap", "API"],
    demoLink: "https://freeoui.com",
  },
  {
    title: "Saphir Palace",
    description: "Application de gestion hôtelière moderne et intuitive.",
    image: "/saphir.png",
    tags: ["Laravel", "Tailwind", "MySQL"],
    demoLink: "https://saphir.demos.tn",
  },

  {
    title: "2N Solution",
    description: "Plateforme de recrutement intelligent avec coaching IA et meeting intégré.",
    image: "/2N.png",
    tags: ["Next.js", "IA", "Video Call", "MongoDB", "Python"],
    demoLink: "https://2nsolution.com",
  },
 
  {
    title: "AmAway",
    description: "Gestion d'agences de voyages partenaires d'Amadeus avec intégration complète.",
    image: "/amaway.png",
    tags: ["Next.js", "Amadeus API", "Prisma", "PostgreSQL"],
    demoLink: "https://amaway.4prod.tn",
  },
 
 {
  title: "MOST SVR",
  description: "Solution de gestion d’inventaire et de suivi des stocks pour les produits SVR, Filorga et Filmed.",
  image: "/INVENTAIRE.png",
  tags: ["Laravel", "PostgreSQL", "Logistics"],
  demoLink: "https://most.svrapp.tn/",
},
{
  title: "Watan Training",
  description: "Plateforme de formation en ligne avec certification et suivi de progression.",
  image: "/watan.png",
  tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  demoLink: "https://www.watantraining.us",
},
{
  title: "SiryRH",
  description: "Plateforme de gestion RH et livraison de commandes pour distribution cosmétique.",
  image: "/siryrh.png",
  tags: ["Next.js", "PostgreSQL", "Logistics"],
  demoLink: "https://siryrh.svrapp.tn",
},
];

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="h-full">
      <div className="project-card group">
        {/* IMAGE */}
        <div className="project-image-wrapper">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={project.title === "Watan Training" ? "eager" : "lazy"}
            className="object-cover group-hover:scale-105 transition duration-700"
          />
          {/* gradient overlay */}
          <div className="project-overlay" />

          {/* title + tags on image */}
          <div className="project-image-content">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-tags">
              {project.tags.map((tag: string, i: number) => (
                <span key={i} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="project-body">
          <p className="project-description">{project.description}</p>
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-btn">
            <svg style={{ width: "0.9rem", height: "0.9rem", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Voir le projet
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Section ── */
        .projects-section {
          font-family: 'Inter', sans-serif;
          background-color: #F6F7EC;
          position: relative;
          padding: 5rem 0 6rem;
          overflow: hidden;
        }

        .projects-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0d1f58, #AD833C, #0d1f58);
        }

        /* subtle radial tints */
        .projects-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 10% 50%, rgba(13,31,88,0.05) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(173,131,60,0.07) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Header ── */
        .projects-eyebrow {
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

        .projects-eyebrow::before,
        .projects-eyebrow::after {
          content: '';
          width: 2rem;
          height: 1px;
          background: #AD833C;
        }

        .projects-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: #0d1f58;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }

        .projects-heading em {
          font-style: italic;
          color: #AD833C;
        }

        .projects-subtext {
          color: #6b7280;
          font-size: 0.9375rem;
          max-width: 36ch;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Card ── */
        .project-card {
          height: 100%;
          border-radius: 1.25rem;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(13,31,88,0.08);
          box-shadow: 0 2px 12px rgba(13,31,88,0.05);
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s, border-color 0.3s;
        }

        .project-card:hover {
          box-shadow: 0 12px 32px rgba(13,31,88,0.12);
          border-color: rgba(173,131,60,0.3);
        }

        /* gold top accent line on card */
        .project-card::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, #AD833C, rgba(173,131,60,0.2));
          flex-shrink: 0;
        }

        .project-image-wrapper {
          position: relative;
          height: 13rem;
          overflow: hidden;
          flex-shrink: 0;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,31,88,0.92) 0%, rgba(13,31,88,0.45) 50%, transparent 100%);
        }

        .project-image-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1rem 1.125rem;
        }

        .project-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #F6F7EC;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .project-tag {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          background: rgba(173,131,60,0.2);
          color: #e8c97a;
          border: 1px solid rgba(173,131,60,0.3);
          backdrop-filter: blur(4px);
        }

        .project-body {
          padding: 1.125rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .project-description {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .project-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.7rem 1rem;
          background: #0d1f58;
          color: #F6F7EC;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 0.75rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .project-btn:hover {
          background: #AD833C;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(173,131,60,0.3);
        }

        /* ── Swiper overrides ── */
        .projects-swiper {
          padding-bottom: 3rem !important;
        }

        .projects-swiper .swiper-pagination-bullet {
          background: #0d1f58;
          opacity: 0.25;
          width: 7px;
          height: 7px;
        }

        .projects-swiper .swiper-pagination-bullet-active {
          background: #AD833C;
          opacity: 1;
          width: 22px;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .projects-swiper .swiper-button-next,
        .projects-swiper .swiper-button-prev {
          width: 2.5rem;
          height: 2.5rem;
          background: #0d1f58;
          border-radius: 50%;
          color: #AD833C !important;
          top: 42%;
        }

        .projects-swiper .swiper-button-next::after,
        .projects-swiper .swiper-button-prev::after {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .projects-swiper .swiper-button-next:hover,
        .projects-swiper .swiper-button-prev:hover {
          background: #AD833C;
          color: #F6F7EC !important;
        }

        .projects-swiper .swiper-button-disabled {
          opacity: 0.3 !important;
        }
      `}</style>

      <section ref={ref} id="projects" className="projects-section">
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div className="projects-eyebrow">Portfolio</div>
            <h2 className="projects-heading">
              Mes <em>Projets</em>
            </h2>
            <p className="projects-subtext">
              Réalisations professionnelles full-stack & SaaS
            </p>
          </motion.div>

          {/* SWIPER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <Swiper
              className="projects-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {projects.map((project, i) => (
                <SwiperSlide key={i} style={{ height: "auto" }}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

        </div>
      </section>
    </>
  );
};