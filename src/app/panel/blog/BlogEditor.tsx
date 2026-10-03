"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  service: string;
  body: string;
  published: boolean;
};
const blank: Post = {
  slug: "",
  title: "",
  description: "",
  category: "REHBER",
  service: "kurulum",
  body: "",
  published: false,
};
export function BlogEditor({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [post, setPost] = useState<Post>(blank),
    [editing, setEditing] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const { slug, ...data } = post;
      const res = await fetch("/api/blog/" + encodeURIComponent(slug), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const r = await res.json();
      setMessage(res.ok ? "Yazı kaydedildi." : r.error);
      if (res.ok) {
        setEditing(true);
        router.refresh();
      }
    } catch {
      setMessage("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <div className="blog-admin-list">
        <button
          disabled={busy}
          onClick={() => {
            setPost(blank);
            setEditing(false);
            setMessage("");
          }}
        >
          + Yeni yazı
        </button>
        {posts.map((p) => (
          <button
            disabled={busy}
            key={p.slug}
            onClick={() => {
              setPost(p);
              setEditing(true);
              setMessage("");
            }}
          >
            {p.title}
            <small>{p.published ? "Yayında" : "Taslak"}</small>
          </button>
        ))}
      </div>
      <form className="management-form" onSubmit={save}>
        <fieldset disabled={busy}>
          <section>
            <h2>{editing ? "Yazıyı düzenle" : "Yeni blog yazısı"}</h2>
            <label>
              Bağlantı adı
              <input
                required
                disabled={editing}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="ornek-yazi"
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
              />
            </label>
            {(["title", "description", "category"] as const).map((key, i) => (
              <label key={key}>
                {["Başlık", "Kısa açıklama", "Kategori"][i]}
                <input
                  required
                  value={post[key]}
                  onChange={(e) => setPost({ ...post, [key]: e.target.value })}
                />
              </label>
            ))}
            <label>
              Kapak görseli ve hizmet
              <select
                value={post.service}
                onChange={(e) => setPost({ ...post, service: e.target.value })}
              >
                <option value="kurulum">Mağaza kurulumu</option>
                <option value="toptan">Toptan altın</option>
                <option value="tamirat">Tamirat</option>
              </select>
            </label>
            <label>
              Yazı içeriği
              <textarea
                required
                rows={14}
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
              />
            </label>
            <p>
              Paragrafları boş satırla ayırın. Metin güvenli biçimde düz yazı
              olarak gösterilir.
            </p>
            <label className="check-label">
              <input
                type="checkbox"
                checked={post.published}
                onChange={(e) =>
                  setPost({ ...post, published: e.target.checked })
                }
              />
              Sitede yayımla (kapatırsanız taslağa döner)
            </label>
          </section>
        </fieldset>
        <p role="status">{message}</p>
        <button disabled={busy} className="management-button">
          {busy ? "Kaydediliyor…" : "Yazıyı kaydet"}
        </button>
      </form>
    </div>
  );
}
