"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  ExternalLink,
  Network,
  Maximize2,
  ZoomIn,
  Video,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ── Data ────────────────────────────────────────────────────── */
interface ExperienceProject {
  name: string;
  tagline?: string;
  summary?: string;
  highlights: string[];
  architectureImage?: string;
  architectureDriveUrl?: string;
}

interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  techStack: string[];
  highlights?: string[];
  projects?: ExperienceProject[];
  demoVideo?: string;
}

const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Microsoft",
    companyUrl: "https://www.microsoft.com/",
    type: "Internship",
    period: "May 2026 – Jul 2026",
    duration: "2 months",
    location: "Noida, India",
    techStack: [
      "C#",
      ".NET 8",
      "Azure OpenAI",
      "MCP",
      "PowerShell",
      "RAG",
      "Azure DevOps",
      "WiX",
    ],
    projects: [
      {
        name: "TitanShell Copilot",
        tagline: "Primary Project",
        summary:
          "Conversational AI on-call assistant that lets datacenter engineers triage live cluster state in natural language.",
        highlights: [
          "Architected and shipped an AI on-call assistant in C# / .NET 8 that integrates Azure OpenAI (GPT) with 77 read-only tools across 9 backend services via the Model Context Protocol (MCP) — reducing routine incident triage from ~15 minutes of multi-tool context-switching to under 10 seconds.",
          "Designed a dual-runtime architecture (.NET 8 orchestrator + .NET Framework 4.7.2 server) hosting an in-process PowerShell runspace that caches an authenticated session for the process lifetime, eliminating per-call re-authentication and cutting typical query latency to 1–3 s (from a 5–15 s cold start).",
          "Built a streaming ReAct agent loop with multiplexed tool-calling over two MCP servers, orchestrating up to 16 reason–act–observe iterations per query while holding the production dependency footprint to a single NuGet package.",
          "Engineered \"read-only by construction\" security with 4 independent enforcement layers and caller-identity passthrough across 4 auth boundaries (Kerberos → dSTS, OAuth Bearer), guaranteeing zero write operations with no standing privileges.",
          "Optimized LLM context efficiency by replacing multi-megabyte raw API payloads with 40+ schema-bounded, filtered tools — shrinking responses from ~18,000 rows to ~50 and eliminating HTTP 429 token-limit failures.",
          "Integrated multi-source RAG grounding (Azure DevOps code + wiki search via MCP), enabling the agent to cite source-of-truth runbooks/TSGs and converting tribal knowledge across ~280 PowerShell cmdlets into shipped, auditable tooling.",
        ],
        architectureImage: "/microsoft/architecture.png",
        architectureDriveUrl:
          "https://drive.google.com/file/d/1mx7Mxq0uqm6JY4yniQzEX-YX-5RbyjHR/view?usp=sharing",
      },
      {
        name: "DcmToolsInstaller",
        tagline: "Side Project",
        summary:
          "One-click MSI that consolidates previously-separate internal datacenter tool installations into a single zero-touch package.",
        highlights: [
          "Built a Windows MSI installer with WiX 5 and a self-elevating PowerShell orchestrator, consolidating separate install flows for TitanShell and DCM Explorer into a single ~39 MB package and reducing setup from 8+ manual steps to 2 clicks.",
          "Designed an install pipeline (msiexec → CustomAction → CloudVault bootstrap → artifact fetch → deploy) that always pulls the latest signed drops at install time, eliminating version drift across engineer machines.",
          "Delivered per-tool transcript logging and a JSON install manifest for auditable diagnostics, targeting under 5 minutes time-to-first usage for new engineers onboarding to internal tooling.",
          "Established an extensible packaging pattern (NuGet restore → WiX harvest → MSI build) so future internal tools can plug into a common distribution channel without redesigning setup.",
        ],
      },
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Igniting Minds Organization®",
    type: "Internship",
    period: "Sep 2025 – Dec 2025",
    duration: "4 months",
    location: "Remote",
    techStack: [
      "Full Stack",
      "AWS S3",
      "Git",
      "REST APIs",
    ],
    highlights: [
      "Worked on full-stack systems, contributing to backend APIs, business logic, and frontend fixes used by real users at scale.",
      "Designed and fixed complex state-driven workflows (orders, approvals, pending/completed states, notifications), ensuring data consistency across dashboards and services.",
      "Re-architected image storage by moving assets from local filesystem to AWS S3, ensuring consistent delivery across web and admin systems, and implemented admin-controlled banner management.",
      "Collaborated closely with product and engineering teams, using Git, PRs, and QA workflows to ship features, hotfixes, and regressions under tight timelines.",
    ],
  },
  {
    role: "SDE Intern",
    company: "Mahindra Logistics",
    companyUrl: "https://www.mahindralogistics.com/",
    type: "Internship",
    period: "Apr 2025 – Jun 2025",
    duration: "3 months",
    location: "India · Remote",
    demoVideo:
      "https://drive.google.com/file/d/1IOYJnjq7NzmI6EFnw62utSdcZ-wdJF8G/view?usp=sharing",
    techStack: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "Apache Kafka",
      "Docker",
      "Jenkins",
      "NGINX",
    ],
    highlights: [
      "Developed a production-grade, real-time vehicle GPS tracking system for monitoring Mahindra's nationwide delivery fleets, improving visibility and route optimization.",
      "Built and optimized RESTful APIs for handling high-frequency GPS data, shipment tracking, and fleet workflows, processing over 50K events daily.",
      "Engineered a high-throughput Apache Kafka-based streaming pipeline to manage real-time location data with minimal latency and high availability.",
      "Implemented advanced database indexing strategies in MySQL using Drizzle ORM, reducing query latency by 70% for frequent read operations.",
      "Deployed the full-stack application on Mahindra Logistics' internal servers using Docker containers, NGINX for reverse proxy, and automated CI/CD via Jenkins.",
    ],
  },
];

