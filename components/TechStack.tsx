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
      {/* Static background only */}
      <div className="absolute top-1/4 -left-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* LEFT COLUMN */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div 
              className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
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

            <div 
              className={`pt-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="relative inline-block">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white">
                  Built different for:
                </h3>
                <div 
                  className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 origin-left transition-transform duration-600 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                  style={{ transitionDelay: '1200ms' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Tech Logos */}
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
                        
                        {/* Tooltip */}
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

            {/* Static glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple icon component - no memo, no complex SVGs
function TechIcon({ name }: { name: string }) {
  // Use simple colored divs with first 2 letters instead of complex SVGs for performance
  const colors: Record<string, string> = {
    "Next.js": "bg-white text-black",
    "React": "bg-[#61DAFB] text-black",
    "TypeScript": "bg-[#3178C6] text-white",
    "Tailwind": "bg-[#38BDF8] text-black",
    "Node.js": "bg-[#339933] text-white",
    "Python": "bg-[#3776AB] text-white",
    "Rust": "bg-[#CE422B] text-white",
    "PostgreSQL": "bg-[#336791] text-white",
    "AWS": "bg-[#FF9900] text-black",
    "Docker": "bg-[#2496ED] text-white",
    "Kubernetes": "bg-[#326CE5] text-white",
    "Redis": "bg-[#DC382D] text-white",
  }

  const colorClass = colors[name] || "bg-white/20 text-white"

  return (
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${colorClass} flex items-center justify-center text-xs sm:text-sm font-bold`}>
      {name.slice(0, 2)}
    </div>
  )
}
