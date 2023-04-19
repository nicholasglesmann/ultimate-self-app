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
