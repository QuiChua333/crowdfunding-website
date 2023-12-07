import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('Campaign',
    new Schema({
        title: String,
        tagline: String,
        cardImage: String,
        location: {
            country: String,
            city: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        field: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Field'
        },
        startDate: Date,
        duration: Number,
        videoUrl: String,
        imageDetailPage: String,
        story: String,
        goal: Number,
        momoNumber: String,
        isPause: Boolean,
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