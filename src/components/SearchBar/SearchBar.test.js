import { render } from "@testing-library/react";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import CapsuleProvider from "../../context/CapsuleProvider";
import userEvent from "@testing-library/user-event";

describe("<SearhBar/>", () => {
  it("Search component renders properly", () => {
    const { getByText, getByTestId } = render(
      <CapsuleProvider>
        <SearchBar />
      </CapsuleProvider>
    );
    expect(getByTestId("collapse")).toBeInTheDocument();
    expect(getByText("Filters")).toBeInTheDocument();
  });
  it("Expand collapse properly", async () => {
    const { getByText, findByText, getByRole } = render(
      <CapsuleProvider>
        <SearchBar />
      </CapsuleProvider>
    );
    await userEvent.click(getByText(/Filters/i));
    expect(await findByText(/Select Status/i)).toBeInTheDocument();
    expect(await findByText(/Select type/i)).toBeInTheDocument();
    expect(await findByText(/Launch Date/i)).toBeInTheDocument();
    expect(
      await getByRole("button", { name: "Apply Filter" })
    ).toBeInTheDocument();
  });
});
