package com.inventoryms.backend;

import com.inventoryms.models.Product;
import com.inventoryms.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
    }

    @Test
    void testAddProduct() {
        Product product = new Product();
        product.setName("Test");
        product.setCategory("TestCat");
        product.setStock(10);
        product.setPrice(5.0);
        product.setExpirationDate("2025-12-31");

        Product added = productService.addProduct(product);

        assertNotNull(added.getId());
        assertEquals("Test", added.getName());
        assertEquals(10, added.getStock());
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = productService.getAllProducts();
        assertNotNull(products);
    }

    @Test
    void testUpdateProduct() {
        Product product = new Product();
        product.setName("UpdateTest");
        product.setCategory("Cat");
        product.setStock(5);
        product.setPrice(2.0);
        product.setExpirationDate("2025-12-31");

        Product added = productService.addProduct(product);

        added.setStock(20);
        Product updated = productService.updateProduct(added.getId(), added);

        assertNotNull(updated);
        assertEquals(20, updated.getStock());
    }

    @Test
    void testDeleteProduct() {
        Product product = new Product();
        product.setName("DeleteTest");
        product.setCategory("Cat");
        product.setStock(1);
        product.setPrice(1.0);
        product.setExpirationDate("2025-12-31");

        Product added = productService.addProduct(product);
        int id = added.getId();

        productService.deleteProduct(id);

        assertNull(productService.getAllProducts().stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null));
    }

    @Test
    void testAddProductWithLongNameThrowsException() {
        Product product = new Product();
        product.setName("a".repeat(121));
        product.setCategory("Cat");
        product.setStock(1);
        product.setPrice(1.0);
        product.setExpirationDate("2025-12-31");

        assertThrows(IllegalArgumentException.class, () -> productService.addProduct(product));
    }
}