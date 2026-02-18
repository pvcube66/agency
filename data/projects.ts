import { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    name: "Netflix Clone",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&q=80",
    url: "https://netflix-lyart-sigma.vercel.app",
    alt: "Netflix Clone Streaming Platform"
  },
  {
    id: 2,
    name: "Travel Agency",
    image: "https://i.pinimg.com/1200x/77/e5/c5/77e5c5b3543c4312a06d8279aa0add6a.jpg",
    url: "https://travel-six-blush.vercel.app",
    alt: "Travel Agency Website",
    highlighted: true,
    description: "Full-stack travel booking platform with modern UI"
  },
  {
    id: 3,
    name: "PG Management",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop&q=80",
    url: "https://pgs-management.vercel.app/",
    alt: "PG Management Software"
  },
  {
    id: 4,
    name: "Vanasya",
    image: "https://i.pinimg.com/1200x/23/d0/fb/23d0fb3eff8162e7c3ecb9a12a5722e2.jpg",
    url: "https://vanasya.vercel.app",
    alt: "Vanasya Oil Company",
    highlighted: true,
    description: "Premium oil brand e-commerce website"
  },
  {
    id: 5,
    name: "PyarAI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80",
    url: "https://pyarai.vercel.app/",
    alt: "PyarAI Platform"
  },
  {
    id: 6,
    name: "HireSense AI",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80",
    url: "https://hire-sense-ai-dusky.vercel.app",
    alt: "HireSense AI ATS System"
  },
  {
    id: 7,
    name: "Spam Detector",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&q=80",
    url: "https://spam-beta.vercel.app",
    alt: "Spam Detector Tool",
    highlighted: true,
    description: "AI-powered spam detection system"
  },
  {
    id: 8,
    name: "Blogify",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop&q=80",
    url: "https://blogify-io-eight.vercel.app",
    alt: "Blogify Blogging Platform"
  },
  {
    id: 9,
    name: "WhatsApp Wrapped",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop&q=80",
    url: "https://whatsapp-wrapped-five.vercel.app",
    alt: "WhatsApp Wrapped Analytics"
  },
  {
    id: 10,
    name: "Ritualo",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop&q=80",
    url: "https://ritualo-one.vercel.app/",
    alt: "Ritualo Habit Tracking App"
  },
  {
    id: 11,
    name: "Slay My CV",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
    url: "https://slay-my-cv.vercel.app/",
    alt: "Resume Builder Tool"
  },
  {
    id: 12,
    name: "Jira Wizard",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop&q=80",
    url: "https://jira-ticket-io.vercel.app/",
    alt: "Jira Ticket Generator"
  },
  {
    id: 13,
    name: "Twimagine",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop&q=80",
    url: "https://twimagine.vercel.app/",
    alt: "Tweet Generator Tool"
  },
  {
    id: 14,
    name: "YUBO",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80",
    url: "https://pvcube66.github.io/YUBO/",
    alt: "YUBO App"
  },
  {
    id: 15,
    name: "Developer Portfolio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    url: "https://sambasivarao-mamidi.vercel.app/",
    alt: "Developer Portfolio"
  },
  {
    id: 16,
    name: "Wit.AI",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80",
    url: "https://wit-ai-ten.vercel.app/",
    alt: "Wit.AI Interface"
  }
];

// Export highlighted projects separately for display
export const highlightedProjects = projects.filter(p => p.highlighted);

// Export remaining projects for "view more" section
export const viewMoreProjects = projects.filter(p => !p.highlighted);

export default projects;
