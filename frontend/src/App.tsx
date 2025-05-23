import React, {useEffect, useState} from 'react';
import ProductModal from './components/ProductModal';
import { Product } from './models/Product';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductPagination';
import InventoryMetrics from './components/ProductMetrics';
import './App.css';

const App: React.FC = () => { // Main component of the application
  const [
    isModalOpen, // Value of the state
    setIsModalOpen // Function -> how the state is changed
    ] = useState(false); // Hook: Local state of the component
  const [products, setProducts] = useState<Product[]>([]); // empty array of products
  
  const fetchProducts = () => { // get products from the backend
    fetch('http://localhost:9090/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };
  // Obtaain products when the component mounts
  useEffect(()=>{
    fetchProducts();
  }, []);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // State to manage the product being edited
  const handleEditProduct = (product: Product) => { // Edit product
    setEditingProduct(product); // Set the product to be edited
    setIsModalOpen(true);
  }
  const handleSaveProduct = (product : Product) => {
    const method = product.id ? "PUT" : "POST"; // If the product has an id, update it, otherwise create a new one
    const url = product.id ? `http://localhost:9090/products/${product.id}` : "http://localhost:9090/products";
    fetch(url, {
      method,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProducts();
        setEditingProduct(null); // Clear the editing product state
      })
      .catch((error) => console.error('Error saving product:', error));
  }

  const handleDeleteProduct = (id?: number) => {// Delete product from the backend
    if(!id) return;
    fetch(`http://localhost:9090/products/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchProducts())
      .catch((error) => console.error('Error deleting product:', error));
  };

  const initialFilters = {
    name: "",
    categories: [] as string[],
    stock: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  return (
    <div className="App">
      <h1>Inventory Management System</h1>
        <ProductFilter
          filters={filters}
          categories={categories}
          onChange={setFilters}
          onSearch={() => setAppliedFilters({ ...filters })}
          onClear={() => {
            setFilters(initialFilters);
            setAppliedFilters(initialFilters);
          }}
        />
        <div className="add-product-wrapper">
          <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>Add Product</button>
        </div>
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null); 
          }}
          onSave={handleSaveProduct}
          product={editingProduct} // Pass the product to be edited
        />
        <h2>Product List</h2>
        <ProductList
          products={products}
          appliedFilters={appliedFilters}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onRefresh={fetchProducts}
        />
      <h2>Inventory Metrics</h2>
      <InventoryMetrics products={products} />
    </div>
  )
};

export default App;