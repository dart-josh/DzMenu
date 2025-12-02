import crypto from "crypto";
import { successfulPayment } from "./payment.controller.js";

// paystack-webhook
export const paystackWebhook = (req, res) => {
  // Validate event came from Paystack
  if (!verifyPaystackSignature(req)) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const event = req.body;

  switch (event.event) {
    case "charge.success":
      // handle successful charge
      successfulPayment(event.data);
      break;

    default:
      break;
  }

  res.send(200);
};

function verifyPaystackSignature(req) {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  return hash === req.headers["x-paystack-signature"];
}
