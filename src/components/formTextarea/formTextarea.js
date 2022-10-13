import _ from "lodash";
import classnames from "classnames";

function FormTextarea(props) {
  const {
    placeholder,
    value,
    label,
    onChange,
    isRequired,
    className,
    cols = "30",
    rows = "7",
    id,
  } = props;
  const labelKebabCase = _.kebabCase(label);
  const labelCamelCase = _.camelCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;

  function handleInputChange(value) {
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
        value={value}
        onChange={(event) => handleInputChange(event.target.value)}
      ></textarea>
    </label>
  );
}

export default FormTextarea;
