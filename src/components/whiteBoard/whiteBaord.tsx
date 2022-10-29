import React from "react";
import classNames from "classnames";
import "./whiteBoard.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

function WhiteBoard({ children, className, fullHeight }: Props) {
  const classes = classNames("board", className, {
    "board--full-height": fullHeight,
  });
  return <div className={classes}>{children}</div>;
}

export default WhiteBoard;
