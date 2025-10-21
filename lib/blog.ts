import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  summary: string;
  date: string; // ISO
  slug: string;
  tags?: string[];
  cover?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): { meta: BlogFrontmatter; content: string }[] {
  const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")) : [];
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const meta = data as BlogFrontmatter;
    return { meta, content };
  });
  return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data as BlogFrontmatter, content };
}


