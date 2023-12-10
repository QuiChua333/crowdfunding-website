import { User } from '../model/index.js';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        let user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(409).json({ message: 'User with given email already Exist!' });
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.ROUNDS));
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const tokenVerifyEmailLink = jwt.sign(
            {
                email: newUser.email,
            },
            process.env.JWT_SECRET_LINK_VERIFY_EMAIL,
            {
                expiresIn: process.env.EXPIRED_LINK_VERIFY_EMAI,
            },
        );
        const url = `${process.env.FRONT_END_URL}users/${newUser.id}/verify/${tokenVerifyEmailLink}`;
        await sendEmail(newUser.email, 'Verify Email', url);

        return res.status(201).json({
            message: 'User register successfully !',
            data: newUser.email,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ message: 'This account is not registered' });
        }
        const validPassword = await bcrypt.compare(
			password,
			user.password
		);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
        if (!user.isVerifiedEmail) {
            const tokenVerifyEmailLink = jwt.sign(
                {
                    email: user.email,
                },
                process.env.JWT_SECRET_LINK_VERIFY_EMAIL,
                {
                    expiresIn: process.env.EXPIRED_LINK_VERIFY_EMAI,
                },
            );
            const url = `${process.env.FRONT_END_URL}users/${user.id}/verify/${tokenVerifyEmailLink}`;
            await sendEmail(user.email, 'Verify Email', url);

            return res.status(200).json({ message: "An Email sent to your account please verify" });
        }

        const accessToken = generateAccessToken({email: user.email});
        const refreshToken = generateRefreshToken({email: user.email});
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({ data: {accessToken,refreshToken, isAdmin: user.isAdmin}, message: "Logged in successfully" });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        let emailUser = await User.findOne({email}).exec();
        if (!emailUser) {
            return res.status(401).json({ message: 'This email is not existed or registered !' });
        }
        const tokenResetPassword = jwt.sign(
            {
                email: emailUser.email
            },
            process.env.JWT_SECRET_LINK_RESET_PASSWORD,
            {
                expiresIn: process.env.EXPIRED_LINK_RESET_PASSWORD,
            },
        );
        const url = `${process.env.FRONT_END_URL}user/${emailUser.id}/update-new-password/${tokenResetPassword}`;
        await sendEmail(emailUser.email, 'Password Reset', url);

        res.status(200).json({ message: "Password reset link sent to your email account" });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const verifyLinkForgotPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        if (!user) return res.status(400).json({ message: 'Invalid link' });

        const token = req.params.tokenVerifyLinkForgotPassword;
        jwt.verify(token, process.env.JWT_SECRET_LINK_RESET_PASSWORD);
        res.status(200).json({ message: 'successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid link' });
    }
}

const updateNewPassword = async (req, res) => {
    try {
        const {newPassword, id} = req.body;
        const user = await User.findById(id).exec();
        const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.ROUNDS));
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully"});
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET_ACCESS_TOKEN,{
        expiresIn: process.env.EXPIRED_ACCESS_TOKEN
    });
}
const generateRefreshToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET_REFRESH_TOKEN,{
        expiresIn: process.env.EXPIRED_REFRESH_TOKEN
    });
}

const verifyEmailRegister = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        if (!user) return res.status(400).json({ message: 'Invalid link' });

        const token = req.params.tokenLinkVerifyEmail;
        jwt.verify(token, process.env.JWT_SECRET_LINK_VERIFY_EMAIL);
        user.isVerifiedEmail = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid link' });
    }
};

export default {
    registerUser,
    verifyEmailRegister,
    loginUser,
    forgotPassword,
    verifyLinkForgotPassword,
    updateNewPassword
};
