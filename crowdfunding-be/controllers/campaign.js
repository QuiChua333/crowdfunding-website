import { Campaign, User, Item, Perk, Contribution } from '../model/index.js';
import cloudinary from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const getQuantityCampaingnPerUser = async (req, res) => {
    try {
        const { id } = req.params;
        const campain = await Campaign.findById(id).exec();
        const userId = campain.owner.toString();
        const campaigns = await Campaign.find({owner: userId}).exec();

        res.status(200).json({
            message: 'Lấy số lượng chiến dịch của user thành công',
            data: campaigns.length,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};



const editCampaign = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params;
        const {
            title,
            tagline,
            location,
            field,
            duration,
            videoUrl,
            story,
            isIndemand,
            goal,
            faqs,
            cardImage,
            imageDetailPage,
            momoNumber,
            team,
        } = req.body;
        const campaign = await Campaign.findById(id).exec();
        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            campaign.title = title ?? campaign.title
            campaign.tagline = tagline ?? campaign.tagline
            campaign.location = location ?? campaign.location
            campaign.duration = duration ?? campaign.duration
            campaign.field = field ?? campaign.field
            campaign.faqs = faqs ?? campaign.faqs
            campaign.videoUrl = videoUrl ?? campaign.videoUrl
            campaign.isIndemand = isIndemand ?? campaign.isIndemand
            campaign.story = story ?? campaign.story
            campaign.goal = goal ?? campaign.goal
            campaign.momoNumber = momoNumber ?? campaign.momoNumber
            campaign.team = team ?? campaign.team
            if (cardImage) {

                if (cardImage.url !== '') {
                    if (!cardImage.url.startsWith('http')) {
                        if (campaign.cardImage && campaign.cardImage.url) {
                            await cloudinary.uploader.destroy(campaign.cardImage.public_id)
                        }
                        const result = await cloudinary.uploader.upload(cardImage.url, {
                            folder: process.env.CLOUDINARY_FOLDER_NAME
                        })
                        campaign.cardImage = {
                            url: result.secure_url,
                            public_id: result.public_id,
                        }
                    }

                }

                else {
                    campaign.cardImage = {
                        url: '',
                        public_id: '',
                    }
                }
            }
            if (imageDetailPage) {

                if (imageDetailPage.url !== '') {
                    if (campaign.imageDetailPage && campaign.imageDetailPage.url) {
                        await cloudinary.uploader.destroy(campaign.imageDetailPage.public_id)
                    }
                    if (!imageDetailPage.url.startsWith('http')) {
                        const result = await cloudinary.uploader.upload(imageDetailPage.url, {
                            folder: process.env.CLOUDINARY_FOLDER_NAME
                        })
                        campaign.imageDetailPage = {
                            url: result.secure_url,
                            public_id: result.public_id,
                        }
                    }

                }

                else {
                    campaign.imageDetailPage = {
                        url: '',
                        public_id: '',
                    }
                }
            }
            await campaign.save();
            res.status(200).json({
                message: 'Lấy thông tin chiến dịch thành công',
                data: campaign
            })
        }
        else throw new Error('Không tồn tại chiến dịch')
    } catch (error) {
        debugger;
        res.status(400).json({
            message: error.message,
        });
    }
};
const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id)
            .populate([
                {
                    path: 'owner',
                    model: 'User',
                },
            ])
            .exec();

        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: campaign,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const createNewCampaign = async (req, res) => {
    try {
        const userId = req.userId;
        const campaign = await Campaign.create({
            status: 'Bản nháp',
            owner: userId,
            team: [
                {
                    user: userId,
                    canEdit: true,
                    isOwner: true,
                }
            ]
        })
        res.status(200).json({
            message: 'Tạo chiến dịch thành công',
            data: campaign,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const changeCardImage = async (req, res) => {
    try {
        const userId = req.userId
        const { base64 } = req.body
        const { id } = req.params
        const campaign = await Campaign.findById(id).exec();
        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            debugger
            if (campaign.cardImage && campaign.cardImage.url) {
                await cloudinary.uploader.destroy(campaign.cardImage.public_id)
            }
            if (base64) {
                const result = await cloudinary.uploader.upload(base64, {
                    folder: process.env.CLOUDINARY_FOLDER_NAME
                })
                campaign.cardImage = {
                    url: result.secure_url,
                    public_id: result.public_id,
                }

            }
            else {
                campaign.cardImage = {
                    url: '',
                    public_id: '',
                }
            }
            await campaign.save();



            res.status(200).json({
                message: 'Tạo chiến dịch thành công',
                data: campaign.cardImage.url
            })
        }
        else throw new Error('Không tồn tại chiến dịch')

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const CKEUpload = async (req, res) => {
    try {
        const { file } = req.body;
        const result = await cloudinary.uploader.upload(file, {
            folder: process.env.CLOUDINARY_CKEDITOR_FOLDER_NAME,
        });
        res.status(200).json({
            url: result.secure_url,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id)
            .populate({
                path: 'team.user',
                model: 'User',
            })
            .exec();
        const result = campaign.team.map((item) => {
            return { ...item._doc, user: { ...item._doc.user._doc, password: 'Not show' } };
        });
        res.status(200).json({
            message: 'Lấy thông tin thành viên chiến dịch thành công',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const launchCampaign = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const campaign = await Campaign.findById(id).exec();
        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            campaign.status = 'Chờ xác nhận'
            await campaign.save();
            res.status(200).json({
                message: 'Lấy thông tin thành viên chiến dịch thành công',
                data: campaign
            })
        }
        else throw new Error('Không tồn tại chiến dịch')


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

const launchCampaign = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const campaign = await Campaign.findById(id).exec();
        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            campaign.status = 'Chờ xác nhận'
            await campaign.save();
            res.status(200).json({
                message: 'Lấy thông tin thành viên chiến dịch thành công',
                data: campaign
            })
        }
        else throw new Error('Không tồn tại chiến dịch')


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const sendInvitation = async (req, res) => {
    try {
        const userId = req.userId;
        const { campaignId, email, canEdit } = req.body;
        const user = await User.findOne({ email }).exec();
        const campaign = await Campaign.findById(campaignId).exec();

        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            const tokenLink = jwt.sign({
                email,
                campaignId,
                userId: user._id.toString()
            },
                process.env.JWT_SECRET_LINK_SEND_INVITATION)
            const url = `${process.env.FRONT_END_URL}campaigns/team/invitation/${tokenLink}`;
            await sendEmail(email, 'Invitation campaign', url);
            const member = {
                user: user._id,
                canEdit,
                isAccepted: false
            }
            campaign.team = [...campaign.team, member]
            await campaign.save();
            res.status(200).json({
                message: 'Send invitation successfully',
                email
            })
        }
        else throw new Error('Không tồn tại chiến dịch')
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const handleAcceptInvitationCampaign = async (req, res) => {
    try {
        const { tokenLinkInvitation } = req.params;
        const { email, campaignId, userId } = jwt.verify(
            tokenLinkInvitation,
            process.env.JWT_SECRET_LINK_SEND_INVITATION,
        );

        const user = await User.findById(userId).exec();
        const campaign = await Campaign.findById(campaignId).exec();
        debugger
        if (!user) {
            throw new Error('Invalid link');
        }
        debugger
        if (!campaign) {
            throw new Error('Invalid link');
        }
        debugger
        const bool = campaign.team.some(item => item._doc.user.toString() === user._id.toString());
        if (!bool) throw new Error('Invalid link')
        // const member = {
        //     user: user._id,
        //     canEdit,
        //     isAccepted: true
        // }
        campaign.team = [...campaign.team].map((item) => {
            if (item._doc.user.toString() === userId) return { ...item._doc, isAccepted: true };
            else return { ...item._doc };
        });
        await campaign.save();
        res.status(200).json({
            message: 'Accept successfully',
        });
    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message,
        });
    }
};
const deleteMember = async (req, res) => {
    try {
        const userId = req.userId
        const { id, memberId } = req.params;
        const campaign = await Campaign.findById(id).exec();
        if (campaign) {
            if (campaign.owner.toString() !== userId) {
                throw new Error('Không có quyền truy cập vào dự án này')
            }
            const result = [...campaign.team].filter(item => {
                return item._doc.user.toString() !== memberId
            })
            campaign.team = result;
            await campaign.save();
            res.status(200).json({
                message: 'Delete successfully',
            })
        }
        else throw new Error('Không tồn tại chiến dịch')
    } catch (error) {
        debugger;
        res.status(400).json({
            message: error.message,
        });
    }
};
const getAllCampaigns = async (req, res) => {
    try {
        const isAdmin = req.isAdmin
        if (isAdmin) {

            let { page = 1, size = 15, status = 'Tất cả', searchString = '' } = req.query;
            page = parseInt(page);
            size = parseInt(size)
            size = size >= 15 ? 15 : size
            const filterCampaigns = await Campaign.aggregate([
                {
                    $lookup: {
                        from: 'users', // Tên của collection chứa thông tin người sở hữu (assumed là 'users')
                        localField: 'owner',
                        foreignField: '_id',
                        as: 'owner'
                    }
                },
                {
                    $unwind: '$owner' // Giải nén mảng owner tạo từ $lookup để truy cập trực tiếp vào các trường của owner
                },
                {
                    $project: {
                        'owner.password': 0, 
                        'owner.refreshToken': 0,
                        'owner.isAdmin': 0,
                        'owner.isVerifiedEmail': 0,
                        'owner.isVerifiedUser': 0,
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                status: status === 'Tất cả' ? {$nin: ['Tất cả', 'Bản nháp']} : status
                            },
                            {
                                $or: [
                                    {
                                        title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                    },
                                    {
                                        'owner.fullName': { $regex: `.*${searchString}.*`, $options: 'i' }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    $skip: (page - 1) * size
                },
                {
                    $limit: size
                }
            ]);
            const totalRecords = await Campaign.countDocuments();
            const totalPages = Math.ceil(totalRecords / size);

            // const campaigns = await Campaign.find({ status: { $ne: 'Bản nháp' } }).populate({
            //     path: 'owner',
            //     model: 'User'
            // }).exec()
            res.status(200).json({
                message: 'Lấy thông tin các chiến dịch  thành công',
                data: {
                    campaigns: filterCampaigns,
                    totalPages
                }
            })
        }
        else throw new Error('Bạn không có quyền truy cập')

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getCampaignsOfUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const campaigns = await Campaign.find({ owner: id }).populate({
            path: 'owner',
            model: 'User'
        }).exec();
        res.status(200).json({
            message: 'Lấy thông tin các chiến dịch của user thành công',
            data: campaigns
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getAllCampaigns = async (req, res) => {
    try {
        const isAdmin = req.isAdmin
        if (isAdmin) {

            let { page = 1, size = 15, status = 'Tất cả', searchString = '' } = req.query;
            page = parseInt(page);
            size = parseInt(size)
            size = size >= 15 ? 15 : size
            const filterCampaigns = await Campaign.aggregate([
                {
                    $lookup: {
                        from: 'users', // Tên của collection chứa thông tin người sở hữu (assumed là 'users')
                        localField: 'owner',
                        foreignField: '_id',
                        as: 'owner'
                    }
                },
                {
                    $unwind: '$owner' // Giải nén mảng owner tạo từ $lookup để truy cập trực tiếp vào các trường của owner
                },
                {
                    $project: {
                        'owner.password': 0, 
                        'owner.refreshToken': 0,
                        'owner.isAdmin': 0,
                        'owner.isVerifiedEmail': 0,
                        'owner.isVerifiedUser': 0,
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                status: status === 'Tất cả' ? {$nin: ['Tất cả', 'Bản nháp']} : status
                            },
                            {
                                $or: [
                                    {
                                        title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                    },
                                    {
                                        'owner.fullName': { $regex: `.*${searchString}.*`, $options: 'i' }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    $skip: (page - 1) * size
                },
                {
                    $limit: size
                }
            ]);
            const totalRecords = await Campaign.countDocuments();
            const totalPages = Math.ceil(totalRecords / size);

            // const campaigns = await Campaign.find({ status: { $ne: 'Bản nháp' } }).populate({
            //     path: 'owner',
            //     model: 'User'
            // }).exec()
            res.status(200).json({
                message: 'Lấy thông tin các chiến dịch  thành công',
                data: {
                    campaigns: filterCampaigns,
                    totalPages
                }
            })
        }
        else throw new Error('Bạn không có quyền truy cập')

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const checkCampaignOfUser = async (req, res) => {
    try {
        debugger
        const isAdmin = req.isAdmin;
        const userId = req.userId;
        const { idCampaign } = req.params;
        const campaign = await Campaign.findById(idCampaign).exec();
        if (campaign) {
            debugger
            const matched = campaign.owner.toString() === userId ||  campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true) || isAdmin === true;
            debugger
            res.status(200).json({
                message: 'Matched',
                data: matched
            })
        }
        else {
            debugger
            res.status(200).json({
                message: 'Not matched',
                data: false
            })
        }


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const adminChangeStatusCampaign = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const { idCampaign } = req.params;
            const { status } = req.body;
            const campaign = await Campaign.findById(idCampaign).exec();
            if (campaign) {
                campaign.status = status;
                await campaign.save()
                res.status(200).json({
                    message: 'Admin change status campaign successfully',
                    data: campaign
                })
            }
            else throw new Error('Chiến dịch không tồn tại')
        }
        else throw new Error('Bạn không có quyền truy cập')

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const adminDeleteCampaign = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const { idCampaign } = req.params;
            const campaign = await Campaign.findById(idCampaign).exec();
            if (campaign) {
                await campaign.deleteOne();
                await Item.deleteMany({campaign: idCampaign})
                await Perk.deleteMany({campaign: idCampaign})
                await Contribution.deleteMany({campaign: idCampaign})
                res.status(200).json({
                    message: 'Đã xóa chiến dịch thành công',
                })
            }
            else throw new Error('Chiến dịch không tồn tại')
        }
        else throw new Error('Bạn không có quyền truy cập')

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
} 
export default {
    createNewCampaign,
    getCampaignById,
    changeCardImage,
    editCampaign,
    getTeamMember,
    sendInvitation,
    CKEUpload,
    handleAcceptInvitationCampaign,
    getQuantityCampaingnPerUser,

    deleteMember,
    launchCampaign,
    getCampaignsOfUserId,
    getAllCampaigns,
    checkCampaignOfUser,
    adminChangeStatusCampaign,
    adminDeleteCampaign
}