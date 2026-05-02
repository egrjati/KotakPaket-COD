import type { Resi, ResiInput, StatusPesanan } from "@/types/resi";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toResi(raw: any): Resi {
  return {
    id: String(raw.id),
    nomorResi: raw.nomor_resi,
    hargaCOD: raw.harga_cod,
    kotak: raw.kotak,
    status: raw.status === "menunggu" ? "pending" : (raw.status as StatusPesanan),
    image: raw.image ? `${BASE}/storage/${raw.image}` : null,
    createdAt: raw.created_at,
  };
}

export async function getAllResi(): Promise<Resi[]> {
  const res = await fetch(`${BASE}/api/pesanan`, { headers });
  const data = await res.json();
  return data.map(toResi);
}

export async function findResi(nomor: string): Promise<Resi | null> {
  const all = await getAllResi();
  return (
    all.find(
      (r) => r.nomorResi.toLowerCase() === nomor.trim().toLowerCase()
    ) ?? null
  );
}

export async function addResi(input: ResiInput): Promise<Resi> {
  const res = await fetch(`${BASE}/api/pesanan`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      nomor_resi: input.nomorResi,
      harga_cod: input.hargaCOD,
      kotak: input.kotak,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
  return toResi(await res.json());
}

export async function updateStatus(
  id: string,
  status: StatusPesanan
): Promise<void> {
  const apiStatus = status === "pending" ? "menunggu" : status;
  await fetch(`${BASE}/api/pesanan/${id}/status`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ status: apiStatus }),
  });
}

export async function deleteResi(id: string): Promise<void> {
  await fetch(`${BASE}/api/pesanan/${id}`, {
    method: "DELETE",
    headers,
  });
}
