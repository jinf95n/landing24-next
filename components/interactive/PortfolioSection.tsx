"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { demos, CATEGORY_LABELS, type CategoryKey } from "@/lib/Portfoliodata";
import Image from "next/image";

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState<CategoryKey>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // Resetear página al cambiar de categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  const categories = useMemo<CategoryKey[]>(() => {
    const keys = Array.from(new Set(demos.map((d) => d.categoryKey)));
    return ["all", ...keys];
  }, []);

  const filtered = useMemo(
    () =>
      active === "all" ? demos : demos.filter((d) => d.categoryKey === active),
    [active],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedDemos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const animateProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="py-20 md:py-28 bg-muted/30" id="demos" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          {...animateProps()}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Demos en Acción
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Explora nuestros desarrollos{" "}
            <span className="text-accent">
              según la industria y el rubro de tu negocio.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecciona una categoría y abre cada demo en una pestaña nueva para
            visualizar la experiencia completa.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          {...animateProps(0.1)}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all border ${
                active === key
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/70 text-foreground border-border hover:bg-background"
              }`}
            >
              {CATEGORY_LABELS[key]}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {paginatedDemos.map((demo, i) => (
            <motion.div
              key={`${demo.title}-${demo.href}`}
              {...animateProps(0.08 * i)}
              className="rounded-2xl border border-border/60 bg-background/70 overflow-hidden"
            >
              <a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={demo.cover}
                    alt={demo.summary || demo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                        {CATEGORY_LABELS[demo.categoryKey]}
                      </span>
                      {demo.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="hidden sm:inline-flex rounded-full bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 text-base sm:text-lg font-semibold text-white leading-snug line-clamp-1">
                      {demo.title}
                    </h3>
                  </div>
                </div>
              </a>

              <div className="p-5">
                {demo.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {demo.summary}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    Ver demo <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div
            {...animateProps(0.2)}
            className="flex items-center justify-center gap-3 mt-12"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-full px-5 py-2 text-sm font-semibold border bg-background/70 text-foreground border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              ← Anterior
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-full w-9 h-9 flex items-center justify-center text-sm font-semibold border transition-all ${
                      currentPage === page
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background/70 text-foreground border-border hover:bg-background"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-full px-5 py-2 text-sm font-semibold border bg-background/70 text-foreground border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              Siguiente →
            </button>
          </motion.div>
        )}

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Nota: Los proyectos presentados son prototipos funcionales sujetos a
          actualizaciones y ajustes de diseño según los requerimientos finales.
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;
