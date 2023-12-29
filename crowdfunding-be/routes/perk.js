import express from 'express'
import { PerkController } from "../controllers/index.js";

const router = express.Router();


router.post('/addPerk',PerkController.addPerk)
router.patch('/editPerk/:idPerk',PerkController.editPerk)
router.get('/getPerkById/:id',PerkController.getPerkById)
router.get('/getPerksByCampaignId/:id',PerkController.getPerksByCampaignId)
router.get('/getPerksHasListItemsByCampaignId/:id',PerkController.getPerksHasListItemsByCampaignId)
router.delete('/delete/:id',PerkController.deletePerk)
router.get('/', (req, res) => {
    res.send('Welcome to Perk')
})

export default router