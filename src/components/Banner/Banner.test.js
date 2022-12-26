import React from "react";
import ReactDOM from "react-dom";
import Banner from "./Banner";
import { render } from "@testing-library/react";
import "../../jest.setup";

describe("Banner", () => {
  it("Display text", () => {
    const { getByText } = render(<Banner />);
    expect(getByText("WE EXPLORE UNKNOWN WORLDS...")).toBeInTheDocument();
  });
  it("Banner image source attribute should have value", () => {
    const { getByRole } = render(<Banner />);
    expect(getByRole("img")).toHaveAttribute("src");
    expect(getByRole("img")).toHaveAttribute("alt", "earth");
  });
});
