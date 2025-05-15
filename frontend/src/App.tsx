import React, {useState} from 'react';
import ProductModal from './components/ProductModal';
import { Product } from './models/Product';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSaveProduct = (product: Product) => {
    console.log('Product saved:', product);
    setProducts((prev) => [...prev, product]);
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
    </div>
  )
};

export default App;