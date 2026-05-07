import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Fábrica Digital"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <Link
              href="/terminos"
              className="hover:text-primary-foreground transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="hover:text-primary-foreground transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Fábrica Digital. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;