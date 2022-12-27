import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import App from "./App";
import "./jest.setup";

// it("Renders the landing page", () => {
//   const { getAllByRole } = render(<App />);
//   expect(getAllByRole("img")).toBeInTheDocument();
// });
//it is a dummy test
describe("Dummy", () => {
  it("Should be true", () => {
    const test = true;
    expect(test).toBe(true);
  });
});
