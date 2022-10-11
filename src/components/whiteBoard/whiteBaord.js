import "./whiteBoard.scss";

function WhiteBoard({ children, ...restProps }) {
  return (
    <div className="board" {...restProps}>
      {children}
    </div>
  );
}

export default WhiteBoard;
