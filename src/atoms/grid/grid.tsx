import classNames from "classnames";
import "./grid.scss";

interface ContainerProps {
  children: React.ReactNode;
  isFluid?: boolean;
  className?: string;
}

export const Container = ({ children, isFluid, className }: ContainerProps) => {
  const classes = classNames("container", className, {
    "container--fluid": isFluid,
  });

  return <div className={classes}>{children}</div>;
};

interface GridProps {
  children: React.ReactNode;
  col?: string;
  className?: string;
}

export const Grid = ({ children, col, className }: GridProps) => {
  const colClass = `grid--col-${col}`;
  const classes = classNames("grid", className, {
    [colClass]: col,
  });

  return <div className={classes}>{children}</div>;
};

interface GridCellProps {
  children: React.ReactNode;
  className?: string;
  col?: string;
}

export const GridCell = ({ className, children, col }: GridCellProps) => {
  const dynamicClass = `grid--${col}of12`;
  const classes = classNames("grid__cell", className, {
    [dynamicClass]: col,
  });

  return <div className={classes}>{children}</div>;
};
