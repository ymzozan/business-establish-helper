import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBlogPosts } from "@/lib/blog-content";
import { BlogEditor } from "./BlogEditor";
export default async function Page() {
  if ((await auth())?.user?.role !== "ADMIN") redirect("/panel");
  const posts = await getBlogPosts(true);
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl mb-6">Blog yönetimi</h1>
      <BlogEditor
        posts={posts.map(
          ({
            slug,
            title,
            description,
            category,
            service,
            body,
            published,
          }) => ({
            slug,
            title,
            description,
            category,
            service,
            body,
            published,
          }),
        )}
      />
    </div>
  );
}
