"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  projects,
  CATEGORIES,
  type Category,
  type ProjectData,
} from "@/data/projects";

const ALL_FILTER = "All" as const;
type FilterOption = typeof ALL_FILTER | Category;
const FILTER_OPTIONS: FilterOption[] = [ALL_FILTER, ...CATEGORIES];

/* ── Animation variants ─────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>(ALL_FILTER);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const filterInView = useInView(filterRef, { once: true, amount: 0.5 });

  const filteredProjects =
    activeFilter === ALL_FILTER
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12"
      id="Projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Title ──────────────────────────────────── */}
        <motion.div
          ref={titleRef}
          className="flex flex-row-reverse mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#565bac]">
            .
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            Projects
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl"
        >
          A curated selection of projects spanning full-stack applications,
          AI/ML research, and low-level systems engineering.
        </motion.p>

        {/* ── Category Filter Bar ────────────────────────────── */}
        <motion.div
          ref={filterRef}
          className="mb-10 flex flex-wrap gap-2 sm:gap-2.5"
          initial={{ opacity: 0, y: 15 }}
          animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter;
            const count =
              filter === ALL_FILTER
                ? projects.length
                : projects.filter((p) => p.category === filter).length;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer flex items-center gap-2",
                  isActive
                    ? "bg-[#565bac] text-white border-[#565bac] shadow-lg shadow-[#565bac]/20"
                    : "bg-transparent border-border text-muted-foreground hover:border-[#565bac]/40 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {filter}
                <span
                  className={cn(
                    "text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 transition-colors",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Project Cards Grid ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div key={project.slug} variants={cardReveal}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <Sparkles className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-lg">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Project Card ────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (project.isPortfolio) {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="block h-full"
      onClick={handleClick}
    >
      <motion.div
        className={cn(
          "group relative flex flex-col h-full overflow-hidden rounded-2xl border bg-background transition-all duration-500",
          "dark:bg-neutral-950/80 dark:border-neutral-800/80",
          "hover:shadow-2xl hover:shadow-[#565bac]/8 hover:border-[#565bac]/40",
          "backdrop-blur-sm"
        )}
        whileHover={{
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* ── Gradient top bar with animated width ── */}
        <div className="relative h-1 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#565bac] via-[#7c5cbf] to-[#a78bfa] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#565bac] to-[#a78bfa]"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* ── Hover glow effect ── */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#565bac]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#7c5cbf]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          {/* ── Header row: index + category ── */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5"
            >
              {project.category}
            </Badge>
          </div>

          {/* ── Project Name ── */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 group-hover:text-[#565bac] transition-colors duration-300">
            {project.name}
            {/* Animated underline */}
            <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#565bac] to-[#a78bfa] transition-all duration-500 mt-1 rounded-full" />
          </h3>

          {/* ── Description ── */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-1">
            {project.about}
          </p>

          {/* ── Tech stack pills ── */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-300",
                  "bg-secondary/80 text-secondary-foreground",
                  "group-hover:bg-[#565bac]/10 group-hover:text-foreground"
                )}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg bg-secondary/60 text-muted-foreground text-[11px] font-medium">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* ── View Project link ── */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60 h-[48px]">
            {project.isPortfolio && showMessage ? (
              <span className="text-sm font-bold text-[#565bac] flex items-center gap-1.5 transition-all duration-300">
                you are already here nothing more to view
              </span>
            ) : (
              <span className="text-sm font-medium text-[#565bac] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                View Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}

            {/* Live badge indicator */}
            {project.liveDemo && (
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Live
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
