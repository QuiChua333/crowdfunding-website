import express from 'express'
import { ItemController } from "../controllers/index.js";

const router = express.Router();



router.get('/getItemsByCampaign/:campaignId',ItemController.getItemsByCampaign)
router.post('/addItem',ItemController.addItem)
router.get('/', (req, res) => {
    res.send('Welcome to Item')
})

export default router