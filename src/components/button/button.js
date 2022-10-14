import classnames from "classnames";
import "./button.scss";

function Button(props) {
  const {
    children,
    type = "submit",
    onClick,
    isInline,
    className,
    isDisabled,
  } = props;
  const classes = classnames("btn", className, {
    "btn--inline": isInline,
    "btn--disable": isDisabled,
  });
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
