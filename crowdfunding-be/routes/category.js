import express from 'express'
import { CategoryController } from "../controllers/index.js";
const router = express.Router();



router.post('/addCategory',CategoryController.addCategory)
router.get('/', (req, res) => {
    res.send('Welcome to Category')
})

export default router