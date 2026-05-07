"use client";

import { ShieldAlert, SearchX, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const problems = [
  {
    icon: ShieldAlert,
    title: "Terreno Alquilado",
    description: "Si Instagram cambia el algoritmo o te bloquea, perdés tus clientes de un día para el otro.",
    stat: "63%",
    statLabel: "de negocios dependen solo de redes",
  },
  {
    icon: SearchX,
    title: "Invisible en Google",
    description: "El 40% de la gente busca en Google Maps antes de comprar. Si no tenés web, no existís.",
    stat: "40%",
    statLabel: "busca en Google antes de comprar",
  },
  {
    icon: AlertTriangle,
    title: "Falta de Confianza",
    description: "Una web oficial le dice a tu cliente que tu negocio es serio y no una estafa.",
    stat: "75%",
    statLabel: "confía más con sitio web propio",
  },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" id="problema" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">El problema</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            ¿Por qué Instagram <span className="text-accent">no es suficiente</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Depender de una sola red social es un riesgo enorme para tu negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                <problem.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{problem.description}</p>
              <div className="pt-4 border-t border-border">
                <span className="text-2xl font-black text-accent">{problem.stat}</span>
                <p className="text-xs text-muted-foreground mt-1">{problem.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
