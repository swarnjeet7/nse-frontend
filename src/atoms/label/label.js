import "./label.css";

function Label(props) {
  const { label, dataTestId = "label" } = props;
  return <label data-test-id={dataTestId}>{label}</label>;
}

export default Label;
