import { useState } from 'react';

interface FilterItem {
  name: string;
  count: number;
}

export const useFilterLogic = <T extends FilterItem>() => {
  const [viewLevel, setViewLevel] = useState(1); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  const toggleSort = () => {
    setSortOrder(prev => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const handleSeeMore = () => {
    setViewLevel(prev => prev + 1);
  };

  const handleSeeLess = () => {
    setViewLevel(1);
  };

  const getVisibleData = (data: T[]) => {
    if (!data) return [];
    let processed = [...data];

    // Lógica de ordenamiento original
    if (sortOrder === 'asc') {
      processed.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      processed.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Orden por defecto: mayor cantidad de propiedades primero
      processed.sort((a, b) => b.count - a.count);
    }

    // Lógica de niveles (2 -> 5 -> Todos)
    if (viewLevel === 1) return processed.slice(0, 2);
    if (viewLevel === 2) return processed.slice(0, 5);
    return processed;
  };

  return {
    viewLevel,
    sortOrder,
    toggleSort,
    handleSeeMore,
    handleSeeLess,
    getVisibleData
  };
};