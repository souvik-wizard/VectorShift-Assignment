import React, { createContext, useState } from "react";
import axios from "axios";

export const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const updateNodes = (newNodes) => {
    setNodes(newNodes);
  };

  const updateEdges = (newEdges) => {
    setEdges(newEdges);
  };

  const submitPipeline = async () => {
    try {
      const pipelineData = {
        nodes: nodes.map((node) => node.id),
        edges: edges.map((edge) => [edge.source, edge.target]),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        pipelineData
      );
      console.log("Pipeline response:", response);
      const { num_nodes, num_edges, is_dag } = response.data;
      const displayAlert = (num_nodes, num_edges, is_dag) => {
        const dagStatus = is_dag ? "Yes" : "No";
        const message = `
          Graph Details:
          - Number of Nodes: ${num_nodes}
          - Number of Edges: ${num_edges}
          - Is Directed Acyclic Graph (DAG): ${dagStatus}
        `;

        window.alert(message);
      };
      displayAlert(num_nodes, num_edges, is_dag);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Failed to submit the pipeline.");
    }
  };

  return (
    <PipelineContext.Provider
      value={{ nodes, edges, updateNodes, updateEdges, submitPipeline }}
    >
      {children}
    </PipelineContext.Provider>
  );
};
