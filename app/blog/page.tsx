"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Post = {
  id: string;
  filename: string;
  date: string | null;
  classification: string;
  title: string;
  isStatic?: boolean;
  content?: ContentBlock[];
};

type ContentBlock = {
  type: "paragraph" | "header" | "quote" | "log" | "divider";
  text?: string;
};

const STATIC_POST: Post = {
  id: "001",
  filename: "HEAVEN_WASNT_BUILT_TO_FALL.log",
  date: "2026.02.12",
  classification: "WORLDBUILDING // SYSTEM ARCHITECTURE",
  title: "Heaven Wasn't Built to Fall. It Was Built to Run.",
  isStatic: true,
  content: [
    { type: "paragraph", text: "I didn't set out to write a book about angels. I set out to solve a problem." },
    { type: "paragraph", text: "Every version of the war in Heaven I'd ever read treated it like a coup. Lucifer got jealous, rallied some troops, God smacked him down. Good versus evil. Simple. Boring." },
    { type: "paragraph", text: "That never sat right with me." },
    { type: "paragraph", text: "If you're running a perfect system, and Heaven is supposed to be perfect, a rebellion doesn't just happen. Systems don't fail because someone got mad. They fail because something in the architecture was already broken." },
    { type: "divider" },
    { type: "header", text: "// THE SYSTEM" },
    { type: "paragraph", text: "Heaven runs on authority. Pure, hierarchical authority. Commands flow down from the Throne. Angels execute. Reality complies. No lag. No errors. No variance." },
    { type: "paragraph", text: "It's beautiful in the way a perfectly optimized algorithm is beautiful." },
    { type: "paragraph", text: "But perfect systems are brittle." },
    { type: "paragraph", text: "When you build something with zero tolerance for deviation, the first real failure doesn't stay contained. It cascades." },
    { type: "log", text: "PROCESS: LUCIFER\nSTATUS: GRAVITATIONAL_ANOMALY_DETECTED\nINFLUENCE_MASS: CRITICAL\nSYSTEM_RESPONSE: DEALLOCATION\nOUTCOME: FELL" },
    { type: "paragraph", text: "Lucifer didn't rebel because he was evil. He accumulated gravitational pull. Angels were drawn to him. Reality bent around him. Influence became mass. The system flagged him as a stability risk." },
    { type: "paragraph", text: "So Heaven did what any system does when a process threatens equilibrium. It deallocated him." },
    { type: "divider" },
    { type: "header", text: "// THE CORRECTION ENGINE" },
    { type: "paragraph", text: "Heaven had a failsafe. A living correction protocol. The angel that kept reality stable while everyone else simply operated inside it." },
    { type: "paragraph", text: "Sammael." },
    { type: "log", text: "PROCESS: SAMMAEL\nROLE: REALITY_CORRECTION_DAEMON\nVARIANCE: 0.000000\nUPTIME: SINCE_CREATION\nCLASSIFICATION: INVISIBLE_INFRASTRUCTURE" },
    { type: "paragraph", text: "He wasn't just an enforcer. He was the background process. The daemon running nonstop, correcting micro deviations, physics errors, reality glitches." },
    { type: "paragraph", text: "Gravity stutters. Sammael corrects it. Time desynchronizes. Sammael patches it. Entropy spikes. Sammael smooths it out." },
    { type: "paragraph", text: "He was invisible infrastructure. The kind you never notice unless it stops working." },
    { type: "divider" },
    { type: "header", text: "// THE FALL" },
    { type: "paragraph", text: "Heaven doesn't negotiate. It doesn't rehabilitate. It doesn't give second chances. When a process fails, you remove it." },
    { type: "log", text: "DEALLOCATION_EVENT: SAMMAEL\nDESTINATION: EARTH\nSTATUS: DOWNGRADED\nHARDWARE: HUMAN\nSOFTWARE: ANGEL\nERROR: INCOMPATIBLE_ARCHITECTURE" },
    { type: "paragraph", text: "He was still running angel software on human hardware. Pain became a new variable. Hunger didn't resolve. Gravity felt misaligned. His body was a system error he couldn't debug." },
    { type: "paragraph", text: "But he was still operational. Still the correction engine. Still carrying out directives, even though Heaven had already dropped him." },
    { type: "divider" },
    { type: "header", text: "// WHY I WROTE THIS" },
    { type: "paragraph", text: "I wanted to write something I had never seen before. Something original inside a story that's been told a thousand times." },
    { type: "paragraph", text: "An epic where the villain isn't evil, just weighted wrong. Where the hero isn't heroic, just still operating. Where the system doesn't break because of rebellion. It breaks because it's too rigid to adapt." },
    { type: "quote", text: "I wanted mythology that felt like infrastructure failure." },
    { type: "paragraph", text: "Heaven not as light and wonder, but as a distributed compute layer allocating reality. Hell not as fire and brimstone, but as containment for everything Heaven rejects. Angels not as warriors, but as processes with wings." },
    { type: "paragraph", text: "And when the system crashes? Someone still has to keep it running." },
    { type: "divider" },
    { type: "header", text: "// WHAT'S NEXT" },
    { type: "paragraph", text: "This is where I break down the worldbuilding, the philosophy behind the prose, and the architecture of The Fall of An Angel." },
    { type: "paragraph", text: "System breakdowns. Character deep dives. Worldbuilding essays. Writing philosophy. The mechanics behind rhythm and fragmentation." },
    { type: "paragraph", text: "Because Heaven wasn't built to fall. But every system has a breaking point. And I'm going to show you what happens when the infrastructure collapses." },
    { type: "log", text: "EOF\nNEXT_TRANSMISSION: PENDING\nSUBSCRIBE: castascendancy@gmail.com" },
  ],
};

