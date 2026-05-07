"use client";

import { useState, useEffect } from "react";

interface ConversionState {
  hasScrolled: boolean;
  hasInteracted: boolean;
  hasSeenCotizador: boolean;
  hasSubmittedCotizador: boolean;
  timeOnPage: number;
  scrollDepth: number;
  showStickyBar: boolean;
  showFloatingBubble: boolean;
  showExitModal: boolean;
}

export const useConversionOrchestrator = () => {
  const [state, setState] = useState<ConversionState>({
    hasScrolled: false,
    hasInteracted: false,
    hasSeenCotizador: false,
    hasSubmittedCotizador: false,
    timeOnPage: 0,
    scrollDepth: 0,
    showStickyBar: false,
    showFloatingBubble: false,
    showExitModal: false,
  });

  const stickyDismissed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("sticky_dismissed") === "true";
  const modalDismissed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("modal_dismissed") === "true";

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({ ...prev, timeOnPage: prev.timeOnPage + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const depth = Math.round((scrolled / window.innerHeight) * 100);
      setState((prev) => ({
        ...prev,
        hasScrolled: scrolled > 100,
        scrollDepth: depth,
      }));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState((prev) => ({
            ...prev,
            hasSeenCotizador: true,
            showStickyBar: false,
            showFloatingBubble: false,
          }));
        }
      },
      { threshold: 0.3 }
    );
    const cotizador = document.getElementById("cotizador");
    if (cotizador) observer.observe(cotizador);
    return () => {
      if (cotizador) observer.unobserve(cotizador);
    };
  }, []);

  useEffect(() => {
    if (stickyDismissed || state.hasSeenCotizador) return;
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, showStickyBar: true }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.hasSeenCotizador, stickyDismissed]);

  useEffect(() => {
    if (state.hasScrolled && !state.hasSeenCotizador) {
      setState((prev) => ({ ...prev, showFloatingBubble: true }));
    } else {
      setState((prev) => ({ ...prev, showFloatingBubble: false }));
    }
  }, [state.hasScrolled, state.hasSeenCotizador]);

  useEffect(() => {
    if (modalDismissed || state.hasSubmittedCotizador || window.innerWidth < 768) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !state.hasSubmittedCotizador) {
        setState((prev) => ({ ...prev, showExitModal: true }));
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [state.hasSubmittedCotizador, modalDismissed]);

  const dismissStickyBar = () => {
    setState((prev) => ({ ...prev, showStickyBar: false }));
    sessionStorage.setItem("sticky_dismissed", "true");
  };

  const dismissExitModal = () => {
    setState((prev) => ({ ...prev, showExitModal: false }));
    sessionStorage.setItem("modal_dismissed", "true");
  };

  const markInteraction = () => {
    setState((prev) => ({ ...prev, hasInteracted: true }));
  };

  const markCotizadorSubmitted = () => {
    setState((prev) => ({
      ...prev,
      hasSubmittedCotizador: true,
      showExitModal: false,
    }));
  };

  const scrollToCotizador = () => {
    markInteraction();
    document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    state,
    dismissStickyBar,
    dismissExitModal,
    markInteraction,
    markCotizadorSubmitted,
    scrollToCotizador,
  };
};