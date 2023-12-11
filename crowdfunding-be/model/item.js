import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Item',
    new Schema({
        name: String,
        isHasOption: {
            type: Boolean,
            default: false
        },
        options: {
            type: [
                {
                    name: String,
                    values: [String]
                }
            ],
            default: []
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        }
    })
)