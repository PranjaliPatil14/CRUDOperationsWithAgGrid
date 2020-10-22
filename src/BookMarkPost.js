import React from "react";

const BookMarkPost = ({ api, data, node }) => {
  const markBookMark = () => {
    data.bookMark = !data.bookMark;
    api.applyTransaction({ update: [data] });
    api.refreshCells({ rowNodes: [node], force: true });
  };
  return (
    <button type="submit" onClick={markBookMark} className="bookmark-post">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "#3b4252" }}
      >
        {data.bookMark ? (
          <path d="M18 24l-6-5.269-6 5.269v-24h12v24z" />
        ) : (
          <path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v20.827l-6-5.144-6 5.144v-20.827z" />
        )}
      </svg>
    </button>
  );
};

export default BookMarkPost;
