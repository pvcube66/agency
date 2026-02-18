"use client"

import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data"
import { motion } from "framer-motion"

export default function WorkPage() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-display mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Explore our complete portfolio of web applications, platforms, and digital experiences we&apos;ve crafted for clients worldwide.
            </p>
          </motion.div>

          {/* Featured Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display mb-12">Featured Projects</h2>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display mb-12">All Projects</h2>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16"
          >
            {[
              { number: "16+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
              { number: "5★", label: "Average Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-display text-white mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