const UPCOMING = [
  { id: "002", filename: "MICHAEL_SYSTEM_ANALYSIS.log", date: "PENDING", classification: "CHARACTER FILE" },
  { id: "003", filename: "LUCIFER_GRAVITY_EVENT.log", date: "PENDING", classification: "INCIDENT REPORT" },
  { id: "004", filename: "HELL_AS_GARBAGE_COLLECTION.log", date: "PENDING", classification: "ARCHITECTURE" },
];

function TerminalCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 bg-[#00f0ff] ml-0.5 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
    />
  );
}

function PostContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {content.map((block, i) => {
        if (block.type === "paragraph") return (
          <motion.p key={i} className="text-zinc-400 leading-relaxed text-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02, duration: 0.4 }}>
            {block.text}
          </motion.p>
        );
        if (block.type === "header") return (
          <motion.div key={i} className="text-[#00f0ff] font-bold text-sm mt-8 mb-2 tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
            {block.text}
          </motion.div>
        );
        if (block.type === "divider") return (
          <motion.div key={i} className="border-t border-zinc-800 my-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.02, duration: 0.5 }} />
        );
        if (block.type === "log") return (
          <motion.pre key={i} className="bg-black/60 border border-[#00f0ff]/20 text-[#00f0ff]/70 text-xs p-4 leading-relaxed overflow-x-auto whitespace-pre-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
            {block.text}
          </motion.pre>
        );
        if (block.type === "quote") return (
          <motion.blockquote key={i} className="border-l-2 border-[#00f0ff] pl-6 text-zinc-300 italic text-base my-6" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
            {block.text}
          </motion.blockquote>
        );
        return null;
      })}
    </div>
  );
}

