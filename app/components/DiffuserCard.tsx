"use client";
import { motion } from "framer-motion";
import { SprayCan } from "lucide-react";
import { DiffuserDevice } from "@/lib/data";

const MINT = "#8FD6B5";
const PUFFS = [
  { x: -14, delay: 0,    size: 26 },
  { x: 6,   delay: 0.35, size: 34 },
  { x: -4,  delay: 0.7,  size: 22 },
  { x: 16,  delay: 1.05, size: 30 },
  { x: -18, delay: 1.4,  size: 24 },
];

export default function DiffuserCard({ device, onToggle }: { device: DiffuserDevice; onToggle: () => void }) {
  const { on, name, zone, label } = device;

  return (
    <motion.div
      layout
      className="panel relative flex flex-col justify-between overflow-hidden rounded-3xl p-5"
      style={{ minHeight: 172 }}
      animate={{
        borderColor: on ? `${MINT}CC` : "rgba(255,255,255,0.09)",
        boxShadow: on
          ? `0 0 30px -2px ${MINT}88, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <motion.div className="mt-0.5" animate={{ rotate: on ? [0, -6, 6, -4, 0] : 0 }} transition={on ? { duration: 0.6, repeat: Infinity, repeatDelay: 0.7 } : { duration: 0.3 }}>
            <SprayCan size={22} strokeWidth={1.5} color={on ? MINT : "#8B8D91"} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-sans text-[15px] leading-tight text-ivory">{name}</span>
            {label && <span className="mt-0.5 max-w-[150px] font-mono text-[10.5px] leading-snug text-muted">{label}</span>}
            {zone && <span className="font-mono text-[10.5px]" style={{ color: on ? MINT : "#8B8D91" }}>{zone}</span>}
          </div>
        </div>
        <button onClick={onToggle} className="switch-track" aria-label={`Toggle ${name}`}>
          <motion.div className="switch-thumb" animate={{ x: on ? 22 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </button>
      </div>

      {/* mist puffs rise while spraying */}
      <div className="pointer-events-none absolute bottom-10 right-10 h-0 w-0">
        {on &&
          PUFFS.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full blur-md"
              style={{ width: p.size, height: p.size, left: p.x, background: MINT }}
              initial={{ y: 0, opacity: 0, scale: 0.4 }}
              animate={{ y: -70, opacity: [0, 0.5, 0], scale: [0.4, 1.4, 1.9], x: [0, p.x * 0.6, p.x] }}
              transition={{ duration: 2.1, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
            />
          ))}
      </div>

      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-muted">
        <span>Status</span>
        <motion.span key={on ? "on" : "off"} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} style={{ color: on ? MINT : undefined }}>
          {on ? "Spraying" : "Idle"}
        </motion.span>
      </div>
    </motion.div>
  );
}