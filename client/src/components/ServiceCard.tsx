import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { type Service } from "@shared/schema";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  // Dynamic Icon
  // @ts-ignore - Lucide icons are valid but TS doesn't know string is a key
  const Icon = Icons[service.icon as keyof typeof Icons] || Icons.Layout;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-8 border border-white/10 hover:border-white/30 transition-colors bg-white/[0.02] hover:bg-white/[0.05] group"
    >
      <div className="mb-6 text-white/40 group-hover:text-white transition-colors">
        <Icon size={40} strokeWidth={1} />
      </div>
      <h3 className="text-2xl font-display text-white mb-4">{service.title}</h3>
      <p className="text-muted-foreground font-light leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}
