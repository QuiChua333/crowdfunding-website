import { Comment } from "../model/index.js";
import { Campaign } from "../model/index.js";




const createComment = async (req, res) => {
    try {
        const { campaignId, content, tag, reply, postUserId } = req.body

        const post = await Campaign.findById(campaignId)
        if (!post) return res.status(400).json({ msg: "This post does not exist." })

        if (reply) {
            const cm = await Comment.findById(reply)
            if (!cm) return res.status(400).json({ msg: "This comment does not exist." })
        }

        const newComment = new Comment({
            user: req.userId, content, tag, reply, postUserId, campaignId
        })

        await Campaign.findOneAndUpdate({ _id: campaignId }, {
            $push: { comments: newComment._id }
        }, { new: true })

        await newComment.save()
        const ans = await Comment.findById(newComment._id)
        .populate({
            path: "user likes",
            select: "-password -refreshToken -isAdmin -isVerifiedEmail -isVerifiedUser"
        })
        .exec()
        res.status(200).json({ 
            data: {
                newComment: ans
            }
         })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const updateComment = async (req, res) => {
    try {
        const { content } = req.body
        
        await Comment.findOneAndUpdate({
            _id: req.params.id, user: req.userId
        }, { content })

        res.status(200).json({ msg: 'Update Success!' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const likeComment = async (req, res) => {
    try {
        const comment = await Comment.find({ _id: req.params.id, likes: req.userId })
        if (comment.length > 0) return res.status(400).json({ msg: "You liked this post." })

        await Comment.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.userId }
        }, { new: true })

        res.json({ msg: 'Liked Comment!' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const unLikeComment = async (req, res) => {
    try {

        await Comment.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.userId }
        }, { new: true })

        res.json({ msg: 'UnLiked Comment!' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            $or: [
                { user: req.userId },
                { postUserId: req.userId }
            ]
        })

        await Campaign.findOneAndUpdate({ _id: comment.campaignId }, {
            $pull: { comments: req.params.id }
        })

        res.json({ msg: 'Deleted Comment!' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



export default {
    createComment,
    updateComment,
    likeComment,
    unLikeComment,
    deleteComment,
}