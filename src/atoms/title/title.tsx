import React from "react";
import classnames from "classnames";
import "./title.scss";

interface TitleProps {
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
  justify?: string;
}

export default function Title({
  children,
  divider,
  className,
  justify,
}: TitleProps) {
  const justifyClass = `justify-content-${justify}`;
  const classes = classnames("title", className, {
    "title--divider": divider,
    [justifyClass]: justify,
  });

  return <h2 className={classes}>{children}</h2>;
}
