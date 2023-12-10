import express from 'express'
import { CampaignController } from "../controllers/index.js";
const router = express.Router();


router.get('/getCampaignById/:id',CampaignController.getCampaignById)
router.patch('/CKEUpload',CampaignController.CKEUpload)
router.patch('/editCampaign/:id',CampaignController.editCampaign)
router.patch('/changeCardImage/:id',CampaignController.changeCardImage)
router.post('/createNewCampaign',CampaignController.createNewCampaign)
router.get('/', (req, res) => {
    res.send('Welcome to Campaign')
})

export default router