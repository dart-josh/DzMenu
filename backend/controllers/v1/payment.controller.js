import axios from "axios";

import Transaction from "../../models/transaction.model.js";
import {
  cleanUserDetails,
  updateAddons,
  updatePlan,
} from "./user.controller.js";

export const createPayment = async (req, res) => {
  const { type, amount, metadata, transactionType } = req.body;
  const user = req.user;

  if (!user) return res.status(400).json({ error: "User invalid" });

  try {
    const reference = `psk_${Date.now()}_${Math.floor(Math.random() * 9999)}`;

    const transaction = await Transaction.create({
      user,
      email: user.email,
      type,
      reference,
      amount,
      metadata,
      transactionType,
      status: "pending",
    });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount: amount * 100, // convert to kobo
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response?.status)
      return res.status(400).json({ error: "Failed to initialize payment" });

    const access_code = response.data.data.access_code;
    transaction.access_code = access_code;
    await transaction.save();

    // adding to pending
    user.pendingPayments = [...user.pendingPayments, transaction._id];
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.json({
      message: "Payment initialized",
      reference,
      access_code,
      authorization_url: response.data.data.authorization_url,
      user: cleanedUser,
    });
  } catch (err) {
    console.log(err.response?.data || err);
    res.status(500).json({ error: "Payment failed to initialize" });
  }
};

export const getPaymentStatus = async (req, res) => {
  const tx = await Transaction.findOne({
    reference: req.params.reference,
    user: req.user,
  });

  if (!tx) return res.status(404).json({ error: "not_found" });

  return res.json({ status: tx.status }); // pending | paid | failed
};

export const completePayment = async (req, res) => {
  const tx = await Transaction.findOne({
    reference: req.params.reference,
    user: req.user,
  });

  const user = req.user;

  if (!tx) return res.status(404).json({ error: "not_found" });

  tx.status = "completed";
  await tx.save();

  user.paymentHistory = [...user.paymentHistory, tx._id];

  user.pendingPayments = user.pendingPayments.filter(
    (p) => p.toString() !== tx._id.toString()
  );
  await user.save();

  const cleanedUser = await cleanUserDetails(user);
  return res.json({
    status: "complete",
    user: cleanedUser,
  });
};

export const verifyPayment = async (req, res) => {
  const ref = req.params.reference;

  const user = req.user;
  if (!user) return res.status(400).json({ error: "User invalid" });

  const verify = await axios.get(
    `https://api.paystack.co/transaction/verify/${ref}`,
    {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` },
    }
  );

  const data = verify.data.data;

  if (data.status !== "success") {
    await Transaction.updateOne({ reference: ref, user }, { status: "failed" });
  } else {
    await Transaction.updateOne(
      { reference: ref, user },
      { status: "success" }
    );
  }

  res.json({ status: data.status });
};

//? UTILS
export const successfulPayment = async (data) => {
  if (!data) {
    console.log("Invalid payment data: from webhook");
    return null;
  }

  const { reference } = data;
  const email = data.customer.email;

  try {
    const transaction = await Transaction.findOne({ reference, email });

    if (!transaction) {
      return null;
    }

    const user = transaction.user;
    const metadata = transaction.metadata;

    if (transaction.type == "Subscription") {
      const res = await updatePlan(user, metadata);

      if (!res.success) return null;
    }

    if (transaction.type == "Addons") {
      const res = await updateAddons(user, metadata);
      if (!res.success) return null;
    }

    transaction.status = "paid";
    await transaction.save();
    return true;
  } catch (error) {
    console.log("Successful payment validation failed: from webhook");
    return null;
  }
};
