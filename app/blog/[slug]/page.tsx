import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { MessageCircle } from "lucide-react";
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
    <main className="min-h-screen bg-background">
      <BlogNavbar />
      {/* Hero */}
      <section className="bg-primary pt-24 pb-12">
        <div className="container max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category?.title || "Artículo", href: "/blog" },
              { label: post.title },
            ]}
          />
          {post.category && (
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {post.category.title}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mt-3 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{publishedDate}</span>
            <span>·</span>
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
      </section>

      {/* Cover image — FUERA del container */}
      {post.coverImage && (
        <div className="relative w-full h-[240px] sm:h-[380px] lg:h-[500px] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1400).url()}
            alt={post.coverImage.alt || post.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}
      {/* Content */}
      <section className="container py-16">
        <div className="flex gap-16 max-w-4xl mx-auto">
          {/* TOC */}
          {post.body?.some((b: any) => ["h2", "h3"].includes(b.style)) && (
            <TableOfContents body={post.body} />
          )}
          <article className="flex-1 min-w-0">
            <PortableTextRenderer content={post.body} />
            {/* CTA inline */}
            <BlogCTA />

            {post.author && <AuthorCard author={post.author} />}

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary rounded-2xl text-center">
              <h3 className="text-2xl font-black text-primary-foreground mb-3">
                ¿Querés un sitio web profesional?
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                Te lo entregamos funcionando en 24 horas.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-xl hover:bg-accent/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Hablar con un asesor
              </a>
            </div>
          </article>
        </div>

        <div className="max-w-4xl mx-auto">
          <RelatedPosts posts={post.relatedPosts} />
        </div>
      </section>
    </main>
  );
}
