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

        {/* WORK SECTION - FEATURED PROJECTS */}
        <section id="work" className="py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display"
            >
              Featured <br /> Works
            </motion.h2>
            <p className="text-muted-foreground mt-6 md:mt-0 max-w-sm">
              A collection of our best projects that showcase our expertise and attention to detail.
            </p>
          </div>

          {/* Highlighted Projects - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightedProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} highlighted={true} />
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Link href="/work">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all">
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* TECH STACK SECTION */}
        <TechStack />

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-display leading-tight">
                We build digital products that <br /> solve real business problems.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / PROCESS SECTION */}
        <section id="about" className="py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#111] aspect-square rounded-2xl flex items-center justify-center p-8 border border-white/5">
                  <div className="text-center">
                    <div className="text-4xl font-display mb-2">16+</div>
                    <div className="text-xs uppercase tracking-widest text-white/40">Projects Done</div>
                  </div>
                </div>
                <div className="bg-white aspect-[4/5] rounded-2xl p-6 flex flex-col justify-between">
                  <div className="text-black/40 text-xs uppercase tracking-widest">Digital Experience</div>
                  <div className="text-black text-2xl font-display leading-tight">Expert Web Developer</div>
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="bg-[#1a1a1a] aspect-[3/4] rounded-2xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80" 
                    alt="Work" 
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="bg-[#0a0a0a] aspect-square rounded-2xl border border-white/5 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                     <div className="w-2 h-2 bg-white rounded-full" />
                   </div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">Our Approach</span>
              <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">
                Design that speaks, <br /> Defining that connects.
              </h2>
              <p className="text-muted-foreground mb-12 max-w-md font-light">
                We don&apos;t just build websites; we create digital identities that resonate with your audience and drive measurable results.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Discovery First", desc: "Understanding your vision, goals, and market positioning." },
                  { title: "Mobile-First Design", desc: "Ensuring a seamless experience across all modern devices." },
                  { title: "Pixel-Perfect Development", desc: "Clean, performant code that brings designs to life." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-white/40 shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-muted-foreground font-light text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 container mx-auto px-6 max-w-4xl">
           <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Frequently Asked Questions</h2>
           <Accordion type="single" collapsible className="w-full">
             {faqs.map((faq) => (
               <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-white/10">
                 <AccordionTrigger className="text-lg hover:text-white/80 hover:no-underline py-6">
                   {faq.question}
                 </AccordionTrigger>
                 <AccordionContent className="text-muted-foreground font-light pb-6">
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
