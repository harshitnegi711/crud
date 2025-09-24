import { Chats } from "../models/chats.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChats = asyncHandler(async (req, res) => {
  const loggedInUser = req.user

  const chats = await Chats.find({
    participants: loggedInUser._id
  })
    .populate("participants", "fullName email avatar")
    .sort({ updatedAt: -1 });

  res.status(200).json(ApiResponse(200, chats, "chats successfully fetched."))
})


export { getChats }
