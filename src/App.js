import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import DeletePost from "./DeletePost";
import BookMarkPost from "./BookMarkPost";
import "./style.css";

export default function App() {
  const [rowData, setRowData] = useState([]);
  const [rowCount, setRowCount] = useState(null);
  const gridApi = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        setRowData(jsonResponse);
      });
  }, []);

  const onGridReady = params => {
    gridApi.current = params;
  };

  const onModelUpdated = params => {
    setRowCount(params.api.rowModel.rowsToDisplay.length);
  };

  const onAddPost = () => {
    gridApi.current.api.applyTransaction({
      add: [{ title: "Please Enter Post Title...", body: "Please Enter Post Content...", newRow: true }],
      addIndex: 0
    });
  };

  const columnData = [
    {
      headerName: "Post Title",
      field: "title",
      cellClass: "bold-text",
      minWidth: 350
    },
    {
      headerName: "Post Content",
      field: "body"
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
      width: 70
    }
  ];
  const defaultConfigs = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: true
  };

  return (
    <div className="page">
    <div className="grid-info">
      <button className="add-post" type="submit" onClick={onAddPost}>
        Add Post
      </button>
        <div><div className="info" /> : Newely Added Posts</div>
        <p className="row-count">
          Total No of Posts: <strong>{rowCount}</strong>
        </p>
        </div>
      <div
        style={{ height: "90vh", width: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          columnDefs={columnData}
          rowData={rowData}
          defaultColDef={defaultConfigs}
          onGridReady={onGridReady}
          singleClickEdit
          onModelUpdated={onModelUpdated}
          rowClassRules={{
            "highlight-row": params => params.data.newRow
          }}
        />
      </div>
    </div>
  );
}
