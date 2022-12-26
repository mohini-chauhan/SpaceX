import React from "react";
import Product from "./Product";
import CapsuleProvider from "../../context/CapsuleProvider";
import { render, waitFor } from "@testing-library/react";
import "../../jest.setup";
import getCapsuleData from "../../api/api";
import userEvent from "@testing-library/user-event";

jest.mock("../../api/api");

const mockdata = () =>
  getCapsuleData.mockResolvedValue({
    data: [
      {
        capsule_serial: "C101",
        capsule_id: "dragon1",
        status: "retired",
        original_launch: "2010-12-08T15:43:00.000Z",
        original_launch_unix: 1291822980,
        missions: [
          {
            name: "COTS 1",
            flight: 7,
          },
        ],
        landings: 1,
        type: "Dragon 1.0",
        details: "Reentered after three weeks in orbit",
        reuse_count: 0,
      },
    ],
  });

describe("<Product/>", () => {
  afterEach(() => jest.clearAllMocks());
  it("Should render Product page propserly", async () => {
    mockdata();
    const { getByText } = render(
      <CapsuleProvider>
        <Product />
      </CapsuleProvider>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText("Serial Number:C101")).toBeInTheDocument();
      expect(getByText("Status:retired")).toBeInTheDocument();
    });
  });
  it("Should render product modal on click", async () => {
    mockdata();
    const { getByText, getByTestId } = render(
      <CapsuleProvider>
        <Product />
      </CapsuleProvider>
    );
    await waitFor(async () => {
      await userEvent.click(getByTestId(/modal-open/i));
      expect(getByText("Capsule: C101")).toBeInTheDocument();
      expect(getByText("Mission: COTS 1")).toBeInTheDocument();
      expect(getByText("Launch_Date: Wed Dec 08 2010")).toBeInTheDocument();
      expect(
        getByText("Launch_Time: 21:13:00 GMT+0530 (India Standard Time)")
      ).toBeInTheDocument();
      expect(
        getByText("Details: Reentered after three weeks in orbit")
      ).toBeInTheDocument();
    });
  });
});
