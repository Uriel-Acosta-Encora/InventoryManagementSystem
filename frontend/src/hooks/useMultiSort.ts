import { useState, useMemo } from 'react';

export type SortKey = 'name' | 'category' | 'price' | 'stock' | 'expirationDate';
export type SortDirection = 'asc' | 'desc' | 'none';

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
        if (config.direction === 'none') continue;
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

  const nextDirection = (current: SortDirection): SortDirection => {
    if (current === 'asc') return 'desc';
    if (current === 'desc') return 'none';
    return 'asc';
  };

  const handleSort = (key: SortKey) => {
    setSortConfigs((prev) => {
      const existingIndex = prev.findIndex((c) => c.key === key);
      let newConfigs = [...prev];

      if (existingIndex !== -1) {
        // Estates: asc -> desc -> none -> asc
        const next = nextDirection(prev[existingIndex].direction);
        if (next === 'none') {
          newConfigs.splice(existingIndex, 1);
        } else {
          newConfigs[existingIndex] = { key, direction: next };
        }
      } else {
        newConfigs = [{ key, direction: 'asc' as SortDirection }, ...newConfigs].slice(0, 2);
      }
      return newConfigs;
    });
  };

  const getSortArrow = (key: SortKey) => {
    const config = sortConfigs.find((c) => c.key === key);
    if (!config || config.direction === 'none') return '';
    return config.direction === 'asc' ? '▼' : '▲';
  };

  return { sortedData, handleSort, getSortArrow, sortConfigs };
}