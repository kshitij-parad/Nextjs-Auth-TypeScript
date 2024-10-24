import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please enter Username!"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Please enter Password!"],
    },

    email:{
        type: String,
        required: [true,"Please enter email!"],
        unique : true
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry: Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User