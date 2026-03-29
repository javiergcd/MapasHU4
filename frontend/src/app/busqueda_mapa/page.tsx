'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft, Grid, List } from 'lucide-react'
import FilterBar from '@/components/FilterBar'

const MapView = dynamic(() => import('./MapView'), { ssr: false })

export default function BusquedaMapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-stone-100 overflow-hidden">
      
      {/* 1. Nuestro nuevo componente modular */}
      <FilterBar />

      <main className="flex flex-1 overflow-hidden relative">
        
        {/* 2. PANEL LATERAL (Tu responsabilidad: Esqueleto y Scroll) */}
        <aside 
          className={`
            bg-white border-r border-stone-200 flex flex-col z-10 transition-all duration-300
            ${isSidebarOpen ? 'w-[450px]' : 'w-0'}
          `}
        >
          {isSidebarOpen && (
            <>
              {/* Cabecera (Tarea de Dev 2) */}
              <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50 shrink-0">
                <div>
                  <button onClick={() => setIsSidebarOpen(false)} className="flex items-center text-xs text-stone-400 hover:text-stone-600 mb-1">
                    <ChevronLeft className="w-4 h-4"/> Ocultar
                  </button>
                  <h2 className="font-bold text-stone-800">Inmuebles en Cocha</h2>
                </div>
                <div className="flex border rounded overflow-hidden">
                  <button className="p-1.5 bg-stone-200 hover:bg-stone-300 transition-colors"><Grid className="w-4 h-4"/></button>
                  <button className="p-1.5 hover:bg-stone-100 transition-colors"><List className="w-4 h-4"/></button>
                </div>
              </div>

              {/* Área de Scroll (Tu Criterio 9) */}
              <div className="flex-1 overflow-y-auto p-4 bg-stone-100 space-y-4 no-scrollbar">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="h-40 bg-white rounded-lg shadow-sm border border-stone-200 p-4">
                    <div className="w-full h-24 bg-stone-200 rounded mb-2"></div>
                    <div className="h-4 bg-stone-200 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* 3. ÁREA DEL MAPA (Responsabilidad del equipo de Mapas) */}
        <section className="flex-1 relative bg-stone-200">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-0 top-4 z-[1000] bg-white border border-stone-300 p-2 rounded-r-md shadow-md hover:bg-stone-50"
            >
              →
            </button>
          )}
          <div className="absolute inset-0">
            <MapView />
          </div>
        </section>

      </main>
    </div>
  )
}