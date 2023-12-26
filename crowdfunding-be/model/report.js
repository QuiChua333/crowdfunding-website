import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Report',
    new Schema({
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        },
        content: String,
        title: String,
        date: Date,
        isResponsed: Boolean,
        responsed: {
            content: String,
            date: Date,
            images: [String],
        },
        images: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })
)