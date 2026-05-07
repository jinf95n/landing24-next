"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "¿El sitio es mío?",
    answer:
      "Sí. El sitio es 100% tuyo. Está a tu nombre y sos el propietario. Nosotros lo desarrollamos y lo dejamos funcionando para tu negocio. Si algún día decidís no continuar con nosotros, el sitio sigue siendo tuyo.",
  },
  {
    question: "¿El dominio quién lo paga?",
    answer:
      "El dominio se registra a tu nombre y lo pagás vos directamente (por ejemplo .com.ar o .com). Nosotros nos encargamos de configurarlo correctamente para que todo funcione sin complicaciones.",
  },
  {
    question: "¿Por qué conviene el mantenimiento mensual?",
    answer:
      "Porque el sitio no es autoadministrable y requiere gestión técnica. El mantenimiento incluye servidor profesional, seguridad activa, backups automáticos, monitoreo y soporte para cambios. Si contrataras hosting, técnico y soporte por separado, el costo sería mayor y tendrías que ocuparte vos de coordinar todo.",
  },
  {
    question: "¿Es obligatorio contratar el mantenimiento?",
    answer:
      "No es obligatorio. Podés contratar solo el desarrollo inicial. Sin embargo, el mantenimiento es la forma más simple y segura de asegurarte que tu sitio esté siempre online, protegido y actualizado sin que tengas que ocuparte de nada técnico.",
  },
  {
    question: "¿Qué pasa si no contrato mantenimiento?",
    answer:
      "El sitio seguirá siendo tuyo, pero deberás contratar por tu cuenta servidor, seguridad y soporte técnico. Nosotros no podremos garantizar funcionamiento, actualizaciones ni asistencia ante problemas si no está activo el servicio de mantenimiento.",
  },
  {
    question: "¿Qué incluye exactamente el mantenimiento?",
    answer:
      "Incluye hosting profesional, certificado SSL, seguridad, backups automáticos, monitoreo 24/7 y soporte para cambios básicos como textos, fotos o datos de contacto. Todo gestionado por nuestro equipo.",
  },
  {
    question: "¿Puedo pedir cambios en mi sitio?",
    answer:
      "Sí. Con mantenimiento activo podés solicitar ajustes básicos sin costo adicional. Solo nos escribís por WhatsApp y lo resolvemos. Sin mantenimiento, los cambios se cotizan por separado.",
  },
  {
    question: "¿Tengo permanencia?",
    answer:
      "No. Podés dar de baja el mantenimiento cuando quieras. Elegimos trabajar por confianza, no por contratos forzados.",
  },
  {
    question: "¿Puedo ver ejemplos de trabajos realizados?",
    answer:
      "Sí. Podemos enviarte ejemplos de sitios desarrollados para empresas similares a la tuya. Escribinos por WhatsApp y te compartimos referencias.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" id="faq" ref={ref}>
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Respondemos las dudas más comunes de nuestros clientes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
