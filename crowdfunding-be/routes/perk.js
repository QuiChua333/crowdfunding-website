import express from 'express'
import { PerkController } from "../controllers/index.js";

const router = express.Router();



router.get('/getPerkById/:id',PerkController.getPerkById)
router.get('/getPerksByCampaignId/:id',PerkController.getPerksByCampaignId)
router.get('/', (req, res) => {
    res.send('Welcome to Perk')
})

export default router