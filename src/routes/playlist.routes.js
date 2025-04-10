import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPlaylist, getPlaylistById, getUserPlaylist } from "../controllers/playlist.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,createPlaylist)
router.route("/getplaylist/p/:userId").get(verifyJWT,getUserPlaylist)
router.route("/getplaylist/p/:playlistId").get(verifyJWT,getPlaylistById)


export default router