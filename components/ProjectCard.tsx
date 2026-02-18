"use client"

import { motion } from "framer-motion"
import type { Project } from "@/data"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
  index: number
  highlighted?: boolean
}

export function ProjectCard({ project, index, highlighted = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        <div className={`relative overflow-hidden mb-6 ${highlighted ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10 duration-500" />
          
          {/* Highlighted Badge */}
          {highlighted && (
            <div className="absolute top-4 left-4 z-20 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Featured
            </div>
          )}
          
          <img
            src={project.image}
            alt={project.alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          {/* Hover Overlay Button */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-display text-white mb-2 group-hover:underline decoration-1 underline-offset-4 ${highlighted ? 'text-3xl' : 'text-2xl'}`}>
              {project.name}
            </h3>
            {project.description && (
              <p className="text-muted-foreground font-light text-sm mb-2">
                {project.description}
              </p>
            )}
            <p className="text-white/60 text-xs flex items-center gap-1 group-hover:text-white transition-colors">
              View Project <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
