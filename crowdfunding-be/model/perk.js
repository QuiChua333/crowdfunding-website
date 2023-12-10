import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Perk',
    new Schema({
        name: String,
        price: Number,
        isFeatured: Boolean,
        quantity: Number,
        claimed: Number,
        estDelivery: Date,
        isVisible: Boolean,
        items: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            quantity: Number
        }],
        description: String,
        image: String,
        isShipping: Boolean,
        listShippingFee: [
            {
                location: String,
                fee: Number
            }
        ],
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign'
        }

    })
)