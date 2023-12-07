import express from 'express'
import { ReportController } from "../controllers/index.js";

const router = express.Router();




router.get('/', (req, res) => {
    res.send('Welcome to Report')
})

export default router