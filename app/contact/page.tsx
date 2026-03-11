"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import emailjs from "@emailjs/browser";

// ── Swap these with your actual EmailJS credentials ────────────────────────
const EMAILJS_SERVICE_ID  = "service_hojm71v";
const EMAILJS_TEMPLATE_ID = "template_jh4m6fu";
const EMAILJS_PUBLIC_KEY  = "Ii5JGREz7U85eTZ7T";

function TerminalCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 bg-[#00f0ff] ml-0.5 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
    />
  );
}

type Field = "name" | "email" | "subject" | "message";

const FIELDS: { key: Field; label: string; placeholder: string; multiline?: boolean }[] = [
  { key: "name",    label: "SENDER_ID",          placeholder: "your name" },
  { key: "email",   label: "RETURN_ADDRESS",      placeholder: "your@email.com" },
  { key: "subject", label: "TRANSMISSION_TYPE",   placeholder: "project / collab / other" },
  { key: "message", label: "MESSAGE_BODY",         placeholder: "what's the transmission?", multiline: true },
];

type Status = "idle" | "transmitting" | "sent" | "error";

export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [active, setActive] = useState<Field | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("transmitting");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || "New transmission",
          message:      form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 font-mono">
      {/* Scan lines */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Top bar */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-zinc-600 ml-2">contact_terminal — bash</span>
        </div>
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase">
          ← back
        </Link>
      </div>

      {/* Main */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-[#00f0ff] text-xs mb-1">CONTACT_TERMINAL v1.0.0 — initialized</div>
          <div className="text-zinc-600 text-xs mb-1">CLASSIFICATION: OPEN // DIRECT LINE</div>
          <div className="text-zinc-600 text-xs mb-6">RECIPIENT: ARTURIOUS_CASTILLO // LORD_PROFIT</div>
          <div className="text-2xl md:text-4xl font-bold text-zinc-100 tracking-tight mb-1">OPEN CHANNEL</div>
          <div className="text-xs text-zinc-600 tracking-widest">
            TRANSMIT YOUR MESSAGE DIRECTLY<TerminalCursor />
          </div>
        </motion.div>

        {/* Prompt */}
        <motion.div className="text-xs text-zinc-600 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <span className="text-[#00f0ff]">root@contact_terminal</span>
          <span className="text-zinc-200">:~$</span>
          <span className="text-zinc-200 ml-2">compose_message --recipient=castillo</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "idle" || status === "transmitting" || status === "error" ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">

              {FIELDS.map((field, i) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className={`border transition-all duration-300 ${
                    active === field.key
                      ? "border-[#00f0ff]/40 bg-[#00f0ff]/5"
                      : "border-zinc-800 hover:border-zinf-500"
                  }`}
                >
                  <div className="px-5 pt-4 pb-1">
                    <div className="text-[10px] text-[#00f0ff] tracking-widest mb-2">// {field.label}</div>
                    {field.multiline ? (
                      <textarea
                        rows={5}
                        value={form[field.key]}
                        placeholder={field.placeholder}
                        onFocus={() => setActive(field.key)}
                        onBlur={() => setActive(null)}
                        onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinf-500 outline-none resize-none leading-relaxed pb-3"
                      />
                    ) : (
                      <input
                        type={field.key === "email" ? "email" : "text"}
                        value={form[field.key]}
                        placeholder={field.placeholder}
                        onFocus={() => setActive(field.key)}
                        onBlur={() => setActive(null)}
                        onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinf-500 outline-none pb-3"
                      />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Error state */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-red-500/20 bg-red-500/5 px-5 py-4 text-xs text-red-400 tracking-widest"
                >
                  // TRANSMISSION FAILED — check credentials or try direct email
                </motion.div>
              )}

              {/* Submit */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={status === "transmitting" || !form.name || !form.email || !form.message}
                  className="w-full border border-zinc-800 hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/5 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 p-5 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-zinc-400 tracking-widest group-hover:text-[#00f0ff] transition-colors">
                      {status === "transmitting" ? (
                        <span className="flex items-center gap-2">TRANSMITTING<TerminalCursor /></span>
                      ) : (
                        "TRANSMIT MESSAGE →"
                      )}
                    </div>
                    {status === "idle" && (
                      <div className="text-[10px] text-zinf-500 group-hover:text-[#00f0ff]/60 transition-colors">ENTER</div>
                    )}
                  </div>
                </button>
              </motion.div>

              {/* Direct channels */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-4 border-t border-zinc-900">
                <div className="text-[10px] text-zinf-500 tracking-widest mb-3">// DIRECT CHANNELS</div>
                <div className="space-y-2">
                  {[
                    { label: "EMAIL",  value: "castascendancy@gmail.com",          href: "mailto:castascendancy@gmail.com" },
                    { label: "BLOG",   value: "hell_codex — mythology as infrastructure failure", href: "/blog" },
                    { label: "DESIGN", value: "visual identity work",              href: "/design" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} className="flex items-center gap-4 text-xs text-zinc-600 hover:text-[#00f0ff] transition-colors group">
                      <span className="text-[10px] text-zinf-500 group-hover:text-[#00f0ff]/60 w-16 flex-shrink-0">{item.label}</span>
                      <span className="text-zinc-200 group-hover:text-zinc-200 transition-colors">{item.value}</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          ) : (
            <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="text-xs text-zinc-200 space-y-1">
                <div>compressing payload...</div>
                <div>encrypting transmission...</div>
                <div>routing through channel...</div>
                <div className="text-[#00f0ff]">TRANSMISSION SUCCESSFUL ✓</div>
              </div>

              <div className="mt-8 border border-[#00f0ff]/20 bg-[#00f0ff]/5 p-6">
                <div className="text-[10px] text-[#00f0ff] tracking-widest mb-2">// MESSAGE RECEIVED</div>
                <p className="text-xs text-zinc-200 mb-4 leading-relaxed">
                  Your transmission has been logged. I'll respond within 24–48 hours.
                </p>
                <button onClick={reset} className="text-xs text-[#00f0ff] hover:text-white transition-colors tracking-widest">
                  SEND ANOTHER →
                </button>
              </div>

              <div className="mt-10 text-xs text-zinf-500">
                <span className="text-[#00f0ff]">root@contact_terminal</span>
                <span className="text-zinc-600">:~$</span>
                <TerminalCursor />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "idle" && (
          <motion.div className="mt-12 text-xs text-zinf-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="text-[#00f0ff]">root@contact_terminal</span>
            <span className="text-zinc-600">:~$</span>
            <TerminalCursor />
          </motion.div>
        )}
      </div>
    </div>
  );
}