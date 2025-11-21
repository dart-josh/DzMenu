import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";
import DeletedUser from "../../models/deleted_user.model.js";

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

    res.status(201).json({
      message: "Profile Created",
      user: cleanUserDetails(user._doc),
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

    res.json({
      message: "Profile updated",
      user: cleanUserDetails(user._doc),
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

export const updatePlan = async (req, res) => {
  const { planDetails } = req.body;

  if (!req.user?.userId) {
    return res.status(400).json({ error: "User not found" });
  }

  if (!planDetails) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.planDetails = planDetails;
    await user.save();

    res.json({
      message: "Plan updated",
      user: cleanUserDetails(user._doc),
    });
  } catch (error) {
    console.log("❌ Error in v1 user.controller updatePlan ", error);
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

    res.json({
      message: "Email updated",
      user: {
        ...user._doc,
        password: undefined,
      },
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

    res.json({
      message: "Password updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
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

    res.status(200).json({
      message: "User deactivated",
      user: {
        ...user._doc,
        password: undefined,
      },
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

export const cleanUserDetails = (user) => {
  user.password = undefined;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;
  user._id = undefined;
  user.__v = undefined;

  return user;
};
