import { Item, Perk } from "../model/index.js";



const getItemsByCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const listItems = await Item.find({ campaign: campaignId })

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
const getItemsByCampaignContainPerk = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const listItems = await Item.find({ campaign: campaignId }).exec();
        const listPerks = await Perk.find({ campaign: campaignId }).exec();
        const ans = listItems.map(item => {
            const listAssociatedPerks = [];
            listPerks.forEach(item2 => {
                const tmp = item2.items.map(x => x.item.toString());
                if (tmp.includes(item._id.toString())) listAssociatedPerks.push(item2.title)
            })
            return {
                ...item._doc,
                listAssociatedPerks: listAssociatedPerks
            }

        })
        res.status(200).json({
            message: 'Get items by campaign successfully',
            data: ans
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getItemByIdContainPerk = async (req, res) => {
    try {
        const { idItem, campaignId } = req.params;
        const itemC = await Item.findById(idItem).exec();
        const listPerks = await Perk.find({ campaign: campaignId }).exec();
        let isHasAssociatedPerks = false;
        listPerks.forEach(item => {
            const tmp = item.items.map(x => x.item.toString());
            if (tmp.includes(itemC._id.toString())) {
                isHasAssociatedPerks = true;
            }
        })
        res.status(200).json({
            message: 'Get item successfully',
            data: {
                ...itemC._doc,
                isHasAssociatedPerks
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const addItem = async (req, res) => {
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
    addItem,
    getItemsByCampaignContainPerk,
    getItemByIdContainPerk
}