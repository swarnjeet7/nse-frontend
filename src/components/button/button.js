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
    isLink,
    href,
  } = props;
  const classes = classnames("btn", className, {
    "btn--inline": isInline,
    "btn--disable": isDisabled,
  });
  if (isLink) {
    return (
      <a
        type={type}
        className={classes}
        onClick={onClick}
        disabled={isDisabled}
        href={href}
      >
        {children}
      </a>
    );
  }
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
