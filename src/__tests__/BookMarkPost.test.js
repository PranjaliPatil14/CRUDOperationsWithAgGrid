import React from "react";
import { render } from "@testing-library/react";
import BookMarkPost from "../BookMarkPost";

describe("BookMarkPost", () => {
  let props;

  beforeEach(() => {
    props = {
      api: {
        applyTransaction: jest.fn(),
        refreshCells: jest.fn(),
      },
      data: {
        bookMark: false,
      },
      node: {},
    };
  });

  test("should render bookmark icon filled with white color when post is not bookmarked", () => {
    const { asFragment } = render(<BookMarkPost {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
