package com.inventoryms.services;

import org.springframework.stereotype.Service; // Set as a Service

import com.inventoryms.models.Product; // Import Product Model

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter; // Import DateTimeFormatter

@Service // To instance the class as a Service
public class ProductService {
    // Dummy list of products, in memory storage
    private final List<Product> products = new ArrayList<>();
    private int nextId; // Next ID for new products

    public ProductService(){
        // Dummy data
        products.add(new Product(1,"Pan", "Alimentos", 20, 1.5, "2025-06-01", "2025-05-16", "2025-05-16"));
        products.add(new Product(2, "Jabon", "Limpieza", 15, 3.99, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(3, "Detergente", "Limpieza", 10, 5.99, "2024-12-31", "2025-05-16", "2025-05-16"));
        products.add(new Product(4, "Leche", "Alimentos", 30, 0.99, "2023-10-15", "2025-05-16", "2025-05-16"));
        products.add(new Product(5, "MacBook", "Tecnologia", 5, 1200, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(6, "Monitor", "Tecnologia", 8, 300, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(7, "Mouse", "Tecnologia", 12, 20, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(8, "Crema", "Alimentos", 10, 1.99, "2023-10-15", "2025-05-16", "2025-05-16"));
        products.add(new Product(9, "Aguacate", "Alimentos", 20, 1.5, "2025-06-01", "2025-05-16", "2025-05-16"));
        products.add(new Product(10, "Cloro", "Limpieza", 15, 5.99, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(11, "Detergente", "Limpieza", 10, 5.99, "2024-12-31", "2025-05-16", "2025-05-16"));
        products.add(new Product(12, "Cobija", "Blancos", 5, 25.99, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(13, "Silla", "Muebles", 2, 150.99, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(14, "Mesa", "Muebles", 2, 250.99, "N/A", "2025-05-16", "2025-05-16"));
        products.add(new Product(15, "Cama", "Muebles", 2, 500.99, "N/A", "2025-05-16", "2025-05-16"));
        int maxId = products.stream().mapToInt(Product::getId).max().orElse(0);
        nextId = maxId + 1; // Set next ID to max ID + 1
    }

    public List<Product> getAllProducts(){ // Return all elements in the list
        return Collections.unmodifiableList(products); // Prevent modification of the list
    }

    public Product addProduct(Product product){
        // Search if the product already exists in the list (except stock, and id)
        Product existing = products.stream()
            .filter(p -> p.getName().equalsIgnoreCase(product.getName())
                && p.getCategory().equalsIgnoreCase(product.getCategory())
                && Double.compare(p.getPrice(), product.getPrice()) == 0
                && p.getExpirationDate().equals(product.getExpirationDate()))
            .findFirst()
            .orElse(null);

        String now = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        if (existing != null) {
            // If the product already exists, update its stock and last update date
            existing.setStock(existing.getStock() + product.getStock());
            existing.setLastUpdateDate(now);
            return existing;
        } else { // If the product does not exist, add it to the list
            product.setId(nextId++); // Set the ID of the new product
            if(product.getExpirationDate() == null || product.getExpirationDate().trim().isEmpty()){
                product.setExpirationDate("N/A");
            }
            if(product.getCreationDate() == null || product.getCreationDate().trim().isEmpty()){
                product.setCreationDate(now);
            }
            product.setLastUpdateDate(now); // Set last update date to now
            products.add(product); // Add product to the list
            return product; // Return only the added product
        }
    }

    public Product updateProduct(int id, Product updatedProduct){
        for (int i=0; i<products.size(); i++){
            if(products.get(i).getId() == id){
                updatedProduct.setId(id); // Set the ID of the updated product
                updatedProduct.setCreationDate(products.get(i).getCreationDate()); // Keep the original creation date
                updatedProduct.setLastUpdateDate(LocalDate.now().format(DateTimeFormatter.ISO_DATE)); // Set last update date to now
                products.set(i, updatedProduct); // Update the product in the list
                return updatedProduct; // Return the updated product
            }
        }
        return null; // Return null if the product was not found
    }

    public void deleteProduct(int id){ // Delete product by ID
        products.removeIf(product -> product.getId() == id); // Remove the product from the list
    }
}
