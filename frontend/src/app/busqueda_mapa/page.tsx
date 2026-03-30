'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  ChevronLeft, LayoutGrid, List, Search, MapPin, 
  DollarSign, Home, Building, Square, ChevronRight,
  MessageCircle, Image as ImageIcon
} from 'lucide-react'
import { mockCasas } from '@/data/mockCasas'

// Componentes de Dev 3
import PropertyCard from '@/components/layout/PropertyCard'

const MapView = dynamic(() => import('./MapView'), { ssr: false })

export default function BusquedaMapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [data] = useState(mockCasas) 

  const filteredData = data.filter(casa => 
    casa.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      
      {/* HEADER PRINCIPAL - Copiado fielmente de tu primera imagen */}
      <header className="w-full p-4 border-b border-gray-200 bg-white shrink-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* Fila 1: Botoncitos de tipo de contrato (Venta, Alquiler, Anticrético) */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-orange-600 rounded border-gray-300" defaultChecked />
              <span className="text-orange-600 font-bold">Venta</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-gray-400 rounded border-gray-300" />
              <span className="text-gray-500 group-hover:text-gray-700">Alquiler</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 accent-gray-400 rounded border-gray-300" />
              <span className="text-gray-500 group-hover:text-gray-700">Anticrético</span>
            </label>
          </div>

          {/* Fila 2: Buscador y Filtros Rápidos */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white">
              <Building size={16} /> Casas
            </button>
            
            <div className="flex-grow flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md max-w-md focus-within:border-orange-500 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por zona, ciudad o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full text-sm bg-transparent"
              />
            </div>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600"><MapPin size={16}/> Zona</button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600"><DollarSign size={16}/> Precio</button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600"><Home size={16}/> Capacidad</button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600"><Square size={16}/> Metros²</button>
            
            <button className="bg-[#ea580c] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-orange-700 transition-colors">
              Más Filtros
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        <aside className={`bg-white border-r border-stone-200 flex flex-col z-10 transition-all duration-300 ${isSidebarOpen ? 'w-full md:w-[450px]' : 'w-0'}`}>
          {isSidebarOpen && (
            <>
              {/* CABECERA PANEL */}
              <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-slate-900">
                    {searchTerm ? `Resultados: ${searchTerm}` : 'Lista de Inmuebles'}
                  </h2>
                  <p className="text-xs text-stone-400 font-medium">
                    {filteredData.length} encontrados
                  </p>
                </div>
                
                {/* Botones Grid/List del Dev 2 */}
                <div className="flex bg-stone-100 p-1 rounded-md border border-stone-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-400'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-400'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              {/* CONTENIDO SCROLL */}
              <div className="flex-1 overflow-y-auto p-4 bg-stone-50 no-scrollbar">
                {filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search className="w-12 h-12 text-stone-300 mb-2" />
                    <p className="text-stone-500 font-bold">Uy, no encontramos inmuebles</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredData.map((inmueble) => (
                      <div key={inmueble.id}>
                        {viewMode === 'grid' ? (
                          <PropertyCard {...inmueble} />
                        ) : (
                          /* Vista de Tabla/Fila del Dev 2 */
                          <div className="flex gap-4 bg-white p-3 rounded-xl border border-stone-200 hover:shadow-md transition-all">
                            <div className="w-24 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                              {inmueble.imagen ? (
                                <img src={inmueble.imagen} className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex items-center justify-center h-full"><ImageIcon className="text-stone-300" /></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-orange-600">{inmueble.precio}</h4>
                              <p className="text-[11px] text-stone-500 line-clamp-1">{inmueble.descripcion}</p>
                              <div className="flex gap-2 mt-1 text-[9px] text-stone-400 font-bold uppercase">
                                <span>{inmueble.camas} Dorm.</span>
                                <span>{inmueble.metros} m²</span>
                              </div>
                            </div>
                            <a href="#" className="self-center p-2 text-green-500"><MessageCircle size={20} /></a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </aside>

        <section className="flex-1 relative bg-stone-200">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className="absolute left-0 top-4 z-[1000] bg-white text-black shadow-md rounded-r-md flex flex-col items-center py-4 px-2 gap-4">
              <ChevronRight size={16} />
              <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold tracking-widest uppercase">Inmuebles</span>
              <List size={16} />
            </button>
          )}
          <div className="absolute inset-0"><MapView /></div>
        </section>
      </main>
    </div>
  )
}