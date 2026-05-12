import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Diseño Web y Presencia Digital",
  description:
    "Artículos sobre diseño web, SEO y presencia digital para negocios en San Juan y todo el país.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary py-20">
        <div className="container text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mt-3 mb-4">
            Recursos para tu negocio digital
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            Guías, consejos y casos reales sobre presencia digital, SEO y
            diseño web para negocios argentinos.
          </p>
        </div>
      </section>

      <section className="container py-16">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat: any) => (
              <span
                key={cat._id}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            Próximamente los primeros artículos.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}