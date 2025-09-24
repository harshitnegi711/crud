import mongoose, { Schema } from "mongoose";
//
// const chatsSchema = new Schema({
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   lastSeen: {
//     type: Date,
//     default: Date.now
//   },
//   lastMessage: {
//     type: String
//   }
// })



// export const Chats = mongoose.model("Chats", chatsSchema)


const chatsSchema = new Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  ],
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  lastMessage: {
    type: String,
  },
})

export const Chats = mongoose.model("Chats", chatsSchema)
