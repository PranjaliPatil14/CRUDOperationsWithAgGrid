import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  getByDisplayValue,
} from "@testing-library/react";
import App from "../App";
import postsData from "./test.json";

describe("App", () => {
  const posts = postsData;

  const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(posts),
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
  test("should render Add Post button, post count and grid with data", async () => {
    const { asFragment } = render(<App suppressColumnVirtualisation />);

    //Wait for grid to get initialized
    await screen.findByText("5");
    // Snapshot of grid info
    expect(asFragment().querySelector(".grid-info")).toMatchSnapshot();

    // Check if data is loaded
    expect(screen.queryByText("Ag Grid Tests")).toBeInTheDocument();
    expect(screen.queryByText("Post Title")).toBeInTheDocument();
    expect(screen.queryByText("Post Content")).toBeInTheDocument();
  });

  test("should add post in the grid and update the total post count", async () => {
    const { container } = render(<App suppressColumnVirtualisation />);

    await screen.findByText("5");
    expect(container.querySelector(".highlight-row")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please Enter Post Title...")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.queryByText("Add Post"));

    await screen.findByText("6");

    expect(screen.queryByText("6")).toBeInTheDocument();
    expect(
      screen.queryByText("Please Enter Post Title...")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Please Enter Post Content...")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(new Date().toLocaleDateString())
    ).toBeInTheDocument();

    expect(container.querySelector(".highlight-row")).toBeInTheDocument();
  });

  test("should edit post title to My First blog text", async () => {
    const { container } = render(<App suppressColumnVirtualisation />);

    await screen.findByText("5");

    fireEvent.click(screen.queryByText("Ag Grid Tests"));

    await screen.findByDisplayValue("Ag Grid Tests");

    fireEvent.change(container.querySelector("input[type='text']"), {
      target: { value: "My First Blog" },
    });

    fireEvent.click(screen.queryByText("Add Post"));

    expect(screen.queryByText("My First Blog")).not.toBeNull();
  });
});
