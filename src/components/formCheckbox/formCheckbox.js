export default function FormCheckbox({ label, multiple }) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        <span>{label}</span>
      </label>
    </div>
  );
}
