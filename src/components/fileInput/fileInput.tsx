import _ from "lodash";
import classnames from "classnames";
import React from "react";

interface FormInputProps {
  placeholder?: string;
  label: string;
  onChange: (file: React.SyntheticEvent, id: string) => void;
  isRequired?: boolean;
  className?: string;
  id: string;
  children: React.ReactElement;
}

const FormInput = React.forwardRef(
  (
    {
      placeholder,
      label,
      onChange,
      isRequired,
      className,
      id,
      children,
    }: FormInputProps,
    ref: any
  ) => {
    const labelKebabCase = _.kebabCase(label);
    const classes = classnames("form__file-input", className, {
      "form-input--required": isRequired,
    });
    const labelDataTestId = `${labelKebabCase}-label`;

    function handleInputChange(file: React.SyntheticEvent) {
      onChange(file, id);
    }

    return (
      <label className={classes}>
        <span className="form-input__label" data-test-id={labelDataTestId}>
          {label}
          {children}
        </span>
        <input
          ref={ref}
          type="file"
          name="file"
          onChange={handleInputChange}
          placeholder={placeholder}
          id={id}
        />
      </label>
    );
  }
);

export default FormInput;
