"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { CameraDevice } from "@/lib/data";

function Placeholder() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#161a1e] to-[#0b0d0f]">
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)" }}
      />
      <motion.div
        className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{ y: ["-100%", "600%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative font-mono text-[11px] text-muted">No signal · add a feed in data.ts</span>
    </div>
  );
}

function Feed({ feed }: { feed: CameraDevice["feed"] }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (feed?.type !== "snapshot") return;
    const t = setInterval(() => setTick((x) => x + 1), feed.refreshMs ?? 2000);
    return () => clearInterval(t);
  }, [feed]);

  if (!feed) return <Placeholder />;
  if (feed.type === "iframe") {
    return <iframe src={feed.url} className="h-full w-full border-0" allow="autoplay; fullscreen" />;
  }
  const src = feed.type === "snapshot" ? `${feed.url}${feed.url.includes("?") ? "&" : "?"}t=${tick}` : feed.url;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />;
}

export default function CameraCard({ device }: { device: CameraDevice }) {
  const { name, label, feed } = device;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <motion.div
        layout
        role="button"
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.98 }}
        className="panel col-span-2 flex flex-col gap-3 rounded-3xl p-4"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="font-sans text-[15px] leading-tight text-ivory">{name}</span>
            {label && <span className="font-mono text-[10.5px] text-muted">{label}</span>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: feed ? "#E5645A" : "#8B8D91" }}>
              <motion.span
                className="h-2 w-2 rounded-full"
                style={{ background: feed ? "#E5645A" : "#8B8D91" }}
                animate={feed ? { opacity: [1, 0.25, 1] } : { opacity: 0.6 }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              {feed ? "LIVE" : "OFFLINE"}
            </div>
            <Maximize2 size={16} className="text-muted" />
          </div>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black">
          <Feed feed={feed} />
        </div>
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-black"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Feed feed={feed} />
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-ivory active:scale-90"
                    aria-label="Close camera"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-4 left-5 font-sans text-sm text-ivory drop-shadow">{name}</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}