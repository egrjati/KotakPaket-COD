"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addResi, findResi } from "@/lib/store";
import type { KotakUang } from "@/types/resi";

export default function TambahResiPage() {
  const router = useRouter();
  const [nomorResi, setNomorResi] = useState("");
  const [hargaCOD, setHargaCOD] = useState("");
  const [kotak, setKotak] = useState<KotakUang>("A");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!nomorResi.trim()) e.nomorResi = "Nomor resi wajib diisi";
    else if (findResi(nomorResi)) e.nomorResi = "Nomor resi sudah terdaftar";

    const harga = Number(hargaCOD);
    if (!hargaCOD.trim()) e.hargaCOD = "Harga COD wajib diisi";
    else if (isNaN(harga) || harga <= 0) e.hargaCOD = "Harga COD tidak valid";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    addResi({
      nomorResi: nomorResi.trim().toUpperCase(),
      hargaCOD: Number(hargaCOD),
      kotak,
    });
    router.push("/admin");
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-3"
        >
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Resi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Buat pesanan baru dengan nomor resi unik
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        {/* Nomor Resi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nomor Resi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={nomorResi}
            onChange={(e) => setNomorResi(e.target.value.toUpperCase())}
            placeholder="Contoh: JX123456RD"
            className={`w-full px-4 py-2.5 border rounded-lg outline-none font-mono text-sm transition-colors ${
              errors.nomorResi
                ? "border-red-300 bg-red-50"
                : "border-gray-300 focus:border-[#29C5F6]"
            }`}
          />
          {errors.nomorResi && (
            <p className="text-xs text-red-500 mt-1">{errors.nomorResi}</p>
          )}
        </div>

        {/* Harga COD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Harga COD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              Rp
            </span>
            <input
              type="number"
              value={hargaCOD}
              onChange={(e) => setHargaCOD(e.target.value)}
              placeholder="150000"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none text-sm transition-colors ${
                errors.hargaCOD
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#29C5F6]"
              }`}
            />
          </div>
          {errors.hargaCOD && (
            <p className="text-xs text-red-500 mt-1">{errors.hargaCOD}</p>
          )}
        </div>

        {/* Kotak Uang */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kotak Uang <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["A", "B", "C"] as KotakUang[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKotak(k)}
                className={`py-4 rounded-lg border-2 font-bold text-2xl transition-all ${
                  kotak === k
                    ? "border-[#29C5F6] bg-sky-50 text-[#29C5F6]"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                LACI {k}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Pilih laci tempat uang COD disimpan
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Link
            href="/admin"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#29C5F6] hover:bg-sky-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {submitting ? "Menyimpan..." : "Simpan Resi"}
          </button>
        </div>
      </form>
    </div>
  );
}
