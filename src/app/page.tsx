"use client";

import About from "@/components/about";
import Achievement from "@/components/achievement";
import BasicInfo from "@/components/basic-info";
import CodingProfile from "@/components/coding-profile";
import Education from "@/components/education";
import Experience from "@/components/experience";
import POR from "@/components/position-of-responsibility";
import Projects from "@/components/projects";
import Navbar from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import ThemeButton from "@/components/ui/theme-changer";

import Contact from "@/components/contact";

const headings = [
  "About",
  "Experience",
  "Projects",
  "Coding Profiles",
  "Education",
  "Achievements",
  "Positions Of Responsibility",
  "Contact",
];

export default function Home() {
  return (
    <>
      <div className="relative max-w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col justify-center items-center">
        <ThemeButton />
        <Navbar headings={headings} />
        <BasicInfo />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <About />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Experience />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Projects />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <CodingProfile />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Achievement />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Education />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <POR />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Contact />
      </div>
    </>
  );
}


