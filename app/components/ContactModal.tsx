"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_hojm71v";
const TEMPLATE_ID = "template_jh4m6fu";
const PUBLIC_KEY = "Ii5JGREz7U85eTZ7T";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors tracking-widest uppercase"
              >
                Close
              </button>

              {/* Header */}
              <div className="mb-10">
                <div className="font-mono text-[10px] text-[#c8f542] tracking-[0.2em] uppercase mb-3">
                  Get In Touch
                </div>
                <h3 className="text-3xl font-bold tracking-tight">
                  Let's work together.
                </h3>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="text-[#c8f542] font-mono text-xs tracking-[0.2em] uppercase mb-3">
                    Message Sent
                  </div>
                  <p className="text-zinc-400 font-mono text-xs leading-relaxed">
                    I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-zinc-600 tracking-[0.15em] uppercase">
                      Name
                    </label>
                    <input
                      name="from_name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="bg-transparent border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-zinc-600 tracking-[0.15em] uppercase">
                      Email
                    </label>
                    <input
                      name="reply_to"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-transparent border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-zinc-600 tracking-[0.15em] uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="bg-transparent border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative mt-2 border border-zinc-800 px-8 py-4 font-mono text-xs tracking-[0.15em] uppercase text-zinc-100 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="absolute inset-0 bg-[#c8f542] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </span>
                  </button>

                  {status === "error" && (
                    <p className="font-mono text-[10px] text-red-500 tracking-wider">
                      Something went wrong. Try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}