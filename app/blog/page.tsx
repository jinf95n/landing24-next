import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries";
import BlogCard from "@/components/blog/BlogCard";
import BlogNavbar from "@/components/blog/BlogNavbar";

export const metadata: Metadata = {
  title: "Blog — Diseño Web y Presencia Digital",
  description: "Artículos sobre diseño web, SEO y presencia digital para negocios en San Juan y todo el país.",
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  // Filtrado lógico
  const filteredPosts = category
    ? allPosts.filter((post: any) => post.category?.slug?.current === category)
    : allPosts;

  return (
    <main className="min-h-screen bg-background">
      <BlogNavbar />
      <section className="bg-primary pt-32 pb-20">
        <div className="container text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mt-3 mb-4 italic">
            Recursos para tu negocio digital
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            Guías, consejos y casos reales sobre presencia digital, SEO y diseño web.
          </p>
        </div>
      </section>

      <section className="container py-16">
        {/* Filtros de Categoría */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <Link
              href="/blog"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                !category 
                ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20" 
                : "bg-muted text-muted-foreground border-transparent hover:border-muted-foreground/20"
              }`}
            >
              Todos
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog?category=${cat.slug.current}`}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  category === cat.slug.current
                    ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                    : "bg-muted text-muted-foreground border-transparent hover:border-muted-foreground/20"
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-muted-foreground font-medium">
              No hay artículos en esta categoría todavía.
            </p>
            <Link href="/blog" className="text-accent font-bold mt-4 inline-block hover:underline">Ver todos los posts</Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}