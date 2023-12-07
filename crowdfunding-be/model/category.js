import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Category',
    new Schema({
        name: String,
    })
)