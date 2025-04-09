"use client";

import About from "@/components/about";
import Achievement from "@/components/achievement";
import BasicInfo from "@/components/basic-info";
import CodingProfile from "@/components/coding-profile";
import Education from "@/components/education";
import POR from "@/components/position-of-responsibility";
import Projects from "@/components/projects";
import HoverLines from "@/components/ui/hover-line";
import { Separator } from "@/components/ui/separator";
import ThemeButton from "@/components/ui/theme-changer";

const headings = [
  "About",
  "Projects",
  "Coding Profiles",
  "Education",
  "Achivements",
  "Positions Of Responsibility",
];

export default function Home() {
  return (
    <>
      <div className="relative max-w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col justify-center items-center">
        <ThemeButton />
        <HoverLines headings={headings} />
        <BasicInfo />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <About />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Projects />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <CodingProfile />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Education />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <Achievement />
        <Separator className="w-[calc(100%-26rem)] my-16" />
        <POR />
      </div>
    </>
  );
}


