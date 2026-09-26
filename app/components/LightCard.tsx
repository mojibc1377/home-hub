"use client";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { LightDevice } from "@/lib/data";

export default function LightCard({ device, onToggle, onBrightness }: { device: LightDevice; onToggle: () => void; onBrightness: (v: number) => void }) {
  const { on, brightness, name } = device;
  return (
    <motion.div layout className="panel flex flex-col justify-between rounded-3xl p-5" style={{ minHeight: 172 }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <motion.div animate={{ color: on ? "#C89B5C" : "#8B8D91", scale: on ? 1.05 : 1 }} transition={{ duration: 0.4 }}>
            <Lightbulb size={20} strokeWidth={1.5} fill={on ? "#C89B5C" : "transparent"} />
          </motion.div>
          <span className="font-sans text-[15px] text-ivory">{name}</span>
        </div>
        <button onClick={onToggle} className="switch-track" aria-label={`Toggle ${name}`}>
          <motion.div className="switch-thumb" animate={{ x: on ? 22 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </button>
      </div>
      <div>
        <input type="range" min={0} max={100} value={brightness} disabled={!on} onChange={(e) => onBrightness(Number(e.target.value))} className="w-full accent-brass" style={{ opacity: on ? 1 : 0.3 }} />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
          <span>Brightness</span>
          <span className="text-brass">{on ? `${brightness}%` : "off"}</span>
        </div>
      </div>
    </motion.div>
  );
}