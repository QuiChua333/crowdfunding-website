import express from 'express'
import { ContributionController } from "../controllers/index.js";

const router = express.Router();




router.get('/', (req, res) => {
    res.send('Welcome to Contribution')
})

export default router