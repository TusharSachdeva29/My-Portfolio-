"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  headings: string[];
}

export default function Navbar({ headings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll events for glass effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled down
      setIsScrolled(window.scrollY > 20);

      // Simple active section tracking
      // Finds the section that is currently most visible in viewport
      const sections = headings.map((h) => document.getElementById(h));
      let currentSection = "";

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      // Offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled 
            ? "py-3 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <span className="text-xl font-black tracking-tighter">
              TS<span className="text-[#565bac]">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {headings.map((heading) => {
              const isActive = activeSection === heading;
              
              // Handle name shortening for cleaner navbar
              let displayName = heading;
              if (heading === "Positions Of Responsibility") displayName = "POR";
              if (heading === "Coding Profiles") displayName = "Profiles";

              return (
                <a
                  key={heading}
                  href={`#${heading}`}
                  onClick={(e) => handleLinkClick(e, heading)}
                  className="relative px-3 py-2 rounded-full text-sm font-semibold transition-colors"
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  )}>
                    {displayName}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#565bac] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-white dark:bg-neutral-950 pt-24 px-4 pb-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {headings.map((heading, i) => {
                const isActive = activeSection === heading;

                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={heading}
                    href={`#${heading}`}
                    onClick={(e) => handleLinkClick(e, heading)}
                    className={cn(
                      "text-2xl font-bold p-4 rounded-2xl transition-colors",
                      isActive 
                        ? "bg-[#565bac]/10 text-[#565bac]" 
                        : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-foreground"
                    )}
                  >
                    {heading}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
