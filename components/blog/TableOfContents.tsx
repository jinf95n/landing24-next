"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: string;
}

function extractHeadings(body: any[]): Heading[] {
  return body
    .filter((block) => block._type === "block" && ["h2", "h3"].includes(block.style))
    .map((block) => ({
      id: block.children[0].text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      text: block.children.map((c: any) => c.text).join(""),
      level: block.style,
    }));
}

export default function TableOfContents({ body }: { body: any[] }) {
  const [activeId, setActiveId] = useState("");
  const headings = extractHeadings(body);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28 space-y-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        En este artículo
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block text-sm py-1 border-l-2 transition-all duration-200 ${
            heading.level === "h3" ? "pl-6" : "pl-4"
          } ${
            activeId === heading.id
              ? "border-accent text-accent font-medium"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}