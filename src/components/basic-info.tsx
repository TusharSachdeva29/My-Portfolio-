"use client";

import { useTheme } from "@/hooks/use-theme";
import { Bold } from "./ui/bold";
import { ContactUs } from "./ui/contact-us";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function BasicInfo() {
  useTheme();

  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contactRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headerAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="h-screen w-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col" id="basic-info">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black_80%)]" />
      <div className="w-full h-screen flex justify-center items-center">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between w-11/12 lg:w-5/6 xl:w-4/5 gap-8 lg:gap-16 pt-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Text Content */}
          <div className="flex flex-col items-start w-full md:w-[55%] lg:w-3/5">
            <motion.p
              ref={headerRef}
              className="text-4xl lg:text-8xl xl:text-9xl md:text-6xl font-bold relative z-20 text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 to-neutral-800 py-4 lg:py-8 leading-0 dark:from-neutral-200 dark:to-neutral-500"
              variants={headerAnimation}
            >
              Hi, I&apos;m Tushar.
            </motion.p>

            <motion.p
              ref={subtitleRef}
              className="text-neutral-800 dark:text-neutral-200 ml-2 text-sm md:text-lg lg:text-3xl z-40"
              variants={fadeInUp}
            >
              Pre final year student at Netaji Subhash University of Technology.
            </motion.p>

            <motion.p
              ref={descriptionRef}
              className="ml-2 mt-4 text-xs lg:text-lg md:text-sm z-40"
              variants={fadeInUp}
            >
              Over the past years at NSUT, I&apos;ve excelled in{" "}
              <Bold>full-stack development</Bold>, <Bold>low-level programming</Bold> with C++ servers
              , <Bold>competitive coding</Bold>, {" "}
              <Bold>maching learning and deep learning</Bold>, <Bold>Distributed systems</Bold> showcasing expertise through projects
              and a strong coding profile.
            </motion.p>

            <motion.div
              ref={contactRef}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="z-50"
            >
              <ContactUs />
            </motion.div>
          </div>

          {/* Right Image Content */}
          <motion.div
            variants={fadeInUp}
            className="w-full md:w-[45%] lg:w-2/5 flex justify-center items-center mt-8 md:mt-0 z-40"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-[6px] border-neutral-100 dark:border-neutral-800 shadow-2xl group">
              <Image
                src="/my-pic.jpg"
                alt="Tushar Sachdeva"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
