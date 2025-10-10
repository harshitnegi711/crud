import { FriendShip } from "../models/friendship.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const validUser = async (_userId) => {
  const user = await User.findById(_userId);
  return user ? true : false;
}

// ------------ Sending friend request --------------

const sendRequset = asyncHandler(async (req, res) => {
  const { reqSenderId, reqRecieverId } = req.body

  // checking both sender and reciever id 

  if (!validUser(reqSenderId)) {
    throw new ApiError(401, "invalid sender Id !")
  }

  if (!validUser(reqRecieverId)) {
    throw new ApiError(401, "invalid reciever Id !")
  }

  const friendReq = await FriendShip.create({
    user1: reqSenderId,
    user2: reqRecieverId
  })


  res.status(200).json(ApiResponse(200, friendReq, "req sent successfully"))
})



// ------------ get recieved friend request --------------

const getRecievedRequest = asyncHandler(async (req, res) => {

  const userId = req.user._id

  if (!userId) {
    throw new ApiError(401, "user id not available !")
  }

  const requests = await FriendShip.find({
    user2: userId
  })

  res.status(200).json(ApiResponse(200, requests, "all request fetch successfully"))

})

// --------------- getting all sent requests ----------- 

const getAllSentRequest = asyncHandler(async (req, res) => {

  const userId = req.user._id

  if (!userId) {
    throw new ApiError(401, "user id not available !")
  }

  const requests = await FriendShip.find({
    user1: userId
  })

  res.status(200).json(ApiResponse(200, requests, "all request fetch successfully"))
})

// -------------- accepting or rejection a friend request --------------


const requestAction = asyncHandler(async (req, res) => {
  const { requestId, action } = req.body;

  if (!["accept", "reject"].includes(action)) {
    throw new ApiError(403, "Invalid action!");
  }

  let request;

  if (action === "accept") {
    // ----------------- update status -----------
    request = await FriendShip.findByIdAndUpdate(
      requestId,
      { status: action },
      { new: true }
    );

    if (!request) throw new ApiError(402, "Invalid request ID.");

    // add each user to the other's friend list
    await User.findByIdAndUpdate(request.user1, {
      $push: { friendship: request.user2 },
    });
    await User.findByIdAndUpdate(request.user2, {
      $push: { friendship: request.user1 },
    });

    return res
      .status(200)
      .json(ApiResponse(200, request, "Request accepted successfully."));
  }

  // ----------- Handle rejection ------------
  if (action === "reject") {
    request = await FriendShip.findByIdAndDelete(requestId);

    if (!request) throw new ApiError(402, "Invalid request ID.");

    return res
      .status(200)
      .json(ApiResponse(200, request, "Request rejected successfully."));
  }
});



export { sendRequset, getRecievedRequest, requestAction, getAllSentRequest }


