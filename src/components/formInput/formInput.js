import _ from "lodash";
import classnames from "classnames";
import Input from "src/atoms/input/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormInput(props) {
  const {
    placeholder,
    value,
    label,
    type,
    onChange,
    isRequired,
    className,
    isDatePicker,
    id,
  } = props;
  const labelKebabCase = _.kebabCase(label);
  const labelCamelCase = _.camelCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;
  const inputDataTestId = `${labelKebabCase}-input`;

  function handleInputChange(value) {
    onChange(value, id);
  }

  return (
    <label className={classes}>
      <span className="form-input__label" data-test-id={labelDataTestId}>
        {label}
      </span>
      {isDatePicker ? (
        <DatePicker
          className="form-input__input"
          selected={new Date(value)}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          id={labelCamelCase}
          className="form-input__input"
          placeholder={placeholder}
          value={value}
          dataTestId={inputDataTestId}
          type={type}
          onChange={handleInputChange}
        />
      )}
    </label>
  );
}

export default FormInput;
