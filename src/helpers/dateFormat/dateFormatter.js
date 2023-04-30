export function dateFormatter(date) {
  const dateFormat = new Intl.DateTimeFormat("en-UK", {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return dateFormat.format(new Date(date));
}

export function dateFormatterMain() {
  const dateFormat = new Intl.DateTimeFormat("en-UK", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
  return dateFormat.format(new Date());
}
