"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data"

// Stats component with animation
function StatItem({ stat, index }: { stat: { number: string; label: string }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
    >
      <motion.div 
        className="text-4xl md:text-5xl font-display text-white mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      >
        {stat.number}
      </motion.div>
      <motion.div 
        className="text-sm text-muted-foreground uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  )
}

export default function WorkPage() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="mb-16 text-center"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-display mb-6"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Work
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Explore our complete portfolio of web applications, platforms, and digital experiences we&apos;ve crafted for clients worldwide.
            </motion.p>
          </motion.div>

          {/* Featured Projects Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-display mb-12"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects
                .filter(p => p.highlighted)
                .map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} highlighted={true} />
                ))}
            </div>
          </motion.div>

          {/* All Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-display mb-12"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              All Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects
                .filter(p => !p.highlighted)
                .map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { number: "16+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
              { number: "5★", label: "Average Rating" },
            ].map((stat, idx) => (
              <StatItem key={idx} stat={stat} index={idx} />
            ))}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
