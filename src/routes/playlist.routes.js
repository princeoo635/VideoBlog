import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylist, removeVideoFromPlaylist } from "../controllers/playlist.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,createPlaylist)
router.route("/getplaylist/p/:userId").get(verifyJWT,getUserPlaylist)
router.route("/getplaylist/p/:playlistId").get(verifyJWT,getPlaylistById)
router.route("/addvideo/p/:videoId/:playlistId").post(verifyJWT,addVideoToPlaylist)
router.route("/removevideo/p/:videoId/:playlistId").post(verifyJWT,removeVideoFromPlaylist)
router.route("/deleteplaylist").get(verifyJWT,deletePlaylist)

export default router