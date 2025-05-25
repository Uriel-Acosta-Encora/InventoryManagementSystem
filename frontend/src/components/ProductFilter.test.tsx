import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilter from "./ProductFilter";

describe("ProductFilter", () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();
  const filters = { name: "", categories: [], stock: "" };
  const categories = ["Electronics", "Books"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders fields correctly", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  });

  it("calls onChange when writing to the Name field", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    const input = screen.getByPlaceholderText("Name");
    fireEvent.change(input, { target: { value: "TV" } });
    expect(mockOnChange).toHaveBeenCalledWith({ ...filters, name: "TV" });
  });

  it("calls onChange when selecting a category", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "Books" } });
    expect(mockOnChange).toHaveBeenCalledWith({ ...filters, categories: ["Books"] });
  });

  it("calls onChange when selecting stock", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[1], { target: { value: "in" } });
    expect(mockOnChange).toHaveBeenCalledWith({ ...filters, stock: "in" });
  });

  it("calls onSearch when you click Search", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText(/Search/i));
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("calls onClear when clicking Clear", () => {
    render(
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText(/Clear/i));
    expect(mockOnClear).toHaveBeenCalled();
  });
});