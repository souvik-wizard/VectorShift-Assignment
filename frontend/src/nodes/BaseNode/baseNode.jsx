import React, { useContext } from "react";
import { Handle } from "reactflow";
import VariableInputArea from "../components/editableArea";
import { PipelineContext } from "../../context/PipelineContext";

const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  handles = [],
  onInputChange,
  onSelectChange,
}) => {
  const { nodes, edges, updateEdges, updateNodes } =
    useContext(PipelineContext);

  const requestHandler = (params) => {
    const newEdge = { source: params.source, target: params.target };

    // Add both source and target nodes if they are not already in the nodes list
    const newSourceNode = params.source;
    const newTargetNode = params.target;

    // Check if the source and target nodes already exist
    const nodeExists = (nodeId) => nodes.some((node) => node.id === nodeId);

    // Add the new nodes if they don't already exist
    if (!nodeExists(newSourceNode)) {
      updateNodes((prevNodes) => [...prevNodes, { id: newSourceNode }]);
    }

    if (!nodeExists(newTargetNode)) {
      updateNodes((prevNodes) => [...prevNodes, { id: newTargetNode }]);
    }

    updateEdges((prevEdges) => [...prevEdges, newEdge]);

    console.log("Updated Nodes:", nodes);
    console.log("Updated Edges:", edges);
  };

  return (
    <div className="bg-[#1B0C43]/60 shadow-lg border border-[#301E5A] rounded-xl w-64 text-white">
      <div className="font-semibold bg-[#440B8A] p-4 rounded-t-xl">{title}</div>
      <div className="inputs px-4 py-2">
        {inputs.map((input, idx) => (
          <label key={idx} className="block mb-2 text-sm">
            {input.label}
            {input.type === "textarea" ? (
              <VariableInputArea />
            ) : (
              <input
                className="mt-1 p-1 rounded-md w-full bg-[#440B8A] focus:outline-none"
                type={input.type}
                value={input.value}
                onChange={(e) => onInputChange(e, idx)}
              />
            )}
          </label>
        ))}
      </div>
      <div className="outputs pb-2">
        {outputs.map((output, idx) => (
          <label key={idx} className="block mb-2 px-4 text-sm">
            {output.label}
            <select
              className="mt-1 p-1 rounded-md w-full bg-[#440B8A] focus:outline-none"
              value={output.value}
              onChange={(e) => onSelectChange(e, idx)}
            >
              {output.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {handles.map((handle, idx) => (
        <Handle
          key={idx}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          onConnect={requestHandler}
        />
      ))}
    </div>
  );
};

export default BaseNode;
