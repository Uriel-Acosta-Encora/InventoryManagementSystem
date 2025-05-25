import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "./ProductPagination";
import { Product } from "../models/Product";

const products: Product[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Product${i + 1}`,
  category: i % 2 === 0 ? "CatA" : "CatB",
  price: 10 + i,
  stock: i,
  expirationDate: "2099-12-31",
}));

const appliedFilters = { name: "", categories: [], stock: "" };

describe("ProductList (ProductPagination)", () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table and pagination", () => {
    render(
      <ProductList
        products={products}
        appliedFilters={appliedFilters}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={onRefresh}
      />
    );

    expect(screen.getAllByRole("row")).toHaveLength(11);

    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });

  it("change pages by clicking on pagination", () => {
    render(
      <ProductList
        products={products}
        appliedFilters={appliedFilters}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={onRefresh}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(screen.getAllByRole("row")).toHaveLength(6); 
  });

  it("calls onEdit and onDelete when the buttons are clicked", () => {
    render(
      <ProductList
        products={products}
        appliedFilters={appliedFilters}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={onRefresh}
      />
    );
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(onEdit).toHaveBeenCalled();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(onDelete).toHaveBeenCalled();
  });


  it("", () => {
    const today = new Date();
    const in5days = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const in10days = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const in20days = new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const customProducts: Product[] = [
      { id: 1, name: "A", category: "C", price: 1, stock: 1, expirationDate: in5days },
      { id: 2, name: "B", category: "C", price: 1, stock: 1, expirationDate: in10days },
      { id: 3, name: "C", category: "C", price: 1, stock: 1, expirationDate: in20days },
    ];
    render(
      <ProductList
        products={customProducts}
        appliedFilters={appliedFilters}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={onRefresh}
      />
    );
    const rows = screen.getAllByRole("row");

    expect(rows[1].className).toContain("expiry-red");
    expect(rows[2].className).toContain("expiry-yellow");
    expect(rows[3].className).toContain("expiry-green");
  });
});