export interface Product {
    id: number;
    title: string;
    price: number;
    category?: string;
    image?: string;
    quantity?: number; // The '?' means this is optional
    description?: string; // Optional field for product description
}