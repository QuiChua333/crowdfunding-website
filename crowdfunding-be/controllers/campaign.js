import { Campaign, User } from "../model/index.js";
import cloudinary from "../utils/cloudinary.js"
import jwt from "jsonwebtoken";
import sendEmail from '../utils/sendEmail.js'


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
            team
        } = req.body
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
        debugger
        res.status(400).json({
            message: error.message
        })
    }
}
const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id).exec();
        res.status(200).json({
            message: 'Lấy thông tin chiến dịch thành công',
            data: campaign
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const createNewCampaign = async (req, res) => {
    try {
        const userId = req.userId;
        const campaign = await Campaign.create({
            status: 'draft',
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
            data: campaign
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
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
            message: error.message
        })
    }
}

const CKEUpload = async (req, res) => {
    try {
        const { file } = req.body;
        const result = await cloudinary.uploader.upload(file, {
            folder: process.env.CLOUDINARY_CKEDITOR_FOLDER_NAME
        })
        res.status(200).json({
            url: result.secure_url
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id).populate({
            path: 'team.user',
            model: 'User'
        }).exec();
        const result = campaign.team.map(item => { return { ...item._doc, user: { ...item._doc.user._doc, password: 'Not show' } } })
        res.status(200).json({
            message: 'Lấy thông tin thành viên chiến dịch thành công',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
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
            message: error.message
        })
    }
}
const handleAcceptInvitationCampaign = async (req, res) => {
    try {
        const { tokenLinkInvitation } = req.params
        const { email,
            campaignId,
            userId,
        } = jwt.verify(tokenLinkInvitation, process.env.JWT_SECRET_LINK_SEND_INVITATION)

        const user = await User.findById(userId).exec();
        const campaign = await Campaign.findById(campaignId).exec();
        debugger
        if (!user) {
            throw new Error('Invalid link')
        }
        debugger
        if (!campaign) {
            throw new Error('Invalid link')
        }
        debugger
        const bool = campaign.team.some(item => item._doc.user.toString() === user._id.toString());
        if (!bool) throw new Error('Invalid link')
        // const member = {
        //     user: user._id,
        //     canEdit,
        //     isAccepted: true
        // }
        campaign.team = [...campaign.team].map(item => {
            if (item._doc.user.toString() === userId) return { ...item._doc, isAccepted: true }
            else return { ...item._doc }
        })
        await campaign.save();
        res.status(200).json({
            message: 'Accept successfully',
        })
    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message
        })
    }
}
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
        debugger
        res.status(400).json({
            message: error.message
        })
    }
}

const getCampaignsOfUserId = async (req, res) => {
    try {
        const {id} = req.params;
        const campaigns = await Campaign.find({owner: id}).populate({
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

export default {
    createNewCampaign,
    getCampaignById,
    changeCardImage,
    editCampaign,
    getTeamMember,
    sendInvitation,
    CKEUpload,
    handleAcceptInvitationCampaign,
    deleteMember,
    launchCampaign,
    getCampaignsOfUserId
}