import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
export const metadata = { title: "Blog & Rehberler | Kuyumcu Merkezi" };
export default function BlogPage() {
  return (
    <section className="editorial-page">
      <span className="simple-kicker">BLOG & REHBERLER</span>
      <h1>
        Biraz ilham.
        <br />
        Bir sonraki adım için.
      </h1>
      <p className="editorial-lead">
        Mağazanız, koleksiyonunuz ve takılarınız için kısa notlar.
      </p>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-photo">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 700px) 90vw, 300px"
              />
            </div>
            <span>{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <small>Rehberi oku →</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
