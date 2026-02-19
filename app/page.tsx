"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ContactModal from "./components/ContactModal";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Portfolio", href: "https://cultural-impact-494790.framer.app" },
];

const projects = [
  {
    number: "01",
    name: "wRitr AI",
    desc: "Full novel writing studio with AI chapter generation, character builder, world builder, and writing analytics. Multi-provider — OpenAI, Claude, Gemini.",
    tags: ["Next.js", "AI", "Tiptap"],
    href: "https://novel1st.vercel.app",
    live: true,
  },
  {
    number: "02",
    name: "Corex",
    desc: "Collaborative canvas built for engineering teams. Markdown editor, real-time canvas, and diagram-as-code. Optimized Eraser clone.",
    tags: ["Next.js", "Canvas", "Real-time"],
    href: "https://erasor-chi.vercel.app",
    live: true,
  },
  {
    number: "03",
    name: "Gwen UI",
    desc: "Open source ChatGPT UI clone. Bring your own OpenAI API key and use this clean, fast interface. 100% unaffiliated with OpenAI.",
    tags: ["Open Source", "OpenAI", "React"],
    href: "https://custom-chatbot-wine.vercel.app",
    live: true,
  },
  {
    number: "04",
    name: "OpenClaw",
    desc: "Personal AI thinking partner for deep brainstorming, worldbuilding, and creative direction. Persistent context across sessions.",
    tags: ["Coming Soon"],
    href: "#",
    live: false,
  },
];

// Reusable push-up text reveal
function PushReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Fade up reveal
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Project card
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target={project.live ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative block p-10 bg-zinc-900/50 border border-zinc-800 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 ${
        !project.live ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      {/* top accent line */}
      <span className="absolute top-0 left-0 w-0 h-px bg-[#c8f542] group-hover:w-full transition-all duration-500 ease-out" />

      <div className="font-mono text-xs text-zinc-600 mb-10">
        {project.number}
      </div>

      <div className="text-2xl font-bold text-zinc-100 tracking-tight mb-4">
        {project.name}
      </div>

      <p className="font-mono text-xs text-zinc-500 leading-relaxed mb-10">
        {project.desc}
      </p>

      <div className="flex items-end justify-between">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-zinc-600 group-hover:text-[#c8f542] transition-colors duration-300 text-lg">
          →
        </span>
      </div>
    </motion.a>
  );
}

function NameSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0.5, 1], ["0%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-12">
        <motion.div style={{ y, opacity }}>
          <div className="overflow-hidden">
            <motion.h2
              className="text-6xl md:text-9xl font-bold tracking-tight leading-none"
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Art
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-6xl md:text-9xl font-bold tracking-tight leading-none text-zinc-600"
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Castillo.
            </motion.h2>
          </div>
          <motion.p
            className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Front-End Developer · UI/UX Designer · Brand Identity · Novelist
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="text-zinc-100 min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black bg-fixed">

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center w-screen h-screen relative">

        {/* Nav */}
        <motion.nav
          className="absolute top-0 left-0 right-0 py-8 px-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <ul className="flex items-center justify-center gap-8 text-sm md:text-base">
            {navigation.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + 0.2 * index, duration: 0.5 }}
              >
                <Link href={item.href}>
                  <span
                    className="font-bold transition-all duration-500 bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white hover:from-pink-300 hover:via-pink-500 hover:to-pink-700"
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Divider */}
        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        {/* Title */}
        <motion.h1
          className="z-10 text-4xl duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap text-metallic text-shadow-metallic"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          profit
        </motion.h1>

        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── NAME ── */}
      <NameSection />

      {/* ── ABOUT STRIP ── */}
      <FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-zinc-800">
          {[
            {
              label: "Expertise",
              value: "Front-End Dev\nUI/UX Design\nBrand Identity",
            },
            {
              label: "Stack",
              value: "Next.js · TypeScript\nTailwind · Supabase\nAI Integration",
            },
            {
              label: "Currently",
              value: "Writing a novel.\nBuilding in public.\nOpen to work.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="px-12 py-10 border-b md:border-b-0 md:border-r border-zinc-800 last:border-0"
            >
              <div className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] uppercase mb-3">
                {item.label}
              </div>
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ── PROJECTS ── */}
      <section className="px-8 md:px-12 py-28">
        <FadeUp className="mb-16">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#c8f542] tracking-[0.2em] uppercase">
            Selected Work
            <span className="flex-1 max-w-[80px] h-px bg-zinc-800" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="px-8 md:px-12 py-28 border-t border-zinc-800">
        <FadeUp className="mb-6">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#c8f542] tracking-[0.2em] uppercase">
            Let's Talk
            <span className="flex-1 max-w-[80px] h-px bg-zinc-800" />
          </div>
        </FadeUp>

        <div className="mb-16 overflow-hidden">
          <PushReveal delay={0}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
              Got a project
            </h2>
          </PushReveal>
          <PushReveal delay={0.12}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-none text-zinc-600">
              in mind?
            </h2>
          </PushReveal>
        </div>

        <FadeUp delay={0.2} className="flex flex-wrap gap-px">
          {[
            { label: "Portfolio", href: "https://cultural-impact-494790.framer.app" },
            { label: "Blog", href: "https://profits-blog.vercel.app" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-8 py-5 border border-zinc-800 font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase transition-all duration-300 hover:text-[#c8f542] hover:border-[#c8f542] hover:bg-[#c8f542]/5"
            >
              <span>↗</span> {link.label}
            </a>
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 px-8 py-5 border border-zinc-800 font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase transition-all duration-300 hover:text-[#c8f542] hover:border-[#c8f542] hover:bg-[#c8f542]/5"
          >
            <span>↗</span> Email
          </button>
        </FadeUp>

        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-12 py-8 border-t border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-zinc-600">
          © 2025 Art Castillo. All rights reserved.
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-pulse" />
          Available for freelance
        </div>
      </footer>

    </main>
  );
}