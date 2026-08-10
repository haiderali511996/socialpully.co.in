// Single source of truth for the public origin of this deployment.
//
// Set NEXT_PUBLIC_SITE_URL at build time (see .env.example). Everything that
// needs an absolute URL — canonical tags, Open Graph, the sitemap, robots.txt
// and the JSON-LD schema — is derived from this, so moving the site to another
// domain is a one-variable change.
//
// NOTE: this is read at *build* time, not run time. Changing it means
// rebuilding (`npm run build`), not just restarting the server.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hunainimpex.com'
).replace(/\/$/, '');

// Bare hostname, handy for display copy and instructions.
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');
