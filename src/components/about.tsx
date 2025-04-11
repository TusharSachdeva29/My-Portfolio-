"use client";

import { ArrowRight, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const skills = [
    // 🔹 Core Programming & System Development
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",

    // 🔹 Frontend Development
    "React",
    "Next.js",
    "Redux",
    "Recoil",
    "Tailwind CSS",
    "ShadCN/UI",

    // 🔹 Backend Development
    "Next.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "GraphQL",
    "REST APIs",
    // "gRPC",
    "WebSockets",
    "OAuth 2.0",
    // "JWT",

    // 🔹 DevOps & Cloud
    "Docker",
    // "Kubernetes",
    // "Nginx",
    // "Load Balancing",
    // "Reverse Proxy",
    "GCP",
    "AWS (S3, EC2, Lambda)",

    // 🔹 System Programming & Performance
    "Linux",
    // "Shell Scripting",
    // "Multithreading",
    // "Socket Programming",

    // 🔹 Grpahics Programming
    // "OpenGL",
  ];

  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const linksRef = useRef(null);
  const skillsHeaderRef = useRef(null);
  const skillsRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const bioInView = useInView(bioRef, { once: true, amount: 0.2 });
  const linksInView = useInView(linksRef, { once: true, amount: 0.5 });
  const skillsHeaderInView = useInView(skillsHeaderRef, {
    once: true,
    amount: 0.5,
  });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.1 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const socialLinksAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const socialIconAnimation = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 md:py-12" id="About">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          className="flex mb-6 md:mb-10"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={titleAnimation}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            About
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#565bac]">
            .
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5">
            <motion.div
              ref={bioRef}
              className="prose dark:prose-invert max-w-none"
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <p>
                Hey, I&apos;m Tushar, a Computer Science student at NSUT. 
                I enjoy solving complex problems and building
                scalable applications, with a focus on backend development,
                system programming, and cloud infrastructure.
              </p>
              <p>
                I am currently learning Operating Systems, Object-Oriented
                Programming, Computer Networks, and System Design. I work with
                C++, TypeScript, Node.js, PostgreSQL, and Docker, continuously
                refining my skills through hands-on projects.
              </p>
              <p>
                I actively participate in competitive programming on CodeChef
                and CodeForces. It has helped me strengthen my algorithmic
                thinking and improve my problem-solving abilities through
                real-world challenges.
              </p>
              <p>
                On the frontend, I specialize in React, Next.js, Tailwind CSS,
                {/* and Framer Motion, ensuring seamless user experiences. I also
                work with DevOps tools like Docker, Kubernetes, Nginx, and CI/CD
                pipelines to enhance scalability and deployment. */}
              </p>
              <p>
                I am always eager to learn and take on new challenges. With a
                strong work ethic and an adaptable mindset, I thrive in dynamic
                environments, collaborating and building impactful projects
                using modern technologies.
              </p>
            </motion.div>

            <motion.div
              ref={linksRef}
              className="flex mt-8 md:mt-12 items-center gap-2 sm:gap-4"
              initial="hidden"
              animate={linksInView ? "visible" : "hidden"}
              variants={socialLinksAnimation}
            >
              <p className="text-sm sm:text-base">My Links</p>
              <ArrowRight className="h-5 sm:h-6 w-5 sm:w-6 flex items-center justify-center" />
              <div className="flex gap-3 sm:gap-4">
                <motion.a
                  href="#"
                  className="hover:text-[#565bac] transition-colors"
                  variants={socialIconAnimation}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {/* <Instagram className="h-5 sm:h-6 w-5 sm:w-6" /> */}
                </motion.a>
                <motion.a
                  href="https://github.com/TusharSachdeva29"
                  className="hover:text-[#565bac] transition-colors"
                  variants={socialIconAnimation}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Github className="h-5 sm:h-6 w-5 sm:w-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/tushar-sachdeva-573891287/"
                  className="hover:text-[#565bac] transition-colors"
                  variants={socialIconAnimation}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Linkedin className="h-5 sm:h-6 w-5 sm:w-6" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
            <motion.h2
              ref={skillsHeaderRef}
              className="text-2xl sm:text-3xl font-semibold mb-4"
              initial="hidden"
              animate={skillsHeaderInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              Skills
            </motion.h2>

            <motion.div
              ref={skillsRef}
              className="flex gap-2 sm:gap-3 flex-wrap"
              variants={container}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded-md text-xs sm:text-sm cursor-pointer shadow-sm hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-300 dark:hover:text-neutral-900 transition-all duration-200"
                  variants={item}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
