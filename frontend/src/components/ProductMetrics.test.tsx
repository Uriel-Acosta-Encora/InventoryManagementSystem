import React from "react";
import { render, screen, within } from "@testing-library/react";
import InventoryMetrics from "./ProductMetrics";
import { Product } from "../models/Product";

describe("InventoryMetrics", () => {
  const products: Product[] = [
    { id: 1, name: "TV", category: "Electronics", price: 1000, stock: 5 },
    { id: 2, name: "Laptop", category: "Electronics", price: 2000, stock: 2 },
    { id: 3, name: "Book", category: "Books", price: 20, stock: 10 },
    { id: 4, name: "Notebook", category: "Books", price: 10, stock: 0 },
  ];

  it("displays overall and category metrics correctly", () => {
    render(<InventoryMetrics products={products} />);

    const electronicsRow = screen.getByText("Electronics").closest("tr");
    expect(electronicsRow).toBeInTheDocument();
    const electronicsCells = within(electronicsRow as HTMLElement).getAllByRole("cell");
    expect(electronicsCells[1]).toHaveTextContent("7"); // stock
    expect(electronicsCells[2]).toHaveTextContent("$9000.00"); // value
    expect(electronicsCells[3]).toHaveTextContent("$1500.00"); // avg price

    const booksRow = screen.getByText("Books").closest("tr");
    expect(booksRow).toBeInTheDocument();
    const booksCells = within(booksRow as HTMLElement).getAllByRole("cell");
    expect(booksCells[1]).toHaveTextContent("10"); // stock
    expect(booksCells[2]).toHaveTextContent("$200.00"); // value
    expect(booksCells[3]).toHaveTextContent("$15.00"); // avg price

    const overallRow = screen.getByText("Overall").closest("tr");
    expect(overallRow).toBeInTheDocument();
    const overallCells = within(overallRow as HTMLElement).getAllByRole("cell");
    expect(overallCells[1]).toHaveTextContent("17"); // total stock
    expect(overallCells[2]).toHaveTextContent("$9200.00"); // total value
    expect(overallCells[3]).toHaveTextContent("$757.50"); // avg price
  });

  it("displays zeros when there are no products", () => {
    render(<InventoryMetrics products={[]} />);
    const overallRow = screen.getByText("Overall").closest("tr");
    expect(overallRow).toBeInTheDocument();
    const overallCells = within(overallRow as HTMLElement).getAllByRole("cell");
    expect(overallCells[1]).toHaveTextContent("0");
    expect(overallCells[2]).toHaveTextContent("$0.00");
    expect(overallCells[3]).toHaveTextContent("$0.00");
  });
});