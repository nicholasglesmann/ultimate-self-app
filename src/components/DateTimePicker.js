import React, { useState, useEffect, useCallback, useRef } from "react";
import TimePicker from "./TimePicker";

const defaultMinuteStep = 5; // should be a user setting

const DateTimePicker = ({ label, defaultDate, onChangeDateTime }) => {
  const roundedDate = roundDateToNearestMinuteStep(defaultDate);

  const [date, setDate] = useState(() => getDateStringFromDateObject(roundedDate));
  const [hour, setHour] = useState(() => getHourStringFromDateObject(roundedDate));
  const [minute, setMinute] = useState(() => getMinuteStringFromDateObject(roundedDate));
  const [isAm, setIsAm] = useState(() => getIsAmFromDateObject(roundedDate));

  const datePickerRef = useRef();

  const onChangeDateTimeCallback = useCallback(
    (updatedDateTime) => {
      onChangeDateTime(updatedDateTime);
    },
    [onChangeDateTime]
  );

  useEffect(() => {
    const hourNumber = Number(hour);
    let updatedHour;
    if (isAm && hourNumber === 12) {
      // Handle 12 AM
      updatedHour = "00";
    } else if (!isAm && hourNumber === 12) {
      // Handle 12 PM (noon)
      updatedHour = "12";
    } else {
      // Handle all other times
      updatedHour = isAm ? hourNumber : hourNumber + 12;
    }
    const stringHour = ("0" + updatedHour).slice(-2); // Add leading zero if hour is less than 10;
    const updatedDateTime = new Date(`${date}T${stringHour}:${minute}:00`);
    onChangeDateTimeCallback(updatedDateTime);
  }, [date, hour, minute, isAm, onChangeDateTimeCallback]);

  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="date">
          {label}
        </label>
        <input
          className="block w-full rounded-t-md border border-gray-300 bg-gray-50 px-1.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:py-1.5 md:pl-2.5"
          type="date"
          id="date"
          name="date"
          value={date}
          ref={datePickerRef}
          onFocus={() => datePickerRef.current.showPicker()}
          onChange={(event) => setDate(event.target.value)}
        />

        <TimePicker
          defaultHour={hour}
          defaultMinute={minute}
          minuteStep={defaultMinuteStep}
          isAm={isAm}
          onChangeHour={setHour}
          onChangeMinute={setMinute}
          onChangeIsAm={setIsAm}
          name={label}
        />
      </div>
    </>
  );
};

function getDateStringFromDateObject(date) {
  return date.toISOString().slice(0, 10);
}

function getHourStringFromDateObject(date) {
  let hourNumber = date.toISOString().slice(11, 13);
  let hour = hourNumber > 12 ? hourNumber - 12 : hourNumber;
  return ("0" + hour).slice(-2); // Add leading zero if hour is less than 10;
}

function getMinuteStringFromDateObject(date) {
  return date.toISOString().slice(14, 16);
}

function getIsAmFromDateObject(date) {
  return Number(date.toISOString().slice(11, 13)) < 12;
}

function roundDateToNearestMinuteStep(date) {
  const millisecondsToRound = 60000 * defaultMinuteStep;
  return new Date(Math.round(date.getTime() / millisecondsToRound) * millisecondsToRound);
}

export default DateTimePicker;
