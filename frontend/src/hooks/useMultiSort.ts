import { useState, useMemo } from 'react';

export type SortKey = 'name' | 'category' | 'price' | 'stock' | 'expirationDate';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export function useMultiSort<T extends Record<string, any>>(data: T[], defaultSort: SortConfig[] = []) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>(defaultSort);

  const sortedData = useMemo(() => {
    let sorted = [...data];
    sorted.sort((a, b) => {
      for (const config of sortConfigs) {
        let aValue = a[config.key];
        let bValue = b[config.key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return config.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return config.direction === 'asc' ? 1 : -1;
        
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfigs]);

  const handleSort = (key: SortKey) => {
    setSortConfigs((prev) => {
      if (prev[0]?.key === key) {
        const newDirection = prev[0].direction === 'asc' ? 'desc' : 'asc';
        return [{ key, direction: newDirection as SortDirection }, ...(prev[1] ? [prev[1]] : [])];
      }
      if (prev[1]?.key === key) {
        return [prev[1], prev[0]];
      }
      return [{ key, direction: 'asc' as SortDirection }, ...(prev[0] ? [prev[0]] : [])].slice(0, 2);
    });
  };

  const getSortArrow = (key: SortKey) => {
    const config = sortConfigs.find((c) => c.key === key);
    if (!config) return '';
    return config.direction === 'asc' ? '▼' : '▲';
  };

  return { sortedData, handleSort, getSortArrow };
}