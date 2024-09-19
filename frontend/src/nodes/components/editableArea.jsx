import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const VariableTextInput = () => {
  const [text, setText] = useState("");
  const parseText = (input) => {
    const regex = /{{(.*?)}}/g;
    const parts = input.split(regex);

    return parts.map((part, index) => {
      // console.log("Part:", part);
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            className="text-blue-500 bg-blue-100 rounded px-1 mx-1"
          >
            {`{ } ${part}`}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mt-1 border border-[#301E5A] rounded-lg p-2">
        <div
          className="absolute inset-0 p-2 whitespace-pre-wrap break-words overflow-hidden pointer-events-none bg-[#440B8A] rounded-lg"
          aria-hidden="true"
        >
          {parseText(text)}
        </div>
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border-none outline-none bg-transparent resize-none break-all whitespace-normal text-transparent text-[#440B8A]"
        />
      </div>
    </div>
  );
};

export default VariableTextInput;
