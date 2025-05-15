import React, {useEffect, useState} from 'react';
import ProductModal from './components/ProductModal';
import { Product } from './models/Product';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  const fetchProducts = () => {
    fetch('http://localhost:9090/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };
  useEffect(()=>{
    fetchProducts();
  }, []);

  const handleSaveProduct = (product: Product) => {
    fetch('http://localhost:9090/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProducts();
      })
      .catch((error) => console.error('Error saving product:', error));
  };

  return (
    <div className="App">
      <h1>Inventory Management System</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
      <h2>Lista Provicional</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.category} - {product.stock} - {product.price} - {product.expirationDate}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default App;