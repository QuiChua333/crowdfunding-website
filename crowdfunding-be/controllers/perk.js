import { Perk } from "../model/index.js";
import cloudinary from "../utils/cloudinary.js"


const getPerksByCampaignId = async (req, res) => {
    try {
        const { id } = req.params;
        const listPerk = await Perk.find({ campaign: id }).exec();
        res.status(200).json({
            message: 'Lấy danh sách đặc quyền thành công',
            data: listPerk,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}
const getPerksHasListItemsByCampaignId = async (req, res) => {
    try {
        const { id } = req.params;
        const listPerk = await Perk.find({ campaign: id }).populate(
            [
                {
                    path: 'items.item',
                    model: 'Item'
                }
            ]
        ).exec();
        res.status(200).json({
            message: 'Lấy danh sách quà có chứa items thành công',
            data: listPerk,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}
const getPerkById = async (req, res) => {
    try {
        const { id } = req.params;
        const perk = await Perk.findById(id).populate({
            path: 'items.item',
            model: 'Item'
        }).exec();
        if (perk) {
            res.status(200).json({
                message: 'Lấy thông tin đặc quyền thành công',
                data: perk,
            })
        }
        else throw new Error('Not exists perk')

    } catch (error) {
        debugger
        if (error.message === 'Not exists perk') {
            res.status(400).json({
                message: 'Not exists perk'
            })
        }
        else {
            res.status(400).json({
                message: error.message
            })
        }
    }
}
const addPerk = async (req, res) => {
    try {
        const { perk, campaignId } = req.body;
        debugger
        const result = await cloudinary.uploader.upload(perk.image.url, {
            folder: process.env.CLOUDINARY_FOLDER_NAME
        })
        perk.image = {
            url: result.secure_url,
            public_id: result.public_id,
        }
        const newPerk = await Perk.create({ ...perk, campaign: campaignId });

        res.status(200).json({
            message: 'Tạo mới đặc quyền thành công',
            data: newPerk,
        })


    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message
        })

    }
}
const editPerk = async (req, res) => {
    try {
        const { idPerk } = req.params;
        const {
            title,
            price,
            quantity,
            estDelivery,
            isVisible,
            items,
            isFeatured,
            description,
            image,
            isShipping,
            listShippingFee
        } = req.body;
        debugger
        const perk = await Perk.findById(idPerk).exec();
        perk.title = title ?? perk.title
        perk.price = price ?? perk.price
        perk.quantity = quantity ?? perk.quantity
        perk.estDelivery = estDelivery ?? perk.estDelivery
        perk.isVisible = isVisible ?? perk.isVisible
        perk.items = items ?? perk.items
        perk.isFeatured = isFeatured ?? perk.isFeatured
        perk.description = description ?? perk.description
        perk.isShipping = isShipping ?? perk.isShipping
        perk.listShippingFee = listShippingFee ?? perk.listShippingFee
        if (image) {
           
            if (image.url!=='') {
                if (!image.url.startsWith('http')) {
                    if (perk.image && perk.image.url) {
                        await cloudinary.uploader.destroy(perk.image.public_id)
                    }
                    const result = await cloudinary.uploader.upload(image.url, {
                        folder: process.env.CLOUDINARY_FOLDER_NAME
                    })
                    perk.image = {
                        url: result.secure_url,
                        public_id: result.public_id,
                    }
                }
                
            }
            
            else {
                perk.image = {
                    url: '',
                    public_id: '',
                }
            }
        }
        await perk.save()

        res.status(200).json({
            message: 'Cập nhật đặc quyền thành công',
            data: perk,
        })


    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message
        })

    }
}
export default {
    getPerksByCampaignId,
    getPerkById,
    addPerk,
    editPerk,
    getPerksHasListItemsByCampaignId,
}