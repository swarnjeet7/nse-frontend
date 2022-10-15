import classnames from "classnames";
import "./title.scss";

export default function Title({ children, divider, className, justify }) {
  const justifyClass = `justify-content-${justify}`;
  const classes = classnames("title", className, {
    "title--divider": divider,
    [justifyClass]: justify,
  });

  return <h2 className={classes}>{children}</h2>;
}
