import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/json-ld";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";
import ProjectDetail from "./project-detail";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function summarize(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const title = `${project.name} – ${project.category} Project`;
  const description = summarize(project.about);
  const path = `/projects/${project.slug}`;

  return {
    title,
    description,
    keywords: [project.name, project.category, ...project.techStack, siteConfig.name],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      locale: "en_IN",
      authors: [siteConfig.url],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const url = `${siteConfig.url}/projects/${project.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareSourceCode",
              "@id": `${url}#project`,
              name: project.name,
              description: project.about,
              url,
              codeRepository: project.githubLink,
              keywords: project.techStack.join(", "),
              genre: project.category,
              author: { "@id": `${siteConfig.url}/#person` },
              ...(project.researchPaper && {
                citation: project.researchPaper,
              }),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: `${siteConfig.url}/#Projects`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: project.name,
                  item: url,
                },
              ],
            },
          ],
        }}
      />
      <ProjectDetail slug={project.slug} />
    </>
  );
}
