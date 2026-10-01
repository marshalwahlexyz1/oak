import { ArrowRight, BadgeCheck, Calendar, FileText, Mic, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  detail: string;
  tags: string[];
  kind: string;
  venue: string;
  status: string;
  ctaLabel: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
  className?: string;
}

const cardStyles = {
  award: {
    label: "Award",
    icon: Trophy,
    shell: "from-primary via-primary to-accent",
  },
  paper: {
    label: "Paper",
    icon: FileText,
    shell: "from-slate-900 via-primary to-teal-700",
  },
  talk: {
    label: "Talk",
    icon: Mic,
    shell: "from-amber-700 via-primary to-slate-900",
  },
  event: {
    label: "Event",
    icon: Users,
    shell: "from-ink via-primary to-signal/80",
  },
  role: {
    label: "Role",
    icon: BadgeCheck,
    shell: "from-[#d97757] via-[#8a4532] to-ink",
  },
} as const;

export function BlogCard({ post, index, featured = false, className }: BlogCardProps) {
  const style = cardStyles[post.kind as keyof typeof cardStyles] ?? cardStyles.paper;
  const Icon = style.icon;

  return (
    <Reveal delay={index * 70} className={cn("h-full", className)}>
      <article className="group h-full overflow-hidden rounded-[28px] border border-border/60 bg-white/90 shadow-lg shadow-slate-900/5 transition-[transform,box-shadow] duration-300 ease-out-strong hover:-translate-y-1 hover:shadow-2xl">
        <div className={cn("relative overflow-hidden bg-gradient-to-br p-6 text-white", style.shell, featured && "md:p-8")}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_42%)]"></div>
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  {style.label}
                </p>
                <p className="text-sm text-white/80">{post.venue}</p>
              </div>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              {post.status}
            </span>
          </div>

          <h3 className={cn("relative z-10 mt-8 font-bold leading-tight text-white", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
            {post.title}
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mb-5 line-clamp-4 text-muted-foreground">{post.excerpt}</p>

          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
              {post.detail}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <span>{post.ctaLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
