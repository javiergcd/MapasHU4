'use client'

import { Search, MapPin, Building } from 'lucide-react'

export default function FilterBar() {
  return (
    <header className="bg-white border-b border-stone-200 shrink-0 z-20 shadow-sm">
      {/* Tipos de contrato (Recuperamos Anticrético) */}
      <div className="flex items-center justify-center gap-8 p-2 text-sm border-b border-stone-100">
        <label className="flex items-center gap-2 cursor-pointer text-[#ea580c] font-bold">
          <div className="w-4 h-4 bg-[#ea580c] rounded-sm"></div> Venta
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-stone-500 hover:text-stone-700">
          <div className="w-4 h-4 border border-stone-300 rounded-sm bg-white"></div> Alquiler
        </label>
        {/* Aquí está el botón que faltaba */}
        <label className="flex items-center gap-2 cursor-pointer text-stone-500 hover:text-stone-700">
          <div className="w-4 h-4 border border-stone-300 rounded-sm bg-white"></div> Anticrético
        </label>
      </div>

      {/* Buscador y Botones */}
      <div className="p-3 flex flex-wrap items-center justify-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-stone-300 rounded-md text-sm hover:bg-stone-50 transition-colors">
          <Building className="w-4 h-4" /> Tipo de Inmueble
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-stone-300 rounded-md flex-grow max-w-xs bg-stone-50 focus-within:ring-1 focus-within:ring-[#ea580c] focus-within:border-[#ea580c] transition-all">
          <Search className="w-4 h-4 text-stone-400" />
          <input type="text" placeholder="Buscar por zona, ciudad o ID..." className="bg-transparent outline-none text-sm w-full" />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-stone-300 rounded-md text-sm hover:bg-stone-50 transition-colors">
          <MapPin className="w-4 h-4" /> Zona
        </button>
        <button className="px-5 py-1.5 bg-[#ea580c] text-white font-bold text-sm rounded-md shadow-md hover:bg-[#d44c08] transition-colors">
          Más Filtros
        </button>
      </div>
    </header>
  )
}