import express from 'express'
import { UserController } from "../controllers/index.js";

const router = express.Router();




router.get('/', (req, res) => {
    res.send('Welcome to User')
})

export default router