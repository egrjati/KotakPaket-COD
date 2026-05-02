export type KotakUang = "A" | "B" | "C";

export type StatusPesanan = "pending" | "diambil" | "expired";

export type Resi = {
  id: string;
  nomorResi: string;
  hargaCOD: number;
  kotak: KotakUang;
  status: StatusPesanan;
  image: string | null;
  createdAt: string;
};

export type ResiInput = {
  nomorResi: string;
  hargaCOD: number;
  kotak: KotakUang;
};
