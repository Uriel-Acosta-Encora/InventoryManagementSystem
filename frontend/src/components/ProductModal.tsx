import React, { useState } from "react";
import { Product } from "../models/Product";
import "../styles/ProductModal.css";

// Props for the ProductModal component
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

// Component for the ProductModal
const ProductModal: React.FC<ProductModalProps> = ({isOpen, onClose, onSave}) =>{
    // Default product state
    const [product, setProduct] = React.useState<Product>({
        id: 0,
        name: "",
        category: "",
        stock: 0,
        price: 0,
        expirationDate: ""
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const validate = () => {
        const newErrors: {[key: string]: string} = {};
        if (!product.name.trim()) newErrors.name = "Name is required";
        if (!product.category.trim()) newErrors.category = "Category is required";
        if (product.stock < 0 ) newErrors.stock = "Stock can not be negative";
        if (product.price < 0) newErrors.price = "Price can not be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Function to handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        // Change value type of stock and price to number
        let parsedValue: number | string = value;
        switch (name) {
            case "stock":
            case "price":
                parsedValue = parseFloat(value);
                break;
        }
        setProduct((prev) => ({
            ...prev,
            [name] : parsedValue
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = ()=>{
        if (!validate()) return;

        const productToSave = {
            ...product,
            expirationDate: product.expirationDate.trim() === "" ? "N/A" : product.expirationDate,
        };
        // Call onSave prop with the product state
        onSave(productToSave);
        // Clean the product state
        resetProduct();
        // Close the modal
        onClose();
    };
    const resetProduct = () => {
        setProduct({
            id: 0,
            name: '',
            category: '',
            stock: 0,
            price: 0,
            expirationDate: '',
        });

        setErrors({});
    };
    

    // Render only if the modal is open
    if (!isOpen) return null;
    return (
        // Modal structure
        <div className="product-modal">
            <div className="modal-content">
                <h2>Create / Edit Product</h2>
                
                <input name = "name" placeholder="Name" value={product.name} onChange={handleChange}/>
                {errors.name && <span className="modal-error">{errors.name}</span>}

                <input name = "category" placeholder="Category" value={product.category} onChange={handleChange}/>
                {errors.category && <span className="modal-error">{errors.category}</span>}

                <input type = "number" name = "stock" placeholder="Stock Units" value={product.stock} onChange={handleChange}/>
                {errors.stock && <span className="modal-error">{errors.stock}</span>}

                <input type = "number" name = "price" placeholder="Price" value={product.price} onChange={handleChange}/>
                {errors.price && <span className="modal-error">{errors.price}</span>}

                <input type = "date" name = "expirationDate" value={product.expirationDate} onChange={handleChange}/>
                {errors.expirationDate && <span className="modal-error">{errors.expirationDate}</span>}
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() =>
                        {
                            resetProduct();
                            onClose();
                        }
                    }>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;