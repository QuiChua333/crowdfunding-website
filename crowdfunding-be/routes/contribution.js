import express from 'express'
import { ContributionController } from "../controllers/index.js";

const router = express.Router();


router.get('/getQuantityPeopleByCampaign/:id', ContributionController.getQuantityPeople);
router.get('/getMoneyByCampaign/:id', ContributionController.getMoneyByCampaign);
router.post('/paymentMomo/success',ContributionController.handleSuccess)
router.post('/paymentMomo/handle',ContributionController.handlePayment)

router.get('/getAllContributionsByCampaign/:id', ContributionController.getAllContributionsByCampaign);



router.get('/', (req, res) => {
    res.send('Welcome to Contribution')
})

export default router