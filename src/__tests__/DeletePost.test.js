import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeletePost from "../DeletePost";

describe("Delete post", () => {
  let props;
  let data = { id: 1 };
  beforeEach(() => {
    props = {
      api: {
        updateRowData: jest.fn(),
      },
      data,
    };
  });
  test("should render delete post component if the post is not book marked", () => {
    const { asFragment } = render(<DeletePost {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("should call updateRowData on click of delete icon", () => {
    render(<DeletePost {...props} />);
    fireEvent.click(screen.getByRole("button"));
    expect(props.api.updateRowData).toHaveBeenCalledWith({ remove: [data] });
  });

  test("should render empty fragment if the post is bookmarked", () => {
    props = {
      ...props,
      data: {
        bookMark: true,
      },
    };
    render(<DeletePost {...props} />);

    expect(screen.queryByRole("button")).toBeNull();
  });
});
