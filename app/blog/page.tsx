import { getAllPosts } from "@/lib/blog";
import BlogCard from "../(marketing)/_components/BlogCard";

export const metadata = { title: "Blog — Rada" };

export default function BlogIndex() {
  const posts = getAllPosts().map((p) => p.meta);
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Blog</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {posts.map((meta) => (
          <BlogCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </main>
  );
}


