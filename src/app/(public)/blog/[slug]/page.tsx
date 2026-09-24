import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
export function generateStaticParams() { return blogPosts.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; return { title: `${blogPosts.find(p=>p.slug===slug)?.title || "Rehber"} | Kuyumcu Merkezi` }; }
export default async function BlogPost({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const post=blogPosts.find(p=>p.slug===slug); if(!post) notFound();
  return <article className="editorial-page narrow-page"><Link href="/blog" className="editorial-back">← Tüm rehberler</Link><span className="simple-kicker">{post.category}</span><h1>{post.title}</h1><p className="editorial-lead">{post.description}</p><div className="editorial-cover"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 90vw, 760px" priority /></div><div className="article-body">{post.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}</div><Link className="editorial-cta" href={`/?hizmet=${post.service}`}>İhtiyacımı paylaşmak istiyorum →</Link></article>;
}
