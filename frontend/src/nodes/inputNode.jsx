import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode/baseNode";

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleInputChange = (e) => {
    setInputName(e.target.value);
    console.log("Input Name:", e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    console.log("Input Type:", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input Node"
      inputs={[{ label: "Field Name", value: inputName, type: "text" }]}
      outputs={[{ label: "Type", value: inputType, options: ["Text", "File"] }]}
      onInputChange={handleInputChange}
      onSelectChange={handleTypeChange}
      handles={[{ type: "source", position: Position.Right, id: "value" }]}
    />
  );
};
