// Interface for Product, which represents a product in the inventory system
export interface Product {
    id?: number; // Optional -> Backend will set this value
    name: string;
    category: string;
    stock: number;
    price: number;
    expirationDate: string;
    creationDate?: string; // Optional -> Backend will set this value
    lastUpdateDate?: string; // Optional -> Backend will set this value
}