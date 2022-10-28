import classnames from "classnames";
import Loader from "src/atoms/loader";
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
    isWaiting,
  } = props;
  const classes = classnames("btn", className, {
    "btn--inline": isInline,
    "btn--disable": isDisabled,
    "btn--loading": isWaiting,
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
        {isWaiting && <Loader />}
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
      {isWaiting && <Loader />}
    </button>
  );
}

export default Button;
