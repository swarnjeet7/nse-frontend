import classnames from "classnames";
import Loader from "src/atoms/loader";
import "./button.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.ReactEventHandler;
  isInline?: boolean;
  className?: string;
  isDisabled?: boolean;
  isLink?: boolean;
  href?: string;
  isWaiting?: boolean;
}

function Button({
  children,
  type = "submit",
  onClick,
  isInline,
  className,
  isDisabled,
  isLink,
  href,
  isWaiting,
}: ButtonProps) {
  const classes = classnames("btn", className, {
    "btn--inline": isInline,
    "btn--disable": isDisabled,
    "btn--loading": isWaiting,
  });

  if (isLink) {
    return (
      <a type={type} className={classes} onClick={onClick} href={href}>
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
