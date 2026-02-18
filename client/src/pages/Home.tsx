import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { useProjects, useServices, useFaqs } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import devMamaImg from "@assets/devmama_1771427351488.png";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: faqs, isLoading: faqsLoading } = useFaqs();

  // Fallback data if API returns empty (for visual demo purposes if DB is empty)
  const demoProjects = projects?.length ? projects : [
    { id: 1, title: "Luxury Estate", description: "Real estate platform for premium properties", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", tags: ["Web Design", "Development"], link: "#", isFeatured: true },
    { id: 2, title: "Neon Finance", description: "Fintech dashboard with real-time analytics", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", tags: ["UI/UX", "Dashboard"], link: "#", isFeatured: true },
    { id: 3, title: "Art Gallery", description: "Digital exhibition space for modern art", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", tags: ["Creative", "Animation"], link: "#", isFeatured: true },
    { id: 4, title: "Tech Corp", description: "Corporate identity and website refresh", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", tags: ["Branding", "Strategy"], link: "#", isFeatured: true },
  ];

  const demoServices = services?.length ? services : [
    { id: 1, title: "Web Design", description: "Visually stunning layouts that captivate your audience.", icon: "Layout" },
    { id: 2, title: "Development", description: "Robust, scalable code using modern frameworks.", icon: "Code" },
    { id: 3, title: "Brand Identity", description: "Defining your visual language and voice.", icon: "Palette" },
    { id: 4, title: "SEO Strategy", description: "Helping you get found by the right people.", icon: "Search" },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20 scroll-smooth">
      <Navigation />
      
      <main>
        <Hero />

        {/* WORK SECTION */}
        <section id="work" className="py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display"
            >
              Selected <br /> Works
            </motion.h2>
            <p className="text-muted-foreground mt-6 md:mt-0 max-w-sm">
              A collection of projects that define our standard of excellence and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {demoProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project as any} index={idx} />
            ))}
          </div>
        </section>

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
              {demoServices.map((service, idx) => (
                <ServiceCard key={service.id} service={service as any} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / PROCESS SECTION */}
        <section id="about" className="py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-transparent opacity-50 blur-2xl" />
                <img 
                  src={devMamaImg} 
                  alt="Creative Process" 
                  className="w-full relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            <div>
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">Our Approach</span>
              <h2 className="text-4xl md:text-5xl font-display mb-8">
                Designed for Impact
              </h2>
              <div className="space-y-8">
                {[
                  { title: "01. Discovery", desc: "We dive deep into your business goals and audience needs." },
                  { title: "02. Strategy", desc: "Planning the user journey and technical architecture." },
                  { title: "03. Design", desc: "Crafting beautiful, functional interfaces." },
                  { title: "04. Development", desc: "Bringing designs to life with clean, performant code." },
                ].map((step, idx) => (
                  <div key={idx} className="border-l border-white/10 pl-6 py-2 group cursor-pointer hover:border-white transition-colors">
                    <h3 className="text-xl font-bold mb-2 text-white/80 group-hover:text-white">{step.title}</h3>
                    <p className="text-muted-foreground font-light text-sm">{step.desc}</p>
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
             {(faqs?.length ? faqs : [
               { id: 1, question: "How long does a typical project take?", answer: "Timeline varies by complexity, but typical websites take 4-8 weeks from start to launch." },
               { id: 2, question: "Do you offer post-launch support?", answer: "Yes, we offer maintenance packages to ensure your site remains secure and up-to-date." },
               { id: 3, question: "What is your pricing structure?", answer: "We work on a project basis. Contact us for a custom quote tailored to your specific needs." },
             ]).map((faq) => (
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
  );
}
