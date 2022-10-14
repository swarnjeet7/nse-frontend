import classNames from "classnames";

export default function FormCheckbox({
  label,
  className,
  isChecked,
  onChange,
  item = null,
}) {
  const classes = classNames("form-checkbox", className, {
    "form-checkbox--checked": isChecked,
  });
  function handleClick() {
    if (item) {
      return onChange(item);
    }
    onChange(!isChecked);
  }

  return (
    <div>
      <label className={classes}>
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={handleClick}
        />
        <span className="checkbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#5e2327"
          >
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
}
