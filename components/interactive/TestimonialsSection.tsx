"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Martín R.",
    business: "Pizzería",
    text: "En un día tenía mi sitio andando. Los pedidos por WhatsApp se duplicaron en la primera semana.",
    stars: 5,
  },
  {
    name: "Laura G.",
    business: "Estudio Contable",
    text: "Mis clientes ahora me encuentran en Google. Antes solo me llegaban por boca en boca, ahora tengo consultas todos los días.",
    stars: 5,
  },
  {
    name: "Diego S.",
    business: "Ferretería",
    text: "El catálogo online me ahorra horas de atención. La gente ve los precios antes de venir y compra más.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Testimonios</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-accent">{t.business}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
