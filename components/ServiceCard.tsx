"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import * as Icons from "lucide-react"
import type { Service } from "@/data"
import { useRef } from "react"

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = (Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; strokeWidth?: number }>) || Icons.Layout
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-30px" })
  const prefersReducedMotion = useReducedMotion()

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: Math.min(index * 0.1, 0.4),
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
      whileHover={{ 
        scale: prefersReducedMotion ? 1 : 1.02,
        y: prefersReducedMotion ? 0 : -5,
        transition: { duration: 0.3 }
      }}
      className="p-5 sm:p-6 md:p-8 border border-white/10 hover:border-white/30 transition-colors duration-300 bg-white/[0.02] hover:bg-white/[0.05] group rounded-xl sm:rounded-none will-change-transform"
    >
      <motion.div 
        className="mb-4 sm:mb-6 text-white/40 group-hover:text-white transition-colors duration-300"
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, rotate: prefersReducedMotion ? 0 : 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={32} strokeWidth={1} />
      </motion.div>
      <motion.h3 
        className="text-xl sm:text-2xl font-display text-white mb-2 sm:mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      >
        {service.title}
      </motion.h3>
      <motion.p 
        className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      >
        {service.description}
      </motion.p>
    </motion.div>
  )
}
