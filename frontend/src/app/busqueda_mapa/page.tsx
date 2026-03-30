'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft } from 'lucide-react'
import FilterBar from '@/components/FilterBar'

// 1. Importación de tu tarjeta
import PropertyCard from '@/components/layout/PropertyCard'

// 2. Importación dinámica del mapa
const MapView = dynamic(() => import('./MapView'), { ssr: false })

import HeaderPanel from '@/components/galeria/HeaderPanel' 

export default function BusquedaMapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-stone-100 overflow-hidden">

      {/* Filtros de Criss */}
      <FilterBar />

      <main className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR */}
        <aside 
          className={`
            bg-white border-r border-stone-200 flex flex-col z-10 transition-all duration-300
            ${isSidebarOpen ? 'w-[450px]' : 'w-0'}
          `}
        >
          {isSidebarOpen && (
            <>
              {/* Barra superior solo Ocultar */}
              <div className="p-4 border-b border-stone-200 flex items-center bg-stone-50 shrink-0">
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="flex items-center text-xs text-stone-400 hover:text-stone-600"
                >
                  <ChevronLeft className="w-4 h-4 mr-1"/> Ocultar
                </button>
              </div>

              {/* Título + botones vista (de Criss) */}
              <div className="px-4 py-4 border-b border-stone-200 bg-white shrink-0 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lista de Inmuebles</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    3 encontrados
                  </p>
                </div>

                <HeaderPanel />
              </div>

              {/* Contenido scroll - DÍA 4: TUS 3 TARJETAS LIMPIAS */}
              <div className="flex-1 overflow-y-auto p-4 bg-white no-scrollbar flex flex-col gap-6">
                
                {/* Tarjeta 1 */}
                <div>
                   <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Destacado</h2>
                   {/* @ts-ignore */}
                   <PropertyCard />
                </div>

                {/* Tarjeta 2 */}
                <div>
                   <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Nuevo</h2>
                   {/* @ts-ignore */}
                   <PropertyCard />
                </div>

                {/* Tarjeta 3 */}
                <div>
                   <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Oportunidad</h2>
                   {/* @ts-ignore */}
                   <PropertyCard />
                </div>

              </div>
            </>
          )}
        </aside>

        {/* MAPA */}
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