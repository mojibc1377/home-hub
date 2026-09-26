"use client";
import { motion } from "framer-motion";
import { Minus, Plus, Flame, Snowflake, Waves } from "lucide-react";
import { ClimateDevice } from "@/lib/data";

const SIZE = 140, STROKE = 8, R = (SIZE - STROKE) / 2, CIRC = 2 * Math.PI * R;
const MODE_ICON = { heat: Flame, cool: Snowflake, auto: Waves };
const MODE_COLOR = { heat: "#C9856B", cool: "#6FA8A0", auto: "#C89B5C" };

export default function ThermostatDial({ device, onChange }: { device: ClimateDevice; onChange: (target: number) => void }) {
  const { name, target, current, mode } = device;
  const pct = Math.min(1, Math.max(0, (target - 10) / (30 - 10)));
  const offset = CIRC * (1 - pct * 0.75);
  const Icon = MODE_ICON[mode];
  const color = MODE_COLOR[mode];

  return (
    <motion.div layout className="panel flex flex-col items-center rounded-3xl p-5" style={{ minHeight: 172 }}>
      <div className="flex w-full items-center justify-between">
        <span className="font-sans text-[15px] text-ivory">{name}</span>
        <Icon size={16} strokeWidth={1.5} color={color} />
      </div>
      <div className="relative mt-1" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-[135deg]">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} strokeDasharray={`${CIRC * 0.75} ${CIRC}`} strokeLinecap="round" />
          <motion.circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={color} strokeWidth={STROKE} strokeDasharray={CIRC} strokeLinecap="round" animate={{ strokeDashoffset: offset }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-light text-ivory tabular-nums">{target}°</span>
          <span className="font-mono text-[11px] text-muted">now {current}°</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <button onClick={() => onChange(Math.max(10, target - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted active:scale-90"><Minus size={14} /></button>
        <button onClick={() => onChange(Math.min(30, target + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted active:scale-90"><Plus size={14} /></button>
      </div>
    </motion.div>
  );
}