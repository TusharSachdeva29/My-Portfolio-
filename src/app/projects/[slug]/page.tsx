"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  Layers,
  Lightbulb,
  Rocket,
  Zap,
  ChevronRight,
  Sparkles,
  Network,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeButton from "@/components/ui/theme-changer";
import { projects } from "@/data/projects";

/* ── Animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Section Heading helper ──────────────────────────────────── */
function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
      <div className="p-2.5 rounded-xl bg-[#565bac]/10 dark:bg-[#565bac]/15">
        <Icon className="h-5 w-5 text-[#565bac]" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ── Main Page Component                                      ── */
/* ═══════════════════════════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  /* ── 404 ── */
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <ThemeButton />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex flex-col items-center gap-4"
        >
          <Sparkles className="h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Project Not Found
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-md">
            The project you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-2">
            <Link href="/#Projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  /* ── Find adjacent projects ── */
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ThemeButton />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── HERO HEADER ────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-12 pb-10 md:pt-20 md:pb-14 overflow-hidden"
      >
        {/* Ambient background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#565bac]/6 rounded-full blur-[130px]" />
          <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#7c5cbf]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container relative px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-6 md:mb-8 text-muted-foreground hover:text-foreground group/back"
            >
              <Link href="/#Projects">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover/back:-translate-x-1 transition-transform" />
                All Projects
              </Link>
            </Button>
          </motion.div>

          {/* Category + Name */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-3"
          >
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-[0.2em] font-semibold border-[#565bac]/40 text-[#565bac] px-3 py-1"
            >
              {project.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {project.name}
            </h1>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3 mt-6 md:mt-8"
          >
            {project.githubLink && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 group/btn rounded-xl"
              >
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  GitHub Repo
                </a>
              </Button>
            )}
            {project.liveDemo && (
              <Button
                asChild
                size="lg"
                className="gap-2 bg-[#565bac] hover:bg-[#464ba0] text-white rounded-xl shadow-lg shadow-[#565bac]/20 hover:shadow-xl hover:shadow-[#565bac]/30 transition-all"
              >
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.researchPaper && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl"
              >
                <a
                  href={project.researchPaper}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  Research Paper
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── ABOUT ──────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-5"
        >
          <SectionHeading icon={Rocket} title="About" />
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border bg-secondary/30 dark:bg-neutral-900/50 p-6 md:p-8"
          >
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed md:leading-8">
              {project.about}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="max-w-5xl mx-auto my-10 md:my-14" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── TECH STACK ─────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-6"
        >
          <SectionHeading icon={Layers} title="Tech Stack" />
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-2.5 md:gap-3"
          >
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary hover:bg-[#565bac]/10 hover:text-[#565bac] dark:hover:bg-[#565bac]/20 border border-transparent hover:border-[#565bac]/20 transition-all duration-300 cursor-default">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Separator className="max-w-5xl mx-auto my-10 md:my-14" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── FEATURES ───────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <SectionHeading icon={Zap} title="Features" />
          <motion.div
            variants={containerVariants}
            className="grid gap-4 sm:grid-cols-2"
          >
            {project.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border bg-background p-5 md:p-6 transition-all duration-300 hover:border-[#565bac]/30 hover:shadow-xl hover:shadow-[#565bac]/5 dark:bg-neutral-950/80"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-[#565bac]/10 group-hover:bg-[#565bac]/20 transition-colors">
                    <ChevronRight className="h-4 w-4 text-[#565bac]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] mb-1.5 group-hover:text-[#565bac] transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {/* Bottom accent line */}
                <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#565bac] to-[#a78bfa] transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── ARCHITECTURE (Conditional) ─────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      {project.architecture && project.architecture.length > 0 && (
        <>
          <Separator className="max-w-5xl mx-auto my-10 md:my-14" />
          <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="space-y-8"
            >
              <SectionHeading icon={Network} title="Architecture" />

              <motion.div variants={containerVariants} className="relative">
                {/* ── Timeline ── */}
                <div className="space-y-0">
                  {project.architecture.map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      className="relative pl-10 md:pl-12 pb-8 last:pb-0 group/arch"
                    >
                      {/* Connecting line */}
                      {index < project.architecture!.length - 1 && (
                        <div className="absolute left-[15px] md:left-[17px] top-10 bottom-0 w-px bg-gradient-to-b from-[#565bac]/30 to-border" />
                      )}

                      {/* Node dot */}
                      <div className="absolute left-0 top-1 h-[32px] w-[32px] md:h-[36px] md:w-[36px] rounded-xl border-2 border-[#565bac]/50 bg-background flex items-center justify-center group-hover/arch:border-[#565bac] group-hover/arch:bg-[#565bac]/10 transition-all duration-300">
                        <span className="text-xs font-bold text-[#565bac]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="rounded-xl border p-4 md:p-5 bg-background hover:border-[#565bac]/20 hover:shadow-md transition-all duration-300 dark:bg-neutral-950/80">
                        <h3 className="font-semibold text-[15px] mb-1.5 group-hover/arch:text-[#565bac] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>
        </>
      )}

      <Separator className="max-w-5xl mx-auto my-10 md:my-14" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── FUTURE IMPROVEMENTS ────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <SectionHeading icon={Lightbulb} title="Future Improvements" />

          <motion.div variants={containerVariants} className="space-y-3">
            {project.futureImprovements.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ x: 6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                className="group flex items-start gap-4 rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:border-[#565bac]/30 hover:shadow-lg hover:shadow-[#565bac]/5 dark:bg-neutral-950/80 bg-background"
              >
                <div className="mt-0.5 shrink-0 rounded-xl bg-gradient-to-br from-[#565bac]/15 to-[#7c5cbf]/10 p-2.5 group-hover:from-[#565bac]/25 group-hover:to-[#7c5cbf]/20 transition-all">
                  <Rocket className="h-4 w-4 text-[#565bac]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] mb-1 group-hover:text-[#565bac] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Separator className="max-w-5xl mx-auto my-10 md:my-14" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── FOOTER CTA + NAV ───────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center space-y-6 rounded-2xl border bg-secondary/20 dark:bg-neutral-900/30 p-8 md:p-12"
          >
            <Sparkles className="h-8 w-8 text-[#565bac]/60" />
            <p className="text-muted-foreground text-lg md:text-xl font-medium">
              Interested in this project?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {project.githubLink && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-xl"
                >
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
              {project.liveDemo && (
                <Button
                  asChild
                  size="lg"
                  className="gap-2 bg-[#565bac] hover:bg-[#464ba0] text-white rounded-xl shadow-lg shadow-[#565bac]/20"
                >
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.researchPaper && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-xl"
                >
                  <a
                    href={project.researchPaper}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-4 w-4" />
                    Research Paper
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Prev / Next navigation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-1 rounded-xl border p-5 hover:border-[#565bac]/30 hover:shadow-md transition-all dark:bg-neutral-950/60"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="font-semibold group-hover:text-[#565bac] transition-colors truncate">
                  {prevProject.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-1 rounded-xl border p-5 hover:border-[#565bac]/30 hover:shadow-md transition-all text-right dark:bg-neutral-950/60"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center justify-end gap-1">
                  Next{" "}
                  <ChevronRight className="h-3 w-3" />
                </span>
                <span className="font-semibold group-hover:text-[#565bac] transition-colors truncate">
                  {nextProject.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>

          {/* Back to all */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground group/back"
            >
              <Link href="/#Projects">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover/back:-translate-x-1 transition-transform" />
                Back to All Projects
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
