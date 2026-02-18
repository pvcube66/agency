"use client"

import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { TechStack } from "@/components/TechStack"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { highlightedProjects } from "@/data"
import { ServiceCard } from "@/components/ServiceCard"
import { services, faqs } from "@/data"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20 scroll-smooth">
      <Navigation />
      
      <main>
        <Hero />

        {/* WORK SECTION */}
        <section id="work" className="py-16 sm:py-24 md:py-32 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-0">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display"
            >
              Featured <br className="hidden sm:block" /> Works
            </motion.h2>
            <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
              A collection of our best projects that showcase our expertise and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {highlightedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} highlighted={true} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 text-center"
          >
            <Link href="/work">
              <button className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg hover:bg-gray-100 transition-all rounded-full">
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* TECH STACK SECTION */}
        <TechStack />

        {/* SERVICES SECTION */}
        <section id="services" className="py-16 sm:py-24 md:py-32 bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-10 sm:mb-16"
            >
              <span className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3 sm:mb-4 block">Our Expertise</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                We build digital products that <br className="hidden md:block" /> solve real business problems.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-16 sm:py-24 md:py-32 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-[#111] aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-white/5">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-display mb-1 sm:mb-2">16+</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40">Projects Done</div>
                  </div>
                </div>
                <div className="bg-white aspect-[4/5] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                  <div className="text-black/40 text-[10px] sm:text-xs uppercase tracking-widest">Digital Experience</div>
                  <div className="text-black text-lg sm:text-xl md:text-2xl font-display leading-tight">Expert Web Developer</div>
                </div>
              </div>
              <div className="pt-6 sm:pt-12 space-y-3 sm:space-y-4">
                <div className="bg-[#1a1a1a] aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden relative group">
                  <Image
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                    alt="Coding"
                    fill
                    sizes="(max-width: 768px) 45vw, 300px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="bg-[#0a0a0a] aspect-square rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3 sm:mb-4 block">Our Approach</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-6 sm:mb-8 leading-tight">
                Design that speaks, <br className="hidden sm:block" /> Defining that connects.
              </h2>
              <p className="text-muted-foreground mb-8 sm:mb-12 max-w-md font-light text-sm sm:text-base mx-auto lg:mx-0">
                We don&apos;t just build websites; we create digital identities that resonate with your audience and drive measurable results.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { title: "Discovery First", desc: "Understanding your vision, goals, and market positioning." },
                  { title: "Mobile-First Design", desc: "Ensuring a seamless experience across all modern devices." },
                  { title: "Pixel-Perfect Development", desc: "Clean, performant code that brings designs to life." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-6 items-start">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] sm:text-xs text-white/40 shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{step.title}</h3>
                      <p className="text-muted-foreground font-light text-xs sm:text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display mb-8 sm:mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-white/10">
                <AccordionTrigger className="text-base sm:text-lg hover:text-white/80 hover:no-underline py-4 sm:py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light pb-4 sm:pb-6 text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </main>

      <Footer />
    </div>
  )
}
