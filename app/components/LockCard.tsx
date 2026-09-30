"use client";
import { motion } from "framer-motion";
import { LockDevice } from "@/lib/data";

const BRASS = "#C89B5C";
const TEAL = "#6FA8A0";

export default function LockCard({ device, onToggle }: { device: LockDevice; onToggle: () => void }) {
  const { name, locked } = device;
  const color = locked ? BRASS : TEAL;

  return (
    <motion.button
      layout
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className="panel relative flex flex-col items-center justify-between overflow-hidden rounded-3xl p-5"
      style={{ minHeight: 172 }}
    >
      <span className="z-10 w-full text-left font-sans text-[15px] text-ivory">{name}</span>

      {/* glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        animate={{ backgroundColor: color, opacity: locked ? 0.12 : 0.22 }}
        transition={{ duration: 0.5 }}
      />

      <svg width="88" height="96" viewBox="0 -12 72 92" fill="none" className="z-10 overflow-visible">
        {/* shackle: pivots on its bottom-right leg, swings open to the left */}
        <motion.path
          d="M20 36 V24 a16 16 0 0 1 32 0 V36"
          strokeWidth="5"
          strokeLinecap="round"
          initial={false}
          style={{ originX: 1, originY: 1 }}
          animate={{
            stroke: color,
            y: locked ? 0 : -8,
            rotate: locked ? 0 : 38,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        />

        {/* body */}
        <motion.rect
          x="8"
          y="36"
          width="56"
          height="40"
          rx="10"
          fill="rgba(255,255,255,0.06)"
          strokeWidth="2.5"
          initial={false}
          animate={{ stroke: color }}
          transition={{ duration: 0.4 }}
        />

        {/* keyhole */}
        <motion.circle cx="36" cy="52" r="5" initial={false} animate={{ fill: color }} transition={{ duration: 0.4 }} />
        <motion.rect x="34" y="55" width="4" height="10" rx="2" initial={false} animate={{ fill: color }} transition={{ duration: 0.4 }} />
      </svg>

      <motion.span
        key={locked ? "locked" : "unlocked"}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 font-mono text-[11px] uppercase tracking-wider"
        style={{ color }}
      >
        {locked ? "Secured" : "Unlocked"}
      </motion.span>
    </motion.button>
  );
}