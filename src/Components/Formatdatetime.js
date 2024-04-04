import dayjs from "dayjs";

export const formatdatetime = (timeIn24h) => {
  const time = dayjs(timeIn24h);
  const hours = time.hour(); //returns hours
  const minutes = time.minute(); // returns minute
  const ampm = hours >= 12 ? "PM" : "AM"; //to check wheater the hour is before the 12 or after the 12
  const adjustedHours = hours % 12 || 12; // Adjust for hours 0 and 24
  const date = dayjs().isSame(timeIn24h, "day"); //returns wheater the created date and today date is equal
  var created = date ? "Today" : dayjs(timeIn24h).format("DD-MM-YYYY");
  const daybefore = dayjs(timeIn24h).date() === dayjs().date() - 1;
  if (daybefore) {
    created = "Yesterday";
  }
  return `${created} ${adjustedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
};
