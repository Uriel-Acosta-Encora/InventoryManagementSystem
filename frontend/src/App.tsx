import React, {useEffect, useState} from 'react';
import ProductModal from './components/ProductModal';
import { Product } from './models/Product';
import ProductFilter from './components/ProductFilter';

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
    const url = product.id ? "http://localhost:9090/products/${product.id}" : "http://localhost:9090/products";
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
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null); 
        }}
        onSave={handleSaveProduct}
        product={editingProduct} // Pass the product to be edited
      />
      <h2>Lista Provicional</h2>
      <ul>
        {products
        .filter(product =>{
          // When seartch filters are empty, show all products
          const noFilters = !appliedFilters.name && (!appliedFilters.categories || appliedFilters.categories.length === 0) && !appliedFilters.stock;
          if (noFilters) return true;
          
          const matchesName = appliedFilters.name ? product.name.toLowerCase().includes(appliedFilters.name.toLowerCase()) : true;
          const matchesCategory = appliedFilters.categories && appliedFilters.categories.length > 0 ? appliedFilters.categories.includes(product.category) : true;
          let matchesStock = true;
          if (appliedFilters.stock === "in") {
            matchesStock = product.stock > 0;
          } else if (appliedFilters.stock === "out") {
              matchesStock = product.stock === 0;
          }
          return matchesName && matchesCategory && matchesStock;
        })
        .map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - {product.stock} - {product.price} - {product.expirationDate}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default App;