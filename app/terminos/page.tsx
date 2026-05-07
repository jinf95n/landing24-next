import type { Metadata } from "next";
import LegalTerms from "@/components/sections/LegalTerms";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos del servicio de Landing24 — diseño web profesional en San Juan.",
  robots: { index: false, follow: false },
};

export default function TerminosPage() {
  return <LegalTerms />;
}