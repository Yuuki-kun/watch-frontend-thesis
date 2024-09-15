import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

const FilterUserDatePicker = ({ handleFilterByDate }) => {
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      if (startDate === date) {
      }
      handleFilterByDate(date, endDate);
      //   setXStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);

    if (startDate && date) {
      if (startDate === date) {
      }
      handleFilterByDate(startDate, date);
      //   setXEndDate(date);
    }
  };

  return (
    <div
      style={{
        zIndex: 1000001,
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        <label style={{ marginRight: "0.5rem" }}>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
};

export default FilterUserDatePicker;
