"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloudSun } from "lucide-react";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function StatusBar() {
  const now = useNow();

  useEffect(() => {
    if (!now) return;
    const h = now.getHours();
    const root = document.documentElement;
    if (h >= 6 && h < 11) {
      root.style.setProperty("--glow-a", "rgba(200,155,92,0.16)");
      root.style.setProperty("--glow-b", "rgba(111,168,160,0.06)");
    } else if (h >= 11 && h < 17) {
      root.style.setProperty("--glow-a", "rgba(200,155,92,0.09)");
      root.style.setProperty("--glow-b", "rgba(111,168,160,0.09)");
    } else if (h >= 17 && h < 21) {
      root.style.setProperty("--glow-a", "rgba(200,155,92,0.20)");
      root.style.setProperty("--glow-b", "rgba(150,90,90,0.10)");
    } else {
      root.style.setProperty("--glow-a", "rgba(90,110,160,0.10)");
      root.style.setProperty("--glow-b", "rgba(111,168,160,0.05)");
    }
  }, [now?.getHours()]);

  const time = now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
  const date = now ? now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }) : "";

  return (
    <div className="flex items-baseline justify-between px-10 pt-8 pb-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex items-baseline gap-4">
        <span className="font-display text-6xl font-light tracking-tight text-ivory tabular-nums">{time}</span>
        <span className="font-sans text-sm text-muted">{date}</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-2.5">
        <CloudSun size={18} className="text-brass" strokeWidth={1.5} />
        <span className="font-mono text-sm text-ivory">24°</span>
        <span className="text-sm text-muted">Baku</span>
      </motion.div>
    </div>
  );
}