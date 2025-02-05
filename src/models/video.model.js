import mongoose from "mongoose";

const videoSchema=new mongoose.Schema(
    {
        videofile:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        ispublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
{timeseries:true})

export const Video=mongoose.model("Video",videoSchema)