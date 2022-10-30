import React from "react";
import classNames from "classnames";
import "./whiteBoard.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  isSideboard?: boolean;
}

function WhiteBoard({ children, className, fullHeight, isSideboard }: Props) {
  const classes = classNames("board", className, {
    "board--full-height": fullHeight,
    "board--side-board": isSideboard,
  });
  return <div className={classes}>{children}</div>;
}

export default WhiteBoard;
