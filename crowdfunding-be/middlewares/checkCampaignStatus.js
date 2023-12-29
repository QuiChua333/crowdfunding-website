import { Campaign, Contribution } from '../model/index.js'
const checkCampaignStatus = async (req, res, next) => {
    try {
        const listCampaigns = await Campaign.find({ status: 'Đang gây quỹ' }).exec();
        for (let i = 0; i < listCampaigns.length; i++) {
            let startDateTime = new Date(listCampaigns[i].startDate)
            let endDateTime = startDateTime.getTime() + listCampaigns[i].duration * 24 * 60 * 60 * 1000
            const currentDateTime = new Date().getTime()
            const remainingMinutes = Math.ceil((endDateTime - currentDateTime) / (1000 * 60));
            if (remainingMinutes <= 0) {
                listCampaigns[i].status = 'Đã kết thúc'
                let result = await Contribution.aggregate([
                    {
                        $match: { campaign: listCampaigns[i]._id }
                    },
                    {
                        $group: {
                            _id: null,
                            totalMoney: { $sum: "$money" }
                        }
                    }
                ])
                const totalMoney = result.length > 0 ? result[0].totalMoney : 0;
                if (totalMoney >= 0.7 * listCampaigns[i].goal) {
                    listCampaigns[i].isSuccessFunding = true
                }
                await listCampaigns[i].save()
            }
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}
export default checkCampaignStatus