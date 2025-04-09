"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Cpu,
  Github,
  Lightbulb,
  Rocket,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ThemeButton from "@/components/ui/theme-changer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function ProjectShowcase() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ThemeButton />
      <HeroSection />
      <Separator className="w-[calc(100%-26rem)] my-16" />
      <ProjectOverview />
      <Separator className="w-[calc(100%-26rem)] my-16" />
      <TechnologyStack />
      <Separator className="w-[calc(100%-26rem)] my-16" />
      <ChallengesAndSolutions />
      <Separator className="w-[calc(100%-26rem)] my-16" />
      <FutureImprovements />
      <Separator className="w-[calc(100%-26rem)] my-16" />
      <KeyFeatures />
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className="mb-4" variant="outline">
              Project Showcase
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Project <span className="text-primary">Vision</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            A modern web application built with cutting-edge technologies,
            focused on performance and user experience.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Button size="lg">
              View Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function ProjectOverview() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Project Overview
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              This project represents a culmination of modern web development
              practices, combining powerful frameworks and libraries to create a
              seamless user experience. The application focuses on performance,
              accessibility, and engaging user interactions.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Built with a component-based architecture, the project emphasizes
              reusability and maintainability, making it easy to extend and
              adapt to changing requirements.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative aspect-video overflow-hidden rounded-xl border"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Rocket className="h-16 w-16 text-primary" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TechnologyStack() {
  const technologies = [
    { name: "React", icon: <Code className="h-4 w-4" /> },
    { name: "Next.js", icon: <Zap className="h-4 w-4" /> },
    { name: "TypeScript", icon: <Code className="h-4 w-4" /> },
    { name: "Tailwind CSS", icon: <Cpu className="h-4 w-4" /> },
    { name: "Framer Motion", icon: <Rocket className="h-4 w-4" /> },
    { name: "ShadCN UI", icon: <Lightbulb className="h-4 w-4" /> },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Technology Stack
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Powered by the latest web technologies to ensure optimal
              performance and developer experience.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center justify-center p-6 rounded-xl border text-center space-y-2"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {tech.icon}
                </div>
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ChallengesAndSolutions() {
  const challenges = [
    {
      challenge: "Performance Optimization",
      solution:
        "Implemented code splitting and lazy loading to improve load times",
    },
    {
      challenge: "Responsive Design",
      solution:
        "Used Tailwind's responsive utilities to ensure compatibility across devices",
    },
    {
      challenge: "Animation Complexity",
      solution:
        "Leveraged Framer Motion's animation capabilities for smooth transitions",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Challenges & Solutions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Overcoming obstacles with innovative approaches and technical
              expertise.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-3"
          >
            {challenges.map((item) => (
              <motion.div
                key={item.challenge}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="rounded-xl border p-6 space-y-4"
              >
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Challenge
                </div>
                <h3 className="text-xl font-bold">{item.challenge}</h3>
                <Separator />
                <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Solution
                </div>
                <p className="text-muted-foreground">{item.solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FutureImprovements() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Future Improvements
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Continuous evolution to enhance functionality and user experience.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Roadmap</CardTitle>
                <CardDescription>
                  Planned enhancements and feature additions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Performance Optimization
                    </h4>
                    <p className="text-muted-foreground">
                      Further improve loading times and runtime performance
                      through advanced techniques
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-1">
                    <Cpu className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">AI Integration</h4>
                    <p className="text-muted-foreground">
                      Incorporate machine learning capabilities to provide
                      personalized experiences
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-full bg-primary/20 p-1">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Expanded Feature Set
                    </h4>
                    <p className="text-muted-foreground">
                      Develop additional functionality based on user feedback
                      and market trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function KeyFeatures() {
  const features = [
    {
      title: "Interactive UI",
      description:
        "Engaging user interface with smooth animations and transitions",
    },
    {
      title: "Responsive Design",
      description: "Optimized for all devices from mobile to desktop",
    },
    {
      title: "Performance Focused",
      description: "Fast loading times and optimized rendering",
    },
    {
      title: "Accessibility",
      description: "WCAG compliant with keyboard navigation support",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Key Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Standout capabilities that define the project$apos;s excellence.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-xl border p-6 hover:border-primary/50"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
