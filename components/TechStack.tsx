"use client"

import { useRef, useState, useEffect } from "react"

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

const subtitleLines = [
  "Speed that breaks the internet.",
  "Precision so clean, it's almost illegal."
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#050505]">
      <div className="absolute top-1/4 -left-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight">
                <span className="relative">
                  Next-level tech. Zero compromises.
                  <span className="inline-block ml-2 text-cyan-400">.</span>
                </span>
              </h2>
            </div>

            <div className="space-y-2">
              {subtitleLines.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-base sm:text-lg md:text-xl text-muted-foreground font-light transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${500 + idx * 100}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className={`pt-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              <div className="relative inline-block">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white">
                  Built different for:
                </h3>
                <div className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 origin-left transition-transform duration-600 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '1200ms' }} />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 space-y-4 sm:space-y-6">
              {techRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-3 sm:gap-4 md:gap-6">
                  {row.map((tech, techIndex) => {
                    const delay = (rowIndex * 4 + techIndex) * 80
                    return (
                      <div
                        key={tech.name}
                        className={`group relative cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-90'}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:border-cyan-400/50 group-hover:scale-110">
                          <TechIcon name={tech.name} />
                        </div>
                        
                        <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-50">
                          <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-black/90 border border-cyan-500/30 shadow-xl whitespace-nowrap">
                            <p className="text-white font-medium text-xs sm:text-sm">{tech.name}</p>
                            <p className="text-cyan-400 text-[10px] sm:text-xs">{tech.category}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
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

function TechIcon({ name }: { name: string }) {
  switch (name) {
    case "Next.js":
      return (
        <svg viewBox="0 0 180 180" className="w-8 h-8 md:w-10 md:h-10">
          <circle cx="90" cy="90" r="85" fill="black"/>
          <path d="M140 140L70 60H60v50h10V70l65 80z" fill="white"/>
          <rect x="110" y="60" width="10" height="50" fill="white"/>
        </svg>
      )
    case "React":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2"/>
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 50 50)"/>
        </svg>
      )
    case "TypeScript":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <rect width="100" height="100" rx="15" fill="#3178C6"/>
          <text x="20" y="70" fill="white" fontSize="45" fontWeight="bold">TS</text>
        </svg>
      )
    case "Tailwind":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M50 25c-15 0-20 10-20 15 0 10 10 15 20 15 20 0 20-10 20-15 0-10-10-15-20-15z" fill="#38BDF8"/>
          <path d="M50 55c-15 0-20 10-20 15 0 10 10 15 20 15 20 0 20-10 20-15 0-10-10-15-20-15z" fill="#38BDF8" opacity="0.7"/>
        </svg>
      )
    case "Node.js":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M50 10l35 20v40L50 90 15 70V30z" fill="#339933"/>
          <path d="M50 25v50M30 40v25l20 10 20-10V40" stroke="white" strokeWidth="4" fill="none"/>
        </svg>
      )
    case "Python":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M50 15c-20 0-20 10-20 15v10h20v5H25c-10 0-15 5-15 15v10c0 10 5 15 15 15h10V75c0-10 5-15 15-15h20c10 0 15-5 15-15V30c0-10-5-15-15-15H50z" fill="#3776AB"/>
          <path d="M50 85c20 0 20-10 20-15V60H50v-5h25c10 0 15-5 15-15V30c0-10-5-15-15-15H65v10c0 10-5 15-15 15H30c-10 0-15 5-15 15v15c0 10 5 15 15 15h20z" fill="#FFD43B"/>
          <circle cx="38" cy="28" r="5" fill="white"/>
          <circle cx="62" cy="72" r="5" fill="white"/>
        </svg>
      )
    case "Rust":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <circle cx="50" cy="50" r="45" fill="#CE422B"/>
          <text x="50" y="62" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">R</text>
        </svg>
      )
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M50 10c-20 0-35 15-35 35 0 25 15 45 35 45s35-20 35-45c0-20-15-35-35-35z" fill="#336791"/>
          <path d="M35 35h30M35 50h30M35 65h20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      )
    case "AWS":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <path d="M30 55l20-15 20 15" stroke="#FF9900" strokeWidth="6" fill="none"/>
          <path d="M25 50c0-15 10-25 25-25s25 10 25 25" stroke="#FF9900" strokeWidth="6" fill="none"/>
          <text x="50" y="75" textAnchor="middle" fill="#FF9900" fontSize="14" fontWeight="bold">AWS</text>
        </svg>
      )
    case "Docker":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <rect x="20" y="50" width="12" height="12" fill="#2496ED"/>
          <rect x="35" y="50" width="12" height="12" fill="#2496ED"/>
          <rect x="50" y="50" width="12" height="12" fill="#2496ED"/>
          <rect x="35" y="35" width="12" height="12" fill="#2496ED"/>
          <rect x="50" y="35" width="12" height="12" fill="#2496ED"/>
          <rect x="65" y="35" width="12" height="12" fill="#2496ED"/>
          <path d="M20 68h60v4c0 8-5 13-13 13H33c-8 0-13-5-13-13v-4z" fill="#2496ED"/>
        </svg>
      )
    case "Kubernetes":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <circle cx="50" cy="50" r="40" fill="#326CE5"/>
          <path d="M50 20l5 20 20-5-15 15 15 15-20-5-5 20-5-20-20 5 15-15-15-15 20 5z" fill="white"/>
        </svg>
      )
    case "Redis":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10">
          <ellipse cx="50" cy="30" rx="35" ry="15" fill="#DC382D"/>
          <ellipse cx="50" cy="45" rx="35" ry="15" fill="#A32422"/>
          <ellipse cx="50" cy="60" rx="35" ry="15" fill="#DC382D"/>
          <ellipse cx="50" cy="75" rx="35" ry="15" fill="#A32422"/>
        </svg>
      )
    default:
      return (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <span className="text-white font-bold text-xs md:text-sm">{name.slice(0, 2)}</span>
        </div>
      )
  }
}
