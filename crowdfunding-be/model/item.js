import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Item',
    new Schema({
        name: String,
        isHasOption: Boolean,
        options: [
            {
                name: String,
                values: [String]
            }
        ],
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        }
    })
)