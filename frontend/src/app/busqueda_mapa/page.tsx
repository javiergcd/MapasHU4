'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, DollarSign, Home, Building, Square } from 'lucide-react';

// TU COMPONENTE: Importado en la nueva estructura
import HeaderPanel from '@/components/galeria/HeaderPanel';
import PropertyRow from '@/components/galeria/PropertyRow';


// MAPA: Importado desde la ubicación oficial
const MapView = dynamic(() => import('./MapView'), { ssr: false });

export default function BusquedaMapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any[]>([]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-theme(spacing.32))] border rounded-lg overflow-hidden shadow-sm bg-white">
      
      {/* Barra Superior - Filtros del Equipo de Mapas */}
      <header className="w-full p-4 border-b border-gray-200 bg-white shrink-0 z-10 shadow-sm">
        <div className="flex items-center justify-center gap-8 mb-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-5 h-5 bg-[#ea580c] rounded-sm flex items-center justify-center"></div>
            <span className="text-[#ea580c] font-medium">Venta</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-sm hover:border-gray-400 transition-colors"></div>
            <span className="text-gray-600">Alquiler</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-sm hover:border-gray-400 transition-colors"></div>
            <span className="text-gray-600">Anticrético</span>
          </label>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            <Building className="w-4 h-4" />
            <span className="font-medium text-sm">Casas</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md flex-grow min-w-[200px] max-w-md focus-within:border-[#ea580c] focus-within:ring-1 focus-within:ring-[#ea580c] transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="outline-none w-full text-gray-700 placeholder-gray-400 text-sm bg-transparent" 
            />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="font-medium text-sm">Zona</span>
          </button>

          <button className="px-5 py-2 bg-[#ea580c] text-white font-medium text-sm rounded-md hover:bg-[#c2410c] transition-colors whitespace-nowrap">
            Más Filtros
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <div className="flex flex-col md:flex-row flex-grow relative overflow-hidden">
        
        {/* Panel Lateral - INTEGRACIÓN DE TU TAREA */}
        <aside 
          className={`
            bg-white transition-all duration-300 ease-in-out z-10 border-gray-200 overflow-hidden
            ${isSidebarOpen 
              ? 'w-full h-[40vh] md:w-[30%] md:h-auto border-b md:border-b-0 md:border-r opacity-100' 
              : 'w-0 h-0 md:w-0 md:h-auto opacity-0'
            }
          `}
        >
          <div className="p-4 h-full overflow-y-auto w-full md:max-w-[380px]">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                <span className="text-lg">←</span>
                <span>Ocultar lista</span>
              </button>
            </div>
            
            {/* AQUÍ ESTÁN TUS BOTONES DE VISTA (CUADRITOS/LISTA) */}
            <div className="mb-4">
               <HeaderPanel />
            </div>
            {/* VISTA PREVIA DE RESULTADOS (T6 - Formato Tabla de 4 columnas) */}
            <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              
              {/* HEADER TABLA */}
              <div className="grid grid-cols-[40px_70px_minmax(0,1fr)_50px] gap-2 bg-gray-50/70 px-3 py-2 border-b items-center">
                <span className="text-[9px] font-bold text-gray-500 text-left">Foto</span>
                <span className="text-[9px] font-bold text-gray-500 text-left">Precio</span>
                <span className="text-[9px] font-bold text-gray-500 text-left">Detalle / m²</span>
                <span className="text-[9px] font-bold text-gray-500 text-center">Contacto</span>
              </div>

                {/* FILAS */}
                <div className="divide-y divide-gray-50">
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <PropertyRow
                        key={index}
                        title={item.title}
                        price={item.price}
                        size={item.size}
                        contactType={item.contactType}
                        image={item.image}
                      />
                    ))
                  ) : (
                    <>
                  <PropertyRow 
                    title="Casa Obra Gruesa..." 
                    price="$us 189K" 
                    size="272 m²" 
                    contactType="whatsapp"
                    image="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                  />
                  <PropertyRow 
                    title="Depto Minimalista..." 
                    price="Bs 950K" 
                    size="110 m²" 
                    contactType="messenger"
                    image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
                  />
                  <PropertyRow 
                    title="Terreno Comercial" 
                    price="$us 85K" 
                    size="500 m²" 
                    contactType="whatsapp"
                    image="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
                  />
                </>
              )}
              </div>
              
            </div>
          </div>
        </aside>

        {/* Área del Mapa */}
        <section className="flex-grow bg-gray-100 relative w-full h-[60vh] md:h-auto">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-0 top-4 z-[1000] bg-white border border-gray-300 shadow-md p-2 rounded-r-md hover:bg-gray-50 hidden md:flex"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>

          <div className="absolute inset-0">
            <MapView />
          </div>
        </section>
      </div>
    </div>
  );
}