import React, { forwardRef, useImperativeHandle, useState } from "react";

const CustomInputEditor = forwardRef((props, ref) => {
  const [postTitle, setPostTitle] = useState(props.value);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return postTitle;
      },
    };
  });

  return (
    <input
      value={postTitle}
      onChange={({ target }) => setPostTitle(target.value)}
      type="text"
      id="postTitle"
    />
  );
});

export default CustomInputEditor;
