import Link from "next/link"
import { Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="max-w-2xl mb-12 md:mb-0">
            <h2 className="text-5xl md:text-7xl font-display text-white mb-8 leading-tight">
              Create Bold. <br />
              Deliver Better.
            </h2>
            <Link href="/contact">
              <button className="text-xl md:text-2xl text-white border-b border-white pb-2 hover:opacity-70 transition-opacity">
                Start a Project
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h4 className="text-white/40 uppercase tracking-widest text-sm mb-6">Socials</h4>
              <ul className="space-y-4">
                <li><a href="https://www.instagram.com/devmama.tech?igsh=MXBnem54OTB6aDE3ZQ==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors flex items-center gap-2"><Instagram size={16}/> Instagram</a></li>
                <li><a href="https://x.com/pvcube66" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors flex items-center gap-2"><Twitter size={16}/> Twitter</a></li>
                <li><a href="https://www.linkedin.com/in/pvcube66/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 uppercase tracking-widest text-sm mb-6">Menu</h4>
              <ul className="space-y-4">
                <li><Link href="/#work" className="text-white hover:text-white/70 transition-colors">Work</Link></li>
                <li><Link href="/#services" className="text-white hover:text-white/70 transition-colors">Services</Link></li>
                <li><Link href="/#about" className="text-white hover:text-white/70 transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-white hover:text-white/70 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
            <p>&copy; 2026 Dev Mama. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
