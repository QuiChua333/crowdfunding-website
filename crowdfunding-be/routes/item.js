import express from 'express'
import { ItemController } from "../controllers/index.js";

const router = express.Router();




router.get('/', (req, res) => {
    res.send('Welcome to Item')
})

export default router