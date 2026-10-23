"use client";

import { useState, useRef, useEffect } from "react";
import { m, useInView } from "framer-motion";
import { Send, Linkedin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactMessage } from "@/app/actions/contact";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Spam protection: hidden honeypot field + time the form was first shown
  const [company, setCompany] = useState("");
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Input Validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all fields.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Sent from the server so the destination address never reaches the browser
      const result = await sendContactMessage({
        ...formData,
        company,
        startedAt: startedAt.current,
      });

      if (!result.ok) {
        setStatus("error");
        setErrorMessage(result.error);
        return;
      }

      // Success
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or reach out on LinkedIn.");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 md:py-24"
      id="Contact"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Section Header ── */}
        <m.div
          className="flex items-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Contact Me
            <span className="text-[#565bac] ml-1">.</span>
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* ── Left Side: Info & LinkedIn ── */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Let&apos;s build something amazing together.
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you have a question, a project opportunity, or just want to
              say hi, I try my best to get back to everyone!
            </p>

            <div className="flex flex-col gap-4 mt-auto">
              <a
                href="https://www.linkedin.com/in/tushar-sachdeva-573891287/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-3 w-full sm:w-max",
                  "px-6 py-4 rounded-xl font-semibold text-white",
                  "bg-[#0A66C2] hover:bg-[#0A66C2]/90", // LinkedIn Brand Color
                  "shadow-lg shadow-[#0A66C2]/20 hover:shadow-[#0A66C2]/40 hover:-translate-y-1",
                  "transition-all duration-300"
                )}
              >
                <Linkedin className="h-5 w-5" />
                <span>Message me on LinkedIn</span>
              </a>
              <span className="text-sm text-muted-foreground mt-2 font-medium">
                Prefer email? Fill out the form →
              </span>
            </div>
          </m.div>

          {/* ── Right Side: Contact Form ── */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot: invisible to people and screen readers, tempting to bots */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-base",
                    "bg-neutral-50 dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-800",
                    "focus:outline-none focus:ring-2 focus:ring-[#565bac]/50 focus:border-[#565bac]",
                    "transition-all duration-200"
                  )}
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-base",
                    "bg-neutral-50 dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-800",
                    "focus:outline-none focus:ring-2 focus:ring-[#565bac]/50 focus:border-[#565bac]",
                    "transition-all duration-200"
                  )}
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-base resize-none",
                    "bg-neutral-50 dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-800",
                    "focus:outline-none focus:ring-2 focus:ring-[#565bac]/50 focus:border-[#565bac]",
                    "transition-all duration-200"
                  )}
                  disabled={status === "loading"}
                />
              </div>

              {/* Status Messages */}
              {status === "error" && (
                <div role="alert" className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {status === "success" && (
                <div role="status" className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium mt-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Message sent successfully! I&apos;ll be in touch soon.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white",
                  "bg-[#565bac] hover:bg-[#565bac]/90",
                  "shadow-lg shadow-[#565bac]/20 hover:shadow-[#565bac]/40",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                  "transition-all duration-300 transform active:scale-[0.98]"
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
