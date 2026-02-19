"use client"

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data"

// Static data
const stats = [
  { number: "16+", label: "Projects Shipped" },
  { number: "100%", label: "Clients Happy" },
  { number: "24/7", label: "Always On" },
  { number: "5★", label: "Pure Vibes" },
]

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

// Parallax wrapper component
function ParallaxSection({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export default function WorkPage() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  
  // Parallax transforms for background
  const bgY = useTransform(scrollY, [0, 1000], [0, 200])
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -150])

  const featuredProjects = useMemo(() => projects.filter(p => p.highlighted), [])
  const otherProjects = useMemo(() => projects.filter(p => !p.highlighted), [])

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20 overflow-hidden">
      <Navigation />
      
      {/* Parallax Background Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div 
            className="fixed top-1/4 -right-40 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none"
            style={{ y: bgY }}
          />
          <motion.div 
            className="fixed bottom-1/4 -left-40 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none"
            style={{ y: bgY2 }}
          />
        </>
      )}
      
      <main className="pt-32 pb-20 relative z-10">
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
              The Collection
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Every project tells a story. These are the digital experiences we&apos;ve crafted that broke the internet (in a good way).
            </motion.p>
          </motion.div>

          {/* Featured Projects Section with Parallax */}
          <ParallaxSection speed={0.3}>
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
                The Greatest Hits
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} highlighted={true} />
                ))}
              </div>
            </motion.div>
          </ParallaxSection>

          {/* All Projects Grid with Parallax */}
          <ParallaxSection speed={0.5}>
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
                Everything Else
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </div>
            </motion.div>
          </ParallaxSection>

          {/* Stats Section with Parallax */}
          <ParallaxSection speed={0.2}>
            <motion.div 
              className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {stats.map((stat, idx) => (
                <StatItem key={idx} stat={stat} index={idx} />
              ))}
            </motion.div>
          </ParallaxSection>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
