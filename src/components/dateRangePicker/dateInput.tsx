import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  selected: Date;
  label: string;
  onChange: (date: Date, id: string) => void;
  isRequired?: boolean;
  className?: string;
  id: string;
  startDate: Date;
  endDate: Date | null;
  selectsStart: boolean;
  selectsEnd: boolean;
}

function DateInput({
  selected = new Date(),
  label = "Select Date",
  onChange,
  isRequired = false,
  className = "",
  id = "",
  startDate,
  endDate = null,
  selectsStart = false,
  selectsEnd = false,
}: DateInputProps) {
  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  function handleInputChange(date: Date) {
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
