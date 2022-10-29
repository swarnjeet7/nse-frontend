import classnames from "classnames";
import _ from "lodash";
import React from "react";

interface FormSelectProps {
  value?: string;
  label: string;
  onChange: (value: string, id: string) => void;
  isRequired?: boolean;
  className?: string;
  children: React.ReactNode;
  id: string;
}

function FormSelect({
  value,
  label,
  onChange,
  isRequired,
  className,
  children,
  id,
}: FormSelectProps) {
  const labelKebabCase = _.kebabCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;
  const selectDataTestId = `${labelKebabCase}-input`;

  function handleSelect(event: React.SyntheticEvent) {
    onChange((event.target as HTMLInputElement).value, id);
  }

  return (
    <label className={classes}>
      <span className="form-input__label" data-test-id={labelDataTestId}>
        {label}
      </span>
      <select
        id={id}
        data-test-id={selectDataTestId}
        onChange={handleSelect}
        value={value}
        className="form-input__select"
      >
        {children}
      </select>
    </label>
  );
}

export default FormSelect;
