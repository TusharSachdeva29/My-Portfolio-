"use client";

import type React from "react";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calendar, Award, Users, Code, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Position = {
  id: number;
  title: string;
  organization: string;
  period: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
  responsibilities: string[];
};

export default function PositionsOfResponsibility() {
  const [activePosition, setActivePosition] = useState<number>(0);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  const positions: Position[] = useMemo(() => {
    return [
      {
        id: 0,
        title: "Mentor, GDSC (Google Developer Student Clubs)",
        organization: "Data Structures & Algorithms",
        period: "2024 - Present",
        icon: <Code className="h-6 w-6" />,
        color: "bg-blue-500",
        skills: ["Data structures", "CP", "Mentoring", "Technical Workshops"],
        responsibilities: [
          "Organized a DSA Bootcamp to mentor students in arrays and strings problems",
          "Actively mentor juniors, guiding them in projects and improving their dsa and cp skills",
          "Collaborated with other mentors to host tech talks and coding sessions",
        ],
      },
      {
        id: 2,
        title: "Member at Algorithmic Society of NSUT(ASN)",
        organization:
          "Web developnment and competitive programming",
        period: "2025 - present",
        icon: <Calendar className="h-6 w-6" />,
        color: "bg-green-500",
        skills: [
          "Competitive Programming",
          "DSA",
          "Web Development",

        ],
        responsibilities: [
          "Conducted peer sessions, contests, and problem-solving discussions",
          "Mentored juniors in algorithmic thinking, problem-solving strategies, and platform-specific tips (Codeforces, LeetCode, etc.).",
          "Helped in organizing hackathons and web dev workshops, including tech setup and deployment.",
        ],
      },
    ];
  }, []);

  useEffect(() => {
    console.log(activePosition);
  }, [activePosition]);

  useEffect(() => {
    if (isInView && !activePosition) {
      setActivePosition(positions[0].id);
    }
  }, [isInView, activePosition, positions]);

  useEffect(() => {
    if (activePosition && timelineRef.current && window.innerWidth < 1024) {
      const activeElement = timelineRef.current.querySelector(
        `[data-position-id="${activePosition}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [activePosition]);

  const currentIndex = useMemo(() => {
    if (!activePosition) return 0;
    return positions.findIndex((p) => p.id === activePosition);
  }, [activePosition, positions]);

  const handleKeyDown = (e: React.KeyboardEvent, positionId: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActivePosition(positionId);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 md:py-24 bg-background"
      id="Positions Of Responsibility"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: isInView ? 0 : 100 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold flex items-center flex-row-reverse"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ml-1 text-[#565bac]"
              >
                .
              </motion.span>
              <span>Positions of Responsibility</span>
            </motion.h1>
          </div>
        </motion.div>

        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="flex items-center justify-between w-full p-4 bg-muted rounded-lg"
            aria-expanded={isMobileExpanded}
            aria-controls="mobile-timeline"
          >
            <span className="font-medium">Timeline Navigation</span>
            <ChevronRight
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isMobileExpanded ? "rotate-90" : ""
              )}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className={cn(
              "lg:col-span-4",
              isMobileExpanded ? "block" : "hidden lg:block"
            )}
            id="mobile-timeline"
          >
            <div
              ref={timelineRef}
              className="lg:sticky lg:top-24 space-y-1 lg:space-y-2 max-h-[50vh] lg:max-h-none overflow-auto lg:overflow-visible pb-4 lg:pb-0"
            >
              {positions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    x: isInView ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  data-position-id={position.id}
                >
                  <button
                    onClick={() => setActivePosition(position.id)}
                    onKeyDown={(e) => handleKeyDown(e, position.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg transition-all duration-200 flex items-start gap-3 hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      activePosition === position.id ? "bg-muted" : ""
                    )}
                    aria-selected={activePosition === position.id}
                    role="tab"
                    tabIndex={0}
                    aria-controls={`position-panel-${position.id}`}
                    id={`position-tab-${position.id}`}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "p-2 rounded-full text-white",
                          position.color
                        )}
                      >
                        {position.icon}
                      </div>
                      {index < positions.length - 1 && (
                        <div
                          className={cn(
                            "absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-muted-foreground/20",
                            activePosition === position.id &&
                              index < currentIndex
                              ? "bg-[#565bac]/50"
                              : ""
                          )}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">
                        {position.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {position.period}
                      </p>
                    </div>
                    {activePosition === position.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-1.5 h-[76px] rounded-full bg-[#565bac] absolute right-0"
                        style={{ top: 84 * position.id }}
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {positions.map(
                (position) =>
                  activePosition === position.id && (
                    <motion.div
                      key={position.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-card rounded-xl p-6 md:p-8 shadow-sm border"
                      role="tabpanel"
                      id={`position-panel-${position.id}`}
                      aria-labelledby={`position-tab-${position.id}`}
                    >
                      <div className="mb-6 md:mb-8">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-2xl md:text-3xl font-bold">
                            {position.title}
                          </h2>
                          <p className="text-lg text-muted-foreground mt-1">
                            {position.organization}
                          </p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mb-6 md:mb-8"
                      >
                        <h3 className="text-sm uppercase font-semibold text-muted-foreground mb-3">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {position.skills.map((skill, i) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.1 + i * 0.05,
                              }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-sm py-1 px-3 hover:bg-secondary/80 transition-colors"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <h3 className="text-sm uppercase font-semibold text-muted-foreground mb-3">
                          Key Responsibilities
                        </h3>
                        <ul className="space-y-4">
                          {position.responsibilities.map(
                            (responsibility, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.3 + i * 0.1,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex items-start gap-3"
                              >
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                      delay: 0.3 + i * 0.1 + 0.1,
                                      type: "spring",
                                    },
                                  }}
                                  className={cn(
                                    "p-1.5 rounded-full text-white shrink-0 mt-0.5",
                                    position.color
                                  )}
                                >
                                  <Award className="h-4 w-4" />
                                </motion.div>
                                <span className="text-base md:text-lg">
                                  {responsibility}
                                </span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
