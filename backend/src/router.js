import { Router } from "express";
import user from "./routes/user.routes.js"
import friendship from "./routes/friendship.routes.js"
import message from "./routes/message.routes.js"
import chat from "./routes/chats.routes.js"

const router = Router()

router.use("/user", user)
router.use("/friendship", friendship)
router.use("/message", message)
router.use("/chats", chat)


export default router
