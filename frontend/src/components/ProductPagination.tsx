import React, { useState } from 'react';
import { Product } from '../models/Product';

interface ProductListProps {
  products: Product[];
  appliedFilters: {
    name: string;
    categories: string[];
    stock: string;
  };
  onEdit: (product: Product) => void;
  onDelete: (id?: number) => void;
}
// Number of items per page
const itemsPerPage = 10;

const ProductList: React.FC<ProductListProps> = ({ products, appliedFilters, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // filter products based on applied filters
  const filteredProducts = products.filter(product => {
    // If no filters are applied, show all products
    const noFilters = !appliedFilters.name && (!appliedFilters.categories || appliedFilters.categories.length === 0) && !appliedFilters.stock;
    if (noFilters) return true;
    // Check if product name matches the applied filters
    const matchesName = appliedFilters.name ? product.name.toLowerCase().includes(appliedFilters.name.toLowerCase()) : true;
    // Check if product category matches the applied filters
    const matchesCategory = appliedFilters.categories && appliedFilters.categories.length > 0 ? appliedFilters.categories.includes(product.category) : true;
    // Check if product stock matches the applied filters
    // If no stock filter is applied, show all products
    let matchesStock = true;
    if (appliedFilters.stock === "in") {
      matchesStock = product.stock > 0;
    } else if (appliedFilters.stock === "out") {
      matchesStock = product.stock === 0;
    }
    return matchesName && matchesCategory && matchesStock;
  });

    // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset current page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  return (
    <div>
      <ul>
        {paginatedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - {product.stock} - {product.price} - {product.expirationDate}
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Pagination bar */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
            Previous
        </button>
        <span style={{ margin: '0 8px' }}>
            Page {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
            Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;