"use client"

import { motion } from "framer-motion"
import type { Project } from "@/data"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface ProjectCardProps {
  project: Project
  index: number
  highlighted?: boolean
}

export function ProjectCard({ project, index, highlighted = false }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        <div className={`relative overflow-hidden mb-4 sm:mb-6 rounded-lg sm:rounded-xl ${highlighted ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10 duration-500" />
          
          {/* Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
          )}
          
          {/* Highlighted Badge */}
          {highlighted && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 bg-white text-black px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm">
              Featured
            </div>
          )}
          
          <Image
            src={project.image}
            alt={project.alt || project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
          
          {/* Hover Overlay Button */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start px-1">
          <div>
            <h3 className={`font-display text-white mb-1 sm:mb-2 group-hover:underline decoration-1 underline-offset-4 ${
              highlighted ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'
            }`}>
              {project.name}
            </h3>
            {project.description && (
              <p className="text-muted-foreground font-light text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
                {project.description}
              </p>
            )}
            <p className="text-white/60 text-xs sm:text-sm flex items-center gap-1 group-hover:text-white transition-colors">
              View Project <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
