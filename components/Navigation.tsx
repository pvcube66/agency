"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

// Memoized nav links to prevent re-renders
const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/contact" },
]

// Memoized mobile menu component
const MobileMenu = memo(function MobileMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-white/10 p-4 sm:p-6 md:hidden min-h-[50vh] animate-fade-in-up">
      <nav className="flex flex-col space-y-1">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-white/70 hover:text-white py-3 border-b border-white/5 last:border-0 transition-colors duration-200"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}
        <Link href="/contact" onClick={onClose}>
          <button className="w-full mt-4 px-6 py-3 bg-white text-black text-base font-bold hover:bg-white/90 transition-colors duration-200 rounded-full">
            Let&apos;s Talk
          </button>
        </Link>
      </nav>
    </div>
  )
})

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Optimized scroll handler with RAF
  useEffect(() => {
    let rafId: number
    let lastScrollY = 0

    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        // Only update state if change is significant
        if (Math.abs(scrollY - lastScrollY) > 5) {
          setIsScrolled(scrollY > 50)
          lastScrollY = scrollY
        }
        rafId = 0
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-layer ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-3 sm:py-4" : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tighter cursor-pointer">
            Dev Mama
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link href="/contact">
            <button className="px-5 lg:px-6 py-2 bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200 rounded-full">
              Let&apos;s Talk
            </button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileOpen} onClose={closeMobileMenu} />
    </header>
  )
}
