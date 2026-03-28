"use client";
import { useState } from "react";

type Tipo =
    | "casa"
    | "departamento"
    | "terreno"
    | "habitacion"
    | "local";

type Modo = "venta" | "alquiler" | "anticretico";

export const useFilters = () => {
    const [tipos, setTipos] = useState<Tipo[]>([]);
    const [modo, setModo] = useState<Modo>("venta");

    const toggleTipo = (tipo: Tipo) => {
        setTipos((prev) =>
            prev.includes(tipo)
                ? prev.filter((t) => t !== tipo)
                : [...prev, tipo]
        );
    };

    const cambiarModo = (nuevoModo: Modo) => {
        setModo(nuevoModo);
    };

    return {
        tipos,
        modo,
        toggleTipo,
        cambiarModo,
    };
};