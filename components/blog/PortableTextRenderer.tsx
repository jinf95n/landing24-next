"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => {
      const id = children[0]
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      return (
        <h2
          id={id}
          className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id = children[0]
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      return (
        <h3
          id={id}
          className="text-xl font-bold text-foreground mt-8 mb-3 scroll-mt-24"
        >
          {children}
        </h3>
      );
    },
    normal: ({ children }: any) => (
      <p className="text-foreground/80 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 my-6 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-foreground/80">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground/80">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline hover:text-accent/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({ content }: { content: any }) {
  return (
    <div className="prose-custom">
      <PortableText value={content} components={components} />
    </div>
  );
}
