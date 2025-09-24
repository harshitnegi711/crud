import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getChats } from "../controllers/chats.controller.js";


const router = Router()

router.get("/", verifyJwt, getChats)

export default router
