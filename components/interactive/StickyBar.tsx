"use client";

import { X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConversionOrchestrator } from "@/hooks/useConversionOrchestrator";
import { trackStandardEvent } from "@/lib/metaPixel";

const StickyBar = () => {
  const { state, dismissStickyBar, scrollToCotizador } = useConversionOrchestrator();

  const handleCotizarClick = () => {
    trackStandardEvent("InitiateCheckout", {
      content_name: "landing24_quote",
      placement: "sticky_bar",
      button_name: "cotizar_ahora",
      source_component: "StickyBar",
    });
    scrollToCotizador();
  };

  return (
    <AnimatePresence>
      {state.showStickyBar && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-16 left-0 right-0 z-50 bg-gradient-to-r from-accent to-amber-500 text-accent-foreground shadow-2xl"
        >
          <div className="container flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base font-semibold">
                <span className="hidden md:inline">¿Cuánto cuesta tu sitio? </span>
                Descubrilo en 30 segundos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCotizarClick}
                className="bg-primary text-primary-foreground font-bold text-sm px-4 md:px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Cotizar Ahora
              </button>
              <button
                onClick={dismissStickyBar}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBar;