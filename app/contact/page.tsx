"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navigation />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-display mb-6">Let&apos;s Talk</h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white/[0.02] border border-white/10 p-8 md:p-12"
          >
            <div className="mb-8 pb-8 border-b border-white/10 flex items-center gap-6">
              <a 
                href="tel:+918309382895" 
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-lg"
              >
                <Phone size={20} />
                <span>+91 8309382895</span>
              </a>
              <a 
                href="https://wa.me/918309382895" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-lg"
              >
                <FaWhatsapp size={24} />
                <span className="text-sm">Chat on WhatsApp</span>
              </a>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/60">Name</Label>
                  <Input 
                    id="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent border-white/10 focus:border-white h-12 text-lg" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-white/10 focus:border-white h-12 text-lg" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/60">Message</Label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your project..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-white/10 focus:border-white min-h-[200px] text-lg resize-none" 
                  required
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
