import express from "express";
import {
  deleteUser,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  sendVerificationMail,
  updateProfile,
  verifyUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/verify/:id").post(verifyUser);
router.route("/send-verification-mail").post(sendVerificationMail);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);
router.route("/delete").delete(isAuthenticated, deleteUser);

export default router;
