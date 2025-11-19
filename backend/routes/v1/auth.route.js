import express from "express";
import { signup, verifyEmail, login, getAuthUser, forgotPassword, resetPassword, logout, refreshToken } from "../../controllers/v1/auth.controller.js";
import { userProtect } from "../../middleware/auth.middleware.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);
router.post('/login', login);
router.get('/getAuthUser', userProtect, getAuthUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.post('/logout', logout);
router.post('/refreshToken', refreshToken)

export default router;
