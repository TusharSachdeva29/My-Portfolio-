"use client";

import type React from "react";

import { useRef } from "react";
import { ExternalLink, Trophy, Star, Users, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface BaseProfile {
  username: string;
  image: string;
  url: string;
  color: string;
  progress: number;
}

interface CodeChefProfile extends BaseProfile {
  rating: number;
  stars: number;
   global_rank: number;
  highest_rating: number;
  country_rank: number;
  problems_solved: number;
  contests_participated: number;
  next_rating: number;
  title: string;
}

interface CodeForcesProfile extends BaseProfile {
  rating: number;
  title: string;
  global_rank: number;
  highest_rating: number;
  country_rank: number;
  problems_solved: number;
  contests_participated: number;
  next_rating: number;
}

interface LeetCodeProfile extends BaseProfile {
  rating: number;
  title: string;
  top: number;
  problems_solved: number;
  contests_participated: number;
  reputation: number;
  solutionViews: number;
  next_rating: number;
}

interface GithubProfile extends BaseProfile {
  repositories: number;
  contributions: number;
  pull_requests_merged: number;
  issues_reported: number;
  next_milestone: number;
}

interface ProfilesData {
  codeChef: CodeChefProfile;
  codeForces: CodeForcesProfile;
  leetCode: LeetCodeProfile;
  github: GithubProfile;
}

type PlatformType = "CodeChef" | "CodeForces" | "LeetCode" | "Github";

const profilesData: ProfilesData = {
  codeChef: {
    username: "mad_monk",
    rating: 1800,
    stars: 4,
    highest_rating: 1800,
    problems_solved: 116,
    global_rank: 7000,
    country_rank: 6000,
    contests_participated: 31,
    next_rating: 2000,
    progress: 91.5,
    color: "#eab308",
    title: "4★",
    image: "/profile_1.jpg",
    url: "https://www.codechef.com/users/mad_monk",
  },
  codeForces: {
    username: "TusharSachdeva29",
    rating: 1503,
    title: "Specialist",
    global_rank: 25000,
    country_rank: 5000,
    highest_rating: 1503,
    
    problems_solved: 600,
    contests_participated: 50,
    next_rating: 1600,
    progress: 94.2,
    color: "#3b82f6",
    image: "/profile_1.jpg",
    url: "https://codeforces.com/profile/TusharSachdeva29",
  },
  leetCode: {
    username: "Mad_Monk",
    rating: 1850,
    title: "Knight",
    top: 5.0,
    problems_solved: 600,
    contests_participated: 13,
    next_rating: 2000,
    progress: 89.1,
    reputation: 5,
    solutionViews: 0,
    color: "#ef4444",
    image: "/profile.jpg",
    url: "https://leetcode.com/u/Mad_Monk",
  },
  github: {
    username: "TusharSachdeva29",
    repositories: 50,
    contributions: 524,
    pull_requests_merged: 0,
    issues_reported: 0,
    next_milestone: 1000,
    progress: 56,
    color: "#22c55e",
    image: "/Profile-DysfunctionalDegenerate-2.jpg",
    url: "https://github.com/TusharSachdeva29",
  },
};


interface CodingProfileCardProps {
  //eslint-disable-next-line
  profile: BaseProfile & Record<string, any>;
  platform: PlatformType;
  customStats?: React.ReactNode;
  animationDelay?: number;
}

const CodingProfileCard: React.FC<CodingProfileCardProps> = ({
  profile,
  platform,
  customStats = null,
  animationDelay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const progressRef = useRef<HTMLDivElement>(null);
  const progressInView = useInView(progressRef, { once: true });

  const renderStars = (): React.ReactNode => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={cn("h-5 w-5 fill-current", `text-yellow-500`)}
        />
      ));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: animationDelay,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={
        "shadow-2xl w-full max-w-md transition-all duration-300 overflow-hidden h-full hover:shadow-xl border-t-4 dark:bg-neutral-850 dark:bg-neutral-950 rounded-lg"
      }
      style={{
        borderTopColor: profile.color,
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 },
      }}
    >
      <Card className="h-full border-none shadow-none">
        <CardHeader className="relative pb-2">
          <motion.div
            className="flex items-center space-x-2 mt-4"
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ delay: animationDelay + 0.2, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                height={50}
                width={50}
                src={profile.image || "/placeholder.svg?height=50&width=50"}
                alt={`${profile.username}'s ${platform} profile picture`}
                className="rounded-full h-12 w-12 object-cover border-2"
                style={{ borderColor: profile.color }}
              />
            </motion.div>
            <div>
              <h2
                className={cn(
                  "text-xl font-bold dark:text-white text-gray-900"
                )}
              >
                {profile.username}
              </h2>
              <div className="flex items-center mt-1">
                {"stars" in profile ? (
                  <div className="flex">{renderStars()}</div>
                ) : (
                  <div style={{ color: profile.color }}>{profile.title}</div>
                )}
              </div>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="space-y-4">
            <div ref={progressRef}>
              <div className="flex justify-between text-sm mb-1">
                <span className={"dark:text-gray-300 text-gray-600"}>
                  {platform === "Github" ? "Repositories" : "Rating"}
                </span>
                <motion.span
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={progressInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {platform === "Github"
                    ? (profile as GithubProfile).repositories
                    : (
                        profile as
                          | CodeChefProfile
                          | CodeForcesProfile
                          | LeetCodeProfile
                      ).rating}
                </motion.span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  className={`h-full rounded-full`}
                  style={{
                    background: profile.color,
                  }}
                  initial={{ width: 0 }}
                  animate={
                    progressInView
                      ? { width: `${profile.progress}%` }
                      : { width: 0 }
                  }
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <motion.span
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={progressInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {profile.progress}% to{" "}
                  {platform === "Github"
                    ? (profile as GithubProfile).next_milestone
                    : (
                        profile as
                          | CodeChefProfile
                          | CodeForcesProfile
                          | LeetCodeProfile
                      ).next_rating}
                </motion.span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {customStats ? (
                customStats
              ) : (
                <>
                  <motion.div
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    variants={statsVariants}
                    initial="hidden"
                    custom={0}
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {platform === "Github"
                          ? "Contributions"
                          : "Highest Rating"}
                      </p>
                      <p className="font-medium">
                        {platform === "Github"
                          ? (profile as GithubProfile).contributions
                          : (profile as CodeChefProfile | CodeForcesProfile)
                              .highest_rating ||
                            (profile as LeetCodeProfile).rating}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    variants={statsVariants}
                    initial="hidden"
                    custom={1}
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {platform === "Github"
                          ? "Pull Requests Merged"
                          : platform === "LeetCode"
                          ? "Reputation"
                          : "Global Rank"}
                      </p>
                      <p className="font-medium flex items-center gap-1">
                        {platform === "LeetCode" && (
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                        )}
                        {platform === "Github"
                          ? (profile as GithubProfile).pull_requests_merged
                          : platform === "LeetCode"
                          ? (profile as LeetCodeProfile).reputation
                          : `#${
                              (profile as CodeChefProfile | CodeForcesProfile)
                                .global_rank
                            }`}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    variants={statsVariants}
                    initial="hidden"
                    custom={2}
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.05 }}
                  >
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {platform === "Github"
                          ? "Issues Reported"
                          : platform === "LeetCode"
                          ? "Solution Views"
                          : "Country Rank"}
                      </p>
                      <p className="font-medium">
                        {platform === "Github"
                          ? (profile as GithubProfile).issues_reported
                          : platform === "LeetCode"
                          ? (profile as LeetCodeProfile).solutionViews
                          : `#${
                              (profile as CodeChefProfile | CodeForcesProfile)
                                .country_rank
                            }`}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    variants={statsVariants}
                    initial="hidden"
                    custom={3}
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="h-4 w-4 flex items-center justify-center text-purple-500">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {platform === "Github"
                          ? "Total Repositories"
                          : "Problems Solved"}
                      </p>
                      <p className="font-medium">
                        {platform === "Github"
                          ? (profile as GithubProfile).repositories
                          : (
                              profile as
                                | CodeChefProfile
                                | CodeForcesProfile
                                | LeetCodeProfile
                            ).problems_solved}
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 mt-auto">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: animationDelay + 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className="w-full group"
              asChild
              variant="default"
              style={{
                backgroundColor: profile.color,
                color: "#ffffff",
              }}
            >
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                View {platform} Profile
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 1.5,
                    repeatDelay: 1,
                  }}
                >
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </a>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export default function CodingProfiles(): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div
      className={cn(
        "min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12",
        "transition-colors duration-300",
        "relative"
      )}
      id="Coding Profiles"
    >
      <AnimatedShapes />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          style={{ scale }}
          className="flex items-center mb-6 md:mb-10 sticky top-4 z-10 backdrop-blur-sm bg-white/70 dark:bg-black/70 p-4 rounded-xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold flex items-center">
            Coding Profiles
          </h1>
          <h1 className="text-[#565bac] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold flex items-center">
            .
          </h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <CodingProfileCard
            profile={profilesData.codeChef}
            platform="CodeChef"
            animationDelay={0.1}
          />

          <CodingProfileCard
            profile={profilesData.codeForces}
            platform="CodeForces"
            animationDelay={0.2}
          />

          <CodingProfileCard
            profile={profilesData.leetCode}
            platform="LeetCode"
            animationDelay={0.3}
          />

          <CodingProfileCard
            profile={profilesData.github}
            platform="Github"
            animationDelay={0.4}
          />
        </motion.div>
      </div>
    </div>
  );
}

