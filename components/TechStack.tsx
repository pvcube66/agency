"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState, ReactNode, memo } from "react"

// Comprehensive Tech Stack Data
const techRows = [
  [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind", category: "Styling" },
  ],
  [
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Language" },
    { name: "Rust", category: "Systems" },
    { name: "PostgreSQL", category: "Database" },
  ],
  [
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "Redis", category: "Database" },
  ],
]

// Tech Icon SVGs - Memoized for performance
const TechIcon = memo(function TechIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    "Next.js": (
      <svg viewBox="0 0 180 180" className="w-8 h-8 md:w-10 md:h-10">
        <mask id="nextMask2" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <g mask="url(#nextMask2)">
          <circle cx="90" cy="90" r="90" fill="black"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextGradient2)"/>
          <rect x="115" y="54" width="12" height="72" fill="url(#nextGradient2)"/>
        </g>
        <defs>
          <linearGradient id="nextGradient2" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    "React": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 50 50)"/>
      </svg>
    ),
    "TypeScript": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <rect width="100" height="100" rx="15" fill="#3178C6"/>
        <text x="25" y="70" fill="white" fontSize="50" fontWeight="bold" fontFamily="Arial">TS</text>
      </svg>
    ),
    "Tailwind": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M50 25C35 25 30 35 30 40C30 50 40 55 50 55C70 55 70 45 70 40C70 30 60 25 50 25Z" fill="#38BDF8"/>
        <path d="M50 55C35 55 30 65 30 70C30 80 40 85 50 85C70 85 70 75 70 70C70 60 60 55 50 55Z" fill="#38BDF8" opacity="0.7"/>
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" fill="#339933"/>
        <path d="M50 25V75M30 40V65L50 75L70 65V40" stroke="white" strokeWidth="4" fill="none"/>
      </svg>
    ),
    "Python": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M50 15C30 15 30 25 30 30V40H50V45H25C15 45 10 50 10 60V70C10 80 15 85 25 85H35V75C35 65 40 60 50 60H70C80 60 85 55 85 45V30C85 20 80 15 70 15H50Z" fill="#3776AB"/>
        <path d="M50 85C70 85 70 75 70 70V60H50V55H75C85 55 90 50 90 40V30C90 20 85 15 75 15H65V25C65 35 60 40 50 40H30C20 40 15 45 15 55V70C15 80 20 85 30 85H50Z" fill="#FFD43B"/>
        <circle cx="38" cy="28" r="5" fill="white"/>
        <circle cx="62" cy="72" r="5" fill="white"/>
      </svg>
    ),
    "Rust": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <circle cx="50" cy="50" r="45" fill="#CE422B"/>
        <text x="50" y="62" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="monospace">R</text>
      </svg>
    ),
    "PostgreSQL": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M50 10C30 10 15 25 15 45C15 70 30 90 50 90C70 90 85 70 85 45C85 25 70 10 50 10Z" fill="#336791"/>
        <path d="M35 35H65M35 50H65M35 65H55" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    "AWS": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M30 55L50 40L70 55" stroke="#FF9900" strokeWidth="6" fill="none"/>
        <path d="M25 50C25 35 35 25 50 25C65 25 75 35 75 50" stroke="#FF9900" strokeWidth="6" fill="none"/>
        <text x="50" y="75" textAnchor="middle" fill="#FF9900" fontSize="14" fontWeight="bold">AWS</text>
      </svg>
    ),
    "Docker": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <rect x="20" y="50" width="12" height="12" fill="#2496ED"/>
        <rect x="35" y="50" width="12" height="12" fill="#2496ED"/>
        <rect x="50" y="50" width="12" height="12" fill="#2496ED"/>
        <rect x="35" y="35" width="12" height="12" fill="#2496ED"/>
        <rect x="50" y="35" width="12" height="12" fill="#2496ED"/>
        <rect x="65" y="35" width="12" height="12" fill="#2496ED"/>
        <path d="M20 68H80V72C80 80 75 85 67 85H33C25 85 20 80 20 72V68Z" fill="#2496ED"/>
      </svg>
    ),
    "Kubernetes": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <circle cx="50" cy="50" r="40" fill="#326CE5"/>
        <path d="M50 20L55 40L75 35L60 50L75 65L55 60L50 80L45 60L25 65L40 50L25 35L45 40Z" fill="white"/>
      </svg>
    ),
    "Redis": (
      <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
        <ellipse cx="50" cy="30" rx="35" ry="15" fill="#DC382D"/>
        <ellipse cx="50" cy="45" rx="35" ry="15" fill="#A32422"/>
        <ellipse cx="50" cy="60" rx="35" ry="15" fill="#DC382D"/>
        <ellipse cx="50" cy="75" rx="35" ry="15" fill="#A32422"/>
      </svg>
    ),
  }

  return icons[name] || (
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 flex items-center justify-center">
      <span className="text-white font-bold text-xs md:text-sm">{name.slice(0, 2)}</span>
    </div>
  )
})

// Typewriter hook
function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView) {
      setDisplayText("")
      setIsComplete(false)
      setHasAnimated(false)
      return
    }

    if (hasAnimated) return
    setHasAnimated(true)

    const startTimeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [isInView, text, speed, startDelay, hasAnimated])

  return { displayText, isComplete, ref }
}

// Tech logo card component
const TechLogo = memo(function TechLogo({ name, category, index, isInView }: { name: string; category: string; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl sm:shadow-2xl transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] cursor-pointer"
      >
        <TechIcon name={name} />
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-cyan-500/5 transition-all duration-300" />
      </motion.div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-black/90 border border-cyan-500/30 backdrop-blur-md shadow-xl whitespace-nowrap">
          <p className="text-white font-medium text-xs sm:text-sm">{name}</p>
          <p className="text-cyan-400 text-[10px] sm:text-xs">{category}</p>
        </div>
      </div>
    </motion.div>
  )
})

export function TechStack() {
  const { displayText: mainText, isComplete: mainComplete, ref: mainRef } = useTypewriter("modern tech, peak performance.", 60, 0)
  const { displayText: ctaText, isComplete: ctaComplete, ref: ctaRef } = useTypewriter("See our work built to:", 50, 1500)

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.3 })

const subtitleLines = [
  "Blazing performance, boundless scale.",
  "Crafted with surgical precision."
]


  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* LEFT COLUMN */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div ref={mainRef}>
              <motion.h2
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight"
              >
                <span className="relative">
                  {mainText}
                  {!mainComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="absolute -right-1 top-0 w-1 h-full bg-cyan-400"
                    />
                  )}
                </span>
                {mainComplete && (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block ml-2 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  >
                    .
                  </motion.span>
                )}
              </motion.h2>
            </div>

            <div className="space-y-2">
              {subtitleLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  animate={mainComplete && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-muted-foreground font-light"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div ref={ctaRef} className="pt-4">
              <motion.div
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative inline-block"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white">
                  <span className="relative">
                    {ctaText}
                    {!ctaComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute -right-1 top-0 w-0.5 h-full bg-cyan-400"
                      />
                    )}
                  </span>
                </h3>
                {ctaComplete && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 origin-left"
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN - Tech Logos */}
          <div className="relative">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              {techRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-3 sm:gap-4 md:gap-6">
                  {row.map((tech, techIndex) => (
                    <TechLogo
                      key={tech.name}
                      name={tech.name}
                      category={tech.category}
                      index={rowIndex * 4 + techIndex}
                      isInView={isInView}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
