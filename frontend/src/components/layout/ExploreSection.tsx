"use client";
import { ComboBox } from "../ui/ComboBox";
import { Home, Building, Bed, Map, Landmark } from "lucide-react";

export default function ExploreSection() {
  const propertyTypes = [
    { name: "Casas", icon: Home },
    { name: "Departamentos", icon: Building },
    { name: "Cuartos", icon: Bed },
    { name: "Terrenos", icon: Map },
    { name: "Espacios en Cementerios", icon: Landmark }
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl bg-white p-6 shadow-xl border">
          <div className="flex items-center justify-center text-gray-400">
            <ComboBox
              label="Tipos de Inmueble"
              placeholder="Seleccione un tipo"
              options={propertyTypes.map(type => type.name)} 
              icon={Home} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}