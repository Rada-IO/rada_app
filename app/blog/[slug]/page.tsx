import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      title: meta.title,
      description: meta.summary,
      images: meta.cover ? [{ url: meta.cover, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: meta.cover ? [meta.cover] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/blog" className="text-sm underline">← Back to blog</Link>
      <article className="mt-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{new Date(meta.date).toLocaleDateString()}</p>
        <div className="prose prose-neutral dark:prose-invert max-w-none mt-6">
          {/* Render MDX content */}
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}


