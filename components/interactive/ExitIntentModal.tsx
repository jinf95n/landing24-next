"use client";

import { X, CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConversionOrchestrator } from "@/hooks/useConversionOrchestrator";

const ExitIntentModal = () => {
  const { state, dismissExitModal, scrollToCotizador } = useConversionOrchestrator();

  const handleCotizar = () => {
    dismissExitModal();
    scrollToCotizador();
  };

  const message = state.hasSeenCotizador
    ? {
        title: "¡Esperá! Ya estabas por confirmar",
        subtitle: "Viste tu inversión personalizada. ¿No te convence?",
        benefit1: "Precio final sin sorpresas",
        benefit2: "2 meses gratis si confirmás hoy",
        benefit3: "Entrega garantizada en 24hs",
      }
    : {
        title: "¡Esperá un segundo!",
        subtitle: "Antes de irte, descubrí cuánto cuesta tu sitio en 24hs",
        benefit1: "Solo 30 segundos",
        benefit2: "Sin compromiso",
        benefit3: "Precio al instante",
      };

  return (
    <AnimatePresence>
      {state.showExitModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissExitModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl relative pointer-events-auto"
            >
              <button
                onClick={dismissExitModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center space-y-6">
                <div className="text-6xl">⚠️</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                    {message.title}
                  </h3>
                  <p className="text-muted-foreground">{message.subtitle}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  {[message.benefit1, message.benefit2].map((b) => (
                    <div key={b} className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="font-semibold text-sm">{b}</p>
                    </div>
                  ))}
                  <div className="flex items-start gap-3 text-left">
                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="font-semibold text-sm">{message.benefit3}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCotizar}
                    className="flex-1 bg-accent text-accent-foreground font-bold py-4 px-6 rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                  >
                    {state.hasSeenCotizador ? "Volver al presupuesto" : "Ver mi Inversión"}
                  </button>
                  <button
                    onClick={dismissExitModal}
                    className="px-6 py-4 text-muted-foreground hover:text-foreground transition-colors font-semibold"
                  >
                    No, gracias
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  🎁 Bonus: 2 meses gratis si cotizás hoy
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;