import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function AuthorCard({ author }: { author: any }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-2xl border border-border mt-12">
      {author.image && (
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={urlFor(author.image).width(128).url()}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <p className="font-bold text-foreground">{author.name}</p>
        <p className="text-sm text-accent mb-2">{author.role}</p>
        {author.bio && (
          <p className="text-sm text-muted-foreground">{author.bio}</p>
        )}
      </div>
    </div>
  );
}