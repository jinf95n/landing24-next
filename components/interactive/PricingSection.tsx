"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  MessageCircle,
  Target,
  Users,
  Sparkles,
  Calendar,
  Building2,
  AlertCircle,
  Globe,
  MapPin,
  Image,
  Calculator,
  ShoppingBag,
  Clock,
  Mail,
  BarChart3,
  LucideIcon,
  Rocket,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useConversionOrchestrator } from "@/hooks/useConversionOrchestrator";
import {
  trackStandardEvent,
  trackCustomEvent,
  generateEventId,
} from "@/lib/metaPixel";

// ─── Constantes ──────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "5492646233326";
const LANDING24_PRICE = 250000;
const FLOW_NAME = "landing24_quote";
const SOURCE = "PricingSection";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface LandingType {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  examples: string;
  isLanding24: boolean;
}

interface AdditionalFeature {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// ─── Datos ───────────────────────────────────────────────────────────────────

const landingTypes: LandingType[] = [
  {
    id: "vender_servicios",
    name: "Vender Servicios",
    description: "Para profesionales y consultores",
    icon: Target,
    examples: "Abogados, médicos, coaches, agencias",
    isLanding24: true,
  },
  {
    id: "captar_clientes",
    name: "Captar Clientes",
    description: "Generación de leads y contactos",
    icon: Users,
    examples: "Formularios, descargas, registros",
    isLanding24: true,
  },
  {
    id: "mostrar_productos",
    name: "Mostrar Productos",
    description: "Catálogo visual de productos",
    icon: Sparkles,
    examples: "Portfolio, galería, catálogo simple",
    isLanding24: true,
  },
  {
    id: "evento_lanzamiento",
    name: "Evento/Lanzamiento",
    description: "Promocionar eventos o lanzamientos",
    icon: Calendar,
    examples: "Webinars, cursos, lanzamientos",
    isLanding24: true,
  },
  {
    id: "pagina_corporativa",
    name: "Página Corporativa",
    description: "Información institucional",
    icon: Building2,
    examples: "Empresa, quiénes somos, contacto",
    isLanding24: true,
  },
  {
    id: "otro_proyecto",
    name: "Otro Proyecto",
    description: "E-commerce, multi-página, sistemas",
    icon: Globe,
    examples: "Tiendas online, sitios complejos, plataformas",
    isLanding24: false,
  },
];

const additionalFeatures: AdditionalFeature[] = [
  {
    id: "multi_idioma",
    name: "Multi-idioma",
    description: "Selector de español/inglés",
    icon: Globe,
  },
  {
    id: "mapa_interactivo",
    name: "Mapa Interactivo",
    description: "Google Maps embebido",
    icon: MapPin,
  },
  {
    id: "galeria_portfolio",
    name: "Galería/Portfolio",
    description: "Showcase de trabajos",
    icon: Image,
  },
  {
    id: "cotizador",
    name: "Cotizador",
    description: "Calculadora personalizada",
    icon: Calculator,
  },
  {
    id: "pedidos_whatsapp",
    name: "Pedidos a WhatsApp",
    description: "Carrito simple → WhatsApp",
    icon: ShoppingBag,
  },
  {
    id: "calendario_agenda",
    name: "Calendario/Agenda",
    description: "Sistema de reservas básico",
    icon: Clock,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Captura de emails",
    icon: Mail,
  },
  {
    id: "otros",
    name: "Otros",
    description: "Otras funcionalidades a medida",
    icon: BarChart3,
  },
];

// ─── Helpers de mapeo ─────────────────────────────────────────────────────────

const managementKeyMap: Record<string, string> = {
  none: "sin_gestion",
  monthly: "plan_mensual",
  annual: "plan_anual",
};

// ─── Componente ──────────────────────────────────────────────────────────────

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { markCotizadorSubmitted } = useConversionOrchestrator();

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [managementPlan, setManagementPlan] = useState<
    "none" | "monthly" | "annual" | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "installments">(
    "installments"
  );

