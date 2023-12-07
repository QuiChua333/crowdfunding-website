import express from 'express'
import { CampaignController } from "../controllers/index.js";
const router = express.Router();




router.get('/', (req, res) => {
    res.send('Welcome to Campaign')
})

export default router