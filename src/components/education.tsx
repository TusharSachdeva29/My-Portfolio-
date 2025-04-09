"use client";

import type React from "react";

import { useRef } from "react";
import {
  Book,
  Code,
  Server,
  Database,
  Globe,
  Cpu,
  Lightbulb,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const colors = {
  primary: "#4F46E5",
  secondary: "#7C3AED",
  accent1: "#EC4899",
  accent2: "#06B6D4",
  accent3: "#10B981",
  accent4: "#F59E0B",
  gradient: "linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)",
};

export default function Education() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <HeaderAnimation />
        <MainEducationCard />

        <div className="space-y-4">
          <SectionHeader
            icon={<Book className="h-6 w-6 text-primary" />}
            title="Key Subjects Studied"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedCourseCard
              icon={<Code />}
              title="Discrete Mathematics"
              description="Mathematical logic, set theory, combinatorics, graph theory, and algorithms."
              cg={10}
              delay={0.1}
            />

            <AnimatedCourseCard
              icon={<Database />}
              title="Data Structures & Algorithms"
              description="Arrays, linked lists, trees, graphs, recursion, dynamic programming, and greedy algorithms."
              cg={10}
              delay={0.2}
            />

            <AnimatedCourseCard
              icon={<Lightbulb />}
              title="Design and Analysis of Algorithms"
              description="Time complexity analysis, advanced sorting techniques, graph algorithms, and optimization strategies."
              cg={9}
              delay={0.3}
            />

            <AnimatedCourseCard
              icon={<Cpu />}
              title="Operating Systems"
              description="Process management, memory management, file systems, concurrency, and synchronization techniques."
              cg={8}
              delay={0.4}
            />

            <AnimatedCourseCard
              icon={<Database />}
              title="Database Management Systems"
              description="Relational databases, SQL, indexing, transactions, and normalization."
              cg={9}
              delay={0.5}
            />

            <AnimatedCourseCard
              icon={<Code />}
              title="Computer Programming"
              description="Programming languages(C++ , Python) , data types , OOP principles: encapsulation, inheritance, polymorphism,"
              cg={8}
              delay={0.6}
            />

            <AnimatedCourseCard
              icon={<Globe />}
              title="Probability and Statistics"
              description="Random variables, probability distributions, statistical inference, and hypothesis testing."
              cg={10}
              delay={0.7}
            />

            <AnimatedCourseCard
              icon={<Globe />}
              title="Computer Architecture and Organization"
              description="Computer organization, instruction set architecture, memory hierarchy, and I/O systems."
              cg={8}
              delay={0.8}
            />

            <AnimatedCourseCard
              icon={<Server />}
              title="Macine Learning"
              description="Supervised and unsupervised learning, regression, classification, ML-algos and neural networks."
              cg={9}
              delay={0.9}
            />

            {/* <AnimatedCourseCard
              icon={<Code />}
              title="Software Engineering"
              description="Software development life cycle (SDLC), agile methodologies, version control (Git), and testing."
              cg={9}
              delay={1.0}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center mb-8 md:mb-12 flex-row-reverse"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      id="Education"
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="relative">Education</span>
      </motion.h1>
    </motion.div>
  );
}

function MainEducationCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <Card
        className="mb-8 border-l-4 shadow-md hover:shadow-lg transition-all duration-300"
        style={{ borderLeftColor: colors.primary }}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Netaji Subhas University of Technology , Delhi
              </CardTitle>
              <CardDescription className="text-lg">
                B.Tech in Computer Science & Engineering
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>2023 - 2027</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium">CGPA:</span>
                <Badge variant="outline" className="font-semibold">
                  8.3/10
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.h2
      ref={ref}
      className="text-2xl font-semibold mb-4 flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      {title}
    </motion.h2>
  );
}

interface CourseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cg: number;
  delay: number;
}

function AnimatedCourseCard({
  icon,
  title,
  description,
  cg,
  delay,
}: CourseCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] h-full">
        <CardHeader className="pb-2 flex flex-row items-start gap-2">
          <motion.div
            className="p-2 rounded-md"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
              color: isInView ? colors.primary : colors.secondary,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              color: [
                colors.primary,
                colors.secondary,
                colors.accent1,
                colors.accent2,
                colors.primary,
              ],
              background: [
                `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                `linear-gradient(135deg, ${colors.secondary}20, ${colors.accent1}20)`,
                `linear-gradient(135deg, ${colors.accent1}20, ${colors.accent2}20)`,
                `linear-gradient(135deg, ${colors.accent2}20, ${colors.primary}20)`,
                `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
              ],
            }}
            transition={{
              stiffness: 400,
              damping: 10,
              animate: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          >
            {icon}
          </motion.div>
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
            >
              <Progress
                value={cg * 10}
                className="h-2"
                style={{
                  background: cn(
                    `linear-gradient(to right, ${colors.primary}30, ${colors.secondary}30)`,
                    `--tw-progress-fill: ${colors.gradient}`
                  ),
                }}
              />
            </motion.div>
            <motion.p
              className="text-xs whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.6 }}
            >
              {cg} CGPA
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
