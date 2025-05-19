package com.inventoryms.models;
// Models = Pydantic Models
public class Product {
    // Base Attributes
    private int id;
    private String name;
    private String category;
    private int stock;
    private double price;
    private String expirationDate;
    private String creationDate;
    private String lastUpdateDate;

    public Product(){} // Void constructor for Spring Boot

    public Product(
        int id, 
        String name, 
        String category, 
        int stock, 
        double price, 
        String expirationDate, 
        String creationDate,
        String lastUpdateDate
        ){
        this.id = id;
        this.name = name;
        this.category = category;
        this.stock = stock;
        this.price = price;
        this.expirationDate = expirationDate;
        this.creationDate = creationDate;
        this.lastUpdateDate = lastUpdateDate;
    }

    // Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getCategory() {return category;}
    public void setCategory(String category) {this.category = category;}

    public int getStock() {return stock;}
    public void setStock(int stock) {this.stock = stock;}

    public double getPrice() {return price;}
    public void setPrice(double price) {this.price = price;}

    public String getExpirationDate() {return expirationDate;}
    public void setExpirationDate(String expirationDate) {this.expirationDate = expirationDate;}

    public String getCreationDate() {return creationDate;}
    public void setCreationDate(String creationDate) {this.creationDate = creationDate;}

    public String getLastUpdateDate() {return lastUpdateDate;}
    public void setLastUpdateDate(String lastUpdateDate) {this.lastUpdateDate = lastUpdateDate;}


}
