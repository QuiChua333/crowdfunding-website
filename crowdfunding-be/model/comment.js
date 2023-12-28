import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Comment',
    new Schema({
        content: {
            type: String,
            required: true
        },
        tag: Object,
        reply: mongoose.Types.ObjectId,
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        campaignId: mongoose.Types.ObjectId,
        postUserId: mongoose.Types.ObjectId

    },
    {
        timestamps: true
    })
)