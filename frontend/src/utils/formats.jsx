
export const formatNumber = (num, decimals = 0) => {
    return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
}

export const formatOpenedSince = (createdAt) => {
  if (!createdAt) return "Opened date unknown";

  const date = new Date(createdAt);
  const options = { month: "long", year: "numeric" };
  const formatted = date.toLocaleDateString("en-US", options);

  return `Opened since ${formatted}`;
}
