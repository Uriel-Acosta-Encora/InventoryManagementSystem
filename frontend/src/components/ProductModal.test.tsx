import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductModal from "./ProductModal";
import { Product } from "../models/Product";

const baseProps = {
  isOpen: true,
  onClose: jest.fn(),
  onSave: jest.fn(),
  product: null as Product | null,
};

describe("ProductModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing if isOpen is false", () => {
    render(<ProductModal {...baseProps} isOpen={false} />);
    expect(screen.queryByText(/Create Product/i)).not.toBeInTheDocument();
  });

  it("renders the creation form", () => {
    render(<ProductModal {...baseProps} />);
    expect(screen.getByText(/Create Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unit Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration Date/i)).toBeInTheDocument();
  });

  it("displays validation errors if fields are empty and you try to save", () => {
    render(<ProductModal {...baseProps} />);
    fireEvent.click(screen.getByText(/Save/i));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
  });

  it("calls onSave with the correct data and closes the modal", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();
    render(<ProductModal {...baseProps} onSave={onSave} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "TestCat" } });
    fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/Unit Price/i), { target: { value: "99.99" } });
    fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: "2025-12-31" } });
    fireEvent.click(screen.getByText(/Save/i));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Product",
        category: "TestCat",
        stock: 10,
        price: 99.99,
        expirationDate: "2025-12-31",
      })
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose and clears the form when Cancel is clicked", () => {
    const onClose = jest.fn();
    render(<ProductModal {...baseProps} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test Product" } });
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onClose).toHaveBeenCalled();

    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
  });

  it("renders the edit form if a product is passed", () => {
    const product: Product = {
      id: 1,
      name: "EditMe",
      category: "Cat",
      stock: 5,
      price: 50,
      expirationDate: "2025-01-01",
    };
    render(<ProductModal {...baseProps} product={product} />);
    expect(screen.getByDisplayValue("EditMe")).toBeInTheDocument();
    expect(screen.getByText(/Edit Product/i)).toBeInTheDocument();
  });
});