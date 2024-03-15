import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const SelectComponent = (props) => {
  const handleChange = (value) => {
    props.onChange(value);
  };

  return (
    <Autocomplete
      label={props.label}
      className="w-full"
      size={"sm"}
      onInputChange={handleChange}
      onBlur={props.onBlur}
      isInvalid={props.errorMessage ? true : false}
      placeholder={props.placeholder}
      inputProps={{
        classNames: {
          inputWrapper: props.bgWhite && [
            "bg-white",
            "h-12",
            "shadow-lg",
            "focus-within:!bg-white",
          ],
        },
      }}
      defaultSelectedKey={props.value}
      startContent={props.startContentIcon}
      errorMessage={props.errorMessage}
    >
      {props.items?.map((item) => (
        <AutocompleteItem key={item.label ?? item.value}>
          {item.label ?? item.value}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SelectComponent;
