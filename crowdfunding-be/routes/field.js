import express from 'express'
import { FieldController } from "../controllers/index.js";

const router = express.Router();



router.get('/getFieldGroupByCategory',FieldController.getFieldGroupByCategory)
router.post('/addField',FieldController.addField)
router.get('/', (req, res) => {
    res.send('Welcome to Field')
})

export default router