const AnimatedShapes = () => {
  return (
    <>
      {/* Animated Circles */}
      <motion.div
        className="absolute top-[10%] left-[5%] aspect-square border-neutral-600 border rounded-full opacity-50 -z-50 w-[180px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        whileInView={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        viewport={{ once: false }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute top-[25%] right-[5%] aspect-square border-neutral-600 border rounded-full opacity-50 -z-50 w-[350px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        whileInView={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        viewport={{ once: false }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute top-[85%] left-[35%] aspect-square border-neutral-600 border rounded-full opacity-50 -z-50 w-[150px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        whileInView={{
          x: [0, 12, 0],
          y: [0, 12, 0],
        }}
        viewport={{ once: false }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          },
        }}
      />

      {/* Animated Squares */}
      <motion.div
        className="absolute top-[50%] right-[40%] aspect-square border-neutral-600 border opacity-50 -z-50 w-[170px]"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 0.5, rotate: 45 }}
        whileInView={{
          rotate: [45, 55, 45],
          scale: [1, 1.05, 1],
        }}
        viewport={{ once: false }}
        transition={{
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute top-[75%] left-[85%] aspect-square border-neutral-600 border opacity-50 -z-50 w-[130px]"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 0.5, rotate: 12 }}
        whileInView={{
          rotate: [12, 0, 12],
          scale: [1, 1.1, 1],
        }}
        viewport={{ once: false }}
        transition={{
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 9,
            ease: "easeInOut",
          },
        }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[5%] aspect-square border-neutral-600 border opacity-50 -z-50 w-[160px]"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 0.5, rotate: -12 }}
        whileInView={{
          rotate: [-12, -24, -12],
          scale: [1, 0.95, 1],
        }}
        viewport={{ once: false }}
        transition={{
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 9,
            ease: "easeInOut",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
          },
        }}
      />
    </>
  );
};
