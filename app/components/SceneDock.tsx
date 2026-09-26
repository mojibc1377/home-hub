"use client";
import { motion } from "framer-motion";

export default function SceneDock({ scenes, activeId, onSelect }: { scenes: { id: string; name: string }[]; activeId: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-10 py-6">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-muted">Scenes</span>
      {scenes.map((scene) => {
        const active = scene.id === activeId;
        return (
          <button key={scene.id} onClick={() => onSelect(scene.id)} className="relative rounded-full px-4 py-2">
            {active && <motion.div layoutId="scene-pill" className="absolute inset-0 rounded-full bg-brass" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className={`relative z-10 font-sans text-sm ${active ? "text-base font-medium" : "text-muted"}`} style={{ color: active ? "#0D0F11" : undefined }}>
              {scene.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}