import express from 'express'
import { ItemController } from "../controllers/index.js";

const router = express.Router();



router.get('/getItemsByCampaign/:campaignId',ItemController.getItemsByCampaign)
router.get('/getItemsByCampaignContainPerk/:campaignId',ItemController.getItemsByCampaignContainPerk)
router.get('/getItemByIdContainPerk/:idItem/:campaignId',ItemController.getItemByIdContainPerk)
router.post('/addItem',ItemController.addItem)
router.get('/', (req, res) => {
    res.send('Welcome to Item')
})

export default router