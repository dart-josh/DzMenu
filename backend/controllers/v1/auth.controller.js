import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { generate_userId } from "../../utils/serverUtils.js";
import { redis } from "../../lib/redis.js";
import { cleanUserDetails } from "./user.controller.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid user" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password too short" });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // generate userId
    const userId = generate_userId();

    const user = new User({
      email,
      userId,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    // authentication
    const { accessToken, refreshToken } = generateTokens(user._id);
    // await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    //! await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "Account created",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller signup: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //! await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      message: "Email verified",
      user: cleanUserDetails(user._doc),
    });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller verifyEmail ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // authentication
    const { accessToken, refreshToken } = generateTokens(user._id);
    // await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "User Authenticated",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller login ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const user = cleanUserDetails(req.user._doc);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log("❌ Error in v1 auth.controller getAuthUser ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    //! await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller forgotPassword ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //! await sendResetSuccessEmail(user.email);

    res.json({ message: "Password reset" });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller resetPassword ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      // await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "User logged out" });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller logout: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.user.userId;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ message: "Token refreshed" });
  } catch (error) {
    console.log("❌ Error in v1 auth.controller refreshToken: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

//?

//? UTILS

// generate jwt tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// store refresh token in redis
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); //7d
};

// set cookies
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
