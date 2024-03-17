import React from "react";

const InputElement = ({
  field,
  index,
  align,
  width,
  adData,
  adDataCreate,
  handleInputChange,
  inputRef,
}) => {
  return (
    <input
      ref={inputRef}
      value={
        index || index === 0
          ? adData?.ad[field][index] ?? adDataCreate[field][index]
          : adData?.ad[field] ?? adDataCreate[field]
      }
      onChange={(event) => {
        handleInputChange(
          field,
          event.target.value,
          index || index === 0 ? index : undefined
        );
      }}
      className={`text-${
        align ?? "left"
      } focus:outline-none border border-slate-100 shadow-lg rounded-lg px-2 w-${
        width ?? "full"
      } ${!width && !align && "mr-20"} py-0 editable-element`}
    />
  );
};

export default InputElement;
