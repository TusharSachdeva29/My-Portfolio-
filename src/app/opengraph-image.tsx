import { renderOgImage, ogSize } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: siteConfig.name,
    subtitle: "Software Engineer · Full-Stack · AI/ML · Distributed Systems",
  });
}
