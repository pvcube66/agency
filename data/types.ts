export interface Project {
  id: number;
  name: string;
  image: string;
  url: string;
  alt: string;
  highlighted?: boolean;
  description?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
