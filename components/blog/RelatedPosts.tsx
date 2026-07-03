import BlogCard from "./BlogCard";

export default function RelatedPosts({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">
          Seguir leyendo
        </h3>
        <div className="h-px flex-1 bg-slate-100 ml-8 hidden md:block" />
      </div>

      {/* Slider en mobile, Grid en Desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
        {posts.slice(0, 3).map((post: any) => (
          <div 
            key={post._id} 
            className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center"
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}