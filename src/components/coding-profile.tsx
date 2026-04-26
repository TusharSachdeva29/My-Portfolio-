"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Trophy, Code, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════ */
/* ── Data                                                     ── */
/* ═══════════════════════════════════════════════════════════════ */

interface PlatformStat {
  platform: string;
  label: string;
  value: string;
  accentColor: string;
  accentGlow: string;
  url: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
}

const platforms: PlatformStat[] = [
  {
    platform: "LeetCode",
    label: "LeetCode",
    value: "2100+",
    accentColor: "#F59E0B",
    accentGlow: "rgba(245,158,11,0.15)",
    url: "https://leetcode.com/u/Mad_Monk",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8 fill-current">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    stats: [
      { label: "Rating", value: "2100+" },
      { label: "Problems", value: "1200+" },
      { label: "Contests", value: "25+" },
      { label: "Title", value: "Knight" },
    ],
  },
  {
    platform: "Codeforces",
    label: "Codeforces",
    value: "1500+",
    accentColor: "#3B82F6",
    accentGlow: "rgba(59,130,246,0.15)",
    url: "https://codeforces.com/profile/TusharSachdeva29",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8 fill-current">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
    stats: [
      { label: "Rating", value: "1503" },
      { label: "Problems", value: "600+" },
      { label: "Contests", value: "50+" },
      { label: "Title", value: "Specialist" },
    ],
  },
  {
    platform: "CodeChef",
    label: "CodeChef",
    value: "1800+",
    accentColor: "#8B5CF6",
    accentGlow: "rgba(139,92,246,0.15)",
    url: "https://www.codechef.com/users/mad_monk",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8 fill-current">
        <path d="M11.007.22C8.75.416 7.48 1.053 6.467 2.56c-.383.552-.62 1.148-.82 1.88-.066.21-.127.383-.173.46-.18.3-.96.554-1.5.487C2.94 5.31 2.72 5.12 1.893 3.9l-.26-.393L1.1 4.28C.58 5.027.18 5.707.08 5.907c-.327.607-.16 1.133.56 1.813.367.34.613.507 1.12.753.36.173.66.327.673.34a7.66 7.66 0 0 1-.573.86C.813 10.98.18 13.187.1 14.92c-.08 1.734.287 3.5.993 4.86.26.52.907 1.433 1.3 1.853.907.96 2.16 1.767 3.38 2.14.427.14.5.147 1.04.147.554-.007.607-.014.947-.14.767-.294 1.34-.68 2.467-1.66 1.113-.974 1.52-1.267 2.16-1.547a4.258 4.258 0 0 1 1.28-.327c.18-.006.193 0 .293.12.107.114.12.174.12.554 0 .874.16 1.447.587 2.08.267.4.72.767 1.313 1.08.76.393 1.22.447 2.067.253 1.12-.253 2.193-.954 3.067-1.993 1.38-1.647 2.247-3.94 2.467-6.467.04-.514.04-1.793-.007-2.287-.1-1.193-.36-2.44-.68-3.36l-.154-.44.107-.107c.553-.554 1.04-1.4 1.113-1.94.04-.28-.013-.507-.173-.753-.14-.214-.36-.334-.667-.374-.24-.026-.894.12-1.44.32-.547.207-.96.294-1.493.314l-.447.013-.274-.293c-.78-.834-1.546-1.294-2.7-1.62-.646-.187-1.466-.314-2.053-.334l-.38-.013-.094-.207C15.22 4.094 14.26 3.18 13.16 2.68c-.607-.274-1.22-.694-1.74-1.174C10.74.86 10.04.4 9.367.22c-.327-.087-1.107-.214-1.26-.214a9.5 9.5 0 0 1-.447.014c-.253-.014-.513-.007-.653.007z" />
      </svg>
    ),
    stats: [
      { label: "Rating", value: "1800" },
      { label: "Problems", value: "116" },
      { label: "Contests", value: "31" },
      { label: "Title", value: "4★" },
    ],
  },
  {
    platform: "GitHub",
    label: "GitHub",
    value: "500+",
    accentColor: "#10B981",
    accentGlow: "rgba(16,185,129,0.15)",
    url: "https://github.com/TusharSachdeva29",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8 fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    stats: [
      { label: "Commits", value: "1000+" },
      { label: "Repos", value: "50+" },
      { label: "PRs", value: "100+" },
      { label: "Stars", value: "50+" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════ */
/* ── Animated Counter                                         ── */
/* ═══════════════════════════════════════════════════════════════ */

function AnimatedValue({
  value,
  color,
  inView,
}: {
  value: string;
  color: string;
  inView: boolean;
}) {
  return (
    <motion.span
      className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter"
      style={{ color }}
      initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.5, filter: "blur(10px)" }
      }
      transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
    >
      {value}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ── Platform Card                                            ── */
/* ═══════════════════════════════════════════════════════════════ */

function PlatformCard({
  platform,
  index,
}: {
  platform: PlatformStat;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 16,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.25 },
      }}
      className={cn(
        "group relative block overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer",
        "border border-neutral-200/70 dark:border-neutral-800/70",
        "bg-white dark:bg-neutral-950"
      )}
      style={
        {
          "--accent": platform.accentColor,
          "--glow": platform.accentGlow,
        } as React.CSSProperties
      }
    >
      {/* ── Gradient border glow on hover ── */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          boxShadow: `0 0 40px ${platform.accentGlow}, 0 0 80px ${platform.accentGlow}`,
        }}
      />

      {/* ── Accent top bar ── */}
      <div
        className="h-1 w-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${platform.accentColor}, transparent)`,
        }}
      />

      {/* ── Background gradient orb ── */}
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700">
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{ background: platform.accentColor }}
        />
      </div>

      <div className="relative p-6 md:p-8">
        {/* ── Header: Icon + Platform + External ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 rounded-xl transition-all duration-300"
              style={{
                background: platform.accentGlow,
                color: platform.accentColor,
              }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              {platform.icon}
            </motion.div>
            <div>
              <h3 className="font-bold text-lg md:text-xl tracking-tight text-foreground">
                {platform.label}
              </h3>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* ── Big rating number ── */}
        <div className="mb-6">
          <AnimatedValue
            value={platform.value}
            color={platform.accentColor}
            inView={inView}
          />
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.35 + index * 0.1, duration: 0.4 }}
            className="text-sm text-muted-foreground mt-1 font-medium"
          >
            {platform.platform === "GitHub" ? "Total Contributions" : "Contest Rating"}
          </motion.p>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px w-full mb-5 opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${platform.accentColor}, transparent)`,
          }}
        />

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-3">
          {platform.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className={cn(
                "p-3 rounded-xl transition-all duration-300",
                "bg-neutral-50 dark:bg-neutral-900/60",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
                "border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
              )}
            >
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
                {stat.label}
              </p>
              <p
                className="text-lg md:text-xl font-bold"
                style={{ color: platform.accentColor }}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Visit profile CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
          style={{
            background: platform.accentGlow,
            color: platform.accentColor,
          }}
        >
          <span>View Profile</span>
          <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ── Main Component                                           ── */
/* ═══════════════════════════════════════════════════════════════ */

export default function CodingProfile() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <div
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12"
      id="Coding Profiles"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Title ── */}
        <motion.div
          ref={titleRef}
          className="flex items-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={
            titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            Coding Profiles
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#565bac]">
            .
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground text-base md:text-lg mb-10 md:mb-14 max-w-xl"
        >
          Competitive programming stats & open-source contributions at a glance.
        </motion.p>

        {/* ── Platform Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {platforms.map((platform, i) => (
            <PlatformCard key={platform.platform} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
