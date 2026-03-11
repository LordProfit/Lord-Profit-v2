"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────

type DesignItem = {
  id: string;
  file: string;
  title: string;
  client: string;
  category: "Brand Identity" | "UI Design" | "Apparel" | "Art Direction";
  desc: string;
  tags: string[];
  note?: string;
};

// ── Data ───────────────────────────────────────────────────────────────────

const items: DesignItem[] = [
  {
    id: "01",
    file: "/design/CYNOLogoMultiColor.png",
    title: "Cypher Nomadic",
    client: "Cypher Nomadic",
    category: "Brand Identity",
    desc: "Primary brand mark for Cypher Nomadic. Interlocking CN monogram inspired by the NY Yankees mark — gothic weight reinterpreted through a pink-to-blue gradient with script wordmark.",
    tags: ["Monogram", "Logo Design", "Type"],
    note: "Inspired by the NY Yankees interlocking mark",
  },
  {
    id: "02",
    file: "/design/cypherSun.png",
    title: "Cypher Nomadic — Sun Mark",
    client: "Cypher Nomadic",
    category: "Brand Identity",
    desc: "Secondary icon mark. CN emblem set inside a radiating sunburst. Built for standalone usage on apparel, stamps, and social avatars.",
    tags: ["Icon", "Symbol", "Emblem"],
  },
  {
    id: "03",
    file: "/design/ME.png",
    title: "ME Lettermark",
    client: "Personal",
    category: "Brand Identity",
    desc: "Architectural 'ME' lettermark. Negative-space construction in heavy black — built on a constructivist grid. Zero decoration. All structure.",
    tags: ["Lettermark", "Constructivist", "B&W"],
  },
  {
    id: "04",
    file: "/design/castDocksLogo.png",
    title: "CastDocks",
    client: "CastDocks",
    category: "Brand Identity",
    desc: "Brand identity for CastDocks. Clean logotype with tight spacing and a grounded mark — communicates precision and reliability.",
    tags: ["Logotype", "Product", "Identity"],
  },
  {
    id: "05",
    file: "/design/dzign.png",
    title: "Dzigns",
    client: "Personal",
    category: "Brand Identity",
    desc: "Personal design brand wordmark. Custom letterform treatment — the misspelling is the brand. Intentional subversion of convention.",
    tags: ["Wordmark", "Custom Type", "Personal"],
  },
  {
    id: "06",
    file: "/design/ThatCnLogo143234.png",
    title: "Queens Mark",
    client: "Personal",
    category: "Brand Identity",
    desc: "Geometric mark rooted in Queens identity. B&W structural composition — built on strict grid logic. Borough pride through form.",
    tags: ["Geometric", "B&W", "Mark"],
  },
  {
    id: "07",
    file: "/design/Desktop - 3.png",
    title: "Synapse",
    client: "Synapse App",
    category: "UI Design",
    desc: "Product UI for Synapse — an AI-powered note-taking and assistant app. Dark-mode interface with sidebar nav, rich text editor, and collection management.",
    tags: ["Product UI", "Dark Mode", "SaaS"],
  },
  {
    id: "08",
    file: "/design/DreamWorld.png",
    title: "DreamWorld",
    client: "Personal",
    category: "Art Direction",
    desc: "Original Blender render. Cyberpunk scene built from scratch — lighting, environment, composition. Full art direction from concept to final frame.",
    tags: ["3D", "Blender", "Cyberpunk"],
  },
  {
    id: "09",
    file: "/design/TheRisingSunz.png",
    title: "The Rising Sunz",
    client: "Cypher Nomadic",
    category: "Apparel",
    desc: "Graphic apparel design — Tokyo/samurai inspired. Built for screen print. The hardest piece in the catalog.",
    tags: ["Apparel", "Screen Print", "Tokyo"],
  },
];

const categories = ["All", "Brand Identity", "UI Design", "Apparel", "Art Direction"] as const;
type Filter = (typeof categories)[number];

// ── Reusable animation components ─────────────────────────────────────────

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

// ── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
}: {
  item: DesignItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800"
        initial={{ scale: 0.95, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <span className="absolute top-0 left-0 w-full h-px bg-[#c8f542]" />

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-3/5 aspect-video md:aspect-auto md:min-h-[400px] bg-zinc-900 flex items-center justify-center overflow-hidden">
            <Image
              src={item.file}
              alt={item.title}
              fill
              className="object-contain p-6"
            />
          </div>

          {/* Meta */}
          <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800">
            <div>
              <div className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] uppercase mb-1">
                {item.id}
              </div>
              <div className="font-mono text-[10px] text-[#c8f542] tracking-[0.15em] uppercase mb-6">
                {item.category}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 tracking-tight mb-2">
                {item.title}
              </h2>
              <div className="font-mono text-[11px] text-zinc-600 mb-6">
                {item.client}
              </div>
              <p className="font-mono text-xs text-zinc-500 leading-relaxed mb-6">
                {item.desc}
              </p>
              {item.note && (
                <div className="border-l-2 border-[#c8f542] pl-4 mb-6">
                  <p className="font-mono text-[10px] text-zinc-500 italic">
                    {item.note}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 font-mono text-[11px] text-zinc-600 tracking-[0.15em] uppercase hover:text-[#c8f542] transition-colors duration-300 text-left"
            >
              ← Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Design Card ────────────────────────────────────────────────────────────

function DesignCard({
  item,
  index,
  onClick,
}: {
  item: DesignItem;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative cursor-pointer bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
    >
      {/* Top accent line on hover */}
      <span className="absolute top-0 left-0 w-0 h-px bg-[#c8f542] group-hover:w-full transition-all duration-500 ease-out z-10" />

      {/* Image */}
      <div className="relative aspect-video bg-zinc-950 overflow-hidden flex items-center justify-center">
        <Image
          src={item.file}
          alt={item.title}
          fill
          className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        {/* View cue */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-[10px] text-[#c8f542] tracking-[0.2em] uppercase border border-[#c8f542] px-4 py-2 bg-black/80">
            View
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-mono text-[10px] text-[#c8f542] tracking-[0.15em] uppercase mb-1">
              {item.category}
            </div>
            <div className="text-sm font-bold text-zinc-100 tracking-tight">
              {item.title}
            </div>
          </div>
          <span className="font-mono text-[10px] text-zinc-700 mt-1">
            {item.id}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DesignPage() {
  const [active, setActive] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<DesignItem | null>(null);

  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <main className="text-zinc-100 min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black bg-fixed">

      {/* Nav back */}
      <motion.div
        className="px-8 md:px-12 pt-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/"
          className="font-mono text-[11px] text-zinc-600 tracking-[0.15em] uppercase hover:text-[#c8f542] transition-colors duration-300"
        >
          ← Back
        </Link>
      </motion.div>

      {/* Header */}
      <section className="px-8 md:px-12 pt-20 pb-16">
        <FadeUp className="mb-4">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#c8f542] tracking-[0.2em] uppercase">
            Design Work
            <span className="flex-1 max-w-[80px] h-px bg-zinc-800" />
          </div>
        </FadeUp>

        <div className="mb-6">
          <PushReveal delay={0}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">
              Visual
            </h1>
          </PushReveal>
          <PushReveal delay={0.12}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none text-zinc-600">
              Identity.
            </h1>
          </PushReveal>
        </div>

        <FadeUp delay={0.25}>
          <p className="font-mono text-xs text-zinc-500 max-w-md leading-relaxed">
            Brand identity, UI design, apparel, and art direction. Every mark built
            with intent — no filler, no templates.
          </p>
        </FadeUp>
      </section>

      {/* Filter bar */}
      <FadeUp delay={0.1}>
        <div className="px-8 md:px-12 pb-12 flex flex-wrap gap-px border-b border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 transition-all duration-300 border ${
                active === cat
                  ? "text-[#c8f542] border-[#c8f542] bg-[#c8f542]/5"
                  : "text-zinc-600 border-zinc-800 hover:text-zinc-400 hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center font-mono text-[10px] text-zinc-700 tracking-[0.1em] uppercase px-4">
            {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </FadeUp>

      {/* Grid */}
      <section className="px-8 md:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          layout
        >
          {filtered.map((item, index) => (
            <DesignCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setLightbox(item)}
            />
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-12 py-8 border-t border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-zinc-600">
          © 2026 Art Castillo. All rights reserved.
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c8f542] animate-pulse" />
          Available for freelance
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </main>
  );
}