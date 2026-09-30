"use client";
import { motion } from "framer-motion";
import { BlindDevice } from "@/lib/data";

const spring = { type: "spring" as const, stiffness: 120, damping: 22 };

const folds =
  "repeating-linear-gradient(90deg, rgba(200,155,92,0.32) 0px, rgba(200,155,92,0.10) 7px, rgba(200,155,92,0.32) 14px)";

export default function BlindCard({
  device,
  onChange,
}: {
  device: BlindDevice;
  onChange: (v: number) => void;
}) {
  const { name, position } = device;
  // position 0 = fully closed (panels meet in the middle), 100 = fully open (panels pushed to the edges)
  const panelWidth = `${(100 - position) / 2}%`;

  return (
    <motion.div
      layout
      className="panel flex flex-col justify-between rounded-3xl p-5"
      style={{ minHeight: 172 }}
    >
      <span className="font-sans text-[15px] text-ivory">{name}</span>

      <div className="relative mx-auto h-24 w-32">
        {/* curtain rod */}
        <div className="absolute -top-1 left-[-4px] right-[-4px] z-20 h-[3px] rounded-full bg-brassDim" />

        {/* window */}
        <div className="absolute inset-0 overflow-hidden rounded-md border border-line bg-gradient-to-b from-teal/15 to-transparent">
          {/* left curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 border-r border-brass/40"
            style={{ backgroundImage: folds }}
            animate={{ width: panelWidth }}
            transition={spring}
          />
          {/* right curtain */}
          <motion.div
            className="absolute inset-y-0 right-0 border-l border-brass/40"
            style={{ backgroundImage: folds }}
            animate={{ width: panelWidth }}
            transition={spring}
          />
        </div>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-brass"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
          <span>Open</span>
          <span className="text-brass">{position}%</span>
        </div>
      </div>
    </motion.div>
  );
}