import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const publishVideo = asyncHandler(async(req,res)=>{
    const {title,description} = req.body;
    if(!(title || description)){
        throw new ApiError(401,"Title and description are required.")
    }
    const videoLocalPath=req.files?.videofile[0]?.path;
    const thumbnailLocalPath=req.files?.thumbnail[0]?.path;
    const videofile=await uploadOnCloudinary(videoLocalPath)
    const thumbnail= await uploadOnCloudinary(thumbnailLocalPath)
    
    if(!videofile){
        throw new ApiError(401,"Video file is required.")
    }
    if(!thumbnail){
        throw new ApiError(401,"Thumbnail file is required.")
    }
    const video=await Video.create({
        title,
        description,
        videofile:videofile.url,
        thumbnail:thumbnail.url,
        duration:videofile.duration,
        owner:req.user
    })
    const publishedVideo = await Video.find(video._id);
    if(!publishedVideo){
        throw new ApiError(400,"Video is not published.")
    }
    return res.status(200)
    .json(
         new ApiResponse(200,publishedVideo,"video published successfully.")
    )
})

export {
publishVideo
}