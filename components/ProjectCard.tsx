"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Project } from "@/data"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, memo } from "react"

interface ProjectCardProps {
  project: Project
  index: number
  highlighted?: boolean
}

export const ProjectCard = memo(function ProjectCard({ project, index, highlighted = false }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group cursor-pointer will-change-transform"
    >
      <Link href={project.url} target="_blank" rel="noopener noreferrer">
        <motion.div 
          className={`relative overflow-hidden mb-4 sm:mb-6 rounded-lg sm:rounded-xl ${highlighted ? 'aspect-[16/10]' : 'aspect-[4/3]'} bg-gray-900`}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/20 z-10"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          )}
          
          {/* Highlighted Badge */}
          {highlighted && (
            <motion.div 
              className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 bg-white text-black px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            >
              Featured
            </motion.div>
          )}
          
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.08 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.image}
              alt={project.alt || project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading={index < 3 ? "eager" : "lazy"}
              quality={80}
            />
          </motion.div>
          
          {/* Hover Overlay Button */}
          <motion.div 
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-between items-start px-1"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          <div>
            <motion.h3 
              className={`font-display text-white mb-1 sm:mb-2 transition-all duration-300 ${
                highlighted ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="group-hover:underline decoration-1 underline-offset-4">{project.name}</span>
            </motion.h3>
            {project.description && (
              <p className="text-muted-foreground font-light text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
                {project.description}
              </p>
            )}
            <motion.p 
              className="text-white/60 text-xs sm:text-sm flex items-center gap-1 transition-colors duration-300 group-hover:text-white"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              View Project <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
})
