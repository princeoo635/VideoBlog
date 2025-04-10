import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlist.model.js";

const createPlaylist = asyncHandler(async(req,res)=>{
    const { name, description } =req.body
    if(!(name && description)){
        throw new ApiError(400,"Both name and description is required.")
    }
    const playlist = await Playlist.create(
        {
            name,
            description,
            owner:req.user
        }
    )
    const createdPlaylist = await Playlist.findById(playlist._id)
    if(!createdPlaylist){
        throw new ApiError(401,"Playlist was not created.")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,createdPlaylist,"Playlist successfully created.")
    )
})



export {
    createPlaylist,
}
