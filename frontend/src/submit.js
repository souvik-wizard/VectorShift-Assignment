import React, { useContext } from "react";
import { PipelineContext } from "./context/PipelineContext";

export const SubmitButton = () => {
  const { submitPipeline } = useContext(PipelineContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPipeline();
  };

  return (
    <div className="flex justify-center items-center bg-[#440B8A] text-white p-2 rounded-lg ">
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
