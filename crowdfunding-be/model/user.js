import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('User',
    new Schema({
        fullName: String,
        address: {
            province: String,
            district: String,
            ward: String,
            phoneNumber: String,
        },
        story: {
            shortDescription: String,
            aboutMe: String,
        },
        profileImage: {
            url: String,
            public_id: String,
        },
        avatar: {
            url: String,
            public_id: String,
        },
        linkFacebook: String,
        email: String,
        password: String,
        isVerifiedEmail: { type: Boolean, default: false },
        isVerifiedUser: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
        infoVerify: {
            fullName: String,
            phoneNumber: String,
            birthday: String,
            detailAddress: String,
            identifyCode: String,
            identifyCardImage: {
                url: String,
                public_id: String
            },
            status: String,
            times: Number
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String,
            requried: true
        },
        followedCampaigns: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Campaign'
            }],
            default: []
        }
    })
)