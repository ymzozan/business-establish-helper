import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import B2BContactForm from "@/components/landing/B2BContactForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog'a Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#8B8B9B]">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} dakika okuma
              </div>
              <span className="text-xs text-[#8B8B9B]">
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] leading-tight mb-8">
              {post.title}
            </h1>

            <div
              className="prose prose-invert prose-gold max-w-none"
              style={{
                color: "#8B8B9B",
                lineHeight: "1.8",
              }}
            >
              {post.content.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="font-heading text-xl text-[#F0EDD8] mt-8 mb-4"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <p key={i} className="font-semibold text-[#F0EDD8] mt-4 mb-2">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={i} className="flex items-start gap-2.5 my-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0 mt-2.5" />
                      <span className="text-sm text-[#8B8B9B] leading-relaxed">
                        {line.replace("- ", "")}
                      </span>
                    </div>
                  );
                }
                if (line.trim() === "" || line.startsWith("|")) return null;
                return (
                  <p key={i} className="text-[#8B8B9B] leading-relaxed mb-4 text-sm">
                    {line}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* CTA Form */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#F0EDD8]">Ücretsiz Danışmanlık</span>
              </div>
              <B2BContactForm inline />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xs font-semibold text-[#F0EDD8] uppercase tracking-wider mb-5">
                  Benzer Yazılar
                </h3>
                <div className="flex flex-col gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group flex items-start gap-3 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]/70 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm text-[#F0EDD8] leading-snug group-hover:text-[#D4AF37] transition-colors">
                          {r.title}
                        </p>
                        <p className="text-xs text-[#8B8B9B] mt-1">{r.readingTime} dk okuma</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
