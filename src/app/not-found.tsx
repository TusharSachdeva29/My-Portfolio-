"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/ui/theme-changer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <ThemeButton />
      <m.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center gap-4"
      >
        <Sparkles className="h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-4xl md:text-5xl font-extrabold">Page Not Found</h1>
        <p className="text-muted-foreground text-lg text-center max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#Projects">Browse Projects</Link>
          </Button>
        </div>
      </m.div>
    </main>
  );
}
