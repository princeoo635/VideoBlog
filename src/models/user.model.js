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



export const User=mongoose.model("User",userSchema)