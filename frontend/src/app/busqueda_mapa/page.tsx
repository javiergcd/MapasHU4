'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChevronLeft, LayoutGrid, List } from 'lucide-react' // Importamos los iconos de los botones
import FilterBar from '@/components/FilterBar'
import { mockCasas } from '@/data/mockCasas'

// Importación de componentes
import PropertyCard from '@/components/layout/PropertyCard'

// Importación dinámica del mapa
const MapView = dynamic(() => import('./MapView'), { ssr: false })

export default function BusquedaMapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list') // Estado para los botones
  
  // Datos de las 50 casas de prueba
  const [data, setData] = useState(mockCasas)

  return (
    <div className="flex flex-col h-screen bg-stone-100 overflow-hidden">

      {/* Filtros */}
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
              {/* Barra superior de control */}
              <div className="p-4 border-b border-stone-200 flex items-center bg-stone-50 shrink-0">
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="flex items-center text-xs text-stone-400 hover:text-stone-600"
                >
                  <ChevronLeft className="w-4 h-4 mr-1"/> Ocultar
                </button>
              </div>

              {/* Título y Botones de Vista (Recuperados de la imagen 2) */}
              <div className="px-4 py-4 border-b border-stone-200 bg-white shrink-0 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lista de Inmuebles</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {data.length} encontrados
                  </p>
                </div>
                
                {/* Botones de vista integrados directamente */}
                <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-stone-400'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-stone-400'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              {/* CONTENEDOR DE TARJETAS */}
              <div className="flex-1 overflow-y-auto p-4 bg-stone-50 flex flex-col gap-6">
                
                {data.map((inmueble) => (
                  <div key={inmueble.id} className="w-full">
                    <PropertyCard 
                      imagen={inmueble.imagen}
                      estado={inmueble.estado}
                      precio={inmueble.precio}
                      descripcion={inmueble.descripcion}
                      camas={inmueble.camas}
                      banos={inmueble.banos}
                      metros={inmueble.metros}
                    />
                  </div>
                ))}

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
              <ChevronLeft className="w-4 h-4 rotate-180"/>
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