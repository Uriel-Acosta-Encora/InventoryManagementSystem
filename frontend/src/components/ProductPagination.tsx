import React, { useState } from 'react';
import { Product } from '../models/Product';
import { useMultiSort } from '../hooks/useMultiSort';

interface ProductListProps {
  products: Product[];
  appliedFilters: {
    name: string;
    categories: string[];
    stock: string;
  };
  onEdit: (product: Product) => void;
  onDelete: (id?: number) => void;
  onRefresh: () => void;
}
// Number of items per page
const itemsPerPage = 10;

const ProductList: React.FC<ProductListProps> = ({ products, appliedFilters, onEdit, onDelete, onRefresh }) => {
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
  const { sortedData, handleSort, getSortArrow } = useMultiSort(filteredProducts);
    // Pagination calculation
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
const paginatedProducts = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset current page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('category')}>
              Category {getSortArrow('category')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
              Name {getSortArrow('name')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>
              Price {getSortArrow('price')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('expirationDate')}>
              Expiration Date {getSortArrow('expirationDate')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('stock')}>
              Stock {getSortArrow('stock')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" 
                  onChange={() => {
                    if (product.stock > 0){
                      // Set stock to 0
                      fetch(`http://localhost:9090/products/${product.id}/outofstock`, {
                        method: "POST",
                      })
                        .then(() => onRefresh())
                        .catch((error) => console.error('Error putting out of stock:', error));
                    } else{
                      // Set stock to 10
                      fetch(`http://localhost:9090/products/${product.id}/instock`, {
                        method: "PUT",
                      })
                        .then(() => onRefresh())
                        .catch((error) => console.error('Error on stock:', error));
                      }
                  }}
                />
              </td>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.expirationDate}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination bar */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 8px' }}>
          Page {currentPage} of {totalPages}
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