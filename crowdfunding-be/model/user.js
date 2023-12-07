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
        avatar: String,
        facebookLink: String,
        email: String,
        password: String,
        isVerifiedEmail: Boolean,
        isVerifiedUser: Boolean,
        infoVerify: {
            fullName: String,
            phoneNumber: String,
            birthday: String,
            country: String,
            detailAddress: String,
            identifyCode: String,
            identifyCardImage: String,
        },
        isAdmin: Boolean,
    })
)