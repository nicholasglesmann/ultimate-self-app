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
  const now = Date.now() - new Date().getTimezoneOffset() * 60000;
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}
