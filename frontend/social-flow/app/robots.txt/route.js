export async function GET() {
  const robots = `User-agent: *
Allow: /

# Block API routes — not meant for indexing
Disallow: /api/

# Sitemap
Sitemap: https://socialpully.com/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
