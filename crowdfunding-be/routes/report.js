import express from 'express'
import { ReportController } from "../controllers/index.js";
import checkToken from '../middlewares/auth.js';
const router = express.Router();


router.post('/reportCampaign/:idCampaign', checkToken, ReportController.reportCampaign);
router.get('/getAllReports', checkToken, ReportController.getAllReports);
router.patch('/responseReport/:id', checkToken, ReportController.responseReport);
router.get('/', (req, res) => {
    res.send('Welcome to Report')
})

export default router