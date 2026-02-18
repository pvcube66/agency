import { db } from "./db";
import {
  projects, services, testimonials, faqs, messages,
  type InsertMessage, type Message,
  type Project, type Service, type Testimonial, type Faq
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getServices(): Promise<Service[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getFaqs(): Promise<Faq[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs).orderBy(faqs.order);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
