import { Contribution } from "../model/index.js";

const getQuantityPeople = async (req,res) => {
    try {
        const { id } = req.params;
        const contributes = await Contribution.find({ campaign: id }).exec();
        res.status(200).json({
            message: 'Lấy số người ủng hộ dự án thành công',
            data: contributes.length,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}
const getMoneyByCampaign = async (req,res) => {
    try {
        const { id } = req.params;
        const contributes = await Contribution.find({ campaign: id }).exec();
        let amount = 0;
        for (let i = 0; i < contributes.length; i++) {
            amount = amount + contributes[i].money;
        }
        res.status(200).json({
            message: 'Lấy số tiền ủng hộ dự án thành công',
            data: amount,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export default {
    getQuantityPeople,
    getMoneyByCampaign
}