import { Campaign, User, Item, Perk, Contribution } from '../model/index.js';
import cloudinary from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';


const getQuantityCampaignOfUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const campaigns = await Campaign.find({ owner: id, status: { $ne: 'Bản nháp' } }).exec();

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

const getQuantityCampaingnPerUser = async (req, res) => {
    try {
        const { id } = req.params;
        const campain = await Campaign.findById(id).exec();
        const userId = campain.owner.toString();
        const campaigns = await Campaign.find({ owner: userId, status: { $nin: ['Bản nháp', 'Chờ xác nhận'] } }).exec();

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
            category,
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
            if (!(campaign.owner.toString() === userId || req.isAdmin === true || campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true))) {
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
            campaign.category = category ?? campaign.category

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
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password -refreshToken -isAdmin -isVerifiedEmail -isVerifiedUser"
                }
            })
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
            if (!(campaign.owner.toString() === userId || req.isAdmin === true || campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true))) {
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
            if (!(campaign.owner.toString() === userId || req.isAdmin === true || campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true))) {
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
            console.log('email send', url)
            const member = {
                user: user._id,
                canEdit,
                isAccepted: false
            }
            campaign.team = [...campaign.team, member]
            await campaign.save();
            res.status(200).json({
                message: 'Send invitation successfully',
                email,
                url
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
            if (!(campaign.owner.toString() === userId || req.isAdmin === true || campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true))) {
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

const getCampaignsOfUserId = async (req, res) => {
    try {
        const { id } = req.params;
        // const campaigns = await Campaign.find({ owner: id }).populate({
        //     path: 'owner',
        //     model: 'User'
        // }).exec();
        const campaigns = await Campaign.find({ 'team.user': id }).populate({
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
const getCampaignsOfUserIdIsMember = async (req, res) => {
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
                                status: status === 'Tất cả' ? { $nin: ['Tất cả', 'Bản nháp'] } : status
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
            const totalRecords = await Campaign.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                status: status === 'Tất cả' ? { $nin: ['Tất cả', 'Bản nháp'] } : status
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
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                    },
                },
            ])
            const totalPages = Math.ceil(totalRecords[0] ? (totalRecords[0].count / size) : 0);

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
const getAllCampaignsExplore = async (req, res) => {
    try {
        let { sort = 'Xu hướng', searchString = '', status = 'Tất cả', category, field } = req.query;
        let filterCampaigns = []
        if (category) {
            if (category === 'Tất cả') {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                                }
                            ]
                        }
                    }
                ]);
            }
            else {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    category: category
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                                }
                            ]
                        }
                    }
                ]);
            }
        }
        if (field) {
            filterCampaigns = await Campaign.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                title: { $regex: `.*${searchString}.*`, $options: 'i' }
                            },
                            {
                                field: field
                            },
                            {
                                status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                            }
                        ]
                    }
                }
            ]);
        }
        for (let i = 0; i < filterCampaigns.length; i++) {
            const backers = await Contribution.countDocuments({ campaign: filterCampaigns[i]._id })
            let result = await Contribution.aggregate([
                {
                    $match: { campaign: filterCampaigns[i]._id }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: { $sum: "$money" }
                    }
                }
            ])
            const totalMoney = result.length > 0 ? result[0].totalMoney : 0;
            filterCampaigns[i].backers = backers
            filterCampaigns[i].currentMoney = totalMoney
            filterCampaigns[i].percentProgress = totalMoney / filterCampaigns[i].goal * 100
            let startDateTime = new Date(filterCampaigns[i].startDate)
            let endDateTime = startDateTime.getTime() + filterCampaigns[i].duration * 24 * 60 * 60 * 1000
            const currentDateTime = new Date().getTime()
            const remainingHours = Math.ceil((endDateTime - currentDateTime) / (1000 * 60 * 60));
            let daysLeft = ''
            if (remainingHours > 24) daysLeft = Math.ceil(remainingHours / 24) + " ngày"
            else if (remainingHours > 0) {
                daysLeft = Math.ceil(remainingHours) + " giờ";
            }
            else daysLeft = 'Hết hạn'
            filterCampaigns[i].daysLeft = daysLeft

        }
        if (sort === 'Xu hướng') {
            filterCampaigns.sort((a, b) => b.backers - a.backers)
        }
        if (sort === 'Quyên góp nhiều nhất') {
            filterCampaigns.sort((a, b) => b.currentMoney - a.currentMoney)
        }
        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: filterCampaigns
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getMoreCampaigns = async (req, res) => {
    try {
        let { sort = 'Xu hướng', searchString = '', status = 'Tất cả', category, field, page = 1 } = req.query;
        const size = 15;
        let filterCampaigns = []
        if (category) {
            if (category === 'Tất cả') {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng', 'Chờ xác nhận'] } : status
                                }
                            ]
                        }
                    },
                    {
                        $limit: page * size
                    }
                ]);
            }
            else {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    category: category
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                                }
                            ]
                        }
                    },
                    {
                        $limit: page * size
                    }
                ]);
            }
        }
        if (field) {
            filterCampaigns = await Campaign.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                title: { $regex: `.*${searchString}.*`, $options: 'i' }
                            },
                            {
                                field: field
                            },
                            {
                                status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                            }
                        ]
                    }
                },
                {
                    $limit: page * size
                }
            ]);
        }
        for (let i = 0; i < filterCampaigns.length; i++) {
            const backers = await Contribution.countDocuments({ campaign: filterCampaigns[i]._id.toString() })
            let result = await Contribution.aggregate([
                {
                    $match: {
                        $and: [
                            { campaign: filterCampaigns[i]._id }
                        ]
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: { $sum: "$money" }
                    }
                }
            ])
            const totalMoney = result.length > 0 ? result[0].totalMoney : 0;
            filterCampaigns[i].backers = backers
            filterCampaigns[i].currentMoney = totalMoney
            filterCampaigns[i].percentProgress = totalMoney / filterCampaigns[i].goal * 100
            let startDateTime = new Date(filterCampaigns[i].startDate)
            let endDateTime = startDateTime.getTime() + filterCampaigns[i].duration * 24 * 60 * 60 * 1000
            const currentDateTime = new Date().getTime()
            const remainingHours = Math.ceil((endDateTime - currentDateTime) / (1000 * 60 * 60));
            let daysLeft = ''
            if (remainingHours > 24) daysLeft = Math.ceil(remainingHours / 24) + " ngày"
            else if (remainingHours > 0) {
                daysLeft = Math.ceil(remainingHours) + " giờ";
            }
            else daysLeft = 'Hết hạn'
            filterCampaigns[i].daysLeft = daysLeft

        }
        if (sort === 'Xu hướng') {
            filterCampaigns.sort((a, b) => b.backers - a.backers)
        }
        if (sort === 'Quyên góp nhiều nhất') {
            filterCampaigns.sort((a, b) => b.currentMoney - a.currentMoney)
        }
        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: filterCampaigns.slice((page - 1) * size)
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getTotalCampaignsExplore = async (req, res) => {
    try {
        let { sort = 'Xu hướng', searchString = '', status = 'Tất cả', category, field } = req.query;
        let filterCampaigns = []
        if (category) {
            if (category === 'Tất cả') {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng', 'Chờ xác nhận'] } : status
                                }
                            ]
                        }
                    }
                ]);
            }
            else {
                filterCampaigns = await Campaign.aggregate([
                    {
                        $match: {
                            $and: [
                                {
                                    title: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    category: category
                                },
                                {
                                    status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                                }
                            ]
                        }
                    }
                ]);
            }
        }
        if (field) {
            filterCampaigns = await Campaign.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                title: { $regex: `.*${searchString}.*`, $options: 'i' }
                            },
                            {
                                field: field
                            },
                            {
                                status: status === 'Tất cả' ? { $nin: ['Bản nháp', 'Đang tạm ngưng'] } : status
                            }
                        ]
                    }
                }
            ]);
        }

        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: filterCampaigns.length
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getPopulateCampaigns = async (req, res) => {
    try {
        let filterCampaigns = []
        filterCampaigns = await Campaign.aggregate([
            {
                $match: {
                    status: { $nin: ['Bản nháp', 'Đang tạm ngưng', 'Đã kết thúc', 'Chờ  xác nhận'] }
                }
            }
        ]);
        for (let i = 0; i < filterCampaigns.length; i++) {
            const backers = await Contribution.countDocuments({ campaign: filterCampaigns[i]._id.toString() })
            let result = await Contribution.aggregate([
                {
                    $match: {
                        $and: [
                            { campaign: filterCampaigns[i]._id }
                        ]
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: { $sum: "$money" }
                    }
                }
            ])
            const totalMoney = result.length > 0 ? result[0].totalMoney : 0;
            filterCampaigns[i].backers = backers
            filterCampaigns[i].currentMoney = totalMoney
            filterCampaigns[i].percentProgress = totalMoney / filterCampaigns[i].goal * 100
            let startDateTime = new Date(filterCampaigns[i].startDate)
            let endDateTime = startDateTime.getTime() + filterCampaigns[i].duration * 24 * 60 * 60 * 1000
            const currentDateTime = new Date().getTime()
            const remainingHours = Math.ceil((endDateTime - currentDateTime) / (1000 * 60 * 60));
            let daysLeft = ''
            if (remainingHours > 24) daysLeft = Math.ceil(remainingHours / 24) + " ngày"
            else if (remainingHours > 0) {
                daysLeft = Math.ceil(remainingHours) + " giờ";
            }
            else daysLeft = 'Hết hạn'
            filterCampaigns[i].daysLeft = daysLeft

        }
        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: filterCampaigns
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const checkCampaignOfUser = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const userId = req.userId;
        const { idCampaign } = req.params;
        const campaign = await Campaign.findById(idCampaign).exec();
        if (campaign) {
            const matched = campaign.owner.toString() === userId || campaign.team.some(item => item.user.toString() === userId && item.isAccepted === true) || isAdmin === true;
            res.status(200).json({
                message: 'Matched',
                data: matched
            })
        }
        else {
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
                if (status === 'Đang gây quỹ') {
                    campaign.startDate = new Date()
                }
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
                await Item.deleteMany({ campaign: idCampaign })
                await Perk.deleteMany({ campaign: idCampaign })
                await Contribution.deleteMany({ campaign: idCampaign })
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
const userDeleteCampaign = async (req, res) => {
    try {

        const { idCampaign } = req.params;
        const campaign = await Campaign.findById(idCampaign).exec();
        if (campaign) {
            await campaign.deleteOne();
            await Item.deleteMany({ campaign: idCampaign })
            await Perk.deleteMany({ campaign: idCampaign })
            await Contribution.deleteMany({ campaign: idCampaign })
            res.status(200).json({
                message: 'Đã xóa chiến dịch thành công',
            })
        }
        else throw new Error('Chiến dịch không tồn tại')


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
    getAllCampaignsExplore,
    getMoreCampaigns,
    getTotalCampaignsExplore,
    getPopulateCampaigns,
    checkCampaignOfUser,
    adminChangeStatusCampaign,
    adminDeleteCampaign,
    userDeleteCampaign,
    getQuantityCampaignOfUserId,
}