import { User } from '../model/index.js';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import cloudinary from '../utils/cloudinary.js';

const checkRegisterEmail = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        let user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(409).json({ message: 'Email này đã tồn tại!' });
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.ROUNDS));
        const tokenVerifyEmailLink = jwt.sign(
            {
                fullName,
                email,
                password: hashedPassword,
            },
            process.env.JWT_SECRET_LINK_VERIFY_EMAIL,
            {
                expiresIn: process.env.EXPIRED_LINK_VERIFY_EMAI,
            },
        );
        const url = `${process.env.FRONT_END_URL}users/verify/${tokenVerifyEmailLink}`;
        await sendEmail(email, 'Verify Email', url);

        return res.status(201).json({
            message: `Một liên kết đã được gửi đến ${email}. Vui lòng truy cập liên kết để xác thực tài khoản. Liên kết tồn tại trong 5 phút.`,
            data: url,
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
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }
        const accessToken = generateAccessToken({ email: user.email, id: user._id, isAdmin: user.isAdmin });
        const refreshToken = generateRefreshToken({ email: user.email, id: user._id, isAdmin: user.isAdmin });
        user.refreshToken = refreshToken;
        await user.save();
        return res
            .status(200)
            .json({ data: { accessToken, refreshToken, isAdmin: user.isAdmin }, message: 'Logged in successfully' });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let emailUser = await User.findOne({ email }).exec();
        if (!emailUser) {
            return res.status(401).json({ message: 'Email không tồn tại!' });
        }
        const tokenResetPassword = jwt.sign(
            {
                email: emailUser.email,
            },
            process.env.JWT_SECRET_LINK_RESET_PASSWORD,
            {
                expiresIn: process.env.EXPIRED_LINK_RESET_PASSWORD,
            },
        );
        const url = `${process.env.FRONT_END_URL}user/${emailUser.id}/update-new-password/${tokenResetPassword}`;
        await sendEmail(emailUser.email, 'Password Reset', url);

        res.status(200).json({
            message: `Một liên kết cập nhật mật khẩu đã được gửi đến ${emailUser.email}. Liên kết tồn tại trong 5 phút.`,
            data: url,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

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
};

const updateNewPassword = async (req, res) => {
    try {
        const { newPassword, id } = req.body;
        const user = await User.findById(id).exec();
        const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.ROUNDS));
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Cập nhật mật khẩu thành công!' });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, {
        expiresIn: process.env.EXPIRED_ACCESS_TOKEN,
    });
};
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: process.env.EXPIRED_REFRESH_TOKEN,
    });
};

