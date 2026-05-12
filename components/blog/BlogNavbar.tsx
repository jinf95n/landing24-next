import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5492646233326?text=Hola!%20Quiero%20mi%20sitio%20web";

const BlogNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/95 border-b border-primary-foreground/10 h-16 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Landing24"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/blog"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Hablar con un asesor
        </a>
      </div>
    </nav>
  );
};

export default BlogNavbar;