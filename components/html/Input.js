import React, { useState } from "react";
import { Input } from "@nextui-org/react";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
const InputComponent = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const classes = {
    inputWrapper: [
      "h-12",
      "shadow-xl",
      "bg-white",
      "hover:bg-slate-50",
      "focus-within:!bg-white",
    ],
  };

  return (
    <Input
      size={"sm"}
      type={
        props.type === "password"
          ? isVisible
            ? "text"
            : "password"
          : props.type
      }
      label={props.label}
      value={props.value}
      isInvalid={props.errorMessage ? true : false}
      errorMessage={props.errorMessage}
      placeholder={props.placeholder}
      onChange={handleChange}
      classNames={props.bgWhite && classes}
      startContent={props.startContentIcon}
      isClearable
      endContent={
        props.type == "password" && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <AiOutlineEye
                className={`text-2xl ${
                  props.errorMessage ? "text-red-400" : "text-default-400"
                } text-default-400`}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={`text-2xl ${
                  props.errorMessage ? "text-red-400" : "text-default-400"
                } text-default-400`}
              />
            )}
          </button>
        )
      }
    />
  );
};

export default InputComponent;
