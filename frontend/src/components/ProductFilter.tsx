import React from "react";
import "../styles/ProductFilter.css";

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
  <div className="pf-container">
    <div className="pf-row">
      <label className="pf-label">Name</label>
      <input
        className="pf-input"
        type="text"
        placeholder="Name"
        value={filters.name}
        onChange={e => onChange({ ...filters, name: e.target.value })}
      />
    </div>
    <div className="pf-row">
      <label className="pf-label">Category</label>
      <select
        className="pf-select"
        value={filters.categories[0] || ""}
        onChange={e => onChange({ ...filters, categories: e.target.value ? [e.target.value] : [] })}
      >
        <option value="">Any</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
    <div className="pf-row">
      <label className="pf-label">Stock</label>
      <select
        className="pf-select"
        value={filters.stock}
        onChange={e => onChange({ ...filters, stock: e.target.value })}
      >
        <option value="">All</option>
        <option value="in">In Stock</option>
        <option value="out">Out of Stock</option>
      </select>
    </div>
    <div className="pf-actions">
      <button onClick={onSearch}>Search</button>
      <button onClick={onClear}>Clear</button>
    </div>
  </div>
);

export default ProductFilter;