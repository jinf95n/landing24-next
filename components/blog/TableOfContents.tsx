"use client";

import { useEffect, useState, useRef } from "react";
import { List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Heading {
  id: string;
  text: string;
  level: string;
}

function extractHeadings(body: any[]): Heading[] {
  return body
    .filter(
      (block) => block._type === "block" && ["h2", "h3"].includes(block.style),
    )
    .map((block) => {
      const text = block.children.map((c: any) => c.text).join("");
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      return { id, text, level: block.style };
    });
}

function TOCList({
  headings,
  activeId,
  onSelect,
}: {
  headings: Heading[];
  activeId: string;
  onSelect?: () => void;
}) {

  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);
  return (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          ref={activeId === heading.id ? activeRef : null}
          onClick={onSelect}
          className={`block text-sm py-1.5 border-l-2 transition-all duration-200 ${
            heading.level === "h3" ? "pl-6" : "pl-4"
          } ${
            activeId === heading.id
              ? "border-accent text-accent font-semibold"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

export default function TableOfContents({ body }: { body: any[] }) {
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headings = extractHeadings(body);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const sentinel = document.getElementById("article-end");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop */}
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block w-64 flex-shrink-0 order-first self-start sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              En este artículo
            </p>
            <TOCList headings={headings} activeId={activeId} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile botón flotante */}
      <div className="lg:hidden">
        <AnimatePresence>
          {!mobileOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setMobileOpen(true)}
              className="fixed bottom-6 left-6 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
              aria-label="Ver índice del artículo"
            >
              <List className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl p-6 shadow-2xl max-h-[70vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    En este artículo
                  </p>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <TOCList
                  headings={headings}
                  activeId={activeId}
                  onSelect={() => setMobileOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
