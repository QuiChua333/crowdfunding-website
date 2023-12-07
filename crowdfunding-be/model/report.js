import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Report',
    new Schema({
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        },
        text: String,
        images: [String]
    })
)