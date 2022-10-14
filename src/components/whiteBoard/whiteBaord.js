import classNames from "classnames";
import "./whiteBoard.scss";

function WhiteBoard({ children, className, fullHeight, ...restProps }) {
  const classes = classNames("board", className, {
    "board--full-height": fullHeight,
  });
  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
}

export default WhiteBoard;
