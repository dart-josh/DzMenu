import { dollarSign } from "./globalVariables";

export const formatNumber = (num, showSymbol = false, decimals = 0) => {
  if (!num) return "";
  const val = Number(num).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (showSymbol) return `${dollarSign}${val}`;
  else return val;
};

// export const formatAmount = (num) => {
//   if (num < )
// }

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
  if (!value) return "";

  if (value.split(" ").length > 1) {
    return `${value.split(" ")[0].substring(0, 1)}${value
      .split(" ")[1]
      .substring(0, 1)}`;
  } else {
    return value.substring(0, 2).toUpperCase();
  }
};

export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
