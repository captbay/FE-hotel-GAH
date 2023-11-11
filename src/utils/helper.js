export function getRoomImage(image) {
  if (image.toLowerCase() === "superior") return "/images/superior.jpg";

  if (image.toLowerCase() === "double deluxe")
    return "/images/double-deluxe.jpg";

  if (image.toLowerCase() === "executive deluxe")
    return "/images/executive-deluxe.jpg";

  if (image.toLowerCase() === "junior suite") return "/images/junior-suite.jpg";
}

// date format to yyyy-mm-dd
export const dateFormat = (date) => {
  if (date == null) {
    return null;
  }

  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return [year, month, day].join("-");
};

export const convertDateToStringHuman = (originalDate) => {
  if (!originalDate || typeof originalDate !== "string") {
    // Handle the case where originalDate is undefined or not a string
    return "Invalid Date";
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = originalDate.split("-");
  const year = dateParts[0];
  const monthIndex = parseInt(dateParts[1], 10) - 1; // Months are zero-based
  const day = dateParts[2];

  const formatted = `${parseInt(day, 10)}-${months[monthIndex]}-${year}`;
  return formatted;
};