/* ── Animation variants ──────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
};

/* ── Main Component ──────────────────────────────────────────── */
export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <section
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12"
      id="Experience"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Title ── */}
        <motion.div
          ref={titleRef}
          className="flex mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            Experience
            <span className="text-[#565bac]">.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl"
        >
          Building production systems, shipping real features, and solving
          real-world engineering challenges.
        </motion.p>

        {/* ── Timeline ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#565bac]/40 via-border to-transparent hidden sm:block" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} experience={exp} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Experience Card ─────────────────────────────────────────── */
function ExperienceCard({
  experience: exp,
}: {
  experience: Experience;
}) {
  return (
    <motion.div variants={cardVariants} className="relative sm:pl-14 md:pl-16">
      {/* Timeline node */}
      <div className="absolute left-0 top-2 hidden sm:flex h-9 w-9 md:h-[44px] md:w-[44px] items-center justify-center rounded-xl border-2 border-[#565bac]/50 bg-background z-10 group">
        <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-[#565bac]" />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={cn(
          "group rounded-2xl border bg-background overflow-hidden transition-all duration-300",
          "hover:shadow-xl hover:shadow-[#565bac]/5 hover:border-[#565bac]/30",
          "dark:bg-neutral-950/80 dark:border-neutral-800/80"
        )}
      >
        {/* Gradient accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#565bac] via-[#7c5cbf] to-[#a78bfa] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-5 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div className="space-y-1.5">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#565bac] transition-colors duration-300">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-medium text-muted-foreground hover:text-[#565bac] transition-colors inline-flex items-center gap-1"
                  >
                    {exp.company}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-base md:text-lg font-medium text-muted-foreground">
                    {exp.company}
                  </span>
                )}
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase tracking-widest font-semibold"
                >
                  {exp.type}
                </Badge>
                {exp.demoVideo && (
                  <a
                    href={exp.demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Demo Video
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-muted-foreground shrink-0">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{exp.period}</span>
                <span className="text-xs opacity-60">· {exp.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {exp.techStack.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300",
                  "bg-secondary/80 text-secondary-foreground",
                  "group-hover:bg-[#565bac]/10 group-hover:text-foreground"
                )}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights or Projects */}
          {exp.projects ? (
            <div className="space-y-7">
              {exp.projects.map((project, pIdx) => (
                <div
                  key={project.name}
                  className={cn(
                    pIdx > 0 &&
                      "pt-6 border-t border-dashed border-neutral-200/70 dark:border-neutral-800/70"
                  )}
                >
                  {/* Project header */}
                  <div className="mb-3">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#565bac] shrink-0" />
                      <h4 className="text-base md:text-lg font-bold text-foreground tracking-tight">
                        {project.name}
                      </h4>
                      {project.tagline && (
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase tracking-widest font-semibold border-[#565bac]/30 text-[#565bac]"
                        >
                          {project.tagline}
                        </Badge>
                      )}
                    </div>
                    {project.summary && (
                      <p className="text-xs md:text-sm text-muted-foreground italic pl-4 leading-relaxed">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  {/* Project bullets */}
                  <div className="space-y-3">
                    {project.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <ChevronRight className="h-4 w-4 mt-1 shrink-0 text-[#565bac]/60 group-hover/item:text-[#565bac] transition-colors" />
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Architecture Diagram (Interactive Modal + Preview) */}
                  {project.architectureImage && (
                    <div className="mt-6 pt-5 border-t border-dashed border-neutral-200/70 dark:border-neutral-800/70">
                      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-[#565bac]" />
                          <span className="text-xs md:text-sm font-semibold text-foreground tracking-tight">
                            System Architecture
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase tracking-wider font-semibold border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          >
                            Interactive
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#565bac]/10 text-[#565bac] hover:bg-[#565bac]/20 transition-all duration-200 cursor-pointer"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />
                                Expand Diagram
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] p-4 sm:p-6 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800">
                              <DialogHeader className="mb-3 shrink-0">
                                <div className="flex items-center justify-between gap-4 pr-6">
                                  <div>
                                    <DialogTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                                      <span className="h-2.5 w-2.5 rounded-full bg-[#565bac]" />
                                      {project.name} — System Architecture
                                    </DialogTitle>
                                    <DialogDescription className="text-xs md:text-sm text-muted-foreground mt-1">
                                      Dual-runtime architecture (.NET 8 orchestrator + .NET Framework 4.7.2 MCP server) with Azure OpenAI and Azure DevOps grounding
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>

                              {/* Scrollable image container */}
                              <div className="relative flex-1 overflow-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900/5 dark:bg-black/50 p-2 sm:p-4 flex items-center justify-center min-h-[320px]">
                                <img
                                  src={project.architectureImage}
                                  alt={`${project.name} Architecture`}
                                  className="w-full h-auto object-contain max-h-[68vh] rounded-lg shadow-sm"
                                />
                              </div>

                              {/* Modal footer with action links */}
                              <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between flex-wrap gap-2 text-xs">
                                <span className="text-muted-foreground">
                                  Azure Datacenter On-Call Copilot · Model Context Protocol (MCP)
                                </span>
                                <div className="flex items-center gap-3">
                                  <a
                                    href={project.architectureImage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-medium transition-colors"
                                  >
                                    <ZoomIn className="h-3.5 w-3.5" />
                                    Original Image
                                  </a>
                                  {project.architectureDriveUrl && (
                                    <a
                                      href={project.architectureDriveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-[#565bac] hover:text-[#464ba0] font-semibold transition-colors"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      Open in Google Drive
                                    </a>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {project.architectureDriveUrl && (
                            <a
                              href={project.architectureDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                              title="View on Google Drive"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Drive</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Interactive Thumbnail preview */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="group/archimg relative rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900/5 dark:bg-black/40 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#565bac]/40">
                            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900/40">
                              <img
                                src={project.architectureImage}
                                alt={`${project.name} Architecture Diagram`}
                                className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover/archimg:scale-[1.02]"
                              />
                              {/* Hover overlay hint */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover/archimg:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                <span className="text-white text-xs font-medium flex items-center gap-1.5">
                                  <Maximize2 className="h-3.5 w-3.5" />
                                  Click to inspect full architecture diagram
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                                  High Resolution
                                </span>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] p-4 sm:p-6 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800">
                          <DialogHeader className="mb-3 shrink-0">
                            <div className="flex items-center justify-between gap-4 pr-6">
                              <div>
                                <DialogTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                                  <span className="h-2.5 w-2.5 rounded-full bg-[#565bac]" />
                                  {project.name} — System Architecture
                                </DialogTitle>
                                <DialogDescription className="text-xs md:text-sm text-muted-foreground mt-1">
                                  Dual-runtime architecture (.NET 8 orchestrator + .NET Framework 4.7.2 MCP server) with Azure OpenAI and Azure DevOps grounding
                                </DialogDescription>
                              </div>
                            </div>
                          </DialogHeader>

                          <div className="relative flex-1 overflow-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900/5 dark:bg-black/50 p-2 sm:p-4 flex items-center justify-center min-h-[320px]">
                            <img
                              src={project.architectureImage}
                              alt={`${project.name} Architecture`}
                              className="w-full h-auto object-contain max-h-[68vh] rounded-lg shadow-sm"
                            />
                          </div>

                          <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between flex-wrap gap-2 text-xs">
                            <span className="text-muted-foreground">
                              Azure Datacenter On-Call Copilot · Model Context Protocol (MCP)
                            </span>
                            <div className="flex items-center gap-3">
                              <a
                                href={project.architectureImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-medium transition-colors"
                              >
                                <ZoomIn className="h-3.5 w-3.5" />
                                Original Image
                              </a>
                              {project.architectureDriveUrl && (
                                <a
                                  href={project.architectureDriveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[#565bac] hover:text-[#464ba0] font-semibold transition-colors"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  Open in Google Drive
                                </a>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {exp.highlights?.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-start gap-3 group/item"
                >
                  <ChevronRight className="h-4 w-4 mt-1 shrink-0 text-[#565bac]/60 group-hover/item:text-[#565bac] transition-colors" />
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {highlight}
                  </p>
                </motion.div>
              ))}

              {/* Demo Video button for single experiences (e.g. Mahindra Logistics) */}
              {exp.demoVideo && (
                <div className="mt-5 pt-4 border-t border-dashed border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-[#E31837]" />
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      Real-Time Fleet Tracking Demo
                    </span>
                  </div>
                  <a
                    href={exp.demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-white bg-[#E31837] hover:bg-[#c9142e] shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch Demo Video
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
