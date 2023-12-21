import express from 'express'
import { UserController } from "../controllers/index.js";
import checkToken from '../middlewares/auth.js'
const router = express.Router();

router.post('/register', UserController.registerUser);
router.get("/:id/verify/:tokenLinkVerifyEmail", UserController.verifyEmailRegister);
router.post('/login', UserController.loginUser);
router.get('/getInfoUser/:id', UserController.getInfoUser);
router.get('/getUserByEmail/:email', UserController.getUserByEmail);
router.get('/getInfoCurrentUser',checkToken, UserController.getInfoCurrentUser);

router.patch('/editUser/:id', UserController.editUser);
router.get('/getLinkVerifyUser',checkToken, UserController.getLinkVerifyUser);
router.get('/checkLinkVerifyUser/:tokenLink', UserController.checkLinkVerifyUser);
router.post('/refreshToken',UserController.refreshToken)
router.post('/forgot-password', UserController.forgotPassword);
router.get('/forgot-password/:id/verify-link/:tokenVerifyLinkForgotPassword', UserController.verifyLinkForgotPassword);
router.patch('/forgot-password/update-new-password', UserController.updateNewPassword);
router.get('/checkAdmin', checkToken,UserController.checkAdmin);
router.get('/checkIndividualOfUser/:userIdParams', checkToken,UserController.checkIndividualOfUser);



export default router