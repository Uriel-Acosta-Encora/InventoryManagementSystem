package com.inventoryms.backend;

import com.inventoryms.models.Product;
import com.inventoryms.controllers.ProductController;
import com.inventoryms.services.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product getSampleProduct() {
        Product p = new Product();
        p.setId(1);
        p.setName("Producto 1");
        p.setStock(5);
        return p;
    }

    @Test
    void shouldReturnOkWhenGetAllProducts() throws Exception {
        when(productService.getAllProducts()).thenReturn(Collections.singletonList(getSampleProduct()));
        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Producto 1"));
    }

    @Test
    void shouldReturnOkWhenAddProduct() throws Exception {
        Product p = getSampleProduct();
        when(productService.addProduct(any(Product.class))).thenReturn(p);

        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Producto 1\",\"stock\":5}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Producto 1"));
    }

    @Test
    void shouldReturnOkWhenUpdateProduct() throws Exception {
        Product p = getSampleProduct();
        when(productService.updateProduct(eq(1), any(Product.class))).thenReturn(p);

        mockMvc.perform(put("/products/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Producto 1\",\"stock\":5}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void shouldReturnOkWhenDeleteProduct() throws Exception {
        doNothing().when(productService).deleteProduct(1);

        mockMvc.perform(delete("/products/1"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnOkWhenSetOutOfStockProduct() throws Exception {
        Product p = getSampleProduct();
        List<Product> products = Arrays.asList(p);
        when(productService.getAllProducts()).thenReturn(products);
        when(productService.updateProduct(eq(1), any(Product.class))).thenReturn(p);

        mockMvc.perform(post("/products/1/outofstock"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(0));
    }

    @Test
    void shouldReturnOkWhenRestoreStock() throws Exception {
        Product p = getSampleProduct();
        List<Product> products = Arrays.asList(p);
        when(productService.getAllProducts()).thenReturn(products);
        when(productService.updateProduct(eq(1), any(Product.class))).thenReturn(p);

        mockMvc.perform(put("/products/1/instock"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(10));
    }
}