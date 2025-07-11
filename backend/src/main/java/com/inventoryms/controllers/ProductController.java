package com.inventoryms.controllers;

import org.springframework.beans.factory.annotation.Autowired; // Import Services
import org.springframework.web.bind.annotation.*; // Api Operations change to specific if time :)
// Import product Model and Service
import com.inventoryms.services.ProductService;
import com.inventoryms.models.Product;

import java.util.List;

@RestController // Handle HTTP requests to return JSON
@RequestMapping("/products") // Endoint for ProductController
@CrossOrigin(origins = "http://localhost:8080") // Allow CORS for React
public class ProductController {

    @Autowired
    private ProductService productService; // Inject ProductService instance
    
    @GetMapping // GET request to fetch all products
    public List<Product> getAllProducts() {
        return productService.getAllProducts(); // Return in JSON format
    }
    @PostMapping // POST request to add a new product
    public Product addProduct(@RequestBody Product product) { // Request body to Product object
        return productService.addProduct(product); // Return in JSON format
    }

    @PutMapping("/{id}") // PUT request to update a product
    public Product updateProduct(@PathVariable int id, @RequestBody Product product) { // Path variable to get the ID
        product.setId(id); // Set the ID of the product to be updated
        return productService.updateProduct(id, product); // Call the service method to update the product
    }
    
    @DeleteMapping("/{id}") // DELETE request to delete a product by ID
    public void deleteProduct(@PathVariable int id) { // Path variable to get the ID
        productService.deleteProduct(id); // Call the service method to delete the product
    }

    @PostMapping("/{id}/outofstock") // POST request to set a product as out of stock
    public Product setOutOfStockProduct(@PathVariable int id) {
        Product product = productService.getAllProducts().stream().
        filter(p -> p.getId() == id).findFirst().orElse(null); // Find the product by ID
        
        if (product != null){ // Check if the product exists
            product.setStock(0);
            productService.updateProduct(id, product);
        }
        return product; // Return the updated product
    }

    @PutMapping("/{id}/instock") // PUT request to restore stock of a product
    public Product restoreStock(@PathVariable int id) {
        Product product = productService.getAllProducts().stream().
        filter(p -> p.getId() == id).findFirst().orElse(null);
        
        if (product != null){
            product.setStock(10);
            productService.updateProduct(id, product);
        }
        return product;
    }
    
}
