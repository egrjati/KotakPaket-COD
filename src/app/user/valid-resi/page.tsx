import Link from "next/link";
import Footer from "@/layout/footer";

function BoxIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="20" width="38" height="23" rx="3" fill="#F5A623" />
      <rect x="3" y="11" width="42" height="11" rx="3" fill="#E8941A" />
      <rect x="17" y="11" width="14" height="11" fill="#22C55E" />
      <rect x="17" y="20" width="14" height="6" fill="#16A34A" />
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="#F5C542" stroke="#E8A800" strokeWidth="2" />
      <text x="18" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#8B6500">$</text>
    </svg>
  );
}

export default function ValidResi() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-[#29C5F6] flex flex-col items-center px-5 pt-10 pb-8">

        {/* Back Button */}
        <div className="w-full mb-4">
          <Link href="/" className="text-white text-2xl font-light leading-none">
            ‹
          </Link>
        </div>

        {/* Box Icon */}
        <div className="w-[84px] h-[84px] bg-white rounded-[22px] flex items-center justify-center shadow-md mb-6">
          <BoxIcon />
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl p-5 shadow-sm">

          {/* Resi Valid Label */}
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-0.5">Resi Valid</p>
          <p className="text-gray-900 text-lg font-bold mb-4">RESI JX123456</p>

          {/* Laci Section */}
          <div className="w-full bg-[#29C5F6] rounded-2xl px-4 py-3 flex items-center justify-between mb-3">
            <div>
              <p className="text-white text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                Silahkan Ambil Uang Paket Di
              </p>
              <p className="text-white text-3xl font-black tracking-wide">LACI B</p>
            </div>
            <button className="bg-[#22C55E] text-white text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap">
              Ambil Uang
            </button>
          </div>

          {/* Total Uang Section */}
          <div className="w-full bg-[#2D5016] rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
            <CoinIcon />
            <div>
              <p className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-80 mb-0.5">
                Total Uang Di Laci
              </p>
              <p className="text-white text-2xl font-black">Rp 75.000</p>
            </div>
          </div>

          {/* Langkah Selanjutnya */}
          <div className="w-full bg-gray-100 rounded-2xl px-4 py-3">
            <p className="text-gray-800 text-sm font-semibold mb-1">Langkah Selanjutnya :</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Setelah memasukkan resi dan terverifikasi valid Smart Box Otomatis membuka kunci laci
              dan silahkan mengambil uang paket tersebut
            </p>
          </div>

        </div>

        <div className="flex-1" />
        <Footer />
      </div>
    </div>
  );
}
