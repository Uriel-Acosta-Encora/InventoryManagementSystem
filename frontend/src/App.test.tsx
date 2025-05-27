import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch global
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("App", () => {
  it("renders Inventory Management System title", async () => {
    render(<App />);
    
    await waitFor(() =>
      expect(screen.getByText(/Inventory Management System/i)).toBeInTheDocument()
    );
  });

  it("calls fetchProducts on mount", async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:9090/products");
    });
  });

  it("opens modal when Add Product button is clicked", async () => {
    render(<App />);
    
    const addButton = await screen.findByText(/Add Product/i);
    fireEvent.click(addButton);
    
    await waitFor(() =>
      expect(screen.getByText(/Create Product/i)).toBeInTheDocument()
    );
  });
});