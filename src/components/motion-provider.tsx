"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

export default function MotionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // reducedMotion="user": skip transform/layout animations when the
    // visitor's OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
