import toast from "react-hot-toast";

export const generateProductId = (prefix = "PRD") => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();

  toast("ID generated", { id: "generate1" });
  return `${prefix}-${timestamp}-${randomPart}`;
};
