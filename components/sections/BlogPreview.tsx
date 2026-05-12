import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { client } from "@/lib/sanity";

export default async function BlogPreview() {
  const posts = await client.fetch(`
    *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, publishedAt, coverImage,
      "author": author->{ name },
      "category": category->{ title }
    }
  `);

  if (!posts.length) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Recursos para tu negocio
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="text-sm font-semibold text-accent"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </div>
    </section>
  );
}