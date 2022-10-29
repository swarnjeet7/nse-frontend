import "./label.css";

interface LabelProps {
  label: string;
  dataTestId?: string;
}
function Label({ label, dataTestId = "label" }: LabelProps) {
  return <label data-test-id={dataTestId}>{label}</label>;
}

export default Label;
