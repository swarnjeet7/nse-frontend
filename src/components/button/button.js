import classnames from "classnames";
import "./button.scss";

function Button(props) {
  const { children, type = "submit", onClick, isInline, className } = props;
  const classes = classnames("btn", className, {
    "btn--inline": isInline,
  });
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
