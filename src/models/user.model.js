import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            require:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            require:true,
        },
        coverImage:{
            type:String,
            require:true,
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        Password:{
            type:String,
            require:[true,'Password is required!']
        },
        refreshToken:{
            type:String
        }
    },
{timeseries:true})

export const User=mongoose.model("User",userSchema)