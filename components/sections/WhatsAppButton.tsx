import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/5492646233326?text=Hola!%20Quiero%20mi%20sitio%20web";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-full flex items-center justify-center shadow-lg shadow-[hsl(142,70%,45%)]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;