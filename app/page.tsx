"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rooms as initialRooms, scenes, Room, Device } from "@/lib/data";
import BlindCard from "./components/BlindCard";
import CameraCard from "./components/CameraCard";
import DiffuserCard from "./components/DiffuserCard";
import LightCard from "./components/LightCard";
import LockCard from "./components/LockCard";
import RoomRail from "./components/RoomRail";
import SceneDock from "./components/SceneDock";
import SpeakerCard from "./components/SpeakerCard";
import StatusBar from "./components/StatusBar";
import ThermostatDial from "./components/ThermostatDial";


function activeCount(devices: Device[]) {
  return devices.filter(
    (d) => (d.kind === "light" && d.on) || (d.kind === "diffuser" && d.on) || (d.kind === "speaker" && d.playing)
  ).length;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].id);
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const activeRoom = rooms.find((r) => r.id === activeRoomId)!;

  // live subtitles for the room rail
  const railRooms = rooms.map((r) => {
    const cams = r.devices.filter((d) => d.kind === "camera").length;
    const n = activeCount(r.devices);
    return { ...r, subtitle: cams > 0 && cams === r.devices.length ? `${cams} cameras` : n ? `${n} active` : "All off" };
  });

  function updateDevice(roomId: string, deviceId: string, patch: Partial<Device>) {
    setRooms((prev) => prev.map((room) => room.id !== roomId ? room : {
      ...room,
      devices: room.devices.map((d) => d.id === deviceId ? ({ ...d, ...patch } as Device) : d),
    }));
  }

  function toggleZone(roomId: string, zone: string) {
    setRooms((prev) => prev.map((room) => {
      if (room.id !== roomId) return room;
      const anyOn = room.devices.some((d) => d.zone === zone && d.kind === "light" && d.on);
      return {
        ...room,
        devices: room.devices.map((d) => d.zone === zone && d.kind === "light" ? { ...d, on: !anyOn } : d),
      };
    }));
  }

  const groups = activeRoom.devices.reduce<{ zone: string; devices: Device[] }[]>((acc, d) => {
    const zone = d.zone ?? "";
    let g = acc.find((x) => x.zone === zone);
    if (!g) { g = { zone, devices: [] }; acc.push(g); }
    g.devices.push(d);
    return acc;
  }, []);

  function renderDevice(device: Device) {
    const id = activeRoom.id;
    switch (device.kind) {
      case "light": return <LightCard key={device.id} device={device} onToggle={() => updateDevice(id, device.id, { on: !device.on })} onBrightness={(v) => updateDevice(id, device.id, { brightness: v })} />;
      case "climate": return <ThermostatDial key={device.id} device={device} onChange={(v) => updateDevice(id, device.id, { target: v })} />;
      case "lock": return <LockCard key={device.id} device={device} onToggle={() => updateDevice(id, device.id, { locked: !device.locked })} />;
      case "blind": return <BlindCard key={device.id} device={device} onChange={(v) => updateDevice(id, device.id, { position: v })} />;
      case "speaker": return <SpeakerCard key={device.id} device={device} onToggle={() => updateDevice(id, device.id, { playing: !device.playing })} />;
      case "diffuser": return <DiffuserCard key={device.id} device={device} onToggle={() => updateDevice(id, device.id, { on: !device.on })} />;
      case "camera": return <CameraCard key={device.id} device={device} />;
    }
  }

  return (
    <main className="relative z-10 flex h-screen w-screen flex-col overflow-hidden">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <RoomRail rooms={railRooms} activeId={activeRoomId} onSelect={setActiveRoomId} />
        <div className="flex-1 overflow-y-auto px-10 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoomId}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <h1 className="font-display text-5xl font-light tracking-tight text-ivory">{activeRoom.name}</h1>

              {groups.map((group) => {
                const zoneLights = group.devices.filter((d) => d.kind === "light");
                const anyOn = zoneLights.some((d) => d.kind === "light" && d.on);
                return (
                  <section key={group.zone || "room"}>
                    {group.zone && (
                      <div className="mb-4 flex items-center gap-4">
                        <h2 className="font-display text-3xl font-light italic text-brass">{group.zone}</h2>
                        <div className="h-px flex-1 bg-line" />
                        {zoneLights.length > 0 && (
                          <button
                            onClick={() => toggleZone(activeRoom.id, group.zone)}
                            className="rounded-full border border-line px-4 py-1.5 font-sans text-xs text-muted active:scale-95"
                          >
                            {anyOn ? "All lights off" : "All lights on"}
                          </button>
                        )}
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-4">{group.devices.map(renderDevice)}</div>
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <SceneDock scenes={scenes} activeId={activeScene} onSelect={setActiveScene} />
    </main>
  );
}