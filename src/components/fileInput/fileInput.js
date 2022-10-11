import _ from "lodash";
import classnames from "classnames";

function FormInput(props) {
  const { placeholder, label, onChange, isRequired, className, id } = props;
  const labelKebabCase = _.kebabCase(label);
  // const labelCamelCase = _.camelCase(label);
  const classes = classnames("form__file-input", className, {
    "form-input--required": isRequired,
  });
  const labelDataTestId = `${labelKebabCase}-label`;
  // const inputDataTestId = `${labelKebabCase}-input`;

  function handleInputChange(file) {
    onChange(file, id);
  }

  return (
    <label className={classes}>
      <span className="form-input__label" data-test-id={labelDataTestId}>
        {label}
      </span>
      <input
        type="file"
        name="file"
        onChange={handleInputChange}
        placeholder={placeholder}
        id={id}
      />
      {/* <label className="file-label" htmlFor={id}>
        choose a file
      </label> */}
    </label>
  );
}

export default FormInput;
