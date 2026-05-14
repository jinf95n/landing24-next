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

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

const WHATSAPP_LINK =
  "https://wa.me/5492646233326?text=Hola!%20Vi%20el%20blog%20y%20quiero%20consultar%20sobre%20mi%20sitio%20web";

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

  const readingTime =
    Math.ceil(
      post.body?.reduce((acc: number, block: any) => {
        if (block._type === "block") {
          return (
            acc +
            block.children
              ?.map((c: any) => c.text)
              .join("")
              .split(" ").length
          );
        }
        return acc;
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

      {/* --- HERO SECTION --- */}
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
              <span className="inline-flex items-center bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 text-accent">
                  <User className="w-4 h-4" />
                </div>
                <span>{post.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COVER IMAGE (OVERLAP) --- */}
      <section className="container -mt-24 md:-mt-36 relative z-20">
        {post.coverImage && (
          <div className="relative w-full max-w-5xl mx-auto group">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-background">
              <Image
                src={urlFor(post.coverImage).width(1600).url()}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 max-w-5xl mx-auto">
          
          {/* Sidebar: Table of Contents */}
          <aside className="lg:w-64 shrink-0 order-2 lg:order-1">
            <div className="sticky top-28">
              {post.body?.some((b: any) => ["h2", "h3"].includes(b.style)) && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contenido</p>
                  <TableOfContents body={post.body} />
                </div>
              )}
            </div>
          </aside>

          {/* Article Body */}
          <article className="flex-1 min-w-0 order-1 lg:order-2">
            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-3xl prose-img:shadow-lg
              prose-strong:text-slate-900">
              <PortableTextRenderer content={post.body} />
            </div>

            {/* In-content CTA */}
            <div className="my-16">
              <BlogCTA />
            </div>

            {/* Author Section */}
            <div className="pt-12 border-t border-slate-100">
              {post.author && <AuthorCard author={post.author} />}
            </div>

            {/* Bottom Final CTA */}
            <div className="mt-16 p-8 md:p-12 bg-slate-900 rounded-[2.5rem] text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  ¿Querés un sitio web profesional?
                </h3>
                <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                  Te lo entregamos funcionando en 24 horas con la mejor tecnología.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-accent/20"
                >
                  <MessageCircle className="w-6 h-6" />
                  Hablar con un asesor
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Footer: Related Posts */}
        <div className="max-w-5xl mx-auto mt-24 border-t border-slate-100 pt-16">
          <RelatedPosts posts={post.relatedPosts} />
        </div>
      </section>
    </main>
  );
}