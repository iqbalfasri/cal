import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Calculator from "./Calculator";

describe("<Calculator />", () => {
  it("Show operator", () => {
    render(<Calculator />);
    const calcOperators = ["+", "-", "×", "/"];

    calcOperators.forEach((operator) => {
      expect(screen.getByText(operator.toString())).toBeInTheDocument();
    });
  });

  it("Show input number", () => {
    render(<Calculator />);
    expect(screen.getByPlaceholderText("Input 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input 2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input 3")).toBeInTheDocument();
  });
});
