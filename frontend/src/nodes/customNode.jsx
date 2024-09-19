import React from "react";
import BaseNode from "./BaseNode/baseNode";
import { Position } from "reactflow";
import { useState } from "react";

export const CustomNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    console.log("Input Type:", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Custom Node"
      onSelectChange={handleTypeChange}
      outputs={[
        {
          label: "Select",
          value: inputType,
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        },
      ]}
      inputs={[
        { label: "Enter something", type: "text", value: "", options: [] },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input1" },
        // { type: "target", position: Position.Left, id: "input2" },

        { type: "source", position: Position.Right, id: "output1" },
        // { type: "source", position: Position.Right, id: "output2" },
      ]}
    />
  );
};
