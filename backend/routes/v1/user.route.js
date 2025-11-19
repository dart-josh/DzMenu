import express from "express";
import {
  changeEmail,
  changePassword,
  createProfile,
  deactivateUser,
  deleteAccount,
  editProfile,
  getUser,
  startEmailVerification,
} from "../../controllers/v1/user.controller.js";
import { userProtect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createProfile", userProtect, createProfile);
router.post("/editProfile", userProtect, editProfile);
router.post("/startEmailVerification", userProtect, startEmailVerification);
router.post("/changeEmail", changeEmail);
router.post("/changePassword", changePassword);
router.get("/getUser", getUser);
router.post("/deactivateUser", deactivateUser);
router.delete("/deleteAccount", deleteAccount);

export default router;
