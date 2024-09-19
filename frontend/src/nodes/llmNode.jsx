import React from "react";
import BaseNode from "./BaseNode/baseNode";
import { Position } from "reactflow";
import { useState } from "react";

export const LLMNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    console.log("Input Type:", e.target.value);
  };
  return (
    <BaseNode
      id={id}
      title="LLM Node"
      onSelectChange={handleTypeChange}
      outputs={[
        { label: "Response", value: inputType, options: ["Text", "File"] },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "system" },
        { type: "target", position: Position.Left, id: "prompt" },
        { type: "source", position: Position.Right, id: "response" },
      ]}
    />
  );
};
