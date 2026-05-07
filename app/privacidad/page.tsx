import type { Metadata } from "next";
import PrivacyPolicy from "@/components/sections/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Fábrica Digital — San Juan, Argentina.",
  robots: { index: false, follow: false },
};

export default function PrivacidadPage() {
  return <PrivacyPolicy />;
}