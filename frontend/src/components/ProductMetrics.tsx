import React from "react";
import { Product } from "../models/Product";
import { disconnect } from "process";

interface ProductMetricsProps {
    products: Product[];
}

const InventoryMetrics: React.FC<ProductMetricsProps> = ({ products }) => {
    // General Metrics
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);
    const avgPrice = products.length ? (products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length) : 0;

    // Metrics by Category
    const categories = Array.from(new Set(products.map(p => p.category)));
    const metricsByCategory = categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat);
        const catStock = catProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
        const catValue = catProducts.reduce((sum, p) => sum + ((p.stock || 0) * (p.price || 0)), 0);
        const catAvgPrice = catProducts.length ? (catProducts.reduce((sum, p) => sum + (p.price || 0), 0) / catProducts.length) : 0;
        return { category: cat, stock: catStock, value: catValue, avgPrice: catAvgPrice };
    });

    return (
        <div>
            <div>
                <strong>Total Stock</strong> {totalStock} <br />
                <strong>Total Inventory Value</strong> ${totalValue.toFixed(2)} <br />
                <strong>Average Price</strong> ${avgPrice.toFixed(2)} <br />
            </div>
            <h3>Metrics by Category</h3>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Stock</th>
                        <th>Total Value</th>
                        <th>Average Price</th>
                    </tr>
                </thead>
                <tbody>
                    {metricsByCategory.map(m => (
                        <tr key={m.category}>
                            <td>{m.category}</td>
                            <td>{m.stock}</td>
                            <td>${m.value.toFixed(2)}</td>
                            <td>${m.avgPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InventoryMetrics;