const registerUser = async (req, res) => {
    try {
        const token = req.params.tokenLinkVerifyEmail;
        const newUser = jwt.verify(token, process.env.JWT_SECRET_LINK_VERIFY_EMAIL);
        const existsUser = await User.findOne({ email: newUser.email }).exec();
        if (!existsUser) {
            const user = await User.create({
                ...newUser,
                isVerifiedEmail: true,
                avatar: {
                    url: 'https://res.cloudinary.com/nqportfolio/image/upload/v1703343774/CROWDFUNDING/lvadocmjdweyplapvtin.png',
                    public_id: 'CROWDFUNDING/lvadocmjdweyplapvtin',
                },
                profileImage: {
                    url: 'https://res.cloudinary.com/nqportfolio/image/upload/v1703343774/CROWDFUNDING/lvadocmjdweyplapvtin.png',
                    public_id: 'CROWDFUNDING/lvadocmjdweyplapvtin',
                },
            });

            res.status(200).json({ message: 'Email verified successfully' });
        } else res.status(200).json({ message: 'Tài khoản đã tồn tại' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid link' });
    }
};

const getInfoCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).exec();
        delete user._doc.password;
        delete user._doc.refreshToken;
        res.status(200).json({
            message: 'Get info user successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getInfoUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).exec();
        delete user._doc.password;
        res.status(200).json({
            message: 'Get info user successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }).exec();
        if (user) delete user._doc.password;
        res.status(200).json({
            message: 'Get user successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { infoVerify, fullName, address, story, avatar, profileImage, linkFacebook } = req.body;
        const user = await User.findById(id).exec();
        if (user) {
            if (infoVerify) {
                user.infoVerify.fullName = infoVerify.fullName ?? user.infoVerify.fullName;
                user.infoVerify.phoneNumber = infoVerify.phoneNumber ?? user.infoVerify.phoneNumber;
                user.infoVerify.birthday = infoVerify.birthday ?? user.infoVerify.birthday;
                user.infoVerify.detailAddress = infoVerify.detailAddress ?? user.infoVerify.detailAddress;
                user.infoVerify.identifyCode = infoVerify.identifyCode ?? user.infoVerify.identifyCode;
                user.infoVerify.status = infoVerify.status ?? (user.infoVerify.status || 'Chờ xác minh');
                user.infoVerify.times = user.infoVerify.times ? user.infoVerify.times + 1 : 1;
                debugger;
                if (infoVerify.identifyCardImage.url !== '') {
                    debugger;
                    if (!infoVerify.identifyCardImage?.url.startsWith('http')) {
                        if (user.infoVerify?.identifyCardImage?.url) {
                            await cloudinary.uploader.destroy(user.infoVerify?.identifyCardImage?.public_id);
                        }
                        const result = await cloudinary.uploader.upload(infoVerify.identifyCardImage?.url, {
                            folder: process.env.CLOUDINARY_FOLDER_NAME,
                        });

                        user.infoVerify.identifyCardImage = {
                            url: result.secure_url,
                            public_id: result.public_id,
                        };
                    }
                } else {
                    user.infoVerify = {
                        ...user.infoVerify._doc,
                        identifyCardImage: {
                            url: '',
                            public_id: '',
                        },
                    };
                }
            }
            user.fullName = fullName ?? user.fullName;
            user.linkFacebook = linkFacebook ?? user.linkFacebook;
            user.address = address ?? user.address;
            user.story = story ?? user.story;
            if (avatar) {
                if (avatar.url !== '') {
                    if (!avatar.url.startsWith('http')) {
                        if (user.avatar && user.avatar.url) {
                            await cloudinary.uploader.destroy(user.avatar.public_id);
                        }
                        const result = await cloudinary.uploader.upload(avatar.url, {
                            folder: process.env.CLOUDINARY_FOLDER_NAME,
                        });
                        user.avatar = {
                            url: result.secure_url,
                            public_id: result.public_id,
                        };
                    }
                } else {
                    user.avatar = {
                        url: '',
                        public_id: '',
                    };
                }
            }
            if (profileImage) {
                if (profileImage.url !== '') {
                    if (!profileImage.url.startsWith('http')) {
                        if (user.profileImage && user.profileImage.url) {
                            await cloudinary.uploader.destroy(user.profileImage.public_id);
                        }
                        const result = await cloudinary.uploader.upload(profileImage.url, {
                            folder: process.env.CLOUDINARY_FOLDER_NAME,
                        });
                        user.profileImage = {
                            url: result.secure_url,
                            public_id: result.public_id,
                        };
                    }
                } else {
                    user.profileImage = {
                        url: '',
                        public_id: '',
                    };
                }
            }
            await user.save();
            delete user._doc.password;
            delete user._doc.refreshToken;
            res.status(200).json({
                message: 'Update user successfully',
                data: user,
            });
        } else throw new Error('Tài khoản không tồn tại');
    } catch (error) {
        debugger;
        res.status(400).json({
            message: error.message,
        });
    }
};

const getLinkVerifyUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const tokenLink = jwt.sign(
            {
                userId: userId,
            },
            process.env.JWT_SECRET_LINK_VERIFY_USER,
            {
                expiresIn: '10m',
            },
        );
        const url = `/givefun/verify-user/${tokenLink}`;
        res.status(200).json({
            message: 'Get user successfully',
            data: url,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const checkLinkVerifyUser = async (req, res) => {
    try {
        const { tokenLink } = req.params;
        const { userId } = jwt.verify(tokenLink, process.env.JWT_SECRET_LINK_VERIFY_USER);
        const user = await User.findById(userId).exec();
        if (!user) {
            res.status(400).json({
                message: 'Invalid link',
            });
        }
        delete user._doc.password;
        res.status(200).json({
            message: 'Successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);
        const userId = payload.id;
        const user = await User.findById(userId).exec();
        if (user.refreshToken === refreshToken) {
            const newAccessToken = generateAccessToken({ email: user.email, id: user._id, isAdmin: user.isAdmin });

            res.status(200).json({
                data: {
                    accessToken: newAccessToken,
                    refreshToken: refreshToken,
                },
            });
        } else throw new Error('Refresh token is invalid');
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                message: error.message,
            });
        }
        res.status(400).json({
            message: error.message,
        });
    }
};

const checkAdmin = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        res.status(200).json({
            message: 'Successfully',
            data: isAdmin,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const checkIndividualOfUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { userIdParams } = req.params;

        res.status(200).json({
            message: 'Check matched',
            data: userId === userIdParams,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        debugger;
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId).exec();
        const isMatched = await bcrypt.compare(currentPassword, user.password);
        debugger;
        if (!isMatched) {
            throw new Error('Mật khẩu hiện tại không đúng');
        }
        const password = await bcrypt.hash(newPassword, parseInt(process.env.ROUNDS));
        user.password = password;
        const accessToken = generateAccessToken({ email: user.email, id: user._id, isAdmin: user.isAdmin });
        const refreshToken = generateRefreshToken({ email: user.email, id: user._id, isAdmin: user.isAdmin });
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({ data: { accessToken, refreshToken }, message: 'Cập nhật mật khẩu thành công!' });
    } catch (error) {
        debugger;
        res.status(400).json({
            message: error.message,
        });
    }
};

const handleFollowedCampaigns = async (req, res) => {
    try {
        let isFollowed;
        const { campaignId } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId).exec();
        let followedCampaigns = user.followedCampaigns;
        if (followedCampaigns) {
            if (followedCampaigns.includes(campaignId)) {
                isFollowed = false;
                followedCampaigns = followedCampaigns.filter((item) => item.toString() !== campaignId);
            } else {
                isFollowed = true;
                followedCampaigns = [...followedCampaigns, campaignId];
            }
        } else {
            isFollowed = true;
            followedCampaigns = [campaignId];
        }

        user.followedCampaigns = followedCampaigns;
        await user.save();
        res.status(200).json({
            message: 'A',
            data: isFollowed,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getCampaignFollowed = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
            .populate({
                path: 'followedCampaigns',
                model: 'Campaign',
                populate: {
                    path: 'owner',
                    model: 'User',
                },
            })
            .exec();
        if (user) {
            const campaignsFollowed = user.followedCampaigns;
            debugger;
            res.status(200).json({
                message: 'Lấy các chiến dịch yêu thích thành công',
                data: campaignsFollowed,
            });
        } else throw new Error('Tài khoản không tồn tại');
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            let { page = 1, size = 15, isVerifiedUser = 'Tất cả', status = 'Tất cả', searchString = '' } = req.query;
            page = parseInt(page);
            size = parseInt(size);
            size = size >= 15 ? 15 : size;
            const filterUsers = await User.aggregate([
                {
                    $lookup: {
                        from: 'campaigns',
                        localField: 'followedCampaigns',
                        foreignField: '_id',
                        as: 'followedCampaignsInfo',
                    },
                },
                {
                    $unwind: {
                        path: '$followedCampaignsInfo',
                        preserveNullAndEmptyArrays: true, // Giữ nguyên cả khi trường followedCampaigns rỗng
                    },
                },
                {
                    $project: {
                        password: 0,
                        refreshToken: 0,
                        isVerifiedEmail: 0,
                    },
                },
                {
                    $match: {
                        $and: [
                            {
                                status:
                                    status === 'Tất cả' ? { $ne: 'Tất cả' } : status === 'Đã bị khóa' ? false : true,
                            },
                            {
                                isVerifiedUser:
                                    isVerifiedUser === 'Tất cả'
                                        ? { $ne: 'Tất cả' }
                                        : isVerifiedUser === 'Chưa xác minh'
                                        ? false
                                        : true,
                            },
                            {
                                $or: [
                                    {
                                        fullName: { $regex: `.*${searchString}.*`, $options: 'i' },
                                    },
                                    {
                                        email: { $regex: `.*${searchString}.*`, $options: 'i' },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    $skip: (page - 1) * size,
                },
                {
                    $limit: size,
                },
            ]);

            const totalRecords = await User.countDocuments();
            const totalPages = Math.ceil(totalRecords / size);

            res.status(200).json({
                message: 'Lấy thông tin tất cả người dùng thành công',
                data: {
                    users: filterUsers,
                    totalPages,
                },
            });
        } else throw new Error('Bạn không có quyền truy cập');
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const changeStatusUser = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const user = await User.findById(req.params.id).exec();
            if (user) {
                user.status = !user.status;
            }
            else {
                res.status(400).json({
                    message: error.message,
                });
            }
            user.save();

            res.status(200).json({
                message: 'Cập nhật trạng thái hoạt động của người dùng thành công',
                data: user,
            });
        } else throw new Error('Bạn không có quyền truy cập');
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
export default {
    checkRegisterEmail,
    registerUser,
    loginUser,
    forgotPassword,
    verifyLinkForgotPassword,
    updateNewPassword,
    getInfoUser,
    getUserByEmail,
    editUser,
    getLinkVerifyUser,
    checkLinkVerifyUser,
    refreshToken,
    getInfoCurrentUser,
    checkAdmin,
    checkIndividualOfUser,
    updatePassword,
    handleFollowedCampaigns,
    getCampaignFollowed,
    getAllUser,
    changeStatusUser,
};
