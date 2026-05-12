import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { Link } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
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
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const readingTime = Math.ceil(
    post.body?.reduce((acc: number, block: any) => {
      if (block._type === "block") {
        return acc + block.children?.map((c: any) => c.text).join("").split(" ").length;
      }
      return acc;
    }, 0) / 200
  ) || 5;

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary pt-24 pb-12">
        <div className="container max-w-4xl">
          {post.category && (
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              {post.category.title}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mt-3 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{publishedDate}</span>
            <span>·</span>
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1400).url()}
            alt={post.coverImage.alt || post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="container py-16">
        <div className="flex gap-16 max-w-6xl mx-auto">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <PortableTextRenderer content={post.body} />
            {post.author && <AuthorCard author={post.author} />}

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary rounded-2xl text-center">
              <h3 className="text-2xl font-black text-primary-foreground mb-3">
                ¿Querés un sitio web profesional?
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                Te lo entregamos funcionando en 24 horas.
              </p>
              <Link
                href="/#cotizador"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-xl hover:bg-accent/90 transition-colors"
              >
                Cotizar mi sitio
              </Link>
            </div>
          </article>

          {/* TOC */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents body={post.body} />
          </aside>
        </div>

        <div className="max-w-6xl mx-auto">
          <RelatedPosts posts={post.relatedPosts} />
        </div>
      </section>
    </main>
  );
}