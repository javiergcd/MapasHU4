"use client";
import React from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface ComboBoxProps {
  label: string;
  placeholder?: string;
  options?: string[];
  icon?: LucideIcon; // 1. Le agregamos el "?" para hacerlo opcional
}

// 2. Le asignamos un alias con mayúscula (Icon)
export function ComboBox({ label, placeholder, options = [], icon: Icon }: ComboBoxProps) {
  return (
    <div className="flex flex-col gap-2 w-full font-inter">
      <label className="text-sm font-medium text-stone-900">
        {label}
      </label>
      
      <div className="relative group">
        {/* 3. Renderizado condicional: Solo dibuja el div si Icon existe */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
          </div>
        )}

        {/* 4. Ajustamos el padding izquierdo (pl) dependiendo de si hay icono o no */}
        <select
          defaultValue=""
          className={`w-full appearance-none bg-white border border-stone-200 text-stone-600 py-2.5 pr-10 rounded-xl focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 cursor-pointer transition-all shadow-sm hover:border-stone-300 ${
            Icon ? 'pl-10' : 'pl-4'
          }`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </div>
      </div>
    </div>
  );
}