import mongoose, { Schema } from "mongoose";

const friendshipSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accept', 'reject'],
    default: 'pending'
  }

})



export const FriendShip = mongoose.model("FriendShip", friendshipSchema)
