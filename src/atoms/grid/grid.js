import classnames from "classnames";
import "./grid.scss";

export const Container = (props) => {
  const { children, isFluid } = props;
  const classes = classnames("container", props.className, {
    "container--fluid": isFluid,
  });

  return <div className={classes}>{children}</div>;
};

export const Grid = (props) => {
  const { children, col } = props;
  const colClass = `grid--col-${col}`;

  const classes = classnames("grid", props.className, {
    [colClass]: col,
  });

  return <div className={classes}>{children}</div>;
};

export const GridCell = (props) => {
  const { children } = props;
  const classes = classnames("grid__cell", props.className);

  return <div className={classes}>{children}</div>;
};
