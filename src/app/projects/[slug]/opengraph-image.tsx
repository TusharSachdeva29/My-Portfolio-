import { renderOgImage, ogSize } from "@/lib/og-image";
import { projects } from "@/data/projects";

export const alt = "Project by Tushar Sachdeva";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  return renderOgImage({
    eyebrow: project?.category ?? "Project",
    title: project?.name ?? "Project",
    subtitle: project ? project.techStack.slice(0, 5).join(" · ") : "",
  });
}
