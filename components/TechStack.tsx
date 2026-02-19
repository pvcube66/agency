"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, memo, ReactNode, useState, useEffect } from "react"

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

// Static star data - defined outside component to prevent recreating on every render
const stars = [
  { id: 1, x: 10, y: 15, size: 2, delay: 0, duration: 3 },
  { id: 2, x: 25, y: 35, size: 1.5, delay: 0.5, duration: 2.5 },
  { id: 3, x: 40, y: 10, size: 2.5, delay: 1, duration: 3.5 },
  { id: 4, x: 55, y: 45, size: 1.5, delay: 1.5, duration: 2.8 },
  { id: 5, x: 70, y: 20, size: 2, delay: 0.3, duration: 3.2 },
  { id: 6, x: 85, y: 55, size: 1.5, delay: 0.8, duration: 2.6 },
  { id: 7, x: 15, y: 65, size: 2, delay: 1.2, duration: 3.1 },
  { id: 8, x: 35, y: 80, size: 1.5, delay: 0.2, duration: 2.9 },
  { id: 9, x: 60, y: 70, size: 2.5, delay: 1.7, duration: 3.3 },
  { id: 10, x: 80, y: 85, size: 1.5, delay: 0.6, duration: 2.7 },
  { id: 11, x: 45, y: 25, size: 2, delay: 1.1, duration: 3 },
  { id: 12, x: 20, y: 50, size: 1.5, delay: 0.4, duration: 2.8 },
  { id: 13, x: 75, y: 40, size: 2, delay: 1.4, duration: 3.2 },
  { id: 14, x: 50, y: 60, size: 1.5, delay: 0.9, duration: 2.5 },
  { id: 15, x: 90, y: 30, size: 2.5, delay: 1.3, duration: 3.4 },
  { id: 16, x: 5, y: 75, size: 1.5, delay: 0.7, duration: 2.6 },
  { id: 17, x: 65, y: 5, size: 2, delay: 1.8, duration: 3 },
  { id: 18, x: 30, y: 90, size: 1.5, delay: 0.1, duration: 2.9 },
  { id: 19, x: 95, y: 70, size: 2, delay: 1.6, duration: 3.1 },
  { id: 20, x: 12, y: 30, size: 1.5, delay: 0.95, duration: 2.7 },
]

// Optimized Starfield with CSS animations - 20 stars using GPU-accelerated CSS
function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Tech logo card component with Framer Motion
const TechLogo = memo(function TechLogo({ name, category, index }: { 
  name: string; 
  category: string; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.15,
        rotate: 8,
        transition: { duration: 0.2 }
      }}
      className="group relative cursor-pointer will-change-transform"
    >
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl sm:shadow-2xl"
        whileHover={{
          borderColor: "rgba(34, 211, 238, 0.5)",
          boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <TechIcon name={name} />
        <motion.div 
          className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0"
          whileHover={{
            background: "linear-gradient(to bottom right, rgba(34, 211, 238, 0.2), rgba(34, 211, 238, 0.05))",
          }}
        />
      </motion.div>
      
      {/* Tooltip */}
      <motion.div 
        className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-50"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-black/90 border border-cyan-500/30 backdrop-blur-md shadow-xl whitespace-nowrap">
          <p className="text-white font-medium text-xs sm:text-sm">{name}</p>
          <p className="text-cyan-400 text-[10px] sm:text-xs">{category}</p>
        </div>
      </motion.div>
    </motion.div>
  )
})

// Typewriter effect with Framer Motion
function TypewriterText({ text, speed = 50, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (prefersReducedMotion && isInView) {
        setDisplayText(text)
        setIsComplete(true)
      }
      return
    }

    let interval: NodeJS.Timeout | null = null
    const startTimeout = setTimeout(() => {
      let index = 0
      interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          setIsComplete(true)
          if (interval) clearInterval(interval)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (interval) clearInterval(interval)
    }
  }, [isInView, text, speed, delay, prefersReducedMotion])

  return (
    <span ref={ref} className="relative">
      {displayText}
      {!isComplete && !prefersReducedMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute -right-1 top-0 w-1 h-full bg-cyan-400"
        />
      )}
    </span>
  )
}

export function TechStack() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const subtitleLines = [
    "Blazing performance, boundless scale.",
    "Crafted with surgical precision."
  ]

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* LEFT COLUMN */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight">
                <TypewriterText text="modern tech, peak performance." speed={60} delay={0} />
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block ml-2 text-cyan-400"
                >
                  .
                </motion.span>
              </h2>
            </motion.div>

            <div className="space-y-2">
              {subtitleLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-muted-foreground font-light"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="relative inline-block">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white">
                  <TypewriterText text="See our work built to:" speed={50} delay={1500} />
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 2.5, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 origin-left"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Tech Logos */}
          <div className="relative">
            {/* Starfield Background */}
            <Starfield />
            
            <div className="relative z-10 space-y-4 sm:space-y-6">
              {techRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-3 sm:gap-4 md:gap-6">
                  {row.map((tech, techIndex) => (
                    <TechLogo
                      key={tech.name}
                      name={tech.name}
                      category={tech.category}
                      index={rowIndex * 4 + techIndex}
                    />
                  ))}
                </div>
              ))}
            </div>

            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
