import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useBlog } from "@/hooks/use-portfolio";

const KIND: Record<string, string> = {
  award: "Award",
  paper: "Paper",
  talk: "Talk",
  event: "Event",
  role: "Role",
};

// One hairline row per item: date, kind, title and venue, status.
export function NewsList() {
  const { data: posts } = useBlog();

  return (
    <section id="news" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader index="04" kicker="News" title="Latest" />
        <ol className="border-b border-foreground/15">
          {posts.map((post, idx) => (
            <Reveal
              as="li"
              key={post.id}
              delay={Math.min(idx, 4) * 50}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-foreground/15 py-5 md:grid-cols-[11rem_6rem_1fr_7rem] md:items-baseline md:gap-x-6"
            >
              <span className="label text-foreground/55">{post.date}</span>
              <span className="label flex items-center gap-2 justify-self-end md:justify-self-start">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {KIND[post.kind] ?? "Update"}
              </span>
              <div className="col-span-2 md:col-span-1">
                <p className="text-[17px] font-bold leading-snug">{post.title}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-foreground/60">{post.excerpt}</p>
                <p className="label mt-2 text-foreground/45">{post.venue}</p>
              </div>
              <span className="label hidden text-right text-foreground/55 md:block">{post.status}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
