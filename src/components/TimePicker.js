import AmPmToggleSwitch from "./AmPmToggleSwitch";

const TimePicker = ({
  defaultHour,
  defaultMinute,
  minuteStep,
  isAm,
  onChangeHour,
  onChangeMinute,
  onChangeIsAm,
  name,
}) => {
  const minuteIntervals = setupMinuteIntervals(minuteStep);
  const hourIntervals = setupHourIntervals();

  return (
    <div className="flex">
      <select
        id="hour"
        name="hour"
        value={defaultHour}
        onChange={(event) => onChangeHour(event.target.value)}
        className="inline-block rounded-l-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {hourIntervals.map((hour) => {
          return (
            <option key={hour} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      <select
        id="minute"
        name="minute"
        value={defaultMinute}
        onChange={(event) => onChangeMinute(event.target.value)}
        className="inline-block border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {minuteIntervals.map((minute) => {
          return (
            <option key={minute} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
      <AmPmToggleSwitch isAm={isAm} onChangeIsAm={onChangeIsAm} name={name} />
    </div>
  );
};

function setupMinuteIntervals(userMinuteStep) {
  let minuteStep = userMinuteStep || 1;

  const minuteIntervals = [];
  for (let minute = 0; minute <= 55; minute += minuteStep) {
    const formattedMinute = ("0" + minute).slice(-2); // Add leading zero if minute is less than 10
    minuteIntervals.push(formattedMinute);
  }
  return minuteIntervals;
}

function setupHourIntervals() {
  const hourIntervals = [];
  for (let hour = 1; hour <= 12; hour++) {
    const formattedHour = ("0" + hour).slice(-2); // Add leading zero if hour is less than 10
    hourIntervals.push(formattedHour);
  }
  return hourIntervals;
}

export default TimePicker;
