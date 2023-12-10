import { Item } from "../model/index.js";



const getItemsByCampaign = async (req,res) => {
    try {
        const {campaignId} = req.params;
        const listItems = await Item.find({campaign: campaignId})

        res.status(200).json({
            message: 'Get items by campaign successfully',
            data: listItems
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const addItem = async (req,res) => {
    try {
        debugger
        const item = await Item.create(req.body)
        debugger
        res.status(200).json({
            message: 'Add item by campaign successfully',
            data: item
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default {
    getItemsByCampaign,
    addItem
}