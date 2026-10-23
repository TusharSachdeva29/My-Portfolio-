/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
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
