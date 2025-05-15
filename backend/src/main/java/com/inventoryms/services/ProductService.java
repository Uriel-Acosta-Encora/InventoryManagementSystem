package com.inventoryms.services;

import org.springframework.stereotype.Service;

import com.inventoryms.models.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

@Service
public class ProductService {
    private final List<Product> products = new ArrayList<>();

    public ProductService(){
        // Dummy data
        products.add(new Product(1,"Pan", "Alimentos", 20, 1.5, "2025-06-01"));
        products.add(new Product(2, "Jabon", "Limpieza", 15, 3.99, "N/A"));
        products.add(new Product(3, "Detergente", "Limpieza", 10, 5.99, "2024-12-31"));
        products.add(new Product(4, "Leche", "Alimentos", 30, 0.99, "2023-10-15"));
        products.add(new Product(5, "MacBook", "Tecnologia", 5, 1200, "N/A"));
    }

    public List<Product> getAllProducts(){
        return Collections.unmodifiableList(products);
    }

    public Product addProduct(Product product){
        if(product.getExpirationDate() == null || product.getExpirationDate().trim().isEmpty()){
            product.setExpirationDate("N/A");
        }
        products.add(product);
        return product;
    }
}
