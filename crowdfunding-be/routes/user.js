import express from 'express'
import { UserController } from "../controllers/index.js";

const router = express.Router();

router.post('/register', UserController.registerUser);
router.get("/:id/verify/:tokenLinkVerifyEmail", UserController.verifyEmailRegister);
router.post('/login', UserController.loginUser);
export default router