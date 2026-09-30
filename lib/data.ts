type Base = { id: string; name: string; zone?: string };

export type LightDevice = Base & {
  kind: "light";
  on: boolean;
  brightness: number;
  color: string;
  dimmable?: boolean; // defaults to true; set false for on/off-only lights
  label?: string;     // small descriptor shown on the card
}; export type BlindDevice = Base & { kind: "blind"; position: number };
export type CameraFeed = { type: "mjpeg" | "snapshot" | "iframe"; url: string; refreshMs?: number };

export type CameraDevice = Base & {
  kind: "camera";
  label?: string;
  feed?: CameraFeed; // leave undefined until you have a stream URL
};

export type Device = LightDevice | BlindDevice | LockDevice | ClimateDevice | SpeakerDevice | DiffuserDevice | CameraDevice;
export type LockDevice = Base & { kind: "lock"; locked: boolean };
export type ClimateDevice = Base & { kind: "climate"; target: number; current: number; mode: "heat" | "cool" | "auto" };
export type SpeakerDevice = Base & { kind: "speaker"; playing: boolean; track: string; artist: string };
export type Room = { id: string; name: string; subtitle: string; devices: Device[] };
export type DiffuserDevice = Base & {
  kind: "diffuser";
  on: boolean;
  label?: string;
};


const PINK = "#F26BA8";
const WHITE = "#F5F1E8";
const DESK_LED = "#9D7CFF"; // change to match your desk LED
const SUNNY = "#FFC53D";
export const rooms: Room[] = [
  {
    id: "living", name: "Living Room", subtitle: "", devices: [
      // TV area
      { kind: "light", id: "tv-pink", zone: "TV area", name: "Pink LED", label: "LED · on/off only", dimmable: false, color: PINK, on: true, brightness: 100 },
      { kind: "light", id: "tv-sun", zone: "TV area", name: "Sunny halogen", label: "Side halogen", dimmable: false, color: SUNNY, on: true, brightness: 45 },

      { kind: "light", id: "tv-white", zone: "TV area", name: "White lamp", label: "Lamp · dimmable", color: WHITE, on: false, brightness: 70 },
      { kind: "climate", id: "c1", zone: "TV area", name: "Thermostat", target: 22, current: 21, mode: "auto" },
      { kind: "blind", id: "b1", zone: "TV area", name: "Curtains", position: 70 },
      { kind: "speaker", id: "s1", zone: "TV area", name: "Living speaker", playing: true, track: "Nocturne No. 2", artist: "Chopin, F." },
      // Dining area
      { kind: "light", id: "din-pink", zone: "Dining area", name: "Pink LED", label: "LED · on/off only", dimmable: false, color: PINK, on: false, brightness: 100 },
      { kind: "light", id: "din-sun", zone: "Dining area", name: "Sunny halogen", label: "Side halogen", dimmable: false, color: SUNNY, on: true, brightness: 45 },
      { kind: "light", id: "din-white", zone: "Dining area", name: "White lamp", label: "Lamp · dimmable", color: WHITE, on: true, brightness: 80 },
      { kind: "diffuser", id: "air1", zone: "Dining area", name: "Air freshener", label: "Puff on demand · sprays nonstop while on", on: false },
    ]
  },
  {
    id: "bedroom", name: "Bedroom", subtitle: "", devices: [
      { kind: "light", id: "bed-pink", name: "Pink lamp", label: "Lamp · on/off only", dimmable: false, color: PINK, on: false, brightness: 100 },
      { kind: "light", id: "bed-white", name: "White lamp", label: "Lamp · dimmable", color: WHITE, on: false, brightness: 60 },
      { kind: "blind", id: "b2", name: "Curtains", position: 10 },
    ]
  },
  {
    id: "office", name: "Office", subtitle: "", devices: [
      { kind: "speaker", id: "s2", name: "Desk speaker", playing: false, track: "Deep Focus", artist: "Ambient Collective" },
      { kind: "blind", id: "b3", name: "Curtains", position: 40 },
      { kind: "light", id: "off-led", name: "Desk LED", label: "LED · under the desk", dimmable: false, color: DESK_LED, on: true, brightness: 70 },
      { kind: "light", id: "off-pink", name: "Pink light", label: "Light · on/off only", dimmable: false, color: PINK, on: false, brightness: 100 },
      { kind: "light", id: "off-white", name: "White light", label: "Light · dimmable", color: WHITE, on: true, brightness: 85 },
    ]
  },
  {
    id: "outdoor", name: "Outdoor", subtitle: "", devices: [
      { kind: "light", id: "l7", name: "Porch", label: "Porch light · dimmable", color: SUNNY, on: true, brightness: 55 },
      { kind: "lock", id: "d1", name: "Front door", locked: true },
      { kind: "lock", id: "d2", name: "Garage", locked: true },
    ]
  },
  {
    id: "cameras", name: "Cameras", subtitle: "", devices: [
      { kind: "camera", id: "cam1", name: "Camera 1", label: "Living room" },
      // { kind: "camera", id: "cam2", name: "Entrance", label: "Front door",
      //   feed: { type: "mjpeg", url: "http://192.168.1.50:1984/api/stream.mjpeg?src=entrance" } },
      { kind: "camera", id: "cam2", name: "Camera 2", label: "Entrance" },
    ]
  },
];

export const scenes = [
  { id: "morning", name: "Morning" },
  { id: "focus", name: "Focus" },
  { id: "evening", name: "Evening" },
  { id: "movie", name: "Movie" },
  { id: "away", name: "Away" },
];