import classNames from "classnames";

function Input(props) {
  const {
    placeholder = "",
    value = "",
    dataTestId = "input",
    id = "",
    type = "text",
    onChange,
  } = props;

  const classes = classNames("input", props.className);

  function handleInputChange(event) {
    onChange(event.target.value);
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
