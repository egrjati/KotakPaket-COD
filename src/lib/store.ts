import type { Resi, ResiInput, StatusPesanan } from "@/types/resi";

const KEY = "kotakpaket_resi";

function read(): Resi[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Resi[]) : [];
}

function write(data: Resi[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getAllResi(): Resi[] {
  return read();
}

export function findResi(nomor: string): Resi | undefined {
  return read().find(
    (r) => r.nomorResi.toLowerCase() === nomor.trim().toLowerCase()
  );
}

export function addResi(input: ResiInput): Resi {
  const all = read();
  const baru: Resi = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    image: null,
    createdAt: new Date().toISOString(),
  };
  write([baru, ...all]);
  return baru;
}

export function updateStatus(id: string, status: StatusPesanan) {
  const all = read();
  const idx = all.findIndex((r) => r.id === id);
  if (idx >= 0) {
    all[idx].status = status;
    write(all);
  }
}

export function deleteResi(id: string) {
  write(read().filter((r) => r.id !== id));
}
