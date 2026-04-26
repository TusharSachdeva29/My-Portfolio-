"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ── Data ────────────────────────────────────────────────────── */
interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  techStack: string[];
  highlights: string[];
}

const experiences: Experience[] = [
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
    <div
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            Experience
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#565bac]">
            .
          </h1>
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
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} experience={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Experience Card ─────────────────────────────────────────── */
function ExperienceCard({
  experience: exp,
  index,
}: {
  experience: Experience;
  index: number;
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

          {/* Highlights */}
          <div className="space-y-3">
            {exp.highlights.map((highlight, i) => (
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
