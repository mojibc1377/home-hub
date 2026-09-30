"use client";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { LightDevice } from "@/lib/data";

export default function LightCard({ device, onToggle, onBrightness }: { device: LightDevice; onToggle: () => void; onBrightness: (v: number) => void }) {
  const { on, brightness, name, color, zone, label } = device;
  const dimmable = device.dimmable !== false;
  const level = dimmable ? brightness / 100 : 1;

  return (
    <motion.div
      layout
      className="panel relative flex flex-col justify-between overflow-hidden rounded-3xl p-5"
      style={{ minHeight: 172 }}
      animate={{
        borderColor: on ? `${color}CC` : "rgba(255,255,255,0.09)",
        boxShadow: on
          ? `0 0 ${16 + level * 22}px -2px ${color}${on ? "88" : "00"}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      transition={{ duration: 0.45 }}
    >
      {/* soft internal glow */}
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
        animate={{ backgroundColor: color, opacity: on ? 0.08 + level * 0.25 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <motion.div className="mt-0.5" animate={{ scale: on ? 1.08 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <Lightbulb size={22} strokeWidth={1.5} color={on ? color : "#8B8D91"} fill={on ? color : "transparent"} fillOpacity={on ? 0.35 + level * 0.65 : 0} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-sans text-[15px] leading-tight text-ivory">{name}</span>
            {label && <span className="mt-0.5 font-mono text-[10.5px] text-muted">{label}</span>}
            {zone && <span className="font-mono text-[10.5px]" style={{ color: on ? color : "#8B8D91" }}>{zone}</span>}
          </div>
        </div>
        <button onClick={onToggle} className="switch-track" aria-label={`Toggle ${name}`}>
          <motion.div className="switch-thumb" animate={{ x: on ? 22 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </button>
      </div>

      <div className="relative z-10">
        {dimmable ? (
          <>
            <input
              type="range" min={0} max={100} value={brightness} disabled={!on}
              onChange={(e) => onBrightness(Number(e.target.value))}
              className="w-full" style={{ accentColor: color, opacity: on ? 1 : 0.3 }}
            />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
              <span>Brightness</span>
              <span style={{ color: on ? color : undefined }}>{on ? `${brightness}%` : "off"}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between font-mono text-[11px] text-muted">
            <span>Power</span>
            <motion.span key={on ? "on" : "off"} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} style={{ color: on ? color : undefined }}>
              {on ? "On" : "Off"}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}