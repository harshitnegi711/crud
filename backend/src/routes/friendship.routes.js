import { Router } from "express";
import { getAllSentRequest, getRecievedRequest, requestAction, sendRequset } from "../controllers/friendship.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router()

router.post("/send-request", sendRequset)
router.post("/action", requestAction)
router.get("/view-requests", verifyJwt, getRecievedRequest)
router.get("/view-sent-requests", verifyJwt, getAllSentRequest)

export default router 
