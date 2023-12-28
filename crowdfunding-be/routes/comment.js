import express from 'express'
import { CommentController } from "../controllers/index.js";
import checkToken from '../middlewares/auth.js'

const router = express.Router();



router.post('/createComment',checkToken,CommentController.createComment)
router.patch('/updateComment/:id',checkToken,CommentController.updateComment)
router.patch('/likeComment/:id',checkToken,CommentController.likeComment)
router.patch('/unLikeComment/:id',checkToken,CommentController.unLikeComment)
router.delete('/deleteComment/:id',checkToken,CommentController.deleteComment)





router.get('/', (req, res) => {
    res.send('Welcome to Comment')
})

export default router