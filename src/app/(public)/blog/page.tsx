import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
              Sektör Rehberi
            </span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl text-[#F0EDD8] mb-4">Blog</h1>
          <p className="text-[#8B8B9B] max-w-xl mx-auto leading-relaxed">
            Kuyumculuk sektörü, yatırım rehberleri ve dijital dönüşüm hakkında uzman içerikler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group glass-card rounded-2xl p-7 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#8B8B9B]">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} dk
                </div>
              </div>

              <h2 className="font-heading text-lg text-[#F0EDD8] leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors flex-1">
                {post.title}
              </h2>

              <p className="text-sm text-[#8B8B9B] leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/6">
                <span className="text-xs text-[#8B8B9B]">
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
