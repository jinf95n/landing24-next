import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { MessageCircle, Clock, Calendar, User } from "lucide-react";
import BlogNavbar from "@/components/blog/BlogNavbar";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import BlogCTA from "@/components/blog/BlogCTA";

const WHATSAPP_LINK =
  "https://wa.me/5492646233326?text=Hola!%20Vi%20el%20blog%20y%20quiero%20consultar%20sobre%20mi%20sitio%20web";

// FUNCIÓN MAGICA: Convierte el Markdown de la IA en bloques de Sanity
// Función parseadora con Tipos de TS
function parseMarkdownToBlocks(content: any) {
  if (!content) return [];

  // Any Sanity PT array (block, image, file, etc.) passes through as-is
  if (Array.isArray(content) && content[0]?._type) return content;

  const text =
    typeof content === "string"
      ? content
      : content[0]?.children?.[0]?.text || "";

  return text
    .split(/\n\n+/)
    .filter((para: string) => para.trim() !== "")
    .map((para: string, index: number) => {
      const line = para.replace(/\n/g, " ").trim();
      let style = "normal";
      let cleanLine = line;

      if (line.startsWith("### ")) {
        style = "h3";
        cleanLine = line.replace("### ", "");
      } else if (line.startsWith("## ")) {
        style = "h2";
        cleanLine = line.replace("## ", "");
      } else if (line.startsWith("# ")) {
        style = "h1";
        cleanLine = line.replace("# ", "");
      }

      cleanLine = cleanLine.replace(/\*\*/g, "");

      return {
        _key: `block-${index}`,
        _type: "block",
        style: style,
        children: [{ _type: "span", text: cleanLine, marks: [] }],
        markDefs: [],
      };
    });
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).url() }]
        : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // PROCESAMOS EL CUERPO AQUÍ
  const processedBody = parseMarkdownToBlocks(post.body);

  const readingTime =
    Math.ceil(
      processedBody.reduce((acc: number, block: any) => {
        return acc + (block.children?.[0]?.text?.split(" ").length || 0);
      }, 0) / 200,
    ) || 5;

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background selection:bg-accent/30">
      <BlogNavbar />
      <section className="bg-primary pt-24 pb-32 md:pb-48">
        <div className="container max-w-5xl">
          <Breadcrumbs
            crumbs={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category?.title || "Artículo", href: "/blog" },
              { label: post.title },
            ]}
          />
          <div className="mt-8">
            {post.category && (
              <span className="inline-flex bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-bold uppercase mb-6">
                {post.category.title}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            <p className="text-primary-foreground/70 text-xl md:text-2xl mb-10 max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-primary-foreground/50">
              <span>{post.author?.name}</span>
              <span>•</span>
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{readingTime} min lectura</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container -mt-24 md:-mt-36 relative z-20">
        {post.coverImage && (
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl border-4 border-background">
            <Image
              src={urlFor(post.coverImage).width(1600).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </section>

      <section className="container py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 max-w-5xl mx-auto">
          <aside className="lg:w-64 shrink-0 order-2 lg:order-1">
            <div className="sticky top-28">
              {processedBody.some((b: any) =>
                ["h2", "h3"].includes(b.style),
              ) && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                  <p className="font-bold uppercase tracking-widest text-slate-400 mb-4 text-[10px]">
                    Contenido
                  </p>
                  <TableOfContents body={processedBody} />
                </div>
              )}
            </div>
          </aside>

          <article className="flex-1 min-w-0 order-1 lg:order-2">
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900">
              {/* Usamos el renderer original con los bloques procesados */}
              <PortableTextRenderer content={processedBody} />
            </div>
            <div className="my-16">
              <BlogCTA />
            </div>
            <div className="pt-12 border-t">
              {post.author && <AuthorCard author={post.author} />}
            </div>
            {/* CTA Final */}
            <div className="mt-16 p-10 bg-slate-900 rounded-[2.5rem] text-center text-white">
              <h3 className="text-3xl font-black mb-4">
                ¿Querés un sitio web profesional?
              </h3>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-accent text-accent-foreground font-bold px-10 py-4 rounded-2xl"
              >
                Hablar con un asesor
              </a>
            </div>
          </article>
        </div>
        <div className="max-w-5xl mx-auto mt-24 border-t pt-16">
          <RelatedPosts posts={post.relatedPosts} />
        </div>
      </section>
    </main>
  );
}
