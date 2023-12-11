import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Perk',
    new Schema({
        title: String,
        price: Number,
        isFeatured: {
            type: Boolean,
            default: false
        },
        quantity: Number,
        claimed: {
            type: Number,
            default: 0,
        },
        estDelivery: String,
        isVisible: Boolean,
        items: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            quantity: Number
        }],
        description: String,
        image: {
            url: String,
            public_id: String,
        },
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