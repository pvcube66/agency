import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-6">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10 duration-500" />
        {/* Placeholder image logic - using provided URL if valid, else random stock */}
        <img
          src={project.imageUrl || `https://images.unsplash.com/photo-${index % 2 === 0 ? '1460925895917-afdab827c52f' : '1558655146-d09347e92766'}?w=800&q=80`}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Overlay Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-display text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
            {project.title}
          </h3>
          <p className="text-muted-foreground font-light text-sm line-clamp-2 max-w-xs">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end max-w-[40%]">
          {project.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs border border-white/20 px-3 py-1 text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
