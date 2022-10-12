import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker(props) {
  const { onChange, isRequired, className, startDate, endDate } = props;
  const classes = classnames("form-input", className, {
    "form-input--required": isRequired,
  });

  function handleInputChange(date, id) {
    console.log(date, id);
    onChange(date, id);
  }

  const _endDate = endDate === null ? null : new Date(endDate);

  return (
    <>
      <label className={classes}>
        <span className="form-input__label">Select Start Date</span>
        <DatePicker
          selectsStart
          className="form-input__input"
          selected={new Date(startDate)}
          onChange={(date) => handleInputChange(date, "from")}
          startDate={new Date(startDate)}
          endDate={_endDate}
        />
      </label>

      <label className={classes}>
        <span className="form-input__label">Select End Date</span>
        <DatePicker
          selectsEnd
          className="form-input__input"
          selected={_endDate === null ? new Date(startDate) : _endDate}
          onChange={(date) => handleInputChange(date, "to")}
          minDate={new Date(startDate)}
          startDate={new Date(startDate)}
          endDate={_endDate}
        />
      </label>
    </>
  );
}

export default DateRangePicker;
