"use client";
import { motion } from "framer-motion";
import { LockDevice } from "@/lib/data";

export default function LockCard({ device, onToggle }: { device: LockDevice; onToggle: () => void }) {
  const { name, locked } = device;
  return (
    <motion.button layout onClick={onToggle} className="panel flex flex-col items-center justify-between rounded-3xl p-5" style={{ minHeight: 172 }} whileTap={{ scale: 0.97 }}>
      <span className="w-full text-left font-sans text-[15px] text-ivory">{name}</span>
      <div className="relative flex h-16 w-10 items-center justify-center rounded-lg border border-line bg-black/20">
        <motion.div className="absolute h-8 w-3 rounded-full" style={{ background: locked ? "#C89B5C" : "#6FA8A0" }} animate={{ y: locked ? -10 : 10 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} />
      </div>
      <motion.span key={locked ? "locked" : "unlocked"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-[11px] uppercase tracking-wider" style={{ color: locked ? "#C89B5C" : "#6FA8A0" }}>
        {locked ? "Secured" : "Unlocked"}
      </motion.span>
    </motion.button>
  );
}