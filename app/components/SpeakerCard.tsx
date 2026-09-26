"use client";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { SpeakerDevice } from "@/lib/data";

export default function SpeakerCard({ device, onToggle }: { device: SpeakerDevice; onToggle: () => void }) {
  const { name, playing, track, artist } = device;
  return (
    <motion.div layout className="panel col-span-2 flex items-center justify-between rounded-3xl p-5" style={{ minHeight: 172 }}>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{name}</span>
        <span className="font-display text-xl italic text-ivory">{track}</span>
        <span className="text-sm text-muted">{artist}</span>
        <div className="mt-2 flex h-5 items-end gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span key={i} className="w-1 rounded-full bg-brass" style={{ height: 18, transformOrigin: "bottom" }}
              animate={playing ? { scaleY: [0.35, 1, 0.5, 1.15, 0.35] } : { scaleY: 0.25 }}
              transition={playing ? { duration: 1.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" } : { duration: 0.4 }} />
          ))}
        </div>
      </div>
      <button onClick={onToggle} className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-black/20 text-brass active:scale-90">
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </motion.div>
  );
}