import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Contribution',
    new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        },
        shippingInfo: {
            fullName: String,
            province: String,
            district: String,
            ward: String,
            phoneNumber: String,
        },
        perks: [{
            type: Object
        }],
        money: Number,
        date: Date,
    })
)