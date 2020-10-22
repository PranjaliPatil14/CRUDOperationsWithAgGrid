import BookMarkPost from "./BookMarkPost";
import DeletePost from "./DeletePost";
import { filterParams } from "./helper";
import CustomInputEditor from "./CustomInputEditor";

const columnData = [
  {
    headerName: "Date",
    field: "date",
    valueGetter: (params) => {
      const date = new Date();
      if (params.data.date) {
        return params.data.date.toLocaleDateString();
      }
      date.setDate(params.data.id);
      return date.toLocaleDateString();
    },
    filter: "agDateColumnFilter",
    editable: false,
    minWidth: 80,
    filterParams,
  },
  {
    headerName: "Post Title",
    field: "title",
    cellClass: "bold-text",
    cellEditorFramework: CustomInputEditor,
    minWidth: 350,
  },
  {
    headerName: "Post Content",
    field: "body",
  },
  {
    headerName: "BookMark",
    field: "bookMark",
    cellRendererFramework: BookMarkPost,
    editable: false,
    sort: "desc",
    filter: false,
    minWidth: 100,
  },
  {
    headerName: "",
    cellRendererFramework: DeletePost,
    editable: false,
    sortable: false,
    filter: false,
    width: 70,
  },
];

export default columnData;
