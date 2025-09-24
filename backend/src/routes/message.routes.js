import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";


const router = Router()

router.post("/send", verifyJwt, sendMessage)
router.get("/get-all/:friendId", verifyJwt, getMessages)

export default router 
