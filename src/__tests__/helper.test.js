const { filterParams } = require("../helper");
describe("helper", () => {
  test("should sort dates in ascending order", () => {
    const dates = ["10/01/2020", "9/05/2020", "4/01/2020", "11/01/2020"];

    const filterDateCondition = new Date("10/01/2020");
    expect(
      dates.map((date) => filterParams.comparator(filterDateCondition, date))
    ).toEqual([0, -1, -1, 1]);
  });
});
