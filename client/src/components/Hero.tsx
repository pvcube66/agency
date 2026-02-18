import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-display font-medium text-white leading-[0.85] tracking-tight mb-8"
          >
            Crafted <span className="text-white/30 italic font-light font-serif tracking-tighter">Websites</span> <br />
            Lasting Impressions
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-md font-light leading-relaxed">
              We are a digital agency specializing in high-end design and development for brands that refuse to blend in.
            </p>

            <Link href="/#work">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all hover:pr-10 relative overflow-hidden">
                <span className="relative z-10">See Our Works</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        <span className="text-xs tracking-[0.2em] uppercase text-white/40 -rotate-90 origin-bottom">Scroll</span>
      </motion.div>
    </section>
  );
}
