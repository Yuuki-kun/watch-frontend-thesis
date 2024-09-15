import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePickerRange = ({ handleSelectedRangeDate }) => {
  // const [startDate, setStartDate] = useState(
  //   new Date(new Date()).setDate(new Date().getDate() - 7)
  // );
  // const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  });

  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      handleSelectedRangeDate(date, endDate);
      //   setXStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      handleSelectedRangeDate(startDate, date);
      //   setXEndDate(date);
    }
  };

  useEffect(() => {
    handleSelectedRangeDate(startDate, endDate);
  }, []);

  //   useEffect(() => {
  //     setStartDate(new Date(new Date()).setDate(new Date().getDate() - 7));
  //     setEndDate(new Date());
  //   }, []);

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  return (
    <div>
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

export default MyDatePickerRange;
