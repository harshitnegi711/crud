import { Chats } from "../models/chats.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ********** Sending message ************** 

const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user
  const { recieverId, messageContent } = req.body
  const reciever = await User.findById(recieverId)
  console.log("log ---------> ", req.body)

  // ---------- validating reciever ----------

  if (!reciever) {
    throw new ApiError(401, "Invalid reciever id !")
  }

  // ---------- validating friendship ----------

  if (!sender.friendship.includes(recieverId)) {
    throw new ApiError(400, "not firends yet.")
  }

  // ------------ checking for chat ------------
  let chat = await Chats.findOne({ participants: { $all: [sender._id, recieverId] } })

  // -------------- creating cht if it dosen't exits ---------------

  if (!chat) {
    chat = await Chats.create({
      // sender: sender._id,
      // receiver: recieverId,
      participants: [sender._id, recieverId],
      lastMessage: messageContent,
      lastSeen: new Date()
    })
  } else {
    chat.lastMessage = messageContent
    chat.lastSeen = new Date()
    await chat.save()
  }

  // ---------- creating message ----------

  const newMessage = await Message.create({
    sender: sender._id,
    receiver: recieverId,
    messageContent: messageContent
  })



  res.status(200).json(ApiResponse(200, newMessage, "message sent successfully."))
})



// ********** getting all messages ************** 

const getMessages = asyncHandler(async (req, res) => {
  const loggedInUser = req.user
  const loggedInUserId = loggedInUser._id
  const { friendId } = req.params
  console.log("sendeer id ---> ", friendId, "logged user id ----> ", loggedInUserId)
  if (!friendId) { throw new ApiError(401, "friendId missing") }

  const messages = await Message.find({
    $or: [{ sender: friendId, receiver: loggedInUserId }, { sender: loggedInUserId, receiver: friendId }]
  }).sort({ createdAt: 1 }).select("-receiver ")


  res.status(200).json(ApiResponse(200, messages, "messeges fetched successfully."))
})



export { sendMessage, getMessages }

