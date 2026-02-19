"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { TechStack } from "@/components/TechStack"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { highlightedProjects } from "@/data"
import { ServiceCard } from "@/components/ServiceCard"
import { services, faqs } from "@/data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Static data - defined outside component to prevent recreating on every render
const approachSteps = [
  { title: "Vision & Vibes", desc: "We dive deep into your brand DNA to understand what makes you tick." },
  { title: "Mobile-First Magic", desc: "Every pixel perfected for screens of all sizes. Smooth everywhere." },
  { title: "Code That Slaps", desc: "Clean, blazing-fast code that brings your wildest ideas to reality." },
]

// Optimized section wrapper with Framer Motion
function AnimatedSection({ 
  children, 
  className = "",
  id,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section 
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20 scroll-smooth">
      <Navigation />
      
      <main>
        <Hero />

        {/* WORK SECTION */}
        <AnimatedSection id="work" className="py-16 sm:py-24 md:py-32 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-0">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Best <br className="hidden sm:block" /> Drops
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-sm text-sm sm:text-base"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Projects so fire, they&apos;ll make your competition sweat. Pure digital excellence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {highlightedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} highlighted={true} />
            ))}
          </div>

          <motion.div 
            className="mt-12 sm:mt-16 md:mt-20 text-center"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/work">
              <motion.button 
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg hover:bg-gray-100 rounded-full"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>See Everything</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* TECH STACK SECTION */}
        <TechStack />

        {/* SERVICES SECTION */}
        <AnimatedSection id="services" className="py-16 sm:py-24 md:py-32 bg-white/[0.02] border-y border-white/5" delay={0.1}>
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="max-w-3xl mb-10 sm:mb-16"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3 sm:mb-4 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                What We Do
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                We craft digital experiences <br className="hidden md:block" /> that turn heads & drive results.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ABOUT SECTION */}
        <AnimatedSection id="about" className="py-16 sm:py-24 md:py-32 container mx-auto px-4 sm:px-6" delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <motion.div 
                  className="bg-[#111] aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-white/5"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                >
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-display mb-1 sm:mb-2">16+</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40">Projects Done</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-white aspect-[4/5] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-black/40 text-[10px] sm:text-xs uppercase tracking-widest">Digital Experience</div>
                  <div className="text-black text-lg sm:text-xl md:text-2xl font-display leading-tight">Expert Web Developer</div>
                </motion.div>
              </div>
              <div className="pt-6 sm:pt-12 space-y-3 sm:space-y-4">
                <motion.div 
                  className="bg-[#1a1a1a] aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden relative group"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
                    alt="Work"
                    fill
                    sizes="(max-width: 768px) 45vw, 300px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
                <motion.div 
                  className="bg-[#0a0a0a] aspect-square rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Right - Content */}
            <motion.div 
              className="order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3 sm:mb-4 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                How We Roll
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-6 sm:mb-8 leading-tight">
                Design that hits, <br className="hidden sm:block" /> Brands that stick.
              </h2>
              <p className="text-muted-foreground mb-8 sm:mb-12 max-w-md font-light text-sm sm:text-base mx-auto lg:mx-0">
                We don&apos;t just code websites—we architect digital experiences that stop the scroll and start conversations.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {approachSteps.map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex gap-4 sm:gap-6 items-start"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: prefersReducedMotion ? 0 : 5 }}
                  >
                    <motion.div 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] sm:text-xs text-white/40 shrink-0"
                      whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, borderColor: "rgba(255,255,255,0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      0{idx + 1}
                    </motion.div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{step.title}</h3>
                      <p className="text-muted-foreground font-light text-xs sm:text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <AnimatedSection className="py-12 sm:py-16 md:py-20 container mx-auto px-4 sm:px-6 max-w-4xl" delay={0.1}>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-display mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            The Tea ☕
          </motion.h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <AccordionItem 
                  value={`item-${faq.id}`} 
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="text-base sm:text-lg hover:text-white/80 hover:no-underline py-4 sm:py-6 text-left transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light pb-4 sm:pb-6 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  )
}
