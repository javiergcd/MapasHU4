'use client' // Necesario porque usaremos interactividad (useState)
import React, { useState } from 'react';

const HeaderPanel: React.FC = () => {
  // Estado para saber cuál vista está activa: 'grid' o 'list'
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

  return (
    /* Manteniendo tu ajuste de gap-20 para corregir el exceso de 0.5mm */
    <div className="w-full py-4 flex items-center gap-20 bg-transparent border-b border-gray-50 mb-2">
      
      <div className="shrink-0">
        <h2 className="text-lg font-bold text-gray-800 leading-tight">Lista de Inmuebles</h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">3 encontrados</p>
      </div>

      {/* TAREAS DÍA 3 (T3): Interactividad de botones */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shrink-0 shadow-sm">
        
        {/* Botón Vista Cuadritos (Grilla) */}
        <button 
          onClick={() => setActiveView('grid')}
          className={`p-1.5 rounded-md transition-all ${
            activeView === 'grid' 
            ? 'bg-white shadow-sm border border-gray-200' 
            : 'hover:bg-gray-200 text-gray-400'
          }`}
          title="Vista Grilla"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={activeView === 'grid' ? "#ea580c" : "currentColor"} 
            strokeWidth={activeView === 'grid' ? "2.5" : "2"} 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* Botón Vista Lista (Tabla) */}
        <button 
          onClick={() => setActiveView('list')}
          className={`p-1.5 rounded-md transition-all ${
            activeView === 'list' 
            ? 'bg-white shadow-sm border border-gray-200' 
            : 'hover:bg-gray-200 text-gray-400'
          }`}
          title="Vista Lista"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={activeView === 'list' ? "#ea580c" : "currentColor"} 
            strokeWidth={activeView === 'list' ? "2.5" : "2"} 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeaderPanel;