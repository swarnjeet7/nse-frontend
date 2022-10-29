import classNames from "classnames";
import React from "react";

interface InputProps {
  placeholder?: string;
  value: string;
  dataTestId?: string;
  id: string;
  type: string;
  className?: string;
  onChange: (value: string) => void;
}

function Input({
  placeholder = "",
  value = "",
  dataTestId = "input",
  id = "",
  type = "text",
  onChange,
  className,
}: InputProps) {
  const classes = classNames("input", className);

  function handleInputChange(event: React.SyntheticEvent) {
    onChange((event.target as HTMLInputElement).value);
  }

  return (
    <input
      className={classes}
      placeholder={placeholder}
      value={value}
      data-test-id={dataTestId}
      id={id}
      type={type}
      onChange={handleInputChange}
    />
  );
}

export default Input;
