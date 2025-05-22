import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import "../styles/ProductModal.css";

// Props for the ProductModal component
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
    product: Product | null;
}

const emptyProduct: Product = {
    name: "",
    category: "",
    stock: 0,
    price: 0,
    expirationDate: ""
}

// Component for the ProductModal
const ProductModal: React.FC<ProductModalProps> = ({isOpen, onClose, onSave, product : productProp}) =>{
    
    const [product, setProduct] = useState<Product>(emptyProduct);
    useEffect(() => {
        if (productProp) {
            setProduct(productProp);
        } else {
            setProduct(emptyProduct);
        }
    }, [productProp]);

    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const validate = () => {
        const newErrors: {[key: string]: string} = {};
        if (!product.name.trim()) newErrors.name = "Name is required";
        if (product.name.length > 120) newErrors.name = "Name must be 120 characters or less";
        if (!product.category.trim()) newErrors.category = "Category is required";
        if (product.stock < 0 ) newErrors.stock = "Stock can not be negative" ;
        if (product.price < 0) newErrors.price = "Price can not be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Function to handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            ...prev, // preserve previous state, made a copy
            [name] : parsedValue // mod the specific field of the copied state :O
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        if (!validate()) return;

        const productToSave = {
            ...productProp,
            ...product,
            expirationDate: product.expirationDate.trim() === "" ? "N/A" : product.expirationDate,
        };
        // Call onSave prop with the product state
        onSave(productToSave);
        // Clean the product state
        if (!productProp) {
            resetProduct();
        }
        // Close the modal
        onClose();
    };
    const resetProduct = () => {
        setProduct(emptyProduct);
        setErrors({});
    };
    

    // Render only if the modal is open
    if (!isOpen) return null;
    return (
        // Modal structure
        <div className="product-modal">
            <div className="modal-content">
                <h2>{productProp ? "Edit Product" : "Create Product"}</h2>
                <form onSubmit={handleSubmit}>

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
                        <button type="submit" >Save</button>
                        <button type="button" onClick={() =>
                            {
                                resetProduct();
                                onClose();
                            }
                        }>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
