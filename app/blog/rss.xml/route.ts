import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const items = getAllPosts();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rada Blog</title>
    <link>${origin}/blog</link>
    <description>Insights on choosing AI tools</description>
    ${items
      .map(
        (p) => `
    <item>
      <title>${escapeXml(p.meta.title)}</title>
      <link>${origin}/blog/${p.meta.slug}</link>
      <pubDate>${new Date(p.meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.meta.summary)}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

function escapeXml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


