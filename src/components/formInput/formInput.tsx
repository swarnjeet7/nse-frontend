import _ from "lodash";
import classnames from "classnames";
import Input from "src/atoms/input/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormInputProps {
  placeholder?: string;
  value: string | Date;
  label: string;
  type?: string;
  onChange: (value: Date | string, id: string) => void;
  isRequired?: boolean;
  className?: string;
  isDatePicker?: boolean;
  id: string;
}

function FormInput({
  placeholder,
  value,
  label,
  type = "text",
  onChange,
  isRequired,
  className,
  isDatePicker,
  id,
}: FormInputProps) {
  const labelKebabCase: string = _.kebabCase(label);
  const labelCamelCase: string = _.camelCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;
  const inputDataTestId = `${labelKebabCase}-input`;

  function handleInputChange(value: string) {
    onChange(value, id);
  }

  function handleDateChange(value: Date) {
    onChange(value, id);
  }

  return (
    <label className={classes}>
      {label && (
        <span className="form-input__label" data-test-id={labelDataTestId}>
          {label}
        </span>
      )}
      {isDatePicker ? (
        <DatePicker
          className="form-input__input"
          selected={new Date(value)}
          onChange={handleDateChange}
        />
      ) : (
        <Input
          id={labelCamelCase}
          className="form-input__input"
          placeholder={placeholder}
          value={String(value)}
          dataTestId={inputDataTestId}
          type={type}
          onChange={handleInputChange}
        />
      )}
    </label>
  );
}

export default FormInput;
