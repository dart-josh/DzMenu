
export const paystack_ipBlocker = async (req, res, next) => {
  const allowedIps = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

  const ip =
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  if (!allowedIps.includes(ip)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export const vercel_ipBlocker = async (req, res, next) => {
  const allowedIps = ["76.76.21.0/24"];

  const ip =
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  if (!allowedIps.includes(ip)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
