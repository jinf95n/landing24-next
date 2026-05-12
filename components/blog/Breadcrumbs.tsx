import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-primary-foreground/50 flex-wrap">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-primary-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-primary-foreground/80">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}