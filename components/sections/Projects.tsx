"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
}

const projects: Project[] = [
  {
    title: "FlyAndFerry.com - Gestion de voyages",
    description: "Conception et développement de la plateforme FlyAndFerry.com, une solution web complète de gestion de voyages.",
    image: "/fly.png",
    tags: ["Nuxtjs", "GraphQL", "MongoDB", "API REST", "Tailwind"],
    demoLink: "https://flyandferry.com",
  },
  {
    title: "Siry.svrap.tn - Gestion d'inventaires et livraisons",
    description: "Maintenance de la plateforme siry.svrap.tn et développement d'une application web de gestion d'inventaires et des livraisons.",
    image: "/siry.png",
    tags: ["Laravel", "Next.js", "Prisma", "API REST", "Tailwind", "PostgreSQL", "TypeScript", "Hooks"],
    demoLink: "https://siry.svrapp.tn",
  },
  {
    title: "FreeOui.com - Gestion d'offres",
    description: "Développement de la plateforme freeoui.com, une solution web complète de gestion des offres.",
    image: "/freeoui.png",
    tags: ["Laravel", "API REST", "Bootstrap"],
    demoLink: "https://freeoui.com",
  },
  {
    title: "Saphir Palace - Gestion hôtelière",
    description: "Développement d'application web de gestion d'hôtel saphir.demos.tn.",
    image: "/saphir.png",
    tags: ["Laravel", "API REST", "Bootstrap"],
    demoLink: "https://saphir.demos.tn",
  },

];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex gap-4">
            <Button
              variant="default"
              className="bg-gradient-to-r from-[#008090] to-[#008090] hover:from-[#008090]/80 hover:to-[#008090]/80"
              asChild
            >
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                Voir la démo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Pas besoin de groupes, on utilise directement les projets individuels

  return (
    <section ref={ref} id="projects" className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/10 to-transparent dark:from-transparent dark:via-purple-900/10 dark:to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#008090] via-[#008090] to-[#008090]">
            Mes Projets
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Découvrez mes principales réalisations professionnelles
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="project-slider"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};