import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";
import DeletedUser from "../../models/deleted_user.model.js";
import mongoose from "mongoose";
import Transaction from "../../models/transaction.model.js";

export const createProfile = async (req, res) => {
  const { fullname, userRole } = req.body;

  if (!req.user?.userId) {
    return res.status(400).json({ error: "User required" });
  }

  if (!fullname) {
    return res.status(400).json({ error: "Fullname required" });
  }

  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.fullname = fullname;
    user.userRole = userRole;
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.status(201).json({
      message: "Profile Created",
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller createProfile ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const editProfile = async (req, res) => {
  const { password, fullname, userRole } = req.body;

  if (!req.user?.userId) {
    return res.status(400).json({ error: "User required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (!fullname) {
    return res.status(400).json({ error: "Fullname required" });
  }

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.fullname = fullname;
    user.userRole = userRole;
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.json({
      message: "Profile updated",
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller editProfile ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const startEmailVerification = async (req, res) => {
  if (!req.user?.userId) {
    return res.status(400).json({ error: "User required" });
  }

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    await user.save();

    //! await sendResetSuccessEmail(user.email);

    res.status(201).json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.log(
      "❌ Error in v1 user.controller startEmailVerification ",
      error
    );
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePlanAutoRenewal = async (req, res) => {
  const { value } = req.body;
  const user = req.user;

  if (!user) return res.status(400).json({ error: "Invalid user" });

  try {
    const new_user = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { [`planDetails.autoRenewal`]: value },
      },
      { new: true }
    );

    const cleanedUser = await cleanUserDetails(new_user);
    return res.json({
      success: true,
      message: `Auto renewal ${value ? "Enabled" : "Disabled"}`,
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller updatePlanAutoRenewal ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const changeEmail = async (req, res) => {
  const { email, password, newEmail } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (!newEmail) {
    return res.status(400).json({ error: "New Email required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.email = newEmail;
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.json({
      message: "Email updated",
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller changeEmail ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Old password required" });
  }

  if (!newPassword) {
    return res.status(400).json({ error: "New password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.password = newPassword;
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.json({
      message: "Password updated successfully",
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller changePassword ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User required" });
  }

  try {
    const user = await User.findOne({ userId }).select("-password");
    res.json(user);
  } catch (error) {
    console.log("❌ Error in v1 user.controller getUser ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deactivateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User required" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isActive = false;
    await user.save();

    const cleanedUser = await cleanUserDetails(user);
    res.status(200).json({
      message: "User deactivated",
      user: cleanedUser,
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller deactivateUser ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const { userId } = req.params;
  const { userDetails, deletedBy, reason } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User required" });
  }

  try {
    // Check if user exist
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // move to deleted users
    const deletedDate = new Date();
    deletedDate.setMinutes(
      deletedDate.getMinutes() - deletedDate.getTimezoneOffset()
    );
    const deletedUser = new DeletedUser({
      userDetails,
      deletedDate,
      deletedBy,
      reason,
    });
    await deletedUser.save();

    await User.deleteOne({ _id: userId });

    res.json({ message: "Account deleted" });
  } catch (error) {
    console.log(
      "❌ Error in v1 user.controller deleteAccount: ",
      error.message
    );
    res.status(500).json({ error: "Server error" });
  }
};

// UTILS

export const updatePlan = async (user, planDetails) => {
  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (!planDetails) {
    return { success: false, error: "Invalid plan" };
  }

  const metaObj = Object.fromEntries(planDetails);

  try {
    const db_user = await User.findById(user);
    db_user.planDetails = metaObj;
    await db_user.save();

    const cleanedUser = await cleanUserDetails(db_user);
    return {
      success: true,
      message: "Plan updated",
      user: cleanedUser,
    };
  } catch (error) {
    console.log("❌ Error in v1 user.controller updatePlan ", error);
    return { success: false, error: "Server error" };
  }
};

export const updateAddons = async (user, addons) => {
  if (!user) return { success: false, error: "Invalid user" };

  const metaObj = Object.fromEntries(addons);

  try {
    const new_user = await User.findByIdAndUpdate(
      user,
      {
        $inc: {
          [`planDetails.addons.stores`]: metaObj?.stores || 0,
          [`planDetails.addons.pages`]: metaObj?.pages || 0,
          [`planDetails.addons.products`]: metaObj?.products || 0,
        },
      },
      { new: true }
    );

    const cleanedUser = await cleanUserDetails(new_user);
    return {
      success: true,
      message: "Addons added to plan",
      user: cleanedUser,
    };
  } catch (error) {
    console.log("❌ Error in v1 user.controller updateAddons ", error);
    return { success: false, error: "Server error" };
  }
};

//?

export const updatePlanUsage = async (userId, field, amount) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("Invalid userId");
  }

  if (!["stores", "pages", "products"].includes(field)) {
    throw new Error("Invalid plan usage field");
  }

  try {
    const planUsage = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { [`planUsage.${field}`]: amount },
      },
      { new: true }
    );

    return planUsage;
  } catch (error) {
    console.log("Error in v1 user.controller updatePlanUsage: ", error);
    return null;
  }
};

export const isPlanActive = (date) => {
  if (!date) return false;
  const now = new Date();
  const target = new Date(date);

  return target > now;
};

export const planLimitCheck = (user, operation) => {
  if (!user) return { success: false, message: "User invalid" };

  if (!isPlanActive(user.planDetails?.renewalDate))
    return { success: false, message: "No active plan" };

  const used = user.planUsage;
  const limits = user.planDetails?.limits;
  const addons = user.planDetails?.addons;

  if (operation == "stores") {
    const limit = (limits?.stores || 0) + (addons?.stores || 0);
    if (used?.stores >= limit && limits.stores != -1)
      return { success: false, message: "Store limit reached" };
  }

  if (operation == "pages") {
    const limit = (limits?.pages || 0) + (addons?.pages || 0);
    if (used?.pages >= limit && limits.pages != -1)
      return { success: false, message: "Page limit reached" };
  }

  if (operation == "products") {
    const limit = (limits?.products || 0) + (addons?.products || 0);
    if (used?.products >= limit && limits.products != -1)
      return { success: false, message: "Product limit reached" };
  }

  return { success: true, message: "" };
};

export const cleanUserDetails = async (user) => {
  user.password = undefined;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;
  user._id = undefined;
  user.__v = undefined;

  user = await user.populate([
    {
      path: "paymentHistory",
      model: Transaction,
    },
    {
      path: "pendingPayments",
      model: Transaction,
    },
  ]);

  return user;
};
