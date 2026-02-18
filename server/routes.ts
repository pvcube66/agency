import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { projects, services, testimonials, faqs } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Services
  app.get(api.services.list.path, async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Testimonials
  app.get(api.testimonials.list.path, async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // FAQs
  app.get(api.faqs.list.path, async (_req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "E-Commerce Revolution",
        description: "A complete overhaul of a fashion retailer's online presence, resulting in a 40% increase in conversions.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        tags: ["E-Commerce", "UI/UX", "Next.js"],
        isFeatured: true
      },
      {
        title: "Fintech Dashboard",
        description: "Real-time financial data visualization platform for a leading investment firm.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
        tags: ["Dashboard", "React", "D3.js"],
        isFeatured: true
      },
      {
        title: "Travel Agency Portal",
        description: "Immersive booking experience connecting travelers with unique destinations.",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2321",
        tags: ["Travel", "Web App", "Booking System"],
        isFeatured: true
      }
    ]);

    await db.insert(services).values([
      {
        title: "UI/UX Design",
        description: "Crafting intuitive and engaging user interfaces that delight users and drive engagement.",
        icon: "Palette"
      },
      {
        title: "Web Development",
        description: "Building robust, scalable, and high-performance websites using the latest technologies.",
        icon: "Code"
      },
      {
        title: "Brand Strategy",
        description: "Defining your brand's voice and visual identity to stand out in a crowded market.",
        icon: "Target"
      },
      {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile application development for iOS and Android.",
        icon: "Smartphone"
      }
    ]);

    await db.insert(testimonials).values([
      {
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        content: "Working with this team was a game-changer. They understood our vision perfectly and delivered beyond expectations.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256"
      },
      {
        name: "Michael Chen",
        role: "Founder, DesignCo",
        content: "The attention to detail and creative approach sets them apart. Truly pixel-perfect implementation.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256"
      }
    ]);

    await db.insert(faqs).values([
      {
        question: "What is your typical project timeline?",
        answer: "Timelines vary based on project scope, but a typical website takes 4-8 weeks from discovery to launch.",
        order: 1
      },
      {
        question: "Do you offer post-launch support?",
        answer: "Yes, we offer various maintenance packages to ensure your digital product remains secure and up-to-date.",
        order: 2
      },
      {
        question: "What technologies do you use?",
        answer: "We specialize in modern stacks including React, Next.js, Node.js, and cloud infrastructure.",
        order: 3
      }
    ]);
  }
}