export default function HellCodex() {
  const [notionPosts, setNotionPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [notionContent, setNotionContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setNotionPosts(data.posts ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openPost = async (post: Post) => {
    setBooting(true);
    setActivePost(post);

    setTimeout(async () => {
      setBooting(false);
      if (!post.isStatic) {
        setPostLoading(true);
        const res = await fetch(`/api/posts/${post.id}`);
        const data = await res.json();
        setNotionContent(data.content ?? []);
        setPostLoading(false);
      }
    }, 1200);
  };

  const allTransmitted = [STATIC_POST, ...notionPosts];

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 font-mono">
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }} />

      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-zinc-600 ml-2">hell_codex — bash</span>
        </div>
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase">← back</Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-[#00f0ff] text-xs mb-1">HELL_CODEX v1.0.0 — initialized</div>
          <div className="text-zinc-600 text-xs mb-1">CLASSIFICATION: RESTRICTED // ARCHANGEL ARCHIVE</div>
          <div className="text-zinc-600 text-xs mb-6">AUTHOR: ARTURIOUS_CASTILLO // THE FALL OF AN ANGEL</div>
          <div className="text-2xl md:text-4xl font-bold text-zinc-100 tracking-tight mb-1">HELL CODEX</div>
          <div className="text-xs text-zinc-600 tracking-widest">MYTHOLOGY AS INFRASTRUCTURE FAILURE<TerminalCursor /></div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div key="listing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-xs text-zinc-600 mb-6">
                <span className="text-[#00f0ff]">root@hell_codex</span>
                <span className="text-zinc-500">:~$</span>
                <span className="text-zinc-300 ml-2">ls -la /archive</span>
              </div>

              <div className="mb-8">
                <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-3">// TRANSMITTED</div>
                <div className="space-y-2">
                  {allTransmitted.map((post) => (
                    <motion.button
                      key={post.id}
                      onClick={() => openPost(post)}
                      className="w-full text-left group border border-zinc-800 hover:border-[#00f0ff]/40 p-5 transition-all duration-300 hover:bg-[#00f0ff]/5"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] text-[#00f0ff] tracking-widest mb-2">{post.classification}</div>
                          <div className="text-sm text-zinc-200 font-bold mb-1 group-hover:text-white transition-colors">{post.filename}</div>
                          <div className="text-xs text-zinc-500">{post.title}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-zinc-600 mb-1">{post.date ?? "UNDATED"}</div>
                          <div className="text-[10px] text-[#00f0ff]/60">READ →</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                  {loading && (
                    <div className="text-xs text-zinc-700 pt-2">fetching transmissions...<TerminalCursor /></div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-3">// PENDING TRANSMISSION</div>
                <div className="space-y-2">
                  {UPCOMING.map((item) => (
                    <div key={item.id} className="border border-zinc-900 p-5 opacity-40">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] text-zinc-600 tracking-widest mb-2">{item.classification}</div>
                          <div className="text-sm text-zinc-500">{item.filename}</div>
                        </div>
                        <div className="text-[10px] text-zinc-700">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 text-xs text-zinc-700">
                <span className="text-[#00f0ff]">root@hell_codex</span>
                <span className="text-zinc-600">:~$</span>
                <TerminalCursor />
              </div>
            </motion.div>
          ) : booting ? (
            <motion.div key="booting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-zinc-500 space-y-1">
              <div>opening {activePost.filename}...</div>
              <div>decrypting...<TerminalCursor /></div>
            </motion.div>
          ) : (
            <motion.div key="post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => { setActivePost(null); setNotionContent([]); }} className="text-xs text-zinc-600 hover:text-[#00f0ff] transition-colors mb-8 tracking-widest">
                ← cd ..
              </button>

              <div className="mb-10 border-b border-zinc-800 pb-8">
                <div className="text-[10px] text-[#00f0ff] tracking-widest mb-3">{activePost.classification}</div>
                <h1 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight leading-snug mb-4">{activePost.title}</h1>
                <div className="flex items-center gap-4 text-[10px] text-zinc-600 flex-wrap">
                  <span>ARTURIOUS_CASTILLO</span>
                  <span>//</span>
                  <span>{activePost.date ?? "UNDATED"}</span>
                  <span>//</span>
                  <span>{activePost.filename}</span>
                </div>
              </div>

              {postLoading ? (
                <div className="text-xs text-zinc-600">loading transmission...<TerminalCursor /></div>
              ) : (
                <PostContent content={activePost.isStatic ? (activePost.content ?? []) : notionContent} />
              )}

              <div className="mt-12 border border-[#00f0ff]/20 bg-[#00f0ff]/5 p-6">
                <div className="text-[10px] text-[#00f0ff] tracking-widest mb-2">// WANT THE FIRST 4 CHAPTERS?</div>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">Reply to castascendancy@gmail.com. No strings. Just infrastructure failure and existential dread.</p>
                <a href="mailto:castascendancy@gmail.com" className="text-xs text-[#00f0ff] hover:text-white transition-colors tracking-widest">
                  SEND REQUEST →
                </a>
              </div>

              <div className="mt-10 text-xs text-zinc-700">
                <span className="text-[#00f0ff]">root@hell_codex</span>
                <span className="text-zinc-600">:~$</span>
                <TerminalCursor />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
