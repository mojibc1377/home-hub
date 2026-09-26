"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rooms as initialRooms, scenes, Room, Device } from "@/lib/data";
import StatusBar from "./components/StatusBar";
import RoomRail from "./components/RoomRail";
import SceneDock from "./components/SceneDock";
import LightCard from "./components/LightCard";
import ThermostatDial from "./components/ThermostatDial";
import LockCard from "./components/LockCard";
import BlindCard from "./components/BlindCard";
import SpeakerCard from "./components/SpeakerCard";

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].id);
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const activeRoom = rooms.find((r) => r.id === activeRoomId)!;

  function updateDevice(roomId: string, deviceId: string, patch: Partial<Device>) {
    setRooms((prev) => prev.map((room) => room.id !== roomId ? room : {
      ...room,
      devices: room.devices.map((d) => d.id === deviceId ? ({ ...d, ...patch } as Device) : d),
    }));
  }

  return (
    <main className="relative z-10 flex h-screen w-screen flex-col overflow-hidden">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <RoomRail rooms={rooms} activeId={activeRoomId} onSelect={setActiveRoomId} />
        <div className="flex-1 overflow-y-auto px-10 py-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeRoomId} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-3 gap-4">
              {activeRoom.devices.map((device) => {
                switch (device.kind) {
                  case "light": return <LightCard key={device.id} device={device} onToggle={() => updateDevice(activeRoom.id, device.id, { on: !device.on })} onBrightness={(v) => updateDevice(activeRoom.id, device.id, { brightness: v })} />;
                  case "climate": return <ThermostatDial key={device.id} device={device} onChange={(v) => updateDevice(activeRoom.id, device.id, { target: v })} />;
                  case "lock": return <LockCard key={device.id} device={device} onToggle={() => updateDevice(activeRoom.id, device.id, { locked: !device.locked })} />;
                  case "blind": return <BlindCard key={device.id} device={device} onChange={(v) => updateDevice(activeRoom.id, device.id, { position: v })} />;
                  case "speaker": return <SpeakerCard key={device.id} device={device} onToggle={() => updateDevice(activeRoom.id, device.id, { playing: !device.playing })} />;
                  default: return null;
                }
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <SceneDock scenes={scenes} activeId={activeScene} onSelect={setActiveScene} />
    </main>
  );
}