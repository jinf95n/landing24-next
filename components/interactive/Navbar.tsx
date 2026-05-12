"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import { trackStandardEvent } from "@/lib/metaPixel";

const WHATSAPP_LINK =
  "https://wa.me/542646233326?text=Hola!%20Quiero%20mi%20sitio%20web";

const links = [
  { label: "El Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Demos", href: "#demos" },
  { label: "Precios", href: "#cotizador" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (placement: "navbar_desktop" | "navbar_mobile") => {
    trackStandardEvent("Contact", {
      button_name: "contactar_navbar",
      placement,
      source_component: "Navbar",
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 bg-primary border-b border-primary-foreground/10 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-primary/98 shadow-lg shadow-black/30 h-12"
          : "bg-primary/95 shadow-none h-16"
      }`}
    >
      <div className="container flex items-center justify-between h-full">
        <a href="#" className="relative flex items-center h-full">
          <Image
            src="/logo.png"
            alt="Landing24"
            width={120}
            height={32}
            className={`h-8 w-auto absolute transition-all duration-500 ease-in-out ${
              scrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
          <Image
            src="/logo-corto.png"
            alt="Landing24"
            width={80}
            height={28}
            className={`h-7 w-auto transition-all duration-500 ease-in-out ${
              scrolled ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleContactClick("navbar_desktop")}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick("navbar_mobile")}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;