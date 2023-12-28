import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Gift',
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
            detail: String,
            phoneNumber: String,
            estDelivery: Date,
        },
        perks: [{
            type: Object
        }],
        money: Number,
        isFinish: {
            type: Boolean,
            default: false
        }
      
    })
)