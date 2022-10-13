import classnames from "classnames";
import "./title.scss";

export default function Title({ children, divider, className }) {
  const classes = classnames("title", className, {
    "title--divider": divider,
  });

  return <h2 className={classes}>{children}</h2>;
}
