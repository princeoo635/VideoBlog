import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String,
            required:true,
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        Password:{
            type:String,
            required:[true,'Password is requiredd!']
        },
        refreshToken:{
            type:String
        }
    },
{timeseries:true})

// hashing Password
userSchema.pre("save",async function (next) {
    if(!this.isModified("Password")){
        return next();
    }
    this.Password=bcrypt.hash(this.Password,10);
    next();
})

userSchema.methods.isPasswordCorrect=
    async function (Password) {
    return await bcrypt.compare(Password,this.Password)
    }
// Generating jwt token
userSchema.methods.generateAccessToken=async function () {
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}
// Generate refresh token
userSchema.methods.generateAccessToken=async function () {
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User=mongoose.model("User",userSchema)