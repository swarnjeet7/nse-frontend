import classNames from "classnames";
import "./grid.scss";

export const Container = (props) => {
  const { children, isFluid } = props;
  const classes = classNames("container", props.className, {
    "container--fluid": isFluid,
  });

  return <div className={classes}>{children}</div>;
};

export const Grid = (props) => {
  const { children, col } = props;
  const colClass = `grid--col-${col}`;

  const classes = classNames("grid", props.className, {
    [colClass]: col,
  });

  return <div className={classes}>{children}</div>;
};

export const GridCell = ({ className, children, col }) => {
  const dynamicClass = `grid--${col}of12`;
  const classes = classNames("grid__cell", className, {
    [dynamicClass]: col,
  });

  return <div className={classes}>{children}</div>;
};
