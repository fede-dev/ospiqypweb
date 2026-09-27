import type { Metadata } from "next";
import { NEWS } from "@/content/news";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/novedades",
  title: "Novedades",
  description:
    "Comunicados e información institucional de OSPIQYP para sus afiliados.",
});

export default function NovedadesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <PageHeader
        title="Novedades"
        description="Información institucional y comunicados para nuestros afiliados."
        className="mb-12"
      />

      <div className="space-y-6 max-w-3xl">
        {NEWS.map((item) => (
          <article
            key={item.slug}
            id={item.slug}
            className="p-6 md:p-8 bg-white border border-[color:var(--color-border)] rounded-xl scroll-mt-24"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600 mb-2">
              {item.date}
            </p>
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <div className="space-y-3 text-[color:var(--color-fg-soft)] leading-relaxed">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
