"use client";

import { useState } from "react";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { Plus, Trash2, Eye, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Eğitim",
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.title
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();

    const newPost: BlogPost = {
      id: String(Date.now()),
      slug,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      readingTime: Math.ceil(form.content.split(" ").length / 200),
      date: new Date().toISOString().split("T")[0],
      author: "Admin",
    };

    setPosts([newPost, ...posts]);
    setForm({ title: "", excerpt: "", content: "", category: "Eğitim" });
    setShowForm(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-[#F0EDD8] text-sm placeholder:text-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-[#F0EDD8]">Blog Yönetimi</h1>
          <p className="text-sm text-[#8B8B9B] mt-1">{posts.length} yazı mevcut</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-all"
        >
          <Plus className="w-4 h-4" />
          Yeni Yazı
        </button>
      </div>

      {/* New Post Form */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 border border-[#D4AF37]/20">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="text-sm font-semibold text-[#F0EDD8]">Yeni Blog Yazısı</h2>
          </div>
          <form onSubmit={handlePublish} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Başlık</label>
                <input
                  type="text"
                  required
                  placeholder="Blog yazısı başlığı..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`${inputClass} cursor-pointer`}
                >
                  {["Eğitim", "Yatırım", "Teknoloji", "Sektör", "Rehber"].map((c) => (
                    <option key={c} value={c} className="bg-[#0F1018]">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Kısa Özet</label>
                <input
                  type="text"
                  required
                  placeholder="Kısa özet..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">İçerik</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Blog içeriği (## için başlık, - için liste kullanabilirsiniz)..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-all"
              >
                Yayınla
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-xl border border-white/12 text-sm text-[#8B8B9B] hover:text-[#F0EDD8] hover:border-white/20 transition-all"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
      <div className="glass-card rounded-2xl border border-white/8 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/6">
          <h2 className="text-sm font-semibold text-[#F0EDD8]">Yayındaki Yazılar</h2>
        </div>
        <div>
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`flex items-center justify-between px-6 py-4 ${i < posts.length - 1 ? "border-b border-white/4" : ""} hover:bg-white/2 transition-colors`}
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-[#F0EDD8] truncate">{post.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[#D4AF37]/70">{post.category}</span>
                  <span className="text-xs text-[#8B8B9B]">{post.readingTime} dk</span>
                  <span className="text-xs text-[#8B8B9B]">
                    {new Date(post.date).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg text-[#8B8B9B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 transition-all"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setPosts(posts.filter((p) => p.id !== post.id))}
                  className="p-2 rounded-lg text-[#8B8B9B] hover:text-red-400 hover:bg-red-400/8 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
