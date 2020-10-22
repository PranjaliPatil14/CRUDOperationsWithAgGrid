export const filterParams = {
  comparator: (filterDateCondition, cellValue) => {
    var dateAsString = cellValue;

    if (dateAsString == null) {
      return 0;
    }
    var dateParts = dateAsString.split("/");
    var day = Number(dateParts[1]);
    var month = Number(dateParts[0]) - 1;
    var year = Number(dateParts[2]);
    var cellDate = new Date(year, month, day);
    if (cellDate < filterDateCondition) {
      return -1;
    } else if (cellDate > filterDateCondition) {
      return 1;
    } else {
      return 0;
    }
  },
  clearButton: true,
};
