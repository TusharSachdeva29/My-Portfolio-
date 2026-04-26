"use client";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";

export function ContactUs() {
  return (
    <div className="ml-2 mt-4 flex justify-center text-center">
      <a href="#Contact" className="block">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="div"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
        >
          <span>Contact Me</span>
        </HoverBorderGradient>
      </a>
    </div>
  );
}
