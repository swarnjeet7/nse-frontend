import "./button.scss";

function Button(props) {
  const { children, type = "submit", onClick } = props;
  return (
    <button type={type} className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
