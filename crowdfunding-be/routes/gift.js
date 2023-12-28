import express from 'express'
import { GiftController } from "../controllers/index.js";

const router = express.Router();



router.post('/addGift',GiftController.addGift)
router.get('/getAllGiftsByCampaign/:id',GiftController.getAllGiftsByCampaign)
router.patch('/editStatus/:id',GiftController.editStatus)

router.get('/', (req, res) => {
    res.send('Welcome to Gift')
})

export default router