export type LightDevice = { kind: "light"; id: string; name: string; on: boolean; brightness: number };
export type BlindDevice = { kind: "blind"; id: string; name: string; position: number };
export type LockDevice = { kind: "lock"; id: string; name: string; locked: boolean };
export type ClimateDevice = { kind: "climate"; id: string; name: string; target: number; current: number; mode: "heat" | "cool" | "auto" };
export type SpeakerDevice = { kind: "speaker"; id: string; name: string; playing: boolean; track: string; artist: string };
export type Device = LightDevice | BlindDevice | LockDevice | ClimateDevice | SpeakerDevice;
export type Room = { id: string; name: string; subtitle: string; devices: Device[] };

export const rooms: Room[] = [
  { id: "living", name: "Living Room", subtitle: "3 devices active", devices: [
    { kind: "light", id: "l1", name: "Ceiling", on: true, brightness: 62 },
    { kind: "light", id: "l2", name: "Reading lamp", on: false, brightness: 40 },
    { kind: "climate", id: "c1", name: "Thermostat", target: 22, current: 21, mode: "auto" },
    { kind: "blind", id: "b1", name: "West blinds", position: 70 },
    { kind: "speaker", id: "s1", name: "Living speaker", playing: true, track: "Nocturne No. 2", artist: "Chopin, F." },
    { kind: "lock", id: "d1", name: "Front door", locked: true },
  ]},
  { id: "kitchen", name: "Kitchen", subtitle: "1 device active", devices: [
    { kind: "light", id: "l3", name: "Counter strip", on: true, brightness: 80 },
    { kind: "light", id: "l4", name: "Pendant", on: false, brightness: 50 },
    { kind: "climate", id: "c2", name: "Thermostat", target: 20, current: 22, mode: "cool" },
  ]},
  { id: "bedroom", name: "Bedroom", subtitle: "Quiet", devices: [
    { kind: "light", id: "l5", name: "Nightstand", on: false, brightness: 20 },
    { kind: "blind", id: "b2", name: "Blackout blind", position: 5 },
    { kind: "climate", id: "c3", name: "Thermostat", target: 19, current: 20, mode: "heat" },
  ]},
  { id: "office", name: "Office", subtitle: "2 devices active", devices: [
    { kind: "light", id: "l6", name: "Desk lamp", on: true, brightness: 90 },
    { kind: "speaker", id: "s2", name: "Desk speaker", playing: false, track: "Deep Focus", artist: "Ambient Collective" },
  ]},
  { id: "outdoor", name: "Outdoor", subtitle: "All secured", devices: [
    { kind: "light", id: "l7", name: "Porch", on: true, brightness: 55 },
    { kind: "lock", id: "d2", name: "Garage", locked: true },
  ]},
];

export const scenes = [
  { id: "morning", name: "Morning" },
  { id: "focus", name: "Focus" },
  { id: "evening", name: "Evening" },
  { id: "movie", name: "Movie" },
  { id: "away", name: "Away" },
];