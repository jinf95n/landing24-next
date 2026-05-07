"use client";

import { Zap, HeartHandshake, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const solutions = [
  {
    icon: Zap,
    title: "Velocidad",
    description: "Entregamos tu sitio funcionando en 24 horas. Sin demoras, sin vueltas.",
    points: ["Diseño listo en el día", "Sin procesos burocráticos", "Iteraciones rápidas"],
  },
  {
    icon: HeartHandshake,
    title: "Cero Estrés",
    description: "Nosotros redactamos los textos, subimos las fotos y configuramos el servidor. Es un servicio llave en mano.",
    points: ["Nos encargamos de todo", "No necesitás saber de tecnología", "Servicio integral"],
  },
  {
    icon: MessageSquare,
    title: "Soporte Humano",
    description: "No sos un número. Tenés soporte técnico real vía WhatsApp cuando lo necesites.",
    points: ["Respuesta en minutos", "Atención personalizada", "Soporte continuo"],
  },
];

const SolutionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden" id="solucion" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">La solución</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 mt-2">
            No vendemos tecnología, vendemos <span className="text-accent">tranquilidad</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Tu sitio profesional sin dolor de cabeza.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                <solution.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">{solution.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed mb-5">{solution.description}</p>
              <ul className="space-y-2">
                {solution.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-primary-foreground/60">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
