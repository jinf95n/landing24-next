import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function BlogCard({ post }: { post: any }) {
  const readingTime = Math.ceil(post.excerpt?.split(" ").length / 200) || 3;

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {post.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(600).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          {post.category && (
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">
              {post.category.title}
            </span>
          )}
          <h3 className="text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.author?.name}</span>
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
      </div>
    </Link>
  );
}