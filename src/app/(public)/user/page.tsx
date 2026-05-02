"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/layout/footer";
import { findResi, updateStatus } from "@/lib/store";
import type { Resi } from "@/types/resi";

function BoxIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="20" width="38" height="23" rx="3" fill="#F5A623" />
      <rect x="3" y="11" width="42" height="11" rx="3" fill="#E8941A" />
      <rect x="17" y="11" width="14" height="11" fill="#22C55E" />
      <rect x="17" y="20" width="14" height="6" fill="#16A34A" />
    </svg>
  );
}

function UserPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nomor = searchParams.get("resi") ?? "";

  const [resi, setResi] = useState<Resi | null | undefined>(undefined);
  const [showUang, setShowUang] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setResi(findResi(nomor) ?? null);
  }, [nomor]);

  function handleAmbilUang() {
    if (!resi) return;
    updateStatus(resi.id, "diambil");
    setShowUang(true);
  }

  if (resi === undefined) {
    return (
      <div className="min-h-screen bg-[#29C5F6] flex items-center justify-center">
        <p className="text-white text-sm">Memuat...</p>
      </div>
    );
  }

  if (resi === null) {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[390px] min-h-screen bg-[#29C5F6] flex flex-col items-center px-6 pt-14 pb-8">
          <div className="w-[84px] h-[84px] bg-white rounded-[22px] flex items-center justify-center shadow-md mb-8">
            <BoxIcon />
          </div>
          <div className="w-full bg-white rounded-2xl p-6 text-center">
            <p className="font-bold text-red-500 mb-2">Resi tidak ditemukan</p>
            <p className="text-sm text-gray-500 mb-4">
              Nomor resi yang anda masukkan tidak valid.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#29C5F6] text-white font-semibold px-5 py-2 rounded-lg text-sm"
            >
              Kembali
            </button>
          </div>
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-[#29C5F6] flex flex-col items-center px-6 pt-14 pb-8 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Box Icon */}
        <div className="w-[84px] h-[84px] bg-white rounded-[22px] flex items-center justify-center shadow-md mb-8">
          <BoxIcon />
        </div>

        {/* Main Box */}
        <div className="mx-4 w-full bg-white py-5 px-3 rounded-lg shadow-lg">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-semibold text-slate-600 text-lg">Resi Valid</h2>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-5 h-5 rounded-full bg-[#29C5F6] text-white text-xs font-bold flex items-center justify-center hover:bg-sky-400 transition-colors shrink-0"
              >
                !
              </button>
            </div>
            {showInfo && (
              <div className="flex gap-2 bg-sky-50 border border-sky-200 rounded-lg px-3 py-2 mb-2">
                <div>
                  <p className="text-xs font-semibold text-[#29C5F6] uppercase mb-0.5">Langkah Selanjutnya</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Setelah memasukkan resi dan terverifikasi valid, Smart Box otomatis membuka kunci laci — silahkan ambil uang paket tersebut.
                  </p>
                </div>
              </div>
            )}
            <p className="text-base font-medium text-gray-500">
              RESI : {resi.nomorResi}
            </p>
          </div>

          <hr className="mt-2 mb-3" />

          {/* Kotak Paket */}
          <div className="bg-[#29C5F6] w-full py-3 px-2 rounded-lg flex items-center justify-between">
            <div>
              <p className="uppercase text-sm font-medium text-white">
                silahkan ambil uang
              </p>

              <div className="flex gap-3 items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <p className="text-lg font-semibold text-white">LACI {resi.kotak}</p>
              </div>
            </div>

            <button
              onClick={handleAmbilUang}
              disabled={showUang}
              className="bg-green-400 text-white font-semibold px-3 py-1 rounded-lg border border-slate-600 hover:bg-green-700 hover:border-amber-50 shadow-2xs transition-colors disabled:opacity-60"
            >
              {showUang ? "Diambil" : "Ambil Uang"}
            </button>
          </div>

          {/* Total uang */}
          {showUang && (
            <div className="mt-3 border border-[#29C5F6] rounded-lg p-3">
              <p className="text-sm font-medium text-gray-500 uppercase mb-2">Total Uang</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#29C5F6]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                  <span className="text-gray-600 font-medium">Nominal</span>
                </div>
                <span className="text-xl font-bold text-green-500">
                  Rp {resi.hargaCOD.toLocaleString("id-ID")}
                </span>
              </div>
              <hr className="my-2" />
              <p className="text-xs text-gray-400 text-center">
                Silahkan ambil uang dari laci {resi.kotak}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1" />
        <Footer />
      </div>
    </div>
  );
}

export default function UserPage() {
  return (
    <Suspense fallback={null}>
      <UserPageInner />
    </Suspense>
  );
}
