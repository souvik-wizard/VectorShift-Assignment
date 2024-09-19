import React, { useState } from "react";
import BaseNode from "./BaseNode/baseNode";
import { Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleOutputChange = (e) => {
    setOutputName(e.target.value);
    console.log("Output Name:", e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    console.log("Output Type:", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output Node"
      inputs={[{ label: "Name", value: outputName, type: "text" }]}
      outputs={[
        { label: "Type", value: outputType, options: ["Text", "File"] },
      ]}
      onInputChange={handleOutputChange}
      onSelectChange={handleTypeChange}
      handles={[{ type: "target", position: Position.Left, id: "output" }]}
    />
  );
};
