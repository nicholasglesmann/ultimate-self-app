const dateTimeFormatStyle = {
  dateStyle: "short", // or "long", "medium", "short"
  timeStyle: "short", // or "long", "medium", "short"
};

const timeFormatStyle = {
  timeStyle: "short", // or "long", "medium", "short"
};

export function getFormattedDateTimeStringFromObject(dateObject) {
  return dateObject.toLocaleString(dateTimeFormatStyle);
}

export function getFormattedDateTimeStringFromString(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString(window.navigator.language, dateTimeFormatStyle);
}

export function getFormattedTimeStringFromString(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString(window.navigator.language, timeFormatStyle);
}

export function getTimezoneCorrectDateFromString(dateString) {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}

export function getNumSecondsBetweenTwoDateStrings(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return getNumSecondsBetweenTwoDateObjects(startDate, endDate);
}

export function getNumSecondsBetweenTwoDateObjects(startDate, endDate) {
  return Math.abs(endDate - startDate) / 1000;
}

export function getFormattedLengthOfTimeFromSeconds(seconds) {
  // calculate (and subtract) whole hours
  const hours = Math.floor(seconds / 3600) % 24;
  seconds -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(seconds / 60) % 60;
  seconds -= minutes * 60;

  const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

  // only include hours label if there are hours
  let label = hours > 0 ? `${hours} hr ` : "";

  return (label += `${minutesPadded} mins`);
}
