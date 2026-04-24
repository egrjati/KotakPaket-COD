function BoxIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Box body */}
      <rect x="5" y="20" width="38" height="23" rx="3" fill="#F5A623" />
      {/* Box lid */}
      <rect x="3" y="11" width="42" height="11" rx="3" fill="#E8941A" />
      {/* Green stripe on lid center */}
      <rect x="17" y="11" width="14" height="11" fill="#22C55E" />
      {/* Green stripe continuation on body top */}
      <rect x="17" y="20" width="14" height="6" fill="#16A34A" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-[#29C5F6] flex flex-col items-center px-6 pt-14 pb-8">

        {/* Box Icon */}
        <div className="w-[84px] h-[84px] bg-white rounded-[22px] flex items-center justify-center shadow-md mb-8">
          <BoxIcon />
        </div>

        {/* Greeting */}
        <div className="text-center mb-10">
          <p className="text-white text-lg leading-snug">Halo Selamat datang,</p>
          <p className="text-white text-xl font-bold leading-snug">Verifikasi Paket Smart COD BOX</p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm">
          <p className="font-bold text-gray-900 text-base mb-3">Masukkan Nomor Resi</p>
          <input
            type="text"
            placeholder="Contoh : JX123456"
            className="w-full bg-gray-100 rounded-xl px-4 py-4 text-gray-400 text-sm border border-gray-200 outline-none mb-5 focus:border-sky-300 focus:bg-white transition-colors"
          />
          <button className="w-full bg-[#F5C542] text-gray-800 font-bold py-4 rounded-xl tracking-[0.18em] text-sm hover:bg-[#e8b830] transition-colors">
            MASUKKAN PAKET
          </button>
        </div>

        {/* Push footer to bottom */}
        <div className="flex-1" />

        {/* Footer */}
        <p className="text-white text-xs opacity-90">© 2026 Smart COD Box System.</p>
      </div>
    </div>
  );
}
