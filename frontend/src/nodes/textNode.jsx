import React, { useState } from "react";
import BaseNode from "./BaseNode/baseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setText(e.target.value);
    console.log("Text:", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text Node"
      inputs={[{ label: "Text", value: text, type: "textarea" }]}
      onInputChange={handleTextChange}
      handles={[
        { type: "source", position: Position.Right, id: "output" },
        { type: "target", position: Position.Left, id: "input" },
      ]}
    />
  );
};
