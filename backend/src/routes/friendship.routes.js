import { Router } from "express";
import { getRecievedRequest, requestAction, sendRequset } from "../controllers/friendship.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router()

router.post("/send-request", sendRequset)
router.post("/action", requestAction)
router.get("/view-requests", verifyJwt, getRecievedRequest)

export default router 
