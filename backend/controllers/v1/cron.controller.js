import axios from "axios";
import Transaction from "../../models/transaction.model.js";

export const checkPayments = async (req, res) => {
  console.log("Running daily job at 10 PM");

  if (req.query.key !== process.env.CRON_SECRET) {
    console.log("CRON RUN Unauthorized");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const pendingPayments = await Transaction.find({
    status: "pending",
    createdAt: { $lte: tenMinutesAgo },
  });

  for (const pay of pendingPayments) {
    const verify = await axios.get(
      `https://api.paystack.co/transaction/verify/${pay.reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` },
      }
    );

    const data = verify.data.data;

    if (data.status !== "success") {
      pay.status = "failed";
      await pay.save();
    }
  }

  console.log("CRON RUN FOR pendingPayments: ", pendingPayments.length);

  return res.status(200).json({ checked: pendingPayments.length });
};
