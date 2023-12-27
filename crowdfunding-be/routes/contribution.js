import express from 'express'
import { ContributionController } from "../controllers/index.js";
import checkToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAllContributionsOfUser/:id', checkToken, ContributionController.getAllContributionsOfUser);
router.get('/getQuantityContributeOfUserId/:id', ContributionController.getQuantityContributeOfUserId);
router.get('/getQuantityPeopleByCampaign/:id', ContributionController.getQuantityPeople);
router.get('/getMoneyByCampaign/:id', ContributionController.getMoneyByCampaign);
router.post('/paymentMomo/success',ContributionController.handleSuccess)
router.post('/paymentMomo/handle',ContributionController.handlePayment)

router.get('/getAllContributionsByCampaign/:id', ContributionController.getAllContributionsByCampaign);
router.patch('/editStatus/:id',ContributionController.editStatus)


router.get('/getTopUserContributionByCampaign/:id', ContributionController.getTopUserContributionByCampaign);


router.get('/', (req, res) => {
    res.send('Welcome to Contribution')
})

export default router