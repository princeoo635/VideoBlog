import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { publishVideo , getVideoById, updateVideo } from "../controllers/video.controller.js";

const router=Router()
router.route("/publish").post(
    verifyJWT,
    upload.fields([
        {
            name:"videofile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
    publishVideo
)

router.route("/getvideo/:videoId").post(verifyJWT,getVideoById)
router.route("/updatevideo/:videoId").patch(verifyJWT,upload.single("thumbnail"),updateVideo)

export default router