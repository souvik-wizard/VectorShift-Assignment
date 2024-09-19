// toolbar.js

import { DraggableNode } from "./draggableNode";
import { SubmitButton } from "./submit";

export const PipelineToolbar = () => {
  return (
    <div className="bg-[rgb(30,11,74)]/80 absolute w-full z-50 px-12 py-[10px] flex justify-between items-center border-b border-[#301E5A]">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="customNode" label="Custom Node" />
      </div>
      <SubmitButton />
    </div>
  );
};
