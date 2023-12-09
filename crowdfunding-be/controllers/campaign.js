import { Campaign } from "../model/index.js";
import cloudinary from "../utils/cloudinary.js"


const editCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            tagline,
            location,
            field,
            duration,
            videoUrl,
            story,
            goal,
            faqs,
            cardImage,
            imageDetailPage,
            momoNumber,
            team
        } = req.body
        const campaign = await Campaign.findById(id).exec();
        campaign.title = title ?? campaign.title
        campaign.tagline = tagline ?? campaign.tagline
        campaign.location = location ?? campaign.location
        campaign.duration = duration ?? campaign.duration
        campaign.field = field ?? campaign.field
        campaign.faqs = faqs ?? campaign.faqs
        campaign.videoUrl = videoUrl ?? campaign.videoUrl
        campaign.story = story ?? campaign.story
        campaign.goal = goal ?? campaign.goal
        campaign.momoNumber = momoNumber ?? campaign.momoNumber
        campaign.team = team ?? campaign.team
        if (cardImage) {
            if (campaign.cardImage && campaign.cardImage.url) {
                await cloudinary.uploader.destroy(campaign.cardImage.public_id)
            }
            if (cardImage.url!=='') {
                if (!cardImage.url.startsWith('http')) {
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
            if (campaign.imageDetailPage && campaign.imageDetailPage.url) {
                await cloudinary.uploader.destroy(campaign.imageDetailPage.public_id)
            }
            if (imageDetailPage.url!=='') {
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
        const campaign = await Campaign.create({
            status: 'draft'
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
        const { base64 } = req.body
        const { id } = req.params
        const campaign = await Campaign.findById(id).exec();
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
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const CKEUpload = async (req,res) => {
    try {
        const {file} = req.body;
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


export default {
    createNewCampaign,
    getCampaignById,
    changeCardImage,
    editCampaign,
    CKEUpload
}