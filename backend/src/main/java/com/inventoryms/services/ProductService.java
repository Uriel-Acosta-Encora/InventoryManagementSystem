package com.inventoryms.services;

import org.springframework.stereotype.Service; // Set as a Service

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.inventoryms.models.Product; // Import Product Model

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter; // Import DateTimeFormatter

@Service // To instance the class as a Service
public class ProductService {
    // Dummy list of products, in memory storage
    private final List<Product> products = new ArrayList<>();
    private int nextId; // Next ID for new products

    public ProductService(){
        // Dummy data
        // Load products from JSON file
        ObjectMapper mapper = new ObjectMapper();
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("products.json")) {
            if (is != null) {
                List<Product> loadedProducts = mapper.readValue(is, new TypeReference<List<Product>>() {});
                products.addAll(loadedProducts);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to load products from JSON", e);
        }
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

        if (product.getName().length() > 120) {
            throw new IllegalArgumentException("Name must be at most 120 characters.");
        }
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
        if (updatedProduct.getName().length() > 120) {
            throw new IllegalArgumentException("Name must be at most 120 characters.");
        }
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
