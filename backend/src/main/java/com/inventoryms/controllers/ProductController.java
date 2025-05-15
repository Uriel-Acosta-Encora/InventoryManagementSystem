package com.inventoryms.controllers;

import org.springframework.beans.factory.annotation.Autowired; // Import Services
import org.springframework.web.bind.annotation.*; // Api Operations
import com.inventoryms.services.ProductService;
import com.inventoryms.models.Product;
import java.util.List;


@RestController
@RequestMapping("/products") // Endoint for ProductController
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React
public class ProductController {

    @Autowired
    private ProductService productService; // Inject ProductService dependency
    
    @GetMapping // GET request to fetch all products
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @PostMapping // POST request to add a new product
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
}
