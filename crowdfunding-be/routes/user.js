import express from 'express'
import { UserController } from "../controllers/index.js";

const router = express.Router();

router.post('/register', UserController.registerUser);
router.get("/:id/verify/:tokenLinkVerifyEmail", UserController.verifyEmailRegister);
router.post('/login', UserController.loginUser);
router.post('/forgot-password', UserController.forgotPassword);
router.get('/forgot-password/:id/verify-link/:tokenVerifyLinkForgotPassword', UserController.verifyLinkForgotPassword);
router.patch('/forgot-password/update-new-password', UserController.updateNewPassword);

export default router