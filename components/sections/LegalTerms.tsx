"use client";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, CreditCard, Clock, MessageCircle, FileCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

type SlaRow = { level: "P1"|"P2"|"P3"; label: string; color: string; definition: string; response: string; channel: string; };

const sla: SlaRow[] = [
  { level: "P1", label: "Crítico",   color: "#ef4444", definition: "Sitio caído u offline. Error 500/404. Dominio no resuelve. SSL vencido.", response: "< 4 horas (guardia activa)", channel: 'WhatsApp — keyword "URGENCIA"' },
  { level: "P2", label: "Estándar",  color: "#f59e0b", definition: "Cambios de contenido: textos, precios, fotos, horarios, datos de contacto.", response: "24 a 48 hs hábiles", channel: "WhatsApp" },
  { level: "P3", label: "Excluido",  color: "#6b7280", definition: "Problemas ajenos al sitio: WiFi, correo, redes sociales, hardware.", response: "No aplica", channel: "Se informa amablemente" },
];

const TermCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border/50 bg-card p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <h3 className="font-semibold text-base text-foreground">{title}</h3>
    </div>
    {children}
  </div>
);

const LegalTerms = () => (
  <section id="terminos" className="py-16 px-4 bg-background">
    <div className="container max-w-4xl mx-auto">

      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Marco legal</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Términos del servicio</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          Al abonar el desarrollo o la primera cuota de mantenimiento, el cliente acepta las condiciones detalladas a continuación.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: <FileCheck className="h-4 w-4" />,     text: "El sitio es tuyo" },
          { icon: <ShieldCheck className="h-4 w-4" />,   text: "Sin permanencia" },
          { icon: <CreditCard className="h-4 w-4" />,    text: "Mantenimiento opcional" },
          { icon: <MessageCircle className="h-4 w-4" />, text: "Soporte por WhatsApp" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-card px-4 py-3">
            <span className="text-primary shrink-0">{icon}</span>
            <span className="text-xs font-medium text-foreground/80">{text}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">

        {/* Terms accordion */}
        <TermCard icon={<ShieldCheck className="h-4 w-4" />} title="Términos clave">
          <Accordion type="single" collapsible>
            <AccordionItem value="ownership">
              <AccordionTrigger className="text-sm">Propiedad del sitio</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">El sitio es 100% tuyo</strong> desde el momento en que se entrega, sin condiciones de uso ni licencias que lo limiten.</li>
                  <li>El dominio se registra a nombre del cliente. Lo pagás y administrás vos directamente.</li>
                  <li>Si decidís no continuar con el mantenimiento, el sitio sigue siendo tuyo y podés trasladarlo al proveedor que prefieras.</li>
                  <li>El cliente declara poseer derechos sobre el contenido (textos, fotos, logos) provisto para el sitio.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="billing">
              <AccordionTrigger className="text-sm">Pagos y cancelación</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>El desarrollo se abona según lo acordado al inicio del proyecto.</li>
                  <li>El mantenimiento mensual es <strong className="text-foreground">opcional</strong> y se abona por adelantado entre el día 1 y 10 de cada mes.</li>
                  <li>Podés dar de baja el mantenimiento cuando quieras, sin permanencia ni penalidad, avisando con 30 días de anticipación.</li>
                  <li>Los precios del mantenimiento pueden ajustarse con 15 días de preaviso.</li>
                  <li>No se realizan devoluciones una vez iniciado el desarrollo.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger className="text-sm">Privacidad y datos</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>El cliente es responsable del cumplimiento de la normativa de protección de datos aplicable a su actividad.</li>
                  <li>Se aplican medidas técnicas de seguridad estándar. No se garantiza invulnerabilidad absoluta ante ataques externos.</li>
                  <li>No compartimos datos del cliente con terceros salvo requerimiento legal.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exclusions">
              <AccordionTrigger className="text-sm">Qué no está incluido</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Desarrollos nuevos o rediseños estructurales (se cotizan aparte).</li>
                  <li>Campañas publicitarias ni posicionamiento SEO avanzado.</li>
                  <li>Soporte de hardware, correo en celular, redes sociales o plataformas externas.</li>
                  <li>No se garantizan resultados comerciales ni de posicionamiento.</li>
                  <li>No cubre daños derivados de información incorrecta o negligencia del cliente.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TermCard>

        {/* SLA */}
        <TermCard icon={<Clock className="h-4 w-4" />} title="Soporte y tiempos de respuesta">
          <p className="text-xs text-muted-foreground mb-4">
            El soporte aplica a clientes con mantenimiento activo. Los tiempos son orientativos; la resolución puede depender de proveedores externos.
          </p>

          <div className="rounded-lg border border-border/50 overflow-hidden mb-4">
            <div className="grid grid-cols-12 bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
              <div className="col-span-2">Nivel</div>
              <div className="col-span-5">Situación</div>
              <div className="col-span-5">Respuesta</div>
            </div>
            {sla.map((row) => (
              <div key={row.level} className="grid grid-cols-12 gap-1 border-t border-border/50 px-3 py-3 text-xs items-start">
                <div className="col-span-2">
                  <span className="inline-block px-1.5 py-0.5 rounded text-white font-bold text-[10px]" style={{ background: row.color }}>
                    {row.level}
                  </span>
                </div>
                <div className="col-span-5">
                  <p className="font-medium text-foreground/90 mb-0.5">{row.label}</p>
                  <p className="text-muted-foreground leading-snug">{row.definition}</p>
                </div>
                <div className="col-span-5">
                  <p className="text-foreground/80 font-medium">{row.response}</p>
                  <p className="text-muted-foreground mt-0.5">{row.channel}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border/50 bg-muted/20 px-4 py-3 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground/80 mb-1">Backups (clientes con mantenimiento)</p>
            <p>• Se realizan backups periódicos automáticos del sitio.</p>
            <p>• La continuidad del hosting depende del pago regular del mantenimiento.</p>
            <p>• Al dar de baja, gestionamos la entrega del sitio para que puedas migrarlo.</p>
          </div>
        </TermCard>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-5">
        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Estos términos rigen a partir de la aceptación del presupuesto o el primer pago. Cualquier duda sobre el alcance debe consultarse <strong className="text-foreground">antes</strong> de contratar. Jurisdicción: los tribunales ordinarios del domicilio del prestador.
        </p>
      </div>

      <div className="d- flex justify-center">
        <Link href="/" className={`w-300 inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25`}>
          Volver al inicio
        </Link>
      </div>

    </div>
  </section>
);

export default LegalTerms;