import mongoose from "mongoose";

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

export const User=mongoose.model("User",userSchema)