import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Campaign',
    new Schema({
        title: String,
        tagline: String,
        cardImage: {
            url: String,
            public_id: String,
        },
        location: {
            country: String,
            city: String,
        },
        field: String,
        status: String,
        startDate: Date,
        duration: Number,
        videoUrl: String,
        imageDetailPage: {
            url: String,
            public_id: String,
        },
        story: String,
        goal: Number,
        momoNumber: String,
        faqs: [
            {
                question: String,
                answer: String,
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        team: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                role: String,
                canEdit: Boolean,
            }
        ]
        
    })
)