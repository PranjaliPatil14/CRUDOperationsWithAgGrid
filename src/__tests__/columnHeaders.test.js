import BookMarkPost from "../BookMarkPost";
import columnData from "../columnHeaders";
import DeletePost from "../DeletePost";

describe("columnHeaders", () => {
  test("should return all columns", () => {
    expect(columnData).toMatchSnapshot();
  });

  test("should return toLocaleDateString value for date column when date present in the row data", () => {
    const params = {
      data: {
        date: new Date("2020-05-12"),
      },
    };
    expect(columnData[0].valueGetter(params)).toEqual("5/12/2020");
  });

  test("should return value for date column when date is not present in the row data", () => {
    const params = {
      data: {
        id: 10,
      },
    };

    const expectedDate = new Date();
    expectedDate.setDate(10);

    expect(columnData[0].valueGetter(params)).toEqual(
      expectedDate.toLocaleDateString()
    );
  });

  test("should return Cell renderer framework for BookMark column", () => {
    expect(columnData[3].cellRendererFramework).toEqual(BookMarkPost);
  });

  test("should return Cell renderer framework for delete column", () => {
    expect(columnData[4].cellRendererFramework).toEqual(DeletePost);
  });
});
