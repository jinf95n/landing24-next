"use client";

import { MessageCircle, ArrowRight, TrendingUp, Users, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useConversionOrchestrator } from "@/hooks/useConversionOrchestrator";
import { trackStandardEvent } from "@/lib/metaPixel";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/542646233326?text=Hola!%20Quiero%20mi%20sitio%20web";

const stats = [
  { icon: Users, value: "#1", label: "Precio transparente" },
  { icon: Clock, value: "24hs", label: "Entrega promedio" },
  { icon: TrendingUp, value: "3x", label: "Más visibilidad" },
];

const HeroSection = () => {
  const { scrollToCotizador } = useConversionOrchestrator();

  /**
   * CTA principal: "Cotizar mi Sitio"
   * → InitiateCheckout: el usuario inicia el flujo real de cotización.
   */
  const handleCotizarClick = () => {
    trackStandardEvent("InitiateCheckout", {
      content_name: "landing24_quote",
      placement: "hero_cta",
      button_name: "cotizar_mi_sitio",
      source_component: "HeroSection",
    });
    scrollToCotizador();
  };

  /**
   * CTA secundario: "Hablar con Asesor" (WhatsApp)
   * → Contact: el usuario inicia una conversación directa.
   */
  const handleWhatsAppClick = () => {
    trackStandardEvent("Contact", {
      button_name: "hablar_con_asesor",
      placement: "hero_secondary_cta",
      whatsapp_number: "542646233326",
      source_component: "HeroSection",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
  src="/hero-bg.jpg"
  alt="Diseño web profesional en San Juan"
  fill
  priority
  className="object-cover"
/>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-accent/5"
            initial={{ x: `${20 * i}%`, y: "100%", opacity: 0 }}
            animate={{ y: "-20%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-4 py-1.5 text-sm text-accent-foreground mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Más de 200 negocios potenciados
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-foreground leading-[1.1] mb-6"
          >
            Transformamos tu Negocio en una{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-400">
              Marca Profesional
            </span>{" "}
            en menos de 24 horas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed"
          >
            Tu web profesional en 24hs, desde San Juan para todo el país. Dejá de depender solo de Instagram y empezá a ser el primero en Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* CTA PRINCIPAL */}
            <button
              onClick={handleCotizarClick}
              className="group relative inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-black text-lg px-8 py-5 rounded-xl transition-all duration-300 shadow-2xl shadow-accent/30 hover:shadow-accent/40 hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Zap className="w-5 h-5" />
              <span className="flex flex-col items-start">
                <span>Cotizar mi Sitio</span>
                <span className="text-xs font-normal opacity-90">Solo 30 segundos</span>
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* CTA SECUNDARIO */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-semibold text-lg px-8 py-5 rounded-xl transition-all duration-300 border-2 border-primary-foreground/20 hover:border-primary-foreground/30"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con Asesor
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 flex flex-wrap gap-4 text-sm text-primary-foreground/60"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sin permanencia
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Precio transparente
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Entrega garantizada
            </span>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-accent" />
                <span className="text-2xl md:text-3xl font-black text-primary-foreground">{stat.value}</span>
              </div>
              <p className="text-xs md:text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;