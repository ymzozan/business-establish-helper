import { prisma } from "@/lib/db";
import { blogPosts } from "@/lib/blog-posts";
export const blogImages: Record<string, string> = {
  kurulum: "/images/kuyumcu-konsept.png",
  toptan: "/images/toptan-altin.png",
  tamirat: "/images/altin-tamirat.png",
};
export async function getBlogPosts(all = false) {
  const saved = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  const originals = blogPosts.map((p) => ({
    ...p,
    body: p.sections.map((s) => s.title + "\n" + s.text).join("\n\n"),
    published: true,
  }));
  const posts = [
    ...saved.map((p) => ({
      ...p,
      image: blogImages[p.service] || blogImages.kurulum,
    })),
    ...originals.filter((p) => !saved.some((s) => s.slug === p.slug)),
  ];
  return all ? posts : posts.filter((p) => p.published);
}
