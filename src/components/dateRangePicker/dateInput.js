import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput(props) {
  const {
    selected = new Date(),
    label = "Select Date",
    onChange = () => {},
    isRequired = false,
    className = "",
    id = "",
    startDate = null,
    endDate = null,
    selectsStart = false,
    selectsEnd = false,
  } = props;
  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  function handleInputChange(date) {
    console.log(date, id);
    onChange(date, id);
  }

  return (
    <label className={classes}>
      <span className="form-input__label">{label}</span>
      <DatePicker
        className="form-input__input"
        selected={new Date(selected)}
        onChange={handleInputChange}
        selectsStart={selectsStart}
        minDate={new Date(startDate)}
        startDate={new Date(startDate)}
        endDate={endDate}
        selectsEnd={selectsEnd}
      />
    </label>
  );
}

export default DateInput;
