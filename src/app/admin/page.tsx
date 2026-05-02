"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllResi, deleteResi, updateStatus } from "@/lib/store";
import type { Resi, StatusPesanan } from "@/types/resi";

const statusBadge: Record<StatusPesanan, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  diambil: "bg-green-100 text-green-700 border-green-200",
  expired: "bg-gray-100 text-gray-600 border-gray-200",
};

const kotakBadge = {
  A: "bg-rose-100 text-rose-700",
  B: "bg-sky-100 text-sky-700",
  C: "bg-violet-100 text-violet-700",
} as const;

export default function AdminDashboard() {
  const [list, setList] = useState<Resi[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setList(getAllResi());
    setLoaded(true);
  }, []);

  function refresh() {
    setList(getAllResi());
  }

  function handleDelete(id: string) {
    if (!confirm("Hapus resi ini?")) return;
    deleteResi(id);
    refresh();
  }

  function handleStatusChange(id: string, status: StatusPesanan) {
    updateStatus(id, status);
    refresh();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pesanan dan resi paket</p>
        </div>
        <Link
          href="/admin/tambah"
          className="bg-[#29C5F6] hover:bg-sky-500 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Resi
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Daftar Pesanan</h2>
        </div>

        {!loaded ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">Memuat...</div>
        ) : list.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-gray-500 text-sm mb-3">Belum ada pesanan.</p>
            <Link
              href="/admin/tambah"
              className="text-[#29C5F6] font-medium text-sm hover:underline"
            >
              Tambah pesanan pertama →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Image</th>
                  <th className="px-6 py-3 text-left font-medium">Nomor Resi</th>
                  <th className="px-6 py-3 text-left font-medium">Harga COD</th>
                  <th className="px-6 py-3 text-left font-medium">Kotak</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Dibuat</th>
                  <th className="px-6 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      {r.image ? (
                        <button
                          onClick={() => setPreview(r.image)}
                          className="block group"
                          title="Klik untuk perbesar"
                        >
                          <Image
                            src={r.image}
                            alt={r.nomorResi}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 group-hover:border-[#29C5F6] transition-colors"
                            unoptimized
                          />
                        </button>
                      ) : (
                        <div
                          className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"
                          title="Menunggu foto dari ESP32-CAM"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3 font-mono font-medium text-gray-900">
                      {r.nomorResi}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      Rp {r.hargaCOD.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${kotakBadge[r.kotak]}`}>
                        {r.kotak}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, e.target.value as StatusPesanan)
                        }
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border outline-none cursor-pointer ${statusBadge[r.status]}`}
                      >
                        <option value="pending">pending</option>
                        <option value="diambil">diambil</option>
                        <option value="expired">expired</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs">
                      {formatDate(r.createdAt)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 cursor-zoom-out"
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-medium"
            >
              Tutup ✕
            </button>
            <Image
              src={preview}
              alt="preview"
              width={800}
              height={800}
              className="w-full h-auto rounded-xl"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}


function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
