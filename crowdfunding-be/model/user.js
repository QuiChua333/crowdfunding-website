import mongoose from "mongoose"
import { Schema, ObjectId } from "mongoose"
export default mongoose.model('User',
    new Schema({
        fullName: String,
        country: String,
        address: {
            fullName: String,
            province: String,
            district: String,
            ward: String,
            phoneNumber: String,
        },
        description: String,
        profileImage: String,
        avatar: {
            url: String,
            public_id: String,
        },
        facebookLink: String,
        email: String,
        password: String,
        isVerifiedEmail: { type: Boolean, default: false },
        
        isVerifiedUser: {
            type: Boolean,
            default: false
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
    })
)