"use client";
import { motion } from "framer-motion";
import { BlindDevice } from "@/lib/data";

export default function BlindCard({ device, onChange }: { device: BlindDevice; onChange: (v: number) => void }) {
  const { name, position } = device;
  return (
    <motion.div layout className="panel flex flex-col justify-between rounded-3xl p-5" style={{ minHeight: 172 }}>
      <span className="font-sans text-[15px] text-ivory">{name}</span>
      <div className="relative mx-auto h-24 w-16 overflow-hidden rounded-lg border border-line bg-black/20">
        <motion.div className="absolute inset-x-0 top-0 bg-gradient-to-b from-brass/30 to-brass/5" animate={{ height: `${100 - position}%` }} transition={{ type: "spring", stiffness: 120, damping: 22 }} />
        <div className="absolute inset-0 flex flex-col justify-between p-1 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-px w-full bg-ivory" />)}
        </div>
      </div>
      <input type="range" min={0} max={100} value={position} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-brass" />
      <div className="flex justify-between font-mono text-[11px] text-muted">
        <span>Open</span>
        <span className="text-brass">{position}%</span>
      </div>
    </motion.div>
  );
}