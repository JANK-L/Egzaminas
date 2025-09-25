import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ startDate, endDate, setStartDate, setEndDate, id }) => {
  return (
    <div className="dateSelector">
      <h2>Select Rental Period</h2>

      <label>From:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Start date"
      />

      <label>To:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        placeholderText="End date"
      />
    </div>
  );
};

export default DateSelector;
