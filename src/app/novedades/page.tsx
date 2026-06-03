import type { Metadata } from "next";
import { NEWS } from "@/content/news";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Comunicados e información institucional de OSPIQYP para sus afiliados.",
};

export default function NovedadesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Novedades</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          Información institucional y comunicados para nuestros afiliados.
        </p>
      </div>

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
