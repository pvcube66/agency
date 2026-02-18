"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const animationConfig = isMobile 
    ? { duration: 0.4 } 
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 sm:pt-20 overflow-hidden bg-[#050505]">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 -right-20 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN - Text Content */}
          <div className="max-w-2xl lg:max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-white leading-[0.9] sm:leading-[0.85] tracking-tight mb-6 sm:mb-8"
            >
              Crafted <span className="text-white/30 italic font-light font-serif tracking-tighter">Websites</span> <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Lasting Impressions
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...animationConfig }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-8 sm:mt-12"
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-sm font-light leading-relaxed">
                We are a digital agency specializing in high-end design and development for brands that refuse to blend in.
              </p>

              <Link href="/#work" className="w-full sm:w-auto">
                <button className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg hover:bg-gray-100 transition-all rounded-full w-full sm:w-auto">
                  <span>See Our Works</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Video */}
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 0.98 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, ...animationConfig }}
            className="hidden lg:block relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
              )}
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoLoaded(true)}
                className="w-full aspect-video object-cover"
              >
                <source src="https://res.cloudinary.com/dhvljfjkd/video/upload/v1771436561/landingagency_ggogr2.mp4" type="video/mp4" />
              </video>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 sm:bottom-12 left-4 sm:left-6 md:left-12 flex flex-col items-center gap-3 sm:gap-4"
      >
        <div className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 -rotate-90 origin-bottom whitespace-nowrap">Scroll</span>
      </motion.div>
    </section>
  )
}
