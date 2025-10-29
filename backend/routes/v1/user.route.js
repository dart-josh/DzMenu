import express from "express";
import { changeEmail, changePassword, createProfile, deactivateUser, deleteAccount, editProfile, getUser } from "../../controllers/v1/user.controller.js";

const router = express.Router();

router.get('/createProfile',createProfile );
router.get('/editProfile', editProfile);
router.get('/changeEmail',changeEmail );
router.get('/changePassword',changePassword );
router.get('/getUser', getUser);
router.get('/deactivateUser', deactivateUser);
router.get('/deleteAccount', deleteAccount);

export default router;