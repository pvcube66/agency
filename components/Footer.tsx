import { memo } from "react"
import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 sm:mb-16 gap-8 lg:gap-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display text-white mb-6 sm:mb-8 leading-tight">
              Create Bold. <br />
              Deliver Better.
            </h2>
            <Link href="/contact">
              <button className="text-lg sm:text-xl md:text-2xl text-white border-b border-white pb-2 hover:opacity-70 transition-opacity">
                Start a Project
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-24 w-full lg:w-auto">
            <div>
              <h4 className="text-white/40 uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">Socials</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <a 
                    href="https://www.instagram.com/devmama.tech?igsh=MXBnem54OTB6aDE3ZQ==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-white/70 transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Instagram size={16}/> Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/pvcube66" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-white/70 transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Twitter size={16}/> Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/pvcube66/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-white/70 transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Linkedin size={16}/> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">Menu</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li><Link href="/#work" className="text-white hover:text-white/70 transition-colors text-sm sm:text-base">Work</Link></li>
                <li><Link href="/#services" className="text-white hover:text-white/70 transition-colors text-sm sm:text-base">Services</Link></li>
                <li><Link href="/#about" className="text-white hover:text-white/70 transition-colors text-sm sm:text-base">About</Link></li>
                <li><Link href="/contact" className="text-white hover:text-white/70 transition-colors text-sm sm:text-base">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/10 text-white/40 text-xs sm:text-sm gap-4 sm:gap-0">
          <p className="text-center sm:text-left">&copy; 2026 Dev Mama. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
})
