import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5492646233326?text=Hola!%20Vi%20el%20blog%20y%20quiero%20consultar%20sobre%20mi%20sitio%20web";

export default function BlogCTA() {
  return (
    <div className="my-10 p-6 bg-accent/10 border border-accent/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1">
        <p className="font-bold text-foreground text-lg">
          ¿Tu negocio no tiene sitio web?
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Te lo entregamos funcionando en 24 horas, desde $250.000.
        </p>
      </div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors whitespace-nowrap flex-shrink-0"
      >
        <MessageCircle className="w-5 h-5" />
        Consultá ahora
      </a>
    </div>
  );
}