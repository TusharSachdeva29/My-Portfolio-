import About from "@/components/about";
import Achievement from "@/components/achievement";
import BasicInfo from "@/components/basic-info";
import CodingProfile from "@/components/coding-profile";
import Education from "@/components/education";
import Experience from "@/components/experience";
import JsonLd from "@/components/json-ld";
import POR from "@/components/position-of-responsibility";
import Projects from "@/components/projects";
import Navbar from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import ThemeButton from "@/components/ui/theme-changer";
import { siteConfig } from "@/lib/site";

import Contact from "@/components/contact";

const headings = [
  "About",
  "Experience",
  "Projects",
  "Coding Profiles",
  "Achievements",
  "Education",
  "Positions Of Responsibility",
  "Contact",
];

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      givenName: "Tushar",
      familyName: "Sachdeva",
      url: siteConfig.url,
      image: `${siteConfig.url}${siteConfig.image}`,
      jobTitle: siteConfig.jobTitle,
      description: siteConfig.description,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.alumniOf,
        sameAs: "https://www.nsut.ac.in/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Full-Stack Development",
        "Backend Development",
        "Distributed Systems",
        "System Design",
        "Machine Learning",
        "Deep Learning",
        "Competitive Programming",
        "C++",
        "TypeScript",
        "Node.js",
        "React",
        "Next.js",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
      ],
      sameAs: Object.values(siteConfig.socials),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profile`,
      url: siteConfig.url,
      name: siteConfig.title,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="relative max-w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col justify-center items-center">
        <ThemeButton />
        <Navbar headings={headings} />
        <BasicInfo />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <About />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Experience />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Projects />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <CodingProfile />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Achievement />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Education />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <POR />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Contact />
      </main>
    </>
  );
}
