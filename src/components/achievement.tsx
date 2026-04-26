"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Trophy, FileText, Target, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════ */
/* ── Data                                                     ── */
/* ═══════════════════════════════════════════════════════════════ */

interface AchievementData {
  id: string;
  title: string;
  event: string;
  metricValue: string;
  metricLabel: string;
  metricSub: string;
  badge: string;
  description: string;
  bullets: string[];
  accentColor: string;
  accentGlow: string;
  icon: React.ReactNode;
  linkText?: string;
  url?: string;
}

const achievements: AchievementData[] = [
  {
    id: "algo-university",
    title: "National Scholar",
    event: "Algo University",
    metricValue: "70",
    metricLabel: "Rank",
    metricSub: "out of 20,000 applicants",
    badge: "Top 0.35%",
    description: "Awarded a ₹1,00,000 merit-based scholarship.",
    bullets: [
      "Distinguished among the highest 0.35% of applicants nationwide.",
      "Selected after solving two rigorous algorithmic coding challenges.",
      "Successfully cleared the final personal interview round.",
    ],
    accentColor: "#8B5CF6", // Violet
    accentGlow: "rgba(139,92,246,0.15)",
    icon: <Medal className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "amazon-hackon",
    title: "National Finalist",
    event: "Amazon HackOn",
    metricValue: "9",
    metricLabel: "Rank",
    metricSub: "out of 52,637 teams",
    badge: "Top 0.017%",
    description: "Built an AI-powered video summarization platform.",
    bullets: [
      "Cleared multiple rounds: online assessment, ideation, and prototyping.",
      "Implemented a mood-aware recommender system.",
      "Integrated co-watching and gamification features.",
    ],
    accentColor: "#FF9900", // Amazon Orange
    accentGlow: "rgba(255,153,0,0.15)",
    icon: <Trophy className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "ieee-paper",
    title: "Published Research",
    event: "IEEE Conference (NIT Delhi)",
    metricValue: "94%",
    metricLabel: "Accuracy",
    metricSub: "Custom CNN Model",
    badge: "Published",
    description: "Deep learning–based skin cancer detection research.",
    bullets: [
      "Engineered a custom Convolutional Neural Network (CNN).",
      "Achieved 94% classification accuracy on clinical datasets.",
      "Presented findings at a recognized IEEE conference.",
    ],
    accentColor: "#00629B", // IEEE Blue
    accentGlow: "rgba(0,98,155,0.15)",
    icon: <FileText className="h-7 w-7 md:h-8 md:w-8" />,
    linkText: "View Paper",
    url: "#",
  },
  {
    id: "mahindra",
    title: "Top Performer",
    event: "Mahindra Logistics Techathon",
    metricValue: "13",
    metricLabel: "Rank",
    metricSub: "out of 200 teams",
    badge: "Top 6.5%",
    description: "Pan-India technology and innovation hackathon.",
    bullets: [
      "Succeeded through a rigorous multi-stage screening process.",
      "Cleared the national-level technical assessment.",
      "Advanced to the final evaluation round for top teams.",
    ],
    accentColor: "#E31837", // Mahindra Red
    accentGlow: "rgba(227,24,55,0.15)",
    icon: <Target className="h-7 w-7 md:h-8 md:w-8" />,
  },
];

/* ═══════════════════════════════════════════════════════════════ */
/* ── Achievement Card                                         ── */
/* ═══════════════════════════════════════════════════════════════ */

function AchievementCard({
  data,
  index,
}: {
  data: AchievementData;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 16,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}
      className={cn(
        "group relative flex flex-col md:flex-row overflow-hidden rounded-2xl transition-all duration-500",
        "border border-neutral-200/70 dark:border-neutral-800/70",
        "bg-white dark:bg-neutral-950"
      )}
      style={
        {
          "--accent": data.accentColor,
          "--glow": data.accentGlow,
        } as React.CSSProperties
      }
    >
      {/* ── Gradient border glow on hover ── */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${data.accentGlow}, inset 0 0 20px ${data.accentGlow}`,
        }}
      />

      {/* ── Left Side: Big Metric ── */}
      <div className="md:w-1/3 p-6 md:p-8 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at center, ${data.accentGlow} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Highlight Badge */}
        <div
          className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"
          style={{
            backgroundColor: data.accentGlow,
            color: data.accentColor,
          }}
        >
          {data.badge}
        </div>

        {/* Big Number */}
        <motion.div
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mt-8 md:mt-0"
          style={{ color: data.accentColor }}
          initial={{ scale: 0.8, filter: "blur(10px)" }}
          animate={
            inView
              ? { scale: 1, filter: "blur(0px)" }
              : { scale: 0.8, filter: "blur(10px)" }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            delay: 0.3 + index * 0.1,
          }}
        >
          {data.metricValue}
        </motion.div>

        {/* Metric Label */}
        <div className="mt-2 text-lg font-bold text-foreground uppercase tracking-wide">
          {data.metricLabel}
        </div>
        <div className="text-sm text-muted-foreground font-medium mt-1">
          {data.metricSub}
        </div>
      </div>

      {/* ── Right Side: Details ── */}
      <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center relative">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: data.accentGlow,
              color: data.accentColor,
            }}
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            {data.icon}
          </motion.div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              {data.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              {data.event}
            </p>
          </div>
        </div>

        <p className="text-base font-medium text-foreground mb-5 leading-relaxed">
          {data.description}
        </p>

        {/* Bullets */}
        <ul className="space-y-2 mb-6">
          {data.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.5 + index * 0.1 + i * 0.1 }}
              className="flex items-start text-sm md:text-base text-muted-foreground"
            >
              <span
                className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: data.accentColor }}
              />
              <span className="leading-snug">{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {/* Optional Action / Link */}
        {data.url && (
          <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-900">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: data.accentColor }}
            >
              {data.linkText || "View Detail"}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ── Main Component                                           ── */
/* ═══════════════════════════════════════════════════════════════ */

export default function Achievement() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 md:py-24"
      id="Achievements"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="flex items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
            Achievements
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#565bac] ml-1">
            .
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground text-base md:text-lg mb-12 md:mb-16 max-w-2xl font-medium"
        >
          Milestones, competition rankings, and recognized research work.
        </motion.p>

        {/* ── Cards List ── */}
        <div className="flex flex-col gap-8 md:gap-10">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} data={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
