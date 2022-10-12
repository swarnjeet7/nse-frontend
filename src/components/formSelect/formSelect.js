import classnames from "classnames";
import _ from "lodash";

function FormSelect(props) {
  const { value, label, onChange, isRequired, className, children, id } = props;
  const labelKebabCase = _.kebabCase(label);

  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  const labelDataTestId = `${labelKebabCase}-label`;
  const selectDataTestId = `${labelKebabCase}-input`;

  function handleSelect(event) {
    onChange(event.target.value, id);
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
