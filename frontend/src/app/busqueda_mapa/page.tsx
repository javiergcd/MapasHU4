import dynamic from 'next/dynamic';
import HeaderPanel from '@/components/galeria/HeaderPanel';

// Carga dinámica del mapa (esto ya estaba bien)
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function BusquedaMapa() {
  return (
    <div className="flex flex-col w-full h-screen">
      {/* TAREA RODRIGO (DEV 2) - DÍA 1 */}
      <HeaderPanel />

      {/* EL MAPA (Ocupando el resto del espacio) */}
      <div className="flex-grow">
        <MapView />
      </div>
    </div>
  );
}
