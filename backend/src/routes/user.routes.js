import { Router } from "express";
import { changePassword, editCurrentUser, getAllUsers, getCurrentUser, getUserById, login, logout, refreshAccessToken, registerUser, updateAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()


// --------------Routes ------------

router.post("/register", upload.fields([
  { name: "avatar", maxCount: 1 },
]), registerUser)

router.post("/login", login)
router.get("/get-all", getAllUsers)
router.post("/get", getUserById)
router.post("/logout", verifyJwt, logout)
router.get("/refresh-access-token", refreshAccessToken)
router.post("/change-password", verifyJwt, changePassword)
router.get("/get-current-user", verifyJwt, getCurrentUser)
router.post("/edit-user", verifyJwt, editCurrentUser)
router.post("/update-avatar", verifyJwt, upload.single("avatar"), updateAvatar)

export default router 
