const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    // No script-src: Next.js, the theme script and JSON-LD are inline.
    key: "Content-Security-Policy",
    value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // The resume contains a phone number, so keep it out of search results.
        source: "/resume.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
          {
            key: "Content-Disposition",
            value: 'inline; filename="Tushar-Sachdeva-Resume.pdf"',
          },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/resume", destination: "/resume.pdf", permanent: false }];
  },
};

module.exports = nextConfig;
