"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ContactModal from "./components/ContactModal";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/design" },
  { name: "Contact", href: "/contact" },
];

const projects = [
  {
    number: "01",
    name: "Novel1st AI",
    desc: "Full novel writing studio with AI chapter generation, character builder, world builder, and writing analytics. Multi-provider — OpenAI, Claude, Gemini.",
    tags: ["Next.js", "AI", "Tiptap"],
    href: "https://novel1st.vercel.app",
    live: true,
  },
  {
    number: "02",
    name: "Synapse",
    desc: "Notion-alternative note-taking/second brain app with AI assistant, semantic search, drag-and-drop organization, and freemium Stripe integration. Your second brain. Minimal. Fast. Yours.",
    tags: ["Next.js", "AI", "Postgres"],
    href: "https://synapse-kappa-teal.vercel.app",
    live: true,
  },
  {
    number: "03",
    name: "Corex",
    desc: "Collaborative canvas built for engineering teams. Markdown editor, real-time canvas, and diagram-as-code. Optimized Eraser clone.",
    tags: ["Next.js", "Canvas", "Real-time"],
    href: "https://erasor-chi.vercel.app",
    live: true,
  },
  {
    number: "04",
    name: "Gwen UI",
    desc: "Open source ChatGPT UI clone. Bring your own OpenAI API key and use this clean, fast interface. 100% unaffiliated with OpenAI.",
    tags: ["Open Source", "OpenAI", "React"],
    href: "https://custom-chatbot-wine.vercel.app",
    live: true,
  },
];

const designPreviews = [
  { file: "/design/CYNOLogoMultiColor.png", label: "Cypher Nomadic", cat: "Brand Identity" },
  { file: "/design/Desktop.png", label: "Synapse", cat: "UI Design" },
  { file: "/design/DreamWorld.png", label: "DreamWorld", cat: "Art Direction" },
];

// ── PushReveal ─────────────────────────────────────────────────────────────

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
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── FadeUp ─────────────────────────────────────────────────────────────────

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

// ── ProjectCard ────────────────────────────────────────────────────────────

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
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block p-10 bg-zinc-900/50 border border-zinc-800 transition-all duration-300 hover:bg-zinc-900 hover:border-zinf-500 ${
        !project.live ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      <span className="absolute top-0 left-0 w-0 h-px bg-[#c8f542] group-hover:w-full transition-all duration-500 ease-out" />

      <div className="font-mono text-xs text-zinc-500 mb-10">{project.number}</div>

      <div className="text-2xl font-bold text-zinc-100 tracking-tight mb-4">
        {project.name}
      </div>

      <p className="font-mono text-xs text-zinc-200 leading-relaxed mb-10">
        {project.desc}
      </p>

      <div className="flex items-end justify-between">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-zinc-400 group-hover:text-[#c8f542] transition-colors duration-300 text-lg">
          →
        </span>
      </div>
    </motion.a>
  );
}

// ── NameSection ────────────────────────────────────────────────────────────

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
              className="text-6xl md:text-9xl font-bold tracking-tight leading-none text-zinc-500"
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Castillo.
            </motion.h2>
          </div>
          <motion.p
            className="font-mono text-xs text-zinc-200 tracking-[0.35em] uppercase mt-8"
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

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main 
  className="text-zinc-100 min-h-screen"
  style={{
    background: 'radial-gradient(ellipse at center, rgba(113,113,122,0.35) 0%, transparent 55%), #000000'
  }}
>

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
        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-200/0 via-zinc-200/50 to-zinc-200/0" />

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

        <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-200/0 via-zinc-200/50 to-zinc-200/0" />

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent"
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
            { label: "Expertise", value: "Front-End Dev\nUI/UX Design\nBrand Identity" },
            { label: "Stack", value: "Next.js · TypeScript\nTailwind · Supabase\nAI Integration" },
            { label: "Currently", value: "Writing a novel.\nBuilding in public.\nOpen to work." },
          ].map((item, i) => (
            <div
              key={i}
              className="px-12 py-10 border-b md:border-b-0 md:border-r border-zinc-800 last:border-0"
            >
              <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-3">
                {item.label}
              </div>
              <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
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

      {/* ── DESIGN ── */}
      <section className="px-8 md:px-12 py-28 border-t border-zinc-800">
        <FadeUp className="mb-16">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#c8f542] tracking-[0.2em] uppercase">
            Design Work
            <span className="flex-1 max-w-[80px] h-px bg-zinc-800" />
          </div>
        </FadeUp>

        <div className="mb-12">
          <PushReveal delay={0}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
              Visual
            </h2>
          </PushReveal>
          <PushReveal delay={0.12}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-none text-zinc-500">
              Identity.
            </h2>
          </PushReveal>
        </div>

        <FadeUp delay={0.1} className="mb-12">
          <p className="font-mono text-xs text-zinc-200 max-w-sm leading-relaxed">
            Brand identity, UI design, apparel, and art direction. Every mark built with intent.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12">
          {designPreviews.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <a
                href="/design"
                className="group relative block aspect-video bg-zinc-800/50 border border-zinc-800 overflow-hidden hover:border-zinf-500 transition-all duration-300"
              >
                <span className="absolute top-0 left-0 w-0 h-px bg-[#c8f542] group-hover:w-full transition-all duration-500 ease-out z-10" />
                <Image
                  src={item.file}
                  alt={item.label}
                  fill
                  className="object-contain p-4 group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="font-mono text-[9px] text-[#c8f542] tracking-[0.35em] uppercase mb-0.5">
                    {item.cat}
                  </div>
                  <div className="font-mono text-xs text-zinc-200">{item.label}</div>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <a
            href="/design"
            className="inline-flex items-center gap-3 px-8 py-5 border border-zinc-800 font-mono text-xs text-zinc-200 tracking-[0.1em] uppercase transition-all duration-300 hover:text-[#c8f542] hover:border-[#c8f542] hover:bg-[#c8f542]/5"
          >
            <span>↗</span> View All Design Work
          </a>
        </FadeUp>
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
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-none text-zinc-500">
              in mind?
            </h2>
          </PushReveal>
        </div>

        <FadeUp delay={0.2} className="flex flex-wrap gap-px">
          {[
            {
              label: "Design Portfolio",
              href: "https://cultural-impact-494790.framer.app",
              note: "Graphic & Brand Work",
            },
            { label: "Blog", href: "/blog" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-center px-8 py-5 border border-zinc-800 font-mono transition-all duration-300 hover:text-[#c8f542] hover:border-[#c8f542] hover:bg-[#c8f542]/5"
            >
              <div className="flex items-center gap-3 text-xs text-zinc-200 tracking-[0.1em] uppercase">
                <span>↗</span> {link.label}
              </div>
              {link.note && (
                <div className="text-[10px] text-zinf-500 mt-1 tracking-wide">
                  {link.note}
                </div>
              )}
            </a>
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 px-8 py-5 border border-zinc-800 font-mono text-xs text-zinc-200 tracking-[0.1em] uppercase transition-all duration-300 hover:text-[#c8f542] hover:border-[#c8f542] hover:bg-[#c8f542]/5"
          >
            <span>↗</span> Email
          </button>
        </FadeUp>

        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-12 py-8 border-t border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-zinc-500">
          © 2026 Art Castillo. All rights reserved.
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c8f542] animate-pulse" />
          Available for freelance
        </div>
      </footer>

    </main>
  );
}