// Interface for Product, which represents a product in the inventory system
export interface Product {
    name: string;
    category: string;
    stock: number;
    price: number;
    expirationDate: string;
}