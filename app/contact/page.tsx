"use client"

import { useState, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Loader2, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const isFormInView = useInView(formRef, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("We'll contact you soon", {
          description: "Thank you for reaching out!",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast.error("Failed to send message", {
          description: data.error || "Please try again later.",
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navigation />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={headerRef}
            className="mb-16 text-center"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-display mb-6"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s Talk
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <motion.div
            ref={formRef}
            className="bg-white/[0.02] border border-white/10 p-8 md:p-12"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="mb-8 pb-8 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
            >
              <motion.a 
                href="tel:+918309382895" 
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Phone size={20} />
                <span>+91 8309382895</span>
              </motion.a>
              <motion.a 
                href="https://wa.me/918309382895" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-200 text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <FaWhatsapp size={24} />
                <span className="text-sm">Chat on WhatsApp</span>
              </motion.a>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-white/60">Name</Label>
                  <Input 
                    id="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent border-white/10 focus:border-white h-12 text-lg transition-all duration-200" 
                    required
                  />
                </motion.div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-white/10 focus:border-white h-12 text-lg transition-all duration-200" 
                    required
                  />
                </div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <Label htmlFor="message" className="text-white/60">Message</Label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your project..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-white/10 focus:border-white min-h-[200px] text-lg resize-none transition-all duration-200" 
                  required
                />
              </motion.div>

              <motion.div 
                className="flex justify-end"
                variants={itemVariants}
              >
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  whileHover={{ scale: prefersReducedMotion || isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: prefersReducedMotion || isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
