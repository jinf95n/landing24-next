"use client";

import { Send, Hammer, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Envío",
    description: "Nos pasás tu logo y fotos (o usamos las de tus redes).",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Construcción",
    description: "Nuestros expertos arman tu sitio profesional a medida.",
    color: "from-accent/30 to-accent/10",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Lanzamiento",
    description: "En 24hs tenés tu dominio .com.ar online y listo para vender.",
    color: "from-accent/40 to-accent/15",
  },
];

const StepsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" id="como-funciona" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Proceso</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            3 pasos simples. Sin complicaciones.
          </h2>
          <p className="text-muted-foreground text-lg">
            Vos nos contactás, nosotros hacemos todo el trabajo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-border via-accent/30 to-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
              className="relative text-center group"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-9 h-9 text-accent" />
              </div>
              <span className="text-xs font-black text-accent mb-2 block tracking-[0.2em]">PASO {step.number}</span>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
