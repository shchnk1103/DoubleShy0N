export const formattedToDate = (date: Date) => {
  const dateString = new Date(date).toLocaleString().split(",")[0];

  return dateString;
};
