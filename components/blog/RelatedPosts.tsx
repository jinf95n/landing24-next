import BlogCard from "./BlogCard";

export default function RelatedPosts({ posts }: { posts: any[] }) {
  if (!posts?.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Artículos relacionados
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}