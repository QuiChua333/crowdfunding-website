import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Field',
    new Schema({
        name: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    })
)