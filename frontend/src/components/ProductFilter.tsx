import React from "react";

interface ProductFilterProps {
  filters: {
    name: string;
    categories: string[];
    stock: string;
  };
  categories: string[];
  onChange: (filters: { name: string; categories: string[]; stock: string }) => void;
  onSearch: () => void;
  onClear: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  categories,
  onChange,
  onSearch,
  onClear,
}) => (
  <div>
    <input
      type="text"
      placeholder="Name"
      value={filters.name}
      onChange={e => onChange({ ...filters, name: e.target.value })}
    />
    <select
      value={filters.categories[0] || ""}
      onChange={e => onChange({ ...filters, categories: e.target.value ? [e.target.value] : [] })}
    >
      <option value="">Any</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <select
      value={filters.stock}
      onChange={e => onChange({ ...filters, stock: e.target.value })}
    >
      <option value="">All</option>
      <option value="in">In Stock</option>
      <option value="out">Out of Stock</option>
    </select>
    <button onClick={onSearch}>Search</button>
    <button onClick={onClear}>Clear</button>
  </div>
);

export default ProductFilter;