const dateTimeFormatStyle = {
  dateStyle: "short", // or "long", "medium", "short"
  timeStyle: "short", // or "long", "medium", "short"
};

const timeFormatStyle = {
  timeStyle: "short", // or "long", "medium", "short"
};

export function getFormattedDateTimeStringFromObject(dateObject) {
  const now = new Date(Date.now());
  dateObject.setMinutes(dateObject.getMinutes() - now.getTimezoneOffset());

  return dateObject.toLocaleString(dateTimeFormatStyle);
}

export function getFormattedDateTimeStringFromString(dateString) {
  const now = new Date(Date.now());
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - now.getTimezoneOffset());

  return date.toLocaleString(window.navigator.language, dateTimeFormatStyle);
}

export function getFormattedTimeStringFromString(dateString) {
  const now = new Date(Date.now());
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - now.getTimezoneOffset());

  return date.toLocaleTimeString(window.navigator.language, timeFormatStyle);
}
