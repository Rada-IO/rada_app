import Link from "next/link";
import Image from "next/image";
import type { BlogFrontmatter } from "@/lib/blog";

export default function BlogCard({ meta }: { meta: BlogFrontmatter }) {
  return (
    <article className="rounded-2xl bg-white/90 dark:bg-neutral-900/90 shadow-sm ring-1 ring-black/5 hover:shadow-md transition overflow-hidden">
      <Link href={`/blog/${meta.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] bg-neutral-100 dark:bg-neutral-800">
          <Image src={meta.cover || "/og-image.png"} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={false} />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold">{meta.title}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{meta.summary}</p>
          <p className="mt-3 text-xs text-gray-500">{new Date(meta.date).toLocaleDateString()}</p>
        </div>
      </Link>
    </article>
  );
}


