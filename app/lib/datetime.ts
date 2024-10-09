// Format Date to: Tuesday, 12 March 2024
export function getDateFormattedLong(dateNow?: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "long",
    month: "long",
  };

  const date = () => {
    if (dateNow) {
      return new Date(dateNow);
    } else {
      return new Date();
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    date()
  );

  const [weekday, monthDay] = formattedDate.split(",");
  const monthDaySplitter = monthDay.split(" ");
  const month = monthDaySplitter[1];
  const day = monthDaySplitter[2];
  return `${weekday}, ${day} ${month}`;
}

// Format Date to: Tuesday, 12 March 2024
export function tes(dateNow?: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "long",
    month: "long",
  };

  const date = () => {
    if (dateNow) {
      return new Date(dateNow);
    } else {
      return new Date();
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    date()
  );

  const [weekday, monthDay] = formattedDate.split(",");
  const monthDaySplitter = monthDay.split(" ");
  const month = monthDaySplitter[1];
  const day = monthDaySplitter[2];
  console.log(formattedDate);
  return `${weekday}, ${day} ${month}`;
}
// Format Date to: 2024-03-14
export function formatDateShort(dateString: string) {
  return new Date(dateString).toISOString().substring(0, 10);
}

export const isTodayDate = (dateToCompare: string) => {
  if (
    new Date(dateToCompare).toISOString().substring(0, 10) ===
    new Date().toISOString().substring(0, 10)
  ) {
    return true;
  }
};
