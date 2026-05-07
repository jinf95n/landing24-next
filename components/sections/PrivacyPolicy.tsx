"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  MessageCircle,
  UserCheck,
  EyeOff,
  Lock,
  AlertTriangle,
} from "lucide-react";

import Link from "next/link";
// ── Reusable card — same as LegalTerms ────────────────────────────────────
const TermCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border/50 bg-card p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-base text-foreground">{title}</h3>
    </div>
    {children}
  </div>
);

// ── Channels where data comes from ────────────────────────────────────────
const channels = [
  {
    icon: <MessageCircle className="h-4 w-4" />,
    label: "WhatsApp",
    detail: "Al hacer clic en nuestro enlace de contacto",
  },
  {
    icon: <UserCheck className="h-4 w-4" />,
    label: "Videollamadas",
    detail: "Google Meet / Zoom durante la consultoría",
  },
  {
    icon: <MessageCircle className="h-4 w-4" />,
    label: "Contacto directo",
    detail: "Correo electrónico o llamada telefónica",
  },
];

// ── Main component ─────────────────────────────────────────────────────────
const PrivacyPolicy = () => (
  <section id="privacidad" className="py-16 px-4 bg-background">
    <div className="container max-w-4xl mx-auto">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
          Legal
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Política de Privacidad
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          Landing24 es un producto de{" "}
          <strong className="text-foreground">MCM Digital</strong>. Acá
          explicamos, de forma clara y sin letra chica, cómo manejamos tu
          información.
        </p>
      </div>

      {/* ── Summary strip — same pattern as LegalTerms ──────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: <EyeOff className="h-4 w-4" />, text: "Sin rastreo" },
          {
            icon: <ShieldCheck className="h-4 w-4" />,
            text: "Sin formularios",
          },
          { icon: <Lock className="h-4 w-4" />, text: "No vendemos datos" },
          {
            icon: <UserCheck className="h-4 w-4" />,
            text: "Tus derechos activos",
          },
        ].map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-card px-4 py-3"
          >
            <span className="text-primary shrink-0">{icon}</span>
            <span className="text-xs font-medium text-foreground/80">
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Two-column content ───────────────────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Left — accordion with all sections ──────────────────────────── */}
        <TermCard
          icon={<ShieldCheck className="h-4 w-4" />}
          title="Sobre tus datos"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="collect">
              <AccordionTrigger className="text-sm">
                ¿Recopilamos datos en este sitio?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">No.</strong> Nuestro sitio
                  web es puramente informativo. No usamos formularios de
                  registro, newsletters ni sistemas de rastreo invasivos. No hay
                  cookies de seguimiento ni píxeles de conversión.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="purpose">
              <AccordionTrigger className="text-sm">
                ¿Para qué usamos tu información?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    Solo solicitamos la información estrictamente necesaria para
                    avanzar en tu proyecto (nombre, contacto, detalles de tu
                    negocio).
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Seguimiento comercial:
                    </strong>{" "}
                    responder tus consultas y dar seguimiento a propuestas.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Gestión del servicio:
                    </strong>{" "}
                    si trabajamos juntos, coordinamos la entrega de tu landing
                    page.
                  </li>
                  <li>Nada más. No usamos tus datos para ningún otro fin.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="third-parties">
              <AccordionTrigger className="text-sm">
                Terceros y plataformas externas
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">
                      Tu información es solo nuestra.
                    </strong>{" "}
                    No vendemos, alquilamos ni compartimos tus datos con
                    terceros.
                  </li>
                  <li>
                    Al comunicarte por WhatsApp, esa plataforma tiene sus
                    propias políticas de privacidad. Nosotros solo gestionamos
                    lo que nos escribís, no el funcionamiento de la app.
                  </li>
                  <li>
                    Lo mismo aplica a Google Meet y Zoom: usamos esas
                    herramientas para reuniones, pero no controlamos sus
                    políticas propias.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-sm">
                Seguridad de tus datos
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Mantenemos tus datos de contacto bajo medidas de seguridad
                  básicas y privadas. Solo el equipo de MCM Digital encargado de
                  tu proyecto tiene acceso a ellos. No los almacenamos en
                  sistemas públicos ni plataformas de terceros sin necesidad.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TermCard>

        {/* Right — how we get data + rights ────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <TermCard
            icon={<MessageCircle className="h-4 w-4" />}
            title="¿Cómo obtenemos tu información?"
          >
            <p className="text-xs text-muted-foreground mb-4">
              La interacción comienza solo cuando vos das el primer paso. Nunca
              recopilamos datos de forma pasiva.
            </p>
            <div className="space-y-2">
              {channels.map(({ icon, label, detail }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 px-4 py-3"
                >
                  <span className="text-primary shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-medium text-foreground/90">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </TermCard>

          <TermCard
            icon={<UserCheck className="h-4 w-4" />}
            title="Tus derechos"
          >
            <p className="text-xs text-muted-foreground mb-4">
              En cualquier momento podés ejercer estos derechos escribiéndonos
              por el mismo medio por el que nos contactaste.
            </p>
            <div className="space-y-2">
              {[
                { right: "Acceso", desc: "Saber qué datos tenemos sobre vos." },
                {
                  right: "Rectificación",
                  desc: "Pedir que corrijamos cualquier información.",
                },
                {
                  right: "Eliminación",
                  desc: "Solicitar que borremos tus datos de nuestra agenda.",
                },
              ].map(({ right, desc }) => (
                <div key={right} className="flex items-start gap-3 text-xs">
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] shrink-0">
                    {right}
                  </span>
                  <span className="text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-border/50 bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
              Contacto para derechos:{" "}
              <strong className="text-foreground">WhatsApp</strong> o al correo
              oficial de MCM Digital.
            </div>
          </TermCard>
        </div>
      </div>

      {/* ── Footer note — same as LegalTerms ────────────────────────────── */}
      <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-5">
        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Esta política puede actualizarse si cambian nuestras prácticas o
          herramientas. Cualquier cambio relevante será comunicado por los
          medios de contacto habituales. Al continuar interactuando con nosotros
          después de un cambio, se considera aceptada la nueva versión. Última
          actualización:{" "}
          <strong className="text-foreground">
            {new Date().toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
            })}
          </strong>
          .
        </p>
      </div>
    </div>
    <div className="d- flex justify-center">
      <Link
        href="/"
        className={`w-300 inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25`}
      >
        Volver al inicio
      </Link>
    </div>
  </section>
);

export default PrivacyPolicy;
