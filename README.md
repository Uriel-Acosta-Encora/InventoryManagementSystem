# Inventory Management System
Breakable Toy I 

Inventory management system with a Spring Boot backend and a React frontend.

## Features

- Product management: create, edit, delete, and list products.
- Advanced filtering and search by name, category, and stock.
- Inventory metrics by category and totals.
- Product pagination and sorting.
- Intuitive and responsive interface.

## Project Structure

```
InventoryManagementSystem/
├── backend/   # REST API in Spring Boot
└── frontend/  # Web application in React
```

## Requirements

- Node.js (v16+ recommended)
- npm
- Java 21+
- Maven

## Installation and Running

### Backend

1. Go to the `backend` folder:
   ```sh
   cd backend
   ```
2. Build and run the backend:
   ```sh
   mvn spring-boot:run
   ```
   The backend will be available at [http://localhost:9090](http://localhost:9090).

### Frontend

1. Go to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
   The frontend will be available at [http://localhost:8080](http://localhost:8080).



## API

The backend exposes the following main endpoints:

- `GET /products` - List all products.
- `POST /products` - Create a new product.
- `PUT /products/{id}` - Update an existing product.
- `DELETE /products/{id}` - Delete a product.
- `POST /products/{id}/outofstock` - Mark a product as out of stock.
- `PUT /products/{id}/instock` - Restore a product's stock.

# Endpoints

- **Get page of products, sorted by category, order and filtered.** 
```
  GET /products
```

- **Add a new product.**
```
  POST /products
```

- **Update an existing product.**
```
  PUT /products/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required** Id of product |

- **Delete an existing product.** 
```
  DELETE /products/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required** Id of product|

- **Mark an existing product out of stock.** 
```
  POST /products/{id}/outofstock
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required** Id of product to mark out of stock, set marked product to 0 units |

- **Mark an existing product in stock.** 
```
  PUT /products/{id}/instock
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` |  **Required** Id of product to mark in stock, set marked product to 10 units |

## Testing

### Backend

Run unit tests with Maven:
```sh
cd backend
mvn test
```

### Frontend

Run React unit tests:
```sh
cd frontend
npm test
```

Developed by Uriel Acosta :)