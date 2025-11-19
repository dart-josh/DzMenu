export const formatNumber = (num, decimals = 0) => {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatOpenedSince = (createdAt) => {
  if (!createdAt) return "Opened date unknown";

  const date = new Date(createdAt);
  const options = { month: "long", year: "numeric" };
  const formatted = date.toLocaleDateString("en-US", options);

  return `Opened since ${formatted}`;
};

export const formatReadableDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d)) return "Invalid date";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString("en-US", options);
};

export const getInitials = (value) => {
  if (!value) return '';

  if (value.split(' ').length > 1) {
    return `${value.split(' ')[0].substring(0,1)}${value.split(' ')[1].substring(0,1)}`
  } else {
    return value.substring(0,2).toUpperCase();
  }
}
