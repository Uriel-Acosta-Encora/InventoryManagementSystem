// Interface for Product, which represents a product in the inventory system
export interface Product {
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    expirationDate: string;
}