  // ─── Anti-duplicación para eventos de vista de paso ───────────────────────
  const viewedSteps = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!isVisible) return;
    if (viewedSteps.current.has(step)) return;
    viewedSteps.current.add(step);

    const selectedTypeName = selectedType;
    const mgmtKey = managementPlan ? managementKeyMap[managementPlan] : "";

    if (step === 1) {
      trackCustomEvent("QuoteStepViewed", {
        step_number: 1,
        step_name: "objetivo",
        flow_name: FLOW_NAME,
      });
    } else if (step === 2) {
      trackCustomEvent("QuoteStepViewed", {
        step_number: 2,
        step_name: "features",
        flow_name: FLOW_NAME,
      });
    } else if (step === 3) {
      trackCustomEvent("QuoteStepViewed", {
        step_number: 3,
        step_name: "gestion",
        flow_name: FLOW_NAME,
      });
    } else if (step === 4) {
      viewedSteps.current.delete(4);
      trackCustomEvent("QuoteSummaryViewed", {
        step_number: 4,
        step_name: "resumen",
        flow_name: FLOW_NAME,
        selected_option: selectedTypeName,
        selected_features_count: selectedFeatures.length,
        management_option: mgmtKey,
        quote_total: LANDING24_PRICE,
      });
    }
  }, [step, isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Datos derivados ──────────────────────────────────────────────────────

  const isLanding24 =
    landingTypes.find((t) => t.id === selectedType)?.isLanding24 ?? false;

  const managementPriceMonthly = 25000;
  const managementPriceAnnual = managementPriceMonthly * 12 - 50000;

  // ─── Navegación entre pasos ───────────────────────────────────────────────

  const goToStep = (newStep: number) => {
    if (step === 1 && (newStep === 2 || newStep === 5) && selectedType) {
      trackCustomEvent("QuoteStepCompleted", {
        step_number: 1,
        step_name: "objetivo",
        selected_option: selectedType,
        flow_name: FLOW_NAME,
      });
    } else if (step === 2 && newStep === 3) {
      trackCustomEvent("QuoteStepCompleted", {
        step_number: 2,
        step_name: "features",
        flow_name: FLOW_NAME,
        selected_features_count: selectedFeatures.length,
        selected_features: selectedFeatures,
      });
    } else if (step === 3 && newStep === 4 && managementPlan) {
      trackCustomEvent("QuoteStepCompleted", {
        step_number: 3,
        step_name: "gestion",
        flow_name: FLOW_NAME,
        management_option: managementKeyMap[managementPlan],
      });
    }

    setStep(newStep);
    document
      .getElementById("cotizador")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ─── Handlers con tracking ────────────────────────────────────────────────

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
    trackStandardEvent("CustomizeProduct", {
      flow_name: FLOW_NAME,
      step_number: 1,
      step_name: "objetivo",
      selected_option: typeId,
      source_component: SOURCE,
    });
    trackCustomEvent("QuoteObjectiveSelected", {
      flow_name: FLOW_NAME,
      step_number: 1,
      step_name: "objetivo",
      selected_option: typeId,
      source_component: SOURCE,
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    const wasSelected = selectedFeatures.includes(featureId);
    setSelectedFeatures((prev) =>
      wasSelected ? prev.filter((id) => id !== featureId) : [...prev, featureId]
    );
    trackCustomEvent("QuoteFeatureToggled", {
      step_number: 2,
      step_name: "features",
      flow_name: FLOW_NAME,
      feature_name: featureId,
      action: wasSelected ? "deselected" : "selected",
      source_component: SOURCE,
    });
  };

  const handleManagementSelection = (plan: "none" | "monthly" | "annual") => {
    setManagementPlan(plan);
    trackCustomEvent("QuoteManagementSelected", {
      step_number: 3,
      step_name: "gestion",
      flow_name: FLOW_NAME,
      management_option: managementKeyMap[plan],
      source_component: SOURCE,
    });
  };

  const handlePaymentMethodSelection = (method: "full" | "installments") => {
    setPaymentMethod(method);
    trackCustomEvent("QuotePaymentOptionSelected", {
      step_number: 4,
      step_name: "resumen",
      flow_name: FLOW_NAME,
      payment_option: method === "full" ? "pago_unico" : "financiado",
      quote_total: LANDING24_PRICE,
      source_component: SOURCE,
    });
  };

  const handleWhatsAppConfirm = () => {
    const mgmtKey = managementPlan ? managementKeyMap[managementPlan] : "";
    const paymentOption = paymentMethod === "full" ? "pago_unico" : "financiado";
    const sharedEventId = generateEventId("Contact");

    const baseParams = {
      flow_name: FLOW_NAME,
      step_number: 4,
      step_name: "resumen",
      placement: "final_summary_cta",
      button_name: "confirmar_por_whatsapp",
      whatsapp_number: WHATSAPP_NUMBER,
      quote_total: LANDING24_PRICE,
      management_option: mgmtKey,
      payment_option: paymentOption,
      selected_option: selectedType,
      selected_features_count: selectedFeatures.length,
      source_component: SOURCE,
    };

    trackStandardEvent("Contact", baseParams, { eventID: sharedEventId });
    trackCustomEvent(
      "QuoteConfirmedWhatsApp",
      {
        ...baseParams,
        selected_features: selectedFeatures,
        currency: "ARS",
      },
      { eventID: sharedEventId }
    );

    markCotizadorSubmitted();
  };

  // ─── Mensaje de WhatsApp ──────────────────────────────────────────────────

  const getWhatsAppMessage = () => {
    const type = landingTypes.find((t) => t.id === selectedType);

    if (!isLanding24) {
      return encodeURIComponent(
        `¡Hola! Completé el cotizador\n\n` +
          `📊 Necesito presupuesto para:\n` +
          `• Tipo: ${type?.name}\n` +
          `• Es un proyecto personalizado\n\n` +
          `¿Podemos agendar una llamada?`
      );
    }

    const features = selectedFeatures
      .map((id) => additionalFeatures.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const managementText =
      managementPlan === "annual"
        ? "Plan Anual (2 meses gratis)"
        : managementPlan === "monthly"
          ? "Plan Mensual"
          : "No";

    return encodeURIComponent(
      `¡Hola! Completé el cotizador de Landing24\n\n` +
        `📊 Mi presupuesto:\n` +
        `• Tipo: ${type?.name}\n` +
        `• Features extra: ${features || "Solo lo básico"}\n` +
        `• Gestión técnica: ${managementText}\n` +
        `• Pago desarrollo: ${paymentMethod === "full" ? "Único" : "Financiado ($150k + $150k)"}\n` +
        `• Inversión desarrollo: $${(paymentMethod === "installments" ? 300000 : LANDING24_PRICE).toLocaleString("es-AR")}\n` +
        (managementPlan !== "none"
          ? `• Gestión: $${(managementPlan === "annual" ? managementPriceAnnual : managementPriceMonthly).toLocaleString("es-AR")}\n`
          : "") +
        `\nQuiero arrancar!`
    );
  };

  // ─── Renderizado de pasos ─────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-2 md:mb-3">
                ¿Cuál es tu objetivo?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground px-4">
                Seleccioná el tipo que mejor se adapte a tu necesidad
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {landingTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;

                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeSelection(type.id)}
                    className={`p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all relative ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    {type.isLanding24 && (
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 md:py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        24HS
                      </div>
                    )}

                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 rounded-lg md:rounded-xl ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground text-sm md:text-base mb-1">
                          {type.name}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                          {type.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70 hidden sm:block">
                          {type.examples}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => (isLanding24 ? goToStep(2) : goToStep(5))}
              disabled={!selectedType}
              className="w-full btn-primary py-3 md:py-4 text-base md:text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-2 md:mb-3">
                ¿Necesitás funcionalidades extra?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground px-4">
                Seleccioná todo lo que necesites (opcional)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {additionalFeatures.map((feature) => {
                const Icon = feature.icon;
                const isSelected = selectedFeatures.includes(feature.id);

                return (
                  <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`p-3 md:p-4 rounded-lg md:rounded-xl border-2 text-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg mx-auto mb-1.5 md:mb-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h5 className="font-bold text-xs md:text-sm text-foreground mb-0.5 md:mb-1">
                      {feature.name}
                    </h5>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {feature.description}
                    </p>
                    {isSelected && (
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-primary mx-auto mt-1 md:mt-2" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-xl p-3 md:p-4 text-center">
              <p className="text-xs md:text-sm text-muted-foreground">
                💡 <strong className="text-foreground">Importante:</strong> Estas
                opciones son orientativas para conocer tu proyecto. El alcance
                final lo armamos juntos a medida que trabajamos.
              </p>
            </div>

            <div className="flex gap-3 md:gap-4">
              <button
                onClick={() => goToStep(1)}
                className="flex-1 btn-outline py-3 md:py-4 text-base md:text-lg font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Volver</span>
              </button>
              <button
                onClick={() => goToStep(3)}
                className="flex-1 btn-primary py-3 md:py-4 text-base md:text-lg font-bold flex items-center justify-center gap-2"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-2 md:mb-3">
                ¿Querés delegar la gestión técnica?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground px-4">
                Elegí cómo querés gestionar tu landing después de la entrega
              </p>
            </div>

            {/* Sin gestión */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleManagementSelection("none")}
              className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 text-left transition-all ${
                managementPlan === "none"
                  ? "border-orange-400 bg-orange-500/10 shadow-md"
                  : "border-border bg-muted/50 hover:border-orange-300"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" />
                  <h4 className="font-bold text-foreground text-sm md:text-base">
                    Sin gestión (lo gestionás vos)
                  </h4>
                </div>
                {managementPlan === "none" && (
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 ml-6 md:ml-7">
                Te entregamos el sitio completo. Vos te encargás del hosting y
                mantenimiento técnico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 ml-6 md:ml-7">
                <span className="flex items-start gap-1.5">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                  Hosting a contratar con terceros
                </span>
                <span className="flex items-start gap-1.5">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                  SSL y renovaciones a tu cargo
                </span>
                <span className="flex items-start gap-1.5">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                  Backups y seguridad manuales
                </span>
                <span className="flex items-start gap-1.5">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                  Cambios coordinados con un dev externo
                </span>
              </div>

              <div className="bg-orange-500/10 border border-orange-300/40 rounded-lg p-2.5 md:p-3 ml-6 md:ml-7">
                <p className="text-xs text-muted-foreground mb-0.5">
                  ⚠️ Costo estimado si lo hacés por tu cuenta:
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg md:text-xl font-black text-foreground">
                    ~$50k+
                  </span>
                  <span className="text-muted-foreground text-xs">/mes</span>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  Hosting + cambios + imprevistos
                </p>
              </div>
            </motion.button>

            {/* Separador */}
            <div className="flex items-center gap-3 md:gap-4 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs md:text-sm font-semibold text-muted-foreground">
                O NOS ENCARGAMOS NOSOTROS
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Planes de servicio */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {/* Plan Mensual */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleManagementSelection("monthly")}
                className={`p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all h-full ${
                  managementPlan === "monthly"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-foreground text-base md:text-lg">
                    Plan Mensual
                  </h4>
                  {managementPlan === "monthly" && (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-primary font-semibold mb-3 md:mb-4">
                  Nos ocupamos de todo por vos
                </p>

                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm mb-3 md:mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Hosting premium incluido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>SSL + backups automáticos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Seguridad y actualizaciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Cambios mensuales incluidos</span>
                  </li>
                </ul>

                <div className="bg-card border border-border rounded-lg p-2.5 md:p-3 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl font-black text-foreground">
                      $25.000
                    </span>
                    <span className="text-muted-foreground text-xs">/mes</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Desde el mes 2 • Sin permanencia
                  </p>
                </div>
              </motion.button>

              {/* Plan Anual */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleManagementSelection("annual")}
                className={`p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all relative overflow-hidden h-full ${
                  managementPlan === "annual"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  MÁS ELEGIDO
                </div>

                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-foreground text-base md:text-lg">
                    Plan Anual
                  </h4>
                  {managementPlan === "annual" && (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-primary font-semibold mb-3 md:mb-4">
                  Nos ocupamos de todo por vos
                </p>

                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm mb-3 md:mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Todo del plan mensual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>
                      <strong>2 meses gratis</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Precio congelado todo el año</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Atención premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span>Máximo ahorro</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-2.5 md:p-3 mt-auto">
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-xs text-muted-foreground line-through">
                      ${(managementPriceMonthly * 12).toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl font-black text-primary">
                      ${managementPriceAnnual.toLocaleString("es-AR")}
                    </span>
                    <span className="text-muted-foreground text-xs">/año</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-1">
                    🎁 Ahorro $50.000 (2 meses gratis)
                  </p>
                </div>
              </motion.button>
            </div>

            <div className="flex gap-3 md:gap-4">
              <button
                onClick={() => goToStep(2)}
                className="flex-1 btn-outline py-3 md:py-4 text-base md:text-lg font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Volver</span>
              </button>
              <button
                onClick={() => goToStep(4)}
                disabled={managementPlan === null}
                className="flex-1 btn-primary py-3 md:py-4 text-base md:text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>
        );

      case 4: {
        const developmentAmount = LANDING24_PRICE;
        const firstInstallment = 150000;
        const secondInstallment = 150000;

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Resumen Dinámico */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 border-primary/20">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground">
                    Tu Landing24
                  </h3>
                  <p className="text-xs md:text-sm text-primary">
                    ⚡ Entrega en 24 horas hábiles
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {/* Desarrollo */}
                <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
                  <div className="flex justify-between items-center mb-2 md:mb-3">
                    <span className="font-bold text-foreground text-sm md:text-base">
                      Desarrollo Landing
                    </span>
                    <span className="text-xl md:text-2xl font-black text-foreground">
                      ${developmentAmount.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {selectedFeatures.length > 0 && (
                    <div className="pt-2 md:pt-3 border-t border-border mb-2 md:mb-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2">
                        Incluye:
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-1.5">
                        {selectedFeatures.map((featureId) => {
                          const feature = additionalFeatures.find(
                            (f) => f.id === featureId
                          );
                          return (
                            <span
                              key={featureId}
                              className="text-xs bg-primary/10 text-primary px-2 py-0.5 md:py-1 rounded-full"
                            >
                              {feature?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Forma de pago */}
                  <div className="space-y-2 pt-2 md:pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Forma de pago:
                    </p>

                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button
                        onClick={() => handlePaymentMethodSelection("full")}
                        className={`p-2.5 md:p-3 rounded-lg border-2 text-left transition-all ${
                          paymentMethod === "full"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs md:text-sm font-bold">
                            Pago Único
                          </span>
                          {paymentMethod === "full" && (
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-base md:text-lg font-black text-foreground">
                          ${developmentAmount.toLocaleString("es-AR")}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handlePaymentMethodSelection("installments")
                        }
                        className={`p-2.5 md:p-3 rounded-lg border-2 text-left transition-all relative ${
                          paymentMethod === "installments"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                       
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs md:text-sm font-bold">
                            Financiado
                          </span>
                          {paymentMethod === "installments" && (
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">
                            Hoy: ${firstInstallment.toLocaleString("es-AR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            30 días: ${secondInstallment.toLocaleString("es-AR")}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cronograma - Responsive mejorado */}
                <div className="bg-card rounded-xl p-4 md:p-5 border border-primary/20">
                  <h4 className="font-bold text-foreground mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide">
                    📅 Cronograma de pagos
                  </h4>

                  <div className="space-y-2 md:space-y-3">
                    <div className="bg-primary/10 rounded-lg p-3 md:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-primary uppercase mb-0.5 md:mb-1">
                            Hoy
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {paymentMethod === "installments"
                              ? "Cuota 1 — Desarrollo"
                              : "Pago único — Desarrollo"}
                          </p>
                        </div>
                        <span className="text-lg md:text-2xl font-black text-foreground text-right">
                          $
                          {(paymentMethod === "installments"
                            ? firstInstallment
                            : developmentAmount
                          ).toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>

                    {(paymentMethod === "installments" ||
                      managementPlan !== "none") && (
                      <div className="bg-muted/60 rounded-lg p-3 md:p-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase mb-2 md:mb-3">
                          Mes 2
                        </p>
                        <div className="space-y-1.5 md:space-y-2">
                          {paymentMethod === "installments" && (
                            <div className="flex justify-between text-xs md:text-sm gap-2">
                              <span className="text-muted-foreground">
                                Cuota 2 — Desarrollo
                              </span>
                              <span className="font-semibold text-foreground text-right">
                                ${secondInstallment.toLocaleString("es-AR")}
                              </span>
                            </div>
                          )}
                          {managementPlan === "annual" && (
                            <div className="flex justify-between text-xs md:text-sm gap-2">
                              <span className="text-muted-foreground">
                                Plan Anual — Gestión
                              </span>
                              <div className="text-right">
                                <span className="text-xs line-through text-muted-foreground/60 mr-1">
                                  $
                                  {(managementPriceMonthly * 12).toLocaleString(
                                    "es-AR"
                                  )}
                                </span>
                                <span className="font-semibold text-primary">
                                  ${managementPriceAnnual.toLocaleString("es-AR")}
                                </span>
                              </div>
                            </div>
                          )}
                          {managementPlan === "monthly" && (
                            <div className="flex justify-between text-xs md:text-sm gap-2">
                              <span className="text-muted-foreground">
                                Gestión mensual
                              </span>
                              <span className="font-semibold text-foreground">
                                ${managementPriceMonthly.toLocaleString("es-AR")}
                                <span className="text-xs font-normal text-muted-foreground">
                                  /mes
                                </span>
                              </span>
                            </div>
                          )}
                          <div className="border-t border-border pt-1.5 md:pt-2 flex justify-between font-bold text-xs md:text-sm">
                            <span>Total mes 2</span>
                            <span className="text-foreground">
                              $
                              {(
                                (paymentMethod === "installments"
                                  ? secondInstallment
                                  : 0) +
                                (managementPlan === "annual"
                                  ? managementPriceAnnual
                                  : managementPlan === "monthly"
                                    ? managementPriceMonthly
                                    : 0)
                              ).toLocaleString("es-AR")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-2.5 md:p-3">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        <strong>Garantía total el 1er mes:</strong> trabajamos
                        hasta que quedes completamente conforme. Cambios ilimitados.
                      </p>
                    </div>

                    {managementPlan === "annual" && (
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-2.5 md:p-3">
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-semibold text-primary">
                          2 meses gratis incluidos — Ahorro de $50.000
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-surface-dark rounded-xl p-4 md:p-6">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm md:text-lg font-bold text-primary">
                      INVERSIÓN TOTAL
                    </span>
                    <div className="text-right">
                      <div className="text-2xl md:text-4xl font-black text-primary">
                        $
                        {(
                          developmentAmount +
                          (managementPlan === "annual"
                            ? managementPriceAnnual
                            : 0)
                        ).toLocaleString("es-AR")}
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        {managementPlan === "none" && "Solo desarrollo"}
                        {managementPlan === "annual" &&
                          "Desarrollo + gestión 12 meses"}
                        {managementPlan === "monthly" &&
                          `Desarrollo + gestión desde mes 2`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Incluye */}
            <div className="bg-muted/50 rounded-xl md:rounded-2xl p-4 md:p-6">
              <h4 className="font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Tu landing incluye:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Diseño profesional personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>100% responsive (mobile + desktop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>WhatsApp integrado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Formularios de contacto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>SEO optimizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Lista para publicar</span>
                </div>
              </div>
            </div>

            {/* ⭐ CTA FINAL ULTRA MEJORADO CON VIDA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Fondo con gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-accent opacity-10 rounded-2xl md:rounded-3xl blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border-2 border-primary/30 shadow-2xl shadow-primary/20">
                {/* Badge superior */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm md:text-base mb-4"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  OFERTA EXCLUSIVA
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm md:text-base text-muted-foreground mb-2"
                >
                  ⏰ Oferta válida por
                </motion.p>
                
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-3xl md:text-4xl font-black text-foreground mb-6"
                >
                  48 HORAS
                </motion.p>

                {/* CTA PRINCIPAL ANIMADO */}
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppConfirm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent via-primary to-accent bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-5 md:py-6 px-6 md:px-8 rounded-2xl font-black text-lg md:text-2xl transition-all duration-500 shadow-2xl shadow-accent/40 hover:shadow-accent/60 overflow-hidden mb-4"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                >
                  {/* Efecto de brillo animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  
                  {/* Icono con animación */}
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <Rocket className="w-6 h-6 md:w-7 md:h-7" />
                  </motion.div>
                  
                  <span className="relative">
                    Confirmar por WhatsApp
                  </span>
                  
                  {/* Icono WhatsApp con pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                  </motion.div>
                </motion.a>

                {/* Trust badges animados */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm"
                >
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Respuesta inmediata</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Asesoramiento gratis</span>
                  </div>
                </motion.div>

                {/* Bonus destacado */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  🎁 Bonus: 2 meses gratis si confirmás hoy
                </motion.div>
              </div>
            </motion.div>

            <button
              onClick={() => goToStep(3)}
              className="w-full btn-outline py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </motion.div>
        );
      }

      case 5: {
        const customType = landingTypes.find((t) => t.id === selectedType);
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-blue-500/20 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-foreground mb-3">
                Proyecto Personalizado
              </h3>

              <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto px-4">
                {customType?.name} requiere un análisis detallado para darte un
                presupuesto preciso.
              </p>

              <div className="bg-card rounded-xl p-4 md:p-6 mb-6 text-left max-w-lg mx-auto">
                <h4 className="font-bold text-foreground mb-3 md:mb-4 text-sm md:text-base">
                  Para este tipo de proyecto necesitamos saber:
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Alcance funcional específico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Integraciones necesarias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Volumen de productos/páginas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Pasarelas de pago (si aplica)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Diseño personalizado vs plantilla</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 md:p-5 mb-6 max-w-lg mx-auto">
                <p className="text-xs md:text-sm text-muted-foreground">
                  <strong className="text-foreground">Tiempo estimado:</strong>{" "}
                  2-4 semanas
                  <br />
                  <strong className="text-foreground">Inversión:</strong> Desde
                  $350k según complejidad
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackStandardEvent("Contact", {
                    flow_name: FLOW_NAME,
                    step_name: "custom_project",
                    placement: "custom_project_cta",
                    button_name: "agendar_llamada",
                    whatsapp_number: WHATSAPP_NUMBER,
                    selected_option: selectedType,
                    source_component: SOURCE,
                  });
                }}
                className="w-full max-w-md mx-auto btn-primary py-4 md:py-5 text-lg md:text-xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 mb-4"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                Agendar Llamada
              </a>

              <p className="text-xs text-muted-foreground px-4">
                Te contactamos en menos de 24hs para armar tu presupuesto
              </p>
            </div>

            <button
              onClick={() => goToStep(1)}
              className="w-full btn-outline py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a opciones
            </button>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-muted/50" id="cotizador" ref={ref}>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-accent font-semibold text-xs md:text-sm uppercase tracking-widest">
            Inversión
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 mt-2">
            Cotizador Interactivo
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            Descubrí en minutos cuánto cuesta tu proyecto
          </p>
        </motion.div>

        {/* Progress Bar */}
        {isLanding24 && step !== 5 && (
          <div className="max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all ${
                      s < step
                        ? "bg-accent text-accent-foreground"
                        : s === step
                          ? "bg-accent text-accent-foreground ring-2 md:ring-4 ring-accent/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-0.5 md:h-1 w-8 md:w-12 lg:w-20 transition-all ${
                        s < step ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>Objetivo</span>
              <span className="hidden sm:inline">Features</span>
              <span>Gestión</span>
              <span>Resumen</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;