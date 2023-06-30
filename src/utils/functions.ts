export const formattedToDate = (date: Date) => {
  const dateString = new Date(date).toLocaleString().split(",")[0];

  return dateString;
};

export const setProperty = (property: string, value: string | null) => {
  document.documentElement.style.setProperty(property, value);
};

export const removeProperty = (property: string) => {
  document.documentElement.style.removeProperty(property);
};

export const clamp = (value: number, a: number, b: number) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(value, min), max);
};
