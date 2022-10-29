import _ from "lodash";
import classnames from "classnames";

interface FormTextareaProps {
  id: string;
  value: string;
  label: string;
  onChange: (value: string, id: string) => void;
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
}

function FormTextarea({
  placeholder,
  value,
  label,
  onChange,
  isRequired,
  className,
  cols = 30,
  rows = 7,
  id,
}: FormTextareaProps) {
  const labelKebabCase: string = _.kebabCase(label);
  const labelCamelCase: string = _.camelCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;

  function handleInputChange(value: string) {
    onChange(value, id);
  }

  return (
    <label className={classes}>
      <span className="form-input__label" data-test-id={labelDataTestId}>
        {label}
      </span>
      <textarea
        id={labelCamelCase}
        name="labelCamelCase"
        className="form-input__input"
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        value={String(value)}
        onChange={(event) => handleInputChange(event.target.value)}
      ></textarea>
    </label>
  );
}

export default FormTextarea;
