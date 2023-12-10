import { Perk } from "../model/index.js";



const getPerksByCampaignId = async (req,res) => {
    try {
        const {id} = req.params;
        const listPerk = await Perk.find({campaign:id }).exec();
        debugger
        res.status(200).json({
            message: 'Lấy danh sách đặc quyền thành công',
            data: listPerk,
        })
    } catch (error) {
        debugger
        res.status(400).json({
            message: error.message,
        })
    }
}
const getPerkById = async (req,res) => {
    try {
        const {id} = req.params;
        const perk = await Perk.findById(id).exec();
        if (perk) {
            res.status(200).json({
                message: 'Lấy thông tin đặc quyền thành công',
                data: listPerk,
            })
        }
        else throw new Error('Not exists perk')
      
    } catch (error) {
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

export default {
    getPerksByCampaignId,
    getPerkById
}