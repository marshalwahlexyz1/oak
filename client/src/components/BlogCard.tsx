import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Mic, Trophy } from "lucide-react";

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
} as const;

export function BlogCard({ post, index }: BlogCardProps) {
  const style = cardStyles[post.kind as keyof typeof cardStyles] ?? cardStyles.paper;
  const Icon = style.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group overflow-hidden rounded-[28px] border border-border/60 bg-white/90 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${style.shell} p-6 text-white`}>
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

        <h3 className="relative z-10 mt-8 text-2xl font-bold leading-tight text-white">
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

        <div className="flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
          <span>{post.ctaLabel}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.article>
  );
}
