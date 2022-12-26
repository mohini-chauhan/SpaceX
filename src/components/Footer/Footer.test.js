import React from "react";
import Footer from "./Footer";
import { render } from "@testing-library/react";

describe("<Footer/>", () => {
  it("should render properly", () => {
    const { getByText, getByTestId } = render(<Footer />);
    expect(getByText(/Follow us on/i)).toBeInTheDocument();
    expect(getByTestId("linkedinIcon")).toBeInTheDocument();
    expect(getByTestId("emailIcon")).toBeInTheDocument();
    expect(getByTestId("mobilephoneIcon")).toBeInTheDocument();
    expect(
      getByText(/Designed from scratch by Mohini. © 2022 All rights reserved./i)
    ).toBeInTheDocument();
  });
});
