"use client";
import { motion } from "framer-motion";
import { Room } from "@/lib/data";

export default function RoomRail({ rooms, activeId, onSelect }: { rooms: Room[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex h-full w-[220px] flex-col justify-center gap-1 border-r border-line pl-10 pr-4">
      {rooms.map((room) => {
        const active = room.id === activeId;
        return (
          <button key={room.id} onClick={() => onSelect(room.id)} className="relative flex flex-col items-start py-4 text-left">
            {active && (
              <motion.div layoutId="room-indicator" className="absolute -left-10 top-0 h-full w-[3px] bg-brass" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <motion.span animate={{ color: active ? "#EDEAE3" : "#8B8D91", opacity: active ? 1 : 0.7 }} transition={{ duration: 0.3 }} className="font-display text-2xl font-light italic">
              {room.name}
            </motion.span>
            <motion.span animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.25 }} className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-brass">
              {room.subtitle}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}