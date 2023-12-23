import express from 'express'
import { ContributionController } from "../controllers/index.js";

const router = express.Router();


router.get('/getQuantityPeopleByCampaign/:id', ContributionController.getQuantityPeople);
router.get('/getMoneyByCampaign/:id', ContributionController.getMoneyByCampaign);


router.get('/', (req, res) => {
    res.send('Welcome to Contribution')
})

export default router