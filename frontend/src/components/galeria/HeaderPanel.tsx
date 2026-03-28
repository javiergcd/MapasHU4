import React from 'react';

const HeaderPanel: React.FC = () => {
  return (
    /* Ajustado de gap-44 a gap-40 para corregir el exceso de 0.5mm */
    <div className="w-full py-4 flex items-center gap-40 bg-transparent border-b border-gray-50 mb-2">
      
      <div className="shrink-0">
        <h2 className="text-lg font-bold text-gray-800 leading-tight">Inmuebles</h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">3 encontrados</p>
      </div>

      {/* TUS BOTONES - DÍA 2 (T3) con espaciado corregido */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shrink-0 shadow-sm">
        {/* Botón Vista Cuadritos (Activo) */}
        <button 
          className="p-1.5 bg-white shadow-sm rounded-md border border-gray-200"
          title="Vista Grilla"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* Botón Vista Lista (Inactivo) */}
        <button 
          className="p-1.5 hover:bg-gray-200 rounded-md transition-all"
          title="Vista Lista"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
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