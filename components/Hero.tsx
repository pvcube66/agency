"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Delay video loading slightly to prioritize critical content
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Optimized animation config
  const animationConfig = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

  const staggerDelay = prefersReducedMotion ? 0 : 0.1

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 sm:pt-20 overflow-hidden bg-[#050505]">
      {/* Abstract Background Elements */}
      <motion.div 
        className="absolute top-1/4 -right-20 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      />

      {/* Mobile Animated Background - Floating gradient orbs */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
          {/* Large cyan orb */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl"
            style={{ left: '-10%', top: '20%' }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Purple orb */}
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-purple-500/20 blur-3xl"
            style={{ right: '-5%', top: '40%' }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Pink orb */}
          <motion.div
            className="absolute w-56 h-56 rounded-full bg-pink-500/15 blur-3xl"
            style={{ left: '20%', bottom: '10%' }}
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute w-24 h-24 border border-white/10 rotate-45"
            style={{ right: '15%', top: '15%' }}
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-16 h-16 border border-cyan-500/20 rounded-full"
            style={{ left: '10%', bottom: '25%' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN - Text Content */}
          <div className="max-w-2xl lg:max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white leading-[1.1] sm:leading-[1.05] md:leading-[0.95] tracking-tight mb-6 sm:mb-8 will-change-transform"
            >
              We Build <motion.span 
                className="text-white/30 italic font-light font-serif tracking-tighter inline-block"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...animationConfig, delay: staggerDelay }}
              >Digital</motion.span> <br className="hidden sm:block" />
              <motion.span
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...animationConfig, delay: staggerDelay * 2 }}
                className="inline-block"
              >
                Experiences That Hit Different
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig, delay: staggerDelay * 3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-sm font-light leading-relaxed">
                We don't just code websites—we craft digital masterpieces that make your brand absolutely unmissable. No cap.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig, delay: staggerDelay * 4 }}
              className="mt-6 sm:mt-8"
            >
              <Link href="/#work">
                <motion.button 
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg hover:bg-gray-100 rounded-full will-change-transform"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Peep Our Work</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Video */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, x: prefersReducedMotion ? 0 : 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ ...animationConfig, delay: 0.4 }}
            className="hidden lg:block relative will-change-transform"
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse aspect-video" />
              )}
              
              {shouldLoadVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="https://res.cloudinary.com/dhvljfjkd/image/upload/v1771436561/landingagency-poster.jpg"
                  onLoadedData={() => setVideoLoaded(true)}
                  className="w-full aspect-video object-cover"
                >
                  <source 
                    src="https://res.cloudinary.com/dhvljfjkd/video/upload/q_auto:eco/v1771436561/landingagency_ggogr2.mp4" 
                    type="video/mp4" 
                  />
                </video>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-12 left-4 sm:left-6 md:left-12 flex flex-col items-center gap-3 sm:gap-4"
      >
        <motion.div 
          className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-white to-transparent"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span 
          className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 -rotate-90 origin-bottom whitespace-nowrap"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  )
}
