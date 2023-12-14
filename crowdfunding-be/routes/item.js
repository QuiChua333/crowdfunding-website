import express from 'express'
import { ItemController } from "../controllers/index.js";

const router = express.Router();



router.get('/getItemsByCampaign/:campaignId',ItemController.getItemsByCampaign)
router.get('/getItemsByCampaignContainPerk/:campaignId',ItemController.getItemsByCampaignContainPerk)
router.get('/getItemByIdContainPerk/:idItem/:campaignId',ItemController.getItemByIdContainPerk)
router.post('/addItem',ItemController.addItem)
router.patch('/editItem/:id',ItemController.editItem)
router.delete('/deleteItem/:id',ItemController.deleteItem)
router.get('/', (req, res) => {
    res.send('Welcome to Item')
})

export default router