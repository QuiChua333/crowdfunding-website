import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Contribution',
    new Schema({
        contributionId: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String,
        shippingInfo: {
            fullName: String,
            province: String,
            district: String,
            ward: String,
            detail: String,
            phoneNumber: String,
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        },
        perks: [{
            type: Object
        }],
        money: Number,
        estDelivery: String,
        date: Date,
        isFinish: {
            type: Boolean,
            default: false
        }
      
    })
)